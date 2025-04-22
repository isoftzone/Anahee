const con = require("../config"); // Assuming this is your MySQL connection

// Controller to fetch data from the rfmaster table with optional filtering by codetype and pagination
// exports.getrfmaster = async (req, res) => {
//     try {
//         // Destructure query parameters and set defaults for pagination
//         const { codetype, page = 0, limit = 10 } = req.query;
//         const offset = (page - 0) * limit;

//         let query = 'SELECT * FROM rfmaster'; // Base query
//         const queryParams = [];

//         // Add filtering if codetype is provided (and not 'All')
//         if (codetype && codetype !== 'All') {
//             query += ' WHERE CODETYPE = ?';
//             queryParams.push(codetype);
//         }

//         query += ' LIMIT ?, ?'; // Pagination
//         queryParams.push(offset, parseInt(limit));
        
//         console.log("Executing query:", query, queryParams);
        
//         // Fetch filtered data with pagination
//         const results = await new Promise((resolve, reject) => {
//             con.query(query, queryParams, (err, results) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(results);
//                 }
//             });
//         });

//         // Fetch total records count for pagination
//         let countQuery = 'SELECT COUNT(*) AS totalRecords FROM rfmaster';
//         const countParams = [];
        
//         if (codetype && codetype !== 'All') {
//             countQuery += ' WHERE CODETYPE = ?';
//             countParams.push(codetype);
//         }

//         const countResults = await new Promise((resolve, reject) => {
//             con.query(countQuery, countParams, (err, countResult) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(countResult[0].totalRecords);
//                 }
//             });
//         });

//         // Return data and total record count in response
//         return res.status(200).json({
//             message: 'Data retrieved successfully',
//             data: results,
//             totalRecords: countResults,
//         });

//     } catch (error) {
//         console.error('Database query error in getrfmaster:', error);
//         return res.status(500).json({
//             error: 'Database error in getrfmaster',
//             details: error.message,
//         });
//     }
// };

exports.getrfmaster = async (req, res) => {
    try {
        const query = "SELECT formName AS FormName, control AS Control, name AS NAME, sequence AS SEQUENCE, type AS Type, value AS Value FROM rfmaster";

        con.query(query, (err, results) => {
            if (err) {
                console.error("Database query error:", err);
                return res.status(500).json({ error: "Database query error", details: err.message });
            }

            if (results.length === 0) {
                return res.status(200).json({ message: "No data found", data: [] });
            }

            return res.status(200).json({
                message: "Data retrieved successfully",
                data: results,
            });
        });
    } catch (error) {
        console.error("Error in /getrfmaster:", error);
        return res.status(500).json({ error: "Internal server error", details: error.message });
    }
};


// Controller to fetch data from master_set table with pagination
exports.getMasterSet = async (req, res) => {
    try {
      
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.limit) || 10; 
        const offset = (page - 1) * pageSize;

        // Query to fetch data with pagination
        const results = await new Promise((resolve, reject) => {
            con.query(
                'SELECT * FROM master_set LIMIT ?, ?',
                [offset, pageSize],
                (err, results) => {
                    if (err) {
                        reject(err); 
                    } else {
                        resolve(results); 
                    }
                }
            );
        });

       
        const countResults = await new Promise((resolve, reject) => {
            con.query(
                'SELECT COUNT(*) AS totalRecords FROM master_set',
                (err, count) => {
                    if (err) {
                        reject(err); 
                    } else {
                        resolve(count[0].totalRecords); 
                    }
                }
            );
        });

     
        return res.status(200).json({
            message: 'Data retrieved successfully',
            records: results,
            totalRecords: countResults, 
        });

    } catch (error) {
        console.error('Database query error in getMasterSet:', error);
        return res.status(500).json({
            error: 'Database error in getMasterSet',
            details: error.message,
        });
    }
};
