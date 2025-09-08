const express = require('express');
const Contact = require('../models/Contact');
const { sendContactNotification, sendAutoReply } = require('../services/emailService');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 3 requests per windowMs
  message: {
    success: false,
    message: 'Too many contact form submissions. Please try again later.',
    retryAfter: 15 * 60 * 1000
  },
  standardHeaders: true,
  legacyHeaders: false
});

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message, phone, company } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, subject, and message'
      });
    }

    // Create new contact
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      phone,
      company,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    });

    await contact.save();

    // Send email notifications
    try {
      // Send notification to admin (you)
      const adminNotification = await sendContactNotification({
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        message: contact.message,
        phone: contact.phone,
        company: contact.company,
        submittedAt: contact.createdAt
      });

      // Send auto-reply to sender
      const autoReply = await sendAutoReply({
        name: contact.name,
        email: contact.email,
        subject: contact.subject
      });

      console.log('📧 Email notifications:', {
        adminNotification: adminNotification.success ? '✅ Sent' : '❌ Failed',
        autoReply: autoReply.success ? '✅ Sent' : '❌ Failed'
      });
    } catch (emailError) {
      console.error('📧 Email notification error:', emailError);
      // Don't fail the contact submission if email fails
    }

    // Log successful submission
    console.log(`📧 New contact form submission from ${email} at ${new Date().toISOString()}`);
    console.log(`📧 Email notifications sent to: ${process.env.ADMIN_EMAIL || process.env.EMAIL_USER}`);

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        submittedAt: contact.createdAt
      }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again later.'
    });
  }
});

// @route   GET /api/contact
// @desc    Get all contact messages (for admin use)
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { status, limit = 20, page = 1, unreadOnly } = req.query;
    
    // Build query
    let query = {};
    if (status) query.status = status;
    if (unreadOnly === 'true') query.isRead = false;

    // Pagination
    const limitNum = parseInt(limit);
    const skip = (parseInt(page) - 1) * limitNum;

    // Get contacts
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limitNum)
      .skip(skip)
      .select('-ipAddress -userAgent'); // Hide sensitive info

    // Get total count
    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limitNum),
        totalContacts: total,
        hasNextPage: skip + limitNum < total,
        hasPrevPage: page > 1
      }
    });

  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact messages'
    });
  }
});

module.exports = router;