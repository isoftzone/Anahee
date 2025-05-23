const con = require("../config");

exports.addDiscountCoupon = async (req, res) => {
  const {
    coupon_code,
    status,
    valid_from,
    valid_to,
    minimum_bill_amount,
    is_percentage,
    discount_value,
    max_discount_amount,
    redeemed_count,
  } = req.body;

  const now = new Date();

  const newCoupon = {
    coupon_code,
    status: status ? 1 : 0,
    valid_from,
    valid_to,
    minimum_bill_amount,
    is_percentage: is_percentage ? 1 : 0,
    discount_value,
    max_discount_amount,
    redeemed_count,
    CREATEDON: now,
    UPDATEDON: now,
  };

  await con.query(
    "INSERT INTO dcmaster SET ?",
    newCoupon,
    (error, result, fields) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .send({ msg: "Error inserting discount coupon", error });
      }
      res.status(201).send({
        msg: "Discount coupon created successfully",
        data: newCoupon,
      });
    }
  );
};

exports.getAllDiscountCoupons = async (req, res) => {
  const query = `
    SELECT 
      my_row_id,
      coupon_code,
      status,
      valid_from,
      valid_to,
      minimum_bill_amount,
      is_percentage,
      discount_value,
      max_discount_amount,
      redeemed_count,
      CREATEDON
    FROM dcmaster
    WHERE coupon_code IS NOT NULL
    ORDER BY CREATEDON DESC
  `;

  con.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching coupons:", error);
      return res
        .status(500)
        .json({ msg: "Error retrieving discount coupons", error });
    }

    res.status(200).json({
      msg: "Discount coupons fetched successfully",
      data: results,
    });
  });
};

exports.updateDiscountCoupon = async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  const validFields = [
    "coupon_code",
    "status",
    "valid_from",
    "valid_to",
    "minimum_bill_amount",
    "is_percentage",
    "discount_value",
    "max_discount_amount",
    "redeemed_count",
  ];

  const filteredUpdates = {};
  Object.keys(updateFields).forEach((key) => {
    if (validFields.includes(key)) {
      filteredUpdates[key] = updateFields[key];
    }
  });

  if (Object.keys(filteredUpdates).length === 0) {
    return res.status(400).json({
      success: false,
      msg: "No valid fields provided for update",
    });
  }

  try {
    const setClause = Object.keys(filteredUpdates)
      .map((key) => `${key} = ?`)
      .join(", ");

    const values = [...Object.values(filteredUpdates), id];

    const query = `
      UPDATE dcmaster 
      SET ${setClause}
      WHERE my_row_id = ?
    `;

    con.query(query, values, (error, results) => {
      if (error) {
        console.error("Error updating coupon:", error);
        return res.status(500).json({
          success: false,
          msg: "Failed to update coupon",
          error: error.message,
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          msg: "Coupon not found",
        });
      }

      res.status(200).json({
        success: true,
        msg: "Coupon updated successfully",
        data: { id, ...filteredUpdates },
      });
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      success: false,
      msg: "Server error",
      error: error.message,
    });
  }
};

exports.getCouponById = async (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT 
      my_row_id,
      coupon_code,
      status,
      valid_from,
      valid_to,
      minimum_bill_amount,
      is_percentage,
      discount_value,
      max_discount_amount,
      redeemed_count,
      CREATEDON
    FROM dcmaster
    WHERE my_row_id = ?
  `;

  con.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error fetching coupon by ID:", error);
      return res.status(500).json({ msg: "Error retrieving coupon", error });
    }

    if (results.length === 0) {
      return res.status(404).json({ msg: "Coupon not found" });
    }

    res.status(200).json({
      msg: "Coupon fetched successfully",
      data: results[0],
    });
  });
};

exports.applyCoupon = async (req, res) => {
  const { coupon_code, cart_total } = req.body;

  if (!coupon_code || cart_total == null) {
    return res
      .status(400)
      .json({ success: false, msg: "Coupon code and cart total are required" });
  }

  const query = `SELECT  my_row_id,
      coupon_code,
      status,
      valid_from,
      valid_to,
      minimum_bill_amount,
      is_percentage,
      discount_value,
      max_discount_amount,
      redeemed_count,
      CREATEDON FROM dcmaster WHERE coupon_code = ? LIMIT 1`;

  con.query(query, [coupon_code], (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res
        .status(500)
        .json({ success: false, msg: "Database error", error: err.message });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ success: false, msg: "Invalid coupon code" });
    }

    const coupon = results[0];
    const today = new Date().toISOString().split("T")[0];

    if (!coupon.status) {
      return res
        .status(400)
        .json({ success: false, msg: "Coupon is inactive" });
    }

    if (today < coupon.valid_from || today > coupon.valid_to) {
      return res
        .status(400)
        .json({ success: false, msg: "Coupon is not valid at this time" });
    }

    if (cart_total < coupon.minimum_bill_amount) {
      return res.status(400).json({
        success: false,
        msg: `Minimum bill amount for this coupon is ₹${coupon.minimum_bill_amount}`,
      });
    }

    let discount = 0;
    if (coupon.is_percentage) {
      discount = (cart_total * coupon.discount_value) / 100;
      if (discount > coupon.max_discount_amount) {
        discount = coupon.max_discount_amount;
      }
    } else {
      discount = coupon.discount_value;
      if (discount > coupon.max_discount_amount) {
        discount = coupon.max_discount_amount;
      }
    }

    const finalTotal = cart_total - discount;

    return res.status(200).json({
      success: true,
      msg: "Coupon applied successfully",
      cart_total,
      discount,
      finalTotal,
      coupon,
    });
  });
};