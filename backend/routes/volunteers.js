
// // // // const express = require('express');
// // // // const router = express.Router();
// // // // const verifyToken = require('../middleware/auth');
// // // // const mysql = require('mysql2/promise');
// // // // require('dotenv').config();

// // // // // MySQL pool
// // // // const pool = mysql.createPool({
// // // //   host: process.env.DB_HOST,
// // // //   user: process.env.DB_USER,
// // // //   password: process.env.DB_PASSWORD,
// // // //   database: process.env.DB_NAME,
// // // // });

// // // // /* =====================================================
// // // //    APPROVE VOLUNTEER (ADMIN ONLY)
// // // // ===================================================== */
// // // // router.post('/:id/approve', verifyToken, async (req, res) => {
// // // //   try {
// // // //     const userId = Number(req.params.id);
    
// // // //     // ✅ FIX: Check for role_id = 3 (admin) instead of role = 'admin'
// // // //     if (req.user.role_id !== 3) {
// // // //       return res.status(403).json({ 
// // // //         success: false, 
// // // //         message: 'Forbidden: Admin access required' 
// // // //       });
// // // //     }

// // // //     // Check if user exists and is a volunteer
// // // //     const [userCheck] = await pool.execute(`
// // // //       SELECT u.user_id, u.username, u.role_id, vp.approval_status_id
// // // //       FROM users u
// // // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // // //       WHERE u.user_id = ? AND u.is_deleted = 0
// // // //     `, [userId]);

// // // //     if (userCheck.length === 0) {
// // // //       return res.status(404).json({ 
// // // //         success: false, 
// // // //         message: 'User not found' 
// // // //       });
// // // //     }

// // // //     const user = userCheck[0];
    
// // // //     // Check if user is a volunteer (role_id = 2)
// // // //     if (user.role_id !== 2) {
// // // //       return res.status(400).json({ 
// // // //         success: false, 
// // // //         message: 'User is not a volunteer' 
// // // //       });
// // // //     }

// // // //     // Check if volunteer profile exists, create if not
// // // //     const [volunteerCheck] = await pool.execute(
// // // //       'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
// // // //       [userId]
// // // //     );

// // // //     if (volunteerCheck.length === 0) {
// // // //       // Create volunteer profile if it doesn't exist
// // // //       await pool.execute(
// // // //         `INSERT INTO volunteer_profiles (user_id, approval_status_id, joined_at) VALUES (?, 2, NOW())`,
// // // //         [userId]
// // // //       );
// // // //     } else {
// // // //       // Update existing volunteer profile
// // // //       await pool.execute(
// // // //         `UPDATE volunteer_profiles SET approval_status_id = 2 WHERE user_id = ?`,
// // // //         [userId]
// // // //       );
// // // //     }

// // // //     // ✅ FIX: Return the same response format as users.js
// // // //     const [updatedUser] = await pool.execute(`
// // // //       SELECT 
// // // //         u.user_id,
// // // //         u.username,
// // // //         u.email,
// // // //         u.phone,
// // // //         u.profile_image_url,
// // // //         u.bio,
// // // //         u.created_at,
// // // //         u.role_id,
// // // //         COALESCE(ur.role_name, 'user') AS role_name,
// // // //         vp.approval_status_id,
// // // //         vas.status_name AS volunteer_status,
// // // //         vp.badges,
// // // //         vp.joined_at AS volunteer_since
// // // //       FROM users u
// // // //       LEFT JOIN user_roles ur ON u.role_id = ur.role_id
// // // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // // //       LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
// // // //       WHERE u.user_id = ?
// // // //     `, [userId]);

// // // //     const responseUser = updatedUser[0];
    
// // // //     // Format the response like your GET endpoint
// // // //     const formattedUser = {
// // // //       user_id: responseUser.user_id,
// // // //       username: responseUser.username,
// // // //       email: responseUser.email,
// // // //       phone: responseUser.phone,
// // // //       profile_image_url: responseUser.profile_image_url,
// // // //       bio: responseUser.bio || '',
// // // //       created_at: responseUser.created_at,
// // // //       role_name: responseUser.role_name,
// // // //       volunteer: responseUser.role_id === 2 && responseUser.approval_status_id ? {
// // // //         approval_status_id: responseUser.approval_status_id,
// // // //         status: responseUser.volunteer_status,
// // // //         badges: responseUser.badges ? JSON.parse(responseUser.badges) : [],
// // // //         volunteer_since: responseUser.volunteer_since
// // // //       } : null
// // // //     };

// // // //     res.json({
// // // //       success: true,
// // // //       message: 'Volunteer approved successfully',
// // // //       user: formattedUser
// // // //     });

// // // //   } catch (err) {
// // // //     console.error('Approve volunteer error:', err);
// // // //     res.status(500).json({ 
// // // //       success: false,
// // // //       message: 'Server error',
// // // //       error: process.env.NODE_ENV === 'development' ? err.message : undefined
// // // //     });
// // // //   }
// // // // });

// // // // /* =====================================================
// // // //    REJECT VOLUNTEER (ADMIN ONLY)
// // // // ===================================================== */
// // // // router.post('/:id/reject', verifyToken, async (req, res) => {
// // // //   try {
// // // //     const userId = Number(req.params.id);
    
// // // //     // ✅ FIX: Check for role_id = 3 (admin) instead of role = 'admin'
// // // //     if (req.user.role_id !== 3) {
// // // //       return res.status(403).json({ 
// // // //         success: false, 
// // // //         message: 'Forbidden: Admin access required' 
// // // //       });
// // // //     }

// // // //     // Check if user exists and is a volunteer
// // // //     const [userCheck] = await pool.execute(`
// // // //       SELECT u.user_id, u.username, u.role_id, vp.approval_status_id
// // // //       FROM users u
// // // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // // //       WHERE u.user_id = ? AND u.is_deleted = 0
// // // //     `, [userId]);

// // // //     if (userCheck.length === 0) {
// // // //       return res.status(404).json({ 
// // // //         success: false, 
// // // //         message: 'User not found' 
// // // //       });
// // // //     }

// // // //     const user = userCheck[0];
    
// // // //     if (user.role_id !== 2) {
// // // //       return res.status(400).json({ 
// // // //         success: false, 
// // // //         message: 'User is not a volunteer' 
// // // //       });
// // // //     }

// // // //     // Check if volunteer profile exists, create if not
// // // //     const [volunteerCheck] = await pool.execute(
// // // //       'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
// // // //       [userId]
// // // //     );

// // // //     if (volunteerCheck.length === 0) {
// // // //       // Create volunteer profile with rejected status
// // // //       await pool.execute(
// // // //         `INSERT INTO volunteer_profiles (user_id, approval_status_id) VALUES (?, 3)`,
// // // //         [userId]
// // // //       );
// // // //     } else {
// // // //       // Update existing volunteer profile
// // // //       await pool.execute(
// // // //         `UPDATE volunteer_profiles SET approval_status_id = 3 WHERE user_id = ?`,
// // // //         [userId]
// // // //       );
// // // //     }

// // // //     // ✅ FIX: Return the same response format as users.js
// // // //     const [updatedUser] = await pool.execute(`
// // // //       SELECT 
// // // //         u.user_id,
// // // //         u.username,
// // // //         u.email,
// // // //         u.phone,
// // // //         u.profile_image_url,
// // // //         u.bio,
// // // //         u.created_at,
// // // //         u.role_id,
// // // //         COALESCE(ur.role_name, 'user') AS role_name,
// // // //         vp.approval_status_id,
// // // //         vas.status_name AS volunteer_status,
// // // //         vp.badges,
// // // //         vp.joined_at AS volunteer_since
// // // //       FROM users u
// // // //       LEFT JOIN user_roles ur ON u.role_id = ur.role_id
// // // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // // //       LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
// // // //       WHERE u.user_id = ?
// // // //     `, [userId]);

// // // //     const responseUser = updatedUser[0];
    
// // // //     // Format the response like your GET endpoint
// // // //     const formattedUser = {
// // // //       user_id: responseUser.user_id,
// // // //       username: responseUser.username,
// // // //       email: responseUser.email,
// // // //       phone: responseUser.phone,
// // // //       profile_image_url: responseUser.profile_image_url,
// // // //       bio: responseUser.bio || '',
// // // //       created_at: responseUser.created_at,
// // // //       role_name: responseUser.role_name,
// // // //       volunteer: responseUser.role_id === 2 && responseUser.approval_status_id ? {
// // // //         approval_status_id: responseUser.approval_status_id,
// // // //         status: responseUser.volunteer_status,
// // // //         badges: responseUser.badges ? JSON.parse(responseUser.badges) : [],
// // // //         volunteer_since: responseUser.volunteer_since
// // // //       } : null
// // // //     };

// // // //     res.json({
// // // //       success: true,
// // // //       message: 'Volunteer rejected',
// // // //       user: formattedUser
// // // //     });

// // // //   } catch (err) {
// // // //     console.error('Reject volunteer error:', err);
// // // //     res.status(500).json({ 
// // // //       success: false,
// // // //       message: 'Server error',
// // // //       error: process.env.NODE_ENV === 'development' ? err.message : undefined
// // // //     });
// // // //   }
// // // // });

// // // // /* =====================================================
// // // //    ADDITIONAL ENDPOINTS FOR FRONTEND COMPATIBILITY
// // // // ===================================================== */

// // // // // ✅ Add PUT method endpoints too
// // // // router.put('/:id/approve', verifyToken, async (req, res) => {
// // // //   // Same as POST /approve but with PUT method
// // // //   try {
// // // //     const userId = Number(req.params.id);
    
// // // //     if (req.user.role_id !== 3) {
// // // //       return res.status(403).json({ 
// // // //         success: false, 
// // // //         message: 'Forbidden: Admin access required' 
// // // //       });
// // // //     }

// // // //     const [userCheck] = await pool.execute(`
// // // //       SELECT u.user_id, u.username, u.role_id, vp.approval_status_id
// // // //       FROM users u
// // // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // // //       WHERE u.user_id = ? AND u.is_deleted = 0
// // // //     `, [userId]);

// // // //     if (userCheck.length === 0) {
// // // //       return res.status(404).json({ 
// // // //         success: false, 
// // // //         message: 'User not found' 
// // // //       });
// // // //     }

// // // //     const user = userCheck[0];
    
// // // //     if (user.role_id !== 2) {
// // // //       return res.status(400).json({ 
// // // //         success: false, 
// // // //         message: 'User is not a volunteer' 
// // // //       });
// // // //     }

// // // //     const [volunteerCheck] = await pool.execute(
// // // //       'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
// // // //       [userId]
// // // //     );

// // // //     if (volunteerCheck.length === 0) {
// // // //       await pool.execute(
// // // //         `INSERT INTO volunteer_profiles (user_id, approval_status_id, joined_at) VALUES (?, 2, NOW())`,
// // // //         [userId]
// // // //       );
// // // //     } else {
// // // //       await pool.execute(
// // // //         `UPDATE volunteer_profiles SET approval_status_id = 2 WHERE user_id = ?`,
// // // //         [userId]
// // // //       );
// // // //     }

// // // //     const [updatedUser] = await pool.execute(`
// // // //       SELECT 
// // // //         u.user_id,
// // // //         u.username,
// // // //         u.email,
// // // //         u.phone,
// // // //         u.profile_image_url,
// // // //         u.bio,
// // // //         u.created_at,
// // // //         u.role_id,
// // // //         COALESCE(ur.role_name, 'user') AS role_name,
// // // //         vp.approval_status_id,
// // // //         vas.status_name AS volunteer_status,
// // // //         vp.badges,
// // // //         vp.joined_at AS volunteer_since
// // // //       FROM users u
// // // //       LEFT JOIN user_roles ur ON u.role_id = ur.role_id
// // // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // // //       LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
// // // //       WHERE u.user_id = ?
// // // //     `, [userId]);

// // // //     const responseUser = updatedUser[0];
    
// // // //     const formattedUser = {
// // // //       user_id: responseUser.user_id,
// // // //       username: responseUser.username,
// // // //       email: responseUser.email,
// // // //       phone: responseUser.phone,
// // // //       profile_image_url: responseUser.profile_image_url,
// // // //       bio: responseUser.bio || '',
// // // //       created_at: responseUser.created_at,
// // // //       role_name: responseUser.role_name,
// // // //       volunteer: responseUser.role_id === 2 && responseUser.approval_status_id ? {
// // // //         approval_status_id: responseUser.approval_status_id,
// // // //         status: responseUser.volunteer_status,
// // // //         badges: responseUser.badges ? JSON.parse(responseUser.badges) : [],
// // // //         volunteer_since: responseUser.volunteer_since
// // // //       } : null
// // // //     };

// // // //     res.json({
// // // //       success: true,
// // // //       message: 'Volunteer approved successfully',
// // // //       user: formattedUser
// // // //     });

// // // //   } catch (err) {
// // // //     console.error('Approve volunteer error:', err);
// // // //     res.status(500).json({ 
// // // //       success: false,
// // // //       message: 'Server error',
// // // //       error: process.env.NODE_ENV === 'development' ? err.message : undefined
// // // //     });
// // // //   }
// // // // });

// // // // router.put('/:id/reject', verifyToken, async (req, res) => {
// // // //   // Same as POST /reject but with PUT method
// // // //   try {
// // // //     const userId = Number(req.params.id);
    
// // // //     if (req.user.role_id !== 3) {
// // // //       return res.status(403).json({ 
// // // //         success: false, 
// // // //         message: 'Forbidden: Admin access required' 
// // // //       });
// // // //     }

// // // //     const [userCheck] = await pool.execute(`
// // // //       SELECT u.user_id, u.username, u.role_id, vp.approval_status_id
// // // //       FROM users u
// // // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // // //       WHERE u.user_id = ? AND u.is_deleted = 0
// // // //     `, [userId]);

// // // //     if (userCheck.length === 0) {
// // // //       return res.status(404).json({ 
// // // //         success: false, 
// // // //         message: 'User not found' 
// // // //       });
// // // //     }

// // // //     const user = userCheck[0];
    
// // // //     if (user.role_id !== 2) {
// // // //       return res.status(400).json({ 
// // // //         success: false, 
// // // //         message: 'User is not a volunteer' 
// // // //       });
// // // //     }

// // // //     const [volunteerCheck] = await pool.execute(
// // // //       'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
// // // //       [userId]
// // // //     );

// // // //     if (volunteerCheck.length === 0) {
// // // //       await pool.execute(
// // // //         `INSERT INTO volunteer_profiles (user_id, approval_status_id) VALUES (?, 3)`,
// // // //         [userId]
// // // //       );
// // // //     } else {
// // // //       await pool.execute(
// // // //         `UPDATE volunteer_profiles SET approval_status_id = 3 WHERE user_id = ?`,
// // // //         [userId]
// // // //       );
// // // //     }

// // // //     const [updatedUser] = await pool.execute(`
// // // //       SELECT 
// // // //         u.user_id,
// // // //         u.username,
// // // //         u.email,
// // // //         u.phone,
// // // //         u.profile_image_url,
// // // //         u.bio,
// // // //         u.created_at,
// // // //         u.role_id,
// // // //         COALESCE(ur.role_name, 'user') AS role_name,
// // // //         vp.approval_status_id,
// // // //         vas.status_name AS volunteer_status,
// // // //         vp.badges,
// // // //         vp.joined_at AS volunteer_since
// // // //       FROM users u
// // // //       LEFT JOIN user_roles ur ON u.role_id = ur.role_id
// // // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // // //       LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
// // // //       WHERE u.user_id = ?
// // // //     `, [userId]);

// // // //     const responseUser = updatedUser[0];
    
// // // //     const formattedUser = {
// // // //       user_id: responseUser.user_id,
// // // //       username: responseUser.username,
// // // //       email: responseUser.email,
// // // //       phone: responseUser.phone,
// // // //       profile_image_url: responseUser.profile_image_url,
// // // //       bio: responseUser.bio || '',
// // // //       created_at: responseUser.created_at,
// // // //       role_name: responseUser.role_name,
// // // //       volunteer: responseUser.role_id === 2 && responseUser.approval_status_id ? {
// // // //         approval_status_id: responseUser.approval_status_id,
// // // //         status: responseUser.volunteer_status,
// // // //         badges: responseUser.badges ? JSON.parse(responseUser.badges) : [],
// // // //         volunteer_since: responseUser.volunteer_since
// // // //       } : null
// // // //     };

// // // //     res.json({
// // // //       success: true,
// // // //       message: 'Volunteer rejected',
// // // //       user: formattedUser
// // // //     });

// // // //   } catch (err) {
// // // //     console.error('Reject volunteer error:', err);
// // // //     res.status(500).json({ 
// // // //       success: false,
// // // //       message: 'Server error',
// // // //       error: process.env.NODE_ENV === 'development' ? err.message : undefined
// // // //     });
// // // //   }
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

// // // console.log('✅ Volunteer routes initialized');

// // // // =====================================================
// // // // ADMIN ROUTES - Volunteer Management
// // // // =====================================================

// // // // Get ALL volunteers (for admin assignment) - SHOW ONLY APPROVED VOLUNTEERS
// // // router.get('/available', verifyToken, async (req, res) => {
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }

// // //     console.log('👥 Fetching APPROVED volunteers for assignment...');
    
// // //     const [volunteers] = await pool.execute(`
// // //       SELECT 
// // //         u.user_id,
// // //         u.username,
// // //         u.email,
// // //         COALESCE(CAST(u.phone AS CHAR), '') as phone,
// // //         u.bio,
// // //         u.created_at,
// // //         u.role_id,
// // //         COALESCE(vp.joined_at, u.created_at) as joined_at,
// // //         COALESCE(vp.approval_status_id, 2) as approval_status_id,
// // //         CASE 
// // //           WHEN vp.approval_status_id = 1 THEN 'Pending'
// // //           WHEN vp.approval_status_id = 2 THEN 'Approved'
// // //           WHEN vp.approval_status_id = 3 THEN 'Rejected'
// // //           ELSE 'Approved'
// // //         END as approval_status,
// // //         COALESCE(vp.availability_status_id, 1) as availability_status_id,
// // //         a.status_name as availability_status,
// // //         (
// // //           SELECT COUNT(*) 
// // //           FROM tasks t
// // //           WHERE t.assigned_to_user_id = u.user_id 
// // //           AND t.status_id = 2
// // //           AND t.is_deleted = 0
// // //         ) as assigned_reports_count
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// // //       WHERE u.role_id = 2
// // //         AND u.is_deleted = 0
// // //         AND (vp.approval_status_id = 2 OR (vp.approval_status_id IS NULL AND u.user_id IN (2, 8)))
// // //       ORDER BY u.username ASC
// // //     `);

// // //     console.log(`✅ Found ${volunteers.length} APPROVED volunteers for assignment`);
    
// // //     res.json({
// // //       success: true,
// // //       data: volunteers,
// // //       count: volunteers.length
// // //     });

// // //   } catch (error) {
// // //     console.error('❌ Error fetching volunteers:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch volunteers',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // Get only APPROVED volunteers - Alternative endpoint
// // // router.get('/approved', verifyToken, async (req, res) => {
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }

// // //     console.log('👥 Fetching APPROVED volunteers only...');
    
// // //     const [volunteers] = await pool.execute(`
// // //       SELECT 
// // //         u.user_id,
// // //         u.username,
// // //         u.email,
// // //         COALESCE(CAST(u.phone AS CHAR), '') as phone,
// // //         u.bio,
// // //         u.created_at,
// // //         u.role_id,
// // //         COALESCE(vp.joined_at, u.created_at) as joined_at,
// // //         vp.approval_status_id,
// // //         'Approved' as approval_status,
// // //         COALESCE(vp.availability_status_id, 1) as availability_status_id,
// // //         a.status_name as availability_status,
// // //         (
// // //           SELECT COUNT(*) 
// // //           FROM tasks t
// // //           WHERE t.assigned_to_user_id = u.user_id 
// // //           AND t.status_id = 2
// // //           AND t.is_deleted = 0
// // //         ) as assigned_reports_count
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// // //       WHERE u.role_id = 2
// // //         AND u.is_deleted = 0
// // //         AND vp.approval_status_id = 2
// // //       ORDER BY u.username ASC
// // //     `);

// // //     console.log(`✅ Found ${volunteers.length} APPROVED volunteers`);
    
// // //     res.json({
// // //       success: true,
// // //       data: volunteers,
// // //       count: volunteers.length
// // //     });

// // //   } catch (error) {
// // //     console.error('❌ Error fetching approved volunteers:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch approved volunteers',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // Get all volunteers with detailed info (for admin management)
// // // router.get('/admin/all', verifyToken, async (req, res) => {
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }

// // //     console.log('👥 Fetching ALL volunteers for admin...');
    
// // //     const [volunteers] = await pool.execute(`
// // //       SELECT 
// // //         u.user_id,
// // //         u.username,
// // //         u.email,
// // //         COALESCE(CAST(u.phone AS CHAR), '') as phone,
// // //         u.bio,
// // //         u.profile_image_url,
// // //         u.created_at,
// // //         u.role_id,
// // //         COALESCE(vp.joined_at, u.created_at) as joined_at,
// // //         COALESCE(vp.approval_status_id, 2) as approval_status_id,
// // //         CASE 
// // //           WHEN vp.approval_status_id = 1 THEN 'Pending'
// // //           WHEN vp.approval_status_id = 2 THEN 'Approved'
// // //           WHEN vp.approval_status_id = 3 THEN 'Rejected'
// // //           ELSE 'Approved'
// // //         END as approval_status,
// // //         COALESCE(vp.availability_status_id, 1) as availability_status_id,
// // //         a.status_name as availability_status,
// // //         vp.badges,
// // //         (
// // //           SELECT COUNT(*) 
// // //           FROM tasks t
// // //           WHERE t.assigned_to_user_id = u.user_id 
// // //           AND t.is_deleted = 0
// // //         ) as total_assigned_reports,
// // //         (
// // //           SELECT COUNT(*) 
// // //           FROM tasks t
// // //           INNER JOIN reports r ON t.report_id = r.report_id
// // //           WHERE t.assigned_to_user_id = u.user_id 
// // //           AND r.status_id = 4
// // //           AND t.is_deleted = 0
// // //           AND r.is_deleted = 0
// // //         ) as completed_reports,
// // //         (
// // //           SELECT COUNT(*) 
// // //           FROM tasks t
// // //           WHERE t.assigned_to_user_id = u.user_id 
// // //           AND t.status_id = 2
// // //           AND t.is_deleted = 0
// // //         ) as active_reports
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// // //       WHERE u.role_id = 2
// // //         AND u.is_deleted = 0
// // //       ORDER BY 
// // //         CASE WHEN COALESCE(vp.approval_status_id, 2) = 2 THEN 1 ELSE 2 END,
// // //         u.username ASC
// // //     `);

// // //     console.log(`✅ Found ${volunteers.length} volunteers for admin`);
    
// // //     res.json({
// // //       success: true,
// // //       data: volunteers,
// // //       count: volunteers.length
// // //     });

// // //   } catch (error) {
// // //     console.error('❌ Error fetching all volunteers:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch volunteers',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // Update volunteer approval status
// // // router.patch('/:id/approval', verifyToken, async (req, res) => {
// // //   const volunteerId = Number(req.params.id);
// // //   const { approval_status_id } = req.body;
  
// // //   if (!volunteerId) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid volunteer ID'
// // //     });
// // //   }
  
// // //   if (!approval_status_id || (approval_status_id < 1 || approval_status_id > 3)) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid approval status ID. Must be 1 (Pending), 2 (Approved), or 3 (Rejected)'
// // //     });
// // //   }
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     const [volunteerCheck] = await pool.execute(
// // //       'SELECT user_id FROM users WHERE user_id = ? AND role_id = 2 AND is_deleted = 0',
// // //       [volunteerId]
// // //     );
    
// // //     if (volunteerCheck.length === 0) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Volunteer not found'
// // //       });
// // //     }
    
// // //     const [profileCheck] = await pool.execute(
// // //       'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
// // //       [volunteerId]
// // //     );
    
// // //     if (profileCheck.length === 0) {
// // //       await pool.execute(
// // //         `INSERT INTO volunteer_profiles (user_id, approval_status_id, availability_status_id, joined_at)
// // //          VALUES (?, ?, 1, NOW())`,
// // //         [volunteerId, approval_status_id]
// // //       );
// // //     } else {
// // //       await pool.execute(
// // //         'UPDATE volunteer_profiles SET approval_status_id = ? WHERE user_id = ?',
// // //         [approval_status_id, volunteerId]
// // //       );
// // //     }
    
// // //     const [updatedVolunteer] = await pool.execute(`
// // //       SELECT 
// // //         u.user_id,
// // //         u.username,
// // //         u.email,
// // //         COALESCE(CAST(u.phone AS CHAR), '') as phone,
// // //         COALESCE(vp.approval_status_id, 2) as approval_status_id,
// // //         CASE 
// // //           WHEN vp.approval_status_id = 1 THEN 'Pending'
// // //           WHEN vp.approval_status_id = 2 THEN 'Approved'
// // //           WHEN vp.approval_status_id = 3 THEN 'Rejected'
// // //           ELSE 'Approved'
// // //         END as approval_status
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       WHERE u.user_id = ?
// // //     `, [volunteerId]);
    
// // //     res.json({
// // //       success: true,
// // //       message: `Volunteer approval status updated to ${updatedVolunteer[0].approval_status}`,
// // //       data: updatedVolunteer[0]
// // //     });
    
// // //   } catch (error) {
// // //     console.error('❌ Error updating volunteer approval:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to update volunteer approval status',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // =====================================================
// // // // VOLUNTEER AVAILABILITY STATUSES
// // // // =====================================================

// // // // Get all availability statuses for dropdowns
// // // router.get('/availability-statuses', verifyToken, async (req, res) => {
// // //   try {
// // //     const [statuses] = await pool.execute(`
// // //       SELECT 
// // //         status_id, 
// // //         status_name
// // //       FROM availability_statuses 
// // //       ORDER BY status_id
// // //     `);
    
// // //     res.json({
// // //       success: true,
// // //       data: statuses
// // //     });
    
// // //   } catch (error) {
// // //     console.error('❌ Error fetching availability statuses:', error);
// // //     const fallbackStatuses = [
// // //       { status_id: 1, status_name: 'available' },
// // //       { status_id: 2, status_name: 'unavailable' }
// // //     ];
// // //     res.json({
// // //       success: true,
// // //       data: fallbackStatuses,
// // //       message: 'Using fallback data'
// // //     });
// // //   }
// // // });

// // // // Get volunteer's own availability
// // // router.get('/availability', verifyToken, async (req, res) => {
// // //   const volunteerId = req.user.user_id;
  
// // //   try {
// // //     if (req.user.role_id !== 2) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Volunteer access required'
// // //       });
// // //     }
    
// // //     const [profiles] = await pool.execute(`
// // //       SELECT 
// // //         u.user_id,
// // //         u.username,
// // //         COALESCE(vp.availability_status_id, 1) as availability_status_id,
// // //         a.status_name as availability_status,
// // //         DATE_FORMAT(vp.availability_updated_at, '%Y-%m-%d %H:%i:%s') as availability_updated_at,
// // //         COALESCE(vp.approval_status_id, 2) as approval_status_id,
// // //         (
// // //           SELECT COUNT(*) 
// // //           FROM tasks t
// // //           WHERE t.assigned_to_user_id = u.user_id 
// // //           AND t.status_id = 2
// // //           AND t.is_deleted = 0
// // //         ) as active_tasks_count
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// // //       WHERE u.user_id = ? AND u.role_id = 2
// // //     `, [volunteerId]);
    
// // //     if (profiles.length === 0) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Volunteer profile not found'
// // //       });
// // //     }
    
// // //     res.json({
// // //       success: true,
// // //       data: profiles[0]
// // //     });
    
// // //   } catch (error) {
// // //     console.error('❌ Error fetching volunteer availability:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch availability',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // Update volunteer's own availability (SELF-SERVICE)
// // // router.patch('/availability', verifyToken, async (req, res) => {
// // //   const volunteerId = req.user.user_id;
// // //   const { availability_status_id } = req.body;
  
// // //   if (!availability_status_id || (availability_status_id < 1 || availability_status_id > 2)) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid availability status ID. Must be 1 (available) or 2 (unavailable)'
// // //     });
// // //   }
  
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     await connection.beginTransaction();
    
// // //     if (req.user.role_id !== 2) {
// // //       await connection.rollback();
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Volunteer access required'
// // //       });
// // //     }
    
// // //     const [profileCheck] = await connection.execute(
// // //       'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
// // //       [volunteerId]
// // //     );
    
// // //     if (profileCheck.length === 0) {
// // //       await connection.execute(
// // //         `INSERT INTO volunteer_profiles 
// // //          (user_id, approval_status_id, availability_status_id, availability_updated_at, joined_at)
// // //          VALUES (?, 2, ?, NOW(), NOW())`,
// // //         [volunteerId, availability_status_id]
// // //       );
// // //     } else {
// // //       await connection.execute(
// // //         `UPDATE volunteer_profiles 
// // //          SET availability_status_id = ?, 
// // //              availability_updated_at = NOW() 
// // //          WHERE user_id = ?`,
// // //         [availability_status_id, volunteerId]
// // //       );
// // //     }
    
// // //     await connection.commit();
    
// // //     const [statuses] = await pool.execute(
// // //       'SELECT status_name FROM availability_statuses WHERE status_id = ?',
// // //       [availability_status_id]
// // //     );
    
// // //     const statusName = statuses[0]?.status_name || (availability_status_id === 1 ? 'available' : 'unavailable');
    
// // //     res.json({
// // //       success: true,
// // //       message: `Availability updated to ${statusName}`,
// // //       data: {
// // //         user_id: volunteerId,
// // //         availability_status_id: availability_status_id,
// // //         availability_status: statusName,
// // //         updated_at: new Date().toISOString()
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('❌ Error updating volunteer availability:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to update availability',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // // Update volunteer availability status (Admin or Self)
// // // router.patch('/:id/availability', verifyToken, async (req, res) => {
// // //   const volunteerId = Number(req.params.id);
// // //   const { availability_status_id } = req.body;
  
// // //   if (!volunteerId) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid volunteer ID'
// // //     });
// // //   }
  
// // //   if (!availability_status_id || (availability_status_id < 1 || availability_status_id > 2)) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid availability status ID. Must be 1 (available) or 2 (unavailable)'
// // //     });
// // //   }
  
// // //   try {
// // //     if (req.user.role_id !== 3 && req.user.user_id !== volunteerId) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: You can only update your own availability'
// // //       });
// // //     }
    
// // //     const [volunteerCheck] = await pool.execute(
// // //       'SELECT user_id FROM users WHERE user_id = ? AND role_id = 2 AND is_deleted = 0',
// // //       [volunteerId]
// // //     );
    
// // //     if (volunteerCheck.length === 0) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Volunteer not found'
// // //       });
// // //     }
    
// // //     const [profileCheck] = await pool.execute(
// // //       'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
// // //       [volunteerId]
// // //     );
    
// // //     if (profileCheck.length === 0) {
// // //       await pool.execute(
// // //         `INSERT INTO volunteer_profiles (user_id, approval_status_id, availability_status_id, joined_at)
// // //          VALUES (?, 2, ?, NOW())`,
// // //         [volunteerId, availability_status_id]
// // //       );
// // //     } else {
// // //       await pool.execute(
// // //         'UPDATE volunteer_profiles SET availability_status_id = ?, availability_updated_at = NOW() WHERE user_id = ?',
// // //         [availability_status_id, volunteerId]
// // //       );
// // //     }
    
// // //     const [statuses] = await pool.execute(
// // //       'SELECT status_name FROM availability_statuses WHERE status_id = ?',
// // //       [availability_status_id]
// // //     );
    
// // //     const statusName = statuses[0]?.status_name || (availability_status_id === 1 ? 'available' : 'unavailable');
    
// // //     const [updatedVolunteer] = await pool.execute(`
// // //       SELECT 
// // //         u.user_id,
// // //         u.username,
// // //         COALESCE(vp.availability_status_id, 1) as availability_status_id,
// // //         a.status_name as availability_status
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// // //       WHERE u.user_id = ?
// // //     `, [volunteerId]);
    
// // //     res.json({
// // //       success: true,
// // //       message: `Volunteer availability updated to ${statusName}`,
// // //       data: updatedVolunteer[0]
// // //     });
    
// // //   } catch (error) {
// // //     console.error('❌ Error updating volunteer availability:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to update volunteer availability',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // =====================================================
// // // // VOLUNTEER TASK MANAGEMENT
// // // // =====================================================

// // // // Get all tasks for current volunteer
// // // router.get('/tasks', verifyToken, async (req, res) => {
// // //   const volunteerId = req.user.user_id;
  
// // //   try {
// // //     if (req.user.role_id !== 2) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Volunteer access required'
// // //       });
// // //     }
    
// // //     console.log(`📋 Fetching tasks for volunteer: ${volunteerId}`);
    
// // //     const [tasks] = await pool.execute(`
// // //       SELECT 
// // //         t.task_id,
// // //         t.report_id,
// // //         t.assigned_to_user_id,
// // //         t.assigned_by_user_id,
// // //         t.status_id as task_status_id,
// // //         ts.status_name as task_status,
// // //         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
// // //         DATE_FORMAT(t.volunteer_responded_at, '%Y-%m-%d %H:%i:%s') as responded_at,
// // //         t.volunteer_response,
// // //         t.declined_reason,
// // //         DATE_FORMAT(t.started_at, '%Y-%m-%d %H:%i:%s') as started_at,
// // //         DATE_FORMAT(t.completed_at, '%Y-%m-%d %H:%i:%s') as completed_at,
// // //         r.report_id,
// // //         r.description,
// // //         r.location_address,
// // //         r.user_note,
// // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as report_submitted_at,
// // //         at.type_name as animal_type,
// // //         ac.condition_name as animal_condition,
// // //         r.status_id as report_status_id,
// // //         rs.status_name as report_status,
// // //         u.username as reporter_name,
// // //         CAST(u.phone AS CHAR) AS reporter_phone,
// // //         u.email as reporter_email,
// // //         au.username as assigned_by_name
// // //       FROM tasks t
// // //       INNER JOIN reports r ON t.report_id = r.report_id
// // //       LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
// // //       LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
// // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // //       LEFT JOIN users u ON r.user_id = u.user_id
// // //       LEFT JOIN users au ON t.assigned_by_user_id = au.user_id
// // //       WHERE t.assigned_to_user_id = ? 
// // //         AND t.is_deleted = 0
// // //         AND r.is_deleted = 0
// // //       ORDER BY 
// // //         CASE 
// // //           WHEN t.status_id = 1 THEN 1
// // //           WHEN t.status_id = 2 THEN 2
// // //           WHEN t.status_id = 3 THEN 4
// // //           WHEN t.status_id = 4 THEN 3
// // //         END,
// // //         t.assigned_at DESC
// // //     `, [volunteerId]);
    
// // //     const groupedTasks = {
// // //       assigned: tasks.filter(t => t.task_status_id === 1),
// // //       inProgress: tasks.filter(t => t.task_status_id === 2),
// // //       completed: tasks.filter(t => t.task_status_id === 3),
// // //       declined: tasks.filter(t => t.task_status_id === 4)
// // //     };
    
// // //     res.json({
// // //       success: true,
// // //       data: tasks,
// // //       grouped: groupedTasks,
// // //       counts: {
// // //         total: tasks.length,
// // //         assigned: groupedTasks.assigned.length,
// // //         inProgress: groupedTasks.inProgress.length,
// // //         completed: groupedTasks.completed.length,
// // //         declined: groupedTasks.declined.length
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     console.error('❌ Error fetching volunteer tasks:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch tasks',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // Get single task details
// // // router.get('/tasks/:taskId', verifyToken, async (req, res) => {
// // //   const taskId = Number(req.params.taskId);
// // //   const volunteerId = req.user.user_id;
  
// // //   if (!taskId) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid task ID'
// // //     });
// // //   }
  
// // //   try {
// // //     if (req.user.role_id !== 2) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Volunteer access required'
// // //       });
// // //     }
    
// // //     const [tasks] = await pool.execute(`
// // //       SELECT 
// // //         t.*,
// // //         ts.status_name as task_status,
// // //         r.*,
// // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as report_submitted_at,
// // //         at.type_name as animal_type,
// // //         ac.condition_name as animal_condition,
// // //         rs.status_name as report_status,
// // //         u.username as reporter_name,
// // //         CAST(u.phone AS CHAR) AS reporter_phone,
// // //         u.email as reporter_email,
// // //         au.username as assigned_by_name
// // //       FROM tasks t
// // //       INNER JOIN reports r ON t.report_id = r.report_id
// // //       LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
// // //       LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
// // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // //       LEFT JOIN users u ON r.user_id = u.user_id
// // //       LEFT JOIN users au ON t.assigned_by_user_id = au.user_id
// // //       WHERE t.task_id = ? 
// // //         AND t.assigned_to_user_id = ?
// // //         AND t.is_deleted = 0
// // //         AND r.is_deleted = 0
// // //     `, [taskId, volunteerId]);
    
// // //     if (tasks.length === 0) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Task not found or not assigned to you'
// // //       });
// // //     }
    
// // //     res.json({
// // //       success: true,
// // //       data: tasks[0]
// // //     });
    
// // //   } catch (error) {
// // //     console.error('❌ Error fetching task:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch task',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // Accept a task (auto-sets to in_progress and updates availability)
// // // router.patch('/tasks/:taskId/accept', verifyToken, async (req, res) => {
// // //   const taskId = Number(req.params.taskId);
// // //   const volunteerId = req.user.user_id;
  
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     await connection.beginTransaction();
    
// // //     if (req.user.role_id !== 2) {
// // //       await connection.rollback();
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Volunteer access required'
// // //       });
// // //     }
    
// // //     const [tasks] = await connection.execute(
// // //       `SELECT t.task_id, t.report_id, t.status_id, r.status_id as report_status_id
// // //        FROM tasks t
// // //        INNER JOIN reports r ON t.report_id = r.report_id
// // //        WHERE t.task_id = ? AND t.assigned_to_user_id = ? AND t.is_deleted = 0`,
// // //       [taskId, volunteerId]
// // //     );
    
// // //     if (tasks.length === 0) {
// // //       await connection.rollback();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Task not found or not assigned to you'
// // //       });
// // //     }
    
// // //     const task = tasks[0];
    
// // //     if (task.status_id !== 1) {
// // //       await connection.rollback();
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'This task cannot be accepted'
// // //       });
// // //     }
    
// // //     // Update task to in_progress (status_id = 2)
// // //     await connection.execute(
// // //       `UPDATE tasks 
// // //        SET status_id = 2, 
// // //            volunteer_responded_at = NOW(), 
// // //            volunteer_response = 'accepted',
// // //            started_at = NOW()
// // //        WHERE task_id = ?`,
// // //       [taskId]
// // //     );
    
// // //     // Update report status to in_progress (status_id = 3)
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = 3 WHERE report_id = ?',
// // //       [task.report_id]
// // //     );
    
// // //     // AUTO-UPDATE AVAILABILITY - Check if this is their first active task
// // //     const [activeTasks] = await connection.execute(
// // //       `SELECT COUNT(*) as count 
// // //        FROM tasks 
// // //        WHERE assigned_to_user_id = ? 
// // //          AND status_id = 2
// // //          AND is_deleted = 0`,
// // //       [volunteerId]
// // //     );
    
// // //     let availabilityUpdated = false;
// // //     if (activeTasks[0].count === 1) { // This is their first active task
// // //       await connection.execute(
// // //         `UPDATE volunteer_profiles 
// // //          SET availability_status_id = 2,
// // //              availability_updated_at = NOW() 
// // //          WHERE user_id = ?`,
// // //         [volunteerId]
// // //       );
// // //       availabilityUpdated = true;
// // //       console.log(`🔄 Auto-set volunteer ${volunteerId} to unavailable`);
// // //     }
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Task accepted successfully',
// // //       data: {
// // //         task_id: taskId,
// // //         status: 'in_progress',
// // //         status_id: 2,
// // //         accepted_at: new Date().toISOString(),
// // //         availability_auto_updated: availabilityUpdated
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('❌ Error accepting task:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to accept task',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // // Decline a task
// // // router.patch('/tasks/:taskId/decline', verifyToken, async (req, res) => {
// // //   const taskId = Number(req.params.taskId);
// // //   const volunteerId = req.user.user_id;
// // //   const { reason } = req.body;
  
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     await connection.beginTransaction();
    
// // //     if (req.user.role_id !== 2) {
// // //       await connection.rollback();
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Volunteer access required'
// // //       });
// // //     }
    
// // //     const [tasks] = await connection.execute(
// // //       `SELECT t.task_id, t.report_id, t.status_id
// // //        FROM tasks t
// // //        WHERE t.task_id = ? AND t.assigned_to_user_id = ? AND t.is_deleted = 0`,
// // //       [taskId, volunteerId]
// // //     );
    
// // //     if (tasks.length === 0) {
// // //       await connection.rollback();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Task not found or not assigned to you'
// // //       });
// // //     }
    
// // //     const task = tasks[0];
    
// // //     if (task.status_id !== 1) {
// // //       await connection.rollback();
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'This task cannot be declined'
// // //       });
// // //     }
    
// // //     // Update task to declined (status_id = 4)
// // //     await connection.execute(
// // //       `UPDATE tasks 
// // //        SET status_id = 4, 
// // //            volunteer_responded_at = NOW(), 
// // //            volunteer_response = 'declined',
// // //            declined_reason = ?
// // //        WHERE task_id = ?`,
// // //       [reason || 'No reason provided', taskId]
// // //     );
    
// // //     // Update report status back to submitted (status_id = 1)
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = 1 WHERE report_id = ?',
// // //       [task.report_id]
// // //     );
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Task declined successfully',
// // //       data: {
// // //         task_id: taskId,
// // //         status: 'declined',
// // //         status_id: 4,
// // //         declined_at: new Date().toISOString(),
// // //         reason: reason || 'No reason provided'
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('❌ Error declining task:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to decline task',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // // Complete a task
// // // router.patch('/tasks/:taskId/complete', verifyToken, async (req, res) => {
// // //   const taskId = Number(req.params.taskId);
// // //   const volunteerId = req.user.user_id;
  
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     await connection.beginTransaction();
    
// // //     if (req.user.role_id !== 2) {
// // //       await connection.rollback();
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Volunteer access required'
// // //       });
// // //     }
    
// // //     const [tasks] = await connection.execute(
// // //       `SELECT t.task_id, t.report_id, t.status_id
// // //        FROM tasks t
// // //        WHERE t.task_id = ? AND t.assigned_to_user_id = ? AND t.is_deleted = 0`,
// // //       [taskId, volunteerId]
// // //     );
    
// // //     if (tasks.length === 0) {
// // //       await connection.rollback();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Task not found or not assigned to you'
// // //       });
// // //     }
    
// // //     const task = tasks[0];
    
// // //     if (task.status_id !== 2) {
// // //       await connection.rollback();
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Task must be in progress before completing'
// // //       });
// // //     }
    
// // //     // Update task to completed (status_id = 3)
// // //     await connection.execute(
// // //       `UPDATE tasks 
// // //        SET status_id = 3, 
// // //            completed_at = NOW() 
// // //        WHERE task_id = ?`,
// // //       [taskId]
// // //     );
    
// // //     // Update report status to completed (status_id = 4)
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = 4 WHERE report_id = ?',
// // //       [task.report_id]
// // //     );
    
// // //     // AUTO-UPDATE AVAILABILITY - Check if they have any other active tasks
// // //     const [activeTasks] = await connection.execute(
// // //       `SELECT COUNT(*) as count 
// // //        FROM tasks 
// // //        WHERE assigned_to_user_id = ? 
// // //          AND status_id = 2
// // //          AND is_deleted = 0`,
// // //       [volunteerId]
// // //     );
    
// // //     let availabilityUpdated = false;
// // //     if (activeTasks[0].count === 0) {
// // //       await connection.execute(
// // //         `UPDATE volunteer_profiles 
// // //          SET availability_status_id = 1,
// // //              availability_updated_at = NOW() 
// // //          WHERE user_id = ?`,
// // //         [volunteerId]
// // //       );
// // //       availabilityUpdated = true;
// // //       console.log(`🔄 Auto-set volunteer ${volunteerId} to available`);
// // //     }
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Task completed successfully! Thank you for your service!',
// // //       data: {
// // //         task_id: taskId,
// // //         status: 'completed',
// // //         status_id: 3,
// // //         completed_at: new Date().toISOString(),
// // //         availability_auto_updated: availabilityUpdated
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('❌ Error completing task:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to complete task',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // // =====================================================
// // // // VOLUNTEER REPORTS & ASSIGNMENTS
// // // // =====================================================

// // // // Get volunteer's assigned reports
// // // router.get('/:id/reports', verifyToken, async (req, res) => {
// // //   const volunteerId = Number(req.params.id);
  
// // //   if (!volunteerId) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid volunteer ID'
// // //     });
// // //   }
  
// // //   try {
// // //     if (req.user.role_id !== 3 && req.user.user_id !== volunteerId) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: You can only view your own reports'
// // //       });
// // //     }
    
// // //     const [reports] = await pool.execute(`
// // //       SELECT 
// // //         r.report_id,
// // //         r.description,
// // //         r.location_address,
// // //         r.user_note,
// // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// // //         at.type_name as animal_type,
// // //         ac.condition_name as animal_condition,
// // //         r.status_id,
// // //         u.username as reporter_name,
// // //         CAST(u.phone AS CHAR) AS reporter_phone,
// // //         u.email as reporter_email,
// // //         t.task_id,
// // //         t.status_id as task_status,
// // //         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at
// // //       FROM tasks t
// // //       INNER JOIN reports r ON t.report_id = r.report_id
// // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // //       LEFT JOIN users u ON r.user_id = u.user_id
// // //       WHERE t.assigned_to_user_id = ? 
// // //         AND t.is_deleted = 0
// // //         AND r.is_deleted = 0
// // //       ORDER BY t.assigned_at DESC
// // //     `, [volunteerId]);
    
// // //     res.json({
// // //       success: true,
// // //       data: reports,
// // //       count: reports.length
// // //     });
    
// // //   } catch (error) {
// // //     console.error('❌ Error fetching volunteer reports:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch volunteer reports',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // =====================================================
// // // // 🏆 VOLUNTEER BADGES & ACHIEVEMENTS
// // // // =====================================================

// // // /* =====================================================
// // //    GET VOLUNTEER BADGES - COMPLETE
// // // ===================================================== */
// // // router.get('/:id/badges', verifyToken, async (req, res) => {
// // //   try {
// // //     const userId = Number(req.params.id);
    
// // //     // Check permissions
// // //     if (req.user.user_id !== userId && req.user.role_id !== 3) {
// // //       return res.status(403).json({ 
// // //         success: false, 
// // //         message: 'Forbidden' 
// // //       });
// // //     }

// // //     // Get all badge definitions with award status
// // //     const [badges] = await pool.execute(`
// // //       SELECT 
// // //         bd.badge_id,
// // //         bd.badge_name,
// // //         bd.description,
// // //         CASE 
// // //           WHEN ba.award_id IS NOT NULL THEN 'unlocked'
// // //           ELSE 'locked'
// // //         END as status,
// // //         DATE_FORMAT(ba.awarded_at, '%Y-%m-%d') as awarded_at,
// // //         ba.task_id
// // //       FROM badge_definitions bd
// // //       LEFT JOIN badge_awards ba ON bd.badge_id = ba.badge_id AND ba.user_id = ?
// // //       ORDER BY 
// // //         CASE WHEN ba.award_id IS NOT NULL THEN 0 ELSE 1 END,
// // //         ba.awarded_at DESC,
// // //         bd.badge_id
// // //     `, [userId]);

// // //     // Get total completed tasks count
// // //     const [taskCount] = await pool.execute(`
// // //       SELECT COUNT(*) as total_tasks
// // //       FROM tasks 
// // //       WHERE assigned_to_user_id = ? AND status_id = 3 AND is_deleted = 0
// // //     `, [userId]);

// // //     // Get recently earned badges (last 3)
// // //     const [recent] = await pool.execute(`
// // //       SELECT 
// // //         bd.badge_name,
// // //         DATE_FORMAT(ba.awarded_at, '%Y-%m-%d') as awarded_at
// // //       FROM badge_awards ba
// // //       JOIN badge_definitions bd ON ba.badge_id = bd.badge_id
// // //       WHERE ba.user_id = ?
// // //       ORDER BY ba.awarded_at DESC
// // //       LIMIT 3
// // //     `, [userId]);

// // //     res.json({
// // //       success: true,
// // //       badges: badges,
// // //       total_tasks: taskCount[0]?.total_tasks || 0,
// // //       recent_badges: recent,
// // //       count: badges.filter(b => b.status === 'unlocked').length
// // //     });

// // //   } catch (err) {
// // //     console.error('❌ GET badges error:', err);
// // //     res.status(500).json({ 
// // //       success: false, 
// // //       message: 'Failed to fetch badges' 
// // //     });
// // //   }
// // // });

// // // /* =====================================================
// // //    GET VOLUNTEER BADGE STATS
// // // ===================================================== */
// // // router.get('/:id/badge-stats', verifyToken, async (req, res) => {
// // //   try {
// // //     const userId = Number(req.params.id);
    
// // //     if (req.user.user_id !== userId && req.user.role_id !== 3) {
// // //       return res.status(403).json({ success: false, message: 'Forbidden' });
// // //     }

// // //     // Get badge counts by type
// // //     const [stats] = await pool.execute(`
// // //       SELECT 
// // //         bd.badge_name,
// // //         COUNT(ba.award_id) as count
// // //       FROM badge_definitions bd
// // //       LEFT JOIN badge_awards ba ON bd.badge_id = ba.badge_id AND ba.user_id = ?
// // //       GROUP BY bd.badge_id, bd.badge_name
// // //       ORDER BY bd.badge_id
// // //     `, [userId]);

// // //     res.json({
// // //       success: true,
// // //       stats: stats
// // //     });

// // //   } catch (err) {
// // //     console.error('❌ GET badge stats error:', err);
// // //     res.status(500).json({ success: false, message: 'Failed to fetch badge stats' });
// // //   }
// // // });

// // // // =====================================================
// // // // ADMIN ASSIGNMENT & REASSIGNMENT ROUTES
// // // // =====================================================

// // // // Assign volunteer to report
// // // router.post('/assign', verifyToken, async (req, res) => {
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }

// // //     const { report_id, volunteer_id, status_id } = req.body;
    
// // //     if (!report_id || !volunteer_id) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Report ID and Volunteer ID are required'
// // //       });
// // //     }

// // //     await connection.beginTransaction();

// // //     console.log(`🤝 Assigning volunteer ${volunteer_id} to report ${report_id}`);
    
// // //     const [reportCheck] = await connection.execute(
// // //       'SELECT report_id, status_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// // //       [report_id]
// // //     );
    
// // //     if (reportCheck.length === 0) {
// // //       await connection.rollback();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Report not found'
// // //       });
// // //     }
    
// // //     const [volunteerCheck] = await connection.execute(`
// // //       SELECT u.user_id, u.username, u.email, u.phone 
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       WHERE u.user_id = ? 
// // //         AND u.role_id = 2 
// // //         AND u.is_deleted = 0
// // //         AND (vp.approval_status_id = 2 OR (vp.approval_status_id IS NULL AND u.user_id IN (2, 8)))
// // //     `, [volunteer_id]);
    
// // //     if (volunteerCheck.length === 0) {
// // //       await connection.rollback();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Volunteer not found, not approved, or is rejected'
// // //       });
// // //     }
    
// // //     const [existingTasks] = await connection.execute(
// // //       'SELECT task_id, assigned_to_user_id, status_id, is_deleted FROM tasks WHERE report_id = ?',
// // //       [report_id]
// // //     );
    
// // //     const taskStatus = status_id || 2;
    
// // //     if (existingTasks.length > 0) {
// // //       const existingTask = existingTasks[0];
      
// // //       if (existingTask.is_deleted === 1) {
// // //         console.log(`♻️ Reactivating soft-deleted task ${existingTask.task_id} for report ${report_id}`);
// // //         await connection.execute(
// // //           'UPDATE tasks SET assigned_to_user_id = ?, status_id = ?, assigned_at = NOW(), is_deleted = 0 WHERE task_id = ?',
// // //           [volunteer_id, taskStatus, existingTask.task_id]
// // //         );
// // //       } else {
// // //         console.log(`📝 Updating existing task ${existingTask.task_id} for report ${report_id}`);
// // //         await connection.execute(
// // //           'UPDATE tasks SET assigned_to_user_id = ?, status_id = ?, assigned_at = NOW() WHERE task_id = ?',
// // //           [volunteer_id, taskStatus, existingTask.task_id]
// // //         );
// // //       }
// // //     } else {
// // //       console.log(`📝 Creating new task for report ${report_id}...`);
// // //       await connection.execute(
// // //         `INSERT INTO tasks (report_id, assigned_to_user_id, assigned_by_user_id, status_id, assigned_at, is_deleted)
// // //          VALUES (?, ?, ?, ?, NOW(), 0)`,
// // //         [report_id, volunteer_id, req.user.user_id, taskStatus]
// // //       );
// // //     }
    
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = ? WHERE report_id = ?',
// // //       [taskStatus, report_id]
// // //     );

// // //     await connection.commit();
    
// // //     const volunteer = volunteerCheck[0];
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Volunteer assigned successfully',
// // //       data: {
// // //         report_id: report_id,
// // //         volunteer_id: volunteer.user_id,
// // //         volunteer_name: volunteer.username,
// // //         volunteer_email: volunteer.email,
// // //         volunteer_phone: volunteer.phone || '',
// // //         status_id: taskStatus,
// // //         timestamp: new Date().toISOString()
// // //       }
// // //     });

// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('❌ Error assigning volunteer:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to assign volunteer',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // // Unassign volunteer from report
// // // router.delete('/unassign/:report_id', verifyToken, async (req, res) => {
// // //   const connection = await pool.getConnection();
// // //   const reportId = Number(req.params.report_id);
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     if (!reportId) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Report ID is required'
// // //       });
// // //     }
    
// // //     await connection.beginTransaction();
    
// // //     console.log(`🗑️ Unassigning volunteer from report ${reportId}`);
    
// // //     const [reportCheck] = await connection.execute(
// // //       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// // //       [reportId]
// // //     );
    
// // //     if (reportCheck.length === 0) {
// // //       await connection.rollback();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Report not found'
// // //       });
// // //     }
    
// // //     const [taskCheck] = await connection.execute(
// // //       'SELECT task_id FROM tasks WHERE report_id = ? AND is_deleted = 0',
// // //       [reportId]
// // //     );
    
// // //     if (taskCheck.length === 0) {
// // //       await connection.rollback();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'No active task found for this report'
// // //       });
// // //     }
    
// // //     await connection.execute(
// // //       'UPDATE tasks SET is_deleted = 1, updated_at = NOW() WHERE report_id = ?',
// // //       [reportId]
// // //     );
    
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = 1 WHERE report_id = ?',
// // //       [reportId]
// // //     );
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Volunteer unassigned successfully',
// // //       data: {
// // //         report_id: reportId,
// // //         unassigned_at: new Date().toISOString()
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('❌ Error unassigning volunteer:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to unassign volunteer',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // // Force assign volunteer
// // // router.post('/force-assign', verifyToken, async (req, res) => {
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }

// // //     const { report_id, volunteer_id, status_id } = req.body;
    
// // //     if (!report_id || !volunteer_id) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Report ID and Volunteer ID are required'
// // //       });
// // //     }

// // //     await connection.beginTransaction();

// // //     console.log(`💪 Force assigning volunteer ${volunteer_id} to report ${report_id}`);
    
// // //     const [reportCheck] = await connection.execute(
// // //       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// // //       [report_id]
// // //     );
    
// // //     if (reportCheck.length === 0) {
// // //       await connection.rollback();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Report not found'
// // //       });
// // //     }
    
// // //     const [volunteerCheck] = await connection.execute(`
// // //       SELECT u.user_id, u.username, u.email, u.phone 
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       WHERE u.user_id = ? 
// // //         AND u.role_id = 2 
// // //         AND u.is_deleted = 0
// // //         AND (vp.approval_status_id = 2 OR (vp.approval_status_id IS NULL AND u.user_id IN (2, 8)))
// // //     `, [volunteer_id]);
    
// // //     if (volunteerCheck.length === 0) {
// // //       await connection.rollback();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Volunteer not found, not approved, or is rejected'
// // //       });
// // //     }
    
// // //     await connection.execute(
// // //       'DELETE FROM tasks WHERE report_id = ?',
// // //       [report_id]
// // //     );
    
// // //     const [result] = await connection.execute(
// // //       `INSERT INTO tasks (report_id, assigned_to_user_id, assigned_by_user_id, status_id, assigned_at, is_deleted)
// // //        VALUES (?, ?, ?, ?, NOW(), 0)`,
// // //       [report_id, volunteer_id, req.user.user_id, status_id || 2]
// // //     );
    
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = ? WHERE report_id = ?',
// // //       [status_id || 2, report_id]
// // //     );

// // //     await connection.commit();
    
// // //     const volunteer = volunteerCheck[0];
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Volunteer force-assigned successfully',
// // //       data: {
// // //         report_id: report_id,
// // //         volunteer_id: volunteer.user_id,
// // //         volunteer_name: volunteer.username,
// // //         volunteer_email: volunteer.email,
// // //         volunteer_phone: volunteer.phone || '',
// // //         status_id: status_id || 2,
// // //         task_id: result.insertId
// // //       }
// // //     });

// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('❌ Error force assigning volunteer:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to assign volunteer',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // // Get available volunteers for reassignment
// // // router.get('/available-for-reassignment/:reportId', verifyToken, async (req, res) => {
// // //   const reportId = Number(req.params.reportId);
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     const [volunteers] = await pool.execute(`
// // //       SELECT 
// // //         u.user_id,
// // //         u.username,
// // //         u.email,
// // //         COALESCE(CAST(u.phone AS CHAR), '') as phone,
// // //         vp.availability_status_id,
// // //         a.status_name as availability_status,
// // //         (
// // //           SELECT COUNT(*) 
// // //           FROM tasks t
// // //           WHERE t.assigned_to_user_id = u.user_id 
// // //           AND t.status_id = 2
// // //           AND t.is_deleted = 0
// // //         ) as active_tasks_count
// // //       FROM users u
// // //       INNER JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       INNER JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// // //       WHERE u.role_id = 2
// // //         AND u.is_deleted = 0
// // //         AND vp.approval_status_id = 2
// // //         AND vp.availability_status_id = 1
// // //         AND u.user_id NOT IN (
// // //           SELECT assigned_to_user_id 
// // //           FROM tasks 
// // //           WHERE report_id = ? AND is_deleted = 0
// // //         )
// // //       ORDER BY active_tasks_count ASC, u.username ASC
// // //     `, [reportId]);
    
// // //     res.json({
// // //       success: true,
// // //       data: volunteers,
// // //       count: volunteers.length,
// // //       report_id: reportId
// // //     });
    
// // //   } catch (error) {
// // //     console.error('❌ Error fetching available volunteers:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch available volunteers',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // Reassign task to another volunteer
// // // router.post('/reassign', verifyToken, async (req, res) => {
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }

// // //     const { task_id, new_volunteer_id, report_id } = req.body;
    
// // //     if ((!task_id && !report_id) || !new_volunteer_id) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Task ID or Report ID and New Volunteer ID are required'
// // //       });
// // //     }

// // //     await connection.beginTransaction();
    
// // //     let actualTaskId = task_id;
// // //     if (!actualTaskId && report_id) {
// // //       const [tasks] = await connection.execute(
// // //         'SELECT task_id, assigned_to_user_id FROM tasks WHERE report_id = ? AND is_deleted = 0 ORDER BY task_id DESC LIMIT 1',
// // //         [report_id]
// // //       );
// // //       if (tasks.length > 0) {
// // //         actualTaskId = tasks[0].task_id;
// // //       }
// // //     }
    
// // //     if (!actualTaskId) {
// // //       await connection.rollback();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'No active task found for reassignment'
// // //       });
// // //     }
    
// // //     const [oldTasks] = await connection.execute(
// // //       'SELECT * FROM tasks WHERE task_id = ?',
// // //       [actualTaskId]
// // //     );
    
// // //     if (oldTasks.length === 0) {
// // //       await connection.rollback();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Task not found'
// // //       });
// // //     }
    
// // //     const oldTask = oldTasks[0];
    
// // //     await connection.execute(
// // //       'UPDATE tasks SET is_deleted = 1, status_id = 4 WHERE task_id = ?',
// // //       [actualTaskId]
// // //     );
    
// // //     const [result] = await connection.execute(
// // //       `INSERT INTO tasks 
// // //        (report_id, assigned_to_user_id, assigned_by_user_id, status_id, assigned_at, is_deleted)
// // //        VALUES (?, ?, ?, 1, NOW(), 0)`,
// // //       [oldTask.report_id, new_volunteer_id, req.user.user_id]
// // //     );
    
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = 2 WHERE report_id = ?',
// // //       [oldTask.report_id]
// // //     );
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Task reassigned successfully',
// // //       data: {
// // //         old_task_id: actualTaskId,
// // //         new_task_id: result.insertId,
// // //         new_volunteer_id: new_volunteer_id,
// // //         reassigned_at: new Date().toISOString()
// // //       }
// // //     });

// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('❌ Error reassigning volunteer:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to reassign volunteer',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // // Get declined tasks for admin
// // // router.get('/declined-tasks', verifyToken, async (req, res) => {
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     const [tasks] = await pool.execute(`
// // //       SELECT 
// // //         t.task_id,
// // //         t.report_id,
// // //         t.assigned_to_user_id,
// // //         t.assigned_by_user_id,
// // //         t.status_id,
// // //         ts.status_name as task_status,
// // //         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
// // //         DATE_FORMAT(t.volunteer_responded_at, '%Y-%m-%d %H:%i:%s') as responded_at,
// // //         t.volunteer_response,
// // //         t.declined_reason,
// // //         vu.username as volunteer_name,
// // //         r.report_id,
// // //         r.description,
// // //         r.location_address,
// // //         at.type_name as animal_type,
// // //         ac.condition_name as animal_condition,
// // //         ru.username as reporter_name
// // //       FROM tasks t
// // //       INNER JOIN reports r ON t.report_id = r.report_id
// // //       LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
// // //       LEFT JOIN users vu ON t.assigned_to_user_id = vu.user_id
// // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // //       LEFT JOIN users ru ON r.user_id = ru.user_id
// // //       WHERE t.status_id = 4
// // //         AND t.is_deleted = 0
// // //         AND r.is_deleted = 0
// // //       ORDER BY t.volunteer_responded_at DESC
// // //     `);
    
// // //     res.json({
// // //       success: true,
// // //       data: tasks,
// // //       count: tasks.length
// // //     });
    
// // //   } catch (error) {
// // //     console.error('❌ Error fetching declined tasks:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch declined tasks',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // Get task status for a report
// // // router.get('/report/:report_id/task', verifyToken, async (req, res) => {
// // //   const reportId = Number(req.params.report_id);
  
// // //   if (!reportId) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Report ID is required'
// // //     });
// // //   }
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     const [tasks] = await pool.execute(`
// // //       SELECT 
// // //         t.task_id,
// // //         t.report_id,
// // //         t.assigned_to_user_id,
// // //         t.assigned_by_user_id,
// // //         t.status_id,
// // //         ts.status_name as task_status,
// // //         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
// // //         t.started_at,
// // //         t.completed_at,
// // //         t.is_deleted,
// // //         u.username as volunteer_name,
// // //         u.email as volunteer_email,
// // //         u2.username as assigned_by_name,
// // //         r.status_id as report_status
// // //       FROM tasks t
// // //       LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
// // //       LEFT JOIN users u ON t.assigned_to_user_id = u.user_id
// // //       LEFT JOIN users u2 ON t.assigned_by_user_id = u2.user_id
// // //       LEFT JOIN reports r ON t.report_id = r.report_id
// // //       WHERE t.report_id = ?
// // //       ORDER BY t.assigned_at DESC
// // //       LIMIT 1
// // //     `, [reportId]);
    
// // //     if (tasks.length === 0) {
// // //       return res.json({
// // //         success: true,
// // //         data: null,
// // //         message: 'No task found for this report'
// // //       });
// // //     }
    
// // //     res.json({
// // //       success: true,
// // //       data: tasks[0],
// // //       message: 'Task found'
// // //     });
    
// // //   } catch (error) {
// // //     console.error('❌ Error fetching task:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch task',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // =====================================================
// // // // ADMIN FIX UTILITIES
// // // // =====================================================

// // // // Fix inconsistent task status
// // // router.post('/fix-task/:task_id', verifyToken, async (req, res) => {
// // //   const connection = await pool.getConnection();
// // //   const taskId = Number(req.params.task_id);
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     if (!taskId) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Task ID is required'
// // //       });
// // //     }
    
// // //     await connection.beginTransaction();
    
// // //     const [tasks] = await connection.execute(
// // //       'SELECT * FROM tasks WHERE task_id = ?',
// // //       [taskId]
// // //     );
    
// // //     if (tasks.length === 0) {
// // //       await connection.rollback();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Task not found'
// // //       });
// // //     }
    
// // //     const task = tasks[0];
// // //     const fixes = [];
    
// // //     if (task.is_deleted === 1 && task.status_id === 2) {
// // //       await connection.execute(
// // //         'UPDATE tasks SET status_id = 1 WHERE task_id = ?',
// // //         [taskId]
// // //       );
// // //       fixes.push(`status ${task.status_id} → 1 (deleted)`);
// // //     }
    
// // //     if (task.completed_at && task.status_id !== 3) {
// // //       await connection.execute(
// // //         'UPDATE tasks SET status_id = 3 WHERE task_id = ?',
// // //         [taskId]
// // //       );
// // //       fixes.push(`status ${task.status_id} → 3 (completed)`);
// // //     }
    
// // //     if (fixes.length === 0) {
// // //       await connection.rollback();
// // //       return res.json({
// // //         success: true,
// // //         message: 'Task is already in consistent state',
// // //         data: task
// // //       });
// // //     }
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: `Task fixed: ${fixes.join(', ')}`,
// // //       data: {
// // //         task_id: taskId,
// // //         fixes: fixes
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('❌ Error fixing task:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fix task',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // // Fix report tasks
// // // router.post('/fix-report/:report_id', verifyToken, async (req, res) => {
// // //   const connection = await pool.getConnection();
// // //   const reportId = Number(req.params.report_id);
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     if (!reportId) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Report ID is required'
// // //       });
// // //     }
    
// // //     await connection.beginTransaction();
    
// // //     console.log(`🔧 Fixing report ${reportId} tasks...`);
    
// // //     const [tasks] = await connection.execute(
// // //       'SELECT * FROM tasks WHERE report_id = ? ORDER BY task_id DESC',
// // //       [reportId]
// // //     );
    
// // //     if (tasks.length === 0) {
// // //       await connection.rollback();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'No tasks found for this report'
// // //       });
// // //     }
    
// // //     const fixes = [];
    
// // //     for (const task of tasks) {
// // //       if (task.is_deleted === 1 && task.status_id >= 2) {
// // //         await connection.execute(
// // //           'UPDATE tasks SET status_id = 1 WHERE task_id = ?',
// // //           [task.task_id]
// // //         );
// // //         fixes.push({
// // //           task_id: task.task_id,
// // //           change: `status ${task.status_id} → 1 (deleted)`
// // //         });
// // //       }
      
// // //       if (task.completed_at && task.status_id !== 3) {
// // //         await connection.execute(
// // //           'UPDATE tasks SET status_id = 3 WHERE task_id = ?',
// // //           [task.task_id]
// // //         );
// // //         fixes.push({
// // //           task_id: task.task_id,
// // //           change: `status ${task.status_id} → 3 (completed)`
// // //         });
// // //       }
// // //     }
    
// // //     const latestTask = tasks[0];
// // //     let reportStatus = 1;
    
// // //     if (latestTask.is_deleted === 0) {
// // //       if (latestTask.status_id === 2) reportStatus = 3;
// // //       else if (latestTask.status_id === 3) reportStatus = 4;
// // //       else if (latestTask.status_id === 4) reportStatus = 1;
// // //       else reportStatus = latestTask.status_id;
// // //     }
    
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = ? WHERE report_id = ?',
// // //       [reportStatus, reportId]
// // //     );
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: `Fixed ${fixes.length} issues for report ${reportId}`,
// // //       fixes: fixes,
// // //       data: {
// // //         report_id: reportId,
// // //         report_status: reportStatus,
// // //         tasks_fixed: fixes.length
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('❌ Error fixing report:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fix report',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // module.exports = router;


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

// // // console.log('✅ Volunteer routes initialized');

// // // // =====================================================
// // // // ADMIN ROUTES - Volunteer Management
// // // // =====================================================

// // // // Get ALL volunteers (for admin assignment) - SHOW ONLY APPROVED VOLUNTEERS
// // // router.get('/available', verifyToken, async (req, res) => {
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }

// // //     console.log('👥 Fetching APPROVED volunteers for assignment...');
    
// // //     const [volunteers] = await pool.execute(`
// // //       SELECT 
// // //         u.user_id,
// // //         u.username,
// // //         u.email,
// // //         COALESCE(CAST(u.phone AS CHAR), '') as phone,
// // //         u.bio,
// // //         u.created_at,
// // //         u.role_id,
// // //         COALESCE(vp.joined_at, u.created_at) as joined_at,
// // //         COALESCE(vp.approval_status_id, 2) as approval_status_id,
// // //         CASE 
// // //           WHEN vp.approval_status_id = 1 THEN 'Pending'
// // //           WHEN vp.approval_status_id = 2 THEN 'Approved'
// // //           WHEN vp.approval_status_id = 3 THEN 'Rejected'
// // //           ELSE 'Approved'
// // //         END as approval_status,
// // //         COALESCE(vp.availability_status_id, 1) as availability_status_id,
// // //         a.status_name as availability_status,
// // //         (
// // //           SELECT COUNT(*) 
// // //           FROM tasks t
// // //           WHERE t.assigned_to_user_id = u.user_id 
// // //           AND t.status_id = 2
// // //           AND t.is_deleted = 0
// // //         ) as assigned_reports_count
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// // //       WHERE u.role_id = 2
// // //         AND u.is_deleted = 0
// // //         AND (vp.approval_status_id = 2 OR (vp.approval_status_id IS NULL AND u.user_id IN (2, 8)))
// // //       ORDER BY u.username ASC
// // //     `);

// // //     console.log(`✅ Found ${volunteers.length} APPROVED volunteers for assignment`);
    
// // //     res.json({
// // //       success: true,
// // //       data: volunteers,
// // //       count: volunteers.length
// // //     });

// // //   } catch (error) {
// // //     console.error('❌ Error fetching volunteers:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch volunteers',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // Get only APPROVED volunteers - Alternative endpoint
// // // router.get('/approved', verifyToken, async (req, res) => {
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }

// // //     console.log('👥 Fetching APPROVED volunteers only...');
    
// // //     const [volunteers] = await pool.execute(`
// // //       SELECT 
// // //         u.user_id,
// // //         u.username,
// // //         u.email,
// // //         COALESCE(CAST(u.phone AS CHAR), '') as phone,
// // //         u.bio,
// // //         u.created_at,
// // //         u.role_id,
// // //         COALESCE(vp.joined_at, u.created_at) as joined_at,
// // //         vp.approval_status_id,
// // //         'Approved' as approval_status,
// // //         COALESCE(vp.availability_status_id, 1) as availability_status_id,
// // //         a.status_name as availability_status,
// // //         (
// // //           SELECT COUNT(*) 
// // //           FROM tasks t
// // //           WHERE t.assigned_to_user_id = u.user_id 
// // //           AND t.status_id = 2
// // //           AND t.is_deleted = 0
// // //         ) as assigned_reports_count
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// // //       WHERE u.role_id = 2
// // //         AND u.is_deleted = 0
// // //         AND vp.approval_status_id = 2
// // //       ORDER BY u.username ASC
// // //     `);

// // //     console.log(`✅ Found ${volunteers.length} APPROVED volunteers`);
    
// // //     res.json({
// // //       success: true,
// // //       data: volunteers,
// // //       count: volunteers.length
// // //     });

// // //   } catch (error) {
// // //     console.error('❌ Error fetching approved volunteers:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch approved volunteers',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // Get all volunteers with detailed info (for admin management)
// // // router.get('/admin/all', verifyToken, async (req, res) => {
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }

// // //     console.log('👥 Fetching ALL volunteers for admin...');
    
// // //     const [volunteers] = await pool.execute(`
// // //       SELECT 
// // //         u.user_id,
// // //         u.username,
// // //         u.email,
// // //         COALESCE(CAST(u.phone AS CHAR), '') as phone,
// // //         u.bio,
// // //         u.profile_image_url,
// // //         u.created_at,
// // //         u.role_id,
// // //         COALESCE(vp.joined_at, u.created_at) as joined_at,
// // //         COALESCE(vp.approval_status_id, 2) as approval_status_id,
// // //         CASE 
// // //           WHEN vp.approval_status_id = 1 THEN 'Pending'
// // //           WHEN vp.approval_status_id = 2 THEN 'Approved'
// // //           WHEN vp.approval_status_id = 3 THEN 'Rejected'
// // //           ELSE 'Approved'
// // //         END as approval_status,
// // //         COALESCE(vp.availability_status_id, 1) as availability_status_id,
// // //         a.status_name as availability_status,
// // //         vp.badges,
// // //         (
// // //           SELECT COUNT(*) 
// // //           FROM tasks t
// // //           WHERE t.assigned_to_user_id = u.user_id 
// // //           AND t.is_deleted = 0
// // //         ) as total_assigned_reports,
// // //         (
// // //           SELECT COUNT(*) 
// // //           FROM tasks t
// // //           INNER JOIN reports r ON t.report_id = r.report_id
// // //           WHERE t.assigned_to_user_id = u.user_id 
// // //           AND r.status_id = 4
// // //           AND t.is_deleted = 0
// // //           AND r.is_deleted = 0
// // //         ) as completed_reports,
// // //         (
// // //           SELECT COUNT(*) 
// // //           FROM tasks t
// // //           WHERE t.assigned_to_user_id = u.user_id 
// // //           AND t.status_id = 2
// // //           AND t.is_deleted = 0
// // //         ) as active_reports
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// // //       WHERE u.role_id = 2
// // //         AND u.is_deleted = 0
// // //       ORDER BY 
// // //         CASE WHEN COALESCE(vp.approval_status_id, 2) = 2 THEN 1 ELSE 2 END,
// // //         u.username ASC
// // //     `);

// // //     console.log(`✅ Found ${volunteers.length} volunteers for admin`);
    
// // //     res.json({
// // //       success: true,
// // //       data: volunteers,
// // //       count: volunteers.length
// // //     });

// // //   } catch (error) {
// // //     console.error('❌ Error fetching all volunteers:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch volunteers',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // Update volunteer approval status
// // // router.patch('/:id/approval', verifyToken, async (req, res) => {
// // //   const volunteerId = Number(req.params.id);
// // //   const { approval_status_id } = req.body;
  
// // //   if (!volunteerId) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid volunteer ID'
// // //     });
// // //   }
  
// // //   if (!approval_status_id || (approval_status_id < 1 || approval_status_id > 3)) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid approval status ID. Must be 1 (Pending), 2 (Approved), or 3 (Rejected)'
// // //     });
// // //   }
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     const [volunteerCheck] = await pool.execute(
// // //       'SELECT user_id FROM users WHERE user_id = ? AND role_id = 2 AND is_deleted = 0',
// // //       [volunteerId]
// // //     );
    
// // //     if (volunteerCheck.length === 0) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Volunteer not found'
// // //       });
// // //     }
    
// // //     const [profileCheck] = await pool.execute(
// // //       'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
// // //       [volunteerId]
// // //     );
    
// // //     if (profileCheck.length === 0) {
// // //       await pool.execute(
// // //         `INSERT INTO volunteer_profiles (user_id, approval_status_id, availability_status_id, joined_at)
// // //          VALUES (?, ?, 1, NOW())`,
// // //         [volunteerId, approval_status_id]
// // //       );
// // //     } else {
// // //       await pool.execute(
// // //         'UPDATE volunteer_profiles SET approval_status_id = ? WHERE user_id = ?',
// // //         [approval_status_id, volunteerId]
// // //       );
// // //     }
    
// // //     const [updatedVolunteer] = await pool.execute(`
// // //       SELECT 
// // //         u.user_id,
// // //         u.username,
// // //         u.email,
// // //         COALESCE(CAST(u.phone AS CHAR), '') as phone,
// // //         COALESCE(vp.approval_status_id, 2) as approval_status_id,
// // //         CASE 
// // //           WHEN vp.approval_status_id = 1 THEN 'Pending'
// // //           WHEN vp.approval_status_id = 2 THEN 'Approved'
// // //           WHEN vp.approval_status_id = 3 THEN 'Rejected'
// // //           ELSE 'Approved'
// // //         END as approval_status
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       WHERE u.user_id = ?
// // //     `, [volunteerId]);
    
// // //     res.json({
// // //       success: true,
// // //       message: `Volunteer approval status updated to ${updatedVolunteer[0].approval_status}`,
// // //       data: updatedVolunteer[0]
// // //     });
    
// // //   } catch (error) {
// // //     console.error('❌ Error updating volunteer approval:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to update volunteer approval status',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // =====================================================
// // // // VOLUNTEER AVAILABILITY STATUSES
// // // // =====================================================

// // // // Get all availability statuses for dropdowns
// // // router.get('/availability-statuses', verifyToken, async (req, res) => {
// // //   try {
// // //     const [statuses] = await pool.execute(`
// // //       SELECT 
// // //         status_id, 
// // //         status_name
// // //       FROM availability_statuses 
// // //       ORDER BY status_id
// // //     `);
    
// // //     res.json({
// // //       success: true,
// // //       data: statuses
// // //     });
    
// // //   } catch (error) {
// // //     console.error('❌ Error fetching availability statuses:', error);
// // //     const fallbackStatuses = [
// // //       { status_id: 1, status_name: 'available' },
// // //       { status_id: 2, status_name: 'unavailable' }
// // //     ];
// // //     res.json({
// // //       success: true,
// // //       data: fallbackStatuses,
// // //       message: 'Using fallback data'
// // //     });
// // //   }
// // // });

// // // // Get volunteer's own availability
// // // router.get('/availability', verifyToken, async (req, res) => {
// // //   const volunteerId = req.user.user_id;
  
// // //   try {
// // //     if (req.user.role_id !== 2) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Volunteer access required'
// // //       });
// // //     }
    
// // //     const [profiles] = await pool.execute(`
// // //       SELECT 
// // //         u.user_id,
// // //         u.username,
// // //         COALESCE(vp.availability_status_id, 1) as availability_status_id,
// // //         a.status_name as availability_status,
// // //         DATE_FORMAT(vp.availability_updated_at, '%Y-%m-%d %H:%i:%s') as availability_updated_at,
// // //         COALESCE(vp.approval_status_id, 2) as approval_status_id,
// // //         (
// // //           SELECT COUNT(*) 
// // //           FROM tasks t
// // //           WHERE t.assigned_to_user_id = u.user_id 
// // //           AND t.status_id = 2
// // //           AND t.is_deleted = 0
// // //         ) as active_tasks_count
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// // //       WHERE u.user_id = ? AND u.role_id = 2
// // //     `, [volunteerId]);
    
// // //     if (profiles.length === 0) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Volunteer profile not found'
// // //       });
// // //     }
    
// // //     res.json({
// // //       success: true,
// // //       data: profiles[0]
// // //     });
    
// // //   } catch (error) {
// // //     console.error('❌ Error fetching volunteer availability:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch availability',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // Update volunteer's own availability (SELF-SERVICE)
// // // router.patch('/availability', verifyToken, async (req, res) => {
// // //   const volunteerId = req.user.user_id;
// // //   const { availability_status_id } = req.body;
  
// // //   if (!availability_status_id || (availability_status_id < 1 || availability_status_id > 2)) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid availability status ID. Must be 1 (available) or 2 (unavailable)'
// // //     });
// // //   }
  
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     await connection.beginTransaction();
    
// // //     if (req.user.role_id !== 2) {
// // //       await connection.rollback();
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Volunteer access required'
// // //       });
// // //     }
    
// // //     const [profileCheck] = await connection.execute(
// // //       'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
// // //       [volunteerId]
// // //     );
    
// // //     if (profileCheck.length === 0) {
// // //       await connection.execute(
// // //         `INSERT INTO volunteer_profiles 
// // //          (user_id, approval_status_id, availability_status_id, availability_updated_at, joined_at)
// // //          VALUES (?, 2, ?, NOW(), NOW())`,
// // //         [volunteerId, availability_status_id]
// // //       );
// // //     } else {
// // //       await connection.execute(
// // //         `UPDATE volunteer_profiles 
// // //          SET availability_status_id = ?, 
// // //              availability_updated_at = NOW() 
// // //          WHERE user_id = ?`,
// // //         [availability_status_id, volunteerId]
// // //       );
// // //     }
    
// // //     await connection.commit();
    
// // //     const [statuses] = await pool.execute(
// // //       'SELECT status_name FROM availability_statuses WHERE status_id = ?',
// // //       [availability_status_id]
// // //     );
    
// // //     const statusName = statuses[0]?.status_name || (availability_status_id === 1 ? 'available' : 'unavailable');
    
// // //     res.json({
// // //       success: true,
// // //       message: `Availability updated to ${statusName}`,
// // //       data: {
// // //         user_id: volunteerId,
// // //         availability_status_id: availability_status_id,
// // //         availability_status: statusName,
// // //         updated_at: new Date().toISOString()
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('❌ Error updating volunteer availability:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to update availability',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // // Update volunteer availability status (Admin or Self)
// // // router.patch('/:id/availability', verifyToken, async (req, res) => {
// // //   const volunteerId = Number(req.params.id);
// // //   const { availability_status_id } = req.body;
  
// // //   if (!volunteerId) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid volunteer ID'
// // //     });
// // //   }
  
// // //   if (!availability_status_id || (availability_status_id < 1 || availability_status_id > 2)) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid availability status ID. Must be 1 (available) or 2 (unavailable)'
// // //     });
// // //   }
  
// // //   try {
// // //     if (req.user.role_id !== 3 && req.user.user_id !== volunteerId) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: You can only update your own availability'
// // //       });
// // //     }
    
// // //     const [volunteerCheck] = await pool.execute(
// // //       'SELECT user_id FROM users WHERE user_id = ? AND role_id = 2 AND is_deleted = 0',
// // //       [volunteerId]
// // //     );
    
// // //     if (volunteerCheck.length === 0) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Volunteer not found'
// // //       });
// // //     }
    
// // //     const [profileCheck] = await pool.execute(
// // //       'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
// // //       [volunteerId]
// // //     );
    
// // //     if (profileCheck.length === 0) {
// // //       await pool.execute(
// // //         `INSERT INTO volunteer_profiles (user_id, approval_status_id, availability_status_id, joined_at)
// // //          VALUES (?, 2, ?, NOW())`,
// // //         [volunteerId, availability_status_id]
// // //       );
// // //     } else {
// // //       await pool.execute(
// // //         'UPDATE volunteer_profiles SET availability_status_id = ?, availability_updated_at = NOW() WHERE user_id = ?',
// // //         [availability_status_id, volunteerId]
// // //       );
// // //     }
    
// // //     const [statuses] = await pool.execute(
// // //       'SELECT status_name FROM availability_statuses WHERE status_id = ?',
// // //       [availability_status_id]
// // //     );
    
// // //     const statusName = statuses[0]?.status_name || (availability_status_id === 1 ? 'available' : 'unavailable');
    
// // //     const [updatedVolunteer] = await pool.execute(`
// // //       SELECT 
// // //         u.user_id,
// // //         u.username,
// // //         COALESCE(vp.availability_status_id, 1) as availability_status_id,
// // //         a.status_name as availability_status
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// // //       WHERE u.user_id = ?
// // //     `, [volunteerId]);
    
// // //     res.json({
// // //       success: true,
// // //       message: `Volunteer availability updated to ${statusName}`,
// // //       data: updatedVolunteer[0]
// // //     });
    
// // //   } catch (error) {
// // //     console.error('❌ Error updating volunteer availability:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to update volunteer availability',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // =====================================================
// // // // VOLUNTEER TASK MANAGEMENT
// // // // =====================================================

// // // // Get all tasks for current volunteer
// // // router.get('/tasks', verifyToken, async (req, res) => {
// // //   const volunteerId = req.user.user_id;
  
// // //   try {
// // //     if (req.user.role_id !== 2) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Volunteer access required'
// // //       });
// // //     }
    
// // //     console.log(`📋 Fetching tasks for volunteer: ${volunteerId}`);
    
// // //     const [tasks] = await pool.execute(`
// // //       SELECT 
// // //         t.task_id,
// // //         t.report_id,
// // //         t.assigned_to_user_id,
// // //         t.assigned_by_user_id,
// // //         t.status_id as task_status_id,
// // //         ts.status_name as task_status,
// // //         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
// // //         DATE_FORMAT(t.volunteer_responded_at, '%Y-%m-%d %H:%i:%s') as responded_at,
// // //         t.volunteer_response,
// // //         t.declined_reason,
// // //         DATE_FORMAT(t.started_at, '%Y-%m-%d %H:%i:%s') as started_at,
// // //         DATE_FORMAT(t.completed_at, '%Y-%m-%d %H:%i:%s') as completed_at,
// // //         r.report_id,
// // //         r.description,
// // //         r.location_address,
// // //         r.user_note,
// // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as report_submitted_at,
// // //         at.type_name as animal_type,
// // //         ac.condition_name as animal_condition,
// // //         r.status_id as report_status_id,
// // //         rs.status_name as report_status,
// // //         u.username as reporter_name,
// // //         CAST(u.phone AS CHAR) AS reporter_phone,
// // //         u.email as reporter_email,
// // //         au.username as assigned_by_name
// // //       FROM tasks t
// // //       INNER JOIN reports r ON t.report_id = r.report_id
// // //       LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
// // //       LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
// // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // //       LEFT JOIN users u ON r.user_id = u.user_id
// // //       LEFT JOIN users au ON t.assigned_by_user_id = au.user_id
// // //       WHERE t.assigned_to_user_id = ? 
// // //         AND t.is_deleted = 0
// // //         AND r.is_deleted = 0
// // //       ORDER BY 
// // //         CASE 
// // //           WHEN t.status_id = 1 THEN 1
// // //           WHEN t.status_id = 2 THEN 2
// // //           WHEN t.status_id = 4 THEN 3
// // //           WHEN t.status_id = 3 THEN 4
// // //         END,
// // //         t.assigned_at DESC
// // //     `, [volunteerId]);
    
// // //     const groupedTasks = {
// // //       assigned: tasks.filter(t => t.task_status_id === 1),
// // //       inProgress: tasks.filter(t => t.task_status_id === 2),
// // //       completed: tasks.filter(t => t.task_status_id === 3),
// // //       declined: tasks.filter(t => t.task_status_id === 4)
// // //     };
    
// // //     res.json({
// // //       success: true,
// // //       data: tasks,
// // //       grouped: groupedTasks,
// // //       counts: {
// // //         total: tasks.length,
// // //         assigned: groupedTasks.assigned.length,
// // //         inProgress: groupedTasks.inProgress.length,
// // //         completed: groupedTasks.completed.length,
// // //         declined: groupedTasks.declined.length
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     console.error('❌ Error fetching volunteer tasks:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch tasks',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // Get single task details
// // // router.get('/tasks/:taskId', verifyToken, async (req, res) => {
// // //   const taskId = Number(req.params.taskId);
// // //   const volunteerId = req.user.user_id;
  
// // //   if (!taskId) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid task ID'
// // //     });
// // //   }
  
// // //   try {
// // //     if (req.user.role_id !== 2) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Volunteer access required'
// // //       });
// // //     }
    
// // //     const [tasks] = await pool.execute(`
// // //       SELECT 
// // //         t.*,
// // //         ts.status_name as task_status,
// // //         r.*,
// // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as report_submitted_at,
// // //         at.type_name as animal_type,
// // //         ac.condition_name as animal_condition,
// // //         rs.status_name as report_status,
// // //         u.username as reporter_name,
// // //         CAST(u.phone AS CHAR) AS reporter_phone,
// // //         u.email as reporter_email,
// // //         au.username as assigned_by_name
// // //       FROM tasks t
// // //       INNER JOIN reports r ON t.report_id = r.report_id
// // //       LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
// // //       LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
// // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // //       LEFT JOIN users u ON r.user_id = u.user_id
// // //       LEFT JOIN users au ON t.assigned_by_user_id = au.user_id
// // //       WHERE t.task_id = ? 
// // //         AND t.assigned_to_user_id = ?
// // //         AND t.is_deleted = 0
// // //         AND r.is_deleted = 0
// // //     `, [taskId, volunteerId]);
    
// // //     if (tasks.length === 0) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Task not found or not assigned to you'
// // //       });
// // //     }
    
// // //     res.json({
// // //       success: true,
// // //       data: tasks[0]
// // //     });
    
// // //   } catch (error) {
// // //     console.error('❌ Error fetching task:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch task',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // Accept a task (auto-sets to in_progress and updates availability)
// // // router.patch('/tasks/:taskId/accept', verifyToken, async (req, res) => {
// // //   const taskId = Number(req.params.taskId);
// // //   const volunteerId = req.user.user_id;
  
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     await connection.beginTransaction();
    
// // //     if (req.user.role_id !== 2) {
// // //       await connection.rollback();
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Volunteer access required'
// // //       });
// // //     }
    
// // //     const [tasks] = await connection.execute(
// // //       `SELECT t.task_id, t.report_id, t.status_id, r.status_id as report_status_id
// // //        FROM tasks t
// // //        INNER JOIN reports r ON t.report_id = r.report_id
// // //        WHERE t.task_id = ? AND t.assigned_to_user_id = ? AND t.is_deleted = 0`,
// // //       [taskId, volunteerId]
// // //     );
    
// // //     if (tasks.length === 0) {
// // //       await connection.rollback();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Task not found or not assigned to you'
// // //       });
// // //     }
    
// // //     const task = tasks[0];
    
// // //     if (task.status_id !== 1) {
// // //       await connection.rollback();
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'This task cannot be accepted'
// // //       });
// // //     }
    
// // //     // Update task to in_progress (status_id = 2)
// // //     await connection.execute(
// // //       `UPDATE tasks 
// // //        SET status_id = 2, 
// // //            volunteer_responded_at = NOW(), 
// // //            volunteer_response = 'accepted',
// // //            started_at = NOW()
// // //        WHERE task_id = ?`,
// // //       [taskId]
// // //     );
    
// // //     // Update report status to in_progress (status_id = 3)
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = 3 WHERE report_id = ?',
// // //       [task.report_id]
// // //     );
    
// // //     // AUTO-UPDATE AVAILABILITY - Check if this is their first active task
// // //     const [activeTasks] = await connection.execute(
// // //       `SELECT COUNT(*) as count 
// // //        FROM tasks 
// // //        WHERE assigned_to_user_id = ? 
// // //          AND status_id = 2
// // //          AND is_deleted = 0`,
// // //       [volunteerId]
// // //     );
    
// // //     let availabilityUpdated = false;
// // //     if (activeTasks[0].count === 1) {
// // //       await connection.execute(
// // //         `UPDATE volunteer_profiles 
// // //          SET availability_status_id = 2,
// // //              availability_updated_at = NOW() 
// // //          WHERE user_id = ?`,
// // //         [volunteerId]
// // //       );
// // //       availabilityUpdated = true;
// // //       console.log(`🔄 Auto-set volunteer ${volunteerId} to unavailable`);
// // //     }
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Task accepted successfully',
// // //       data: {
// // //         task_id: taskId,
// // //         status: 'in_progress',
// // //         status_id: 2,
// // //         accepted_at: new Date().toISOString(),
// // //         availability_auto_updated: availabilityUpdated
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('❌ Error accepting task:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to accept task',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // // Decline a task
// // // router.patch('/tasks/:taskId/decline', verifyToken, async (req, res) => {
// // //   const taskId = Number(req.params.taskId);
// // //   const volunteerId = req.user.user_id;
// // //   const { reason } = req.body;
  
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     await connection.beginTransaction();
    
// // //     if (req.user.role_id !== 2) {
// // //       await connection.rollback();
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Volunteer access required'
// // //       });
// // //     }
    
// // //     const [tasks] = await connection.execute(
// // //       `SELECT t.task_id, t.report_id, t.status_id
// // //        FROM tasks t
// // //        WHERE t.task_id = ? AND t.assigned_to_user_id = ? AND t.is_deleted = 0`,
// // //       [taskId, volunteerId]
// // //     );
    
// // //     if (tasks.length === 0) {
// // //       await connection.rollback();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Task not found or not assigned to you'
// // //       });
// // //     }
    
// // //     const task = tasks[0];
    
// // //     if (task.status_id !== 1) {
// // //       await connection.rollback();
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'This task cannot be declined'
// // //       });
// // //     }
    
// // //     // Update task to declined (status_id = 4)
// // //     await connection.execute(
// // //       `UPDATE tasks 
// // //        SET status_id = 4, 
// // //            volunteer_responded_at = NOW(), 
// // //            volunteer_response = 'declined',
// // //            declined_reason = ?
// // //        WHERE task_id = ?`,
// // //       [reason || 'No reason provided', taskId]
// // //     );
    
// // //     // Update report status back to submitted (status_id = 1)
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = 1 WHERE report_id = ?',
// // //       [task.report_id]
// // //     );
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Task declined successfully',
// // //       data: {
// // //         task_id: taskId,
// // //         status: 'declined',
// // //         status_id: 4,
// // //         declined_at: new Date().toISOString(),
// // //         reason: reason || 'No reason provided'
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('❌ Error declining task:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to decline task',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // // Complete a task
// // // router.patch('/tasks/:taskId/complete', verifyToken, async (req, res) => {
// // //   const taskId = Number(req.params.taskId);
// // //   const volunteerId = req.user.user_id;
  
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     await connection.beginTransaction();
    
// // //     if (req.user.role_id !== 2) {
// // //       await connection.rollback();
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Volunteer access required'
// // //       });
// // //     }
    
// // //     const [tasks] = await connection.execute(
// // //       `SELECT t.task_id, t.report_id, t.status_id
// // //        FROM tasks t
// // //        WHERE t.task_id = ? AND t.assigned_to_user_id = ? AND t.is_deleted = 0`,
// // //       [taskId, volunteerId]
// // //     );
    
// // //     if (tasks.length === 0) {
// // //       await connection.rollback();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Task not found or not assigned to you'
// // //       });
// // //     }
    
// // //     const task = tasks[0];
    
// // //     if (task.status_id !== 2) {
// // //       await connection.rollback();
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Task must be in progress before completing'
// // //       });
// // //     }
    
// // //     // Update task to completed (status_id = 3)
// // //     await connection.execute(
// // //       `UPDATE tasks 
// // //        SET status_id = 3, 
// // //            completed_at = NOW() 
// // //        WHERE task_id = ?`,
// // //       [taskId]
// // //     );
    
// // //     // Update report status to completed (status_id = 4)
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = 4 WHERE report_id = ?',
// // //       [task.report_id]
// // //     );
    
// // //     // AUTO-UPDATE AVAILABILITY - Check if they have any other active tasks
// // //     const [activeTasks] = await connection.execute(
// // //       `SELECT COUNT(*) as count 
// // //        FROM tasks 
// // //        WHERE assigned_to_user_id = ? 
// // //          AND status_id = 2
// // //          AND is_deleted = 0`,
// // //       [volunteerId]
// // //     );
    
// // //     let availabilityUpdated = false;
// // //     if (activeTasks[0].count === 0) {
// // //       await connection.execute(
// // //         `UPDATE volunteer_profiles 
// // //          SET availability_status_id = 1,
// // //              availability_updated_at = NOW() 
// // //          WHERE user_id = ?`,
// // //         [volunteerId]
// // //       );
// // //       availabilityUpdated = true;
// // //       console.log(`🔄 Auto-set volunteer ${volunteerId} to available`);
// // //     }
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Task completed successfully! Thank you for your service!',
// // //       data: {
// // //         task_id: taskId,
// // //         status: 'completed',
// // //         status_id: 3,
// // //         completed_at: new Date().toISOString(),
// // //         availability_auto_updated: availabilityUpdated
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('❌ Error completing task:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to complete task',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // // =====================================================
// // // // ✅ VOLUNTEER ACTIVE MISSION - MUST BE BEFORE /:id/reports
// // // // =====================================================
// // // router.get('/:id/active-mission', verifyToken, async (req, res) => {
// // //   const volunteerId = Number(req.params.id);
  
// // //   if (!volunteerId) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid volunteer ID'
// // //     });
// // //   }
  
// // //   try {
// // //     // Check permissions - admin or self
// // //     if (req.user.role_id !== 3 && req.user.user_id !== volunteerId) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: You can only view your own missions'
// // //       });
// // //     }

// // //     console.log(`🎯 Fetching ACTIVE mission for volunteer ${volunteerId}...`);
    
// // //     // Get ONLY the IN PROGRESS task (status_id = 2) for this volunteer
// // //     const [missions] = await pool.execute(`
// // //       SELECT 
// // //         t.task_id,
// // //         t.report_id,
// // //         t.assigned_to_user_id as volunteer_id,
// // //         t.status_id as task_status_id,
// // //         ts.status_name as task_status,
// // //         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
// // //         DATE_FORMAT(t.started_at, '%Y-%m-%d %H:%i:%s') as started_at,
// // //         DATE_FORMAT(t.completed_at, '%Y-%m-%d %H:%i:%s') as completed_at,
// // //         r.report_id,
// // //         r.user_id,
// // //         r.description,
// // //         r.location_address,
// // //         r.user_note,
// // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// // //         at.type_name as animal_type,
// // //         ac.condition_name as animal_condition,
// // //         r.status_id as report_status_id,
// // //         rs.status_name as report_status,
// // //         u.username as reporter_name,
// // //         CAST(COALESCE(u.phone, '') AS CHAR) AS reporter_phone,
// // //         u.email as reporter_email,
// // //         v.username as volunteer_name,
// // //         v.email as volunteer_email,
// // //         CAST(v.phone AS CHAR) AS volunteer_phone
// // //       FROM tasks t
// // //       INNER JOIN reports r ON t.report_id = r.report_id
// // //       LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
// // //       LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
// // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // //       LEFT JOIN users u ON r.user_id = u.user_id
// // //       LEFT JOIN users v ON t.assigned_to_user_id = v.user_id
// // //       WHERE t.assigned_to_user_id = ? 
// // //         AND t.status_id = 2  -- ✅ ONLY IN PROGRESS TASKS
// // //         AND t.is_deleted = 0
// // //         AND r.is_deleted = 0
// // //       ORDER BY t.assigned_at DESC
// // //       LIMIT 1  -- ✅ ONLY ONE MISSION
// // //     `, [volunteerId]);
    
// // //     if (missions.length === 0) {
// // //       return res.json({
// // //         success: true,
// // //         data: null,
// // //         message: 'No active mission found'
// // //       });
// // //     }
    
// // //     console.log(`✅ Found active mission for volunteer ${volunteerId}: Report #${missions[0].report_id}, Task #${missions[0].task_id}`);
    
// // //     res.json({
// // //       success: true,
// // //       data: missions[0]
// // //     });
    
// // //   } catch (error) {
// // //     console.error('❌ Error fetching volunteer active mission:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch active mission',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // =====================================================
// // // // VOLUNTEER REPORTS & ASSIGNMENTS
// // // // =====================================================

// // // // Get volunteer's assigned reports - PUT THIS AFTER active-mission
// // // router.get('/:id/reports', verifyToken, async (req, res) => {
// // //   const volunteerId = Number(req.params.id);
  
// // //   if (!volunteerId) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid volunteer ID'
// // //     });
// // //   }
  
// // //   try {
// // //     if (req.user.role_id !== 3 && req.user.user_id !== volunteerId) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: You can only view your own reports'
// // //       });
// // //     }
    
// // //     const [reports] = await pool.execute(`
// // //       SELECT 
// // //         r.report_id,
// // //         r.description,
// // //         r.location_address,
// // //         r.user_note,
// // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// // //         at.type_name as animal_type,
// // //         ac.condition_name as animal_condition,
// // //         r.status_id,
// // //         u.username as reporter_name,
// // //         CAST(u.phone AS CHAR) AS reporter_phone,
// // //         u.email as reporter_email,
// // //         t.task_id,
// // //         t.status_id as task_status,
// // //         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at
// // //       FROM tasks t
// // //       INNER JOIN reports r ON t.report_id = r.report_id
// // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // //       LEFT JOIN users u ON r.user_id = u.user_id
// // //       WHERE t.assigned_to_user_id = ? 
// // //         AND t.is_deleted = 0
// // //         AND r.is_deleted = 0
// // //       ORDER BY t.assigned_at DESC
// // //     `, [volunteerId]);
    
// // //     res.json({
// // //       success: true,
// // //       data: reports,
// // //       count: reports.length
// // //     });
    
// // //   } catch (error) {
// // //     console.error('❌ Error fetching volunteer reports:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch volunteer reports',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // =====================================================
// // // // 🏆 VOLUNTEER BADGES & ACHIEVEMENTS
// // // // =====================================================

// // // router.get('/:id/badges', verifyToken, async (req, res) => {
// // //   try {
// // //     const userId = Number(req.params.id);
    
// // //     if (req.user.user_id !== userId && req.user.role_id !== 3) {
// // //       return res.status(403).json({ 
// // //         success: false, 
// // //         message: 'Forbidden' 
// // //       });
// // //     }

// // //     const [badges] = await pool.execute(`
// // //       SELECT 
// // //         bd.badge_id,
// // //         bd.badge_name,
// // //         bd.description,
// // //         CASE 
// // //           WHEN ba.award_id IS NOT NULL THEN 'unlocked'
// // //           ELSE 'locked'
// // //         END as status,
// // //         DATE_FORMAT(ba.awarded_at, '%Y-%m-%d') as awarded_at,
// // //         ba.task_id
// // //       FROM badge_definitions bd
// // //       LEFT JOIN badge_awards ba ON bd.badge_id = ba.badge_id AND ba.user_id = ?
// // //       ORDER BY 
// // //         CASE WHEN ba.award_id IS NOT NULL THEN 0 ELSE 1 END,
// // //         ba.awarded_at DESC,
// // //         bd.badge_id
// // //     `, [userId]);

// // //     const [taskCount] = await pool.execute(`
// // //       SELECT COUNT(*) as total_tasks
// // //       FROM tasks 
// // //       WHERE assigned_to_user_id = ? AND status_id = 3 AND is_deleted = 0
// // //     `, [userId]);

// // //     const [recent] = await pool.execute(`
// // //       SELECT 
// // //         bd.badge_name,
// // //         DATE_FORMAT(ba.awarded_at, '%Y-%m-%d') as awarded_at
// // //       FROM badge_awards ba
// // //       JOIN badge_definitions bd ON ba.badge_id = bd.badge_id
// // //       WHERE ba.user_id = ?
// // //       ORDER BY ba.awarded_at DESC
// // //       LIMIT 3
// // //     `, [userId]);

// // //     res.json({
// // //       success: true,
// // //       badges: badges,
// // //       total_tasks: taskCount[0]?.total_tasks || 0,
// // //       recent_badges: recent,
// // //       count: badges.filter(b => b.status === 'unlocked').length
// // //     });

// // //   } catch (err) {
// // //     console.error('❌ GET badges error:', err);
// // //     res.status(500).json({ 
// // //       success: false, 
// // //       message: 'Failed to fetch badges' 
// // //     });
// // //   }
// // // });

// // // router.get('/:id/badge-stats', verifyToken, async (req, res) => {
// // //   try {
// // //     const userId = Number(req.params.id);
    
// // //     if (req.user.user_id !== userId && req.user.role_id !== 3) {
// // //       return res.status(403).json({ success: false, message: 'Forbidden' });
// // //     }

// // //     const [stats] = await pool.execute(`
// // //       SELECT 
// // //         bd.badge_name,
// // //         COUNT(ba.award_id) as count
// // //       FROM badge_definitions bd
// // //       LEFT JOIN badge_awards ba ON bd.badge_id = ba.badge_id AND ba.user_id = ?
// // //       GROUP BY bd.badge_id, bd.badge_name
// // //       ORDER BY bd.badge_id
// // //     `, [userId]);

// // //     res.json({
// // //       success: true,
// // //       stats: stats
// // //     });

// // //   } catch (err) {
// // //     console.error('❌ GET badge stats error:', err);
// // //     res.status(500).json({ success: false, message: 'Failed to fetch badge stats' });
// // //   }
// // // });

// // // // =====================================================
// // // // ADMIN ASSIGNMENT & REASSIGNMENT ROUTES
// // // // =====================================================

// // // router.post('/assign', verifyToken, async (req, res) => {
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }

// // //     const { report_id, volunteer_id, status_id } = req.body;
    
// // //     if (!report_id || !volunteer_id) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Report ID and Volunteer ID are required'
// // //       });
// // //     }

// // //     await connection.beginTransaction();

// // //     console.log(`🤝 Assigning volunteer ${volunteer_id} to report ${report_id}`);
    
// // //     const [reportCheck] = await connection.execute(
// // //       'SELECT report_id, status_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// // //       [report_id]
// // //     );
    
// // //     if (reportCheck.length === 0) {
// // //       await connection.rollback();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Report not found'
// // //       });
// // //     }
    
// // //     const [volunteerCheck] = await connection.execute(`
// // //       SELECT u.user_id, u.username, u.email, u.phone 
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       WHERE u.user_id = ? 
// // //         AND u.role_id = 2 
// // //         AND u.is_deleted = 0
// // //         AND (vp.approval_status_id = 2 OR (vp.approval_status_id IS NULL AND u.user_id IN (2, 8)))
// // //     `, [volunteer_id]);
    
// // //     if (volunteerCheck.length === 0) {
// // //       await connection.rollback();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Volunteer not found, not approved, or is rejected'
// // //       });
// // //     }
    
// // //     const [existingTasks] = await connection.execute(
// // //       'SELECT task_id, assigned_to_user_id, status_id, is_deleted FROM tasks WHERE report_id = ?',
// // //       [report_id]
// // //     );
    
// // //     const taskStatus = status_id || 2;
    
// // //     if (existingTasks.length > 0) {
// // //       const existingTask = existingTasks[0];
      
// // //       if (existingTask.is_deleted === 1) {
// // //         console.log(`♻️ Reactivating soft-deleted task ${existingTask.task_id} for report ${report_id}`);
// // //         await connection.execute(
// // //           'UPDATE tasks SET assigned_to_user_id = ?, status_id = ?, assigned_at = NOW(), is_deleted = 0 WHERE task_id = ?',
// // //           [volunteer_id, taskStatus, existingTask.task_id]
// // //         );
// // //       } else {
// // //         console.log(`📝 Updating existing task ${existingTask.task_id} for report ${report_id}`);
// // //         await connection.execute(
// // //           'UPDATE tasks SET assigned_to_user_id = ?, status_id = ?, assigned_at = NOW() WHERE task_id = ?',
// // //           [volunteer_id, taskStatus, existingTask.task_id]
// // //         );
// // //       }
// // //     } else {
// // //       console.log(`📝 Creating new task for report ${report_id}...`);
// // //       await connection.execute(
// // //         `INSERT INTO tasks (report_id, assigned_to_user_id, assigned_by_user_id, status_id, assigned_at, is_deleted)
// // //          VALUES (?, ?, ?, ?, NOW(), 0)`,
// // //         [report_id, volunteer_id, req.user.user_id, taskStatus]
// // //       );
// // //     }
    
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = ? WHERE report_id = ?',
// // //       [taskStatus, report_id]
// // //     );

// // //     await connection.commit();
    
// // //     const volunteer = volunteerCheck[0];
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Volunteer assigned successfully',
// // //       data: {
// // //         report_id: report_id,
// // //         volunteer_id: volunteer.user_id,
// // //         volunteer_name: volunteer.username,
// // //         volunteer_email: volunteer.email,
// // //         volunteer_phone: volunteer.phone || '',
// // //         status_id: taskStatus,
// // //         timestamp: new Date().toISOString()
// // //       }
// // //     });

// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('❌ Error assigning volunteer:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to assign volunteer',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // router.delete('/unassign/:report_id', verifyToken, async (req, res) => {
// // //   const connection = await pool.getConnection();
// // //   const reportId = Number(req.params.report_id);
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     if (!reportId) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Report ID is required'
// // //       });
// // //     }
    
// // //     await connection.beginTransaction();
    
// // //     console.log(`🗑️ Unassigning volunteer from report ${reportId}`);
    
// // //     const [reportCheck] = await connection.execute(
// // //       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// // //       [reportId]
// // //     );
    
// // //     if (reportCheck.length === 0) {
// // //       await connection.rollback();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Report not found'
// // //       });
// // //     }
    
// // //     const [taskCheck] = await connection.execute(
// // //       'SELECT task_id FROM tasks WHERE report_id = ? AND is_deleted = 0',
// // //       [reportId]
// // //     );
    
// // //     if (taskCheck.length === 0) {
// // //       await connection.rollback();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'No active task found for this report'
// // //       });
// // //     }
    
// // //     await connection.execute(
// // //       'UPDATE tasks SET is_deleted = 1, updated_at = NOW() WHERE report_id = ?',
// // //       [reportId]
// // //     );
    
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = 1 WHERE report_id = ?',
// // //       [reportId]
// // //     );
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Volunteer unassigned successfully',
// // //       data: {
// // //         report_id: reportId,
// // //         unassigned_at: new Date().toISOString()
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('❌ Error unassigning volunteer:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to unassign volunteer',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // router.post('/force-assign', verifyToken, async (req, res) => {
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }

// // //     const { report_id, volunteer_id, status_id } = req.body;
    
// // //     if (!report_id || !volunteer_id) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Report ID and Volunteer ID are required'
// // //       });
// // //     }

// // //     await connection.beginTransaction();

// // //     console.log(`💪 Force assigning volunteer ${volunteer_id} to report ${report_id}`);
    
// // //     const [reportCheck] = await connection.execute(
// // //       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// // //       [report_id]
// // //     );
    
// // //     if (reportCheck.length === 0) {
// // //       await connection.rollback();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Report not found'
// // //       });
// // //     }
    
// // //     const [volunteerCheck] = await connection.execute(`
// // //       SELECT u.user_id, u.username, u.email, u.phone 
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       WHERE u.user_id = ? 
// // //         AND u.role_id = 2 
// // //         AND u.is_deleted = 0
// // //         AND (vp.approval_status_id = 2 OR (vp.approval_status_id IS NULL AND u.user_id IN (2, 8)))
// // //     `, [volunteer_id]);
    
// // //     if (volunteerCheck.length === 0) {
// // //       await connection.rollback();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Volunteer not found, not approved, or is rejected'
// // //       });
// // //     }
    
// // //     await connection.execute(
// // //       'DELETE FROM tasks WHERE report_id = ?',
// // //       [report_id]
// // //     );
    
// // //     const [result] = await connection.execute(
// // //       `INSERT INTO tasks (report_id, assigned_to_user_id, assigned_by_user_id, status_id, assigned_at, is_deleted)
// // //        VALUES (?, ?, ?, ?, NOW(), 0)`,
// // //       [report_id, volunteer_id, req.user.user_id, status_id || 2]
// // //     );
    
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = ? WHERE report_id = ?',
// // //       [status_id || 2, report_id]
// // //     );

// // //     await connection.commit();
    
// // //     const volunteer = volunteerCheck[0];
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Volunteer force-assigned successfully',
// // //       data: {
// // //         report_id: report_id,
// // //         volunteer_id: volunteer.user_id,
// // //         volunteer_name: volunteer.username,
// // //         volunteer_email: volunteer.email,
// // //         volunteer_phone: volunteer.phone || '',
// // //         status_id: status_id || 2,
// // //         task_id: result.insertId
// // //       }
// // //     });

// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('❌ Error force assigning volunteer:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to assign volunteer',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // router.get('/available-for-reassignment/:reportId', verifyToken, async (req, res) => {
// // //   const reportId = Number(req.params.reportId);
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     const [volunteers] = await pool.execute(`
// // //       SELECT 
// // //         u.user_id,
// // //         u.username,
// // //         u.email,
// // //         COALESCE(CAST(u.phone AS CHAR), '') as phone,
// // //         vp.availability_status_id,
// // //         a.status_name as availability_status,
// // //         (
// // //           SELECT COUNT(*) 
// // //           FROM tasks t
// // //           WHERE t.assigned_to_user_id = u.user_id 
// // //           AND t.status_id = 2
// // //           AND t.is_deleted = 0
// // //         ) as active_tasks_count
// // //       FROM users u
// // //       INNER JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       INNER JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// // //       WHERE u.role_id = 2
// // //         AND u.is_deleted = 0
// // //         AND vp.approval_status_id = 2
// // //         AND vp.availability_status_id = 1
// // //         AND u.user_id NOT IN (
// // //           SELECT assigned_to_user_id 
// // //           FROM tasks 
// // //           WHERE report_id = ? AND is_deleted = 0
// // //         )
// // //       ORDER BY active_tasks_count ASC, u.username ASC
// // //     `, [reportId]);
    
// // //     res.json({
// // //       success: true,
// // //       data: volunteers,
// // //       count: volunteers.length,
// // //       report_id: reportId
// // //     });
    
// // //   } catch (error) {
// // //     console.error('❌ Error fetching available volunteers:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch available volunteers',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // router.post('/reassign', verifyToken, async (req, res) => {
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }

// // //     const { task_id, new_volunteer_id, report_id } = req.body;
    
// // //     if ((!task_id && !report_id) || !new_volunteer_id) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Task ID or Report ID and New Volunteer ID are required'
// // //       });
// // //     }

// // //     await connection.beginTransaction();
    
// // //     let actualTaskId = task_id;
// // //     if (!actualTaskId && report_id) {
// // //       const [tasks] = await connection.execute(
// // //         'SELECT task_id, assigned_to_user_id FROM tasks WHERE report_id = ? AND is_deleted = 0 ORDER BY task_id DESC LIMIT 1',
// // //         [report_id]
// // //       );
// // //       if (tasks.length > 0) {
// // //         actualTaskId = tasks[0].task_id;
// // //       }
// // //     }
    
// // //     if (!actualTaskId) {
// // //       await connection.rollback();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'No active task found for reassignment'
// // //       });
// // //     }
    
// // //     const [oldTasks] = await connection.execute(
// // //       'SELECT * FROM tasks WHERE task_id = ?',
// // //       [actualTaskId]
// // //     );
    
// // //     if (oldTasks.length === 0) {
// // //       await connection.rollback();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Task not found'
// // //       });
// // //     }
    
// // //     const oldTask = oldTasks[0];
    
// // //     await connection.execute(
// // //       'UPDATE tasks SET is_deleted = 1, status_id = 4 WHERE task_id = ?',
// // //       [actualTaskId]
// // //     );
    
// // //     const [result] = await connection.execute(
// // //       `INSERT INTO tasks 
// // //        (report_id, assigned_to_user_id, assigned_by_user_id, status_id, assigned_at, is_deleted)
// // //        VALUES (?, ?, ?, 1, NOW(), 0)`,
// // //       [oldTask.report_id, new_volunteer_id, req.user.user_id]
// // //     );
    
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = 2 WHERE report_id = ?',
// // //       [oldTask.report_id]
// // //     );
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Task reassigned successfully',
// // //       data: {
// // //         old_task_id: actualTaskId,
// // //         new_task_id: result.insertId,
// // //         new_volunteer_id: new_volunteer_id,
// // //         reassigned_at: new Date().toISOString()
// // //       }
// // //     });

// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('❌ Error reassigning volunteer:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to reassign volunteer',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // router.get('/declined-tasks', verifyToken, async (req, res) => {
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     const [tasks] = await pool.execute(`
// // //       SELECT 
// // //         t.task_id,
// // //         t.report_id,
// // //         t.assigned_to_user_id,
// // //         t.assigned_by_user_id,
// // //         t.status_id,
// // //         ts.status_name as task_status,
// // //         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
// // //         DATE_FORMAT(t.volunteer_responded_at, '%Y-%m-%d %H:%i:%s') as responded_at,
// // //         t.volunteer_response,
// // //         t.declined_reason,
// // //         vu.username as volunteer_name,
// // //         r.report_id,
// // //         r.description,
// // //         r.location_address,
// // //         at.type_name as animal_type,
// // //         ac.condition_name as animal_condition,
// // //         ru.username as reporter_name
// // //       FROM tasks t
// // //       INNER JOIN reports r ON t.report_id = r.report_id
// // //       LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
// // //       LEFT JOIN users vu ON t.assigned_to_user_id = vu.user_id
// // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // //       LEFT JOIN users ru ON r.user_id = ru.user_id
// // //       WHERE t.status_id = 4
// // //         AND t.is_deleted = 0
// // //         AND r.is_deleted = 0
// // //       ORDER BY t.volunteer_responded_at DESC
// // //     `);
    
// // //     res.json({
// // //       success: true,
// // //       data: tasks,
// // //       count: tasks.length
// // //     });
    
// // //   } catch (error) {
// // //     console.error('❌ Error fetching declined tasks:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch declined tasks',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // router.get('/report/:report_id/task', verifyToken, async (req, res) => {
// // //   const reportId = Number(req.params.report_id);
  
// // //   if (!reportId) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Report ID is required'
// // //     });
// // //   }
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     const [tasks] = await pool.execute(`
// // //       SELECT 
// // //         t.task_id,
// // //         t.report_id,
// // //         t.assigned_to_user_id,
// // //         t.assigned_by_user_id,
// // //         t.status_id,
// // //         ts.status_name as task_status,
// // //         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
// // //         t.started_at,
// // //         t.completed_at,
// // //         t.is_deleted,
// // //         u.username as volunteer_name,
// // //         u.email as volunteer_email,
// // //         u2.username as assigned_by_name,
// // //         r.status_id as report_status
// // //       FROM tasks t
// // //       LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
// // //       LEFT JOIN users u ON t.assigned_to_user_id = u.user_id
// // //       LEFT JOIN users u2 ON t.assigned_by_user_id = u2.user_id
// // //       LEFT JOIN reports r ON t.report_id = r.report_id
// // //       WHERE t.report_id = ?
// // //       ORDER BY t.assigned_at DESC
// // //       LIMIT 1
// // //     `, [reportId]);
    
// // //     if (tasks.length === 0) {
// // //       return res.json({
// // //         success: true,
// // //         data: null,
// // //         message: 'No task found for this report'
// // //       });
// // //     }
    
// // //     res.json({
// // //       success: true,
// // //       data: tasks[0],
// // //       message: 'Task found'
// // //     });
    
// // //   } catch (error) {
// // //     console.error('❌ Error fetching task:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch task',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // =====================================================
// // // // ADMIN FIX UTILITIES
// // // // =====================================================

// // // router.post('/fix-task/:task_id', verifyToken, async (req, res) => {
// // //   const connection = await pool.getConnection();
// // //   const taskId = Number(req.params.task_id);
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     if (!taskId) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Task ID is required'
// // //       });
// // //     }
    
// // //     await connection.beginTransaction();
    
// // //     const [tasks] = await connection.execute(
// // //       'SELECT * FROM tasks WHERE task_id = ?',
// // //       [taskId]
// // //     );
    
// // //     if (tasks.length === 0) {
// // //       await connection.rollback();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Task not found'
// // //       });
// // //     }
    
// // //     const task = tasks[0];
// // //     const fixes = [];
    
// // //     if (task.is_deleted === 1 && task.status_id === 2) {
// // //       await connection.execute(
// // //         'UPDATE tasks SET status_id = 1 WHERE task_id = ?',
// // //         [taskId]
// // //       );
// // //       fixes.push(`status ${task.status_id} → 1 (deleted)`);
// // //     }
    
// // //     if (task.completed_at && task.status_id !== 3) {
// // //       await connection.execute(
// // //         'UPDATE tasks SET status_id = 3 WHERE task_id = ?',
// // //         [taskId]
// // //       );
// // //       fixes.push(`status ${task.status_id} → 3 (completed)`);
// // //     }
    
// // //     if (fixes.length === 0) {
// // //       await connection.rollback();
// // //       return res.json({
// // //         success: true,
// // //         message: 'Task is already in consistent state',
// // //         data: task
// // //       });
// // //     }
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: `Task fixed: ${fixes.join(', ')}`,
// // //       data: {
// // //         task_id: taskId,
// // //         fixes: fixes
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('❌ Error fixing task:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fix task',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // router.post('/fix-report/:report_id', verifyToken, async (req, res) => {
// // //   const connection = await pool.getConnection();
// // //   const reportId = Number(req.params.report_id);
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     if (!reportId) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Report ID is required'
// // //       });
// // //     }
    
// // //     await connection.beginTransaction();
    
// // //     console.log(`🔧 Fixing report ${reportId} tasks...`);
    
// // //     const [tasks] = await connection.execute(
// // //       'SELECT * FROM tasks WHERE report_id = ? ORDER BY task_id DESC',
// // //       [reportId]
// // //     );
    
// // //     if (tasks.length === 0) {
// // //       await connection.rollback();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'No tasks found for this report'
// // //       });
// // //     }
    
// // //     const fixes = [];
    
// // //     for (const task of tasks) {
// // //       if (task.is_deleted === 1 && task.status_id >= 2) {
// // //         await connection.execute(
// // //           'UPDATE tasks SET status_id = 1 WHERE task_id = ?',
// // //           [task.task_id]
// // //         );
// // //         fixes.push({
// // //           task_id: task.task_id,
// // //           change: `status ${task.status_id} → 1 (deleted)`
// // //         });
// // //       }
      
// // //       if (task.completed_at && task.status_id !== 3) {
// // //         await connection.execute(
// // //           'UPDATE tasks SET status_id = 3 WHERE task_id = ?',
// // //           [task.task_id]
// // //         );
// // //         fixes.push({
// // //           task_id: task.task_id,
// // //           change: `status ${task.status_id} → 3 (completed)`
// // //         });
// // //       }
// // //     }
    
// // //     const latestTask = tasks[0];
// // //     let reportStatus = 1;
    
// // //     if (latestTask.is_deleted === 0) {
// // //       if (latestTask.status_id === 2) reportStatus = 3;
// // //       else if (latestTask.status_id === 3) reportStatus = 4;
// // //       else if (latestTask.status_id === 4) reportStatus = 1;
// // //       else reportStatus = latestTask.status_id;
// // //     }
    
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = ? WHERE report_id = ?',
// // //       [reportStatus, reportId]
// // //     );
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: `Fixed ${fixes.length} issues for report ${reportId}`,
// // //       fixes: fixes,
// // //       data: {
// // //         report_id: reportId,
// // //         report_status: reportStatus,
// // //         tasks_fixed: fixes.length
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('❌ Error fixing report:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fix report',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // module.exports = router;

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

// // // console.log('Volunteer routes initialized');

// // // // =====================================================
// // // // ADMIN ROUTES - Volunteer Management
// // // // =====================================================

// // // // Get ALL volunteers (for admin assignment) - SHOW ONLY APPROVED VOLUNTEERS
// // // router.get('/available', verifyToken, async (req, res) => {
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }

// // //     console.log('Fetching APPROVED volunteers for assignment...');
    
// // //     const [volunteers] = await pool.execute(`
// // //       SELECT 
// // //         u.user_id,
// // //         u.username,
// // //         u.email,
// // //         COALESCE(CAST(u.phone AS CHAR), '') as phone,
// // //         u.bio,
// // //         u.created_at,
// // //         u.role_id,
// // //         COALESCE(vp.joined_at, u.created_at) as joined_at,
// // //         COALESCE(vp.approval_status_id, 2) as approval_status_id,
// // //         CASE 
// // //           WHEN vp.approval_status_id = 1 THEN 'Pending'
// // //           WHEN vp.approval_status_id = 2 THEN 'Approved'
// // //           WHEN vp.approval_status_id = 3 THEN 'Rejected'
// // //           ELSE 'Approved'
// // //         END as approval_status,
// // //         COALESCE(vp.availability_status_id, 1) as availability_status_id,
// // //         a.status_name as availability_status,
// // //         COALESCE(vp.has_car, 0) as has_car,
// // //         COALESCE(vp.can_foster, 0) as can_foster,
// // //         COALESCE(vp.animal_handling, '') as animal_handling,
// // //         COALESCE(vp.city, '') as city,
// // //         vp.badges,
// // //         (
// // //           SELECT COUNT(*) 
// // //           FROM tasks t
// // //           WHERE t.assigned_to_user_id = u.user_id 
// // //           AND t.status_id = 2
// // //           AND t.is_deleted = 0
// // //         ) as assigned_reports_count
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// // //       WHERE u.role_id = 2
// // //         AND u.is_deleted = 0
// // //         AND (vp.approval_status_id = 2 OR (vp.approval_status_id IS NULL AND u.user_id IN (2, 8)))
// // //       ORDER BY u.username ASC
// // //     `);

// // //     console.log(`Found ${volunteers.length} APPROVED volunteers for assignment`);
    
// // //     res.json({
// // //       success: true,
// // //       data: volunteers,
// // //       count: volunteers.length
// // //     });

// // //   } catch (error) {
// // //     console.error('Error fetching volunteers:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch volunteers',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // Get only APPROVED volunteers - Alternative endpoint
// // // router.get('/approved', verifyToken, async (req, res) => {
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }

// // //     console.log('Fetching APPROVED volunteers only...');
    
// // //     const [volunteers] = await pool.execute(`
// // //       SELECT 
// // //         u.user_id,
// // //         u.username,
// // //         u.email,
// // //         COALESCE(CAST(u.phone AS CHAR), '') as phone,
// // //         u.bio,
// // //         u.created_at,
// // //         u.role_id,
// // //         COALESCE(vp.joined_at, u.created_at) as joined_at,
// // //         vp.approval_status_id,
// // //         'Approved' as approval_status,
// // //         COALESCE(vp.availability_status_id, 1) as availability_status_id,
// // //         a.status_name as availability_status,
// // //         COALESCE(vp.has_car, 0) as has_car,
// // //         COALESCE(vp.can_foster, 0) as can_foster,
// // //         COALESCE(vp.animal_handling, '') as animal_handling,
// // //         COALESCE(vp.city, '') as city,
// // //         vp.badges,
// // //         (
// // //           SELECT COUNT(*) 
// // //           FROM tasks t
// // //           WHERE t.assigned_to_user_id = u.user_id 
// // //           AND t.status_id = 2
// // //           AND t.is_deleted = 0
// // //         ) as assigned_reports_count
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// // //       WHERE u.role_id = 2
// // //         AND u.is_deleted = 0
// // //         AND vp.approval_status_id = 2
// // //       ORDER BY u.username ASC
// // //     `);

// // //     console.log(`Found ${volunteers.length} APPROVED volunteers`);
    
// // //     res.json({
// // //       success: true,
// // //       data: volunteers,
// // //       count: volunteers.length
// // //     });

// // //   } catch (error) {
// // //     console.error('Error fetching approved volunteers:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch approved volunteers',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // Get all volunteers with detailed info (for admin management)
// // // router.get('/admin/all', verifyToken, async (req, res) => {
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }

// // //     console.log('Fetching ALL volunteers for admin...');
    
// // //     const [volunteers] = await pool.execute(`
// // //       SELECT 
// // //         u.user_id,
// // //         u.username,
// // //         u.email,
// // //         COALESCE(CAST(u.phone AS CHAR), '') as phone,
// // //         u.bio,
// // //         u.profile_image_url,
// // //         u.created_at,
// // //         u.role_id,
// // //         COALESCE(vp.joined_at, u.created_at) as joined_at,
// // //         COALESCE(vp.approval_status_id, 2) as approval_status_id,
// // //         CASE 
// // //           WHEN vp.approval_status_id = 1 THEN 'Pending'
// // //           WHEN vp.approval_status_id = 2 THEN 'Approved'
// // //           WHEN vp.approval_status_id = 3 THEN 'Rejected'
// // //           ELSE 'Approved'
// // //         END as approval_status,
// // //         COALESCE(vp.availability_status_id, 1) as availability_status_id,
// // //         a.status_name as availability_status,
// // //         COALESCE(vp.has_car, 0) as has_car,
// // //         COALESCE(vp.can_foster, 0) as can_foster,
// // //         COALESCE(vp.animal_handling, '') as animal_handling,
// // //         COALESCE(vp.city, '') as city,
// // //         vp.badges,
// // //         (
// // //           SELECT COUNT(*) 
// // //           FROM tasks t
// // //           WHERE t.assigned_to_user_id = u.user_id 
// // //           AND t.is_deleted = 0
// // //         ) as total_assigned_reports,
// // //         (
// // //           SELECT COUNT(*) 
// // //           FROM tasks t
// // //           INNER JOIN reports r ON t.report_id = r.report_id
// // //           WHERE t.assigned_to_user_id = u.user_id 
// // //           AND r.status_id = 4
// // //           AND t.is_deleted = 0
// // //           AND r.is_deleted = 0
// // //         ) as completed_reports,
// // //         (
// // //           SELECT COUNT(*) 
// // //           FROM tasks t
// // //           WHERE t.assigned_to_user_id = u.user_id 
// // //           AND t.status_id = 2
// // //           AND t.is_deleted = 0
// // //         ) as active_reports
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// // //       WHERE u.role_id = 2
// // //         AND u.is_deleted = 0
// // //       ORDER BY 
// // //         CASE WHEN COALESCE(vp.approval_status_id, 2) = 2 THEN 1 ELSE 2 END,
// // //         u.username ASC
// // //     `);

// // //     console.log(`Found ${volunteers.length} volunteers for admin`);
    
// // //     res.json({
// // //       success: true,
// // //       data: volunteers,
// // //       count: volunteers.length
// // //     });

// // //   } catch (error) {
// // //     console.error('Error fetching all volunteers:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch volunteers',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // Update volunteer approval status
// // // router.patch('/:id/approval', verifyToken, async (req, res) => {
// // //   const volunteerId = Number(req.params.id);
// // //   const { approval_status_id } = req.body;
  
// // //   if (!volunteerId) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid volunteer ID'
// // //     });
// // //   }
  
// // //   if (!approval_status_id || (approval_status_id < 1 || approval_status_id > 3)) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid approval status ID. Must be 1 (Pending), 2 (Approved), or 3 (Rejected)'
// // //     });
// // //   }
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     const [volunteerCheck] = await pool.execute(
// // //       'SELECT user_id FROM users WHERE user_id = ? AND role_id = 2 AND is_deleted = 0',
// // //       [volunteerId]
// // //     );
    
// // //     if (volunteerCheck.length === 0) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Volunteer not found'
// // //       });
// // //     }
    
// // //     const [profileCheck] = await pool.execute(
// // //       'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
// // //       [volunteerId]
// // //     );
    
// // //     if (profileCheck.length === 0) {
// // //       await pool.execute(
// // //         `INSERT INTO volunteer_profiles (user_id, approval_status_id, availability_status_id, joined_at, has_car, can_foster, animal_handling, city)
// // //          VALUES (?, ?, 1, NOW(), 0, 0, '', '')`,
// // //         [volunteerId, approval_status_id]
// // //       );
// // //     } else {
// // //       await pool.execute(
// // //         'UPDATE volunteer_profiles SET approval_status_id = ? WHERE user_id = ?',
// // //         [approval_status_id, volunteerId]
// // //       );
// // //     }
    
// // //     const [updatedVolunteer] = await pool.execute(`
// // //       SELECT 
// // //         u.user_id,
// // //         u.username,
// // //         u.email,
// // //         COALESCE(CAST(u.phone AS CHAR), '') as phone,
// // //         COALESCE(vp.approval_status_id, 2) as approval_status_id,
// // //         CASE 
// // //           WHEN vp.approval_status_id = 1 THEN 'Pending'
// // //           WHEN vp.approval_status_id = 2 THEN 'Approved'
// // //           WHEN vp.approval_status_id = 3 THEN 'Rejected'
// // //           ELSE 'Approved'
// // //         END as approval_status,
// // //         COALESCE(vp.has_car, 0) as has_car,
// // //         COALESCE(vp.can_foster, 0) as can_foster,
// // //         COALESCE(vp.animal_handling, '') as animal_handling,
// // //         COALESCE(vp.city, '') as city,
// // //         vp.badges
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       WHERE u.user_id = ?
// // //     `, [volunteerId]);
    
// // //     res.json({
// // //       success: true,
// // //       message: `Volunteer approval status updated to ${updatedVolunteer[0].approval_status}`,
// // //       data: updatedVolunteer[0]
// // //     });
    
// // //   } catch (error) {
// // //     console.error('Error updating volunteer approval:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to update volunteer approval status',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // =====================================================
// // // // VOLUNTEER AVAILABILITY STATUSES
// // // // =====================================================

// // // // Get all availability statuses for dropdowns
// // // router.get('/availability-statuses', verifyToken, async (req, res) => {
// // //   try {
// // //     const [statuses] = await pool.execute(`
// // //       SELECT 
// // //         status_id, 
// // //         status_name
// // //       FROM availability_statuses 
// // //       ORDER BY status_id
// // //     `);
    
// // //     res.json({
// // //       success: true,
// // //       data: statuses
// // //     });
    
// // //   } catch (error) {
// // //     console.error('Error fetching availability statuses:', error);
// // //     const fallbackStatuses = [
// // //       { status_id: 1, status_name: 'available' },
// // //       { status_id: 2, status_name: 'unavailable' }
// // //     ];
// // //     res.json({
// // //       success: true,
// // //       data: fallbackStatuses,
// // //       message: 'Using fallback data'
// // //     });
// // //   }
// // // });

// // // // Get volunteer's own availability
// // // router.get('/availability', verifyToken, async (req, res) => {
// // //   const volunteerId = req.user.user_id;
  
// // //   try {
// // //     if (req.user.role_id !== 2) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Volunteer access required'
// // //       });
// // //     }
    
// // //     const [profiles] = await pool.execute(`
// // //       SELECT 
// // //         u.user_id,
// // //         u.username,
// // //         COALESCE(vp.availability_status_id, 1) as availability_status_id,
// // //         a.status_name as availability_status,
// // //         DATE_FORMAT(vp.availability_updated_at, '%Y-%m-%d %H:%i:%s') as availability_updated_at,
// // //         COALESCE(vp.approval_status_id, 2) as approval_status_id,
// // //         COALESCE(vp.has_car, 0) as has_car,
// // //         COALESCE(vp.can_foster, 0) as can_foster,
// // //         COALESCE(vp.animal_handling, '') as animal_handling,
// // //         COALESCE(vp.city, '') as city,
// // //         vp.badges,
// // //         (
// // //           SELECT COUNT(*) 
// // //           FROM tasks t
// // //           WHERE t.assigned_to_user_id = u.user_id 
// // //           AND t.status_id = 2
// // //           AND t.is_deleted = 0
// // //         ) as active_tasks_count
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// // //       WHERE u.user_id = ? AND u.role_id = 2
// // //     `, [volunteerId]);
    
// // //     if (profiles.length === 0) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Volunteer profile not found'
// // //       });
// // //     }
    
// // //     res.json({
// // //       success: true,
// // //       data: profiles[0]
// // //     });
    
// // //   } catch (error) {
// // //     console.error('Error fetching volunteer availability:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch availability',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // Update volunteer's own availability (SELF-SERVICE)
// // // router.patch('/availability', verifyToken, async (req, res) => {
// // //   const volunteerId = req.user.user_id;
// // //   const { availability_status_id } = req.body;
  
// // //   if (!availability_status_id || (availability_status_id < 1 || availability_status_id > 2)) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid availability status ID. Must be 1 (available) or 2 (unavailable)'
// // //     });
// // //   }
  
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     await connection.beginTransaction();
    
// // //     if (req.user.role_id !== 2) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Volunteer access required'
// // //       });
// // //     }
    
// // //     const [profileCheck] = await connection.execute(
// // //       'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
// // //       [volunteerId]
// // //     );
    
// // //     if (profileCheck.length === 0) {
// // //       await connection.execute(
// // //         `INSERT INTO volunteer_profiles 
// // //          (user_id, approval_status_id, availability_status_id, availability_updated_at, joined_at, has_car, can_foster, animal_handling, city)
// // //          VALUES (?, 2, ?, NOW(), NOW(), 0, 0, '', '')`,
// // //         [volunteerId, availability_status_id]
// // //       );
// // //     } else {
// // //       await connection.execute(
// // //         `UPDATE volunteer_profiles 
// // //          SET availability_status_id = ?, 
// // //              availability_updated_at = NOW() 
// // //          WHERE user_id = ?`,
// // //         [availability_status_id, volunteerId]
// // //       );
// // //     }
    
// // //     await connection.commit();
    
// // //     const [statuses] = await pool.execute(
// // //       'SELECT status_name FROM availability_statuses WHERE status_id = ?',
// // //       [availability_status_id]
// // //     );
    
// // //     const statusName = statuses[0]?.status_name || (availability_status_id === 1 ? 'available' : 'unavailable');
    
// // //     res.json({
// // //       success: true,
// // //       message: `Availability updated to ${statusName}`,
// // //       data: {
// // //         user_id: volunteerId,
// // //         availability_status_id: availability_status_id,
// // //         availability_status: statusName,
// // //         updated_at: new Date().toISOString()
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('Error updating volunteer availability:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to update availability',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // // Update volunteer availability status (Admin or Self)
// // // router.patch('/:id/availability', verifyToken, async (req, res) => {
// // //   const volunteerId = Number(req.params.id);
// // //   const { availability_status_id } = req.body;
  
// // //   if (!volunteerId) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid volunteer ID'
// // //     });
// // //   }
  
// // //   if (!availability_status_id || (availability_status_id < 1 || availability_status_id > 2)) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid availability status ID. Must be 1 (available) or 2 (unavailable)'
// // //     });
// // //   }
  
// // //   try {
// // //     if (req.user.role_id !== 3 && req.user.user_id !== volunteerId) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: You can only update your own availability'
// // //       });
// // //     }
    
// // //     const [volunteerCheck] = await pool.execute(
// // //       'SELECT user_id FROM users WHERE user_id = ? AND role_id = 2 AND is_deleted = 0',
// // //       [volunteerId]
// // //     );
    
// // //     if (volunteerCheck.length === 0) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Volunteer not found'
// // //       });
// // //     }
    
// // //     const [profileCheck] = await pool.execute(
// // //       'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
// // //       [volunteerId]
// // //     );
    
// // //     if (profileCheck.length === 0) {
// // //       await pool.execute(
// // //         `INSERT INTO volunteer_profiles (user_id, approval_status_id, availability_status_id, joined_at, has_car, can_foster, animal_handling, city)
// // //          VALUES (?, 2, ?, NOW(), 0, 0, '', '')`,
// // //         [volunteerId, availability_status_id]
// // //       );
// // //     } else {
// // //       await pool.execute(
// // //         'UPDATE volunteer_profiles SET availability_status_id = ?, availability_updated_at = NOW() WHERE user_id = ?',
// // //         [availability_status_id, volunteerId]
// // //       );
// // //     }
    
// // //     const [statuses] = await pool.execute(
// // //       'SELECT status_name FROM availability_statuses WHERE status_id = ?',
// // //       [availability_status_id]
// // //     );
    
// // //     const statusName = statuses[0]?.status_name || (availability_status_id === 1 ? 'available' : 'unavailable');
    
// // //     const [updatedVolunteer] = await pool.execute(`
// // //       SELECT 
// // //         u.user_id,
// // //         u.username,
// // //         COALESCE(vp.availability_status_id, 1) as availability_status_id,
// // //         a.status_name as availability_status,
// // //         COALESCE(vp.has_car, 0) as has_car,
// // //         COALESCE(vp.can_foster, 0) as can_foster,
// // //         COALESCE(vp.animal_handling, '') as animal_handling,
// // //         COALESCE(vp.city, '') as city,
// // //         vp.badges
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// // //       WHERE u.user_id = ?
// // //     `, [volunteerId]);
    
// // //     res.json({
// // //       success: true,
// // //       message: `Volunteer availability updated to ${statusName}`,
// // //       data: updatedVolunteer[0]
// // //     });
    
// // //   } catch (error) {
// // //     console.error('Error updating volunteer availability:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to update volunteer availability',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // =====================================================
// // // // VOLUNTEER TASK MANAGEMENT
// // // // =====================================================

// // // // Get all tasks for current volunteer
// // // router.get('/tasks', verifyToken, async (req, res) => {
// // //   const volunteerId = req.user.user_id;
  
// // //   try {
// // //     if (req.user.role_id !== 2) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Volunteer access required'
// // //       });
// // //     }
    
// // //     console.log(`Fetching tasks for volunteer: ${volunteerId}`);
    
// // //     const [tasks] = await pool.execute(`
// // //       SELECT 
// // //         t.task_id,
// // //         t.report_id,
// // //         t.assigned_to_user_id,
// // //         t.assigned_by_user_id,
// // //         t.status_id as task_status_id,
// // //         ts.status_name as task_status,
// // //         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
// // //         DATE_FORMAT(t.volunteer_responded_at, '%Y-%m-%d %H:%i:%s') as responded_at,
// // //         t.volunteer_response,
// // //         t.declined_reason,
// // //         DATE_FORMAT(t.started_at, '%Y-%m-%d %H:%i:%s') as started_at,
// // //         DATE_FORMAT(t.completed_at, '%Y-%m-%d %H:%i:%s') as completed_at,
// // //         r.report_id,
// // //         r.description,
// // //         r.location_address,
// // //         r.user_note,
// // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as report_submitted_at,
// // //         at.type_name as animal_type,
// // //         ac.condition_name as animal_condition,
// // //         r.status_id as report_status_id,
// // //         rs.status_name as report_status,
// // //         u.username as reporter_name,
// // //         CAST(u.phone AS CHAR) AS reporter_phone,
// // //         u.email as reporter_email,
// // //         au.username as assigned_by_name
// // //       FROM tasks t
// // //       INNER JOIN reports r ON t.report_id = r.report_id
// // //       LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
// // //       LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
// // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // //       LEFT JOIN users u ON r.user_id = u.user_id
// // //       LEFT JOIN users au ON t.assigned_by_user_id = au.user_id
// // //       WHERE t.assigned_to_user_id = ? 
// // //         AND t.is_deleted = 0
// // //         AND r.is_deleted = 0
// // //       ORDER BY 
// // //         CASE 
// // //           WHEN t.status_id = 1 THEN 1
// // //           WHEN t.status_id = 2 THEN 2
// // //           WHEN t.status_id = 4 THEN 3
// // //           WHEN t.status_id = 3 THEN 4
// // //         END,
// // //         t.assigned_at DESC
// // //     `, [volunteerId]);
    
// // //     const groupedTasks = {
// // //       assigned: tasks.filter(t => t.task_status_id === 1),
// // //       inProgress: tasks.filter(t => t.task_status_id === 2),
// // //       completed: tasks.filter(t => t.task_status_id === 3),
// // //       declined: tasks.filter(t => t.task_status_id === 4)
// // //     };
    
// // //     res.json({
// // //       success: true,
// // //       data: tasks,
// // //       grouped: groupedTasks,
// // //       counts: {
// // //         total: tasks.length,
// // //         assigned: groupedTasks.assigned.length,
// // //         inProgress: groupedTasks.inProgress.length,
// // //         completed: groupedTasks.completed.length,
// // //         declined: groupedTasks.declined.length
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     console.error('Error fetching volunteer tasks:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch tasks',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // Get single task details
// // // router.get('/tasks/:taskId', verifyToken, async (req, res) => {
// // //   const taskId = Number(req.params.taskId);
// // //   const volunteerId = req.user.user_id;
  
// // //   if (!taskId) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid task ID'
// // //     });
// // //   }
  
// // //   try {
// // //     if (req.user.role_id !== 2) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Volunteer access required'
// // //       });
// // //     }
    
// // //     const [tasks] = await pool.execute(`
// // //       SELECT 
// // //         t.*,
// // //         ts.status_name as task_status,
// // //         r.*,
// // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as report_submitted_at,
// // //         at.type_name as animal_type,
// // //         ac.condition_name as animal_condition,
// // //         rs.status_name as report_status,
// // //         u.username as reporter_name,
// // //         CAST(u.phone AS CHAR) AS reporter_phone,
// // //         u.email as reporter_email,
// // //         au.username as assigned_by_name
// // //       FROM tasks t
// // //       INNER JOIN reports r ON t.report_id = r.report_id
// // //       LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
// // //       LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
// // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // //       LEFT JOIN users u ON r.user_id = u.user_id
// // //       LEFT JOIN users au ON t.assigned_by_user_id = au.user_id
// // //       WHERE t.task_id = ? 
// // //         AND t.assigned_to_user_id = ?
// // //         AND t.is_deleted = 0
// // //         AND r.is_deleted = 0
// // //     `, [taskId, volunteerId]);
    
// // //     if (tasks.length === 0) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Task not found or not assigned to you'
// // //       });
// // //     }
    
// // //     res.json({
// // //       success: true,
// // //       data: tasks[0]
// // //     });
    
// // //   } catch (error) {
// // //     console.error('Error fetching task:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch task',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // Accept a task (auto-sets to in_progress and updates availability)
// // // router.patch('/tasks/:taskId/accept', verifyToken, async (req, res) => {
// // //   const taskId = Number(req.params.taskId);
// // //   const volunteerId = req.user.user_id;
  
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     await connection.beginTransaction();
    
// // //     if (req.user.role_id !== 2) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Volunteer access required'
// // //       });
// // //     }
    
// // //     const [tasks] = await connection.execute(
// // //       `SELECT t.task_id, t.report_id, t.status_id, r.status_id as report_status_id
// // //        FROM tasks t
// // //        INNER JOIN reports r ON t.report_id = r.report_id
// // //        WHERE t.task_id = ? AND t.assigned_to_user_id = ? AND t.is_deleted = 0`,
// // //       [taskId, volunteerId]
// // //     );
    
// // //     if (tasks.length === 0) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Task not found or not assigned to you'
// // //       });
// // //     }
    
// // //     const task = tasks[0];
    
// // //     if (task.status_id !== 1) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'This task cannot be accepted'
// // //       });
// // //     }
    
// // //     // Update task to in_progress (status_id = 2)
// // //     await connection.execute(
// // //       `UPDATE tasks 
// // //        SET status_id = 2, 
// // //            volunteer_responded_at = NOW(), 
// // //            volunteer_response = 'accepted',
// // //            started_at = NOW()
// // //        WHERE task_id = ?`,
// // //       [taskId]
// // //     );
    
// // //     // Update report status to in_progress (status_id = 3)
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = 3 WHERE report_id = ?',
// // //       [task.report_id]
// // //     );
    
// // //     // AUTO-UPDATE AVAILABILITY - Check if this is their first active task
// // //     const [activeTasks] = await connection.execute(
// // //       `SELECT COUNT(*) as count 
// // //        FROM tasks 
// // //        WHERE assigned_to_user_id = ? 
// // //          AND status_id = 2
// // //          AND is_deleted = 0`,
// // //       [volunteerId]
// // //     );
    
// // //     let availabilityUpdated = false;
// // //     if (activeTasks[0].count === 1) {
// // //       await connection.execute(
// // //         `UPDATE volunteer_profiles 
// // //          SET availability_status_id = 2,
// // //              availability_updated_at = NOW() 
// // //          WHERE user_id = ?`,
// // //         [volunteerId]
// // //       );
// // //       availabilityUpdated = true;
// // //       console.log(`Auto-set volunteer ${volunteerId} to unavailable`);
// // //     }
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Task accepted successfully',
// // //       data: {
// // //         task_id: taskId,
// // //         status: 'in_progress',
// // //         status_id: 2,
// // //         accepted_at: new Date().toISOString(),
// // //         availability_auto_updated: availabilityUpdated
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('Error accepting task:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to accept task',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // // =====================================================
// // // // FIXED: Decline a task - Now updates report to DECLINED (status_id = 5)
// // // // =====================================================
// // // router.patch('/tasks/:taskId/decline', verifyToken, async (req, res) => {
// // //   const taskId = Number(req.params.taskId);
// // //   const volunteerId = req.user.user_id;
// // //   const { reason } = req.body;
  
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     await connection.beginTransaction();
    
// // //     if (req.user.role_id !== 2) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Volunteer access required'
// // //       });
// // //     }
    
// // //     const [tasks] = await connection.execute(
// // //       `SELECT t.task_id, t.report_id, t.status_id
// // //        FROM tasks t
// // //        WHERE t.task_id = ? AND t.assigned_to_user_id = ? AND t.is_deleted = 0`,
// // //       [taskId, volunteerId]
// // //     );
    
// // //     if (tasks.length === 0) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Task not found or not assigned to you'
// // //       });
// // //     }
    
// // //     const task = tasks[0];
    
// // //     if (task.status_id !== 1) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'This task cannot be declined'
// // //       });
// // //     }
    
// // //     // Update task to declined (status_id = 4)
// // //     await connection.execute(
// // //       `UPDATE tasks 
// // //        SET status_id = 4, 
// // //            volunteer_responded_at = NOW(), 
// // //            volunteer_response = 'declined',
// // //            declined_reason = ?
// // //        WHERE task_id = ?`,
// // //       [reason || 'No reason provided', taskId]
// // //     );
    
// // //     // FIXED: Update report status to DECLINED (status_id = 5) - not back to submitted
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = 5 WHERE report_id = ?',
// // //       [task.report_id]
// // //     );
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Task declined successfully',
// // //       data: {
// // //         task_id: taskId,
// // //         status: 'declined',
// // //         status_id: 4,
// // //         declined_at: new Date().toISOString(),
// // //         reason: reason || 'No reason provided'
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('Error declining task:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to decline task',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // // Complete a task
// // // router.patch('/tasks/:taskId/complete', verifyToken, async (req, res) => {
// // //   const taskId = Number(req.params.taskId);
// // //   const volunteerId = req.user.user_id;
  
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     await connection.beginTransaction();
    
// // //     if (req.user.role_id !== 2) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Volunteer access required'
// // //       });
// // //     }
    
// // //     const [tasks] = await connection.execute(
// // //       `SELECT t.task_id, t.report_id, t.status_id
// // //        FROM tasks t
// // //        WHERE t.task_id = ? AND t.assigned_to_user_id = ? AND t.is_deleted = 0`,
// // //       [taskId, volunteerId]
// // //     );
    
// // //     if (tasks.length === 0) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Task not found or not assigned to you'
// // //       });
// // //     }
    
// // //     const task = tasks[0];
    
// // //     if (task.status_id !== 2) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Task must be in progress before completing'
// // //       });
// // //     }
    
// // //     // Update task to completed (status_id = 3)
// // //     await connection.execute(
// // //       `UPDATE tasks 
// // //        SET status_id = 3, 
// // //            completed_at = NOW() 
// // //        WHERE task_id = ?`,
// // //       [taskId]
// // //     );
    
// // //     // Update report status to completed (status_id = 4)
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = 4 WHERE report_id = ?',
// // //       [task.report_id]
// // //     );
    
// // //     // AUTO-UPDATE AVAILABILITY - Check if they have any other active tasks
// // //     const [activeTasks] = await connection.execute(
// // //       `SELECT COUNT(*) as count 
// // //        FROM tasks 
// // //        WHERE assigned_to_user_id = ? 
// // //          AND status_id = 2
// // //          AND is_deleted = 0`,
// // //       [volunteerId]
// // //     );
    
// // //     let availabilityUpdated = false;
// // //     if (activeTasks[0].count === 0) {
// // //       await connection.execute(
// // //         `UPDATE volunteer_profiles 
// // //          SET availability_status_id = 1,
// // //              availability_updated_at = NOW() 
// // //          WHERE user_id = ?`,
// // //         [volunteerId]
// // //       );
// // //       availabilityUpdated = true;
// // //       console.log(`Auto-set volunteer ${volunteerId} to available`);
// // //     }
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Task completed successfully! Thank you for your service!',
// // //       data: {
// // //         task_id: taskId,
// // //         status: 'completed',
// // //         status_id: 3,
// // //         completed_at: new Date().toISOString(),
// // //         availability_auto_updated: availabilityUpdated
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('Error completing task:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to complete task',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // // =====================================================
// // // // VOLUNTEER ACTIVE MISSION - MUST BE BEFORE /:id/reports
// // // // =====================================================
// // // router.get('/:id/active-mission', verifyToken, async (req, res) => {
// // //   const volunteerId = Number(req.params.id);
  
// // //   if (!volunteerId) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid volunteer ID'
// // //     });
// // //   }
  
// // //   try {
// // //     if (req.user.role_id !== 3 && req.user.user_id !== volunteerId) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: You can only view your own missions'
// // //       });
// // //     }

// // //     console.log(`Fetching ACTIVE mission for volunteer ${volunteerId}...`);
    
// // //     const [missions] = await pool.execute(`
// // //       SELECT 
// // //         t.task_id,
// // //         t.report_id,
// // //         t.assigned_to_user_id as volunteer_id,
// // //         t.status_id as task_status_id,
// // //         ts.status_name as task_status,
// // //         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
// // //         DATE_FORMAT(t.started_at, '%Y-%m-%d %H:%i:%s') as started_at,
// // //         DATE_FORMAT(t.completed_at, '%Y-%m-%d %H:%i:%s') as completed_at,
// // //         r.report_id,
// // //         r.user_id,
// // //         r.description,
// // //         r.location_address,
// // //         r.user_note,
// // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// // //         at.type_name as animal_type,
// // //         ac.condition_name as animal_condition,
// // //         r.status_id as report_status_id,
// // //         rs.status_name as report_status,
// // //         u.username as reporter_name,
// // //         CAST(COALESCE(u.phone, '') AS CHAR) AS reporter_phone,
// // //         u.email as reporter_email,
// // //         v.username as volunteer_name,
// // //         v.email as volunteer_email,
// // //         CAST(v.phone AS CHAR) AS volunteer_phone
// // //       FROM tasks t
// // //       INNER JOIN reports r ON t.report_id = r.report_id
// // //       LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
// // //       LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
// // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // //       LEFT JOIN users u ON r.user_id = u.user_id
// // //       LEFT JOIN users v ON t.assigned_to_user_id = v.user_id
// // //       WHERE t.assigned_to_user_id = ? 
// // //         AND t.status_id = 2
// // //         AND t.is_deleted = 0
// // //         AND r.is_deleted = 0
// // //       ORDER BY t.assigned_at DESC
// // //       LIMIT 1
// // //     `, [volunteerId]);
    
// // //     if (missions.length === 0) {
// // //       return res.json({
// // //         success: true,
// // //         data: null,
// // //         message: 'No active mission found'
// // //       });
// // //     }
    
// // //     console.log(`Found active mission for volunteer ${volunteerId}: Report #${missions[0].report_id}, Task #${missions[0].task_id}`);
    
// // //     res.json({
// // //       success: true,
// // //       data: missions[0]
// // //     });
    
// // //   } catch (error) {
// // //     console.error('Error fetching volunteer active mission:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch active mission',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // =====================================================
// // // // VOLUNTEER REPORTS & ASSIGNMENTS
// // // // =====================================================

// // // // Get volunteer's assigned reports
// // // router.get('/:id/reports', verifyToken, async (req, res) => {
// // //   const volunteerId = Number(req.params.id);
  
// // //   if (!volunteerId) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid volunteer ID'
// // //     });
// // //   }
  
// // //   try {
// // //     if (req.user.role_id !== 3 && req.user.user_id !== volunteerId) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: You can only view your own reports'
// // //       });
// // //     }
    
// // //     const [reports] = await pool.execute(`
// // //       SELECT 
// // //         r.report_id,
// // //         r.description,
// // //         r.location_address,
// // //         r.user_note,
// // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// // //         at.type_name as animal_type,
// // //         ac.condition_name as animal_condition,
// // //         r.status_id,
// // //         u.username as reporter_name,
// // //         CAST(u.phone AS CHAR) AS reporter_phone,
// // //         u.email as reporter_email,
// // //         t.task_id,
// // //         t.status_id as task_status,
// // //         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at
// // //       FROM tasks t
// // //       INNER JOIN reports r ON t.report_id = r.report_id
// // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // //       LEFT JOIN users u ON r.user_id = u.user_id
// // //       WHERE t.assigned_to_user_id = ? 
// // //         AND t.is_deleted = 0
// // //         AND r.is_deleted = 0
// // //       ORDER BY t.assigned_at DESC
// // //     `, [volunteerId]);
    
// // //     res.json({
// // //       success: true,
// // //       data: reports,
// // //       count: reports.length
// // //     });
    
// // //   } catch (error) {
// // //     console.error('Error fetching volunteer reports:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch volunteer reports',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // =====================================================
// // // // VOLUNTEER BADGES & ACHIEVEMENTS
// // // // =====================================================

// // // router.get('/:id/badges', verifyToken, async (req, res) => {
// // //   try {
// // //     const userId = Number(req.params.id);
    
// // //     if (req.user.user_id !== userId && req.user.role_id !== 3) {
// // //       return res.status(403).json({ 
// // //         success: false, 
// // //         message: 'Forbidden' 
// // //       });
// // //     }

// // //     const [badges] = await pool.execute(`
// // //       SELECT 
// // //         bd.badge_id,
// // //         bd.badge_name,
// // //         bd.description,
// // //         CASE 
// // //           WHEN ba.award_id IS NOT NULL THEN 'unlocked'
// // //           ELSE 'locked'
// // //         END as status,
// // //         DATE_FORMAT(ba.awarded_at, '%Y-%m-%d') as awarded_at,
// // //         ba.task_id
// // //       FROM badge_definitions bd
// // //       LEFT JOIN badge_awards ba ON bd.badge_id = ba.badge_id AND ba.user_id = ?
// // //       ORDER BY 
// // //         CASE WHEN ba.award_id IS NOT NULL THEN 0 ELSE 1 END,
// // //         ba.awarded_at DESC,
// // //         bd.badge_id
// // //     `, [userId]);

// // //     const [taskCount] = await pool.execute(`
// // //       SELECT COUNT(*) as total_tasks
// // //       FROM tasks 
// // //       WHERE assigned_to_user_id = ? AND status_id = 3 AND is_deleted = 0
// // //     `, [userId]);

// // //     const [recent] = await pool.execute(`
// // //       SELECT 
// // //         bd.badge_name,
// // //         DATE_FORMAT(ba.awarded_at, '%Y-%m-%d') as awarded_at
// // //       FROM badge_awards ba
// // //       JOIN badge_definitions bd ON ba.badge_id = bd.badge_id
// // //       WHERE ba.user_id = ?
// // //       ORDER BY ba.awarded_at DESC
// // //       LIMIT 3
// // //     `, [userId]);

// // //     res.json({
// // //       success: true,
// // //       badges: badges,
// // //       total_tasks: taskCount[0]?.total_tasks || 0,
// // //       recent_badges: recent,
// // //       count: badges.filter(b => b.status === 'unlocked').length
// // //     });

// // //   } catch (err) {
// // //     console.error('GET badges error:', err);
// // //     res.status(500).json({ 
// // //       success: false, 
// // //       message: 'Failed to fetch badges' 
// // //     });
// // //   }
// // // });

// // // router.get('/:id/badge-stats', verifyToken, async (req, res) => {
// // //   try {
// // //     const userId = Number(req.params.id);
    
// // //     if (req.user.user_id !== userId && req.user.role_id !== 3) {
// // //       return res.status(403).json({ success: false, message: 'Forbidden' });
// // //     }

// // //     const [stats] = await pool.execute(`
// // //       SELECT 
// // //         bd.badge_name,
// // //         COUNT(ba.award_id) as count
// // //       FROM badge_definitions bd
// // //       LEFT JOIN badge_awards ba ON bd.badge_id = ba.badge_id AND ba.user_id = ?
// // //       GROUP BY bd.badge_id, bd.badge_name
// // //       ORDER BY bd.badge_id
// // //     `, [userId]);

// // //     res.json({
// // //       success: true,
// // //       stats: stats
// // //     });

// // //   } catch (err) {
// // //     console.error('GET badge stats error:', err);
// // //     res.status(500).json({ success: false, message: 'Failed to fetch badge stats' });
// // //   }
// // // });

// // // // =====================================================
// // // // ADMIN ASSIGNMENT & REASSIGNMENT ROUTES
// // // // =====================================================

// // // router.post('/assign', verifyToken, async (req, res) => {
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }

// // //     const { report_id, volunteer_id, status_id } = req.body;
    
// // //     if (!report_id || !volunteer_id) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Report ID and Volunteer ID are required'
// // //       });
// // //     }

// // //     await connection.beginTransaction();

// // //     console.log(`Assigning volunteer ${volunteer_id} to report ${report_id}`);
    
// // //     const [reportCheck] = await connection.execute(
// // //       'SELECT report_id, status_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// // //       [report_id]
// // //     );
    
// // //     if (reportCheck.length === 0) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Report not found'
// // //       });
// // //     }
    
// // //     const [volunteerCheck] = await connection.execute(`
// // //       SELECT u.user_id, u.username, u.email, u.phone 
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       WHERE u.user_id = ? 
// // //         AND u.role_id = 2 
// // //         AND u.is_deleted = 0
// // //         AND (vp.approval_status_id = 2 OR (vp.approval_status_id IS NULL AND u.user_id IN (2, 8)))
// // //     `, [volunteer_id]);
    
// // //     if (volunteerCheck.length === 0) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Volunteer not found, not approved, or is rejected'
// // //       });
// // //     }
    
// // //     const [existingTasks] = await connection.execute(
// // //       'SELECT task_id, assigned_to_user_id, status_id, is_deleted FROM tasks WHERE report_id = ?',
// // //       [report_id]
// // //     );
    
// // //     const taskStatus = status_id || 2;
    
// // //     if (existingTasks.length > 0) {
// // //       const existingTask = existingTasks[0];
      
// // //       if (existingTask.is_deleted === 1) {
// // //         console.log(`Reactivating soft-deleted task ${existingTask.task_id} for report ${report_id}`);
// // //         await connection.execute(
// // //           'UPDATE tasks SET assigned_to_user_id = ?, status_id = ?, assigned_at = NOW(), is_deleted = 0 WHERE task_id = ?',
// // //           [volunteer_id, taskStatus, existingTask.task_id]
// // //         );
// // //       } else {
// // //         console.log(`Updating existing task ${existingTask.task_id} for report ${report_id}`);
// // //         await connection.execute(
// // //           'UPDATE tasks SET assigned_to_user_id = ?, status_id = ?, assigned_at = NOW() WHERE task_id = ?',
// // //           [volunteer_id, taskStatus, existingTask.task_id]
// // //         );
// // //       }
// // //     } else {
// // //       console.log(`Creating new task for report ${report_id}...`);
// // //       await connection.execute(
// // //         `INSERT INTO tasks (report_id, assigned_to_user_id, assigned_by_user_id, status_id, assigned_at, is_deleted)
// // //          VALUES (?, ?, ?, ?, NOW(), 0)`,
// // //         [report_id, volunteer_id, req.user.user_id, taskStatus]
// // //       );
// // //     }
    
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = ? WHERE report_id = ?',
// // //       [taskStatus, report_id]
// // //     );

// // //     await connection.commit();
    
// // //     const volunteer = volunteerCheck[0];
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Volunteer assigned successfully',
// // //       data: {
// // //         report_id: report_id,
// // //         volunteer_id: volunteer.user_id,
// // //         volunteer_name: volunteer.username,
// // //         volunteer_email: volunteer.email,
// // //         volunteer_phone: volunteer.phone || '',
// // //         status_id: taskStatus,
// // //         timestamp: new Date().toISOString()
// // //       }
// // //     });

// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('Error assigning volunteer:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to assign volunteer',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // router.delete('/unassign/:report_id', verifyToken, async (req, res) => {
// // //   const connection = await pool.getConnection();
// // //   const reportId = Number(req.params.report_id);
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     if (!reportId) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Report ID is required'
// // //       });
// // //     }
    
// // //     await connection.beginTransaction();
    
// // //     console.log(`Unassigning volunteer from report ${reportId}`);
    
// // //     const [reportCheck] = await connection.execute(
// // //       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// // //       [reportId]
// // //     );
    
// // //     if (reportCheck.length === 0) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Report not found'
// // //       });
// // //     }
    
// // //     const [taskCheck] = await connection.execute(
// // //       'SELECT task_id FROM tasks WHERE report_id = ? AND is_deleted = 0',
// // //       [reportId]
// // //     );
    
// // //     if (taskCheck.length === 0) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'No active task found for this report'
// // //       });
// // //     }
    
// // //     await connection.execute(
// // //       'UPDATE tasks SET is_deleted = 1 WHERE report_id = ? AND is_deleted = 0',
// // //       [reportId]
// // //     );
    
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = 1 WHERE report_id = ?',
// // //       [reportId]
// // //     );
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Volunteer unassigned successfully',
// // //       data: {
// // //         report_id: reportId,
// // //         unassigned_at: new Date().toISOString()
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('Error unassigning volunteer:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to unassign volunteer',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // router.post('/force-assign', verifyToken, async (req, res) => {
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }

// // //     const { report_id, volunteer_id, status_id } = req.body;
    
// // //     if (!report_id || !volunteer_id) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Report ID and Volunteer ID are required'
// // //       });
// // //     }

// // //     await connection.beginTransaction();

// // //     console.log(`Force assigning volunteer ${volunteer_id} to report ${report_id}`);
    
// // //     const [reportCheck] = await connection.execute(
// // //       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// // //       [report_id]
// // //     );
    
// // //     if (reportCheck.length === 0) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Report not found'
// // //       });
// // //     }
    
// // //     const [volunteerCheck] = await connection.execute(`
// // //       SELECT u.user_id, u.username, u.email, u.phone 
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       WHERE u.user_id = ? 
// // //         AND u.role_id = 2 
// // //         AND u.is_deleted = 0
// // //         AND (vp.approval_status_id = 2 OR (vp.approval_status_id IS NULL AND u.user_id IN (2, 8)))
// // //     `, [volunteer_id]);
    
// // //     if (volunteerCheck.length === 0) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Volunteer not found, not approved, or is rejected'
// // //       });
// // //     }
    
// // //     await connection.execute(
// // //       'DELETE FROM tasks WHERE report_id = ?',
// // //       [report_id]
// // //     );
    
// // //     const [result] = await connection.execute(
// // //       `INSERT INTO tasks (report_id, assigned_to_user_id, assigned_by_user_id, status_id, assigned_at, is_deleted)
// // //        VALUES (?, ?, ?, ?, NOW(), 0)`,
// // //       [report_id, volunteer_id, req.user.user_id, status_id || 2]
// // //     );
    
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = ? WHERE report_id = ?',
// // //       [status_id || 2, report_id]
// // //     );

// // //     await connection.commit();
    
// // //     const volunteer = volunteerCheck[0];
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Volunteer force-assigned successfully',
// // //       data: {
// // //         report_id: report_id,
// // //         volunteer_id: volunteer.user_id,
// // //         volunteer_name: volunteer.username,
// // //         volunteer_email: volunteer.email,
// // //         volunteer_phone: volunteer.phone || '',
// // //         status_id: status_id || 2,
// // //         task_id: result.insertId
// // //       }
// // //     });

// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('Error force assigning volunteer:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to assign volunteer',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // router.get('/available-for-reassignment/:reportId', verifyToken, async (req, res) => {
// // //   const reportId = Number(req.params.reportId);
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     const [volunteers] = await pool.execute(`
// // //       SELECT 
// // //         u.user_id,
// // //         u.username,
// // //         u.email,
// // //         COALESCE(CAST(u.phone AS CHAR), '') as phone,
// // //         vp.availability_status_id,
// // //         a.status_name as availability_status,
// // //         COALESCE(vp.has_car, 0) as has_car,
// // //         COALESCE(vp.can_foster, 0) as can_foster,
// // //         COALESCE(vp.animal_handling, '') as animal_handling,
// // //         COALESCE(vp.city, '') as city,
// // //         (
// // //           SELECT COUNT(*) 
// // //           FROM tasks t
// // //           WHERE t.assigned_to_user_id = u.user_id 
// // //           AND t.status_id = 2
// // //           AND t.is_deleted = 0
// // //         ) as active_tasks_count
// // //       FROM users u
// // //       INNER JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       INNER JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// // //       WHERE u.role_id = 2
// // //         AND u.is_deleted = 0
// // //         AND vp.approval_status_id = 2
// // //         AND vp.availability_status_id = 1
// // //         AND u.user_id NOT IN (
// // //           SELECT assigned_to_user_id 
// // //           FROM tasks 
// // //           WHERE report_id = ? AND is_deleted = 0
// // //         )
// // //       ORDER BY active_tasks_count ASC, u.username ASC
// // //     `, [reportId]);
    
// // //     res.json({
// // //       success: true,
// // //       data: volunteers,
// // //       count: volunteers.length,
// // //       report_id: reportId
// // //     });
    
// // //   } catch (error) {
// // //     console.error('Error fetching available volunteers:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch available volunteers',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // router.post('/reassign', verifyToken, async (req, res) => {
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }

// // //     const { task_id, new_volunteer_id, report_id } = req.body;
    
// // //     if ((!task_id && !report_id) || !new_volunteer_id) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Task ID or Report ID and New Volunteer ID are required'
// // //       });
// // //     }

// // //     await connection.beginTransaction();
    
// // //     let actualTaskId = task_id;
// // //     if (!actualTaskId && report_id) {
// // //       const [tasks] = await connection.execute(
// // //         'SELECT task_id, assigned_to_user_id FROM tasks WHERE report_id = ? AND is_deleted = 0 ORDER BY task_id DESC LIMIT 1',
// // //         [report_id]
// // //       );
// // //       if (tasks.length > 0) {
// // //         actualTaskId = tasks[0].task_id;
// // //       }
// // //     }
    
// // //     if (!actualTaskId) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'No active task found for reassignment'
// // //       });
// // //     }
    
// // //     const [oldTasks] = await connection.execute(
// // //       'SELECT * FROM tasks WHERE task_id = ?',
// // //       [actualTaskId]
// // //     );
    
// // //     if (oldTasks.length === 0) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Task not found'
// // //       });
// // //     }
    
// // //     const oldTask = oldTasks[0];
    
// // //     await connection.execute(
// // //       'UPDATE tasks SET is_deleted = 1, status_id = 4 WHERE task_id = ?',
// // //       [actualTaskId]
// // //     );
    
// // //     const [result] = await connection.execute(
// // //       `INSERT INTO tasks 
// // //        (report_id, assigned_to_user_id, assigned_by_user_id, status_id, assigned_at, is_deleted)
// // //        VALUES (?, ?, ?, 1, NOW(), 0)`,
// // //       [oldTask.report_id, new_volunteer_id, req.user.user_id]
// // //     );
    
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = 2 WHERE report_id = ?',
// // //       [oldTask.report_id]
// // //     );
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Task reassigned successfully',
// // //       data: {
// // //         old_task_id: actualTaskId,
// // //         new_task_id: result.insertId,
// // //         new_volunteer_id: new_volunteer_id,
// // //         reassigned_at: new Date().toISOString()
// // //       }
// // //     });

// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('Error reassigning volunteer:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to reassign volunteer',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // router.get('/declined-tasks', verifyToken, async (req, res) => {
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     const [tasks] = await pool.execute(`
// // //       SELECT 
// // //         t.task_id,
// // //         t.report_id,
// // //         t.assigned_to_user_id,
// // //         t.assigned_by_user_id,
// // //         t.status_id,
// // //         ts.status_name as task_status,
// // //         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
// // //         DATE_FORMAT(t.volunteer_responded_at, '%Y-%m-%d %H:%i:%s') as responded_at,
// // //         t.volunteer_response,
// // //         t.declined_reason,
// // //         vu.username as volunteer_name,
// // //         r.report_id,
// // //         r.description,
// // //         r.location_address,
// // //         at.type_name as animal_type,
// // //         ac.condition_name as animal_condition,
// // //         ru.username as reporter_name
// // //       FROM tasks t
// // //       INNER JOIN reports r ON t.report_id = r.report_id
// // //       LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
// // //       LEFT JOIN users vu ON t.assigned_to_user_id = vu.user_id
// // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // //       LEFT JOIN users ru ON r.user_id = ru.user_id
// // //       WHERE t.status_id = 4
// // //         AND t.is_deleted = 0
// // //         AND r.is_deleted = 0
// // //       ORDER BY t.volunteer_responded_at DESC
// // //     `);
    
// // //     res.json({
// // //       success: true,
// // //       data: tasks,
// // //       count: tasks.length
// // //     });
    
// // //   } catch (error) {
// // //     console.error('Error fetching declined tasks:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch declined tasks',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // router.get('/report/:report_id/task', verifyToken, async (req, res) => {
// // //   const reportId = Number(req.params.report_id);
  
// // //   if (!reportId) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Report ID is required'
// // //     });
// // //   }
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     const [tasks] = await pool.execute(`
// // //       SELECT 
// // //         t.task_id,
// // //         t.report_id,
// // //         t.assigned_to_user_id,
// // //         t.assigned_by_user_id,
// // //         t.status_id,
// // //         ts.status_name as task_status,
// // //         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
// // //         t.started_at,
// // //         t.completed_at,
// // //         t.is_deleted,
// // //         u.username as volunteer_name,
// // //         u.email as volunteer_email,
// // //         u2.username as assigned_by_name,
// // //         r.status_id as report_status
// // //       FROM tasks t
// // //       LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
// // //       LEFT JOIN users u ON t.assigned_to_user_id = u.user_id
// // //       LEFT JOIN users u2 ON t.assigned_by_user_id = u2.user_id
// // //       LEFT JOIN reports r ON t.report_id = r.report_id
// // //       WHERE t.report_id = ?
// // //       ORDER BY t.assigned_at DESC
// // //       LIMIT 1
// // //     `, [reportId]);
    
// // //     if (tasks.length === 0) {
// // //       return res.json({
// // //         success: true,
// // //         data: null,
// // //         message: 'No task found for this report'
// // //       });
// // //     }
    
// // //     res.json({
// // //       success: true,
// // //       data: tasks[0],
// // //       message: 'Task found'
// // //     });
    
// // //   } catch (error) {
// // //     console.error('Error fetching task:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch task',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // =====================================================
// // // // ADMIN FIX UTILITIES
// // // // =====================================================

// // // router.post('/fix-task/:task_id', verifyToken, async (req, res) => {
// // //   const connection = await pool.getConnection();
// // //   const taskId = Number(req.params.task_id);
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     if (!taskId) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Task ID is required'
// // //       });
// // //     }
    
// // //     await connection.beginTransaction();
    
// // //     const [tasks] = await connection.execute(
// // //       'SELECT * FROM tasks WHERE task_id = ?',
// // //       [taskId]
// // //     );
    
// // //     if (tasks.length === 0) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Task not found'
// // //       });
// // //     }
    
// // //     const task = tasks[0];
// // //     const fixes = [];
    
// // //     if (task.is_deleted === 1 && task.status_id === 2) {
// // //       await connection.execute(
// // //         'UPDATE tasks SET status_id = 1 WHERE task_id = ?',
// // //         [taskId]
// // //       );
// // //       fixes.push(`status ${task.status_id} -> 1 (deleted)`);
// // //     }
    
// // //     if (task.completed_at && task.status_id !== 3) {
// // //       await connection.execute(
// // //         'UPDATE tasks SET status_id = 3 WHERE task_id = ?',
// // //         [taskId]
// // //       );
// // //       fixes.push(`status ${task.status_id} -> 3 (completed)`);
// // //     }
    
// // //     if (fixes.length === 0) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.json({
// // //         success: true,
// // //         message: 'Task is already in consistent state',
// // //         data: task
// // //       });
// // //     }
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: `Task fixed: ${fixes.join(', ')}`,
// // //       data: {
// // //         task_id: taskId,
// // //         fixes: fixes
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('Error fixing task:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fix task',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // router.post('/fix-report/:report_id', verifyToken, async (req, res) => {
// // //   const connection = await pool.getConnection();
// // //   const reportId = Number(req.params.report_id);
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     if (!reportId) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Report ID is required'
// // //       });
// // //     }
    
// // //     await connection.beginTransaction();
    
// // //     console.log(`Fixing report ${reportId} tasks...`);
    
// // //     const [tasks] = await connection.execute(
// // //       'SELECT * FROM tasks WHERE report_id = ? ORDER BY task_id DESC',
// // //       [reportId]
// // //     );
    
// // //     if (tasks.length === 0) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'No tasks found for this report'
// // //       });
// // //     }
    
// // //     const fixes = [];
    
// // //     for (const task of tasks) {
// // //       if (task.is_deleted === 1 && task.status_id >= 2) {
// // //         await connection.execute(
// // //           'UPDATE tasks SET status_id = 1 WHERE task_id = ?',
// // //           [task.task_id]
// // //         );
// // //         fixes.push({
// // //           task_id: task.task_id,
// // //           change: `status ${task.status_id} -> 1 (deleted)`
// // //         });
// // //       }
      
// // //       if (task.completed_at && task.status_id !== 3) {
// // //         await connection.execute(
// // //           'UPDATE tasks SET status_id = 3 WHERE task_id = ?',
// // //           [task.task_id]
// // //         );
// // //         fixes.push({
// // //           task_id: task.task_id,
// // //           change: `status ${task.status_id} -> 3 (completed)`
// // //         });
// // //       }
// // //     }
    
// // //     const latestTask = tasks[0];
// // //     let reportStatus = 1;
    
// // //     if (latestTask.is_deleted === 0) {
// // //       if (latestTask.status_id === 2) reportStatus = 3;
// // //       else if (latestTask.status_id === 3) reportStatus = 4;
// // //       else if (latestTask.status_id === 4) reportStatus = 1;
// // //       else reportStatus = latestTask.status_id;
// // //     }
    
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = ? WHERE report_id = ?',
// // //       [reportStatus, reportId]
// // //     );
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: `Fixed ${fixes.length} issues for report ${reportId}`,
// // //       fixes: fixes,
// // //       data: {
// // //         report_id: reportId,
// // //         report_status: reportStatus,
// // //         tasks_fixed: fixes.length
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('Error fixing report:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fix report',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // module.exports = router;


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

// // // console.log('Volunteer routes initialized');

// // // // =====================================================
// // // // ADMIN ROUTES - Volunteer Management
// // // // =====================================================

// // // // Get ALL volunteers (for admin assignment) - SHOW ONLY APPROVED VOLUNTEERS
// // // router.get('/available', verifyToken, async (req, res) => {
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }

// // //     console.log('Fetching APPROVED volunteers for assignment...');
    
// // //     const [volunteers] = await pool.execute(`
// // //       SELECT 
// // //         u.user_id,
// // //         u.username,
// // //         u.email,
// // //         COALESCE(CAST(u.phone AS CHAR), '') as phone,
// // //         u.bio,
// // //         u.created_at,
// // //         u.role_id,
// // //         COALESCE(vp.joined_at, u.created_at) as joined_at,
// // //         COALESCE(vp.approval_status_id, 2) as approval_status_id,
// // //         CASE 
// // //           WHEN vp.approval_status_id = 1 THEN 'Pending'
// // //           WHEN vp.approval_status_id = 2 THEN 'Approved'
// // //           WHEN vp.approval_status_id = 3 THEN 'Rejected'
// // //           ELSE 'Approved'
// // //         END as approval_status,
// // //         COALESCE(vp.availability_status_id, 1) as availability_status_id,
// // //         a.status_name as availability_status,
// // //         COALESCE(vp.has_car, 0) as has_car,
// // //         COALESCE(vp.can_foster, 0) as can_foster,
// // //         COALESCE(vp.animal_handling, '') as animal_handling,
// // //         COALESCE(vp.city, '') as city,
// // //         vp.badges,
// // //         (
// // //           SELECT COUNT(*) 
// // //           FROM tasks t
// // //           WHERE t.assigned_to_user_id = u.user_id 
// // //           AND t.status_id = 2
// // //           AND t.is_deleted = 0
// // //         ) as assigned_reports_count
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// // //       WHERE u.role_id = 2
// // //         AND u.is_deleted = 0
// // //         AND (vp.approval_status_id = 2 OR (vp.approval_status_id IS NULL AND u.user_id IN (2, 8)))
// // //       ORDER BY u.username ASC
// // //     `);

// // //     console.log(`Found ${volunteers.length} APPROVED volunteers for assignment`);
    
// // //     res.json({
// // //       success: true,
// // //       data: volunteers,
// // //       count: volunteers.length
// // //     });

// // //   } catch (error) {
// // //     console.error('Error fetching volunteers:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch volunteers',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // Get only APPROVED volunteers - Alternative endpoint
// // // router.get('/approved', verifyToken, async (req, res) => {
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }

// // //     console.log('Fetching APPROVED volunteers only...');
    
// // //     const [volunteers] = await pool.execute(`
// // //       SELECT 
// // //         u.user_id,
// // //         u.username,
// // //         u.email,
// // //         COALESCE(CAST(u.phone AS CHAR), '') as phone,
// // //         u.bio,
// // //         u.created_at,
// // //         u.role_id,
// // //         COALESCE(vp.joined_at, u.created_at) as joined_at,
// // //         vp.approval_status_id,
// // //         'Approved' as approval_status,
// // //         COALESCE(vp.availability_status_id, 1) as availability_status_id,
// // //         a.status_name as availability_status,
// // //         COALESCE(vp.has_car, 0) as has_car,
// // //         COALESCE(vp.can_foster, 0) as can_foster,
// // //         COALESCE(vp.animal_handling, '') as animal_handling,
// // //         COALESCE(vp.city, '') as city,
// // //         vp.badges,
// // //         (
// // //           SELECT COUNT(*) 
// // //           FROM tasks t
// // //           WHERE t.assigned_to_user_id = u.user_id 
// // //           AND t.status_id = 2
// // //           AND t.is_deleted = 0
// // //         ) as assigned_reports_count
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// // //       WHERE u.role_id = 2
// // //         AND u.is_deleted = 0
// // //         AND vp.approval_status_id = 2
// // //       ORDER BY u.username ASC
// // //     `);

// // //     console.log(`Found ${volunteers.length} APPROVED volunteers`);
    
// // //     res.json({
// // //       success: true,
// // //       data: volunteers,
// // //       count: volunteers.length
// // //     });

// // //   } catch (error) {
// // //     console.error('Error fetching approved volunteers:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch approved volunteers',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // Get all volunteers with detailed info (for admin management)
// // // router.get('/admin/all', verifyToken, async (req, res) => {
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }

// // //     console.log('Fetching ALL volunteers for admin...');
    
// // //     const [volunteers] = await pool.execute(`
// // //       SELECT 
// // //         u.user_id,
// // //         u.username,
// // //         u.email,
// // //         COALESCE(CAST(u.phone AS CHAR), '') as phone,
// // //         u.bio,
// // //         u.profile_image_url,
// // //         u.created_at,
// // //         u.role_id,
// // //         COALESCE(vp.joined_at, u.created_at) as joined_at,
// // //         COALESCE(vp.approval_status_id, 2) as approval_status_id,
// // //         CASE 
// // //           WHEN vp.approval_status_id = 1 THEN 'Pending'
// // //           WHEN vp.approval_status_id = 2 THEN 'Approved'
// // //           WHEN vp.approval_status_id = 3 THEN 'Rejected'
// // //           ELSE 'Approved'
// // //         END as approval_status,
// // //         COALESCE(vp.availability_status_id, 1) as availability_status_id,
// // //         a.status_name as availability_status,
// // //         COALESCE(vp.has_car, 0) as has_car,
// // //         COALESCE(vp.can_foster, 0) as can_foster,
// // //         COALESCE(vp.animal_handling, '') as animal_handling,
// // //         COALESCE(vp.city, '') as city,
// // //         vp.badges,
// // //         (
// // //           SELECT COUNT(*) 
// // //           FROM tasks t
// // //           WHERE t.assigned_to_user_id = u.user_id 
// // //           AND t.is_deleted = 0
// // //         ) as total_assigned_reports,
// // //         (
// // //           SELECT COUNT(*) 
// // //           FROM tasks t
// // //           INNER JOIN reports r ON t.report_id = r.report_id
// // //           WHERE t.assigned_to_user_id = u.user_id 
// // //           AND r.status_id = 4
// // //           AND t.is_deleted = 0
// // //           AND r.is_deleted = 0
// // //         ) as completed_reports,
// // //         (
// // //           SELECT COUNT(*) 
// // //           FROM tasks t
// // //           WHERE t.assigned_to_user_id = u.user_id 
// // //           AND t.status_id = 2
// // //           AND t.is_deleted = 0
// // //         ) as active_reports
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// // //       WHERE u.role_id = 2
// // //         AND u.is_deleted = 0
// // //       ORDER BY 
// // //         CASE WHEN COALESCE(vp.approval_status_id, 2) = 2 THEN 1 ELSE 2 END,
// // //         u.username ASC
// // //     `);

// // //     console.log(`Found ${volunteers.length} volunteers for admin`);
    
// // //     res.json({
// // //       success: true,
// // //       data: volunteers,
// // //       count: volunteers.length
// // //     });

// // //   } catch (error) {
// // //     console.error('Error fetching all volunteers:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch volunteers',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // Update volunteer approval status
// // // router.patch('/:id/approval', verifyToken, async (req, res) => {
// // //   const volunteerId = Number(req.params.id);
// // //   const { approval_status_id } = req.body;
  
// // //   if (!volunteerId) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid volunteer ID'
// // //     });
// // //   }
  
// // //   if (!approval_status_id || (approval_status_id < 1 || approval_status_id > 3)) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid approval status ID. Must be 1 (Pending), 2 (Approved), or 3 (Rejected)'
// // //     });
// // //   }
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     const [volunteerCheck] = await pool.execute(
// // //       'SELECT user_id FROM users WHERE user_id = ? AND role_id = 2 AND is_deleted = 0',
// // //       [volunteerId]
// // //     );
    
// // //     if (volunteerCheck.length === 0) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Volunteer not found'
// // //       });
// // //     }
    
// // //     const [profileCheck] = await pool.execute(
// // //       'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
// // //       [volunteerId]
// // //     );
    
// // //     if (profileCheck.length === 0) {
// // //       await pool.execute(
// // //         `INSERT INTO volunteer_profiles (user_id, approval_status_id, availability_status_id, joined_at, has_car, can_foster, animal_handling, city)
// // //          VALUES (?, ?, 1, NOW(), 0, 0, '', '')`,
// // //         [volunteerId, approval_status_id]
// // //       );
// // //     } else {
// // //       await pool.execute(
// // //         'UPDATE volunteer_profiles SET approval_status_id = ? WHERE user_id = ?',
// // //         [approval_status_id, volunteerId]
// // //       );
// // //     }
    
// // //     const [updatedVolunteer] = await pool.execute(`
// // //       SELECT 
// // //         u.user_id,
// // //         u.username,
// // //         u.email,
// // //         COALESCE(CAST(u.phone AS CHAR), '') as phone,
// // //         COALESCE(vp.approval_status_id, 2) as approval_status_id,
// // //         CASE 
// // //           WHEN vp.approval_status_id = 1 THEN 'Pending'
// // //           WHEN vp.approval_status_id = 2 THEN 'Approved'
// // //           WHEN vp.approval_status_id = 3 THEN 'Rejected'
// // //           ELSE 'Approved'
// // //         END as approval_status,
// // //         COALESCE(vp.has_car, 0) as has_car,
// // //         COALESCE(vp.can_foster, 0) as can_foster,
// // //         COALESCE(vp.animal_handling, '') as animal_handling,
// // //         COALESCE(vp.city, '') as city,
// // //         vp.badges
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       WHERE u.user_id = ?
// // //     `, [volunteerId]);
    
// // //     res.json({
// // //       success: true,
// // //       message: `Volunteer approval status updated to ${updatedVolunteer[0].approval_status}`,
// // //       data: updatedVolunteer[0]
// // //     });
    
// // //   } catch (error) {
// // //     console.error('Error updating volunteer approval:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to update volunteer approval status',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // =====================================================
// // // // VOLUNTEER AVAILABILITY STATUSES
// // // // =====================================================

// // // // Get all availability statuses for dropdowns
// // // router.get('/availability-statuses', verifyToken, async (req, res) => {
// // //   try {
// // //     const [statuses] = await pool.execute(`
// // //       SELECT 
// // //         status_id, 
// // //         status_name
// // //       FROM availability_statuses 
// // //       ORDER BY status_id
// // //     `);
    
// // //     res.json({
// // //       success: true,
// // //       data: statuses
// // //     });
    
// // //   } catch (error) {
// // //     console.error('Error fetching availability statuses:', error);
// // //     const fallbackStatuses = [
// // //       { status_id: 1, status_name: 'available' },
// // //       { status_id: 2, status_name: 'unavailable' }
// // //     ];
// // //     res.json({
// // //       success: true,
// // //       data: fallbackStatuses,
// // //       message: 'Using fallback data'
// // //     });
// // //   }
// // // });

// // // // Get volunteer's own availability
// // // router.get('/availability', verifyToken, async (req, res) => {
// // //   const volunteerId = req.user.user_id;
  
// // //   try {
// // //     if (req.user.role_id !== 2) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Volunteer access required'
// // //       });
// // //     }
    
// // //     const [profiles] = await pool.execute(`
// // //       SELECT 
// // //         u.user_id,
// // //         u.username,
// // //         COALESCE(vp.availability_status_id, 1) as availability_status_id,
// // //         a.status_name as availability_status,
// // //         DATE_FORMAT(vp.availability_updated_at, '%Y-%m-%d %H:%i:%s') as availability_updated_at,
// // //         COALESCE(vp.approval_status_id, 2) as approval_status_id,
// // //         COALESCE(vp.has_car, 0) as has_car,
// // //         COALESCE(vp.can_foster, 0) as can_foster,
// // //         COALESCE(vp.animal_handling, '') as animal_handling,
// // //         COALESCE(vp.city, '') as city,
// // //         vp.badges,
// // //         (
// // //           SELECT COUNT(*) 
// // //           FROM tasks t
// // //           WHERE t.assigned_to_user_id = u.user_id 
// // //           AND t.status_id = 2
// // //           AND t.is_deleted = 0
// // //         ) as active_tasks_count
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// // //       WHERE u.user_id = ? AND u.role_id = 2
// // //     `, [volunteerId]);
    
// // //     if (profiles.length === 0) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Volunteer profile not found'
// // //       });
// // //     }
    
// // //     res.json({
// // //       success: true,
// // //       data: profiles[0]
// // //     });
    
// // //   } catch (error) {
// // //     console.error('Error fetching volunteer availability:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch availability',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // Update volunteer's own availability (SELF-SERVICE)
// // // router.patch('/availability', verifyToken, async (req, res) => {
// // //   const volunteerId = req.user.user_id;
// // //   const { availability_status_id } = req.body;
  
// // //   if (!availability_status_id || (availability_status_id < 1 || availability_status_id > 2)) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid availability status ID. Must be 1 (available) or 2 (unavailable)'
// // //     });
// // //   }
  
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     await connection.beginTransaction();
    
// // //     if (req.user.role_id !== 2) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Volunteer access required'
// // //       });
// // //     }
    
// // //     const [profileCheck] = await connection.execute(
// // //       'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
// // //       [volunteerId]
// // //     );
    
// // //     if (profileCheck.length === 0) {
// // //       await connection.execute(
// // //         `INSERT INTO volunteer_profiles 
// // //          (user_id, approval_status_id, availability_status_id, availability_updated_at, joined_at, has_car, can_foster, animal_handling, city)
// // //          VALUES (?, 2, ?, NOW(), NOW(), 0, 0, '', '')`,
// // //         [volunteerId, availability_status_id]
// // //       );
// // //     } else {
// // //       await connection.execute(
// // //         `UPDATE volunteer_profiles 
// // //          SET availability_status_id = ?, 
// // //              availability_updated_at = NOW() 
// // //          WHERE user_id = ?`,
// // //         [availability_status_id, volunteerId]
// // //       );
// // //     }
    
// // //     await connection.commit();
    
// // //     const [statuses] = await pool.execute(
// // //       'SELECT status_name FROM availability_statuses WHERE status_id = ?',
// // //       [availability_status_id]
// // //     );
    
// // //     const statusName = statuses[0]?.status_name || (availability_status_id === 1 ? 'available' : 'unavailable');
    
// // //     res.json({
// // //       success: true,
// // //       message: `Availability updated to ${statusName}`,
// // //       data: {
// // //         user_id: volunteerId,
// // //         availability_status_id: availability_status_id,
// // //         availability_status: statusName,
// // //         updated_at: new Date().toISOString()
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('Error updating volunteer availability:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to update availability',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // // Update volunteer availability status (Admin or Self)
// // // router.patch('/:id/availability', verifyToken, async (req, res) => {
// // //   const volunteerId = Number(req.params.id);
// // //   const { availability_status_id } = req.body;
  
// // //   if (!volunteerId) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid volunteer ID'
// // //     });
// // //   }
  
// // //   if (!availability_status_id || (availability_status_id < 1 || availability_status_id > 2)) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid availability status ID. Must be 1 (available) or 2 (unavailable)'
// // //     });
// // //   }
  
// // //   try {
// // //     if (req.user.role_id !== 3 && req.user.user_id !== volunteerId) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: You can only update your own availability'
// // //       });
// // //     }
    
// // //     const [volunteerCheck] = await pool.execute(
// // //       'SELECT user_id FROM users WHERE user_id = ? AND role_id = 2 AND is_deleted = 0',
// // //       [volunteerId]
// // //     );
    
// // //     if (volunteerCheck.length === 0) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Volunteer not found'
// // //       });
// // //     }
    
// // //     const [profileCheck] = await pool.execute(
// // //       'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
// // //       [volunteerId]
// // //     );
    
// // //     if (profileCheck.length === 0) {
// // //       await pool.execute(
// // //         `INSERT INTO volunteer_profiles (user_id, approval_status_id, availability_status_id, joined_at, has_car, can_foster, animal_handling, city)
// // //          VALUES (?, 2, ?, NOW(), 0, 0, '', '')`,
// // //         [volunteerId, availability_status_id]
// // //       );
// // //     } else {
// // //       await pool.execute(
// // //         'UPDATE volunteer_profiles SET availability_status_id = ?, availability_updated_at = NOW() WHERE user_id = ?',
// // //         [availability_status_id, volunteerId]
// // //       );
// // //     }
    
// // //     const [statuses] = await pool.execute(
// // //       'SELECT status_name FROM availability_statuses WHERE status_id = ?',
// // //       [availability_status_id]
// // //     );
    
// // //     const statusName = statuses[0]?.status_name || (availability_status_id === 1 ? 'available' : 'unavailable');
    
// // //     const [updatedVolunteer] = await pool.execute(`
// // //       SELECT 
// // //         u.user_id,
// // //         u.username,
// // //         COALESCE(vp.availability_status_id, 1) as availability_status_id,
// // //         a.status_name as availability_status,
// // //         COALESCE(vp.has_car, 0) as has_car,
// // //         COALESCE(vp.can_foster, 0) as can_foster,
// // //         COALESCE(vp.animal_handling, '') as animal_handling,
// // //         COALESCE(vp.city, '') as city,
// // //         vp.badges
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// // //       WHERE u.user_id = ?
// // //     `, [volunteerId]);
    
// // //     res.json({
// // //       success: true,
// // //       message: `Volunteer availability updated to ${statusName}`,
// // //       data: updatedVolunteer[0]
// // //     });
    
// // //   } catch (error) {
// // //     console.error('Error updating volunteer availability:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to update volunteer availability',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // =====================================================
// // // // VOLUNTEER TASK MANAGEMENT
// // // // =====================================================

// // // // Get all tasks for current volunteer
// // // router.get('/tasks', verifyToken, async (req, res) => {
// // //   const volunteerId = req.user.user_id;
  
// // //   try {
// // //     if (req.user.role_id !== 2) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Volunteer access required'
// // //       });
// // //     }
    
// // //     console.log(`Fetching tasks for volunteer: ${volunteerId}`);
    
// // //     const [tasks] = await pool.execute(`
// // //       SELECT 
// // //         t.task_id,
// // //         t.report_id,
// // //         t.assigned_to_user_id,
// // //         t.assigned_by_user_id,
// // //         t.status_id as task_status_id,
// // //         ts.status_name as task_status,
// // //         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
// // //         DATE_FORMAT(t.volunteer_responded_at, '%Y-%m-%d %H:%i:%s') as responded_at,
// // //         t.volunteer_response,
// // //         t.declined_reason,
// // //         DATE_FORMAT(t.started_at, '%Y-%m-%d %H:%i:%s') as started_at,
// // //         DATE_FORMAT(t.completed_at, '%Y-%m-%d %H:%i:%s') as completed_at,
// // //         r.report_id,
// // //         r.description,
// // //         r.location_address,
// // //         r.user_note,
// // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as report_submitted_at,
// // //         at.type_name as animal_type,
// // //         ac.condition_name as animal_condition,
// // //         r.status_id as report_status_id,
// // //         rs.status_name as report_status,
// // //         u.username as reporter_name,
// // //         CAST(u.phone AS CHAR) AS reporter_phone,
// // //         u.email as reporter_email,
// // //         au.username as assigned_by_name
// // //       FROM tasks t
// // //       INNER JOIN reports r ON t.report_id = r.report_id
// // //       LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
// // //       LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
// // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // //       LEFT JOIN users u ON r.user_id = u.user_id
// // //       LEFT JOIN users au ON t.assigned_by_user_id = au.user_id
// // //       WHERE t.assigned_to_user_id = ? 
// // //         AND t.is_deleted = 0
// // //         AND r.is_deleted = 0
// // //       ORDER BY 
// // //         CASE 
// // //           WHEN t.status_id = 1 THEN 1
// // //           WHEN t.status_id = 2 THEN 2
// // //           WHEN t.status_id = 4 THEN 3
// // //           WHEN t.status_id = 3 THEN 4
// // //         END,
// // //         t.assigned_at DESC
// // //     `, [volunteerId]);
    
// // //     const groupedTasks = {
// // //       assigned: tasks.filter(t => t.task_status_id === 1),
// // //       inProgress: tasks.filter(t => t.task_status_id === 2),
// // //       completed: tasks.filter(t => t.task_status_id === 3),
// // //       declined: tasks.filter(t => t.task_status_id === 4)
// // //     };
    
// // //     res.json({
// // //       success: true,
// // //       data: tasks,
// // //       grouped: groupedTasks,
// // //       counts: {
// // //         total: tasks.length,
// // //         assigned: groupedTasks.assigned.length,
// // //         inProgress: groupedTasks.inProgress.length,
// // //         completed: groupedTasks.completed.length,
// // //         declined: groupedTasks.declined.length
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     console.error('Error fetching volunteer tasks:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch tasks',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // Get single task details
// // // router.get('/tasks/:taskId', verifyToken, async (req, res) => {
// // //   const taskId = Number(req.params.taskId);
// // //   const volunteerId = req.user.user_id;
  
// // //   if (!taskId) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid task ID'
// // //     });
// // //   }
  
// // //   try {
// // //     if (req.user.role_id !== 2) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Volunteer access required'
// // //       });
// // //     }
    
// // //     const [tasks] = await pool.execute(`
// // //       SELECT 
// // //         t.*,
// // //         ts.status_name as task_status,
// // //         r.*,
// // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as report_submitted_at,
// // //         at.type_name as animal_type,
// // //         ac.condition_name as animal_condition,
// // //         rs.status_name as report_status,
// // //         u.username as reporter_name,
// // //         CAST(u.phone AS CHAR) AS reporter_phone,
// // //         u.email as reporter_email,
// // //         au.username as assigned_by_name
// // //       FROM tasks t
// // //       INNER JOIN reports r ON t.report_id = r.report_id
// // //       LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
// // //       LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
// // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // //       LEFT JOIN users u ON r.user_id = u.user_id
// // //       LEFT JOIN users au ON t.assigned_by_user_id = au.user_id
// // //       WHERE t.task_id = ? 
// // //         AND t.assigned_to_user_id = ?
// // //         AND t.is_deleted = 0
// // //         AND r.is_deleted = 0
// // //     `, [taskId, volunteerId]);
    
// // //     if (tasks.length === 0) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Task not found or not assigned to you'
// // //       });
// // //     }
    
// // //     res.json({
// // //       success: true,
// // //       data: tasks[0]
// // //     });
    
// // //   } catch (error) {
// // //     console.error('Error fetching task:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch task',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // Accept a task (auto-sets to in_progress and updates availability)
// // // router.patch('/tasks/:taskId/accept', verifyToken, async (req, res) => {
// // //   const taskId = Number(req.params.taskId);
// // //   const volunteerId = req.user.user_id;
  
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     await connection.beginTransaction();
    
// // //     if (req.user.role_id !== 2) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Volunteer access required'
// // //       });
// // //     }
    
// // //     const [tasks] = await connection.execute(
// // //       `SELECT t.task_id, t.report_id, t.status_id, r.status_id as report_status_id
// // //        FROM tasks t
// // //        INNER JOIN reports r ON t.report_id = r.report_id
// // //        WHERE t.task_id = ? AND t.assigned_to_user_id = ? AND t.is_deleted = 0`,
// // //       [taskId, volunteerId]
// // //     );
    
// // //     if (tasks.length === 0) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Task not found or not assigned to you'
// // //       });
// // //     }
    
// // //     const task = tasks[0];
    
// // //     if (task.status_id !== 1) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'This task cannot be accepted'
// // //       });
// // //     }
    
// // //     // Update task to in_progress (status_id = 2)
// // //     await connection.execute(
// // //       `UPDATE tasks 
// // //        SET status_id = 2, 
// // //            volunteer_responded_at = NOW(), 
// // //            volunteer_response = 'accepted',
// // //            started_at = NOW()
// // //        WHERE task_id = ?`,
// // //       [taskId]
// // //     );
    
// // //     // Update report status to in_progress (status_id = 3)
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = 3 WHERE report_id = ?',
// // //       [task.report_id]
// // //     );
    
// // //     // AUTO-UPDATE AVAILABILITY - Check if this is their first active task
// // //     const [activeTasks] = await connection.execute(
// // //       `SELECT COUNT(*) as count 
// // //        FROM tasks 
// // //        WHERE assigned_to_user_id = ? 
// // //          AND status_id = 2
// // //          AND is_deleted = 0`,
// // //       [volunteerId]
// // //     );
    
// // //     let availabilityUpdated = false;
// // //     if (activeTasks[0].count === 1) {
// // //       await connection.execute(
// // //         `UPDATE volunteer_profiles 
// // //          SET availability_status_id = 2,
// // //              availability_updated_at = NOW() 
// // //          WHERE user_id = ?`,
// // //         [volunteerId]
// // //       );
// // //       availabilityUpdated = true;
// // //       console.log(`Auto-set volunteer ${volunteerId} to unavailable`);
// // //     }
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Task accepted successfully',
// // //       data: {
// // //         task_id: taskId,
// // //         status: 'in_progress',
// // //         status_id: 2,
// // //         accepted_at: new Date().toISOString(),
// // //         availability_auto_updated: availabilityUpdated
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('Error accepting task:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to accept task',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // // =====================================================
// // // // FIXED: Decline a task - Now updates report to DECLINED (status_id = 5)
// // // // =====================================================
// // // router.patch('/tasks/:taskId/decline', verifyToken, async (req, res) => {
// // //   const taskId = Number(req.params.taskId);
// // //   const volunteerId = req.user.user_id;
// // //   const { reason } = req.body;
  
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     await connection.beginTransaction();
    
// // //     if (req.user.role_id !== 2) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Volunteer access required'
// // //       });
// // //     }
    
// // //     const [tasks] = await connection.execute(
// // //       `SELECT t.task_id, t.report_id, t.status_id
// // //        FROM tasks t
// // //        WHERE t.task_id = ? AND t.assigned_to_user_id = ? AND t.is_deleted = 0`,
// // //       [taskId, volunteerId]
// // //     );
    
// // //     if (tasks.length === 0) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Task not found or not assigned to you'
// // //       });
// // //     }
    
// // //     const task = tasks[0];
    
// // //     if (task.status_id !== 1) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'This task cannot be declined'
// // //       });
// // //     }
    
// // //     // Update task to declined (status_id = 4)
// // //     await connection.execute(
// // //       `UPDATE tasks 
// // //        SET status_id = 4, 
// // //            volunteer_responded_at = NOW(), 
// // //            volunteer_response = 'declined',
// // //            declined_reason = ?
// // //        WHERE task_id = ?`,
// // //       [reason || 'No reason provided', taskId]
// // //     );
    
// // //     // FIXED: Update report status to DECLINED (status_id = 5) - not back to submitted
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = 5 WHERE report_id = ?',
// // //       [task.report_id]
// // //     );
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Task declined successfully',
// // //       data: {
// // //         task_id: taskId,
// // //         status: 'declined',
// // //         status_id: 4,
// // //         declined_at: new Date().toISOString(),
// // //         reason: reason || 'No reason provided'
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('Error declining task:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to decline task',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // // =====================================================
// // // // ✅ FIXED: Complete a task WITH BADGE AWARDING LOGIC
// // // // =====================================================
// // // router.patch('/tasks/:taskId/complete', verifyToken, async (req, res) => {
// // //   const taskId = Number(req.params.taskId);
// // //   const volunteerId = req.user.user_id;
  
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     await connection.beginTransaction();
    
// // //     if (req.user.role_id !== 2) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Volunteer access required'
// // //       });
// // //     }
    
// // //     const [tasks] = await connection.execute(
// // //       `SELECT t.task_id, t.report_id, t.status_id
// // //        FROM tasks t
// // //        WHERE t.task_id = ? AND t.assigned_to_user_id = ? AND t.is_deleted = 0`,
// // //       [taskId, volunteerId]
// // //     );
    
// // //     if (tasks.length === 0) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Task not found or not assigned to you'
// // //       });
// // //     }
    
// // //     const task = tasks[0];
    
// // //     if (task.status_id !== 2) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Task must be in progress before completing'
// // //       });
// // //     }
    
// // //     // Update task to completed (status_id = 3)
// // //     await connection.execute(
// // //       `UPDATE tasks 
// // //        SET status_id = 3, 
// // //            completed_at = NOW() 
// // //        WHERE task_id = ?`,
// // //       [taskId]
// // //     );
    
// // //     // Update report status to completed (status_id = 4)
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = 4 WHERE report_id = ?',
// // //       [task.report_id]
// // //     );
    
// // //     // AUTO-UPDATE AVAILABILITY - Check if they have any other active tasks
// // //     const [activeTasks] = await connection.execute(
// // //       `SELECT COUNT(*) as count 
// // //        FROM tasks 
// // //        WHERE assigned_to_user_id = ? 
// // //          AND status_id = 2
// // //          AND is_deleted = 0`,
// // //       [volunteerId]
// // //     );
    
// // //     let availabilityUpdated = false;
// // //     if (activeTasks[0].count === 0) {
// // //       await connection.execute(
// // //         `UPDATE volunteer_profiles 
// // //          SET availability_status_id = 1,
// // //              availability_updated_at = NOW() 
// // //          WHERE user_id = ?`,
// // //         [volunteerId]
// // //       );
// // //       availabilityUpdated = true;
// // //       console.log(`Auto-set volunteer ${volunteerId} to available`);
// // //     }
    
// // //     // 🏆 CHECK AND AWARD BADGES 🏆
// // //     const awardedBadges = [];
    
// // //     // Count total completed tasks for this volunteer (including this one)
// // //     const [completedCount] = await connection.execute(
// // //       `SELECT COUNT(*) as total_completed
// // //        FROM tasks 
// // //        WHERE assigned_to_user_id = ? 
// // //          AND status_id = 3 
// // //          AND is_deleted = 0`,
// // //       [volunteerId]
// // //     );
    
// // //     const totalCompleted = completedCount[0].total_completed;
    
// // //     // Get badge definitions
// // //     const [badgeDefs] = await connection.execute(
// // //       'SELECT badge_id, badge_name, required_count FROM badge_definitions ORDER BY required_count'
// // //     );
    
// // //     // Check each badge milestone
// // //     for (const badge of badgeDefs) {
// // //       if (totalCompleted >= badge.required_count) {
// // //         // Check if already awarded
// // //         const [existing] = await connection.execute(
// // //           'SELECT award_id FROM badge_awards WHERE user_id = ? AND badge_id = ?',
// // //           [volunteerId, badge.badge_id]
// // //         );
        
// // //         if (existing.length === 0) {
// // //           await connection.execute(
// // //             `INSERT INTO badge_awards (user_id, badge_id, awarded_at, task_id)
// // //              VALUES (?, ?, NOW(), ?)`,
// // //             [volunteerId, badge.badge_id, taskId]
// // //           );
// // //           awardedBadges.push(badge.badge_name);
// // //         }
// // //       }
// // //     }
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: awardedBadges.length > 0 
// // //         ? `Task completed successfully! 🏆 You earned: ${awardedBadges.join(', ')}`
// // //         : 'Task completed successfully! Thank you for your service!',
// // //       data: {
// // //         task_id: taskId,
// // //         status: 'completed',
// // //         status_id: 3,
// // //         completed_at: new Date().toISOString(),
// // //         availability_auto_updated: availabilityUpdated,
// // //         badges_awarded: awardedBadges
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('Error completing task:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to complete task',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // // =====================================================
// // // // ✅ VOLUNTEER ACTIVE MISSION - MUST BE BEFORE /:id/reports
// // // // =====================================================
// // // router.get('/:id/active-mission', verifyToken, async (req, res) => {
// // //   const volunteerId = Number(req.params.id);
  
// // //   if (!volunteerId) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid volunteer ID'
// // //     });
// // //   }
  
// // //   try {
// // //     // Check permissions - admin or self
// // //     if (req.user.role_id !== 3 && req.user.user_id !== volunteerId) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: You can only view your own missions'
// // //       });
// // //     }

// // //     console.log(`Fetching ACTIVE mission for volunteer ${volunteerId}...`);
    
// // //     // Get ONLY the IN PROGRESS task (status_id = 2) for this volunteer
// // //     const [missions] = await pool.execute(`
// // //       SELECT 
// // //         t.task_id,
// // //         t.report_id,
// // //         t.assigned_to_user_id as volunteer_id,
// // //         t.status_id as task_status_id,
// // //         ts.status_name as task_status,
// // //         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
// // //         DATE_FORMAT(t.started_at, '%Y-%m-%d %H:%i:%s') as started_at,
// // //         DATE_FORMAT(t.completed_at, '%Y-%m-%d %H:%i:%s') as completed_at,
// // //         r.report_id,
// // //         r.user_id,
// // //         r.description,
// // //         r.location_address,
// // //         r.user_note,
// // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// // //         at.type_name as animal_type,
// // //         ac.condition_name as animal_condition,
// // //         r.status_id as report_status_id,
// // //         rs.status_name as report_status,
// // //         u.username as reporter_name,
// // //         CAST(COALESCE(u.phone, '') AS CHAR) AS reporter_phone,
// // //         u.email as reporter_email,
// // //         v.username as volunteer_name,
// // //         v.email as volunteer_email,
// // //         CAST(v.phone AS CHAR) AS volunteer_phone
// // //       FROM tasks t
// // //       INNER JOIN reports r ON t.report_id = r.report_id
// // //       LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
// // //       LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
// // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // //       LEFT JOIN users u ON r.user_id = u.user_id
// // //       LEFT JOIN users v ON t.assigned_to_user_id = v.user_id
// // //       WHERE t.assigned_to_user_id = ? 
// // //         AND t.status_id = 2  -- ✅ ONLY IN PROGRESS TASKS
// // //         AND t.is_deleted = 0
// // //         AND r.is_deleted = 0
// // //       ORDER BY t.assigned_at DESC
// // //       LIMIT 1  -- ✅ ONLY ONE MISSION
// // //     `, [volunteerId]);
    
// // //     if (missions.length === 0) {
// // //       return res.json({
// // //         success: true,
// // //         data: null,
// // //         message: 'No active mission found'
// // //       });
// // //     }
    
// // //     console.log(`Found active mission for volunteer ${volunteerId}: Report #${missions[0].report_id}, Task #${missions[0].task_id}`);
    
// // //     res.json({
// // //       success: true,
// // //       data: missions[0]
// // //     });
    
// // //   } catch (error) {
// // //     console.error('Error fetching volunteer active mission:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch active mission',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // =====================================================
// // // // VOLUNTEER REPORTS & ASSIGNMENTS
// // // // =====================================================

// // // // Get volunteer's assigned reports
// // // router.get('/:id/reports', verifyToken, async (req, res) => {
// // //   const volunteerId = Number(req.params.id);
  
// // //   if (!volunteerId) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Invalid volunteer ID'
// // //     });
// // //   }
  
// // //   try {
// // //     if (req.user.role_id !== 3 && req.user.user_id !== volunteerId) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: You can only view your own reports'
// // //       });
// // //     }
    
// // //     const [reports] = await pool.execute(`
// // //       SELECT 
// // //         r.report_id,
// // //         r.description,
// // //         r.location_address,
// // //         r.user_note,
// // //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// // //         at.type_name as animal_type,
// // //         ac.condition_name as animal_condition,
// // //         r.status_id,
// // //         u.username as reporter_name,
// // //         CAST(u.phone AS CHAR) AS reporter_phone,
// // //         u.email as reporter_email,
// // //         t.task_id,
// // //         t.status_id as task_status,
// // //         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at
// // //       FROM tasks t
// // //       INNER JOIN reports r ON t.report_id = r.report_id
// // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // //       LEFT JOIN users u ON r.user_id = u.user_id
// // //       WHERE t.assigned_to_user_id = ? 
// // //         AND t.is_deleted = 0
// // //         AND r.is_deleted = 0
// // //       ORDER BY t.assigned_at DESC
// // //     `, [volunteerId]);
    
// // //     res.json({
// // //       success: true,
// // //       data: reports,
// // //       count: reports.length
// // //     });
    
// // //   } catch (error) {
// // //     console.error('Error fetching volunteer reports:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch volunteer reports',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // =====================================================
// // // // 🏆 VOLUNTEER BADGES & ACHIEVEMENTS
// // // // =====================================================

// // // router.get('/:id/badges', verifyToken, async (req, res) => {
// // //   try {
// // //     const userId = Number(req.params.id);
    
// // //     if (req.user.user_id !== userId && req.user.role_id !== 3) {
// // //       return res.status(403).json({ 
// // //         success: false, 
// // //         message: 'Forbidden' 
// // //       });
// // //     }

// // //     const [badges] = await pool.execute(`
// // //       SELECT 
// // //         bd.badge_id,
// // //         bd.badge_name,
// // //         bd.description,
// // //         CASE 
// // //           WHEN ba.award_id IS NOT NULL THEN 'unlocked'
// // //           ELSE 'locked'
// // //         END as status,
// // //         DATE_FORMAT(ba.awarded_at, '%Y-%m-%d') as awarded_at,
// // //         ba.task_id
// // //       FROM badge_definitions bd
// // //       LEFT JOIN badge_awards ba ON bd.badge_id = ba.badge_id AND ba.user_id = ?
// // //       ORDER BY 
// // //         CASE WHEN ba.award_id IS NOT NULL THEN 0 ELSE 1 END,
// // //         ba.awarded_at DESC,
// // //         bd.badge_id
// // //     `, [userId]);

// // //     const [taskCount] = await pool.execute(`
// // //       SELECT COUNT(*) as total_tasks
// // //       FROM tasks 
// // //       WHERE assigned_to_user_id = ? AND status_id = 3 AND is_deleted = 0
// // //     `, [userId]);

// // //     const [recent] = await pool.execute(`
// // //       SELECT 
// // //         bd.badge_name,
// // //         DATE_FORMAT(ba.awarded_at, '%Y-%m-%d') as awarded_at
// // //       FROM badge_awards ba
// // //       JOIN badge_definitions bd ON ba.badge_id = bd.badge_id
// // //       WHERE ba.user_id = ?
// // //       ORDER BY ba.awarded_at DESC
// // //       LIMIT 3
// // //     `, [userId]);

// // //     res.json({
// // //       success: true,
// // //       badges: badges,
// // //       total_tasks: taskCount[0]?.total_tasks || 0,
// // //       recent_badges: recent,
// // //       count: badges.filter(b => b.status === 'unlocked').length
// // //     });

// // //   } catch (err) {
// // //     console.error('GET badges error:', err);
// // //     res.status(500).json({ 
// // //       success: false, 
// // //       message: 'Failed to fetch badges' 
// // //     });
// // //   }
// // // });

// // // router.get('/:id/badge-stats', verifyToken, async (req, res) => {
// // //   try {
// // //     const userId = Number(req.params.id);
    
// // //     if (req.user.user_id !== userId && req.user.role_id !== 3) {
// // //       return res.status(403).json({ success: false, message: 'Forbidden' });
// // //     }

// // //     const [stats] = await pool.execute(`
// // //       SELECT 
// // //         bd.badge_name,
// // //         COUNT(ba.award_id) as count
// // //       FROM badge_definitions bd
// // //       LEFT JOIN badge_awards ba ON bd.badge_id = ba.badge_id AND ba.user_id = ?
// // //       GROUP BY bd.badge_id, bd.badge_name
// // //       ORDER BY bd.badge_id
// // //     `, [userId]);

// // //     res.json({
// // //       success: true,
// // //       stats: stats
// // //     });

// // //   } catch (err) {
// // //     console.error('GET badge stats error:', err);
// // //     res.status(500).json({ success: false, message: 'Failed to fetch badge stats' });
// // //   }
// // // });

// // // // =====================================================
// // // // ADMIN ASSIGNMENT & REASSIGNMENT ROUTES
// // // // =====================================================

// // // router.post('/assign', verifyToken, async (req, res) => {
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }

// // //     const { report_id, volunteer_id, status_id } = req.body;
    
// // //     if (!report_id || !volunteer_id) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Report ID and Volunteer ID are required'
// // //       });
// // //     }

// // //     await connection.beginTransaction();

// // //     console.log(`Assigning volunteer ${volunteer_id} to report ${report_id}`);
    
// // //     const [reportCheck] = await connection.execute(
// // //       'SELECT report_id, status_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// // //       [report_id]
// // //     );
    
// // //     if (reportCheck.length === 0) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Report not found'
// // //       });
// // //     }
    
// // //     const [volunteerCheck] = await connection.execute(`
// // //       SELECT u.user_id, u.username, u.email, u.phone 
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       WHERE u.user_id = ? 
// // //         AND u.role_id = 2 
// // //         AND u.is_deleted = 0
// // //         AND (vp.approval_status_id = 2 OR (vp.approval_status_id IS NULL AND u.user_id IN (2, 8)))
// // //     `, [volunteer_id]);
    
// // //     if (volunteerCheck.length === 0) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Volunteer not found, not approved, or is rejected'
// // //       });
// // //     }
    
// // //     const [existingTasks] = await connection.execute(
// // //       'SELECT task_id, assigned_to_user_id, status_id, is_deleted FROM tasks WHERE report_id = ?',
// // //       [report_id]
// // //     );
    
// // //     const taskStatus = status_id || 2;
    
// // //     if (existingTasks.length > 0) {
// // //       const existingTask = existingTasks[0];
      
// // //       if (existingTask.is_deleted === 1) {
// // //         console.log(`Reactivating soft-deleted task ${existingTask.task_id} for report ${report_id}`);
// // //         await connection.execute(
// // //           'UPDATE tasks SET assigned_to_user_id = ?, status_id = ?, assigned_at = NOW(), is_deleted = 0 WHERE task_id = ?',
// // //           [volunteer_id, taskStatus, existingTask.task_id]
// // //         );
// // //       } else {
// // //         console.log(`Updating existing task ${existingTask.task_id} for report ${report_id}`);
// // //         await connection.execute(
// // //           'UPDATE tasks SET assigned_to_user_id = ?, status_id = ?, assigned_at = NOW() WHERE task_id = ?',
// // //           [volunteer_id, taskStatus, existingTask.task_id]
// // //         );
// // //       }
// // //     } else {
// // //       console.log(`Creating new task for report ${report_id}...`);
// // //       await connection.execute(
// // //         `INSERT INTO tasks (report_id, assigned_to_user_id, assigned_by_user_id, status_id, assigned_at, is_deleted)
// // //          VALUES (?, ?, ?, ?, NOW(), 0)`,
// // //         [report_id, volunteer_id, req.user.user_id, taskStatus]
// // //       );
// // //     }
    
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = ? WHERE report_id = ?',
// // //       [taskStatus, report_id]
// // //     );

// // //     await connection.commit();
    
// // //     const volunteer = volunteerCheck[0];
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Volunteer assigned successfully',
// // //       data: {
// // //         report_id: report_id,
// // //         volunteer_id: volunteer.user_id,
// // //         volunteer_name: volunteer.username,
// // //         volunteer_email: volunteer.email,
// // //         volunteer_phone: volunteer.phone || '',
// // //         status_id: taskStatus,
// // //         timestamp: new Date().toISOString()
// // //       }
// // //     });

// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('Error assigning volunteer:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to assign volunteer',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // router.delete('/unassign/:report_id', verifyToken, async (req, res) => {
// // //   const connection = await pool.getConnection();
// // //   const reportId = Number(req.params.report_id);
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     if (!reportId) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Report ID is required'
// // //       });
// // //     }
    
// // //     await connection.beginTransaction();
    
// // //     console.log(`Unassigning volunteer from report ${reportId}`);
    
// // //     const [reportCheck] = await connection.execute(
// // //       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// // //       [reportId]
// // //     );
    
// // //     if (reportCheck.length === 0) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Report not found'
// // //       });
// // //     }
    
// // //     const [taskCheck] = await connection.execute(
// // //       'SELECT task_id FROM tasks WHERE report_id = ? AND is_deleted = 0',
// // //       [reportId]
// // //     );
    
// // //     if (taskCheck.length === 0) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'No active task found for this report'
// // //       });
// // //     }
    
// // //     await connection.execute(
// // //       'UPDATE tasks SET is_deleted = 1 WHERE report_id = ? AND is_deleted = 0',
// // //       [reportId]
// // //     );
    
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = 1 WHERE report_id = ?',
// // //       [reportId]
// // //     );
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Volunteer unassigned successfully',
// // //       data: {
// // //         report_id: reportId,
// // //         unassigned_at: new Date().toISOString()
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('Error unassigning volunteer:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to unassign volunteer',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // router.post('/force-assign', verifyToken, async (req, res) => {
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }

// // //     const { report_id, volunteer_id, status_id } = req.body;
    
// // //     if (!report_id || !volunteer_id) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Report ID and Volunteer ID are required'
// // //       });
// // //     }

// // //     await connection.beginTransaction();

// // //     console.log(`Force assigning volunteer ${volunteer_id} to report ${report_id}`);
    
// // //     const [reportCheck] = await connection.execute(
// // //       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// // //       [report_id]
// // //     );
    
// // //     if (reportCheck.length === 0) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Report not found'
// // //       });
// // //     }
    
// // //     const [volunteerCheck] = await connection.execute(`
// // //       SELECT u.user_id, u.username, u.email, u.phone 
// // //       FROM users u
// // //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       WHERE u.user_id = ? 
// // //         AND u.role_id = 2 
// // //         AND u.is_deleted = 0
// // //         AND (vp.approval_status_id = 2 OR (vp.approval_status_id IS NULL AND u.user_id IN (2, 8)))
// // //     `, [volunteer_id]);
    
// // //     if (volunteerCheck.length === 0) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Volunteer not found, not approved, or is rejected'
// // //       });
// // //     }
    
// // //     await connection.execute(
// // //       'DELETE FROM tasks WHERE report_id = ?',
// // //       [report_id]
// // //     );
    
// // //     const [result] = await connection.execute(
// // //       `INSERT INTO tasks (report_id, assigned_to_user_id, assigned_by_user_id, status_id, assigned_at, is_deleted)
// // //        VALUES (?, ?, ?, ?, NOW(), 0)`,
// // //       [report_id, volunteer_id, req.user.user_id, status_id || 2]
// // //     );
    
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = ? WHERE report_id = ?',
// // //       [status_id || 2, report_id]
// // //     );

// // //     await connection.commit();
    
// // //     const volunteer = volunteerCheck[0];
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Volunteer force-assigned successfully',
// // //       data: {
// // //         report_id: report_id,
// // //         volunteer_id: volunteer.user_id,
// // //         volunteer_name: volunteer.username,
// // //         volunteer_email: volunteer.email,
// // //         volunteer_phone: volunteer.phone || '',
// // //         status_id: status_id || 2,
// // //         task_id: result.insertId
// // //       }
// // //     });

// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('Error force assigning volunteer:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to assign volunteer',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // router.get('/available-for-reassignment/:reportId', verifyToken, async (req, res) => {
// // //   const reportId = Number(req.params.reportId);
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     const [volunteers] = await pool.execute(`
// // //       SELECT 
// // //         u.user_id,
// // //         u.username,
// // //         u.email,
// // //         COALESCE(CAST(u.phone AS CHAR), '') as phone,
// // //         vp.availability_status_id,
// // //         a.status_name as availability_status,
// // //         COALESCE(vp.has_car, 0) as has_car,
// // //         COALESCE(vp.can_foster, 0) as can_foster,
// // //         COALESCE(vp.animal_handling, '') as animal_handling,
// // //         COALESCE(vp.city, '') as city,
// // //         (
// // //           SELECT COUNT(*) 
// // //           FROM tasks t
// // //           WHERE t.assigned_to_user_id = u.user_id 
// // //           AND t.status_id = 2
// // //           AND t.is_deleted = 0
// // //         ) as active_tasks_count
// // //       FROM users u
// // //       INNER JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// // //       INNER JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// // //       WHERE u.role_id = 2
// // //         AND u.is_deleted = 0
// // //         AND vp.approval_status_id = 2
// // //         AND vp.availability_status_id = 1
// // //         AND u.user_id NOT IN (
// // //           SELECT assigned_to_user_id 
// // //           FROM tasks 
// // //           WHERE report_id = ? AND is_deleted = 0
// // //         )
// // //       ORDER BY active_tasks_count ASC, u.username ASC
// // //     `, [reportId]);
    
// // //     res.json({
// // //       success: true,
// // //       data: volunteers,
// // //       count: volunteers.length,
// // //       report_id: reportId
// // //     });
    
// // //   } catch (error) {
// // //     console.error('Error fetching available volunteers:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch available volunteers',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // router.post('/reassign', verifyToken, async (req, res) => {
// // //   const connection = await pool.getConnection();
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }

// // //     const { task_id, new_volunteer_id, report_id } = req.body;
    
// // //     if ((!task_id && !report_id) || !new_volunteer_id) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Task ID or Report ID and New Volunteer ID are required'
// // //       });
// // //     }

// // //     await connection.beginTransaction();
    
// // //     let actualTaskId = task_id;
// // //     if (!actualTaskId && report_id) {
// // //       const [tasks] = await connection.execute(
// // //         'SELECT task_id, assigned_to_user_id FROM tasks WHERE report_id = ? AND is_deleted = 0 ORDER BY task_id DESC LIMIT 1',
// // //         [report_id]
// // //       );
// // //       if (tasks.length > 0) {
// // //         actualTaskId = tasks[0].task_id;
// // //       }
// // //     }
    
// // //     if (!actualTaskId) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'No active task found for reassignment'
// // //       });
// // //     }
    
// // //     const [oldTasks] = await connection.execute(
// // //       'SELECT * FROM tasks WHERE task_id = ?',
// // //       [actualTaskId]
// // //     );
    
// // //     if (oldTasks.length === 0) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Task not found'
// // //       });
// // //     }
    
// // //     const oldTask = oldTasks[0];
    
// // //     await connection.execute(
// // //       'UPDATE tasks SET is_deleted = 1, status_id = 4 WHERE task_id = ?',
// // //       [actualTaskId]
// // //     );
    
// // //     const [result] = await connection.execute(
// // //       `INSERT INTO tasks 
// // //        (report_id, assigned_to_user_id, assigned_by_user_id, status_id, assigned_at, is_deleted)
// // //        VALUES (?, ?, ?, 1, NOW(), 0)`,
// // //       [oldTask.report_id, new_volunteer_id, req.user.user_id]
// // //     );
    
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = 2 WHERE report_id = ?',
// // //       [oldTask.report_id]
// // //     );
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: 'Task reassigned successfully',
// // //       data: {
// // //         old_task_id: actualTaskId,
// // //         new_task_id: result.insertId,
// // //         new_volunteer_id: new_volunteer_id,
// // //         reassigned_at: new Date().toISOString()
// // //       }
// // //     });

// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('Error reassigning volunteer:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to reassign volunteer',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // router.get('/declined-tasks', verifyToken, async (req, res) => {
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     const [tasks] = await pool.execute(`
// // //       SELECT 
// // //         t.task_id,
// // //         t.report_id,
// // //         t.assigned_to_user_id,
// // //         t.assigned_by_user_id,
// // //         t.status_id,
// // //         ts.status_name as task_status,
// // //         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
// // //         DATE_FORMAT(t.volunteer_responded_at, '%Y-%m-%d %H:%i:%s') as responded_at,
// // //         t.volunteer_response,
// // //         t.declined_reason,
// // //         vu.username as volunteer_name,
// // //         r.report_id,
// // //         r.description,
// // //         r.location_address,
// // //         at.type_name as animal_type,
// // //         ac.condition_name as animal_condition,
// // //         ru.username as reporter_name
// // //       FROM tasks t
// // //       INNER JOIN reports r ON t.report_id = r.report_id
// // //       LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
// // //       LEFT JOIN users vu ON t.assigned_to_user_id = vu.user_id
// // //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// // //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// // //       LEFT JOIN users ru ON r.user_id = ru.user_id
// // //       WHERE t.status_id = 4
// // //         AND t.is_deleted = 0
// // //         AND r.is_deleted = 0
// // //       ORDER BY t.volunteer_responded_at DESC
// // //     `);
    
// // //     res.json({
// // //       success: true,
// // //       data: tasks,
// // //       count: tasks.length
// // //     });
    
// // //   } catch (error) {
// // //     console.error('Error fetching declined tasks:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch declined tasks',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // router.get('/report/:report_id/task', verifyToken, async (req, res) => {
// // //   const reportId = Number(req.params.report_id);
  
// // //   if (!reportId) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       message: 'Report ID is required'
// // //     });
// // //   }
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     const [tasks] = await pool.execute(`
// // //       SELECT 
// // //         t.task_id,
// // //         t.report_id,
// // //         t.assigned_to_user_id,
// // //         t.assigned_by_user_id,
// // //         t.status_id,
// // //         ts.status_name as task_status,
// // //         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
// // //         t.started_at,
// // //         t.completed_at,
// // //         t.is_deleted,
// // //         u.username as volunteer_name,
// // //         u.email as volunteer_email,
// // //         u2.username as assigned_by_name,
// // //         r.status_id as report_status
// // //       FROM tasks t
// // //       LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
// // //       LEFT JOIN users u ON t.assigned_to_user_id = u.user_id
// // //       LEFT JOIN users u2 ON t.assigned_by_user_id = u2.user_id
// // //       LEFT JOIN reports r ON t.report_id = r.report_id
// // //       WHERE t.report_id = ?
// // //       ORDER BY t.assigned_at DESC
// // //       LIMIT 1
// // //     `, [reportId]);
    
// // //     if (tasks.length === 0) {
// // //       return res.json({
// // //         success: true,
// // //         data: null,
// // //         message: 'No task found for this report'
// // //       });
// // //     }
    
// // //     res.json({
// // //       success: true,
// // //       data: tasks[0],
// // //       message: 'Task found'
// // //     });
    
// // //   } catch (error) {
// // //     console.error('Error fetching task:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fetch task',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // });

// // // // =====================================================
// // // // ADMIN FIX UTILITIES
// // // // =====================================================

// // // router.post('/fix-task/:task_id', verifyToken, async (req, res) => {
// // //   const connection = await pool.getConnection();
// // //   const taskId = Number(req.params.task_id);
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     if (!taskId) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Task ID is required'
// // //       });
// // //     }
    
// // //     await connection.beginTransaction();
    
// // //     const [tasks] = await connection.execute(
// // //       'SELECT * FROM tasks WHERE task_id = ?',
// // //       [taskId]
// // //     );
    
// // //     if (tasks.length === 0) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Task not found'
// // //       });
// // //     }
    
// // //     const task = tasks[0];
// // //     const fixes = [];
    
// // //     if (task.is_deleted === 1 && task.status_id === 2) {
// // //       await connection.execute(
// // //         'UPDATE tasks SET status_id = 1 WHERE task_id = ?',
// // //         [taskId]
// // //       );
// // //       fixes.push(`status ${task.status_id} -> 1 (deleted)`);
// // //     }
    
// // //     if (task.completed_at && task.status_id !== 3) {
// // //       await connection.execute(
// // //         'UPDATE tasks SET status_id = 3 WHERE task_id = ?',
// // //         [taskId]
// // //       );
// // //       fixes.push(`status ${task.status_id} -> 3 (completed)`);
// // //     }
    
// // //     if (fixes.length === 0) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.json({
// // //         success: true,
// // //         message: 'Task is already in consistent state',
// // //         data: task
// // //       });
// // //     }
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: `Task fixed: ${fixes.join(', ')}`,
// // //       data: {
// // //         task_id: taskId,
// // //         fixes: fixes
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('Error fixing task:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fix task',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
// // // });

// // // router.post('/fix-report/:report_id', verifyToken, async (req, res) => {
// // //   const connection = await pool.getConnection();
// // //   const reportId = Number(req.params.report_id);
  
// // //   try {
// // //     if (req.user.role_id !== 3) {
// // //       return res.status(403).json({
// // //         success: false,
// // //         message: 'Forbidden: Admin access required'
// // //       });
// // //     }
    
// // //     if (!reportId) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Report ID is required'
// // //       });
// // //     }
    
// // //     await connection.beginTransaction();
    
// // //     console.log(`Fixing report ${reportId} tasks...`);
    
// // //     const [tasks] = await connection.execute(
// // //       'SELECT * FROM tasks WHERE report_id = ? ORDER BY task_id DESC',
// // //       [reportId]
// // //     );
    
// // //     if (tasks.length === 0) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'No tasks found for this report'
// // //       });
// // //     }
    
// // //     const fixes = [];
    
// // //     for (const task of tasks) {
// // //       if (task.is_deleted === 1 && task.status_id >= 2) {
// // //         await connection.execute(
// // //           'UPDATE tasks SET status_id = 1 WHERE task_id = ?',
// // //           [task.task_id]
// // //         );
// // //         fixes.push({
// // //           task_id: task.task_id,
// // //           change: `status ${task.status_id} -> 1 (deleted)`
// // //         });
// // //       }
      
// // //       if (task.completed_at && task.status_id !== 3) {
// // //         await connection.execute(
// // //           'UPDATE tasks SET status_id = 3 WHERE task_id = ?',
// // //           [task.task_id]
// // //         );
// // //         fixes.push({
// // //           task_id: task.task_id,
// // //           change: `status ${task.status_id} -> 3 (completed)`
// // //         });
// // //       }
// // //     }
    
// // //     const latestTask = tasks[0];
// // //     let reportStatus = 1;
    
// // //     if (latestTask.is_deleted === 0) {
// // //       if (latestTask.status_id === 2) reportStatus = 3;
// // //       else if (latestTask.status_id === 3) reportStatus = 4;
// // //       else if (latestTask.status_id === 4) reportStatus = 1;
// // //       else reportStatus = latestTask.status_id;
// // //     }
    
// // //     await connection.execute(
// // //       'UPDATE reports SET status_id = ? WHERE report_id = ?',
// // //       [reportStatus, reportId]
// // //     );
    
// // //     await connection.commit();
    
// // //     res.json({
// // //       success: true,
// // //       message: `Fixed ${fixes.length} issues for report ${reportId}`,
// // //       fixes: fixes,
// // //       data: {
// // //         report_id: reportId,
// // //         report_status: reportStatus,
// // //         tasks_fixed: fixes.length
// // //       }
// // //     });
    
// // //   } catch (error) {
// // //     await connection.rollback();
// // //     console.error('Error fixing report:', error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: 'Failed to fix report',
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   } finally {
// // //     connection.release();
// // //   }
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

// // console.log('Volunteer routes initialized');

// // // =====================================================
// // // ADMIN ROUTES - Volunteer Management
// // // =====================================================

// // // Get ALL volunteers (for admin assignment) - SHOW ONLY APPROVED VOLUNTEERS
// // router.get('/available', verifyToken, async (req, res) => {
// //   try {
// //     if (req.user.role_id !== 3) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Admin access required'
// //       });
// //     }

// //     console.log('Fetching APPROVED volunteers for assignment...');
    
// //     const [volunteers] = await pool.execute(`
// //       SELECT 
// //         u.user_id,
// //         u.username,
// //         u.email,
// //         COALESCE(CAST(u.phone AS CHAR), '') as phone,
// //         u.bio,
// //         u.created_at,
// //         u.role_id,
// //         COALESCE(vp.joined_at, u.created_at) as joined_at,
// //         COALESCE(vp.approval_status_id, 2) as approval_status_id,
// //         CASE 
// //           WHEN vp.approval_status_id = 1 THEN 'Pending'
// //           WHEN vp.approval_status_id = 2 THEN 'Approved'
// //           WHEN vp.approval_status_id = 3 THEN 'Rejected'
// //           ELSE 'Approved'
// //         END as approval_status,
// //         COALESCE(vp.availability_status_id, 1) as availability_status_id,
// //         a.status_name as availability_status,
// //         COALESCE(vp.has_car, 0) as has_car,
// //         COALESCE(vp.can_foster, 0) as can_foster,
// //         COALESCE(vp.animal_handling, '') as animal_handling,
// //         COALESCE(vp.city, '') as city,
// //         vp.badges,
// //         (
// //           SELECT COUNT(*) 
// //           FROM tasks t
// //           WHERE t.assigned_to_user_id = u.user_id 
// //           AND t.status_id = 2
// //           AND t.is_deleted = 0
// //         ) as assigned_reports_count
// //       FROM users u
// //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// //       LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// //       WHERE u.role_id = 2
// //         AND u.is_deleted = 0
// //         AND (vp.approval_status_id = 2 OR (vp.approval_status_id IS NULL AND u.user_id IN (2, 8)))
// //       ORDER BY u.username ASC
// //     `);

// //     console.log(`Found ${volunteers.length} APPROVED volunteers for assignment`);
    
// //     res.json({
// //       success: true,
// //       data: volunteers,
// //       count: volunteers.length
// //     });

// //   } catch (error) {
// //     console.error('Error fetching volunteers:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to fetch volunteers',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // // Get only APPROVED volunteers - Alternative endpoint
// // router.get('/approved', verifyToken, async (req, res) => {
// //   try {
// //     if (req.user.role_id !== 3) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Admin access required'
// //       });
// //     }

// //     console.log('Fetching APPROVED volunteers only...');
    
// //     const [volunteers] = await pool.execute(`
// //       SELECT 
// //         u.user_id,
// //         u.username,
// //         u.email,
// //         COALESCE(CAST(u.phone AS CHAR), '') as phone,
// //         u.bio,
// //         u.created_at,
// //         u.role_id,
// //         COALESCE(vp.joined_at, u.created_at) as joined_at,
// //         vp.approval_status_id,
// //         'Approved' as approval_status,
// //         COALESCE(vp.availability_status_id, 1) as availability_status_id,
// //         a.status_name as availability_status,
// //         COALESCE(vp.has_car, 0) as has_car,
// //         COALESCE(vp.can_foster, 0) as can_foster,
// //         COALESCE(vp.animal_handling, '') as animal_handling,
// //         COALESCE(vp.city, '') as city,
// //         vp.badges,
// //         (
// //           SELECT COUNT(*) 
// //           FROM tasks t
// //           WHERE t.assigned_to_user_id = u.user_id 
// //           AND t.status_id = 2
// //           AND t.is_deleted = 0
// //         ) as assigned_reports_count
// //       FROM users u
// //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// //       LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// //       WHERE u.role_id = 2
// //         AND u.is_deleted = 0
// //         AND vp.approval_status_id = 2
// //       ORDER BY u.username ASC
// //     `);

// //     console.log(`Found ${volunteers.length} APPROVED volunteers`);
    
// //     res.json({
// //       success: true,
// //       data: volunteers,
// //       count: volunteers.length
// //     });

// //   } catch (error) {
// //     console.error('Error fetching approved volunteers:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to fetch approved volunteers',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // // Get all volunteers with detailed info (for admin management)
// // router.get('/admin/all', verifyToken, async (req, res) => {
// //   try {
// //     if (req.user.role_id !== 3) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Admin access required'
// //       });
// //     }

// //     console.log('Fetching ALL volunteers for admin...');
    
// //     const [volunteers] = await pool.execute(`
// //       SELECT 
// //         u.user_id,
// //         u.username,
// //         u.email,
// //         COALESCE(CAST(u.phone AS CHAR), '') as phone,
// //         u.bio,
// //         u.profile_image_url,
// //         u.created_at,
// //         u.role_id,
// //         COALESCE(vp.joined_at, u.created_at) as joined_at,
// //         COALESCE(vp.approval_status_id, 2) as approval_status_id,
// //         CASE 
// //           WHEN vp.approval_status_id = 1 THEN 'Pending'
// //           WHEN vp.approval_status_id = 2 THEN 'Approved'
// //           WHEN vp.approval_status_id = 3 THEN 'Rejected'
// //           ELSE 'Approved'
// //         END as approval_status,
// //         COALESCE(vp.availability_status_id, 1) as availability_status_id,
// //         a.status_name as availability_status,
// //         COALESCE(vp.has_car, 0) as has_car,
// //         COALESCE(vp.can_foster, 0) as can_foster,
// //         COALESCE(vp.animal_handling, '') as animal_handling,
// //         COALESCE(vp.city, '') as city,
// //         vp.badges,
// //         (
// //           SELECT COUNT(*) 
// //           FROM tasks t
// //           WHERE t.assigned_to_user_id = u.user_id 
// //           AND t.is_deleted = 0
// //         ) as total_assigned_reports,
// //         (
// //           SELECT COUNT(*) 
// //           FROM tasks t
// //           INNER JOIN reports r ON t.report_id = r.report_id
// //           WHERE t.assigned_to_user_id = u.user_id 
// //           AND r.status_id = 4
// //           AND t.is_deleted = 0
// //           AND r.is_deleted = 0
// //         ) as completed_reports,
// //         (
// //           SELECT COUNT(*) 
// //           FROM tasks t
// //           WHERE t.assigned_to_user_id = u.user_id 
// //           AND t.status_id = 2
// //           AND t.is_deleted = 0
// //         ) as active_reports
// //       FROM users u
// //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// //       LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// //       WHERE u.role_id = 2
// //         AND u.is_deleted = 0
// //       ORDER BY 
// //         CASE WHEN COALESCE(vp.approval_status_id, 2) = 2 THEN 1 ELSE 2 END,
// //         u.username ASC
// //     `);

// //     console.log(`Found ${volunteers.length} volunteers for admin`);
    
// //     res.json({
// //       success: true,
// //       data: volunteers,
// //       count: volunteers.length
// //     });

// //   } catch (error) {
// //     console.error('Error fetching all volunteers:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to fetch volunteers',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // // Update volunteer approval status
// // router.patch('/:id/approval', verifyToken, async (req, res) => {
// //   const volunteerId = Number(req.params.id);
// //   const { approval_status_id } = req.body;
  
// //   if (!volunteerId) {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Invalid volunteer ID'
// //     });
// //   }
  
// //   if (!approval_status_id || (approval_status_id < 1 || approval_status_id > 3)) {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Invalid approval status ID. Must be 1 (Pending), 2 (Approved), or 3 (Rejected)'
// //     });
// //   }
  
// //   try {
// //     if (req.user.role_id !== 3) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Admin access required'
// //       });
// //     }
    
// //     const [volunteerCheck] = await pool.execute(
// //       'SELECT user_id FROM users WHERE user_id = ? AND role_id = 2 AND is_deleted = 0',
// //       [volunteerId]
// //     );
    
// //     if (volunteerCheck.length === 0) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Volunteer not found'
// //       });
// //     }
    
// //     const [profileCheck] = await pool.execute(
// //       'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
// //       [volunteerId]
// //     );
    
// //     if (profileCheck.length === 0) {
// //       await pool.execute(
// //         `INSERT INTO volunteer_profiles (user_id, approval_status_id, availability_status_id, joined_at, has_car, can_foster, animal_handling, city)
// //          VALUES (?, ?, 1, NOW(), 0, 0, '', '')`,
// //         [volunteerId, approval_status_id]
// //       );
// //     } else {
// //       await pool.execute(
// //         'UPDATE volunteer_profiles SET approval_status_id = ? WHERE user_id = ?',
// //         [approval_status_id, volunteerId]
// //       );
// //     }
    
// //     const [updatedVolunteer] = await pool.execute(`
// //       SELECT 
// //         u.user_id,
// //         u.username,
// //         u.email,
// //         COALESCE(CAST(u.phone AS CHAR), '') as phone,
// //         COALESCE(vp.approval_status_id, 2) as approval_status_id,
// //         CASE 
// //           WHEN vp.approval_status_id = 1 THEN 'Pending'
// //           WHEN vp.approval_status_id = 2 THEN 'Approved'
// //           WHEN vp.approval_status_id = 3 THEN 'Rejected'
// //           ELSE 'Approved'
// //         END as approval_status,
// //         COALESCE(vp.has_car, 0) as has_car,
// //         COALESCE(vp.can_foster, 0) as can_foster,
// //         COALESCE(vp.animal_handling, '') as animal_handling,
// //         COALESCE(vp.city, '') as city,
// //         vp.badges
// //       FROM users u
// //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// //       WHERE u.user_id = ?
// //     `, [volunteerId]);
    
// //     res.json({
// //       success: true,
// //       message: `Volunteer approval status updated to ${updatedVolunteer[0].approval_status}`,
// //       data: updatedVolunteer[0]
// //     });
    
// //   } catch (error) {
// //     console.error('Error updating volunteer approval:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to update volunteer approval status',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // // =====================================================
// // // VOLUNTEER AVAILABILITY STATUSES
// // // =====================================================

// // // Get all availability statuses for dropdowns
// // router.get('/availability-statuses', verifyToken, async (req, res) => {
// //   try {
// //     const [statuses] = await pool.execute(`
// //       SELECT 
// //         status_id, 
// //         status_name
// //       FROM availability_statuses 
// //       ORDER BY status_id
// //     `);
    
// //     res.json({
// //       success: true,
// //       data: statuses
// //     });
    
// //   } catch (error) {
// //     console.error('Error fetching availability statuses:', error);
// //     const fallbackStatuses = [
// //       { status_id: 1, status_name: 'available' },
// //       { status_id: 2, status_name: 'unavailable' }
// //     ];
// //     res.json({
// //       success: true,
// //       data: fallbackStatuses,
// //       message: 'Using fallback data'
// //     });
// //   }
// // });

// // // Get volunteer's own availability
// // router.get('/availability', verifyToken, async (req, res) => {
// //   const volunteerId = req.user.user_id;
  
// //   try {
// //     if (req.user.role_id !== 2) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Volunteer access required'
// //       });
// //     }
    
// //     const [profiles] = await pool.execute(`
// //       SELECT 
// //         u.user_id,
// //         u.username,
// //         COALESCE(vp.availability_status_id, 1) as availability_status_id,
// //         a.status_name as availability_status,
// //         DATE_FORMAT(vp.availability_updated_at, '%Y-%m-%d %H:%i:%s') as availability_updated_at,
// //         COALESCE(vp.approval_status_id, 2) as approval_status_id,
// //         COALESCE(vp.has_car, 0) as has_car,
// //         COALESCE(vp.can_foster, 0) as can_foster,
// //         COALESCE(vp.animal_handling, '') as animal_handling,
// //         COALESCE(vp.city, '') as city,
// //         vp.badges,
// //         (
// //           SELECT COUNT(*) 
// //           FROM tasks t
// //           WHERE t.assigned_to_user_id = u.user_id 
// //           AND t.status_id = 2
// //           AND t.is_deleted = 0
// //         ) as active_tasks_count
// //       FROM users u
// //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// //       LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// //       WHERE u.user_id = ? AND u.role_id = 2
// //     `, [volunteerId]);
    
// //     if (profiles.length === 0) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Volunteer profile not found'
// //       });
// //     }
    
// //     res.json({
// //       success: true,
// //       data: profiles[0]
// //     });
    
// //   } catch (error) {
// //     console.error('Error fetching volunteer availability:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to fetch availability',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // // Update volunteer's own availability (SELF-SERVICE)
// // router.patch('/availability', verifyToken, async (req, res) => {
// //   const volunteerId = req.user.user_id;
// //   const { availability_status_id } = req.body;
  
// //   if (!availability_status_id || (availability_status_id < 1 || availability_status_id > 2)) {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Invalid availability status ID. Must be 1 (available) or 2 (unavailable)'
// //     });
// //   }
  
// //   const connection = await pool.getConnection();
  
// //   try {
// //     await connection.beginTransaction();
    
// //     if (req.user.role_id !== 2) {
// //       await connection.rollback();
// //       connection.release();
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Volunteer access required'
// //       });
// //     }
    
// //     const [profileCheck] = await connection.execute(
// //       'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
// //       [volunteerId]
// //     );
    
// //     if (profileCheck.length === 0) {
// //       await connection.execute(
// //         `INSERT INTO volunteer_profiles 
// //          (user_id, approval_status_id, availability_status_id, availability_updated_at, joined_at, has_car, can_foster, animal_handling, city)
// //          VALUES (?, 2, ?, NOW(), NOW(), 0, 0, '', '')`,
// //         [volunteerId, availability_status_id]
// //       );
// //     } else {
// //       await connection.execute(
// //         `UPDATE volunteer_profiles 
// //          SET availability_status_id = ?, 
// //              availability_updated_at = NOW() 
// //          WHERE user_id = ?`,
// //         [availability_status_id, volunteerId]
// //       );
// //     }
    
// //     await connection.commit();
    
// //     const [statuses] = await pool.execute(
// //       'SELECT status_name FROM availability_statuses WHERE status_id = ?',
// //       [availability_status_id]
// //     );
    
// //     const statusName = statuses[0]?.status_name || (availability_status_id === 1 ? 'available' : 'unavailable');
    
// //     res.json({
// //       success: true,
// //       message: `Availability updated to ${statusName}`,
// //       data: {
// //         user_id: volunteerId,
// //         availability_status_id: availability_status_id,
// //         availability_status: statusName,
// //         updated_at: new Date().toISOString()
// //       }
// //     });
    
// //   } catch (error) {
// //     await connection.rollback();
// //     console.error('Error updating volunteer availability:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to update availability',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   } finally {
// //     connection.release();
// //   }
// // });

// // // Update volunteer availability status (Admin or Self)
// // router.patch('/:id/availability', verifyToken, async (req, res) => {
// //   const volunteerId = Number(req.params.id);
// //   const { availability_status_id } = req.body;
  
// //   if (!volunteerId) {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Invalid volunteer ID'
// //     });
// //   }
  
// //   if (!availability_status_id || (availability_status_id < 1 || availability_status_id > 2)) {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Invalid availability status ID. Must be 1 (available) or 2 (unavailable)'
// //     });
// //   }
  
// //   try {
// //     if (req.user.role_id !== 3 && req.user.user_id !== volunteerId) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: You can only update your own availability'
// //       });
// //     }
    
// //     const [volunteerCheck] = await pool.execute(
// //       'SELECT user_id FROM users WHERE user_id = ? AND role_id = 2 AND is_deleted = 0',
// //       [volunteerId]
// //     );
    
// //     if (volunteerCheck.length === 0) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Volunteer not found'
// //       });
// //     }
    
// //     const [profileCheck] = await pool.execute(
// //       'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
// //       [volunteerId]
// //     );
    
// //     if (profileCheck.length === 0) {
// //       await pool.execute(
// //         `INSERT INTO volunteer_profiles (user_id, approval_status_id, availability_status_id, joined_at, has_car, can_foster, animal_handling, city)
// //          VALUES (?, 2, ?, NOW(), 0, 0, '', '')`,
// //         [volunteerId, availability_status_id]
// //       );
// //     } else {
// //       await pool.execute(
// //         'UPDATE volunteer_profiles SET availability_status_id = ?, availability_updated_at = NOW() WHERE user_id = ?',
// //         [availability_status_id, volunteerId]
// //       );
// //     }
    
// //     const [statuses] = await pool.execute(
// //       'SELECT status_name FROM availability_statuses WHERE status_id = ?',
// //       [availability_status_id]
// //     );
    
// //     const statusName = statuses[0]?.status_name || (availability_status_id === 1 ? 'available' : 'unavailable');
    
// //     const [updatedVolunteer] = await pool.execute(`
// //       SELECT 
// //         u.user_id,
// //         u.username,
// //         COALESCE(vp.availability_status_id, 1) as availability_status_id,
// //         a.status_name as availability_status,
// //         COALESCE(vp.has_car, 0) as has_car,
// //         COALESCE(vp.can_foster, 0) as can_foster,
// //         COALESCE(vp.animal_handling, '') as animal_handling,
// //         COALESCE(vp.city, '') as city,
// //         vp.badges
// //       FROM users u
// //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// //       LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// //       WHERE u.user_id = ?
// //     `, [volunteerId]);
    
// //     res.json({
// //       success: true,
// //       message: `Volunteer availability updated to ${statusName}`,
// //       data: updatedVolunteer[0]
// //     });
    
// //   } catch (error) {
// //     console.error('Error updating volunteer availability:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to update volunteer availability',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // // =====================================================
// // // VOLUNTEER TASK MANAGEMENT
// // // =====================================================

// // // Get all tasks for current volunteer
// // router.get('/tasks', verifyToken, async (req, res) => {
// //   const volunteerId = req.user.user_id;
  
// //   try {
// //     if (req.user.role_id !== 2) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Volunteer access required'
// //       });
// //     }
    
// //     console.log(`Fetching tasks for volunteer: ${volunteerId}`);
    
// //     const [tasks] = await pool.execute(`
// //       SELECT 
// //         t.task_id,
// //         t.report_id,
// //         t.assigned_to_user_id,
// //         t.assigned_by_user_id,
// //         t.status_id as task_status_id,
// //         ts.status_name as task_status,
// //         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
// //         DATE_FORMAT(t.volunteer_responded_at, '%Y-%m-%d %H:%i:%s') as responded_at,
// //         t.volunteer_response,
// //         t.declined_reason,
// //         DATE_FORMAT(t.started_at, '%Y-%m-%d %H:%i:%s') as started_at,
// //         DATE_FORMAT(t.completed_at, '%Y-%m-%d %H:%i:%s') as completed_at,
// //         r.report_id,
// //         r.description,
// //         r.location_address,
// //         r.user_note,
// //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as report_submitted_at,
// //         at.type_name as animal_type,
// //         ac.condition_name as animal_condition,
// //         r.status_id as report_status_id,
// //         rs.status_name as report_status,
// //         u.username as reporter_name,
// //         CAST(u.phone AS CHAR) AS reporter_phone,
// //         u.email as reporter_email,
// //         au.username as assigned_by_name
// //       FROM tasks t
// //       INNER JOIN reports r ON t.report_id = r.report_id
// //       LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
// //       LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
// //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// //       LEFT JOIN users u ON r.user_id = u.user_id
// //       LEFT JOIN users au ON t.assigned_by_user_id = au.user_id
// //       WHERE t.assigned_to_user_id = ? 
// //         AND t.is_deleted = 0
// //         AND r.is_deleted = 0
// //       ORDER BY 
// //         CASE 
// //           WHEN t.status_id = 1 THEN 1
// //           WHEN t.status_id = 2 THEN 2
// //           WHEN t.status_id = 4 THEN 3
// //           WHEN t.status_id = 3 THEN 4
// //         END,
// //         t.assigned_at DESC
// //     `, [volunteerId]);
    
// //     const groupedTasks = {
// //       assigned: tasks.filter(t => t.task_status_id === 1),
// //       inProgress: tasks.filter(t => t.task_status_id === 2),
// //       completed: tasks.filter(t => t.task_status_id === 3),
// //       declined: tasks.filter(t => t.task_status_id === 4)
// //     };
    
// //     res.json({
// //       success: true,
// //       data: tasks,
// //       grouped: groupedTasks,
// //       counts: {
// //         total: tasks.length,
// //         assigned: groupedTasks.assigned.length,
// //         inProgress: groupedTasks.inProgress.length,
// //         completed: groupedTasks.completed.length,
// //         declined: groupedTasks.declined.length
// //       }
// //     });
    
// //   } catch (error) {
// //     console.error('Error fetching volunteer tasks:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to fetch tasks',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // // Get single task details
// // router.get('/tasks/:taskId', verifyToken, async (req, res) => {
// //   const taskId = Number(req.params.taskId);
// //   const volunteerId = req.user.user_id;
  
// //   if (!taskId) {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Invalid task ID'
// //     });
// //   }
  
// //   try {
// //     if (req.user.role_id !== 2) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Volunteer access required'
// //       });
// //     }
    
// //     const [tasks] = await pool.execute(`
// //       SELECT 
// //         t.*,
// //         ts.status_name as task_status,
// //         r.*,
// //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as report_submitted_at,
// //         at.type_name as animal_type,
// //         ac.condition_name as animal_condition,
// //         rs.status_name as report_status,
// //         u.username as reporter_name,
// //         CAST(u.phone AS CHAR) AS reporter_phone,
// //         u.email as reporter_email,
// //         au.username as assigned_by_name
// //       FROM tasks t
// //       INNER JOIN reports r ON t.report_id = r.report_id
// //       LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
// //       LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
// //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// //       LEFT JOIN users u ON r.user_id = u.user_id
// //       LEFT JOIN users au ON t.assigned_by_user_id = au.user_id
// //       WHERE t.task_id = ? 
// //         AND t.assigned_to_user_id = ?
// //         AND t.is_deleted = 0
// //         AND r.is_deleted = 0
// //     `, [taskId, volunteerId]);
    
// //     if (tasks.length === 0) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Task not found or not assigned to you'
// //       });
// //     }
    
// //     res.json({
// //       success: true,
// //       data: tasks[0]
// //     });
    
// //   } catch (error) {
// //     console.error('Error fetching task:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to fetch task',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // // Accept a task (auto-sets to in_progress and updates availability)
// // router.patch('/tasks/:taskId/accept', verifyToken, async (req, res) => {
// //   const taskId = Number(req.params.taskId);
// //   const volunteerId = req.user.user_id;
  
// //   const connection = await pool.getConnection();
  
// //   try {
// //     await connection.beginTransaction();
    
// //     if (req.user.role_id !== 2) {
// //       await connection.rollback();
// //       connection.release();
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Volunteer access required'
// //       });
// //     }
    
// //     const [tasks] = await connection.execute(
// //       `SELECT t.task_id, t.report_id, t.status_id, r.status_id as report_status_id
// //        FROM tasks t
// //        INNER JOIN reports r ON t.report_id = r.report_id
// //        WHERE t.task_id = ? AND t.assigned_to_user_id = ? AND t.is_deleted = 0`,
// //       [taskId, volunteerId]
// //     );
    
// //     if (tasks.length === 0) {
// //       await connection.rollback();
// //       connection.release();
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Task not found or not assigned to you'
// //       });
// //     }
    
// //     const task = tasks[0];
    
// //     if (task.status_id !== 1) {
// //       await connection.rollback();
// //       connection.release();
// //       return res.status(400).json({
// //         success: false,
// //         message: 'This task cannot be accepted'
// //       });
// //     }
    
// //     // Update task to in_progress (status_id = 2)
// //     await connection.execute(
// //       `UPDATE tasks 
// //        SET status_id = 2, 
// //            volunteer_responded_at = NOW(), 
// //            volunteer_response = 'accepted',
// //            started_at = NOW()
// //        WHERE task_id = ?`,
// //       [taskId]
// //     );
    
// //     // Update report status to in_progress (status_id = 3)
// //     await connection.execute(
// //       'UPDATE reports SET status_id = 3 WHERE report_id = ?',
// //       [task.report_id]
// //     );
    
// //     // AUTO-UPDATE AVAILABILITY - Check if this is their first active task
// //     const [activeTasks] = await connection.execute(
// //       `SELECT COUNT(*) as count 
// //        FROM tasks 
// //        WHERE assigned_to_user_id = ? 
// //          AND status_id = 2
// //          AND is_deleted = 0`,
// //       [volunteerId]
// //     );
    
// //     let availabilityUpdated = false;
// //     if (activeTasks[0].count === 1) {
// //       await connection.execute(
// //         `UPDATE volunteer_profiles 
// //          SET availability_status_id = 2,
// //              availability_updated_at = NOW() 
// //          WHERE user_id = ?`,
// //         [volunteerId]
// //       );
// //       availabilityUpdated = true;
// //       console.log(`Auto-set volunteer ${volunteerId} to unavailable`);
// //     }
    
// //     await connection.commit();
    
// //     res.json({
// //       success: true,
// //       message: 'Task accepted successfully',
// //       data: {
// //         task_id: taskId,
// //         status: 'in_progress',
// //         status_id: 2,
// //         accepted_at: new Date().toISOString(),
// //         availability_auto_updated: availabilityUpdated
// //       }
// //     });
    
// //   } catch (error) {
// //     await connection.rollback();
// //     console.error('Error accepting task:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to accept task',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   } finally {
// //     connection.release();
// //   }
// // });

// // // Decline a task
// // router.patch('/tasks/:taskId/decline', verifyToken, async (req, res) => {
// //   const taskId = Number(req.params.taskId);
// //   const volunteerId = req.user.user_id;
// //   const { reason } = req.body;
  
// //   const connection = await pool.getConnection();
  
// //   try {
// //     await connection.beginTransaction();
    
// //     if (req.user.role_id !== 2) {
// //       await connection.rollback();
// //       connection.release();
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Volunteer access required'
// //       });
// //     }
    
// //     const [tasks] = await connection.execute(
// //       `SELECT t.task_id, t.report_id, t.status_id
// //        FROM tasks t
// //        WHERE t.task_id = ? AND t.assigned_to_user_id = ? AND t.is_deleted = 0`,
// //       [taskId, volunteerId]
// //     );
    
// //     if (tasks.length === 0) {
// //       await connection.rollback();
// //       connection.release();
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Task not found or not assigned to you'
// //       });
// //     }
    
// //     const task = tasks[0];
    
// //     if (task.status_id !== 1) {
// //       await connection.rollback();
// //       connection.release();
// //       return res.status(400).json({
// //         success: false,
// //         message: 'This task cannot be declined'
// //       });
// //     }
    
// //     // Update task to declined (status_id = 4)
// //     await connection.execute(
// //       `UPDATE tasks 
// //        SET status_id = 4, 
// //            volunteer_responded_at = NOW(), 
// //            volunteer_response = 'declined',
// //            declined_reason = ?
// //        WHERE task_id = ?`,
// //       [reason || 'No reason provided', taskId]
// //     );
    
// //     // Update report status to DECLINED (status_id = 5)
// //     await connection.execute(
// //       'UPDATE reports SET status_id = 5 WHERE report_id = ?',
// //       [task.report_id]
// //     );
    
// //     await connection.commit();
    
// //     res.json({
// //       success: true,
// //       message: 'Task declined successfully',
// //       data: {
// //         task_id: taskId,
// //         status: 'declined',
// //         status_id: 4,
// //         declined_at: new Date().toISOString(),
// //         reason: reason || 'No reason provided'
// //       }
// //     });
    
// //   } catch (error) {
// //     await connection.rollback();
// //     console.error('Error declining task:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to decline task',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   } finally {
// //     connection.release();
// //   }
// // });

// // // =====================================================
// // // ✅ FIXED: Complete a task WITH BADGE AWARDING LOGIC
// // // =====================================================
// // router.patch('/tasks/:taskId/complete', verifyToken, async (req, res) => {
// //   const taskId = Number(req.params.taskId);
// //   const volunteerId = req.user.user_id;
  
// //   const connection = await pool.getConnection();
  
// //   try {
// //     await connection.beginTransaction();
    
// //     if (req.user.role_id !== 2) {
// //       await connection.rollback();
// //       connection.release();
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Volunteer access required'
// //       });
// //     }
    
// //     // Check if task exists and is in the correct state
// //     const [tasks] = await connection.execute(
// //       `SELECT t.task_id, t.report_id, t.status_id, 
// //               r.animal_type_id, t.assigned_at,
// //               at.type_name as animal_type
// //        FROM tasks t
// //        INNER JOIN reports r ON t.report_id = r.report_id
// //        LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// //        WHERE t.task_id = ? AND t.assigned_to_user_id = ? AND t.is_deleted = 0`,
// //       [taskId, volunteerId]
// //     );
    
// //     if (tasks.length === 0) {
// //       await connection.rollback();
// //       connection.release();
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Task not found or not assigned to you'
// //       });
// //     }
    
// //     const task = tasks[0];
    
// //     // Check if task is in progress (status_id = 2)
// //     if (task.status_id !== 2) {
// //       await connection.rollback();
// //       connection.release();
// //       return res.status(400).json({
// //         success: false,
// //         message: `Task must be in progress before completing. Current status: ${task.status_id}`
// //       });
// //     }
    
// //     // Update task to completed (status_id = 3)
// //     const [updateResult] = await connection.execute(
// //       `UPDATE tasks 
// //        SET status_id = 3, 
// //            completed_at = NOW() 
// //        WHERE task_id = ? AND status_id = 2`,
// //       [taskId]
// //     );
    
// //     if (updateResult.affectedRows === 0) {
// //       await connection.rollback();
// //       connection.release();
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Failed to update task status. Task may have been modified.'
// //       });
// //     }
    
// //     // Update report status to completed (status_id = 4)
// //     await connection.execute(
// //       'UPDATE reports SET status_id = 4 WHERE report_id = ?',
// //       [task.report_id]
// //     );
    
// //     // AUTO-UPDATE AVAILABILITY - Check if they have any other active tasks
// //     const [activeTasks] = await connection.execute(
// //       `SELECT COUNT(*) as count 
// //        FROM tasks 
// //        WHERE assigned_to_user_id = ? 
// //          AND status_id = 2
// //          AND is_deleted = 0`,
// //       [volunteerId]
// //     );
    
// //     let availabilityUpdated = false;
// //     if (activeTasks[0].count === 0) {
// //       await connection.execute(
// //         `UPDATE volunteer_profiles 
// //          SET availability_status_id = 1,
// //              availability_updated_at = NOW() 
// //          WHERE user_id = ?`,
// //         [volunteerId]
// //       );
// //       availabilityUpdated = true;
// //       console.log(`Auto-set volunteer ${volunteerId} to available`);
// //     }
    
// //     // 🏆 CHECK AND AWARD BADGES 🏆
// //     const awardedBadges = [];
    
// //     // Get current time for time-based badges
// //     const now = new Date();
// //     const currentHour = now.getHours();
    
// //     // Get total completed tasks count (including this one)
// //     const [completedCount] = await connection.execute(
// //       `SELECT COUNT(*) as total_completed
// //        FROM tasks 
// //        WHERE assigned_to_user_id = ? 
// //          AND status_id = 3 
// //          AND is_deleted = 0`,
// //       [volunteerId]
// //     );
    
// //     const totalCompleted = completedCount[0].total_completed;
    
// //     // 1. First Rescue badge (badge_id = 1) - First completed task
// //     if (totalCompleted === 1) {
// //       const [existing] = await connection.execute(
// //         'SELECT award_id FROM badge_awards WHERE user_id = ? AND badge_id = 1',
// //         [volunteerId]
// //       );
      
// //       if (existing.length === 0) {
// //         await connection.execute(
// //           `INSERT INTO badge_awards (user_id, badge_id, awarded_at, task_id)
// //            VALUES (?, 1, NOW(), ?)`,
// //           [volunteerId, taskId]
// //         );
// //         awardedBadges.push('First Rescue');
// //       }
// //     }
    
// //     // 2. Speedy badge (badge_id = 2) - Completed within 1 hour of assignment
// //     const [timeDiff] = await connection.execute(
// //       `SELECT TIMESTAMPDIFF(HOUR, assigned_at, NOW()) as hours_taken
// //        FROM tasks
// //        WHERE task_id = ?`,
// //       [taskId]
// //     );
    
// //     if (timeDiff.length > 0 && timeDiff[0].hours_taken < 1) {
// //       const [existing] = await connection.execute(
// //         'SELECT award_id FROM badge_awards WHERE user_id = ? AND badge_id = 2',
// //         [volunteerId]
// //       );
      
// //       if (existing.length === 0) {
// //         await connection.execute(
// //           `INSERT INTO badge_awards (user_id, badge_id, awarded_at, task_id)
// //            VALUES (?, 2, NOW(), ?)`,
// //           [volunteerId, taskId]
// //         );
// //         awardedBadges.push('Speedy');
// //       }
// //     }
    
// //     // 4. Night Owl badge (badge_id = 4) - Completed after 10pm or before 5am
// //     if (currentHour >= 22 || currentHour < 5) {
// //       const [existing] = await connection.execute(
// //         'SELECT award_id FROM badge_awards WHERE user_id = ? AND badge_id = 4',
// //         [volunteerId]
// //       );
      
// //       if (existing.length === 0) {
// //         await connection.execute(
// //           `INSERT INTO badge_awards (user_id, badge_id, awarded_at, task_id)
// //            VALUES (?, 4, NOW(), ?)`,
// //           [volunteerId, taskId]
// //         );
// //         awardedBadges.push('Night Owl');
// //       }
// //     }
    
// //     // 6. Cat Whisperer badge (badge_id = 6) - Rescued 5+ cats
// //     if (task.animal_type && task.animal_type.toLowerCase().includes('cat')) {
// //       const [catCount] = await connection.execute(
// //         `SELECT COUNT(*) as cat_rescues
// //          FROM tasks t
// //          INNER JOIN reports r ON t.report_id = r.report_id
// //          INNER JOIN animal_types at ON r.animal_type_id = at.type_id
// //          WHERE t.assigned_to_user_id = ? 
// //            AND t.status_id = 3
// //            AND t.is_deleted = 0
// //            AND LOWER(at.type_name) LIKE '%cat%'`,
// //         [volunteerId]
// //       );
      
// //       if (catCount[0].cat_rescues >= 5) {
// //         const [existing] = await connection.execute(
// //           'SELECT award_id FROM badge_awards WHERE user_id = ? AND badge_id = 6',
// //           [volunteerId]
// //         );
        
// //         if (existing.length === 0) {
// //           await connection.execute(
// //             `INSERT INTO badge_awards (user_id, badge_id, awarded_at, task_id)
// //              VALUES (?, 6, NOW(), ?)`,
// //             [volunteerId, taskId]
// //           );
// //           awardedBadges.push('Cat Whisperer');
// //         }
// //       }
// //     }
    
// //     // 7. Dog Savior badge (badge_id = 7) - Rescued 5+ dogs
// //     if (task.animal_type && task.animal_type.toLowerCase().includes('dog')) {
// //       const [dogCount] = await connection.execute(
// //         `SELECT COUNT(*) as dog_rescues
// //          FROM tasks t
// //          INNER JOIN reports r ON t.report_id = r.report_id
// //          INNER JOIN animal_types at ON r.animal_type_id = at.type_id
// //          WHERE t.assigned_to_user_id = ? 
// //            AND t.status_id = 3
// //            AND t.is_deleted = 0
// //            AND LOWER(at.type_name) LIKE '%dog%'`,
// //         [volunteerId]
// //       );
      
// //       if (dogCount[0].dog_rescues >= 5) {
// //         const [existing] = await connection.execute(
// //           'SELECT award_id FROM badge_awards WHERE user_id = ? AND badge_id = 7',
// //           [volunteerId]
// //         );
        
// //         if (existing.length === 0) {
// //           await connection.execute(
// //             `INSERT INTO badge_awards (user_id, badge_id, awarded_at, task_id)
// //              VALUES (?, 7, NOW(), ?)`,
// //             [volunteerId, taskId]
// //           );
// //           awardedBadges.push('Dog Savior');
// //         }
// //       }
// //     }
    
// //     // 8. Horse Hero badge (badge_id = 8) - Rescued a horse
// //     if (task.animal_type && task.animal_type.toLowerCase().includes('horse')) {
// //       const [existing] = await connection.execute(
// //         'SELECT award_id FROM badge_awards WHERE user_id = ? AND badge_id = 8',
// //         [volunteerId]
// //       );
      
// //       if (existing.length === 0) {
// //         await connection.execute(
// //           `INSERT INTO badge_awards (user_id, badge_id, awarded_at, task_id)
// //            VALUES (?, 8, NOW(), ?)`,
// //           [volunteerId, taskId]
// //         );
// //         awardedBadges.push('Horse Hero');
// //       }
// //     }
    
// //     await connection.commit();
    
// //     res.json({
// //       success: true,
// //       message: awardedBadges.length > 0 
// //         ? `Task completed successfully! 🏆 You earned: ${awardedBadges.join(', ')}`
// //         : 'Task completed successfully! Thank you for your service!',
// //       data: {
// //         task_id: taskId,
// //         status: 'completed',
// //         status_id: 3,
// //         completed_at: new Date().toISOString(),
// //         availability_auto_updated: availabilityUpdated,
// //         badges_awarded: awardedBadges
// //       }
// //     });
    
// //   } catch (error) {
// //     await connection.rollback();
// //     console.error('Error completing task:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to complete task: ' + (error.message || 'Unknown error'),
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   } finally {
// //     connection.release();
// //   }
// // });

// // // =====================================================
// // // VOLUNTEER ACTIVE MISSION
// // // =====================================================
// // router.get('/:id/active-mission', verifyToken, async (req, res) => {
// //   const volunteerId = Number(req.params.id);
  
// //   if (!volunteerId) {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Invalid volunteer ID'
// //     });
// //   }
  
// //   try {
// //     if (req.user.role_id !== 3 && req.user.user_id !== volunteerId) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: You can only view your own missions'
// //       });
// //     }

// //     console.log(`Fetching ACTIVE mission for volunteer ${volunteerId}...`);
    
// //     const [missions] = await pool.execute(`
// //       SELECT 
// //         t.task_id,
// //         t.report_id,
// //         t.assigned_to_user_id as volunteer_id,
// //         t.status_id as task_status_id,
// //         ts.status_name as task_status,
// //         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
// //         DATE_FORMAT(t.started_at, '%Y-%m-%d %H:%i:%s') as started_at,
// //         DATE_FORMAT(t.completed_at, '%Y-%m-%d %H:%i:%s') as completed_at,
// //         r.report_id,
// //         r.user_id,
// //         r.description,
// //         r.location_address,
// //         r.user_note,
// //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// //         at.type_name as animal_type,
// //         ac.condition_name as animal_condition,
// //         r.status_id as report_status_id,
// //         rs.status_name as report_status,
// //         u.username as reporter_name,
// //         CAST(COALESCE(u.phone, '') AS CHAR) AS reporter_phone,
// //         u.email as reporter_email,
// //         v.username as volunteer_name,
// //         v.email as volunteer_email,
// //         CAST(v.phone AS CHAR) AS volunteer_phone
// //       FROM tasks t
// //       INNER JOIN reports r ON t.report_id = r.report_id
// //       LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
// //       LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
// //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// //       LEFT JOIN users u ON r.user_id = u.user_id
// //       LEFT JOIN users v ON t.assigned_to_user_id = v.user_id
// //       WHERE t.assigned_to_user_id = ? 
// //         AND t.status_id = 2
// //         AND t.is_deleted = 0
// //         AND r.is_deleted = 0
// //       ORDER BY t.assigned_at DESC
// //       LIMIT 1
// //     `, [volunteerId]);
    
// //     if (missions.length === 0) {
// //       return res.json({
// //         success: true,
// //         data: null,
// //         message: 'No active mission found'
// //       });
// //     }
    
// //     console.log(`Found active mission for volunteer ${volunteerId}: Report #${missions[0].report_id}, Task #${missions[0].task_id}`);
    
// //     res.json({
// //       success: true,
// //       data: missions[0]
// //     });
    
// //   } catch (error) {
// //     console.error('Error fetching volunteer active mission:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to fetch active mission',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // // =====================================================
// // // VOLUNTEER REPORTS & ASSIGNMENTS
// // // =====================================================

// // // Get volunteer's assigned reports
// // router.get('/:id/reports', verifyToken, async (req, res) => {
// //   const volunteerId = Number(req.params.id);
  
// //   if (!volunteerId) {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Invalid volunteer ID'
// //     });
// //   }
  
// //   try {
// //     if (req.user.role_id !== 3 && req.user.user_id !== volunteerId) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: You can only view your own reports'
// //       });
// //     }
    
// //     const [reports] = await pool.execute(`
// //       SELECT 
// //         r.report_id,
// //         r.description,
// //         r.location_address,
// //         r.user_note,
// //         DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
// //         at.type_name as animal_type,
// //         ac.condition_name as animal_condition,
// //         r.status_id,
// //         u.username as reporter_name,
// //         CAST(u.phone AS CHAR) AS reporter_phone,
// //         u.email as reporter_email,
// //         t.task_id,
// //         t.status_id as task_status,
// //         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at
// //       FROM tasks t
// //       INNER JOIN reports r ON t.report_id = r.report_id
// //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// //       LEFT JOIN users u ON r.user_id = u.user_id
// //       WHERE t.assigned_to_user_id = ? 
// //         AND t.is_deleted = 0
// //         AND r.is_deleted = 0
// //       ORDER BY t.assigned_at DESC
// //     `, [volunteerId]);
    
// //     res.json({
// //       success: true,
// //       data: reports,
// //       count: reports.length
// //     });
    
// //   } catch (error) {
// //     console.error('Error fetching volunteer reports:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to fetch volunteer reports',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // // =====================================================
// // // 🏆 VOLUNTEER BADGES & ACHIEVEMENTS
// // // =====================================================

// // router.get('/:id/badges', verifyToken, async (req, res) => {
// //   try {
// //     const userId = Number(req.params.id);
    
// //     if (req.user.user_id !== userId && req.user.role_id !== 3) {
// //       return res.status(403).json({ 
// //         success: false, 
// //         message: 'Forbidden' 
// //       });
// //     }

// //     const [badges] = await pool.execute(`
// //       SELECT 
// //         bd.badge_id,
// //         bd.badge_name,
// //         bd.description,
// //         CASE 
// //           WHEN ba.award_id IS NOT NULL THEN 'unlocked'
// //           ELSE 'locked'
// //         END as status,
// //         DATE_FORMAT(ba.awarded_at, '%Y-%m-%d') as awarded_at,
// //         ba.task_id
// //       FROM badge_definitions bd
// //       LEFT JOIN badge_awards ba ON bd.badge_id = ba.badge_id AND ba.user_id = ?
// //       ORDER BY 
// //         CASE WHEN ba.award_id IS NOT NULL THEN 0 ELSE 1 END,
// //         ba.awarded_at DESC,
// //         bd.badge_id
// //     `, [userId]);

// //     const [taskCount] = await pool.execute(`
// //       SELECT COUNT(*) as total_tasks
// //       FROM tasks 
// //       WHERE assigned_to_user_id = ? AND status_id = 3 AND is_deleted = 0
// //     `, [userId]);

// //     const [recent] = await pool.execute(`
// //       SELECT 
// //         bd.badge_name,
// //         DATE_FORMAT(ba.awarded_at, '%Y-%m-%d') as awarded_at
// //       FROM badge_awards ba
// //       JOIN badge_definitions bd ON ba.badge_id = bd.badge_id
// //       WHERE ba.user_id = ?
// //       ORDER BY ba.awarded_at DESC
// //       LIMIT 3
// //     `, [userId]);

// //     res.json({
// //       success: true,
// //       badges: badges,
// //       total_tasks: taskCount[0]?.total_tasks || 0,
// //       recent_badges: recent,
// //       count: badges.filter(b => b.status === 'unlocked').length
// //     });

// //   } catch (err) {
// //     console.error('GET badges error:', err);
// //     res.status(500).json({ 
// //       success: false, 
// //       message: 'Failed to fetch badges' 
// //     });
// //   }
// // });

// // router.get('/:id/badge-stats', verifyToken, async (req, res) => {
// //   try {
// //     const userId = Number(req.params.id);
    
// //     if (req.user.user_id !== userId && req.user.role_id !== 3) {
// //       return res.status(403).json({ success: false, message: 'Forbidden' });
// //     }

// //     const [stats] = await pool.execute(`
// //       SELECT 
// //         bd.badge_name,
// //         COUNT(ba.award_id) as count
// //       FROM badge_definitions bd
// //       LEFT JOIN badge_awards ba ON bd.badge_id = ba.badge_id AND ba.user_id = ?
// //       GROUP BY bd.badge_id, bd.badge_name
// //       ORDER BY bd.badge_id
// //     `, [userId]);

// //     res.json({
// //       success: true,
// //       stats: stats
// //     });

// //   } catch (err) {
// //     console.error('GET badge stats error:', err);
// //     res.status(500).json({ success: false, message: 'Failed to fetch badge stats' });
// //   }
// // });

// // // =====================================================
// // // ADMIN ASSIGNMENT & REASSIGNMENT ROUTES
// // // =====================================================

// // router.post('/assign', verifyToken, async (req, res) => {
// //   const connection = await pool.getConnection();
  
// //   try {
// //     if (req.user.role_id !== 3) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Admin access required'
// //       });
// //     }

// //     const { report_id, volunteer_id, status_id } = req.body;
    
// //     if (!report_id || !volunteer_id) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Report ID and Volunteer ID are required'
// //       });
// //     }

// //     await connection.beginTransaction();

// //     console.log(`Assigning volunteer ${volunteer_id} to report ${report_id}`);
    
// //     const [reportCheck] = await connection.execute(
// //       'SELECT report_id, status_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// //       [report_id]
// //     );
    
// //     if (reportCheck.length === 0) {
// //       await connection.rollback();
// //       connection.release();
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Report not found'
// //       });
// //     }
    
// //     const [volunteerCheck] = await connection.execute(`
// //       SELECT u.user_id, u.username, u.email, u.phone 
// //       FROM users u
// //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// //       WHERE u.user_id = ? 
// //         AND u.role_id = 2 
// //         AND u.is_deleted = 0
// //         AND (vp.approval_status_id = 2 OR (vp.approval_status_id IS NULL AND u.user_id IN (2, 8)))
// //     `, [volunteer_id]);
    
// //     if (volunteerCheck.length === 0) {
// //       await connection.rollback();
// //       connection.release();
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Volunteer not found, not approved, or is rejected'
// //       });
// //     }
    
// //     const [existingTasks] = await connection.execute(
// //       'SELECT task_id, assigned_to_user_id, status_id, is_deleted FROM tasks WHERE report_id = ?',
// //       [report_id]
// //     );
    
// //     const taskStatus = status_id || 2;
    
// //     if (existingTasks.length > 0) {
// //       const existingTask = existingTasks[0];
      
// //       if (existingTask.is_deleted === 1) {
// //         console.log(`Reactivating soft-deleted task ${existingTask.task_id} for report ${report_id}`);
// //         await connection.execute(
// //           'UPDATE tasks SET assigned_to_user_id = ?, status_id = ?, assigned_at = NOW(), is_deleted = 0 WHERE task_id = ?',
// //           [volunteer_id, taskStatus, existingTask.task_id]
// //         );
// //       } else {
// //         console.log(`Updating existing task ${existingTask.task_id} for report ${report_id}`);
// //         await connection.execute(
// //           'UPDATE tasks SET assigned_to_user_id = ?, status_id = ?, assigned_at = NOW() WHERE task_id = ?',
// //           [volunteer_id, taskStatus, existingTask.task_id]
// //         );
// //       }
// //     } else {
// //       console.log(`Creating new task for report ${report_id}...`);
// //       await connection.execute(
// //         `INSERT INTO tasks (report_id, assigned_to_user_id, assigned_by_user_id, status_id, assigned_at, is_deleted)
// //          VALUES (?, ?, ?, ?, NOW(), 0)`,
// //         [report_id, volunteer_id, req.user.user_id, taskStatus]
// //       );
// //     }
    
// //     await connection.execute(
// //       'UPDATE reports SET status_id = ? WHERE report_id = ?',
// //       [taskStatus, report_id]
// //     );

// //     await connection.commit();
    
// //     const volunteer = volunteerCheck[0];
    
// //     res.json({
// //       success: true,
// //       message: 'Volunteer assigned successfully',
// //       data: {
// //         report_id: report_id,
// //         volunteer_id: volunteer.user_id,
// //         volunteer_name: volunteer.username,
// //         volunteer_email: volunteer.email,
// //         volunteer_phone: volunteer.phone || '',
// //         status_id: taskStatus,
// //         timestamp: new Date().toISOString()
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

// // router.delete('/unassign/:report_id', verifyToken, async (req, res) => {
// //   const connection = await pool.getConnection();
// //   const reportId = Number(req.params.report_id);
  
// //   try {
// //     if (req.user.role_id !== 3) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Admin access required'
// //       });
// //     }
    
// //     if (!reportId) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Report ID is required'
// //       });
// //     }
    
// //     await connection.beginTransaction();
    
// //     console.log(`Unassigning volunteer from report ${reportId}`);
    
// //     const [reportCheck] = await connection.execute(
// //       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// //       [reportId]
// //     );
    
// //     if (reportCheck.length === 0) {
// //       await connection.rollback();
// //       connection.release();
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Report not found'
// //       });
// //     }
    
// //     const [taskCheck] = await connection.execute(
// //       'SELECT task_id FROM tasks WHERE report_id = ? AND is_deleted = 0',
// //       [reportId]
// //     );
    
// //     if (taskCheck.length === 0) {
// //       await connection.rollback();
// //       connection.release();
// //       return res.status(404).json({
// //         success: false,
// //         message: 'No active task found for this report'
// //       });
// //     }
    
// //     await connection.execute(
// //       'UPDATE tasks SET is_deleted = 1 WHERE report_id = ? AND is_deleted = 0',
// //       [reportId]
// //     );
    
// //     await connection.execute(
// //       'UPDATE reports SET status_id = 1 WHERE report_id = ?',
// //       [reportId]
// //     );
    
// //     await connection.commit();
    
// //     res.json({
// //       success: true,
// //       message: 'Volunteer unassigned successfully',
// //       data: {
// //         report_id: reportId,
// //         unassigned_at: new Date().toISOString()
// //       }
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

// // router.post('/force-assign', verifyToken, async (req, res) => {
// //   const connection = await pool.getConnection();
  
// //   try {
// //     if (req.user.role_id !== 3) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Admin access required'
// //       });
// //     }

// //     const { report_id, volunteer_id, status_id } = req.body;
    
// //     if (!report_id || !volunteer_id) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Report ID and Volunteer ID are required'
// //       });
// //     }

// //     await connection.beginTransaction();

// //     console.log(`Force assigning volunteer ${volunteer_id} to report ${report_id}`);
    
// //     const [reportCheck] = await connection.execute(
// //       'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
// //       [report_id]
// //     );
    
// //     if (reportCheck.length === 0) {
// //       await connection.rollback();
// //       connection.release();
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Report not found'
// //       });
// //     }
    
// //     const [volunteerCheck] = await connection.execute(`
// //       SELECT u.user_id, u.username, u.email, u.phone 
// //       FROM users u
// //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// //       WHERE u.user_id = ? 
// //         AND u.role_id = 2 
// //         AND u.is_deleted = 0
// //         AND (vp.approval_status_id = 2 OR (vp.approval_status_id IS NULL AND u.user_id IN (2, 8)))
// //     `, [volunteer_id]);
    
// //     if (volunteerCheck.length === 0) {
// //       await connection.rollback();
// //       connection.release();
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Volunteer not found, not approved, or is rejected'
// //       });
// //     }
    
// //     await connection.execute(
// //       'DELETE FROM tasks WHERE report_id = ?',
// //       [report_id]
// //     );
    
// //     const [result] = await connection.execute(
// //       `INSERT INTO tasks (report_id, assigned_to_user_id, assigned_by_user_id, status_id, assigned_at, is_deleted)
// //        VALUES (?, ?, ?, ?, NOW(), 0)`,
// //       [report_id, volunteer_id, req.user.user_id, status_id || 2]
// //     );
    
// //     await connection.execute(
// //       'UPDATE reports SET status_id = ? WHERE report_id = ?',
// //       [status_id || 2, report_id]
// //     );

// //     await connection.commit();
    
// //     const volunteer = volunteerCheck[0];
    
// //     res.json({
// //       success: true,
// //       message: 'Volunteer force-assigned successfully',
// //       data: {
// //         report_id: report_id,
// //         volunteer_id: volunteer.user_id,
// //         volunteer_name: volunteer.username,
// //         volunteer_email: volunteer.email,
// //         volunteer_phone: volunteer.phone || '',
// //         status_id: status_id || 2,
// //         task_id: result.insertId
// //       }
// //     });

// //   } catch (error) {
// //     await connection.rollback();
// //     console.error('Error force assigning volunteer:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to assign volunteer',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   } finally {
// //     connection.release();
// //   }
// // });

// // router.get('/available-for-reassignment/:reportId', verifyToken, async (req, res) => {
// //   const reportId = Number(req.params.reportId);
  
// //   try {
// //     if (req.user.role_id !== 3) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Admin access required'
// //       });
// //     }
    
// //     const [volunteers] = await pool.execute(`
// //       SELECT 
// //         u.user_id,
// //         u.username,
// //         u.email,
// //         COALESCE(CAST(u.phone AS CHAR), '') as phone,
// //         vp.availability_status_id,
// //         a.status_name as availability_status,
// //         COALESCE(vp.has_car, 0) as has_car,
// //         COALESCE(vp.can_foster, 0) as can_foster,
// //         COALESCE(vp.animal_handling, '') as animal_handling,
// //         COALESCE(vp.city, '') as city,
// //         (
// //           SELECT COUNT(*) 
// //           FROM tasks t
// //           WHERE t.assigned_to_user_id = u.user_id 
// //           AND t.status_id = 2
// //           AND t.is_deleted = 0
// //         ) as active_tasks_count
// //       FROM users u
// //       INNER JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// //       INNER JOIN availability_statuses a ON vp.availability_status_id = a.status_id
// //       WHERE u.role_id = 2
// //         AND u.is_deleted = 0
// //         AND vp.approval_status_id = 2
// //         AND vp.availability_status_id = 1
// //         AND u.user_id NOT IN (
// //           SELECT assigned_to_user_id 
// //           FROM tasks 
// //           WHERE report_id = ? AND is_deleted = 0
// //         )
// //       ORDER BY active_tasks_count ASC, u.username ASC
// //     `, [reportId]);
    
// //     res.json({
// //       success: true,
// //       data: volunteers,
// //       count: volunteers.length,
// //       report_id: reportId
// //     });
    
// //   } catch (error) {
// //     console.error('Error fetching available volunteers:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to fetch available volunteers',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // router.post('/reassign', verifyToken, async (req, res) => {
// //   const connection = await pool.getConnection();
  
// //   try {
// //     if (req.user.role_id !== 3) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Admin access required'
// //       });
// //     }

// //     const { task_id, new_volunteer_id, report_id } = req.body;
    
// //     if ((!task_id && !report_id) || !new_volunteer_id) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Task ID or Report ID and New Volunteer ID are required'
// //       });
// //     }

// //     await connection.beginTransaction();
    
// //     let actualTaskId = task_id;
// //     if (!actualTaskId && report_id) {
// //       const [tasks] = await connection.execute(
// //         'SELECT task_id, assigned_to_user_id FROM tasks WHERE report_id = ? AND is_deleted = 0 ORDER BY task_id DESC LIMIT 1',
// //         [report_id]
// //       );
// //       if (tasks.length > 0) {
// //         actualTaskId = tasks[0].task_id;
// //       }
// //     }
    
// //     if (!actualTaskId) {
// //       await connection.rollback();
// //       connection.release();
// //       return res.status(404).json({
// //         success: false,
// //         message: 'No active task found for reassignment'
// //       });
// //     }
    
// //     const [oldTasks] = await connection.execute(
// //       'SELECT * FROM tasks WHERE task_id = ?',
// //       [actualTaskId]
// //     );
    
// //     if (oldTasks.length === 0) {
// //       await connection.rollback();
// //       connection.release();
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Task not found'
// //       });
// //     }
    
// //     const oldTask = oldTasks[0];
    
// //     await connection.execute(
// //       'UPDATE tasks SET is_deleted = 1, status_id = 4 WHERE task_id = ?',
// //       [actualTaskId]
// //     );
    
// //     const [result] = await connection.execute(
// //       `INSERT INTO tasks 
// //        (report_id, assigned_to_user_id, assigned_by_user_id, status_id, assigned_at, is_deleted)
// //        VALUES (?, ?, ?, 1, NOW(), 0)`,
// //       [oldTask.report_id, new_volunteer_id, req.user.user_id]
// //     );
    
// //     await connection.execute(
// //       'UPDATE reports SET status_id = 2 WHERE report_id = ?',
// //       [oldTask.report_id]
// //     );
    
// //     await connection.commit();
    
// //     res.json({
// //       success: true,
// //       message: 'Task reassigned successfully',
// //       data: {
// //         old_task_id: actualTaskId,
// //         new_task_id: result.insertId,
// //         new_volunteer_id: new_volunteer_id,
// //         reassigned_at: new Date().toISOString()
// //       }
// //     });

// //   } catch (error) {
// //     await connection.rollback();
// //     console.error('Error reassigning volunteer:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to reassign volunteer',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   } finally {
// //     connection.release();
// //   }
// // });

// // router.get('/declined-tasks', verifyToken, async (req, res) => {
// //   try {
// //     if (req.user.role_id !== 3) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Admin access required'
// //       });
// //     }
    
// //     const [tasks] = await pool.execute(`
// //       SELECT 
// //         t.task_id,
// //         t.report_id,
// //         t.assigned_to_user_id,
// //         t.assigned_by_user_id,
// //         t.status_id,
// //         ts.status_name as task_status,
// //         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
// //         DATE_FORMAT(t.volunteer_responded_at, '%Y-%m-%d %H:%i:%s') as responded_at,
// //         t.volunteer_response,
// //         t.declined_reason,
// //         vu.username as volunteer_name,
// //         r.report_id,
// //         r.description,
// //         r.location_address,
// //         at.type_name as animal_type,
// //         ac.condition_name as animal_condition,
// //         ru.username as reporter_name
// //       FROM tasks t
// //       INNER JOIN reports r ON t.report_id = r.report_id
// //       LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
// //       LEFT JOIN users vu ON t.assigned_to_user_id = vu.user_id
// //       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
// //       LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
// //       LEFT JOIN users ru ON r.user_id = ru.user_id
// //       WHERE t.status_id = 4
// //         AND t.is_deleted = 0
// //         AND r.is_deleted = 0
// //       ORDER BY t.volunteer_responded_at DESC
// //     `);
    
// //     res.json({
// //       success: true,
// //       data: tasks,
// //       count: tasks.length
// //     });
    
// //   } catch (error) {
// //     console.error('Error fetching declined tasks:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to fetch declined tasks',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // router.get('/report/:report_id/task', verifyToken, async (req, res) => {
// //   const reportId = Number(req.params.report_id);
  
// //   if (!reportId) {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Report ID is required'
// //     });
// //   }
  
// //   try {
// //     if (req.user.role_id !== 3) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Admin access required'
// //       });
// //     }
    
// //     const [tasks] = await pool.execute(`
// //       SELECT 
// //         t.task_id,
// //         t.report_id,
// //         t.assigned_to_user_id,
// //         t.assigned_by_user_id,
// //         t.status_id,
// //         ts.status_name as task_status,
// //         DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
// //         t.started_at,
// //         t.completed_at,
// //         t.is_deleted,
// //         u.username as volunteer_name,
// //         u.email as volunteer_email,
// //         u2.username as assigned_by_name,
// //         r.status_id as report_status
// //       FROM tasks t
// //       LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
// //       LEFT JOIN users u ON t.assigned_to_user_id = u.user_id
// //       LEFT JOIN users u2 ON t.assigned_by_user_id = u2.user_id
// //       LEFT JOIN reports r ON t.report_id = r.report_id
// //       WHERE t.report_id = ?
// //       ORDER BY t.assigned_at DESC
// //       LIMIT 1
// //     `, [reportId]);
    
// //     if (tasks.length === 0) {
// //       return res.json({
// //         success: true,
// //         data: null,
// //         message: 'No task found for this report'
// //       });
// //     }
    
// //     res.json({
// //       success: true,
// //       data: tasks[0],
// //       message: 'Task found'
// //     });
    
// //   } catch (error) {
// //     console.error('Error fetching task:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to fetch task',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // // =====================================================
// // // ADMIN FIX UTILITIES
// // // =====================================================

// // router.post('/fix-task/:task_id', verifyToken, async (req, res) => {
// //   const connection = await pool.getConnection();
// //   const taskId = Number(req.params.task_id);
  
// //   try {
// //     if (req.user.role_id !== 3) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Admin access required'
// //       });
// //     }
    
// //     if (!taskId) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Task ID is required'
// //       });
// //     }
    
// //     await connection.beginTransaction();
    
// //     const [tasks] = await connection.execute(
// //       'SELECT * FROM tasks WHERE task_id = ?',
// //       [taskId]
// //     );
    
// //     if (tasks.length === 0) {
// //       await connection.rollback();
// //       connection.release();
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Task not found'
// //       });
// //     }
    
// //     const task = tasks[0];
// //     const fixes = [];
    
// //     if (task.is_deleted === 1 && task.status_id === 2) {
// //       await connection.execute(
// //         'UPDATE tasks SET status_id = 1 WHERE task_id = ?',
// //         [taskId]
// //       );
// //       fixes.push(`status ${task.status_id} -> 1 (deleted)`);
// //     }
    
// //     if (task.completed_at && task.status_id !== 3) {
// //       await connection.execute(
// //         'UPDATE tasks SET status_id = 3 WHERE task_id = ?',
// //         [taskId]
// //       );
// //       fixes.push(`status ${task.status_id} -> 3 (completed)`);
// //     }
    
// //     if (fixes.length === 0) {
// //       await connection.rollback();
// //       connection.release();
// //       return res.json({
// //         success: true,
// //         message: 'Task is already in consistent state',
// //         data: task
// //       });
// //     }
    
// //     await connection.commit();
    
// //     res.json({
// //       success: true,
// //       message: `Task fixed: ${fixes.join(', ')}`,
// //       data: {
// //         task_id: taskId,
// //         fixes: fixes
// //       }
// //     });
    
// //   } catch (error) {
// //     await connection.rollback();
// //     console.error('Error fixing task:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to fix task',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   } finally {
// //     connection.release();
// //   }
// // });

// // router.post('/fix-report/:report_id', verifyToken, async (req, res) => {
// //   const connection = await pool.getConnection();
// //   const reportId = Number(req.params.report_id);
  
// //   try {
// //     if (req.user.role_id !== 3) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Forbidden: Admin access required'
// //       });
// //     }
    
// //     if (!reportId) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Report ID is required'
// //       });
// //     }
    
// //     await connection.beginTransaction();
    
// //     console.log(`Fixing report ${reportId} tasks...`);
    
// //     const [tasks] = await connection.execute(
// //       'SELECT * FROM tasks WHERE report_id = ? ORDER BY task_id DESC',
// //       [reportId]
// //     );
    
// //     if (tasks.length === 0) {
// //       await connection.rollback();
// //       connection.release();
// //       return res.status(404).json({
// //         success: false,
// //         message: 'No tasks found for this report'
// //       });
// //     }
    
// //     const fixes = [];
    
// //     for (const task of tasks) {
// //       if (task.is_deleted === 1 && task.status_id >= 2) {
// //         await connection.execute(
// //           'UPDATE tasks SET status_id = 1 WHERE task_id = ?',
// //           [task.task_id]
// //         );
// //         fixes.push({
// //           task_id: task.task_id,
// //           change: `status ${task.status_id} -> 1 (deleted)`
// //         });
// //       }
      
// //       if (task.completed_at && task.status_id !== 3) {
// //         await connection.execute(
// //           'UPDATE tasks SET status_id = 3 WHERE task_id = ?',
// //           [task.task_id]
// //         );
// //         fixes.push({
// //           task_id: task.task_id,
// //           change: `status ${task.status_id} -> 3 (completed)`
// //         });
// //       }
// //     }
    
// //     const latestTask = tasks[0];
// //     let reportStatus = 1;
    
// //     if (latestTask.is_deleted === 0) {
// //       if (latestTask.status_id === 2) reportStatus = 3;
// //       else if (latestTask.status_id === 3) reportStatus = 4;
// //       else if (latestTask.status_id === 4) reportStatus = 1;
// //       else reportStatus = latestTask.status_id;
// //     }
    
// //     await connection.execute(
// //       'UPDATE reports SET status_id = ? WHERE report_id = ?',
// //       [reportStatus, reportId]
// //     );
    
// //     await connection.commit();
    
// //     res.json({
// //       success: true,
// //       message: `Fixed ${fixes.length} issues for report ${reportId}`,
// //       fixes: fixes,
// //       data: {
// //         report_id: reportId,
// //         report_status: reportStatus,
// //         tasks_fixed: fixes.length
// //       }
// //     });
    
// //   } catch (error) {
// //     await connection.rollback();
// //     console.error('Error fixing report:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to fix report',
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   } finally {
// //     connection.release();
// //   }
// // });

// // module.exports = router;

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

console.log('Volunteer routes initialized');

// =====================================================
// ADMIN ROUTES - Volunteer Management
// =====================================================

// Get ALL volunteers (for admin assignment) - SHOW ONLY APPROVED VOLUNTEERS
router.get('/available', verifyToken, async (req, res) => {
  try {
    if (req.user.role_id !== 3) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required'
      });
    }

    console.log('Fetching APPROVED volunteers for assignment...');
    
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
        a.status_name as availability_status,
        COALESCE(vp.has_car, 0) as has_car,
        COALESCE(vp.can_foster, 0) as can_foster,
        COALESCE(vp.animal_handling, '') as animal_handling,
        COALESCE(vp.city, '') as city,
        vp.badges,
        (
          SELECT COUNT(*) 
          FROM tasks t
          WHERE t.assigned_to_user_id = u.user_id 
          AND t.status_id = 2
          AND t.is_deleted = 0
        ) as assigned_reports_count
      FROM users u
      LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
      LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
      WHERE u.role_id = 2
        AND u.is_deleted = 0
        AND (vp.approval_status_id = 2 OR (vp.approval_status_id IS NULL AND u.user_id IN (2, 8)))
      ORDER BY u.username ASC
    `);

    console.log(`Found ${volunteers.length} APPROVED volunteers for assignment`);
    
    res.json({
      success: true,
      data: volunteers,
      count: volunteers.length
    });

  } catch (error) {
    console.error('Error fetching volunteers:', error);
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

    console.log('Fetching APPROVED volunteers only...');
    
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
        a.status_name as availability_status,
        COALESCE(vp.has_car, 0) as has_car,
        COALESCE(vp.can_foster, 0) as can_foster,
        COALESCE(vp.animal_handling, '') as animal_handling,
        COALESCE(vp.city, '') as city,
        vp.badges,
        (
          SELECT COUNT(*) 
          FROM tasks t
          WHERE t.assigned_to_user_id = u.user_id 
          AND t.status_id = 2
          AND t.is_deleted = 0
        ) as assigned_reports_count
      FROM users u
      LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
      LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
      WHERE u.role_id = 2
        AND u.is_deleted = 0
        AND vp.approval_status_id = 2
      ORDER BY u.username ASC
    `);

    console.log(`Found ${volunteers.length} APPROVED volunteers`);
    
    res.json({
      success: true,
      data: volunteers,
      count: volunteers.length
    });

  } catch (error) {
    console.error('Error fetching approved volunteers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch approved volunteers',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// ✅ NEW: Get pending volunteers (for admin approval)
router.get('/pending', verifyToken, async (req, res) => {
  try {
    if (req.user.role_id !== 3) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required'
      });
    }

    console.log('👥 Fetching PENDING volunteers for approval...');
    
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
        vp.joined_at,
        vp.approval_status_id,
        CASE 
          WHEN vp.approval_status_id = 1 THEN 'Pending'
          WHEN vp.approval_status_id = 2 THEN 'Approved'
          WHEN vp.approval_status_id = 3 THEN 'Rejected'
        END as approval_status,
        vp.has_car,
        vp.can_foster,
        vp.animal_handling,
        vp.city,
        vp.badges,
        vp.availability_status_id,
        a.status_name as availability_status
      FROM users u
      INNER JOIN volunteer_profiles vp ON u.user_id = vp.user_id
      LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
      WHERE u.role_id = 2
        AND u.is_deleted = 0
        AND vp.approval_status_id = 1
      ORDER BY vp.joined_at ASC
    `);

    console.log(`✅ Found ${volunteers.length} pending volunteers`);
    
    res.json({
      success: true,
      data: volunteers,
      count: volunteers.length
    });

  } catch (error) {
    console.error('❌ Error fetching pending volunteers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pending volunteers',
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

    console.log('Fetching ALL volunteers for admin...');
    
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
        a.status_name as availability_status,
        COALESCE(vp.has_car, 0) as has_car,
        COALESCE(vp.can_foster, 0) as can_foster,
        COALESCE(vp.animal_handling, '') as animal_handling,
        COALESCE(vp.city, '') as city,
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
          AND t.status_id = 2
          AND t.is_deleted = 0
        ) as active_reports
      FROM users u
      LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
      LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
      WHERE u.role_id = 2
        AND u.is_deleted = 0
      ORDER BY 
        CASE WHEN COALESCE(vp.approval_status_id, 2) = 2 THEN 1 ELSE 2 END,
        u.username ASC
    `);

    console.log(`Found ${volunteers.length} volunteers for admin`);
    
    res.json({
      success: true,
      data: volunteers,
      count: volunteers.length
    });

  } catch (error) {
    console.error('Error fetching all volunteers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch volunteers',
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
        `INSERT INTO volunteer_profiles (user_id, approval_status_id, availability_status_id, joined_at, has_car, can_foster, animal_handling, city)
         VALUES (?, ?, 1, NOW(), 0, 0, '', '')`,
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
        END as approval_status,
        COALESCE(vp.has_car, 0) as has_car,
        COALESCE(vp.can_foster, 0) as can_foster,
        COALESCE(vp.animal_handling, '') as animal_handling,
        COALESCE(vp.city, '') as city,
        vp.badges
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
    console.error('Error updating volunteer approval:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update volunteer approval status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// =====================================================
// VOLUNTEER AVAILABILITY STATUSES
// =====================================================

// Get all availability statuses for dropdowns
router.get('/availability-statuses', verifyToken, async (req, res) => {
  try {
    const [statuses] = await pool.execute(`
      SELECT 
        status_id, 
        status_name
      FROM availability_statuses 
      ORDER BY status_id
    `);
    
    res.json({
      success: true,
      data: statuses
    });
    
  } catch (error) {
    console.error('Error fetching availability statuses:', error);
    const fallbackStatuses = [
      { status_id: 1, status_name: 'available' },
      { status_id: 2, status_name: 'unavailable' }
    ];
    res.json({
      success: true,
      data: fallbackStatuses,
      message: 'Using fallback data'
    });
  }
});

// Get volunteer's own availability
router.get('/availability', verifyToken, async (req, res) => {
  const volunteerId = req.user.user_id;
  
  try {
    if (req.user.role_id !== 2) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Volunteer access required'
      });
    }
    
    const [profiles] = await pool.execute(`
      SELECT 
        u.user_id,
        u.username,
        COALESCE(vp.availability_status_id, 1) as availability_status_id,
        a.status_name as availability_status,
        DATE_FORMAT(vp.availability_updated_at, '%Y-%m-%d %H:%i:%s') as availability_updated_at,
        COALESCE(vp.approval_status_id, 2) as approval_status_id,
        COALESCE(vp.has_car, 0) as has_car,
        COALESCE(vp.can_foster, 0) as can_foster,
        COALESCE(vp.animal_handling, '') as animal_handling,
        COALESCE(vp.city, '') as city,
        vp.badges,
        (
          SELECT COUNT(*) 
          FROM tasks t
          WHERE t.assigned_to_user_id = u.user_id 
          AND t.status_id = 2
          AND t.is_deleted = 0
        ) as active_tasks_count
      FROM users u
      LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
      LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
      WHERE u.user_id = ? AND u.role_id = 2
    `, [volunteerId]);
    
    if (profiles.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer profile not found'
      });
    }
    
    res.json({
      success: true,
      data: profiles[0]
    });
    
  } catch (error) {
    console.error('Error fetching volunteer availability:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch availability',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update volunteer's own availability (SELF-SERVICE)
router.patch('/availability', verifyToken, async (req, res) => {
  const volunteerId = req.user.user_id;
  const { availability_status_id } = req.body;
  
  if (!availability_status_id || (availability_status_id < 1 || availability_status_id > 2)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid availability status ID. Must be 1 (available) or 2 (unavailable)'
    });
  }
  
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    if (req.user.role_id !== 2) {
      await connection.rollback();
      connection.release();
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Volunteer access required'
      });
    }
    
    const [profileCheck] = await connection.execute(
      'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
      [volunteerId]
    );
    
    if (profileCheck.length === 0) {
      await connection.execute(
        `INSERT INTO volunteer_profiles 
         (user_id, approval_status_id, availability_status_id, availability_updated_at, joined_at, has_car, can_foster, animal_handling, city)
         VALUES (?, 2, ?, NOW(), NOW(), 0, 0, '', '')`,
        [volunteerId, availability_status_id]
      );
    } else {
      await connection.execute(
        `UPDATE volunteer_profiles 
         SET availability_status_id = ?, 
             availability_updated_at = NOW() 
         WHERE user_id = ?`,
        [availability_status_id, volunteerId]
      );
    }
    
    await connection.commit();
    
    const [statuses] = await pool.execute(
      'SELECT status_name FROM availability_statuses WHERE status_id = ?',
      [availability_status_id]
    );
    
    const statusName = statuses[0]?.status_name || (availability_status_id === 1 ? 'available' : 'unavailable');
    
    res.json({
      success: true,
      message: `Availability updated to ${statusName}`,
      data: {
        user_id: volunteerId,
        availability_status_id: availability_status_id,
        availability_status: statusName,
        updated_at: new Date().toISOString()
      }
    });
    
  } catch (error) {
    await connection.rollback();
    console.error('Error updating volunteer availability:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update availability',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    connection.release();
  }
});

// Update volunteer availability status (Admin or Self)
router.patch('/:id/availability', verifyToken, async (req, res) => {
  const volunteerId = Number(req.params.id);
  const { availability_status_id } = req.body;
  
  if (!volunteerId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid volunteer ID'
    });
  }
  
  if (!availability_status_id || (availability_status_id < 1 || availability_status_id > 2)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid availability status ID. Must be 1 (available) or 2 (unavailable)'
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
        `INSERT INTO volunteer_profiles (user_id, approval_status_id, availability_status_id, joined_at, has_car, can_foster, animal_handling, city)
         VALUES (?, 2, ?, NOW(), 0, 0, '', '')`,
        [volunteerId, availability_status_id]
      );
    } else {
      await pool.execute(
        'UPDATE volunteer_profiles SET availability_status_id = ?, availability_updated_at = NOW() WHERE user_id = ?',
        [availability_status_id, volunteerId]
      );
    }
    
    const [statuses] = await pool.execute(
      'SELECT status_name FROM availability_statuses WHERE status_id = ?',
      [availability_status_id]
    );
    
    const statusName = statuses[0]?.status_name || (availability_status_id === 1 ? 'available' : 'unavailable');
    
    const [updatedVolunteer] = await pool.execute(`
      SELECT 
        u.user_id,
        u.username,
        COALESCE(vp.availability_status_id, 1) as availability_status_id,
        a.status_name as availability_status,
        COALESCE(vp.has_car, 0) as has_car,
        COALESCE(vp.can_foster, 0) as can_foster,
        COALESCE(vp.animal_handling, '') as animal_handling,
        COALESCE(vp.city, '') as city,
        vp.badges
      FROM users u
      LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
      LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
      WHERE u.user_id = ?
    `, [volunteerId]);
    
    res.json({
      success: true,
      message: `Volunteer availability updated to ${statusName}`,
      data: updatedVolunteer[0]
    });
    
  } catch (error) {
    console.error('Error updating volunteer availability:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update volunteer availability',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// =====================================================
// VOLUNTEER TASK MANAGEMENT
// =====================================================

// Get all tasks for current volunteer
router.get('/tasks', verifyToken, async (req, res) => {
  const volunteerId = req.user.user_id;
  
  try {
    if (req.user.role_id !== 2) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Volunteer access required'
      });
    }
    
    console.log(`Fetching tasks for volunteer: ${volunteerId}`);
    
    const [tasks] = await pool.execute(`
      SELECT 
        t.task_id,
        t.report_id,
        t.assigned_to_user_id,
        t.assigned_by_user_id,
        t.status_id as task_status_id,
        ts.status_name as task_status,
        DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
        DATE_FORMAT(t.volunteer_responded_at, '%Y-%m-%d %H:%i:%s') as responded_at,
        t.volunteer_response,
        t.declined_reason,
        DATE_FORMAT(t.started_at, '%Y-%m-%d %H:%i:%s') as started_at,
        DATE_FORMAT(t.completed_at, '%Y-%m-%d %H:%i:%s') as completed_at,
        r.report_id,
        r.description,
        r.location_address,
        r.user_note,
        DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as report_submitted_at,
        at.type_name as animal_type,
        ac.condition_name as animal_condition,
        r.status_id as report_status_id,
        rs.status_name as report_status,
        u.username as reporter_name,
        CAST(u.phone AS CHAR) AS reporter_phone,
        u.email as reporter_email,
        au.username as assigned_by_name
      FROM tasks t
      INNER JOIN reports r ON t.report_id = r.report_id
      LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
      LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
      LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
      LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
      LEFT JOIN users u ON r.user_id = u.user_id
      LEFT JOIN users au ON t.assigned_by_user_id = au.user_id
      WHERE t.assigned_to_user_id = ? 
        AND t.is_deleted = 0
        AND r.is_deleted = 0
      ORDER BY 
        CASE 
          WHEN t.status_id = 1 THEN 1
          WHEN t.status_id = 2 THEN 2
          WHEN t.status_id = 4 THEN 3
          WHEN t.status_id = 3 THEN 4
        END,
        t.assigned_at DESC
    `, [volunteerId]);
    
    const groupedTasks = {
      assigned: tasks.filter(t => t.task_status_id === 1),
      inProgress: tasks.filter(t => t.task_status_id === 2),
      completed: tasks.filter(t => t.task_status_id === 3),
      declined: tasks.filter(t => t.task_status_id === 4)
    };
    
    res.json({
      success: true,
      data: tasks,
      grouped: groupedTasks,
      counts: {
        total: tasks.length,
        assigned: groupedTasks.assigned.length,
        inProgress: groupedTasks.inProgress.length,
        completed: groupedTasks.completed.length,
        declined: groupedTasks.declined.length
      }
    });
    
  } catch (error) {
    console.error('Error fetching volunteer tasks:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tasks',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get single task details
router.get('/tasks/:taskId', verifyToken, async (req, res) => {
  const taskId = Number(req.params.taskId);
  const volunteerId = req.user.user_id;
  
  if (!taskId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid task ID'
    });
  }
  
  try {
    if (req.user.role_id !== 2) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Volunteer access required'
      });
    }
    
    const [tasks] = await pool.execute(`
      SELECT 
        t.*,
        ts.status_name as task_status,
        r.*,
        DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as report_submitted_at,
        at.type_name as animal_type,
        ac.condition_name as animal_condition,
        rs.status_name as report_status,
        u.username as reporter_name,
        CAST(u.phone AS CHAR) AS reporter_phone,
        u.email as reporter_email,
        au.username as assigned_by_name
      FROM tasks t
      INNER JOIN reports r ON t.report_id = r.report_id
      LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
      LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
      LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
      LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
      LEFT JOIN users u ON r.user_id = u.user_id
      LEFT JOIN users au ON t.assigned_by_user_id = au.user_id
      WHERE t.task_id = ? 
        AND t.assigned_to_user_id = ?
        AND t.is_deleted = 0
        AND r.is_deleted = 0
    `, [taskId, volunteerId]);
    
    if (tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or not assigned to you'
      });
    }
    
    res.json({
      success: true,
      data: tasks[0]
    });
    
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch task',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Accept a task (auto-sets to in_progress and updates availability)
router.patch('/tasks/:taskId/accept', verifyToken, async (req, res) => {
  const taskId = Number(req.params.taskId);
  const volunteerId = req.user.user_id;
  
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    if (req.user.role_id !== 2) {
      await connection.rollback();
      connection.release();
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Volunteer access required'
      });
    }
    
    const [tasks] = await connection.execute(
      `SELECT t.task_id, t.report_id, t.status_id, r.status_id as report_status_id
       FROM tasks t
       INNER JOIN reports r ON t.report_id = r.report_id
       WHERE t.task_id = ? AND t.assigned_to_user_id = ? AND t.is_deleted = 0`,
      [taskId, volunteerId]
    );
    
    if (tasks.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'Task not found or not assigned to you'
      });
    }
    
    const task = tasks[0];
    
    if (task.status_id !== 1) {
      await connection.rollback();
      connection.release();
      return res.status(400).json({
        success: false,
        message: 'This task cannot be accepted'
      });
    }
    
    // Update task to in_progress (status_id = 2)
    await connection.execute(
      `UPDATE tasks 
       SET status_id = 2, 
           volunteer_responded_at = NOW(), 
           volunteer_response = 'accepted',
           started_at = NOW()
       WHERE task_id = ?`,
      [taskId]
    );
    
    // Update report status to in_progress (status_id = 3)
    await connection.execute(
      'UPDATE reports SET status_id = 3 WHERE report_id = ?',
      [task.report_id]
    );
    
    // AUTO-UPDATE AVAILABILITY - Check if this is their first active task
    const [activeTasks] = await connection.execute(
      `SELECT COUNT(*) as count 
       FROM tasks 
       WHERE assigned_to_user_id = ? 
         AND status_id = 2
         AND is_deleted = 0`,
      [volunteerId]
    );
    
    let availabilityUpdated = false;
    if (activeTasks[0].count === 1) {
      await connection.execute(
        `UPDATE volunteer_profiles 
         SET availability_status_id = 2,
             availability_updated_at = NOW() 
         WHERE user_id = ?`,
        [volunteerId]
      );
      availabilityUpdated = true;
      console.log(`Auto-set volunteer ${volunteerId} to unavailable`);
    }
    
    await connection.commit();
    
    res.json({
      success: true,
      message: 'Task accepted successfully',
      data: {
        task_id: taskId,
        status: 'in_progress',
        status_id: 2,
        accepted_at: new Date().toISOString(),
        availability_auto_updated: availabilityUpdated
      }
    });
    
  } catch (error) {
    await connection.rollback();
    console.error('Error accepting task:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to accept task',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    connection.release();
  }
});

// Decline a task
router.patch('/tasks/:taskId/decline', verifyToken, async (req, res) => {
  const taskId = Number(req.params.taskId);
  const volunteerId = req.user.user_id;
  const { reason } = req.body;
  
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    if (req.user.role_id !== 2) {
      await connection.rollback();
      connection.release();
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Volunteer access required'
      });
    }
    
    const [tasks] = await connection.execute(
      `SELECT t.task_id, t.report_id, t.status_id
       FROM tasks t
       WHERE t.task_id = ? AND t.assigned_to_user_id = ? AND t.is_deleted = 0`,
      [taskId, volunteerId]
    );
    
    if (tasks.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'Task not found or not assigned to you'
      });
    }
    
    const task = tasks[0];
    
    if (task.status_id !== 1) {
      await connection.rollback();
      connection.release();
      return res.status(400).json({
        success: false,
        message: 'This task cannot be declined'
      });
    }
    
    // Update task to declined (status_id = 4)
    await connection.execute(
      `UPDATE tasks 
       SET status_id = 4, 
           volunteer_responded_at = NOW(), 
           volunteer_response = 'declined',
           declined_reason = ?
       WHERE task_id = ?`,
      [reason || 'No reason provided', taskId]
    );
    
    // Update report status to DECLINED (status_id = 5)
    await connection.execute(
      'UPDATE reports SET status_id = 5 WHERE report_id = ?',
      [task.report_id]
    );
    
    await connection.commit();
    
    res.json({
      success: true,
      message: 'Task declined successfully',
      data: {
        task_id: taskId,
        status: 'declined',
        status_id: 4,
        declined_at: new Date().toISOString(),
        reason: reason || 'No reason provided'
      }
    });
    
  } catch (error) {
    await connection.rollback();
    console.error('Error declining task:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to decline task',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    connection.release();
  }
});

// =====================================================
// ✅ FIXED: Complete a task WITH BADGE AWARDING LOGIC
// =====================================================
router.patch('/tasks/:taskId/complete', verifyToken, async (req, res) => {
  const taskId = Number(req.params.taskId);
  const volunteerId = req.user.user_id;
  
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    if (req.user.role_id !== 2) {
      await connection.rollback();
      connection.release();
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Volunteer access required'
      });
    }
    
    // Check if task exists and is in the correct state
    const [tasks] = await connection.execute(
      `SELECT t.task_id, t.report_id, t.status_id, 
              r.animal_type_id, t.assigned_at,
              at.type_name as animal_type
       FROM tasks t
       INNER JOIN reports r ON t.report_id = r.report_id
       LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
       WHERE t.task_id = ? AND t.assigned_to_user_id = ? AND t.is_deleted = 0`,
      [taskId, volunteerId]
    );
    
    if (tasks.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'Task not found or not assigned to you'
      });
    }
    
    const task = tasks[0];
    
    // Check if task is in progress (status_id = 2)
    if (task.status_id !== 2) {
      await connection.rollback();
      connection.release();
      return res.status(400).json({
        success: false,
        message: `Task must be in progress before completing. Current status: ${task.status_id}`
      });
    }
    
    // Update task to completed (status_id = 3)
    const [updateResult] = await connection.execute(
      `UPDATE tasks 
       SET status_id = 3, 
           completed_at = NOW() 
       WHERE task_id = ? AND status_id = 2`,
      [taskId]
    );
    
    if (updateResult.affectedRows === 0) {
      await connection.rollback();
      connection.release();
      return res.status(400).json({
        success: false,
        message: 'Failed to update task status. Task may have been modified.'
      });
    }
    
    // Update report status to completed (status_id = 4)
    await connection.execute(
      'UPDATE reports SET status_id = 4 WHERE report_id = ?',
      [task.report_id]
    );
    
    // AUTO-UPDATE AVAILABILITY - Check if they have any other active tasks
    const [activeTasks] = await connection.execute(
      `SELECT COUNT(*) as count 
       FROM tasks 
       WHERE assigned_to_user_id = ? 
         AND status_id = 2
         AND is_deleted = 0`,
      [volunteerId]
    );
    
    let availabilityUpdated = false;
    if (activeTasks[0].count === 0) {
      await connection.execute(
        `UPDATE volunteer_profiles 
         SET availability_status_id = 1,
             availability_updated_at = NOW() 
         WHERE user_id = ?`,
        [volunteerId]
      );
      availabilityUpdated = true;
      console.log(`Auto-set volunteer ${volunteerId} to available`);
    }
    
    // 🏆 CHECK AND AWARD BADGES 🏆
    const awardedBadges = [];
    
    // Get current time for time-based badges
    const now = new Date();
    const currentHour = now.getHours();
    
    // Get total completed tasks count (including this one)
    const [completedCount] = await connection.execute(
      `SELECT COUNT(*) as total_completed
       FROM tasks 
       WHERE assigned_to_user_id = ? 
         AND status_id = 3 
         AND is_deleted = 0`,
      [volunteerId]
    );
    
    const totalCompleted = completedCount[0].total_completed;
    
    // 1. First Rescue badge (badge_id = 1) - First completed task
    if (totalCompleted === 1) {
      const [existing] = await connection.execute(
        'SELECT award_id FROM badge_awards WHERE user_id = ? AND badge_id = 1',
        [volunteerId]
      );
      
      if (existing.length === 0) {
        await connection.execute(
          `INSERT INTO badge_awards (user_id, badge_id, awarded_at, task_id)
           VALUES (?, 1, NOW(), ?)`,
          [volunteerId, taskId]
        );
        awardedBadges.push('First Rescue');
      }
    }
    
    // 2. Speedy badge (badge_id = 2) - Completed within 1 hour of assignment
    const [timeDiff] = await connection.execute(
      `SELECT TIMESTAMPDIFF(HOUR, assigned_at, NOW()) as hours_taken
       FROM tasks
       WHERE task_id = ?`,
      [taskId]
    );
    
    if (timeDiff.length > 0 && timeDiff[0].hours_taken < 1) {
      const [existing] = await connection.execute(
        'SELECT award_id FROM badge_awards WHERE user_id = ? AND badge_id = 2',
        [volunteerId]
      );
      
      if (existing.length === 0) {
        await connection.execute(
          `INSERT INTO badge_awards (user_id, badge_id, awarded_at, task_id)
           VALUES (?, 2, NOW(), ?)`,
          [volunteerId, taskId]
        );
        awardedBadges.push('Speedy');
      }
    }
    
    // 4. Night Owl badge (badge_id = 4) - Completed after 10pm or before 5am
    if (currentHour >= 22 || currentHour < 5) {
      const [existing] = await connection.execute(
        'SELECT award_id FROM badge_awards WHERE user_id = ? AND badge_id = 4',
        [volunteerId]
      );
      
      if (existing.length === 0) {
        await connection.execute(
          `INSERT INTO badge_awards (user_id, badge_id, awarded_at, task_id)
           VALUES (?, 4, NOW(), ?)`,
          [volunteerId, taskId]
        );
        awardedBadges.push('Night Owl');
      }
    }
    
    // 6. Cat Whisperer badge (badge_id = 6) - Rescued 5+ cats
    if (task.animal_type && task.animal_type.toLowerCase().includes('cat')) {
      const [catCount] = await connection.execute(
        `SELECT COUNT(*) as cat_rescues
         FROM tasks t
         INNER JOIN reports r ON t.report_id = r.report_id
         INNER JOIN animal_types at ON r.animal_type_id = at.type_id
         WHERE t.assigned_to_user_id = ? 
           AND t.status_id = 3
           AND t.is_deleted = 0
           AND LOWER(at.type_name) LIKE '%cat%'`,
        [volunteerId]
      );
      
      if (catCount[0].cat_rescues >= 5) {
        const [existing] = await connection.execute(
          'SELECT award_id FROM badge_awards WHERE user_id = ? AND badge_id = 6',
          [volunteerId]
        );
        
        if (existing.length === 0) {
          await connection.execute(
            `INSERT INTO badge_awards (user_id, badge_id, awarded_at, task_id)
             VALUES (?, 6, NOW(), ?)`,
            [volunteerId, taskId]
          );
          awardedBadges.push('Cat Whisperer');
        }
      }
    }
    
    // 7. Dog Savior badge (badge_id = 7) - Rescued 5+ dogs
    if (task.animal_type && task.animal_type.toLowerCase().includes('dog')) {
      const [dogCount] = await connection.execute(
        `SELECT COUNT(*) as dog_rescues
         FROM tasks t
         INNER JOIN reports r ON t.report_id = r.report_id
         INNER JOIN animal_types at ON r.animal_type_id = at.type_id
         WHERE t.assigned_to_user_id = ? 
           AND t.status_id = 3
           AND t.is_deleted = 0
           AND LOWER(at.type_name) LIKE '%dog%'`,
        [volunteerId]
      );
      
      if (dogCount[0].dog_rescues >= 5) {
        const [existing] = await connection.execute(
          'SELECT award_id FROM badge_awards WHERE user_id = ? AND badge_id = 7',
          [volunteerId]
        );
        
        if (existing.length === 0) {
          await connection.execute(
            `INSERT INTO badge_awards (user_id, badge_id, awarded_at, task_id)
             VALUES (?, 7, NOW(), ?)`,
            [volunteerId, taskId]
          );
          awardedBadges.push('Dog Savior');
        }
      }
    }
    
    // 8. Horse Hero badge (badge_id = 8) - Rescued a horse
    if (task.animal_type && task.animal_type.toLowerCase().includes('horse')) {
      const [existing] = await connection.execute(
        'SELECT award_id FROM badge_awards WHERE user_id = ? AND badge_id = 8',
        [volunteerId]
      );
      
      if (existing.length === 0) {
        await connection.execute(
          `INSERT INTO badge_awards (user_id, badge_id, awarded_at, task_id)
           VALUES (?, 8, NOW(), ?)`,
          [volunteerId, taskId]
        );
        awardedBadges.push('Horse Hero');
      }
    }
    
    await connection.commit();
    
    res.json({
      success: true,
      message: awardedBadges.length > 0 
        ? `Task completed successfully! 🏆 You earned: ${awardedBadges.join(', ')}`
        : 'Task completed successfully! Thank you for your service!',
      data: {
        task_id: taskId,
        status: 'completed',
        status_id: 3,
        completed_at: new Date().toISOString(),
        availability_auto_updated: availabilityUpdated,
        badges_awarded: awardedBadges
      }
    });
    
  } catch (error) {
    await connection.rollback();
    console.error('Error completing task:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to complete task: ' + (error.message || 'Unknown error'),
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    connection.release();
  }
});

// =====================================================
// VOLUNTEER ACTIVE MISSION
// =====================================================
router.get('/:id/active-mission', verifyToken, async (req, res) => {
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
        message: 'Forbidden: You can only view your own missions'
      });
    }

    console.log(`Fetching ACTIVE mission for volunteer ${volunteerId}...`);
    
    const [missions] = await pool.execute(`
      SELECT 
        t.task_id,
        t.report_id,
        t.assigned_to_user_id as volunteer_id,
        t.status_id as task_status_id,
        ts.status_name as task_status,
        DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
        DATE_FORMAT(t.started_at, '%Y-%m-%d %H:%i:%s') as started_at,
        DATE_FORMAT(t.completed_at, '%Y-%m-%d %H:%i:%s') as completed_at,
        r.report_id,
        r.user_id,
        r.description,
        r.location_address,
        r.user_note,
        DATE_FORMAT(r.submitted_at, '%Y-%m-%d %H:%i:%s') as submitted_at,
        at.type_name as animal_type,
        ac.condition_name as animal_condition,
        r.status_id as report_status_id,
        rs.status_name as report_status,
        u.username as reporter_name,
        CAST(COALESCE(u.phone, '') AS CHAR) AS reporter_phone,
        u.email as reporter_email,
        v.username as volunteer_name,
        v.email as volunteer_email,
        CAST(v.phone AS CHAR) AS volunteer_phone
      FROM tasks t
      INNER JOIN reports r ON t.report_id = r.report_id
      LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
      LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
      LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
      LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
      LEFT JOIN users u ON r.user_id = u.user_id
      LEFT JOIN users v ON t.assigned_to_user_id = v.user_id
      WHERE t.assigned_to_user_id = ? 
        AND t.status_id = 2
        AND t.is_deleted = 0
        AND r.is_deleted = 0
      ORDER BY t.assigned_at DESC
      LIMIT 1
    `, [volunteerId]);
    
    if (missions.length === 0) {
      return res.json({
        success: true,
        data: null,
        message: 'No active mission found'
      });
    }
    
    console.log(`Found active mission for volunteer ${volunteerId}: Report #${missions[0].report_id}, Task #${missions[0].task_id}`);
    
    res.json({
      success: true,
      data: missions[0]
    });
    
  } catch (error) {
    console.error('Error fetching volunteer active mission:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch active mission',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// =====================================================
// VOLUNTEER REPORTS & ASSIGNMENTS
// =====================================================

// Get volunteer's assigned reports
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
    console.error('Error fetching volunteer reports:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch volunteer reports',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// =====================================================
// 🏆 VOLUNTEER BADGES & ACHIEVEMENTS
// =====================================================

router.get('/:id/badges', verifyToken, async (req, res) => {
  try {
    const userId = Number(req.params.id);
    
    if (req.user.user_id !== userId && req.user.role_id !== 3) {
      return res.status(403).json({ 
        success: false, 
        message: 'Forbidden' 
      });
    }

    const [badges] = await pool.execute(`
      SELECT 
        bd.badge_id,
        bd.badge_name,
        bd.description,
        CASE 
          WHEN ba.award_id IS NOT NULL THEN 'unlocked'
          ELSE 'locked'
        END as status,
        DATE_FORMAT(ba.awarded_at, '%Y-%m-%d') as awarded_at,
        ba.task_id
      FROM badge_definitions bd
      LEFT JOIN badge_awards ba ON bd.badge_id = ba.badge_id AND ba.user_id = ?
      ORDER BY 
        CASE WHEN ba.award_id IS NOT NULL THEN 0 ELSE 1 END,
        ba.awarded_at DESC,
        bd.badge_id
    `, [userId]);

    const [taskCount] = await pool.execute(`
      SELECT COUNT(*) as total_tasks
      FROM tasks 
      WHERE assigned_to_user_id = ? AND status_id = 3 AND is_deleted = 0
    `, [userId]);

    const [recent] = await pool.execute(`
      SELECT 
        bd.badge_name,
        DATE_FORMAT(ba.awarded_at, '%Y-%m-%d') as awarded_at
      FROM badge_awards ba
      JOIN badge_definitions bd ON ba.badge_id = bd.badge_id
      WHERE ba.user_id = ?
      ORDER BY ba.awarded_at DESC
      LIMIT 3
    `, [userId]);

    res.json({
      success: true,
      badges: badges,
      total_tasks: taskCount[0]?.total_tasks || 0,
      recent_badges: recent,
      count: badges.filter(b => b.status === 'unlocked').length
    });

  } catch (err) {
    console.error('GET badges error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch badges' 
    });
  }
});

router.get('/:id/badge-stats', verifyToken, async (req, res) => {
  try {
    const userId = Number(req.params.id);
    
    if (req.user.user_id !== userId && req.user.role_id !== 3) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const [stats] = await pool.execute(`
      SELECT 
        bd.badge_name,
        COUNT(ba.award_id) as count
      FROM badge_definitions bd
      LEFT JOIN badge_awards ba ON bd.badge_id = ba.badge_id AND ba.user_id = ?
      GROUP BY bd.badge_id, bd.badge_name
      ORDER BY bd.badge_id
    `, [userId]);

    res.json({
      success: true,
      stats: stats
    });

  } catch (err) {
    console.error('GET badge stats error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch badge stats' });
  }
});

// =====================================================
// ADMIN ASSIGNMENT & REASSIGNMENT ROUTES
// =====================================================

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

    console.log(`Assigning volunteer ${volunteer_id} to report ${report_id}`);
    
    const [reportCheck] = await connection.execute(
      'SELECT report_id, status_id FROM reports WHERE report_id = ? AND is_deleted = 0',
      [report_id]
    );
    
    if (reportCheck.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
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
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found, not approved, or is rejected'
      });
    }
    
    const [existingTasks] = await connection.execute(
      'SELECT task_id, assigned_to_user_id, status_id, is_deleted FROM tasks WHERE report_id = ?',
      [report_id]
    );
    
    const taskStatus = status_id || 2;
    
    if (existingTasks.length > 0) {
      const existingTask = existingTasks[0];
      
      if (existingTask.is_deleted === 1) {
        console.log(`Reactivating soft-deleted task ${existingTask.task_id} for report ${report_id}`);
        await connection.execute(
          'UPDATE tasks SET assigned_to_user_id = ?, status_id = ?, assigned_at = NOW(), is_deleted = 0 WHERE task_id = ?',
          [volunteer_id, taskStatus, existingTask.task_id]
        );
      } else {
        console.log(`Updating existing task ${existingTask.task_id} for report ${report_id}`);
        await connection.execute(
          'UPDATE tasks SET assigned_to_user_id = ?, status_id = ?, assigned_at = NOW() WHERE task_id = ?',
          [volunteer_id, taskStatus, existingTask.task_id]
        );
      }
    } else {
      console.log(`Creating new task for report ${report_id}...`);
      await connection.execute(
        `INSERT INTO tasks (report_id, assigned_to_user_id, assigned_by_user_id, status_id, assigned_at, is_deleted)
         VALUES (?, ?, ?, ?, NOW(), 0)`,
        [report_id, volunteer_id, req.user.user_id, taskStatus]
      );
    }
    
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
    
    console.log(`Unassigning volunteer from report ${reportId}`);
    
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
    
    const [taskCheck] = await connection.execute(
      'SELECT task_id FROM tasks WHERE report_id = ? AND is_deleted = 0',
      [reportId]
    );
    
    if (taskCheck.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'No active task found for this report'
      });
    }
    
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

    console.log(`Force assigning volunteer ${volunteer_id} to report ${report_id}`);
    
    const [reportCheck] = await connection.execute(
      'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
      [report_id]
    );
    
    if (reportCheck.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
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
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found, not approved, or is rejected'
      });
    }
    
    await connection.execute(
      'DELETE FROM tasks WHERE report_id = ?',
      [report_id]
    );
    
    const [result] = await connection.execute(
      `INSERT INTO tasks (report_id, assigned_to_user_id, assigned_by_user_id, status_id, assigned_at, is_deleted)
       VALUES (?, ?, ?, ?, NOW(), 0)`,
      [report_id, volunteer_id, req.user.user_id, status_id || 2]
    );
    
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
    console.error('Error force assigning volunteer:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to assign volunteer',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    connection.release();
  }
});

router.get('/available-for-reassignment/:reportId', verifyToken, async (req, res) => {
  const reportId = Number(req.params.reportId);
  
  try {
    if (req.user.role_id !== 3) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required'
      });
    }
    
    const [volunteers] = await pool.execute(`
      SELECT 
        u.user_id,
        u.username,
        u.email,
        COALESCE(CAST(u.phone AS CHAR), '') as phone,
        vp.availability_status_id,
        a.status_name as availability_status,
        COALESCE(vp.has_car, 0) as has_car,
        COALESCE(vp.can_foster, 0) as can_foster,
        COALESCE(vp.animal_handling, '') as animal_handling,
        COALESCE(vp.city, '') as city,
        (
          SELECT COUNT(*) 
          FROM tasks t
          WHERE t.assigned_to_user_id = u.user_id 
          AND t.status_id = 2
          AND t.is_deleted = 0
        ) as active_tasks_count
      FROM users u
      INNER JOIN volunteer_profiles vp ON u.user_id = vp.user_id
      INNER JOIN availability_statuses a ON vp.availability_status_id = a.status_id
      WHERE u.role_id = 2
        AND u.is_deleted = 0
        AND vp.approval_status_id = 2
        AND vp.availability_status_id = 1
        AND u.user_id NOT IN (
          SELECT assigned_to_user_id 
          FROM tasks 
          WHERE report_id = ? AND is_deleted = 0
        )
      ORDER BY active_tasks_count ASC, u.username ASC
    `, [reportId]);
    
    res.json({
      success: true,
      data: volunteers,
      count: volunteers.length,
      report_id: reportId
    });
    
  } catch (error) {
    console.error('Error fetching available volunteers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch available volunteers',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

router.post('/reassign', verifyToken, async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    if (req.user.role_id !== 3) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required'
      });
    }

    const { task_id, new_volunteer_id, report_id } = req.body;
    
    if ((!task_id && !report_id) || !new_volunteer_id) {
      return res.status(400).json({
        success: false,
        message: 'Task ID or Report ID and New Volunteer ID are required'
      });
    }

    await connection.beginTransaction();
    
    let actualTaskId = task_id;
    if (!actualTaskId && report_id) {
      const [tasks] = await connection.execute(
        'SELECT task_id, assigned_to_user_id FROM tasks WHERE report_id = ? AND is_deleted = 0 ORDER BY task_id DESC LIMIT 1',
        [report_id]
      );
      if (tasks.length > 0) {
        actualTaskId = tasks[0].task_id;
      }
    }
    
    if (!actualTaskId) {
      await connection.rollback();
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'No active task found for reassignment'
      });
    }
    
    const [oldTasks] = await connection.execute(
      'SELECT * FROM tasks WHERE task_id = ?',
      [actualTaskId]
    );
    
    if (oldTasks.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    const oldTask = oldTasks[0];
    
    await connection.execute(
      'UPDATE tasks SET is_deleted = 1, status_id = 4 WHERE task_id = ?',
      [actualTaskId]
    );
    
    const [result] = await connection.execute(
      `INSERT INTO tasks 
       (report_id, assigned_to_user_id, assigned_by_user_id, status_id, assigned_at, is_deleted)
       VALUES (?, ?, ?, 1, NOW(), 0)`,
      [oldTask.report_id, new_volunteer_id, req.user.user_id]
    );
    
    await connection.execute(
      'UPDATE reports SET status_id = 2 WHERE report_id = ?',
      [oldTask.report_id]
    );
    
    await connection.commit();
    
    res.json({
      success: true,
      message: 'Task reassigned successfully',
      data: {
        old_task_id: actualTaskId,
        new_task_id: result.insertId,
        new_volunteer_id: new_volunteer_id,
        reassigned_at: new Date().toISOString()
      }
    });

  } catch (error) {
    await connection.rollback();
    console.error('Error reassigning volunteer:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reassign volunteer',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    connection.release();
  }
});

router.get('/declined-tasks', verifyToken, async (req, res) => {
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
        ts.status_name as task_status,
        DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
        DATE_FORMAT(t.volunteer_responded_at, '%Y-%m-%d %H:%i:%s') as responded_at,
        t.volunteer_response,
        t.declined_reason,
        vu.username as volunteer_name,
        r.report_id,
        r.description,
        r.location_address,
        at.type_name as animal_type,
        ac.condition_name as animal_condition,
        ru.username as reporter_name
      FROM tasks t
      INNER JOIN reports r ON t.report_id = r.report_id
      LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
      LEFT JOIN users vu ON t.assigned_to_user_id = vu.user_id
      LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
      LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
      LEFT JOIN users ru ON r.user_id = ru.user_id
      WHERE t.status_id = 4
        AND t.is_deleted = 0
        AND r.is_deleted = 0
      ORDER BY t.volunteer_responded_at DESC
    `);
    
    res.json({
      success: true,
      data: tasks,
      count: tasks.length
    });
    
  } catch (error) {
    console.error('Error fetching declined tasks:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch declined tasks',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

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
        ts.status_name as task_status,
        DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
        t.started_at,
        t.completed_at,
        t.is_deleted,
        u.username as volunteer_name,
        u.email as volunteer_email,
        u2.username as assigned_by_name,
        r.status_id as report_status
      FROM tasks t
      LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
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
    console.error('Error fetching task:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch task',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// =====================================================
// ADMIN FIX UTILITIES
// =====================================================

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
    
    const [tasks] = await connection.execute(
      'SELECT * FROM tasks WHERE task_id = ?',
      [taskId]
    );
    
    if (tasks.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    const task = tasks[0];
    const fixes = [];
    
    if (task.is_deleted === 1 && task.status_id === 2) {
      await connection.execute(
        'UPDATE tasks SET status_id = 1 WHERE task_id = ?',
        [taskId]
      );
      fixes.push(`status ${task.status_id} -> 1 (deleted)`);
    }
    
    if (task.completed_at && task.status_id !== 3) {
      await connection.execute(
        'UPDATE tasks SET status_id = 3 WHERE task_id = ?',
        [taskId]
      );
      fixes.push(`status ${task.status_id} -> 3 (completed)`);
    }
    
    if (fixes.length === 0) {
      await connection.rollback();
      connection.release();
      return res.json({
        success: true,
        message: 'Task is already in consistent state',
        data: task
      });
    }
    
    await connection.commit();
    
    res.json({
      success: true,
      message: `Task fixed: ${fixes.join(', ')}`,
      data: {
        task_id: taskId,
        fixes: fixes
      }
    });
    
  } catch (error) {
    await connection.rollback();
    console.error('Error fixing task:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fix task',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    connection.release();
  }
});

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
    
    console.log(`Fixing report ${reportId} tasks...`);
    
    const [tasks] = await connection.execute(
      'SELECT * FROM tasks WHERE report_id = ? ORDER BY task_id DESC',
      [reportId]
    );
    
    if (tasks.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'No tasks found for this report'
      });
    }
    
    const fixes = [];
    
    for (const task of tasks) {
      if (task.is_deleted === 1 && task.status_id >= 2) {
        await connection.execute(
          'UPDATE tasks SET status_id = 1 WHERE task_id = ?',
          [task.task_id]
        );
        fixes.push({
          task_id: task.task_id,
          change: `status ${task.status_id} -> 1 (deleted)`
        });
      }
      
      if (task.completed_at && task.status_id !== 3) {
        await connection.execute(
          'UPDATE tasks SET status_id = 3 WHERE task_id = ?',
          [task.task_id]
        );
        fixes.push({
          task_id: task.task_id,
          change: `status ${task.status_id} -> 3 (completed)`
        });
      }
    }
    
    const latestTask = tasks[0];
    let reportStatus = 1;
    
    if (latestTask.is_deleted === 0) {
      if (latestTask.status_id === 2) reportStatus = 3;
      else if (latestTask.status_id === 3) reportStatus = 4;
      else if (latestTask.status_id === 4) reportStatus = 1;
      else reportStatus = latestTask.status_id;
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
    console.error('Error fixing report:', error);
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