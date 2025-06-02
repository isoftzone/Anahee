import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import { BASE_URL } from "../../config";
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../../store/slices/cart-slice"; 
import { setwishlistItems } from "../../store/slices/wishlist-slice";
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);
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
      // if (response.ok) {
      //   const userData = data.customer;
      //   localStorage.setItem("customerinfo", JSON.stringify(data.customer));
      //   setSuccess("Login successful!");
      //   setFormData({ email: "", password: "" });
      //   try {
      //     const response = await axios.get(`http://localhost:3000/getalladdtocart/${userData.id}`);
      //     const allCartItems = response.data.data;
      //     const wishlistdata = await axios.get(`http://localhost:3000/getwishlist/${userData.id}`);
      //     const allwishlistitem = wishlistdata.data.data;
      //     dispatch(setCartItems(allCartItems));
      //     dispatch(setwishlistItems(allwishlistitem));
      //   } catch (fetchErr) {
      //     console.error("Error fetching wishlist/cart:", fetchErr);
      //   }

      //   navigate("/");
      // } else {
      //   setApiError(data.msg || "Login failed");
      // }
      if (response.ok) {
            const userData = data.customer;
            localStorage.setItem("customerinfo", JSON.stringify(userData));
            setSuccess("Login successful!");
            setFormData({ email: "", password: "" });
            let serverCart = [];
            let serverWishlist = [];
            try {
                const cartRes = await axios.get(`${BASE_URL}/getalladdtocart/${userData.id}`);
                serverCart = cartRes.data.data || [];
            } catch (err) {
                if (err.response && err.response.status === 404 && err.response.data.error === "No cart items found") {
                    console.log("No cart items found for user, initializing empty cart.");
                    serverCart = []; // Backend returned 404 for no cart items, treat as empty
                } else {
                    console.error("Error fetching cart:", err);
                    // Handle other cart fetching errors if necessary
                }
            }
            try {
                const wishlistRes = await axios.get(`${BASE_URL}/getwishlist/${userData.id}`);
                serverWishlist = wishlistRes.data.data || [];
            } catch (err) {
                if (err.response && err.response.status === 404 && err.response.data.error === "No wishlist items found") {
                    console.log("No wishlist items found for user, initializing empty wishlist.");
                    serverWishlist = []; // Backend returned 404 for no wishlist items, treat as empty
                } else {
                    console.error("Error fetching wishlist:", err);
                    // Handle other wishlist fetching errors if necessary
                }
            }
            // Convert to maps for fast lookup
            const serverCartMap = new Map(serverCart.map(item => [String(item.id), item]));
            const serverWishlistMap = new Map(serverWishlist.map(item => [String(item.id), item]));
            // Insert only items not present in server cart
            const cartInsertPromises = cartItems
                .filter(item => !serverCartMap.has(String(item.id)))
                .map(item =>
                    axios.post(`${BASE_URL}/addtocartdata`, {
                        CUSTOMERID: userData.id,
                        ITEMID: item.id,
                        quantity: item.quantity,
                        type: "cart"
                    }).catch(err =>
                        console.error("Cart insert error:", item.id, err.response?.data || err)
                    )
                );
            // Insert only items not present in server wishlist
            const wishlistInsertPromises = wishlistItems
                .filter(item => !serverWishlistMap.has(String(item.id)))
                .map(item =>
                    axios.post(`${BASE_URL}/addwishlistdata`, {
                        CUSTOMERID: userData.id,
                        ITEMID: item.id,
                        type: "wishlist"
                    }).catch(err =>
                        console.error("Wishlist insert error:", item.id, err.response?.data || err)
                    )
                );
            // Wait for all insertions to complete
            await Promise.allSettled([...cartInsertPromises, ...wishlistInsertPromises]); // Use Promise.allSettled to ensure all promises run even if some fail
            // Fetch updated data after merging (after all potential insertions)
            let updatedCartRes;
            try {
                updatedCartRes = await axios.get(`${BASE_URL}/getalladdtocart/${userData.id}`);
            } catch (err) {
                 if (err.response && err.response.status === 404) {
                    updatedCartRes = { data: { data: [] } }; // Treat 404 as empty
                 } else {
                     throw err; // Re-throw other errors
                 }
            }
            let updatedWishlistRes;
            try {
                updatedWishlistRes = await axios.get(`${BASE_URL}/getwishlist/${userData.id}`);
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    updatedWishlistRes = { data: { data: [] } }; // Treat 404 as empty
                } else {
                    throw err; // Re-throw other errors
                }
            }
            dispatch(setCartItems(updatedCartRes.data.data || []));
            dispatch(setwishlistItems(updatedWishlistRes.data.data || []));
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









