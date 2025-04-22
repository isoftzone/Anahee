const express = require("express");
const con = require("../config");

// GET API endpoint to fetch all records from the salesmaster table


// exports.getSalesMaster = async (req, res) => {
//   const { saleId } = req.params; // Assuming you're passing SaleID to fetch specific sales data

//   console.log(`Looking for Sale ID: ${saleId}`); // Debugging log

//   try {
//     await con.query(
//       "SELECT * FROM madhuban.salesmaster WHERE SALEID = ?",
//       [saleId],
//       (err, result) => {
//         if (err) {
//           console.error("❌ Error fetching sales data:", err);
//           return res.status(500).json({ error: "Database error" });
//         }

//         if (result.length === 0) {
//           console.log(`No sale found for Sale ID: ${saleId}`); // Debugging log
//           return res.status(404).json({ error: "Sale data not found" });
//         }

//         console.log("Fetched Sale Data:", result); // Debugging log
//         res.json({ saleData: result }); // Return sales data
//       }
//     );
//   } catch (error) {
//     console.error("❌ Unexpected error:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

exports.getSalesMaster = async (req, res) => {
  const { saleId } = req.params;

  let query = "SELECT * FROM madhuban.salesmaster";
  let params = [];

  // If saleId is provided, filter by ID
  if (saleId) {
    query += " WHERE SALEID = ?";
    params.push(saleId);
  }

  con.query(query, params, (err, result) => {
    if (err) {
      console.error("❌ Error fetching sales data:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "No sales data found" });
    }

    res.json({ sales: result }); // Always return an array
  });
};


// exports.getSalesMaster = async (req, res) => {
//   const { saleId } = req.params; // Assuming you're passing SaleID to fetch specific sales data
//   con.query("SELECT * FROM madhuban.salesmaster WHERE SALEID = ?", [saleId], (err, result) => {
//       if (err) {
//           console.error("❌ Error fetching sales data:", err);
//           return res.status(500).json({ error: "Database error" });
//       }
//       if (result.length === 0) {
//           return res.status(404).json({ error: "Sale data not found" });
//       }
//       // res.json({ sale: result[0] });
//       res.json({ sale: result }); // Ensure it's an array
//   });
  
// };



// POST API endpoint to insert data into salesmaster table







exports.addSalesMaster = async (req, res) => {
  const { firstName, lastName, companyName, country, address, city, state, postcode, phone, email } = req.body;

  const newSale = {
    NAME: `${firstName} ${lastName}`,
    CNAME: companyName,
    COUNTRY: country,
    ADDRESS: `${address}, ${city}, ${state}, ${postcode}`,
    NUMBER: phone,
    EMAIL: email,
  };

  try {
    await con.query(
      'INSERT INTO madhuban.salesmaster SET ?', newSale,
      (err, result) => {
        if (err) {
          console.error("❌ Error inserting sale record:", err);
          return res.status(500).json({ error: "Database error" });
        }
        console.log("✅ Insert Success:", result);
        res.json({ success: true, message: "Sale record added successfully!" });
      }
    );
  } catch (error) {
    console.error("❌ Unexpected error:", error);
    res.status(500).json({ error: "Server error" });
  }
};


// exports.addSalesMaster = async (req, res) => {
//     const { COMPANYID, FINYEAR, SERIES, SALEID, SALEDATE, TMODE, CUSTOMERID, ITEMQTY, TOTALAMOUNT, DISCOUNT, DISCAMOUNT, NETAMOUNT, AMOUNTPAID, BALANCE } = req.body;

//     const newSale = {
//         COMPANYID, FINYEAR, SERIES, SALEID, SALEDATE, TMODE, CUSTOMERID, ITEMQTY, TOTALAMOUNT, DISCOUNT, DISCAMOUNT, NETAMOUNT, AMOUNTPAID, BALANCE
//     };

//     try {
//         await con.query(
//             'INSERT INTO madhuban.salesmaster SET ?', newSale,
//             (err, result) => {
//                 if (err) {
//                     console.error("❌ Error inserting sale record:", err);
//                     return res.status(500).json({ error: "Database error" });
//                 }
//                 console.log("✅ Insert Success:", result);
//                 res.json({ success: true, message: "Sale record added successfully!", saleID: result.insertId });
//             }
//         );
//     } catch (error) {
//         console.error("❌ Unexpected error:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };

// GET API endpoint to handle pagination for salesmaster table
exports.salesMasterPaginated = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10; // Number of records per page
  const offset = (page - 1) * limit;

  // Fetch total count of records
  con.query(
    "SELECT COUNT(*) as totalCount FROM salesmaster",
    (error, countRows) => {
      if (error) {
        console.error("Error fetching total count of records:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      const totalCount = countRows[0].totalCount;

      // Fetch data with pagination
      con.query(
        `SELECT * FROM salesmaster LIMIT ? OFFSET ?`,
        [limit, offset],
        (error, rows) => {
          if (error) {
            console.error("Error fetching data with pagination:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }

          // Calculate total pages
          const totalPages = Math.ceil(totalCount / limit);

          // Send JSON response with pagination metadata
          res.json({
            totalRecords: totalCount,
            totalPages: totalPages,
            currentPage: page,
            sales: rows,
          });
        }
      );
    }
  );
};

// exports.addSalesMaster = async (req, res) => {
//     const {
//       firstName,
//       lastName,
//       companyName,
//       country,
//       streetAddress,
//       townCity,
//       stateCounty,
//       postcodeZip,
//       phone,
//       emailAddress,
//       orderNotes,
//       saleId,
//       saleDate,
//       totalAmount,
//       discount,
//       discountAmount,
//       netAmount,
//       amountPaid,
//       balance
//     } = req.body;

//     const newSale = {
//       COMPANYID: 'YourCompanyID', // Replace with actual company ID
//       FINYEAR: 'YourFinancialYear', // Replace with actual financial year
//       SERIES: 'YourSeries', // Replace with actual series
//       SALEID: saleId,
//       SALEDATE: saleDate,
//       TMODE: 'YourTransactionMode', // Replace with actual transaction mode
//       CUSTOMERID: 'YourCustomerID', // Replace with actual customer ID
//       ITEMQTY: 'YourItemQuantity', // Replace with actual item quantity
//       TOTALAMOUNT: totalAmount,
//       DISCOUNT: discount,
//       DISCAMOUNT: discountAmount,
//       NETAMOUNT: netAmount,
//       AMOUNTPAID: amountPaid,
//       BALANCE: balance,
//       NAME: `${firstName} ${lastName}`, // Combine first and last name
//       CNAME: companyName,
//       ADDRESS: `${streetAddress}, ${townCity}, ${stateCounty}, ${postcodeZip}`, // Combine address fields
//       COUNTRY: country,
//       NUMBER: phone,
//       EMAIL: emailAddress
//     };

//     try {
//       await con.query(
//         'INSERT INTO madhuban.salesmaster SET ?', newSale,
//         (err, result) => {
//           if (err) {
//             console.error("❌ Error inserting sale record:", err);
//             return res.status(500).json({ error: "Database error" });
//           }
//           console.log("✅ Insert Success:", result);
//           res.json({ success: true, message: "Sale record added successfully!", saleID: result.insertId });
//         }
//       );
//     } catch (error) {
//       console.error("❌ Unexpected error:", error);
//       res.status(500).json({ error: "Server error" });
//     }
//   };

// Update SalesMaster Item
// exports.updateSalesMaster = async (req, res) => {
//     const { id } = req.params;  // Ensure id is coming from URL params
//     console.log("Received SalesMaster ID for Update:", id);

//     if (!id) {
//         return res.status(400).json({ error: "Missing SalesMaster ID" });
//     }

//     const editId = Number(id); // Convert id to a number
//     if (isNaN(editId)) {
//         return res.status(400).json({ error: "Invalid SalesMaster ID" });
//     }

//     upload.single('photo')(req, res, function (err) {
//         if (err) {
//             console.error("❌ Error uploading files:", err);
//             return res.status(500).json({ error: "File upload error" });
//         }

//         const { COMPANYID, FINYEAR, SERIES, SALEID, SALEDATE, TMODE, CUSTOMERID, ITEMQTY, TOTALAMOUNT, DISCOUNT, DISCAMOUNT, NETAMOUNT, AMOUNTPAID, BALANCE } = req.body;
//         let photo = req.file ? req.file.filename : null; // Get the uploaded file if any

//         const updatedSalesMaster = {
//             COMPANYID, FINYEAR, SERIES, SALEID, SALEDATE, TMODE, CUSTOMERID, ITEMQTY, TOTALAMOUNT, DISCOUNT, DISCAMOUNT, NETAMOUNT, AMOUNTPAID, BALANCE, PHOTO: photo
//         };

//         try {
//             // Update the salesmaster record
//             con.query("UPDATE salesmaster SET ? WHERE SALEID = ?", [updatedSalesMaster, editId], (err, result) => {
//                 if (err) {
//                     console.error("❌ Error updating salesmaster:", err);
//                     return res.status(500).json({ error: "Database error" });
//                 }
//                 res.json({ success: true, message: "SalesMaster updated successfully!" });
//             });
//         } catch (error) {
//             console.error("❌ Unexpected error:", error);
//             res.status(500).json({ error: "Server error" });
//         }
//     });
// };

// Delete SalesMaster Item
// exports.deleteSalesMaster = async (req, res) => {
//     const { id } = req.params;

//     if (!id) {
//         return res.status(400).json({ error: "Missing SalesMaster ID" });
//     }

//     const deleteId = Number(id); // Convert id to a number
//     if (isNaN(deleteId)) {
//         return res.status(400).json({ error: "Invalid SalesMaster ID" });
//     }

//     try {
//         // Delete record from salesmaster table by SALEID
//         await con.query("DELETE FROM salesmaster WHERE SALEID = ?", [deleteId], (err, result) => {
//             if (err) {
//                 console.error("❌ Error deleting salesmaster item:", err);
//                 return res.status(500).json({ error: "Database error" });
//             }
//             res.json({ success: true, message: "SalesMaster item deleted successfully!" });
//         });
//     } catch (error) {
//         console.error("❌ Unexpected error:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };
