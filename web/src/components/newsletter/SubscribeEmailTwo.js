
import PropTypes from "prop-types";
import clsx from "clsx";
import { useState } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
// CustomForm component with mobile number validation
const CustomForm = ({
  status,
  message,
  onValidated,
  spaceTopClass,
  subscribeBtnClass
}) => {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const value = e.target.value;
    // Allow only digits
    if (/^\d*$/.test(value)) {
      setMobile(value);
      setError("");
    } else {
      setError("Please enter only numbers.");
    }
  };
  const submit = () => {
    if (mobile.length === 10) {
      onValidated({ mobile });
      setMobile("");
    } else {
      setError("Please enter a valid 10-digit mobile number.");
    }
  };
  return (
    <div className={clsx("subscribe-form-3", spaceTopClass)}>
      <div className="mc-form">
        <div>
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
        </div>
        {error && <div style={{ color: "#e74c3c", fontSize: "12px" }}>{error}</div>}
        {status === "sending" && (
          <div style={{ color: "#3498db", fontSize: "12px" }}>sending...</div>
        )}
        {status === "error" && (
          <div
            style={{ color: "#e74c3c", fontSize: "12px" }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
        {status === "success" && (
          <div
            style={{ color: "#2ecc71", fontSize: "12px" }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
        <div className={`clear-3 ${subscribeBtnClass ? subscribeBtnClass : ""}`}>
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
          />
        )}
      />
    </div>
  );
};
SubscribeEmailTwo.propTypes = {
  mailchimpUrl: PropTypes.string.isRequired,
  spaceTopClass: PropTypes.string,
  subscribeBtnClass: PropTypes.string
};
export default SubscribeEmailTwo;