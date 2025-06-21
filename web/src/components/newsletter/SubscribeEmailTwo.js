import PropTypes from "prop-types";
import clsx from "clsx";
import { useState } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import axios from "axios";
import { BASE_URL } from "../../config";
const customerInfoSting = localStorage.getItem('customerinfo');
const customerinfo = customerInfoSting ? JSON.parse(customerInfoSting) : null;
const CUSTOMERID = customerinfo?.id;
const CustomForm = ({
  status,
  message,
  onValidated,
  spaceTopClass,
  subscribeBtnClass
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [apiStatus, setApiStatus] = useState(null);
  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    // Clear error when user types
    if (error) setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    // Validate email
    if (!email) {
      setError("Email is required");
      return;
    }
    // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    //   setError("Please enter a valid email address.");
    //   return;
    // }
    try {
      setApiStatus("sending");
      // Option 1: Send to your backend API
      const response = await axios.post(`${BASE_URL}/promotionEmail`, {
        email,
        customer_id: CUSTOMERID // Replace with actual customer ID if available
      });
      // Option 2: Send to Mailchimp (if you want both)
      if (onValidated) {
        onValidated({ EMAIL: email });
      }
      if (response.status === 201) {
        setApiStatus("success");
        setEmail("");
        setError("");
      }
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
      setApiStatus("error");
      setError(err.response?.data?.message || "Failed to subscribe. Please try again.");
    }
  };
  return (
    <div className={clsx("subscribe-form-3", spaceTopClass)}>
      <form onSubmit={handleSubmit} className="mc-form">
        <div>
          <input
            className="email"
            value={email}
            onChange={handleChange}
            type="email"
            placeholder="Enter Your Email Address"
            required
          />
        </div>
        {error && (
          <div style={{ color: "#E74C3C", fontSize: "12px", marginTop: "5px" }}>
            {error}
          </div>
        )}
        {apiStatus === "sending" && (
          <div style={{ color: "#3498DB", fontSize: "12px", marginTop: "5px" }}>
            Submitting...
          </div>
        )}
        {apiStatus === "success" && (
          <div style={{ color: "#2ECC71", fontSize: "12px", marginTop: "5px" }}>
            Thank you for subscribing!
          </div>
        )}
        <div className={`clear-3 ${subscribeBtnClass ? subscribeBtnClass : ""}`}>
          <button
            className="send_btn"
            type="submit"
            disabled={apiStatus === "sending"}
          >
            {apiStatus === "sending" ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};
// Main subscription wrapper
const SubscribeEmailTwo = ({
  mailchimpUrl,
  spaceTopClass,
  subscribeBtnClass
}) => {
  const [showPopup, setShowPopup] = useState(false); // :white_tick: define it here
  return (
    <div>
      <MailchimpSubscribe
        url={mailchimpUrl}
        render={({ subscribe, status, message }) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={(formData) => subscribe(formData)}
            spaceTopClass={spaceTopClass}
            subscribeBtnClass={subscribeBtnClass}
            setShowPopup={setShowPopup} // :white_tick: pass it here
          />
        )}
      />
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onClick={() => setShowPopup(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fff",
              padding: "20px 30px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0,0,0,0.25)",
              textAlign: "center",
              width: "300px"
            }}
          >
            <p style={{ marginBottom: "10px", fontSize: "16px" }}>
              :white_tick: Thank you!
            </p>
            <p style={{ fontSize: "14px" }}>
              You'll receive offer notifications on your email number.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
SubscribeEmailTwo.propTypes = {
  mailchimpUrl: PropTypes.string.isRequired,
  spaceTopClass: PropTypes.string,
  subscribeBtnClass: PropTypes.string
};
export default SubscribeEmailTwo;