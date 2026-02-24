const mysql = require('mysql2');

// Create a connection pool for XAMPP
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',  // Empty for XAMPP default
  database: process.env.DB_NAME || 'animal_rescue_system',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the pool with promise wrapper
module.exports = pool.promise();