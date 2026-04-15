// // const mysql = require('mysql2');

// // const pool = mysql.createPool({
// //   host: process.env.DB_HOST || '127.0.0.1',  
// //   port: parseInt(process.env.DB_PORT) || 3306, 
// //   user: process.env.DB_USER || 'root',
// //   password: process.env.DB_PASSWORD || '',
// //   database: process.env.DB_NAME || 'animal_rescue_system',
// //   waitForConnections: true,
// //   connectionLimit: 10,
// //   queueLimit: 0
// // });

// // module.exports = pool.promise();

// const mysql = require('mysql2/promise');

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT || '3306'),
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   ssl: process.env.DB_SSL === 'REQUIRED' ? { rejectUnauthorized: false } : false,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// module.exports = pool;


const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'REQUIRED' ? { rejectUnauthorized: false } : false,
  connectTimeout: 60000,
  waitForConnections: true,
  connectionLimit: 2,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  idleTimeout: 30000,
});

// Keep connections alive
setInterval(async () => {
  try {
    await pool.query('SELECT 1');
  } catch (err) {
    console.error('Keep-alive ping failed:', err.message);
  }
}, 30000);

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully!');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

testConnection();

module.exports = pool;