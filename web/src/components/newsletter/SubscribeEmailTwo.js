
import { BASE_URL } from '../../config';
import axios from 'axios';
import PropTypes from "prop-types";
import clsx from "clsx";
import { useState } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
// CustomForm component
const CustomForm = ({
  status,
  message,
  onValidated,
  spaceTopClass,
  subscribeBtnClass,
  setShowPopup
}) => {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setMobile(value);
      setError("");
    } else {
      setError("Please enter only numbers.");
    }
  };
  const submit = async () => {
  if (mobile.length !== 10) {
    setError("Please enter a valid 10-digit mobile number.");
    return;
  }
  let customer_id = null;
  const customerStr = localStorage.getItem("customerinfo");
  if (customerStr) {
    try {
      const customer = JSON.parse(customerStr);
      customer_id = customer.id;
    } catch (e) {
      console.error("Invalid customer data in localStorage:", e);
    }
  }
  const payload = {
    phonenumber: mobile,
    customer_id: customer_id
  };
  try {
    const response = await axios.post(`${BASE_URL}/promotionNumber`, payload);
    console.log("Mobile number stored:", response);
    onValidated({ mobile });
    setMobile("");
    setShowPopup(true);
  } catch (err) {
    console.error("Error saving to backend:", err);
    setError("Failed to save your number. Please try again.");
  }
};


  return (
    <div className={clsx("subscribe-form-3", spaceTopClass)}>
      <div className="mc-form">
        <input
          className="mobile"
          value={mobile}
          onChange={handleChange}
          type="text"
          placeholder="Enter Your Mobile Number"
          required
          maxLength={10}
          inputMode="numeric"
          pattern="\d*"
        />
  
        <div className={clsx("clear-3", subscribeBtnClass)}>
          <button className="send_btn" onClick={submit}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
// Main subscription wrapper
const SubscribeEmailTwo = ({
  mailchimpUrl,
  spaceTopClass,
  subscribeBtnClass
}) => {
  const [showPopup, setShowPopup] = useState(false); // :white_check_mark: define it here
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
            setShowPopup={setShowPopup} // :white_check_mark: pass it here
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
              ✅ Thank you!
            </p>
            <p style={{ fontSize: "14px" }}>
              You'll receive offer notifications on your mobile number.
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


// import PropTypes from "prop-types";
// import clsx from "clsx";
// import { useState } from "react";
// import MailchimpSubscribe from "react-mailchimp-subscribe";
// // CustomForm component with mobile number validation
// const CustomForm = ({
//   status,
//   message,
//   onValidated,
//   spaceTopClass,
//   subscribeBtnClass
// }) => {
//   const [mobile, setMobile] = useState("");
//   const [error, setError] = useState("");
//   const handleChange = (e) => {
//     const value = e.target.value;
//     // Allow only digits
//     if (/^\d*$/.test(value)) {
//       setMobile(value);
//       setError("");
//     } else {
//       setError("Please enter only numbers.");
//     }
//   };
//   const submit = () => {
//     if (mobile.length === 10) {
//       onValidated({ mobile });
//       setMobile("");
//     } else {
//       setError("Please enter a valid 10-digit mobile number.");
//     }
//   };
//   return (
//     <div className={clsx("subscribe-form-3", spaceTopClass)}>
//       <div className="mc-form">
//         <div>
//           <input
//             className="mobile"
//             value={mobile}
//             onChange={handleChange}
//             type="text"
//             placeholder="Enter Your Mobile Number"
//             required
//             maxLength={10}
//             inputMode="numeric"
//             pattern="\d*"
//           />
//         </div>
//         {error && <div style={{ color: "#e74c3c", fontSize: "12px" }}>{error}</div>}
//         {status === "sending" && (
//           <div style={{ color: "#3498db", fontSize: "12px" }}>sending...</div>
//         )}
//         {status === "error" && (
//           <div
//             style={{ color: "#e74c3c", fontSize: "12px" }}
//             dangerouslySetInnerHTML={{ __html: message }}
//           />
//         )}
//         {status === "success" && (
//           <div
//             style={{ color: "#2ecc71", fontSize: "12px" }}
//             dangerouslySetInnerHTML={{ __html: message }}
//           />
//         )}
//         <div className={`clear-3 ${subscribeBtnClass ? subscribeBtnClass : ""}`}>
//           <button className="send_btn" onClick={submit}>
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// // Main subscription wrapper
// const SubscribeEmailTwo = ({
//   mailchimpUrl,
//   spaceTopClass,
//   subscribeBtnClass
// }) => {
//   return (
//     <div>
//       <MailchimpSubscribe
//         url={mailchimpUrl}
//         render={({ subscribe, status, message }) => (
//           <CustomForm
//             status={status}
//             message={message}
//             onValidated={(formData) => subscribe(formData)}
//             spaceTopClass={spaceTopClass}
//             subscribeBtnClass={subscribeBtnClass}
//           />
//         )}
//       />
//     </div>
//   );
// };
// SubscribeEmailTwo.propTypes = {
//   mailchimpUrl: PropTypes.string.isRequired,
//   spaceTopClass: PropTypes.string,
//   subscribeBtnClass: PropTypes.string
// };
// export default SubscribeEmailTwo;