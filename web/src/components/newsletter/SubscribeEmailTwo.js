import PropTypes from "prop-types";
import clsx from "clsx";
import MailchimpSubscribe from "react-mailchimp-subscribe";

const CustomForm = ({
  status,
  message,
  onValidated,
  spaceTopClass,
  subscribeBtnClass
}) => {
  let mobile;
  const submit = () => {
    mobile &&
      mobile.value.length > 9 &&
      onValidated({
        mobile: mobile.value
      });

    mobile.value = "";
  };

  return (
    <div className={clsx("subscribe-form-3", spaceTopClass)}>
      <div className="mc-form">
        <div>
          <input
            className="mobile"
            ref={node => (mobile = node)}
            type="text"
            placeholder="Enter Your Mobile Number"
            required
          />
        </div>
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
        <div
          className={`clear-3 ${subscribeBtnClass ? subscribeBtnClass : ""}`}
        >
          <button className="send_btn" onClick={submit}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

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
            onValidated={formData => subscribe(formData)}
            spaceTopClass={spaceTopClass}
            subscribeBtnClass={subscribeBtnClass}
          />
        )}
      />
    </div>
  );
};

SubscribeEmailTwo.propTypes = {
  mailchimpUrl: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default SubscribeEmailTwo;
