import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import { BASE_URL } from "../../config";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../../store/slices/cart-slice";
import { setwishlistItems } from "../../store/slices/wishlist-slice";

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    cpassword: "",
  });

  const [sendOtp, setSendOtp] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showcPassword, setShowcPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setApiError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sendOtp) {
      // Send OTP
      if (!formData.email) {
        return setErrors({ email: "Email is required" });
      }
      try {
        const res = await axios.post(`${BASE_URL}/sendotp`, {
          email: formData.email,
        });
        setSendOtp(true);
        setSuccess("OTP sent to your email.");
      } catch (err) {
        setApiError(err.response?.data?.msg || "Failed to send OTP");
      }
    } else if (!otpVerified) {
      // Verify OTP
      if (!formData.otp) {
        return setErrors({ otp: "OTP is required" });
      }
      try {
        const res = await axios.post(`${BASE_URL}/verifyotp`, {
          email: formData.email,
          otp: formData.otp,
        });
        setOtpVerified(true);
        setSuccess("OTP verification successfully.");
      } catch (err) {
        setApiError(err.response?.data?.msg || "OTP verification failed");
      }
    } else {
      // Reset Password
      if (!formData.password || !formData.cpassword) {
        return setErrors({
          password: !formData.password ? "Password required" : "",
          cpassword: !formData.cpassword ? "Confirm Password required" : "",
        });
      }
      if (formData.password !== formData.cpassword) {
        return setErrors({ cpassword: "Passwords do not match" });
      }

      try {
        const res = await axios.post(`${BASE_URL}/forgetpassword`, {
          email: formData.email,
          password: formData.password,
        });

        setSuccess("Password Reset Successfully.");
        setTimeout(() => navigate("/login-register"), 2000);
      } catch (err) {
        setApiError(err.response?.data?.msg || "Failed to reset password");
      }
    }
  };

  return (
    <>
      <SEO titleTemplate="Forget Password" />
      <LayoutOne headerTop="visible">
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Forget Password</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            {apiError && (
                              <p style={{ color: "red" }}>{apiError}</p>
                            )}
                            {success && (
                              <p style={{ color: "green" }}>{success}</p>
                            )}
                            <form onSubmit={handleSubmit}>
                              {/* Step 1: Email */}
                              {!sendOtp && (
                                <div className="mb-3">
                                  <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={errors.email ? "is-invalid" : ""}
                                  />
                                  {errors.email && (
                                    <div style={{ color: "red" }}>
                                      {errors.email}
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Step 2: OTP */}
                              {sendOtp && !otpVerified && (
                                <div className="mb-3">
                                  <input
                                    type="text"
                                    name="otp"
                                    placeholder="Enter OTP"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    className={errors.otp ? "is-invalid" : ""}
                                  />
                                  {errors.otp && (
                                    <div style={{ color: "red" }}>
                                      {errors.otp}
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Step 3: Passwords */}
                              {otpVerified && (
                                <>
                                  <div
                                    className="mb-3"
                                    style={{ position: "relative" }}
                                  >
                                    <input
                                      type={showPassword ? "text" : "password"}
                                      name="password"
                                      placeholder="Password"
                                      value={formData.password}
                                      onChange={handleChange}
                                      className={
                                        errors.password ? "is-invalid" : ""
                                      }
                                      style={{ paddingRight: "40px" }}
                                    />
                                    <i
                                      className={`bi ${
                                        showPassword ? "bi-eye-slash" : "bi-eye"
                                      }`}
                                      onClick={() =>
                                        setShowPassword(!showPassword)
                                      }
                                      style={{
                                        position: "absolute",
                                        top: "34%",
                                        right: "15px",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer",
                                        fontSize: "2rem",
                                        color: "#777",
                                      }}
                                    ></i>
                                    {errors.password && (
                                      <div style={{ color: "red" }}>
                                        {errors.password}
                                      </div>
                                    )}
                                  </div>

                                  <div
                                    className="mb-3"
                                    style={{ position: "relative" }}
                                  >
                                    <input
                                      type={showcPassword ? "text" : "password"}
                                      name="cpassword"
                                      placeholder="Confirm Password"
                                      value={formData.cpassword}
                                      onChange={handleChange}
                                      className={
                                        errors.cpassword ? "is-invalid" : ""
                                      }
                                      style={{ paddingRight: "40px" }}
                                    />
                                    <i
                                      className={`bi ${
                                        showcPassword
                                          ? "bi-eye-slash"
                                          : "bi-eye"
                                      }`}
                                      onClick={() =>
                                        setShowcPassword(!showcPassword)
                                      }
                                      style={{
                                        position: "absolute",
                                        top: "34%",
                                        right: "15px",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer",
                                        fontSize: "2rem",
                                        color: "#777",
                                      }}
                                    ></i>
                                    {errors.cpassword && (
                                      <div style={{ color: "red" }}>
                                        {errors.cpassword}
                                      </div>
                                    )}
                                  </div>
                                </>
                              )}

                              {/* Button */}
                              <div className="button-box mt-4">
                                <button type="submit">
                                  <span>
                                    {!sendOtp
                                      ? "Send OTP"
                                      : !otpVerified
                                      ? "Verify OTP"
                                      : "Reset Password"}
                                  </span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </>
  );
};

export default ForgetPassword;