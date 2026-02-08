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

// /* =====================================================
//    GET ALL USERS (ADMIN ONLY) - FIXED
// ===================================================== */
// router.get('/', verifyToken, async (req, res) => {
//   try {
//     if (req.user.role_id !== 3) {
//       return res.status(403).json({ message: 'Forbidden: Admins only' });
//     }

//     const [rows] = await pool.execute(`
//       SELECT 
//         u.user_id,
//         u.username,
//         u.email,
//         u.phone,
//         u.profile_image_url,
//         u.created_at,
//         u.role_id,
//         COALESCE(ur.role_name, 'user') AS role_name,
//         vp.approval_status_id,
//         vas.status_name AS volunteer_status,
//         vp.badges
//       FROM users u
//       LEFT JOIN user_roles ur ON u.role_id = ur.role_id
//       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
//       LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
//       WHERE u.is_deleted = 0
//       ORDER BY u.user_id
//     `);

//     const users = rows.map(user => ({
//       user_id: user.user_id,
//       username: user.username,
//       email: user.email,
//       phone: user.phone,
//       profile_image_url: user.profile_image_url,
//       created_at: user.created_at,
//       role: user.role_name,
//       volunteer: user.role_id === 2 && user.approval_status_id ? {
//         approval_status_id: user.approval_status_id,
//         status: user.volunteer_status,
//         badges: user.badges ? JSON.parse(user.badges) : [],
//       } : null
//     }));

//     res.json(users);

//   } catch (err) {
//     console.error('GET /api/users error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// /* =====================================================
//    GET SINGLE USER (SELF OR ADMIN) + REPORTS - FIXED
// ===================================================== */
// router.get('/:id', verifyToken, async (req, res) => {
//   const userId = Number(req.params.id);
//   if (!userId) return res.status(400).json({ message: 'Invalid user ID' });

//   try {
//     // Check permissions
//     if (req.user.user_id !== userId && req.user.role_id !== 3) {
//       return res.status(403).json({ message: 'Forbidden' });
//     }

//     // First, check if user exists and is not deleted
//     const [userCheck] = await pool.execute(
//       'SELECT user_id, role_id FROM users WHERE user_id = ? AND is_deleted = 0',
//       [userId]
//     );

//     if (userCheck.length === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const userRoleId = userCheck[0].role_id;

//     // Fetch user basic info with role
//     const [userRows] = await pool.execute(`
//       SELECT 
//         u.user_id,
//         u.username,
//         u.email,
//         u.phone,
//         u.profile_image_url,
//         u.created_at,
//         u.role_id,
//         COALESCE(ur.role_name, 'user') AS role_name
//       FROM users u
//       LEFT JOIN user_roles ur ON u.role_id = ur.role_id
//       WHERE u.user_id = ?
//     `, [userId]);

//     if (userRows.length === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const user = userRows[0];
    
//     // Initialize volunteer data as null
//     let volunteerData = null;
    
//     // Only fetch volunteer profile if user is a volunteer (role_id = 2)
//     if (userRoleId === 2) {
//       const [volunteerRows] = await pool.execute(`
//         SELECT 
//           vp.approval_status_id,
//           vas.status_name AS volunteer_status,
//           vp.badges,
//           vp.joined_at AS volunteer_since
//         FROM volunteer_profiles vp
//         LEFT JOIN volunteer_approval_statuses vas 
//           ON vp.approval_status_id = vas.status_id
//         WHERE vp.user_id = ?
//       `, [userId]);

//       if (volunteerRows.length > 0) {
//         volunteerData = {
//           approval_status_id: volunteerRows[0].approval_status_id,
//           status: volunteerRows[0].volunteer_status,
//           badges: volunteerRows[0].badges ? JSON.parse(volunteerRows[0].badges) : [],
//           volunteer_since: volunteerRows[0].volunteer_since
//         };
//       }
//     }

//     // Fetch reports for the user
//     // const [reports] = await pool.execute(`
//     //   SELECT report_id, title, description, status, created_at
//     //   FROM reports
//     //   WHERE user_id = ? AND is_deleted = 0
//     //   ORDER BY created_at DESC
//     // `, [userId]);

//     // Construct response
//     const response = {
//       user_id: user.user_id,
//       username: user.username,
//       email: user.email,
//       phone: user.phone,
//       profile_image_url: user.profile_image_url,
//       created_at: user.created_at,
//       role: user.role_name,
//       volunteer: volunteerData,
//       // reports: reports || []
//     };

//     res.json(response);

//   } catch (err) {
//     console.error('GET /api/users/:id error:', err);
//     res.status(500).json({ 
//       message: 'Server error',
//       error: process.env.NODE_ENV === 'development' ? err.message : undefined
//     });
//   }
// });

// /* =====================================================
//    UPDATE USER (PATCH) - FIXED
// ===================================================== */
// router.patch('/:id', verifyToken, async (req, res) => {
//   const userId = Number(req.params.id);
//   const { username, email, phone, profile_image_url } = req.body;

//   if (!userId) return res.status(400).json({ message: 'Invalid user ID' });

//   try {
//     // Check if user exists
//     const [userCheck] = await pool.execute(
//       'SELECT user_id FROM users WHERE user_id = ? AND is_deleted = 0',
//       [userId]
//     );

//     if (userCheck.length === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Check permissions
//     if (req.user.user_id !== userId && req.user.role_id !== 3) {
//       return res.status(403).json({ message: 'Forbidden' });
//     }

//     // Build update query dynamically based on provided fields
//     const updateFields = [];
//     const updateValues = [];
    
//     if (username !== undefined) {
//       updateFields.push('username = ?');
//       updateValues.push(username);
//     }
    
//     if (email !== undefined) {
//       updateFields.push('email = ?');
//       updateValues.push(email);
//     }
    
//     if (phone !== undefined) {
//       updateFields.push('phone = ?');
//       updateValues.push(phone);
//     }
    
//     if (profile_image_url !== undefined) {
//       updateFields.push('profile_image_url = ?');
//       updateValues.push(profile_image_url);
//     }
    
//     // If no fields to update
//     if (updateFields.length === 0) {
//       return res.status(400).json({ message: 'No fields to update' });
//     }
    
//     updateValues.push(userId);
    
//     const updateQuery = `
//       UPDATE users
//       SET ${updateFields.join(', ')}
//       WHERE user_id = ? AND is_deleted = 0
//     `;
    
//     await pool.execute(updateQuery, updateValues);

//     // Fetch updated user
//     const [updated] = await pool.execute(`
//       SELECT 
//         u.user_id,
//         u.username,
//         u.email,
//         u.phone,
//         u.profile_image_url,
//         u.created_at,
//         u.role_id,
//         COALESCE(ur.role_name, 'user') AS role_name
//       FROM users u
//       LEFT JOIN user_roles ur ON u.role_id = ur.role_id
//       WHERE u.user_id = ?
//     `, [userId]);

//     res.json({ 
//       message: 'User updated successfully', 
//       user: updated[0] 
//     });

//   } catch (err) {
//     console.error('PATCH /api/users/:id error:', err);
//     res.status(500).json({ 
//       message: 'Server error',
//       error: process.env.NODE_ENV === 'development' ? err.message : undefined
//     });
//   }
// });

// /* =====================================================
//    DELETE USER (ADMIN ONLY – SOFT DELETE) - FIXED
// ===================================================== */
// router.delete('/:id', verifyToken, async (req, res) => {
//   const userId = Number(req.params.id);
  
//   if (!userId) {
//     return res.status(400).json({ message: 'Invalid user ID' });
//   }
  
//   const connection = await pool.getConnection();

//   try {
//     // Admin check
//     if (req.user.role_id !== 3) {
//       return res.status(403).json({ message: 'Only admin can delete users' });
//     }

//     // Check if user exists
//     const [userRows] = await connection.execute(
//       'SELECT user_id, role_id FROM users WHERE user_id = ? AND is_deleted = 0',
//       [userId]
//     );

//     if (userRows.length === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }
    
//     if (userRows[0].role_id === 3) {
//       return res.status(403).json({ message: 'Cannot delete admin user' });
//     }

//     await connection.beginTransaction();

//     // Soft delete user
//     await connection.execute(
//       'UPDATE users SET is_deleted = 1 WHERE user_id = ?',
//       [userId]
//     );

//     // Soft delete user's reports
//     await connection.execute(
//       'UPDATE reports SET is_deleted = 1 WHERE user_id = ?',
//       [userId]
//     );

//     // Soft delete tasks associated with user's reports
//     await connection.execute(`
//       UPDATE tasks t
//       JOIN reports r ON t.report_id = r.report_id
//       SET t.is_deleted = 1
//       WHERE r.user_id = ?
//     `, [userId]);

//     await connection.commit();
    
//     res.json({ 
//       message: 'User deleted successfully',
//       user_id: userId
//     });

//   } catch (err) {
//     await connection.rollback();
//     console.error('DELETE /api/users/:id error:', err);
//     res.status(500).json({ 
//       message: 'Server error',
//       error: process.env.NODE_ENV === 'development' ? err.message : undefined
//     });
//   } finally {
//     connection.release();
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const mysql = require('mysql2/promise');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// MySQL pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

/* =====================================================
   CONFIGURE MULTER FOR FILE UPLOADS
// ===================================================== */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/profile-images/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'profile-' + req.params.id + '-' + uniqueSuffix + ext);
  }
});


const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

/* =====================================================
   GET ALL USERS (ADMIN ONLY)
===================================================== */
router.get('/', verifyToken, async (req, res) => {
  try {
    if (req.user.role_id !== 3) {
      return res.status(403).json({ message: 'Forbidden: Admins only' });
    }

    const [rows] = await pool.execute(`
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
        vp.badges
      FROM users u
      LEFT JOIN user_roles ur ON u.role_id = ur.role_id
      LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
      LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
      WHERE u.is_deleted = 0
      ORDER BY u.user_id
    `);

    const users = rows.map(user => ({
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      profile_image_url: user.profile_image_url,
      bio: user.bio || '',
      created_at: user.created_at,
      role: user.role_name,
      volunteer: user.role_id === 2 && user.approval_status_id ? {
        approval_status_id: user.approval_status_id,
        status: user.volunteer_status,
        badges: user.badges ? JSON.parse(user.badges) : [],
      } : null
    }));

    res.json(users);

  } catch (err) {
    console.error('GET /api/users error:', err);
    res.status(500).json({ 
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

/* =====================================================
   GET SINGLE USER (SELF OR ADMIN)
===================================================== */
router.get('/:id', verifyToken, async (req, res) => {
  const userId = Number(req.params.id);
  if (!userId) return res.status(400).json({ message: 'Invalid user ID' });

  try {
    // Check permissions
    if (req.user.user_id !== userId && req.user.role_id !== 3) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // First, check if user exists and is not deleted
    const [userCheck] = await pool.execute(
      'SELECT user_id, role_id FROM users WHERE user_id = ? AND is_deleted = 0',
      [userId]
    );

    if (userCheck.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userRoleId = userCheck[0].role_id;

    // Fetch user basic info with role and bio
    const [userRows] = await pool.execute(`
      SELECT 
        u.user_id,
        u.username,
        u.email,
        u.phone,
        u.profile_image_url,
        u.bio,
        u.created_at,
        u.role_id,
        COALESCE(ur.role_name, 'user') AS role_name
      FROM users u
      LEFT JOIN user_roles ur ON u.role_id = ur.role_id
      WHERE u.user_id = ?
    `, [userId]);

    if (userRows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userRows[0];
    
    // Initialize volunteer data as null
    let volunteerData = null;
    
    // Only fetch volunteer profile if user is a volunteer (role_id = 2)
    if (userRoleId === 2) {
      const [volunteerRows] = await pool.execute(`
        SELECT 
          vp.approval_status_id,
          vas.status_name AS volunteer_status,
          vp.badges,
          vp.joined_at AS volunteer_since
        FROM volunteer_profiles vp
        LEFT JOIN volunteer_approval_statuses vas 
          ON vp.approval_status_id = vas.status_id
        WHERE vp.user_id = ?
      `, [userId]);

      if (volunteerRows.length > 0) {
        volunteerData = {
          approval_status_id: volunteerRows[0].approval_status_id,
          status: volunteerRows[0].volunteer_status,
          badges: volunteerRows[0].badges ? JSON.parse(volunteerRows[0].badges) : [],
          volunteer_since: volunteerRows[0].volunteer_since
        };
      }
    }

    // Construct response
    const response = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      profile_image_url: user.profile_image_url,
      bio: user.bio || '',
      created_at: user.created_at,
      role_name: user.role_name,
      volunteer: volunteerData,
    };

    res.json(response);

  } catch (err) {
    console.error('GET /api/users/:id error:', err);
    res.status(500).json({ 
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

/* =====================================================
   UPLOAD PROFILE IMAGE
===================================================== */
router.post('/:id/profile-image', verifyToken, upload.single('profile_image'), async (req, res) => {
  const userId = Number(req.params.id);
  
  if (!userId) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }
  
  try {
    // Check if user exists
    const [userCheck] = await pool.execute(
      'SELECT user_id, profile_image_url FROM users WHERE user_id = ? AND is_deleted = 0',
      [userId]
    );
    
    if (userCheck.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check permissions (user can only update their own profile unless admin)
    if (req.user.user_id !== userId && req.user.role_id !== 3) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }
    
    // Generate URL for the uploaded image
    const imageUrl = `/uploads/profile-images/${req.file.filename}`;
    
    const currentImageUrl = userCheck[0].profile_image_url;
    
    // Delete old image file if it exists
    if (currentImageUrl) {
      const oldFilename = currentImageUrl.split('/').pop();
      const oldFilePath = path.join(__dirname, '..', 'uploads', 'profile-images', oldFilename);
      
      // Delete file if it exists
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }
    
    // Update user record with new image URL
    await pool.execute(
      'UPDATE users SET profile_image_url = ? WHERE user_id = ?',
      [imageUrl, userId]
    );
    
    res.json({
      success: true,
      message: 'Profile image uploaded successfully',
      profile_image_url: imageUrl
    });
    
  } catch (err) {
    console.error('Profile image upload error:', err);
    
    // If multer error (file too large, wrong type, etc.)
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File size too large. Maximum size is 5MB.' });
      }
      return res.status(400).json({ message: err.message });
    }
    
    // If file filter error
    if (err.message && err.message.includes('Only image files')) {
      return res.status(400).json({ message: err.message });
    }
    
    res.status(500).json({ 
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

/* =====================================================
   REMOVE PROFILE IMAGE
===================================================== */
router.delete('/:id/profile-image', verifyToken, async (req, res) => {
  const userId = Number(req.params.id);
  
  if (!userId) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }
  
  try {
    // Check if user exists
    const [userCheck] = await pool.execute(
      'SELECT user_id, profile_image_url FROM users WHERE user_id = ? AND is_deleted = 0',
      [userId]
    );
    
    if (userCheck.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check permissions
    if (req.user.user_id !== userId && req.user.role_id !== 3) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    
    const currentImageUrl = userCheck[0].profile_image_url;
    
    // If there's an existing image, delete the file from server
    if (currentImageUrl) {
      const filename = currentImageUrl.split('/').pop();
      const filePath = path.join(__dirname, '..', 'uploads', 'profile-images', filename);
      
      // Delete file if it exists
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    // Remove profile image URL from database
    await pool.execute(
      'UPDATE users SET profile_image_url = NULL WHERE user_id = ?',
      [userId]
    );
    
    res.json({
      success: true,
      message: 'Profile image removed successfully'
    });
    
  } catch (err) {
    console.error('Profile image removal error:', err);
    res.status(500).json({ 
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

/* =====================================================
   UPDATE USER (PATCH)
===================================================== */
router.patch('/:id', verifyToken, async (req, res) => {
  const userId = Number(req.params.id);
  const { username, email, phone, bio } = req.body;

  if (!userId) return res.status(400).json({ message: 'Invalid user ID' });

  try {
    // Check if user exists
    const [userCheck] = await pool.execute(
      'SELECT user_id FROM users WHERE user_id = ? AND is_deleted = 0',
      [userId]
    );

    if (userCheck.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check permissions
    if (req.user.user_id !== userId && req.user.role_id !== 3) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Build update query dynamically based on provided fields
    const updateFields = [];
    const updateValues = [];
    
    if (username !== undefined) {
      if (!username.trim()) {
        return res.status(400).json({ message: 'Username cannot be empty' });
      }
      updateFields.push('username = ?');
      updateValues.push(username.trim());
    }
    
    if (email !== undefined) {
      if (!email.trim()) {
        return res.status(400).json({ message: 'Email cannot be empty' });
      }
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
      updateFields.push('email = ?');
      updateValues.push(email.trim());
    }
    
    if (phone !== undefined) {
      updateFields.push('phone = ?');
      updateValues.push(phone ? phone.trim() : null);
    }
    
    // Add bio field update
    if (bio !== undefined) {
      updateFields.push('bio = ?');
      updateValues.push(bio ? bio.trim() : '');
    }
    
    // If no fields to update
    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }
    
    updateValues.push(userId);
    
    const updateQuery = `
      UPDATE users
      SET ${updateFields.join(', ')}
      WHERE user_id = ? AND is_deleted = 0
    `;
    
    await pool.execute(updateQuery, updateValues);

    // Fetch updated user
    const [updated] = await pool.execute(`
      SELECT 
        u.user_id,
        u.username,
        u.email,
        u.phone,
        u.profile_image_url,
        u.bio,
        u.created_at,
        u.role_id,
        COALESCE(ur.role_name, 'user') AS role_name
      FROM users u
      LEFT JOIN user_roles ur ON u.role_id = ur.role_id
      WHERE u.user_id = ?
    `, [userId]);

    res.json({ 
      message: 'User updated successfully', 
      user: updated[0] 
    });

  } catch (err) {
    console.error('PATCH /api/users/:id error:', err);
    
    // Handle MySQL duplicate entry errors
    if (err.code === 'ER_DUP_ENTRY') {
      if (err.message.includes('username')) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      if (err.message.includes('email')) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }
    
    res.status(500).json({ 
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

/* =====================================================
   DELETE USER (ADMIN ONLY – SOFT DELETE)
===================================================== */
router.delete('/:id', verifyToken, async (req, res) => {
  const userId = Number(req.params.id);
  
  if (!userId) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }
  
  const connection = await pool.getConnection();

  try {
    // Admin check
    if (req.user.role_id !== 3) {
      return res.status(403).json({ message: 'Only admin can delete users' });
    }

    // Check if user exists
    const [userRows] = await connection.execute(
      'SELECT user_id, role_id, profile_image_url FROM users WHERE user_id = ? AND is_deleted = 0',
      [userId]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (userRows[0].role_id === 3) {
      return res.status(403).json({ message: 'Cannot delete admin user' });
    }

    await connection.beginTransaction();

    // Delete profile image file if exists
    const profileImageUrl = userRows[0].profile_image_url;
    if (profileImageUrl) {
      const filename = profileImageUrl.split('/').pop();
      const filePath = path.join(__dirname, '..', 'uploads', 'profile-images', filename);
      
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Soft delete user
    await connection.execute(
      'UPDATE users SET is_deleted = 1 WHERE user_id = ?',
      [userId]
    );

    // Soft delete user's reports
    await connection.execute(
      'UPDATE reports SET is_deleted = 1 WHERE user_id = ?',
      [userId]
    );

    // Soft delete tasks associated with user's reports
    await connection.execute(`
      UPDATE tasks t
      JOIN reports r ON t.report_id = r.report_id
      SET t.is_deleted = 1
      WHERE r.user_id = ?
    `, [userId]);

    await connection.commit();
    
    res.json({ 
      message: 'User deleted successfully',
      user_id: userId
    });

  } catch (err) {
    await connection.rollback();
    console.error('DELETE /api/users/:id error:', err);
    res.status(500).json({ 
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  } finally {
    connection.release();
  }
});

/* =====================================================
   APPROVE USER AS VOLUNTEER (ADMIN ONLY) - NEW ROUTE
===================================================== */
router.put('/:id/approve', verifyToken, async (req, res) => {
  try {
    const userId = Number(req.params.id);
    
    // Admin check
    if (req.user.role_id !== 3) {
      return res.status(403).json({ 
        success: false, 
        message: 'Forbidden: Admin access required' 
      });
    }

    // Check if user exists
    const [userCheck] = await pool.execute(
      'SELECT user_id, role_id FROM users WHERE user_id = ? AND is_deleted = 0',
      [userId]
    );

    if (userCheck.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Update user role to volunteer (role_id = 2)
    await pool.execute(
      'UPDATE users SET role_id = 2 WHERE user_id = ?',
      [userId]
    );

    // Check if volunteer profile exists, create if not
    const [volunteerCheck] = await pool.execute(
      'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
      [userId]
    );

    if (volunteerCheck.length === 0) {
      // Create volunteer profile with approved status
      await pool.execute(
        `INSERT INTO volunteer_profiles (user_id, approval_status_id, joined_at) 
         VALUES (?, 2, NOW())`,
        [userId]
      );
    } else {
      // Update existing volunteer profile
      await pool.execute(
        `UPDATE volunteer_profiles SET approval_status_id = 2, joined_at = NOW() 
         WHERE user_id = ?`,
        [userId]
      );
    }

    // Return updated user data
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
      message: 'User approved as volunteer successfully',
      user: formattedUser
    });

  } catch (err) {
    console.error('Approve user error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

/* =====================================================
   REJECT USER VOLUNTEER APPLICATION (ADMIN ONLY) - NEW ROUTE
===================================================== */
router.put('/:id/reject', verifyToken, async (req, res) => {
  try {
    const userId = Number(req.params.id);
    
    // Admin check
    if (req.user.role_id !== 3) {
      return res.status(403).json({ 
        success: false, 
        message: 'Forbidden: Admin access required' 
      });
    }

    // Check if user exists
    const [userCheck] = await pool.execute(
      'SELECT user_id, role_id FROM users WHERE user_id = ? AND is_deleted = 0',
      [userId]
    );

    if (userCheck.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Make sure user is a volunteer (role_id = 2)
    if (userCheck[0].role_id !== 2) {
      await pool.execute(
        'UPDATE users SET role_id = 2 WHERE user_id = ?',
        [userId]
      );
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

    // Return updated user data
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
    
    // Format the response
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
      message: 'User volunteer application rejected',
      user: formattedUser
    });

  } catch (err) {
    console.error('Reject user error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

/* =====================================================
   ADD POST METHOD ALIASES FOR COMPATIBILITY
===================================================== */
router.post('/:id/approve', verifyToken, async (req, res) => {
  // Just call the PUT version
  try {
    const userId = Number(req.params.id);
    
    if (req.user.role_id !== 3) {
      return res.status(403).json({ 
        success: false, 
        message: 'Forbidden: Admin access required' 
      });
    }

    // Check if user exists
    const [userCheck] = await pool.execute(
      'SELECT user_id, role_id FROM users WHERE user_id = ? AND is_deleted = 0',
      [userId]
    );

    if (userCheck.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    await pool.execute(
      'UPDATE users SET role_id = 2 WHERE user_id = ?',
      [userId]
    );

    const [volunteerCheck] = await pool.execute(
      'SELECT user_id FROM volunteer_profiles WHERE user_id = ?',
      [userId]
    );

    if (volunteerCheck.length === 0) {
      await pool.execute(
        `INSERT INTO volunteer_profiles (user_id, approval_status_id, joined_at) 
         VALUES (?, 2, NOW())`,
        [userId]
      );
    } else {
      await pool.execute(
        `UPDATE volunteer_profiles SET approval_status_id = 2, joined_at = NOW() 
         WHERE user_id = ?`,
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
      message: 'User approved as volunteer successfully (POST)',
      user: formattedUser
    });
  } catch (err) {
    console.error('Approve user error (POST):', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

router.post('/:id/reject', verifyToken, async (req, res) => {
  // Just call the PUT version logic
  try {
    const userId = Number(req.params.id);
    
    if (req.user.role_id !== 3) {
      return res.status(403).json({ 
        success: false, 
        message: 'Forbidden: Admin access required' 
      });
    }

    const [userCheck] = await pool.execute(
      'SELECT user_id, role_id FROM users WHERE user_id = ? AND is_deleted = 0',
      [userId]
    );

    if (userCheck.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    if (userCheck[0].role_id !== 2) {
      await pool.execute(
        'UPDATE users SET role_id = 2 WHERE user_id = ?',
        [userId]
      );
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
      message: 'User volunteer application rejected (POST)',
      user: formattedUser
    });
  } catch (err) {
    console.error('Reject user error (POST):', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

module.exports = router;