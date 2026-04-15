const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');
require('dotenv').config();

const router = express.Router();

const pool = require('../config/db');


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


// Email transporter (Gmail)

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// DEBUG: Check email config on server start
console.log('==== EMAIL DEBUG ====');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? `SET (${process.env.EMAIL_PASS.length} chars)` : '❌ MISSING');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('=====================');


// Wildlife-themed reset email

const sendResetEmail = async (toEmail, resetLink, username) => {
  const mailOptions = {
    from: `"Animal Rescue System" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Password Reset Request – Animal Rescue System',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Password Reset</title>
</head>
<body style="margin:0;padding:40px 20px;background-color:#1a2a1a;font-family:Georgia,'Times New Roman',serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="
              background:linear-gradient(160deg,#0e2410 0%,#1c3d1c 50%,#0f2a0f 100%);
              border-radius:16px 16px 0 0;
              border:1px solid rgba(100,160,80,0.2);
              border-bottom:none;
              padding:0;
              overflow:hidden;
            ">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="height:4px;background:linear-gradient(90deg,transparent,rgba(120,200,70,0.4),transparent);"></td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding:32px 40px 0;">
                    <span style="
                      display:inline-block;
                      background:rgba(100,180,60,0.15);
                      border:1px solid rgba(120,200,70,0.35);
                      color:#a8d878;
                      font-family:Georgia,serif;
                      font-size:11px;
                      font-style:italic;
                      letter-spacing:2px;
                      padding:5px 16px;
                      border-radius:20px;
                      text-transform:uppercase;
                    ">Wildlife Protection Initiative</span>
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding:16px 40px 4px;">
                    <div style="font-size:28px;font-weight:700;color:#d4eeaa;letter-spacing:0.5px;line-height:1.2;">
                      Animal Rescue <span style="color:#7dc853;">System</span>
                    </div>
                    <div style="color:rgba(180,220,130,0.6);font-size:12px;letter-spacing:3px;text-transform:uppercase;margin-top:6px;font-style:italic;">
                      Where every creature finds shelter
                    </div>
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding:10px 40px 0;color:#4a8a30;font-size:16px;letter-spacing:8px;">
                    &#8212; 🌿 &#8212;
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:20px 0 0;text-align:center;font-size:28px;letter-spacing:2px;opacity:0.5;">
                    🌲🌳🌲🌳🌲🌳🌲🌳🌲
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="
              background:#f7f4ee;
              padding:40px 48px 32px;
              border-left:1px solid rgba(100,160,80,0.2);
              border-right:1px solid rgba(100,160,80,0.2);
            ">
              <p style="font-size:22px;font-weight:700;color:#2c4a1e;margin:0 0 16px 0;font-family:Georgia,serif;">
                Hello, <span style="color:#4a8a30;">${username}</span> 👋
              </p>
              <p style="color:#4a5c3a;font-size:15px;line-height:1.8;margin:0 0 14px 0;font-family:Georgia,serif;">
                We received a request to reset your password for your
                <strong style="color:#2c4a1e;">Animal Rescue System</strong> account.
              </p>
              <p style="color:#4a5c3a;font-size:15px;line-height:1.8;margin:0 0 20px 0;font-family:Georgia,serif;">
                Click the button below to reset it.
              </p>
              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                <tr>
                  <td style="
                    background:rgba(74,138,48,0.08);
                    border-left:3px solid #6aaa3a;
                    padding:10px 16px;
                    border-radius:0 8px 8px 0;
                    font-size:14px;
                    color:#3a6a24;
                    font-style:italic;
                    font-family:Georgia,serif;
                  ">
                    🕐 &nbsp;This link expires in <strong>1 hour</strong> — like morning dew, it won't last long.
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 32px;">
                <tr>
                  <td align="center">
                    <a href="${resetLink}" style="
                      display:inline-block;
                      background:linear-gradient(135deg,#3a7020 0%,#5a9a30 50%,#4a8a28 100%);
                      color:#e8f5d0;
                      text-decoration:none;
                      font-family:Georgia,serif;
                      font-size:16px;
                      font-weight:700;
                      letter-spacing:1px;
                      padding:16px 48px;
                      border-radius:50px;
                      box-shadow:0 4px 24px rgba(60,120,20,0.4);
                    ">
                      🌿 &nbsp;Reset My Password&nbsp; 🌿
                    </a>
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                <tr>
                  <td style="
                    background:rgba(139,119,80,0.08);
                    border:1px solid rgba(139,119,80,0.2);
                    border-radius:10px;
                    padding:16px 20px;
                  ">
                    <p style="color:#7a6a50;font-size:13.5px;margin:0;font-style:italic;font-family:Georgia,serif;line-height:1.7;">
                      🦌 &nbsp;If you didn't request a password reset, you can safely ignore this email.
                      Your password will remain unchanged — your account is safe in the wild.
                    </p>
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-top:1px dashed rgba(100,140,60,0.3);padding-top:20px;">
                    <p style="font-size:12px;color:#8a9a7a;letter-spacing:1px;text-transform:uppercase;margin:0 0 8px 0;font-family:Georgia,serif;">
                      Or copy this link into your browser
                    </p>
                    <p style="
                      font-size:11.5px;
                      color:#5a8a3a;
                      word-break:break-all;
                      line-height:1.6;
                      font-family:'Courier New',Courier,monospace;
                      background:rgba(90,138,58,0.06);
                      padding:10px 14px;
                      border-radius:6px;
                      border:1px solid rgba(90,138,58,0.15);
                      margin:0;
                    ">
                      ${resetLink}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="
              background:#0e2410;
              border-radius:0 0 16px 16px;
              border:1px solid rgba(100,160,80,0.2);
              border-top:none;
              padding:24px 40px 28px;
              text-align:center;
            ">
              <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(120,200,70,0.3),transparent);margin-bottom:16px;"></div>
              <p style="font-size:22px;letter-spacing:4px;margin:0 0 12px 0;">🌲 🦉 🌲 🦌 🌲</p>
              <p style="color:rgba(160,200,110,0.5);font-size:12px;line-height:1.8;margin:0;font-style:italic;font-family:Georgia,serif;">
                &copy; 2024 <span style="color:rgba(180,220,130,0.7);font-style:normal;font-weight:700;">Animal Rescue System</span><br/>
                Protecting wildlife, one soul at a time.<br/>
                <span style="font-size:11px;">This is an automated message — please do not reply.</span>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
    `,
  };

  // DEBUG: Log just before sending
  console.log('>>> Attempting to send email to:', toEmail);
  await transporter.sendMail(mailOptions);
  console.log('>>> Email sent successfully to:', toEmail);
};


// JWT Middleware

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Invalid token format' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
};


// POST /api/auth/register
router.post('/register', async (req, res) => {
  const {
    username, email, password, phone, isVolunteer,
    has_car, can_foster, animal_handling, city
  } = req.body;

  console.log('Registration request:', { username, email, isVolunteer });

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'Username, email, and password are required' });
  }
  if (username.length < 3) {
    return res.status(400).json({ success: false, message: 'Username must be at least 3 characters' });
  }
  if (password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address' });
  }

  if (!phone || phone.trim() === '') {
    return res.status(400).json({ success: false, message: 'Phone number is required' });
  }

  const cleanedPhone = phone.replace(/[\s\-+]/g, '');
  const nepaliPhoneRegex = /^9[78]\d{8}$/;
  if (!nepaliPhoneRegex.test(cleanedPhone)) {
    return res.status(400).json({ success: false, message: 'Invalid Nepali phone number. Must be 10 digits starting with 98 or 97' });
  }

  if (isVolunteer) {
    if (!city || city.trim() === '') {
      return res.status(400).json({ success: false, message: 'City is required for volunteers' });
    }
    if (!animal_handling || animal_handling.trim() === '') {
      return res.status(400).json({ success: false, message: 'Animal handling experience is required for volunteers' });
    }
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [existingUsers] = await connection.execute(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUsers.length > 0) {
      await connection.rollback();
      connection.release();
      return res.status(400).json({ success: false, message: 'Email or username already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const role_id = isVolunteer ? 2 : 1;

    const [userResult] = await connection.execute(
      `INSERT INTO users (username, email, phone, password_hash, role_id, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [username, email, cleanedPhone, passwordHash, role_id]
    );

    const userId = userResult.insertId;
    console.log(`User created with ID: ${userId}`);

    if (isVolunteer) {
      const hasCarInt = has_car ? 1 : 0;
      const canFosterInt = can_foster ? 1 : 0;
      await connection.execute(
        `INSERT INTO volunteer_profiles
         (user_id, joined_at, availability_status_id, approval_status_id,
          has_car, can_foster, animal_handling, city)
         VALUES (?, NOW(), 1, 1, ?, ?, ?, ?)`,
        [userId, hasCarInt, canFosterInt, animal_handling || 'dogs', city || null]
      );
      console.log('Volunteer profile created');
    }

    await connection.commit();

    const [newUserRows] = await connection.execute(`
      SELECT u.user_id, u.username, u.email, u.phone, u.role_id, u.created_at, ur.role_name
      FROM users u
      LEFT JOIN user_roles ur ON u.role_id = ur.role_id
      WHERE u.user_id = ?
    `, [userId]);

    const newUser = newUserRows[0];

    let volunteerData = null;
    if (role_id === 2) {
      const [volRows] = await connection.execute(
        `SELECT vp.joined_at, vp.approval_status_id, vas.status_name as volunteer_status,
                vp.badges, vp.has_car, vp.can_foster, vp.animal_handling, vp.city,
                vp.availability_status_id, a.status_name as availability_status
         FROM volunteer_profiles vp
         LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
         LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
         WHERE vp.user_id = ?`,
        [userId]
      );
      if (volRows.length > 0) volunteerData = volRows[0];
    }

    const token = jwt.sign(
      { user_id: userId, role_id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

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

    res.status(201).json({
      success: true,
      message: isVolunteer ? 'Volunteer registered! Awaiting approval.' : 'User registered!',
      token,
      user: userResponse
    });

  } catch (err) {
    await connection.rollback();
    console.error('Registration error:', err);
    res.status(500).json({ success: false, message: 'Server error: ' + err.message });
  } finally {
    connection.release();
  }
});


// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password required' });
  }

  try {
    const [rows] = await pool.execute(`
      SELECT u.user_id, u.username, u.email, u.phone, u.password_hash,
             u.role_id, u.created_at, ur.role_name
      FROM users u
      LEFT JOIN user_roles ur ON u.role_id = ur.role_id
      WHERE u.email = ? AND u.is_deleted = 0
    `, [email]);

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    let volunteerData = null;
    if (user.role_id === 2) {
      const [volRows] = await pool.execute(
        `SELECT vp.joined_at, vp.approval_status_id, vas.status_name as volunteer_status,
                vp.badges, vp.has_car, vp.can_foster, vp.animal_handling, vp.city,
                vp.availability_status_id, a.status_name as availability_status,
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
        await pool.execute(
          `INSERT INTO volunteer_profiles (user_id, joined_at, approval_status_id, availability_status_id, has_car, can_foster, animal_handling, city)
           VALUES (?, NOW(), 1, 1, 0, 0, 'dogs', NULL)`,
          [user.user_id]
        );
        const [newVolRows] = await pool.execute(
          `SELECT vp.joined_at, vp.approval_status_id, 'pending' as volunteer_status, vp.badges,
                  vp.has_car, vp.can_foster, vp.animal_handling, vp.city, vp.availability_status_id,
                  'available' as availability_status, 0 as total_tasks
           FROM volunteer_profiles vp WHERE vp.user_id = ?`,
          [user.user_id]
        );
        volunteerData = newVolRows[0];
      }
    }

    const token = jwt.sign(
      { user_id: user.user_id, role_id: user.role_id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

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

    console.log('Login successful:', { id: userResponse.user_id, role: userResponse.role_name });
    res.json({ success: true, message: 'Login successful', token, user: userResponse });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// GET /api/auth/check
router.get('/check', verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT u.user_id, u.username, u.email, u.phone, u.role_id, u.created_at, ur.role_name
      FROM users u
      LEFT JOIN user_roles ur ON u.role_id = ur.role_id
      WHERE u.user_id = ? AND u.is_deleted = 0
    `, [req.user.user_id]);

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    const user = rows[0];

    let volunteerData = null;
    if (user.role_id === 2) {
      const [volRows] = await pool.execute(
        `SELECT vp.joined_at, vp.approval_status_id, vas.status_name as volunteer_status,
                vp.badges, vp.has_car, vp.can_foster, vp.animal_handling, vp.city,
                vp.availability_status_id, a.status_name as availability_status,
                (SELECT COUNT(*) FROM tasks WHERE assigned_to_user_id = ? AND status_id = 3 AND is_deleted = 0) AS total_tasks
         FROM volunteer_profiles vp
         LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
         LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
         WHERE vp.user_id = ?`,
        [user.user_id, user.user_id]
      );
      if (volRows.length > 0) volunteerData = volRows[0];
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

    res.json({ success: true, user: userResponse });

  } catch (err) {
    console.error('Check auth error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// CHANGE PASSWORD
router.patch('/change-password', verifyToken, async (req, res) => {
  const { current_password, new_password } = req.body;
  const userId = req.user.user_id;

  if (!current_password || !new_password) {
    return res.status(400).json({ success: false, message: 'Current password and new password are required' });
  }
  if (new_password.length < 8) {
    return res.status(400).json({ success: false, message: 'New password must be at least 8 characters' });
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(new_password)) {
    return res.status(400).json({
      success: false,
      message: 'Password must contain uppercase, lowercase, number, and special character (@$!%*?&)'
    });
  }

  try {
    const [users] = await pool.execute(
      'SELECT user_id, password_hash FROM users WHERE user_id = ? AND is_deleted = 0',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(current_password, users[0].password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);
    await pool.execute('UPDATE users SET password_hash = ? WHERE user_id = ?', [hashedPassword, userId]);
    await pool.execute('UPDATE users SET reset_token = NULL, reset_token_expires = NULL WHERE user_id = ?', [userId]);

    console.log('Password changed for user:', userId);
    res.json({ success: true, message: 'Password changed successfully' });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});


// FORGOT PASSWORD
router.post('/forgot-password', async (req, res) => {
  // DEBUG: Confirm route is being hit
  console.log('>>> forgot-password route hit, email:', req.body.email);

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  try {
    const [users] = await pool.execute(
      'SELECT user_id, email, username FROM users WHERE email = ? AND is_deleted = 0',
      [email]
    );

    console.log('>>> Users found in DB:', users.length);

    if (users.length === 0) {
      return res.json({ success: true, message: 'If your email exists, you will receive a reset link.' });
    }

    const user = users[0];

    const resetToken = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        purpose: 'password-reset'
      },
      process.env.JWT_SECRET + '-reset',
      { expiresIn: '1h' }
    );

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    console.log('>>> Reset link generated:', resetLink);

    await sendResetEmail(user.email, resetLink, user.username);

    res.json({ success: true, message: 'Password reset link sent to your email.' });

  } catch (error) {
    // DEBUG: Full error details
    console.error('>>> Forgot password ERROR:', error.message);
    console.error('>>> Full error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});


// VALIDATE RESET TOKEN

router.get('/validate-reset-token', async (req, res) => {
  const { token } = req.query;

  if (!token) return res.json({ valid: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET + '-reset');
    res.json({ valid: decoded.purpose === 'password-reset' });
  } catch (error) {
    res.json({ valid: false });
  }
});


// RESET PASSWORD

router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ success: false, message: 'Token and password are required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET + '-reset');

    if (decoded.purpose !== 'password-reset') {
      return res.status(400).json({ success: false, message: 'Invalid reset token' });
    }

    const [users] = await pool.execute(
      'SELECT user_id FROM users WHERE user_id = ? AND is_deleted = 0',
      [decoded.user_id]
    );

    if (users.length === 0) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await pool.execute(
      'UPDATE users SET password_hash = ? WHERE user_id = ?',
      [passwordHash, decoded.user_id]
    );

    console.log('Password reset successful for user:', decoded.user_id);
    res.json({ success: true, message: 'Password reset successful' });

  } catch (error) {
    console.error('Reset password error:', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ success: false, message: 'Reset link has expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ success: false, message: 'Invalid reset link' });
    }

    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;