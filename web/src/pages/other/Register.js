import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import { BASE_URL } from "../../config";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
const Register = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setFormData({
      fname: "",
      lname: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    });
    setError("");
    setSuccess("");
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const validateForm = () => {
    const { fname, lname, email, mobile, password, confirmPassword } = formData;
    if (!fname.trim() || fname.length < 2) return "First name must be at least 2 characters.";
    if (!lname.trim() || lname.length < 2) return "Last name must be at least 2 characters.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Enter a valid email address.";
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) return "Mobile number must be 10 digits.";
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return "Password must be 8+ chars, with letter, number & symbol.";
    }
    if (password !== confirmPassword) return "Password does not match.";
    return null;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/add_customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess("Registration successful!");
        setFormData({
          fname: "",
          lname: "",
          email: "",
          mobile: "",
          password: "",
          confirmPassword: "",
        });
        setTimeout(() => navigate("/login-register"), 1000);
      } else {
        setError(data?.msg || "Registration failed.");
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Something went wrong. Try again later.");
    }
  };
  return (
    <>
      <SEO titleTemplate="Register" description="Register page of the eCommerce app." />
      <LayoutOne headerTop="visible">
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="register">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            {error && <p style={{ color: "red" }}>{error}</p>}
                            {success && <p style={{ color: "green" }}>{success}</p>}
                            <form onSubmit={handleSubmit} autoComplete="off">
                              <input
                                type="text"
                                name="fname"
                                placeholder="First Name"
                                value={formData.fname}
                                onChange={handleChange}
                                required
                              />
                              <input
                                type="text"
                                name="lname"
                                placeholder="Last Name"
                                value={formData.lname}
                                onChange={handleChange}
                                required
                              />
                              <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                              />
                              <input
                                type="tel"
                                name="mobile"
                                placeholder="Mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                required
                              />
                              {/* Password field */}
                              <div style={{ position: "relative", marginBottom: "15px" }}>
                                <input
                                  type={showPassword ? "text" : "password"}
                                  name="password"
                                  placeholder="Password"
                                  value={formData.password}
                                  onChange={handleChange}
                                  required
                                  style={{ width: "100%", paddingRight: "40px" }}
                                />
                                <i
                                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                                  onClick={() => setShowPassword(!showPassword)}
                                  style={{
                                    position: "absolute",
                                    top: "32%",
                                    right: "10px",
                                    transform: "translateY(-50%)",
                                    cursor: "pointer",
                                    fontSize: "2rem",
                                    color: "#777",
                                  }}
                                ></i>
                              </div>
                              {/* Confirm Password field */}
                              <div style={{ position: "relative", marginBottom: "15px" }}>
                                <input
                                  type={showConfirmPassword ? "text" : "password"}
                                  name="confirmPassword"
                                  placeholder="Confirm Password"
                                  value={formData.confirmPassword}
                                  onChange={handleChange}
                                  required
                                  style={{ width: "100%", paddingRight: "40px" }}
                                />
                                <i
                                  className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  style={{
                                    position: "absolute",
                                    top: "32%",
                                    right: "10px",
                                    transform: "translateY(-50%)",
                                    cursor: "pointer",
                                    fontSize: "2rem",
                                    color: "#777",
                                  }}
                                ></i>
                              </div>
                              <div className="button-box">
                                <button type="submit">
                                  <span>Register</span>
                                </button>
                              </div>
                              <h5 className="mt-5">
                                Already have an account? Let's get you in &nbsp;{" "}
                                <Link to="/login-register" style={{ color: "#2874F0" }}>
                                  Login
                                </Link>
                              </h5>
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
export default Register;