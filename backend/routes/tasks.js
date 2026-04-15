const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const mysql = require('mysql2/promise');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../../uploads/evidence');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `evidence-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// const pool = mysql.createPool({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || '',
//   database: process.env.DB_NAME || 'animal_rescue_system',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

const pool = require('../config/db');

console.log('Task routes initialized');


// GET ADMIN NOTES FOR A REPORT

router.get('/:reportId/admin-notes', verifyToken, async (req, res) => {
  const reportId = Number(req.params.reportId);
  
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


// UPLOAD EVIDENCE PHOTOS FOR A TASK

router.post('/:taskId/upload-proofs', verifyToken, upload.array('proofs', 5), async (req, res) => {
  const taskId = Number(req.params.taskId);
  const files = req.files;
  const volunteerId = req.user.user_id;
  
  if (!taskId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid task ID'
    });
  }
  
  if (!files || files.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No files uploaded'
    });
  }
  
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    // Check if task exists and is assigned to this volunteer
    const [taskCheck] = await connection.execute(
      'SELECT task_id, report_id FROM tasks WHERE task_id = ? AND assigned_to_user_id = ? AND is_deleted = 0',
      [taskId, volunteerId]
    );
    
    if (taskCheck.length === 0) {
      // Delete uploaded files
      files.forEach(file => {
        fs.unlink(file.path, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      });
      
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: 'Task not found or not assigned to you'
      });
    }
    
    const reportId = taskCheck[0].report_id;
    const proofUrls = [];
    
    // Insert each proof into task_proofs table
    for (const file of files) {
      const proofUrl = `/uploads/evidence/${file.filename}`;
      
      const [result] = await connection.execute(
        `INSERT INTO task_proofs (task_id, proof_url, uploaded_at) 
         VALUES (?, ?, NOW())`,
        [taskId, proofUrl]
      );
      
      proofUrls.push({
        proof_id: result.insertId,
        proof_url: proofUrl,
        uploaded_at: new Date().toISOString()
      });
    }
    
    await connection.commit();
    
    res.json({
      success: true,
      message: `${files.length} photo(s) uploaded successfully`,
      data: {
        task_id: taskId,
        report_id: reportId,
        proofs: proofUrls
      }
    });
    
  } catch (error) {
    await connection.rollback();
    
    // Delete uploaded files on error
    files.forEach(file => {
      fs.unlink(file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    });
    
    console.error('Error uploading proofs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload proofs',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
    
  } finally {
    connection.release();
  }
});


// FIXED: GET EVIDENCE PHOTOS FOR A TASK (ALLOW REPORTERS)

router.get('/:taskId/evidence', verifyToken, async (req, res) => {
  const taskId = Number(req.params.taskId);
  const userId = req.user.user_id;
  
  if (!taskId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid task ID'
    });
  }
  
  try {
    // First, get the task and its associated report to check permissions
    const [taskInfo] = await pool.execute(`
      SELECT 
        t.task_id, 
        t.report_id, 
        t.assigned_to_user_id, 
        r.user_id as reporter_id
      FROM tasks t
      INNER JOIN reports r ON t.report_id = r.report_id
      WHERE t.task_id = ? AND t.is_deleted = 0
    `, [taskId]);
    
    if (taskInfo.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    const task = taskInfo[0];
    
    // Check if user has access:
    // 1. Admin (role_id === 3)
    // 2. Assigned volunteer
    // 3. Reporter who created the report
    const isAdmin = req.user.role_id === 3;
    const isAssignedVolunteer = task.assigned_to_user_id === userId;
    const isReporter = task.reporter_id === userId;
    
    if (!isAdmin && !isAssignedVolunteer && !isReporter) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You can only view evidence for tasks you are assigned to or reports you created'
      });
    }
    
    // Get all evidence for this task
    const [proofs] = await pool.execute(`
      SELECT 
        proof_id,
        task_id,
        proof_url,
        DATE_FORMAT(uploaded_at, '%Y-%m-%d %H:%i:%s') as uploaded_at
      FROM task_proofs
      WHERE task_id = ?
      ORDER BY uploaded_at DESC
    `, [taskId]);
    
    res.json({
      success: true,
      data: proofs,
      count: proofs.length
    });
    
  } catch (error) {
    console.error('Error fetching evidence:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch evidence',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});


// ADD COMPLETION NOTE FOR A TASK

router.post('/:taskId/completion-notes', verifyToken, async (req, res) => {
  const taskId = Number(req.params.taskId);
  const { note_text } = req.body;
  const volunteerId = req.user.user_id;
  
  if (!taskId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid task ID'
    });
  }
  
  if (!note_text || note_text.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Note text is required'
    });
  }
  
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    // Check if task exists and is assigned to this volunteer
    const [taskCheck] = await connection.execute(
      'SELECT task_id, report_id FROM tasks WHERE task_id = ? AND assigned_to_user_id = ? AND is_deleted = 0',
      [taskId, volunteerId]
    );
    
    if (taskCheck.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: 'Task not found or not assigned to you'
      });
    }
    
    const reportId = taskCheck[0].report_id;
    
    // Insert completion note into task_completion_notes table
    const [result] = await connection.execute(
      `INSERT INTO task_completion_notes (task_id, volunteer_id, note_text, created_at) 
       VALUES (?, ?, ?, NOW())`,
      [taskId, volunteerId, note_text.trim()]
    );
    
    await connection.commit();
    
    // Get the inserted note with volunteer name
    const [note] = await connection.execute(`
      SELECT 
        cn.note_id,
        cn.task_id,
        cn.volunteer_id,
        cn.note_text,
        DATE_FORMAT(cn.created_at, '%Y-%m-%d %H:%i:%s') as created_at,
        u.username as volunteer_name
      FROM task_completion_notes cn
      LEFT JOIN users u ON cn.volunteer_id = u.user_id
      WHERE cn.note_id = ?
    `, [result.insertId]);
    
    res.json({
      success: true,
      message: 'Completion note added successfully',
      data: note[0]
    });
    
  } catch (error) {
    await connection.rollback();
    console.error('Error adding completion note:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add completion note',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
    
  } finally {
    connection.release();
  }
});

// FIXED: GET COMPLETION NOTES FOR A TASK (ALLOW REPORTERS)

router.get('/:taskId/completion-notes', verifyToken, async (req, res) => {
  const taskId = Number(req.params.taskId);
  const userId = req.user.user_id;
  
  if (!taskId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid task ID'
    });
  }
  
  try {
    // First, get the task and its associated report to check permissions
    const [taskInfo] = await pool.execute(`
      SELECT 
        t.task_id, 
        t.report_id, 
        t.assigned_to_user_id, 
        r.user_id as reporter_id
      FROM tasks t
      INNER JOIN reports r ON t.report_id = r.report_id
      WHERE t.task_id = ? AND t.is_deleted = 0
    `, [taskId]);
    
    if (taskInfo.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    const task = taskInfo[0];
    
    // Check if user has access:
    // 1. Admin (role_id === 3)
    // 2. Assigned volunteer
    // 3. Reporter who created the report
    const isAdmin = req.user.role_id === 3;
    const isAssignedVolunteer = task.assigned_to_user_id === userId;
    const isReporter = task.reporter_id === userId;
    
    if (!isAdmin && !isAssignedVolunteer && !isReporter) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You can only view notes for tasks you are assigned to or reports you created'
      });
    }
    
    // Get all completion notes for this task with volunteer names
    const [notes] = await pool.execute(`
      SELECT 
        cn.note_id,
        cn.task_id,
        cn.volunteer_id,
        cn.note_text,
        DATE_FORMAT(cn.created_at, '%Y-%m-%d %H:%i:%s') as created_at,
        u.username as volunteer_name
      FROM task_completion_notes cn
      LEFT JOIN users u ON cn.volunteer_id = u.user_id
      WHERE cn.task_id = ?
      ORDER BY cn.created_at DESC
    `, [taskId]);
    
    res.json({
      success: true,
      data: notes,
      count: notes.length
    });
    
  } catch (error) {
    console.error('Error fetching completion notes:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch completion notes',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});


// GET TASK DETAILS WITH ALL RELATED DATA (for volunteers and reporters)

router.get('/task/:taskId/full-details', verifyToken, async (req, res) => {
  const taskId = Number(req.params.taskId);
  const userId = req.user.user_id;
  
  if (!taskId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid task ID'
    });
  }
  
  try {
    // First, get the task and its associated report to check permissions
    const [taskInfo] = await pool.execute(`
      SELECT 
        t.task_id, 
        t.report_id, 
        t.assigned_to_user_id, 
        r.user_id as reporter_id
      FROM tasks t
      INNER JOIN reports r ON t.report_id = r.report_id
      WHERE t.task_id = ? AND t.is_deleted = 0
    `, [taskId]);
    
    if (taskInfo.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    const task = taskInfo[0];
    const reportId = task.report_id;
    
    // Check if user has access:
    // 1. Admin (role_id === 3)
    // 2. Assigned volunteer
    // 3. Reporter who created the report
    const isAdmin = req.user.role_id === 3;
    const isAssignedVolunteer = task.assigned_to_user_id === userId;
    const isReporter = task.reporter_id === userId;
    
    if (!isAdmin && !isAssignedVolunteer && !isReporter) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You can only view tasks you are assigned to or reports you created'
      });
    }
    
    // Get task details
    const [tasks] = await pool.execute(`
      SELECT 
        t.task_id,
        t.report_id,
        t.assigned_to_user_id,
        t.assigned_by_user_id,
        t.status_id as task_status_id,
        ts.status_name as task_status,
        DATE_FORMAT(t.assigned_at, '%Y-%m-%d %H:%i:%s') as assigned_at,
        DATE_FORMAT(t.started_at, '%Y-%m-%d %H:%i:%s') as started_at,
        DATE_FORMAT(t.completed_at, '%Y-%m-%d %H:%i:%s') as completed_at,
        t.volunteer_responded_at,
        t.volunteer_response,
        t.declined_reason,
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
        COALESCE(u.email, '') as reporter_email,
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
      WHERE t.task_id = ?
    `, [taskId]);
    
    if (tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task details not found'
      });
    }
    
    const taskDetails = tasks[0];
    
    // Get admin notes for this report
    const [adminNotes] = await pool.execute(`
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
    
    // Get evidence for this task
    const [evidence] = await pool.execute(`
      SELECT 
        proof_id,
        task_id,
        proof_url,
        DATE_FORMAT(uploaded_at, '%Y-%m-%d %H:%i:%s') as uploaded_at
      FROM task_proofs
      WHERE task_id = ?
      ORDER BY uploaded_at DESC
    `, [taskId]);
    
    // Get completion notes for this task with volunteer names
    const [completionNotes] = await pool.execute(`
      SELECT 
        cn.note_id,
        cn.task_id,
        cn.volunteer_id,
        cn.note_text,
        DATE_FORMAT(cn.created_at, '%Y-%m-%d %H:%i:%s') as created_at,
        u.username as volunteer_name
      FROM task_completion_notes cn
      LEFT JOIN users u ON cn.volunteer_id = u.user_id
      WHERE cn.task_id = ?
      ORDER BY cn.created_at DESC
    `, [taskId]);
    
    res.json({
      success: true,
      data: {
        task: taskDetails,
        admin_notes: adminNotes,
        evidence: evidence,
        completion_notes: completionNotes
      }
    });
    
  } catch (error) {
    console.error('Error fetching task details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch task details',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;