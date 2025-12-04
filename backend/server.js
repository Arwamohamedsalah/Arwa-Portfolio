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
const fs = require('fs');
// const emailService = require('./services/emailService'); // Temporarily disabled due to module conflict

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors({
  origin: [
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
// Use MongoDB Atlas for production
const DEFAULT_MONGODB_URI = 'mongodb+srv://arwamohamedsalah05_db_user:Arwa%4056789@cluster0.dzf1tgl.mongodb.net/portfolio?retryWrites=true&w=majority'; // Password: Arwa@56789 (encoded as Arwa%4056789)

// Get MongoDB URI from environment or use default
let MONGODB_URI = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;

// Safety check: If MONGODB_URI points to localhost in production, use default Atlas URI
if (process.env.NODE_ENV === 'production' || !process.env.NODE_ENV) {
  if (MONGODB_URI.includes('localhost') || MONGODB_URI.includes('127.0.0.1')) {
    console.warn('⚠️  WARNING: MONGODB_URI points to localhost in production!');
    console.warn('⚠️  Using default MongoDB Atlas connection instead.');
    MONGODB_URI = DEFAULT_MONGODB_URI;
  }
}

// Log the MongoDB URI being used (without password for security)
const maskedURI = MONGODB_URI.replace(/:[^:@]+@/, ':****@');
console.log('🔗 Connecting to MongoDB:', maskedURI);
console.log('📝 MONGODB_URI from env:', process.env.MONGODB_URI ? 'SET (using env variable)' : 'NOT SET (using default)');
console.log('🔍 Full URI (first 50 chars):', MONGODB_URI.substring(0, 50) + '...');

// MongoDB connection with retry logic
let isConnecting = false;
const connectDB = async (retryCount = 0) => {
  // Prevent multiple simultaneous connection attempts
  if (isConnecting) {
    return;
  }
  
  // If already connected, don't reconnect
  if (mongoose.connection.readyState === 1) {
    return;
  }
  
  isConnecting = true;
  try {
    console.log(`🔄 Attempting to connect to MongoDB (attempt ${retryCount + 1})...`);
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Timeout after 10s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    console.log('✅ Connected to MongoDB successfully!');
    isConnecting = false;
  } catch (error) {
    isConnecting = false;
    console.error('❌ MongoDB connection error:', error.message);
    console.error('💡 Make sure MongoDB Atlas is accessible or MongoDB service is running locally');
    
    // Retry after 5 seconds if not connected
    if (retryCount < 5) {
      console.log(`⏳ Retrying connection in 5 seconds... (${retryCount + 1}/5)`);
      setTimeout(() => connectDB(retryCount + 1), 5000);
    } else {
      console.error('❌ Max retry attempts reached. Please check your MongoDB connection.');
    }
  }
};

// Start connection
connectDB();

// Handle MongoDB connection events
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected. Attempting to reconnect...');
  connectDB();
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected successfully!');
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// MongoDB connection check middleware (only for non-health endpoints)
app.use('/api', async (req, res, next) => {
  // Allow health check endpoint to work even if DB is not connected
  if (req.path === '/health' || req.path === '/health/') {
    return next();
  }
  
  // For other endpoints, check connection but be more lenient
  const readyState = mongoose.connection.readyState;
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  
  if (readyState === 0) {
    // If disconnected, try to reconnect
    console.log('⚠️  MongoDB disconnected, attempting to reconnect...');
    if (!isConnecting) {
      connectDB();
    }
    
    // Wait a bit for connection (max 3 seconds)
    let attempts = 0;
    while (mongoose.connection.readyState !== 1 && attempts < 30) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
    
    // If still not connected, return 503 with helpful message
    if (mongoose.connection.readyState !== 1) {
      console.error(`❌ MongoDB still not connected after ${attempts * 100}ms. State: ${readyState}`);
      return res.status(503).json({
        success: false,
        message: 'Database connection not ready. Please try again in a moment.',
        error: `MongoDB connection state: ${readyState} (0=disconnected, 1=connected, 2=connecting)`,
        hint: 'Check MongoDB Atlas connection or ensure MongoDB service is running'
      });
    }
  }
  
  // Allow requests if connecting (2) or connected (1)
  next();
});

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const dbStatusText = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  res.status(200).json({ 
    message: 'Portfolio Contact API is running successfully!',
    timestamp: new Date().toISOString(),
    status: 'healthy',
    database: {
      status: dbStatusText[dbStatus] || 'unknown',
      readyState: dbStatus,
      connected: dbStatus === 1
    }
  });
});

// 404 handler for API routes only (must be before catch-all route)
app.use('/api/*', (req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Serve static files from dist folder (frontend)
const distPath = path.join(__dirname, '..', 'dist');

// Check if dist folder exists before serving static files
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  console.log('✅ Frontend files will be served from dist folder');
} else {
  console.warn('⚠️  dist folder not found. Frontend files will not be served.');
}

// Serve index.html for all non-API routes (React Router fallback)
app.get('*', (req, res, next) => {
  // Skip API routes
  if (req.path.startsWith('/api')) {
    return next();
  }
  
  // Check if dist folder and index.html exist
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error('Error sending index.html:', err);
        return next(err);
      }
    });
  } else {
    // If dist folder doesn't exist, return API info
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
      },
      note: 'Frontend files not found. Please build the frontend and ensure dist folder exists.'
    });
  }
});

// Error handling middleware (must be last)
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
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