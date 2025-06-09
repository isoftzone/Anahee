const con = require("../config");
// const { sendEmail } = require("../utils/emailService.js");
exports.getSalesMaster = (req, res) => {
  const { saleId } = req.params;
  let query = `
    SELECT 
      sm.SALEID,
      sm.NAME,
      cm.email as EMAIL,
      sm.CNAME,
      sm.COUNTRY,
      sm.ADDRESS,
      sm.NUMBER,
      sm.coupon_code,
      sm.payment_mode,
      sm.CREATEDON, 
      sm.payment_status,
      sm.ORDER_STATUS,
      sm.DISCAMOUNT,
      sd.ITEMID,
      sd.QTY,
      sd.AMOUNT,
      im.ITEMNAME,
      im.DESCRIPTION
    FROM salesmaster sm
    JOIN salesdetail sd ON sm.SALEID = sd.SALEID
    JOIN itemmaster im ON sd.ITEMID = im.ITEMID
    JOIN customermaster cm ON sm.CUSTOMERID = cm.CUSTOMERID
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
          coupon_code: row.coupon_code,
          PAYMENTMETHOD: row.payment_mode,
          CREATEDON: row.CREATEDON,
          PAYMENTSTATUS: row.payment_status,
          ORDER_STATUS: row.ORDER_STATUS,
          DISCAMOUNT: row.DISCAMOUNT,
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
    discount,
    payment_mode,
    payment_status,
    shipping_charge,
    coupon_code,
    customerId,
  } = req.body;
  const now = new Date();
  const newSale = {
    NAME: `${firstName} ${lastName}`,
    CNAME: companyName || "",
    COUNTRY: country,
    ADDRESS: `${address}, ${city}, ${state}, ${postcode}`,
    NUMBER: phone,
    EMAIL: email,
    // AMOUNT: amount,
    DISCAMOUNT: discount,
    payment_mode: payment_mode,
    shipping_charge,
    payment_status,
    coupon_code,
    CUSTOMERID: customerId,
    CREATEDON: now,
    UPDATEDON: now,
  };
  console.log("📥 Incoming sale:", req.body);
  // Step 1: Insert into salesmaster
  con.query("INSERT INTO  salesmaster SET ?", newSale, (err, result) => {
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
        size: item.size,
        color: item.color,
      };
      con.query("INSERT INTO  salesdetail SET ?", detail, (err, result) => {
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
      });
    });
  });
};
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
// Update SalesMaster Item
exports.updateSales = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Missing SALEID" });

  const saleId = Number(id);
  if (isNaN(saleId)) return res.status(400).json({ error: "Invalid SALEID" });

  const { items, tax, shipping, discount, customerDetails } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res
      .status(400)
      .json({ error: "Items array is required and cannot be empty" });
  }

  if (!customerDetails || typeof customerDetails !== "object") {
    return res
      .status(400)
      .json({ error: "Missing or invalid customerDetails" });
  }

  const {
    SALEDATE,
    TOTALAMOUNT,
    ITEMQTY,
    DISCAMOUNT,
    NETAMOUNT,
    AMOUNTPAID,
    BALANCE,
    payment_mode,
    payment_status,
    coupon_code,
    ORDER_STATUS,
    name,
    email,
  } = customerDetails;

  const now = new Date();

  const updatedSalesMaster = {
    SALEDATE,
    ITEMQTY,
    TOTALAMOUNT,
    ITEMQTY,
    DISCAMOUNT,
    NETAMOUNT,
    AMOUNTPAID,
    BALANCE,
    payment_mode,
    payment_status,
    coupon_code,
    ORDER_STATUS,
    UPDATEDON: now,
  };

  try {
    // Update salesmaster
    await new Promise((resolve, reject) => {
      con.query(
        "UPDATE salesmaster SET ? WHERE SALEID = ?",
        [updatedSalesMaster, saleId],
        (err, result) => (err ? reject(err) : resolve(result))
      );
    });

    // Delete existing salesdetail
    await new Promise((resolve, reject) => {
      con.query(
        "DELETE FROM salesdetail WHERE SALEID = ?",
        [saleId],
        (err, result) => (err ? reject(err) : resolve(result))
      );
    });

    // Insert new salesdetail entries
    const salesDetailValues = items.map((item) => [
      saleId,
      item.ITEMID,
      item.QUANTITY ?? 0,
      item.AMOUNT ?? 0,
    ]);

    await new Promise((resolve, reject) => {
      con.query(
        "INSERT INTO salesdetail (SALEID, ITEMID, QTY, AMOUNT) VALUES ?",
        [salesDetailValues],
        (err, result) => (err ? reject(err) : resolve(result))
      );
    });
    // Send order update email
    if (email) {
      const htmlContent = generateOrderUpdateEmail(
        name || "Customer",
        saleId,
        items,
        TOTALAMOUNT,
        ORDER_STATUS,
        payment_mode,
        payment_status,
        coupon_code,
        email,
        discount,
        tax,
        shipping
      );

      try {
        await sendEmail(email, `Order #${saleId} Update`, htmlContent);
        console.log(`Order update email sent to ${email}`);
      } catch (emailErr) {
        console.error("Failed to send order update email:", emailErr);
      }
    }

    res.json({
      success: true,
      message: "Sales and item details updated successfully",
    });
  } catch (error) {
    console.error("❌ Error updating sale:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

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
      "UPDATE  salesmaster SET ? WHERE SALEID = ?",
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
      sm.coupon_code,
      sm.DISCAMOUNT,
      sm.CREATEDON,
      sm.payment_status,
      sm.ORDER_STATUS,
      sd.ITEMID,
      sd.QTY,
      sd.AMOUNT,
      sd.color,
      sd.size,
      im.ITEMNAME,
      im.DESCRIPTION,
      ii.PHOTO
    FROM  salesmaster sm
    LEFT JOIN  salesdetail sd ON sm.SALEID = sd.SALEID
    LEFT JOIN  itemmaster im ON sd.ITEMID = im.ITEMID
    LEFT JOIN  itemimage ii ON im.ITEMID = ii.ITEMID
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
          coupon_code: row.coupon_code,
          DISCAMOUNT: row.DISCAMOUNT,
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
        size:row.size,
        color:row.color,
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
    UPDATE  salesmaster
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

exports.addSales = (req, res) => {
  const { items, tax, discount, shipping, customerDetails } = req.body;

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
    payment_mode,
    payment_status,
    ORDER_STATUS,
    ITEMQTY,
    NAME,
    EMAIL,
    ADDRESS,
    NUMBER,
    COUNTRY,
  } = customerDetails;

  const now = new Date();

  const newSale = {
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
    payment_mode,
    payment_status,
    ORDER_STATUS,
    ITEMQTY,
    NAME,
    EMAIL,
    ADDRESS,
    NUMBER,
    COUNTRY,
    // TAX: tax,
    // DISCOUNT: discount, // Added missing discount field
    // SHIPPING: shipping,
    CREATEDON: now,
    UPDATEDON: now,
  };

  console.log("📥 Incoming sale:", req.body);

  // Step 1: Insert into salesmaster
  con.query("INSERT INTO salesmaster SET ?", newSale, (err, result) => {
    if (err) {
      console.error("❌ Error inserting into salesmaster:", err);
      return res
        .status(500)
        .json({ error: "Failed to insert into salesmaster" });
    }

    const saleId = result.insertId;
    console.log("✅ SalesMaster inserted with ID:", saleId);

    // Check if items array exists and has items
    if (!items || items.length === 0) {
      return res.json({
        success: true,
        saleId,
        message: "Sale added successfully (no items to process)!",
      });
    }

    // Step 2: Insert each item into salesdetail
    let completed = 0;
    let hasError = false;

    items.forEach((item) => {
      const detail = {
        SALEID: saleId,
        ITEMID: item.ITEMID,
        QTY: item.QUANTITY,
        AMOUNT: item.AMOUNT,
        // IMAGE: item.image,
      };

      con.query("INSERT INTO salesdetail SET ?", detail, (err) => {
        if (err && !hasError) {
          hasError = true;
          console.error("❌ Error inserting into salesdetail:", err);
          return res
            .status(500)
            .json({ error: "Failed to insert item into salesdetail" });
        }

        completed++;

        // Only send response if all items are processed and no error occurred
        if (completed === items.length && !hasError) {
          console.log("✅ All items inserted into salesdetail");
          res.json({
            success: true,
            saleId,
            message: "Sale and item details added successfully!",
          });
        }
      });
    });
  });
};

function generateOrderUpdateEmail(
  customerName,
  saleId,
  items,
  totalAmount,
  orderStatus,
  payment_mode,
  payment_status,
  coupon_code,
  customerEmail,
  discount = 0,
  tax = 0,
  shipping = 0
) {
  // Format current date
  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  console.log("678", items);
  // Calculate subtotal from items
  const subtotal = items.reduce(
    (sum, item) => sum + (item.AMOUNT || 0) * (item.QUANTITY || 1),
    0
  );
  const grandTotal = subtotal + (subtotal * tax) / 100 - discount + shipping;
  // Generate status badge based on order status
  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { class: "status-pending", text: "Pending Payment" },
      paid: { class: "status-paid", text: "Payment Received" },
      shipped: { class: "status-shipped", text: "Shipped" },
      delivered: { class: "status-delivered", text: "Delivered" },
      cancelled: { class: "status-cancelled", text: "Cancelled" },
    };

    const statusInfo = statusMap[status.toLowerCase()] || statusMap["pending"];
    return `<div class="status-badge ${statusInfo.class}">${statusInfo.text}</div>`;
  };

  // Generate items table rows
  const itemsRows = items
    .map(
      (item) => `
    <tr>
      <td>
        <div class="product-info">
          <img src="${
            item.image ||
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E%3Crect width='50' height='50' fill='%23667eea'/%3E%3Cpath d='M15 20h20v2H15zm0 4h20v2H15zm0 4h15v2H15z' fill='white'/%3E%3C/svg%3E"
          }" 
               alt="${item.ITEMNAME || "Item"}" class="product-image">
          <div class="product-details">
            <div class="product-name">${item.ITEMNAME || "Item"}</div>
            <div class="product-description">${
              item.DESCRIPTION || "No description available"
            }</div>
          </div>
        </div>
      </td>
      <td class="quantity">${item.QUANTITY ?? 1}</td>
      <td class="price">₹${(item.AMOUNT || 0).toFixed(2)}</td>
      <td class="total">₹${((item.AMOUNT || 0) * (item.QUANTITY || 1)).toFixed(
        2
      )}</td>
    </tr>
  `
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Update #${saleId}</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
            padding: 20px;
        }
        
        .invoice-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
        }
        
        .header-content {
            position: relative;
            z-index: 1;
        }
        
        .invoice-title {
            font-size: 2.5rem;
            font-weight: 300;
            letter-spacing: 2px;
            margin-bottom: 10px;
        }
        
        .invoice-number {
            font-size: 1.2rem;
            opacity: 0.9;
            margin-bottom: 5px;
        }
        
        .invoice-date {
            opacity: 0.8;
            font-size: 1rem;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .invoice-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-bottom: 40px;
        }
        
        .detail-section h3 {
            color: #667eea;
            font-size: 1.1rem;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-bottom: 2px solid #667eea;
            padding-bottom: 5px;
        }
        
        .customer-info {
            background: #f8f9ff;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #667eea;
        }
        
        .customer-info p {
            margin-bottom: 8px;
        }
        
        .status-badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 10px;
        }
        
        .status-pending {
            background: linear-gradient(135deg, #fef3c7, #fde68a);
            color: #92400e;
            border: 2px solid #f59e0b;
        }
        
        .status-paid {
            background: linear-gradient(135deg, #d1fae5, #a7f3d0);
            color: #065f46;
            border: 2px solid #10b981;
        }
        
        .status-shipped {
            background: linear-gradient(135deg, #dbeafe, #bfdbfe);
            color: #1e40af;
            border: 2px solid #3b82f6;
        }
        
        .status-delivered {
            background: linear-gradient(135deg, #ede9fe, #ddd6fe);
            color: #5b21b6;
            border: 2px solid #8b5cf6;
        }
        
        .status-cancelled {
            background: linear-gradient(135deg, #fee2e2, #fecaca);
            color: #991b1b;
            border: 2px solid #ef4444;
        }
        
        .update-message {
            background: #f0fdf4;
            border-left: 4px solid #10b981;
            padding: 15px;
            margin-bottom: 30px;
            border-radius: 0 8px 8px 0;
        }
        
        .update-message h3 {
            color: #065f46;
            margin-bottom: 10px;
        }
        
        .items-section {
            margin-bottom: 40px;
        }
        
        .section-title {
            font-size: 1.3rem;
            color: #333;
            margin-bottom: 20px;
            text-align: center;
            position: relative;
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 3px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 2px;
        }
        
        .items-table {
            width: 100%;
            border-collapse: collapse;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
        }
        
        .items-table th {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 15px 12px;
            text-align: left;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-size: 0.85rem;
        }
        
        .items-table td {
            padding: 15px 12px;
            border-bottom: 1px solid #e5e7eb;
            vertical-align: middle;
        }
        
        .items-table tbody tr:hover {
            background-color: #f8f9ff;
            transition: background-color 0.2s ease;
        }
        
        .items-table tbody tr:last-child td {
            border-bottom: none;
        }
        
        .product-info {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .product-image {
            width: 50px;
            height: 50px;
            border-radius: 8px;
            object-fit: cover;
            border: 2px solid #e5e7eb;
        }
        
        .product-details {
            flex: 1;
        }
        
        .product-name {
            font-weight: 600;
            color: #333;
            margin-bottom: 4px;
        }
        
        .product-description {
            color: #6b7280;
            font-size: 0.9rem;
        }
        
        .quantity {
            text-align: center;
            font-weight: 600;
            color: #667eea;
        }
        
        .price, .total {
            text-align: right;
            font-weight: 600;
        }
        
        .totals-section {
            margin-top: 40px;
            width: 100%;
        }
        
        .totals {
            background: #f8f9ff;
            padding: 25px;
            border-radius: 12px;
            width: 100%;
            border: 1px solid #e5e7eb;
        }
        
        .total-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
            padding: 12px 20px;
            background: white;
            border-radius: 6px;
            border: 1px solid #e5e7eb;
        }
        
        .total-row:not(.grand-total) {
            margin-bottom: 8px;
        }
        
        .total-label {
            font-weight: 500;
            color: #6b7280;
        }
        
        .total-amount {
            font-weight: 600;
            color: #333;
        }
        
        .grand-total {
            margin-top: 15px;
            padding: 15px 20px !important;
            background: linear-gradient(135deg, #667eea, #764ba2) !important;
            color: white !important;
            border: none !important;
        }
        
        .grand-total .total-label {
            font-size: 1.2rem;
            font-weight: 700;
            color: white !important;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .grand-total .total-amount {
            font-size: 1.4rem;
            font-weight: 700;
            color: white !important;
        }
        
        .footer {
            background: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        
        .footer p {
            color: #6b7280;
            margin-bottom: 10px;
        }
        
        .company-info {
            font-weight: 600;
            color: #333;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            body {
                padding: 10px;
            }
            
            .invoice-container {
                border-radius: 8px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .invoice-title {
                font-size: 2rem;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .invoice-details {
                grid-template-columns: 1fr;
                gap: 25px;
            }
            
            .items-table {
                font-size: 0.9rem;
            }
            
            .items-table th,
            .items-table td {
                padding: 10px 8px;
            }
            
            .product-info {
                flex-direction: column;
                align-items: flex-start;
                gap: 8px;
            }
            
            .product-image {
                width: 40px;
                height: 40px;
            }
            
            .totals {
                width: 100%;
                padding: 20px;
            }
            
            .footer {
                padding: 20px;
            }
        }
        
        @media (max-width: 480px) {
            .invoice-title {
                font-size: 1.5rem;
            }
            
            .items-table {
                font-size: 0.8rem;
            }
            
            .items-table th,
            .items-table td {
                padding: 8px 6px;
            }
            
            .product-info {
                gap: 6px;
            }
            
            .totals {
                padding: 15px;
            }
            
            .grand-total .total-label {
                font-size: 1rem;
            }
            
            .grand-total .total-amount {
                font-size: 1.2rem;
            }
        }
    </style>
</head>
<body>
    <div class="invoice-container">
        <div class="header">
            <div class="header-content">
                <h1 class="invoice-title">ORDER UPDATE</h1>
                <div class="invoice-number">Order ${saleId}</div>
                <div class="invoice-date">Updated: ${formattedDate}</div>
            </div>
        </div>
        
        <div class="content">
            <div class="update-message">
                <h3>Your order status has been updated</h3>
                <p>Dear ${customerName}, we wanted to inform you that your order ${saleId} has been updated to <strong>${orderStatus}</strong>.</p>
            </div>
            
            <div class="invoice-details">
                <div class="detail-section">
                    <h3>Customer Details</h3>
                    <div class="customer-info">
                        <p><strong>${customerName}</strong></p>
                        <p>${customerEmail || "No email provided"}</p>
                        ${getStatusBadge(orderStatus)}
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3>Order Summary</h3>
                    <div class="customer-info">
                        <p><strong>Order Date:</strong> ${formattedDate}</p>
                       ${
                         items && items.length > 0
                           ? `<p><strong>Items:</strong> ${items.length}</p>`
                           : ""
                       }
      ${
        payment_mode
          ? `<p><strong>Payment Mode:</strong> ${payment_mode}</p>`
          : ""
      }
      ${
        payment_status
          ? `<p><strong>Payment Status:</strong> ${payment_status}</p>`
          : ""
      }
      ${
        coupon_code ? `<p><strong>Coupon Code:</strong> ${coupon_code}</p>` : ""
      }
                    </div>
                </div>
            </div>
            
            <div class="items-section">
                <h2 class="section-title">Order Items</h2>
                <table class="items-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsRows}
                    </tbody>
                </table>
            </div>
            
            <div class="totals-section">
                <div class="totals">
                    <div class="total-row">
                        <span class="total-label">Subtotal:</span>
                        <span class="total-amount">₹${subtotal.toFixed(
                          2
                        )}</span>
                    </div>
                    ${
                      discount > 0
                        ? `
                    <div class="total-row">
                        <span class="total-label">Discount:</span>
                        <span class="total-amount">-₹${discount.toFixed(
                          2
                        )}</span>
                    </div>
                    `
                        : ""
                    }
                    ${
                      tax > 0
                        ? `
                    <div class="total-row">
                        <span class="total-label">Tax:</span>
                        <span class="total-amount">₹${tax.toFixed(2)}</span>
                    </div>
                    `
                        : ""
                    }
                    ${
                      shipping > 0
                        ? `
                    <div class="total-row">
                        <span class="total-label">Shipping:</span>
                        <span class="total-amount">₹${shipping.toFixed(
                          2
                        )}</span>
                    </div>
                    `
                        : ""
                    }
                    <div class="total-row grand-total">
                        <span class="total-label">Grand Total:</span>
                        <span class="total-amount">₹${grandTotal.toFixed(
                          2
                        )}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p class="company-info">Thank you for your business!</p>
            <p>For questions about your order, please contact our customer service team.</p>
            <p>We appreciate your trust in our company.</p>
        </div>
    </div>
</body>
</html>
  `;
}
