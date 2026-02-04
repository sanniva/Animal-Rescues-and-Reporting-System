// backend/routes/report.js
const express = require('express');
const mysql = require('mysql2/promise');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// In Express 5, Router is imported differently
const { Router } = express;
const router = Router(); // Use Router from express

// Database connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'resqall',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Submit new report
router.post('/', authenticateToken, async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const {
      user_id,
      animal_type_id,
      animal_condition_id,
      description,
      location_address,
      user_note
    } = req.body;
    
    // Insert report
    const [result] = await connection.execute(
      `INSERT INTO reports 
       (user_id, animal_type_id, animal_condition_id, description, 
        location_address, status_id, user_note, submitted_at) 
       VALUES (?, ?, ?, ?, ?, 1, ?, NOW())`,
      [user_id, animal_type_id, animal_condition_id, description, 
       location_address, user_note || '']
    );
    
    const reportId = result.insertId;
    
    // Get animal type and condition names for notification
    const [animalTypeResult] = await connection.execute(
      'SELECT type_name FROM animal_types WHERE type_id = ?',
      [animal_type_id]
    );
    
    const [animalConditionResult] = await connection.execute(
      'SELECT condition_name FROM animal_conditions WHERE condition_id = ?',
      [animal_condition_id]
    );
    
    const animalType = animalTypeResult[0]?.type_name || 'Unknown';
    const animalCondition = animalConditionResult[0]?.condition_name || 'Unknown';
    
    // Send notification to all admins
    const [admins] = await connection.execute(
      `SELECT user_id FROM users WHERE role = 'admin' AND is_active = 1`
    );
    
    for (const admin of admins) {
      await connection.execute(
        `INSERT INTO notifications 
         (user_id, type, title, message, is_read, created_at, metadata) 
         VALUES (?, 'admin_alert', ?, ?, 0, NOW(), ?)`,
        [
          admin.user_id,
          'New Animal Rescue Report',
          `A new report has been submitted for a ${animalCondition.toLowerCase()} ${animalType.toLowerCase()} at ${location_address}`,
          JSON.stringify({
            report_id: reportId,
            animal_type_id,
            animal_condition_id,
            location_address,
            submitted_by: user_id
          })
        ]
      );
    }
    
    await connection.commit();
    
    res.json({
      success: true,
      message: 'Report submitted successfully',
      report_id: reportId
    });
    
  } catch (error) {
    await connection.rollback();
    console.error('Error submitting report:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit report',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

// Get animal types
router.get('/animal-types', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT type_id, type_name FROM animal_types ORDER BY type_name'
    );
    
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching animal types:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch animal types'
    });
  }
});

// Get animal conditions
router.get('/animal-conditions', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT condition_id, condition_name FROM animal_conditions ORDER BY condition_name'
    );
    
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching animal conditions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch animal conditions'
    });
  }
});

module.exports = router;