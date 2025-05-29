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
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios'
import { useDispatch } from "react-redux";
import { setCartItems } from "../../store/slices/cart-slice"; 
import { setwishlistItems } from "../../store/slices/wishlist-slice";
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle
  const navigate = useNavigate();
  const dispatch = useDispatch()
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
      newErrors.password = "Incorrect password. Please try again.";
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
        const userData = data.customer;
        localStorage.setItem("customerinfo", JSON.stringify(data.customer));
        setSuccess("Login successful!");
        setFormData({ email: "", password: "" });
        try {
          const response = await axios.get(`http://localhost:3000/getalladdtocart/${userData.id}`);
          const allCartItems = response.data.data;
          const wishlistdata = await axios.get(`http://localhost:3000/getwishlist/${userData.id}`);
          const allwishlistitem = wishlistdata.data.data;
          dispatch(setCartItems(allCartItems));
          dispatch(setwishlistItems(allwishlistitem));
        } catch (fetchErr) {
          console.error("Error fetching wishlist/cart:", fetchErr);
        }

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
                                  <div style={{ color: "red" }}>{errors.email}</div>
                                )}
                              </div>
                              <div className="mb-3" style={{ position: "relative" }}>
                                <input
                                  type={showPassword ? "text" : "password"}
                                  name="password"
                                  placeholder="Password"
                                  value={formData.password}
                                  onChange={handleChange}
                                  className={errors.password ? "is-invalid" : ""}
                                  style={{ paddingRight: "40px" }}
                                />
                                <i
                                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                                  onClick={() => setShowPassword(!showPassword)}
                                  style={{
                                    position: "absolute",
                                    top: "34%",
                                    right: "15px",
                                    // fontSize: "3rem",
                                    transform: "translateY(-50%)",
                                    cursor: "pointer",
                                    fontSize: "2rem",
                                    color: "#777",
                                  }}
                                ></i>
                                {errors.password && (
                                  <div style={{ color: "red", marginTop: "0.25rem" }}>
                                    {errors.password}
                                  </div>
                                )}
                              </div>
                              <div className="button-box mt-4">
                                <button type="submit">
                                  <span>Login</span>
                                </button>
                              </div>
                              <h5 className="mt-5">
                                Create a account &nbsp;
                                <Link to="/register" style={{ color: "#2874F0" }}>
                                  Register
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
export default Login;









