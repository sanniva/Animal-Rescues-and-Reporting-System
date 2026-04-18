// const express = require('express');
// const router = express.Router();
// const adminTrackingController = require('../controllers/adminTrackingController');
// const verifyToken = require('../middleware/auth');
// const roleMiddleware = require('../middleware/roleMiddleware');

// USE SHARED DATABASE CONFIGURATION (with SSL)
const pool = require('../config/db');

// All admin tracking routes require authentication AND admin role
router.use(verifyToken);
router.use(roleMiddleware(['admin'])); // Removed 'super_admin'

// Get all tracking points for a specific task (route)
router.get('/route/:taskId', adminTrackingController.getTaskTrackingRoute);

// Get latest tracking point for a task
router.get('/latest/:taskId', adminTrackingController.getLatestTrackingPoint);

// Get tracking statistics for a task
router.get('/stats/:taskId', adminTrackingController.getTaskTrackingStats);

// Get all active tasks with latest tracking info
router.get('/active', adminTrackingController.getActiveTasksTracking);

// Get pending sync points (optional filter by volunteer)
router.get('/pending-sync', adminTrackingController.getPendingSyncPoints);

// Get tracking history for a volunteer
router.get('/volunteer/:volunteerId/history', adminTrackingController.getVolunteerTrackingHistory);

// Export tracking data as GeoJSON
router.get('/export/:taskId', adminTrackingController.exportTrackingAsGeoJSON);

module.exports = router;