// const express = require('express');
// const router = express.Router();
// const verifyToken = require('../middleware/auth');
// const mysql = require('mysql2/promise');
// require('dotenv').config();

// // MySQL pool
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// // Approve volunteer (admin only)
// router.post('/:id/approve', verifyToken, async (req, res) => {
//   try {
//     if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

//     await pool.execute(
//       `UPDATE volunteer_profiles SET approval_status_id = 2 WHERE user_id = ?`,
//       [req.params.id]
//     );

//     res.json({ message: 'Volunteer approved' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Reject volunteer (admin only)
// router.post('/:id/reject', verifyToken, async (req, res) => {
//   try {
//     if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

//     await pool.execute(
//       `UPDATE volunteer_profiles SET approval_status_id = 3 WHERE user_id = ?`,
//       [req.params.id]
//     );

//     res.json({ message: 'Volunteer rejected' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const mysql = require('mysql2/promise');
require('dotenv').config();

// MySQL pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

/* =====================================================
   APPROVE VOLUNTEER (ADMIN ONLY)
===================================================== */
router.post('/:id/approve', verifyToken, async (req, res) => {
  try {
    const userId = Number(req.params.id);
    
    // ✅ FIX: Check for role_id = 3 (admin) instead of role = 'admin'
    if (req.user.role_id !== 3) {
      return res.status(403).json({ 
        success: false, 
        message: 'Forbidden: Admin access required' 
      });
    }

    // Check if user exists and is a volunteer
    const [userCheck] = await pool.execute(`
      SELECT u.user_id, u.username, u.role_id, vp.approval_status_id
      FROM users u
      LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
      WHERE u.user_id = ? AND u.is_deleted = 0
    `, [userId]);

    if (userCheck.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const user = userCheck[0];
    
    // Check if user is a volunteer (role_id = 2)
    if (user.role_id !== 2) {
      return res.status(400).json({ 
        success: false, 
        message: 'User is not a volunteer' 
      });
    }

    // Check if volunteer profile exists, create if not
    const [volunteerCheck] = await pool.execute(
      'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
      [userId]
    );

    if (volunteerCheck.length === 0) {
      // Create volunteer profile if it doesn't exist
      await pool.execute(
        `INSERT INTO volunteer_profiles (user_id, approval_status_id, joined_at) VALUES (?, 2, NOW())`,
        [userId]
      );
    } else {
      // Update existing volunteer profile
      await pool.execute(
        `UPDATE volunteer_profiles SET approval_status_id = 2 WHERE user_id = ?`,
        [userId]
      );
    }

    // ✅ FIX: Return the same response format as users.js
    const [updatedUser] = await pool.execute(`
      SELECT 
        u.user_id,
        u.username,
        u.email,
        u.phone,
        u.profile_image_url,
        u.bio,
        u.created_at,
        u.role_id,
        COALESCE(ur.role_name, 'user') AS role_name,
        vp.approval_status_id,
        vas.status_name AS volunteer_status,
        vp.badges,
        vp.joined_at AS volunteer_since
      FROM users u
      LEFT JOIN user_roles ur ON u.role_id = ur.role_id
      LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
      LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
      WHERE u.user_id = ?
    `, [userId]);

    const responseUser = updatedUser[0];
    
    // Format the response like your GET endpoint
    const formattedUser = {
      user_id: responseUser.user_id,
      username: responseUser.username,
      email: responseUser.email,
      phone: responseUser.phone,
      profile_image_url: responseUser.profile_image_url,
      bio: responseUser.bio || '',
      created_at: responseUser.created_at,
      role_name: responseUser.role_name,
      volunteer: responseUser.role_id === 2 && responseUser.approval_status_id ? {
        approval_status_id: responseUser.approval_status_id,
        status: responseUser.volunteer_status,
        badges: responseUser.badges ? JSON.parse(responseUser.badges) : [],
        volunteer_since: responseUser.volunteer_since
      } : null
    };

    res.json({
      success: true,
      message: 'Volunteer approved successfully',
      user: formattedUser
    });

  } catch (err) {
    console.error('Approve volunteer error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

/* =====================================================
   REJECT VOLUNTEER (ADMIN ONLY)
===================================================== */
router.post('/:id/reject', verifyToken, async (req, res) => {
  try {
    const userId = Number(req.params.id);
    
    // ✅ FIX: Check for role_id = 3 (admin) instead of role = 'admin'
    if (req.user.role_id !== 3) {
      return res.status(403).json({ 
        success: false, 
        message: 'Forbidden: Admin access required' 
      });
    }

    // Check if user exists and is a volunteer
    const [userCheck] = await pool.execute(`
      SELECT u.user_id, u.username, u.role_id, vp.approval_status_id
      FROM users u
      LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
      WHERE u.user_id = ? AND u.is_deleted = 0
    `, [userId]);

    if (userCheck.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const user = userCheck[0];
    
    if (user.role_id !== 2) {
      return res.status(400).json({ 
        success: false, 
        message: 'User is not a volunteer' 
      });
    }

    // Check if volunteer profile exists, create if not
    const [volunteerCheck] = await pool.execute(
      'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
      [userId]
    );

    if (volunteerCheck.length === 0) {
      // Create volunteer profile with rejected status
      await pool.execute(
        `INSERT INTO volunteer_profiles (user_id, approval_status_id) VALUES (?, 3)`,
        [userId]
      );
    } else {
      // Update existing volunteer profile
      await pool.execute(
        `UPDATE volunteer_profiles SET approval_status_id = 3 WHERE user_id = ?`,
        [userId]
      );
    }

    // ✅ FIX: Return the same response format as users.js
    const [updatedUser] = await pool.execute(`
      SELECT 
        u.user_id,
        u.username,
        u.email,
        u.phone,
        u.profile_image_url,
        u.bio,
        u.created_at,
        u.role_id,
        COALESCE(ur.role_name, 'user') AS role_name,
        vp.approval_status_id,
        vas.status_name AS volunteer_status,
        vp.badges,
        vp.joined_at AS volunteer_since
      FROM users u
      LEFT JOIN user_roles ur ON u.role_id = ur.role_id
      LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
      LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
      WHERE u.user_id = ?
    `, [userId]);

    const responseUser = updatedUser[0];
    
    // Format the response like your GET endpoint
    const formattedUser = {
      user_id: responseUser.user_id,
      username: responseUser.username,
      email: responseUser.email,
      phone: responseUser.phone,
      profile_image_url: responseUser.profile_image_url,
      bio: responseUser.bio || '',
      created_at: responseUser.created_at,
      role_name: responseUser.role_name,
      volunteer: responseUser.role_id === 2 && responseUser.approval_status_id ? {
        approval_status_id: responseUser.approval_status_id,
        status: responseUser.volunteer_status,
        badges: responseUser.badges ? JSON.parse(responseUser.badges) : [],
        volunteer_since: responseUser.volunteer_since
      } : null
    };

    res.json({
      success: true,
      message: 'Volunteer rejected',
      user: formattedUser
    });

  } catch (err) {
    console.error('Reject volunteer error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

/* =====================================================
   ADDITIONAL ENDPOINTS FOR FRONTEND COMPATIBILITY
===================================================== */

// ✅ Add PUT method endpoints too
router.put('/:id/approve', verifyToken, async (req, res) => {
  // Same as POST /approve but with PUT method
  try {
    const userId = Number(req.params.id);
    
    if (req.user.role_id !== 3) {
      return res.status(403).json({ 
        success: false, 
        message: 'Forbidden: Admin access required' 
      });
    }

    const [userCheck] = await pool.execute(`
      SELECT u.user_id, u.username, u.role_id, vp.approval_status_id
      FROM users u
      LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
      WHERE u.user_id = ? AND u.is_deleted = 0
    `, [userId]);

    if (userCheck.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const user = userCheck[0];
    
    if (user.role_id !== 2) {
      return res.status(400).json({ 
        success: false, 
        message: 'User is not a volunteer' 
      });
    }

    const [volunteerCheck] = await pool.execute(
      'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
      [userId]
    );

    if (volunteerCheck.length === 0) {
      await pool.execute(
        `INSERT INTO volunteer_profiles (user_id, approval_status_id, joined_at) VALUES (?, 2, NOW())`,
        [userId]
      );
    } else {
      await pool.execute(
        `UPDATE volunteer_profiles SET approval_status_id = 2 WHERE user_id = ?`,
        [userId]
      );
    }

    const [updatedUser] = await pool.execute(`
      SELECT 
        u.user_id,
        u.username,
        u.email,
        u.phone,
        u.profile_image_url,
        u.bio,
        u.created_at,
        u.role_id,
        COALESCE(ur.role_name, 'user') AS role_name,
        vp.approval_status_id,
        vas.status_name AS volunteer_status,
        vp.badges,
        vp.joined_at AS volunteer_since
      FROM users u
      LEFT JOIN user_roles ur ON u.role_id = ur.role_id
      LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
      LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
      WHERE u.user_id = ?
    `, [userId]);

    const responseUser = updatedUser[0];
    
    const formattedUser = {
      user_id: responseUser.user_id,
      username: responseUser.username,
      email: responseUser.email,
      phone: responseUser.phone,
      profile_image_url: responseUser.profile_image_url,
      bio: responseUser.bio || '',
      created_at: responseUser.created_at,
      role_name: responseUser.role_name,
      volunteer: responseUser.role_id === 2 && responseUser.approval_status_id ? {
        approval_status_id: responseUser.approval_status_id,
        status: responseUser.volunteer_status,
        badges: responseUser.badges ? JSON.parse(responseUser.badges) : [],
        volunteer_since: responseUser.volunteer_since
      } : null
    };

    res.json({
      success: true,
      message: 'Volunteer approved successfully',
      user: formattedUser
    });

  } catch (err) {
    console.error('Approve volunteer error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

router.put('/:id/reject', verifyToken, async (req, res) => {
  // Same as POST /reject but with PUT method
  try {
    const userId = Number(req.params.id);
    
    if (req.user.role_id !== 3) {
      return res.status(403).json({ 
        success: false, 
        message: 'Forbidden: Admin access required' 
      });
    }

    const [userCheck] = await pool.execute(`
      SELECT u.user_id, u.username, u.role_id, vp.approval_status_id
      FROM users u
      LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
      WHERE u.user_id = ? AND u.is_deleted = 0
    `, [userId]);

    if (userCheck.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const user = userCheck[0];
    
    if (user.role_id !== 2) {
      return res.status(400).json({ 
        success: false, 
        message: 'User is not a volunteer' 
      });
    }

    const [volunteerCheck] = await pool.execute(
      'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
      [userId]
    );

    if (volunteerCheck.length === 0) {
      await pool.execute(
        `INSERT INTO volunteer_profiles (user_id, approval_status_id) VALUES (?, 3)`,
        [userId]
      );
    } else {
      await pool.execute(
        `UPDATE volunteer_profiles SET approval_status_id = 3 WHERE user_id = ?`,
        [userId]
      );
    }

    const [updatedUser] = await pool.execute(`
      SELECT 
        u.user_id,
        u.username,
        u.email,
        u.phone,
        u.profile_image_url,
        u.bio,
        u.created_at,
        u.role_id,
        COALESCE(ur.role_name, 'user') AS role_name,
        vp.approval_status_id,
        vas.status_name AS volunteer_status,
        vp.badges,
        vp.joined_at AS volunteer_since
      FROM users u
      LEFT JOIN user_roles ur ON u.role_id = ur.role_id
      LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
      LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
      WHERE u.user_id = ?
    `, [userId]);

    const responseUser = updatedUser[0];
    
    const formattedUser = {
      user_id: responseUser.user_id,
      username: responseUser.username,
      email: responseUser.email,
      phone: responseUser.phone,
      profile_image_url: responseUser.profile_image_url,
      bio: responseUser.bio || '',
      created_at: responseUser.created_at,
      role_name: responseUser.role_name,
      volunteer: responseUser.role_id === 2 && responseUser.approval_status_id ? {
        approval_status_id: responseUser.approval_status_id,
        status: responseUser.volunteer_status,
        badges: responseUser.badges ? JSON.parse(responseUser.badges) : [],
        volunteer_since: responseUser.volunteer_since
      } : null
    };

    res.json({
      success: true,
      message: 'Volunteer rejected',
      user: formattedUser
    });

  } catch (err) {
    console.error('Reject volunteer error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

module.exports = router;