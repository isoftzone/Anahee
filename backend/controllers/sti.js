const express = require("express");
const con = require('../config')


// Define the route to fetch data

exports.getStiDetail = async(req, res)=>{
    const query = `
    SELECT * FROM STIDETAIL SD
    JOIN STIMASTER SM ON SD.STIID = SM.STIID
    JOIN ITEMMASTER IM ON IM.ITEMID = SD.ITEMID
  `
  ;

  con.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
}