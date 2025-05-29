const express = require("express");
const con = require("../config");
// GET API endpoint to fetch all records from the salesmaster table
// exports.getSalesMaster = async (req, res) => {
//   const { saleId } = req.params; // Assuming you're passing SaleID to fetch specific sales data
//   console.log(`Looking for Sale ID: ${saleId}`); // Debugging log
//   try {
//     await con.query(
//       "SELECT * FROM anahee.salesmaster WHERE SALEID = ?",
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
// exports.getSalesMaster = async (req, res) => {
//   const { saleId } = req.params;
//   let query = "SELECT * FROM anahee.salesmaster ORDER BY SALEID DESC";
//   let params = [];
//   // If saleId is provided, filter by ID
//   if (saleId) {
//     query += " WHERE SALEID = ?";
//     params.push(saleId);
//   }
//   con.query(query, params, (err, result) => {
//     if (err) {
//       console.error("❌ Error fetching sales data:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
//     if (result.length === 0) {
//       return res.status(404).json({ error: "No sales data found" });
//     }
//     res.json({ sales: result }); // Always return an array
//   });
// };
exports.getSalesMaster = (req, res) => {
  const { saleId } = req.params;
  let query = `
    SELECT 
      sm.SALEID,
      sm.NAME,
      sm.EMAIL,
      sm.CNAME,
      sm.COUNTRY,
      sm.ADDRESS,
      sm.NUMBER,
      sm.payment_mode,
      sm.CREATEDON, 
      sm.payment_status,
      sm.ORDER_STATUS,
      sd.ITEMID,
      sd.QTY,
      sd.AMOUNT,
      im.ITEMNAME,
      im.DESCRIPTION
    FROM anahee.salesmaster sm
    JOIN anahee.salesdetail sd ON sm.SALEID = sd.SALEID
    JOIN anahee.itemmaster im ON sd.ITEMID = im.ITEMID
  `;

  const params = [];

  // Filter if specific saleId is requested
  if (saleId) {
    query += " WHERE sm.SALEID = ?";
    params.push(saleId);
  }

  // Ensure results are ordered by SALEID in descending order
  query += " ORDER BY sm.SALEID DESC";

  con.query(query, params, (err, results) => {
    if (err) {
      console.error("❌ Error fetching sales details:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "No sales found" });
    }

    // Group by SALEID to organize order with its items
    const grouped = {};
    results.forEach((row) => {
      if (!grouped[row.SALEID]) {
        grouped[row.SALEID] = {
          SALEID: row.SALEID,
          NAME: row.NAME,
          EMAIL: row.EMAIL,
          CNAME: row.CNAME,
          COUNTRY: row.COUNTRY,
          ADDRESS: row.ADDRESS,
          NUMBER: row.NUMBER,
          PAYMENTMETHOD: row.payment_mode,
          CREATEDON: row.CREATEDON,
          PAYMENTSTATUS: row.payment_status,
          ORDER_STATUS: row.ORDER_STATUS,
          ITEMS: [],
        };
      }

      grouped[row.SALEID].ITEMS.push({
        ITEMID: row.ITEMID,
        ITEMNAME: row.ITEMNAME,
        DESCRIPTION: row.DESCRIPTION,
        QUANTITY: row.QTY,
        AMOUNT: row.AMOUNT,
      });
    });

    // Convert grouped object to array and sort by SALEID in descending order
    const finalResult = Object.values(grouped);
    finalResult.sort((a, b) => b.SALEID - a.SALEID); // Ensure correct order

    res.status(200).json({ sales: finalResult });
  });
};

// exports.getSalesMaster = async (req, res) => {
//   const { saleId } = req.params; // Assuming you're passing SaleID to fetch specific sales data
//   con.query("SELECT * FROM anahee.salesmaster WHERE SALEID = ?", [saleId], (err, result) => {
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
// exports.addSalesMaster = async (req, res) => {
//   const { firstName, lastName, companyName, country, address, city, state, postcode, phone, email } = req.body;
//   const newSale = {
//     NAME: `${firstName} ${lastName}`,
//     CNAME: companyName,
//     COUNTRY: country,
//     ADDRESS: `${address}, ${city}, ${state}, ${postcode}`,
//     NUMBER: phone,
//     EMAIL: email,
//   };
//   console.log("addSalesMaster",req.body);
//   try {
//     await con.query(
//       'INSERT INTO anahee.salesmaster SET ?', newSale,
//       (err, result) => {
//         if (err) {
//           console.error("❌ Error inserting sale record:", err);
//           return res.status(500).json({ error: "Database error" });
//         }
//         console.log("✅ Insert Success:", result);
//         res.json({ success: true, saleId:result.insertId, message: "Sale record added successfully!" });
//       }
//     );
//   } catch (error) {
//     console.error("❌ Unexpected error:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };
exports.addSalesMaster = (req, res) => {
  const {
    firstName,
    lastName,
    companyName,
    country,
    address,
    city,
    state,
    postcode,
    phone,
    email,
    items,
    // amount,
    paymentMethod,
    customerId,
  } = req.body;
  const now = new Date();
  const newSale = {
    NAME: `${firstName} ${lastName}`,
    CNAME: companyName,
    COUNTRY: country,
    ADDRESS: `${address}, ${city}, ${state}, ${postcode}`,
    NUMBER: phone,
    EMAIL: email,
    // AMOUNT: amount,
    payment_mode: paymentMethod,
    CUSTOMERID: customerId,
    CREATEDON: now,
    UPDATEDON: now,
  };
  console.log("📥 Incoming sale:", req.body);
  // Step 1: Insert into salesmaster
  con.query("INSERT INTO anahee.salesmaster SET ?", newSale, (err, result) => {
    if (err) {
      console.error("❌ Error inserting into salesmaster:", err);
      return res
        .status(500)
        .json({ error: "Failed to insert into salesmaster" });
    }
    const saleId = result.insertId;
    console.log("✅ SalesMaster Inserted with ID:", saleId);
    // Step 2: Insert each item into salesdetail
    let completed = 0;
    let hasError = false;
    items.forEach((item, index) => {
      const detail = {
        SALEID: saleId,
        ITEMID: item.productId,
        QTY: item.quantity,
        AMOUNT: item.price,
      };
      con.query(
        "INSERT INTO anahee.salesdetail SET ?",
        detail,
        (err, result) => {
          if (err) {
            if (!hasError) {
              hasError = true;
              console.error("❌ Error inserting into salesdetail:", err);
              return res
                .status(500)
                .json({ error: "Failed to insert item into salesdetail" });
            }
          }
          completed++;
          // When all inserts are done, send success response
          if (completed === items.length && !hasError) {
            console.log("✅ All items inserted into salesdetail");
            return res.json({
              success: true,
              saleId: saleId,
              message: "Sale and item details added successfully!",
            });
          }
        }
      );
    });
  });
};
// exports.addSalesMaster = async (req, res) => {
//     const { COMPANYID, FINYEAR, SERIES, SALEID, SALEDATE, TMODE, CUSTOMERID, ITEMQTY, TOTALAMOUNT, DISCOUNT, DISCAMOUNT, NETAMOUNT, AMOUNTPAID, BALANCE } = req.body;
//     const newSale = {
//         COMPANYID, FINYEAR, SERIES, SALEID, SALEDATE, TMODE, CUSTOMERID, ITEMQTY, TOTALAMOUNT, DISCOUNT, DISCAMOUNT, NETAMOUNT, AMOUNTPAID, BALANCE
//     };
//     try {
//         await con.query(
//             'INSERT INTO anahee.salesmaster SET ?', newSale,
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
//         'INSERT INTO anahee.salesmaster SET ?', newSale,
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
exports.updateOrderStatus = async (req, res) => {
  const { SALEID, ORDER_STATUS } = req.body;
  if (!SALEID) {
    return res.status(400).json({ error: "Missing SalesMaster ID (SALEID)" });
  }
  if (!ORDER_STATUS) {
    return res.status(400).json({ error: "Missing or invalid ORDER_STATUS" });
  }
  const now = new Date();
  try {
    con.query(
      "UPDATE salesmaster SET ORDER_STATUS = ?, UPDATEDON = ? WHERE SALEID = ?",
      [ORDER_STATUS, now, SALEID],
      (err, result) => {
        if (err) {
          console.error("❌ Error updating order status:", err);
          return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "Sale not found" });
        }
        res.json({
          success: true,
          message: "Order status updated successfully!",
        });
      }
    );
  } catch (error) {
    console.error("❌ Unexpected error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
exports.updateSalesMaster = async (req, res) => {
  const {
    merchant_order_id,
    payment_mode,
    provider_reference_id,
    phonepe_status,
    payment_status,
    transaction_id,
    saleId,
  } = req.body;
  const updateFields = {
    PAYMENT_MODE: payment_mode,
    PROVIDER_REFERENCE_ID: provider_reference_id,
    PHONEPE_STATUS: phonepe_status,
    PAYMENT_STATUS: payment_status,
    TRANSACTION_ID: transaction_id,
    MERCHANT_ORDER_ID: merchant_order_id,
  };
  try {
    await con.query(
      "UPDATE anahee.salesmaster SET ? WHERE SALEID = ?",
      [updateFields, saleId],
      (err, result) => {
        if (err) {
          console.error(":x: Error updating sale record:", err);
          return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "Record not found" });
        }
        console.log(":white_tick: Update Success:", result);
        res.json({
          success: true,
          message: "Sale record updated successfully!",
        });
      }
    );
  } catch (error) {
    console.error(":x: Unexpected error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllOrders = (req, res) => {
  const { customerId } = req.params;

  const query = `
    SELECT
      sm.SALEID,
      sm.NAME,
      sm.EMAIL,
      sm.CNAME,
      sm.COUNTRY,
      sm.ADDRESS,
      sm.NUMBER,
      sm.payment_mode,
      sm.CREATEDON,
      sm.payment_status,
      sm.ORDER_STATUS,
      sd.ITEMID,
      sd.QTY,
      sd.AMOUNT,
      im.ITEMNAME,
      im.DESCRIPTION,
      ii.PHOTO
    FROM anahee.salesmaster sm
    LEFT JOIN anahee.salesdetail sd ON sm.SALEID = sd.SALEID
    LEFT JOIN anahee.itemmaster im ON sd.ITEMID = im.ITEMID
    LEFT JOIN anahee.itemimage ii ON im.ITEMID = ii.ITEMID
    WHERE sm.CUSTOMERID = ?
    ORDER BY sm.SALEID DESC
  `;

  con.query(query, [customerId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching sales details:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "No sales found" });
    }

    const grouped = {};
    results.forEach((row) => {
      if (!grouped[row.SALEID]) {
        grouped[row.SALEID] = {
          SALEID: row.SALEID,
          NAME: row.NAME,
          EMAIL: row.EMAIL,
          CNAME: row.CNAME,
          COUNTRY: row.COUNTRY,
          ADDRESS: row.ADDRESS,
          NUMBER: row.NUMBER,
          PAYMENTMETHOD: row.payment_mode,
          CREATEDON: row.CREATEDON,
          PAYMENTSTATUS: row.payment_status,
          ORDER_STATUS: row.ORDER_STATUS,
          ITEMS: [],
        };
      }

      grouped[row.SALEID].ITEMS.push({
        ITEMID: row.ITEMID,
        ITEMNAME: row.ITEMNAME,
        DESCRIPTION: row.DESCRIPTION,
        QUANTITY: row.QTY,
        AMOUNT: row.AMOUNT,
        PHOTO: row.PHOTO,
      });
    });

    const finalResult = Object.values(grouped);
    finalResult.sort((a, b) => b.SALEID - a.SALEID); // Ensure descending order

    res.status(200).json({ orders: finalResult });
  });
};

exports.cancelOrder = (req, res) => {
  const { saleId } = req.params;

  const query = `
    UPDATE anahee.salesmaster
    SET ORDER_STATUS = 'Cancel'
    WHERE SALEID = ?
  `;

  con.query(query, [saleId], (err, result) => {
    if (err) {
      console.error("❌ Error cancelling order:", err);
      return res.status(500).json({ error: "Failed to cancel order" });
    }
    res.status(200).json({ message: "Order cancelled successfully" });
  });
};

exports.updateSales = async (req, res) => {
  const { id } = req.params;
  console.log(":memo: Updating SALEID:", id);
  if (!id) return res.status(400).json({ error: "Missing SALEID" });
  const saleId = Number(id);
  if (isNaN(saleId)) return res.status(400).json({ error: "Invalid SALEID" });
  const { items, tax, discount, shipping, customerDetails } = req.body;
  if (!customerDetails || typeof customerDetails !== "object") {
    return res
      .status(400)
      .json({ error: "Missing or invalid customerDetails" });
  }
  const {
    COMPANYID,
    FINYEAR,
    SERIES,
    SALEDATE,
    TMODE,
    CUSTOMERID,
    TOTALAMOUNT,
    DISCAMOUNT,
    NETAMOUNT,
    AMOUNTPAID,
    BALANCE,
  } = customerDetails;
  const ITEMQTY = items.reduce((sum, item) => sum + (item.QUANTITY || 0), 0);
  const updatedSalesMaster = {
    COMPANYID,
    FINYEAR,
    SERIES,
    SALEDATE,
    TMODE,
    CUSTOMERID,
    ITEMQTY,
    TOTALAMOUNT,
    DISCOUNT: discount,
    DISCAMOUNT,
    NETAMOUNT,
    AMOUNTPAID,
    BALANCE,
  };
  try {
    // 1. Update salesmaster table
    await new Promise((resolve, reject) => {
      con.query(
        "UPDATE salesmaster SET ? WHERE SALEID = ?",
        [updatedSalesMaster, saleId],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
    // 2. Update each item in itemmaster (ITEMNAME, DESCRIPTION, AMOUNT)
    for (const item of items) {
      const { ITEMID, ITEMNAME, DESCRIPTION } = item;
      await new Promise((resolve, reject) => {
        con.query(
          "UPDATE itemmaster SET ITEMNAME = ?, DESCRIPTION = ? WHERE ITEMID = ?",
          [ITEMNAME, DESCRIPTION, ITEMID],
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          }
        );
      });
    }
    // 3. Delete existing salesdetail entries for this SALEID
    await new Promise((resolve, reject) => {
      con.query(
        "DELETE FROM salesdetail WHERE SALEID = ?",
        [saleId],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
    // 4. Insert new salesdetail rows with QTY
    const salesDetailValues = items.map((item) => [
      saleId,
      item.ITEMID,
      item.QUANTITY,
      item.AMOUNT,
    ]);
    await new Promise((resolve, reject) => {
      con.query(
        "INSERT INTO salesdetail (SALEID, ITEMID, QTY, AMOUNT) VALUES ?",
        [salesDetailValues],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
    res.json({
      success: true,
      message: "Sales, items, and quantities updated successfully!",
    });
  } catch (error) {
    console.error(":x: Error updating sale:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
