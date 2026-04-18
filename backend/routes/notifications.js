// const express = require('express');
// const router = express.Router();
// const verifyToken = require('../middleware/auth');
// const mysql = require('mysql2/promise');
// require('dotenv').config();


// const pool = require('../config/db');

// // const pool = mysql.createPool({
// //   host: process.env.DB_HOST || 'localhost',
// //   user: process.env.DB_USER || 'root',
// //   password: process.env.DB_PASSWORD || '',
// //   database: process.env.DB_NAME || 'animal_rescue_system',
// //   waitForConnections: true,
// //   connectionLimit: 10,
// //   queueLimit: 0
// // });

// console.log('Notification routes initialized');

// // GET USER NOTIFICATIONS

// router.get('/', verifyToken, async (req, res) => {
//   const userId = req.user.user_id;
//   const { limit = 50, offset = 0 } = req.query;

//   try {
//     const [notifications] = await pool.execute(`
//       SELECT 
//         n.notification_id,
//         n.user_id,
//         n.type_id,
//         nt.type_name,
//         n.title,
//         n.message,
//         n.related_entity_type,
//         n.related_entity_id,
//         n.is_read,
//         DATE_FORMAT(n.created_at, '%Y-%m-%d %H:%i:%s') as created_at
//       FROM notifications n
//       LEFT JOIN notification_types nt ON n.type_id = nt.type_id
//       WHERE n.user_id = ?
//       ORDER BY n.created_at DESC
//       LIMIT ? OFFSET ?
//     `, [userId, parseInt(limit), parseInt(offset)]);

//     const [unreadCount] = await pool.execute(
//       'SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = 0',
//       [userId]
//     );

//     res.json({
//       success: true,
//       data: notifications,
//       unread_count: unreadCount[0].count,
//       total: notifications.length
//     });

//   } catch (error) {
//     console.error('Error fetching notifications:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch notifications',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });


// // GET RECENT NOTIFICATIONS (FOR POLLING)

// router.get('/recent', verifyToken, async (req, res) => {
//   const userId = req.user.user_id;
//   const { since } = req.query;

//   try {
//     let query = `
//       SELECT 
//         n.notification_id,
//         n.user_id,
//         n.type_id,
//         nt.type_name,
//         n.title,
//         n.message,
//         n.related_entity_type,
//         n.related_entity_id,
//         n.is_read,
//         DATE_FORMAT(n.created_at, '%Y-%m-%d %H:%i:%s') as created_at
//       FROM notifications n
//       LEFT JOIN notification_types nt ON n.type_id = nt.type_id
//       WHERE n.user_id = ?
//     `;
    
//     const params = [userId];

//     if (since) {
//       query += ' AND n.created_at > ?';
//       params.push(new Date(since));
//     }

//     query += ' ORDER BY n.created_at DESC LIMIT 10';

//     const [notifications] = await pool.execute(query, params);

//     res.json({
//       success: true,
//       data: notifications
//     });

//   } catch (error) {
//     console.error('Error fetching recent notifications:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch recent notifications',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });


// // MARK NOTIFICATION AS READ

// router.patch('/:notificationId/read', verifyToken, async (req, res) => {
//   const notificationId = Number(req.params.notificationId);
//   const userId = req.user.user_id;

//   try {
//     await pool.execute(
//       'UPDATE notifications SET is_read = 1 WHERE notification_id = ? AND user_id = ?',
//       [notificationId, userId]
//     );

//     res.json({
//       success: true,
//       message: 'Notification marked as read'
//     });

//   } catch (error) {
//     console.error('Error marking notification as read:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to mark notification as read',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });


// // MARK ALL NOTIFICATIONS AS READ

// router.patch('/read-all', verifyToken, async (req, res) => {
//   const userId = req.user.user_id;

//   try {
//     await pool.execute(
//       'UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0',
//       [userId]
//     );

//     res.json({
//       success: true,
//       message: 'All notifications marked as read'
//     });

//   } catch (error) {
//     console.error('Error marking all as read:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to mark all as read',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// // =====================================================
// // DELETE NOTIFICATION
// // =====================================================
// router.delete('/:notificationId', verifyToken, async (req, res) => {
//   const notificationId = Number(req.params.notificationId);
//   const userId = req.user.user_id;

//   try {
//     await pool.execute(
//       'DELETE FROM notifications WHERE notification_id = ? AND user_id = ?',
//       [notificationId, userId]
//     );

//     res.json({
//       success: true,
//       message: 'Notification deleted'
//     });

//   } catch (error) {
//     console.error('Error deleting notification:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete notification',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// // =====================================================
// // GET UNREAD COUNT
// // =====================================================
// router.get('/unread-count', verifyToken, async (req, res) => {
//   const userId = req.user.user_id;

//   try {
//     const [result] = await pool.execute(
//       'SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = 0',
//       [userId]
//     );

//     res.json({
//       success: true,
//       count: result[0].count
//     });

//   } catch (error) {
//     console.error('Error fetching unread count:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch unread count',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
require('dotenv').config();

const pool = require('../config/db');

console.log('Notification routes initialized');

// GET USER NOTIFICATIONS
router.get('/', verifyToken, async (req, res) => {
  const userId = req.user.user_id;
  const limit = parseInt(req.query.limit) || 50;
  const offset = parseInt(req.query.offset) || 0;

  try {
    const [notifications] = await pool.execute(`
      SELECT 
        n.notification_id,
        n.user_id,
        n.type_id,
        nt.type_name,
        n.title,
        n.message,
        n.related_entity_type,
        n.related_entity_id,
        n.is_read,
        DATE_FORMAT(n.created_at, '%Y-%m-%d %H:%i:%s') as created_at
      FROM notifications n
      LEFT JOIN notification_types nt ON n.type_id = nt.type_id
      WHERE n.user_id = ?
      ORDER BY n.created_at DESC
      LIMIT ? OFFSET ?
    `, [userId, limit, offset]);

    const [unreadCount] = await pool.execute(
      'SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = 0',
      [userId]
    );

    res.json({
      success: true,
      data: notifications,
      unread_count: unreadCount[0].count,
      total: notifications.length
    });

  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});


// GET RECENT NOTIFICATIONS (FOR POLLING)
router.get('/recent', verifyToken, async (req, res) => {
  const userId = req.user.user_id;
  const { since } = req.query;

  try {
    let query = `
      SELECT 
        n.notification_id,
        n.user_id,
        n.type_id,
        nt.type_name,
        n.title,
        n.message,
        n.related_entity_type,
        n.related_entity_id,
        n.is_read,
        DATE_FORMAT(n.created_at, '%Y-%m-%d %H:%i:%s') as created_at
      FROM notifications n
      LEFT JOIN notification_types nt ON n.type_id = nt.type_id
      WHERE n.user_id = ?
    `;

    const params = [userId];

    if (since) {
      const sinceDate = new Date(since);
      if (!isNaN(sinceDate.getTime())) {
        query += ' AND n.created_at > ?';
        params.push(sinceDate);
      }
    }

    query += ' ORDER BY n.created_at DESC LIMIT 10';

    const [notifications] = await pool.execute(query, params);

    res.json({
      success: true,
      data: notifications
    });

  } catch (error) {
    console.error('Error fetching recent notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recent notifications',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});


// GET UNREAD COUNT
router.get('/unread-count', verifyToken, async (req, res) => {
  const userId = req.user.user_id;

  try {
    const [result] = await pool.execute(
      'SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = 0',
      [userId]
    );

    res.json({
      success: true,
      count: result[0].count
    });

  } catch (error) {
    console.error('Error fetching unread count:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch unread count',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});


// MARK ALL NOTIFICATIONS AS READ  ← must be before /:notificationId routes
router.patch('/read-all', verifyToken, async (req, res) => {
  const userId = req.user.user_id;

  try {
    await pool.execute(
      'UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0',
      [userId]
    );

    res.json({
      success: true,
      message: 'All notifications marked as read'
    });

  } catch (error) {
    console.error('Error marking all as read:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark all as read',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});


// MARK NOTIFICATION AS READ
router.patch('/:notificationId/read', verifyToken, async (req, res) => {
  const notificationId = parseInt(req.params.notificationId);
  const userId = req.user.user_id;

  if (isNaN(notificationId)) {
    return res.status(400).json({ success: false, message: 'Invalid notification ID' });
  }

  try {
    await pool.execute(
      'UPDATE notifications SET is_read = 1 WHERE notification_id = ? AND user_id = ?',
      [notificationId, userId]
    );

    res.json({
      success: true,
      message: 'Notification marked as read'
    });

  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark notification as read',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});


// DELETE NOTIFICATION
router.delete('/:notificationId', verifyToken, async (req, res) => {
  const notificationId = parseInt(req.params.notificationId);
  const userId = req.user.user_id;

  if (isNaN(notificationId)) {
    return res.status(400).json({ success: false, message: 'Invalid notification ID' });
  }

  try {
    await pool.execute(
      'DELETE FROM notifications WHERE notification_id = ? AND user_id = ?',
      [notificationId, userId]
    );

    res.json({
      success: true,
      message: 'Notification deleted'
    });

  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete notification',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;