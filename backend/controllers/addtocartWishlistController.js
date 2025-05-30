const express = require('express');
const con = require('../config');
const util = require('util');
// Promisify con.query to use async/await
const query = util.promisify(con.query).bind(con);
exports.addtocartWishlistproduct = async (req, res) => {
  console.log("this is data");
  try {
    const { CUSTOMERID, ITEMID, quantity, type } = req.body;
    console.log("this is data");
    // Basic validation
    if (!CUSTOMERID || !ITEMID) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const allowedTypes = ['cart', 'wishlist'];
    if (!allowedTypes.includes(type.toLowerCase())) {
      return res.status(400).json({ message: 'Invalid type. Must be "cart" or "wishlist".' });
    }
   
    const insertSql = `INSERT INTO customer_cart_wishlist (CUSTOMERID, ITEMID, quantity, type)
                       VALUES (?, ?, ?, ?)`;
    const values = [CUSTOMERID, ITEMID, quantity, type];
    const result = await query(insertSql, values);
    console.log('Inserted row id:', result.insertId);
    return res.status(201).json({ message: 'Data inserted successfully', id: result.insertId });
  } catch (err) {
    console.error('Error inserting into database:', err);
    return res.status(500).json({ message: 'Error inserting data' });
  }
};
exports.getCartWishlistProduct = async (req, res) => {
  try {
    const { CUSTOMERID } = req.params;
   if (!CUSTOMERID) {
      return res.status(400).json({ message: 'Customer ID is required' });
    }
    const querySql = `
      SELECT * FROM customer_cart_wishlist
      WHERE CUSTOMERID = ?`;
    const items = await query(querySql, [CUSTOMERID]);
    return res.status(200).json({ data: items });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving data' });
  }
}
exports.deletefromcartWishlist = async (req, res) => {
  try {
    const { CUSTOMERID, ITEMID, type } = req.body;
    // Validate required fields
    if (!CUSTOMERID || !ITEMID || !type) {
      return res.status(400).json({ success: false, message: 'CUSTOMERID, ITEMID, and type are required.' });
    }
    const validTypes = ["cart", "wishlist"];
    if (!validTypes.includes(type.toLowerCase())) {
      return res.status(400).json({ success: false, message: 'Invalid type. Must be "cart" or "wishlist".' });
    }
    const deleteQuery = `
      DELETE FROM customer_cart_wishlist
      WHERE CUSTOMERID = ? AND ITEMID = ? AND type = ?
    `;
    const values = [CUSTOMERID, ITEMID, type.toLowerCase()];
    const result = await query(deleteQuery, values);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'No matching record found to delete.' });
    }
    return res.status(200).json({ success: true, message: 'Item removed successfully.' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while deleting item from cart/wishlist.',
      error: error.message,
    });
  }
};
exports.clearALlcartwishlist = async (req, res) => {
  try {
    const { CUSTOMERID, type } = req.body;
    if (!CUSTOMERID) {
      return res.status(400).json({ message: 'CUSTOMERID is required' });
    }
    if (!type || (type !== 'cart' && type !== 'wishlist')) {
      return res.status(400).json({ message: 'Valid type (cart or wishlist) is required' });
    }
    const deleteSql = `
      DELETE FROM customer_cart_wishlist
      WHERE CUSTOMERID = ? AND type = ?
    `;
    const result = await query(deleteSql, [CUSTOMERID, type]);
    return res.status(200).json({
      message: `${type} cleared successfully`,
      deletedCount: result.affectedRows
    });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
exports.addtocartwishlistAction = async (req, res) => {
    try {
        const { CUSTOMERID, ITEMID, quantity, type, action } = req.body;
        if (!CUSTOMERID || !ITEMID || !type || !action) {
            return res.status(400).json({ message: 'All fields (CUSTOMERID, ITEMID, type, action) are required' });
        }
        
        const allowedActions = ['increment', 'decrement'];
        if (!allowedActions.includes(action)) {
            return res.status(400).json({ message: 'Invalid action. Must be "increment" or "decrement".' });
        }
        // Check if item exists in cart
        const checkSql = `SELECT * FROM customer_cart_wishlist WHERE CUSTOMERID = ? AND ITEMID = ? AND type = ?`;
        const rows = await query(checkSql, [CUSTOMERID, ITEMID, type]);
        if (rows.length > 0) {
            const currentQty = rows[0].quantity;
            if (action === 'increment') {
                const updateSql = `UPDATE customer_cart_wishlist SET quantity = ? WHERE CUSTOMERID = ? AND ITEMID = ? AND type = ?`;
                await query(updateSql, [currentQty + 1, CUSTOMERID, ITEMID, type]);
                return res.status(200).json({ message: 'Quantity increased' });
            } else if (action === 'decrement') {
                if (currentQty > 1) {
                    const updateSql = `UPDATE customer_cart_wishlist SET quantity = ? WHERE CUSTOMERID = ? AND ITEMID = ? AND type = ?`;
                    await query(updateSql, [currentQty - 1, CUSTOMERID, ITEMID, type]);
                    return res.status(200).json({ message: 'Quantity decreased' });
                } else {
                    // const deleteSql = `DELETE FROM customer_cart_wishlist WHERE CUSTOMERID = ? AND ITEMID = ? AND type = ?`;
                   
                    const updateNullSql = `UPDATE customer_cart_wishlist SET quantity = NULL WHERE CUSTOMERID = ? AND ITEMID = ? AND type = ?  `
                    await query(updateNullSql, [CUSTOMERID, ITEMID, type]);
                    return res.status(200).json({ message: 'Quantity set to Null' });
                }
            }
        } else {
            if (action === 'increment') {
                const insertSql = `INSERT INTO customer_cart_wishlist (CUSTOMERID, ITEMID, quantity, type)
                                   VALUES (?, ?, 1, ?)`;
                await query(insertSql, [CUSTOMERID, ITEMID, type]);
                return res.status(201).json({ message: 'Item added to cart' });
            } else {
                return res.status(400).json({ message: 'Cannot decrement, item not in cart' });
            }
        }
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.getAllWishlistItems = (req, res) => {
  const customerId = req.params.customerId;
  const query = `
    SELECT 
      im.*, 
      ii.PHOTO, 
      cw.quantity 
    FROM customer_cart_wishlist cw
    LEFT JOIN itemmaster im ON cw.ITEMID = im.ITEMID
    LEFT JOIN itemimage ii ON cw.ITEMID = ii.ITEMID
    WHERE cw.CUSTOMERID = ? AND cw.type = 'wishlist'
    ORDER BY im.ITEMID ASC;
  `;
  con.query(query, [customerId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching wishlist items:", err);
      return res.status(500).json({ error: "Database error", details: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "No wishlist items found" });
    }
    const transformedItems = results.map((item) => ({
      id: String(item.ITEMID),
      sku: item.BARCODE,
      name: item.ITEMNAME,
      price: item.SALEPRICE,
      discount: item.DISCOUNT ?? 0,
      offerEnd: "2024-10-05 12:11:00",
      new: false,
      rating: 4,
      saleCount: 54,
      category: item.CATEGORY ? [item.CATEGORY] : [],
      tag: ["fashion", "men", "jacket", "full sleeve"],
      variation: [
        {
          color: item.COLOR,
          image: (item.PHOTO && item.PHOTO.split(",")[0]) || "",
          size: [{ name: item.I_SIZE, stock: item.MAXQTY }],
        },
      ],
      image: (item.PHOTO && item.PHOTO.split(",")) || [],
      shortDescription: item.DESCRIPTION,
      fullDescription: "Full description here",
      Product_Details: item.PRODUCT_DETAILS,
      quantity: item.quantity || 1,
    }));
    res.json({ success: true, data: transformedItems });
  });
};
exports.getAllCartItems = (req, res) => {
  const customerId = req.params.customerId;
  const query = `
    SELECT 
      im.*, 
      ii.PHOTO, 
      cw.quantity 
    FROM customer_cart_wishlist cw
    LEFT JOIN itemmaster im ON cw.ITEMID = im.ITEMID
    LEFT JOIN itemimage ii ON cw.ITEMID = ii.ITEMID
    WHERE cw.CUSTOMERID = ? AND cw.type = 'cart'
    ORDER BY im.ITEMID ASC;
  `;
  con.query(query, [customerId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching wishlist items:", err);
      return res.status(500).json({ error: "Database error", details: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "No wishlist items found" });
    }
    const transformedItems = results.map((item) => ({
      id: String(item.ITEMID),
      sku: item.BARCODE,
      name: item.ITEMNAME,
      price: item.SALEPRICE,
      discount: item.DISCOUNT ?? 0,
      offerEnd: "2024-10-05 12:11:00",
      new: false,
      rating: 4,
      saleCount: 54,
      category: item.CATEGORY ? [item.CATEGORY] : [],
      tag: ["fashion", "men", "jacket", "full sleeve"],
      variation: [
        {
          color: item.COLOR,
          image: (item.PHOTO && item.PHOTO.split(",")[0]) || "",
          size: [{ name: item.I_SIZE, stock: item.MAXQTY }],
        },
      ],
      image: (item.PHOTO && item.PHOTO.split(",")) || [],
      shortDescription: item.DESCRIPTION,
      fullDescription: "Full description here",
      Product_Details: item.PRODUCT_DETAILS,
      quantity: item.quantity || 1,
    }));
    res.json({ success: true, data: transformedItems });
  });
};