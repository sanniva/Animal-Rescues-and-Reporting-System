// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/users'); // important
// const taskRoutes = require('./routes/tasks');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Test route
// app.get('/', (req, res) => res.send('Backend is running'));

// // API routes
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);  // must match
// app.use('/api/tasks', taskRoutes);

// // Start server
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// server.js - COMPLETE WORKING VERSION
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const reportRoutes = require('./routes/report');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/reports', reportRoutes); // Make sure this is plural

// Quick test route for reports
app.get('/api/reports/test-db', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Reports test endpoint is working',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  console.log(`404: Route ${req.originalUrl} not found`);
  res.status(404).json({ 
    success: false, 
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: [
      '/api/test',
      '/api/auth/*',
      '/api/users/*',
      '/api/tasks/*',
      '/api/reports/*'
    ]
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`✅ Server started on http://localhost:${PORT}`);
  console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
  console.log('Available test endpoints:');
  console.log(`1. http://localhost:${PORT}/api/test`);
  console.log(`2. http://localhost:${PORT}/api/reports/test-db`);
  console.log('='.repeat(50));
});