const express = require("express");
const con = require('../config')



exports.getTransport = async (req, res) => {
    await con.query('SELECT * FROM transportmaster', (err, result) => {
         if (err) {
             throw err;
         }
         res.json(result);
     });
 };