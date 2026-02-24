const express = require('express');
const router = express.Router();
const adminTrackingController = require('../controllers/adminTrackingController');
const verifyToken = require('../middleware/auth');

// All volunteer tracking routes require authentication
router.use(verifyToken);

// Save a single tracking point
router.post('/point', adminTrackingController.saveTrackingPoint);

// Save batch tracking points (for offline sync)
router.post('/batch', adminTrackingController.saveBatchTrackingPoints);

// Get pending sync points for the volunteer
router.get('/pending', adminTrackingController.getVolunteerPendingSync);

// Mark points as synced
router.post('/mark-synced', adminTrackingController.markPointsAsSynced);

// Get volunteer's own tracking history
router.get('/history', adminTrackingController.getVolunteerTrackingHistory);

module.exports = router;