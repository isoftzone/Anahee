const express = require("express");
const con = require('../config'); // Ensure this is correctly set up
const router = express.Router();

// ✅ Get Sales Detail Data
// exports.getSalesDetail = async (req, res) => {
//     const { saleId } = req.params;  // Assuming you're passing SALEID to fetch specific sales details

//     console.log(`Fetching Sales Detail for SALEID: ${saleId}`);  // Debugging log

//     try {
//         // Check if saleId is passed and not undefined or null
//         if (!saleId) {
//             return res.status(400).json({ error: "SALEID is required" });
//         }

//         // Query the database to find the sales details with the given SALEID
//         con.query(
//             "SELECT * FROM madhuban.salesdetail WHERE SALEID = ?", [saleId],
//             (err, result) => {
//                 if (err) {
//                     console.error("❌ Error fetching sales detail:", err);
//                     return res.status(500).json({ error: "Database error" });
//                 }

//                 // Check if the result array is empty
//                 if (result.length === 0) {
//                     console.log(`No sale detail found for SALEID: ${saleId}`); // Debugging log
//                     return res.status(404).json({ error: "Sale detail not found" });
//                 }

//                 console.log("Fetched Sale Detail Data:", result); // Debugging log
//                 res.json({ salesDetailData: result }); // Return sales detail data
//             }
//         );
//     } catch (error) {
//         console.error("❌ Unexpected error:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };

exports.getSalesDetail = async (req, res) => {
    const { saleId } = req.params; // Get saleId from request params (optional)

    console.log(`Fetching Sales Detail for SALEID: ${saleId || "ALL SALES"}`); // Debugging log

    try {
        let query = "SELECT * FROM madhuban.salesdetail";
        let queryParams = [];

        if (saleId) {
            query += " WHERE SALEID = ?";
            queryParams.push(saleId);
        }

        con.query(query, queryParams, (err, result) => {
            if (err) {
                console.error("❌ Error fetching sales detail:", err);
                return res.status(500).json({ error: "Database error" });
            }

            if (result.length === 0) {
                console.log(`No sales details found for SALEID: ${saleId || "ALL SALES"}`); // Debugging log
                return res.status(404).json({ error: "No sales details found" });
            }

            console.log("Fetched Sale Detail Data:", result); // Debugging log
            res.json({ salesDetailData: result }); // Return sales detail data
        });
    } catch (error) {
        console.error("❌ Unexpected error:", error);
        res.status(500).json({ error: "Server error" });
    }
};


// ✅ Insert New Sales Detail
// exports.addSalesDetail = async (req, res) => {
//     const {
//         COMPANYID, FINYEAR, SERIES, SALEID, CUSTOMERID, EMPID, EMPNAME, SRNO, BARCODE, ITEMID, ITEMDESC, QTY, TAX, TAXAMOUNT, RATE, PURPRICE
//     } = req.body;

//     const newSalesDetail = {
//         COMPANYID, FINYEAR, SERIES, SALEID, CUSTOMERID, EMPID, EMPNAME, SRNO, BARCODE, ITEMID, ITEMDESC, QTY, TAX, TAXAMOUNT, RATE, PURPRICE
//     };

//     try {
//         await con.query(
//             'INSERT INTO madhuban.salesdetail SET ?', newSalesDetail,
//             (err, result) => {
//                 if (err) {
//                     console.error("❌ Error inserting sales detail:", err);
//                     return res.status(500).json({ error: "Database error" });
//                 }
//                 console.log("✅ Insert Success:", result);
//                 res.json({ success: true, message: "Sales detail added successfully!", salesDetailID: result.insertId });
//             }
//         );
//     } catch (error) {
//         console.error("❌ Unexpected error:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };

// ✅ Add Sales Detail for the cart
exports.addSalesDetail = async (req, res) => {
    const { couponCode, items } = req.body;  // Extract coupon code and cart items

    try {
        // Iterate through each item in the cart and insert it into the database
        items.forEach(item => {
            const { ITEMDESC, QTY, AMOUNT } = item;

            const newSalesDetail = {
                BARCODE: couponCode,  // Store coupon code in BARCODE
                ITEMDESC: ITEMDESC,       // Store product name in ITEMID
                QTY: QTY,             // Store quantity in QTY
                AMOUNT: AMOUNT,       // Store subtotal in AMOUNT
                // Add other necessary details like SALEID, CUSTOMERID, etc. if needed
            };

            con.query(
                'INSERT INTO madhuban.salesdetail SET ?', newSalesDetail,
                (err, result) => {
                    if (err) {
                        console.error("❌ Error inserting sales detail:", err);
                        return res.status(500).json({ error: "Database error" });
                    }
                    console.log("✅ Insert Success:", result);
                }
            );
        });

        res.json({ success: true, message: "Sales details added successfully!" });
    } catch (error) {
        console.error("❌ Unexpected error:", error);
        res.status(500).json({ error: "Server error" });
    }
};


// ✅ Update Sales Detail
exports.updateSalesDetail = async (req, res) => {
    const { saleId, srno } = req.params;  // Assuming SALEID and SRNO are passed as params to update specific detail

    console.log(`Updating Sales Detail for SALEID: ${saleId}, SRNO: ${srno}`);  // Debugging log

    if (!saleId || !srno) {
        return res.status(400).json({ error: "SALEID and SRNO are required" });
    }

    const {
        COMPANYID, FINYEAR, SERIES, CUSTOMERID, EMPID, EMPNAME, BARCODE, ITEMID, ITEMDESC, QTY, TAX, TAXAMOUNT, RATE, PURPRICE
    } = req.body;

    const updatedSalesDetail = {
        COMPANYID, FINYEAR, SERIES, CUSTOMERID, EMPID, EMPNAME, BARCODE, ITEMID, ITEMDESC, QTY, TAX, TAXAMOUNT, RATE, PURPRICE
    };

    try {
        await con.query(
            "UPDATE madhuban.salesdetail SET ? WHERE SALEID = ? AND SRNO = ?", 
            [updatedSalesDetail, saleId, srno], 
            (err, result) => {
                if (err) {
                    console.error("❌ Error updating sales detail:", err);
                    return res.status(500).json({ error: "Database error" });
                }
                res.json({ success: true, message: "Sales detail updated successfully!" });
            }
        );
    } catch (error) {
        console.error("❌ Unexpected error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// ✅ Delete Sales Detail
exports.deleteSalesDetail = async (req, res) => {
    const { saleId, srno } = req.params;  // Assuming SALEID and SRNO are passed as params to delete specific detail

    console.log(`Deleting Sales Detail for SALEID: ${saleId}, SRNO: ${srno}`);  // Debugging log

    if (!saleId || !srno) {
        return res.status(400).json({ error: "SALEID and SRNO are required" });
    }

    try {
        await con.query(
            "DELETE FROM madhuban.salesdetail WHERE SALEID = ? AND SRNO = ?", 
            [saleId, srno], 
            (err, result) => {
                if (err) {
                    console.error("❌ Error deleting sales detail:", err);
                    return res.status(500).json({ error: "Database error" });
                }
                res.json({ success: true, message: "Sales detail deleted successfully!" });
            }
        );
    } catch (error) {
        console.error("❌ Unexpected error:", error);
        res.status(500).json({ error: "Server error" });
    }
};




// ✅ Get Invoices (Sales Master + Total Amount from Sales Detail)
exports.getInvoices = async (req, res) => {
  try {
    const query = `
      SELECT 
        sm.SALEID AS id, 
        sm.NAME, 
        sm.EMAIL, 
        sm.CREATED_AT AS date, 
        SUM(sd.AMOUNT) AS amount
      FROM madhuban.salesmaster sm
      LEFT JOIN madhuban.salesdetail sd ON sm.SALEID = sd.SALEID
      GROUP BY sm.SALEID
      ORDER BY sm.CREATED_AT DESC;
    `;

    con.query(query, (err, results) => {
      if (err) {
        console.error("❌ Error fetching invoice data:", err);
        return res.status(500).json({ error: "Database error" });
      }

      res.json({ invoices: results });
    });
  } catch (error) {
    console.error("❌ Unexpected error:", error);
    res.status(500).json({ error: "Server error" });
  }
};


