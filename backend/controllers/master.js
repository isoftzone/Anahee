const express = require("express");
const con = require('../config'); // Ensure this is correctly set up
const multer = require("multer");
const path = require("path");
const fs = require("fs");
// const con = require("../c
exports.getDropdown = async (req, res) => {
    try {
        const queries = {
            product: "SELECT DISTINCT product FROM master",
            brand: "SELECT DISTINCT brand FROM master",
            size: "SELECT DISTINCT i_size FROM master",
            // i_size: "SELECT DISTINCT i_size FROM master",
            color: "SELECT DISTINCT color FROM master",
            style: "SELECT DISTINCT style FROM master",
            unit: "SELECT DISTINCT unit FROM master",
            category: "SELECT DISTINCT category FROM master",
            subgroup: "SELECT DISTINCT subgroup FROM master",
            group: "SELECT DISTINCT i_group FROM master",
            subcategory: "SELECT DISTINCT subcategory FROM master",
            gender: "SELECT DISTINCT gender FROM master",
            buyer: "SELECT DISTINCT buyer FROM master",
            material: "SELECT DISTINCT material FROM master",
            company: "SELECT DISTINCT company FROM master",
            season: "SELECT DISTINCT season FROM master",
            packing: "SELECT DISTINCT packing FROM master",
            // dealer: "SELECT DISTINCT dealer FROM master",
            section: "SELECT DISTINCT section FROM master",
            status: "SELECT DISTINCT status FROM master"
        };

        const results = {};

        // Run each query
        for (const key in queries) {
            await con.query(queries[key], (err, result) => {
                if (err) {
                    console.error(`❌ Error fetching ${key}:`, err);
                } else {
                    results[key] = result.map(row => row[key]); // Extract unique values
                }
                // Send response after processing all queries
                if (Object.keys(results).length === Object.keys(queries).length) {
                    res.json(results);
                }
            });
        }
    } catch (error) {
        console.error("❌ Unexpected error:", error);
        res.status(500).json({ error: "Server error" });
    }
};
