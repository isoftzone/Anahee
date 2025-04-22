const express = require("express");
const con = require('../config')


 exports.getLable = async (req, res) => {
    await con.query('SELECT * FROM barcodedetail', (err, result) => {
         if (err) {
             throw err;
         }
         res.json(result);
     });
 };