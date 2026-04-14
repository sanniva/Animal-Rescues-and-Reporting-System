// const Tracking = require('../models/Tracking');
// const pool = require('../config/db');

// async function initializeTracking() {
//   try {
//     console.log('Initializing tracking system...');
    
//     // Create tracking table
//     await Tracking.createTable();
    
//     // Check if table was created
//     const [tables] = await pool.execute(`
//       SELECT TABLE_NAME 
//       FROM information_schema.TABLES 
//       WHERE TABLE_SCHEMA = DATABASE() 
//       AND TABLE_NAME = 'task_tracking'
//     `);
    
//     if (tables.length > 0) {
//       console.log('Tracking table verified');
//     } else {
//       console.error('Tracking table not found');
//     }
    
//     console.log('Tracking system initialized successfully');
//   } catch (error) {
//     console.error('Failed to initialize tracking:', error);
//     throw error;
//   }
// }

// module.exports = initializeTracking;


const Tracking = require('../models/Tracking');
const pool = require('../config/db');

async function initializeTracking() {
  try {
    console.log('Initializing tracking system...');
    
    // Create tracking table
    await Tracking.createTable();
    
    // Check if table was created
    const [tables] = await pool.execute(`
      SELECT TABLE_NAME 
      FROM information_schema.TABLES 
      WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = 'task_tracking'
    `);
    
    if (tables.length > 0) {
      console.log('Tracking table verified');
    } else {
      console.warn('Tracking table not found - tracking features may be limited');
    }
    
    console.log('Tracking system initialized successfully');
  } catch (error) {
    console.error('Failed to initialize tracking:', error.message);
    // Don't throw - allow app to continue without tracking
    // This prevents the server from crashing if tracking fails
  }
}

module.exports = initializeTracking;