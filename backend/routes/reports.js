const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const mysql = require('mysql2/promise');
require('dotenv').config();

router.use(express.json());

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
    const [rows] = await pool.execute('SELECT type_id, type_name FROM animal_types ORDER BY type_name');
    res.json({ success: true, data: rows });
  } catch (error) {
    const fallbackData = [
      { type_id: 1, type_name: 'Dog' }, { type_id: 2, type_name: 'Cat' },
      { type_id: 3, type_name: 'Bird' }, { type_id: 4, type_name: 'Rabbit' },
      { type_id: 5, type_name: 'Hamster' }, { type_id: 6, type_name: 'Turtle' },
      { type_id: 7, type_name: 'Horse' }, { type_id: 8, type_name: 'Cow' },
      { type_id: 9, type_name: 'Goat' }, { type_id: 10, type_name: 'Sheep' },
      { type_id: 11, type_name: 'Other' }
    ];
    res.json({ success: true, data: fallbackData, message: 'Using fallback data' });
  }
});

router.get('/animal-conditions', verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT condition_id, condition_name FROM animal_conditions ORDER BY condition_name');
    res.json({ success: true, data: rows });
  } catch (error) {
    const fallbackData = [
      { condition_id: 1, condition_name: 'Injured' },
      { condition_id: 2, condition_name: 'Sick' },
      { condition_id: 3, condition_name: 'Abandoned' }
    ];
    res.json({ success: true, data: fallbackData, message: 'Using fallback data' });
  }
});

// =====================================================
// SUBMIT REPORT
// =====================================================
router.post('/submit', verifyToken, async (req, res) => {
  console.log('=== SUBMIT REPORT CALLED ===');
  console.log('req.user:', req.user);
  console.log('req.body:', req.body);
  
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    if (!req.user || !req.user.user_id) {
      console.error('No user found in request');
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please login again.'
      });
    }
    
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
    
    console.log(`Submitting report for user ${userId}`);
    
    const [result] = await connection.execute(
      `INSERT INTO reports 
       (user_id, animal_type_id, animal_condition_id, description, 
        location_address, status_id, user_note, submitted_at, is_deleted) 
       VALUES (?, ?, ?, ?, ?, 1, ?, NOW(), 0)`,
      [userId, animal_type_id, animal_condition_id, description.trim(), location_address.trim(), user_note ? user_note.trim() : null]
    );
    
    await connection.commit();
    const reportId = result.insertId;
    console.log(`Report submitted successfully with ID: ${reportId}`);
    
    res.json({
      success: true,
      message: 'Report submitted successfully',
      report_id: reportId
    });
    
  } catch (error) {
    await connection.rollback();
    console.error('Submit report error:', error);
    
    let errorMessage = 'Failed to submit report';
    if (error.code === 'ER_NO_SUCH_TABLE') {
      errorMessage = 'Database tables not found. Please contact administrator.';
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

// GET USER'S REPORTS
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
        COALESCE(u.email, 'No email') as email,
        t.task_id,
        DATE_FORMAT(t.completed_at, '%Y-%m-%d %H:%i:%s') as completed_at,
        v.username as volunteer_name,
        v.email as volunteer_email,
        CAST(v.phone AS CHAR) AS volunteer_phone
      FROM reports r
      LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
      LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
      LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
      LEFT JOIN users u ON r.user_id = u.user_id
      LEFT JOIN tasks t ON r.report_id = t.report_id AND t.is_deleted = 0
      LEFT JOIN users v ON t.assigned_to_user_id = v.user_id
      WHERE r.user_id = ? AND r.is_deleted = 0
      ORDER BY r.submitted_at DESC
    `, [userId]);
    
    console.log(`Found ${reports.length} reports for user ${userId}`);
    
    const formattedReports = reports.map(report => ({
      ...report,
      completed_at: report.completed_at || null,
      task_id: report.task_id || null,
      volunteer_name: report.volunteer_name || null,
      volunteer_email: report.volunteer_email || null,
      volunteer_phone: report.volunteer_phone || null
    }));
    
    res.json({
      success: true,
      data: formattedReports,
      count: formattedReports.length
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

// GET SINGLE REPORT BY ID
router.get('/:id', verifyToken, async (req, res) => {
  const reportId = Number(req.params.id);
  const userId = req.user.user_id;
  
  if (!reportId) {
    return res.status(400).json({ success: false, message: 'Invalid report ID' });
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
        COALESCE(u.email, 'No email') as email,
        t.task_id,
        DATE_FORMAT(t.completed_at, '%Y-%m-%d %H:%i:%s') as completed_at,
        v.username as volunteer_name,
        v.email as volunteer_email,
        CAST(v.phone AS CHAR) AS volunteer_phone
      FROM reports r
      LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
      LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
      LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
      LEFT JOIN users u ON r.user_id = u.user_id
      LEFT JOIN tasks t ON r.report_id = t.report_id AND t.is_deleted = 0
      LEFT JOIN users v ON t.assigned_to_user_id = v.user_id
      WHERE r.report_id = ? AND r.is_deleted = 0
    `, [reportId]);
    
    if (reports.length === 0) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }
    
    const report = reports[0];
    
    if (report.user_id !== userId && req.user.role_id !== 3) {
      return res.status(403).json({ success: false, message: 'Forbidden: You can only view your own reports' });
    }
    
    res.json({ success: true, data: report });
    
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch report', error: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
});

// UPDATE REPORT
router.patch('/:id', verifyToken, async (req, res) => {
  const reportId = Number(req.params.id);
  const userId = req.user.user_id;
  const { description, location_address, user_note } = req.body;
  
  if (!reportId) {
    return res.status(400).json({ success: false, message: 'Invalid report ID' });
  }
  
  try {
    const [reportCheck] = await pool.execute(
      'SELECT user_id, status_id FROM reports WHERE report_id = ? AND is_deleted = 0',
      [reportId]
    );
    
    if (reportCheck.length === 0) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }
    
    if (reportCheck[0].user_id !== userId) {
      return res.status(403).json({ success: false, message: 'Forbidden: You can only update your own reports' });
    }
    
    if (reportCheck[0].status_id !== 1) {
      return res.status(400).json({ success: false, message: 'Report cannot be edited after it has been reviewed' });
    }
    
    const updateFields = [];
    const updateValues = [];
    
    if (description !== undefined) {
      if (description.trim().length < 10) {
        return res.status(400).json({ success: false, message: 'Description must be at least 10 characters' });
      }
      updateFields.push('description = ?');
      updateValues.push(description.trim());
    }
    
    if (location_address !== undefined) {
      if (location_address.trim().length < 5) {
        return res.status(400).json({ success: false, message: 'Location must be at least 5 characters' });
      }
      updateFields.push('location_address = ?');
      updateValues.push(location_address.trim());
    }
    
    if (user_note !== undefined) {
      updateFields.push('user_note = ?');
      updateValues.push(user_note ? user_note.trim() : null);
    }
    
    if (updateFields.length === 0) {
      return res.status(400).json({ success: false, message: 'No fields to update' });
    }
    
    updateValues.push(reportId);
    
    const updateQuery = `UPDATE reports SET ${updateFields.join(', ')} WHERE report_id = ? AND is_deleted = 0`;
    await pool.execute(updateQuery, updateValues);
    
    res.json({ success: true, message: 'Report updated successfully' });
    
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({ success: false, message: 'Failed to update report', error: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
});

// DELETE REPORT
router.delete('/:id', verifyToken, async (req, res) => {
  const reportId = Number(req.params.id);
  const userId = req.user.user_id;
  
  if (!reportId) {
    return res.status(400).json({ success: false, message: 'Invalid report ID' });
  }
  
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const [reportCheck] = await connection.execute(
      'SELECT user_id FROM reports WHERE report_id = ? AND is_deleted = 0',
      [reportId]
    );
    
    if (reportCheck.length === 0) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }
    
    if (reportCheck[0].user_id !== userId && req.user.role_id !== 3) {
      return res.status(403).json({ success: false, message: 'Forbidden: You can only delete your own reports' });
    }
    
    await connection.execute('UPDATE reports SET is_deleted = 1 WHERE report_id = ?', [reportId]);
    await connection.commit();
    
    res.json({ success: true, message: 'Report deleted successfully', report_id: reportId });
    
  } catch (error) {
    await connection.rollback();
    console.error('Error deleting report:', error);
    res.status(500).json({ success: false, message: 'Failed to delete report', error: process.env.NODE_ENV === 'development' ? error.message : undefined });
    
  } finally {
    connection.release();
  }
});

// =====================================================
// GET ALL REPORTS FOR ADMIN (WITH VOLUNTEER INFO)
// =====================================================
router.get('/admin/all', verifyToken, async (req, res) => {
  try {
    if (req.user.role_id !== 3) {
      return res.status(403).json({ success: false, message: 'Forbidden: Admin access required' });
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
        COALESCE(u.email, 'No email') as email,
        t.task_id,
        t.status_id as task_status_id,
        ts.status_name as task_status,
        DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
        DATE_FORMAT(t.started_at, '%Y-%m-%d %H:%i:%s') as started_at,
        DATE_FORMAT(t.completed_at, '%Y-%m-%d %H:%i:%s') as completed_at,
        v.user_id as volunteer_id,
        v.username as volunteer_name,
        v.email as volunteer_email,
        CAST(v.phone AS CHAR) AS volunteer_phone,
        t.volunteer_response,
        t.declined_reason,
        DATE_FORMAT(t.volunteer_responded_at, '%Y-%m-%d %H:%i:%s') as volunteer_responded_at
      FROM reports r
      LEFT JOIN animal_types at ON r.animal_type_id = at.type_id
      LEFT JOIN animal_conditions ac ON r.animal_condition_id = ac.condition_id
      LEFT JOIN report_statuses rs ON r.status_id = rs.status_id
      LEFT JOIN users u ON r.user_id = u.user_id
      LEFT JOIN tasks t ON r.report_id = t.report_id AND t.is_deleted = 0
      LEFT JOIN users v ON t.assigned_to_user_id = v.user_id
      LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
      WHERE r.is_deleted = 0
      ORDER BY r.submitted_at DESC
    `);
    
    console.log(`Admin: Found ${reports.length} reports with volunteer info`);
    
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

// UPDATE REPORT STATUS (ADMIN ONLY)
router.patch('/:id/status', verifyToken, async (req, res) => {
  const reportId = Number(req.params.id);
  const { status_id } = req.body;
  
  if (!reportId) {
    return res.status(400).json({ success: false, message: 'Invalid report ID' });
  }
  
  if (!status_id || (status_id < 1 || status_id > 5)) {
    return res.status(400).json({ success: false, message: 'Invalid status ID' });
  }
  
  try {
    if (req.user.role_id !== 3) {
      return res.status(403).json({ success: false, message: 'Forbidden: Admin access required' });
    }
    
    const [reportCheck] = await pool.execute(
      'SELECT report_id FROM reports WHERE report_id = ? AND is_deleted = 0',
      [reportId]
    );
    
    if (reportCheck.length === 0) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }
    
    await pool.execute('UPDATE reports SET status_id = ? WHERE report_id = ?', [status_id, reportId]);
    
    res.json({ success: true, message: 'Report status updated successfully' });
    
  } catch (error) {
    console.error('Error updating report status:', error);
    res.status(500).json({ success: false, message: 'Failed to update report status', error: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
});

// =====================================================
// ✅ ADD ADMIN NOTE TO REPORT (ADMIN ONLY)
// =====================================================
router.post('/:id/admin-notes', verifyToken, async (req, res) => {
  const reportId = Number(req.params.id);
  const { note_text } = req.body;
  const adminId = req.user.user_id;
  
  console.log('=== ADD ADMIN NOTE ===');
  console.log('Report ID:', reportId);
  console.log('Note text:', note_text);
  console.log('Admin ID:', adminId);
  console.log('User role:', req.user.role_id);
  
  if (!reportId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid report ID'
    });
  }
  
  if (!note_text || note_text.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Note text is required'
    });
  }
  
  // Check if user is admin (role_id === 3)
  if (req.user.role_id !== 3) {
    return res.status(403).json({
      success: false,
      message: 'Forbidden: Only admins can add notes'
    });
  }
  
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
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
    
    // Insert the admin note
    const [result] = await connection.execute(
      `INSERT INTO admin_notes (report_id, admin_id, note_text, created_at) 
       VALUES (?, ?, ?, NOW())`,
      [reportId, adminId, note_text.trim()]
    );
    
    await connection.commit();
    
    console.log('Admin note inserted successfully, ID:', result.insertId);
    
    // Fetch the inserted note with admin name
    const [newNote] = await connection.execute(`
      SELECT 
        an.note_id,
        an.report_id,
        an.admin_id,
        an.note_text,
        DATE_FORMAT(an.created_at, '%Y-%m-%d %H:%i:%s') as created_at,
        u.username as admin_name
      FROM admin_notes an
      LEFT JOIN users u ON an.admin_id = u.user_id
      WHERE an.note_id = ?
    `, [result.insertId]);
    
    res.json({
      success: true,
      message: 'Admin note saved successfully',
      data: newNote[0]
    });
    
  } catch (error) {
    await connection.rollback();
    console.error('Error saving admin note:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to save admin note: ' + error.message,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
    
  } finally {
    connection.release();
  }
});

// =====================================================
// GET ADMIN NOTES FOR A REPORT
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
    
    // Get all admin notes for this report
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

// GET STATUS LIST
router.get('/status/list', verifyToken, async (req, res) => {
  try {
    const [statuses] = await pool.execute('SELECT status_id, status_name FROM report_statuses ORDER BY status_id');
    res.json({ success: true, data: statuses });
  } catch (error) {
    const fallbackStatuses = [
      { status_id: 1, status_name: 'submitted' },
      { status_id: 2, status_name: 'assigned' },
      { status_id: 3, status_name: 'in_progress' },
      { status_id: 4, status_name: 'completed' },
      { status_id: 5, status_name: 'declined' }
    ];
    res.json({ success: true, data: fallbackStatuses, message: 'Using fallback status data' });
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