const mysql = require("mysql");
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const con = require('../config')
const BASE_URL = "http://localhost:3000"; // Change if needed

const router = express.Router();

// Multer Setup for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/banner/"); // Save in "public/images/banner" folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
// router.post("/photoupload", upload.array("photo", 5), (req, res) => {
//   // Ensure files are uploaded correctly
//   const itemId = req.body.ItemId;

//   if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ error: "No image file uploaded" });
//   }
//   if (!itemId) {
//     return res.status(400).json({ error: 'ItemId is required' });
//   }
//   const photoUrls = req.files.map(file => `/images/banner/${file.filename}`);

//   db.query("INSERT INTO itemimage (PHOTO) VALUES (?)", [JSON.stringify(photoUrls)], (err, result) => {
//       if (err) return res.status(500).json({ error: "Database error", detail: err });

//       res.json({ success: true, images: photoUrls });
//   });
// });

router.post("/photoupload", upload.array("photo", 6), async (req, res) => {
  try {
    const itemId = req.body.ItemId;
    
    // Ensure files are uploaded correctly
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No image file uploaded" });
    }

    if (!itemId) {
      return res.status(400).json({ error: 'ItemId is required' });
    }

    // Collect all photo URLs and join them as a comma-separated string
    const photoUrls = req.files.map(file => `/images/banner/${file.filename}`).join(',');

    // Insert the comma-separated photo URLs into the database
    await new Promise((resolve, reject) => {
      con.query("INSERT INTO itemimage (PHOTO, ITEMID) VALUES (?, ?)", [photoUrls, itemId], (err, result) => {
        if (err) {
          reject(err); 
        } else {
          resolve(result);
        }
      });
    });

    // Return success response with all photo URLs
    res.json({ success: true, images: photoUrls });
    
  } catch (err) {
    res.status(500).json({ error: "Database error", detail: err });
  }
});


// GET method to fetch images from the database
// router.get("/getimages/:id", (req, res) => {
//   const productId = req.params.id;
//   const query = "SELECT id, PHOTO FROM itemimage WHERE id = ?";

//   db.query(query, [productId], (err, results) => {
//       if (err) {
//           console.error("Error fetching images from the database:", err);
//           return res.status(500).json({ error: "Database error", detail: err });
//       }

//       if (results.length === 0) {
//           return res.status(404).json({ message: "No images found for this product" });
//       }

//       const images = results.map((row) => {
//           return {
//               id: row.id,
//               photo: JSON.parse(row.PHOTO), // Parse the JSON string to an array
//           };
//       });

//       res.json({ success: true, items: images });
//   });
// });
// GET method to fetch images from the database
router.get("/getimages/:id", (req, res) => {
  const productId = req.params.id;
  const query = "SELECT id, PHOTO FROM itemimage WHERE id = ?";

  db.query(query, [productId], (err, results) => {
      if (err) {
          console.error("Error fetching images from the database:", err);
          return res.status(500).json({ error: "Database error", detail: err });
      }

      if (results.length === 0) {
          return res.status(404).json({ message: "No images found for this product" });
      }

      const images = results.map((row) => {
          try {
              return {
                  id: row.id,
                  photo: JSON.parse(row.PHOTO), // Parse the JSON string to an array
                  // photo: JSON.parse(row.PHOTO).map(url => `${BASE_URL}/${url}`), // Include BASE_URL
                };
          } catch (error) {
              console.error("Error parsing JSON:", error);
              return {
                  id: row.id,
                  photo: [] // Default to empty array if parsing fails
              };
          }
      });

      console.log("Images fetched from database:", images);
      res.json({ success: true, items: images });
  });
});

module.exports = router;