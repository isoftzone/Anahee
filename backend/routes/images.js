const express = require("express");
const mysql = require("mysql2");
const router = express.Router();

const BASE_URL = process.env.BASE_URL || "http://localhost:3000"; // Ensure correct env variable

// Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "4.213.43.18",
  user: process.env.DB_USER || "isrbs",
  password: process.env.DB_PASS || "isoft@1209ISZ",
  database: process.env.DB_NAME || "madhuban",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// Fetch banner images from the database
router.get("/images", (req, res) => {
  db.query("SELECT * FROM images ORDER BY id DESC LIMIT 5", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching images" });
    }

    res.json({
      images: results.map((row) => ({
        id: row.id,
        url: `${BASE_URL}/public/${row.image_path}`, // Use BASE_URL for full path
      })),
    });
  });
});

module.exports = router;
