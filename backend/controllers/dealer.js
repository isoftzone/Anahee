const express = require("express");
const con = require('../config')



exports.getDealer = async (req, res) => {
    await con.query('SELECT * FROM dealermaster', (err, result) => {
         if (err) {
             throw err;
         }
         res.json(result);
     });
 };