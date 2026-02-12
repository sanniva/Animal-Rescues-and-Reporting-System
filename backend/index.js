// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/users'); // important
// const taskRoutes = require('./routes/tasks');
// const reportRoutes = require('./routes/reports');

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
// app.use('/api/reports', reportRoutes);

// // Start server
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const reportRoutes = require('./routes/reports');
const volunteerRoutes = require('./routes/volunteers');

const app = express();
const PORT = process.env.PORT || 5000;

// Create uploads directories if they don't exist
const createUploadsDirectories = () => {
  const uploadsDir = path.join(__dirname, 'uploads');
  const profileImagesDir = path.join(uploadsDir, 'profile-images');
  
  // Create uploads directory
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
    console.log('Created uploads directory:', uploadsDir);
  }
  
  // Create profile-images subdirectory
  if (!fs.existsSync(profileImagesDir)) {
    fs.mkdirSync(profileImagesDir, { recursive: true });
    console.log('Created profile-images directory:', profileImagesDir);
  }
};

// Create directories on startup
createUploadsDirectories();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Serve static files from uploads folder
// This makes files accessible at http://localhost:5000/uploads/profile-images/filename.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res, filePath) => {
    // Disable caching for profile images
    if (filePath.includes('profile-images')) {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
  }
}));

console.log('Static files served from:', path.join(__dirname, 'uploads'));

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    uploadsPath: path.join(__dirname, 'uploads'),
    profileImagesPath: path.join(__dirname, 'uploads/profile-images')
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/volunteers', volunteerRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Uploads directory: ${path.join(__dirname, 'uploads')}`);
  console.log(`Profile images: ${path.join(__dirname, 'uploads/profile-images')}`);
});