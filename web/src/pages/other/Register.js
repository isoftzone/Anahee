<<<<<<< HEAD
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

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     password: "",
//     confirmPassword: "",
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
  
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }
  
//     try {
//       const response = await fetch(`${BASE_URL}/add_customer`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         setSuccess("Registration successful!");
//         setFormData({
//           name: "",
//           email: "",
//           mobile: "",
//           password: "",
//           confirmPassword: ""
//         });
//         navigate("/login-register");
//       } else {
//         // Show backend error message if available
//         const errorMsg = data?.msg || "Registration failed";
//         setError(errorMsg);
//       }
//     } catch (err) {
//       console.error("Network error:", err);
//       setError("Something went wrong. Please check your connection and try again.");
//     }
//   };  

//   return (
//     <>
//       <SEO titleTemplate="Register" description="Register page of the eCommerce app." />
//       <LayoutOne headerTop="visible">
//         {/* <Breadcrumb pages={[{ label: "Home", path: "/" }, { label: "Register", path: "/register" }]} /> */}
//         <div className="login-register-area pt-100 pb-100">
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-7 col-md-12 ms-auto me-auto">
//                 <div className="login-register-wrapper">
//                   <Tab.Container defaultActiveKey="register">
//                     <Nav variant="pills" className="login-register-tab-list">
//                       <Nav.Item>
//                         <Nav.Link eventKey="register">
//                           <h4>Register</h4>
//                         </Nav.Link>
//                       </Nav.Item>
//                     </Nav>
//                     <Tab.Content>
//                       <Tab.Pane eventKey="register">
//                         <div className="login-form-container">
//                           <div className="login-register-form">
//                             {error && <p style={{ color: "red" }}>{error}</p>}
//                             {success && <p style={{ color: "green" }}>{success}</p>}
//                             <form onSubmit={handleSubmit}>
//                               <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
//                               <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
//                               <input type="tel" name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} required />
//                               <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
//                               <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
//                               <div className="button-box">
//                                 <button type="submit">
//                                   <span>Register</span>
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

// export default Register;


































// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Tab from "react-bootstrap/Tab";
// import Nav from "react-bootstrap/Nav";
// import SEO from "../../components/seo";
// import LayoutOne from "../../layouts/LayoutOne";
// import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
// import { BASE_URL } from "../../config";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [formErrors, setFormErrors] = useState({});
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
//   const mobileRegex = /^[0-9]{10}$/;

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setFormErrors({ ...formErrors, [e.target.name]: "" });
//   };

//   const validate = () => {
//     const errors = {};
//     const { name, email, mobile, password, confirmPassword } = formData;

//     if (!name.trim()) errors.name = "Name is required";
//     if (!email.includes("@")) errors.email = "Valid email is required";
//     if (!mobileRegex.test(mobile)) errors.mobile = "Mobile number must be 10 digits";
//     if (!passwordRegex.test(password)) {
//       errors.password =
//         "Password must be at least 8 characters and include a letter, number, and special character";
//     }
//     if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";

//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSuccess("");
//     const errors = validate();
//     setFormErrors(errors);

//     if (Object.keys(errors).length > 0) return;

//     try {
//       const response = await fetch(`${BASE_URL}/add_customer`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccess("Registration successful!");
//         setFormData({
//           name: "",
//           email: "",
//           mobile: "",
//           password: "",
//           confirmPassword: "",
//         });
//         navigate("/login-register");
//       } else {
//         setFormErrors({ general: data?.msg || "Registration failed" });
//       }
//     } catch (err) {
//       console.error("Network error:", err);
//       setFormErrors({ general: "Something went wrong. Please try again." });
//     }
//   };

//   return (
//     <>
//       <SEO titleTemplate="Register" description="Register page of the eCommerce app." />
//       <LayoutOne headerTop="visible">
//         <div className="login-register-area pt-100 pb-100">
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-7 col-md-12 ms-auto me-auto">
//                 <div className="login-register-wrapper">
//                   <Tab.Container defaultActiveKey="register">
//                     <Nav variant="pills" className="login-register-tab-list">
//                       <Nav.Item>
//                         <Nav.Link eventKey="register">
//                           <h4>Register</h4>
//                         </Nav.Link>
//                       </Nav.Item>
//                     </Nav>
//                     <Tab.Content>
//                       <Tab.Pane eventKey="register">
//                         <div className="login-form-container">
//                           <div className="login-register-form">
//                             {formErrors.general && <p style={{ color: "red" }}>{formErrors.general}</p>}
//                             {success && <p style={{ color: "green" }}>{success}</p>}
//                             <form onSubmit={handleSubmit}>
//                               <input
//                                 type="text"
//                                 name="name"
//                                 placeholder="Name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 required
//                               />
//                               {formErrors.name && <p style={{ color: "red" }}>{formErrors.name}</p>}

//                               <input
//                                 type="email"
//                                 name="email"
//                                 placeholder="Email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 required
//                               />
//                               {formErrors.email && <p style={{ color: "red" }}>{formErrors.email}</p>}

//                               <input
//                                 type="tel"
//                                 name="mobile"
//                                 placeholder="Mobile"
//                                 value={formData.mobile}
//                                 onChange={handleChange}
//                                 required
//                               />
//                               {formErrors.mobile && <p style={{ color: "red" }}>{formErrors.mobile}</p>}

//                               <input
//                                 type="password"
//                                 name="password"
//                                 placeholder="Password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 required
//                               />
//                               {formErrors.password && <p style={{ color: "red" }}>{formErrors.password}</p>}

//                               <input
//                                 type="password"
//                                 name="confirmPassword"
//                                 placeholder="Confirm Password"
//                                 value={formData.confirmPassword}
//                                 onChange={handleChange}
//                                 required
//                               />
//                               {formErrors.confirmPassword && (
//                                 <p style={{ color: "red" }}>{formErrors.confirmPassword}</p>
//                               )}

//                               <div className="button-box">
//                                 <button type="submit">
//                                   <span>Register</span>
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

// export default Register;









// import React, { useState } from "react";
// import Tab from "react-bootstrap/Tab";
// import Nav from "react-bootstrap/Nav";
// import SEO from "../../components/seo";
// import LayoutOne from "../../layouts/LayoutOne";
// import { BASE_URL } from "../../config";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     password: "",
//     confirmPassword: "",
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

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     try {
//       const response = await fetch(`${BASE_URL}/add_customer`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccess("Registration successful!");
//         setFormData({
//           name: "",
//           email: "",
//           mobile: "",
//           password: "",
//           confirmPassword: "",
//         });
//         navigate("/login-register");
//       } else {
//         const errorMsg = data?.msg || "Registration failed";
//         setError(errorMsg);
//       }
//     } catch (err) {
//       console.error("Network error:", err);
//       setError("Something went wrong. Please check your connection and try again.");
//     }
//   };

//   return (
//     <>
//       <SEO titleTemplate="Register" description="Register page of the eCommerce app." />
//       <LayoutOne headerTop="visible">
//         <div className="login-register-area pt-100 pb-100">
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-7 col-md-12 ms-auto me-auto">
//                 <div className="login-register-wrapper">
//                   <Tab.Container defaultActiveKey="register">
//                     <Nav variant="pills" className="login-register-tab-list">
//                       <Nav.Item>
//                         <Nav.Link eventKey="register">
//                           <h4>Register</h4>
//                         </Nav.Link>
//                       </Nav.Item>
//                     </Nav>
//                     <Tab.Content>
//                       <Tab.Pane eventKey="register">
//                         <div className="login-form-container">
//                           <div className="login-register-form">
//                             {error && <p style={{ color: "red" }}>{error}</p>}
//                             {success && <p style={{ color: "green" }}>{success}</p>}
//                             <form onSubmit={handleSubmit} autoComplete="off">
//                               <input
//                                 type="text"
//                                 name="name"
//                                 placeholder="Name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 required
//                                 autoComplete="off"
//                               />
//                               <input
//                                 type="email"
//                                 name="email"
//                                 placeholder="Email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 required
//                                 autoComplete="off"
//                               />
//                               <input
//                                 type="tel"
//                                 name="mobile"
//                                 placeholder="Mobile"
//                                 value={formData.mobile}
//                                 onChange={handleChange}
//                                 required
//                                 autoComplete="off"
//                               />
//                               <input
//                                 type="password"
//                                 name="password"
//                                 placeholder="Password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 required
//                                 autoComplete="new-password"
//                               />
//                               <input
//                                 type="password"
//                                 name="confirmPassword"
//                                 placeholder="Confirm Password"
//                                 value={formData.confirmPassword}
//                                 onChange={handleChange}
//                                 required
//                                 autoComplete="new-password"
//                               />
//                               <div className="button-box">
//                                 <button type="submit">
//                                   <span>Register</span>
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

// export default Register;












// import React, { useState } from "react";
// import Tab from "react-bootstrap/Tab";
// import Nav from "react-bootstrap/Nav";
// import SEO from "../../components/seo";
// import LayoutOne from "../../layouts/LayoutOne";
// import { BASE_URL } from "../../config";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   const validate = () => {
//     // Name validation: required and at least 3 chars
//     if (!formData.name.trim() || formData.name.trim().length < 3) {
//       return "Name must be at least 3 characters long.";
//     }

//     // Email validation regex
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       return "Please enter a valid email address.";
//     }

//     // Mobile validation: only digits, length 10 (adjust if needed)
//     const mobileRegex = /^[0-9]{10}$/;
//     if (!mobileRegex.test(formData.mobile)) {
//       return "Mobile number must be exactly 10 digits.";
//     }

//     // Password validation: min 8 chars, at least 1 uppercase, 1 lowercase, 1 number, 1 special char
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#_~])[A-Za-z\d@$!%*?&^#_~]{8,}$/;
//     if (!passwordRegex.test(formData.password)) {
//       return "Password must be minimum 8 characters and include uppercase, lowercase, number, and symbol.";
//     }

//     // Confirm password match
//     if (formData.password !== formData.confirmPassword) {
//       return "Passwords do not match!";
//     }

//     return null; // no errors
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     const validationError = validate();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     try {
//       const response = await fetch(`${BASE_URL}/add_customer`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccess("Registration successful!");
//         setFormData({
//           name: "",
//           email: "",
//           mobile: "",
//           password: "",
//           confirmPassword: "",
//         });
//         navigate("/login-register");
//       } else {
//         const errorMsg = data?.msg || "Registration failed";
//         setError(errorMsg);
//       }
//     } catch (err) {
//       console.error("Network error:", err);
//       setError("Something went wrong. Please check your connection and try again.");
//     }
//   };

//   return (
//     <>
//       <SEO titleTemplate="Register" description="Register page of the eCommerce app." />
//       <LayoutOne headerTop="visible">
//         <div className="login-register-area pt-100 pb-100">
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-7 col-md-12 ms-auto me-auto">
//                 <div className="login-register-wrapper">
//                   <Tab.Container defaultActiveKey="register">
//                     <Nav variant="pills" className="login-register-tab-list">
//                       <Nav.Item>
//                         <Nav.Link eventKey="register">
//                           <h4>Register</h4>
//                         </Nav.Link>
//                       </Nav.Item>
//                     </Nav>
//                     <Tab.Content>
//                       <Tab.Pane eventKey="register">
//                         <div className="login-form-container">
//                           <div className="login-register-form">
//                             {error && <p style={{ color: "red" }}>{error}</p>}
//                             {success && <p style={{ color: "green" }}>{success}</p>}
//                             <form onSubmit={handleSubmit} autoComplete="off">
//                               <input
//                                 type="text"
//                                 name="name"
//                                 placeholder="Name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 required
//                                 autoComplete="off"
//                               />
//                               <input
//                                 type="email"
//                                 name="email"
//                                 placeholder="Email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 required
//                                 autoComplete="off"
//                               />
//                               <input
//                                 type="tel"
//                                 name="mobile"
//                                 placeholder="Mobile"
//                                 value={formData.mobile}
//                                 onChange={handleChange}
//                                 required
//                                 autoComplete="off"
//                               />
//                               <input
//                                 type="password"
//                                 name="password"
//                                 placeholder="Password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 required
//                                 autoComplete="new-password"
//                               />
//                               <input
//                                 type="password"
//                                 name="confirmPassword"
//                                 placeholder="Confirm Password"
//                                 value={formData.confirmPassword}
//                                 onChange={handleChange}
//                                 required
//                                 autoComplete="new-password"
//                               />
//                               <div className="button-box">
//                                 <button type="submit">
//                                   <span>Register</span>
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

// export default Register;

















// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Tab from "react-bootstrap/Tab";
// import Nav from "react-bootstrap/Nav";
// import SEO from "../../components/seo";
// import LayoutOne from "../../layouts/LayoutOne";
// import { BASE_URL } from "../../config";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     fname: "",
//     lname: "",
//     email: "",
//     mobile: "",
//     password: "",
//     confirmPassword: "",
//   });

  
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     const { fname, lname, email, mobile, password, confirmPassword } = formData;

//     if (!fname.trim() || fname.trim().length < 2) return "First name must be at least 2 characters.";
//     if (!lname.trim() || lname.trim().length < 2) return "Last name must be at least 2 characters.";

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) return "Invalid email address.";

//     const mobileRegex = /^[0-9]{10}$/;
//     if (!mobileRegex.test(mobile)) return "Mobile number must be 10 digits.";

//     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
//     if (!passwordRegex.test(password)) {
//       return "Password must be at least 8 characters and include letters, numbers, and symbols.";
//     }

//     if (password !== confirmPassword) return "Passwords do not match.";

//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     try {
//       const response = await fetch(`${BASE_URL}/add_customer`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccess("Registration successful!");
//         setFormData({
//           fname: "",
//           lname: "",
//           email: "",
//           mobile: "",
//           password: "",
//           confirmPassword: "",
//         });
//         navigate("/login-register");
//       } else {
//         setError(data?.msg || "Registration failed");
//       }
//     } catch (err) {
//       console.error("Network error:", err);
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <>
//       <SEO titleTemplate="Register" description="Register page of the eCommerce app." />
//       <LayoutOne headerTop="visible">
//         <div className="login-register-area pt-100 pb-100">
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-7 col-md-12 ms-auto me-auto">
//                 <div className="login-register-wrapper">
//                   <Tab.Container defaultActiveKey="register">
//                     <Nav variant="pills" className="login-register-tab-list">
//                       <Nav.Item>
//                         <Nav.Link eventKey="register">
//                           <h4>Register</h4>
//                         </Nav.Link>
//                       </Nav.Item>
//                     </Nav>
//                     <Tab.Content>
//                       <Tab.Pane eventKey="register">
//                         <div className="login-form-container">
//                           <div className="login-register-form">
//                             {error && <p style={{ color: "red" }}>{error}</p>}
//                             {success && <p style={{ color: "green" }}>{success}</p>}
//                             <form onSubmit={handleSubmit}>
//                               <input type="text" name="fname" placeholder="First Name" value={formData.fname} onChange={handleChange} required />
//                               <input type="text" name="lname" placeholder="Last Name" value={formData.lname} onChange={handleChange} required />
//                               <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
//                               <input type="tel" name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} required />
//                               <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
//                               <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
//                               <div className="button-box">
//                                 <button type="submit">
//                                   <span>Register</span>
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

// export default Register;












// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Tab from "react-bootstrap/Tab";
// import Nav from "react-bootstrap/Nav";
// import SEO from "../../components/seo";
// import LayoutOne from "../../layouts/LayoutOne";
// import { BASE_URL } from "../../config";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     fname: "",
//     lname: "",
//     email: "",
//     mobile: "",
//     password: "",
//     confirmPassword: ""
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   // Clear form and messages on component mount (refresh)
//   useEffect(() => {
//     setFormData({
//       fname: "",
//       lname: "",
//       email: "",
//       mobile: "",
//       password: "",
//       confirmPassword: ""
//     });
//     setError("");
//     setSuccess("");
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     const { fname, lname, email, mobile, password, confirmPassword } = formData;

//     if (!fname.trim() || fname.length < 2) return "First name must be at least 2 characters long.";
//     if (!lname.trim() || lname.length < 2) return "Last name must be at least 2 characters long.";

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) return "Please enter a valid email address.";

//     const mobileRegex = /^[0-9]{10}$/;
//     if (!mobileRegex.test(mobile)) return "Mobile number must be 10 digits.";

//     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     if (!passwordRegex.test(password)) {
//       return "Password must be at least 8 characters and include letters, numbers, and symbols.";
//     }

//     if (password !== confirmPassword) return "Passwords do not match.";

//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     try {
//       const response = await fetch(`${BASE_URL}/add_customer`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccess("Registration successful!");
//         setFormData({
//           fname: "",
//           lname: "",
//           email: "",
//           mobile: "",
//           password: "",
//           confirmPassword: ""
//         });
//         navigate("/login-register");
//       } else {
//         setError(data?.msg || "Registration failed.");
//       }
//     } catch (err) {
//       console.error("Network error:", err);
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <>
//       <SEO titleTemplate="Register" description="Register page of the eCommerce app." />
//       <LayoutOne headerTop="visible">
//         <div className="login-register-area pt-100 pb-100">
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-7 col-md-12 ms-auto me-auto">
//                 <div className="login-register-wrapper">
//                   <Tab.Container defaultActiveKey="register">
//                     <Nav variant="pills" className="login-register-tab-list">
//                       <Nav.Item>
//                         <Nav.Link eventKey="register">
//                           <h4>Register</h4>
//                         </Nav.Link>
//                       </Nav.Item>
//                     </Nav>
//                     <Tab.Content>
//                       <Tab.Pane eventKey="register">
//                         <div className="login-form-container">
//                           <div className="login-register-form">
//                             {error && <p style={{ color: "red" }}>{error}</p>}
//                             {success && <p style={{ color: "green" }}>{success}</p>}
//                             <form onSubmit={handleSubmit} autoComplete="off">
//                               <input
//                                 type="text"
//                                 name="fname"
//                                 placeholder="First Name"
//                                 value={formData.fname}
//                                 onChange={handleChange}
//                                 required
//                               />
//                               <input
//                                 type="text"
//                                 name="lname"
//                                 placeholder="Last Name"
//                                 value={formData.lname}
//                                 onChange={handleChange}
//                                 required
//                               />
//                               <input
//                                 type="email"
//                                 name="email"
//                                 placeholder="Email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 required
//                               />
//                               <input
//                                 type="tel"
//                                 name="mobile"
//                                 placeholder="Mobile"
//                                 value={formData.mobile}
//                                 onChange={handleChange}
//                                 required
//                               />
//                               <input
//                                 type="password"
//                                 name="password"
//                                 placeholder="Password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 required
//                               />
//                               <input
//                                 type="password"
//                                 name="confirmPassword"
//                                 placeholder="Confirm Password"
//                                 value={formData.confirmPassword}
//                                 onChange={handleChange}
//                                 required
//                               />
//                               <div className="button-box">
//                                 <button type="submit">
//                                   <span>Register</span>
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

// export default Register;












// import React, { useState, useEffect } from "react";
// import Tab from "react-bootstrap/Tab";
// import Nav from "react-bootstrap/Nav";
// import SEO from "../../components/seo";
// import LayoutOne from "../../layouts/LayoutOne";
// import { BASE_URL } from "../../config";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     fname: "",
//     lname: "",
//     email: "",
//     mobile: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   // Clear form on refresh
//   useEffect(() => {
//     setFormData({
//       fname: "",
//       lname: "",
//       email: "",
//       mobile: "",
//       password: "",
//       confirmPassword: "",
//     });
//     setError("");
//     setSuccess("");
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     const { fname, lname, email, mobile, password, confirmPassword } = formData;

//     if (!fname.trim() || fname.length < 2) return "First name must be at least 2 characters.";
//     if (!lname.trim() || lname.length < 2) return "Last name must be at least 2 characters.";

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) return "Enter a valid email address.";

//     const mobileRegex = /^[0-9]{10}$/;
//     if (!mobileRegex.test(mobile)) return "Mobile number must be 10 digits.";

//     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
//     if (!passwordRegex.test(password)) {
//       return "Password must be 8+ chars, with letter, number & symbol.";
//     }

//     if (password !== confirmPassword) return "Passwords do not match.";

//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     try {
//       const response = await fetch(`${BASE_URL}/add_customer`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccess("Registration successful!");
//         setFormData({
//           fname: "",
//           lname: "",
//           email: "",
//           mobile: "",
//           password: "",
//           confirmPassword: "",
//         });
//         navigate("/login-register");
//       } else {
//         setError(data?.msg || "Registration failed.");
//       }
//     } catch (err) {
//       console.error("Network error:", err);
//       setError("Something went wrong. Try again later.");
//     }
//   };
//   console.log("formdata vlue==",formData);

//   return (
//     <>
//       <SEO titleTemplate="Register" description="Register page of the eCommerce app." />
//       <LayoutOne headerTop="visible">
//         <div className="login-register-area pt-100 pb-100">
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-7 col-md-12 ms-auto me-auto">
//                 <div className="login-register-wrapper">
//                   <Tab.Container defaultActiveKey="register">
//                     <Nav variant="pills" className="login-register-tab-list">
//                       <Nav.Item>
//                         <Nav.Link eventKey="register">
//                           <h4>Register</h4>
//                         </Nav.Link>
//                       </Nav.Item>
//                     </Nav>
//                     <Tab.Content>
//                       <Tab.Pane eventKey="register">
//                         <div className="login-form-container">
//                           <div className="login-register-form">
//                             {error && <p style={{ color: "red" }}>{error}</p>}
//                             {success && <p style={{ color: "green" }}>{success}</p>}
//                             <form onSubmit={handleSubmit} autoComplete="off">
//                               <input
//                                 type="text"
//                                 name="fname"
//                                 placeholder="First Name"
//                                 value={formData.fname}
//                                 onChange={handleChange}
//                                 required
//                                 autoComplete="off"
//                               />
//                               <input
//                                 type="text"
//                                 name="lname"
//                                 placeholder="Last Name"
//                                 value={formData.lname}
//                                 onChange={handleChange}
//                                 required
//                                 autoComplete="off"
//                               />
//                               <input
//                                 type="email"
//                                 name="email"
//                                 placeholder="Email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 required
//                                 autoComplete="off"
//                               />
//                               <input
//                                 type="tel"
//                                 name="mobile"
//                                 placeholder="Mobile"
//                                 value={formData.mobile}
//                                 onChange={handleChange}
//                                 required
//                                 autoComplete="off"
//                               />
//                               <input
//                                 type="password"
//                                 name="password"
//                                 placeholder="Password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 required
//                                 autoComplete="new-password"
//                               />
//                               <input
//                                 type="password"
//                                 name="confirmPassword"
//                                 placeholder="Confirm Password"
//                                 value={formData.confirmPassword}
//                                 onChange={handleChange}
//                                 required
//                                 autoComplete="new-password"
//                               />
//                               <div className="button-box">
//                                 <button type="submit">
//                                   <span>Register</span>
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

// export default Register;













=======
>>>>>>> main
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
<<<<<<< HEAD

=======
>>>>>>> main
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
<<<<<<< HEAD

=======
>>>>>>> main
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
<<<<<<< HEAD

=======
>>>>>>> main
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
<<<<<<< HEAD

=======
>>>>>>> main
    try {
      const response = await fetch(`${BASE_URL}/add_customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
<<<<<<< HEAD

      const data = await response.json();

=======
      const data = await response.json();
>>>>>>> main
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
<<<<<<< HEAD

=======
>>>>>>> main
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
<<<<<<< HEAD

export default Register;


=======
export default Register;
>>>>>>> main
