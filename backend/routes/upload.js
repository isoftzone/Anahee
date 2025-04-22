const mysql = require("mysql");
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const BASE_URL = "http://localhost:3000"; // Change if needed

const router = express.Router();

// 🛠️ Create MySQL Connection
const db = mysql.createConnection({
  host: "4.213.43.18",
  user: "isrbs",
  password: "isoft@1209ISZ",
  database: "madhuban",
  port: 3306,
});

// 🛠️ Connect to MySQL Database
db.connect((err) => {
  if (err) console.error("DB Connection Failed:", err);
  else console.log("Connected to MySQL Database");
});

// Multer Setup for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/banner/"); // Save in "public/images/banner" folder
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// 🛠️ Upload Image API with sec_name
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { sec_name, des_l1, des_l2, des_l3 } = req.body; // Get sec_name from request
  const imageUrl = req.file.filename;
  //const uniqueFilename = imageUrl.replace(/\s+/g, '_').replace(/\..+$/, `_${Date.now()}$&`);

  // Fetch the next sequence number
  db.query("SELECT COUNT(*) AS count FROM HP_Images", (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const nextSequence = result[0].count + 1; // Assign sequence dynamically

    const sql = "INSERT INTO HP_Images (images, sequence, status, sec_name, des_l1, des_l2, des_l3) VALUES (?, ?, ?, ?,?, ?, ?)";
    db.query(sql, [imageUrl, nextSequence, 1, sec_name, des_l1, des_l2, des_l3], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      res.json({
        success: true,
        image: { id: result.insertId, filename: req.file.filename, sequence: nextSequence, status: 1, sec_name, des_l1, des_l2, des_l3 },
      });
    });
  });
});

// 🛠️ Get All Images API with sec_name
router.get("/images", (req, res) => {
  db.query("SELECT id, images, sequence, status, sec_name, des_l1, des_l2, des_l3 FROM HP_Images ORDER BY sequence ASC", (err, result) => {
    if (err) {
      console.error("Error fetching images:", err);
      return res.status(500).json({ error: "Database error while fetching images" });
    }

    res.json({
      images: result.map((row) => ({
        id: row.id,
        images: `${BASE_URL}/public/images/banner/${row.images}`,
        sequence: row.sequence,
        status: row.status,
        sec_name: row.sec_name, // Include sec_name
        des_l1: row.des_l1, // New
        des_l2: row.des_l2, // New
        des_l3: row.des_l3, // New
      })),
    });
  });
});

// 🛠️ Update Image Status API
// router.put("/images/:id/status", (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   db.query("UPDATE HP_Images SET status = ? WHERE id = ?", [status, id], (err) => {
//     if (err) {
//       console.error("Database Error:", err);
//       return res.status(500).json({ error: "Failed to update status" });
//     }
//     res.json({ message: "Status updated successfully" });
//   });
// });



// 🛠️ Update Image API
router.put("/images/:id", (req, res) => {
  const { id } = req.params;
  const { sec_name, des_l1, des_l2, des_l3 } = req.body;

  const sql = "UPDATE HP_Images SET sec_name = ?, des_l1 = ?, des_l2 = ?, des_l3 = ? WHERE id = ?";
  db.query(sql, [sec_name, des_l1, des_l2, des_l3, id], (err) => {
      if (err) {
          console.error("Database Error:", err);
          return res.status(500).json({ error: "Failed to update image data" });
      }
      res.json({ message: "Image updated successfully" });
  });
});





// 🛠️ Delete Image API
router.delete("/images/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT images, sequence FROM HP_Images WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("❌ Database Error:", err);
      return res.status(500).json({ error: "Database error while fetching image" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Image not found" });
    }

    const sequenceToDelete = result[0].sequence;
    const filePath = path.join(__dirname, "../public/images/banner/", result[0].images);

    // Delete the file
    fs.unlink(filePath, (unlinkErr) => {
      if (unlinkErr) console.error("❌ Error deleting file:", unlinkErr);
    });

    // Delete the image from the database
    db.query("DELETE FROM HP_Images WHERE id = ?", [id], (deleteErr) => {
      if (deleteErr) {
        console.error("❌ Database Error:", deleteErr);
        return res.status(500).json({ error: "Failed to delete image from database" });
      }

      // Update sequences of remaining images
      db.query(
        "UPDATE HP_Images SET sequence = sequence - 1 WHERE sequence > ?",
        [sequenceToDelete],
        (updateErr) => {
          if (updateErr) {
            console.error("❌ Error updating sequence:", updateErr);
            return res.status(500).json({ error: "Failed to update sequence" });
          }

          res.json({ message: "✅ Image deleted and sequence updated successfully" });
        }
      );
    });
  });
});

module.exports = router;
