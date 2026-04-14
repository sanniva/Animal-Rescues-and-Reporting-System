const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const fs = require('fs');

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

// Create uploads directories if they don't exist
const createUploadsDirectories = () => {
  // Profile images in backend/uploads/profile-images/
  const backendUploadsDir = path.join(__dirname, 'uploads');
  const profileImagesDir = path.join(backendUploadsDir, 'profile-images');
  
  // Evidence images in project root uploads/evidence/
  const projectUploadsDir = path.join(__dirname, '..', 'uploads');
  const evidenceDir = path.join(projectUploadsDir, 'evidence');
  
  // Create backend uploads directory
  if (!fs.existsSync(backendUploadsDir)) {
    fs.mkdirSync(backendUploadsDir);
    console.log('Created backend uploads directory:', backendUploadsDir);
  }
  
  // Create profile-images subdirectory in backend
  if (!fs.existsSync(profileImagesDir)) {
    fs.mkdirSync(profileImagesDir, { recursive: true });
    console.log('Created profile-images directory:', profileImagesDir);
  }
  
  // Create project uploads directory
  if (!fs.existsSync(projectUploadsDir)) {
    fs.mkdirSync(projectUploadsDir);
    console.log('Created project uploads directory:', projectUploadsDir);
  }
  
  // Create evidence subdirectory in project root
  if (!fs.existsSync(evidenceDir)) {
    fs.mkdirSync(evidenceDir, { recursive: true });
    console.log('Created evidence directory:', evidenceDir);
  }
  
  return { backendUploadsDir, projectUploadsDir };
};

// Create directories on startup
createUploadsDirectories();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Serve static files
// Profile images from backend/uploads/
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res, filePath) => {
    if (filePath.includes('profile-images')) {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
  }
}));

// Evidence images from project root uploads/
app.use('/uploads/evidence', express.static(path.join(__dirname, '..', 'uploads', 'evidence'), {
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
}));

console.log('Profile images served from:', path.join(__dirname, 'uploads'));
console.log('Evidence images served from:', path.join(__dirname, '..', 'uploads', 'evidence'));

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Health check route with directory info
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    profileImagesPath: path.join(__dirname, 'uploads/profile-images'),
    evidencePath: path.join(__dirname, '..', 'uploads/evidence')
  });
});

// Debug route to list all files
app.get('/debug/files', (req, res) => {
  const profileImagesDir = path.join(__dirname, 'uploads', 'profile-images');
  const evidenceDir = path.join(__dirname, '..', 'uploads', 'evidence');
  
  const result = {
    profileImages: {
      path: profileImagesDir,
      exists: fs.existsSync(profileImagesDir),
      files: []
    },
    evidence: {
      path: evidenceDir,
      exists: fs.existsSync(evidenceDir),
      files: []
    }
  };
  
  if (fs.existsSync(profileImagesDir)) {
    result.profileImages.files = fs.readdirSync(profileImagesDir).map(f => ({
      filename: f,
      url: `/uploads/profile-images/${f}`,
      size: fs.statSync(path.join(profileImagesDir, f)).size
    }));
  }
  
  if (fs.existsSync(evidenceDir)) {
    result.evidence.files = fs.readdirSync(evidenceDir).map(f => ({
      filename: f,
      url: `/uploads/evidence/${f}`,
      size: fs.statSync(path.join(evidenceDir, f)).size
    }));
  }
  
  res.json(result);
});

// Test specific image route
app.get('/test-image/:type/:filename', (req, res) => {
  const { type, filename } = req.params;
  
  let imagePath;
  if (type === 'profile') {
    imagePath = path.join(__dirname, 'uploads', 'profile-images', filename);
  } else if (type === 'evidence') {
    imagePath = path.join(__dirname, '..', 'uploads', 'evidence', filename);
  } else {
    return res.status(400).json({ error: 'Invalid image type' });
  }
  
  console.log('Testing image path:', imagePath);
  console.log('File exists:', fs.existsSync(imagePath));
  
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).json({ 
      error: 'Image not found', 
      path: imagePath,
      exists: false
    });
  }
});

// =====================================================
// API ROUTES
// =====================================================

// Auth routes
app.use('/api/auth', authRoutes);

// User routes
app.use('/api/users', userRoutes);

// Task routes
app.use('/api/tasks', taskRoutes);

// Report routes
app.use('/api/reports', reportRoutes);

// Volunteer routes
app.use('/api/volunteers', volunteerRoutes);

// Notification routes
app.use('/api/notifications', notificationRoutes);

// =====================================================
// TRACKING ROUTES
// =====================================================

// Admin tracking routes (require admin role)
app.use('/api/admin/tracking', adminTrackingRoutes);

// Volunteer tracking routes (require authentication)
app.use('/api/volunteer/tracking', volunteerTrackingRoutes);

// =====================================================
// Initialize Tracking System
// =====================================================
(async () => {
  try {
    await initializeTracking();
    console.log('Tracking system initialized');
  } catch (error) {
    console.error('Failed to initialize tracking system:', error);
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

// Start server
app.listen(PORT, () => {
  console.log('\n=================================');
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('=================================');
  console.log(`Profile images: ${path.join(__dirname, 'uploads/profile-images')}`);
  console.log(`Evidence images: ${path.join(__dirname, '..', 'uploads/evidence')}`);
  console.log(`Profile URL: http://localhost:${PORT}/uploads/profile-images/`);
  console.log(`Evidence URL: http://localhost:${PORT}/uploads/evidence/`);
  console.log('=================================\n');
  
  // Log all registered routes
  console.log('Registered Routes:');
  console.log('  - /api/auth');
  console.log('  - /api/users');
  console.log('  - /api/tasks');
  console.log('  - /api/reports');
  console.log('  - /api/volunteers');
  console.log('  - /api/notifications');
  console.log('  - /api/admin/tracking');
  console.log('  - /api/volunteer/tracking');
  console.log('=================================\n');
});


// const path = require('path');
// require('dotenv').config({ path: path.join(__dirname, '.env') });

// const express = require('express');
// const cors = require('cors');
// const fs = require('fs');

// // Import routes
// const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/users');
// const taskRoutes = require('./routes/tasks');
// const reportRoutes = require('./routes/reports');
// const volunteerRoutes = require('./routes/volunteers');
// const notificationRoutes = require('./routes/notifications');

// // Import tracking routes
// const adminTrackingRoutes = require('./routes/adminTrackingRoutes');
// const volunteerTrackingRoutes = require('./routes/volunteerTrackingRoutes');

// // Import tracking initialization
// const initializeTracking = require('./scripts/initTracking');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Create uploads directories if they don't exist
// const createUploadsDirectories = () => {
//   // Profile images in backend/uploads/profile-images/
//   const backendUploadsDir = path.join(__dirname, 'uploads');
//   const profileImagesDir = path.join(backendUploadsDir, 'profile-images');
  
//   // Evidence images in project root uploads/evidence/
//   const projectUploadsDir = path.join(__dirname, '..', 'uploads');
//   const evidenceDir = path.join(projectUploadsDir, 'evidence');
  
//   // Create backend uploads directory
//   if (!fs.existsSync(backendUploadsDir)) {
//     fs.mkdirSync(backendUploadsDir);
//     console.log('Created backend uploads directory:', backendUploadsDir);
//   }
  
//   // Create profile-images subdirectory in backend
//   if (!fs.existsSync(profileImagesDir)) {
//     fs.mkdirSync(profileImagesDir, { recursive: true });
//     console.log('Created profile-images directory:', profileImagesDir);
//   }
  
//   // Create project uploads directory
//   if (!fs.existsSync(projectUploadsDir)) {
//     fs.mkdirSync(projectUploadsDir);
//     console.log('Created project uploads directory:', projectUploadsDir);
//   }
  
//   // Create evidence subdirectory in project root
//   if (!fs.existsSync(evidenceDir)) {
//     fs.mkdirSync(evidenceDir, { recursive: true });
//     console.log('Created evidence directory:', evidenceDir);
//   }
  
//   return { backendUploadsDir, projectUploadsDir };
// };

// // Create directories on startup
// createUploadsDirectories();

// // =====================================================
// // MIDDLEWARE
// // =====================================================

// // CORS - FIXED to allow multiple ports
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// // Parse JSON bodies (already present)
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // =====================================================
// // DEBUG MIDDLEWARE (Temporary - can remove after testing)
// // =====================================================
// app.use((req, res, next) => {
//   console.log('\n=== REQUEST DEBUG ===');
//   console.log('Time:', new Date().toISOString());
//   console.log('Method:', req.method);
//   console.log('URL:', req.url);
//   console.log('Headers:', {
//     'content-type': req.headers['content-type'],
//     'authorization': req.headers['authorization'] ? 'Bearer [TOKEN]' : 'undefined'
//   });
//   console.log('Body:', req.body);
//   console.log('====================\n');
//   next();
// });

// // Serve static files
// // Profile images from backend/uploads/
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
//   setHeaders: (res, filePath) => {
//     if (filePath.includes('profile-images')) {
//       res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
//       res.setHeader('Pragma', 'no-cache');
//       res.setHeader('Expires', '0');
//     }
//   }
// }));

// // Evidence images from project root uploads/
// app.use('/uploads/evidence', express.static(path.join(__dirname, '..', 'uploads', 'evidence'), {
//   setHeaders: (res) => {
//     res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
//     res.setHeader('Pragma', 'no-cache');
//     res.setHeader('Expires', '0');
//   }
// }));

// console.log('Profile images served from:', path.join(__dirname, 'uploads'));
// console.log('Evidence images served from:', path.join(__dirname, '..', 'uploads', 'evidence'));

// // Test route
// app.get('/', (req, res) => {
//   res.send('Backend is running');
// });

// // Health check route with directory info
// app.get('/health', (req, res) => {
//   res.json({ 
//     status: 'OK', 
//     message: 'Server is running',
//     profileImagesPath: path.join(__dirname, 'uploads/profile-images'),
//     evidencePath: path.join(__dirname, '..', 'uploads/evidence')
//   });
// });

// // Debug route to list all files
// app.get('/debug/files', (req, res) => {
//   const profileImagesDir = path.join(__dirname, 'uploads', 'profile-images');
//   const evidenceDir = path.join(__dirname, '..', 'uploads', 'evidence');
  
//   const result = {
//     profileImages: {
//       path: profileImagesDir,
//       exists: fs.existsSync(profileImagesDir),
//       files: []
//     },
//     evidence: {
//       path: evidenceDir,
//       exists: fs.existsSync(evidenceDir),
//       files: []
//     }
//   };
  
//   if (fs.existsSync(profileImagesDir)) {
//     result.profileImages.files = fs.readdirSync(profileImagesDir).map(f => ({
//       filename: f,
//       url: `/uploads/profile-images/${f}`,
//       size: fs.statSync(path.join(profileImagesDir, f)).size
//     }));
//   }
  
//   if (fs.existsSync(evidenceDir)) {
//     result.evidence.files = fs.readdirSync(evidenceDir).map(f => ({
//       filename: f,
//       url: `/uploads/evidence/${f}`,
//       size: fs.statSync(path.join(evidenceDir, f)).size
//     }));
//   }
  
//   res.json(result);
// });

// // Test specific image route
// app.get('/test-image/:type/:filename', (req, res) => {
//   const { type, filename } = req.params;
  
//   let imagePath;
//   if (type === 'profile') {
//     imagePath = path.join(__dirname, 'uploads', 'profile-images', filename);
//   } else if (type === 'evidence') {
//     imagePath = path.join(__dirname, '..', 'uploads', 'evidence', filename);
//   } else {
//     return res.status(400).json({ error: 'Invalid image type' });
//   }
  
//   console.log('Testing image path:', imagePath);
//   console.log('File exists:', fs.existsSync(imagePath));
  
//   if (fs.existsSync(imagePath)) {
//     res.sendFile(imagePath);
//   } else {
//     res.status(404).json({ 
//       error: 'Image not found', 
//       path: imagePath,
//       exists: false
//     });
//   }
// });

// // =====================================================
// // API ROUTES
// // =====================================================

// // Auth routes
// app.use('/api/auth', authRoutes);

// // User routes
// app.use('/api/users', userRoutes);

// // Task routes
// app.use('/api/tasks', taskRoutes);

// // Report routes
// app.use('/api/reports', reportRoutes);

// // Volunteer routes
// app.use('/api/volunteers', volunteerRoutes);

// // Notification routes
// app.use('/api/notifications', notificationRoutes);

// // =====================================================
// // TRACKING ROUTES
// // =====================================================

// // Admin tracking routes (require admin role)
// app.use('/api/admin/tracking', adminTrackingRoutes);

// // Volunteer tracking routes (require authentication)
// app.use('/api/volunteer/tracking', volunteerTrackingRoutes);

// // =====================================================
// // Initialize Tracking System
// // =====================================================
// (async () => {
//   try {
//     await initializeTracking();
//     console.log('Tracking system initialized');
//   } catch (error) {
//     console.error('Failed to initialize tracking system:', error);
//   }
// })();

// // =====================================================
// // TEST BODY PARSING ROUTE (Temporary)
// // =====================================================
// app.post('/test-body', (req, res) => {
//   console.log('Test body received:', req.body);
//   res.json({ 
//     success: true, 
//     receivedBody: req.body,
//     contentType: req.headers['content-type']
//   });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ error: 'Route not found' });
// });

// // Error handler
// app.use((err, req, res, next) => {
//   console.error('Server error:', err);
//   res.status(500).json({ 
//     error: 'Internal server error',
//     message: process.env.NODE_ENV === 'development' ? err.message : undefined
//   });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log('\n=================================');
//   console.log(`Server running on http://localhost:${PORT}`);
//   console.log('=================================');
//   console.log(`Profile images: ${path.join(__dirname, 'uploads/profile-images')}`);
//   console.log(`Evidence images: ${path.join(__dirname, '..', 'uploads/evidence')}`);
//   console.log(`Profile URL: http://localhost:${PORT}/uploads/profile-images/`);
//   console.log(`Evidence URL: http://localhost:${PORT}/uploads/evidence/`);
//   console.log('=================================\n');
  
//   // Log all registered routes
//   console.log('Registered Routes:');
//   console.log('  - /api/auth');
//   console.log('  - /api/users');
//   console.log('  - /api/tasks');
//   console.log('  - /api/reports');
//   console.log('  - /api/volunteers');
//   console.log('  - /api/notifications');
//   console.log('  - /api/admin/tracking');
//   console.log('  - /api/volunteer/tracking');
//   console.log('  - /test-body (debug)');
//   console.log('=================================\n');
// });