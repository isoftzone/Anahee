const axios = require("axios");

// Store the token at module level
let shiprocketToken = null;

exports.authenticateShiprocket = async () => { console.log(32323230);
  try {
    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
      }
    );

    shiprocketToken = response.data.token;
    console.log('shiprocketToken',shiprocketToken);
    return shiprocketToken;
  } catch (error) {
    console.error(
      "Shiprocket Auth Error:",
      error.response?.data || error.message
    );
    throw new Error("Failed to authenticate with Shiprocket");
  }
};

exports.createOrder = async (req, res) => {
  try {
    // Ensure we have a valid token
    if (!shiprocketToken) {
      await exports.authenticateShiprocket();
    }

    const orderData = {
      order_id: req.body.order_id,
      order_date: new Date().toISOString().split("T")[0],
      pickup_location: "warehouse",
      comment: req.body.comment,
      billing_customer_name: req.body.customer_fname,
      billing_last_name: req.body.customer_lname,
      billing_address: req.body.address,
      billing_city: req.body.city,
      billing_pincode: req.body.pincode,  
      billing_state: req.body.state,
      billing_country: req.body.country,
      billing_email: req.body.email,
      billing_phone: req.body.phone,
      shipping_is_billing: true,
      shipping_customer_name: "",
      shipping_last_name: "",
      shipping_address: "",
      shipping_address_2: "",
      shipping_city: "",
      shipping_pincode: "",
      shipping_country: "",
      shipping_state: "",
      shipping_email: "",
      shipping_phone: "",
      order_items: req.body.items,
      payment_method: req.body.payment_method,
      shipping_charges: req.body.shipping_charge || 0,
      giftwrap_charges: 0,
      transaction_charges: 0,
      sub_total: req.body.total,
      length: req.body.total,
      breadth: req.body.breadth,
      height: req.body.height,
      weight: req.body.weight,
    };

    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      orderData,
      {
        headers: {
          Authorization: `Bearer ${shiprocketToken}`,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("Create Order Error:", err.response?.data || err.message);

    // If it's an authentication error, try to re-authenticate and retry
    if (err.response?.status === 401) {
      try {
        await exports.authenticateShiprocket();
        // Retry the order creation (you might want to implement proper retry logic)
        return exports.createOrder(req, res);
      } catch (authErr) {
        res.status(500).json({ error: "Authentication failed" });
        return;
      }
    }

    res.status(500).json({ error: "Failed to create order" });
  }
};

exports.createPickup = async (req, res) => {
  try {
    // Ensure we have a valid token
    if (!shiprocketToken) {
      await exports.authenticateShiprocket();
    }

    const { shipment_id } = req.body;

    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/courier/generate/pickup",
      { shipment_id },
      {
        headers: {
          Authorization: `Bearer ${shiprocketToken}`,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error(
      "Pickup Generation Error:",
      err.response?.data || err.message
    );

    // If it's an authentication error, try to re-authenticate and retry
    if (err.response?.status === 401) {
      try {
        await exports.authenticateShiprocket();
        // Retry the pickup creation
        return exports.createPickup(req, res);
      } catch (authErr) {
        res.status(500).json({ error: "Authentication failed" });
        return;
      }
    }

    res.status(500).json({ error: "Pickup generation failed" });
  }
};


exports.checkServiceability = async (req, res) => {
  try {
    const { pickup_postcode, delivery_postcode, cod, weight } = req.body;

    if (!shiprocketToken) {
      await exports.authenticateShiprocket();
    }

    const response = await axios.get("https://apiv2.shiprocket.in/v1/external/courier/serviceability/", {
      headers: {
        Authorization: `Bearer ${shiprocketToken}`
      },
      params: {
        pickup_postcode,
        delivery_postcode,
        cod,
        weight
      }
    });

    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error("❌ Error checking serviceability:", error?.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Failed to check courier serviceability"
    });
  }
};

