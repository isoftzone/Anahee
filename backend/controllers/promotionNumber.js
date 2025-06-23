const express = require('express');
const con = require("../config");
const util = require('util');
const query = util.promisify(con.query).bind(con);

exports.promotionNumber = async (req, res) => {
    try {
        const { phonenumber,customer_id } = req.body;
        console.log("this is number", phonenumber);
        if (!phonenumber) {
            return res.status(400).json({ message: "number required !" })
        }
        const insertSql = `INSERT INTO  promotionnumber (phonenumber, customer_id) VALUE (?, ?)`;
        console.log(" int t nbn", insertSql);
        const result = await query(insertSql, [phonenumber, customer_id]);
        return res.status(201).json({ message: "Data insert successfully" })
    }
    catch (error) {
        return res.status(500).json({ message: "internal server error" })
    }
}


exports.getpromotionNumber = async (req, res) => {
  try {
  
    const querySql = `    
     SELECT pn.id,
        pn.phonenumber,
        pn.created_at,
        cm.email as email,
        cm.MOBILE as mobile,
        cm.FNAME as first_name,
        cm.LNAME as last_name
      FROM promotionnumber pn
      LEFT JOIN customermaster cm ON pn.customer_id = cm.CUSTOMERID
    `;
    const items = await query(querySql);
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving data' });
  }
}

// http://localhost:3000/promotionNumbers