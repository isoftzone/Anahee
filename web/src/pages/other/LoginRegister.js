// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Tab from "react-bootstrap/Tab";
// import Nav from "react-bootstrap/Nav";
// import SEO from "../../components/seo";
// import LayoutOne from "../../layouts/LayoutOne";
// import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
// import { BASE_URL } from "../../config";
// import { useNavigate } from 'react-router-dom';

// // const BASE_URL = process.env.REACT_APP_BASE_URL;

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       const response = await fetch(`${BASE_URL}/login_customer`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {

//         localStorage.setItem("customerinfo", JSON.stringify(data.customer));

//         setSuccess("Login successful!");
//         setFormData({ email: "", password: "" });
//         navigate("/");
//       } else {
//         setError(data.msg || "Login failed");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <>
//       <SEO titleTemplate="Login" description="Login page of the eCommerce app." />
//       <LayoutOne headerTop="visible">
//         {/* <Breadcrumb pages={[{ label: "Home", path: "/" }, { label: "Login" }]} /> */}
//         <div className="login-register-area pt-100 pb-100">
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-7 col-md-12 ms-auto me-auto">
//                 <div className="login-register-wrapper">
//                   <Tab.Container defaultActiveKey="login">
//                     <Nav variant="pills" className="login-register-tab-list">
//                       <Nav.Item>
//                         <Nav.Link eventKey="login">
//                           <h4>Login</h4>
//                         </Nav.Link>
//                       </Nav.Item>
//                     </Nav>
//                     <Tab.Content>
//                       <Tab.Pane eventKey="login">
//                         <div className="login-form-container">
//                           <div className="login-register-form">
//                             {error && <p style={{ color: "red" }}>{error}</p>}
//                             {success && <p style={{ color: "green" }}>{success}</p>}
//                             <form onSubmit={handleSubmit}>
//                               <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
//                               <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
//                               <div className="button-box">
//                                 <button type="submit">
//                                   <span>Login</span>
//                                 </button>
//                               </div>
//                             </form>
//                           </div>
//                         </div>
//                       </Tab.Pane>
//                     </Tab.Content>
//                   </Tab.Container>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </LayoutOne>
//     </>
//   );
// };

// export default Login;






import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import { BASE_URL } from "../../config";
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
 const validate = () => {
  const newErrors = {};
  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Invalid email format";
  }
  if (!formData.password) {
    newErrors.password = "Password is required";
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(formData.password)
  ) {
    newErrors.password =
      "Password must be at least 8 characters long and include a letter, a number, and a special character";
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setApiError("");
    setSuccess("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const response = await fetch(`${BASE_URL}/login_customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("customerinfo", JSON.stringify(data.customer));
        setSuccess("Login successful!");
        setFormData({ email: "", password: "" });
        navigate("/");
      } else {
        setApiError(data.msg || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setApiError("Something went wrong. Please try again.");
    }
  };
  return (
    <>
      <SEO titleTemplate="Login" description="Login page of the eCommerce app." />
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
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            {apiError && <p style={{ color: "red" }}>{apiError}</p>}
                            {success && <p style={{ color: "green" }}>{success}</p>}
                            <form onSubmit={handleSubmit} noValidate>
                              <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? "is-invalid" : ""}
                              />
                              {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className={errors.password ? "is-invalid" : ""}
                              />
                              {errors.password && <div style={{ color: "red" }}>{errors.password}</div>}
                              <div className="button-box">
                                <button type="submit">
                                  <span>Login</span>
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
export default Login;