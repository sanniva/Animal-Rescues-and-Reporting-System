const pool = require('../config/db');

/**
 * Role-based access control middleware
 * @param {Array} allowedRoles - Array of role names allowed to access the route
 */
const roleMiddleware = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.user_id;
      
      // Get user's role
      const [rows] = await pool.execute(
        'SELECT role_id FROM users WHERE user_id = ?',
        [userId]
      );
      
      if (rows.length === 0) {
        return res.status(403).json({
          success: false,
          message: 'User not found'
        });
      }
      
      const userRole = rows[0].role_id;
      
      // Map role_id to role name based on your user_roles table
      const roleMap = {
        1: 'user',
        2: 'volunteer',
        3: 'admin'
      };
      
      const roleName = roleMap[userRole] || 'unknown';
      
      // Check if user's role is allowed
      if (!allowedRoles.includes(roleName)) {
        return res.status(403).json({
          success: false,
          message: 'Access denied. Insufficient permissions.'
        });
      }
      
      // Attach role info to request for later use
      req.user.role = roleName;
      req.user.role_id = userRole;
      
      next();
    } catch (error) {
      console.error('Role middleware error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  };
};

module.exports = roleMiddleware;