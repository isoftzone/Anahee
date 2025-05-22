import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Container, Badge } from "react-bootstrap";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import axios from "axios";
import { BASE_URL } from "../../config";
import "bootstrap-icons/font/bootstrap-icons.css";

const MyAccount = () => {
  const [customer, setCustomer] = useState({
    FNAME: "",
    LNAME: "",
    email: "",
    MOBILE: "",
    CADDRESSLINE1: "",
    CCITY: "",
    CSTATE: "",
    CCOUNTRY: "",
    CDISTRICT: "",
    CPINCODE: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [items, setItems] = useState([
    { item: "", description: "", quantity: 0, price: 0 },
  ]);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { item: "", description: "", quantity: 0, price: 0 }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const total =
    subtotal + shipping + (subtotal * tax) / 100 - (subtotal * discount) / 100;

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [viewOrders, setViewOrders] = useState(false); // <-- New state to toggle views

  const navigate = useNavigate();
  const customerinfo = JSON.parse(localStorage.getItem("customerinfo"));
  const customerId = customerinfo?.id;

  if (!customerId) {
    navigate("/login-register");
  }

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/getcustomerbyid/${customerId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;

        setCustomer({
          FNAME: data.FNAME || "",
          LNAME: data.LNAME || "",
          email: data.email || "",
          MOBILE: data.MOBILE || "",
          CADDRESSLINE1: data.CADDRESSLINE1 || "",
          CCITY: data.CCITY || "",
          CSTATE: data.CSTATE || "",
          CCOUNTRY: data.CCOUNTRY || "",
          CDISTRICT: data.CDISTRICT || "",
          CPINCODE: data.CPINCODE || "",
          password: data.password || "",
          newPassword: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error("Failed to fetch customer data:", error);
      }
    };

    fetchCustomerData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      customer.newPassword &&
      customer.newPassword !== customer.confirmPassword
    ) {
      setError("Passwords don't match");
      return;
    }

    try {
      const updateData = {
        FNAME: customer.FNAME,
        LNAME: customer.LNAME,
        email: customer.email,
        MOBILE: customer.MOBILE,
        CADDRESSLINE1: customer.CADDRESSLINE1,
        CCITY: customer.CCITY,
        CSTATE: customer.CSTATE,
        CCOUNTRY: customer.CCOUNTRY,
        CDISTRICT: customer.CDISTRICT,
        CPINCODE: customer.CPINCODE,
        customerId,
      };

      if (customer.newPassword) {
        updateData.newPassword = customer.newPassword;
      }

      const response = await axios.put(
        `${BASE_URL}/updateCustomerInfo`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      if (response.status === 200) {
        setCustomer((prev) => ({
          ...prev,
          newPassword: "",
          confirmPassword: "",
        }));
        setSuccess(data.message);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Update failed");
      setError(error.response?.data?.message);
    }
  };

  const [activeTab, setActiveTab] = useState("all_orders");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const customerData = JSON.parse(localStorage.getItem("customerinfo"));
    if (customerData?.id) {
      const fetchOrders = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `${BASE_URL}/getallorders/${customerData.id}`
          );
          if (response.data?.orders) {
            setOrders(response.data.orders);
          }
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchOrders();
    }
  }, []);
  // Filter orders based on status
  const cancelledOrders = orders.filter(
    (order) => order.ORDER_STATUS === "Cancel"
  );
  const deliveredOrders = orders.filter(
    (order) => order.ORDER_STATUS === "Delivered"
  );
  const openOrders = orders.filter((order) =>
    ["Placed", "Progress", "Dispatched"].includes(order.ORDER_STATUS)
  );

  const getStatusBadge = (status) => {
    const variantMap = {
      Placed: "primary",
      Progress: "info",
      Dispatched: "warning",
      Delivered: "success",
      Cancel: "danger",
    };
    return (
      <Badge pill bg={variantMap[status]} className="status-badge">
        {status}
      </Badge>
    );
  };

  //     const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };
  const renderOrderCard = (order) => {
    let totalAmount = 0;
    return (
      <div key={order.SALEID} className="order-card mb-4">
        <div className="order-header">
          <h3 className="order-number">Order #{order.SALEID}</h3>
          <div className="order-meta">
            <span className="order-date">
              <i className="bi bi-calendar"></i>{" "}
              {new Date(order.CREATEDON).toLocaleDateString()}
            </span>
            <span className="order-status">
              Status: {getStatusBadge(order.ORDER_STATUS)}
            </span>
          </div>
        </div>
        <div className="order-details">
          <div className="payment-info">
            <span className="payment-method">
              <strong>Payment Method:</strong> {order.PAYMENTMETHOD}
            </span>
            <span className="payment-status">
              <strong>Payment Status:</strong> {order.PAYMENTSTATUS}
            </span>
          </div>
          <div className="table-responsive">
            <table className="table order-items-table">
              <thead>
                <tr>
                  <th className="product-col">Product</th>
                  <th className="quantity-col text-center">Qty</th>
                  <th className="amount-col text-end">Amount</th>
                </tr>
              </thead>
              <tbody>
                {order.ITEMS &&
                  order.ITEMS.map((item, index) => {
                    const quantity = parseFloat(item.QUANTITY || 0);
                    const amount = parseFloat(item.AMOUNT || 0);
                    const lineTotal = amount * quantity;
                    totalAmount += lineTotal;
                    return (
                      <tr key={index}>
                        <td className="product-cell">
                          <div className="product-info">
                            <div className="product-name">
                              {item.ITEMNAME || "Product Name Not Available"}
                            </div>
                            {item.DESCRIPTION && (
                              <div className="product-desc text-muted">
                                {item.DESCRIPTION}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="quantity-cell text-center">
                          {quantity}
                        </td>
                        <td className="amount-cell text-end">
                          ${amount.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                <tr className="order-total-row">
                  <td colSpan="2" className="text-end total-label">
                    <strong>Total:</strong>
                  </td>
                  <td className="text-end total-amount">
                    <strong>${totalAmount.toFixed(2)}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Fragment>
      <SEO titleTemplate="My Account" description="My Account page" />
      <LayoutOne headerTop="visible">
        <div
          className="myaccount-area"
          style={{ padding: "2rem 0" }}
        >
          <div className="container-fluid">
            <div className="row">
              {/* Left Column: Dynamic Content */}
              <div className="col-lg-10 col-md-12 mb-4">
                <div className="myaccount-wrapper">
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  {success && <p style={{ color: "green" }}>{success}</p>}

                  {!viewOrders ? (
                    <form onSubmit={handleSubmit}>
                      <h4 className="mb-4" style={{ fontWeight: "500" }}>
                        Account Information
                      </h4>
                      <div className="row">
                        {/* First Name */}
                        <div className="col-lg-6 mb-4">
                          <label className="d-block mb-2">First Name</label>
                          <input
                            type="text"
                            name="FNAME"
                            value={customer.FNAME}
                            onChange={handleInputChange}
                            className="w-100 p-2"
                            style={inputStyle}
                          />
                        </div>

                        {/* Last Name */}
                        <div className="col-lg-6 mb-4">
                          <label className="d-block mb-2">Last Name</label>
                          <input
                            type="text"
                            name="LNAME"
                            value={customer.LNAME}
                            onChange={handleInputChange}
                            className="w-100 p-2"
                            style={inputStyle}
                          />
                        </div>

                        {/* Email */}
                        <div className="col-lg-6 mb-4">
                          <label className="d-block mb-2">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={customer.email}
                            disabled
                            className="w-100 p-2"
                            style={{ ...inputStyle, color: "#777" }}
                          />
                        </div>

                        {/* Phone */}
                        <div className="col-lg-6 mb-4">
                          <label className="d-block mb-2">Phone</label>
                          <input
                            type="text"
                            name="MOBILE"
                            value={customer.MOBILE}
                            onChange={handleInputChange}
                            className="w-100 p-2"
                            style={inputStyle}
                          />
                        </div>

                        {/* Address */}
                        <div className="col-lg-6 mb-4">
                          <label className="d-block mb-2">Address</label>
                          <input
                            type="text"
                            name="CADDRESSLINE1"
                            value={customer.CADDRESSLINE1}
                            onChange={handleInputChange}
                            className="w-100 p-2"
                            style={inputStyle}
                          />
                        </div>

                        {/* City */}
                        <div className="col-lg-6 mb-4">
                          <label className="d-block mb-2">City</label>
                          <input
                            type="text"
                            name="CCITY"
                            value={customer.CCITY}
                            onChange={handleInputChange}
                            className="w-100 p-2"
                            style={inputStyle}
                          />
                        </div>

                        {/* State */}
                        <div className="col-lg-6 mb-4">
                          <label className="d-block mb-2">State</label>
                          <input
                            type="text"
                            name="CSTATE"
                            value={customer.CSTATE}
                            onChange={handleInputChange}
                            className="w-100 p-2"
                            style={inputStyle}
                          />
                        </div>

                        {/* Country */}
                        <div className="col-lg-6 mb-4">
                          <label className="d-block mb-2">Country</label>
                          <input
                            type="text"
                            name="CCOUNTRY"
                            value={customer.CCOUNTRY}
                            onChange={handleInputChange}
                            className="w-100 p-2"
                            style={inputStyle}
                          />
                        </div>

                        {/* Postal Code */}
                        <div className="col-lg-6 mb-4">
                          <label className="d-block mb-2">Postal Code</label>
                          <input
                            type="text"
                            name="CPINCODE"
                            value={customer.CPINCODE}
                            onChange={handleInputChange}
                            className="w-100 p-2"
                            style={inputStyle}
                          />
                        </div>

                        {/* Password */}
                        <div className="col-lg-6 mb-4">
                          <label className="d-block mb-2">Old Password</label>
                          <input
                            type="text"
                            name="old_password"
                            value={customer.password}
                            className="w-100 p-2"
                            style={inputStyle}
                            readOnly
                          />
                        </div>

                        {/* Password */}
                        {/* <div className="col-lg-6 mb-4">
                          <label className="d-block mb-2">New Password</label>
                          <input type="password" name="newPassword" value={customer.newPassword} onChange={handleInputChange} className="w-100 p-2" style={inputStyle} />
                        </div> */}

                        <div
                          style={{ position: "relative", marginBottom: "15px" }}
                        >
                          <input
                            type={showPassword ? "text" : "password"}
                            name="newPassword"
                            placeholder="New Password"
                            value={customer.newPassword}
                            onChange={handleInputChange}
                            required
                            style={{ width: "100%", paddingRight: "40px" }}
                            autoComplete="off"
                          />
                          <i
                            className={`bi ${
                              showPassword ? "bi-eye-slash" : "bi-eye"
                            }`}
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                              position: "absolute",
                              top: "50%",
                              right: "4%",
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                              fontSize: "2rem",
                              color: "#777",
                            }}
                          ></i>
                        </div>

                        {/* Confirm Password */}
                        {/* <div className="col-lg-6 mb-4">
                          <label className="d-block mb-2">Confirm Password</label>
                          <input type="password" name="confirmPassword" value={customer.confirmPassword} onChange={handleInputChange} className="w-100 p-2" style={inputStyle} />
                        </div> */}

                        <div
                          style={{ position: "relative", marginBottom: "15px" }}
                        >
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={customer.confirmPassword}
                            onChange={handleInputChange}
                            required
                            style={{ width: "100%", paddingRight: "40px" }}
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          type="submit"
                          className="w-100 py-2"
                          style={buttonStyle}
                        >
                          Update Profile
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div
                      style={{
                        maxWidth: "1000px",
                        margin: "0 auto",
                        padding: "2rem",
                      }}
                    >
                      <Container className="orders-container">
                        <div className="page-header">
                          <h1 className="page-title">My Orders</h1>
                          <p className="page-subtitle">
                            View and manage your order history
                          </p>
                        </div>
                        <div className="orders-tabs">
                          <Tabs
                            activeKey={activeTab}
                            onSelect={(k) => setActiveTab(k)}
                            className="mb-4 custom-tabs"
                            justify
                          >
                            <Tab eventKey="all_orders" title="All Orders">
                              <div className="orders-section">
                                <h2 className="section-title">
                                  Your Order History
                                </h2>
                                {isLoading ? (
                                  <div className="loading-spinner">
                                    <div
                                      className="spinner-border text-primary"
                                      role="status"
                                    >
                                      <span className="visually-hidden">
                                        Loading...
                                      </span>
                                    </div>
                                    <p className="loading-text">
                                      Loading your orders...
                                    </p>
                                  </div>
                                ) : orders.length === 0 ? (
                                  <div className="no-orders">
                                    <i className="bi bi-box-seam no-orders-icon"></i>
                                    <h3 className="no-orders-title">
                                      No orders found
                                    </h3>
                                    <p className="no-orders-message">
                                      You haven't placed any orders yet.
                                    </p>
                                  </div>
                                ) : (
                                  <div className="orders-list">
                                    {orders.map(renderOrderCard)}
                                  </div>
                                )}
                              </div>
                            </Tab>
                            <Tab eventKey="delivered" title="Delivered">
                              <div className="orders-section">
                                <h2 className="section-title">
                                  Delivered Orders
                                </h2>
                                {isLoading ? (
                                  <div className="loading-spinner">
                                    <div
                                      className="spinner-border text-primary"
                                      role="status"
                                    >
                                      <span className="visually-hidden">
                                        Loading...
                                      </span>
                                    </div>
                                    <p className="loading-text">
                                      Loading delivered orders...
                                    </p>
                                  </div>
                                ) : deliveredOrders.length === 0 ? (
                                  <div className="no-orders">
                                    <i className="bi bi-truck no-orders-icon"></i>
                                    <h3 className="no-orders-title">
                                      No delivered orders
                                    </h3>
                                    <p className="no-orders-message">
                                      Your completed orders will appear here.
                                    </p>
                                  </div>
                                ) : (
                                  <div className="orders-list">
                                    {deliveredOrders.map(renderOrderCard)}
                                  </div>
                                )}
                              </div>
                            </Tab>
                            <Tab eventKey="cancelled" title="Cancelled">
                              <div className="orders-section">
                                <h2 className="section-title">
                                  Cancelled Orders
                                </h2>
                                {isLoading ? (
                                  <div className="loading-spinner">
                                    <div
                                      className="spinner-border text-primary"
                                      role="status"
                                    >
                                      <span className="visually-hidden">
                                        Loading...
                                      </span>
                                    </div>
                                    <p className="loading-text">
                                      Loading cancelled orders...
                                    </p>
                                  </div>
                                ) : cancelledOrders.length === 0 ? (
                                  <div className="no-orders">
                                    <i className="bi bi-x-circle no-orders-icon"></i>
                                    <h3 className="no-orders-title">
                                      No cancelled orders
                                    </h3>
                                    <p className="no-orders-message">
                                      You haven't cancelled any orders.
                                    </p>
                                  </div>
                                ) : (
                                  <div className="orders-list">
                                    {cancelledOrders.map(renderOrderCard)}
                                  </div>
                                )}
                              </div>
                            </Tab>
                          </Tabs>
                        </div>
                      </Container>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: View Orders Toggle */}
              <div className="col-lg-2 col-md-12">
                <div>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    <li>
                      <button
                        onClick={() => setViewOrders(!viewOrders)}
                        style={sidebarStyle}
                      >
                        {viewOrders ? "Back to Profile" : "View Orders"}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

const inputStyle = {
  background: "transparent",
  borderBottom: "1px solid #eee",
  outline: "none",
};

const buttonStyle = {
  backgroundColor: "#3f51b5",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const sidebarStyle = {
  backgroundColor: "#ffeaf1",
  border:"none",
   borderRadius: "5px",
   padding:"5px 10px"
 
};

export default MyAccount;
