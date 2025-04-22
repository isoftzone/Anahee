const express = require("express");
const con = require("../config");
const util = require("util");

const query = util.promisify(con.query).bind(con);

exports.addPolicy = async (req, res) => {
    try {
      const { companyid, sectionname, content, id } = req.body;
  
      if (!companyid || !sectionname || !content) {
        return res.status(400).json({ error: "companyid, sectionname, and content are required" });
      }
  
      if (id) {
        const sql = `
          UPDATE page_master
          SET content = ?, sectionname = ?
          WHERE id = ? AND companyid = ?
        `;
        await query(sql, [content, sectionname, id, companyid]);
        return res.status(200).json({ success: true, message: sectionname + " updated successfully!" });
      } else {
        const sql = `
          INSERT INTO page_master (companyid, sectionname, content)
          VALUES (?, ?, ?)
          ON DUPLICATE KEY UPDATE content = VALUES(content)
        `;
        await query(sql, [companyid, sectionname, content]);
        return res.status(200).json({ success: true, message: sectionname + " saved successfully!" });
      }
  
    } catch (error) {
      console.error("Error saving policy:", error);
      res.status(500).json({ error: "Database error", details: error.message });
    }
  };
  

exports.getPolicy = async (req, res) => {
    try {
        const { companyid, sectionname } = req.query;

        if (!companyid) {
            return res.status(400).json({ error: "companyid is required" });
        }

        let sql = "SELECT sectionname, content FROM page_master WHERE companyid = ?";
        let params = [companyid];

        if (sectionname) {
            sql += " AND sectionname = ?";
            params.push(sectionname);
        }

        const result = await query(sql, params);
        res.status(200).json({ policies: result });

    } catch (error) {
        console.error("Error fetching policies:", error);
        res.status(500).json({ error: "Database error", details: error.message });
    }
};



exports.getPageInfo = async (req, res) => {
    try {
        const { companyid, id } = req.query;  // Extract companyid and id from query parameters

        if (!companyid || !id) {
            return res.status(400).json({ error: 'companyid and id are required' });
        }

        const query = 'SELECT content,sectionname FROM page_master WHERE companyid = ? AND id = ?';
        
        const results = await new Promise((resolve, reject) => {
            con.query(query, [companyid, id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
       
        res.json({
            content: results[0].content, 
            sectionname: results[0].sectionname
        });
      
    } catch (error) {
        console.error("Error fetching policies:", error);
        res.status(500).json({ 
            error: "Database error", 
            details: error.message 
        });
    }
};
