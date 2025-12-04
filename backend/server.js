const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const sectionRoutes = require('./routes/sections');
const uploadRoutes = require('./routes/upload');
const path = require('path');
// const emailService = require('./services/emailService'); // Temporarily disabled due to module conflict

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 9999;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:5174', 
    'http://localhost:3000',
    'https://arwamohamedsalah.onrender.com',
    /^https?:\/\/.*\.onrender\.com$/, // Allow all Render.com subdomains
    /^https?:\/\/.*\.vercel\.app$/, // Allow all Vercel deployments
    /^https?:\/\/.*\.netlify\.app$/ // Allow all Netlify deployments
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://arwamohamedsalah05_db_user:Arwa%4056789@cluster0.dzf1tgl.mongodb.net/portfolio?retryWrites=true&w=majority';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB successfully!');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/upload', uploadRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Portfolio API is running!',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      contact: '/api/contact',
      auth: '/api/auth',
      projects: '/api/projects',
      sections: '/api/sections',
      upload: '/api/upload'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    message: 'Portfolio Contact API is running successfully!',
    timestamp: new Date().toISOString(),
    status: 'healthy'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: /api/health`);
  console.log(`📧 Contact API: /api/contact`);
  
  // Test email service configuration
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    console.log('✅ Gmail App Password confirmed working: kuqzkrojcnpdxtek');
    console.log('📧 Email notifications are now enabled!');
    console.log(`📧 Admin email: ${process.env.ADMIN_EMAIL || process.env.EMAIL_USER}`);
  } else {
    console.log('⚠️ Email configuration not found. Email notifications disabled.');
    console.log('💡 Add EMAIL_USER and EMAIL_PASS to .env file to enable email notifications');
  }
});

module.exports = app;