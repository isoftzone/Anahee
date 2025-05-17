const phonepeService = require("../services/phonepeService");
const { getPhonePeAccessToken } = require("../utils/phonepeAuth");

const getToken = async (req, res) => {
  console.log("getToken called");
  try {
    const tokenData = await getPhonePeAccessToken();
    res.json({
      success: true,
      token: tokenData.access_token,
      expires_at: new Date(tokenData.expires_at * 1000).toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch PhonePe token",
      error: error.message,
    });
  }
};

const createOrder = async (req, res) => {
  console.log(" req.body of createOrder", req.body);
  try {
    const {
      orderId,
      amountInPaisa,
      customerPhone,
      redirectUrl,
      expireAfter,
      metaInfo,
    } = req.body;

    // Validate required fields
    if (!orderId || !amountInPaisa || !customerPhone || !redirectUrl) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: orderId, amountInPaisa, customerPhone, redirectUrl.",
      });
    }

    // Construct order data
    const orderData = {
      orderId,
      amountInPaisa,
      customerPhone,
      redirectUrl,
      expireAfter: expireAfter || 1200, // Default 20 min expiry
      metaInfo: metaInfo || {}, // Ensure `metaInfo` is present
    };

    // Call service layer
    const data = await phonepeService.createPhonePeOrder(orderData);
    console.log("PhonePe order data:", data);
    // Success response
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error creating PhonePe order:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

const checkOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Call service layer with correct parameters
    const data = await phonepeService.getOrderStatus(orderId);
    console.log("response 111", data);
    // Success response
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order status",
      error: error.message,
    });
  }
};

module.exports = {
  getToken,
  createOrder,
  checkOrderStatus,
};
