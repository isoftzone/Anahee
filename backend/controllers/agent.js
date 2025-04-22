const express = require("express");
const con = require('../config')

exports.getMaster = async (req, res) => {
    await con.query('SELECT * FROM agentmaster', (err, result) => {
         if (err) {
             throw err;
         }
         res.json(result);
     });
 };


  // POST API endpoint to insert data into agentmaster table
exports.addMaster= async (req, res) => {
    const data = req.body;
  
    // Insert data into agentmaster table
    con.query('INSERT INTO agentmaster SET ?', data, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Error inserting data into agentmaster table' });
        return;
      }
      console.log('Data inserted successfully:', result);
      res.status(200).json({ message: 'Data inserted successfully' });
    });
  };

  exports.agents = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Number of records per page
    const offset = (page - 1) * limit;

    // Fetch total count of records
    con.query("SELECT COUNT(*) as totalCount FROM agentmaster", (error, countRows) => {
        if (error) {
            console.error('Error fetching total count of records:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const totalCount = countRows[0].totalCount;

        // Fetch data with pagination
        con.query(
            `SELECT * FROM agentmaster LIMIT ? OFFSET ?`,
            [limit, offset],
            (error, rows) => {
                if (error) {
                    console.error('Error fetching data with pagination:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }

                // Calculate total pages
                const totalPages = Math.ceil(totalCount / limit);

                // Send JSON response with pagination metadata
                res.json({
                    totalRecords: totalCount,
                    totalPages: totalPages,
                    currentPage: page,
                    agents: rows
                });
            }
        );
    });
};