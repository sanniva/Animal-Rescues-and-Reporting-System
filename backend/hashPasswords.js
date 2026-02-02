const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function hashPasswords() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  // Example passwords for your users
  const users = [
    { username: 'admin1', password: 'admin123' },
    { username: 'volunteer1', password: 'volunteer123' },
    { username: 'user1', password: 'user123' },
  ];

  for (const user of users) {
    const hash = await bcrypt.hash(user.password, 10);

    await pool.execute(
      'UPDATE users SET password_hash = ? WHERE username = ?',
      [hash, user.username]
    );
    console.log(`Password for ${user.username} hashed`);
  }

  console.log('All passwords updated!');
  process.exit();
}

hashPasswords().catch(console.error);
