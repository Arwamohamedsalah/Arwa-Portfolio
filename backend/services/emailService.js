const nodemailer = require('nodemailer');

// Create transporter instance
const createEmailTransporter = () => {
  return nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send notification to admin
const sendContactNotification = async (contactData) => {
  const { name, email, subject, message, phone, company, submittedAt } = contactData;
  const transporter = createEmailTransporter();

  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">From your portfolio website</p>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <div style="margin-bottom: 25px;">
          <h2 style="color: #374151; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Contact Information</h2>
          <div style="display: grid; gap: 12px;">
            <div><strong style="color: #6b7280;">Name:</strong> <span style="color: #374151;">${name}</span></div>
            <div><strong style="color: #6b7280;">Email:</strong> <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></div>
            ${phone ? `<div><strong style="color: #6b7280;">Phone:</strong> <a href="tel:${phone}" style="color: #3b82f6; text-decoration: none;">${phone}</a></div>` : ''}
            ${company ? `<div><strong style="color: #6b7280;">Company:</strong> <span style="color: #374151;">${company}</span></div>` : ''}
            <div><strong style="color: #6b7280;">Submitted:</strong> <span style="color: #374151;">${new Date(submittedAt).toLocaleString()}</span></div>
          </div>
        </div>

        <div style="margin-bottom: 25px;">
          <h2 style="color: #374151; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Subject</h2>
          <p style="color: #374151; margin: 0; font-size: 16px; font-weight: 600;">${subject}</p>
        </div>

        <div style="margin-bottom: 25px;">
          <h2 style="color: #374151; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Message</h2>
          <div style="background: #f9fafb; padding: 20px; border-radius: 6px; border-left: 4px solid #3b82f6;">
            <p style="color: #374151; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        </div>

        <div style="text-align: center; padding: 20px; background: #f9fafb; border-radius: 6px; border: 1px solid #e5e7eb;">
          <p style="color: #6b7280; margin: 0 0 15px 0; font-size: 14px;">Quick Actions</p>
          <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" 
             style="background: #3b82f6; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-size: 14px; display: inline-block;">
            Reply via Email
          </a>
        </div>
      </div>

      <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
        <p style="margin: 0;">This email was automatically generated from your portfolio contact form.</p>
        <p style="margin: 5px 0 0 0;">© ${new Date().getFullYear()} Arwa MohamedSalah Portfolio</p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: `📧 New Contact: ${subject} - from ${name}`,
    html: emailContent,
    replyTo: email
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log(`📧 Admin notification sent: ${result.messageId}`);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Failed to send admin notification:', error);
    return { success: false, error: error.message };
  }
};

// Send auto-reply to sender
const sendAutoReply = async (contactData) => {
  const { name, email, subject } = contactData;
  const transporter = createEmailTransporter();

  const autoReplyContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Thank You for Your Message!</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Arwa MohamedSalah - Frontend & Cross-Platform Developer</p>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <div style="margin-bottom: 25px;">
          <h2 style="color: #374151; margin: 0 0 15px 0;">Hi ${name},</h2>
          <p style="color: #374151; line-height: 1.6; margin: 0 0 15px 0;">
            Thank you for reaching out through my portfolio! I've received your message about "<strong>${subject}</strong>" and I really appreciate you taking the time to contact me.
          </p>
          <p style="color: #374151; line-height: 1.6; margin: 0 0 15px 0;">
            I'll review your message carefully and get back to you as soon as possible, typically within 24-48 hours.
          </p>
        </div>

        <div style="background: #f0f9ff; padding: 20px; border-radius: 6px; border-left: 4px solid #3b82f6; margin-bottom: 25px;">
          <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px;">About Me</h3>
          <p style="color: #374151; margin: 0; line-height: 1.6; font-size: 14px;">
            I'm a Frontend & Cross-Platform Developer and proud graduate of the Information Technology Institute (ITI). 
            I specialize in React.js, Next.js, React Native, Flutter, and modern web technologies.
          </p>
        </div>
      </div>

      <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
        <p style="margin: 0;">Best regards,<br><strong>Arwa MohamedSalah</strong></p>
        <p style="margin: 10px 0 0 0;">Frontend & Cross-Platform Developer | ITI Graduate</p>
        <p style="margin: 5px 0 0 0;">📧 arwamohamedsalah05@gmail.com</p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"Arwa MohamedSalah" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Thank you for contacting me - Re: ${subject}`,
    html: autoReplyContent
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log(`📧 Auto-reply sent to ${email}: ${result.messageId}`);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Failed to send auto-reply:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendContactNotification,
  sendAutoReply
};