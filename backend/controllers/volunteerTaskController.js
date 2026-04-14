const pool = require('../config/db');


// COMPLETE TASK - WITH AUTO CLEANUP OF TRACKING POINTS

exports.completeTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const volunteerId = req.user.user_id;
    
    // Start transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    
    try {
      // 1. Check if task exists and belongs to this volunteer
      const [taskCheck] = await connection.execute(
        'SELECT task_id, status_id FROM tasks WHERE task_id = ? AND assigned_to_user_id = ?',
        [taskId, volunteerId]
      );
      
      if (taskCheck.length === 0) {
        await connection.rollback();
        connection.release();
        return res.status(404).json({
          success: false,
          message: 'Task not found or not assigned to you'
        });
      }
      
      if (taskCheck[0].status_id === 3) {
        await connection.rollback();
        connection.release();
        return res.status(400).json({
          success: false,
          message: 'Task is already completed'
        });
      }
      
      // 2. Update task status to completed
      await connection.execute(
        `UPDATE tasks 
         SET status_id = 3, 
             completed_at = NOW() 
         WHERE task_id = ? AND assigned_to_user_id = ?`,
        [taskId, volunteerId]
      );
      
     
      // KEY PART: DELETE ALL TRACKING POINTS FOR THIS TASK

      const [deleteResult] = await connection.execute(
        `DELETE FROM task_tracking 
         WHERE task_id = ?`,
        [taskId]
      );
      
      console.log(`Task ${taskId} completed by volunteer ${volunteerId}`);
      console.log(`Deleted ${deleteResult.affectedRows} tracking points`);
      
      // 3. Update report status to Completed (assuming status_id 4)
      await connection.execute(
        `UPDATE reports 
         SET status_id = 4 
         WHERE report_id = (SELECT report_id FROM tasks WHERE task_id = ?)`,
        [taskId]
      );
      
      // 4. Commit transaction
      await connection.commit();
      connection.release();
      
      res.json({
        success: true,
        message: 'Task completed successfully',
        data: {
          taskId: taskId,
          pointsDeleted: deleteResult.affectedRows,
          completedAt: new Date()
        }
      });
      
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
    
  } catch (error) {
    console.error('Error completing task:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to complete task',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


// GET ALL TASKS FOR VOLUNTEER

exports.getVolunteerTasks = async (req, res) => {
  try {
    const volunteerId = req.user.user_id;
    
    const [tasks] = await pool.execute(`
      SELECT 
        t.task_id,
        t.report_id,
        t.assigned_to_user_id,
        t.assigned_by_user_id,
        t.status_id as task_status_id,
        rs.status_name as task_status,
        t.assigned_at,
        t.started_at,
        t.completed_at,
        t.volunteer_responded_at,
        t.volunteer_response,
        t.declined_reason,
        
        r.user_id,
        r.description,
        r.location_address,
        r.user_note,
        r.submitted_at,
        r.animal_type,
        r.animal_condition,
        r.status_id as report_status_id,
        r_status.status_name as report_status,
        
        u.username as reporter_name,
        u.phone as reporter_phone,
        u.email as reporter_email,
        
        v.username as volunteer_name,
        v.email as volunteer_email,
        v.phone as volunteer_phone
        
      FROM tasks t
      JOIN reports r ON t.report_id = r.report_id
      JOIN report_statuses rs ON t.status_id = rs.status_id
      JOIN report_statuses r_status ON r.status_id = r_status.status_id
      JOIN users u ON r.user_id = u.user_id
      LEFT JOIN users v ON t.assigned_to_user_id = v.user_id
      WHERE t.assigned_to_user_id = ?
        AND t.is_deleted = 0
      ORDER BY 
        CASE 
          WHEN t.status_id = 1 THEN 1  -- Pending first
          WHEN t.status_id = 2 THEN 2  -- Active second
          WHEN t.status_id = 3 THEN 3  -- Completed last
          ELSE 4
        END,
        t.assigned_at DESC
    `, [volunteerId]);
    
    res.json({
      success: true,
      data: tasks
    });
    
  } catch (error) {
    console.error('Error getting volunteer tasks:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get tasks'
    });
  }
};

// ===========================================
// ACCEPT TASK
// ===========================================
exports.acceptTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const volunteerId = req.user.user_id;
    
    // Check if task exists and is pending
    const [taskCheck] = await pool.execute(
      'SELECT task_id FROM tasks WHERE task_id = ? AND assigned_to_user_id = ? AND status_id = 1',
      [taskId, volunteerId]
    );
    
    if (taskCheck.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or not in pending status'
      });
    }
    
    // Update task to active
    await pool.execute(
      `UPDATE tasks 
       SET status_id = 2, 
           started_at = NOW(),
           volunteer_responded_at = NOW(),
           volunteer_response = 'accepted'
       WHERE task_id = ?`,
      [taskId]
    );
    
    // Update report status to In Progress (status_id 3)
    await pool.execute(
      `UPDATE reports 
       SET status_id = 3 
       WHERE report_id = (SELECT report_id FROM tasks WHERE task_id = ?)`,
      [taskId]
    );
    
    res.json({
      success: true,
      message: 'Task accepted successfully'
    });
    
  } catch (error) {
    console.error('Error accepting task:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to accept task'
    });
  }
};

// ===========================================
// DECLINE TASK
// ===========================================
exports.declineTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const volunteerId = req.user.user_id;
    const { reason } = req.body;
    
    if (!reason) {
      return res.status(400).json({
        success: false,
        message: 'Decline reason is required'
      });
    }
    
    // Check if task exists and is pending
    const [taskCheck] = await pool.execute(
      'SELECT task_id FROM tasks WHERE task_id = ? AND assigned_to_user_id = ? AND status_id = 1',
      [taskId, volunteerId]
    );
    
    if (taskCheck.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or not in pending status'
      });
    }
    
    // Update task to declined (status_id 4)
    await pool.execute(
      `UPDATE tasks 
       SET status_id = 4, 
           volunteer_responded_at = NOW(),
           volunteer_response = 'declined',
           declined_reason = ?
       WHERE task_id = ?`,
      [reason, taskId]
    );
    
    // Update report status back to Submitted (status_id 1)
    await pool.execute(
      `UPDATE reports 
       SET status_id = 1 
       WHERE report_id = (SELECT report_id FROM tasks WHERE task_id = ?)`,
      [taskId]
    );
    
    res.json({
      success: true,
      message: 'Task declined successfully'
    });
    
  } catch (error) {
    console.error('Error declining task:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to decline task'
    });
  }
};
