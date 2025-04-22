import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { BASE_URL } from "../../config";
import { useNavigate } from 'react-router-dom';


// const BASE_URL = process.env.REACT_APP_BASE_URL;

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
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
          name: "",
          email: "",
          mobile: "",
          password: "",
          confirmPassword: ""
        });
        navigate("/login-register");
      } else {
        // Show backend error message if available
        const errorMsg = data?.msg || "Registration failed";
        setError(errorMsg);
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Something went wrong. Please check your connection and try again.");
    }
  };  

  return (
    <>
      <SEO titleTemplate="Register" description="Register page of the eCommerce app." />
      <LayoutOne headerTop="visible">
        {/* <Breadcrumb pages={[{ label: "Home", path: "/" }, { label: "Register", path: "/register" }]} /> */}
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
                            <form onSubmit={handleSubmit}>
                              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                              <input type="tel" name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} required />
                              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
                              <div className="button-box">
                                <button type="submit">
                                  <span>Register</span>
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

export default Register;
