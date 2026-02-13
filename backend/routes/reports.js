// // // // // // // backend/routes/report.js
// // // // // // const express = require('express');
// // // // // // const router = express.Router();
// // // // // // const verifyToken = require('../middleware/auth');
// // // // // // const mysql = require('mysql2/promise');
// // // // // // require('dotenv').config();

// // // // // // // MySQL pool configuration
// // // // // // const pool = mysql.createPool({
// // // // // //   host: process.env.DB_HOST || 'localhost',
// // // // // //   user: process.env.DB_USER || 'root',
// // // // // //   password: process.env.DB_PASSWORD || '',
// // // // // //   database: process.env.DB_NAME || 'animal_rescue_system',
// // // // // //   waitForConnections: true,
// // // // // //   connectionLimit: 10,
// // // // // //   queueLimit: 0
// // // // // // });

// // // // // // console.log('✅ Report routes initialized');

// // // // // // /* =====================================================
// // // // // //    PUBLIC ENDPOINTS - NO AUTH REQUIRED
// // // // // // ===================================================== */

// // // // // // // Health check endpoint
// // // // // // router.get('/health', (req, res) => {
// // // // // //   console.log('✅ Health check endpoint accessed');
// // // // // //   res.json({
// // // // // //     success: true,
// // // // // //     message: 'Report API is running',
// // // // // //     timestamp: new Date().toISOString(),
// // // // // //     status: 'online'
// // // // // //   });
// // // // // // });

// // // // // // /* =====================================================
// // // // // //    GET ANIMAL TYPES (PROTECTED)
// // // // // // ===================================================== */
// // // // // // router.get('/animal-types', verifyToken, async (req, res) => {
// // // // // //   console.log('📋 Fetching animal types for user:', req.user.user_id);
  
// // // // // //   try {
// // // // // //     const [rows] = await pool.execute(
// // // // // //       'SELECT type_id, type_name FROM animal_types ORDER BY type_name'
// // // // // //     );
    
// // // // // //     console.log(`✅ Found ${rows.length} animal types`);
    
// // // // // //     res.json({
// // // // // //       success: true,
// // // // // //       data: rows
// // // // // //     });
    
// // // // // //   } catch (error) {
// // // // // //     console.error('❌ Error fetching animal types:', error);
    
// // // // // //     // Return fallback data
// // // // // //     const fallbackData = [
// // // // // //       { type_id: 1, type_name: 'Dog' },
// // // // // //       { type_id: 2, type_name: 'Cat' },
// // // // // //       { type_id: 3, type_name: 'Bird' },
// // // // // //       { type_id: 4, type_name: 'Rabbit' },
// // // // // //       { type_id: 5, type_name: 'Hamster' },
// // // // // //       { type_id: 6, type_name: 'Turtle' },
// // // // // //       { type_id: 7, type_name: 'Horse' },
// // // // // //       { type_id: 8, type_name: 'Cow' },
// // // // // //       { type_id: 9, type_name: 'Goat' },
// // // // // //       { type_id: 10, type_name: 'Sheep' },
// // // // // //       { type_id: 11, type_name: 'Other' }
// // // // // //     ];
    
// // // // // //     res.json({
// // // // // //       success: true,
// // // // // //       data: fallbackData,
// // // // // //       message: 'Using fallback data due to database error'
// // // // // //     });
// // // // // //   }
// // // // // // });

// // // // // // /* =====================================================
// // // // // //    GET ANIMAL CONDITIONS (PROTECTED)
// // // // // // ===================================================== */
// // // // // // router.get('/animal-conditions', verifyToken, async (req, res) => {
// // // // // //   console.log('📋 Fetching animal conditions for user:', req.user.user_id);
  
// // // // // //   try {
// // // // // //     const [rows] = await pool.execute(
// // // // // //       'SELECT condition_id, condition_name FROM animal_conditions ORDER BY condition_name'
// // // // // //     );
    
// // // // // //     console.log(`✅ Found ${rows.length} animal conditions`);
    
// // // // // //     res.json({
// // // // // //       success: true,
// // // // // //       data: rows
// // // // // //     });
    
// // // // // //   } catch (error) {
// // // // // //     console.error('❌ Error fetching animal conditions:', error);
    
// // // // // //     // Return fallback data
// // // // // //     const fallbackData = [
// // // // // //       { condition_id: 1, condition_name: 'Injured' },
// // // // // //       { condition_id: 2, condition_name: 'Sick' },
// // // // // //       { condition_id: 3, condition_name: 'Abandoned' }
// // // // // //     ];
    
// // // // // //     res.json({
// // // // // //       success: true,
// // // // // //       data: fallbackData,
// // // // // //       message: 'Using fallback data due to database error'
// // // // // //     });
// // // // // //   }
// // // // // // });

// // // // // // /* =====================================================
// // // // // //    SUBMIT REPORT (PROTECTED)
// // // // // // ===================================================== */
// // // // // // router.post('/submit', verifyToken, async (req, res) => {
// // // // // //   console.log('📝 New report submission attempt');
  
// // // // // //   const connection = await pool.getConnection();
  
// // // // // //   try {
// // // // // //     await connection.beginTransaction();
    
// // // // // //     const userId = req.user.user_id;
// // // // // //     const { animal_type_id, animal_condition_id, description, location_address, user_note } = req.body;
    
// // // // // //     console.log('📊 Report data:', {
// // // // // //       userId,
// // // // // //       animal_type_id,
// // // // // //       animal_condition_id,
// // // // // //       description_length: description?.length,
// // // // // //       location_address_length: location_address?.length,
// // // // // //       user_note_length: user_note?.length
// // // // // //     });
    
// // // // // //     // Validate required fields
// // // // // //     if (!animal_type_id || !animal_condition_id || !description || !location_address) {
// // // // // //       console.log('❌ Missing required fields');
// // // // // //       return res.status(400).json({
// // // // // //         success: false,
// // // // // //         message: 'All fields are required: animal type, condition, description, and location'
// // // // // //       });
// // // // // //     }
    
// // // // // //     // Validate description length
// // // // // //     if (description.trim().length < 10) {
// // // // // //       return res.status(400).json({
// // // // // //         success: false,
// // // // // //         message: 'Description must be at least 10 characters long'
// // // // // //       });
// // // // // //     }
    
// // // // // //     // Validate location length
// // // // // //     if (location_address.trim().length < 5) {
// // // // // //       return res.status(400).json({
// // // // // //         success: false,
// // // // // //         message: 'Location must be at least 5 characters long'
// // // // // //       });
// // // // // //     }
    
// // // // // //     // Insert report into database
// // // // // //     console.log('💾 Inserting report into database...');
// // // // // //     const [result] = await connection.execute(
// // // // // //       `INSERT INTO reports 
// // // // // //        (user_id, animal_type_id, animal_condition_id, description, 
// // // // // //         location_address, status_id, user_note, submitted_at, is_deleted) 
// // // // // //        VALUES (?, ?, ?, ?, ?, 1, ?, NOW(), 0)`,
// // // // // //       [
// // // // // //         userId, 
// // // // // //         animal_type_id, 
// // // // // //         animal_condition_id, 
// // // // // //         description.trim(), 
// // // // // //         location_address.trim(), 
// // // // // //         user_note ? user_note.trim() : ''
// // // // // //       ]
// // // // // //     );
    
// // // // // //     await connection.commit();
    
// // // // // //     const reportId = result.insertId;
// // // // // //     console.log(`✅ Report #${reportId} submitted successfully`);
    
// // // // // //     // Get the inserted report with animal info
// // // // // //     let reportDetails = {};
// // // // // //     try {
// // // // // //       const [report] = await connection.execute(`
// // // // // //         SELECT 
// // // // // //           r.report_id,
// // // // // //           r.description,
// // // // // //           r.location_address,
// // // // // //           r.user_note,
// // // // // //           DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// // // // // //           at.type_name as animal_type,
// // // // // //           ac.condition_name as animal_condition,
// // // // // //           r.status_id
// // // // // //         FROM reports r
// // // // // //         LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // // // // //         LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // // // // //         WHERE r.report_id = ?
// // // // // //       `, [reportId]);
      
// // // // // //       if (report.length > 0) {
// // // // // //         reportDetails = report[0];
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.log('⚠️ Could not fetch report details:', error.message);
// // // // // //     }
    
// // // // // //     res.json({
// // // // // //       success: true,
// // // // // //       message: 'Report submitted successfully! Our team will review it soon.',
// // // // // //       report_id: reportId,
// // // // // //       report: reportDetails
// // // // // //     });
    
// // // // // //   } catch (error) {
// // // // // //     await connection.rollback();
// // // // // //     console.error('❌ Error submitting report:', error);
    
// // // // // //     // Handle specific database errors
// // // // // //     let errorMessage = 'Failed to submit report';
// // // // // //     if (error.code === 'ER_NO_SUCH_TABLE') {
// // // // // //       errorMessage = 'Database tables not found. Please contact administrator.';
// // // // // //     } else if (error.code === 'ER_DUP_ENTRY') {
// // // // // //       errorMessage = 'Duplicate entry detected.';
// // // // // //     }
    
// // // // // //     res.status(500).json({
// // // // // //       success: false,
// // // // // //       message: errorMessage,
// // // // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // // // //     });
    
// // // // // //   } finally {
// // // // // //     connection.release();
// // // // // //   }
// // // // // // });

// // // // // // /* =====================================================
// // // // // //    GET USER'S REPORTS (PROTECTED)
// // // // // // ===================================================== */
// // // // // // router.get('/my-reports', verifyToken, async (req, res) => {
// // // // // //   const userId = req.user.user_id;
// // // // // //   console.log(`📋 Fetching reports for user: ${userId}`);
  
// // // // // //   try {
// // // // // //     const [reports] = await pool.execute(`
// // // // // //       SELECT 
// // // // // //         r.report_id,
// // // // // //         r.description,
// // // // // //         r.location_address,
// // // // // //         r.user_note,
// // // // // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// // // // // //         at.type_name as animal_type,
// // // // // //         ac.condition_name as animal_condition,
// // // // // //         r.status_id
// // // // // //       FROM reports r
// // // // // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // // // // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // // // // //       WHERE r.user_id = ? AND r.is_deleted = 0
// // // // // //       ORDER BY r.submitted_at DESC
// // // // // //     `, [userId]);
    
// // // // // //     console.log(`✅ Found ${reports.length} reports for user ${userId}`);
    
// // // // // //     res.json({
// // // // // //       success: true,
// // // // // //       data: reports,
// // // // // //       count: reports.length
// // // // // //     });
    
// // // // // //   } catch (error) {
// // // // // //     console.error('❌ Error fetching user reports:', error);
    
// // // // // //     res.json({
// // // // // //       success: true,
// // // // // //       data: [],
// // // // // //       message: 'Error fetching reports, returning empty list',
// // // // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // // // //     });
// // // // // //   }
// // // // // // });

// // // // // // /* =====================================================
// // // // // //    GET SINGLE REPORT (PROTECTED - OWNER OR ADMIN)
// // // // // // ===================================================== */
// // // // // // router.get('/:id', verifyToken, async (req, res) => {
// // // // // //   const reportId = Number(req.params.id);
// // // // // //   const userId = req.user.user_id;
  
// // // // // //   if (!reportId) {
// // // // // //     return res.status(400).json({
// // // // // //       success: false,
// // // // // //       message: 'Invalid report ID'
// // // // // //     });
// // // // // //   }
  
// // // // // //   console.log(`📋 Fetching report #${reportId} for user ${userId}`);
  
// // // // // //   try {
// // // // // //     const [reports] = await pool.execute(`
// // // // // //       SELECT 
// // // // // //         r.report_id,
// // // // // //         r.user_id,
// // // // // //         r.description,
// // // // // //         r.location_address,
// // // // // //         r.user_note,
// // // // // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// // // // // //         at.type_name as animal_type,
// // // // // //         ac.condition_name as animal_condition,
// // // // // //         r.status_id
// // // // // //       FROM reports r
// // // // // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // // // // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // // // // //       WHERE r.report_id = ? AND r.is_deleted = 0
// // // // // //     `, [reportId]);
    
// // // // // //     if (reports.length === 0) {
// // // // // //       return res.status(404).json({
// // // // // //         success: false,
// // // // // //         message: 'Report not found'
// // // // // //       });
// // // // // //     }
    
// // // // // //     const report = reports[0];
    
// // // // // //     // Check permissions: user must be report owner or admin
// // // // // //     if (report.user_id !== userId && req.user.role_id !== 3) {
// // // // // //       return res.status(403).json({
// // // // // //         success: false,
// // // // // //         message: 'Forbidden: You can only view your own reports'
// // // // // //       });
// // // // // //     }
    
// // // // // //     res.json({
// // // // // //       success: true,
// // // // // //       data: report
// // // // // //     });
    
// // // // // //   } catch (error) {
// // // // // //     console.error('❌ Error fetching report:', error);
    
// // // // // //     res.status(500).json({
// // // // // //       success: false,
// // // // // //       message: 'Failed to fetch report',
// // // // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // // // //     });
// // // // // //   }
// // // // // // });

// // // // // // /* =====================================================
// // // // // //    UPDATE REPORT (PROTECTED - OWNER ONLY)
// // // // // // ===================================================== */
// // // // // // router.patch('/:id', verifyToken, async (req, res) => {
// // // // // //   const reportId = Number(req.params.id);
// // // // // //   const userId = req.user.user_id;
// // // // // //   const { description, location_address, user_note } = req.body;
  
// // // // // //   if (!reportId) {
// // // // // //     return res.status(400).json({
// // // // // //       success: false,
// // // // // //       message: 'Invalid report ID'
// // // // // //     });
// // // // // //   }
  
// // // // // //   console.log(`📝 Updating report #${reportId} for user ${userId}`);
  
// // // // // //   try {
// // // // // //     // First check if report exists and belongs to user
// // // // // //     const [reportCheck] = await pool.execute(
// // // // // //       'SELECT user_id, status_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// // // // // //       [reportId]
// // // // // //     );
    
// // // // // //     if (reportCheck.length === 0) {
// // // // // //       return res.status(404).json({
// // // // // //         success: false,
// // // // // //         message: 'Report not found'
// // // // // //       });
// // // // // //     }
    
// // // // // //     // Check ownership (only owner can update)
// // // // // //     if (reportCheck[0].user_id !== userId) {
// // // // // //       return res.status(403).json({
// // // // // //         success: false,
// // // // // //         message: 'Forbidden: You can only update your own reports'
// // // // // //       });
// // // // // //     }
    
// // // // // //     // Check if report is still editable (only pending reports can be edited)
// // // // // //     if (reportCheck[0].status_id !== 1) {
// // // // // //       return res.status(400).json({
// // // // // //         success: false,
// // // // // //         message: 'Report cannot be edited after it has been reviewed'
// // // // // //       });
// // // // // //     }
    
// // // // // //     // Build update fields
// // // // // //     const updateFields = [];
// // // // // //     const updateValues = [];
    
// // // // // //     if (description !== undefined) {
// // // // // //       if (description.trim().length < 10) {
// // // // // //         return res.status(400).json({
// // // // // //           success: false,
// // // // // //           message: 'Description must be at least 10 characters'
// // // // // //         });
// // // // // //       }
// // // // // //       updateFields.push('description = ?');
// // // // // //       updateValues.push(description.trim());
// // // // // //     }
    
// // // // // //     if (location_address !== undefined) {
// // // // // //       if (location_address.trim().length < 5) {
// // // // // //         return res.status(400).json({
// // // // // //           success: false,
// // // // // //           message: 'Location must be at least 5 characters'
// // // // // //         });
// // // // // //       }
// // // // // //       updateFields.push('location_address = ?');
// // // // // //       updateValues.push(location_address.trim());
// // // // // //     }
    
// // // // // //     if (user_note !== undefined) {
// // // // // //       updateFields.push('user_note = ?');
// // // // // //       updateValues.push(user_note ? user_note.trim() : null);
// // // // // //     }
    
// // // // // //     if (updateFields.length === 0) {
// // // // // //       return res.status(400).json({
// // // // // //         success: false,
// // // // // //         message: 'No fields to update'
// // // // // //       });
// // // // // //     }
    
// // // // // //     updateValues.push(reportId);
    
// // // // // //     const updateQuery = `
// // // // // //       UPDATE reports
// // // // // //       SET ${updateFields.join(', ')}
// // // // // //       WHERE report_id = ? AND is_deleted = 0
// // // // // //     `;
    
// // // // // //     await pool.execute(updateQuery, updateValues);
    
// // // // // //     // Fetch updated report
// // // // // //     const [updatedReport] = await pool.execute(`
// // // // // //       SELECT 
// // // // // //         r.report_id,
// // // // // //         r.description,
// // // // // //         r.location_address,
// // // // // //         r.user_note,
// // // // // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// // // // // //         at.type_name as animal_type,
// // // // // //         ac.condition_name as animal_condition,
// // // // // //         r.status_id
// // // // // //       FROM reports r
// // // // // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // // // // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // // // // //       WHERE r.report_id = ?
// // // // // //     `, [reportId]);
    
// // // // // //     res.json({
// // // // // //       success: true,
// // // // // //       message: 'Report updated successfully',
// // // // // //       data: updatedReport[0]
// // // // // //     });
    
// // // // // //   } catch (error) {
// // // // // //     console.error('❌ Error updating report:', error);
    
// // // // // //     res.status(500).json({
// // // // // //       success: false,
// // // // // //       message: 'Failed to update report',
// // // // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // // // //     });
// // // // // //   }
// // // // // // });

// // // // // // /* =====================================================
// // // // // //    DELETE REPORT (PROTECTED - OWNER ONLY - SOFT DELETE)
// // // // // // ===================================================== */
// // // // // // router.delete('/:id', verifyToken, async (req, res) => {
// // // // // //   const reportId = Number(req.params.id);
// // // // // //   const userId = req.user.user_id;
  
// // // // // //   if (!reportId) {
// // // // // //     return res.status(400).json({
// // // // // //       success: false,
// // // // // //       message: 'Invalid report ID'
// // // // // //     });
// // // // // //   }
  
// // // // // //   console.log(`🗑️  Deleting report #${reportId} for user ${userId}`);
  
// // // // // //   const connection = await pool.getConnection();
  
// // // // // //   try {
// // // // // //     await connection.beginTransaction();
    
// // // // // //     // Check if report exists and belongs to user
// // // // // //     const [reportCheck] = await connection.execute(
// // // // // //       'SELECT user_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// // // // // //       [reportId]
// // // // // //     );
    
// // // // // //     if (reportCheck.length === 0) {
// // // // // //       return res.status(404).json({
// // // // // //         success: false,
// // // // // //         message: 'Report not found'
// // // // // //       });
// // // // // //     }
    
// // // // // //     // Check ownership (only owner can delete, or admin)
// // // // // //     if (reportCheck[0].user_id !== userId && req.user.role_id !== 3) {
// // // // // //       return res.status(403).json({
// // // // // //         success: false,
// // // // // //         message: 'Forbidden: You can only delete your own reports'
// // // // // //       });
// // // // // //     }
    
// // // // // //     // Soft delete report
// // // // // //     await connection.execute(
// // // // // //       'UPDATE reports SET is_deleted = 1 WHERE report_id = ?',
// // // // // //       [reportId]
// // // // // //     );
    
// // // // // //     await connection.commit();
    
// // // // // //     res.json({
// // // // // //       success: true,
// // // // // //       message: 'Report deleted successfully',
// // // // // //       report_id: reportId
// // // // // //     });
    
// // // // // //   } catch (error) {
// // // // // //     await connection.rollback();
// // // // // //     console.error('❌ Error deleting report:', error);
    
// // // // // //     res.status(500).json({
// // // // // //       success: false,
// // // // // //       message: 'Failed to delete report',
// // // // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // // // //     });
    
// // // // // //   } finally {
// // // // // //     connection.release();
// // // // // //   }
// // // // // // });

// // // // // // /* =====================================================
// // // // // //    GET ALL REPORTS (ADMIN ONLY)
// // // // // // ===================================================== */
// // // // // // router.get('/admin/all', verifyToken, async (req, res) => {
// // // // // //   try {
// // // // // //     // Admin check
// // // // // //     if (req.user.role_id !== 3) {
// // // // // //       return res.status(403).json({
// // // // // //         success: false,
// // // // // //         message: 'Forbidden: Admin access required'
// // // // // //       });
// // // // // //     }
    
// // // // // //     const [reports] = await pool.execute(`
// // // // // //       SELECT 
// // // // // //         r.report_id,
// // // // // //         r.user_id,
// // // // // //         r.description,
// // // // // //         r.location_address,
// // // // // //         r.user_note,
// // // // // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// // // // // //         at.type_name as animal_type,
// // // // // //         ac.condition_name as animal_condition,
// // // // // //         r.status_id,
// // // // // //         u.username as reporter_name
// // // // // //       FROM reports r
// // // // // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // // // // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // // // // //       LEFT JOIN users u ON r.user_id = u.user_id
// // // // // //       WHERE r.is_deleted = 0
// // // // // //       ORDER BY r.submitted_at DESC
// // // // // //     `);
    
// // // // // //     console.log(`📋 Admin: Found ${reports.length} total reports`);
    
// // // // // //     res.json({
// // // // // //       success: true,
// // // // // //       data: reports,
// // // // // //       count: reports.length
// // // // // //     });
    
// // // // // //   } catch (error) {
// // // // // //     console.error('❌ Error fetching all reports:', error);
    
// // // // // //     res.status(500).json({
// // // // // //       success: false,
// // // // // //       message: 'Failed to fetch reports',
// // // // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // // // //     });
// // // // // //   }
// // // // // // });

// // // // // // /* =====================================================
// // // // // //    UPDATE REPORT STATUS (ADMIN ONLY)
// // // // // // ===================================================== */
// // // // // // router.patch('/:id/status', verifyToken, async (req, res) => {
// // // // // //   const reportId = Number(req.params.id);
// // // // // //   const { status_id } = req.body;
  
// // // // // //   if (!reportId) {
// // // // // //     return res.status(400).json({
// // // // // //       success: false,
// // // // // //       message: 'Invalid report ID'
// // // // // //     });
// // // // // //   }
  
// // // // // //   if (!status_id || (status_id < 1 || status_id > 5)) {
// // // // // //     return res.status(400).json({
// // // // // //       success: false,
// // // // // //       message: 'Invalid status ID. Must be between 1 and 5'
// // // // // //     });
// // // // // //   }
  
// // // // // //   console.log(`📝 Admin updating report #${reportId} status to ${status_id}`);
  
// // // // // //   try {
// // // // // //     // Admin check
// // // // // //     if (req.user.role_id !== 3) {
// // // // // //       return res.status(403).json({
// // // // // //         success: false,
// // // // // //         message: 'Forbidden: Admin access required'
// // // // // //       });
// // // // // //     }
    
// // // // // //     // Check if report exists
// // // // // //     const [reportCheck] = await pool.execute(
// // // // // //       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// // // // // //       [reportId]
// // // // // //     );
    
// // // // // //     if (reportCheck.length === 0) {
// // // // // //       return res.status(404).json({
// // // // // //         success: false,
// // // // // //         message: 'Report not found'
// // // // // //       });
// // // // // //     }
    
// // // // // //     // Update status
// // // // // //     await pool.execute(
// // // // // //       'UPDATE reports SET status_id = ? WHERE report_id = ?',
// // // // // //       [status_id, reportId]
// // // // // //     );
    
// // // // // //     // Get updated report
// // // // // //     const [updatedReport] = await pool.execute(`
// // // // // //       SELECT 
// // // // // //         r.report_id,
// // // // // //         r.description,
// // // // // //         r.status_id,
// // // // // //         u.username as reporter_name
// // // // // //       FROM reports r
// // // // // //       LEFT JOIN users u ON r.user_id = u.user_id
// // // // // //       WHERE r.report_id = ?
// // // // // //     `, [reportId]);
    
// // // // // //     res.json({
// // // // // //       success: true,
// // // // // //       message: 'Report status updated successfully',
// // // // // //       data: updatedReport[0]
// // // // // //     });
    
// // // // // //   } catch (error) {
// // // // // //     console.error('❌ Error updating report status:', error);
    
// // // // // //     res.status(500).json({
// // // // // //       success: false,
// // // // // //       message: 'Failed to update report status',
// // // // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // // // //     });
// // // // // //   }
// // // // // // });

// // // // // // /* =====================================================
// // // // // //    TEST ENDPOINT (PUBLIC - FOR FRONTEND CONNECTION TEST)
// // // // // // ===================================================== */
// // // // // // router.get('/test', (req, res) => {
// // // // // //   console.log('✅ Test endpoint hit from frontend');
// // // // // //   res.json({
// // // // // //     success: true,
// // // // // //     message: 'Report API test endpoint is working',
// // // // // //     timestamp: new Date().toISOString(),
// // // // // //     endpoints: {
// // // // // //       animal_types: '/api/reports/animal-types (GET, protected)',
// // // // // //       animal_conditions: '/api/reports/animal-conditions (GET, protected)',
// // // // // //       submit: '/api/reports/submit (POST, protected)',
// // // // // //       my_reports: '/api/reports/my-reports (GET, protected)'
// // // // // //     }
// // // // // //   });
// // // // // // });

// // // // // // module.exports = router;

// // // // // const express = require('express');
// // // // // const router = express.Router();
// // // // // const verifyToken = require('../middleware/auth');
// // // // // const mysql = require('mysql2/promise');
// // // // // require('dotenv').config();

// // // // // // MySQL pool configuration
// // // // // const pool = mysql.createPool({
// // // // //   host: process.env.DB_HOST || 'localhost',
// // // // //   user: process.env.DB_USER || 'root',
// // // // //   password: process.env.DB_PASSWORD || '',
// // // // //   database: process.env.DB_NAME || 'animal_rescue_system',
// // // // //   waitForConnections: true,
// // // // //   connectionLimit: 10,
// // // // //   queueLimit: 0
// // // // // });

// // // // // console.log('Report routes initialized');

// // // // // /* =====================================================
// // // // //    PUBLIC ENDPOINTS - NO AUTH REQUIRED
// // // // // ===================================================== */

// // // // // // Health check endpoint
// // // // // router.get('/health', (req, res) => {
// // // // //   console.log('Health check endpoint accessed');
// // // // //   res.json({
// // // // //     success: true,
// // // // //     message: 'Report API is running',
// // // // //     timestamp: new Date().toISOString(),
// // // // //     status: 'online'
// // // // //   });
// // // // // });

// // // // // /* =====================================================
// // // // //    GET ANIMAL TYPES (PROTECTED)
// // // // // ===================================================== */
// // // // // router.get('/animal-types', verifyToken, async (req, res) => {
// // // // //   console.log('Fetching animal types for user:', req.user.user_id);
  
// // // // //   try {
// // // // //     const [rows] = await pool.execute(
// // // // //       'SELECT type_id, type_name FROM animal_types ORDER BY type_name'
// // // // //     );
    
// // // // //     console.log(`Found ${rows.length} animal types`);
    
// // // // //     res.json({
// // // // //       success: true,
// // // // //       data: rows
// // // // //     });
    
// // // // //   } catch (error) {
// // // // //     console.error('Error fetching animal types:', error);
    
// // // // //     // Return fallback data
// // // // //     const fallbackData = [
// // // // //       { type_id: 1, type_name: 'Dog' },
// // // // //       { type_id: 2, type_name: 'Cat' },
// // // // //       { type_id: 3, type_name: 'Bird' },
// // // // //       { type_id: 4, type_name: 'Rabbit' },
// // // // //       { type_id: 5, type_name: 'Hamster' },
// // // // //       { type_id: 6, type_name: 'Turtle' },
// // // // //       { type_id: 7, type_name: 'Horse' },
// // // // //       { type_id: 8, type_name: 'Cow' },
// // // // //       { type_id: 9, type_name: 'Goat' },
// // // // //       { type_id: 10, type_name: 'Sheep' },
// // // // //       { type_id: 11, type_name: 'Other' }
// // // // //     ];
    
// // // // //     res.json({
// // // // //       success: true,
// // // // //       data: fallbackData,
// // // // //       message: 'Using fallback data due to database error'
// // // // //     });
// // // // //   }
// // // // // });

// // // // // /* =====================================================
// // // // //    GET ANIMAL CONDITIONS (PROTECTED)
// // // // // ===================================================== */
// // // // // router.get('/animal-conditions', verifyToken, async (req, res) => {
// // // // //   console.log('Fetching animal conditions for user:', req.user.user_id);
  
// // // // //   try {
// // // // //     const [rows] = await pool.execute(
// // // // //       'SELECT condition_id, condition_name FROM animal_conditions ORDER BY condition_name'
// // // // //     );
    
// // // // //     console.log(`Found ${rows.length} animal conditions`);
    
// // // // //     res.json({
// // // // //       success: true,
// // // // //       data: rows
// // // // //     });
    
// // // // //   } catch (error) {
// // // // //     console.error('Error fetching animal conditions:', error);
    
// // // // //     // Return fallback data
// // // // //     const fallbackData = [
// // // // //       { condition_id: 1, condition_name: 'Injured' },
// // // // //       { condition_id: 2, condition_name: 'Sick' },
// // // // //       { condition_id: 3, condition_name: 'Abandoned' }
// // // // //     ];
    
// // // // //     res.json({
// // // // //       success: true,
// // // // //       data: fallbackData,
// // // // //       message: 'Using fallback data due to database error'
// // // // //     });
// // // // //   }
// // // // // });

// // // // // /* =====================================================
// // // // //    SUBMIT REPORT (PROTECTED)
// // // // // ===================================================== */
// // // // // router.post('/submit', verifyToken, async (req, res) => {
// // // // //   console.log('New report submission attempt');
  
// // // // //   const connection = await pool.getConnection();
  
// // // // //   try {
// // // // //     await connection.beginTransaction();
    
// // // // //     const userId = req.user.user_id;
// // // // //     const { animal_type_id, animal_condition_id, description, location_address, user_note } = req.body;
    
// // // // //     console.log('Report data:', {
// // // // //       userId,
// // // // //       animal_type_id,
// // // // //       animal_condition_id,
// // // // //       description_length: description?.length,
// // // // //       location_address_length: location_address?.length,
// // // // //       user_note_length: user_note?.length
// // // // //     });
    
// // // // //     // Validate required fields
// // // // //     if (!animal_type_id || !animal_condition_id || !description || !location_address) {
// // // // //       console.log('Missing required fields');
// // // // //       return res.status(400).json({
// // // // //         success: false,
// // // // //         message: 'All fields are required: animal type, condition, description, and location'
// // // // //       });
// // // // //     }
    
// // // // //     // Validate description length
// // // // //     if (description.trim().length < 10) {
// // // // //       return res.status(400).json({
// // // // //         success: false,
// // // // //         message: 'Description must be at least 10 characters long'
// // // // //       });
// // // // //     }
    
// // // // //     // Validate location length
// // // // //     if (location_address.trim().length < 5) {
// // // // //       return res.status(400).json({
// // // // //         success: false,
// // // // //         message: 'Location must be at least 5 characters long'
// // // // //       });
// // // // //     }
    
// // // // //     // Insert report into database
// // // // //     console.log('Inserting report into database...');
// // // // //     const [result] = await connection.execute(
// // // // //       `INSERT INTO reports 
// // // // //        (user_id, animal_type_id, animal_condition_id, description, 
// // // // //         location_address, status_id, user_note, submitted_at, is_deleted) 
// // // // //        VALUES (?, ?, ?, ?, ?, 1, ?, NOW(), 0)`,
// // // // //       [
// // // // //         userId, 
// // // // //         animal_type_id, 
// // // // //         animal_condition_id, 
// // // // //         description.trim(), 
// // // // //         location_address.trim(), 
// // // // //         user_note ? user_note.trim() : ''
// // // // //       ]
// // // // //     );
    
// // // // //     await connection.commit();
    
// // // // //     const reportId = result.insertId;
// // // // //     console.log(`Report #${reportId} submitted successfully`);
    
// // // // //     // Get the inserted report with animal info
// // // // //     let reportDetails = {};
// // // // //     try {
// // // // //       const [report] = await connection.execute(`
// // // // //         SELECT 
// // // // //           r.report_id,
// // // // //           r.description,
// // // // //           r.location_address,
// // // // //           r.user_note,
// // // // //           DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// // // // //           at.type_name as animal_type,
// // // // //           ac.condition_name as animal_condition,
// // // // //           r.status_id
// // // // //         FROM reports r
// // // // //         LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // // // //         LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // // // //         WHERE r.report_id = ?
// // // // //       `, [reportId]);
      
// // // // //       if (report.length > 0) {
// // // // //         reportDetails = report[0];
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.log('Could not fetch report details:', error.message);
// // // // //     }
    
// // // // //     res.json({
// // // // //       success: true,
// // // // //       message: 'Report submitted successfully! Our team will review it soon.',
// // // // //       report_id: reportId,
// // // // //       report: reportDetails
// // // // //     });
    
// // // // //   } catch (error) {
// // // // //     await connection.rollback();
// // // // //     console.error('Error submitting report:', error);
    
// // // // //     // Handle specific database errors
// // // // //     let errorMessage = 'Failed to submit report';
// // // // //     if (error.code === 'ER_NO_SUCH_TABLE') {
// // // // //       errorMessage = 'Database tables not found. Please contact administrator.';
// // // // //     } else if (error.code === 'ER_DUP_ENTRY') {
// // // // //       errorMessage = 'Duplicate entry detected.';
// // // // //     }
    
// // // // //     res.status(500).json({
// // // // //       success: false,
// // // // //       message: errorMessage,
// // // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // // //     });
    
// // // // //   } finally {
// // // // //     connection.release();
// // // // //   }
// // // // // });

// // // // // /* =====================================================
// // // // //    GET USER'S REPORTS (PROTECTED) - FIXED VERSION
// // // // // ===================================================== */
// // // // // router.get('/my-reports', verifyToken, async (req, res) => {
// // // // //   const userId = req.user.user_id;
// // // // //   console.log(`Fetching reports for user: ${userId}`);
  
// // // // //   try {
// // // // //     const [reports] = await pool.execute(`
// // // // //       SELECT 
// // // // //         r.report_id,
// // // // //         r.user_id,  /* CRITICAL FIX: This field was missing! */
// // // // //         r.description,
// // // // //         r.location_address,
// // // // //         r.user_note,
// // // // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// // // // //         at.type_name as animal_type,
// // // // //         ac.condition_name as animal_condition,
// // // // //         r.status_id
// // // // //       FROM reports r
// // // // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // // // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // // // //       WHERE r.user_id = ? AND r.is_deleted = 0
// // // // //       ORDER BY r.submitted_at DESC
// // // // //     `, [userId]);
    
// // // // //     console.log(`Found ${reports.length} reports for user ${userId}`);
    
// // // // //     // Debug: Check what's being returned
// // // // //     if (reports.length > 0) {
// // // // //       console.log('Sample report data:', {
// // // // //         report_id: reports[0].report_id,
// // // // //         user_id: reports[0].user_id,
// // // // //         animal_type: reports[0].animal_type
// // // // //       });
// // // // //     }
    
// // // // //     res.json({
// // // // //       success: true,
// // // // //       data: reports,
// // // // //       count: reports.length
// // // // //     });
    
// // // // //   } catch (error) {
// // // // //     console.error('Error fetching user reports:', error);
    
// // // // //     res.status(500).json({
// // // // //       success: false,
// // // // //       message: 'Failed to fetch user reports',
// // // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // // //     });
// // // // //   }
// // // // // });

// // // // // /* =====================================================
// // // // //    GET SINGLE REPORT (PROTECTED - OWNER OR ADMIN)
// // // // // ===================================================== */
// // // // // router.get('/:id', verifyToken, async (req, res) => {
// // // // //   const reportId = Number(req.params.id);
// // // // //   const userId = req.user.user_id;
  
// // // // //   if (!reportId) {
// // // // //     return res.status(400).json({
// // // // //       success: false,
// // // // //       message: 'Invalid report ID'
// // // // //     });
// // // // //   }
  
// // // // //   console.log(`Fetching report #${reportId} for user ${userId}`);
  
// // // // //   try {
// // // // //     const [reports] = await pool.execute(`
// // // // //       SELECT 
// // // // //         r.report_id,
// // // // //         r.user_id,
// // // // //         r.description,
// // // // //         r.location_address,
// // // // //         r.user_note,
// // // // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// // // // //         at.type_name as animal_type,
// // // // //         ac.condition_name as animal_condition,
// // // // //         r.status_id
// // // // //       FROM reports r
// // // // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // // // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // // // //       WHERE r.report_id = ? AND r.is_deleted = 0
// // // // //     `, [reportId]);
    
// // // // //     if (reports.length === 0) {
// // // // //       return res.status(404).json({
// // // // //         success: false,
// // // // //         message: 'Report not found'
// // // // //       });
// // // // //     }
    
// // // // //     const report = reports[0];
    
// // // // //     // Check permissions: user must be report owner or admin
// // // // //     if (report.user_id !== userId && req.user.role_id !== 3) {
// // // // //       return res.status(403).json({
// // // // //         success: false,
// // // // //         message: 'Forbidden: You can only view your own reports'
// // // // //       });
// // // // //     }
    
// // // // //     res.json({
// // // // //       success: true,
// // // // //       data: report
// // // // //     });
    
// // // // //   } catch (error) {
// // // // //     console.error('Error fetching report:', error);
    
// // // // //     res.status(500).json({
// // // // //       success: false,
// // // // //       message: 'Failed to fetch report',
// // // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // // //     });
// // // // //   }
// // // // // });

// // // // // /* =====================================================
// // // // //    UPDATE REPORT (PROTECTED - OWNER ONLY)
// // // // // ===================================================== */
// // // // // router.patch('/:id', verifyToken, async (req, res) => {
// // // // //   const reportId = Number(req.params.id);
// // // // //   const userId = req.user.user_id;
// // // // //   const { description, location_address, user_note } = req.body;
  
// // // // //   if (!reportId) {
// // // // //     return res.status(400).json({
// // // // //       success: false,
// // // // //       message: 'Invalid report ID'
// // // // //     });
// // // // //   }
  
// // // // //   console.log(`Updating report #${reportId} for user ${userId}`);
  
// // // // //   try {
// // // // //     // First check if report exists and belongs to user
// // // // //     const [reportCheck] = await pool.execute(
// // // // //       'SELECT user_id, status_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// // // // //       [reportId]
// // // // //     );
    
// // // // //     if (reportCheck.length === 0) {
// // // // //       return res.status(404).json({
// // // // //         success: false,
// // // // //         message: 'Report not found'
// // // // //       });
// // // // //     }
    
// // // // //     // Check ownership (only owner can update)
// // // // //     if (reportCheck[0].user_id !== userId) {
// // // // //       return res.status(403).json({
// // // // //         success: false,
// // // // //         message: 'Forbidden: You can only update your own reports'
// // // // //       });
// // // // //     }
    
// // // // //     // Check if report is still editable (only pending reports can be edited)
// // // // //     if (reportCheck[0].status_id !== 1) {
// // // // //       return res.status(400).json({
// // // // //         success: false,
// // // // //         message: 'Report cannot be edited after it has been reviewed'
// // // // //       });
// // // // //     }
    
// // // // //     // Build update fields
// // // // //     const updateFields = [];
// // // // //     const updateValues = [];
    
// // // // //     if (description !== undefined) {
// // // // //       if (description.trim().length < 10) {
// // // // //         return res.status(400).json({
// // // // //           success: false,
// // // // //           message: 'Description must be at least 10 characters'
// // // // //         });
// // // // //       }
// // // // //       updateFields.push('description = ?');
// // // // //       updateValues.push(description.trim());
// // // // //     }
    
// // // // //     if (location_address !== undefined) {
// // // // //       if (location_address.trim().length < 5) {
// // // // //         return res.status(400).json({
// // // // //           success: false,
// // // // //           message: 'Location must be at least 5 characters'
// // // // //         });
// // // // //       }
// // // // //       updateFields.push('location_address = ?');
// // // // //       updateValues.push(location_address.trim());
// // // // //     }
    
// // // // //     if (user_note !== undefined) {
// // // // //       updateFields.push('user_note = ?');
// // // // //       updateValues.push(user_note ? user_note.trim() : null);
// // // // //     }
    
// // // // //     if (updateFields.length === 0) {
// // // // //       return res.status(400).json({
// // // // //         success: false,
// // // // //         message: 'No fields to update'
// // // // //       });
// // // // //     }
    
// // // // //     updateValues.push(reportId);
    
// // // // //     const updateQuery = `
// // // // //       UPDATE reports
// // // // //       SET ${updateFields.join(', ')}
// // // // //       WHERE report_id = ? AND is_deleted = 0
// // // // //     `;
    
// // // // //     await pool.execute(updateQuery, updateValues);
    
// // // // //     // Fetch updated report
// // // // //     const [updatedReport] = await pool.execute(`
// // // // //       SELECT 
// // // // //         r.report_id,
// // // // //         r.description,
// // // // //         r.location_address,
// // // // //         r.user_note,
// // // // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// // // // //         at.type_name as animal_type,
// // // // //         ac.condition_name as animal_condition,
// // // // //         r.status_id
// // // // //       FROM reports r
// // // // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // // // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // // // //       WHERE r.report_id = ?
// // // // //     `, [reportId]);
    
// // // // //     res.json({
// // // // //       success: true,
// // // // //       message: 'Report updated successfully',
// // // // //       data: updatedReport[0]
// // // // //     });
    
// // // // //   } catch (error) {
// // // // //     console.error('Error updating report:', error);
    
// // // // //     res.status(500).json({
// // // // //       success: false,
// // // // //       message: 'Failed to update report',
// // // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // // //     });
// // // // //   }
// // // // // });

// // // // // /* =====================================================
// // // // //    DELETE REPORT (PROTECTED - OWNER ONLY - SOFT DELETE)
// // // // // ===================================================== */
// // // // // router.delete('/:id', verifyToken, async (req, res) => {
// // // // //   const reportId = Number(req.params.id);
// // // // //   const userId = req.user.user_id;
  
// // // // //   if (!reportId) {
// // // // //     return res.status(400).json({
// // // // //       success: false,
// // // // //       message: 'Invalid report ID'
// // // // //     });
// // // // //   }
  
// // // // //   console.log(`Deleting report #${reportId} for user ${userId}`);
  
// // // // //   const connection = await pool.getConnection();
  
// // // // //   try {
// // // // //     await connection.beginTransaction();
    
// // // // //     // Check if report exists and belongs to user
// // // // //     const [reportCheck] = await connection.execute(
// // // // //       'SELECT user_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// // // // //       [reportId]
// // // // //     );
    
// // // // //     if (reportCheck.length === 0) {
// // // // //       return res.status(404).json({
// // // // //         success: false,
// // // // //         message: 'Report not found'
// // // // //       });
// // // // //     }
    
// // // // //     // Check ownership (only owner can delete, or admin)
// // // // //     if (reportCheck[0].user_id !== userId && req.user.role_id !== 3) {
// // // // //       return res.status(403).json({
// // // // //         success: false,
// // // // //         message: 'Forbidden: You can only delete your own reports'
// // // // //       });
// // // // //     }
    
// // // // //     // Soft delete report
// // // // //     await connection.execute(
// // // // //       'UPDATE reports SET is_deleted = 1 WHERE report_id = ?',
// // // // //       [reportId]
// // // // //     );
    
// // // // //     await connection.commit();
    
// // // // //     res.json({
// // // // //       success: true,
// // // // //       message: 'Report deleted successfully',
// // // // //       report_id: reportId
// // // // //     });
    
// // // // //   } catch (error) {
// // // // //     await connection.rollback();
// // // // //     console.error('Error deleting report:', error);
    
// // // // //     res.status(500).json({
// // // // //       success: false,
// // // // //       message: 'Failed to delete report',
// // // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // // //     });
    
// // // // //   } finally {
// // // // //     connection.release();
// // // // //   }
// // // // // });

// // // // // /* =====================================================
// // // // //    GET ALL REPORTS (ADMIN ONLY)
// // // // // ===================================================== */
// // // // // router.get('/admin/all', verifyToken, async (req, res) => {
// // // // //   try {
// // // // //     // Admin check
// // // // //     if (req.user.role_id !== 3) {
// // // // //       return res.status(403).json({
// // // // //         success: false,
// // // // //         message: 'Forbidden: Admin access required'
// // // // //       });
// // // // //     }
    
// // // // //     const [reports] = await pool.execute(`
// // // // //       SELECT 
// // // // //         r.report_id,
// // // // //         r.user_id,
// // // // //         r.description,
// // // // //         r.location_address,
// // // // //         r.user_note,
// // // // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// // // // //         at.type_name as animal_type,
// // // // //         ac.condition_name as animal_condition,
// // // // //         r.status_id,
// // // // //         u.username as reporter_name
// // // // //       FROM reports r
// // // // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // // // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // // // //       LEFT JOIN users u ON r.user_id = u.user_id
// // // // //       WHERE r.is_deleted = 0
// // // // //       ORDER BY r.submitted_at DESC
// // // // //     `);
    
// // // // //     console.log(`Admin: Found ${reports.length} total reports`);
    
// // // // //     res.json({
// // // // //       success: true,
// // // // //       data: reports,
// // // // //       count: reports.length
// // // // //     });
    
// // // // //   } catch (error) {
// // // // //     console.error('Error fetching all reports:', error);
    
// // // // //     res.status(500).json({
// // // // //       success: false,
// // // // //       message: 'Failed to fetch reports',
// // // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // // //     });
// // // // //   }
// // // // // });

// // // // // /* =====================================================
// // // // //    UPDATE REPORT STATUS (ADMIN ONLY)
// // // // // ===================================================== */
// // // // // router.patch('/:id/status', verifyToken, async (req, res) => {
// // // // //   const reportId = Number(req.params.id);
// // // // //   const { status_id } = req.body;
  
// // // // //   if (!reportId) {
// // // // //     return res.status(400).json({
// // // // //       success: false,
// // // // //       message: 'Invalid report ID'
// // // // //     });
// // // // //   }
  
// // // // //   if (!status_id || (status_id < 1 || status_id > 5)) {
// // // // //     return res.status(400).json({
// // // // //       success: false,
// // // // //       message: 'Invalid status ID. Must be between 1 and 5'
// // // // //     });
// // // // //   }
  
// // // // //   console.log(`Admin updating report #${reportId} status to ${status_id}`);
  
// // // // //   try {
// // // // //     // Admin check
// // // // //     if (req.user.role_id !== 3) {
// // // // //       return res.status(403).json({
// // // // //         success: false,
// // // // //         message: 'Forbidden: Admin access required'
// // // // //       });
// // // // //     }
    
// // // // //     // Check if report exists
// // // // //     const [reportCheck] = await pool.execute(
// // // // //       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// // // // //       [reportId]
// // // // //     );
    
// // // // //     if (reportCheck.length === 0) {
// // // // //       return res.status(404).json({
// // // // //         success: false,
// // // // //         message: 'Report not found'
// // // // //       });
// // // // //     }
    
// // // // //     // Update status
// // // // //     await pool.execute(
// // // // //       'UPDATE reports SET status_id = ? WHERE report_id = ?',
// // // // //       [status_id, reportId]
// // // // //     );
    
// // // // //     // Get updated report
// // // // //     const [updatedReport] = await pool.execute(`
// // // // //       SELECT 
// // // // //         r.report_id,
// // // // //         r.description,
// // // // //         r.status_id,
// // // // //         u.username as reporter_name
// // // // //       FROM reports r
// // // // //       LEFT JOIN users u ON r.user_id = u.user_id
// // // // //       WHERE r.report_id = ?
// // // // //     `, [reportId]);
    
// // // // //     res.json({
// // // // //       success: true,
// // // // //       message: 'Report status updated successfully',
// // // // //       data: updatedReport[0]
// // // // //     });
    
// // // // //   } catch (error) {
// // // // //     console.error('Error updating report status:', error);
    
// // // // //     res.status(500).json({
// // // // //       success: false,
// // // // //       message: 'Failed to update report status',
// // // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // // //     });
// // // // //   }
// // // // // });

// // // // // /* =====================================================
// // // // //    TEST ENDPOINT (PUBLIC - FOR FRONTEND CONNECTION TEST)
// // // // // ===================================================== */
// // // // // router.get('/test', (req, res) => {
// // // // //   console.log('Test endpoint hit from frontend');
// // // // //   res.json({
// // // // //     success: true,
// // // // //     message: 'Report API test endpoint is working',
// // // // //     timestamp: new Date().toISOString(),
// // // // //     endpoints: {
// // // // //       animal_types: '/api/reports/animal-types (GET, protected)',
// // // // //       animal_conditions: '/api/reports/animal-conditions (GET, protected)',
// // // // //       submit: '/api/reports/submit (POST, protected)',
// // // // //       my_reports: '/api/reports/my-reports (GET, protected)'
// // // // //     }
// // // // //   });
// // // // // });

// // // // // module.exports = router;

// // // // const express = require('express');
// // // // const router = express.Router();
// // // // const verifyToken = require('../middleware/auth');
// // // // const mysql = require('mysql2/promise');
// // // // require('dotenv').config();

// // // // // MySQL pool configuration
// // // // const pool = mysql.createPool({
// // // //   host: process.env.DB_HOST || 'localhost',
// // // //   user: process.env.DB_USER || 'root',
// // // //   password: process.env.DB_PASSWORD || '',
// // // //   database: process.env.DB_NAME || 'animal_rescue_system',
// // // //   waitForConnections: true,
// // // //   connectionLimit: 10,
// // // //   queueLimit: 0
// // // // });

// // // // console.log('Report routes initialized');

// // // // /* =====================================================
// // // //    PUBLIC ENDPOINTS - NO AUTH REQUIRED
// // // // ===================================================== */

// // // // // Health check endpoint
// // // // router.get('/health', (req, res) => {
// // // //   console.log('Health check endpoint accessed');
// // // //   res.json({
// // // //     success: true,
// // // //     message: 'Report API is running',
// // // //     timestamp: new Date().toISOString(),
// // // //     status: 'online'
// // // //   });
// // // // });

// // // // /* =====================================================
// // // //    GET ANIMAL TYPES (PROTECTED)
// // // // ===================================================== */
// // // // router.get('/animal-types', verifyToken, async (req, res) => {
// // // //   console.log('Fetching animal types for user:', req.user.user_id);
  
// // // //   try {
// // // //     const [rows] = await pool.execute(
// // // //       'SELECT type_id, type_name FROM animal_types ORDER BY type_name'
// // // //     );
    
// // // //     console.log(`Found ${rows.length} animal types`);
    
// // // //     res.json({
// // // //       success: true,
// // // //       data: rows
// // // //     });
    
// // // //   } catch (error) {
// // // //     console.error('Error fetching animal types:', error);
    
// // // //     // Return fallback data
// // // //     const fallbackData = [
// // // //       { type_id: 1, type_name: 'Dog' },
// // // //       { type_id: 2, type_name: 'Cat' },
// // // //       { type_id: 3, type_name: 'Bird' },
// // // //       { type_id: 4, type_name: 'Rabbit' },
// // // //       { type_id: 5, type_name: 'Hamster' },
// // // //       { type_id: 6, type_name: 'Turtle' },
// // // //       { type_id: 7, type_name: 'Horse' },
// // // //       { type_id: 8, type_name: 'Cow' },
// // // //       { type_id: 9, type_name: 'Goat' },
// // // //       { type_id: 10, type_name: 'Sheep' },
// // // //       { type_id: 11, type_name: 'Other' }
// // // //     ];
    
// // // //     res.json({
// // // //       success: true,
// // // //       data: fallbackData,
// // // //       message: 'Using fallback data due to database error'
// // // //     });
// // // //   }
// // // // });

// // // // /* =====================================================
// // // //    GET ANIMAL CONDITIONS (PROTECTED)
// // // // ===================================================== */
// // // // router.get('/animal-conditions', verifyToken, async (req, res) => {
// // // //   console.log('Fetching animal conditions for user:', req.user.user_id);
  
// // // //   try {
// // // //     const [rows] = await pool.execute(
// // // //       'SELECT condition_id, condition_name FROM animal_conditions ORDER BY condition_name'
// // // //     );
    
// // // //     console.log(`Found ${rows.length} animal conditions`);
    
// // // //     res.json({
// // // //       success: true,
// // // //       data: rows
// // // //     });
    
// // // //   } catch (error) {
// // // //     console.error('Error fetching animal conditions:', error);
    
// // // //     // Return fallback data
// // // //     const fallbackData = [
// // // //       { condition_id: 1, condition_name: 'Injured' },
// // // //       { condition_id: 2, condition_name: 'Sick' },
// // // //       { condition_id: 3, condition_name: 'Abandoned' }
// // // //     ];
    
// // // //     res.json({
// // // //       success: true,
// // // //       data: fallbackData,
// // // //       message: 'Using fallback data due to database error'
// // // //     });
// // // //   }
// // // // });

// // // // /* =====================================================
// // // //    SUBMIT REPORT (PROTECTED)
// // // // ===================================================== */
// // // // router.post('/submit', verifyToken, async (req, res) => {
// // // //   console.log('New report submission attempt');
  
// // // //   const connection = await pool.getConnection();
  
// // // //   try {
// // // //     await connection.beginTransaction();
    
// // // //     const userId = req.user.user_id;
// // // //     const { animal_type_id, animal_condition_id, description, location_address, user_note } = req.body;
    
// // // //     console.log('Report data:', {
// // // //       userId,
// // // //       animal_type_id,
// // // //       animal_condition_id,
// // // //       description_length: description?.length,
// // // //       location_address_length: location_address?.length,
// // // //       user_note_length: user_note?.length
// // // //     });
    
// // // //     // Validate required fields
// // // //     if (!animal_type_id || !animal_condition_id || !description || !location_address) {
// // // //       console.log('Missing required fields');
// // // //       return res.status(400).json({
// // // //         success: false,
// // // //         message: 'All fields are required: animal type, condition, description, and location'
// // // //       });
// // // //     }
    
// // // //     // Validate description length
// // // //     if (description.trim().length < 10) {
// // // //       return res.status(400).json({
// // // //         success: false,
// // // //         message: 'Description must be at least 10 characters long'
// // // //       });
// // // //     }
    
// // // //     // Validate location length
// // // //     if (location_address.trim().length < 5) {
// // // //       return res.status(400).json({
// // // //         success: false,
// // // //         message: 'Location must be at least 5 characters long'
// // // //       });
// // // //     }
    
// // // //     // Insert report into database
// // // //     console.log('Inserting report into database...');
// // // //     const [result] = await connection.execute(
// // // //       `INSERT INTO reports 
// // // //        (user_id, animal_type_id, animal_condition_id, description, 
// // // //         location_address, status_id, user_note, submitted_at, is_deleted) 
// // // //        VALUES (?, ?, ?, ?, ?, 1, ?, NOW(), 0)`,
// // // //       [
// // // //         userId, 
// // // //         animal_type_id, 
// // // //         animal_condition_id, 
// // // //         description.trim(), 
// // // //         location_address.trim(), 
// // // //         user_note ? user_note.trim() : ''
// // // //       ]
// // // //     );
    
// // // //     await connection.commit();
    
// // // //     const reportId = result.insertId;
// // // //     console.log(`Report #${reportId} submitted successfully`);
    
// // // //     // Get the inserted report with animal info
// // // //     let reportDetails = {};
// // // //     try {
// // // //       const [report] = await connection.execute(`
// // // //         SELECT 
// // // //           r.report_id,
// // // //           r.description,
// // // //           r.location_address,
// // // //           r.user_note,
// // // //           DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// // // //           at.type_name as animal_type,
// // // //           ac.condition_name as animal_condition,
// // // //           r.status_id
// // // //         FROM reports r
// // // //         LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // // //         LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // // //         WHERE r.report_id = ?
// // // //       `, [reportId]);
      
// // // //       if (report.length > 0) {
// // // //         reportDetails = report[0];
// // // //       }
// // // //     } catch (error) {
// // // //       console.log('Could not fetch report details:', error.message);
// // // //     }
    
// // // //     res.json({
// // // //       success: true,
// // // //       message: 'Report submitted successfully! Our team will review it soon.',
// // // //       report_id: reportId,
// // // //       report: reportDetails
// // // //     });
    
// // // //   } catch (error) {
// // // //     await connection.rollback();
// // // //     console.error('Error submitting report:', error);
    
// // // //     // Handle specific database errors
// // // //     let errorMessage = 'Failed to submit report';
// // // //     if (error.code === 'ER_NO_SUCH_TABLE') {
// // // //       errorMessage = 'Database tables not found. Please contact administrator.';
// // // //     } else if (error.code === 'ER_DUP_ENTRY') {
// // // //       errorMessage = 'Duplicate entry detected.';
// // // //     }
    
// // // //     res.status(500).json({
// // // //       success: false,
// // // //       message: errorMessage,
// // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // //     });
    
// // // //   } finally {
// // // //     connection.release();
// // // //   }
// // // // });

// // // // /* =====================================================
// // // //    GET USER'S REPORTS (PROTECTED) - FIXED WITH DEBUG INFO
// // // // ===================================================== */
// // // // router.get('/my-reports', verifyToken, async (req, res) => {
// // // //   const userId = req.user.user_id;
// // // //   console.log(`=== FETCHING REPORTS FOR USER ID: ${userId} ===`);
  
// // // //   try {
// // // //     // First, check what reports exist for this user (including deleted ones for debugging)
// // // //     const [allReports] = await pool.execute(`
// // // //       SELECT 
// // // //         r.report_id,
// // // //         r.user_id,
// // // //         r.description,
// // // //         r.is_deleted,
// // // //         r.status_id
// // // //       FROM reports r
// // // //       WHERE r.user_id = ?
// // // //       ORDER BY r.submitted_at DESC
// // // //     `, [userId]);
    
// // // //     console.log(`Total reports found (including deleted): ${allReports.length}`);
// // // //     allReports.forEach(report => {
// // // //       console.log(`Report ID ${report.report_id}: deleted=${report.is_deleted}, status=${report.status_id}`);
// // // //     });
    
// // // //     // Now get only non-deleted reports with full details
// // // //     const [reports] = await pool.execute(`
// // // //       SELECT 
// // // //         r.report_id,
// // // //         r.user_id,
// // // //         r.description,
// // // //         r.location_address,
// // // //         r.user_note,
// // // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// // // //         at.type_name as animal_type,
// // // //         ac.condition_name as animal_condition,
// // // //         r.status_id,
// // // //         r.is_deleted
// // // //       FROM reports r
// // // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // // //       WHERE r.user_id = ? AND r.is_deleted = 0
// // // //       ORDER BY r.submitted_at DESC
// // // //     `, [userId]);
    
// // // //     console.log(`✅ Found ${reports.length} non-deleted reports for user ${userId}`);
    
// // // //     // Log each report for debugging
// // // //     reports.forEach(report => {
// // // //       console.log('Report details:', {
// // // //         id: report.report_id,
// // // //         type: report.animal_type,
// // // //         condition: report.animal_condition,
// // // //         status: report.status_id,
// // // //         date: report.submitted_at
// // // //       });
// // // //     });
    
// // // //     res.json({
// // // //       success: true,
// // // //       data: reports,
// // // //       count: reports.length
// // // //     });
    
// // // //   } catch (error) {
// // // //     console.error('❌ Error fetching user reports:', error);
    
// // // //     res.status(500).json({
// // // //       success: false,
// // // //       message: 'Failed to fetch user reports',
// // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // //     });
// // // //   }
// // // // });

// // // // /* =====================================================
// // // //    GET SINGLE REPORT (PROTECTED - OWNER OR ADMIN)
// // // // ===================================================== */
// // // // router.get('/:id', verifyToken, async (req, res) => {
// // // //   const reportId = Number(req.params.id);
// // // //   const userId = req.user.user_id;
  
// // // //   if (!reportId) {
// // // //     return res.status(400).json({
// // // //       success: false,
// // // //       message: 'Invalid report ID'
// // // //     });
// // // //   }
  
// // // //   console.log(`Fetching report #${reportId} for user ${userId}`);
  
// // // //   try {
// // // //     const [reports] = await pool.execute(`
// // // //       SELECT 
// // // //         r.report_id,
// // // //         r.user_id,
// // // //         r.description,
// // // //         r.location_address,
// // // //         r.user_note,
// // // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// // // //         at.type_name as animal_type,
// // // //         ac.condition_name as animal_condition,
// // // //         r.status_id
// // // //       FROM reports r
// // // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // // //       WHERE r.report_id = ? AND r.is_deleted = 0
// // // //     `, [reportId]);
    
// // // //     if (reports.length === 0) {
// // // //       return res.status(404).json({
// // // //         success: false,
// // // //         message: 'Report not found'
// // // //       });
// // // //     }
    
// // // //     const report = reports[0];
    
// // // //     // Check permissions: user must be report owner or admin
// // // //     if (report.user_id !== userId && req.user.role_id !== 3) {
// // // //       return res.status(403).json({
// // // //         success: false,
// // // //         message: 'Forbidden: You can only view your own reports'
// // // //       });
// // // //     }
    
// // // //     res.json({
// // // //       success: true,
// // // //       data: report
// // // //     });
    
// // // //   } catch (error) {
// // // //     console.error('Error fetching report:', error);
    
// // // //     res.status(500).json({
// // // //       success: false,
// // // //       message: 'Failed to fetch report',
// // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // //     });
// // // //   }
// // // // });

// // // // /* =====================================================
// // // //    UPDATE REPORT (PROTECTED - OWNER ONLY)
// // // // ===================================================== */
// // // // router.patch('/:id', verifyToken, async (req, res) => {
// // // //   const reportId = Number(req.params.id);
// // // //   const userId = req.user.user_id;
// // // //   const { description, location_address, user_note } = req.body;
  
// // // //   if (!reportId) {
// // // //     return res.status(400).json({
// // // //       success: false,
// // // //       message: 'Invalid report ID'
// // // //     });
// // // //   }
  
// // // //   console.log(`Updating report #${reportId} for user ${userId}`);
  
// // // //   try {
// // // //     // First check if report exists and belongs to user
// // // //     const [reportCheck] = await pool.execute(
// // // //       'SELECT user_id, status_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// // // //       [reportId]
// // // //     );
    
// // // //     if (reportCheck.length === 0) {
// // // //       return res.status(404).json({
// // // //         success: false,
// // // //         message: 'Report not found'
// // // //       });
// // // //     }
    
// // // //     // Check ownership (only owner can update)
// // // //     if (reportCheck[0].user_id !== userId) {
// // // //       return res.status(403).json({
// // // //         success: false,
// // // //         message: 'Forbidden: You can only update your own reports'
// // // //       });
// // // //     }
    
// // // //     // Check if report is still editable (only pending reports can be edited)
// // // //     if (reportCheck[0].status_id !== 1) {
// // // //       return res.status(400).json({
// // // //         success: false,
// // // //         message: 'Report cannot be edited after it has been reviewed'
// // // //       });
// // // //     }
    
// // // //     // Build update fields
// // // //     const updateFields = [];
// // // //     const updateValues = [];
    
// // // //     if (description !== undefined) {
// // // //       if (description.trim().length < 10) {
// // // //         return res.status(400).json({
// // // //           success: false,
// // // //           message: 'Description must be at least 10 characters'
// // // //         });
// // // //       }
// // // //       updateFields.push('description = ?');
// // // //       updateValues.push(description.trim());
// // // //     }
    
// // // //     if (location_address !== undefined) {
// // // //       if (location_address.trim().length < 5) {
// // // //         return res.status(400).json({
// // // //           success: false,
// // // //           message: 'Location must be at least 5 characters'
// // // //         });
// // // //       }
// // // //       updateFields.push('location_address = ?');
// // // //       updateValues.push(location_address.trim());
// // // //     }
    
// // // //     if (user_note !== undefined) {
// // // //       updateFields.push('user_note = ?');
// // // //       updateValues.push(user_note ? user_note.trim() : null);
// // // //     }
    
// // // //     if (updateFields.length === 0) {
// // // //       return res.status(400).json({
// // // //         success: false,
// // // //         message: 'No fields to update'
// // // //       });
// // // //     }
    
// // // //     updateValues.push(reportId);
    
// // // //     const updateQuery = `
// // // //       UPDATE reports
// // // //       SET ${updateFields.join(', ')}
// // // //       WHERE report_id = ? AND is_deleted = 0
// // // //     `;
    
// // // //     await pool.execute(updateQuery, updateValues);
    
// // // //     // Fetch updated report
// // // //     const [updatedReport] = await pool.execute(`
// // // //       SELECT 
// // // //         r.report_id,
// // // //         r.description,
// // // //         r.location_address,
// // // //         r.user_note,
// // // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// // // //         at.type_name as animal_type,
// // // //         ac.condition_name as animal_condition,
// // // //         r.status_id
// // // //       FROM reports r
// // // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // // //       WHERE r.report_id = ?
// // // //     `, [reportId]);
    
// // // //     res.json({
// // // //       success: true,
// // // //       message: 'Report updated successfully',
// // // //       data: updatedReport[0]
// // // //     });
    
// // // //   } catch (error) {
// // // //     console.error('Error updating report:', error);
    
// // // //     res.status(500).json({
// // // //       success: false,
// // // //       message: 'Failed to update report',
// // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // //     });
// // // //   }
// // // // });

// // // // /* =====================================================
// // // //    DELETE REPORT (PROTECTED - OWNER ONLY - SOFT DELETE)
// // // // ===================================================== */
// // // // router.delete('/:id', verifyToken, async (req, res) => {
// // // //   const reportId = Number(req.params.id);
// // // //   const userId = req.user.user_id;
  
// // // //   if (!reportId) {
// // // //     return res.status(400).json({
// // // //       success: false,
// // // //       message: 'Invalid report ID'
// // // //     });
// // // //   }
  
// // // //   console.log(`Deleting report #${reportId} for user ${userId}`);
  
// // // //   const connection = await pool.getConnection();
  
// // // //   try {
// // // //     await connection.beginTransaction();
    
// // // //     // Check if report exists and belongs to user
// // // //     const [reportCheck] = await connection.execute(
// // // //       'SELECT user_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// // // //       [reportId]
// // // //     );
    
// // // //     if (reportCheck.length === 0) {
// // // //       return res.status(404).json({
// // // //         success: false,
// // // //         message: 'Report not found'
// // // //       });
// // // //     }
    
// // // //     // Check ownership (only owner can delete, or admin)
// // // //     if (reportCheck[0].user_id !== userId && req.user.role_id !== 3) {
// // // //       return res.status(403).json({
// // // //         success: false,
// // // //         message: 'Forbidden: You can only delete your own reports'
// // // //       });
// // // //     }
    
// // // //     // Soft delete report
// // // //     await connection.execute(
// // // //       'UPDATE reports SET is_deleted = 1 WHERE report_id = ?',
// // // //       [reportId]
// // // //     );
    
// // // //     await connection.commit();
    
// // // //     res.json({
// // // //       success: true,
// // // //       message: 'Report deleted successfully',
// // // //       report_id: reportId
// // // //     });
    
// // // //   } catch (error) {
// // // //     await connection.rollback();
// // // //     console.error('Error deleting report:', error);
    
// // // //     res.status(500).json({
// // // //       success: false,
// // // //       message: 'Failed to delete report',
// // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // //     });
    
// // // //   } finally {
// // // //     connection.release();
// // // //   }
// // // // });

// // // // /* =====================================================
// // // //    GET ALL REPORTS (ADMIN ONLY)
// // // // ===================================================== */
// // // // router.get('/admin/all', verifyToken, async (req, res) => {
// // // //   try {
// // // //     // Admin check
// // // //     if (req.user.role_id !== 3) {
// // // //       return res.status(403).json({
// // // //         success: false,
// // // //         message: 'Forbidden: Admin access required'
// // // //       });
// // // //     }
    
// // // //     const [reports] = await pool.execute(`
// // // //       SELECT 
// // // //         r.report_id,
// // // //         r.user_id,
// // // //         r.description,
// // // //         r.location_address,
// // // //         r.user_note,
// // // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// // // //         at.type_name as animal_type,
// // // //         ac.condition_name as animal_condition,
// // // //         r.status_id,
// // // //         u.username as reporter_name
// // // //       FROM reports r
// // // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // // //       LEFT JOIN users u ON r.user_id = u.user_id
// // // //       WHERE r.is_deleted = 0
// // // //       ORDER BY r.submitted_at DESC
// // // //     `);
    
// // // //     console.log(`Admin: Found ${reports.length} total reports`);
    
// // // //     res.json({
// // // //       success: true,
// // // //       data: reports,
// // // //       count: reports.length
// // // //     });
    
// // // //   } catch (error) {
// // // //     console.error('Error fetching all reports:', error);
    
// // // //     res.status(500).json({
// // // //       success: false,
// // // //       message: 'Failed to fetch reports',
// // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // //     });
// // // //   }
// // // // });

// // // // /* =====================================================
// // // //    UPDATE REPORT STATUS (ADMIN ONLY)
// // // // ===================================================== */
// // // // router.patch('/:id/status', verifyToken, async (req, res) => {
// // // //   const reportId = Number(req.params.id);
// // // //   const { status_id } = req.body;
  
// // // //   if (!reportId) {
// // // //     return res.status(400).json({
// // // //       success: false,
// // // //       message: 'Invalid report ID'
// // // //     });
// // // //   }
  
// // // //   if (!status_id || (status_id < 1 || status_id > 5)) {
// // // //     return res.status(400).json({
// // // //       success: false,
// // // //       message: 'Invalid status ID. Must be between 1 and 5'
// // // //     });
// // // //   }
  
// // // //   console.log(`Admin updating report #${reportId} status to ${status_id}`);
  
// // // //   try {
// // // //     // Admin check
// // // //     if (req.user.role_id !== 3) {
// // // //       return res.status(403).json({
// // // //         success: false,
// // // //         message: 'Forbidden: Admin access required'
// // // //       });
// // // //     }
    
// // // //     // Check if report exists
// // // //     const [reportCheck] = await pool.execute(
// // // //       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// // // //       [reportId]
// // // //     );
    
// // // //     if (reportCheck.length === 0) {
// // // //       return res.status(404).json({
// // // //         success: false,
// // // //         message: 'Report not found'
// // // //       });
// // // //     }
    
// // // //     // Update status
// // // //     await pool.execute(
// // // //       'UPDATE reports SET status_id = ? WHERE report_id = ?',
// // // //       [status_id, reportId]
// // // //     );
    
// // // //     // Get updated report
// // // //     const [updatedReport] = await pool.execute(`
// // // //       SELECT 
// // // //         r.report_id,
// // // //         r.description,
// // // //         r.status_id,
// // // //         u.username as reporter_name
// // // //       FROM reports r
// // // //       LEFT JOIN users u ON r.user_id = u.user_id
// // // //       WHERE r.report_id = ?
// // // //     `, [reportId]);
    
// // // //     res.json({
// // // //       success: true,
// // // //       message: 'Report status updated successfully',
// // // //       data: updatedReport[0]
// // // //     });
    
// // // //   } catch (error) {
// // // //     console.error('Error updating report status:', error);
    
// // // //     res.status(500).json({
// // // //       success: false,
// // // //       message: 'Failed to update report status',
// // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // //     });
// // // //   }
// // // // });

// // // // /* =====================================================
// // // //    TEST ENDPOINT (PUBLIC - FOR FRONTEND CONNECTION TEST)
// // // // ===================================================== */
// // // // router.get('/test', (req, res) => {
// // // //   console.log('Test endpoint hit from frontend');
// // // //   res.json({
// // // //     success: true,
// // // //     message: 'Report API test endpoint is working',
// // // //     timestamp: new Date().toISOString(),
// // // //     endpoints: {
// // // //       animal_types: '/api/reports/animal-types (GET, protected)',
// // // //       animal_conditions: '/api/reports/animal-conditions (GET, protected)',
// // // //       submit: '/api/reports/submit (POST, protected)',
// // // //       my_reports: '/api/reports/my-reports (GET, protected)'
// // // //     }
// // // //   });
// // // // });

// // // // module.exports = router;

// // // const express = require('express');
// // // const router = express.Router();
// // // const verifyToken = require('../middleware/auth');
// // // const mysql = require('mysql2/promise');
// // // require('dotenv').config();

// // // const pool = mysql.createPool({
// // //   host: process.env.DB_HOST || 'localhost',
// // //   user: process.env.DB_USER || 'root',
// // //   password: process.env.DB_PASSWORD || '',
// // //   database: process.env.DB_NAME || 'animal_rescue_system',
// // //   waitForConnections: true,
// // //   connectionLimit: 10,
// // //   queueLimit: 0
// // // });

// // // console.log('Report routes initialized');

// // // router.get('/health', (req, res) => {
// // //   res.json({
// // //     success: true,
// // //     message: 'Report API is running',
// // //     timestamp: new Date().toISOString(),
// // //     status: 'online'
// // //   });
// // // });

// // // router.get('/animal-types', verifyToken, async (req, res) => {
// // //   try {
// // //     const [rows] = await pool.execute(
// // //       'SELECT type_id, type_name FROM animal_types ORDER BY type_name'
// // //     );
    
// // //     res.json({
// // //       success: true,
// // //       data: rows
// // //     });
    
// // //   } catch (error) {
// // //     const fallbackData = [
// // //       { type_id: 1, type_name: 'Dog' },
// // //       { type_id: 2, type_name: 'Cat' },
// // //       { type_id: 3, type_name: 'Bird' },
// // //       { type_id: 4, type_name: 'Rabbit' },
// // //       { type_id: 5, type_name: 'Hamster' },
// // //       { type_id: 6, type_name: 'Turtle' },
// // //       { type_id: 7, type_name: 'Horse' },
// // //       { type_id: 8, type_name: 'Cow' },
// // //       { type_id: 9, type_name: 'Goat' },
// // //       { type_id: 10, type_name: 'Sheep' },
// // //       { type_id: 11, type_name: 'Other' }
// // //     ];
    
// // //     res.json({
// // //       success: true,
// // //       data: fallbackData,
// // //       message: 'Using fallback data'
// // //     });
// // //   }
// // // });

// // // router.get('/animal-conditions', verifyToken, async (req, res) => {
// // //   try {
// // //     const [rows] = await pool.execute(
// // //       'SELECT condition_id, condition_name FROM animal_conditions ORDER BY condition_name'
// // //     );
    
// // //     res.json({
// // //       success: true,
// // //       data: rows
// // //     });
    
// // //   } catch (error) {
// // //     const fallbackData = [
// // //       { condition_id: 1, condition_name: 'Injured' },
// // //       { condition_id: 2, condition_name: 'Sick' },
// // //       { condition_id: 3, condition_name: 'Abandoned' }
// // //     ];
    
// // //     res.json({
// // //       success: true,
// // //       data: fallbackData,
// // //       message: 'Using fallback data'
// // //     });
// // //   }
// // // });

// // // router.post('/submit', verifyToken, async (req, res) => {
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     await connection.beginTransaction();
    
// // //     const userId = req.user.user_id;
// // //     const { animal_type_id, animal_condition_id, description, location_address } = req.body;
    
// // //     if (!animal_type_id || !animal_condition_id || !description || !location_address) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'All fields are required'
// // //       });
// // //     }
    
// // //     if (description.trim().length < 10) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Description must be at least 10 characters'
// // //       });
// // //     }
    
// // //     if (location_address.trim().length < 5) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Location must be at least 5 characters'
// // //       });
// // //     }
    
// // //     const [result] = await connection.execute(
// // //       `INSERT INTO reports 
// // //        (user_id, animal_type_id, animal_condition_id, description, 
// // //         location_address, status_id, submitted_at, is_deleted) 
// // //        VALUES (?, ?, ?, ?, ?, 1, NOW(), 0)`,
// // //       [
// // //         userId, 
// // //         animal_type_id, 
// // //         animal_condition_id, 
// // //         description.trim(), 
// // //         location_address.trim()
// // //       ]
// // //     );
    
// // //     await connection.commit();
    
// // //     const reportId = result.insertId;
    
// // //     let reportDetails = {};
// // //     try {
// // //       const [report] = await connection.execute(`
// // //         SELECT 
// // //           r.report_id,
// // //           r.description,
// // //           r.location_address,
// // //           DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// // //           at.type_name as animal_type,
// // //           ac.condition_name as animal_condition,
// // //           r.status_id,
// // //           u.username as reporter_name,
// // //           CAST(u.phone AS CHAR) AS reporter_phone,  -- FIXED: CAST to string
// // //           u.email
// // //         FROM reports r
// // //         LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // //         LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // //         LEFT JOIN users u ON r.user_id = u.user_id
// // //         WHERE r.report_id = ?
// // //       `, [reportId]);
      
// // //       if (report.length > 0) {
// // //         reportDetails = report[0];
// // //       }
// // //     } catch (error) {
// // //       console.log('Could not fetch report details:', error.message);
// // //     }
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Report submitted successfully',
// // //       report_id: reportId,
// // //       report: reportDetails
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
    
// // //     let errorMessage = 'Failed to submit report';
// // //     if (error.code === 'ER_NO_SUCH_TABLE') {
// // //       errorMessage = 'Database tables not found';
// // //     } else if (error.code === 'ER_DUP_ENTRY') {
// // //       errorMessage = 'Duplicate entry detected';
// // //     }
    
// // //     res.status(500).json({
// // //       success: false,
// // //       message: errorMessage,
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
    
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // /* =====================================================
// // //    GET USER'S REPORTS (PROTECTED) - FIXED WITH CAST
// // // ===================================================== */
// // // router.get('/my-reports', verifyToken, async (req, res) => {
// // //   const userId = req.user.user_id;
  
// // //   try {
// // //     console.log('FETCHING reports for user ID:', userId);
    
// // //     // FIXED: Cast phone as CHAR to ensure string type
// // //     const [reports] = await pool.execute(`
// // //       SELECT 
// // //         r.report_id,
// // //         r.user_id,
// // //         r.description,
// // //         r.location_address,
// // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// // //         at.type_name as animal_type,
// // //         ac.condition_name as animal_condition,
// // //         r.status_id,
// // //         u.username as reporter_name,
// // //         CAST(u.phone AS CHAR) AS reporter_phone,  -- FIXED: CAST to string
// // //         u.email
// // //       FROM reports r
// // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // //       LEFT JOIN users u ON r.user_id = u.user_id
// // //       WHERE r.user_id = ? AND r.is_deleted = 0
// // //       ORDER BY r.submitted_at DESC
// // //     `, [userId]);
    
// // //     console.log(`Found ${reports.length} reports for user ${userId}`);
    
// // //     if (reports.length > 0) {
// // //       console.log('First report phone:', reports[0].reporter_phone);
// // //       console.log('Type of phone:', typeof reports[0].reporter_phone);
// // //     }
    
// // //     res.json({
// // //       success: true,
// // //       data: reports,
// // //       count: reports.length
// // //     });
    
// // //   } catch (error) {
// // //     console.error('Error fetching user reports:', error);
    
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch user reports',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // router.get('/:id', verifyToken, async (req, res) => {
// // //   const reportId = Number(req.params.id);
// // //   const userId = req.user.user_id;
  
// // //   if (!reportId) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid report ID'
// // //     });
// // //   }
  
// // //   try {
// // //     const [reports] = await pool.execute(`
// // //       SELECT 
// // //         r.report_id,
// // //         r.user_id,
// // //         r.description,
// // //         r.location_address,
// // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// // //         at.type_name as animal_type,
// // //         ac.condition_name as animal_condition,
// // //         r.status_id,
// // //         u.username as reporter_name,
// // //         CAST(u.phone AS CHAR) AS reporter_phone,  -- FIXED: CAST to string
// // //         u.email
// // //       FROM reports r
// // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // //       LEFT JOIN users u ON r.user_id = u.user_id
// // //       WHERE r.report_id = ? AND r.is_deleted = 0
// // //     `, [reportId]);
    
// // //     if (reports.length === 0) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Report not found'
// // //       });
// // //     }
    
// // //     const report = reports[0];
    
// // //     if (report.user_id !== userId && req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: You can only view your own reports'
// // //       });
// // //     }
    
// // //     res.json({
// // //       success: true,
// // //       data: report
// // //     });
    
// // //   } catch (error) {
// // //     console.error('Error fetching report:', error);
    
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch report',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // router.patch('/:id', verifyToken, async (req, res) => {
// // //   const reportId = Number(req.params.id);
// // //   const userId = req.user.user_id;
// // //   const { description, location_address } = req.body;
  
// // //   if (!reportId) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid report ID'
// // //     });
// // //   }
  
// // //   try {
// // //     const [reportCheck] = await pool.execute(
// // //       'SELECT user_id, status_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// // //       [reportId]
// // //     );
    
// // //     if (reportCheck.length === 0) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Report not found'
// // //       });
// // //     }
    
// // //     if (reportCheck[0].user_id !== userId) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: You can only update your own reports'
// // //       });
// // //     }
    
// // //     if (reportCheck[0].status_id !== 1) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Report cannot be edited after it has been reviewed'
// // //       });
// // //     }
    
// // //     const updateFields = [];
// // //     const updateValues = [];
    
// // //     if (description !== undefined) {
// // //       if (description.trim().length < 10) {
// // //         return res.status(400).json({
// // //           success: false,
// // //           message: 'Description must be at least 10 characters'
// // //         });
// // //       }
// // //       updateFields.push('description = ?');
// // //       updateValues.push(description.trim());
// // //     }
    
// // //     if (location_address !== undefined) {
// // //       if (location_address.trim().length < 5) {
// // //         return res.status(400).json({
// // //           success: false,
// // //           message: 'Location must be at least 5 characters'
// // //         });
// // //       }
// // //       updateFields.push('location_address = ?');
// // //       updateValues.push(location_address.trim());
// // //     }
    
// // //     if (updateFields.length === 0) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'No fields to update'
// // //       });
// // //     }
    
// // //     updateValues.push(reportId);
    
// // //     const updateQuery = `
// // //       UPDATE reports
// // //       SET ${updateFields.join(', ')}
// // //       WHERE report_id = ? AND is_deleted = 0
// // //     `;
    
// // //     await pool.execute(updateQuery, updateValues);
    
// // //     const [updatedReport] = await pool.execute(`
// // //       SELECT 
// // //         r.report_id,
// // //         r.description,
// // //         r.location_address,
// // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// // //         at.type_name as animal_type,
// // //         ac.condition_name as animal_condition,
// // //         r.status_id,
// // //         u.username as reporter_name,
// // //         CAST(u.phone AS CHAR) AS reporter_phone,  -- FIXED: CAST to string
// // //         u.email
// // //       FROM reports r
// // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // //       LEFT JOIN users u ON r.user_id = u.user_id
// // //       WHERE r.report_id = ?
// // //     `, [reportId]);
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Report updated successfully',
// // //       data: updatedReport[0]
// // //     });
    
// // //   } catch (error) {
// // //     console.error('Error updating report:', error);
    
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to update report',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // router.delete('/:id', verifyToken, async (req, res) => {
// // //   const reportId = Number(req.params.id);
// // //   const userId = req.user.user_id;
  
// // //   if (!reportId) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid report ID'
// // //     });
// // //   }
  
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     await connection.beginTransaction();
    
// // //     const [reportCheck] = await connection.execute(
// // //       'SELECT user_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// // //       [reportId]
// // //     );
    
// // //     if (reportCheck.length === 0) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Report not found'
// // //       });
// // //     }
    
// // //     if (reportCheck[0].user_id !== userId && req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: You can only delete your own reports'
// // //       });
// // //     }
    
// // //     await connection.execute(
// // //       'UPDATE reports SET is_deleted = 1 WHERE report_id = ?',
// // //       [reportId]
// // //     );
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Report deleted successfully',
// // //       report_id: reportId
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('Error deleting report:', error);
    
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to delete report',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
    
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // router.get('/admin/all', verifyToken, async (req, res) => {
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     const [reports] = await pool.execute(`
// // //       SELECT 
// // //         r.report_id,
// // //         r.user_id,
// // //         r.description,
// // //         r.location_address,
// // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// // //         at.type_name as animal_type,
// // //         ac.condition_name as animal_condition,
// // //         r.status_id,
// // //         u.username as reporter_name,
// // //         CAST(u.phone AS CHAR) AS reporter_phone,  -- FIXED: CAST to string
// // //         u.email
// // //       FROM reports r
// // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // //       LEFT JOIN users u ON r.user_id = u.user_id
// // //       WHERE r.is_deleted = 0
// // //       ORDER BY r.submitted_at DESC
// // //     `);
    
// // //     console.log(`Admin: Found ${reports.length} total reports`);
    
// // //     if (reports.length > 0) {
// // //       console.log('Sample admin report:', {
// // //         id: reports[0].report_id,
// // //         reporter_name: reports[0].reporter_name,
// // //         reporter_phone: reports[0].reporter_phone,
// // //         phone_type: typeof reports[0].reporter_phone
// // //       });
// // //     }
    
// // //     res.json({
// // //       success: true,
// // //       data: reports,
// // //       count: reports.length
// // //     });
    
// // //   } catch (error) {
// // //     console.error('Error fetching all reports:', error);
    
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch reports',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // router.patch('/:id/status', verifyToken, async (req, res) => {
// // //   const reportId = Number(req.params.id);
// // //   const { status_id } = req.body;
  
// // //   if (!reportId) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid report ID'
// // //     });
// // //   }
  
// // //   if (!status_id || (status_id < 1 || status_id > 5)) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid status ID'
// // //     });
// // //   }
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     const [reportCheck] = await pool.execute(
// // //       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// // //       [reportId]
// // //     );
    
// // //     if (reportCheck.length === 0) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Report not found'
// // //       });
// // //     }
    
// // //     await pool.execute(
// // //       'UPDATE reports SET status_id = ? WHERE report_id = ?',
// // //       [status_id, reportId]
// // //     );
    
// // //     const [updatedReport] = await pool.execute(`
// // //       SELECT 
// // //         r.report_id,
// // //         r.description,
// // //         r.status_id,
// // //         u.username as reporter_name,
// // //         CAST(u.phone AS CHAR) AS reporter_phone,  -- FIXED: CAST to string
// // //         u.email
// // //       FROM reports r
// // //       LEFT JOIN users u ON r.user_id = u.user_id
// // //       WHERE r.report_id = ?
// // //     `, [reportId]);
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Report status updated successfully',
// // //       data: updatedReport[0]
// // //     });
    
// // //   } catch (error) {
// // //     console.error('Error updating report status:', error);
    
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to update report status',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // router.get('/test', (req, res) => {
// // //   res.json({
// // //     success: true,
// // //     message: 'Report API test endpoint is working',
// // //     timestamp: new Date().toISOString()
// // //   });
// // // });

// // // module.exports = router;

// // const express = require('express');
// // const router = express.Router();
// // const verifyToken = require('../middleware/auth');
// // const mysql = require('mysql2/promise');
// // require('dotenv').config();

// // const pool = mysql.createPool({
// //   host: process.env.DB_HOST || 'localhost',
// //   user: process.env.DB_USER || 'root',
// //   password: process.env.DB_PASSWORD || '',
// //   database: process.env.DB_NAME || 'animal_rescue_system',
// //   waitForConnections: true,
// //   connectionLimit: 10,
// //   queueLimit: 0
// // });

// // console.log('Report routes initialized');

// // router.get('/health', (req, res) => {
// //   res.json({
// //     success: true,
// //     message: 'Report API is running',
// //     timestamp: new Date().toISOString(),
// //     status: 'online'
// //   });
// // });

// // router.get('/animal-types', verifyToken, async (req, res) => {
// //   try {
// //     const [rows] = await pool.execute(
// //       'SELECT type_id, type_name FROM animal_types ORDER BY type_name'
// //     );
    
// //     res.json({
// //       success: true,
// //       data: rows
// //     });
    
// //   } catch (error) {
// //     const fallbackData = [
// //       { type_id: 1, type_name: 'Dog' },
// //       { type_id: 2, type_name: 'Cat' },
// //       { type_id: 3, type_name: 'Bird' },
// //       { type_id: 4, type_name: 'Rabbit' },
// //       { type_id: 5, type_name: 'Hamster' },
// //       { type_id: 6, type_name: 'Turtle' },
// //       { type_id: 7, type_name: 'Horse' },
// //       { type_id: 8, type_name: 'Cow' },
// //       { type_id: 9, type_name: 'Goat' },
// //       { type_id: 10, type_name: 'Sheep' },
// //       { type_id: 11, type_name: 'Other' }
// //     ];
    
// //     res.json({
// //       success: true,
// //       data: fallbackData,
// //       message: 'Using fallback data'
// //     });
// //   }
// // });

// // router.get('/animal-conditions', verifyToken, async (req, res) => {
// //   try {
// //     const [rows] = await pool.execute(
// //       'SELECT condition_id, condition_name FROM animal_conditions ORDER BY condition_name'
// //     );
    
// //     res.json({
// //       success: true,
// //       data: rows
// //     });
    
// //   } catch (error) {
// //     const fallbackData = [
// //       { condition_id: 1, condition_name: 'Injured' },
// //       { condition_id: 2, condition_name: 'Sick' },
// //       { condition_id: 3, condition_name: 'Abandoned' }
// //     ];
    
// //     res.json({
// //       success: true,
// //       data: fallbackData,
// //       message: 'Using fallback data'
// //     });
// //   }
// // });

// // router.post('/submit', verifyToken, async (req, res) => {
// //   const connection = await pool.getConnection();
  
// //   try {
// //     await connection.beginTransaction();
    
// //     const userId = req.user.user_id;
// //     const { animal_type_id, animal_condition_id, description, location_address, user_note } = req.body;
    
// //     if (!animal_type_id || !animal_condition_id || !description || !location_address) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'All fields are required'
// //       });
// //     }
    
// //     if (description.trim().length < 10) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Description must be at least 10 characters'
// //       });
// //     }
    
// //     if (location_address.trim().length < 5) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Location must be at least 5 characters'
// //       });
// //     }
    
// //     const [result] = await connection.execute(
// //       `INSERT INTO reports 
// //        (user_id, animal_type_id, animal_condition_id, description, 
// //         location_address, status_id, user_note, submitted_at, is_deleted) 
// //        VALUES (?, ?, ?, ?, ?, 1, ?, NOW(), 0)`,
// //       [
// //         userId, 
// //         animal_type_id, 
// //         animal_condition_id, 
// //         description.trim(), 
// //         location_address.trim(),
// //         user_note ? user_note.trim() : null
// //       ]
// //     );
    
// //     await connection.commit();
    
// //     const reportId = result.insertId;
    
// //     let reportDetails = {};
// //     try {
// //       const [report] = await connection.execute(`
// //         SELECT 
// //           r.report_id,
// //           r.description,
// //           r.location_address,
// //           r.user_note,
// //           DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// //           at.type_name as animal_type,
// //           ac.condition_name as animal_condition,
// //           r.status_id,
// //           u.username as reporter_name,
// //           CAST(u.phone AS CHAR) AS reporter_phone,
// //           u.email
// //         FROM reports r
// //         LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// //         LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// //         LEFT JOIN users u ON r.user_id = u.user_id
// //         WHERE r.report_id = ?
// //       `, [reportId]);
      
// //       if (report.length > 0) {
// //         reportDetails = report[0];
// //       }
// //     } catch (error) {
// //       console.log('Could not fetch report details:', error.message);
// //     }
    
// //     res.json({
// //       success: true,
// //       message: 'Report submitted successfully',
// //       report_id: reportId,
// //       report: reportDetails
// //     });
    
// //   } catch (error) {
// //     await connection.rollback();
    
// //     let errorMessage = 'Failed to submit report';
// //     if (error.code === 'ER_NO_SUCH_TABLE') {
// //       errorMessage = 'Database tables not found';
// //     } else if (error.code === 'ER_DUP_ENTRY') {
// //       errorMessage = 'Duplicate entry detected';
// //     }
    
// //     res.status(500).json({
// //       success: false,
// //       message: errorMessage,
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
    
// //   } finally {
// //     connection.release();
// //   }
// // });

// // router.get('/my-reports', verifyToken, async (req, res) => {
// //   const userId = req.user.user_id;
  
// //   try {
// //     console.log('FETCHING reports for user ID:', userId);
    
// //     const [reports] = await pool.execute(`
// //       SELECT 
// //         r.report_id,
// //         r.user_id,
// //         r.description,
// //         r.location_address,
// //         r.user_note,
// //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// //         at.type_name as animal_type,
// //         ac.condition_name as animal_condition,
// //         r.status_id,
// //         COALESCE(u.username, 'Anonymous') as reporter_name,
// //         CAST(COALESCE(u.phone, 'No phone') AS CHAR) AS reporter_phone,
// //         COALESCE(u.email, 'No email') as email
// //       FROM reports r
// //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// //       LEFT JOIN users u ON r.user_id = u.user_id
// //       WHERE r.user_id = ? AND r.is_deleted = 0
// //       ORDER BY r.submitted_at DESC
// //     `, [userId]);
    
// //     console.log(`Found ${reports.length} reports for user ${userId}`);
    
// //     if (reports.length > 0) {
// //       console.log('First report details:', {
// //         id: reports[0].report_id,
// //         reporter_name: reports[0].reporter_name,
// //         reporter_phone: reports[0].reporter_phone,
// //         email: reports[0].email
// //       });
// //     }
    
// //     res.json({
// //       success: true,
// //       data: reports,
// //       count: reports.length
// //     });
    
// //   } catch (error) {
// //     console.error('Error fetching user reports:', error);
    
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to fetch user reports',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // router.get('/:id', verifyToken, async (req, res) => {
// //   const reportId = Number(req.params.id);
// //   const userId = req.user.user_id;
  
// //   if (!reportId) {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Invalid report ID'
// //     });
// //   }
  
// //   try {
// //     // First get the report details
// //     const [reports] = await pool.execute(`
// //       SELECT 
// //         r.report_id,
// //         r.user_id,
// //         r.description,
// //         r.location_address,
// //         r.user_note,
// //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// //         at.type_name as animal_type,
// //         ac.condition_name as animal_condition,
// //         r.status_id,
// //         COALESCE(u.username, 'Anonymous') as reporter_name,
// //         CAST(COALESCE(u.phone, 'No phone') AS CHAR) AS reporter_phone,
// //         COALESCE(u.email, 'No email') as email
// //       FROM reports r
// //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// //       LEFT JOIN users u ON r.user_id = u.user_id
// //       WHERE r.report_id = ? AND r.is_deleted = 0
// //     `, [reportId]);
    
// //     if (reports.length === 0) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Report not found'
// //       });
// //     }
    
// //     let report = reports[0];
    
// //     // Check if there's a task assigned to this report
// //     const [tasks] = await pool.execute(`
// //       SELECT 
// //         t.task_id,
// //         t.assigned_to_user_id,
// //         t.status_id as task_status_id,
// //         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
// //         v.username as volunteer_name,
// //         v.email as volunteer_email,
// //         CAST(v.phone AS CHAR) AS volunteer_phone
// //       FROM tasks t
// //       LEFT JOIN users v ON t.assigned_to_user_id = v.user_id
// //       WHERE t.report_id = ? AND t.is_deleted = 0
// //       ORDER BY t.assigned_at DESC
// //       LIMIT 1
// //     `, [reportId]);
    
// //     if (tasks.length > 0) {
// //       const task = tasks[0];
// //       report.volunteer_id = task.assigned_to_user_id;
// //       report.volunteer_name = task.volunteer_name;
// //       report.volunteer_email = task.volunteer_email;
// //       report.volunteer_phone = task.volunteer_phone;
// //       report.task_id = task.task_id;
// //       report.task_status_id = task.task_status_id;
// //       report.assigned_at = task.assigned_at;
// //     }
    
// //     // Get latest admin note
// //     const [adminNotes] = await pool.execute(`
// //       SELECT note_text, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at
// //       FROM admin_notes
// //       WHERE report_id = ?
// //       ORDER BY created_at DESC
// //       LIMIT 1
// //     `, [reportId]);
    
// //     if (adminNotes.length > 0) {
// //       report.admin_note = adminNotes[0].note_text;
// //     }
    
// //     // Check permissions: user must be report owner or admin
// //     if (report.user_id !== userId && req.user.role_id !== 3) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: You can only view your own reports'
// //       });
// //     }
    
// //     res.json({
// //       success: true,
// //       data: report
// //     });
    
// //   } catch (error) {
// //     console.error('Error fetching report:', error);
    
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to fetch report',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // router.patch('/:id', verifyToken, async (req, res) => {
// //   const reportId = Number(req.params.id);
// //   const userId = req.user.user_id;
// //   const { description, location_address, user_note } = req.body;
  
// //   if (!reportId) {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Invalid report ID'
// //     });
// //   }
  
// //   try {
// //     const [reportCheck] = await pool.execute(
// //       'SELECT user_id, status_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// //       [reportId]
// //     );
    
// //     if (reportCheck.length === 0) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Report not found'
// //       });
// //     }
    
// //     if (reportCheck[0].user_id !== userId) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: You can only update your own reports'
// //       });
// //     }
    
// //     if (reportCheck[0].status_id !== 1) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Report cannot be edited after it has been reviewed'
// //       });
// //     }
    
// //     const updateFields = [];
// //     const updateValues = [];
    
// //     if (description !== undefined) {
// //       if (description.trim().length < 10) {
// //         return res.status(400).json({
// //           success: false,
// //           message: 'Description must be at least 10 characters'
// //         });
// //       }
// //       updateFields.push('description = ?');
// //       updateValues.push(description.trim());
// //     }
    
// //     if (location_address !== undefined) {
// //       if (location_address.trim().length < 5) {
// //         return res.status(400).json({
// //           success: false,
// //           message: 'Location must be at least 5 characters'
// //         });
// //       }
// //       updateFields.push('location_address = ?');
// //       updateValues.push(location_address.trim());
// //     }
    
// //     if (user_note !== undefined) {
// //       updateFields.push('user_note = ?');
// //       updateValues.push(user_note ? user_note.trim() : null);
// //     }
    
// //     if (updateFields.length === 0) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'No fields to update'
// //       });
// //     }
    
// //     updateValues.push(reportId);
    
// //     const updateQuery = `
// //       UPDATE reports
// //       SET ${updateFields.join(', ')}
// //       WHERE report_id = ? AND is_deleted = 0
// //     `;
    
// //     await pool.execute(updateQuery, updateValues);
    
// //     // Fetch updated report
// //     const [updatedReport] = await pool.execute(`
// //       SELECT 
// //         r.report_id,
// //         r.description,
// //         r.location_address,
// //         r.user_note,
// //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// //         at.type_name as animal_type,
// //         ac.condition_name as animal_condition,
// //         r.status_id,
// //         COALESCE(u.username, 'Anonymous') as reporter_name,
// //         CAST(COALESCE(u.phone, 'No phone') AS CHAR) AS reporter_phone,
// //         COALESCE(u.email, 'No email') as email
// //       FROM reports r
// //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// //       LEFT JOIN users u ON r.user_id = u.user_id
// //       WHERE r.report_id = ?
// //     `, [reportId]);
    
// //     res.json({
// //       success: true,
// //       message: 'Report updated successfully',
// //       data: updatedReport[0]
// //     });
    
// //   } catch (error) {
// //     console.error('Error updating report:', error);
    
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to update report',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // router.delete('/:id', verifyToken, async (req, res) => {
// //   const reportId = Number(req.params.id);
// //   const userId = req.user.user_id;
  
// //   if (!reportId) {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Invalid report ID'
// //     });
// //   }
  
// //   const connection = await pool.getConnection();
  
// //   try {
// //     await connection.beginTransaction();
    
// //     const [reportCheck] = await connection.execute(
// //       'SELECT user_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// //       [reportId]
// //     );
    
// //     if (reportCheck.length === 0) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Report not found'
// //       });
// //     }
    
// //     if (reportCheck[0].user_id !== userId && req.user.role_id !== 3) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: You can only delete your own reports'
// //       });
// //     }
    
// //     await connection.execute(
// //       'UPDATE reports SET is_deleted = 1 WHERE report_id = ?',
// //       [reportId]
// //     );
    
// //     await connection.commit();
    
// //     res.json({
// //       success: true,
// //       message: 'Report deleted successfully',
// //       report_id: reportId
// //     });
    
// //   } catch (error) {
// //     await connection.rollback();
// //     console.error('Error deleting report:', error);
    
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to delete report',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
    
// //   } finally {
// //     connection.release();
// //   }
// // });

// // router.get('/admin/all', verifyToken, async (req, res) => {
// //   try {
// //     // Admin check
// //     if (req.user.role_id !== 3) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Admin access required'
// //       });
// //     }
    
// //     // Get all reports with basic information
// //     const [reports] = await pool.execute(`
// //       SELECT 
// //         r.report_id,
// //         r.user_id,
// //         r.description,
// //         r.location_address,
// //         r.user_note,
// //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// //         at.type_name as animal_type,
// //         ac.condition_name as animal_condition,
// //         r.status_id,
// //         COALESCE(u.username, 'Anonymous') as reporter_name,
// //         CAST(COALESCE(u.phone, 'No phone') AS CHAR) AS reporter_phone,
// //         COALESCE(u.email, 'No email') as email
// //       FROM reports r
// //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// //       LEFT JOIN users u ON r.user_id = u.user_id
// //       WHERE r.is_deleted = 0
// //       ORDER BY r.submitted_at DESC
// //     `);
    
// //     console.log(`Admin: Found ${reports.length} total reports`);
    
// //     if (reports.length > 0) {
// //       console.log('Sample report from database:', {
// //         report_id: reports[0].report_id,
// //         reporter_name: reports[0].reporter_name,
// //         reporter_phone: reports[0].reporter_phone,
// //         email: reports[0].email,
// //         user_id: reports[0].user_id
// //       });
// //     }
    
// //     // For each report, get task info and latest admin note
// //     const reportsWithDetails = await Promise.all(
// //       reports.map(async (report) => {
// //         const reportData = { ...report };
        
// //         // Get task information if exists
// //         const [tasks] = await pool.execute(`
// //           SELECT 
// //             t.task_id,
// //             t.assigned_to_user_id,
// //             t.status_id as task_status_id,
// //             DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
// //             v.username as volunteer_name,
// //             v.email as volunteer_email,
// //             CAST(v.phone AS CHAR) AS volunteer_phone
// //           FROM tasks t
// //           LEFT JOIN users v ON t.assigned_to_user_id = v.user_id
// //           WHERE t.report_id = ? AND t.is_deleted = 0
// //           ORDER BY t.assigned_at DESC
// //           LIMIT 1
// //         `, [report.report_id]);
        
// //         if (tasks.length > 0) {
// //           const task = tasks[0];
// //           reportData.volunteer_id = task.assigned_to_user_id;
// //           reportData.volunteer_name = task.volunteer_name;
// //           reportData.volunteer_email = task.volunteer_email;
// //           reportData.volunteer_phone = task.volunteer_phone;
// //           reportData.task_id = task.task_id;
// //           reportData.task_status_id = task.task_status_id;
// //           reportData.assigned_at = task.assigned_at;
// //         }
        
// //         // Get latest admin note
// //         const [adminNotes] = await pool.execute(`
// //           SELECT note_text as admin_note
// //           FROM admin_notes
// //           WHERE report_id = ?
// //           ORDER BY created_at DESC
// //           LIMIT 1
// //         `, [report.report_id]);
        
// //         if (adminNotes.length > 0) {
// //           reportData.admin_note = adminNotes[0].admin_note;
// //         }
        
// //         return reportData;
// //       })
// //     );
    
// //     res.json({
// //       success: true,
// //       data: reportsWithDetails,
// //       count: reportsWithDetails.length
// //     });
    
// //   } catch (error) {
// //     console.error('Error fetching all reports:', error);
    
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to fetch reports',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // router.patch('/:id/status', verifyToken, async (req, res) => {
// //   const reportId = Number(req.params.id);
// //   const { status_id } = req.body;
  
// //   if (!reportId) {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Invalid report ID'
// //     });
// //   }
  
// //   if (!status_id || (status_id < 1 || status_id > 5)) {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Invalid status ID'
// //     });
// //   }
  
// //   try {
// //     // Admin check
// //     if (req.user.role_id !== 3) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Admin access required'
// //       });
// //     }
    
// //     // Check if report exists
// //     const [reportCheck] = await pool.execute(
// //       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// //       [reportId]
// //     );
    
// //     if (reportCheck.length === 0) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Report not found'
// //       });
// //     }
    
// //     // Update report status
// //     await pool.execute(
// //       'UPDATE reports SET status_id = ? WHERE report_id = ?',
// //       [status_id, reportId]
// //     );
    
// //     // Get updated report
// //     const [updatedReport] = await pool.execute(`
// //       SELECT 
// //         r.report_id,
// //         r.description,
// //         r.status_id,
// //         COALESCE(u.username, 'Anonymous') as reporter_name,
// //         CAST(COALESCE(u.phone, 'No phone') AS CHAR) AS reporter_phone,
// //         COALESCE(u.email, 'No email') as email
// //       FROM reports r
// //       LEFT JOIN users u ON r.user_id = u.user_id
// //       WHERE r.report_id = ?
// //     `, [reportId]);
    
// //     res.json({
// //       success: true,
// //       message: 'Report status updated successfully',
// //       data: updatedReport[0]
// //     });
    
// //   } catch (error) {
// //     console.error('Error updating report status:', error);
    
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to update report status',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // /* =====================================================
// //    ASSIGN VOLUNTEER TO REPORT (ADMIN ONLY) - USING TASKS TABLE
// // ===================================================== */
// // router.post('/:id/assign', verifyToken, async (req, res) => {
// //   const reportId = Number(req.params.id);
// //   const { volunteer_id, status_id } = req.body;
// //   const adminId = req.user.user_id; // Current admin assigning the task
  
// //   if (!reportId) {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Invalid report ID'
// //     });
// //   }
  
// //   if (!volunteer_id) {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Volunteer ID is required'
// //     });
// //   }
  
// //   const connection = await pool.getConnection();
  
// //   try {
// //     await connection.beginTransaction();
    
// //     // Admin check
// //     if (req.user.role_id !== 3) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Admin access required'
// //       });
// //     }
    
// //     // Check if report exists
// //     const [reportCheck] = await connection.execute(
// //       'SELECT report_id, status_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// //       [reportId]
// //     );
    
// //     if (reportCheck.length === 0) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Report not found'
// //       });
// //     }
    
// //     // Check if volunteer exists
// //     const [volunteerCheck] = await connection.execute(
// //       'SELECT user_id, username, email, phone FROM users WHERE user_id = ? AND role_id = 2',
// //       [volunteer_id]
// //     );
    
// //     if (volunteerCheck.length === 0) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Volunteer not found'
// //       });
// //     }
    
// //     // Check if report already has an active task
// //     const [existingTasks] = await connection.execute(`
// //       SELECT task_id 
// //       FROM tasks 
// //       WHERE report_id = ? AND is_deleted = 0 AND status_id != 5
// //     `, [reportId]);
    
// //     if (existingTasks.length > 0) {
// //       // Archive old task
// //       await connection.execute(
// //         'UPDATE tasks SET is_deleted = 1 WHERE report_id = ? AND is_deleted = 0',
// //         [reportId]
// //       );
// //     }
    
// //     // Create new task in tasks table
// //     const newTaskStatus = 1; // 1 = Assigned (assuming task status: 1=Assigned, 2=In Progress, 3=Completed, 4=Cancelled, 5=Declined)
// //     const [taskResult] = await connection.execute(
// //       `INSERT INTO tasks 
// //        (report_id, assigned_to_user_id, assigned_by_user_id, status_id, assigned_at, is_deleted) 
// //        VALUES (?, ?, ?, ?, NOW(), 0)`,
// //       [reportId, volunteer_id, adminId, newTaskStatus]
// //     );
    
// //     const taskId = taskResult.insertId;
    
// //     // Update report status
// //     const newReportStatus = status_id || 2; // Default to status 2 (Assigned) for reports
// //     await connection.execute(
// //       'UPDATE reports SET status_id = ? WHERE report_id = ?',
// //       [newReportStatus, reportId]
// //     );
    
// //     await connection.commit();
    
// //     const volunteer = volunteerCheck[0];
    
// //     res.json({
// //       success: true,
// //       message: 'Volunteer assigned successfully',
// //       data: {
// //         report_id: reportId,
// //         task_id: taskId,
// //         volunteer_id: volunteer.user_id,
// //         volunteer_name: volunteer.username,
// //         volunteer_email: volunteer.email,
// //         volunteer_phone: volunteer.phone,
// //         status_id: newReportStatus,
// //         assigned_at: new Date().toISOString()
// //       }
// //     });
    
// //   } catch (error) {
// //     await connection.rollback();
// //     console.error('Error assigning volunteer:', error);
    
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to assign volunteer',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
    
// //   } finally {
// //     connection.release();
// //   }
// // });

// // /* =====================================================
// //    UNASSIGN VOLUNTEER FROM REPORT (ADMIN ONLY) - USING TASKS TABLE
// // ===================================================== */
// // router.put('/:id/unassign', verifyToken, async (req, res) => {
// //   const reportId = Number(req.params.id);
// //   const adminId = req.user.user_id;
  
// //   if (!reportId) {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Invalid report ID'
// //     });
// //   }
  
// //   const connection = await pool.getConnection();
  
// //   try {
// //     await connection.beginTransaction();
    
// //     // Admin check
// //     if (req.user.role_id !== 3) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Admin access required'
// //       });
// //     }
    
// //     // Check if report exists
// //     const [reportCheck] = await connection.execute(
// //       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// //       [reportId]
// //     );
    
// //     if (reportCheck.length === 0) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Report not found'
// //       });
// //     }
    
// //     // Check if report has an active task
// //     const [existingTasks] = await connection.execute(`
// //       SELECT task_id, assigned_to_user_id 
// //       FROM tasks 
// //       WHERE report_id = ? AND is_deleted = 0 AND status_id != 5
// //     `, [reportId]);
    
// //     if (existingTasks.length === 0) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Report does not have an assigned volunteer'
// //       });
// //     }
    
// //     // Archive the task (soft delete)
// //     await connection.execute(
// //       'UPDATE tasks SET is_deleted = 1 WHERE report_id = ? AND is_deleted = 0',
// //       [reportId]
// //     );
    
// //     // Update report status back to Submitted (status_id = 1)
// //     await connection.execute(
// //       'UPDATE reports SET status_id = 1 WHERE report_id = ?',
// //       [reportId]
// //     );
    
// //     await connection.commit();
    
// //     res.json({
// //       success: true,
// //       message: 'Volunteer unassigned successfully',
// //       report_id: reportId,
// //       status_id: 1
// //     });
    
// //   } catch (error) {
// //     await connection.rollback();
// //     console.error('Error unassigning volunteer:', error);
    
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to unassign volunteer',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
    
// //   } finally {
// //     connection.release();
// //   }
// // });

// // /* =====================================================
// //    ADD ADMIN NOTE TO REPORT (ADMIN ONLY)
// // ===================================================== */
// // router.post('/:id/admin-note', verifyToken, async (req, res) => {
// //   const reportId = Number(req.params.id);
// //   const { note } = req.body;
// //   const adminId = req.user.user_id;
  
// //   if (!reportId) {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Invalid report ID'
// //     });
// //   }
  
// //   if (!note || note.trim().length === 0) {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Note is required'
// //     });
// //   }
  
// //   const connection = await pool.getConnection();
  
// //   try {
// //     await connection.beginTransaction();
    
// //     // Admin check
// //     if (req.user.role_id !== 3) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Admin access required'
// //       });
// //     }
    
// //     // Check if report exists
// //     const [reportCheck] = await connection.execute(
// //       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// //       [reportId]
// //     );
    
// //     if (reportCheck.length === 0) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Report not found'
// //       });
// //     }
    
// //     // Insert note into admin_notes table
// //     const [result] = await connection.execute(
// //       `INSERT INTO admin_notes (report_id, admin_id, note_text, created_at) 
// //        VALUES (?, ?, ?, NOW())`,
// //       [reportId, adminId, note.trim()]
// //     );
    
// //     await connection.commit();
    
// //     res.json({
// //       success: true,
// //       message: 'Admin note saved successfully',
// //       note_id: result.insertId,
// //       report_id: reportId,
// //       admin_note: note.trim(),
// //       created_at: new Date().toISOString()
// //     });
    
// //   } catch (error) {
// //     await connection.rollback();
// //     console.error('Error saving admin note:', error);
    
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to save admin note',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
    
// //   } finally {
// //     connection.release();
// //   }
// // });

// // /* =====================================================
// //    GET ALL ADMIN NOTES FOR A REPORT (ADMIN ONLY)
// // ===================================================== */
// // router.get('/:id/admin-notes', verifyToken, async (req, res) => {
// //   const reportId = Number(req.params.id);
  
// //   if (!reportId) {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Invalid report ID'
// //     });
// //   }
  
// //   try {
// //     // Admin check
// //     if (req.user.role_id !== 3) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Admin access required'
// //       });
// //     }
    
// //     // Check if report exists
// //     const [reportCheck] = await pool.execute(
// //       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// //       [reportId]
// //     );
    
// //     if (reportCheck.length === 0) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Report not found'
// //       });
// //     }
    
// //     // Get all admin notes for this report
// //     const [notes] = await pool.execute(`
// //       SELECT 
// //         an.note_id,
// //         an.report_id,
// //         an.admin_id,
// //         an.note_text,
// //         DATE_FORMAT(an.created_at, '%Y-%m-%d %H:%i:%s') as created_at,
// //         u.username as admin_name
// //       FROM admin_notes an
// //       LEFT JOIN users u ON an.admin_id = u.user_id
// //       WHERE an.report_id = ?
// //       ORDER BY an.created_at DESC
// //     `, [reportId]);
    
// //     res.json({
// //       success: true,
// //       data: notes,
// //       count: notes.length
// //     });
    
// //   } catch (error) {
// //     console.error('Error fetching admin notes:', error);
    
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to fetch admin notes',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // /* =====================================================
// //    DELETE ADMIN NOTE (ADMIN ONLY)
// // ===================================================== */
// // router.delete('/admin-note/:noteId', verifyToken, async (req, res) => {
// //   const noteId = Number(req.params.noteId);
  
// //   if (!noteId) {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Invalid note ID'
// //     });
// //   }
  
// //   try {
// //     // Admin check
// //     if (req.user.role_id !== 3) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Admin access required'
// //       });
// //     }
    
// //     // Check if note exists
// //     const [noteCheck] = await pool.execute(
// //       'SELECT note_id, admin_id FROM admin_notes WHERE note_id = ?',
// //       [noteId]
// //     );
    
// //     if (noteCheck.length === 0) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Note not found'
// //       });
// //     }
    
// //     // Check if admin owns the note or is super admin
// //     if (noteCheck[0].admin_id !== req.user.user_id && req.user.role_id !== 3) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: You can only delete your own notes'
// //       });
// //     }
    
// //     // Delete the note
// //     await pool.execute(
// //       'DELETE FROM admin_notes WHERE note_id = ?',
// //       [noteId]
// //     );
    
// //     res.json({
// //       success: true,
// //       message: 'Admin note deleted successfully',
// //       note_id: noteId
// //     });
    
// //   } catch (error) {
// //     console.error('Error deleting admin note:', error);
    
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to delete admin note',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // /* =====================================================
// //    GET REPORT STATISTICS (ADMIN ONLY)
// // ===================================================== */
// // router.get('/admin/statistics', verifyToken, async (req, res) => {
// //   try {
// //     if (req.user.role_id !== 3) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Admin access required'
// //       });
// //     }
    
// //     // Get total reports
// //     const [totalResult] = await pool.execute(
// //       'SELECT COUNT(*) as total FROM reports WHERE is_deleted = 0'
// //     );
    
// //     // Get reports by status
// //     const [statusResult] = await pool.execute(`
// //       SELECT 
// //         status_id,
// //         COUNT(*) as count
// //       FROM reports 
// //       WHERE is_deleted = 0
// //       GROUP BY status_id
// //       ORDER BY status_id
// //     `);
    
// //     // Get reports by animal type
// //     const [typeResult] = await pool.execute(`
// //       SELECT 
// //         at.type_name,
// //         COUNT(*) as count
// //       FROM reports r
// //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// //       WHERE r.is_deleted = 0
// //       GROUP BY at.type_name
// //       ORDER BY count DESC
// //     `);
    
// //     // Get recent reports (last 7 days)
// //     const [recentResult] = await pool.execute(`
// //       SELECT 
// //         COUNT(*) as recent_count
// //       FROM reports 
// //       WHERE is_deleted = 0 
// //       AND submitted_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
// //     `);
    
// //     const statistics = {
// //       total: totalResult[0].total || 0,
// //       by_status: statusResult.map(row => ({
// //         status_id: row.status_id,
// //         count: row.count
// //       })),
// //       by_type: typeResult.map(row => ({
// //         type_name: row.type_name || 'Unknown',
// //         count: row.count
// //       })),
// //       recent_week: recentResult[0].recent_count || 0
// //     };
    
// //     res.json({
// //       success: true,
// //       data: statistics
// //     });
    
// //   } catch (error) {
// //     console.error('Error fetching statistics:', error);
    
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to fetch statistics',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // /* =====================================================
// //    UPDATE REPORT DETAILS (ADMIN ONLY)
// // ===================================================== */
// // router.patch('/admin/:id', verifyToken, async (req, res) => {
// //   const reportId = Number(req.params.id);
// //   const { animal_type_id, animal_condition_id, description, location_address, user_note } = req.body;
  
// //   if (!reportId) {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Invalid report ID'
// //     });
// //   }
  
// //   const connection = await pool.getConnection();
  
// //   try {
// //     await connection.beginTransaction();
    
// //     // Admin check
// //     if (req.user.role_id !== 3) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Admin access required'
// //       });
// //     }
    
// //     // Check if report exists
// //     const [reportCheck] = await connection.execute(
// //       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// //       [reportId]
// //     );
    
// //     if (reportCheck.length === 0) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Report not found'
// //       });
// //     }
    
// //     // Build update fields
// //     const updateFields = [];
// //     const updateValues = [];
    
// //     if (animal_type_id !== undefined) {
// //       updateFields.push('animal_type_id = ?');
// //       updateValues.push(animal_type_id);
// //     }
    
// //     if (animal_condition_id !== undefined) {
// //       updateFields.push('animal_condition_id = ?');
// //       updateValues.push(animal_condition_id);
// //     }
    
// //     if (description !== undefined) {
// //       if (description.trim().length < 10) {
// //         return res.status(400).json({
// //           success: false,
// //           message: 'Description must be at least 10 characters'
// //         });
// //       }
// //       updateFields.push('description = ?');
// //       updateValues.push(description.trim());
// //     }
    
// //     if (location_address !== undefined) {
// //       if (location_address.trim().length < 5) {
// //         return res.status(400).json({
// //           success: false,
// //           message: 'Location must be at least 5 characters'
// //         });
// //       }
// //       updateFields.push('location_address = ?');
// //       updateValues.push(location_address.trim());
// //     }
    
// //     if (user_note !== undefined) {
// //       updateFields.push('user_note = ?');
// //       updateValues.push(user_note ? user_note.trim() : null);
// //     }
    
// //     if (updateFields.length === 0) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'No fields to update'
// //       });
// //     }
    
// //     updateValues.push(reportId);
    
// //     const updateQuery = `
// //       UPDATE reports
// //       SET ${updateFields.join(', ')}
// //       WHERE report_id = ?
// //     `;
    
// //     await connection.execute(updateQuery, updateValues);
    
// //     await connection.commit();
    
// //     // Get updated report
// //     const [updatedReport] = await connection.execute(`
// //       SELECT 
// //         r.report_id,
// //         r.description,
// //         r.location_address,
// //         r.user_note,
// //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// //         at.type_name as animal_type,
// //         ac.condition_name as animal_condition,
// //         r.status_id,
// //         COALESCE(u.username, 'Anonymous') as reporter_name,
// //         CAST(COALESCE(u.phone, 'No phone') AS CHAR) AS reporter_phone,
// //         COALESCE(u.email, 'No email') as email
// //       FROM reports r
// //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// //       LEFT JOIN users u ON r.user_id = u.user_id
// //       WHERE r.report_id = ?
// //     `, [reportId]);
    
// //     res.json({
// //       success: true,
// //       message: 'Report updated successfully',
// //       data: updatedReport[0]
// //     });
    
// //   } catch (error) {
// //     await connection.rollback();
// //     console.error('Error updating report:', error);
    
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to update report',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
    
// //   } finally {
// //     connection.release();
// //   }
// // });

// // /* =====================================================
// //    GET TASKS FOR A REPORT (ADMIN ONLY)
// // ===================================================== */
// // router.get('/:id/tasks', verifyToken, async (req, res) => {
// //   const reportId = Number(req.params.id);
  
// //   if (!reportId) {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Invalid report ID'
// //     });
// //   }
  
// //   try {
// //     // Admin check
// //     if (req.user.role_id !== 3) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Admin access required'
// //       });
// //     }
    
// //     // Check if report exists
// //     const [reportCheck] = await pool.execute(
// //       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// //       [reportId]
// //     );
    
// //     if (reportCheck.length === 0) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Report not found'
// //       });
// //     }
    
// //     // Get all tasks for this report
// //     const [tasks] = await pool.execute(`
// //       SELECT 
// //         t.task_id,
// //         t.report_id,
// //         t.assigned_to_user_id,
// //         t.assigned_by_user_id,
// //         t.status_id as task_status_id,
// //         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
// //         DATE_FORMAT(t.started_at, '%Y-%m-%d %H:%i:%s') as started_at,
// //         DATE_FORMAT(t.completed_at, '%Y-%m-%d %H:%i:%s') as completed_at,
// //         t.is_deleted,
// //         v.username as volunteer_name,
// //         v.email as volunteer_email,
// //         CAST(v.phone AS CHAR) AS volunteer_phone,
// //         a.username as assigned_by_name
// //       FROM tasks t
// //       LEFT JOIN users v ON t.assigned_to_user_id = v.user_id
// //       LEFT JOIN users a ON t.assigned_by_user_id = a.user_id
// //       WHERE t.report_id = ?
// //       ORDER BY t.assigned_at DESC
// //     `, [reportId]);
    
// //     res.json({
// //       success: true,
// //       data: tasks,
// //       count: tasks.length
// //     });
    
// //   } catch (error) {
// //     console.error('Error fetching tasks:', error);
    
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to fetch tasks',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // router.get('/test', (req, res) => {
// //   res.json({
// //     success: true,
// //     message: 'Report API test endpoint is working',
// //     timestamp: new Date().toISOString()
// //   });
// // });

// // module.exports = router;

// const express = require('express');
// const router = express.Router();
// const verifyToken = require('../middleware/auth');
// const mysql = require('mysql2/promise');
// require('dotenv').config();

// const pool = mysql.createPool({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || '',
//   database: process.env.DB_NAME || 'animal_rescue_system',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// console.log('Report routes initialized');

// router.get('/health', (req, res) => {
//   res.json({
//     success: true,
//     message: 'Report API is running',
//     timestamp: new Date().toISOString(),
//     status: 'online'
//   });
// });

// router.get('/animal-types', verifyToken, async (req, res) => {
//   try {
//     const [rows] = await pool.execute(
//       'SELECT type_id, type_name FROM animal_types ORDER BY type_name'
//     );
    
//     res.json({
//       success: true,
//       data: rows
//     });
    
//   } catch (error) {
//     const fallbackData = [
//       { type_id: 1, type_name: 'Dog' },
//       { type_id: 2, type_name: 'Cat' },
//       { type_id: 3, type_name: 'Bird' },
//       { type_id: 4, type_name: 'Rabbit' },
//       { type_id: 5, type_name: 'Hamster' },
//       { type_id: 6, type_name: 'Turtle' },
//       { type_id: 7, type_name: 'Horse' },
//       { type_id: 8, type_name: 'Cow' },
//       { type_id: 9, type_name: 'Goat' },
//       { type_id: 10, type_name: 'Sheep' },
//       { type_id: 11, type_name: 'Other' }
//     ];
    
//     res.json({
//       success: true,
//       data: fallbackData,
//       message: 'Using fallback data'
//     });
//   }
// });

// router.get('/animal-conditions', verifyToken, async (req, res) => {
//   try {
//     const [rows] = await pool.execute(
//       'SELECT condition_id, condition_name FROM animal_conditions ORDER BY condition_name'
//     );
    
//     res.json({
//       success: true,
//       data: rows
//     });
    
//   } catch (error) {
//     const fallbackData = [
//       { condition_id: 1, condition_name: 'Injured' },
//       { condition_id: 2, condition_name: 'Sick' },
//       { condition_id: 3, condition_name: 'Abandoned' }
//     ];
    
//     res.json({
//       success: true,
//       data: fallbackData,
//       message: 'Using fallback data'
//     });
//   }
// });

// router.post('/submit', verifyToken, async (req, res) => {
//   const connection = await pool.getConnection();
  
//   try {
//     await connection.beginTransaction();
    
//     const userId = req.user.user_id;
//     const { animal_type_id, animal_condition_id, description, location_address, user_note } = req.body;
    
//     if (!animal_type_id || !animal_condition_id || !description || !location_address) {
//       return res.status(400).json({
//         success: false,
//         message: 'All fields are required'
//       });
//     }
    
//     if (description.trim().length < 10) {
//       return res.status(400).json({
//         success: false,
//         message: 'Description must be at least 10 characters'
//       });
//     }
    
//     if (location_address.trim().length < 5) {
//       return res.status(400).json({
//         success: false,
//         message: 'Location must be at least 5 characters'
//       });
//     }
    
//     const [result] = await connection.execute(
//       `INSERT INTO reports 
//        (user_id, animal_type_id, animal_condition_id, description, 
//         location_address, status_id, user_note, submitted_at, is_deleted) 
//        VALUES (?, ?, ?, ?, ?, 1, ?, NOW(), 0)`,
//       [
//         userId, 
//         animal_type_id, 
//         animal_condition_id, 
//         description.trim(), 
//         location_address.trim(),
//         user_note ? user_note.trim() : null
//       ]
//     );
    
//     await connection.commit();
    
//     const reportId = result.insertId;
    
//     let reportDetails = {};
//     try {
//       const [report] = await connection.execute(`
//         SELECT 
//           r.report_id,
//           r.description,
//           r.location_address,
//           r.user_note,
//           DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
//           at.type_name as animal_type,
//           ac.condition_name as animal_condition,
//           r.status_id,
//           rs.status_name,  -- ADDED: Get status name from report_statuses
//           COALESCE(u.username, 'Anonymous') as reporter_name,
//           CAST(COALESCE(u.phone, 'No phone') AS CHAR) AS reporter_phone,
//           COALESCE(u.email, 'No email') as email
//         FROM reports r
//         LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
//         LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
//         LEFT JOIN report_statuses rs ON r.status_id = rs.status_id  -- ADDED: Join with report_statuses
//         LEFT JOIN users u ON r.user_id = u.user_id
//         WHERE r.report_id = ?
//       `, [reportId]);
      
//       if (report.length > 0) {
//         reportDetails = report[0];
//       }
//     } catch (error) {
//       console.log('Could not fetch report details:', error.message);
//     }
    
//     res.json({
//       success: true,
//       message: 'Report submitted successfully',
//       report_id: reportId,
//       report: reportDetails
//     });
    
//   } catch (error) {
//     await connection.rollback();
    
//     let errorMessage = 'Failed to submit report';
//     if (error.code === 'ER_NO_SUCH_TABLE') {
//       errorMessage = 'Database tables not found';
//     } else if (error.code === 'ER_DUP_ENTRY') {
//       errorMessage = 'Duplicate entry detected';
//     }
    
//     res.status(500).json({
//       success: false,
//       message: errorMessage,
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
    
//   } finally {
//     connection.release();
//   }
// });

// router.get('/my-reports', verifyToken, async (req, res) => {
//   const userId = req.user.user_id;
  
//   try {
//     console.log('FETCHING reports for user ID:', userId);
    
//     const [reports] = await pool.execute(`
//       SELECT 
//         r.report_id,
//         r.user_id,
//         r.description,
//         r.location_address,
//         r.user_note,
//         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
//         at.type_name as animal_type,
//         ac.condition_name as animal_condition,
//         r.status_id,
//         rs.status_name,  -- ADDED: Get status name from report_statuses table
//         COALESCE(u.username, 'Anonymous') as reporter_name,
//         CAST(COALESCE(u.phone, 'No phone') AS CHAR) AS reporter_phone,
//         COALESCE(u.email, 'No email') as email
//       FROM reports r
//       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
//       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
//       LEFT JOIN report_statuses rs ON r.status_id = rs.status_id  -- ADDED: Join with report_statuses
//       LEFT JOIN users u ON r.user_id = u.user_id
//       WHERE r.user_id = ? AND r.is_deleted = 0
//       ORDER BY r.submitted_at DESC
//     `, [userId]);
    
//     console.log(`Found ${reports.length} reports for user ${userId}`);
    
//     if (reports.length > 0) {
//       console.log('First report details:', {
//         id: reports[0].report_id,
//         reporter_name: reports[0].reporter_name,
//         reporter_phone: reports[0].reporter_phone,
//         email: reports[0].email,
//         status_id: reports[0].status_id,
//         status_name: reports[0].status_name  // This will show actual status name
//       });
//     }
    
//     res.json({
//       success: true,
//       data: reports,
//       count: reports.length
//     });
    
//   } catch (error) {
//     console.error('Error fetching user reports:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch user reports',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// router.get('/:id', verifyToken, async (req, res) => {
//   const reportId = Number(req.params.id);
//   const userId = req.user.user_id;
  
//   if (!reportId) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid report ID'
//     });
//   }
  
//   try {
//     // First get the report details with status_name
//     const [reports] = await pool.execute(`
//       SELECT 
//         r.report_id,
//         r.user_id,
//         r.description,
//         r.location_address,
//         r.user_note,
//         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
//         at.type_name as animal_type,
//         ac.condition_name as animal_condition,
//         r.status_id,
//         rs.status_name,  -- ADDED: Get status name from report_statuses
//         COALESCE(u.username, 'Anonymous') as reporter_name,
//         CAST(COALESCE(u.phone, 'No phone') AS CHAR) AS reporter_phone,
//         COALESCE(u.email, 'No email') as email
//       FROM reports r
//       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
//       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
//       LEFT JOIN report_statuses rs ON r.status_id = rs.status_id  -- ADDED: Join with report_statuses
//       LEFT JOIN users u ON r.user_id = u.user_id
//       WHERE r.report_id = ? AND r.is_deleted = 0
//     `, [reportId]);
    
//     if (reports.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Report not found'
//       });
//     }
    
//     let report = reports[0];
    
//     // Check if there's a task assigned to this report
//     const [tasks] = await pool.execute(`
//       SELECT 
//         t.task_id,
//         t.assigned_to_user_id,
//         t.status_id as task_status_id,
//         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
//         v.username as volunteer_name,
//         v.email as volunteer_email,
//         CAST(v.phone AS CHAR) AS volunteer_phone
//       FROM tasks t
//       LEFT JOIN users v ON t.assigned_to_user_id = v.user_id
//       WHERE t.report_id = ? AND t.is_deleted = 0
//       ORDER BY t.assigned_at DESC
//       LIMIT 1
//     `, [reportId]);
    
//     if (tasks.length > 0) {
//       const task = tasks[0];
//       report.volunteer_id = task.assigned_to_user_id;
//       report.volunteer_name = task.volunteer_name;
//       report.volunteer_email = task.volunteer_email;
//       report.volunteer_phone = task.volunteer_phone;
//       report.task_id = task.task_id;
//       report.task_status_id = task.task_status_id;
//       report.assigned_at = task.assigned_at;
//     }
    
//     // Get latest admin note
//     const [adminNotes] = await pool.execute(`
//       SELECT note_text, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at
//       FROM admin_notes
//       WHERE report_id = ?
//       ORDER BY created_at DESC
//       LIMIT 1
//     `, [reportId]);
    
//     if (adminNotes.length > 0) {
//       report.admin_note = adminNotes[0].note_text;
//     }
    
//     // Check permissions: user must be report owner or admin
//     if (report.user_id !== userId && req.user.role_id !== 3) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: You can only view your own reports'
//       });
//     }
    
//     res.json({
//       success: true,
//       data: report
//     });
    
//   } catch (error) {
//     console.error('Error fetching report:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch report',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// router.patch('/:id', verifyToken, async (req, res) => {
//   const reportId = Number(req.params.id);
//   const userId = req.user.user_id;
//   const { description, location_address, user_note } = req.body;
  
//   if (!reportId) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid report ID'
//     });
//   }
  
//   try {
//     const [reportCheck] = await pool.execute(
//       'SELECT user_id, status_id FROM reports WHERE report_id = ? AND is_deleted = 0',
//       [reportId]
//     );
    
//     if (reportCheck.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Report not found'
//       });
//     }
    
//     if (reportCheck[0].user_id !== userId) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: You can only update your own reports'
//       });
//     }
    
//     if (reportCheck[0].status_id !== 1) {
//       return res.status(400).json({
//         success: false,
//         message: 'Report cannot be edited after it has been reviewed'
//       });
//     }
    
//     const updateFields = [];
//     const updateValues = [];
    
//     if (description !== undefined) {
//       if (description.trim().length < 10) {
//         return res.status(400).json({
//           success: false,
//           message: 'Description must be at least 10 characters'
//         });
//       }
//       updateFields.push('description = ?');
//       updateValues.push(description.trim());
//     }
    
//     if (location_address !== undefined) {
//       if (location_address.trim().length < 5) {
//         return res.status(400).json({
//           success: false,
//           message: 'Location must be at least 5 characters'
//         });
//       }
//       updateFields.push('location_address = ?');
//       updateValues.push(location_address.trim());
//     }
    
//     if (user_note !== undefined) {
//       updateFields.push('user_note = ?');
//       updateValues.push(user_note ? user_note.trim() : null);
//     }
    
//     if (updateFields.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'No fields to update'
//       });
//     }
    
//     updateValues.push(reportId);
    
//     const updateQuery = `
//       UPDATE reports
//       SET ${updateFields.join(', ')}
//       WHERE report_id = ? AND is_deleted = 0
//     `;
    
//     await pool.execute(updateQuery, updateValues);
    
//     // Fetch updated report with status_name
//     const [updatedReport] = await pool.execute(`
//       SELECT 
//         r.report_id,
//         r.description,
//         r.location_address,
//         r.user_note,
//         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
//         at.type_name as animal_type,
//         ac.condition_name as animal_condition,
//         r.status_id,
//         rs.status_name,  -- ADDED: Get status name from report_statuses
//         COALESCE(u.username, 'Anonymous') as reporter_name,
//         CAST(COALESCE(u.phone, 'No phone') AS CHAR) AS reporter_phone,
//         COALESCE(u.email, 'No email') as email
//       FROM reports r
//       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
//       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
//       LEFT JOIN report_statuses rs ON r.status_id = rs.status_id  -- ADDED: Join with report_statuses
//       LEFT JOIN users u ON r.user_id = u.user_id
//       WHERE r.report_id = ?
//     `, [reportId]);
    
//     res.json({
//       success: true,
//       message: 'Report updated successfully',
//       data: updatedReport[0]
//     });
    
//   } catch (error) {
//     console.error('Error updating report:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update report',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// router.delete('/:id', verifyToken, async (req, res) => {
//   const reportId = Number(req.params.id);
//   const userId = req.user.user_id;
  
//   if (!reportId) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid report ID'
//     });
//   }
  
//   const connection = await pool.getConnection();
  
//   try {
//     await connection.beginTransaction();
    
//     const [reportCheck] = await connection.execute(
//       'SELECT user_id FROM reports WHERE report_id = ? AND is_deleted = 0',
//       [reportId]
//     );
    
//     if (reportCheck.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Report not found'
//       });
//     }
    
//     if (reportCheck[0].user_id !== userId && req.user.role_id !== 3) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: You can only delete your own reports'
//       });
//     }
    
//     await connection.execute(
//       'UPDATE reports SET is_deleted = 1 WHERE report_id = ?',
//       [reportId]
//     );
    
//     await connection.commit();
    
//     res.json({
//       success: true,
//       message: 'Report deleted successfully',
//       report_id: reportId
//     });
    
//   } catch (error) {
//     await connection.rollback();
//     console.error('Error deleting report:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete report',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
    
//   } finally {
//     connection.release();
//   }
// });

// router.get('/admin/all', verifyToken, async (req, res) => {
//   try {
//     if (req.user.role_id !== 3) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: Admin access required'
//       });
//     }
    
//     // Get all reports with status_name
//     const [reports] = await pool.execute(`
//       SELECT 
//         r.report_id,
//         r.user_id,
//         r.description,
//         r.location_address,
//         r.user_note,
//         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
//         at.type_name as animal_type,
//         ac.condition_name as animal_condition,
//         r.status_id,
//         rs.status_name,  -- ADDED: Get status name from report_statuses table
//         COALESCE(u.username, 'Anonymous') as reporter_name,
//         CAST(COALESCE(u.phone, 'No phone') AS CHAR) AS reporter_phone,
//         COALESCE(u.email, 'No email') as email
//       FROM reports r
//       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
//       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
//       LEFT JOIN report_statuses rs ON r.status_id = rs.status_id  -- ADDED: Join with report_statuses
//       LEFT JOIN users u ON r.user_id = u.user_id
//       WHERE r.is_deleted = 0
//       ORDER BY r.submitted_at DESC
//     `);
    
//     console.log(`Admin: Found ${reports.length} total reports`);
    
//     if (reports.length > 0) {
//       console.log('Sample report from database:', {
//         report_id: reports[0].report_id,
//         reporter_name: reports[0].reporter_name,
//         reporter_phone: reports[0].reporter_phone,
//         email: reports[0].email,
//         user_id: reports[0].user_id,
//         status_id: reports[0].status_id,
//         status_name: reports[0].status_name  // This will show now
//       });
//     }
    
//     // For each report, get task info and latest admin note
//     const reportsWithDetails = await Promise.all(
//       reports.map(async (report) => {
//         const reportData = { ...report };
        
//         // Get task information if exists
//         const [tasks] = await pool.execute(`
//           SELECT 
//             t.task_id,
//             t.assigned_to_user_id,
//             t.status_id as task_status_id,
//             DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
//             v.username as volunteer_name,
//             v.email as volunteer_email,
//             CAST(v.phone AS CHAR) AS volunteer_phone
//           FROM tasks t
//           LEFT JOIN users v ON t.assigned_to_user_id = v.user_id
//           WHERE t.report_id = ? AND t.is_deleted = 0
//           ORDER BY t.assigned_at DESC
//           LIMIT 1
//         `, [report.report_id]);
        
//         if (tasks.length > 0) {
//           const task = tasks[0];
//           reportData.volunteer_id = task.assigned_to_user_id;
//           reportData.volunteer_name = task.volunteer_name;
//           reportData.volunteer_email = task.volunteer_email;
//           reportData.volunteer_phone = task.volunteer_phone;
//           reportData.task_id = task.task_id;
//           reportData.task_status_id = task.task_status_id;
//           reportData.assigned_at = task.assigned_at;
//         }
        
//         // Get latest admin note
//         const [adminNotes] = await pool.execute(`
//           SELECT note_text as admin_note
//           FROM admin_notes
//           WHERE report_id = ?
//           ORDER BY created_at DESC
//           LIMIT 1
//         `, [report.report_id]);
        
//         if (adminNotes.length > 0) {
//           reportData.admin_note = adminNotes[0].admin_note;
//         }
        
//         return reportData;
//       })
//     );
    
//     res.json({
//       success: true,
//       data: reportsWithDetails,
//       count: reportsWithDetails.length
//     });
    
//   } catch (error) {
//     console.error('Error fetching all reports:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch reports',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// router.patch('/:id/status', verifyToken, async (req, res) => {
//   const reportId = Number(req.params.id);
//   const { status_id } = req.body;
  
//   if (!reportId) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid report ID'
//     });
//   }
  
//   if (!status_id || (status_id < 1 || status_id > 5)) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid status ID'
//     });
//   }
  
//   try {
//     // Admin check
//     if (req.user.role_id !== 3) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: Admin access required'
//       });
//     }
    
//     // Check if report exists
//     const [reportCheck] = await pool.execute(
//       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
//       [reportId]
//     );
    
//     if (reportCheck.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Report not found'
//       });
//     }
    
//     // Update report status
//     await pool.execute(
//       'UPDATE reports SET status_id = ? WHERE report_id = ?',
//       [status_id, reportId]
//     );
    
//     // Get updated report with status_name
//     const [updatedReport] = await pool.execute(`
//       SELECT 
//         r.report_id,
//         r.description,
//         r.status_id,
//         rs.status_name,  -- ADDED: Get status name from report_statuses
//         COALESCE(u.username, 'Anonymous') as reporter_name,
//         CAST(COALESCE(u.phone, 'No phone') AS CHAR) AS reporter_phone,
//         COALESCE(u.email, 'No email') as email
//       FROM reports r
//       LEFT JOIN report_statuses rs ON r.status_id = rs.status_id  -- ADDED: Join with report_statuses
//       LEFT JOIN users u ON r.user_id = u.user_id
//       WHERE r.report_id = ?
//     `, [reportId]);
    
//     res.json({
//       success: true,
//       message: 'Report status updated successfully',
//       data: updatedReport[0]
//     });
    
//   } catch (error) {
//     console.error('Error updating report status:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update report status',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// /* =====================================================
//    ASSIGN VOLUNTEER TO REPORT (ADMIN ONLY) - USING TASKS TABLE
// ===================================================== */
// router.post('/:id/assign', verifyToken, async (req, res) => {
//   const reportId = Number(req.params.id);
//   const { volunteer_id, status_id } = req.body;
//   const adminId = req.user.user_id; // Current admin assigning the task
  
//   if (!reportId) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid report ID'
//     });
//   }
  
//   if (!volunteer_id) {
//     return res.status(400).json({
//       success: false,
//       message: 'Volunteer ID is required'
//     });
//   }
  
//   const connection = await pool.getConnection();
  
//   try {
//     await connection.beginTransaction();
    
//     // Admin check
//     if (req.user.role_id !== 3) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: Admin access required'
//       });
//     }
    
//     // Check if report exists
//     const [reportCheck] = await connection.execute(
//       'SELECT report_id, status_id FROM reports WHERE report_id = ? AND is_deleted = 0',
//       [reportId]
//     );
    
//     if (reportCheck.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Report not found'
//       });
//     }
    
//     // Check if volunteer exists
//     const [volunteerCheck] = await connection.execute(
//       'SELECT user_id, username, email, phone FROM users WHERE user_id = ? AND role_id = 2',
//       [volunteer_id]
//     );
    
//     if (volunteerCheck.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Volunteer not found'
//       });
//     }
    
//     // Check if report already has an active task
//     const [existingTasks] = await connection.execute(`
//       SELECT task_id 
//       FROM tasks 
//       WHERE report_id = ? AND is_deleted = 0 AND status_id != 5
//     `, [reportId]);
    
//     if (existingTasks.length > 0) {
//       // Archive old task
//       await connection.execute(
//         'UPDATE tasks SET is_deleted = 1 WHERE report_id = ? AND is_deleted = 0',
//         [reportId]
//       );
//     }
    
//     // Create new task in tasks table
//     const newTaskStatus = 1; // 1 = Assigned (assuming task status: 1=Assigned, 2=In Progress, 3=Completed, 4=Cancelled, 5=Declined)
//     const [taskResult] = await connection.execute(
//       `INSERT INTO tasks 
//        (report_id, assigned_to_user_id, assigned_by_user_id, status_id, assigned_at, is_deleted) 
//        VALUES (?, ?, ?, ?, NOW(), 0)`,
//       [reportId, volunteer_id, adminId, newTaskStatus]
//     );
    
//     const taskId = taskResult.insertId;
    
//     // Update report status
//     const newReportStatus = status_id || 2; // Default to status 2 (Assigned) for reports
//     await connection.execute(
//       'UPDATE reports SET status_id = ? WHERE report_id = ?',
//       [newReportStatus, reportId]
//     );
    
//     await connection.commit();
    
//     const volunteer = volunteerCheck[0];
    
//     res.json({
//       success: true,
//       message: 'Volunteer assigned successfully',
//       data: {
//         report_id: reportId,
//         task_id: taskId,
//         volunteer_id: volunteer.user_id,
//         volunteer_name: volunteer.username,
//         volunteer_email: volunteer.email,
//         volunteer_phone: volunteer.phone,
//         status_id: newReportStatus,
//         assigned_at: new Date().toISOString()
//       }
//     });
    
//   } catch (error) {
//     await connection.rollback();
//     console.error('Error assigning volunteer:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to assign volunteer',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
    
//   } finally {
//     connection.release();
//   }
// });

// /* =====================================================
//    UNASSIGN VOLUNTEER FROM REPORT (ADMIN ONLY) - USING TASKS TABLE
// ===================================================== */
// router.put('/:id/unassign', verifyToken, async (req, res) => {
//   const reportId = Number(req.params.id);
//   const adminId = req.user.user_id;
  
//   if (!reportId) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid report ID'
//     });
//   }
  
//   const connection = await pool.getConnection();
  
//   try {
//     await connection.beginTransaction();
    
//     // Admin check
//     if (req.user.role_id !== 3) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: Admin access required'
//       });
//     }
    
//     // Check if report exists
//     const [reportCheck] = await connection.execute(
//       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
//       [reportId]
//     );
    
//     if (reportCheck.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Report not found'
//       });
//     }
    
//     // Check if report has an active task
//     const [existingTasks] = await connection.execute(`
//       SELECT task_id, assigned_to_user_id 
//       FROM tasks 
//       WHERE report_id = ? AND is_deleted = 0 AND status_id != 5
//     `, [reportId]);
    
//     if (existingTasks.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'Report does not have an assigned volunteer'
//       });
//     }
    
//     // Archive the task (soft delete)
//     await connection.execute(
//       'UPDATE tasks SET is_deleted = 1 WHERE report_id = ? AND is_deleted = 0',
//       [reportId]
//     );
    
//     // Update report status back to Submitted (status_id = 1)
//     await connection.execute(
//       'UPDATE reports SET status_id = 1 WHERE report_id = ?',
//       [reportId]
//     );
    
//     await connection.commit();
    
//     res.json({
//       success: true,
//       message: 'Volunteer unassigned successfully',
//       report_id: reportId,
//       status_id: 1
//     });
    
//   } catch (error) {
//     await connection.rollback();
//     console.error('Error unassigning volunteer:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to unassign volunteer',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
    
//   } finally {
//     connection.release();
//   }
// });

// /* =====================================================
//    ADD ADMIN NOTE TO REPORT (ADMIN ONLY)
// ===================================================== */
// router.post('/:id/admin-note', verifyToken, async (req, res) => {
//   const reportId = Number(req.params.id);
//   const { note } = req.body;
//   const adminId = req.user.user_id;
  
//   if (!reportId) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid report ID'
//     });
//   }
  
//   if (!note || note.trim().length === 0) {
//     return res.status(400).json({
//       success: false,
//       message: 'Note is required'
//     });
//   }
  
//   const connection = await pool.getConnection();
  
//   try {
//     await connection.beginTransaction();
    
//     // Admin check
//     if (req.user.role_id !== 3) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: Admin access required'
//       });
//     }
    
//     // Check if report exists
//     const [reportCheck] = await connection.execute(
//       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
//       [reportId]
//     );
    
//     if (reportCheck.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Report not found'
//       });
//     }
    
//     // Insert note into admin_notes table
//     const [result] = await connection.execute(
//       `INSERT INTO admin_notes (report_id, admin_id, note_text, created_at) 
//        VALUES (?, ?, ?, NOW())`,
//       [reportId, adminId, note.trim()]
//     );
    
//     await connection.commit();
    
//     res.json({
//       success: true,
//       message: 'Admin note saved successfully',
//       note_id: result.insertId,
//       report_id: reportId,
//       admin_note: note.trim(),
//       created_at: new Date().toISOString()
//     });
    
//   } catch (error) {
//     await connection.rollback();
//     console.error('Error saving admin note:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to save admin note',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
    
//   } finally {
//     connection.release();
//   }
// });

// /* =====================================================
//    GET ALL ADMIN NOTES FOR A REPORT (ADMIN ONLY)
// ===================================================== */
// router.get('/:id/admin-notes', verifyToken, async (req, res) => {
//   const reportId = Number(req.params.id);
  
//   if (!reportId) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid report ID'
//     });
//   }
  
//   try {
//     // Admin check
//     if (req.user.role_id !== 3) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: Admin access required'
//       });
//     }
    
//     // Check if report exists
//     const [reportCheck] = await pool.execute(
//       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
//       [reportId]
//     );
    
//     if (reportCheck.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Report not found'
//       });
//     }
    
//     // Get all admin notes for this report
//     const [notes] = await pool.execute(`
//       SELECT 
//         an.note_id,
//         an.report_id,
//         an.admin_id,
//         an.note_text,
//         DATE_FORMAT(an.created_at, '%Y-%m-%d %H:%i:%s') as created_at,
//         u.username as admin_name
//       FROM admin_notes an
//       LEFT JOIN users u ON an.admin_id = u.user_id
//       WHERE an.report_id = ?
//       ORDER BY an.created_at DESC
//     `, [reportId]);
    
//     res.json({
//       success: true,
//       data: notes,
//       count: notes.length
//     });
    
//   } catch (error) {
//     console.error('Error fetching admin notes:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch admin notes',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// /* =====================================================
//    DELETE ADMIN NOTE (ADMIN ONLY)
// ===================================================== */
// router.delete('/admin-note/:noteId', verifyToken, async (req, res) => {
//   const noteId = Number(req.params.noteId);
  
//   if (!noteId) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid note ID'
//     });
//   }
  
//   try {
//     // Admin check
//     if (req.user.role_id !== 3) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: Admin access required'
//       });
//     }
    
//     // Check if note exists
//     const [noteCheck] = await pool.execute(
//       'SELECT note_id, admin_id FROM admin_notes WHERE note_id = ?',
//       [noteId]
//     );
    
//     if (noteCheck.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Note not found'
//       });
//     }
    
//     // Check if admin owns the note or is super admin
//     if (noteCheck[0].admin_id !== req.user.user_id && req.user.role_id !== 3) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: You can only delete your own notes'
//       });
//     }
    
//     // Delete the note
//     await pool.execute(
//       'DELETE FROM admin_notes WHERE note_id = ?',
//       [noteId]
//     );
    
//     res.json({
//       success: true,
//       message: 'Admin note deleted successfully',
//       note_id: noteId
//     });
    
//   } catch (error) {
//     console.error('Error deleting admin note:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete admin note',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// /* =====================================================
//    GET REPORT STATISTICS (ADMIN ONLY)
// ===================================================== */
// router.get('/admin/statistics', verifyToken, async (req, res) => {
//   try {
//     if (req.user.role_id !== 3) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: Admin access required'
//       });
//     }
    
//     // Get total reports
//     const [totalResult] = await pool.execute(
//       'SELECT COUNT(*) as total FROM reports WHERE is_deleted = 0'
//     );
    
//     // Get reports by status with status names
//     const [statusResult] = await pool.execute(`
//       SELECT 
//         rs.status_id,
//         rs.status_name,
//         COUNT(r.report_id) as count
//       FROM report_statuses rs
//       LEFT JOIN reports r ON rs.status_id = r.status_id AND r.is_deleted = 0
//       GROUP BY rs.status_id, rs.status_name
//       ORDER BY rs.status_id
//     `);
    
//     // Get reports by animal type
//     const [typeResult] = await pool.execute(`
//       SELECT 
//         at.type_name,
//         COUNT(*) as count
//       FROM reports r
//       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
//       WHERE r.is_deleted = 0
//       GROUP BY at.type_name
//       ORDER BY count DESC
//     `);
    
//     // Get recent reports (last 7 days)
//     const [recentResult] = await pool.execute(`
//       SELECT 
//         COUNT(*) as recent_count
//       FROM reports 
//       WHERE is_deleted = 0 
//       AND submitted_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
//     `);
    
//     const statistics = {
//       total: totalResult[0].total || 0,
//       by_status: statusResult.map(row => ({
//         status_id: row.status_id,
//         status_name: row.status_name,
//         count: row.count || 0
//       })),
//       by_type: typeResult.map(row => ({
//         type_name: row.type_name || 'Unknown',
//         count: row.count
//       })),
//       recent_week: recentResult[0].recent_count || 0
//     };
    
//     res.json({
//       success: true,
//       data: statistics
//     });
    
//   } catch (error) {
//     console.error('Error fetching statistics:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch statistics',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// /* =====================================================
//    UPDATE REPORT DETAILS (ADMIN ONLY)
// ===================================================== */
// router.patch('/admin/:id', verifyToken, async (req, res) => {
//   const reportId = Number(req.params.id);
//   const { animal_type_id, animal_condition_id, description, location_address, user_note } = req.body;
  
//   if (!reportId) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid report ID'
//     });
//   }
  
//   const connection = await pool.getConnection();
  
//   try {
//     await connection.beginTransaction();
    
//     // Admin check
//     if (req.user.role_id !== 3) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: Admin access required'
//       });
//     }
    
//     // Check if report exists
//     const [reportCheck] = await connection.execute(
//       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
//       [reportId]
//     );
    
//     if (reportCheck.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Report not found'
//       });
//     }
    
//     // Build update fields
//     const updateFields = [];
//     const updateValues = [];
    
//     if (animal_type_id !== undefined) {
//       updateFields.push('animal_type_id = ?');
//       updateValues.push(animal_type_id);
//     }
    
//     if (animal_condition_id !== undefined) {
//       updateFields.push('animal_condition_id = ?');
//       updateValues.push(animal_condition_id);
//     }
    
//     if (description !== undefined) {
//       if (description.trim().length < 10) {
//         return res.status(400).json({
//           success: false,
//           message: 'Description must be at least 10 characters'
//         });
//       }
//       updateFields.push('description = ?');
//       updateValues.push(description.trim());
//     }
    
//     if (location_address !== undefined) {
//       if (location_address.trim().length < 5) {
//         return res.status(400).json({
//           success: false,
//           message: 'Location must be at least 5 characters'
//         });
//       }
//       updateFields.push('location_address = ?');
//       updateValues.push(location_address.trim());
//     }
    
//     if (user_note !== undefined) {
//       updateFields.push('user_note = ?');
//       updateValues.push(user_note ? user_note.trim() : null);
//     }
    
//     if (updateFields.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'No fields to update'
//       });
//     }
    
//     updateValues.push(reportId);
    
//     const updateQuery = `
//       UPDATE reports
//       SET ${updateFields.join(', ')}
//       WHERE report_id = ?
//     `;
    
//     await connection.execute(updateQuery, updateValues);
    
//     await connection.commit();
    
//     // Get updated report with status_name
//     const [updatedReport] = await connection.execute(`
//       SELECT 
//         r.report_id,
//         r.description,
//         r.location_address,
//         r.user_note,
//         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
//         at.type_name as animal_type,
//         ac.condition_name as animal_condition,
//         r.status_id,
//         rs.status_name,  -- ADDED: Get status name from report_statuses
//         COALESCE(u.username, 'Anonymous') as reporter_name,
//         CAST(COALESCE(u.phone, 'No phone') AS CHAR) AS reporter_phone,
//         COALESCE(u.email, 'No email') as email
//       FROM reports r
//       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
//       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
//       LEFT JOIN report_statuses rs ON r.status_id = rs.status_id  -- ADDED: Join with report_statuses
//       LEFT JOIN users u ON r.user_id = u.user_id
//       WHERE r.report_id = ?
//     `, [reportId]);
    
//     res.json({
//       success: true,
//       message: 'Report updated successfully',
//       data: updatedReport[0]
//     });
    
//   } catch (error) {
//     await connection.rollback();
//     console.error('Error updating report:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update report',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
    
//   } finally {
//     connection.release();
//   }
// });

// /* =====================================================
//    GET TASKS FOR A REPORT (ADMIN ONLY)
// ===================================================== */
// router.get('/:id/tasks', verifyToken, async (req, res) => {
//   const reportId = Number(req.params.id);
  
//   if (!reportId) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid report ID'
//     });
//   }
  
//   try {
//     // Admin check
//     if (req.user.role_id !== 3) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: Admin access required'
//       });
//     }
    
//     // Check if report exists
//     const [reportCheck] = await pool.execute(
//       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
//       [reportId]
//     );
    
//     if (reportCheck.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Report not found'
//       });
//     }
    
//     // Get all tasks for this report
//     const [tasks] = await pool.execute(`
//       SELECT 
//         t.task_id,
//         t.report_id,
//         t.assigned_to_user_id,
//         t.assigned_by_user_id,
//         t.status_id as task_status_id,
//         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
//         DATE_FORMAT(t.started_at, '%Y-%m-%d %H:%i:%s') as started_at,
//         DATE_FORMAT(t.completed_at, '%Y-%m-%d %H:%i:%s') as completed_at,
//         t.is_deleted,
//         v.username as volunteer_name,
//         v.email as volunteer_email,
//         CAST(v.phone AS CHAR) AS volunteer_phone,
//         a.username as assigned_by_name
//       FROM tasks t
//       LEFT JOIN users v ON t.assigned_to_user_id = v.user_id
//       LEFT JOIN users a ON t.assigned_by_user_id = a.user_id
//       WHERE t.report_id = ?
//       ORDER BY t.assigned_at DESC
//     `, [reportId]);
    
//     res.json({
//       success: true,
//       data: tasks,
//       count: tasks.length
//     });
    
//   } catch (error) {
//     console.error('Error fetching tasks:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch tasks',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// /* =====================================================
//    GET STATUS LIST (FOR FRONTEND)
// ===================================================== */
// router.get('/status/list', verifyToken, async (req, res) => {
//   try {
//     const [statuses] = await pool.execute(`
//       SELECT status_id, status_name 
//       FROM report_statuses 
//       ORDER BY status_id
//     `);
    
//     res.json({
//       success: true,
//       data: statuses
//     });
    
//   } catch (error) {
//     console.error('Error fetching status list:', error);
    
//     // Fallback data
//     const fallbackStatuses = [
//       { status_id: 1, status_name: 'submitted' },
//       { status_id: 2, status_name: 'assigned' },
//       { status_id: 3, status_name: 'in_progress' },
//       { status_id: 4, status_name: 'completed' },
//       { status_id: 5, status_name: 'declined' }
//     ];
    
//     res.json({
//       success: true,
//       data: fallbackStatuses,
//       message: 'Using fallback status data'
//     });
//   }
// });

// router.get('/test', (req, res) => {
//   res.json({
//     success: true,
//     message: 'Report API test endpoint is working',
//     timestamp: new Date().toISOString()
//   });
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const verifyToken = require('../middleware/auth');
// const mysql = require('mysql2/promise');
// require('dotenv').config();

// const pool = mysql.createPool({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || '',
//   database: process.env.DB_NAME || 'animal_rescue_system',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// console.log('Report routes initialized');

// router.get('/health', (req, res) => {
//   res.json({
//     success: true,
//     message: 'Report API is running',
//     timestamp: new Date().toISOString(),
//     status: 'online'
//   });
// });

// router.get('/animal-types', verifyToken, async (req, res) => {
//   try {
//     const [rows] = await pool.execute(
//       'SELECT type_id, type_name FROM animal_types ORDER BY type_name'
//     );
    
//     res.json({
//       success: true,
//       data: rows
//     });
    
//   } catch (error) {
//     const fallbackData = [
//       { type_id: 1, type_name: 'Dog' },
//       { type_id: 2, type_name: 'Cat' },
//       { type_id: 3, type_name: 'Bird' },
//       { type_id: 4, type_name: 'Rabbit' },
//       { type_id: 5, type_name: 'Hamster' },
//       { type_id: 6, type_name: 'Turtle' },
//       { type_id: 7, type_name: 'Horse' },
//       { type_id: 8, type_name: 'Cow' },
//       { type_id: 9, type_name: 'Goat' },
//       { type_id: 10, type_name: 'Sheep' },
//       { type_id: 11, type_name: 'Other' }
//     ];
    
//     res.json({
//       success: true,
//       data: fallbackData,
//       message: 'Using fallback data'
//     });
//   }
// });

// router.get('/animal-conditions', verifyToken, async (req, res) => {
//   try {
//     const [rows] = await pool.execute(
//       'SELECT condition_id, condition_name FROM animal_conditions ORDER BY condition_name'
//     );
    
//     res.json({
//       success: true,
//       data: rows
//     });
    
//   } catch (error) {
//     const fallbackData = [
//       { condition_id: 1, condition_name: 'Injured' },
//       { condition_id: 2, condition_name: 'Sick' },
//       { condition_id: 3, condition_name: 'Abandoned' }
//     ];
    
//     res.json({
//       success: true,
//       data: fallbackData,
//       message: 'Using fallback data'
//     });
//   }
// });

// router.post('/submit', verifyToken, async (req, res) => {
//   const connection = await pool.getConnection();
  
//   try {
//     await connection.beginTransaction();
    
//     const userId = req.user.user_id;
//     const { animal_type_id, animal_condition_id, description, location_address, user_note } = req.body;
    
//     if (!animal_type_id || !animal_condition_id || !description || !location_address) {
//       return res.status(400).json({
//         success: false,
//         message: 'All fields are required'
//       });
//     }
    
//     if (description.trim().length < 10) {
//       return res.status(400).json({
//         success: false,
//         message: 'Description must be at least 10 characters'
//       });
//     }
    
//     if (location_address.trim().length < 5) {
//       return res.status(400).json({
//         success: false,
//         message: 'Location must be at least 5 characters'
//       });
//     }
    
//     const [result] = await connection.execute(
//       `INSERT INTO reports 
//        (user_id, animal_type_id, animal_condition_id, description, 
//         location_address, status_id, user_note, submitted_at, is_deleted) 
//        VALUES (?, ?, ?, ?, ?, 1, ?, NOW(), 0)`,
//       [
//         userId, 
//         animal_type_id, 
//         animal_condition_id, 
//         description.trim(), 
//         location_address.trim(),
//         user_note ? user_note.trim() : null
//       ]
//     );
    
//     await connection.commit();
    
//     const reportId = result.insertId;
    
//     let reportDetails = {};
//     try {
//       const [report] = await connection.execute(`
//         SELECT 
//           r.report_id,
//           r.description,
//           r.location_address,
//           r.user_note,
//           DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
//           at.type_name as animal_type,
//           ac.condition_name as animal_condition,
//           r.status_id,
//           rs.status_name,
//           COALESCE(u.username, 'Anonymous') as reporter_name,
//           CAST(COALESCE(u.phone, 'No phone') AS CHAR) AS reporter_phone,
//           COALESCE(u.email, 'No email') as email
//         FROM reports r
//         LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
//         LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
//         LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
//         LEFT JOIN users u ON r.user_id = u.user_id
//         WHERE r.report_id = ?
//       `, [reportId]);
      
//       if (report.length > 0) {
//         reportDetails = report[0];
//       }
//     } catch (error) {
//       console.log('Could not fetch report details:', error.message);
//     }
    
//     res.json({
//       success: true,
//       message: 'Report submitted successfully',
//       report_id: reportId,
//       report: reportDetails
//     });
    
//   } catch (error) {
//     await connection.rollback();
    
//     let errorMessage = 'Failed to submit report';
//     if (error.code === 'ER_NO_SUCH_TABLE') {
//       errorMessage = 'Database tables not found';
//     } else if (error.code === 'ER_DUP_ENTRY') {
//       errorMessage = 'Duplicate entry detected';
//     }
    
//     res.status(500).json({
//       success: false,
//       message: errorMessage,
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
    
//   } finally {
//     connection.release();
//   }
// });

// router.get('/my-reports', verifyToken, async (req, res) => {
//   const userId = req.user.user_id;
  
//   try {
//     console.log('FETCHING reports for user ID:', userId);
    
//     const [reports] = await pool.execute(`
//       SELECT 
//         r.report_id,
//         r.user_id,
//         r.description,
//         r.location_address,
//         r.user_note,
//         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
//         at.type_name as animal_type,
//         ac.condition_name as animal_condition,
//         r.status_id,
//         rs.status_name,
//         COALESCE(u.username, 'Anonymous') as reporter_name,
//         CAST(COALESCE(u.phone, 'No phone') AS CHAR) AS reporter_phone,
//         COALESCE(u.email, 'No email') as email
//       FROM reports r
//       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
//       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
//       LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
//       LEFT JOIN users u ON r.user_id = u.user_id
//       WHERE r.user_id = ? AND r.is_deleted = 0
//       ORDER BY r.submitted_at DESC
//     `, [userId]);
    
//     console.log(`Found ${reports.length} reports for user ${userId}`);
    
//     res.json({
//       success: true,
//       data: reports,
//       count: reports.length
//     });
    
//   } catch (error) {
//     console.error('Error fetching user reports:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch user reports',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// router.get('/:id', verifyToken, async (req, res) => {
//   const reportId = Number(req.params.id);
//   const userId = req.user.user_id;
  
//   if (!reportId) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid report ID'
//     });
//   }
  
//   try {
//     const [reports] = await pool.execute(`
//       SELECT 
//         r.report_id,
//         r.user_id,
//         r.description,
//         r.location_address,
//         r.user_note,
//         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
//         at.type_name as animal_type,
//         ac.condition_name as animal_condition,
//         r.status_id,
//         rs.status_name,
//         COALESCE(u.username, 'Anonymous') as reporter_name,
//         CAST(COALESCE(u.phone, 'No phone') AS CHAR) AS reporter_phone,
//         COALESCE(u.email, 'No email') as email
//       FROM reports r
//       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
//       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
//       LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
//       LEFT JOIN users u ON r.user_id = u.user_id
//       WHERE r.report_id = ? AND r.is_deleted = 0
//     `, [reportId]);
    
//     if (reports.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Report not found'
//       });
//     }
    
//     let report = reports[0];
    
//     const [tasks] = await pool.execute(`
//       SELECT 
//         t.task_id,
//         t.assigned_to_user_id,
//         t.status_id as task_status_id,
//         ts.status_name as task_status,
//         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
//         v.username as volunteer_name,
//         v.email as volunteer_email,
//         CAST(v.phone AS CHAR) AS volunteer_phone
//       FROM tasks t
//       LEFT JOIN users v ON t.assigned_to_user_id = v.user_id
//       LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
//       WHERE t.report_id = ? AND t.is_deleted = 0
//       ORDER BY t.assigned_at DESC
//       LIMIT 1
//     `, [reportId]);
    
//     if (tasks.length > 0) {
//       const task = tasks[0];
//       report.volunteer_id = task.assigned_to_user_id;
//       report.volunteer_name = task.volunteer_name;
//       report.volunteer_email = task.volunteer_email;
//       report.volunteer_phone = task.volunteer_phone;
//       report.task_id = task.task_id;
//       report.task_status_id = task.task_status_id;
//       report.task_status = task.task_status;
//       report.assigned_at = task.assigned_at;
//     }
    
//     const [adminNotes] = await pool.execute(`
//       SELECT note_text, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at
//       FROM admin_notes
//       WHERE report_id = ?
//       ORDER BY created_at DESC
//       LIMIT 1
//     `, [reportId]);
    
//     if (adminNotes.length > 0) {
//       report.admin_note = adminNotes[0].note_text;
//     }
    
//     if (report.user_id !== userId && req.user.role_id !== 3) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: You can only view your own reports'
//       });
//     }
    
//     res.json({
//       success: true,
//       data: report
//     });
    
//   } catch (error) {
//     console.error('Error fetching report:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch report',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// router.patch('/:id', verifyToken, async (req, res) => {
//   const reportId = Number(req.params.id);
//   const userId = req.user.user_id;
//   const { description, location_address, user_note } = req.body;
  
//   if (!reportId) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid report ID'
//     });
//   }
  
//   try {
//     const [reportCheck] = await pool.execute(
//       'SELECT user_id, status_id FROM reports WHERE report_id = ? AND is_deleted = 0',
//       [reportId]
//     );
    
//     if (reportCheck.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Report not found'
//       });
//     }
    
//     if (reportCheck[0].user_id !== userId) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: You can only update your own reports'
//       });
//     }
    
//     if (reportCheck[0].status_id !== 1) {
//       return res.status(400).json({
//         success: false,
//         message: 'Report cannot be edited after it has been reviewed'
//       });
//     }
    
//     const updateFields = [];
//     const updateValues = [];
    
//     if (description !== undefined) {
//       if (description.trim().length < 10) {
//         return res.status(400).json({
//           success: false,
//           message: 'Description must be at least 10 characters'
//         });
//       }
//       updateFields.push('description = ?');
//       updateValues.push(description.trim());
//     }
    
//     if (location_address !== undefined) {
//       if (location_address.trim().length < 5) {
//         return res.status(400).json({
//           success: false,
//           message: 'Location must be at least 5 characters'
//         });
//       }
//       updateFields.push('location_address = ?');
//       updateValues.push(location_address.trim());
//     }
    
//     if (user_note !== undefined) {
//       updateFields.push('user_note = ?');
//       updateValues.push(user_note ? user_note.trim() : null);
//     }
    
//     if (updateFields.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'No fields to update'
//       });
//     }
    
//     updateValues.push(reportId);
    
//     const updateQuery = `
//       UPDATE reports
//       SET ${updateFields.join(', ')}
//       WHERE report_id = ? AND is_deleted = 0
//     `;
    
//     await pool.execute(updateQuery, updateValues);
    
//     const [updatedReport] = await pool.execute(`
//       SELECT 
//         r.report_id,
//         r.description,
//         r.location_address,
//         r.user_note,
//         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
//         at.type_name as animal_type,
//         ac.condition_name as animal_condition,
//         r.status_id,
//         rs.status_name,
//         COALESCE(u.username, 'Anonymous') as reporter_name,
//         CAST(COALESCE(u.phone, 'No phone') AS CHAR) AS reporter_phone,
//         COALESCE(u.email, 'No email') as email
//       FROM reports r
//       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
//       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
//       LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
//       LEFT JOIN users u ON r.user_id = u.user_id
//       WHERE r.report_id = ?
//     `, [reportId]);
    
//     res.json({
//       success: true,
//       message: 'Report updated successfully',
//       data: updatedReport[0]
//     });
    
//   } catch (error) {
//     console.error('Error updating report:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update report',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// router.delete('/:id', verifyToken, async (req, res) => {
//   const reportId = Number(req.params.id);
//   const userId = req.user.user_id;
  
//   if (!reportId) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid report ID'
//     });
//   }
  
//   const connection = await pool.getConnection();
  
//   try {
//     await connection.beginTransaction();
    
//     const [reportCheck] = await connection.execute(
//       'SELECT user_id FROM reports WHERE report_id = ? AND is_deleted = 0',
//       [reportId]
//     );
    
//     if (reportCheck.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Report not found'
//       });
//     }
    
//     if (reportCheck[0].user_id !== userId && req.user.role_id !== 3) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: You can only delete your own reports'
//       });
//     }
    
//     await connection.execute(
//       'UPDATE reports SET is_deleted = 1 WHERE report_id = ?',
//       [reportId]
//     );
    
//     await connection.commit();
    
//     res.json({
//       success: true,
//       message: 'Report deleted successfully',
//       report_id: reportId
//     });
    
//   } catch (error) {
//     await connection.rollback();
//     console.error('Error deleting report:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete report',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
    
//   } finally {
//     connection.release();
//   }
// });

// router.get('/admin/all', verifyToken, async (req, res) => {
//   try {
//     if (req.user.role_id !== 3) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: Admin access required'
//       });
//     }
    
//     const [reports] = await pool.execute(`
//       SELECT 
//         r.report_id,
//         r.user_id,
//         r.description,
//         r.location_address,
//         r.user_note,
//         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
//         at.type_name as animal_type,
//         ac.condition_name as animal_condition,
//         r.status_id,
//         rs.status_name,
//         COALESCE(u.username, 'Anonymous') as reporter_name,
//         CAST(COALESCE(u.phone, 'No phone') AS CHAR) AS reporter_phone,
//         COALESCE(u.email, 'No email') as email
//       FROM reports r
//       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
//       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
//       LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
//       LEFT JOIN users u ON r.user_id = u.user_id
//       WHERE r.is_deleted = 0
//       ORDER BY r.submitted_at DESC
//     `);
    
//     console.log(`Admin: Found ${reports.length} total reports`);
    
//     const reportsWithDetails = await Promise.all(
//       reports.map(async (report) => {
//         const reportData = { ...report };
        
//         const [tasks] = await pool.execute(`
//           SELECT 
//             t.task_id,
//             t.assigned_to_user_id,
//             t.status_id as task_status_id,
//             ts.status_name as task_status,
//             DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
//             v.username as volunteer_name,
//             v.email as volunteer_email,
//             CAST(v.phone AS CHAR) AS volunteer_phone
//           FROM tasks t
//           LEFT JOIN users v ON t.assigned_to_user_id = v.user_id
//           LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
//           WHERE t.report_id = ? AND t.is_deleted = 0
//           ORDER BY t.assigned_at DESC
//           LIMIT 1
//         `, [report.report_id]);
        
//         if (tasks.length > 0) {
//           const task = tasks[0];
//           reportData.volunteer_id = task.assigned_to_user_id;
//           reportData.volunteer_name = task.volunteer_name;
//           reportData.volunteer_email = task.volunteer_email;
//           reportData.volunteer_phone = task.volunteer_phone;
//           reportData.task_id = task.task_id;
//           reportData.task_status_id = task.task_status_id;
//           reportData.task_status = task.task_status;
//           reportData.assigned_at = task.assigned_at;
//         }
        
//         const [adminNotes] = await pool.execute(`
//           SELECT note_text as admin_note
//           FROM admin_notes
//           WHERE report_id = ?
//           ORDER BY created_at DESC
//           LIMIT 1
//         `, [report.report_id]);
        
//         if (adminNotes.length > 0) {
//           reportData.admin_note = adminNotes[0].admin_note;
//         }
        
//         return reportData;
//       })
//     );
    
//     res.json({
//       success: true,
//       data: reportsWithDetails,
//       count: reportsWithDetails.length
//     });
    
//   } catch (error) {
//     console.error('Error fetching all reports:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch reports',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// router.patch('/:id/status', verifyToken, async (req, res) => {
//   const reportId = Number(req.params.id);
//   const { status_id } = req.body;
  
//   if (!reportId) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid report ID'
//     });
//   }
  
//   if (!status_id || (status_id < 1 || status_id > 5)) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid status ID'
//     });
//   }
  
//   try {
//     if (req.user.role_id !== 3) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: Admin access required'
//       });
//     }
    
//     const [reportCheck] = await pool.execute(
//       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
//       [reportId]
//     );
    
//     if (reportCheck.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Report not found'
//       });
//     }
    
//     await pool.execute(
//       'UPDATE reports SET status_id = ? WHERE report_id = ?',
//       [status_id, reportId]
//     );
    
//     const [updatedReport] = await pool.execute(`
//       SELECT 
//         r.report_id,
//         r.description,
//         r.status_id,
//         rs.status_name,
//         COALESCE(u.username, 'Anonymous') as reporter_name,
//         CAST(COALESCE(u.phone, 'No phone') AS CHAR) AS reporter_phone,
//         COALESCE(u.email, 'No email') as email
//       FROM reports r
//       LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
//       LEFT JOIN users u ON r.user_id = u.user_id
//       WHERE r.report_id = ?
//     `, [reportId]);
    
//     res.json({
//       success: true,
//       message: 'Report status updated successfully',
//       data: updatedReport[0]
//     });
    
//   } catch (error) {
//     console.error('Error updating report status:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update report status',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// // =====================================================
// // FIXED: ASSIGN VOLUNTEER TO REPORT - COMPLETE
// // Handles duplicate key error by ALWAYS reactivating existing task
// // =====================================================
// router.post('/:id/assign', verifyToken, async (req, res) => {
//   const reportId = Number(req.params.id);
//   const { volunteer_id } = req.body;
//   const adminId = req.user.user_id;
  
//   if (!reportId) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid report ID'
//     });
//   }
  
//   if (!volunteer_id) {
//     return res.status(400).json({
//       success: false,
//       message: 'Volunteer ID is required'
//     });
//   }
  
//   const connection = await pool.getConnection();
  
//   try {
//     await connection.beginTransaction();
    
//     if (req.user.role_id !== 3) {
//       await connection.rollback();
//       connection.release();
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: Admin access required'
//       });
//     }
    
//     const [reportCheck] = await connection.execute(
//       'SELECT report_id, status_id FROM reports WHERE report_id = ? AND is_deleted = 0',
//       [reportId]
//     );
    
//     if (reportCheck.length === 0) {
//       await connection.rollback();
//       connection.release();
//       return res.status(404).json({
//         success: false,
//         message: 'Report not found'
//       });
//     }
    
//     const [volunteerCheck] = await connection.execute(
//       'SELECT user_id, username, email, phone FROM users WHERE user_id = ? AND role_id = 2',
//       [volunteer_id]
//     );
    
//     if (volunteerCheck.length === 0) {
//       await connection.rollback();
//       connection.release();
//       return res.status(404).json({
//         success: false,
//         message: 'Volunteer not found'
//       });
//     }
    
//     // CRITICAL FIX: Check for ANY existing task (including deleted ones)
//     const [existingTasks] = await connection.execute(
//       'SELECT task_id, is_deleted, status_id FROM tasks WHERE report_id = ?',
//       [reportId]
//     );
    
//     let taskId;
    
//     if (existingTasks.length > 0) {
//       const existingTask = existingTasks[0];
      
//       // ALWAYS reactivate the existing task (whether deleted or not)
//       console.log(`Reactivating task ${existingTask.task_id} for report ${reportId}`);
//       await connection.execute(
//         `UPDATE tasks 
//          SET assigned_to_user_id = ?, 
//              assigned_by_user_id = ?, 
//              status_id = 1, 
//              assigned_at = NOW(), 
//              is_deleted = 0 
//          WHERE task_id = ?`,
//         [volunteer_id, adminId, existingTask.task_id]
//       );
//       taskId = existingTask.task_id;
      
//     } else {
//       // No task exists at all - create new one
//       console.log(`Creating new task for report ${reportId} with status ASSIGNED (1)...`);
//       const [taskResult] = await connection.execute(
//         `INSERT INTO tasks 
//          (report_id, assigned_to_user_id, assigned_by_user_id, status_id, assigned_at, is_deleted) 
//          VALUES (?, ?, ?, 1, NOW(), 0)`,
//         [reportId, volunteer_id, adminId]
//       );
//       taskId = taskResult.insertId;
//     }
    
//     // Update report status to ASSIGNED (2)
//     await connection.execute(
//       'UPDATE reports SET status_id = 2 WHERE report_id = ?',
//       [reportId]
//     );
    
//     await connection.commit();
    
//     const volunteer = volunteerCheck[0];
    
//     res.json({
//       success: true,
//       message: 'Volunteer assigned successfully. Task is in ASSIGNED state - volunteer must accept it.',
//       data: {
//         report_id: reportId,
//         task_id: taskId,
//         volunteer_id: volunteer.user_id,
//         volunteer_name: volunteer.username,
//         volunteer_email: volunteer.email,
//         volunteer_phone: volunteer.phone || '',
//         task_status_id: 1,
//         task_status: 'assigned',
//         report_status_id: 2,
//         assigned_at: new Date().toISOString()
//       }
//     });
    
//   } catch (error) {
//     await connection.rollback();
//     console.error('Error assigning volunteer:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to assign volunteer',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
    
//   } finally {
//     connection.release();
//   }
// });

// // =====================================================
// // FIXED: UNASSIGN VOLUNTEER FROM REPORT
// // =====================================================
// router.put('/:id/unassign', verifyToken, async (req, res) => {
//   const reportId = Number(req.params.id);
  
//   if (!reportId) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid report ID'
//     });
//   }
  
//   const connection = await pool.getConnection();
  
//   try {
//     await connection.beginTransaction();
    
//     if (req.user.role_id !== 3) {
//       await connection.rollback();
//       connection.release();
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: Admin access required'
//       });
//     }
    
//     const [reportCheck] = await connection.execute(
//       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
//       [reportId]
//     );
    
//     if (reportCheck.length === 0) {
//       await connection.rollback();
//       connection.release();
//       return res.status(404).json({
//         success: false,
//         message: 'Report not found'
//       });
//     }
    
//     // Check for ANY active task (is_deleted = 0)
//     const [existingTasks] = await connection.execute(
//       'SELECT task_id FROM tasks WHERE report_id = ? AND is_deleted = 0',
//       [reportId]
//     );
    
//     if (existingTasks.length === 0) {
//       await connection.rollback();
//       connection.release();
//       return res.status(400).json({
//         success: false,
//         message: 'Report does not have an assigned volunteer'
//       });
//     }
    
//     // Soft delete the task
//     await connection.execute(
//       'UPDATE tasks SET is_deleted = 1, updated_at = NOW() WHERE report_id = ? AND is_deleted = 0',
//       [reportId]
//     );
    
//     // Reset report status to SUBMITTED (1)
//     await connection.execute(
//       'UPDATE reports SET status_id = 1 WHERE report_id = ?',
//       [reportId]
//     );
    
//     await connection.commit();
    
//     res.json({
//       success: true,
//       message: 'Volunteer unassigned successfully',
//       data: {
//         report_id: reportId,
//         status_id: 1,
//         unassigned_at: new Date().toISOString()
//       }
//     });
    
//   } catch (error) {
//     await connection.rollback();
//     console.error('Error unassigning volunteer:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to unassign volunteer',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
    
//   } finally {
//     connection.release();
//   }
// });

// // =====================================================
// // ADD ADMIN NOTE TO REPORT (ADMIN ONLY)
// // =====================================================
// router.post('/:id/admin-note', verifyToken, async (req, res) => {
//   const reportId = Number(req.params.id);
//   const { note } = req.body;
//   const adminId = req.user.user_id;
  
//   if (!reportId) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid report ID'
//     });
//   }
  
//   if (!note || note.trim().length === 0) {
//     return res.status(400).json({
//       success: false,
//       message: 'Note is required'
//     });
//   }
  
//   const connection = await pool.getConnection();
  
//   try {
//     await connection.beginTransaction();
    
//     if (req.user.role_id !== 3) {
//       await connection.rollback();
//       connection.release();
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: Admin access required'
//       });
//     }
    
//     const [reportCheck] = await connection.execute(
//       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
//       [reportId]
//     );
    
//     if (reportCheck.length === 0) {
//       await connection.rollback();
//       connection.release();
//       return res.status(404).json({
//         success: false,
//         message: 'Report not found'
//       });
//     }
    
//     const [result] = await connection.execute(
//       `INSERT INTO admin_notes (report_id, admin_id, note_text, created_at) 
//        VALUES (?, ?, ?, NOW())`,
//       [reportId, adminId, note.trim()]
//     );
    
//     await connection.commit();
    
//     res.json({
//       success: true,
//       message: 'Admin note saved successfully',
//       data: {
//         note_id: result.insertId,
//         report_id: reportId,
//         admin_note: note.trim(),
//         created_at: new Date().toISOString()
//       }
//     });
    
//   } catch (error) {
//     await connection.rollback();
//     console.error('Error saving admin note:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to save admin note',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
    
//   } finally {
//     connection.release();
//   }
// });

// // =====================================================
// // GET ALL ADMIN NOTES FOR A REPORT (ADMIN ONLY)
// // =====================================================
// router.get('/:id/admin-notes', verifyToken, async (req, res) => {
//   const reportId = Number(req.params.id);
  
//   if (!reportId) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid report ID'
//     });
//   }
  
//   try {
//     if (req.user.role_id !== 3) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: Admin access required'
//       });
//     }
    
//     const [reportCheck] = await pool.execute(
//       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
//       [reportId]
//     );
    
//     if (reportCheck.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Report not found'
//       });
//     }
    
//     const [notes] = await pool.execute(`
//       SELECT 
//         an.note_id,
//         an.report_id,
//         an.admin_id,
//         an.note_text,
//         DATE_FORMAT(an.created_at, '%Y-%m-%d %H:%i:%s') as created_at,
//         u.username as admin_name
//       FROM admin_notes an
//       LEFT JOIN users u ON an.admin_id = u.user_id
//       WHERE an.report_id = ?
//       ORDER BY an.created_at DESC
//     `, [reportId]);
    
//     res.json({
//       success: true,
//       data: notes,
//       count: notes.length
//     });
    
//   } catch (error) {
//     console.error('Error fetching admin notes:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch admin notes',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// // =====================================================
// // DELETE ADMIN NOTE (ADMIN ONLY)
// // =====================================================
// router.delete('/admin-note/:noteId', verifyToken, async (req, res) => {
//   const noteId = Number(req.params.noteId);
  
//   if (!noteId) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid note ID'
//     });
//   }
  
//   try {
//     if (req.user.role_id !== 3) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: Admin access required'
//       });
//     }
    
//     const [noteCheck] = await pool.execute(
//       'SELECT note_id, admin_id FROM admin_notes WHERE note_id = ?',
//       [noteId]
//     );
    
//     if (noteCheck.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Note not found'
//       });
//     }
    
//     if (noteCheck[0].admin_id !== req.user.user_id && req.user.role_id !== 3) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: You can only delete your own notes'
//       });
//     }
    
//     await pool.execute(
//       'DELETE FROM admin_notes WHERE note_id = ?',
//       [noteId]
//     );
    
//     res.json({
//       success: true,
//       message: 'Admin note deleted successfully',
//       data: { note_id: noteId }
//     });
    
//   } catch (error) {
//     console.error('Error deleting admin note:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete admin note',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// // =====================================================
// // GET REPORT STATISTICS (ADMIN ONLY)
// // =====================================================
// router.get('/admin/statistics', verifyToken, async (req, res) => {
//   try {
//     if (req.user.role_id !== 3) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: Admin access required'
//       });
//     }
    
//     const [totalResult] = await pool.execute(
//       'SELECT COUNT(*) as total FROM reports WHERE is_deleted = 0'
//     );
    
//     const [statusResult] = await pool.execute(`
//       SELECT 
//         rs.status_id,
//         rs.status_name,
//         COUNT(r.report_id) as count
//       FROM report_statuses rs
//       LEFT JOIN reports r ON rs.status_id = r.status_id AND r.is_deleted = 0
//       GROUP BY rs.status_id, rs.status_name
//       ORDER BY rs.status_id
//     `);
    
//     const [typeResult] = await pool.execute(`
//       SELECT 
//         at.type_name,
//         COUNT(*) as count
//       FROM reports r
//       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
//       WHERE r.is_deleted = 0
//       GROUP BY at.type_name
//       ORDER BY count DESC
//     `);
    
//     const [recentResult] = await pool.execute(`
//       SELECT 
//         COUNT(*) as recent_count
//       FROM reports 
//       WHERE is_deleted = 0 
//       AND submitted_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
//     `);
    
//     const statistics = {
//       total: totalResult[0].total || 0,
//       by_status: statusResult.map(row => ({
//         status_id: row.status_id,
//         status_name: row.status_name,
//         count: row.count || 0
//       })),
//       by_type: typeResult.map(row => ({
//         type_name: row.type_name || 'Unknown',
//         count: row.count
//       })),
//       recent_week: recentResult[0].recent_count || 0
//     };
    
//     res.json({
//       success: true,
//       data: statistics
//     });
    
//   } catch (error) {
//     console.error('Error fetching statistics:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch statistics',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// // =====================================================
// // UPDATE REPORT DETAILS (ADMIN ONLY)
// // =====================================================
// router.patch('/admin/:id', verifyToken, async (req, res) => {
//   const reportId = Number(req.params.id);
//   const { animal_type_id, animal_condition_id, description, location_address, user_note } = req.body;
  
//   if (!reportId) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid report ID'
//     });
//   }
  
//   const connection = await pool.getConnection();
  
//   try {
//     await connection.beginTransaction();
    
//     if (req.user.role_id !== 3) {
//       await connection.rollback();
//       connection.release();
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: Admin access required'
//       });
//     }
    
//     const [reportCheck] = await connection.execute(
//       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
//       [reportId]
//     );
    
//     if (reportCheck.length === 0) {
//       await connection.rollback();
//       connection.release();
//       return res.status(404).json({
//         success: false,
//         message: 'Report not found'
//       });
//     }
    
//     const updateFields = [];
//     const updateValues = [];
    
//     if (animal_type_id !== undefined) {
//       updateFields.push('animal_type_id = ?');
//       updateValues.push(animal_type_id);
//     }
    
//     if (animal_condition_id !== undefined) {
//       updateFields.push('animal_condition_id = ?');
//       updateValues.push(animal_condition_id);
//     }
    
//     if (description !== undefined) {
//       if (description.trim().length < 10) {
//         await connection.rollback();
//         connection.release();
//         return res.status(400).json({
//           success: false,
//           message: 'Description must be at least 10 characters'
//         });
//       }
//       updateFields.push('description = ?');
//       updateValues.push(description.trim());
//     }
    
//     if (location_address !== undefined) {
//       if (location_address.trim().length < 5) {
//         await connection.rollback();
//         connection.release();
//         return res.status(400).json({
//           success: false,
//           message: 'Location must be at least 5 characters'
//         });
//       }
//       updateFields.push('location_address = ?');
//       updateValues.push(location_address.trim());
//     }
    
//     if (user_note !== undefined) {
//       updateFields.push('user_note = ?');
//       updateValues.push(user_note ? user_note.trim() : null);
//     }
    
//     if (updateFields.length === 0) {
//       await connection.rollback();
//       connection.release();
//       return res.status(400).json({
//         success: false,
//         message: 'No fields to update'
//       });
//     }
    
//     updateValues.push(reportId);
    
//     const updateQuery = `
//       UPDATE reports
//       SET ${updateFields.join(', ')}
//       WHERE report_id = ?
//     `;
    
//     await connection.execute(updateQuery, updateValues);
    
//     await connection.commit();
    
//     const [updatedReport] = await connection.execute(`
//       SELECT 
//         r.report_id,
//         r.description,
//         r.location_address,
//         r.user_note,
//         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
//         at.type_name as animal_type,
//         ac.condition_name as animal_condition,
//         r.status_id,
//         rs.status_name,
//         COALESCE(u.username, 'Anonymous') as reporter_name,
//         CAST(COALESCE(u.phone, 'No phone') AS CHAR) AS reporter_phone,
//         COALESCE(u.email, 'No email') as email
//       FROM reports r
//       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
//       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
//       LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
//       LEFT JOIN users u ON r.user_id = u.user_id
//       WHERE r.report_id = ?
//     `, [reportId]);
    
//     res.json({
//       success: true,
//       message: 'Report updated successfully',
//       data: updatedReport[0]
//     });
    
//   } catch (error) {
//     await connection.rollback();
//     console.error('Error updating report:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update report',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
    
//   } finally {
//     connection.release();
//   }
// });

// // =====================================================
// // GET TASKS FOR A REPORT (ADMIN ONLY)
// // =====================================================
// router.get('/:id/tasks', verifyToken, async (req, res) => {
//   const reportId = Number(req.params.id);
  
//   if (!reportId) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid report ID'
//     });
//   }
  
//   try {
//     if (req.user.role_id !== 3) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: Admin access required'
//       });
//     }
    
//     const [reportCheck] = await pool.execute(
//       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
//       [reportId]
//     );
    
//     if (reportCheck.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Report not found'
//       });
//     }
    
//     const [tasks] = await pool.execute(`
//       SELECT 
//         t.task_id,
//         t.report_id,
//         t.assigned_to_user_id,
//         t.assigned_by_user_id,
//         t.status_id as task_status_id,
//         ts.status_name as task_status,
//         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
//         DATE_FORMAT(t.started_at, '%Y-%m-%d %H:%i:%s') as started_at,
//         DATE_FORMAT(t.completed_at, '%Y-%m-%d %H:%i:%s') as completed_at,
//         t.is_deleted,
//         v.username as volunteer_name,
//         v.email as volunteer_email,
//         CAST(v.phone AS CHAR) AS volunteer_phone,
//         a.username as assigned_by_name
//       FROM tasks t
//       LEFT JOIN users v ON t.assigned_to_user_id = v.user_id
//       LEFT JOIN users a ON t.assigned_by_user_id = a.user_id
//       LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
//       WHERE t.report_id = ?
//       ORDER BY t.assigned_at DESC
//     `, [reportId]);
    
//     res.json({
//       success: true,
//       data: tasks,
//       count: tasks.length
//     });
    
//   } catch (error) {
//     console.error('Error fetching tasks:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch tasks',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// // =====================================================
// // GET STATUS LIST (FOR FRONTEND)
// // =====================================================
// router.get('/status/list', verifyToken, async (req, res) => {
//   try {
//     const [statuses] = await pool.execute(`
//       SELECT status_id, status_name 
//       FROM report_statuses 
//       ORDER BY status_id
//     `);
    
//     res.json({
//       success: true,
//       data: statuses
//     });
    
//   } catch (error) {
//     console.error('Error fetching status list:', error);
    
//     const fallbackStatuses = [
//       { status_id: 1, status_name: 'submitted' },
//       { status_id: 2, status_name: 'assigned' },
//       { status_id: 3, status_name: 'in_progress' },
//       { status_id: 4, status_name: 'completed' },
//       { status_id: 5, status_name: 'declined' }
//     ];
    
//     res.json({
//       success: true,
//       data: fallbackStatuses,
//       message: 'Using fallback status data'
//     });
//   }
// });

// router.get('/test', (req, res) => {
//   res.json({
//     success: true,
//     message: 'Report API test endpoint is working',
//     timestamp: new Date().toISOString()
//   });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'animal_rescue_system',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log('Report routes initialized');

router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Report API is running',
    timestamp: new Date().toISOString(),
    status: 'online'
  });
});

router.get('/animal-types', verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT type_id, type_name FROM animal_types ORDER BY type_name'
    );
    
    res.json({
      success: true,
      data: rows
    });
    
  } catch (error) {
    const fallbackData = [
      { type_id: 1, type_name: 'Dog' },
      { type_id: 2, type_name: 'Cat' },
      { type_id: 3, type_name: 'Bird' },
      { type_id: 4, type_name: 'Rabbit' },
      { type_id: 5, type_name: 'Hamster' },
      { type_id: 6, type_name: 'Turtle' },
      { type_id: 7, type_name: 'Horse' },
      { type_id: 8, type_name: 'Cow' },
      { type_id: 9, type_name: 'Goat' },
      { type_id: 10, type_name: 'Sheep' },
      { type_id: 11, type_name: 'Other' }
    ];
    
    res.json({
      success: true,
      data: fallbackData,
      message: 'Using fallback data'
    });
  }
});

router.get('/animal-conditions', verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT condition_id, condition_name FROM animal_conditions ORDER BY condition_name'
    );
    
    res.json({
      success: true,
      data: rows
    });
    
  } catch (error) {
    const fallbackData = [
      { condition_id: 1, condition_name: 'Injured' },
      { condition_id: 2, condition_name: 'Sick' },
      { condition_id: 3, condition_name: 'Abandoned' }
    ];
    
    res.json({
      success: true,
      data: fallbackData,
      message: 'Using fallback data'
    });
  }
});

router.post('/submit', verifyToken, async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const userId = req.user.user_id;
    const { animal_type_id, animal_condition_id, description, location_address, user_note } = req.body;
    
    if (!animal_type_id || !animal_condition_id || !description || !location_address) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }
    
    if (description.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Description must be at least 10 characters'
      });
    }
    
    if (location_address.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: 'Location must be at least 5 characters'
      });
    }
    
    const [result] = await connection.execute(
      `INSERT INTO reports 
       (user_id, animal_type_id, animal_condition_id, description, 
        location_address, status_id, user_note, submitted_at, is_deleted) 
       VALUES (?, ?, ?, ?, ?, 1, ?, NOW(), 0)`,
      [
        userId, 
        animal_type_id, 
        animal_condition_id, 
        description.trim(), 
        location_address.trim(),
        user_note ? user_note.trim() : null
      ]
    );
    
    await connection.commit();
    
    const reportId = result.insertId;
    
    let reportDetails = {};
    try {
      const [report] = await connection.execute(`
        SELECT 
          r.report_id,
          r.description,
          r.location_address,
          r.user_note,
          DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
          at.type_name as animal_type,
          ac.condition_name as animal_condition,
          r.status_id,
          rs.status_name,
          COALESCE(u.username, 'Anonymous') as reporter_name,
          CAST(COALESCE(u.phone, 'No phone') AS CHAR) AS reporter_phone,
          COALESCE(u.email, 'No email') as email
        FROM reports r
        LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
        LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
        LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
        LEFT JOIN users u ON r.user_id = u.user_id
        WHERE r.report_id = ?
      `, [reportId]);
      
      if (report.length > 0) {
        reportDetails = report[0];
      }
    } catch (error) {
      console.log('Could not fetch report details:', error.message);
    }
    
    res.json({
      success: true,
      message: 'Report submitted successfully',
      report_id: reportId,
      report: reportDetails
    });
    
  } catch (error) {
    await connection.rollback();
    
    let errorMessage = 'Failed to submit report';
    if (error.code === 'ER_NO_SUCH_TABLE') {
      errorMessage = 'Database tables not found';
    } else if (error.code === 'ER_DUP_ENTRY') {
      errorMessage = 'Duplicate entry detected';
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
    
  } finally {
    connection.release();
  }
});

router.get('/my-reports', verifyToken, async (req, res) => {
  const userId = req.user.user_id;
  
  try {
    console.log('FETCHING reports for user ID:', userId);
    
    const [reports] = await pool.execute(`
      SELECT 
        r.report_id,
        r.user_id,
        r.description,
        r.location_address,
        r.user_note,
        DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
        at.type_name as animal_type,
        ac.condition_name as animal_condition,
        r.status_id,
        rs.status_name,
        COALESCE(u.username, 'Anonymous') as reporter_name,
        CAST(COALESCE(u.phone, 'No phone') AS CHAR) AS reporter_phone,
        COALESCE(u.email, 'No email') as email
      FROM reports r
      LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
      LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
      LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
      LEFT JOIN users u ON r.user_id = u.user_id
      WHERE r.user_id = ? AND r.is_deleted = 0
      ORDER BY r.submitted_at DESC
    `, [userId]);
    
    console.log(`Found ${reports.length} reports for user ${userId}`);
    
    res.json({
      success: true,
      data: reports,
      count: reports.length
    });
    
  } catch (error) {
    console.error('Error fetching user reports:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user reports',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

router.get('/:id', verifyToken, async (req, res) => {
  const reportId = Number(req.params.id);
  const userId = req.user.user_id;
  
  if (!reportId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid report ID'
    });
  }
  
  try {
    const [reports] = await pool.execute(`
      SELECT 
        r.report_id,
        r.user_id,
        r.description,
        r.location_address,
        r.user_note,
        DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
        at.type_name as animal_type,
        ac.condition_name as animal_condition,
        r.status_id,
        rs.status_name,
        COALESCE(u.username, 'Anonymous') as reporter_name,
        CAST(COALESCE(u.phone, 'No phone') AS CHAR) AS reporter_phone,
        COALESCE(u.email, 'No email') as email
      FROM reports r
      LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
      LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
      LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
      LEFT JOIN users u ON r.user_id = u.user_id
      WHERE r.report_id = ? AND r.is_deleted = 0
    `, [reportId]);
    
    if (reports.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    let report = reports[0];
    
    const [tasks] = await pool.execute(`
      SELECT 
        t.task_id,
        t.assigned_to_user_id,
        t.status_id as task_status_id,
        ts.status_name as task_status,
        DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
        DATE_FORMAT(t.volunteer_responded_at, '%Y-%m-%d %H:%i:%s') as volunteer_responded_at,
        t.volunteer_response,
        t.declined_reason,
        v.username as volunteer_name,
        v.email as volunteer_email,
        CAST(v.phone AS CHAR) AS volunteer_phone
      FROM tasks t
      LEFT JOIN users v ON t.assigned_to_user_id = v.user_id
      LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
      WHERE t.report_id = ? AND t.is_deleted = 0
      ORDER BY t.assigned_at DESC
      LIMIT 1
    `, [reportId]);
    
    if (tasks.length > 0) {
      const task = tasks[0];
      report.volunteer_id = task.assigned_to_user_id;
      report.volunteer_name = task.volunteer_name;
      report.volunteer_email = task.volunteer_email;
      report.volunteer_phone = task.volunteer_phone;
      report.task_id = task.task_id;
      report.task_status_id = task.task_status_id;
      report.task_status = task.task_status;
      report.assigned_at = task.assigned_at;
      report.volunteer_responded_at = task.volunteer_responded_at;
      report.volunteer_response = task.volunteer_response;
      report.declined_reason = task.declined_reason;
    }
    
    const [adminNotes] = await pool.execute(`
      SELECT note_text, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at
      FROM admin_notes
      WHERE report_id = ?
      ORDER BY created_at DESC
      LIMIT 1
    `, [reportId]);
    
    if (adminNotes.length > 0) {
      report.admin_note = adminNotes[0].note_text;
    }
    
    if (report.user_id !== userId && req.user.role_id !== 3) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You can only view your own reports'
      });
    }
    
    res.json({
      success: true,
      data: report
    });
    
  } catch (error) {
    console.error('Error fetching report:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to fetch report',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

router.patch('/:id', verifyToken, async (req, res) => {
  const reportId = Number(req.params.id);
  const userId = req.user.user_id;
  const { description, location_address, user_note } = req.body;
  
  if (!reportId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid report ID'
    });
  }
  
  try {
    const [reportCheck] = await pool.execute(
      'SELECT user_id, status_id FROM reports WHERE report_id = ? AND is_deleted = 0',
      [reportId]
    );
    
    if (reportCheck.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    if (reportCheck[0].user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You can only update your own reports'
      });
    }
    
    if (reportCheck[0].status_id !== 1) {
      return res.status(400).json({
        success: false,
        message: 'Report cannot be edited after it has been reviewed'
      });
    }
    
    const updateFields = [];
    const updateValues = [];
    
    if (description !== undefined) {
      if (description.trim().length < 10) {
        return res.status(400).json({
          success: false,
          message: 'Description must be at least 10 characters'
        });
      }
      updateFields.push('description = ?');
      updateValues.push(description.trim());
    }
    
    if (location_address !== undefined) {
      if (location_address.trim().length < 5) {
        return res.status(400).json({
          success: false,
          message: 'Location must be at least 5 characters'
        });
      }
      updateFields.push('location_address = ?');
      updateValues.push(location_address.trim());
    }
    
    if (user_note !== undefined) {
      updateFields.push('user_note = ?');
      updateValues.push(user_note ? user_note.trim() : null);
    }
    
    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update'
      });
    }
    
    updateValues.push(reportId);
    
    const updateQuery = `
      UPDATE reports
      SET ${updateFields.join(', ')}
      WHERE report_id = ? AND is_deleted = 0
    `;
    
    await pool.execute(updateQuery, updateValues);
    
    const [updatedReport] = await pool.execute(`
      SELECT 
        r.report_id,
        r.description,
        r.location_address,
        r.user_note,
        DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
        at.type_name as animal_type,
        ac.condition_name as animal_condition,
        r.status_id,
        rs.status_name,
        COALESCE(u.username, 'Anonymous') as reporter_name,
        CAST(COALESCE(u.phone, 'No phone') AS CHAR) AS reporter_phone,
        COALESCE(u.email, 'No email') as email
      FROM reports r
      LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
      LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
      LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
      LEFT JOIN users u ON r.user_id = u.user_id
      WHERE r.report_id = ?
    `, [reportId]);
    
    res.json({
      success: true,
      message: 'Report updated successfully',
      data: updatedReport[0]
    });
    
  } catch (error) {
    console.error('Error updating report:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to update report',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  const reportId = Number(req.params.id);
  const userId = req.user.user_id;
  
  if (!reportId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid report ID'
    });
  }
  
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const [reportCheck] = await connection.execute(
      'SELECT user_id FROM reports WHERE report_id = ? AND is_deleted = 0',
      [reportId]
    );
    
    if (reportCheck.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    if (reportCheck[0].user_id !== userId && req.user.role_id !== 3) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You can only delete your own reports'
      });
    }
    
    await connection.execute(
      'UPDATE reports SET is_deleted = 1 WHERE report_id = ?',
      [reportId]
    );
    
    await connection.commit();
    
    res.json({
      success: true,
      message: 'Report deleted successfully',
      report_id: reportId
    });
    
  } catch (error) {
    await connection.rollback();
    console.error('Error deleting report:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to delete report',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
    
  } finally {
    connection.release();
  }
});

// =====================================================
// FIXED: GET ALL REPORTS (ADMIN ONLY)
// Now includes declined_reason, volunteer_responded_at, and all task details
// =====================================================
router.get('/admin/all', verifyToken, async (req, res) => {
  try {
    if (req.user.role_id !== 3) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required'
      });
    }
    
    const [reports] = await pool.execute(`
      SELECT 
        r.report_id,
        r.user_id,
        r.description,
        r.location_address,
        r.user_note,
        DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
        COALESCE(at.type_name, 'Unknown') as animal_type,
        COALESCE(ac.condition_name, 'Unknown') as animal_condition,
        r.status_id,
        COALESCE(rs.status_name, 'submitted') as status_name,
        COALESCE(u.username, 'Anonymous') as reporter_name,
        CAST(COALESCE(u.phone, 'No phone') AS CHAR) AS reporter_phone,
        COALESCE(u.email, 'No email') as email
      FROM reports r
      LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
      LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
      LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
      LEFT JOIN users u ON r.user_id = u.user_id
      WHERE r.is_deleted = 0
      ORDER BY r.submitted_at DESC
    `);
    
    console.log(`Admin: Found ${reports.length} total reports`);
    
    const reportsWithDetails = await Promise.all(
      reports.map(async (report) => {
        const reportData = { ...report };
        
        const [tasks] = await pool.execute(`
          SELECT 
            t.task_id,
            t.assigned_to_user_id,
            t.status_id as task_status_id,
            ts.status_name as task_status,
            DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
            DATE_FORMAT(t.volunteer_responded_at, '%Y-%m-%d %H:%i:%s') as volunteer_responded_at,
            t.volunteer_response,
            t.declined_reason,
            v.username as volunteer_name,
            v.email as volunteer_email,
            CAST(v.phone AS CHAR) AS volunteer_phone
          FROM tasks t
          LEFT JOIN users v ON t.assigned_to_user_id = v.user_id
          LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
          WHERE t.report_id = ? AND t.is_deleted = 0
          ORDER BY t.assigned_at DESC
          LIMIT 1
        `, [report.report_id]);
        
        if (tasks.length > 0) {
          const task = tasks[0];
          reportData.volunteer_id = task.assigned_to_user_id;
          reportData.volunteer_name = task.volunteer_name;
          reportData.volunteer_email = task.volunteer_email;
          reportData.volunteer_phone = task.volunteer_phone;
          reportData.task_id = task.task_id;
          reportData.task_status_id = task.task_status_id;
          reportData.task_status = task.task_status;
          reportData.assigned_at = task.assigned_at;
          reportData.volunteer_responded_at = task.volunteer_responded_at;
          reportData.volunteer_response = task.volunteer_response;
          reportData.declined_reason = task.declined_reason;
        }
        
        const [adminNotes] = await pool.execute(`
          SELECT note_text as admin_note
          FROM admin_notes
          WHERE report_id = ?
          ORDER BY created_at DESC
          LIMIT 1
        `, [report.report_id]);
        
        if (adminNotes.length > 0) {
          reportData.admin_note = adminNotes[0].admin_note;
        }
        
        return reportData;
      })
    );
    
    console.log(`Successfully processed ${reportsWithDetails.length} reports with task details`);
    
    res.json({
      success: true,
      data: reportsWithDetails,
      count: reportsWithDetails.length
    });
    
  } catch (error) {
    console.error('Error fetching all reports:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reports',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

router.patch('/:id/status', verifyToken, async (req, res) => {
  const reportId = Number(req.params.id);
  const { status_id } = req.body;
  
  if (!reportId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid report ID'
    });
  }
  
  if (!status_id || (status_id < 1 || status_id > 5)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid status ID'
    });
  }
  
  try {
    if (req.user.role_id !== 3) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required'
      });
    }
    
    const [reportCheck] = await pool.execute(
      'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
      [reportId]
    );
    
    if (reportCheck.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    await pool.execute(
      'UPDATE reports SET status_id = ? WHERE report_id = ?',
      [status_id, reportId]
    );
    
    const [updatedReport] = await pool.execute(`
      SELECT 
        r.report_id,
        r.description,
        r.status_id,
        rs.status_name,
        COALESCE(u.username, 'Anonymous') as reporter_name,
        CAST(COALESCE(u.phone, 'No phone') AS CHAR) AS reporter_phone,
        COALESCE(u.email, 'No email') as email
      FROM reports r
      LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
      LEFT JOIN users u ON r.user_id = u.user_id
      WHERE r.report_id = ?
    `, [reportId]);
    
    res.json({
      success: true,
      message: 'Report status updated successfully',
      data: updatedReport[0]
    });
    
  } catch (error) {
    console.error('Error updating report status:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to update report status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// =====================================================
// ASSIGN VOLUNTEER TO REPORT (ADMIN ONLY)
// Task status: 1 (assigned)
// Report status: 2 (assigned)
// =====================================================
router.post('/:id/assign', verifyToken, async (req, res) => {
  const reportId = Number(req.params.id);
  const { volunteer_id } = req.body;
  const adminId = req.user.user_id;
  
  if (!reportId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid report ID'
    });
  }
  
  if (!volunteer_id) {
    return res.status(400).json({
      success: false,
      message: 'Volunteer ID is required'
    });
  }
  
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    if (req.user.role_id !== 3) {
      await connection.rollback();
      connection.release();
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required'
      });
    }
    
    const [reportCheck] = await connection.execute(
      'SELECT report_id, status_id FROM reports WHERE report_id = ? AND is_deleted = 0',
      [reportId]
    );
    
    if (reportCheck.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    const [volunteerCheck] = await connection.execute(
      'SELECT user_id, username, email, phone FROM users WHERE user_id = ? AND role_id = 2',
      [volunteer_id]
    );
    
    if (volunteerCheck.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
    }
    
    const [existingTasks] = await connection.execute(
      'SELECT task_id, is_deleted, status_id FROM tasks WHERE report_id = ?',
      [reportId]
    );
    
    let taskId;
    
    if (existingTasks.length > 0) {
      const existingTask = existingTasks[0];
      
      console.log(`Reactivating task ${existingTask.task_id} for report ${reportId}`);
      await connection.execute(
        `UPDATE tasks 
         SET assigned_to_user_id = ?, 
             assigned_by_user_id = ?, 
             status_id = 1, 
             assigned_at = NOW(), 
             is_deleted = 0 
         WHERE task_id = ?`,
        [volunteer_id, adminId, existingTask.task_id]
      );
      taskId = existingTask.task_id;
      
    } else {
      console.log(`Creating new task for report ${reportId} with status ASSIGNED (1)...`);
      const [taskResult] = await connection.execute(
        `INSERT INTO tasks 
         (report_id, assigned_to_user_id, assigned_by_user_id, status_id, assigned_at, is_deleted) 
         VALUES (?, ?, ?, 1, NOW(), 0)`,
        [reportId, volunteer_id, adminId]
      );
      taskId = taskResult.insertId;
    }
    
    await connection.execute(
      'UPDATE reports SET status_id = 2 WHERE report_id = ?',
      [reportId]
    );
    
    await connection.commit();
    
    const volunteer = volunteerCheck[0];
    
    res.json({
      success: true,
      message: 'Volunteer assigned successfully. Task is in ASSIGNED state - volunteer must accept it.',
      data: {
        report_id: reportId,
        task_id: taskId,
        volunteer_id: volunteer.user_id,
        volunteer_name: volunteer.username,
        volunteer_email: volunteer.email,
        volunteer_phone: volunteer.phone || '',
        task_status_id: 1,
        task_status: 'assigned',
        report_status_id: 2,
        assigned_at: new Date().toISOString()
      }
    });
    
  } catch (error) {
    await connection.rollback();
    console.error('Error assigning volunteer:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to assign volunteer',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
    
  } finally {
    connection.release();
  }
});

// =====================================================
// FIXED: UNASSIGN VOLUNTEER FROM REPORT (ADMIN ONLY)
// Removed updated_at column which doesn't exist in tasks table
// =====================================================
router.put('/:id/unassign', verifyToken, async (req, res) => {
  const reportId = Number(req.params.id);
  
  if (!reportId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid report ID'
    });
  }
  
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    if (req.user.role_id !== 3) {
      await connection.rollback();
      connection.release();
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required'
      });
    }
    
    const [reportCheck] = await connection.execute(
      'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
      [reportId]
    );
    
    if (reportCheck.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    const [existingTasks] = await connection.execute(
      'SELECT task_id FROM tasks WHERE report_id = ? AND is_deleted = 0',
      [reportId]
    );
    
    if (existingTasks.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(400).json({
        success: false,
        message: 'Report does not have an assigned volunteer'
      });
    }
    
    // FIXED: Removed 'updated_at = NOW()' since this column doesn't exist
    await connection.execute(
      'UPDATE tasks SET is_deleted = 1 WHERE report_id = ? AND is_deleted = 0',
      [reportId]
    );
    
    await connection.execute(
      'UPDATE reports SET status_id = 1 WHERE report_id = ?',
      [reportId]
    );
    
    await connection.commit();
    
    res.json({
      success: true,
      message: 'Volunteer unassigned successfully',
      data: {
        report_id: reportId,
        status_id: 1,
        unassigned_at: new Date().toISOString()
      }
    });
    
  } catch (error) {
    await connection.rollback();
    console.error('Error unassigning volunteer:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to unassign volunteer',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
    
  } finally {
    connection.release();
  }
});

// =====================================================
// ADD ADMIN NOTE TO REPORT (ADMIN ONLY)
// =====================================================
router.post('/:id/admin-note', verifyToken, async (req, res) => {
  const reportId = Number(req.params.id);
  const { note } = req.body;
  const adminId = req.user.user_id;
  
  if (!reportId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid report ID'
    });
  }
  
  if (!note || note.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Note is required'
    });
  }
  
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    if (req.user.role_id !== 3) {
      await connection.rollback();
      connection.release();
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required'
      });
    }
    
    const [reportCheck] = await connection.execute(
      'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
      [reportId]
    );
    
    if (reportCheck.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    const [result] = await connection.execute(
      `INSERT INTO admin_notes (report_id, admin_id, note_text, created_at) 
       VALUES (?, ?, ?, NOW())`,
      [reportId, adminId, note.trim()]
    );
    
    await connection.commit();
    
    res.json({
      success: true,
      message: 'Admin note saved successfully',
      data: {
        note_id: result.insertId,
        report_id: reportId,
        admin_note: note.trim(),
        created_at: new Date().toISOString()
      }
    });
    
  } catch (error) {
    await connection.rollback();
    console.error('Error saving admin note:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to save admin note',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
    
  } finally {
    connection.release();
  }
});

// =====================================================
// GET ALL ADMIN NOTES FOR A REPORT (ADMIN ONLY)
// =====================================================
router.get('/:id/admin-notes', verifyToken, async (req, res) => {
  const reportId = Number(req.params.id);
  
  if (!reportId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid report ID'
    });
  }
  
  try {
    if (req.user.role_id !== 3) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required'
      });
    }
    
    const [reportCheck] = await pool.execute(
      'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
      [reportId]
    );
    
    if (reportCheck.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    const [notes] = await pool.execute(`
      SELECT 
        an.note_id,
        an.report_id,
        an.admin_id,
        an.note_text,
        DATE_FORMAT(an.created_at, '%Y-%m-%d %H:%i:%s') as created_at,
        u.username as admin_name
      FROM admin_notes an
      LEFT JOIN users u ON an.admin_id = u.user_id
      WHERE an.report_id = ?
      ORDER BY an.created_at DESC
    `, [reportId]);
    
    res.json({
      success: true,
      data: notes,
      count: notes.length
    });
    
  } catch (error) {
    console.error('Error fetching admin notes:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin notes',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// =====================================================
// DELETE ADMIN NOTE (ADMIN ONLY)
// =====================================================
router.delete('/admin-note/:noteId', verifyToken, async (req, res) => {
  const noteId = Number(req.params.noteId);
  
  if (!noteId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid note ID'
    });
  }
  
  try {
    if (req.user.role_id !== 3) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required'
      });
    }
    
    const [noteCheck] = await pool.execute(
      'SELECT note_id, admin_id FROM admin_notes WHERE note_id = ?',
      [noteId]
    );
    
    if (noteCheck.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }
    
    if (noteCheck[0].admin_id !== req.user.user_id && req.user.role_id !== 3) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You can only delete your own notes'
      });
    }
    
    await pool.execute(
      'DELETE FROM admin_notes WHERE note_id = ?',
      [noteId]
    );
    
    res.json({
      success: true,
      message: 'Admin note deleted successfully',
      data: { note_id: noteId }
    });
    
  } catch (error) {
    console.error('Error deleting admin note:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to delete admin note',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// =====================================================
// GET REPORT STATISTICS (ADMIN ONLY)
// =====================================================
router.get('/admin/statistics', verifyToken, async (req, res) => {
  try {
    if (req.user.role_id !== 3) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required'
      });
    }
    
    const [totalResult] = await pool.execute(
      'SELECT COUNT(*) as total FROM reports WHERE is_deleted = 0'
    );
    
    const [statusResult] = await pool.execute(`
      SELECT 
        rs.status_id,
        rs.status_name,
        COUNT(r.report_id) as count
      FROM report_statuses rs
      LEFT JOIN reports r ON rs.status_id = r.status_id AND r.is_deleted = 0
      GROUP BY rs.status_id, rs.status_name
      ORDER BY rs.status_id
    `);
    
    const [typeResult] = await pool.execute(`
      SELECT 
        COALESCE(at.type_name, 'Unknown') as type_name,
        COUNT(*) as count
      FROM reports r
      LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
      WHERE r.is_deleted = 0
      GROUP BY at.type_name
      ORDER BY count DESC
    `);
    
    const [recentResult] = await pool.execute(`
      SELECT 
        COUNT(*) as recent_count
      FROM reports 
      WHERE is_deleted = 0 
      AND submitted_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
    `);
    
    const statistics = {
      total: totalResult[0].total || 0,
      by_status: statusResult.map(row => ({
        status_id: row.status_id,
        status_name: row.status_name,
        count: row.count || 0
      })),
      by_type: typeResult.map(row => ({
        type_name: row.type_name || 'Unknown',
        count: row.count
      })),
      recent_week: recentResult[0].recent_count || 0
    };
    
    res.json({
      success: true,
      data: statistics
    });
    
  } catch (error) {
    console.error('Error fetching statistics:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// =====================================================
// UPDATE REPORT DETAILS (ADMIN ONLY)
// =====================================================
router.patch('/admin/:id', verifyToken, async (req, res) => {
  const reportId = Number(req.params.id);
  const { animal_type_id, animal_condition_id, description, location_address, user_note } = req.body;
  
  if (!reportId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid report ID'
    });
  }
  
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    if (req.user.role_id !== 3) {
      await connection.rollback();
      connection.release();
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required'
      });
    }
    
    const [reportCheck] = await connection.execute(
      'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
      [reportId]
    );
    
    if (reportCheck.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    const updateFields = [];
    const updateValues = [];
    
    if (animal_type_id !== undefined) {
      updateFields.push('animal_type_id = ?');
      updateValues.push(animal_type_id);
    }
    
    if (animal_condition_id !== undefined) {
      updateFields.push('animal_condition_id = ?');
      updateValues.push(animal_condition_id);
    }
    
    if (description !== undefined) {
      if (description.trim().length < 10) {
        await connection.rollback();
        connection.release();
        return res.status(400).json({
          success: false,
          message: 'Description must be at least 10 characters'
        });
      }
      updateFields.push('description = ?');
      updateValues.push(description.trim());
    }
    
    if (location_address !== undefined) {
      if (location_address.trim().length < 5) {
        await connection.rollback();
        connection.release();
        return res.status(400).json({
          success: false,
          message: 'Location must be at least 5 characters'
        });
      }
      updateFields.push('location_address = ?');
      updateValues.push(location_address.trim());
    }
    
    if (user_note !== undefined) {
      updateFields.push('user_note = ?');
      updateValues.push(user_note ? user_note.trim() : null);
    }
    
    if (updateFields.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(400).json({
        success: false,
        message: 'No fields to update'
      });
    }
    
    updateValues.push(reportId);
    
    const updateQuery = `
      UPDATE reports
      SET ${updateFields.join(', ')}
      WHERE report_id = ?
    `;
    
    await connection.execute(updateQuery, updateValues);
    
    await connection.commit();
    
    const [updatedReport] = await connection.execute(`
      SELECT 
        r.report_id,
        r.description,
        r.location_address,
        r.user_note,
        DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
        COALESCE(at.type_name, 'Unknown') as animal_type,
        COALESCE(ac.condition_name, 'Unknown') as animal_condition,
        r.status_id,
        COALESCE(rs.status_name, 'submitted') as status_name,
        COALESCE(u.username, 'Anonymous') as reporter_name,
        CAST(COALESCE(u.phone, 'No phone') AS CHAR) AS reporter_phone,
        COALESCE(u.email, 'No email') as email
      FROM reports r
      LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
      LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
      LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
      LEFT JOIN users u ON r.user_id = u.user_id
      WHERE r.report_id = ?
    `, [reportId]);
    
    res.json({
      success: true,
      message: 'Report updated successfully',
      data: updatedReport[0]
    });
    
  } catch (error) {
    await connection.rollback();
    console.error('Error updating report:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to update report',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
    
  } finally {
    connection.release();
  }
});

// =====================================================
// GET TASKS FOR A REPORT (ADMIN ONLY)
// =====================================================
router.get('/:id/tasks', verifyToken, async (req, res) => {
  const reportId = Number(req.params.id);
  
  if (!reportId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid report ID'
    });
  }
  
  try {
    if (req.user.role_id !== 3) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required'
      });
    }
    
    const [reportCheck] = await pool.execute(
      'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
      [reportId]
    );
    
    if (reportCheck.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    const [tasks] = await pool.execute(`
      SELECT 
        t.task_id,
        t.report_id,
        t.assigned_to_user_id,
        t.assigned_by_user_id,
        t.status_id as task_status_id,
        COALESCE(ts.status_name, 'unknown') as task_status,
        DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
        DATE_FORMAT(t.started_at, '%Y-%m-%d %H:%i:%s') as started_at,
        DATE_FORMAT(t.completed_at, '%Y-%m-%d %H:%i:%s') as completed_at,
        t.is_deleted,
        v.username as volunteer_name,
        v.email as volunteer_email,
        CAST(v.phone AS CHAR) AS volunteer_phone,
        a.username as assigned_by_name
      FROM tasks t
      LEFT JOIN users v ON t.assigned_to_user_id = v.user_id
      LEFT JOIN users a ON t.assigned_by_user_id = a.user_id
      LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
      WHERE t.report_id = ?
      ORDER BY t.assigned_at DESC
    `, [reportId]);
    
    res.json({
      success: true,
      data: tasks,
      count: tasks.length
    });
    
  } catch (error) {
    console.error('Error fetching tasks:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tasks',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// =====================================================
// GET STATUS LIST (FOR FRONTEND)
// =====================================================
router.get('/status/list', verifyToken, async (req, res) => {
  try {
    const [statuses] = await pool.execute(`
      SELECT status_id, status_name 
      FROM report_statuses 
      ORDER BY status_id
    `);
    
    res.json({
      success: true,
      data: statuses
    });
    
  } catch (error) {
    console.error('Error fetching status list:', error);
    
    const fallbackStatuses = [
      { status_id: 1, status_name: 'submitted' },
      { status_id: 2, status_name: 'assigned' },
      { status_id: 3, status_name: 'in_progress' },
      { status_id: 4, status_name: 'completed' },
      { status_id: 5, status_name: 'declined' }
    ];
    
    res.json({
      success: true,
      data: fallbackStatuses,
      message: 'Using fallback status data'
    });
  }
});

router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Report API test endpoint is working',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;