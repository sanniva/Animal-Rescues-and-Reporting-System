const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users'); // important
const taskRoutes = require('./routes/tasks');
const reportRoutes = require('./routes/reports');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => res.send('Backend is running'));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);  // must match
app.use('/api/tasks', taskRoutes);
app.use('/api/reports', reportRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

