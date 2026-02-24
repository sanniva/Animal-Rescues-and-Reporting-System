const pool = require('../config/db');

class Tracking {
  // Create tracking table
  static async createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS task_tracking (
        tracking_id INT PRIMARY KEY AUTO_INCREMENT,
        task_id INT NOT NULL,
        volunteer_id INT NOT NULL,
        latitude DECIMAL(10, 8) NOT NULL,
        longitude DECIMAL(11, 8) NOT NULL,
        accuracy FLOAT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        synced TINYINT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (task_id) REFERENCES tasks(task_id) ON DELETE CASCADE,
        FOREIGN KEY (volunteer_id) REFERENCES users(user_id) ON DELETE CASCADE,
        INDEX idx_task_timestamp (task_id, timestamp),
        INDEX idx_volunteer_timestamp (volunteer_id, timestamp)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `;
    
    try {
      const [result] = await pool.execute(sql);
      console.log('Task tracking table created or already exists');
      return result;
    } catch (error) {
      console.error('Error creating task tracking table:', error);
      throw error;
    }
  }

  // Save tracking point (for volunteer app)
  static async saveTrackingPoint(taskId, volunteerId, latitude, longitude, accuracy, synced = 1) {
    const sql = `
      INSERT INTO task_tracking 
      (task_id, volunteer_id, latitude, longitude, accuracy, timestamp, synced) 
      VALUES (?, ?, ?, ?, ?, NOW(), ?)
    `;
    
    try {
      const [result] = await pool.execute(sql, [taskId, volunteerId, latitude, longitude, accuracy, synced]);
      return {
        tracking_id: result.insertId,
        task_id: taskId,
        volunteer_id: volunteerId,
        latitude,
        longitude,
        accuracy,
        synced
      };
    } catch (error) {
      console.error('Error saving tracking point:', error);
      throw error;
    }
  }

  // Save batch tracking points (for offline sync)
  static async saveBatchTrackingPoints(points) {
    if (!points || points.length === 0) return [];
    
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      
      const savedPoints = [];
      for (const point of points) {
        const sql = `
          INSERT INTO task_tracking 
          (task_id, volunteer_id, latitude, longitude, accuracy, timestamp, synced) 
          VALUES (?, ?, ?, ?, ?, ?, 1)
        `;
        
        const [result] = await connection.execute(sql, [
          point.task_id,
          point.volunteer_id,
          point.latitude,
          point.longitude,
          point.accuracy || 0,
          point.timestamp || new Date()
        ]);
        
        savedPoints.push({
          tracking_id: result.insertId,
          ...point
        });
      }
      
      await connection.commit();
      return savedPoints;
    } catch (error) {
      await connection.rollback();
      console.error('Error saving batch tracking points:', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  // Get tracking points for a task (admin view)
  static async getTaskTrackingPoints(taskId, limit = 1000) {
    const sql = `
      SELECT 
        tt.tracking_id,
        tt.task_id,
        tt.volunteer_id,
        u.username as volunteer_name,
        tt.latitude,
        tt.longitude,
        tt.accuracy,
        tt.timestamp,
        tt.synced
      FROM task_tracking tt
      JOIN users u ON tt.volunteer_id = u.user_id
      WHERE tt.task_id = ?
      ORDER BY tt.timestamp DESC
      LIMIT ?
    `;
    
    try {
      const [rows] = await pool.execute(sql, [taskId, limit]);
      return rows;
    } catch (error) {
      console.error('Error getting task tracking points:', error);
      throw error;
    }
  }

  // Get latest tracking point for a task
  static async getLatestTrackingPoint(taskId) {
    const sql = `
      SELECT 
        tt.tracking_id,
        tt.task_id,
        tt.volunteer_id,
        u.username as volunteer_name,
        tt.latitude,
        tt.longitude,
        tt.accuracy,
        tt.timestamp
      FROM task_tracking tt
      JOIN users u ON tt.volunteer_id = u.user_id
      WHERE tt.task_id = ?
      ORDER BY tt.timestamp DESC
      LIMIT 1
    `;
    
    try {
      const [rows] = await pool.execute(sql, [taskId]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error getting latest tracking point:', error);
      throw error;
    }
  }

  // Get tracking points for a volunteer across all active tasks
  static async getVolunteerTrackingPoints(volunteerId, limit = 100) {
    const sql = `
      SELECT 
        tt.tracking_id,
        tt.task_id,
        tt.latitude,
        tt.longitude,
        tt.accuracy,
        tt.timestamp,
        r.animal_type,
        r.location_address
      FROM task_tracking tt
      JOIN tasks t ON tt.task_id = t.task_id
      JOIN reports r ON t.report_id = r.report_id
      WHERE tt.volunteer_id = ?
      ORDER BY tt.timestamp DESC
      LIMIT ?
    `;
    
    try {
      const [rows] = await pool.execute(sql, [volunteerId, limit]);
      return rows;
    } catch (error) {
      console.error('Error getting volunteer tracking points:', error);
      throw error;
    }
  }

  // Get tracking statistics for a task
  static async getTaskTrackingStats(taskId) {
    const sql = `
      SELECT 
        COUNT(*) as point_count,
        MIN(timestamp) as first_point,
        MAX(timestamp) as last_point,
        MAX(timestamp) > DATE_SUB(NOW(), INTERVAL 5 MINUTE) as is_live,
        SUM(CASE WHEN synced = 0 THEN 1 ELSE 0 END) as pending_sync_count
      FROM task_tracking
      WHERE task_id = ?
    `;
    
    try {
      const [rows] = await pool.execute(sql, [taskId]);
      return rows[0] || {
        point_count: 0,
        first_point: null,
        last_point: null,
        is_live: false,
        pending_sync_count: 0
      };
    } catch (error) {
      console.error('Error getting task tracking stats:', error);
      throw error;
    }
  }

  // Update synced status (after offline points are synced)
  static async updateSyncedStatus(trackingIds) {
    if (!trackingIds || trackingIds.length === 0) return;
    
    const placeholders = trackingIds.map(() => '?').join(',');
    const sql = `UPDATE task_tracking SET synced = 1 WHERE tracking_id IN (${placeholders})`;
    
    try {
      const [result] = await pool.execute(sql, trackingIds);
      return result.affectedRows;
    } catch (error) {
      console.error('Error updating synced status:', error);
      throw error;
    }
  }

  // Get pending sync points (unsynced)
  static async getPendingSyncPoints(volunteerId = null) {
    let sql = `
      SELECT 
        tt.tracking_id,
        tt.task_id,
        tt.volunteer_id,
        tt.latitude,
        tt.longitude,
        tt.accuracy,
        tt.timestamp
      FROM task_tracking tt
      WHERE tt.synced = 0
    `;
    
    const params = [];
    if (volunteerId) {
      sql += ' AND tt.volunteer_id = ?';
      params.push(volunteerId);
    }
    
    sql += ' ORDER BY tt.timestamp ASC';
    
    try {
      const [rows] = await pool.execute(sql, params);
      return rows;
    } catch (error) {
      console.error('Error getting pending sync points:', error);
      throw error;
    }
  }

  // Delete old tracking points (cleanup job)
  static async deleteOldPoints(daysToKeep = 30) {
    const sql = `
      DELETE FROM task_tracking 
      WHERE timestamp < DATE_SUB(NOW(), INTERVAL ? DAY)
    `;
    
    try {
      const [result] = await pool.execute(sql, [daysToKeep]);
      return result.affectedRows;
    } catch (error) {
      console.error('Error deleting old tracking points:', error);
      throw error;
    }
  }

  // Calculate distance traveled for a task
  static async calculateTaskDistance(taskId) {
    const sql = `
      SELECT 
        latitude,
        longitude,
        timestamp
      FROM task_tracking
      WHERE task_id = ?
      ORDER BY timestamp ASC
    `;
    
    try {
      const [points] = await pool.execute(sql, [taskId]);
      
      if (points.length < 2) return 0;
      
      let totalDistance = 0;
      for (let i = 1; i < points.length; i++) {
        const prev = points[i-1];
        const curr = points[i];
        
        // Haversine formula
        const R = 6371; // Earth's radius in km
        const dLat = (curr.latitude - prev.latitude) * Math.PI / 180;
        const dLng = (curr.longitude - prev.longitude) * Math.PI / 180;
        const a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(prev.latitude * Math.PI / 180) * Math.cos(curr.latitude * Math.PI / 180) * 
          Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;
        
        totalDistance += distance;
      }
      
      return Math.round(totalDistance * 100) / 100;
    } catch (error) {
      console.error('Error calculating task distance:', error);
      throw error;
    }
  }
}

module.exports = Tracking;