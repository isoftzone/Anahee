const axios = require("axios");

const AUTH_URL = process.env.PHONEPE_AUTH_URL;
const CLIENT_ID = process.env.PHONEPE_CLIENT_ID;
const CLIENT_SECRET = process.env.PHONEPE_CLIENT_SECRET;
const CLIENT_VERSION = 1;

async function getPhonePeAccessToken() {
  const params = new URLSearchParams();
  params.append("client_id", CLIENT_ID);
  params.append("client_secret", CLIENT_SECRET);
  params.append("grant_type", "client_credentials");
  params.append("client_version", CLIENT_VERSION);
  console.log("params.toString()", params.toString());
  try {
    const response = await axios.post(AUTH_URL, params.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const { access_token, expires_at, issued_at, token_type } = response.data;

    if (!access_token || !expires_at) {
      throw new Error("Invalid token response from PhonePe");
    }

    console.log(`Token Issued At: ${new Date(issued_at * 1000).toISOString()}`);
    console.log(
      `Token Expires At: ${new Date(expires_at * 1000).toISOString()}`
    );

    return {
      access_token,
      expires_at,
      token_type,
    };
  } catch (error) {
    console.error("PhonePe Auth Error:", error.response?.data || error.message);
    throw new Error(`Failed to get PhonePe access token: ${error.message}`);
  }
}

module.exports = { getPhonePeAccessToken };
