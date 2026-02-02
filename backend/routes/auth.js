// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const mysql = require('mysql2/promise');
// require('dotenv').config();

// const router = express.Router();

// // MySQL pool
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// // ---------------------------
// // POST /api/auth/register
// // ---------------------------
// router.post('/register', async (req, res) => {
//   const { username, email, password, phone, isVolunteer } = req.body;

//   // Validation
//   if (!username || !email || !password) {
//     return res.status(400).json({ 
//       success: false,
//       message: 'Username, email, and password are required' 
//     });
//   }

//   if (username.length < 3) return res.status(400).json({ success: false, message: 'Username must be at least 3 characters' });
//   if (password.length < 6) return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });

//   // Email validation
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) return res.status(400).json({ success: false, message: 'Invalid email address' });

//   // Phone validation (optional)
//   let formattedPhone = null;
//   if (phone && phone.trim() !== '') {
//     const cleanedPhone = phone.replace(/[\s\-+]/g, '');
//     const nepaliPhoneRegex = /^9[78]\d{8}$/;
//     if (!nepaliPhoneRegex.test(cleanedPhone)) {
//       return res.status(400).json({ success: false, message: 'Invalid Nepali phone number' });
//     }
//     formattedPhone = cleanedPhone;
//   }

//   try {
//     const connection = await pool.getConnection();
//     await connection.beginTransaction();

//     // Check duplicates
//     const [existingUsers] = await connection.execute(
//       'SELECT * FROM users WHERE email = ? OR username = ? OR phone = ?',
//       [email, username, formattedPhone]
//     );

//     if (existingUsers.length > 0) {
//       await connection.rollback();
//       connection.release();
//       return res.status(400).json({ success: false, message: 'Email, username, or phone already exists' });
//     }

//     // Hash password
//     const passwordHash = await bcrypt.hash(password, 10);

//     // Role
//     const role_id = isVolunteer ? 2 : 1;

//     // Insert user
//     const [userResult] = await connection.execute(
//       `INSERT INTO users (username, email, phone, password_hash, role_id, created_at)
//        VALUES (?, ?, ?, ?, ?, NOW())`,
//       [username, email, formattedPhone, passwordHash, role_id]
//     );

//     const userId = userResult.insertId;

//     // If volunteer, insert into volunteer_profiles
//     if (isVolunteer) {
//       let availability_status_id = 1;
//       let approval_status_id = 1;

//       try {
//         const [availRows] = await connection.execute('SELECT status_id FROM availability_statuses WHERE status_name = "available" LIMIT 1');
//         if (availRows.length > 0) availability_status_id = availRows[0].status_id;

//         const [approvalRows] = await connection.execute('SELECT status_id FROM volunteer_approval_statuses WHERE status_name = "pending" LIMIT 1');
//         if (approvalRows.length > 0) approval_status_id = approvalRows[0].status_id;

//         await connection.execute(
//           `INSERT INTO volunteer_profiles (user_id, joined_at, availability_status_id, approval_status_id)
//            VALUES (?, NOW(), ?, ?)`,
//           [userId, availability_status_id, approval_status_id]
//         );
//       } catch (err) {
//         console.log('Volunteer profile insert failed, continuing...', err.message);
//       }
//     }

//     await connection.commit();
//     connection.release();

//     // JWT
//     const token = jwt.sign({ user_id: userId, role_id }, process.env.JWT_SECRET, { expiresIn: '7d' });

//     res.status(201).json({
//       success: true,
//       message: isVolunteer ? 'Volunteer registered! Awaiting approval.' : 'User registered!',
//       token,
//       user: { user_id: userId, username, email, phone, role_id, is_volunteer: !!isVolunteer }
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });

// // ---------------------------
// // POST /api/auth/login
// // ---------------------------
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });

//   try {
//     const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
//     if (rows.length === 0) return res.status(401).json({ success: false, message: 'Invalid email or password' });

//     const user = rows[0];
//     const isMatch = await bcrypt.compare(password, user.password_hash);
//     if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid email or password' });

//     // Get volunteer data if user is volunteer
//     let volunteerData = null;
//     if (user.role_id === 2) {
//       const [volRows] = await pool.execute(
//         `SELECT joined_at, approval_status_id 
//          FROM volunteer_profiles WHERE user_id = ?`,
//         [user.user_id]
//       );
//       if (volRows.length > 0) volunteerData = volRows[0];
//     }

//     // JWT
//     const token = jwt.sign({ user_id: user.user_id, role_id: user.role_id }, process.env.JWT_SECRET, { expiresIn: '7d' });

//     const userResponse = {
//       user_id: user.user_id,
//       username: user.username,
//       email: user.email,
//       phone: user.phone,
//       role_id: user.role_id,
//       created_at: user.created_at,
//       volunteer_joined_at: volunteerData?.joined_at ?? null,
//       volunteer_approval_status_id: volunteerData?.approval_status_id ?? null
//     };

//     res.json({ success: true, message: 'Login successful', token, user: userResponse });

//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });

// // ---------------------------
// // GET /api/auth/check
// // ---------------------------
// router.get('/check', async (req, res) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ success: false, message: 'No token' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const [rows] = await pool.execute('SELECT user_id, username, email, phone, role_id, created_at FROM users WHERE user_id = ?', [decoded.user_id]);
//     if (rows.length === 0) return res.status(401).json({ success: false, message: 'User not found' });

//     res.json({ success: true, user: rows[0] });
//   } catch (err) {
//     console.error(err);
//     res.status(401).json({ success: false, message: 'Invalid token' });
//   }
// });

// module.exports = router;


const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
require('dotenv').config();

const router = express.Router();

// MySQL pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// ---------------------------
// POST /api/auth/register
// ---------------------------
router.post('/register', async (req, res) => {
  const { username, email, password, phone, isVolunteer } = req.body;

  // Validation
  if (!username || !email || !password) {
    return res.status(400).json({ 
      success: false,
      message: 'Username, email, and password are required' 
    });
  }

  if (username.length < 3) return res.status(400).json({ success: false, message: 'Username must be at least 3 characters' });
  if (password.length < 6) return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return res.status(400).json({ success: false, message: 'Invalid email address' });

  // Phone validation (optional)
  let formattedPhone = null;
  if (phone && phone.trim() !== '') {
    const cleanedPhone = phone.replace(/[\s\-+]/g, '');
    const nepaliPhoneRegex = /^9[78]\d{8}$/;
    if (!nepaliPhoneRegex.test(cleanedPhone)) {
      return res.status(400).json({ success: false, message: 'Invalid Nepali phone number' });
    }
    formattedPhone = cleanedPhone;
  }

  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    // Check duplicates
    const [existingUsers] = await connection.execute(
      'SELECT * FROM users WHERE email = ? OR username = ? OR phone = ?',
      [email, username, formattedPhone]
    );

    if (existingUsers.length > 0) {
      await connection.rollback();
      connection.release();
      return res.status(400).json({ success: false, message: 'Email, username, or phone already exists' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Role
    const role_id = isVolunteer ? 2 : 1;

    // Insert user
    const [userResult] = await connection.execute(
      `INSERT INTO users (username, email, phone, password_hash, role_id, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [username, email, formattedPhone, passwordHash, role_id]
    );

    const userId = userResult.insertId;

    // If volunteer, insert into volunteer_profiles
    if (isVolunteer) {
      let availability_status_id = 1;
      let approval_status_id = 1;

      try {
        const [availRows] = await connection.execute('SELECT status_id FROM availability_statuses WHERE status_name = "available" LIMIT 1');
        if (availRows.length > 0) availability_status_id = availRows[0].status_id;

        const [approvalRows] = await connection.execute('SELECT status_id FROM volunteer_approval_statuses WHERE status_name = "pending" LIMIT 1');
        if (approvalRows.length > 0) approval_status_id = approvalRows[0].status_id;

        await connection.execute(
          `INSERT INTO volunteer_profiles (user_id, joined_at, availability_status_id, approval_status_id)
           VALUES (?, NOW(), ?, ?)`,
          [userId, availability_status_id, approval_status_id]
        );
      } catch (err) {
        console.log('Volunteer profile insert failed, continuing...', err.message);
      }
    }

    await connection.commit();
    connection.release();

    // Get user with role name for response
    const [newUserRows] = await pool.execute(`
      SELECT u.*, ur.role_name 
      FROM users u 
      LEFT JOIN user_roles ur ON u.role_id = ur.role_id 
      WHERE u.user_id = ?
    `, [userId]);

    const newUser = newUserRows[0];

    // Get volunteer data if volunteer
    let volunteerData = null;
    if (role_id === 2) {
      const [volRows] = await pool.execute(
        `SELECT 
          vp.joined_at,
          vp.approval_status_id,
          vas.status_name as volunteer_status,
          vp.badges
         FROM volunteer_profiles vp
         LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
         WHERE vp.user_id = ?`,
        [userId]
      );
      if (volRows.length > 0) {
        volunteerData = volRows[0];
      }
    }

    // JWT
    const token = jwt.sign({ 
      user_id: userId, 
      role_id: role_id 
    }, process.env.JWT_SECRET, { expiresIn: '7d' });

    const userResponse = {
      user_id: userId,
      username: newUser.username,
      email: newUser.email,
      phone: newUser.phone,
      role_id: newUser.role_id,
      role_name: newUser.role_name,
      created_at: newUser.created_at,
      volunteer: role_id === 2 ? {
        approval_status_id: volunteerData?.approval_status_id || 1,
        status: volunteerData?.volunteer_status || 'pending',
        badges: volunteerData?.badges ? JSON.parse(volunteerData.badges) : [],
        volunteer_since: volunteerData?.joined_at || null
      } : null
    };

    res.status(201).json({
      success: true,
      message: isVolunteer ? 'Volunteer registered! Awaiting approval.' : 'User registered!',
      token,
      user: userResponse
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ---------------------------
// POST /api/auth/login - FIXED
// ---------------------------
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email and password required' 
    });
  }

  try {
    // Get user with role name
    const [rows] = await pool.execute(`
      SELECT 
        u.*,
        ur.role_name
      FROM users u
      LEFT JOIN user_roles ur ON u.role_id = ur.role_id
      WHERE u.email = ? AND u.is_deleted = 0
    `, [email]);
    
    if (rows.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Get volunteer data if user is volunteer
    let volunteerData = null;
    if (user.role_id === 2) {
      const [volRows] = await pool.execute(
        `SELECT 
          vp.joined_at,
          vp.approval_status_id,
          vas.status_name as volunteer_status,
          vp.badges
         FROM volunteer_profiles vp
         LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
         WHERE vp.user_id = ?`,
        [user.user_id]
      );
      if (volRows.length > 0) {
        volunteerData = volRows[0];
      }
    }

    // JWT
    const token = jwt.sign({ 
      user_id: user.user_id, 
      role_id: user.role_id 
    }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });

    const userResponse = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      role_id: user.role_id,
      role_name: user.role_name,
      created_at: user.created_at,
      volunteer: user.role_id === 2 ? {
        approval_status_id: volunteerData?.approval_status_id || 1,
        status: volunteerData?.volunteer_status || 'pending',
        badges: volunteerData?.badges ? JSON.parse(volunteerData.badges) : [],
        volunteer_since: volunteerData?.joined_at || null
      } : null
    };

    console.log('Login successful - User:', {
      id: userResponse.user_id,
      role: userResponse.role_name,
      volunteer_status: userResponse.volunteer?.status || 'N/A'
    });

    res.json({ 
      success: true, 
      message: 'Login successful', 
      token, 
      user: userResponse 
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// ---------------------------
// GET /api/auth/check - FIXED
// ---------------------------
router.get('/check', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'No token provided' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    const [rows] = await pool.execute(`
      SELECT 
        u.user_id,
        u.username,
        u.email,
        u.phone,
        u.role_id,
        u.created_at,
        ur.role_name
      FROM users u
      LEFT JOIN user_roles ur ON u.role_id = ur.role_id
      WHERE u.user_id = ? AND u.is_deleted = 0
    `, [decoded.user_id]);
    
    if (rows.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const user = rows[0];
    
    // Get volunteer data if user is volunteer
    let volunteerData = null;
    if (user.role_id === 2) {
      const [volRows] = await pool.execute(
        `SELECT 
          vp.joined_at,
          vp.approval_status_id,
          vas.status_name as volunteer_status,
          vp.badges
         FROM volunteer_profiles vp
         LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
         WHERE vp.user_id = ?`,
        [user.user_id]
      );
      if (volRows.length > 0) {
        volunteerData = volRows[0];
      }
    }

    const userResponse = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      role_id: user.role_id,
      role_name: user.role_name,
      created_at: user.created_at,
      volunteer: user.role_id === 2 ? {
        approval_status_id: volunteerData?.approval_status_id || 1,
        status: volunteerData?.volunteer_status || 'pending',
        badges: volunteerData?.badges ? JSON.parse(volunteerData.badges) : [],
        volunteer_since: volunteerData?.joined_at || null
      } : null
    };

    res.json({ 
      success: true, 
      user: userResponse 
    });
    
  } catch (err) {
    console.error('Check auth error:', err);
    res.status(401).json({ 
      success: false, 
      message: 'Invalid token' 
    });
  }
});

// ---------------------------
// GET /api/auth/me - NEW ENDPOINT
// ---------------------------
router.get('/me', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'No token provided' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    const [rows] = await pool.execute(`
      SELECT 
        u.user_id,
        u.username,
        u.email,
        u.phone,
        u.role_id,
        u.created_at,
        ur.role_name
      FROM users u
      LEFT JOIN user_roles ur ON u.role_id = ur.role_id
      WHERE u.user_id = ? AND u.is_deleted = 0
    `, [decoded.user_id]);
    
    if (rows.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const user = rows[0];
    
    // Get volunteer data if user is volunteer
    let volunteerData = null;
    if (user.role_id === 2) {
      const [volRows] = await pool.execute(
        `SELECT 
          vp.joined_at,
          vp.approval_status_id,
          vas.status_name as volunteer_status,
          vp.badges
         FROM volunteer_profiles vp
         LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
         WHERE vp.user_id = ?`,
        [user.user_id]
      );
      if (volRows.length > 0) {
        volunteerData = volRows[0];
      }
    }

    const userResponse = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      role_id: user.role_id,
      role_name: user.role_name,
      created_at: user.created_at,
      volunteer: user.role_id === 2 ? {
        approval_status_id: volunteerData?.approval_status_id || 1,
        status: volunteerData?.volunteer_status || 'pending',
        badges: volunteerData?.badges ? JSON.parse(volunteerData.badges) : [],
        volunteer_since: volunteerData?.joined_at || null
      } : null
    };

    res.json({ 
      success: true, 
      user: userResponse 
    });
    
  } catch (err) {
    console.error('Get /me error:', err);
    res.status(401).json({ 
      success: false, 
      message: 'Invalid token' 
    });
  }
});

// ---------------------------
// GET /api/auth/check-status/:userId - DEBUG ENDPOINT
// ---------------------------
router.get('/check-status/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const [rows] = await pool.execute(`
      SELECT 
        u.user_id,
        u.username,
        u.email,
        u.role_id,
        ur.role_name,
        vp.approval_status_id,
        vas.status_name as volunteer_status
      FROM users u
      LEFT JOIN user_roles ur ON u.role_id = ur.role_id
      LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
      LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
      WHERE u.user_id = ? AND u.is_deleted = 0
    `, [userId]);
    
    if (rows.length === 0) {
      return res.json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({ 
      success: true, 
      data: rows[0] 
    });
    
  } catch (err) {
    console.error('Check status error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: err.message 
    });
  }
});

module.exports = router;