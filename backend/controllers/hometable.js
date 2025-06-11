const express = require("express");
const con = require("../config");
const util = require("util");

const query = util.promisify(con.query).bind(con);

const mysql = require("mysql");
const db = mysql.createConnection({
  host: "4.213.43.18",
  user: "isrbs",
  password: "isoft@1209ISZ",
  database: "anahee",
  port: 3306,
});

// Add New Record
exports.add_data = async (req, res) => {
  try {
    const { companyid, name, value, flag, remark } = req.body;
  
    if (!companyid || !name) {
      return res.status(400).json({ msg: "Company ID and Name are required" });
    }
    const newRecord = { companyid, name, value, flag, remark };
  console.log (newRecord);
    const result = await query("INSERT INTO hometable SET ?", newRecord);
    res.status(201).json({ msg: "New data added successfully", id: result.insertId });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ msg: "Internal Server Error", error: error.message });
  }
};

// Get All Records
exports.get_data = async (req, res) => {
  try {
    const hometable = await query("SELECT * FROM hometable ORDER BY sequence ASC");
    res.status(200).json(hometable);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ msg: "Error retrieving data", error: error.message });
  }
};

// Update Record
exports.update_data = async (req, res) => {
    try {
      const { id } = req.params;
      const { companyid, name, value, flag, remark } = req.body;
      if (!id) {
        return res.status(400).json({ msg: "ID is required for updating" });
      }
      const updateFields = {};
      if (companyid) updateFields.companyid = companyid;
      if (name) updateFields.name = name;
      if (value) updateFields.value = value;
      if (flag !== undefined) updateFields.flag = flag; // Ensure flag is updated
      if (remark) updateFields.remark = remark;
  
      await query("UPDATE hometable SET ? WHERE id = ?", [updateFields, id]);
      res.status(200).json({ msg: "Data updated successfully" });
    } catch (error) {
      console.error("Error updating data:", error);
      res.status(500).json({ msg: "Error updating data", error: error.message });
    }
  };

// Delete Record
// exports.delete_data = async (req, res) => {
//   try {
//     const { id } = req.params;
//     if (!id) {
//       return res.status(400).json({ msg: "ID is required for deletion" });
//     }
//     await query("DELETE FROM hometable WHERE id = ?", [id]);
//     res.status(200).json({ msg: "Data deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting record:", error);
//     res.status(500).json({ msg: "Error deleting data", error: error.message });
//   }
// };

exports.update_hometable_positions = (req, res) => {
  const updates = req.body;
  console.log("Incoming updates:", updates);
  // Validate input format - expecting direct array
  if (!Array.isArray(updates)) {
    return res.status(400).json({
      error: "Invalid input format. Expected an array of updates.",
      received: typeof updates,
    });
  }
  // Validate each update object
  for (const update of updates) {
    if (!update.id || !update.sequence) {
      return res.status(400).json({
        error: "Each update must have 'id' and 'sequence' fields",
        received: update,
      });
    }
  }
  // Begin transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error("Transaction start error:", err);
      return res.status(500).json({ error: "Failed to start transaction" });
    }
    const updatePromises = updates.map(({ id, sequence }) => {
      return new Promise((resolve, reject) => {
        db.query(
          "UPDATE hometable SET sequence = ? WHERE id = ?",
          [sequence, id],
          (error, results) => {
            if (error) {
              console.error(
                `Error updating id ${id} with sequence ${sequence}:`,
                error
              );
              return reject(error);
            }
            if (results.affectedRows === 0) {
              console.warn(`No rows affected for id ${id}`);
            }
            resolve(results);
          }
        );
      });
    });
    Promise.all(updatePromises)
      .then((results) => {
        db.commit((err) => {
          if (err) {
            console.error("Commit error:", err);
            db.rollback(() => {
              res.status(500).json({ error: "Failed to commit transaction" });
            });
          } else {
            console.log(`Successfully updated ${updates.length} records`);
            res.json({
              message: "Sequence updated successfully",
              updatedCount: updates.length,
              updates: updates,
            });
          }
        });
      })
      .catch((err) => {
        console.error("Update error:", err);
        db.rollback(() => {
          res.status(500).json({
            error: "Failed to update sequence",
            details: err.message,
          });
        });
      });
  });
};