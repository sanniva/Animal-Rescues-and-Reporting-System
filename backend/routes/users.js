const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const mysql = require('mysql2/promise');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const pool = require('../config/db');

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

/* MULTER */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/profile-images/';
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + req.params.id + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp/;
  if (allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
  }
};

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter });

/*  HELPER: CHECK ACTIVE TASKS */
async function checkActiveTasks(connection, userId) {
  const [activeTasks] = await connection.execute(
    `SELECT t.task_id, r.report_id, r.description, ts.status_name
     FROM tasks t
     INNER JOIN reports r ON t.report_id = r.report_id
     INNER JOIN task_statuses ts ON t.status_id = ts.status_id
     WHERE t.assigned_to_user_id = ?
       AND t.status_id IN (1, 2)
       AND t.is_deleted = 0
       AND r.is_deleted = 0`,
    [userId]
  );
  return activeTasks;
}

/* GET ALL USERS (ADMIN ONLY) */
router.get('/', verifyToken, async (req, res) => {
  try {
    if (req.user.role_id !== 3) return res.status(403).json({ message: 'Forbidden: Admins only' });

    const [rows] = await pool.execute(`
      SELECT u.user_id, u.username, u.email, u.phone, u.profile_image_url, u.bio,
             u.created_at, u.role_id, COALESCE(ur.role_name, 'user') AS role_name,
             vp.approval_status_id, vas.status_name AS volunteer_status,
             vp.has_car, vp.can_foster, vp.animal_handling, vp.city, vp.joined_at,
             vp.availability_status_id, a.status_name as availability_status,
             (SELECT COUNT(*) FROM tasks WHERE assigned_to_user_id = u.user_id AND status_id = 3 AND is_deleted = 0) AS total_tasks,
             (SELECT COUNT(*) FROM badge_awards WHERE user_id = u.user_id) AS badge_count,
             (SELECT GROUP_CONCAT(bd.badge_name SEPARATOR '||')
              FROM badge_awards ba JOIN badge_definitions bd ON ba.badge_id = bd.badge_id
              WHERE ba.user_id = u.user_id) AS badges_string
      FROM users u
      LEFT JOIN user_roles ur ON u.role_id = ur.role_id
      LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
      LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
      LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
      WHERE u.is_deleted = 0
      ORDER BY u.user_id
    `);

    const users = rows.map(user => {
      let badges = [];
      if (user.badges_string) badges = user.badges_string.split('||').filter(b => b.trim() !== '');
      return {
        user_id: user.user_id, username: user.username, email: user.email,
        phone: user.phone, profile_image_url: user.profile_image_url,
        bio: user.bio || '', created_at: user.created_at,
        role_name: user.role_name, badge_count: user.badge_count || 0, badges,
        volunteer: user.role_id === 2 && user.approval_status_id ? {
          approval_status_id: user.approval_status_id, status: user.volunteer_status,
          volunteer_since: user.joined_at, has_car: user.has_car === 1,
          can_foster: user.can_foster === 1, animal_handling: user.animal_handling || 'dogs',
          city: user.city || null, total_tasks: user.total_tasks || 0,
          availability_status_id: user.availability_status_id || 1,
          availability_status: user.availability_status || 'available'
        } : null
      };
    });

    res.json(users);
  } catch (err) {
    console.error('GET /api/users error:', err);
    res.status(500).json({ message: 'Server error', error: process.env.NODE_ENV === 'development' ? err.message : undefined });
  }
});

/* GET SINGLE USER */
router.get('/:id', verifyToken, async (req, res) => {
  const userId = Number(req.params.id);
  if (!userId) return res.status(400).json({ message: 'Invalid user ID' });

  try {
    if (req.user.user_id !== userId && req.user.role_id !== 3) return res.status(403).json({ message: 'Forbidden' });

    const [userCheck] = await pool.execute('SELECT user_id, role_id FROM users WHERE user_id = ? AND is_deleted = 0', [userId]);
    if (userCheck.length === 0) return res.status(404).json({ message: 'User not found' });

    const userRoleId = userCheck[0].role_id;

    const [userRows] = await pool.execute(`
      SELECT u.user_id, u.username, u.email, u.phone, u.profile_image_url, u.bio,
             u.created_at, u.role_id, COALESCE(ur.role_name, 'user') AS role_name
      FROM users u LEFT JOIN user_roles ur ON u.role_id = ur.role_id
      WHERE u.user_id = ?
    `, [userId]);

    if (userRows.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = userRows[0];
    let volunteerData = null;

    if (userRoleId === 2) {
      const [volunteerRows] = await pool.execute(`
        SELECT vp.approval_status_id, vas.status_name AS volunteer_status,
               vp.joined_at AS volunteer_since, vp.has_car, vp.can_foster,
               vp.animal_handling, vp.city, vp.availability_status_id,
               a.status_name as availability_status,
               (SELECT COUNT(*) FROM tasks WHERE assigned_to_user_id = ? AND status_id = 3 AND is_deleted = 0) AS total_tasks,
               (SELECT GROUP_CONCAT(bd.badge_name SEPARATOR '||')
                FROM badge_awards ba JOIN badge_definitions bd ON ba.badge_id = bd.badge_id
                WHERE ba.user_id = ?) AS badges_string
        FROM volunteer_profiles vp
        LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
        LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
        WHERE vp.user_id = ?
      `, [userId, userId, userId]);

      if (volunteerRows.length > 0) {
        let badges = [];
        if (volunteerRows[0].badges_string) badges = volunteerRows[0].badges_string.split('||').filter(b => b.trim() !== '');
        volunteerData = {
          approval_status_id: volunteerRows[0].approval_status_id,
          status: volunteerRows[0].volunteer_status, badges,
          volunteer_since: volunteerRows[0].volunteer_since,
          has_car: volunteerRows[0].has_car === 1, can_foster: volunteerRows[0].can_foster === 1,
          animal_handling: volunteerRows[0].animal_handling || 'dogs', city: volunteerRows[0].city || null,
          availability_status_id: volunteerRows[0].availability_status_id || 1,
          availability_status: volunteerRows[0].availability_status || 'available',
          total_tasks: volunteerRows[0].total_tasks || 0
        };
      } else {
        await pool.execute(
          `INSERT INTO volunteer_profiles (user_id, approval_status_id, availability_status_id, joined_at) VALUES (?, 1, 1, NOW())`,
          [userId]
        );
        volunteerData = {
          approval_status_id: 1, status: 'Pending', badges: [], volunteer_since: new Date(),
          has_car: false, can_foster: false, animal_handling: 'dogs', city: null,
          availability_status_id: 1, availability_status: 'available', total_tasks: 0
        };
      }
    }

    res.json({
      user_id: user.user_id, username: user.username, email: user.email,
      phone: user.phone, profile_image_url: user.profile_image_url,
      bio: user.bio || '', created_at: user.created_at,
      role_name: user.role_name, volunteer: volunteerData
    });
  } catch (err) {
    console.error('GET /api/users/:id error:', err);
    res.status(500).json({ message: 'Server error', error: process.env.NODE_ENV === 'development' ? err.message : undefined });
  }
});

/*  UPLOAD PROFILE IMAGE */
router.post('/:id/profile-image', verifyToken, upload.single('profile_image'), async (req, res) => {
  const userId = Number(req.params.id);
  if (!userId) return res.status(400).json({ message: 'Invalid user ID' });
  try {
    const [userCheck] = await pool.execute('SELECT user_id, profile_image_url FROM users WHERE user_id = ? AND is_deleted = 0', [userId]);
    if (userCheck.length === 0) return res.status(404).json({ message: 'User not found' });
    if (req.user.user_id !== userId && req.user.role_id !== 3) return res.status(403).json({ message: 'Forbidden' });
    if (!req.file) return res.status(400).json({ message: 'No image file provided' });

    const imageUrl = `/uploads/profile-images/${req.file.filename}`;
    const currentImageUrl = userCheck[0].profile_image_url;
    if (currentImageUrl) {
      const oldFilePath = path.join(__dirname, '..', 'uploads', 'profile-images', currentImageUrl.split('/').pop());
      if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
    }
    await pool.execute('UPDATE users SET profile_image_url = ? WHERE user_id = ?', [imageUrl, userId]);
    res.json({ success: true, message: 'Profile image uploaded successfully', profile_image_url: imageUrl });
  } catch (err) {
    console.error('Profile image upload error:', err);
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ message: 'File size too large. Maximum size is 5MB.' });
      return res.status(400).json({ message: err.message });
    }
    if (err.message && err.message.includes('Only image files')) return res.status(400).json({ message: err.message });
    res.status(500).json({ message: 'Server error', error: process.env.NODE_ENV === 'development' ? err.message : undefined });
  }
});

/* REMOVE PROFILE IMAGE */
router.delete('/:id/profile-image', verifyToken, async (req, res) => {
  const userId = Number(req.params.id);
  if (!userId) return res.status(400).json({ message: 'Invalid user ID' });
  try {
    const [userCheck] = await pool.execute('SELECT user_id, profile_image_url FROM users WHERE user_id = ? AND is_deleted = 0', [userId]);
    if (userCheck.length === 0) return res.status(404).json({ message: 'User not found' });
    if (req.user.user_id !== userId && req.user.role_id !== 3) return res.status(403).json({ message: 'Forbidden' });

    const currentImageUrl = userCheck[0].profile_image_url;
    if (currentImageUrl) {
      const filePath = path.join(__dirname, '..', 'uploads', 'profile-images', currentImageUrl.split('/').pop());
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    await pool.execute('UPDATE users SET profile_image_url = NULL WHERE user_id = ?', [userId]);
    res.json({ success: true, message: 'Profile image removed successfully' });
  } catch (err) {
    console.error('Profile image removal error:', err);
    res.status(500).json({ message: 'Server error', error: process.env.NODE_ENV === 'development' ? err.message : undefined });
  }
});

/* UPDATE USER (PATCH) */
router.patch('/:id', verifyToken, async (req, res) => {
  const userId = Number(req.params.id);
  const { username, email, phone, bio } = req.body;
  if (!userId) return res.status(400).json({ message: 'Invalid user ID' });
  try {
    const [userCheck] = await pool.execute('SELECT user_id FROM users WHERE user_id = ? AND is_deleted = 0', [userId]);
    if (userCheck.length === 0) return res.status(404).json({ message: 'User not found' });
    if (req.user.user_id !== userId && req.user.role_id !== 3) return res.status(403).json({ message: 'Forbidden' });

    const updateFields = [], updateValues = [];
    if (username !== undefined) {
      if (!username.trim()) return res.status(400).json({ message: 'Username cannot be empty' });
      updateFields.push('username = ?'); updateValues.push(username.trim());
    }
    if (email !== undefined) {
      if (!email.trim()) return res.status(400).json({ message: 'Email cannot be empty' });
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return res.status(400).json({ message: 'Invalid email format' });
      updateFields.push('email = ?'); updateValues.push(email.trim());
    }
    if (phone !== undefined) { updateFields.push('phone = ?'); updateValues.push(phone ? phone.trim() : null); }
    if (bio !== undefined) { updateFields.push('bio = ?'); updateValues.push(bio ? bio.trim() : ''); }
    if (updateFields.length === 0) return res.status(400).json({ message: 'No fields to update' });

    updateValues.push(userId);
    await pool.execute(`UPDATE users SET ${updateFields.join(', ')} WHERE user_id = ? AND is_deleted = 0`, updateValues);

    const [updated] = await pool.execute(`
      SELECT u.user_id, u.username, u.email, u.phone, u.profile_image_url, u.bio,
             u.created_at, u.role_id, COALESCE(ur.role_name, 'user') AS role_name
      FROM users u LEFT JOIN user_roles ur ON u.role_id = ur.role_id WHERE u.user_id = ?
    `, [userId]);
    res.json({ message: 'User updated successfully', user: updated[0] });
  } catch (err) {
    console.error('PATCH /api/users/:id error:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      if (err.message.includes('username')) return res.status(400).json({ message: 'Username already exists' });
      if (err.message.includes('email')) return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: 'Server error', error: process.env.NODE_ENV === 'development' ? err.message : undefined });
  }
});

/* UPDATE VOLUNTEER PROFILE */
router.patch('/:id/volunteer-profile', verifyToken, async (req, res) => {
  const volunteerId = Number(req.params.id);
  const { has_car, can_foster, animal_handling, city, availability_status_id } = req.body;
  if (!volunteerId) return res.status(400).json({ success: false, message: 'Invalid volunteer ID' });

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    if (req.user.user_id !== volunteerId && req.user.role_id !== 3) {
      await connection.rollback();
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    const [userCheck] = await connection.execute('SELECT user_id FROM users WHERE user_id = ? AND role_id = 2 AND is_deleted = 0', [volunteerId]);
    if (userCheck.length === 0) { await connection.rollback(); return res.status(404).json({ success: false, message: 'Volunteer not found' }); }

    const [profileCheck] = await connection.execute('SELECT user_id FROM volunteer_profiles WHERE user_id = ?', [volunteerId]);
    if (profileCheck.length === 0) {
      await connection.execute(
        `INSERT INTO volunteer_profiles (user_id, has_car, can_foster, animal_handling, city, approval_status_id, availability_status_id, joined_at) VALUES (?, ?, ?, ?, ?, 2, ?, NOW())`,
        [volunteerId, has_car ? 1 : 0, can_foster ? 1 : 0, animal_handling || 'dogs', city || null, availability_status_id || 1]
      );
    } else {
      const updateFields = [], updateValues = [];
      if (has_car !== undefined) { updateFields.push('has_car = ?'); updateValues.push(has_car ? 1 : 0); }
      if (can_foster !== undefined) { updateFields.push('can_foster = ?'); updateValues.push(can_foster ? 1 : 0); }
      if (animal_handling !== undefined) { updateFields.push('animal_handling = ?'); updateValues.push(animal_handling || 'dogs'); }
      if (city !== undefined) { updateFields.push('city = ?'); updateValues.push(city || null); }
      if (availability_status_id !== undefined) { updateFields.push('availability_status_id = ?'); updateValues.push(availability_status_id); }
      if (updateFields.length === 0) { await connection.rollback(); return res.status(400).json({ success: false, message: 'No fields to update' }); }
      updateValues.push(volunteerId);
      await connection.execute(`UPDATE volunteer_profiles SET ${updateFields.join(', ')} WHERE user_id = ?`, updateValues);
    }
    await connection.commit();

    const [updatedProfile] = await pool.execute(`
      SELECT vp.has_car, vp.can_foster, vp.animal_handling, vp.city,
             vp.approval_status_id, vas.status_name as volunteer_status,
             vp.availability_status_id, a.status_name as availability_status,
             DATE_FORMAT(vp.joined_at, '%Y-%m-%d') as volunteer_since
      FROM volunteer_profiles vp
      LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
      LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
      WHERE vp.user_id = ?
    `, [volunteerId]);
    res.json({ success: true, message: 'Volunteer profile updated successfully', data: updatedProfile[0] });
  } catch (error) {
    await connection.rollback();
    console.error('Error updating volunteer profile:', error);
    res.status(500).json({ success: false, message: 'Failed to update volunteer profile', error: process.env.NODE_ENV === 'development' ? error.message : undefined });
  } finally { connection.release(); }
});

/* GET VOLUNTEER PROFILE */
router.get('/:id/volunteer-profile', verifyToken, async (req, res) => {
  const volunteerId = Number(req.params.id);
  if (!volunteerId) return res.status(400).json({ success: false, message: 'Invalid volunteer ID' });
  try {
    if (req.user.user_id !== volunteerId && req.user.role_id !== 3) return res.status(403).json({ success: false, message: 'Forbidden' });

    const [profile] = await pool.execute(`
      SELECT vp.has_car, vp.can_foster, vp.animal_handling, vp.city,
             vp.approval_status_id, vas.status_name as volunteer_status,
             DATE_FORMAT(vp.joined_at, '%Y-%m-%d') as volunteer_since,
             vp.availability_status_id, a.status_name as availability_status,
             (SELECT COUNT(*) FROM tasks WHERE assigned_to_user_id = ? AND status_id = 3 AND is_deleted = 0) AS total_tasks,
             (SELECT GROUP_CONCAT(bd.badge_name SEPARATOR '||')
              FROM badge_awards ba JOIN badge_definitions bd ON ba.badge_id = bd.badge_id
              WHERE ba.user_id = ?) AS badges_string
      FROM volunteer_profiles vp
      LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
      LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
      WHERE vp.user_id = ?
    `, [volunteerId, volunteerId, volunteerId]);

    if (profile.length === 0) return res.status(404).json({ success: false, message: 'Volunteer profile not found' });

    let badges = [];
    if (profile[0].badges_string) badges = profile[0].badges_string.split('||').filter(b => b.trim() !== '');

    res.json({
      success: true,
      data: {
        has_car: profile[0].has_car, can_foster: profile[0].can_foster,
        animal_handling: profile[0].animal_handling, city: profile[0].city,
        approval_status_id: profile[0].approval_status_id, volunteer_status: profile[0].volunteer_status,
        volunteer_since: profile[0].volunteer_since,
        availability_status_id: profile[0].availability_status_id,
        availability_status: profile[0].availability_status,
        total_tasks: profile[0].total_tasks || 0, badges
      }
    });
  } catch (error) {
    console.error('Error fetching volunteer profile:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch volunteer profile', error: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
});

/* DELETE USER (ADMIN ONLY) */
router.delete('/:id', verifyToken, async (req, res) => {
  const userId = Number(req.params.id);
  if (!userId) return res.status(400).json({ message: 'Invalid user ID' });

  const connection = await pool.getConnection();
  try {
    if (req.user.role_id !== 3) return res.status(403).json({ message: 'Only admin can delete users' });

    const [userRows] = await connection.execute('SELECT user_id, role_id, profile_image_url FROM users WHERE user_id = ? AND is_deleted = 0', [userId]);
    if (userRows.length === 0) return res.status(404).json({ message: 'User not found' });
    if (userRows[0].role_id === 3) return res.status(403).json({ message: 'Cannot delete admin user' });

    await connection.beginTransaction();

    const profileImageUrl = userRows[0].profile_image_url;
    if (profileImageUrl) {
      const filePath = path.join(__dirname, '..', 'uploads', 'profile-images', profileImageUrl.split('/').pop());
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await connection.execute('UPDATE users SET is_deleted = 1 WHERE user_id = ?', [userId]);
    await connection.execute('UPDATE reports SET is_deleted = 1 WHERE user_id = ?', [userId]);
    await connection.execute(`UPDATE tasks t JOIN reports r ON t.report_id = r.report_id SET t.is_deleted = 1 WHERE r.user_id = ?`, [userId]);
    await connection.commit();
    res.json({ message: 'User deleted successfully', user_id: userId });
  } catch (err) {
    await connection.rollback();
    console.error('DELETE /api/users/:id error:', err);
    res.status(500).json({ message: 'Server error', error: process.env.NODE_ENV === 'development' ? err.message : undefined });
  } finally { connection.release(); }
});

/* HELPER: BUILD USER RESPONSE */
async function fetchFormattedUser(userId, conn) {
  const db = conn || pool;
  const [rows] = await db.execute(`
    SELECT u.user_id, u.username, u.email, u.phone, u.profile_image_url, u.bio,
           u.created_at, u.role_id, COALESCE(ur.role_name, 'user') AS role_name,
           vp.approval_status_id, vas.status_name AS volunteer_status,
           vp.joined_at AS volunteer_since, vp.has_car, vp.can_foster,
           vp.animal_handling, vp.city, vp.availability_status_id,
           a.status_name as availability_status,
           (SELECT COUNT(*) FROM tasks WHERE assigned_to_user_id = u.user_id AND status_id = 3 AND is_deleted = 0) AS total_tasks,
           (SELECT GROUP_CONCAT(bd.badge_name SEPARATOR '||')
            FROM badge_awards ba JOIN badge_definitions bd ON ba.badge_id = bd.badge_id
            WHERE ba.user_id = u.user_id) AS badges_string
    FROM users u
    LEFT JOIN user_roles ur ON u.role_id = ur.role_id
    LEFT JOIN volunteer_profiles vp ON u.user_id = vp.user_id
    LEFT JOIN volunteer_approval_statuses vas ON vp.approval_status_id = vas.status_id
    LEFT JOIN availability_statuses a ON vp.availability_status_id = a.status_id
    WHERE u.user_id = ?
  `, [userId]);

  const r = rows[0];
  let badges = [];
  if (r.badges_string) badges = r.badges_string.split('||').filter(b => b.trim() !== '');

  return {
    user_id: r.user_id, username: r.username, email: r.email, phone: r.phone,
    profile_image_url: r.profile_image_url, bio: r.bio || '',
    created_at: r.created_at, role_name: r.role_name, badges,
    volunteer: r.role_id === 2 && r.approval_status_id ? {
      approval_status_id: r.approval_status_id, status: r.volunteer_status,
      volunteer_since: r.volunteer_since, has_car: r.has_car === 1,
      can_foster: r.can_foster === 1, animal_handling: r.animal_handling || 'dogs',
      city: r.city || null, total_tasks: r.total_tasks || 0,
      availability_status_id: r.availability_status_id || 1,
      availability_status: r.availability_status || 'available'
    } : null
  };
}

/* APPROVE - PUT + POST */
async function handleApproveRequest(req, res) {
  const userId = Number(req.params.id);
  if (req.user.role_id !== 3) return res.status(403).json({ success: false, message: 'Forbidden: Admin access required' });

  const [userCheck] = await pool.execute('SELECT user_id FROM users WHERE user_id = ? AND is_deleted = 0', [userId]);
  if (userCheck.length === 0) return res.status(404).json({ success: false, message: 'User not found' });

  await pool.execute('UPDATE users SET role_id = 2 WHERE user_id = ?', [userId]);

  const [volunteerCheck] = await pool.execute('SELECT user_id FROM volunteer_profiles WHERE user_id = ?', [userId]);
  if (volunteerCheck.length === 0) {
    await pool.execute(`INSERT INTO volunteer_profiles (user_id, approval_status_id, availability_status_id, joined_at) VALUES (?, 2, 1, NOW())`, [userId]);
  } else {
    await pool.execute(`UPDATE volunteer_profiles SET approval_status_id = 2, joined_at = NOW() WHERE user_id = ?`, [userId]);
  }

  const formattedUser = await fetchFormattedUser(userId);
  res.json({ success: true, message: 'User approved as volunteer successfully', user: formattedUser });
}

router.put('/:id/approve', verifyToken, async (req, res) => {
  try { await handleApproveRequest(req, res); }
  catch (err) { console.error('Approve error:', err); res.status(500).json({ success: false, message: 'Server error', error: process.env.NODE_ENV === 'development' ? err.message : undefined }); }
});

router.post('/:id/approve', verifyToken, async (req, res) => {
  try { await handleApproveRequest(req, res); }
  catch (err) { console.error('Approve error (POST):', err); res.status(500).json({ success: false, message: 'Server error', error: process.env.NODE_ENV === 'development' ? err.message : undefined }); }
});

/* REJECT - PUT + POST
   Blocked if volunteer has active (status 1 or 2) tasks
*/
async function handleRejectRequest(req, res) {
  const userId = Number(req.params.id);
  if (req.user.role_id !== 3) return res.status(403).json({ success: false, message: 'Forbidden: Admin access required' });

  const connection = await pool.getConnection();
  try {
    const [userCheck] = await connection.execute('SELECT user_id FROM users WHERE user_id = ? AND is_deleted = 0', [userId]);
    if (userCheck.length === 0) { connection.release(); return res.status(404).json({ success: false, message: 'User not found' }); }

    // ── BLOCK if volunteer has active tasks ──
    const activeTasks = await checkActiveTasks(connection, userId);
    if (activeTasks.length > 0) {
      connection.release();
      return res.status(409).json({
        success: false,
        message: `Cannot remove volunteer — they have ${activeTasks.length} active task(s). Please reassign them first.`,
        active_tasks: activeTasks
      });
    }

    const [userRoleCheck] = await connection.execute('SELECT role_id FROM users WHERE user_id = ?', [userId]);
    if (userRoleCheck[0].role_id !== 2) {
      await connection.execute('UPDATE users SET role_id = 2 WHERE user_id = ?', [userId]);
    }

    const [volunteerCheck] = await connection.execute('SELECT user_id FROM volunteer_profiles WHERE user_id = ?', [userId]);
    if (volunteerCheck.length === 0) {
      await connection.execute(`INSERT INTO volunteer_profiles (user_id, approval_status_id) VALUES (?, 3)`, [userId]);
    } else {
      await connection.execute(`UPDATE volunteer_profiles SET approval_status_id = 3 WHERE user_id = ?`, [userId]);
    }

    const formattedUser = await fetchFormattedUser(userId, connection);
    connection.release();
    res.json({ success: true, message: 'Volunteer rejected successfully', user: formattedUser });
  } catch (err) {
    connection.release();
    throw err;
  }
}

router.put('/:id/reject', verifyToken, async (req, res) => {
  try { await handleRejectRequest(req, res); }
  catch (err) { console.error('Reject error:', err); res.status(500).json({ success: false, message: 'Server error', error: process.env.NODE_ENV === 'development' ? err.message : undefined }); }
});

router.post('/:id/reject', verifyToken, async (req, res) => {
  try { await handleRejectRequest(req, res); }
  catch (err) { console.error('Reject error (POST):', err); res.status(500).json({ success: false, message: 'Server error', error: process.env.NODE_ENV === 'development' ? err.message : undefined }); }
});

module.exports = router;