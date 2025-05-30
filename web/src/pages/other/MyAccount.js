import { Fragment, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
    referralId: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("all_orders");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeView, setActiveView] = useState("profile");
  const [successTimeout, setSuccessTimeout] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [activeProfileSection, setActiveProfileSection] =
    useState("personalDetails");

  const navigate = useNavigate();
  const location = useLocation();
  const customerinfo = JSON.parse(localStorage.getItem("customerinfo"));
  const customerId = customerinfo?.id;

  if (!customerId) {
    navigate("/login-register");
  }

  useEffect(() => {
    return () => {
      if (successTimeout) {
        clearTimeout(successTimeout);
      }
    };
  }, [successTimeout]);

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
          referralId: data.referralId || "REF" + customerId,
        });
      } catch (error) {
        console.error("Failed to fetch customer data:", error);
      }
    };

    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${BASE_URL}/getallorders/${customerId}`
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

    fetchCustomerData();
    fetchOrders();
  }, [customerId]);

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

  const renderOrderCard = (order) => {
    let totalAmount = 0;
    return (
      <div key={order.SALEID} className="order-card mb-4">
        <div className="order-header">
          <h3 className="order-number">Order {order.SALEID}</h3>
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
                          {amount.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                <tr className="order-total-row">
                  <td colSpan="2" className="text-end total-label">
                    <strong>Total:</strong>
                  </td>
                  <td className="text-end total-amount">
                    <strong>{totalAmount.toFixed(2)}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderPersonalDetails = () => (
    <div className="row">
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
    </div>
  );

  const renderChangePassword = () => (
    <div className="row">
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

      <div
        className="col-lg-6 mb-4"
        style={{ position: "relative", marginBottom: "15px" }}
      >
        <label className="d-block mb-2">New Password</label>
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
          className={`bi pt-5 ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
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

      <div
        className="col-lg-6 mb-4"
        style={{ position: "relative", marginBottom: "15px" }}
      >
        <label className="d-block mb-2">Confirm Password</label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          value={customer.confirmPassword}
          onChange={handleInputChange}
          required
          style={{ width: "100%", paddingRight: "40px" }}
        />
        <i
          className={`bi pt-5 ${
            showConfirmPassword ? "bi-eye-slash" : "bi-eye"
          }`}
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
    </div>
  );

  const renderRegisterPage = () => (
    <div>
      <p>Email: {customer.email}</p>
      <p>Referral ID: {customer.referralId}</p>
    </div>
  );

  const renderProfileView = () => (
    <form onSubmit={handleSubmit}>
      <div
        className="mb-4"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4 style={{ fontWeight: "500" }}>
          {activeProfileSection === "personalDetails" && "Personal Details"}
          {activeProfileSection === "changePassword" && "Change Password"}
          {activeProfileSection === "registerPage" &&
            "Registration Address"}
        </h4>
      </div>

      {activeProfileSection === "personalDetails" && renderPersonalDetails()}
      {activeProfileSection === "changePassword" && renderChangePassword()}
      {activeProfileSection === "registerPage" && renderRegisterPage()}

      <div className="mt-4">
        <button type="submit" className="px-3 py-2" style={buttonStyle}>
          Update Profile
        </button>
      </div>
    </form>
  );

  const renderOrdersView = () => (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem" }}>
      <div className="container orders-container">
        <div className="page-header">
          <h1 className="page-title">My Orders</h1>
          <p className="page-subtitle">View and manage your order history</p>
        </div>
        <div className="orders-tabs">
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-4 custom-tabs"
            justify
          >
            <Tab eventKey="all_orders" title="All Orders">
              {isLoading ? (
                <p>Loading orders...</p>
              ) : orders.length > 0 ? (
                orders.map((order) => renderOrderCard(order))
              ) : (
                <p>No orders found</p>
              )}
            </Tab>
            <Tab eventKey="delivered" title="Delivered">
              {isLoading ? (
                <p>Loading orders...</p>
              ) : deliveredOrders.length > 0 ? (
                deliveredOrders.map((order) => renderOrderCard(order))
              ) : (
                <p>No delivered orders found</p>
              )}
            </Tab>
            <Tab eventKey="cancelled" title="Cancelled">
              {isLoading ? (
                <p>Loading orders...</p>
              ) : cancelledOrders.length > 0 ? (
                cancelledOrders.map((order) => renderOrderCard(order))
              ) : (
                <p>No cancelled orders found</p>
              )}
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );

  return (
    <Fragment>
      <SEO titleTemplate="My Account" description="My Account page" />
      <LayoutOne headerTop="visible">
        <div className="myaccount-area" style={{ padding: "2rem 0" }}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-md-4 ">
                <div className="account-sidebar" style={sidebarContainerStyle}>
                  <div className="account-sidebar-header">
                    <h3 style={sidebarHeaderStyle}>My Account</h3>
                  </div>
                  <ul className="account-menu" style={sidebarMenuStyle}>
                    <li style={sidebarItemStyle}>
                      <button
                        className="fs-4"
                        onClick={() => {
                          setActiveView("profile");
                          setProfileDropdownOpen(!profileDropdownOpen);
                        }}
                        style={
                          activeView === "profile"
                            ? activeSidebarButtonStyle
                            : sidebarButtonStyle
                        }
                      >
                        <i
                          className="bi bi-person fs-4"
                          style={sidebarIconStyle}
                        ></i>
                        My Profile
                        <i
                          className={`fs-4 bi bi-chevron-${
                            profileDropdownOpen ? "up" : "down"
                          }`}
                          style={{ marginLeft: "auto" }}
                        ></i>
                      </button>

                      {profileDropdownOpen && (
                        <div style={{ paddingLeft: "30px" }}>
                          <button
                            className="fs-5"
                            onClick={() => {
                              setActiveProfileSection("personalDetails");
                              setProfileDropdownOpen(false);
                            }}
                            style={
                              activeProfileSection === "personalDetails"
                                ? activeDropdownButtonStyle
                                : dropdownButtonStyle
                            }
                          >
                            <i
                              className=" fs-5 bi bi-person-lines-fill"
                              style={sidebarIconStyle}
                            ></i>
                            Personal Details
                          </button>
                          <button
                            className="fs-5"
                            onClick={() => {
                              setActiveProfileSection("changePassword");
                              setProfileDropdownOpen(false);
                            }}
                            style={
                              activeProfileSection === "changePassword"
                                ? activeDropdownButtonStyle
                                : dropdownButtonStyle
                            }
                          >
                            <i
                              className="fs-5 bi bi-shield-lock"
                              style={sidebarIconStyle}
                            ></i>
                            Change Password
                          </button>
                          <button
                            className="fs-5"
                            onClick={() => {
                              setActiveProfileSection("registerPage");
                              setProfileDropdownOpen(false);
                            }}
                            style={
                              activeProfileSection === "registerPage"
                                ? activeDropdownButtonStyle
                                : dropdownButtonStyle
                            }
                          >
                            <i
                              className="fs-5 bi bi-house-door"
                              style={sidebarIconStyle}
                            ></i>
                            Register Address
                          </button>
                        </div>
                      )}
                    </li>
                    
                    <li
                      style={sidebarItemStyle}
                      className={activeView === "orders" ? "active" : ""}
                    >
                      <button
                        className="fs-4"
                        onClick={() => setActiveView("orders")}
                        style={
                          activeView === "orders"
                            ? activeSidebarButtonStyle
                            : sidebarButtonStyle
                        }
                      >
                        <i
                          className="bi bi-bag fs-4"
                          style={sidebarIconStyle}
                        ></i>
                        My Orders
                      </button>
                    </li>
                    <li style={sidebarItemStyle}>
                      <div style={{ padding: "12px 15px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "5px",
                          }}
                        >
                          <i
                            className="fs-4 bi bi-person-plus"
                            style={sidebarIconStyle}
                          ></i>
                          <span className="fs-4">Referral ID</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <input
                            type="text"
                            value={customer.referralId}
                            readOnly
                            style={{
                              flex: 1,
                              padding: "8px",
                              border: "1px solid #ddd",
                              borderRadius: "4px",
                              marginRight: "8px",
                              backgroundColor: "#f8f9fa",
                            }}
                          />
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(
                                customer.referralId
                              );
                              setSuccess("Referral ID copied to clipboard!");
                              if (successTimeout) {
                                clearTimeout(successTimeout);
                              }
                              setSuccessTimeout(
                                setTimeout(() => setSuccess(""), 3000)
                              );
                            }}
                            style={{
                              padding: "8px 12px",
                              backgroundColor: "#3f51b5",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <i
                              className="bi bi-clipboard"
                              style={{ marginRight: "5px" }}
                            ></i>
                            Copy
                          </button>
                        </div>
                      </div>
                    </li>
                    <li style={sidebarItemStyle}>
                      <button
                        className="fs-4"
                        onClick={() => {
                          localStorage.removeItem("customerinfo");
                          navigate("/login-register");
                        }}
                        style={sidebarButtonStyle}
                      >
                        <i
                          className="bi bi-box-arrow-right fs-4"
                          style={sidebarIconStyle}
                        ></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-9 col-md-8">
                <div
                  className="myaccount-content"
                  style={contentContainerStyle}
                >
                  {error && <div className="alert alert-danger">{error}</div>}
                  {success && (
                    <div className="alert alert-success">{success}</div>
                  )}

                  {activeView === "profile"
                    ? renderProfileView()
                    : renderOrdersView()}
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

const sidebarContainerStyle = {
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  padding: "20px",
  height: "auto",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",

};

const sidebarHeaderStyle = {
  fontSize: "1.5rem",
  fontWeight: "600",
  marginBottom: "20px",
  color: "#333",
  paddingBottom: "10px",
  borderBottom: "1px solid #eee",
};

const sidebarMenuStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
};

const sidebarItemStyle = {
  marginBottom: "10px",
};

const sidebarButtonStyle = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: "12px 15px",
  backgroundColor: "transparent",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "1rem",
  color: "#333",
  transition: "all 0.3s ease",
  textAlign: "left",
};

const activeSidebarButtonStyle = {
  ...sidebarButtonStyle,
  backgroundColor: "#3f51b5",
  color: "white",
};

const dropdownButtonStyle = {
  ...sidebarButtonStyle,
  padding: "8px 15px",
  fontSize: "0.9rem",
  width: "100%",
  justifyContent: "flex-start",
};

const activeDropdownButtonStyle = {
  ...dropdownButtonStyle,
  backgroundColor: "#e9ecef",
};

const sidebarIconStyle = {
  marginRight: "10px",
  fontSize: "1.2rem",
};

const contentContainerStyle = {
  backgroundColor: "#F8F9FA",
  borderRadius: "8px",
  padding: "30px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  minHeight: "400px",
};


export default MyAccount;
