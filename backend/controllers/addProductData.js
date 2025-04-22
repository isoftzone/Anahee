const express = require("express");
const con = require('../config')

exports.addProducts = (req, res) => {
    const { codetype, createdby, primename, status, sequence, remark, companyid } = req.body;

    // Validate input (optional)
    if (!codetype || !createdby || !primename || !sequence || !status || !companyid) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // SQL query to get the max primekeyid for the given codetype
    const getMaxPrimeKeyIdSql = `SELECT COALESCE(MAX(primekeyid), 0) AS maxPrimeKeyId FROM master WHERE codetype = ?`;
    
    con.query(getMaxPrimeKeyIdSql, [codetype], (err, results) => {
        if (err) {
            console.error('Error fetching max primekeyid:', err);
            return res.status(500).json({ message: 'Error fetching data' });
        }
      
        // Calculate the new primekeyid
        const newPrimeKeyId = results[0].maxPrimeKeyId + 1;

        // SQL query to insert into 'master' table
        const insertSql = `INSERT INTO master (codetype, createdby, primekeyid, primename, status, sequence, remark, companyid)
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [codetype, createdby, newPrimeKeyId, primename, status, sequence, remark, companyid];

        // Execute the insert query
        con.query(insertSql, values, (err, results) => {
            if (err) {
                console.error('Error inserting into database:', err);
                return res.status(500).json({ message: 'Error inserting data' });
            }
            console.log('Inserted row id:', results.insertId);
            res.status(200).json({ message: 'Data inserted successfully' });
        });
    });

};


exports.getCompanyId = async (req, res) => {
    await con.query('SELECT companyid FROM master', (err, result) => {
         if (err) {
             throw err;
         }
         res.json(result);
     });
 };

exports.getCodeTypeData = (req, res) => {
    const { codetype, page = 1, pageSize = 10 } = req.query;

    let sql = `SELECT codetype, primekeyid, primename, status, sequence, remark FROM master`;
    const values = [];

    if (codetype) {
        sql += ` WHERE codetype = ?`;
        values.push(codetype);
    }

    const offset = (page - 1) * pageSize;
    sql += ` LIMIT ? OFFSET ?`;
    values.push(parseInt(pageSize), parseInt(offset));

    con.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error fetching data from database:', err);
            return res.status(500).json({ message: 'Error fetching data' });
        }

        const countSql = `SELECT COUNT(*) as count FROM master WHERE codetype = ?`;
        con.query(countSql, [codetype], (err, countResults) => {
            if (err) {
                console.error('Error fetching count from database:', err);
                return res.status(500).json({ message: 'Error fetching data' });
            }
            const total = countResults[0].count;
            res.status(200).json({ records: results, total });
        });
    });
};

exports.getCodeTypeAllData = (req, res) => {
    const { codetype } = req.query;

    let sql = `SELECT codetype, primekeyid, primename, status, sequence, remark FROM master`;
    const values = [];

    if (codetype) {
        sql += ` WHERE codetype = ?`;
        values.push(codetype);
    }

    con.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error fetching data from database:', err);
            return res.status(500).json({ message: 'Error fetching data' });
        }

        res.status(200).json({ records: results, total: results.length });
    });
};


exports.editProduct = (req, res) => {
    
    const { codetype, updatedby, primename, status, sequence, remark } = req.body;
    const primekeyid = req.params.primekeyid; // Extract primekeyid from request parameters

    // Validate input
    if (!codetype || !updatedby || !primekeyid || !primename || !status || !sequence) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // SQL query to update 'master' table based on primekeyid and codetype
    const sql = `
        UPDATE master
        SET codetype = ?, updatedby = ?, primename = ?, status = ?, sequence = ?, remark = ?
        WHERE primekeyid = ? AND codetype = ?`;

    const values = [codetype, updatedby, primename, status, sequence, remark, primekeyid, codetype];

    // Execute the query
    con.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error updating database:', err);
            return res.status(500).json({ message: 'Error updating data' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        console.log('Updated product with primekeyid:', primekeyid);
        res.status(200).json({ message: 'Data updated successfully' });
    });
};

// Delete product API

exports.deleteProduct = (req, res) => {
    const codetype = req.body.codetype;
    const primekeyid = req.params.primekeyid; // Extract primekeyid from request parameters

    // Validate input (optional)
    if (!codetype || !primekeyid) {
        return res.status(400).json({ message: 'codetype is required' });
    }
    // SQL query to delete from 'master' table based on codetype and primekeyid
    const sql = `DELETE FROM master WHERE codetype = ? AND primekeyid = ?`;

    const values = [codetype, primekeyid];

    // Execute the query
    con.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error deleting from database:', err);
            return res.status(500).json({ message: 'Error deleting data' });
        }
        if (results.affectedRows === 0) {
            // If no rows were affected, it means the product with given codetype and primekeyid was not found
            return res.status(404).json({ message: 'Product not found' });
        }
        console.log('Deleted product with primekeyid:', primekeyid);
        res.status(200).json({ message: 'Data deleted successfully' });
    });
};

exports.getNextSequence = (req, res) => {
    const { codetype } = req.query;

    if (!codetype) {
        return res.status(400).json({ message: 'Parameter codetype is required' });
    }

    let sql = `SELECT COALESCE(MAX(sequence), 0) + 1 AS SQ FROM master WHERE codetype = ?`;
    const values = [codetype];

    con.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error fetching sequence from database:', err);
            return res.status(500).json({ message: 'Error fetching sequence' });
        }

        // results[0].SQ will contain the next sequence number
        const nextSequence = results[0].SQ;

        res.status(200).json({ nextSequence });
    });
};
