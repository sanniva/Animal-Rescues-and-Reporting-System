// // backend/controllers/adminTrackingController.js
// const pool = require('../config/db');
// const Tracking = require('../models/Tracking');

// // Helper function to calculate distance between coordinates
// const calculateDistance = (lat1, lng1, lat2, lng2) => {
//   const R = 6371; // Earth's radius in km
//   const dLat = (lat2 - lat1) * Math.PI / 180;
//   const dLng = (lng2 - lng1) * Math.PI / 180;
//   const a = 
//     Math.sin(dLat/2) * Math.sin(dLat/2) +
//     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
//     Math.sin(dLng/2) * Math.sin(dLng/2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//   return R * c;
// };

// // Get all tracking points for a specific task (route)
// exports.getTaskTrackingRoute = async (req, res) => {
//   try {
//     const { taskId } = req.params;
    
//     // Check if task exists
//     const [taskCheck] = await pool.execute(
//       'SELECT task_id, report_id FROM tasks WHERE task_id = ? AND is_deleted = 0',
//       [taskId]
//     );
    
//     if (taskCheck.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Task not found'
//       });
//     }

//     // Get tracking points
//     const points = await Tracking.getTaskTrackingPoints(taskId, 1000);
    
//     // Calculate statistics
//     let stats = {
//       totalPoints: points.length,
//       startTime: points.length > 0 ? points[points.length - 1].timestamp : null,
//       endTime: points.length > 0 ? points[0].timestamp : null,
//       totalDistance: 0,
//       averageAccuracy: 0,
//       pendingSync: points.filter(p => !p.synced).length
//     };

//     // Calculate total distance
//     if (points.length >= 2) {
//       for (let i = 1; i < points.length; i++) {
//         stats.totalDistance += calculateDistance(
//           parseFloat(points[i-1].latitude),
//           parseFloat(points[i-1].longitude),
//           parseFloat(points[i].latitude),
//           parseFloat(points[i].longitude)
//         );
//       }
//       stats.totalDistance = Math.round(stats.totalDistance * 100) / 100;
//     }

//     // Calculate average accuracy
//     if (points.length > 0) {
//       const totalAccuracy = points.reduce((sum, p) => sum + (p.accuracy || 0), 0);
//       stats.averageAccuracy = Math.round(totalAccuracy / points.length);
//     }

//     res.json({
//       success: true,
//       data: points,
//       stats: stats
//     });
//   } catch (error) {
//     console.error('Error getting task tracking route:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to get tracking data',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// // Get latest tracking point for a task
// exports.getLatestTrackingPoint = async (req, res) => {
//   try {
//     const { taskId } = req.params;
    
//     const latestPoint = await Tracking.getLatestTrackingPoint(taskId);
    
//     if (!latestPoint) {
//       return res.json({
//         success: true,
//         data: null,
//         message: 'No tracking points found'
//       });
//     }

//     // Check if point is live (within last 5 minutes)
//     const isLive = new Date(latestPoint.timestamp) > new Date(Date.now() - 5 * 60 * 1000);

//     res.json({
//       success: true,
//       data: {
//         ...latestPoint,
//         isLive
//       }
//     });
//   } catch (error) {
//     console.error('Error getting latest tracking point:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to get latest tracking point',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// // Get tracking statistics for a task
// exports.getTaskTrackingStats = async (req, res) => {
//   try {
//     const { taskId } = req.params;
    
//     const stats = await Tracking.getTaskTrackingStats(taskId);
//     const distance = await Tracking.calculateTaskDistance(taskId);
    
//     res.json({
//       success: true,
//       data: {
//         ...stats,
//         distance: distance
//       }
//     });
//   } catch (error) {
//     console.error('Error getting task tracking stats:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to get tracking statistics',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// // Get all active tasks with latest tracking info
// exports.getActiveTasksTracking = async (req, res) => {
//   try {
//     // Get all assigned and in-progress tasks
//     const [tasks] = await pool.execute(`
//       SELECT 
//         t.task_id,
//         t.report_id,
//         t.assigned_to_user_id as volunteer_id,
//         u.username as volunteer_name,
//         r.animal_type,
//         r.location_address,
//         rs.status_name
//       FROM tasks t
//       JOIN reports r ON t.report_id = r.report_id
//       JOIN users u ON t.assigned_to_user_id = u.user_id
//       JOIN report_statuses rs ON r.status_id = rs.status_id
//       WHERE t.status_id IN (2, 3) -- Assigned or In Progress (adjust based on your status IDs)
//         AND t.is_deleted = 0
//       ORDER BY t.assigned_at DESC
//     `);
    
//     const trackingData = await Promise.all(tasks.map(async (task) => {
//       const latestPoint = await Tracking.getLatestTrackingPoint(task.task_id);
//       const stats = await Tracking.getTaskTrackingStats(task.task_id);
//       const distance = await Tracking.calculateTaskDistance(task.task_id);
      
//       return {
//         task_id: task.task_id,
//         report_id: task.report_id,
//         volunteer_id: task.volunteer_id,
//         volunteer_name: task.volunteer_name,
//         animal_type: task.animal_type,
//         location_address: task.location_address,
//         status: task.status_name,
//         tracking: {
//           hasTracking: !!latestPoint,
//           latestPoint: latestPoint,
//           pointCount: stats.point_count || 0,
//           isLive: stats.is_live === 1,
//           distance: distance,
//           lastSeen: latestPoint?.timestamp || null
//         }
//       };
//     }));
    
//     res.json({
//       success: true,
//       data: trackingData
//     });
//   } catch (error) {
//     console.error('Error getting active tasks tracking:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to get active tasks tracking',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// // Get pending sync points (for monitoring)
// exports.getPendingSyncPoints = async (req, res) => {
//   try {
//     const { volunteerId } = req.query;
    
//     const pendingPoints = await Tracking.getPendingSyncPoints(volunteerId);
    
//     res.json({
//       success: true,
//       data: pendingPoints,
//       count: pendingPoints.length
//     });
//   } catch (error) {
//     console.error('Error getting pending sync points:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to get pending sync points',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// // Get tracking history for a volunteer
// exports.getVolunteerTrackingHistory = async (req, res) => {
//   try {
//     const { volunteerId } = req.params;
//     const { days = 7 } = req.query;
    
//     const sql = `
//       SELECT 
//         tt.*,
//         t.report_id,
//         r.animal_type,
//         r.location_address
//       FROM task_tracking tt
//       JOIN tasks t ON tt.task_id = t.task_id
//       JOIN reports r ON t.report_id = r.report_id
//       WHERE tt.volunteer_id = ?
//         AND tt.timestamp > DATE_SUB(NOW(), INTERVAL ? DAY)
//       ORDER BY tt.timestamp DESC
//     `;
    
//     const [rows] = await pool.execute(sql, [volunteerId, days]);
    
//     // Group by task
//     const tasks = {};
//     rows.forEach(point => {
//       if (!tasks[point.task_id]) {
//         tasks[point.task_id] = {
//           task_id: point.task_id,
//           report_id: point.report_id,
//           animal_type: point.animal_type,
//           location_address: point.location_address,
//           points: []
//         };
//       }
//       tasks[point.task_id].points.push({
//         latitude: point.latitude,
//         longitude: point.longitude,
//         accuracy: point.accuracy,
//         timestamp: point.timestamp
//       });
//     });
    
//     res.json({
//       success: true,
//       data: Object.values(tasks)
//     });
//   } catch (error) {
//     console.error('Error getting volunteer tracking history:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to get volunteer tracking history',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// // Export tracking data as GeoJSON
// exports.exportTrackingAsGeoJSON = async (req, res) => {
//   try {
//     const { taskId } = req.params;
    
//     const points = await Tracking.getTaskTrackingPoints(taskId);
    
//     const geojson = {
//       type: "FeatureCollection",
//       features: points.map(point => ({
//         type: "Feature",
//         geometry: {
//           type: "Point",
//           coordinates: [parseFloat(point.longitude), parseFloat(point.latitude)]
//         },
//         properties: {
//           tracking_id: point.tracking_id,
//           timestamp: point.timestamp,
//           accuracy: point.accuracy,
//           volunteer_name: point.volunteer_name,
//           synced: point.synced
//         }
//       }))
//     };
    
//     // Add line string if there are multiple points
//     if (points.length >= 2) {
//       const lineString = {
//         type: "Feature",
//         geometry: {
//           type: "LineString",
//           coordinates: points.map(point => [parseFloat(point.longitude), parseFloat(point.latitude)])
//         },
//         properties: {
//           type: "route",
//           point_count: points.length
//         }
//       };
//       geojson.features.push(lineString);
//     }
    
//     res.json({
//       success: true,
//       data: geojson
//     });
//   } catch (error) {
//     console.error('Error exporting tracking as GeoJSON:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to export tracking data',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// // =====================================================
// // VOLUNTEER TRACKING ENDPOINTS (for the mobile app)
// // =====================================================

// // Save a single tracking point (volunteer app)
// exports.saveTrackingPoint = async (req, res) => {
//   try {
//     const { taskId, latitude, longitude, accuracy } = req.body;
//     const volunteerId = req.user.user_id;
    
//     if (!taskId || !latitude || !longitude) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing required fields: taskId, latitude, longitude'
//       });
//     }
    
//     // Check if task is assigned to this volunteer
//     const [taskCheck] = await pool.execute(
//       'SELECT task_id FROM tasks WHERE task_id = ? AND assigned_to_user_id = ? AND is_deleted = 0',
//       [taskId, volunteerId]
//     );
    
//     if (taskCheck.length === 0) {
//       return res.status(403).json({
//         success: false,
//         message: 'Task not found or not assigned to you'
//       });
//     }
    
//     const point = await Tracking.saveTrackingPoint(
//       taskId, 
//       volunteerId, 
//       latitude, 
//       longitude, 
//       accuracy || 0,
//       1 // synced
//     );
    
//     res.json({
//       success: true,
//       message: 'Tracking point saved',
//       data: point
//     });
//   } catch (error) {
//     console.error('Error saving tracking point:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to save tracking point',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// // Save batch tracking points (for offline sync)
// exports.saveBatchTrackingPoints = async (req, res) => {
//   try {
//     const { points } = req.body;
//     const volunteerId = req.user.user_id;
    
//     if (!points || !Array.isArray(points) || points.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'No points to save'
//       });
//     }
    
//     // Validate that all points belong to tasks assigned to this volunteer
//     const taskIds = [...new Set(points.map(p => p.taskId))];
    
//     for (const taskId of taskIds) {
//       const [taskCheck] = await pool.execute(
//         'SELECT task_id FROM tasks WHERE task_id = ? AND assigned_to_user_id = ? AND is_deleted = 0',
//         [taskId, volunteerId]
//       );
      
//       if (taskCheck.length === 0) {
//         return res.status(403).json({
//           success: false,
//           message: `Task ${taskId} not found or not assigned to you`
//         });
//       }
//     }
    
//     // Format points for batch insert
//     const formattedPoints = points.map(p => ({
//       task_id: p.taskId,
//       volunteer_id: volunteerId,
//       latitude: p.latitude,
//       longitude: p.longitude,
//       accuracy: p.accuracy || 0,
//       timestamp: p.timestamp || new Date()
//     }));
    
//     const savedPoints = await Tracking.saveBatchTrackingPoints(formattedPoints);
    
//     res.json({
//       success: true,
//       message: `${savedPoints.length} tracking points saved`,
//       data: savedPoints
//     });
//   } catch (error) {
//     console.error('Error saving batch tracking points:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to save batch tracking points',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// // Get pending sync points for a volunteer
// exports.getVolunteerPendingSync = async (req, res) => {
//   try {
//     const volunteerId = req.user.user_id;
    
//     const pendingPoints = await Tracking.getPendingSyncPoints(volunteerId);
    
//     res.json({
//       success: true,
//       data: pendingPoints,
//       count: pendingPoints.length
//     });
//   } catch (error) {
//     console.error('Error getting pending sync points:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to get pending sync points',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// // Mark points as synced
// exports.markPointsAsSynced = async (req, res) => {
//   try {
//     const { trackingIds } = req.body;
//     const volunteerId = req.user.user_id;
    
//     if (!trackingIds || !Array.isArray(trackingIds) || trackingIds.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'No tracking IDs provided'
//       });
//     }
    
//     // Verify that these points belong to the volunteer
//     const placeholders = trackingIds.map(() => '?').join(',');
//     const [verify] = await pool.execute(
//       `SELECT tracking_id FROM task_tracking 
//        WHERE tracking_id IN (${placeholders}) AND volunteer_id = ?`,
//       [...trackingIds, volunteerId]
//     );
    
//     if (verify.length !== trackingIds.length) {
//       return res.status(403).json({
//         success: false,
//         message: 'Some points do not belong to you'
//       });
//     }
    
//     const affectedRows = await Tracking.updateSyncedStatus(trackingIds);
    
//     res.json({
//       success: true,
//       message: `${affectedRows} points marked as synced`
//     });
//   } catch (error) {
//     console.error('Error marking points as synced:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to mark points as synced',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };


// backend/controllers/adminTrackingController.js
const pool = require('../config/db');
const Tracking = require('../models/Tracking');

// Helper function to calculate distance between coordinates
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Get all tracking points for a specific task (route)
exports.getTaskTrackingRoute = async (req, res) => {
  try {
    const { taskId } = req.params;
    
    // Check if task exists
    const [taskCheck] = await pool.execute(
      'SELECT task_id, report_id FROM tasks WHERE task_id = ? AND is_deleted = 0',
      [taskId]
    );
    
    if (taskCheck.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Get tracking points
    const points = await Tracking.getTaskTrackingPoints(taskId, 1000);
    
    // Calculate statistics
    let stats = {
      totalPoints: points.length,
      startTime: points.length > 0 ? points[points.length - 1].timestamp : null,
      endTime: points.length > 0 ? points[0].timestamp : null,
      totalDistance: 0,
      averageAccuracy: 0,
      pendingSync: points.filter(p => !p.synced).length
    };

    // Calculate total distance
    if (points.length >= 2) {
      for (let i = 1; i < points.length; i++) {
        stats.totalDistance += calculateDistance(
          parseFloat(points[i-1].latitude),
          parseFloat(points[i-1].longitude),
          parseFloat(points[i].latitude),
          parseFloat(points[i].longitude)
        );
      }
      stats.totalDistance = Math.round(stats.totalDistance * 100) / 100;
    }

    // Calculate average accuracy
    if (points.length > 0) {
      const totalAccuracy = points.reduce((sum, p) => sum + (p.accuracy || 0), 0);
      stats.averageAccuracy = Math.round(totalAccuracy / points.length);
    }

    res.json({
      success: true,
      data: points,
      stats: stats
    });
  } catch (error) {
    console.error('Error getting task tracking route:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get tracking data',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get latest tracking point for a task
exports.getLatestTrackingPoint = async (req, res) => {
  try {
    const { taskId } = req.params;
    
    const latestPoint = await Tracking.getLatestTrackingPoint(taskId);
    
    if (!latestPoint) {
      return res.json({
        success: true,
        data: null,
        message: 'No tracking points found'
      });
    }

    // Check if point is live (within last 5 minutes)
    const isLive = new Date(latestPoint.timestamp) > new Date(Date.now() - 5 * 60 * 1000);

    res.json({
      success: true,
      data: {
        ...latestPoint,
        isLive
      }
    });
  } catch (error) {
    console.error('Error getting latest tracking point:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get latest tracking point',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get tracking statistics for a task
exports.getTaskTrackingStats = async (req, res) => {
  try {
    const { taskId } = req.params;
    
    const stats = await Tracking.getTaskTrackingStats(taskId);
    const distance = await Tracking.calculateTaskDistance(taskId);
    
    res.json({
      success: true,
      data: {
        ...stats,
        distance: distance
      }
    });
  } catch (error) {
    console.error('Error getting task tracking stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get tracking statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all active tasks with latest tracking info
exports.getActiveTasksTracking = async (req, res) => {
  try {
    // Get all assigned and in-progress tasks
    const [tasks] = await pool.execute(`
      SELECT 
        t.task_id,
        t.report_id,
        t.assigned_to_user_id as volunteer_id,
        u.username as volunteer_name,
        r.animal_type,
        r.location_address,
        rs.status_name
      FROM tasks t
      JOIN reports r ON t.report_id = r.report_id
      JOIN users u ON t.assigned_to_user_id = u.user_id
      JOIN report_statuses rs ON r.status_id = rs.status_id
      WHERE t.status_id IN (2, 3) -- Assigned or In Progress (adjust based on your status IDs)
        AND t.is_deleted = 0
      ORDER BY t.assigned_at DESC
    `);
    
    const trackingData = await Promise.all(tasks.map(async (task) => {
      const latestPoint = await Tracking.getLatestTrackingPoint(task.task_id);
      const stats = await Tracking.getTaskTrackingStats(task.task_id);
      const distance = await Tracking.calculateTaskDistance(task.task_id);
      
      return {
        task_id: task.task_id,
        report_id: task.report_id,
        volunteer_id: task.volunteer_id,
        volunteer_name: task.volunteer_name,
        animal_type: task.animal_type,
        location_address: task.location_address,
        status: task.status_name,
        tracking: {
          hasTracking: !!latestPoint,
          latestPoint: latestPoint,
          pointCount: stats.point_count || 0,
          isLive: stats.is_live === 1,
          distance: distance,
          lastSeen: latestPoint?.timestamp || null
        }
      };
    }));
    
    res.json({
      success: true,
      data: trackingData
    });
  } catch (error) {
    console.error('Error getting active tasks tracking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get active tasks tracking',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get pending sync points (for monitoring)
exports.getPendingSyncPoints = async (req, res) => {
  try {
    const { volunteerId } = req.query;
    
    const pendingPoints = await Tracking.getPendingSyncPoints(volunteerId);
    
    res.json({
      success: true,
      data: pendingPoints,
      count: pendingPoints.length
    });
  } catch (error) {
    console.error('Error getting pending sync points:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get pending sync points',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get tracking history for a volunteer
exports.getVolunteerTrackingHistory = async (req, res) => {
  try {
    const { volunteerId } = req.params;
    const { days = 7 } = req.query;
    
    const sql = `
      SELECT 
        tt.*,
        t.report_id,
        r.animal_type,
        r.location_address
      FROM task_tracking tt
      JOIN tasks t ON tt.task_id = t.task_id
      JOIN reports r ON t.report_id = r.report_id
      WHERE tt.volunteer_id = ?
        AND tt.timestamp > DATE_SUB(NOW(), INTERVAL ? DAY)
      ORDER BY tt.timestamp DESC
    `;
    
    const [rows] = await pool.execute(sql, [volunteerId, days]);
    
    // Group by task
    const tasks = {};
    rows.forEach(point => {
      if (!tasks[point.task_id]) {
        tasks[point.task_id] = {
          task_id: point.task_id,
          report_id: point.report_id,
          animal_type: point.animal_type,
          location_address: point.location_address,
          points: []
        };
      }
      tasks[point.task_id].points.push({
        latitude: point.latitude,
        longitude: point.longitude,
        accuracy: point.accuracy,
        timestamp: point.timestamp
      });
    });
    
    res.json({
      success: true,
      data: Object.values(tasks)
    });
  } catch (error) {
    console.error('Error getting volunteer tracking history:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get volunteer tracking history',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Export tracking data as GeoJSON
exports.exportTrackingAsGeoJSON = async (req, res) => {
  try {
    const { taskId } = req.params;
    
    const points = await Tracking.getTaskTrackingPoints(taskId);
    
    const geojson = {
      type: "FeatureCollection",
      features: points.map(point => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [parseFloat(point.longitude), parseFloat(point.latitude)]
        },
        properties: {
          tracking_id: point.tracking_id,
          timestamp: point.timestamp,
          accuracy: point.accuracy,
          volunteer_name: point.volunteer_name,
          synced: point.synced
        }
      }))
    };
    
    // Add line string if there are multiple points
    if (points.length >= 2) {
      const lineString = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: points.map(point => [parseFloat(point.longitude), parseFloat(point.latitude)])
        },
        properties: {
          type: "route",
          point_count: points.length
        }
      };
      geojson.features.push(lineString);
    }
    
    res.json({
      success: true,
      data: geojson
    });
  } catch (error) {
    console.error('Error exporting tracking as GeoJSON:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export tracking data',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// =====================================================
// VOLUNTEER TRACKING ENDPOINTS (for the mobile app)
// =====================================================

// Save a single tracking point (volunteer app)
exports.saveTrackingPoint = async (req, res) => {
  try {
    const { taskId, latitude, longitude, accuracy } = req.body;
    const volunteerId = req.user.user_id;
    
    if (!taskId || !latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: taskId, latitude, longitude'
      });
    }
    
    // Check if task is assigned to this volunteer
    const [taskCheck] = await pool.execute(
      'SELECT task_id FROM tasks WHERE task_id = ? AND assigned_to_user_id = ? AND is_deleted = 0',
      [taskId, volunteerId]
    );
    
    if (taskCheck.length === 0) {
      return res.status(403).json({
        success: false,
        message: 'Task not found or not assigned to you'
      });
    }
    
    const point = await Tracking.saveTrackingPoint(
      taskId, 
      volunteerId, 
      latitude, 
      longitude, 
      accuracy || 0,
      1 // synced
    );
    
    res.json({
      success: true,
      message: 'Tracking point saved',
      data: point
    });
  } catch (error) {
    console.error('Error saving tracking point:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save tracking point',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Save batch tracking points (for offline sync)
exports.saveBatchTrackingPoints = async (req, res) => {
  try {
    const { points } = req.body;
    const volunteerId = req.user.user_id;
    
    if (!points || !Array.isArray(points) || points.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No points to save'
      });
    }
    
    // Validate that all points belong to tasks assigned to this volunteer
    const taskIds = [...new Set(points.map(p => p.taskId))];
    
    for (const taskId of taskIds) {
      const [taskCheck] = await pool.execute(
        'SELECT task_id FROM tasks WHERE task_id = ? AND assigned_to_user_id = ? AND is_deleted = 0',
        [taskId, volunteerId]
      );
      
      if (taskCheck.length === 0) {
        return res.status(403).json({
          success: false,
          message: `Task ${taskId} not found or not assigned to you`
        });
      }
    }
    
    // Format points for batch insert
    const formattedPoints = points.map(p => ({
      task_id: p.taskId,
      volunteer_id: volunteerId,
      latitude: p.latitude,
      longitude: p.longitude,
      accuracy: p.accuracy || 0,
      timestamp: p.timestamp || new Date()
    }));
    
    const savedPoints = await Tracking.saveBatchTrackingPoints(formattedPoints);
    
    res.json({
      success: true,
      message: `${savedPoints.length} tracking points saved`,
      data: savedPoints
    });
  } catch (error) {
    console.error('Error saving batch tracking points:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save batch tracking points',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get pending sync points for a volunteer
exports.getVolunteerPendingSync = async (req, res) => {
  try {
    const volunteerId = req.user.user_id;
    
    const pendingPoints = await Tracking.getPendingSyncPoints(volunteerId);
    
    res.json({
      success: true,
      data: pendingPoints,
      count: pendingPoints.length
    });
  } catch (error) {
    console.error('Error getting pending sync points:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get pending sync points',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Mark points as synced
exports.markPointsAsSynced = async (req, res) => {
  try {
    const { trackingIds } = req.body;
    const volunteerId = req.user.user_id;
    
    if (!trackingIds || !Array.isArray(trackingIds) || trackingIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No tracking IDs provided'
      });
    }
    
    // Verify that these points belong to the volunteer
    const placeholders = trackingIds.map(() => '?').join(',');
    const [verify] = await pool.execute(
      `SELECT tracking_id FROM task_tracking 
       WHERE tracking_id IN (${placeholders}) AND volunteer_id = ?`,
      [...trackingIds, volunteerId]
    );
    
    if (verify.length !== trackingIds.length) {
      return res.status(403).json({
        success: false,
        message: 'Some points do not belong to you'
      });
    }
    
    const affectedRows = await Tracking.updateSyncedStatus(trackingIds);
    
    res.json({
      success: true,
      message: `${affectedRows} points marked as synced`
    });
  } catch (error) {
    console.error('Error marking points as synced:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark points as synced',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ===========================================
// COMPLETE TASK - WITH AUTO CLEANUP OF TRACKING POINTS
// ===========================================
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
      
      // ===========================================
      // 🔴 DELETE ALL TRACKING POINTS FOR THIS TASK
      // ===========================================
      const [deleteResult] = await connection.execute(
        `DELETE FROM task_tracking 
         WHERE task_id = ?`,
        [taskId]
      );
      
      console.log(`✅ Task ${taskId} completed by volunteer ${volunteerId}`);
      console.log(`🗑️ Deleted ${deleteResult.affectedRows} tracking points`);
      
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

// ===========================================
// GET ALL TASKS FOR VOLUNTEER
// ===========================================
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

// ===========================================
// NEW: RESET ABANDONED TASKS (24h+ with no completion)
// ===========================================
exports.resetAbandonedTasks = async (req, res) => {
  try {
    // Find tasks in progress for 24+ hours that have tracking points
    const [tasks] = await pool.execute(`
      SELECT DISTINCT t.task_id, t.assigned_to_user_id
      FROM tasks t
      WHERE t.status_id = 2 
        AND t.assigned_at < DATE_SUB(NOW(), INTERVAL 24 HOUR)
        AND EXISTS (
          SELECT 1 FROM task_tracking 
          WHERE task_id = t.task_id
        )
    `);
    
    console.log(`Found ${tasks.length} abandoned tasks to reset`);
    
    const results = [];
    
    for (const task of tasks) {
      // Get the latest tracking point (where volunteer is NOW)
      const [latest] = await pool.execute(
        'SELECT * FROM task_tracking WHERE task_id = ? ORDER BY timestamp DESC LIMIT 1',
        [task.task_id]
      );
      
      if (latest.length > 0) {
        const point = latest[0];
        
        // Delete ALL old tracking points
        const [deleteResult] = await pool.execute(
          'DELETE FROM task_tracking WHERE task_id = ?',
          [task.task_id]
        );
        
        // Insert ONLY the latest point back
        await pool.execute(
          `INSERT INTO task_tracking 
           (task_id, volunteer_id, latitude, longitude, accuracy, timestamp, synced) 
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            point.task_id,
            point.volunteer_id,
            point.latitude,
            point.longitude,
            point.accuracy,
            point.timestamp,
            point.synced
          ]
        );
        
        results.push({
          task_id: task.task_id,
          deleted_points: deleteResult.affectedRows,
          kept_point: point.timestamp
        });
        
        console.log(`✅ Reset task ${task.task_id}: Deleted ${deleteResult.affectedRows} old points, kept latest from ${point.timestamp}`);
      }
    }
    
    res.json({
      success: true,
      message: `Reset ${results.length} abandoned tasks`,
      data: results
    });
    
  } catch (error) {
    console.error('Error resetting abandoned tasks:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset abandoned tasks',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};