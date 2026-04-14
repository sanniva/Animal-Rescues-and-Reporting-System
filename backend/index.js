const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const mysql = require('mysql2/promise');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const reportRoutes = require('./routes/reports');
const volunteerRoutes = require('./routes/volunteers');
const notificationRoutes = require('./routes/notifications');

// Import tracking routes
const adminTrackingRoutes = require('./routes/adminTrackingRoutes');
const volunteerTrackingRoutes = require('./routes/volunteerTrackingRoutes');

// Import tracking initialization
const initializeTracking = require('./scripts/initTracking');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ FIXED: CORS for production
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [
      process.env.FRONTEND_URL || 'https://placeholder.com',
      'https://animal-rescue-system.vercel.app',
      'https://animal-rescues-and-reporting-system.onrender.com'
    ].filter(Boolean)
  : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directories
const createUploadsDirectories = () => {
  const backendUploadsDir = path.join(__dirname, 'uploads');
  const profileImagesDir = path.join(backendUploadsDir, 'profile-images');
  const projectUploadsDir = path.join(__dirname, '..', 'uploads');
  const evidenceDir = path.join(projectUploadsDir, 'evidence');
  
  if (!fs.existsSync(backendUploadsDir)) fs.mkdirSync(backendUploadsDir, { recursive: true });
  if (!fs.existsSync(profileImagesDir)) fs.mkdirSync(profileImagesDir, { recursive: true });
  if (!fs.existsSync(projectUploadsDir)) fs.mkdirSync(projectUploadsDir, { recursive: true });
  if (!fs.existsSync(evidenceDir)) fs.mkdirSync(evidenceDir, { recursive: true });
};

createUploadsDirectories();

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads/evidence', express.static(path.join(__dirname, '..', 'uploads', 'evidence')));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    env: process.env.NODE_ENV,
    dbHost: process.env.DB_HOST ? 'configured' : 'missing'
  });
});

// Simple ping test
app.get('/api/ping', (req, res) => {
  res.json({ 
    success: true, 
    message: 'pong',
    env: process.env.NODE_ENV,
    time: new Date().toISOString()
  });
});

// Test database connection endpoint
app.get('/api/test-db', async (req, res) => {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: process.env.DB_SSL === 'REQUIRED' ? { rejectUnauthorized: false } : false,
      waitForConnections: true,
      connectionLimit: 10
    });
    
    const [result] = await pool.query('SELECT 1 as connected, NOW() as time');
    await pool.end();
    
    res.json({ 
      success: true, 
      message: 'Database connected!',
      time: result[0].time
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message,
      code: error.code
    });
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin/tracking', adminTrackingRoutes);
app.use('/api/volunteer/tracking', volunteerTrackingRoutes);

// Initialize tracking
(async () => {
  try {
    await initializeTracking();
    console.log('✅ Tracking system initialized');
  } catch (error) {
    console.error('❌ Failed to initialize tracking system:', error.message);
    // App continues without tracking
  }
})();

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`\n=================================`);
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`=================================\n`);
});