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

// console.log('✅ Volunteer routes initialized');

// // Get ALL volunteers (for admin assignment)
// router.get('/available', verifyToken, async (req, res) => {
//   try {
//     // Admin check
//     if (req.user.role_id !== 3) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: Admin access required'
//       });
//     }

//     console.log('👥 Fetching ALL volunteers for assignment...');
    
//     // Get ALL volunteers from users table where role_id = 2 (volunteers)
//     // Count assigned reports from tasks table
//     const [volunteers] = await pool.execute(`
//       SELECT 
//         u.user_id,
//         u.username,
//         u.email,
//         COALESCE(CAST(u.phone AS CHAR), '') as phone,
//         u.bio,
//         u.created_at,
//         u.role_id,
//         COALESCE(vp.joined_at, u.created_at) as joined_at,
//         COALESCE(vp.approval_status_id, 2) as approval_status_id,
//         CASE 
//           WHEN vp.approval_status_id = 1 THEN 'Pending'
//           WHEN vp.approval_status_id = 2 THEN 'Approved'
//           WHEN vp.approval_status_id = 3 THEN 'Rejected'
//           ELSE 'Approved'
//         END as approval_status,
//         COALESCE(vp.availability_status_id, 1) as availability_status_id,
//         CASE 
//           WHEN vp.availability_status_id = 1 THEN 'Available'
//           WHEN vp.availability_status_id = 2 THEN 'Busy'
//           WHEN vp.availability_status_id = 3 THEN 'Unavailable'
//           ELSE 'Available'
//         END as availability_status,
//         (
//           SELECT COUNT(*) 
//           FROM tasks t
//           WHERE t.assigned_to_user_id = u.user_id 
//           AND t.status_id IN (2, 3)  -- Assigned or In Progress status
//           AND t.is_deleted = 0
//         ) as assigned_reports_count
//       FROM users u
//       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
//       WHERE u.role_id = 2
//         AND u.is_deleted = 0
//       ORDER BY 
//         CASE WHEN COALESCE(vp.approval_status_id, 2) = 2 THEN 1 ELSE 2 END,
//         u.username ASC
//     `);

//     console.log(`✅ Found ${volunteers.length} volunteers total`);
    
//     // Debug output
//     if (volunteers.length > 0) {
//       console.log('All volunteers found:');
//       volunteers.forEach((volunteer, index) => {
//         console.log(`${index + 1}. ${volunteer.username} (ID: ${volunteer.user_id}) - Approval: ${volunteer.approval_status} (${volunteer.approval_status_id}) - Availability: ${volunteer.availability_status} - Assigned tasks: ${volunteer.assigned_reports_count}`);
//       });
//     } else {
//       console.log('⚠️ No volunteers found in database');
//     }
    
//     res.json({
//       success: true,
//       data: volunteers,
//       count: volunteers.length
//     });

//   } catch (error) {
//     console.error('❌ Error fetching volunteers:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch volunteers',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// // Get only APPROVED volunteers
// router.get('/approved', verifyToken, async (req, res) => {
//   try {
//     // Admin check
//     if (req.user.role_id !== 3) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: Admin access required'
//       });
//     }

//     console.log('👥 Fetching APPROVED volunteers only...');
    
//     // Get only volunteers with approval_status_id = 2 (Approved)
//     const [volunteers] = await pool.execute(`
//       SELECT 
//         u.user_id,
//         u.username,
//         u.email,
//         COALESCE(CAST(u.phone AS CHAR), '') as phone,
//         u.bio,
//         u.created_at,
//         u.role_id,
//         COALESCE(vp.joined_at, u.created_at) as joined_at,
//         vp.approval_status_id,
//         'Approved' as approval_status,
//         COALESCE(vp.availability_status_id, 1) as availability_status_id,
//         CASE 
//           WHEN vp.availability_status_id = 1 THEN 'Available'
//           WHEN vp.availability_status_id = 2 THEN 'Busy'
//           WHEN vp.availability_status_id = 3 THEN 'Unavailable'
//           ELSE 'Available'
//         END as availability_status,
//         (
//           SELECT COUNT(*) 
//           FROM tasks t
//           WHERE t.assigned_to_user_id = u.user_id 
//           AND t.status_id IN (2, 3)
//           AND t.is_deleted = 0
//         ) as assigned_reports_count
//       FROM users u
//       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
//       WHERE u.role_id = 2
//         AND u.is_deleted = 0
//         AND (vp.approval_status_id = 2 OR u.user_id IN (2, 8))
//       ORDER BY u.username ASC
//     `);

//     console.log(`✅ Found ${volunteers.length} APPROVED volunteers`);
    
//     res.json({
//       success: true,
//       data: volunteers,
//       count: volunteers.length
//     });

//   } catch (error) {
//     console.error('❌ Error fetching approved volunteers:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch approved volunteers',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// // Assign volunteer to report (creates a task)
// router.post('/assign', verifyToken, async (req, res) => {
//   const connection = await pool.getConnection();
  
//   try {
//     if (req.user.role_id !== 3) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: Admin access required'
//       });
//     }

//     const { report_id, volunteer_id, status_id } = req.body;
    
//     if (!report_id || !volunteer_id) {
//       return res.status(400).json({
//         success: false,
//         message: 'Report ID and Volunteer ID are required'
//       });
//     }

//     await connection.beginTransaction();

//     console.log(`🤝 Assigning volunteer ${volunteer_id} to report ${report_id}`);
    
//     // Check if report exists
//     const [reportCheck] = await connection.execute(
//       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
//       [report_id]
//     );
    
//     if (reportCheck.length === 0) {
//       await connection.rollback();
//       return res.status(404).json({
//         success: false,
//         message: 'Report not found'
//       });
//     }
    
//     // Check if volunteer exists and is a volunteer (role_id = 2)
//     const [volunteerCheck] = await connection.execute(
//       'SELECT user_id, username, email, phone FROM users WHERE user_id = ? AND role_id = 2 AND is_deleted = 0',
//       [volunteer_id]
//     );
    
//     if (volunteerCheck.length === 0) {
//       await connection.rollback();
//       return res.status(404).json({
//         success: false,
//         message: 'Volunteer not found or not a volunteer'
//       });
//     }
    
//     // Check if a task already exists for this report
//     const [existingTask] = await connection.execute(
//       'SELECT task_id FROM tasks WHERE report_id = ? AND is_deleted = 0',
//       [report_id]
//     );
    
//     if (existingTask.length > 0) {
//       // Update existing task
//       await connection.execute(
//         'UPDATE tasks SET assigned_to_user_id = ?, status_id = ? WHERE report_id = ? AND is_deleted = 0',
//         [volunteer_id, status_id || 2, report_id]
//       );
//     } else {
//       // Create new task
//       await connection.execute(
//         `INSERT INTO tasks (report_id, assigned_to_user_id, assigned_by_user_id, status_id, assigned_at)
//          VALUES (?, ?, ?, ?, NOW())`,
//         [report_id, volunteer_id, req.user.user_id, status_id || 2]
//       );
//     }
    
//     // Update report status
//     await connection.execute(
//       'UPDATE reports SET status_id = ? WHERE report_id = ?',
//       [status_id || 2, report_id]
//     );

//     await connection.commit();
    
//     const volunteer = volunteerCheck[0];
    
//     res.json({
//       success: true,
//       message: 'Volunteer assigned successfully',
//       data: {
//         report_id: report_id,
//         volunteer_id: volunteer.user_id,
//         volunteer_name: volunteer.username,
//         volunteer_email: volunteer.email,
//         volunteer_phone: volunteer.phone || '',
//         status_id: status_id || 2
//       }
//     });

//   } catch (error) {
//     await connection.rollback();
//     console.error('❌ Error assigning volunteer:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to assign volunteer',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   } finally {
//     connection.release();
//   }
// });

// // Get volunteer's assigned reports (from tasks table)
// router.get('/:id/reports', verifyToken, async (req, res) => {
//   const volunteerId = Number(req.params.id);
  
//   if (!volunteerId) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid volunteer ID'
//     });
//   }
  
//   try {
//     // Admin or volunteer themselves can view
//     if (req.user.role_id !== 3 && req.user.user_id !== volunteerId) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: You can only view your own reports'
//       });
//     }
    
//     const [reports] = await pool.execute(`
//       SELECT 
//         r.report_id,
//         r.description,
//         r.location_address,
//         r.user_note,
//         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
//         at.type_name as animal_type,
//         ac.condition_name as animal_condition,
//         r.status_id,
//         u.username as reporter_name,
//         CAST(u.phone AS CHAR) AS reporter_phone,
//         u.email as reporter_email,
//         t.task_id,
//         t.status_id as task_status,
//         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at
//       FROM tasks t
//       INNER JOIN reports r ON t.report_id = r.report_id
//       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
//       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
//       LEFT JOIN users u ON r.user_id = u.user_id
//       WHERE t.assigned_to_user_id = ? 
//         AND t.is_deleted = 0
//         AND r.is_deleted = 0
//       ORDER BY t.assigned_at DESC
//     `, [volunteerId]);
    
//     res.json({
//       success: true,
//       data: reports,
//       count: reports.length
//     });
    
//   } catch (error) {
//     console.error('❌ Error fetching volunteer reports:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch volunteer reports',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// // Update volunteer approval status
// router.patch('/:id/approval', verifyToken, async (req, res) => {
//   const volunteerId = Number(req.params.id);
//   const { approval_status_id } = req.body;
  
//   if (!volunteerId) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid volunteer ID'
//     });
//   }
  
//   if (!approval_status_id || (approval_status_id < 1 || approval_status_id > 3)) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid approval status ID. Must be 1 (Pending), 2 (Approved), or 3 (Rejected)'
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
    
//     // Check if volunteer exists
//     const [volunteerCheck] = await pool.execute(
//       'SELECT user_id FROM users WHERE user_id = ? AND role_id = 2 AND is_deleted = 0',
//       [volunteerId]
//     );
    
//     if (volunteerCheck.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Volunteer not found'
//       });
//     }
    
//     // Check if volunteer profile exists
//     const [profileCheck] = await pool.execute(
//       'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
//       [volunteerId]
//     );
    
//     if (profileCheck.length === 0) {
//       // Create volunteer profile if it doesn't exist
//       await pool.execute(
//         `INSERT INTO volunteer_profiles (user_id, approval_status_id, availability_status_id, joined_at)
//          VALUES (?, ?, 1, NOW())`,
//         [volunteerId, approval_status_id]
//       );
//     } else {
//       // Update existing profile
//       await pool.execute(
//         'UPDATE volunteer_profiles SET approval_status_id = ? WHERE user_id = ?',
//         [approval_status_id, volunteerId]
//       );
//     }
    
//     // Get updated volunteer info
//     const [updatedVolunteer] = await pool.execute(`
//       SELECT 
//         u.user_id,
//         u.username,
//         u.email,
//         COALESCE(CAST(u.phone AS CHAR), '') as phone,
//         COALESCE(vp.approval_status_id, 2) as approval_status_id,
//         CASE 
//           WHEN vp.approval_status_id = 1 THEN 'Pending'
//           WHEN vp.approval_status_id = 2 THEN 'Approved'
//           WHEN vp.approval_status_id = 3 THEN 'Rejected'
//           ELSE 'Approved'
//         END as approval_status
//       FROM users u
//       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
//       WHERE u.user_id = ?
//     `, [volunteerId]);
    
//     res.json({
//       success: true,
//       message: `Volunteer approval status updated to ${updatedVolunteer[0].approval_status}`,
//       data: updatedVolunteer[0]
//     });
    
//   } catch (error) {
//     console.error('❌ Error updating volunteer approval:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update volunteer approval status',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// // Update volunteer availability status
// router.patch('/:id/availability', verifyToken, async (req, res) => {
//   const volunteerId = Number(req.params.id);
//   const { availability_status_id } = req.body;
  
//   if (!volunteerId) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid volunteer ID'
//     });
//   }
  
//   if (!availability_status_id || (availability_status_id < 1 || availability_status_id > 3)) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid availability status ID. Must be 1 (Available), 2 (Busy), or 3 (Unavailable)'
//     });
//   }
  
//   try {
//     // Admin or volunteer themselves can update
//     if (req.user.role_id !== 3 && req.user.user_id !== volunteerId) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: You can only update your own availability'
//       });
//     }
    
//     // Check if volunteer exists
//     const [volunteerCheck] = await pool.execute(
//       'SELECT user_id FROM users WHERE user_id = ? AND role_id = 2 AND is_deleted = 0',
//       [volunteerId]
//     );
    
//     if (volunteerCheck.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Volunteer not found'
//       });
//     }
    
//     // Check if volunteer profile exists
//     const [profileCheck] = await pool.execute(
//       'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
//       [volunteerId]
//     );
    
//     if (profileCheck.length === 0) {
//       // Create volunteer profile if it doesn't exist
//       await pool.execute(
//         `INSERT INTO volunteer_profiles (user_id, approval_status_id, availability_status_id, joined_at)
//          VALUES (?, 2, ?, NOW())`,
//         [volunteerId, availability_status_id]
//       );
//     } else {
//       // Update existing profile
//       await pool.execute(
//         'UPDATE volunteer_profiles SET availability_status_id = ? WHERE user_id = ?',
//         [availability_status_id, volunteerId]
//       );
//     }
    
//     // Get updated volunteer info
//     const [updatedVolunteer] = await pool.execute(`
//       SELECT 
//         u.user_id,
//         u.username,
//         COALESCE(vp.availability_status_id, 1) as availability_status_id,
//         CASE 
//           WHEN vp.availability_status_id = 1 THEN 'Available'
//           WHEN vp.availability_status_id = 2 THEN 'Busy'
//           WHEN vp.availability_status_id = 3 THEN 'Unavailable'
//           ELSE 'Available'
//         END as availability_status
//       FROM users u
//       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
//       WHERE u.user_id = ?
//     `, [volunteerId]);
    
//     res.json({
//       success: true,
//       message: `Volunteer availability updated to ${updatedVolunteer[0].availability_status}`,
//       data: updatedVolunteer[0]
//     });
    
//   } catch (error) {
//     console.error('❌ Error updating volunteer availability:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update volunteer availability',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// // Get all volunteers with detailed info (for admin management)
// router.get('/admin/all', verifyToken, async (req, res) => {
//   try {
//     // Admin check
//     if (req.user.role_id !== 3) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: Admin access required'
//       });
//     }

//     console.log('👥 Fetching ALL volunteers for admin...');
    
//     const [volunteers] = await pool.execute(`
//       SELECT 
//         u.user_id,
//         u.username,
//         u.email,
//         COALESCE(CAST(u.phone AS CHAR), '') as phone,
//         u.bio,
//         u.profile_image_url,
//         u.created_at,
//         u.role_id,
//         COALESCE(vp.joined_at, u.created_at) as joined_at,
//         COALESCE(vp.approval_status_id, 2) as approval_status_id,
//         CASE 
//           WHEN vp.approval_status_id = 1 THEN 'Pending'
//           WHEN vp.approval_status_id = 2 THEN 'Approved'
//           WHEN vp.approval_status_id = 3 THEN 'Rejected'
//           ELSE 'Approved'
//         END as approval_status,
//         COALESCE(vp.availability_status_id, 1) as availability_status_id,
//         CASE 
//           WHEN vp.availability_status_id = 1 THEN 'Available'
//           WHEN vp.availability_status_id = 2 THEN 'Busy'
//           WHEN vp.availability_status_id = 3 THEN 'Unavailable'
//           ELSE 'Available'
//         END as availability_status,
//         vp.badges,
//         (
//           SELECT COUNT(*) 
//           FROM tasks t
//           WHERE t.assigned_to_user_id = u.user_id 
//           AND t.is_deleted = 0
//         ) as total_assigned_reports,
//         (
//           SELECT COUNT(*) 
//           FROM tasks t
//           INNER JOIN reports r ON t.report_id = r.report_id
//           WHERE t.assigned_to_user_id = u.user_id 
//           AND r.status_id = 4
//           AND t.is_deleted = 0
//           AND r.is_deleted = 0
//         ) as completed_reports,
//         (
//           SELECT COUNT(*) 
//           FROM tasks t
//           WHERE t.assigned_to_user_id = u.user_id 
//           AND t.status_id IN (2, 3)
//           AND t.is_deleted = 0
//         ) as active_reports
//       FROM users u
//       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
//       WHERE u.role_id = 2
//         AND u.is_deleted = 0
//       ORDER BY 
//         CASE WHEN COALESCE(vp.approval_status_id, 2) = 2 THEN 1 ELSE 2 END,
//         u.username ASC
//     `);

//     console.log(`✅ Found ${volunteers.length} volunteers for admin`);
    
//     res.json({
//       success: true,
//       data: volunteers,
//       count: volunteers.length
//     });

//   } catch (error) {
//     console.error('❌ Error fetching all volunteers:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch volunteers',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
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

console.log('✅ Volunteer routes initialized');

// Get ALL volunteers (for admin assignment) - SHOW ONLY APPROVED VOLUNTEERS
router.get('/available', verifyToken, async (req, res) => {
  try {
    if (req.user.role_id !== 3) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required'
      });
    }

    console.log('👥 Fetching APPROVED volunteers for assignment...');
    
    const [volunteers] = await pool.execute(`
      SELECT 
        u.user_id,
        u.username,
        u.email,
        COALESCE(CAST(u.phone AS CHAR), '') as phone,
        u.bio,
        u.created_at,
        u.role_id,
        COALESCE(vp.joined_at, u.created_at) as joined_at,
        COALESCE(vp.approval_status_id, 2) as approval_status_id,
        CASE 
          WHEN vp.approval_status_id = 1 THEN 'Pending'
          WHEN vp.approval_status_id = 2 THEN 'Approved'
          WHEN vp.approval_status_id = 3 THEN 'Rejected'
          ELSE 'Approved'
        END as approval_status,
        COALESCE(vp.availability_status_id, 1) as availability_status_id,
        CASE 
          WHEN vp.availability_status_id = 1 THEN 'Available'
          WHEN vp.availability_status_id = 2 THEN 'Busy'
          WHEN vp.availability_status_id = 3 THEN 'Unavailable'
          ELSE 'Available'
        END as availability_status,
        (
          SELECT COUNT(*) 
          FROM tasks t
          WHERE t.assigned_to_user_id = u.user_id 
          AND t.status_id IN (2, 3)
          AND t.is_deleted = 0
        ) as assigned_reports_count
      FROM users u
      LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
      WHERE u.role_id = 2
        AND u.is_deleted = 0
        AND (vp.approval_status_id = 2 OR (vp.approval_status_id IS NULL AND u.user_id IN (2, 8)))
      ORDER BY u.username ASC
    `);

    console.log(`✅ Found ${volunteers.length} APPROVED volunteers for assignment`);
    
    res.json({
      success: true,
      data: volunteers,
      count: volunteers.length
    });

  } catch (error) {
    console.error('❌ Error fetching volunteers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch volunteers',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get only APPROVED volunteers - Alternative endpoint
router.get('/approved', verifyToken, async (req, res) => {
  try {
    if (req.user.role_id !== 3) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required'
      });
    }

    console.log('👥 Fetching APPROVED volunteers only...');
    
    const [volunteers] = await pool.execute(`
      SELECT 
        u.user_id,
        u.username,
        u.email,
        COALESCE(CAST(u.phone AS CHAR), '') as phone,
        u.bio,
        u.created_at,
        u.role_id,
        COALESCE(vp.joined_at, u.created_at) as joined_at,
        vp.approval_status_id,
        'Approved' as approval_status,
        COALESCE(vp.availability_status_id, 1) as availability_status_id,
        CASE 
          WHEN vp.availability_status_id = 1 THEN 'Available'
          WHEN vp.availability_status_id = 2 THEN 'Busy'
          WHEN vp.availability_status_id = 3 THEN 'Unavailable'
          ELSE 'Available'
        END as availability_status,
        (
          SELECT COUNT(*) 
          FROM tasks t
          WHERE t.assigned_to_user_id = u.user_id 
          AND t.status_id IN (2, 3)
          AND t.is_deleted = 0
        ) as assigned_reports_count
      FROM users u
      LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
      WHERE u.role_id = 2
        AND u.is_deleted = 0
        AND vp.approval_status_id = 2
      ORDER BY u.username ASC
    `);

    console.log(`✅ Found ${volunteers.length} APPROVED volunteers`);
    
    res.json({
      success: true,
      data: volunteers,
      count: volunteers.length
    });

  } catch (error) {
    console.error('❌ Error fetching approved volunteers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch approved volunteers',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get volunteer's assigned reports (from tasks table)
router.get('/:id/reports', verifyToken, async (req, res) => {
  const volunteerId = Number(req.params.id);
  
  if (!volunteerId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid volunteer ID'
    });
  }
  
  try {
    if (req.user.role_id !== 3 && req.user.user_id !== volunteerId) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You can only view your own reports'
      });
    }
    
    const [reports] = await pool.execute(`
      SELECT 
        r.report_id,
        r.description,
        r.location_address,
        r.user_note,
        DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
        at.type_name as animal_type,
        ac.condition_name as animal_condition,
        r.status_id,
        u.username as reporter_name,
        CAST(u.phone AS CHAR) AS reporter_phone,
        u.email as reporter_email,
        t.task_id,
        t.status_id as task_status,
        DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at
      FROM tasks t
      INNER JOIN reports r ON t.report_id = r.report_id
      LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
      LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
      LEFT JOIN users u ON r.user_id = u.user_id
      WHERE t.assigned_to_user_id = ? 
        AND t.is_deleted = 0
        AND r.is_deleted = 0
      ORDER BY t.assigned_at DESC
    `, [volunteerId]);
    
    res.json({
      success: true,
      data: reports,
      count: reports.length
    });
    
  } catch (error) {
    console.error('❌ Error fetching volunteer reports:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch volunteer reports',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update volunteer approval status
router.patch('/:id/approval', verifyToken, async (req, res) => {
  const volunteerId = Number(req.params.id);
  const { approval_status_id } = req.body;
  
  if (!volunteerId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid volunteer ID'
    });
  }
  
  if (!approval_status_id || (approval_status_id < 1 || approval_status_id > 3)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid approval status ID. Must be 1 (Pending), 2 (Approved), or 3 (Rejected)'
    });
  }
  
  try {
    if (req.user.role_id !== 3) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required'
      });
    }
    
    const [volunteerCheck] = await pool.execute(
      'SELECT user_id FROM users WHERE user_id = ? AND role_id = 2 AND is_deleted = 0',
      [volunteerId]
    );
    
    if (volunteerCheck.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
    }
    
    const [profileCheck] = await pool.execute(
      'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
      [volunteerId]
    );
    
    if (profileCheck.length === 0) {
      await pool.execute(
        `INSERT INTO volunteer_profiles (user_id, approval_status_id, availability_status_id, joined_at)
         VALUES (?, ?, 1, NOW())`,
        [volunteerId, approval_status_id]
      );
    } else {
      await pool.execute(
        'UPDATE volunteer_profiles SET approval_status_id = ? WHERE user_id = ?',
        [approval_status_id, volunteerId]
      );
    }
    
    const [updatedVolunteer] = await pool.execute(`
      SELECT 
        u.user_id,
        u.username,
        u.email,
        COALESCE(CAST(u.phone AS CHAR), '') as phone,
        COALESCE(vp.approval_status_id, 2) as approval_status_id,
        CASE 
          WHEN vp.approval_status_id = 1 THEN 'Pending'
          WHEN vp.approval_status_id = 2 THEN 'Approved'
          WHEN vp.approval_status_id = 3 THEN 'Rejected'
          ELSE 'Approved'
        END as approval_status
      FROM users u
      LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
      WHERE u.user_id = ?
    `, [volunteerId]);
    
    res.json({
      success: true,
      message: `Volunteer approval status updated to ${updatedVolunteer[0].approval_status}`,
      data: updatedVolunteer[0]
    });
    
  } catch (error) {
    console.error('❌ Error updating volunteer approval:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update volunteer approval status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update volunteer availability status
router.patch('/:id/availability', verifyToken, async (req, res) => {
  const volunteerId = Number(req.params.id);
  const { availability_status_id } = req.body;
  
  if (!volunteerId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid volunteer ID'
    });
  }
  
  if (!availability_status_id || (availability_status_id < 1 || availability_status_id > 3)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid availability status ID. Must be 1 (Available), 2 (Busy), or 3 (Unavailable)'
    });
  }
  
  try {
    if (req.user.role_id !== 3 && req.user.user_id !== volunteerId) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You can only update your own availability'
      });
    }
    
    const [volunteerCheck] = await pool.execute(
      'SELECT user_id FROM users WHERE user_id = ? AND role_id = 2 AND is_deleted = 0',
      [volunteerId]
    );
    
    if (volunteerCheck.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
    }
    
    const [profileCheck] = await pool.execute(
      'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
      [volunteerId]
    );
    
    if (profileCheck.length === 0) {
      await pool.execute(
        `INSERT INTO volunteer_profiles (user_id, approval_status_id, availability_status_id, joined_at)
         VALUES (?, 2, ?, NOW())`,
        [volunteerId, availability_status_id]
      );
    } else {
      await pool.execute(
        'UPDATE volunteer_profiles SET availability_status_id = ? WHERE user_id = ?',
        [availability_status_id, volunteerId]
      );
    }
    
    const [updatedVolunteer] = await pool.execute(`
      SELECT 
        u.user_id,
        u.username,
        COALESCE(vp.availability_status_id, 1) as availability_status_id,
        CASE 
          WHEN vp.availability_status_id = 1 THEN 'Available'
          WHEN vp.availability_status_id = 2 THEN 'Busy'
          WHEN vp.availability_status_id = 3 THEN 'Unavailable'
          ELSE 'Available'
        END as availability_status
      FROM users u
      LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
      WHERE u.user_id = ?
    `, [volunteerId]);
    
    res.json({
      success: true,
      message: `Volunteer availability updated to ${updatedVolunteer[0].availability_status}`,
      data: updatedVolunteer[0]
    });
    
  } catch (error) {
    console.error('❌ Error updating volunteer availability:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update volunteer availability',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all volunteers with detailed info (for admin management)
router.get('/admin/all', verifyToken, async (req, res) => {
  try {
    if (req.user.role_id !== 3) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required'
      });
    }

    console.log('👥 Fetching ALL volunteers for admin...');
    
    const [volunteers] = await pool.execute(`
      SELECT 
        u.user_id,
        u.username,
        u.email,
        COALESCE(CAST(u.phone AS CHAR), '') as phone,
        u.bio,
        u.profile_image_url,
        u.created_at,
        u.role_id,
        COALESCE(vp.joined_at, u.created_at) as joined_at,
        COALESCE(vp.approval_status_id, 2) as approval_status_id,
        CASE 
          WHEN vp.approval_status_id = 1 THEN 'Pending'
          WHEN vp.approval_status_id = 2 THEN 'Approved'
          WHEN vp.approval_status_id = 3 THEN 'Rejected'
          ELSE 'Approved'
        END as approval_status,
        COALESCE(vp.availability_status_id, 1) as availability_status_id,
        CASE 
          WHEN vp.availability_status_id = 1 THEN 'Available'
          WHEN vp.availability_status_id = 2 THEN 'Busy'
          WHEN vp.availability_status_id = 3 THEN 'Unavailable'
          ELSE 'Available'
        END as availability_status,
        vp.badges,
        (
          SELECT COUNT(*) 
          FROM tasks t
          WHERE t.assigned_to_user_id = u.user_id 
          AND t.is_deleted = 0
        ) as total_assigned_reports,
        (
          SELECT COUNT(*) 
          FROM tasks t
          INNER JOIN reports r ON t.report_id = r.report_id
          WHERE t.assigned_to_user_id = u.user_id 
          AND r.status_id = 4
          AND t.is_deleted = 0
          AND r.is_deleted = 0
        ) as completed_reports,
        (
          SELECT COUNT(*) 
          FROM tasks t
          WHERE t.assigned_to_user_id = u.user_id 
          AND t.status_id IN (2, 3)
          AND t.is_deleted = 0
        ) as active_reports
      FROM users u
      LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
      WHERE u.role_id = 2
        AND u.is_deleted = 0
      ORDER BY 
        CASE WHEN COALESCE(vp.approval_status_id, 2) = 2 THEN 1 ELSE 2 END,
        u.username ASC
    `);

    console.log(`✅ Found ${volunteers.length} volunteers for admin`);
    
    res.json({
      success: true,
      data: volunteers,
      count: volunteers.length
    });

  } catch (error) {
    console.error('❌ Error fetching all volunteers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch volunteers',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// FIXED: Assign volunteer to report (handles all cases including soft-deleted tasks)
router.post('/assign', verifyToken, async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    if (req.user.role_id !== 3) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required'
      });
    }

    const { report_id, volunteer_id, status_id } = req.body;
    
    if (!report_id || !volunteer_id) {
      return res.status(400).json({
        success: false,
        message: 'Report ID and Volunteer ID are required'
      });
    }

    await connection.beginTransaction();

    console.log(`🤝 Assigning volunteer ${volunteer_id} to report ${report_id}`);
    
    // Check if report exists
    const [reportCheck] = await connection.execute(
      'SELECT report_id, status_id FROM reports WHERE report_id = ? AND is_deleted = 0',
      [report_id]
    );
    
    if (reportCheck.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    // Check if volunteer exists and is approved
    const [volunteerCheck] = await connection.execute(`
      SELECT u.user_id, u.username, u.email, u.phone 
      FROM users u
      LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
      WHERE u.user_id = ? 
        AND u.role_id = 2 
        AND u.is_deleted = 0
        AND (vp.approval_status_id = 2 OR (vp.approval_status_id IS NULL AND u.user_id IN (2, 8)))
    `, [volunteer_id]);
    
    if (volunteerCheck.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found, not approved, or is rejected'
      });
    }
    
    // Check if ANY task exists for this report
    const [existingTasks] = await connection.execute(
      'SELECT task_id, assigned_to_user_id, status_id, is_deleted FROM tasks WHERE report_id = ?',
      [report_id]
    );
    
    const taskStatus = status_id || 2;
    
    if (existingTasks.length > 0) {
      const existingTask = existingTasks[0];
      
      if (existingTask.is_deleted === 1) {
        // Task exists but is soft-deleted
        console.log(`♻️ Reactivating soft-deleted task ${existingTask.task_id} for report ${report_id}`);
        
        // Fix the inconsistent state: update status to match report
        await connection.execute(
          'UPDATE tasks SET assigned_to_user_id = ?, status_id = ?, assigned_at = NOW(), is_deleted = 0 WHERE task_id = ?',
          [volunteer_id, taskStatus, existingTask.task_id]
        );
        
        console.log(`✅ Reactivated task ${existingTask.task_id} and assigned to volunteer ${volunteer_id}`);
      } else {
        // Active task exists, update it
        console.log(`📝 Updating existing task ${existingTask.task_id} for report ${report_id}`);
        
        await connection.execute(
          'UPDATE tasks SET assigned_to_user_id = ?, status_id = ?, assigned_at = NOW() WHERE task_id = ?',
          [volunteer_id, taskStatus, existingTask.task_id]
        );
        
        console.log(`✅ Updated task ${existingTask.task_id}. Previous volunteer: ${existingTask.assigned_to_user_id}, New volunteer: ${volunteer_id}`);
      }
    } else {
      // No task exists, create new one
      console.log(`📝 Creating new task for report ${report_id}...`);
      await connection.execute(
        `INSERT INTO tasks (report_id, assigned_to_user_id, assigned_by_user_id, status_id, assigned_at, is_deleted)
         VALUES (?, ?, ?, ?, NOW(), 0)`,
        [report_id, volunteer_id, req.user.user_id, taskStatus]
      );
      
      console.log(`✅ Created new task for report ${report_id}`);
    }
    
    // Update report status
    await connection.execute(
      'UPDATE reports SET status_id = ? WHERE report_id = ?',
      [taskStatus, report_id]
    );

    await connection.commit();
    
    const volunteer = volunteerCheck[0];
    
    res.json({
      success: true,
      message: 'Volunteer assigned successfully',
      data: {
        report_id: report_id,
        volunteer_id: volunteer.user_id,
        volunteer_name: volunteer.username,
        volunteer_email: volunteer.email,
        volunteer_phone: volunteer.phone || '',
        status_id: taskStatus,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    await connection.rollback();
    console.error('❌ Error assigning volunteer:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        success: false,
        message: 'A task already exists for this report. Please use the unassign endpoint first.',
        error: 'Duplicate task entry'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to assign volunteer',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    connection.release();
  }
});

// NEW: Unassign volunteer from report (soft delete task)
router.delete('/unassign/:report_id', verifyToken, async (req, res) => {
  const connection = await pool.getConnection();
  const reportId = Number(req.params.report_id);
  
  try {
    if (req.user.role_id !== 3) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required'
      });
    }
    
    if (!reportId) {
      return res.status(400).json({
        success: false,
        message: 'Report ID is required'
      });
    }
    
    await connection.beginTransaction();
    
    console.log(`🗑️ Unassigning volunteer from report ${reportId}`);
    
    // Check if report exists
    const [reportCheck] = await connection.execute(
      'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
      [reportId]
    );
    
    if (reportCheck.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    // Check if task exists
    const [taskCheck] = await connection.execute(
      'SELECT task_id FROM tasks WHERE report_id = ? AND is_deleted = 0',
      [reportId]
    );
    
    if (taskCheck.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: 'No active task found for this report'
      });
    }
    
    // Soft delete the task
    await connection.execute(
      'UPDATE tasks SET is_deleted = 1, updated_at = NOW() WHERE report_id = ?',
      [reportId]
    );
    
    // Reset report status to "New" (status_id = 1)
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
        unassigned_at: new Date().toISOString()
      }
    });
    
  } catch (error) {
    await connection.rollback();
    console.error('❌ Error unassigning volunteer:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to unassign volunteer',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    connection.release();
  }
});

// NEW: Force assign - completely overwrites any existing task
router.post('/force-assign', verifyToken, async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    if (req.user.role_id !== 3) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required'
      });
    }

    const { report_id, volunteer_id, status_id } = req.body;
    
    if (!report_id || !volunteer_id) {
      return res.status(400).json({
        success: false,
        message: 'Report ID and Volunteer ID are required'
      });
    }

    await connection.beginTransaction();

    console.log(`💪 Force assigning volunteer ${volunteer_id} to report ${report_id}`);
    
    // Check if report exists
    const [reportCheck] = await connection.execute(
      'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
      [report_id]
    );
    
    if (reportCheck.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    // Check if volunteer exists and is approved
    const [volunteerCheck] = await connection.execute(`
      SELECT u.user_id, u.username, u.email, u.phone 
      FROM users u
      LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
      WHERE u.user_id = ? 
        AND u.role_id = 2 
        AND u.is_deleted = 0
        AND (vp.approval_status_id = 2 OR (vp.approval_status_id IS NULL AND u.user_id IN (2, 8)))
    `, [volunteer_id]);
    
    if (volunteerCheck.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found, not approved, or is rejected'
      });
    }
    
    // DELETE any existing task (hard delete for force assign)
    await connection.execute(
      'DELETE FROM tasks WHERE report_id = ?',
      [report_id]
    );
    
    // Then INSERT new task
    const [result] = await connection.execute(
      `INSERT INTO tasks (report_id, assigned_to_user_id, assigned_by_user_id, status_id, assigned_at, is_deleted)
       VALUES (?, ?, ?, ?, NOW(), 0)`,
      [report_id, volunteer_id, req.user.user_id, status_id || 2]
    );
    
    // Update report status
    await connection.execute(
      'UPDATE reports SET status_id = ? WHERE report_id = ?',
      [status_id || 2, report_id]
    );

    await connection.commit();
    
    const volunteer = volunteerCheck[0];
    
    res.json({
      success: true,
      message: 'Volunteer force-assigned successfully',
      data: {
        report_id: report_id,
        volunteer_id: volunteer.user_id,
        volunteer_name: volunteer.username,
        volunteer_email: volunteer.email,
        volunteer_phone: volunteer.phone || '',
        status_id: status_id || 2,
        task_id: result.insertId
      }
    });

  } catch (error) {
    await connection.rollback();
    console.error('❌ Error force assigning volunteer:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to assign volunteer',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    connection.release();
  }
});

// NEW: Get task status for a report
router.get('/report/:report_id/task', verifyToken, async (req, res) => {
  const reportId = Number(req.params.report_id);
  
  if (!reportId) {
    return res.status(400).json({
      success: false,
      message: 'Report ID is required'
    });
  }
  
  try {
    if (req.user.role_id !== 3) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required'
      });
    }
    
    const [tasks] = await pool.execute(`
      SELECT 
        t.task_id,
        t.report_id,
        t.assigned_to_user_id,
        t.assigned_by_user_id,
        t.status_id,
        DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
        t.started_at,
        t.completed_at,
        t.is_deleted,
        u.username as volunteer_name,
        u.email as volunteer_email,
        u2.username as assigned_by_name,
        r.status_id as report_status
      FROM tasks t
      LEFT JOIN users u ON t.assigned_to_user_id = u.user_id
      LEFT JOIN users u2 ON t.assigned_by_user_id = u2.user_id
      LEFT JOIN reports r ON t.report_id = r.report_id
      WHERE t.report_id = ?
      ORDER BY t.assigned_at DESC
      LIMIT 1
    `, [reportId]);
    
    if (tasks.length === 0) {
      return res.json({
        success: true,
        data: null,
        message: 'No task found for this report'
      });
    }
    
    res.json({
      success: true,
      data: tasks[0],
      message: 'Task found'
    });
    
  } catch (error) {
    console.error('❌ Error fetching task:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch task',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// NEW: Fix inconsistent task status (for admin use)
router.post('/fix-task/:task_id', verifyToken, async (req, res) => {
  const connection = await pool.getConnection();
  const taskId = Number(req.params.task_id);
  
  try {
    if (req.user.role_id !== 3) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required'
      });
    }
    
    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: 'Task ID is required'
      });
    }
    
    await connection.beginTransaction();
    
    // Get current task
    const [tasks] = await connection.execute(
      'SELECT * FROM tasks WHERE task_id = ?',
      [taskId]
    );
    
    if (tasks.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    const task = tasks[0];
    
    // Fix inconsistent state: if is_deleted = 1, status should not be 2 (Assigned)
    if (task.is_deleted === 1 && task.status_id === 2) {
      console.log(`🔧 Fixing inconsistent task ${taskId}: is_deleted=1 but status_id=2`);
      
      // Option 1: Set status to 1 (New) since it's deleted
      await connection.execute(
        'UPDATE tasks SET status_id = 1 WHERE task_id = ?',
        [taskId]
      );
      
      // Option 2: Or you could set is_deleted = 0 to reactivate
      // await connection.execute(
      //   'UPDATE tasks SET is_deleted = 0 WHERE task_id = ?',
      //   [taskId]
      // );
      
      await connection.commit();
      
      return res.json({
        success: true,
        message: 'Task fixed: Changed status from Assigned(2) to New(1) since task is deleted',
        data: {
          task_id: taskId,
          old_status: 2,
          new_status: 1,
          is_deleted: 1
        }
      });
    }
    
    // Check if task should be completed based on completed_at
    if (task.completed_at && task.status_id !== 4) {
      console.log(`🔧 Fixing task ${taskId}: has completed_at but status is not 4 (Completed)`);
      
      await connection.execute(
        'UPDATE tasks SET status_id = 4 WHERE task_id = ?',
        [taskId]
      );
      
      await connection.commit();
      
      return res.json({
        success: true,
        message: 'Task fixed: Changed status to Completed(4)',
        data: {
          task_id: taskId,
          old_status: task.status_id,
          new_status: 4,
          completed_at: task.completed_at
        }
      });
    }
    
    await connection.rollback();
    
    res.json({
      success: true,
      message: 'Task is already in consistent state',
      data: task
    });
    
  } catch (error) {
    await connection.rollback();
    console.error('❌ Error fixing task:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fix task',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    connection.release();
  }
});

// NEW: Quick fix for your specific issue (task_id 5)
router.post('/fix-report/:report_id', verifyToken, async (req, res) => {
  const connection = await pool.getConnection();
  const reportId = Number(req.params.report_id);
  
  try {
    if (req.user.role_id !== 3) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required'
      });
    }
    
    if (!reportId) {
      return res.status(400).json({
        success: false,
        message: 'Report ID is required'
      });
    }
    
    await connection.beginTransaction();
    
    console.log(`🔧 Fixing report ${reportId} tasks...`);
    
    // Get all tasks for this report
    const [tasks] = await connection.execute(
      'SELECT * FROM tasks WHERE report_id = ? ORDER BY task_id DESC',
      [reportId]
    );
    
    if (tasks.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: 'No tasks found for this report'
      });
    }
    
    const fixes = [];
    
    // Fix each task
    for (const task of tasks) {
      // If task is deleted (is_deleted = 1) but has active status (2,3,4), fix it
      if (task.is_deleted === 1 && task.status_id >= 2) {
        console.log(`  Fixing task ${task.task_id}: is_deleted=1, status_id=${task.status_id}`);
        
        // Set status to 1 (New) for deleted tasks
        await connection.execute(
          'UPDATE tasks SET status_id = 1 WHERE task_id = ?',
          [task.task_id]
        );
        
        fixes.push({
          task_id: task.task_id,
          change: `status ${task.status_id} → 1 (because deleted)`
        });
      }
      
      // If task has completed_at but status is not 4, fix it
      if (task.completed_at && task.status_id !== 4) {
        console.log(`  Fixing task ${task.task_id}: has completed_at but status=${task.status_id}`);
        
        await connection.execute(
          'UPDATE tasks SET status_id = 4 WHERE task_id = ?',
          [task.task_id]
        );
        
        fixes.push({
          task_id: task.task_id,
          change: `status ${task.status_id} → 4 (Completed)`
        });
      }
    }
    
    // Update report status based on latest task
    const latestTask = tasks[0];
    let reportStatus = 1; // Default to New
    
    if (latestTask.is_deleted === 0) {
      reportStatus = latestTask.status_id;
    }
    
    await connection.execute(
      'UPDATE reports SET status_id = ? WHERE report_id = ?',
      [reportStatus, reportId]
    );
    
    await connection.commit();
    
    res.json({
      success: true,
      message: `Fixed ${fixes.length} issues for report ${reportId}`,
      fixes: fixes,
      data: {
        report_id: reportId,
        report_status: reportStatus,
        tasks_fixed: fixes.length
      }
    });
    
  } catch (error) {
    await connection.rollback();
    console.error('❌ Error fixing report:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fix report',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    connection.release();
  }
});

module.exports = router;