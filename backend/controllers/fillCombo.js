// const express = require("express");
// const con = require('../config')


//  exports.getcmb = async (req, res) => {
//     const data = req.params.id;
//     const arr = data.split(",")
//     // console.log(data.toString());
//     console.log(arr);
//     // console.log(data.name)
//     // SELECT PRIMENAME, SEQUENCE FROM master WHERE CODETYPE = ?
//     await con.query("SELECT PRIMENAME, PRIMEKEYID FROM master WHERE Codetype = 'Status' Order by SEQUENCE, PRIMENAME", (err, result) => {
//          if (err) {
//              throw err;
//          }                                              
//          res.json(result);
//      });
//  };
const express = require("express");
const con = require('../config')


 exports.postcmb = async (req, res) => {
   
    const {WhFldName,FldName,TblName,FldCode,OrdBy} = req.body
    console.log(WhFldName,FldName,TblName,FldCode,OrdBy);
    // console.log(data.name)
    // SELECT PRIMENAME, SEQUENCE FROM master WHERE CODETYPE = ?
    await con.query(`SELECT ${FldName}, ${FldCode} FROM ${TblName} WHERE Codetype = '${WhFldName}' Order by '${OrdBy}', '${FldName}'`, (err, result) => {
         if (err) {
             throw err;
         }                                              
         res.json(result);
     });
 };

 exports.postcmbSW = async (req, res) => {
   
    const {WhFldName,FldName,TblName,FldCode,OrdBy} = req.body
    console.log(WhFldName,FldName,TblName,FldCode,OrdBy);
    // console.log(data.name)
    // SELECT PRIMENAME, SEQUENCE FROM master WHERE CODETYPE = ?
    await con.query(`SELECT ${FldName}, ${FldCode} FROM ${TblName} WHERE Codetype = '${WhFldName}' Order by '${OrdBy}', '${FldName}'`, (err, result) => {
         if (err) {
             throw err;
         }                                              
         res.json(result);
     });
 };
//  exports.postcmbAW = async (req, res) => {
//     const {TblName,FldName,FldCode,OrdBy,WhFldName,} = req.body
//     console.log(req.body)
//     await con.query(`SELECT ${FldName}, ${FldCode} FROM ${TblName} WHERE Codetype = '${WhFldName}' Order by '${OrdBy}', '${FldName}'`, (err, result) => {
//          if (err) {
//              throw err;
//          }                                              
//          res.json(result);
//      });
//  };

// exports.postcmbAW = async (req, res) => {
//     const {TblName, FldName, FldCode, OrdBy, WhFldName} = req.body;
//     console.log(req.body);

//     if (!Array.isArray(WhFldName)) {
//         return res.status(400).json({ error: "WhFldName must be an array" });
//     }

//     try {
//         const results = {};
        
//         for (const field of WhFldName) {
//             const query = `SELECT ${FldName}, ${FldCode} FROM ${TblName} WHERE Codetype = '${field}' ORDER BY ${OrdBy}, ${FldName}`;
//             const [rows] = await con.promise().query(query);
//             results[field] = rows;
//         }
        
//         res.json(results);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Database query failed" });
//     }
// };
exports.postcmbAW = (req, res) => {
    const { TblName, FldName, FldCode, OrdBy, WhFldName } = req.body;
    console.log(req.body);

    if (!Array.isArray(WhFldName)) {
        return res.status(400).json({ error: "WhFldName must be an array" });
    }

    const results = {};
    const queries = WhFldName.map(field => {
        return new Promise((resolve, reject) => {
            const query = `SELECT ${FldName}, ${FldCode} FROM ${TblName} WHERE Codetype = '${field}' ORDER BY ${OrdBy}, ${FldName}`;
            con.query(query, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                results[field] = rows;
                resolve();
            });
        });
    });

    Promise.all(queries)
        .then(() => res.json(results))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Database query failed" });
        });
};
exports.postcsbAW = (req, res) => {
    const { TblName, FldName, FldCode, OrdBy, WhFldName } = req.body;
    console.log(req.body);

    if (!Array.isArray(WhFldName)) {
        return res.status(400).json({ error: "WhFldName must be an array" });
    }

    const results = {};
    const queries = WhFldName.map(field => {
        return new Promise((resolve, reject) => {
            const query = `SELECT ${FldName}, ${FldCode} FROM ${TblName} WHERE Codetype = '${field}' ORDER BY ${OrdBy}, ${FldName}`;
            con.query(query, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                results[field] = rows;
                resolve();
            });
        });
    });

    Promise.all(queries)
        .then(() => res.json(results))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Database query failed" });
        });
};

exports.getcmbAW = (req, res) => {
    const { TblName, FldName, FldCode, OrdBy } = req.query;
    let WhFldName = req.query.WhFldName;

    // Ensure WhFldName is an array (in case it's a single value, convert it)
    if (!WhFldName) {
        return res.status(400).json({ error: "WhFldName is required" });
    }
    if (!Array.isArray(WhFldName)) {
        WhFldName = [WhFldName]; // Convert to array if it's a single value
    }

    console.log(req.query);

    const results = {};
    const queries = WhFldName.map(field => {
        return new Promise((resolve, reject) => {
            const query = `SELECT ${FldName}, ${FldCode} FROM ${TblName} WHERE Codetype = '${field}' ORDER BY ${OrdBy}, ${FldName}`;
            con.query(query, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                results[field] = rows;
                resolve();
            });
        });
    });

    Promise.all(queries)
        .then(() => res.json(results))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Database query failed" });
        });
};


exports.postcsbAW = (req, res) => {
    const { TblName, FldName, FldCode, OrdBy, WhFldName } = req.body;
    console.log(req.body);

    if (!Array.isArray(WhFldName)) {
        return res.status(400).json({ error: "WhFldName must be an array" });
    }

    const results = {};
    const queries = WhFldName.map(field => {
        return new Promise((resolve, reject) => {
            const query = `SELECT ${FldName}, ${FldCode} FROM ${TblName} WHERE Codetype = '${field}' ORDER BY ${OrdBy}, ${FldName}`;
            con.query(query, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                results[field] = rows;
                resolve();
            });
        });
    });

    Promise.all(queries)
        .then(() => res.json(results))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Database query failed" });
        });
};