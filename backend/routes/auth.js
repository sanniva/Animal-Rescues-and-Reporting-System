// // // const express = require('express');
// // // const bcrypt = require('bcrypt');
// // // const jwt = require('jsonwebtoken');
// // // const mysql = require('mysql2/promise');
// // // require('dotenv').config();

// // // const router = express.Router();

// // // // MySQL pool
// // // const pool = mysql.createPool({
// // //   host: process.env.DB_HOST,
// // //   user: process.env.DB_USER,
// // //   password: process.env.DB_PASSWORD,
// // //   database: process.env.DB_NAME,
// // // });

// // // // ---------------------------
// // // // POST /api/auth/register
// // // // ---------------------------
// // // router.post('/register', async (req, res) => {
// // //   const { username, email, password, phone, isVolunteer } = req.body;

// // //   // Validation
// // //   if (!username || !email || !password) {
// // //     return res.status(400).json({ 
// // //       success: false,
// // //       message: 'Username, email, and password are required' 
// // //     });
// // //   }

// // //   if (username.length < 3) return res.status(400).json({ success: false, message: 'Username must be at least 3 characters' });
// // //   if (password.length < 6) return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });

// // //   // Email validation
// // //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// // //   if (!emailRegex.test(email)) return res.status(400).json({ success: false, message: 'Invalid email address' });

// // //   // Phone validation (optional)
// // //   let formattedPhone = null;
// // //   if (phone && phone.trim() !== '') {
// // //     const cleanedPhone = phone.replace(/[\s\-+]/g, '');
// // //     const nepaliPhoneRegex = /^9[78]\d{8}$/;
// // //     if (!nepaliPhoneRegex.test(cleanedPhone)) {
// // //       return res.status(400).json({ success: false, message: 'Invalid Nepali phone number' });
// // //     }
// // //     formattedPhone = cleanedPhone;
// // //   }

// // //   try {
// // //     const connection = await pool.getConnection();
// // //     await connection.beginTransaction();

// // //     // Check duplicates
// // //     const [existingUsers] = await connection.execute(
// // //       'SELECT * FROM users WHERE email = ? OR username = ? OR phone = ?',
// // //       [email, username, formattedPhone]
// // //     );

// // //     if (existingUsers.length > 0) {
// // //       await connection.rollback();
// // //       connection.release();
// // //       return res.status(400).json({ success: false, message: 'Email, username, or phone already exists' });
// // //     }

// // //     // Hash password
// // //     const passwordHash = await bcrypt.hash(password, 10);

// // //     // Role
// // //     const role_id = isVolunteer ? 2 : 1;

// // //     // Insert user
// // //     const [userResult] = await connection.execute(
// // //       `INSERT INTO users (username, email, phone, password_hash, role_id, created_at)
// // //        VALUES (?, ?, ?, ?, ?, NOW())`,
// // //       [username, email, formattedPhone, passwordHash, role_id]
// // //     );

// // //     const userId = userResult.insertId;

// // //     // If volunteer, insert into volunteer_profiles
// // //     if (isVolunteer) {
// // //       let availability_status_id = 1;
// // //       let approval_status_id = 1;

// // //       try {
// // //         const [availRows] = await connection.execute('SELECT status_id FROM availability_statuses WHERE status_name = "available" LIMIT 1');
// // //         if (availRows.length > 0) availability_status_id = availRows[0].status_id;

// // //         const [approvalRows] = await connection.execute('SELECT status_id FROM volunteer_approval_statuses WHERE status_name = "pending" LIMIT 1');
// // //         if (approvalRows.length > 0) approval_status_id = approvalRows[0].status_id;

// // //         await connection.execute(
// // //           `INSERT INTO volunteer_profiles (user_id, joined_at, availability_status_id, approval_status_id)
// // //            VALUES (?, NOW(), ?, ?)`,
// // //           [userId, availability_status_id, approval_status_id]
// // //         );
// // //       } catch (err) {
// // //         console.log('Volunteer profile insert failed, continuing...', err.message);
// // //       }
// // //     }

// // //     await connection.commit();
// // //     connection.release();

// // //     // JWT
// // //     const token = jwt.sign({ user_id: userId, role_id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// // //     res.status(201).json({
// // //       success: true,
// // //       message: isVolunteer ? 'Volunteer registered! Awaiting approval.' : 'User registered!',
// // //       token,
// // //       user: { user_id: userId, username, email, phone, role_id, is_volunteer: !!isVolunteer }
// // //     });

// // //   } catch (err) {
// // //     console.error(err);
// // //     res.status(500).json({ success: false, message: 'Server error' });
// // //   }
// // // });

// // // // ---------------------------
// // // // POST /api/auth/login
// // // // ---------------------------
// // // router.post('/login', async (req, res) => {
// // //   const { email, password } = req.body;
// // //   if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });

// // //   try {
// // //     const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
// // //     if (rows.length === 0) return res.status(401).json({ success: false, message: 'Invalid email or password' });

// // //     const user = rows[0];
// // //     const isMatch = await bcrypt.compare(password, user.password_hash);
// // //     if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid email or password' });

// // //     // Get volunteer data if user is volunteer
// // //     let volunteerData = null;
// // //     if (user.role_id === 2) {
// // //       const [volRows] = await pool.execute(
// // //         `SELECT joined_at, approval_status_id 
// // //          FROM volunteer_profiles WHERE user_id = ?`,
// // //         [user.user_id]
// // //       );
// // //       if (volRows.length > 0) volunteerData = volRows[0];
// // //     }

// // //     // JWT
// // //     const token = jwt.sign({ user_id: user.user_id, role_id: user.role_id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// // //     const userResponse = {
// // //       user_id: user.user_id,
// // //       username: user.username,
// // //       email: user.email,
// // //       phone: user.phone,
// // //       role_id: user.role_id,
// // //       created_at: user.created_at,
// // //       volunteer_joined_at: volunteerData?.joined_at ?? null,
// // //       volunteer_approval_status_id: volunteerData?.approval_status_id ?? null
// // //     };

// // //     res.json({ success: true, message: 'Login successful', token, user: userResponse });

// // //   } catch (err) {
// // //     console.error('Login error:', err);
// // //     res.status(500).json({ success: false, message: 'Server error' });
// // //   }
// // // });

// // // // ---------------------------
// // // // GET /api/auth/check
// // // // ---------------------------
// // // router.get('/check', async (req, res) => {
// // //   const token = req.headers.authorization?.split(' ')[1];
// // //   if (!token) return res.status(401).json({ success: false, message: 'No token' });

// // //   try {
// // //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// // //     const [rows] = await pool.execute('SELECT user_id, username, email, phone, role_id, created_at FROM users WHERE user_id = ?', [decoded.user_id]);
// // //     if (rows.length === 0) return res.status(401).json({ success: false, message: 'User not found' });

// // //     res.json({ success: true, user: rows[0] });
// // //   } catch (err) {
// // //     console.error(err);
// // //     res.status(401).json({ success: false, message: 'Invalid token' });
// // //   }
// // // });

// // // module.exports = router;


// // const express = require('express');
// // const bcrypt = require('bcrypt');
// // const jwt = require('jsonwebtoken');
// // const mysql = require('mysql2/promise');
// // require('dotenv').config();

// // const router = express.Router();

// // // MySQL pool
// // const pool = mysql.createPool({
// //   host: process.env.DB_HOST,
// //   user: process.env.DB_USER,
// //   password: process.env.DB_PASSWORD,
// //   database: process.env.DB_NAME,
// // });

// // // ---------------------------
// // // POST /api/auth/register
// // // ---------------------------
// // router.post('/register', async (req, res) => {
// //   const { username, email, password, phone, isVolunteer } = req.body;

// //   // Validation
// //   if (!username || !email || !password) {
// //     return res.status(400).json({ 
// //       success: false,
// //       message: 'Username, email, and password are required' 
// //     });
// //   }

// //   if (username.length < 3) return res.status(400).json({ success: false, message: 'Username must be at least 3 characters' });
// //   if (password.length < 6) return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });

// //   // Email validation
// //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //   if (!emailRegex.test(email)) return res.status(400).json({ success: false, message: 'Invalid email address' });

// //   // Phone validation (optional)
// //   let formattedPhone = null;
// //   if (phone && phone.trim() !== '') {
// //     const cleanedPhone = phone.replace(/[\s\-+]/g, '');
// //     const nepaliPhoneRegex = /^9[78]\d{8}$/;
// //     if (!nepaliPhoneRegex.test(cleanedPhone)) {
// //       return res.status(400).json({ success: false, message: 'Invalid Nepali phone number' });
// //     }
// //     formattedPhone = cleanedPhone;
// //   }

// //   try {
// //     const connection = await pool.getConnection();
// //     await connection.beginTransaction();

// //     // Check duplicates
// //     const [existingUsers] = await connection.execute(
// //       'SELECT * FROM users WHERE email = ? OR username = ? OR phone = ?',
// //       [email, username, formattedPhone]
// //     );

// //     if (existingUsers.length > 0) {
// //       await connection.rollback();
// //       connection.release();
// //       return res.status(400).json({ success: false, message: 'Email, username, or phone already exists' });
// //     }

// //     // Hash password
// //     const passwordHash = await bcrypt.hash(password, 10);

// //     // Role
// //     const role_id = isVolunteer ? 2 : 1;

// //     // Insert user
// //     const [userResult] = await connection.execute(
// //       `INSERT INTO users (username, email, phone, password_hash, role_id, created_at)
// //        VALUES (?, ?, ?, ?, ?, NOW())`,
// //       [username, email, formattedPhone, passwordHash, role_id]
// //     );

// //     const userId = userResult.insertId;

// //     // If volunteer, insert into volunteer_profiles
// //     if (isVolunteer) {
// //       let availability_status_id = 1;
// //       let approval_status_id = 1;

// //       try {
// //         const [availRows] = await connection.execute('SELECT status_id FROM availability_statuses WHERE status_name = "available" LIMIT 1');
// //         if (availRows.length > 0) availability_status_id = availRows[0].status_id;

// //         const [approvalRows] = await connection.execute('SELECT status_id FROM volunteer_approval_statuses WHERE status_name = "pending" LIMIT 1');
// //         if (approvalRows.length > 0) approval_status_id = approvalRows[0].status_id;

// //         await connection.execute(
// //           `INSERT INTO volunteer_profiles (user_id, joined_at, availability_status_id, approval_status_id)
// //            VALUES (?, NOW(), ?, ?)`,
// //           [userId, availability_status_id, approval_status_id]
// //         );
// //       } catch (err) {
// //         console.log('Volunteer profile insert failed, continuing...', err.message);
// //       }
// //     }

// //     await connection.commit();
// //     connection.release();

// //     // Get user with role name for response
// //     const [newUserRows] = await pool.execute(`
// //       SELECT u.*, ur.role_name 
// //       FROM users u 
// //       LEFT JOIN user_roles ur ON u.role_id = ur.role_id 
// //       WHERE u.user_id = ?
// //     `, [userId]);

// //     const newUser = newUserRows[0];

// //     // Get volunteer data if volunteer
// //     let volunteerData = null;
// //     if (role_id === 2) {
// //       const [volRows] = await pool.execute(
// //         `SELECT 
// //           vp.joined_at,
// //           vp.approval_status_id,
// //           vas.status_name as volunteer_status,
// //           vp.badges
// //          FROM volunteer_profiles vp
// //          LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
// //          WHERE vp.user_id = ?`,
// //         [userId]
// //       );
// //       if (volRows.length > 0) {
// //         volunteerData = volRows[0];
// //       }
// //     }

// //     // JWT
// //     const token = jwt.sign({ 
// //       user_id: userId, 
// //       role_id: role_id 
// //     }, process.env.JWT_SECRET, { expiresIn: '7d' });

// //     const userResponse = {
// //       user_id: userId,
// //       username: newUser.username,
// //       email: newUser.email,
// //       phone: newUser.phone,
// //       role_id: newUser.role_id,
// //       role_name: newUser.role_name,
// //       created_at: newUser.created_at,
// //       volunteer: role_id === 2 ? {
// //         approval_status_id: volunteerData?.approval_status_id || 1,
// //         status: volunteerData?.volunteer_status || 'pending',
// //         badges: volunteerData?.badges ? JSON.parse(volunteerData.badges) : [],
// //         volunteer_since: volunteerData?.joined_at || null
// //       } : null
// //     };

// //     res.status(201).json({
// //       success: true,
// //       message: isVolunteer ? 'Volunteer registered! Awaiting approval.' : 'User registered!',
// //       token,
// //       user: userResponse
// //     });

// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ success: false, message: 'Server error' });
// //   }
// // });

// // // ---------------------------
// // // POST /api/auth/login - FIXED
// // // ---------------------------
// // router.post('/login', async (req, res) => {
// //   const { email, password } = req.body;
// //   if (!email || !password) {
// //     return res.status(400).json({ 
// //       success: false, 
// //       message: 'Email and password required' 
// //     });
// //   }

// //   try {
// //     // Get user with role name
// //     const [rows] = await pool.execute(`
// //       SELECT 
// //         u.*,
// //         ur.role_name
// //       FROM users u
// //       LEFT JOIN user_roles ur ON u.role_id = ur.role_id
// //       WHERE u.email = ? AND u.is_deleted = 0
// //     `, [email]);
    
// //     if (rows.length === 0) {
// //       return res.status(401).json({ 
// //         success: false, 
// //         message: 'Invalid email or password' 
// //       });
// //     }

// //     const user = rows[0];
// //     const isMatch = await bcrypt.compare(password, user.password_hash);
// //     if (!isMatch) {
// //       return res.status(401).json({ 
// //         success: false, 
// //         message: 'Invalid email or password' 
// //       });
// //     }

// //     // Get volunteer data if user is volunteer
// //     let volunteerData = null;
// //     if (user.role_id === 2) {
// //       const [volRows] = await pool.execute(
// //         `SELECT 
// //           vp.joined_at,
// //           vp.approval_status_id,
// //           vas.status_name as volunteer_status,
// //           vp.badges
// //          FROM volunteer_profiles vp
// //          LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
// //          WHERE vp.user_id = ?`,
// //         [user.user_id]
// //       );
// //       if (volRows.length > 0) {
// //         volunteerData = volRows[0];
// //       }
// //     }

// //     // JWT
// //     const token = jwt.sign({ 
// //       user_id: user.user_id, 
// //       role_id: user.role_id 
// //     }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });

// //     const userResponse = {
// //       user_id: user.user_id,
// //       username: user.username,
// //       email: user.email,
// //       phone: user.phone,
// //       role_id: user.role_id,
// //       role_name: user.role_name,
// //       created_at: user.created_at,
// //       volunteer: user.role_id === 2 ? {
// //         approval_status_id: volunteerData?.approval_status_id || 1,
// //         status: volunteerData?.volunteer_status || 'pending',
// //         badges: volunteerData?.badges ? JSON.parse(volunteerData.badges) : [],
// //         volunteer_since: volunteerData?.joined_at || null
// //       } : null
// //     };

// //     console.log('Login successful - User:', {
// //       id: userResponse.user_id,
// //       role: userResponse.role_name,
// //       volunteer_status: userResponse.volunteer?.status || 'N/A'
// //     });

// //     res.json({ 
// //       success: true, 
// //       message: 'Login successful', 
// //       token, 
// //       user: userResponse 
// //     });

// //   } catch (err) {
// //     console.error('Login error:', err);
// //     res.status(500).json({ 
// //       success: false, 
// //       message: 'Server error',
// //       error: process.env.NODE_ENV === 'development' ? err.message : undefined
// //     });
// //   }
// // });

// // // ---------------------------
// // // GET /api/auth/check - FIXED
// // // ---------------------------
// // router.get('/check', async (req, res) => {
// //   const token = req.headers.authorization?.split(' ')[1];
// //   if (!token) {
// //     return res.status(401).json({ 
// //       success: false, 
// //       message: 'No token provided' 
// //     });
// //   }

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
// //     const [rows] = await pool.execute(`
// //       SELECT 
// //         u.user_id,
// //         u.username,
// //         u.email,
// //         u.phone,
// //         u.role_id,
// //         u.created_at,
// //         ur.role_name
// //       FROM users u
// //       LEFT JOIN user_roles ur ON u.role_id = ur.role_id
// //       WHERE u.user_id = ? AND u.is_deleted = 0
// //     `, [decoded.user_id]);
    
// //     if (rows.length === 0) {
// //       return res.status(401).json({ 
// //         success: false, 
// //         message: 'User not found' 
// //       });
// //     }

// //     const user = rows[0];
    
// //     // Get volunteer data if user is volunteer
// //     let volunteerData = null;
// //     if (user.role_id === 2) {
// //       const [volRows] = await pool.execute(
// //         `SELECT 
// //           vp.joined_at,
// //           vp.approval_status_id,
// //           vas.status_name as volunteer_status,
// //           vp.badges
// //          FROM volunteer_profiles vp
// //          LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
// //          WHERE vp.user_id = ?`,
// //         [user.user_id]
// //       );
// //       if (volRows.length > 0) {
// //         volunteerData = volRows[0];
// //       }
// //     }

// //     const userResponse = {
// //       user_id: user.user_id,
// //       username: user.username,
// //       email: user.email,
// //       phone: user.phone,
// //       role_id: user.role_id,
// //       role_name: user.role_name,
// //       created_at: user.created_at,
// //       volunteer: user.role_id === 2 ? {
// //         approval_status_id: volunteerData?.approval_status_id || 1,
// //         status: volunteerData?.volunteer_status || 'pending',
// //         badges: volunteerData?.badges ? JSON.parse(volunteerData.badges) : [],
// //         volunteer_since: volunteerData?.joined_at || null
// //       } : null
// //     };

// //     res.json({ 
// //       success: true, 
// //       user: userResponse 
// //     });
    
// //   } catch (err) {
// //     console.error('Check auth error:', err);
// //     res.status(401).json({ 
// //       success: false, 
// //       message: 'Invalid token' 
// //     });
// //   }
// // });

// // // ---------------------------
// // // GET /api/auth/me - NEW ENDPOINT
// // // ---------------------------
// // router.get('/me', async (req, res) => {
// //   const token = req.headers.authorization?.split(' ')[1];
// //   if (!token) {
// //     return res.status(401).json({ 
// //       success: false, 
// //       message: 'No token provided' 
// //     });
// //   }

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
// //     const [rows] = await pool.execute(`
// //       SELECT 
// //         u.user_id,
// //         u.username,
// //         u.email,
// //         u.phone,
// //         u.role_id,
// //         u.created_at,
// //         ur.role_name
// //       FROM users u
// //       LEFT JOIN user_roles ur ON u.role_id = ur.role_id
// //       WHERE u.user_id = ? AND u.is_deleted = 0
// //     `, [decoded.user_id]);
    
// //     if (rows.length === 0) {
// //       return res.status(401).json({ 
// //         success: false, 
// //         message: 'User not found' 
// //       });
// //     }

// //     const user = rows[0];
    
// //     // Get volunteer data if user is volunteer
// //     let volunteerData = null;
// //     if (user.role_id === 2) {
// //       const [volRows] = await pool.execute(
// //         `SELECT 
// //           vp.joined_at,
// //           vp.approval_status_id,
// //           vas.status_name as volunteer_status,
// //           vp.badges
// //          FROM volunteer_profiles vp
// //          LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
// //          WHERE vp.user_id = ?`,
// //         [user.user_id]
// //       );
// //       if (volRows.length > 0) {
// //         volunteerData = volRows[0];
// //       }
// //     }

// //     const userResponse = {
// //       user_id: user.user_id,
// //       username: user.username,
// //       email: user.email,
// //       phone: user.phone,
// //       role_id: user.role_id,
// //       role_name: user.role_name,
// //       created_at: user.created_at,
// //       volunteer: user.role_id === 2 ? {
// //         approval_status_id: volunteerData?.approval_status_id || 1,
// //         status: volunteerData?.volunteer_status || 'pending',
// //         badges: volunteerData?.badges ? JSON.parse(volunteerData.badges) : [],
// //         volunteer_since: volunteerData?.joined_at || null
// //       } : null
// //     };

// //     res.json({ 
// //       success: true, 
// //       user: userResponse 
// //     });
    
// //   } catch (err) {
// //     console.error('Get /me error:', err);
// //     res.status(401).json({ 
// //       success: false, 
// //       message: 'Invalid token' 
// //     });
// //   }
// // });

// // // ---------------------------
// // // GET /api/auth/check-status/:userId - DEBUG ENDPOINT
// // // ---------------------------
// // router.get('/check-status/:userId', async (req, res) => {
// //   try {
// //     const userId = req.params.userId;
    
// //     const [rows] = await pool.execute(`
// //       SELECT 
// //         u.user_id,
// //         u.username,
// //         u.email,
// //         u.role_id,
// //         ur.role_name,
// //         vp.approval_status_id,
// //         vas.status_name as volunteer_status
// //       FROM users u
// //       LEFT JOIN user_roles ur ON u.role_id = ur.role_id
// //       LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
// //       LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
// //       WHERE u.user_id = ? AND u.is_deleted = 0
// //     `, [userId]);
    
// //     if (rows.length === 0) {
// //       return res.json({ 
// //         success: false, 
// //         message: 'User not found' 
// //       });
// //     }

// //     res.json({ 
// //       success: true, 
// //       data: rows[0] 
// //     });
    
// //   } catch (err) {
// //     console.error('Check status error:', err);
// //     res.status(500).json({ 
// //       success: false, 
// //       message: 'Server error',
// //       error: err.message 
// //     });
// //   }
// // });

// // module.exports = router;


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
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// console.log('✅ Auth routes initialized');

// // ---------------------------
// // POST /api/auth/register - COMPLETE WITH ALL VOLUNTEER FIELDS
// // ---------------------------
// router.post('/register', async (req, res) => {
//   const { 
//     username, 
//     email, 
//     password, 
//     phone, 
//     isVolunteer,
//     has_car,
//     can_foster,
//     animal_handling,
//     city 
//   } = req.body;

//   console.log('📝 Registration request received:', {
//     username,
//     email,
//     phone,
//     isVolunteer,
//     has_car,
//     can_foster,
//     animal_handling,
//     city
//   });

//   // Validation
//   if (!username || !email || !password) {
//     return res.status(400).json({ 
//       success: false,
//       message: 'Username, email, and password are required' 
//     });
//   }

//   if (username.length < 3) {
//     return res.status(400).json({ 
//       success: false, 
//       message: 'Username must be at least 3 characters' 
//     });
//   }
  
//   if (password.length < 6) {
//     return res.status(400).json({ 
//       success: false, 
//       message: 'Password must be at least 6 characters' 
//     });
//   }

//   // Email validation
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     return res.status(400).json({ 
//       success: false, 
//       message: 'Invalid email address' 
//     });
//   }

//   // Phone validation (required)
//   if (!phone || phone.trim() === '') {
//     return res.status(400).json({ 
//       success: false, 
//       message: 'Phone number is required' 
//     });
//   }

//   const cleanedPhone = phone.replace(/[\s\-+]/g, '');
//   const nepaliPhoneRegex = /^9[78]\d{8}$/;
//   if (!nepaliPhoneRegex.test(cleanedPhone)) {
//     return res.status(400).json({ 
//       success: false, 
//       message: 'Invalid Nepali phone number. Must be 10 digits starting with 98 or 97' 
//     });
//   }

//   // Validate volunteer fields if isVolunteer is true
//   if (isVolunteer) {
//     if (!city || city.trim() === '') {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'City is required for volunteers' 
//       });
//     }
//     if (!animal_handling || animal_handling.trim() === '') {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Animal handling experience is required for volunteers' 
//       });
//     }
//   }

//   const connection = await pool.getConnection();

//   try {
//     await connection.beginTransaction();

//     // Check duplicates
//     const [existingUsers] = await connection.execute(
//       'SELECT * FROM users WHERE email = ? OR username = ?',
//       [email, username]
//     );

//     if (existingUsers.length > 0) {
//       await connection.rollback();
//       connection.release();
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Email or username already exists' 
//       });
//     }

//     // Hash password
//     const passwordHash = await bcrypt.hash(password, 10);

//     // Role: 1 = user, 2 = volunteer, 3 = admin
//     const role_id = isVolunteer ? 2 : 1;

//     // Insert user
//     const [userResult] = await connection.execute(
//       `INSERT INTO users (username, email, phone, password_hash, role_id, created_at)
//        VALUES (?, ?, ?, ?, ?, NOW())`,
//       [username, email, cleanedPhone, passwordHash, role_id]
//     );

//     const userId = userResult.insertId;
//     console.log(`✅ User created with ID: ${userId}, Role: ${role_id}`);

//     // If volunteer, insert into volunteer_profiles with ALL fields
//     if (isVolunteer) {
//       // Default status IDs
//       const availability_status_id = 1; // 1 = available
//       const approval_status_id = 1; // 1 = pending

//       // Convert boolean to integer (1 or 0)
//       const hasCarInt = has_car ? 1 : 0;
//       const canFosterInt = can_foster ? 1 : 0;

//       console.log('📝 Creating volunteer profile with:', {
//         userId,
//         hasCarInt,
//         canFosterInt,
//         animal_handling,
//         city,
//         availability_status_id,
//         approval_status_id
//       });

//       // Insert volunteer profile with all fields
//       await connection.execute(
//         `INSERT INTO volunteer_profiles 
//          (user_id, joined_at, availability_status_id, approval_status_id, 
//           has_car, can_foster, animal_handling, city)
//          VALUES (?, NOW(), ?, ?, ?, ?, ?, ?)`,
//         [
//           userId, 
//           availability_status_id, 
//           approval_status_id,
//           hasCarInt,
//           canFosterInt,
//           animal_handling || 'dogs',
//           city || null
//         ]
//       );

//       console.log('✅ Volunteer profile created successfully');
//     }

//     await connection.commit();

//     // Fetch the created user with all related data
//     const [newUserRows] = await connection.execute(`
//       SELECT 
//         u.user_id,
//         u.username,
//         u.email,
//         u.phone,
//         u.role_id,
//         u.created_at,
//         ur.role_name
//       FROM users u
//       LEFT JOIN user_roles ur ON u.role_id = ur.role_id
//       WHERE u.user_id = ?
//     `, [userId]);

//     const newUser = newUserRows[0];

//     // Fetch volunteer data if volunteer
//     let volunteerData = null;
//     if (role_id === 2) {
//       const [volRows] = await connection.execute(
//         `SELECT 
//           vp.joined_at,
//           vp.approval_status_id,
//           vas.status_name as volunteer_status,
//           vp.badges,
//           vp.has_car,
//           vp.can_foster,
//           vp.animal_handling,
//           vp.city,
//           vp.availability_status_id,
//           a.status_name as availability_status
//          FROM volunteer_profiles vp
//          LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
//          LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
//          WHERE vp.user_id = ?`,
//         [userId]
//       );
      
//       if (volRows.length > 0) {
//         volunteerData = volRows[0];
//       }
//     }

//     // JWT
//     const token = jwt.sign({ 
//       user_id: userId, 
//       role_id: role_id 
//     }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });

//     // Build complete user response
//     const userResponse = {
//       user_id: userId,
//       username: newUser.username,
//       email: newUser.email,
//       phone: newUser.phone,
//       role_id: newUser.role_id,
//       role_name: newUser.role_name,
//       created_at: newUser.created_at,
//       volunteer: role_id === 2 ? {
//         approval_status_id: volunteerData?.approval_status_id || 1,
//         status: volunteerData?.volunteer_status || 'pending',
//         badges: volunteerData?.badges ? JSON.parse(volunteerData.badges) : [],
//         volunteer_since: volunteerData?.joined_at || null,
//         has_car: volunteerData?.has_car === 1,
//         can_foster: volunteerData?.can_foster === 1,
//         animal_handling: volunteerData?.animal_handling || '',
//         city: volunteerData?.city || null,
//         availability_status_id: volunteerData?.availability_status_id || 1,
//         availability_status: volunteerData?.availability_status || 'available',
//         total_tasks: 0
//       } : null
//     };

//     console.log('✅ Registration successful:', {
//       userId,
//       role: userResponse.role_name,
//       isVolunteer,
//       volunteerData: volunteerData ? {
//         has_car: volunteerData.has_car,
//         can_foster: volunteerData.can_foster,
//         animal_handling: volunteerData.animal_handling,
//         city: volunteerData.city
//       } : null
//     });

//     res.status(201).json({
//       success: true,
//       message: isVolunteer ? 'Volunteer registered! Awaiting approval.' : 'User registered!',
//       token,
//       user: userResponse
//     });

//   } catch (err) {
//     await connection.rollback();
//     console.error('❌ Registration error:', err);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Server error: ' + err.message 
//     });
//   } finally {
//     connection.release();
//   }
// });

// // ---------------------------
// // POST /api/auth/login - COMPLETE WITH ALL VOLUNTEER FIELDS
// // ---------------------------
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
  
//   if (!email || !password) {
//     return res.status(400).json({ 
//       success: false, 
//       message: 'Email and password required' 
//     });
//   }

//   try {
//     // Get user with role name
//     const [rows] = await pool.execute(`
//       SELECT 
//         u.user_id,
//         u.username,
//         u.email,
//         u.phone,
//         u.password_hash,
//         u.role_id,
//         u.created_at,
//         ur.role_name
//       FROM users u
//       LEFT JOIN user_roles ur ON u.role_id = ur.role_id
//       WHERE u.email = ? AND u.is_deleted = 0
//     `, [email]);
    
//     if (rows.length === 0) {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'Invalid email or password' 
//       });
//     }

//     const user = rows[0];
//     const isMatch = await bcrypt.compare(password, user.password_hash);
    
//     if (!isMatch) {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'Invalid email or password' 
//       });
//     }

//     // Get volunteer data if user is volunteer - WITH ALL FIELDS
//     let volunteerData = null;
//     if (user.role_id === 2) {
//       const [volRows] = await pool.execute(
//         `SELECT 
//           vp.joined_at,
//           vp.approval_status_id,
//           vas.status_name as volunteer_status,
//           vp.badges,
//           vp.has_car,
//           vp.can_foster,
//           vp.animal_handling,
//           vp.city,
//           vp.availability_status_id,
//           a.status_name as availability_status,
//           (SELECT COUNT(*) FROM tasks WHERE assigned_to_user_id = ? AND status_id = 3 AND is_deleted = 0) AS total_tasks
//          FROM volunteer_profiles vp
//          LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
//          LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
//          WHERE vp.user_id = ?`,
//         [user.user_id, user.user_id]
//       );
      
//       if (volRows.length > 0) {
//         volunteerData = volRows[0];
//       } else {
//         // Create volunteer profile if it doesn't exist (for backward compatibility)
//         await pool.execute(
//           `INSERT INTO volunteer_profiles (user_id, joined_at, approval_status_id, availability_status_id, has_car, can_foster, animal_handling, city)
//            VALUES (?, NOW(), 1, 1, 0, 0, 'dogs', NULL)`,
//           [user.user_id]
//         );
        
//         const [newVolRows] = await pool.execute(
//           `SELECT 
//             vp.joined_at,
//             vp.approval_status_id,
//             'pending' as volunteer_status,
//             vp.badges,
//             vp.has_car,
//             vp.can_foster,
//             vp.animal_handling,
//             vp.city,
//             vp.availability_status_id,
//             'available' as availability_status,
//             0 as total_tasks
//            FROM volunteer_profiles vp
//            WHERE vp.user_id = ?`,
//           [user.user_id]
//         );
        
//         volunteerData = newVolRows[0];
//       }
//     }

//     // JWT
//     const token = jwt.sign({ 
//       user_id: user.user_id, 
//       role_id: user.role_id 
//     }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });

//     // Build complete user response
//     const userResponse = {
//       user_id: user.user_id,
//       username: user.username,
//       email: user.email,
//       phone: user.phone,
//       role_id: user.role_id,
//       role_name: user.role_name,
//       created_at: user.created_at,
//       volunteer: user.role_id === 2 ? {
//         approval_status_id: volunteerData?.approval_status_id || 1,
//         status: volunteerData?.volunteer_status || 'pending',
//         badges: volunteerData?.badges ? JSON.parse(volunteerData.badges) : [],
//         volunteer_since: volunteerData?.joined_at || null,
//         has_car: volunteerData?.has_car === 1,
//         can_foster: volunteerData?.can_foster === 1,
//         animal_handling: volunteerData?.animal_handling || '',
//         city: volunteerData?.city || null,
//         availability_status_id: volunteerData?.availability_status_id || 1,
//         availability_status: volunteerData?.availability_status || 'available',
//         total_tasks: volunteerData?.total_tasks || 0
//       } : null
//     };

//     console.log('✅ Login successful:', {
//       id: userResponse.user_id,
//       role: userResponse.role_name,
//       volunteer_status: userResponse.volunteer?.status,
//       volunteer_data: userResponse.volunteer ? {
//         has_car: userResponse.volunteer.has_car,
//         can_foster: userResponse.volunteer.can_foster,
//         animal_handling: userResponse.volunteer.animal_handling,
//         city: userResponse.volunteer.city
//       } : null
//     });

//     res.json({ 
//       success: true, 
//       message: 'Login successful', 
//       token, 
//       user: userResponse 
//     });

//   } catch (err) {
//     console.error('❌ Login error:', err);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Server error',
//       error: process.env.NODE_ENV === 'development' ? err.message : undefined
//     });
//   }
// });

// // ---------------------------
// // GET /api/auth/check - WITH ALL VOLUNTEER FIELDS
// // ---------------------------
// router.get('/check', async (req, res) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) {
//     return res.status(401).json({ 
//       success: false, 
//       message: 'No token provided' 
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
//     const [rows] = await pool.execute(`
//       SELECT 
//         u.user_id,
//         u.username,
//         u.email,
//         u.phone,
//         u.role_id,
//         u.created_at,
//         ur.role_name
//       FROM users u
//       LEFT JOIN user_roles ur ON u.role_id = ur.role_id
//       WHERE u.user_id = ? AND u.is_deleted = 0
//     `, [decoded.user_id]);
    
//     if (rows.length === 0) {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'User not found' 
//       });
//     }

//     const user = rows[0];
    
//     // Get volunteer data if user is volunteer
//     let volunteerData = null;
//     if (user.role_id === 2) {
//       const [volRows] = await pool.execute(
//         `SELECT 
//           vp.joined_at,
//           vp.approval_status_id,
//           vas.status_name as volunteer_status,
//           vp.badges,
//           vp.has_car,
//           vp.can_foster,
//           vp.animal_handling,
//           vp.city,
//           vp.availability_status_id,
//           a.status_name as availability_status,
//           (SELECT COUNT(*) FROM tasks WHERE assigned_to_user_id = ? AND status_id = 3 AND is_deleted = 0) AS total_tasks
//          FROM volunteer_profiles vp
//          LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
//          LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
//          WHERE vp.user_id = ?`,
//         [user.user_id, user.user_id]
//       );
      
//       if (volRows.length > 0) {
//         volunteerData = volRows[0];
//       }
//     }

//     const userResponse = {
//       user_id: user.user_id,
//       username: user.username,
//       email: user.email,
//       phone: user.phone,
//       role_id: user.role_id,
//       role_name: user.role_name,
//       created_at: user.created_at,
//       volunteer: user.role_id === 2 ? {
//         approval_status_id: volunteerData?.approval_status_id || 1,
//         status: volunteerData?.volunteer_status || 'pending',
//         badges: volunteerData?.badges ? JSON.parse(volunteerData.badges) : [],
//         volunteer_since: volunteerData?.joined_at || null,
//         has_car: volunteerData?.has_car === 1,
//         can_foster: volunteerData?.can_foster === 1,
//         animal_handling: volunteerData?.animal_handling || '',
//         city: volunteerData?.city || null,
//         availability_status_id: volunteerData?.availability_status_id || 1,
//         availability_status: volunteerData?.availability_status || 'available',
//         total_tasks: volunteerData?.total_tasks || 0
//       } : null
//     };

//     res.json({ 
//       success: true, 
//       user: userResponse 
//     });
    
//   } catch (err) {
//     console.error('❌ Check auth error:', err);
//     res.status(401).json({ 
//       success: false, 
//       message: 'Invalid token' 
//     });
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
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log('Auth routes initialized');

// ---------------------------
// POST /api/auth/register - COMPLETE WITH ALL VOLUNTEER FIELDS
// ---------------------------
router.post('/register', async (req, res) => {
  const { 
    username, 
    email, 
    password, 
    phone, 
    isVolunteer,
    has_car,
    can_foster,
    animal_handling,
    city 
  } = req.body;

  console.log('Registration request received:', {
    username,
    email,
    phone,
    isVolunteer,
    has_car,
    can_foster,
    animal_handling,
    city
  });

  // Validation
  if (!username || !email || !password) {
    return res.status(400).json({ 
      success: false,
      message: 'Username, email, and password are required' 
    });
  }

  if (username.length < 3) {
    return res.status(400).json({ 
      success: false, 
      message: 'Username must be at least 3 characters' 
    });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ 
      success: false, 
      message: 'Password must be at least 6 characters' 
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid email address' 
    });
  }

  // Phone validation (required)
  if (!phone || phone.trim() === '') {
    return res.status(400).json({ 
      success: false, 
      message: 'Phone number is required' 
    });
  }

  const cleanedPhone = phone.replace(/[\s\-+]/g, '');
  const nepaliPhoneRegex = /^9[78]\d{8}$/;
  if (!nepaliPhoneRegex.test(cleanedPhone)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid Nepali phone number. Must be 10 digits starting with 98 or 97' 
    });
  }

  // Validate volunteer fields if isVolunteer is true
  if (isVolunteer) {
    if (!city || city.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: 'City is required for volunteers' 
      });
    }
    if (!animal_handling || animal_handling.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: 'Animal handling experience is required for volunteers' 
      });
    }
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Check duplicates
    const [existingUsers] = await connection.execute(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUsers.length > 0) {
      await connection.rollback();
      connection.release();
      return res.status(400).json({ 
        success: false, 
        message: 'Email or username already exists' 
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Role: 1 = user, 2 = volunteer, 3 = admin
    const role_id = isVolunteer ? 2 : 1;

    // Insert user
    const [userResult] = await connection.execute(
      `INSERT INTO users (username, email, phone, password_hash, role_id, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [username, email, cleanedPhone, passwordHash, role_id]
    );

    const userId = userResult.insertId;
    console.log(`User created with ID: ${userId}, Role: ${role_id}`);

    // If volunteer, insert into volunteer_profiles with ALL fields
    if (isVolunteer) {
      // Default status IDs
      const availability_status_id = 1; // 1 = available
      const approval_status_id = 1; // 1 = pending

      // Convert boolean to integer (1 or 0)
      const hasCarInt = has_car ? 1 : 0;
      const canFosterInt = can_foster ? 1 : 0;

      console.log('Creating volunteer profile with:', {
        userId,
        hasCarInt,
        canFosterInt,
        animal_handling,
        city,
        availability_status_id,
        approval_status_id
      });

      // Insert volunteer profile with all fields
      await connection.execute(
        `INSERT INTO volunteer_profiles 
         (user_id, joined_at, availability_status_id, approval_status_id, 
          has_car, can_foster, animal_handling, city)
         VALUES (?, NOW(), ?, ?, ?, ?, ?, ?)`,
        [
          userId, 
          availability_status_id, 
          approval_status_id,
          hasCarInt,
          canFosterInt,
          animal_handling || 'dogs',
          city || null
        ]
      );

      console.log('Volunteer profile created successfully');
    }

    await connection.commit();

    // Fetch the created user with all related data
    const [newUserRows] = await connection.execute(`
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
      WHERE u.user_id = ?
    `, [userId]);

    const newUser = newUserRows[0];

    // Fetch volunteer data if volunteer
    let volunteerData = null;
    if (role_id === 2) {
      const [volRows] = await connection.execute(
        `SELECT 
          vp.joined_at,
          vp.approval_status_id,
          vas.status_name as volunteer_status,
          vp.badges,
          vp.has_car,
          vp.can_foster,
          vp.animal_handling,
          vp.city,
          vp.availability_status_id,
          a.status_name as availability_status
         FROM volunteer_profiles vp
         LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
         LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
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
    }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });

    // Build complete user response
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
        volunteer_since: volunteerData?.joined_at || null,
        has_car: volunteerData?.has_car === 1,
        can_foster: volunteerData?.can_foster === 1,
        animal_handling: volunteerData?.animal_handling || '',
        city: volunteerData?.city || null,
        availability_status_id: volunteerData?.availability_status_id || 1,
        availability_status: volunteerData?.availability_status || 'available',
        total_tasks: 0
      } : null
    };

    console.log('Registration successful:', {
      userId,
      role: userResponse.role_name,
      isVolunteer,
      volunteerData: volunteerData ? {
        has_car: volunteerData.has_car,
        can_foster: volunteerData.can_foster,
        animal_handling: volunteerData.animal_handling,
        city: volunteerData.city
      } : null
    });

    res.status(201).json({
      success: true,
      message: isVolunteer ? 'Volunteer registered! Awaiting approval.' : 'User registered!',
      token,
      user: userResponse
    });

  } catch (err) {
    await connection.rollback();
    console.error('Registration error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Server error: ' + err.message 
    });
  } finally {
    connection.release();
  }
});

// ---------------------------
// POST /api/auth/login - COMPLETE WITH ALL VOLUNTEER FIELDS
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
        u.user_id,
        u.username,
        u.email,
        u.phone,
        u.password_hash,
        u.role_id,
        u.created_at,
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

    // Get volunteer data if user is volunteer - WITH ALL FIELDS
    let volunteerData = null;
    if (user.role_id === 2) {
      const [volRows] = await pool.execute(
        `SELECT 
          vp.joined_at,
          vp.approval_status_id,
          vas.status_name as volunteer_status,
          vp.badges,
          vp.has_car,
          vp.can_foster,
          vp.animal_handling,
          vp.city,
          vp.availability_status_id,
          a.status_name as availability_status,
          (SELECT COUNT(*) FROM tasks WHERE assigned_to_user_id = ? AND status_id = 3 AND is_deleted = 0) AS total_tasks
         FROM volunteer_profiles vp
         LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
         LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
         WHERE vp.user_id = ?`,
        [user.user_id, user.user_id]
      );
      
      if (volRows.length > 0) {
        volunteerData = volRows[0];
      } else {
        // Create volunteer profile if it doesn't exist (for backward compatibility)
        await pool.execute(
          `INSERT INTO volunteer_profiles (user_id, joined_at, approval_status_id, availability_status_id, has_car, can_foster, animal_handling, city)
           VALUES (?, NOW(), 1, 1, 0, 0, 'dogs', NULL)`,
          [user.user_id]
        );
        
        const [newVolRows] = await pool.execute(
          `SELECT 
            vp.joined_at,
            vp.approval_status_id,
            'pending' as volunteer_status,
            vp.badges,
            vp.has_car,
            vp.can_foster,
            vp.animal_handling,
            vp.city,
            vp.availability_status_id,
            'available' as availability_status,
            0 as total_tasks
           FROM volunteer_profiles vp
           WHERE vp.user_id = ?`,
          [user.user_id]
        );
        
        volunteerData = newVolRows[0];
      }
    }

    // JWT
    const token = jwt.sign({ 
      user_id: user.user_id, 
      role_id: user.role_id 
    }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });

    // Build complete user response
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
        volunteer_since: volunteerData?.joined_at || null,
        has_car: volunteerData?.has_car === 1,
        can_foster: volunteerData?.can_foster === 1,
        animal_handling: volunteerData?.animal_handling || '',
        city: volunteerData?.city || null,
        availability_status_id: volunteerData?.availability_status_id || 1,
        availability_status: volunteerData?.availability_status || 'available',
        total_tasks: volunteerData?.total_tasks || 0
      } : null
    };

    console.log('Login successful:', {
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
// GET /api/auth/check - WITH ALL VOLUNTEER FIELDS
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
          vp.badges,
          vp.has_car,
          vp.can_foster,
          vp.animal_handling,
          vp.city,
          vp.availability_status_id,
          a.status_name as availability_status,
          (SELECT COUNT(*) FROM tasks WHERE assigned_to_user_id = ? AND status_id = 3 AND is_deleted = 0) AS total_tasks
         FROM volunteer_profiles vp
         LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
         LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
         WHERE vp.user_id = ?`,
        [user.user_id, user.user_id]
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
        volunteer_since: volunteerData?.joined_at || null,
        has_car: volunteerData?.has_car === 1,
        can_foster: volunteerData?.can_foster === 1,
        animal_handling: volunteerData?.animal_handling || '',
        city: volunteerData?.city || null,
        availability_status_id: volunteerData?.availability_status_id || 1,
        availability_status: volunteerData?.availability_status || 'available',
        total_tasks: volunteerData?.total_tasks || 0
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

// =====================================================
// FORGOT PASSWORD ENDPOINTS
// =====================================================

// Forgot password - request reset link
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email is required' 
    });
  }

  try {
    // Check if user exists
    const [users] = await pool.execute(
      'SELECT user_id, email, username FROM users WHERE email = ? AND is_deleted = 0',
      [email]
    );

    if (users.length === 0) {
      // For security, don't reveal that user doesn't exist
      return res.json({ 
        success: true, 
        message: 'If your email exists in our system, you will receive a reset link.' 
      });
    }

    const user = users[0];
    
    // Generate reset token (expires in 1 hour)
    const resetToken = jwt.sign(
      { 
        user_id: user.user_id, 
        email: user.email,
        purpose: 'password-reset' 
      },
      process.env.JWT_SECRET + '-reset', // Different secret for reset tokens
      { expiresIn: '1h' }
    );

    // Store token in database
    await pool.execute(
      'UPDATE users SET reset_token = ?, reset_token_expires = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE user_id = ?',
      [resetToken, user.user_id]
    );

    // In production, send actual email
    console.log('=================================');
    console.log('PASSWORD RESET LINK (DEVELOPMENT)');
    console.log(`http://localhost:3000/reset-password?token=${resetToken}`);
    console.log('=================================');

    // For development, we can return the token (remove in production)
    if (process.env.NODE_ENV === 'development') {
      return res.json({ 
        success: true, 
        message: 'Reset link generated (development mode)',
        resetToken,
        resetLink: `http://localhost:3000/reset-password?token=${resetToken}`
      });
    }

    res.json({ 
      success: true, 
      message: 'If your email exists in our system, you will receive a reset link.' 
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.' 
    });
  }
});

// Validate reset token
router.get('/validate-reset-token', async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.json({ valid: false });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET + '-reset');
    
    // Check if token exists in database and hasn't been used
    const [users] = await pool.execute(
      'SELECT user_id FROM users WHERE user_id = ? AND reset_token = ? AND reset_token_expires > NOW()',
      [decoded.user_id, token]
    );

    if (users.length === 0) {
      return res.json({ valid: false });
    }

    res.json({ valid: true });

  } catch (error) {
    console.error('Validate token error:', error);
    res.json({ valid: false });
  }
});

// Reset password
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Token and password are required' 
    });
  }

  if (password.length < 6) {
    return res.status(400).json({ 
      success: false, 
      message: 'Password must be at least 6 characters' 
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET + '-reset');

    // Check if token exists and is valid
    const [users] = await pool.execute(
      'SELECT user_id FROM users WHERE user_id = ? AND reset_token = ? AND reset_token_expires > NOW()',
      [decoded.user_id, token]
    );

    if (users.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid or expired token' 
      });
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(password, 10);

    // Update password and clear reset token
    await pool.execute(
      'UPDATE users SET password_hash = ?, reset_token = NULL, reset_token_expires = NULL WHERE user_id = ?',
      [passwordHash, decoded.user_id]
    );

    res.json({ 
      success: true, 
      message: 'Password reset successful' 
    });

  } catch (error) {
    console.error('Reset password error:', error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Reset link has expired' 
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid reset link' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again.' 
    });
  }
});

module.exports = router;