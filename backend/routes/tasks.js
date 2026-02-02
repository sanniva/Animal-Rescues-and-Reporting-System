const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// GET all tasks (protected)
router.get('/', verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM tasks');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
