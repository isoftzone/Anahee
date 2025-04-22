const express = require("express");
const con = require('../config')

exports.getMasterSetting = async (req, res) => {
    const codeType = req.query.codetype;
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 records per page if not provided

    // Calculate offset based on pagination parameters
    const offset = (page - 1) * limit;

    try {
        let query, values, countQuery, countValues;

        if (!codeType) {
            query = `SELECT PRIMENAME, SEQUENCE FROM master LIMIT ?, ?`;
            values = [offset, limit];
            countQuery = `SELECT COUNT(*) AS count FROM master`;
            countValues = [];
        } else {
            query = `SELECT PRIMENAME, SEQUENCE FROM master WHERE CODETYPE = ? LIMIT ?, ?`;
            values = [codeType, offset, limit];
            countQuery = `SELECT COUNT(*) AS count FROM master WHERE CODETYPE = ?`;
            countValues = [codeType];
        }

        con.query(countQuery, countValues, (countError, countResults) => {
            if (countError) {
                return res.status(500).send({
                    message: "Error retrieving data",
                    error: countError.message
                });
            }

            const totalRecords = countResults[0].count;

            con.query(query, values, (error, results) => {
                if (error) {
                    return res.status(500).send({
                        message: "Error retrieving data",
                        error: error.message
                    });
                }

                res.send({
                    totalRecords,
                    records: results
                });
            });
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).send({
            message: "Error retrieving data",
            error: error.message
        });
    }
};

exports.getAllMasterSettings = async (req, res) => {
    try {
        const query = `SELECT DISTINCT CODETYPE FROM master`;

        con.query(query, (error, results) => {
            if (error) {
                return res.status(500).send({
                    message: "Error retrieving data",
                    error: error.message
                });
            }

            res.send(results);
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).send({
            message: "Error retrieving data",
            error: error.message
        });
    }
};