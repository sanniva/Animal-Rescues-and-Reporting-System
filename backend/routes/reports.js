// // // backend/routes/report.js
// // const express = require('express');
// // const router = express.Router();
// // const verifyToken = require('../middleware/auth');
// // const mysql = require('mysql2/promise');
// // require('dotenv').config();

// // // MySQL pool configuration
// // const pool = mysql.createPool({
// //   host: process.env.DB_HOST || 'localhost',
// //   user: process.env.DB_USER || 'root',
// //   password: process.env.DB_PASSWORD || '',
// //   database: process.env.DB_NAME || 'animal_rescue_system',
// //   waitForConnections: true,
// //   connectionLimit: 10,
// //   queueLimit: 0
// // });

// // console.log('✅ Report routes initialized');

// // /* =====================================================
// //    PUBLIC ENDPOINTS - NO AUTH REQUIRED
// // ===================================================== */

// // // Health check endpoint
// // router.get('/health', (req, res) => {
// //   console.log('✅ Health check endpoint accessed');
// //   res.json({
// //     success: true,
// //     message: 'Report API is running',
// //     timestamp: new Date().toISOString(),
// //     status: 'online'
// //   });
// // });

// // /* =====================================================
// //    GET ANIMAL TYPES (PROTECTED)
// // ===================================================== */
// // router.get('/animal-types', verifyToken, async (req, res) => {
// //   console.log('📋 Fetching animal types for user:', req.user.user_id);
  
// //   try {
// //     const [rows] = await pool.execute(
// //       'SELECT type_id, type_name FROM animal_types ORDER BY type_name'
// //     );
    
// //     console.log(`✅ Found ${rows.length} animal types`);
    
// //     res.json({
// //       success: true,
// //       data: rows
// //     });
    
// //   } catch (error) {
// //     console.error('❌ Error fetching animal types:', error);
    
// //     // Return fallback data
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
// //       message: 'Using fallback data due to database error'
// //     });
// //   }
// // });

// // /* =====================================================
// //    GET ANIMAL CONDITIONS (PROTECTED)
// // ===================================================== */
// // router.get('/animal-conditions', verifyToken, async (req, res) => {
// //   console.log('📋 Fetching animal conditions for user:', req.user.user_id);
  
// //   try {
// //     const [rows] = await pool.execute(
// //       'SELECT condition_id, condition_name FROM animal_conditions ORDER BY condition_name'
// //     );
    
// //     console.log(`✅ Found ${rows.length} animal conditions`);
    
// //     res.json({
// //       success: true,
// //       data: rows
// //     });
    
// //   } catch (error) {
// //     console.error('❌ Error fetching animal conditions:', error);
    
// //     // Return fallback data
// //     const fallbackData = [
// //       { condition_id: 1, condition_name: 'Injured' },
// //       { condition_id: 2, condition_name: 'Sick' },
// //       { condition_id: 3, condition_name: 'Abandoned' }
// //     ];
    
// //     res.json({
// //       success: true,
// //       data: fallbackData,
// //       message: 'Using fallback data due to database error'
// //     });
// //   }
// // });

// // /* =====================================================
// //    SUBMIT REPORT (PROTECTED)
// // ===================================================== */
// // router.post('/submit', verifyToken, async (req, res) => {
// //   console.log('📝 New report submission attempt');
  
// //   const connection = await pool.getConnection();
  
// //   try {
// //     await connection.beginTransaction();
    
// //     const userId = req.user.user_id;
// //     const { animal_type_id, animal_condition_id, description, location_address, user_note } = req.body;
    
// //     console.log('📊 Report data:', {
// //       userId,
// //       animal_type_id,
// //       animal_condition_id,
// //       description_length: description?.length,
// //       location_address_length: location_address?.length,
// //       user_note_length: user_note?.length
// //     });
    
// //     // Validate required fields
// //     if (!animal_type_id || !animal_condition_id || !description || !location_address) {
// //       console.log('❌ Missing required fields');
// //       return res.status(400).json({
// //         success: false,
// //         message: 'All fields are required: animal type, condition, description, and location'
// //       });
// //     }
    
// //     // Validate description length
// //     if (description.trim().length < 10) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Description must be at least 10 characters long'
// //       });
// //     }
    
// //     // Validate location length
// //     if (location_address.trim().length < 5) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Location must be at least 5 characters long'
// //       });
// //     }
    
// //     // Insert report into database
// //     console.log('💾 Inserting report into database...');
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
// //         user_note ? user_note.trim() : ''
// //       ]
// //     );
    
// //     await connection.commit();
    
// //     const reportId = result.insertId;
// //     console.log(`✅ Report #${reportId} submitted successfully`);
    
// //     // Get the inserted report with animal info
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
// //           r.status_id
// //         FROM reports r
// //         LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// //         LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// //         WHERE r.report_id = ?
// //       `, [reportId]);
      
// //       if (report.length > 0) {
// //         reportDetails = report[0];
// //       }
// //     } catch (error) {
// //       console.log('⚠️ Could not fetch report details:', error.message);
// //     }
    
// //     res.json({
// //       success: true,
// //       message: 'Report submitted successfully! Our team will review it soon.',
// //       report_id: reportId,
// //       report: reportDetails
// //     });
    
// //   } catch (error) {
// //     await connection.rollback();
// //     console.error('❌ Error submitting report:', error);
    
// //     // Handle specific database errors
// //     let errorMessage = 'Failed to submit report';
// //     if (error.code === 'ER_NO_SUCH_TABLE') {
// //       errorMessage = 'Database tables not found. Please contact administrator.';
// //     } else if (error.code === 'ER_DUP_ENTRY') {
// //       errorMessage = 'Duplicate entry detected.';
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

// // /* =====================================================
// //    GET USER'S REPORTS (PROTECTED)
// // ===================================================== */
// // router.get('/my-reports', verifyToken, async (req, res) => {
// //   const userId = req.user.user_id;
// //   console.log(`📋 Fetching reports for user: ${userId}`);
  
// //   try {
// //     const [reports] = await pool.execute(`
// //       SELECT 
// //         r.report_id,
// //         r.description,
// //         r.location_address,
// //         r.user_note,
// //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// //         at.type_name as animal_type,
// //         ac.condition_name as animal_condition,
// //         r.status_id
// //       FROM reports r
// //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// //       WHERE r.user_id = ? AND r.is_deleted = 0
// //       ORDER BY r.submitted_at DESC
// //     `, [userId]);
    
// //     console.log(`✅ Found ${reports.length} reports for user ${userId}`);
    
// //     res.json({
// //       success: true,
// //       data: reports,
// //       count: reports.length
// //     });
    
// //   } catch (error) {
// //     console.error('❌ Error fetching user reports:', error);
    
// //     res.json({
// //       success: true,
// //       data: [],
// //       message: 'Error fetching reports, returning empty list',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // /* =====================================================
// //    GET SINGLE REPORT (PROTECTED - OWNER OR ADMIN)
// // ===================================================== */
// // router.get('/:id', verifyToken, async (req, res) => {
// //   const reportId = Number(req.params.id);
// //   const userId = req.user.user_id;
  
// //   if (!reportId) {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Invalid report ID'
// //     });
// //   }
  
// //   console.log(`📋 Fetching report #${reportId} for user ${userId}`);
  
// //   try {
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
// //         r.status_id
// //       FROM reports r
// //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// //       WHERE r.report_id = ? AND r.is_deleted = 0
// //     `, [reportId]);
    
// //     if (reports.length === 0) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Report not found'
// //       });
// //     }
    
// //     const report = reports[0];
    
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
// //     console.error('❌ Error fetching report:', error);
    
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to fetch report',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // /* =====================================================
// //    UPDATE REPORT (PROTECTED - OWNER ONLY)
// // ===================================================== */
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
  
// //   console.log(`📝 Updating report #${reportId} for user ${userId}`);
  
// //   try {
// //     // First check if report exists and belongs to user
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
    
// //     // Check ownership (only owner can update)
// //     if (reportCheck[0].user_id !== userId) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: You can only update your own reports'
// //       });
// //     }
    
// //     // Check if report is still editable (only pending reports can be edited)
// //     if (reportCheck[0].status_id !== 1) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Report cannot be edited after it has been reviewed'
// //       });
// //     }
    
// //     // Build update fields
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
// //         r.status_id
// //       FROM reports r
// //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// //       WHERE r.report_id = ?
// //     `, [reportId]);
    
// //     res.json({
// //       success: true,
// //       message: 'Report updated successfully',
// //       data: updatedReport[0]
// //     });
    
// //   } catch (error) {
// //     console.error('❌ Error updating report:', error);
    
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to update report',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // /* =====================================================
// //    DELETE REPORT (PROTECTED - OWNER ONLY - SOFT DELETE)
// // ===================================================== */
// // router.delete('/:id', verifyToken, async (req, res) => {
// //   const reportId = Number(req.params.id);
// //   const userId = req.user.user_id;
  
// //   if (!reportId) {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Invalid report ID'
// //     });
// //   }
  
// //   console.log(`🗑️  Deleting report #${reportId} for user ${userId}`);
  
// //   const connection = await pool.getConnection();
  
// //   try {
// //     await connection.beginTransaction();
    
// //     // Check if report exists and belongs to user
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
    
// //     // Check ownership (only owner can delete, or admin)
// //     if (reportCheck[0].user_id !== userId && req.user.role_id !== 3) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: You can only delete your own reports'
// //       });
// //     }
    
// //     // Soft delete report
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
// //     console.error('❌ Error deleting report:', error);
    
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to delete report',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
    
// //   } finally {
// //     connection.release();
// //   }
// // });

// // /* =====================================================
// //    GET ALL REPORTS (ADMIN ONLY)
// // ===================================================== */
// // router.get('/admin/all', verifyToken, async (req, res) => {
// //   try {
// //     // Admin check
// //     if (req.user.role_id !== 3) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Admin access required'
// //       });
// //     }
    
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
// //         u.username as reporter_name
// //       FROM reports r
// //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// //       LEFT JOIN users u ON r.user_id = u.user_id
// //       WHERE r.is_deleted = 0
// //       ORDER BY r.submitted_at DESC
// //     `);
    
// //     console.log(`📋 Admin: Found ${reports.length} total reports`);
    
// //     res.json({
// //       success: true,
// //       data: reports,
// //       count: reports.length
// //     });
    
// //   } catch (error) {
// //     console.error('❌ Error fetching all reports:', error);
    
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to fetch reports',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // /* =====================================================
// //    UPDATE REPORT STATUS (ADMIN ONLY)
// // ===================================================== */
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
// //       message: 'Invalid status ID. Must be between 1 and 5'
// //     });
// //   }
  
// //   console.log(`📝 Admin updating report #${reportId} status to ${status_id}`);
  
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
    
// //     // Update status
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
// //         u.username as reporter_name
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
// //     console.error('❌ Error updating report status:', error);
    
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to update report status',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // /* =====================================================
// //    TEST ENDPOINT (PUBLIC - FOR FRONTEND CONNECTION TEST)
// // ===================================================== */
// // router.get('/test', (req, res) => {
// //   console.log('✅ Test endpoint hit from frontend');
// //   res.json({
// //     success: true,
// //     message: 'Report API test endpoint is working',
// //     timestamp: new Date().toISOString(),
// //     endpoints: {
// //       animal_types: '/api/reports/animal-types (GET, protected)',
// //       animal_conditions: '/api/reports/animal-conditions (GET, protected)',
// //       submit: '/api/reports/submit (POST, protected)',
// //       my_reports: '/api/reports/my-reports (GET, protected)'
// //     }
// //   });
// // });

// // module.exports = router;

// const express = require('express');
// const router = express.Router();
// const verifyToken = require('../middleware/auth');
// const mysql = require('mysql2/promise');
// require('dotenv').config();

// // MySQL pool configuration
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

// /* =====================================================
//    PUBLIC ENDPOINTS - NO AUTH REQUIRED
// ===================================================== */

// // Health check endpoint
// router.get('/health', (req, res) => {
//   console.log('Health check endpoint accessed');
//   res.json({
//     success: true,
//     message: 'Report API is running',
//     timestamp: new Date().toISOString(),
//     status: 'online'
//   });
// });

// /* =====================================================
//    GET ANIMAL TYPES (PROTECTED)
// ===================================================== */
// router.get('/animal-types', verifyToken, async (req, res) => {
//   console.log('Fetching animal types for user:', req.user.user_id);
  
//   try {
//     const [rows] = await pool.execute(
//       'SELECT type_id, type_name FROM animal_types ORDER BY type_name'
//     );
    
//     console.log(`Found ${rows.length} animal types`);
    
//     res.json({
//       success: true,
//       data: rows
//     });
    
//   } catch (error) {
//     console.error('Error fetching animal types:', error);
    
//     // Return fallback data
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
//       message: 'Using fallback data due to database error'
//     });
//   }
// });

// /* =====================================================
//    GET ANIMAL CONDITIONS (PROTECTED)
// ===================================================== */
// router.get('/animal-conditions', verifyToken, async (req, res) => {
//   console.log('Fetching animal conditions for user:', req.user.user_id);
  
//   try {
//     const [rows] = await pool.execute(
//       'SELECT condition_id, condition_name FROM animal_conditions ORDER BY condition_name'
//     );
    
//     console.log(`Found ${rows.length} animal conditions`);
    
//     res.json({
//       success: true,
//       data: rows
//     });
    
//   } catch (error) {
//     console.error('Error fetching animal conditions:', error);
    
//     // Return fallback data
//     const fallbackData = [
//       { condition_id: 1, condition_name: 'Injured' },
//       { condition_id: 2, condition_name: 'Sick' },
//       { condition_id: 3, condition_name: 'Abandoned' }
//     ];
    
//     res.json({
//       success: true,
//       data: fallbackData,
//       message: 'Using fallback data due to database error'
//     });
//   }
// });

// /* =====================================================
//    SUBMIT REPORT (PROTECTED)
// ===================================================== */
// router.post('/submit', verifyToken, async (req, res) => {
//   console.log('New report submission attempt');
  
//   const connection = await pool.getConnection();
  
//   try {
//     await connection.beginTransaction();
    
//     const userId = req.user.user_id;
//     const { animal_type_id, animal_condition_id, description, location_address, user_note } = req.body;
    
//     console.log('Report data:', {
//       userId,
//       animal_type_id,
//       animal_condition_id,
//       description_length: description?.length,
//       location_address_length: location_address?.length,
//       user_note_length: user_note?.length
//     });
    
//     // Validate required fields
//     if (!animal_type_id || !animal_condition_id || !description || !location_address) {
//       console.log('Missing required fields');
//       return res.status(400).json({
//         success: false,
//         message: 'All fields are required: animal type, condition, description, and location'
//       });
//     }
    
//     // Validate description length
//     if (description.trim().length < 10) {
//       return res.status(400).json({
//         success: false,
//         message: 'Description must be at least 10 characters long'
//       });
//     }
    
//     // Validate location length
//     if (location_address.trim().length < 5) {
//       return res.status(400).json({
//         success: false,
//         message: 'Location must be at least 5 characters long'
//       });
//     }
    
//     // Insert report into database
//     console.log('Inserting report into database...');
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
//         user_note ? user_note.trim() : ''
//       ]
//     );
    
//     await connection.commit();
    
//     const reportId = result.insertId;
//     console.log(`Report #${reportId} submitted successfully`);
    
//     // Get the inserted report with animal info
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
//           r.status_id
//         FROM reports r
//         LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
//         LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
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
//       message: 'Report submitted successfully! Our team will review it soon.',
//       report_id: reportId,
//       report: reportDetails
//     });
    
//   } catch (error) {
//     await connection.rollback();
//     console.error('Error submitting report:', error);
    
//     // Handle specific database errors
//     let errorMessage = 'Failed to submit report';
//     if (error.code === 'ER_NO_SUCH_TABLE') {
//       errorMessage = 'Database tables not found. Please contact administrator.';
//     } else if (error.code === 'ER_DUP_ENTRY') {
//       errorMessage = 'Duplicate entry detected.';
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

// /* =====================================================
//    GET USER'S REPORTS (PROTECTED) - FIXED VERSION
// ===================================================== */
// router.get('/my-reports', verifyToken, async (req, res) => {
//   const userId = req.user.user_id;
//   console.log(`Fetching reports for user: ${userId}`);
  
//   try {
//     const [reports] = await pool.execute(`
//       SELECT 
//         r.report_id,
//         r.user_id,  /* CRITICAL FIX: This field was missing! */
//         r.description,
//         r.location_address,
//         r.user_note,
//         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
//         at.type_name as animal_type,
//         ac.condition_name as animal_condition,
//         r.status_id
//       FROM reports r
//       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
//       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
//       WHERE r.user_id = ? AND r.is_deleted = 0
//       ORDER BY r.submitted_at DESC
//     `, [userId]);
    
//     console.log(`Found ${reports.length} reports for user ${userId}`);
    
//     // Debug: Check what's being returned
//     if (reports.length > 0) {
//       console.log('Sample report data:', {
//         report_id: reports[0].report_id,
//         user_id: reports[0].user_id,
//         animal_type: reports[0].animal_type
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

// /* =====================================================
//    GET SINGLE REPORT (PROTECTED - OWNER OR ADMIN)
// ===================================================== */
// router.get('/:id', verifyToken, async (req, res) => {
//   const reportId = Number(req.params.id);
//   const userId = req.user.user_id;
  
//   if (!reportId) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid report ID'
//     });
//   }
  
//   console.log(`Fetching report #${reportId} for user ${userId}`);
  
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
//         r.status_id
//       FROM reports r
//       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
//       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
//       WHERE r.report_id = ? AND r.is_deleted = 0
//     `, [reportId]);
    
//     if (reports.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Report not found'
//       });
//     }
    
//     const report = reports[0];
    
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

// /* =====================================================
//    UPDATE REPORT (PROTECTED - OWNER ONLY)
// ===================================================== */
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
  
//   console.log(`Updating report #${reportId} for user ${userId}`);
  
//   try {
//     // First check if report exists and belongs to user
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
    
//     // Check ownership (only owner can update)
//     if (reportCheck[0].user_id !== userId) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: You can only update your own reports'
//       });
//     }
    
//     // Check if report is still editable (only pending reports can be edited)
//     if (reportCheck[0].status_id !== 1) {
//       return res.status(400).json({
//         success: false,
//         message: 'Report cannot be edited after it has been reviewed'
//       });
//     }
    
//     // Build update fields
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
    
//     // Fetch updated report
//     const [updatedReport] = await pool.execute(`
//       SELECT 
//         r.report_id,
//         r.description,
//         r.location_address,
//         r.user_note,
//         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
//         at.type_name as animal_type,
//         ac.condition_name as animal_condition,
//         r.status_id
//       FROM reports r
//       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
//       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
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

// /* =====================================================
//    DELETE REPORT (PROTECTED - OWNER ONLY - SOFT DELETE)
// ===================================================== */
// router.delete('/:id', verifyToken, async (req, res) => {
//   const reportId = Number(req.params.id);
//   const userId = req.user.user_id;
  
//   if (!reportId) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid report ID'
//     });
//   }
  
//   console.log(`Deleting report #${reportId} for user ${userId}`);
  
//   const connection = await pool.getConnection();
  
//   try {
//     await connection.beginTransaction();
    
//     // Check if report exists and belongs to user
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
    
//     // Check ownership (only owner can delete, or admin)
//     if (reportCheck[0].user_id !== userId && req.user.role_id !== 3) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: You can only delete your own reports'
//       });
//     }
    
//     // Soft delete report
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

// /* =====================================================
//    GET ALL REPORTS (ADMIN ONLY)
// ===================================================== */
// router.get('/admin/all', verifyToken, async (req, res) => {
//   try {
//     // Admin check
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
//         u.username as reporter_name
//       FROM reports r
//       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
//       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
//       LEFT JOIN users u ON r.user_id = u.user_id
//       WHERE r.is_deleted = 0
//       ORDER BY r.submitted_at DESC
//     `);
    
//     console.log(`Admin: Found ${reports.length} total reports`);
    
//     res.json({
//       success: true,
//       data: reports,
//       count: reports.length
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

// /* =====================================================
//    UPDATE REPORT STATUS (ADMIN ONLY)
// ===================================================== */
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
//       message: 'Invalid status ID. Must be between 1 and 5'
//     });
//   }
  
//   console.log(`Admin updating report #${reportId} status to ${status_id}`);
  
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
    
//     // Update status
//     await pool.execute(
//       'UPDATE reports SET status_id = ? WHERE report_id = ?',
//       [status_id, reportId]
//     );
    
//     // Get updated report
//     const [updatedReport] = await pool.execute(`
//       SELECT 
//         r.report_id,
//         r.description,
//         r.status_id,
//         u.username as reporter_name
//       FROM reports r
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
//    TEST ENDPOINT (PUBLIC - FOR FRONTEND CONNECTION TEST)
// ===================================================== */
// router.get('/test', (req, res) => {
//   console.log('Test endpoint hit from frontend');
//   res.json({
//     success: true,
//     message: 'Report API test endpoint is working',
//     timestamp: new Date().toISOString(),
//     endpoints: {
//       animal_types: '/api/reports/animal-types (GET, protected)',
//       animal_conditions: '/api/reports/animal-conditions (GET, protected)',
//       submit: '/api/reports/submit (POST, protected)',
//       my_reports: '/api/reports/my-reports (GET, protected)'
//     }
//   });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const mysql = require('mysql2/promise');
require('dotenv').config();

// MySQL pool configuration
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

/* =====================================================
   PUBLIC ENDPOINTS - NO AUTH REQUIRED
===================================================== */

// Health check endpoint
router.get('/health', (req, res) => {
  console.log('Health check endpoint accessed');
  res.json({
    success: true,
    message: 'Report API is running',
    timestamp: new Date().toISOString(),
    status: 'online'
  });
});

/* =====================================================
   GET ANIMAL TYPES (PROTECTED)
===================================================== */
router.get('/animal-types', verifyToken, async (req, res) => {
  console.log('Fetching animal types for user:', req.user.user_id);
  
  try {
    const [rows] = await pool.execute(
      'SELECT type_id, type_name FROM animal_types ORDER BY type_name'
    );
    
    console.log(`Found ${rows.length} animal types`);
    
    res.json({
      success: true,
      data: rows
    });
    
  } catch (error) {
    console.error('Error fetching animal types:', error);
    
    // Return fallback data
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
      message: 'Using fallback data due to database error'
    });
  }
});

/* =====================================================
   GET ANIMAL CONDITIONS (PROTECTED)
===================================================== */
router.get('/animal-conditions', verifyToken, async (req, res) => {
  console.log('Fetching animal conditions for user:', req.user.user_id);
  
  try {
    const [rows] = await pool.execute(
      'SELECT condition_id, condition_name FROM animal_conditions ORDER BY condition_name'
    );
    
    console.log(`Found ${rows.length} animal conditions`);
    
    res.json({
      success: true,
      data: rows
    });
    
  } catch (error) {
    console.error('Error fetching animal conditions:', error);
    
    // Return fallback data
    const fallbackData = [
      { condition_id: 1, condition_name: 'Injured' },
      { condition_id: 2, condition_name: 'Sick' },
      { condition_id: 3, condition_name: 'Abandoned' }
    ];
    
    res.json({
      success: true,
      data: fallbackData,
      message: 'Using fallback data due to database error'
    });
  }
});

/* =====================================================
   SUBMIT REPORT (PROTECTED)
===================================================== */
router.post('/submit', verifyToken, async (req, res) => {
  console.log('New report submission attempt');
  
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const userId = req.user.user_id;
    const { animal_type_id, animal_condition_id, description, location_address, user_note } = req.body;
    
    console.log('Report data:', {
      userId,
      animal_type_id,
      animal_condition_id,
      description_length: description?.length,
      location_address_length: location_address?.length,
      user_note_length: user_note?.length
    });
    
    // Validate required fields
    if (!animal_type_id || !animal_condition_id || !description || !location_address) {
      console.log('Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'All fields are required: animal type, condition, description, and location'
      });
    }
    
    // Validate description length
    if (description.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Description must be at least 10 characters long'
      });
    }
    
    // Validate location length
    if (location_address.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: 'Location must be at least 5 characters long'
      });
    }
    
    // Insert report into database
    console.log('Inserting report into database...');
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
        user_note ? user_note.trim() : ''
      ]
    );
    
    await connection.commit();
    
    const reportId = result.insertId;
    console.log(`Report #${reportId} submitted successfully`);
    
    // Get the inserted report with animal info
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
          r.status_id
        FROM reports r
        LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
        LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
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
      message: 'Report submitted successfully! Our team will review it soon.',
      report_id: reportId,
      report: reportDetails
    });
    
  } catch (error) {
    await connection.rollback();
    console.error('Error submitting report:', error);
    
    // Handle specific database errors
    let errorMessage = 'Failed to submit report';
    if (error.code === 'ER_NO_SUCH_TABLE') {
      errorMessage = 'Database tables not found. Please contact administrator.';
    } else if (error.code === 'ER_DUP_ENTRY') {
      errorMessage = 'Duplicate entry detected.';
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

/* =====================================================
   GET USER'S REPORTS (PROTECTED) - FIXED WITH DEBUG INFO
===================================================== */
router.get('/my-reports', verifyToken, async (req, res) => {
  const userId = req.user.user_id;
  console.log(`=== FETCHING REPORTS FOR USER ID: ${userId} ===`);
  
  try {
    // First, check what reports exist for this user (including deleted ones for debugging)
    const [allReports] = await pool.execute(`
      SELECT 
        r.report_id,
        r.user_id,
        r.description,
        r.is_deleted,
        r.status_id
      FROM reports r
      WHERE r.user_id = ?
      ORDER BY r.submitted_at DESC
    `, [userId]);
    
    console.log(`Total reports found (including deleted): ${allReports.length}`);
    allReports.forEach(report => {
      console.log(`Report ID ${report.report_id}: deleted=${report.is_deleted}, status=${report.status_id}`);
    });
    
    // Now get only non-deleted reports with full details
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
        r.is_deleted
      FROM reports r
      LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
      LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
      WHERE r.user_id = ? AND r.is_deleted = 0
      ORDER BY r.submitted_at DESC
    `, [userId]);
    
    console.log(`✅ Found ${reports.length} non-deleted reports for user ${userId}`);
    
    // Log each report for debugging
    reports.forEach(report => {
      console.log('Report details:', {
        id: report.report_id,
        type: report.animal_type,
        condition: report.animal_condition,
        status: report.status_id,
        date: report.submitted_at
      });
    });
    
    res.json({
      success: true,
      data: reports,
      count: reports.length
    });
    
  } catch (error) {
    console.error('❌ Error fetching user reports:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user reports',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/* =====================================================
   GET SINGLE REPORT (PROTECTED - OWNER OR ADMIN)
===================================================== */
router.get('/:id', verifyToken, async (req, res) => {
  const reportId = Number(req.params.id);
  const userId = req.user.user_id;
  
  if (!reportId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid report ID'
    });
  }
  
  console.log(`Fetching report #${reportId} for user ${userId}`);
  
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
        r.status_id
      FROM reports r
      LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
      LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
      WHERE r.report_id = ? AND r.is_deleted = 0
    `, [reportId]);
    
    if (reports.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    const report = reports[0];
    
    // Check permissions: user must be report owner or admin
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

/* =====================================================
   UPDATE REPORT (PROTECTED - OWNER ONLY)
===================================================== */
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
  
  console.log(`Updating report #${reportId} for user ${userId}`);
  
  try {
    // First check if report exists and belongs to user
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
    
    // Check ownership (only owner can update)
    if (reportCheck[0].user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You can only update your own reports'
      });
    }
    
    // Check if report is still editable (only pending reports can be edited)
    if (reportCheck[0].status_id !== 1) {
      return res.status(400).json({
        success: false,
        message: 'Report cannot be edited after it has been reviewed'
      });
    }
    
    // Build update fields
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
    
    // Fetch updated report
    const [updatedReport] = await pool.execute(`
      SELECT 
        r.report_id,
        r.description,
        r.location_address,
        r.user_note,
        DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
        at.type_name as animal_type,
        ac.condition_name as animal_condition,
        r.status_id
      FROM reports r
      LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
      LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
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

/* =====================================================
   DELETE REPORT (PROTECTED - OWNER ONLY - SOFT DELETE)
===================================================== */
router.delete('/:id', verifyToken, async (req, res) => {
  const reportId = Number(req.params.id);
  const userId = req.user.user_id;
  
  if (!reportId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid report ID'
    });
  }
  
  console.log(`Deleting report #${reportId} for user ${userId}`);
  
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    // Check if report exists and belongs to user
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
    
    // Check ownership (only owner can delete, or admin)
    if (reportCheck[0].user_id !== userId && req.user.role_id !== 3) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You can only delete your own reports'
      });
    }
    
    // Soft delete report
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

/* =====================================================
   GET ALL REPORTS (ADMIN ONLY)
===================================================== */
router.get('/admin/all', verifyToken, async (req, res) => {
  try {
    // Admin check
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
        at.type_name as animal_type,
        ac.condition_name as animal_condition,
        r.status_id,
        u.username as reporter_name
      FROM reports r
      LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
      LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
      LEFT JOIN users u ON r.user_id = u.user_id
      WHERE r.is_deleted = 0
      ORDER BY r.submitted_at DESC
    `);
    
    console.log(`Admin: Found ${reports.length} total reports`);
    
    res.json({
      success: true,
      data: reports,
      count: reports.length
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

/* =====================================================
   UPDATE REPORT STATUS (ADMIN ONLY)
===================================================== */
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
      message: 'Invalid status ID. Must be between 1 and 5'
    });
  }
  
  console.log(`Admin updating report #${reportId} status to ${status_id}`);
  
  try {
    // Admin check
    if (req.user.role_id !== 3) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required'
      });
    }
    
    // Check if report exists
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
    
    // Update status
    await pool.execute(
      'UPDATE reports SET status_id = ? WHERE report_id = ?',
      [status_id, reportId]
    );
    
    // Get updated report
    const [updatedReport] = await pool.execute(`
      SELECT 
        r.report_id,
        r.description,
        r.status_id,
        u.username as reporter_name
      FROM reports r
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

/* =====================================================
   TEST ENDPOINT (PUBLIC - FOR FRONTEND CONNECTION TEST)
===================================================== */
router.get('/test', (req, res) => {
  console.log('Test endpoint hit from frontend');
  res.json({
    success: true,
    message: 'Report API test endpoint is working',
    timestamp: new Date().toISOString(),
    endpoints: {
      animal_types: '/api/reports/animal-types (GET, protected)',
      animal_conditions: '/api/reports/animal-conditions (GET, protected)',
      submit: '/api/reports/submit (POST, protected)',
      my_reports: '/api/reports/my-reports (GET, protected)'
    }
  });
});

module.exports = router;