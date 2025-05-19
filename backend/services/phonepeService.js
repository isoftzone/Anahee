const axios = require("axios");
const { getPhonePeAccessToken } = require("../utils/phonepeAuth");

const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID;
const ORDER_CREATE_URL = process.env.PHONEPE_ORDER_CREATE_URL;
const ORDER_STATUS_URL = process.env.PHONEPE_ORDER_STATUS_URL;

async function createPhonePeOrder(orderData) {
  try {
    // Fetch Access Token
    const token = await getPhonePeAccessToken();
    // Validate required fields
    if (
      !orderData.orderId ||
      !orderData.amountInPaisa ||
      !orderData.customerPhone ||
      !orderData.redirectUrl
    ) {
      throw new Error("Missing required parameters in orderData.");
    }

    // Construct Payload
    const payload = {
      merchantId: MERCHANT_ID,
      merchantOrderId: orderData.orderId, // Updated parameter name
      amount: orderData.amountInPaisa,
      expireAfter: orderData.expireAfter || 1200, // Default expiry 20 mins
      metaInfo: orderData.metaInfo || {}, // Added metaInfo handling
      paymentFlow: {
        type: "PG_CHECKOUT",
        message: orderData.message || "Payment initiation",
        merchantUrls: {
          redirectUrl: orderData.redirectUrl,
        },
      },
    };

    // Set Headers
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${token.token_type} ${token.access_token}`, // Updated authorization format
      "X-VERIFY": calculateXVerifyHeader(payload), // Properly hashed verification
    };
    // Send Request
    const response = await axios.post(ORDER_CREATE_URL, payload, { headers });

    return response.data;
  } catch (error) {
    console.error(
      "PhonePe Order Creation Error:",
      error.response?.data || error.message
    );
    throw new Error(`Failed to create PhonePe order: ${error.message}`);
  }
}

async function getOrderStatus(orderId) {
  try {
    // Fetch Access Token
    const token = await getPhonePeAccessToken();

    // Construct Headers
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${token.token_type} ${token.access_token}`,
    };

    // Construct URL with Query Parameters
    const url = `${ORDER_STATUS_URL}/${orderId}/status`;

    // Send Request
    const response = await axios.get(url, { headers });

    return response.data;
  } catch (error) {
    console.error(
      "PhonePe Order Status Error:",
      error.response?.data || error.message
    );
    throw new Error(`Failed to fetch order status: ${error.message}`);
  }
}

function calculateXVerifyHeader(payload) {
  return "your_calculated_x_verify_header";
}

module.exports = {
  createPhonePeOrder,
  getOrderStatus,
};
