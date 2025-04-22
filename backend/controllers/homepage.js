const express = require("express");
const con = require('../config')
const util = require('util');

const query = util.promisify(con.query).bind(con);

// Add New Record
exports.add_data = async (req, res) => {
    try {
        const { companyid, name, value, flag, remark } = req.body;
        if (!companyid || !name) {
            return res.status(400).json({ msg: "Company ID and Name are required" });
        }
        const newSetting = { companyid, name, value, flag, remark };
        const result = await query('INSERT INTO homepage SET ?', newSetting);
        res.status(201).json({ msg: "New data added successfully", id: result.insertId });
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
};

// Get All Records
exports.get_data = async (req, res) => {
    try {
        const homepage = await query('SELECT * FROM homepage');
        res.status(200).json(homepage);
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

    await query("UPDATE homepage SET ? WHERE id = ?", [updateFields, id]);
    res.status(200).json({ msg: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ msg: "Error updating data", error: error.message });
  }
};

// Delete Record
exports.delete_data = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ msg: "ID is required for deletion" });
        }
        await query('DELETE FROM homepage WHERE id = ?', [id]);
        res.status(200).json({ msg: "Data deleted successfully" });
    } catch (error) {
        console.error("Error deleting setting:", error);
        res.status(500).json({ msg: "Error deleting data", error: error.message });
    }
};
