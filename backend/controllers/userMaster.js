// const express =require('express')
// const con=require('../config')
// const util = require("util");

// const query = util.promisify(con.query).bind(con);

// exports.add_data = async (req, res) => {
//     try {
//       const {
//         name,profession,country,add,location,phone,email,website,cid,uid,title,btitle,fname,mname,lname,mobile,status,utype,uname,password,createdby,createdon,updatedby,updatedon,dson,dsoff
//     } = req.body;

//         if (!name || !profession || !country || !add || !location || !phone || !email || !website || !cid || !uid || !title || !btitle || !fname || !mname || !lname || !mobile || !status  || !utype || !uname || !password || !createdby || !createdon || !updatedby || !updatedon || !dson || !dsoff) {
//             return res.status(400).json({ msg: "All fields are required" });
//           }

//     //   if (!cid || !name) {
//     //     return res.status(400).json({ msg: "Company ID and Name are required" });
//     //   }
//       const newRecord = {  name,profession,country,add,location,phone,email,website,cid,uid,title,btitle,fname,mname,lname,mobile,status,utype,uname,password,createdby,createdon,updatedby,updatedon,dson,dsoff  };
//     console.log (newRecord);
//       const result = await query("INSERT INTO usermaster SET ?", newRecord);
//       res.status(201).json({ msg: "New data added successfully", result });
//     } catch (error) {
//       console.error("Error inserting data:", error);
//       res.status(500).json({ msg: "Internal Server Error", error: error.message });
//     }
//   };

//   exports.get_data = async (req, res) => {
//     try {
//       const usermaster = await query("SELECT * FROM usermaster");
//       res.status(200).json(usermaster);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       res.status(500).json({ msg: "Error retrieving data", error: error.message });
//     }
//   }

const express = require("express");
const con = require("../config");
const app = express();
const util = require("util");
// const multer = require('multer');

// const bcrypt = require('bcrypt'); // Uncomment if using password hashing

const query = util.promisify(con.query).bind(con);
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "4.213.43.18",
  user: "isrbs",
  password: "isoft@1209ISZ",
  database: "madhuban",
  port: 3306,
});

// const multer = require('multer');
// const path = require('path');

// Multer Setup for Image Uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
// });

// const upload = multer({ storage });

// module.exports = upload;

// const upload = multer({ storage });

// exports.upload_userMaster = (req, res) => {
//   const filepath = req.file.path || "";
//   console.log("file==",filepath)
//   // const requiredFields = [
//   //   'COMPANYID', 'USERID', 'TITLE', 'BUSINESSTITLE', 'FNAME', 'MNAME', 'LNAME',
//   //   'PHONE', 'MOBILE', 'EMAIL', 'STATUS', 'USERTYPE', 'USERNAME', 'PASSWORD',
//   //   'CREATEDBY', 'CREATEDON', 'UPDATEDBY', 'UPDATEDON', 'DS_ON', 'DS_OFF',
//   //   'FULLNAME', 'COUNTRY', 'LOCATION', 'PROFESSION', 'ADDRESS', 'WEBSITE'
//   // ];

//   // for (let field of requiredFields) {
//   //   if (!req.body[field]) {
//   //     return res.status(400).json({ error: `Missing required field: ${field}` });
//   //   }
//   // }

//   const {
//     COMPANYID, USERID, TITLE, BUSINESSTITLE, FNAME, MNAME, LNAME, PHONE, MOBILE,
//     EMAIL, STATUS, USERTYPE, USERNAME, PASSWORD, CREATEDBY, CREATEDON, UPDATEDBY,
//     UPDATEDON, DS_ON, DS_OFF, FULLNAME, COUNTRY, LOCATION, PROFESSION,
//     ADDRESS, WEBSITE, PROFILEIMAGE
//   } = req.body;

//   const updateQuery = `
//     UPDATE usermaster
//     SET
//       COMPANYID = ?, TITLE = ?, BUSINESSTITLE = ?, FNAME = ?, MNAME = ?, LNAME = ?,
//       PHONE = ?, MOBILE = ?, EMAIL = ?, STATUS = ?, USERTYPE = ?, USERNAME = ?,
//       PASSWORD = ?, CREATEDBY = ?, CREATEDON = ?, UPDATEDBY = ?, UPDATEDON = ?,
//       DS_ON = ?, DS_OFF = ?, FULLNAME = ?, COUNTRY = ?, LOCATION = ?, PROFESSION = ?,
//       ADDRESS = ?, WEBSITE = ?, PROFILEIMAGE = ?
//     WHERE USERID = ?
//   `;

//   const values = [
//     COMPANYID, TITLE, BUSINESSTITLE, FNAME, MNAME, LNAME, PHONE, MOBILE,
//     EMAIL, STATUS, USERTYPE, USERNAME, PASSWORD, CREATEDBY, CREATEDON,
//     UPDATEDBY, UPDATEDON, DS_ON, DS_OFF, FULLNAME, COUNTRY, LOCATION,
//     PROFESSION, ADDRESS, WEBSITE, filepath,
//     USERID // condition for WHERE clause
//   ];

//   con.query(updateQuery, values, (err, result) => {
//     if (err) {
//       console.error("Error executing query:", err);
//       return res.status(500).json({ error: "Database error while updating user" });
//     }

//     // if (result.affectedRows === 0) {
//     //   return res.status(404).json({ message: "User not found" });
//     // }

//     res.status(201).json({ message: "User updated successfully", result });
//   });
// };

// Check if user exists
// exports.upload_userMaster = (req, res) => {
//   const { userid } = req.params;
//   con.query("SELECT USERID FROM usermaster WHERE USERID = ?", [userid], (err, results) => {
//     if (err) return res.status(500).json({ error: "DB error" });
//     res.json({ exists: results.length > 0 });
//   });
// }

// exports.upload_userMaster = (req, res) => {
//   const filepath = req.file?.path || "";
//   console.log("Uploaded file path:", filepath);
//   console.log("Request body:", req.body);

//   // Helper to safely parse integers
//   const safeInt = (val) => {
//     const num = parseInt(val);
//     return isNaN(num) ? null : num;
//   };

//   // Extract and sanitize fields from req.body
//   const {
//     TITLE, BUSINESSTITLE, FNAME, MNAME, LNAME, PHONE, MOBILE, EMAIL,
//     STATUS, USERTYPE, USERNAME, PASSWORD, CREATEDBY, CREATEDON,
//     UPDATEDBY, UPDATEDON, DS_ON, DS_OFF, FULLNAME, COUNTRY, LOCATION,
//     PROFESSION, ADDRESS, WEBSITE
//   } = req.body;

//   const COMPANYID = safeInt(req.body.COMPANYID);
//   const USERID = safeInt(req.body.USERID);

//   // Validate required fields
//   if (!USERID) {
//     return res.status(400).json({ error: "USERID is required" });
//   }

//   const checkUserQuery = "SELECT USERID FROM usermaster WHERE USERID = ?";

//   con.query(checkUserQuery, [USERID], (err, results) => {
//     if (err) {
//       console.error("Error checking user existence:", err);
//       return res.status(500).json({ error: "Database error during user check" });
//     }

//     if (results.length > 0) {
//       // ✅ Update existing user
//       const updateQuery = `
//         UPDATE usermaster SET
//           COMPANYID = ?, TITLE = ?, BUSINESSTITLE = ?, FNAME = ?, MNAME = ?, LNAME = ?,
//           PHONE = ?, MOBILE = ?, EMAIL = ?, STATUS = ?, USERTYPE = ?, USERNAME = ?,
//           PASSWORD = ?, CREATEDBY = ?, CREATEDON = ?, UPDATEDBY = ?, UPDATEDON = ?,
//           DS_ON = ?, DS_OFF = ?, FULLNAME = ?, COUNTRY = ?, LOCATION = ?, PROFESSION = ?,
//           ADDRESS = ?, WEBSITE = ?, PROFILEIMAGE = ?
//         WHERE USERID = ?
//       `;

//       const updateValues = [
//         COMPANYID, TITLE, BUSINESSTITLE, FNAME, MNAME, LNAME, PHONE, MOBILE,
//         EMAIL, STATUS, USERTYPE, USERNAME, PASSWORD, CREATEDBY, CREATEDON,
//         UPDATEDBY, UPDATEDON, DS_ON, DS_OFF, FULLNAME, COUNTRY, LOCATION,
//         PROFESSION, ADDRESS, WEBSITE, filepath,
//         USERID
//       ];

//       con.query(updateQuery, updateValues, (err, result) => {
//         if (err) {
//           console.error("Error updating user:", err);
//           return res.status(500).json({ error: "Database error while updating user" });
//         }
//         return res.status(200).json({ message: "User updated successfully", result });
//       });

//     } else {
//       // ✅ Insert new user
//       const insertQuery = `
//         INSERT INTO usermaster (
//           COMPANYID, USERID, TITLE, BUSINESSTITLE, FNAME, MNAME, LNAME, PHONE, MOBILE,
//           EMAIL, STATUS, USERTYPE, USERNAME, PASSWORD, CREATEDBY, CREATEDON,
//           UPDATEDBY, UPDATEDON, DS_ON, DS_OFF, FULLNAME, COUNTRY, LOCATION,
//           PROFESSION, ADDRESS, WEBSITE, PROFILEIMAGE
//         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//       `;

//       const insertValues = [
//         COMPANYID, USERID, TITLE, BUSINESSTITLE, FNAME, MNAME, LNAME, PHONE, MOBILE,
//         EMAIL, STATUS, USERTYPE, USERNAME, PASSWORD, CREATEDBY, CREATEDON,
//         UPDATEDBY, UPDATEDON, DS_ON, DS_OFF, FULLNAME, COUNTRY, LOCATION,
//         PROFESSION, ADDRESS, WEBSITE, filepath
//       ];

//       con.query(insertQuery, insertValues, (err, result) => {
//         if (err) {
//           console.error("Error inserting user:", err);
//           return res.status(500).json({ error: "Database error while inserting user" });
//         }
//         return res.status(201).json({ message: "User inserted successfully", result });
//       });
//     }
//   });
// };

// exports.upload_userMaster = (req, res) => {
//   const filepath = req.file?.path || "";
//   console.log("Uploaded file path:", filepath);
//   console.log("Request body:", req.body);

//   // Helper to safely parse integers
//   const safeInt = (val) => {
//     const num = parseInt(val);
//     return isNaN(num) ? null : num;
//   };

//   // Extract and sanitize fields from req.body
//   const {
//     TITLE, BUSINESSTITLE, FNAME, MNAME, LNAME, PHONE, MOBILE, EMAIL,
//     STATUS, USERTYPE, USERNAME, PASSWORD, CREATEDBY, CREATEDON,
//     UPDATEDBY, UPDATEDON, DS_ON, DS_OFF, FULLNAME, COUNTRY, LOCATION,
//     PROFESSION, ADDRESS, WEBSITE
//   } = req.body;

//   const COMPANYID = safeInt(req.body.COMPANYID);
//   const USERID = safeInt(req.body.USERID);

//   // Validate required fields
//   if (!USERID) {
//     return res.status(400).json({ error: "USERID is required" });
//   }

//   const checkUserQuery = "SELECT USERID FROM usermaster WHERE USERID = ?";

//   con.query(checkUserQuery, [USERID], (err, results) => {
//     if (err) {
//       console.error("Error checking user existence:", err);
//       return res.status(500).json({ error: "Database error during user check" });
//     }

//     if (results.length > 0) {
//       // ✅ User exists, update user

//       // Step 1: Get existing profile image if needed
//       const getCurrentImageQuery = "SELECT PROFILEIMAGE FROM usermaster WHERE USERID = ?";
//       con.query(getCurrentImageQuery, [USERID], (err, imgResults) => {
//         if (err) {
//           console.error("Error fetching current image:", err);
//           return res.status(500).json({ error: "Error fetching current image" });
//         }

//         const currentImagePath = imgResults[0]?.PROFILEIMAGE || "";
//         const finalImagePath = filepath || currentImagePath;

//         const updateQuery = `
//           UPDATE usermaster SET
//             COMPANYID = ?, TITLE = ?, BUSINESSTITLE = ?, FNAME = ?, MNAME = ?, LNAME = ?,
//             PHONE = ?, MOBILE = ?, EMAIL = ?, STATUS = ?, USERTYPE = ?, USERNAME = ?,
//             PASSWORD = ?, CREATEDBY = ?, CREATEDON = ?, UPDATEDBY = ?, UPDATEDON = ?,
//             DS_ON = ?, DS_OFF = ?, FULLNAME = ?, COUNTRY = ?, LOCATION = ?, PROFESSION = ?,
//             ADDRESS = ?, WEBSITE = ?, PROFILEIMAGE = ?
//           WHERE USERID = ?
//         `;

//         const updateValues = [
//           COMPANYID, TITLE, BUSINESSTITLE, FNAME, MNAME, LNAME, PHONE, MOBILE,
//           EMAIL, STATUS, USERTYPE, USERNAME, PASSWORD, CREATEDBY, CREATEDON,
//           UPDATEDBY, UPDATEDON, DS_ON, DS_OFF, FULLNAME, COUNTRY, LOCATION,
//           PROFESSION, ADDRESS, WEBSITE, finalImagePath,
//           USERID
//         ];

//         con.query(updateQuery, updateValues, (err, result) => {
//           if (err) {
//             console.error("Error updating user:", err);
//             return res.status(500).json({ error: "Database error while updating user" });
//           }
//           return res.status(200).json({ message: "User updated successfully", result, profileImage: finalImagePath });
//         });
//       });

//     } else {
//       // ✅ Insert new user
//       const insertQuery = `
//         INSERT INTO usermaster (
//           COMPANYID, USERID, TITLE, BUSINESSTITLE, FNAME, MNAME, LNAME, PHONE, MOBILE,
//           EMAIL, STATUS, USERTYPE, USERNAME, PASSWORD, CREATEDBY, CREATEDON,
//           UPDATEDBY, UPDATEDON, DS_ON, DS_OFF, FULLNAME, COUNTRY, LOCATION,
//           PROFESSION, ADDRESS, WEBSITE, PROFILEIMAGE
//         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//       `;

//       const insertValues = [
//         COMPANYID, USERID, TITLE, BUSINESSTITLE, FNAME, MNAME, LNAME, PHONE, MOBILE,
//         EMAIL, STATUS, USERTYPE, USERNAME, PASSWORD, CREATEDBY, CREATEDON,
//         UPDATEDBY, UPDATEDON, DS_ON, DS_OFF, FULLNAME, COUNTRY, LOCATION,
//         PROFESSION, ADDRESS, WEBSITE, filepath
//       ];

//       con.query(insertQuery, insertValues, (err, result) => {
//         if (err) {
//           console.error("Error inserting user:", err);
//           return res.status(500).json({ error: "Database error while inserting user" });
//         }
//         return res.status(201).json({ message: "User inserted successfully", result, profileImage: filepath });
//       });
//     }
//   });
// };

exports.upload_userMaster = (req, res) => {
  const filepath = req.file?.path || "";
  console.log("Uploaded file path:", filepath);
  console.log("Request body:", req.body);

  // Helper to safely parse integers
  const safeInt = (val) => {
    const num = parseInt(val);
    return isNaN(num) ? null : num;
  };

  const USERID = safeInt(req.body.USERID);
  const COMPANYID = safeInt(req.body.COMPANYID);
  console.log(USERID);
  if (!USERID) {
    return res.status(400).json({ error: "USERID is required" });
  }

  // Get the full user data if exists
  const getUserQuery = "SELECT * FROM usermaster WHERE USERID = ?";

  con.query(getUserQuery, [USERID], (err, results) => {
    if (err) {
      console.error("Error querying user:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length > 0) {
      // ✅ Update existing user
      const existingUser = results[0];

      // Use new value if available, otherwise fallback to existing
      const mergedData = {
        COMPANYID: COMPANYID ?? existingUser.COMPANYID,
        TITLE: req.body.TITLE || existingUser.TITLE,
        BUSINESSTITLE: req.body.BUSINESSTITLE || existingUser.BUSINESSTITLE,
        FNAME: req.body.FNAME || existingUser.FNAME,
        MNAME: req.body.MNAME || existingUser.MNAME,
        LNAME: req.body.LNAME || existingUser.LNAME,
        PHONE: req.body.PHONE || existingUser.PHONE,
        MOBILE: req.body.MOBILE || existingUser.MOBILE,
        EMAIL: req.body.EMAIL || existingUser.EMAIL,
        STATUS: req.body.STATUS || existingUser.STATUS,
        USERTYPE: req.body.USERTYPE || existingUser.USERTYPE,
        USERNAME: req.body.USERNAME || existingUser.USERNAME,
        PASSWORD: req.body.PASSWORD || existingUser.PASSWORD,
        CREATEDBY: req.body.CREATEDBY || existingUser.CREATEDBY,
        CREATEDON: req.body.CREATEDON || existingUser.CREATEDON,
        UPDATEDBY: req.body.UPDATEDBY || existingUser.UPDATEDBY,
        UPDATEDON: req.body.UPDATEDON || existingUser.UPDATEDON,
        DS_ON: req.body.DS_ON || existingUser.DS_ON,
        DS_OFF: req.body.DS_OFF || existingUser.DS_OFF,
        FULLNAME: req.body.FULLNAME || existingUser.FULLNAME,
        COUNTRY: req.body.COUNTRY || existingUser.COUNTRY,
        LOCATION: req.body.LOCATION || existingUser.LOCATION,
        PROFESSION: req.body.PROFESSION || existingUser.PROFESSION,
        ADDRESS: req.body.ADDRESS || existingUser.ADDRESS,
        WEBSITE: req.body.WEBSITE || existingUser.WEBSITE,
        PROFILEIMAGE: filepath || existingUser.PROFILEIMAGE,
      };

      const updateQuery = `
        UPDATE usermaster SET 
          COMPANYID = ?, TITLE = ?, BUSINESSTITLE = ?, FNAME = ?, MNAME = ?, LNAME = ?, 
          PHONE = ?, MOBILE = ?, EMAIL = ?, STATUS = ?, USERTYPE = ?, USERNAME = ?, 
          PASSWORD = ?, CREATEDBY = ?, CREATEDON = ?, UPDATEDBY = ?, UPDATEDON = ?, 
          DS_ON = ?, DS_OFF = ?, FULLNAME = ?, COUNTRY = ?, LOCATION = ?, PROFESSION = ?, 
          ADDRESS = ?, WEBSITE = ?, PROFILEIMAGE = ?
        WHERE USERID = ?
      `;

      const updateValues = [
        mergedData.COMPANYID,
        mergedData.TITLE,
        mergedData.BUSINESSTITLE,
        mergedData.FNAME,
        mergedData.MNAME,
        mergedData.LNAME,
        mergedData.PHONE,
        mergedData.MOBILE,
        mergedData.EMAIL,
        mergedData.STATUS,
        mergedData.USERTYPE,
        mergedData.USERNAME,
        mergedData.PASSWORD,
        mergedData.CREATEDBY,
        mergedData.CREATEDON,
        mergedData.UPDATEDBY,
        mergedData.UPDATEDON,
        mergedData.DS_ON,
        mergedData.DS_OFF,
        mergedData.FULLNAME,
        mergedData.COUNTRY,
        mergedData.LOCATION,
        mergedData.PROFESSION,
        mergedData.ADDRESS,
        mergedData.WEBSITE,
        mergedData.PROFILEIMAGE,
        USERID,
      ];

      con.query(updateQuery, updateValues, (err, result) => {
        if (err) {
          console.error("Error updating user:", err);
          return res
            .status(500)
            .json({ error: "Database error while updating user" });
        }
        return res
          .status(200)
          .json({
            message: "User updated successfully",
            result,
            profileImage: mergedData.PROFILEIMAGE,
          });
      });
    } else {
      // ✅ Insert new user (use values directly from req.body)
      const insertQuery = `
        INSERT INTO usermaster (
          COMPANYID, USERID, TITLE, BUSINESSTITLE, FNAME, MNAME, LNAME, PHONE, MOBILE,
          EMAIL, STATUS, USERTYPE, USERNAME, PASSWORD, CREATEDBY, CREATEDON,
          UPDATEDBY, UPDATEDON, DS_ON, DS_OFF, FULLNAME, COUNTRY, LOCATION,
          PROFESSION, ADDRESS, WEBSITE, PROFILEIMAGE
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const insertValues = [
        COMPANYID,
        USERID,
        req.body.TITLE,
        req.body.BUSINESSTITLE,
        req.body.FNAME,
        req.body.MNAME,
        req.body.LNAME,
        req.body.PHONE,
        req.body.MOBILE,
        req.body.EMAIL,
        req.body.STATUS,
        req.body.USERTYPE,
        req.body.USERNAME,
        req.body.PASSWORD,
        req.body.CREATEDBY,
        req.body.CREATEDON,
        req.body.UPDATEDBY,
        req.body.UPDATEDON,
        req.body.DS_ON,
        req.body.DS_OFF,
        req.body.FULLNAME,
        req.body.COUNTRY,
        req.body.LOCATION,
        req.body.PROFESSION,
        req.body.ADDRESS,
        req.body.WEBSITE,
        filepath,
      ];

      con.query(insertQuery, insertValues, (err, result) => {
        if (err) {
          console.error("Error inserting user:", err);
          return res
            .status(500)
            .json({ error: "Database error while inserting user" });
        }
        return res
          .status(201)
          .json({
            message: "User inserted successfully",
            result,
            profileImage: filepath,
          });
      });
    }
  });
};

exports.addUser_Master = (req, res) => {
  const {
    USERNAME,
    EMAIL,
    FNAME,
    LNAME,
    PASSWORD,
    PHONE,
    PROFESSION,
    STATUS,
    ADDRESS,
  } = req.body;

  const sql = `INSERT INTO usermaster (
    USERNAME, EMAIL, FNAME, LNAME, PASSWORD,
     PHONE, PROFESSION, STATUS, ADDRESS
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    USERNAME,
    EMAIL,
    FNAME,
    LNAME,
    PASSWORD,
    PHONE,
    PROFESSION,
    STATUS,
    ADDRESS,
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error saving user:", err);
      return res.status(500).json({ error: "Failed to save user." });
    }
    res.status(200).json({ message: "User saved successfully!" });
  });
};

// exports.upload_userMaster = (req, res) => {
//   const filepath = req.file.path || "";
//   console.log("file==",filepath)
//   // const requiredFields = [
//   //   'COMPANYID', 'USERID', 'TITLE', 'BUSINESSTITLE', 'FNAME', 'MNAME', 'LNAME',
//   //   'PHONE', 'MOBILE', 'EMAIL', 'STATUS', 'USERTYPE', 'USERNAME', 'PASSWORD',
//   //   'CREATEDBY', 'CREATEDON', 'UPDATEDBY', 'UPDATEDON', 'DS_ON', 'DS_OFF',
//   //   'FULLNAME', 'COUNTRY', 'LOCATION', 'PROFESSION', 'ADDRESS', 'WEBSITE'
//   // ];

//   // for (let field of requiredFields) {
//   //   if (!req.body[field]) {
//   //     return res.status(400).json({ error: `Missing required field: ${field}` });
//   //   }
//   // }

//   const {
//     COMPANYID, USERID, TITLE, BUSINESSTITLE, FNAME, MNAME, LNAME, PHONE, MOBILE,
//     EMAIL, STATUS, USERTYPE, USERNAME, PASSWORD, CREATEDBY, CREATEDON, UPDATEDBY,
//     UPDATEDON, DS_ON, DS_OFF, FULLNAME, COUNTRY, LOCATION, PROFESSION,
//     ADDRESS, WEBSITE, PROFILEIMAGE
//   } = req.body;

//   con.query(checkUserQuery, [USERID], (err, results) => {
//     if (err) {
//       console.error("Error checking user existence:", err);
//       return res.status(500).json({ error: "Database error during user check" });
//     }

//     if (results.length > 0) {
//       // User exists – update
//       const updateQuery = `
//         UPDATE usermaster SET
//           COMPANYID = ?, TITLE = ?, BUSINESSTITLE = ?, FNAME = ?, MNAME = ?, LNAME = ?,
//           PHONE = ?, MOBILE = ?, EMAIL = ?, STATUS = ?, USERTYPE = ?, USERNAME = ?,
//           PASSWORD = ?, CREATEDBY = ?, CREATEDON = ?, UPDATEDBY = ?, UPDATEDON = ?,
//           DS_ON = ?, DS_OFF = ?, FULLNAME = ?, COUNTRY = ?, LOCATION = ?, PROFESSION = ?,
//           ADDRESS = ?, WEBSITE = ?, PROFILEIMAGE = ?
//         WHERE USERID = ?
//       `;

//       const updateValues = [
//         COMPANYID, TITLE, BUSINESSTITLE, FNAME, MNAME, LNAME, PHONE, MOBILE,
//         EMAIL, STATUS, USERTYPE, USERNAME, PASSWORD, CREATEDBY, CREATEDON,
//         UPDATEDBY, UPDATEDON, DS_ON, DS_OFF, FULLNAME, COUNTRY, LOCATION,
//         PROFESSION, ADDRESS, WEBSITE, filepath,
//         USERID
//       ];

//       con.query(updateQuery, updateValues, (err, result) => {
//         if (err) {
//           console.error("Error updating user:", err);
//           return res.status(500).json({ error: "Database error while updating user" });
//         }
//         return res.status(200).json({ message: "User updated successfully", result });
//       });

//     } else {
//       // User not found – insert
//       const insertQuery = `
//         INSERT INTO usermaster (
//           COMPANYID, USERID, TITLE, BUSINESSTITLE, FNAME, MNAME, LNAME, PHONE, MOBILE,
//           EMAIL, STATUS, USERTYPE, USERNAME, PASSWORD, CREATEDBY, CREATEDON,
//           UPDATEDBY, UPDATEDON, DS_ON, DS_OFF, FULLNAME, COUNTRY, LOCATION,
//           PROFESSION, ADDRESS, WEBSITE, PROFILEIMAGE
//         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//       `;

//       const insertValues = [
//         COMPANYID, USERID, TITLE, BUSINESSTITLE, FNAME, MNAME, LNAME, PHONE, MOBILE,
//         EMAIL, STATUS, USERTYPE, USERNAME, PASSWORD, CREATEDBY, CREATEDON,
//         UPDATEDBY, UPDATEDON, DS_ON, DS_OFF, FULLNAME, COUNTRY, LOCATION,
//         PROFESSION, ADDRESS, WEBSITE, filepath
//       ];

//       con.query(insertQuery, insertValues, (err, result) => {
//         if (err) {
//           console.error("Error inserting user:", err);
//           return res.status(500).json({ error: "Database error while inserting user" });
//         }
//         return res.status(201).json({ message: "User inserted successfully", result });
//       });
//     }
//   });

//   con.query(checkUserQuery, [USERID], (err, results) => {
//     if (err) {
//       console.error("Error checking user existence:", err);
//       return res.status(500).json({ error: "Database error during user check" });
//     }

//     if (results.length > 0) {
//       // User exists – update
//       const updateQuery = `
//         UPDATE usermaster SET
//           COMPANYID = ?, TITLE = ?, BUSINESSTITLE = ?, FNAME = ?, MNAME = ?, LNAME = ?,
//           PHONE = ?, MOBILE = ?, EMAIL = ?, STATUS = ?, USERTYPE = ?, USERNAME = ?,
//           PASSWORD = ?, CREATEDBY = ?, CREATEDON = ?, UPDATEDBY = ?, UPDATEDON = ?,
//           DS_ON = ?, DS_OFF = ?, FULLNAME = ?, COUNTRY = ?, LOCATION = ?, PROFESSION = ?,
//           ADDRESS = ?, WEBSITE = ?, PROFILEIMAGE = ?
//         WHERE USERID = ?
//       `;

//       const updateValues = [
//         COMPANYID, TITLE, BUSINESSTITLE, FNAME, MNAME, LNAME, PHONE, MOBILE,
//         EMAIL, STATUS, USERTYPE, USERNAME, PASSWORD, CREATEDBY, CREATEDON,
//         UPDATEDBY, UPDATEDON, DS_ON, DS_OFF, FULLNAME, COUNTRY, LOCATION,
//         PROFESSION, ADDRESS, WEBSITE, filepath,
//         USERID
//       ];

//       con.query(updateQuery, updateValues, (err, result) => {
//         if (err) {
//           console.error("Error updating user:", err);
//           return res.status(500).json({ error: "Database error while updating user" });
//         }
//         return res.status(200).json({ message: "User updated successfully", result });
//       });

//     } else {
//       // User not found – insert
//       const insertQuery = `
//         INSERT INTO usermaster (
//           COMPANYID, USERID, TITLE, BUSINESSTITLE, FNAME, MNAME, LNAME, PHONE, MOBILE,
//           EMAIL, STATUS, USERTYPE, USERNAME, PASSWORD, CREATEDBY, CREATEDON,
//           UPDATEDBY, UPDATEDON, DS_ON, DS_OFF, FULLNAME, COUNTRY, LOCATION,
//           PROFESSION, ADDRESS, WEBSITE, PROFILEIMAGE
//         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//       `;

//       const insertValues = [
//         COMPANYID, USERID, TITLE, BUSINESSTITLE, FNAME, MNAME, LNAME, PHONE, MOBILE,
//         EMAIL, STATUS, USERTYPE, USERNAME, PASSWORD, CREATEDBY, CREATEDON,
//         UPDATEDBY, UPDATEDON, DS_ON, DS_OFF, FULLNAME, COUNTRY, LOCATION,
//         PROFESSION, ADDRESS, WEBSITE, filepath
//       ];

//       con.query(insertQuery, insertValues, (err, result) => {
//         if (err) {
//           console.error("Error inserting user:", err);
//           return res.status(500).json({ error: "Database error while inserting user" });
//         }
//         return res.status(201).json({ message: "User inserted successfully", result });
//       });
//     }
//   });
// };

// Check if user exists
exports.checkid_userMaster = (req, res) => {
  const { userid } = req.params;
  console.log("bkd", userid);
  con.query(
    "SELECT USERID FROM usermaster WHERE USERID = ?",
    [userid],
    (err, results) => {
      if (err) return res.status(500).json({ error: "DB error" });
      res.json({ exists: results.length > 0 });
    }
  );
};

// Get max USERID
exports.getMax_userMaster = (req, res) => {
  con.query("SELECT MAX(USERID) as maxId FROM usermaster", (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    const maxId = results[0]?.maxId || 0;
    res.json({ maxId });
  });
};

exports.add_data = async (req, res) => {
  console.log(req.body);
  try {
    const {
      COMPANYID,
      USERID,
      TITLE,
      BUSINESSTITLE,
      FNAME,
      MNAME,
      LNAME,
      PHONE,
      MOBILE,
      EMAIL,
      STATUS,
      USERTYPE,
      USERNAME,
      PASSWORD,
      CREATEDBY,
      CREATEDON,
      UPDATEDBY,
      UPDATEDON,
      DS_ON,
      DS_OFF,
      FULLNAME,
      COUNTRY,
      LOCATION,
      PROFESSION,
      ADDRESS,
      WEBSITE,
      PROFILEIMAGE,
    } = req.body;

    // Required fields validation
    const requiredFields = {
      COMPANYID,
      USERID,
      TITLE,
      BUSINESSTITLE,
      FNAME,
      MNAME,
      LNAME,
      PHONE,
      MOBILE,
      EMAIL,
      STATUS,
      USERTYPE,
      USERNAME,
      PASSWORD,
      CREATEDBY,
      CREATEDON,
      UPDATEDBY,
      UPDATEDON,
      DS_ON,
      DS_OFF,
      FULLNAME,
      COUNTRY,
      LOCATION,
      PROFESSION,
      ADDRESS,
      WEBSITE,
      PROFILEIMAGE,
    };

    for (const [key, value] of Object.entries(requiredFields)) {
      if (!value) {
        return res.status(400).json({ msg: `${key} is required` });
      }
    }

    // Optional: Hash the password before saving
    // const hashedPassword = await bcrypt.hash(password, 10);

    const newRecord = {
      COMPANYID,
      USERID,
      TITLE,
      BUSINESSTITLE,
      FNAME,
      MNAME,
      LNAME,
      PHONE,
      MOBILE,
      EMAIL,
      STATUS,
      USERTYPE,
      USERNAME,
      PASSWORD,
      CREATEDBY,
      CREATEDON,
      UPDATEDBY,
      UPDATEDON,
      DS_ON,
      DS_OFF,
      FULLNAME,
      COUNTRY,
      LOCATION,
      PROFESSION,
      ADDRESS,
      WEBSITE,
      PROFILEIMAGE,
    };

    const result = await query(
      `INSERT INTO usermaster ( 
      COMPANYID,
      USERID,
      TITLE,
      BUSINESSTITLE,
      FNAME,
      MNAME,
      LNAME,
      PHONE,
      MOBILE,
      EMAIL,
      STATUS,
      USERTYPE,
      USERNAME,
      PASSWORD,
      CREATEDBY,
      CREATEDON,
      UPDATEDBY,
      UPDATEDON,
      DS_ON,
      DS_OFF,
      FULLNAME,
      COUNTRY,
      LOCATION,
      PROFESSION,
      ADDRESS,
      WEBSITE,
      PROFILEIMAGE 
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        COMPANYID,
        USERID,
        TITLE,
        BUSINESSTITLE,
        FNAME,
        MNAME,
        LNAME,
        PHONE,
        MOBILE,
        EMAIL,
        STATUS,
        USERTYPE,
        USERNAME,
        PASSWORD,
        CREATEDBY,
        CREATEDON,
        UPDATEDBY,
        UPDATEDON,
        DS_ON,
        DS_OFF,
        FULLNAME,
        COUNTRY,
        LOCATION,
        PROFESSION,
        ADDRESS,
        WEBSITE,
        PROFILEIMAGE,
      ]
    );

    res.status(201).json({ msg: "New data added successfully", result });
  } catch (error) {
    console.error("Error inserting data:", error);
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

exports.getOneMaster = async (req, res) => {
  const userId = req.params.id;
  await con.query(
    "SELECT * FROM usermaster WHERE USERID = ?",
    userId,
    (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result[0]);
    }
  );
};

exports.get_data = async (req, res) => {
  try {
    const usermaster = await query("SELECT * FROM usermaster");
    res.status(200).json(usermaster);
  } catch (error) {
    console.error("Error fetching data:", error);
    res
      .status(500)
      .json({ msg: "Error retrieving data", error: error.message });
  }
};
