const express = require("express");
const con = require('../config')

exports.getEmployee = async (req, res) => {
    await con.query('SELECT * FROM empmaster', (err, result) => {
         if (err) {
             throw err;
         }
         res.json(result);
     });
 };