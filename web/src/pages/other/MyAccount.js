// import { Fragment, useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap/Tabs";
// import { Container, Badge } from "react-bootstrap";
// import SEO from "../../components/seo";
// import LayoutOne from "../../layouts/LayoutOne";
// import axios from "axios";
// import { BASE_URL } from "../../config";
// import "bootstrap-icons/font/bootstrap-icons.css";

// const MyAccount = () => {
//   const [customer, setCustomer] = useState({
//     FNAME: "",
//     LNAME: "",
//     email: "",
//     MOBILE: "",
//     CADDRESSLINE1: "",
//     CCITY: "",
//     CSTATE: "",
//     CCOUNTRY: "",
//     CDISTRICT: "",
//     CPINCODE: "",
//     password: "",
//     newPassword: "",
//     confirmPassword: "",
//     referralId: "",
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [activeTab, setActiveTab] = useState("all_orders");
//   const [orders, setOrders] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [activeView, setActiveView] = useState("profile");
//   const [successTimeout, setSuccessTimeout] = useState(null);
//   const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
//   const [activeProfileSection, setActiveProfileSection] =
//     useState("personalDetails");
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
//   const [oldPassword, setoldPassword] = useState(false);
//   const [walletBalance, setWalletBalance] = useState(0);
//   const [walletTransactions, setWalletTransactions] = useState([]);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const customerinfo = JSON.parse(localStorage.getItem("customerinfo"));
//   const customerId = customerinfo?.id;
// const [isSubmitting, setIsSubmitting] = useState(false);
//   if (!customerId) {
//     navigate("/login-register");
//   }

//   useEffect(() => {
//     return () => {
//       if (successTimeout) {
//         clearTimeout(successTimeout);
//       }
//     };
//   }, [successTimeout]);

//   useEffect(() => {
//     const fetchCustomerData = async () => {
//       try {
//         const response = await axios.get(
//           `${BASE_URL}/getcustomerbyid/${customerId}`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         const data = response.data;
//         setCustomer({
//           FNAME: data.FNAME || "",
//           LNAME: data.LNAME || "",
//           email: data.email || "",
//           MOBILE: data.MOBILE || "",
//           CADDRESSLINE1: data.CADDRESSLINE1 || "",
//           CCITY: data.CCITY || "",
//           CSTATE: data.CSTATE || "",
//           CCOUNTRY: data.CCOUNTRY || "",
//           CDISTRICT: data.CDISTRICT || "",
//           CPINCODE: data.CPINCODE || "",
//           password: data.password || "",
//           newPassword: "",
//           confirmPassword: "",
//           referralId: data.referralId || "REF" + customerId,
//         });
//       } catch (error) {
//         console.error("Failed to fetch customer data:", error);
//       }
//     };

//     const fetchOrders = async () => {
//       try {
//         setIsLoading(true);
//         const response = await axios.get(
//           `${BASE_URL}/getallorders/${customerId}`
//         );
//         if (response.data?.orders) {
//           setOrders(response.data.orders);
//         }
//       } catch (error) {
//         console.error("Failed to fetch orders:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     const fetchWalletData = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/wallet/${customerId}`);
//         setWalletBalance(response.data.balance);
//         setWalletTransactions(response.data.transactions || []);
//       } catch (error) {
//         console.error("Failed to fetch wallet data:", error);
//       }
//     };

//     fetchCustomerData();
//     fetchOrders();
//     fetchWalletData();
//   }, [customerId]);

//   const cancelOrder = async (saleId) => {
//     const confirmCancel = window.confirm(
//       "Do you really want to cancel this order?"
//     );
//     if (!confirmCancel) return;

//     try {
//       await axios.put(`${BASE_URL}/cancelorder/${saleId}`);
//       alert("Order cancelled successfully!");

//       const customerData = JSON.parse(localStorage.getItem("customerinfo"));
//       const response = await axios.get(
//         `${BASE_URL}/getallorders/${customerData.id}`
//       );
//       setOrders(response.data.orders);
//     } catch (err) {
//       console.error("Cancel failed:", err);
//       alert("Failed to cancel the order. Please try again later.");
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCustomer((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setSuccess("");

// //     if (
// //       customer.newPassword &&
// //       customer.newPassword !== customer.confirmPassword
// //     ) {
// //       setError("Passwords don't match");
// //       return;
// //     }

// //     try {
// //       const updateData = {
// //         FNAME: customer.FNAME,
// //         LNAME: customer.LNAME,
// //         email: customer.email,
// //         MOBILE: customer.MOBILE,
// //         CADDRESSLINE1: customer.CADDRESSLINE1,
// //         CCITY: customer.CCITY,
// //         CSTATE: customer.CSTATE,
// //         CCOUNTRY: customer.CCOUNTRY,
// //         CDISTRICT: customer.CDISTRICT,
// //         CPINCODE: customer.CPINCODE,
// //         customerId,
// //           password: customer.password, // Include current password
// //       };
// //  // Only include new password if it's provided
// //     if (customer.newPassword) {
// //       updateData.newPassword = customer.newPassword;
// //     }

// //       const response = await axios.put(
// //         `${BASE_URL}/updateCustomerInfo`,
// //         updateData,
// //         {
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       const data = response.data;
// //       if (response.status === 200) {
// //         setCustomer((prev) => ({
// //           ...prev,
// //           newPassword: "",
// //           confirmPassword: "",
// //         }));
// //         setSuccess(data.message);
// //       } else {
// //         setError(data.message);
// //       }
// //     } catch (error) {
// //       console.error(error.response?.data?.message || "Update failed");
// //       setError(error.response?.data?.message);
// //     }
// //   };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError("");
//   setSuccess("");

//   // Password validation
//   if (customer.newPassword && customer.newPassword !== customer.confirmPassword) {
//     setError("Passwords don't match");
//     return;
//   }

//   try {
//     const updateData = {
//       FNAME: customer.FNAME,
//       LNAME: customer.LNAME,
//       email: customer.email,
//       MOBILE: customer.MOBILE,
//       CADDRESSLINE1: customer.CADDRESSLINE1,
//       CCITY: customer.CCITY,
//       CSTATE: customer.CSTATE,
//       CCOUNTRY: customer.CCOUNTRY,
//       CDISTRICT: customer.CDISTRICT,
//       CPINCODE: customer.CPINCODE,
//       customerId,
//       password: customer.password, // Include current password
//     };

//     // Only include new password if it's provided
//     if (customer.newPassword) {
//       updateData.newPassword = customer.newPassword;
//     }

//     console.log("Sending update data:", updateData); // Debug log

//     const response = await axios.put(
//       `${BASE_URL}/updateCustomerInfo`,
//       updateData,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
  

//     if (response.status === 200) {
//       setSuccess(response.data.message || "Profile updated successfully");
//       // Reset password fields only if they were updated
//       if (customer.newPassword) {
//         setCustomer(prev => ({
//           ...prev,
//           newPassword: "",
//           confirmPassword: "",
//         }));
//       }
//     } else {
//       setError(response.data.message || "Update failed");
//     }
//   } catch (error) {
//     console.error("Update error:", error);
//     setError(
//       error.response?.data?.message || 
//       error.message || 
//       "Failed to update profile"
//     );
//   }
// };
//   const cancelledOrders = orders.filter(
//     (order) => order.ORDER_STATUS === "Cancel"
//   );
//   const deliveredOrders = orders.filter(
//     (order) => order.ORDER_STATUS === "Delivered"
//   );
//   const openOrders = orders.filter((order) =>
//     ["Placed", "Progress", "Dispatched"].includes(order.ORDER_STATUS)
//   );

//   const getStatusBadge = (status) => {
//     const variantMap = {
//       Placed: "primary",
//       Progress: "info",
//       Dispatched: "warning",
//       Delivered: "success",
//       Cancel: "danger",
//     };
//     return (
//       <Badge pill bg={variantMap[status]} className="status-badge">
//         {status}
//       </Badge>
//     );
//   };

//   const renderOrderCard = (order) => {
//     let totalAmount = 0;
//     return (
//       <div
//         key={order.SALEID}
//         className="order-card mb-4 p-5 rounded shadow-sm bg-white border"
//       >
//         {/* Header */}
//         <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-3">
//           <h5 className="order-number mb-2 mb-md-0 fs-3">
//             Order {order.SALEID}
//           </h5>
//           <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-center gap-2">
//             <span className="text-muted small">
//               Status: {getStatusBadge(order.ORDER_STATUS)}
//             </span>
//           </div>
//         </div>

//         {/* Payment Info */}
//         <div className="mb-3">
//           <span className="text-muted small">
//             <i className="bi bi-calendar"></i>{" "}
//             {new Date(order.CREATEDON).toLocaleDateString()}
//           </span>
//           <div className="small text-muted">
//             <strong>Payment Method:</strong> {order.PAYMENTMETHOD}
//           </div>
//           <div className="small text-muted">
//             <strong>Payment Status:</strong> {order.PAYMENTSTATUS}
//           </div>
//         </div>

//         {/* Items */}
//         {order.ITEMS?.map((item, index) => {
//           const quantity = parseFloat(item.QUANTITY || 0);
//           const amount = parseFloat(item.AMOUNT || 0);
//           const lineTotal = amount * quantity;
//           totalAmount += lineTotal;
//           const imageArray = item.PHOTO?.split(",") || [];
//           const firstImage = imageArray[0];

//           return (
//             <div
//               className="row border-top w-full pt-3 mb-3 align-items-center"
//               key={index}
//             >
//               {/* Image */}
//               <div className="col-4 col-md-2 mb-2 mb-md-0">
//                 {item.PHOTO && (
//                   <img
//                     src={process.env.REACT_APP_PUBLIC_URL + firstImage}
//                     alt={item.ITEMNAME}
//                     className="img-fluid"
//                     style={{
//                       maxHeight: "120px",
//                       objectFit: "contain",
//                       borderRadius: "4px",
//                     }}
//                   />
//                 )}
//               </div>

//               {/* Details */}
//               <div className="col-8 col-md-10 pt-4">
//                 <h6 className="mb-1 fw-bold text-xl md:text-2xl">
//                   {item.ITEMNAME || "Unnamed Product"}
//                 </h6>

//                 {item.DESCRIPTION && (
//                   <p className="text-muted mb-1 small">{item.DESCRIPTION}</p>
//                 )}
//                 <div className="d-flex flex-wrap gap-3 small">
//                   <span>
//                     <strong>Qty:</strong> {quantity}
//                   </span>
//                   <span>
//                     <strong>Amount:</strong> ₹{amount.toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           );
//         })}

//         {/* Total + Cancel */}
//         <div className="d-flex justify-content-between align-items-center border-top pt-3">
//           <strong>Total: ₹{totalAmount.toFixed(2)}</strong>
//           {["Placed", "Progress"].includes(order.ORDER_STATUS) && (
//             <button
//               className="py-1"
//               onClick={() => cancelOrder(order.SALEID)}
//               style={{
//                 border: "none",
//                 marginTop: "5px",
//                 fontSize: "10px",
//                 backgroundColor: "#DC3545",
//                 borderRadius: "5px",
//                 color: "#fff",
//                 fontWeight: "boLD",
//               }}
//             >
//               Cancel Order
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const renderPersonalDetails = () => (
//     <div className="row">
//       <div className="col-md-6 mb-4">
//         <label className="d-block mb-2">First Name</label>
//         <input
//           type="text"
//           name="FNAME"
//           value={customer.FNAME}
//           onChange={handleInputChange}
//           className="w-100 p-4 ms-0"
//           style={inputStyle}
//         />
//       </div>

//       <div className="col-md-6 mb-4">
//         <label className="d-block mb-2">Last Name</label>
//         <input
//           type="text"
//           name="LNAME"
//           value={customer.LNAME}
//           onChange={handleInputChange}
//           className="w-100 p-4 ms-0"
//           style={inputStyle}
//         />
//       </div>

//       <div className="col-md-6 mb-4">
//         <label className="d-block mb-2">Email</label>
//         <input
//           type="email"
//           name="email"
//           value={customer.email}
//           disabled
//           className="w-100 p-4 ms-0"
//           style={{ ...inputStyle, color: "#777" }}
//         />
//       </div>

//       <div className="col-md-6 mb-4">
//         <label className="d-block mb-2">Phone</label>
//         <input
//           type="text"
//           name="MOBILE"
//           value={customer.MOBILE}
//           onChange={handleInputChange}
//           className="w-100 p-4 ms-0"
//           style={inputStyle}
//         />
//       </div>
//       {/* 
//       <div className="col-md-6 mb-4">
//         <label className="d-block mb-2">Address</label>
//         <input
//           type="text"
//           name="CADDRESSLINE1"
//           value={customer.CADDRESSLINE1}
//           onChange={handleInputChange}
//           className="w-100 p-2"
//           style={inputStyle}
//         />
//       </div> */}

//       {/* <div className="col-md-6 mb-4">
//         <label className="d-block mb-2">City</label>
//         <input
//           type="text"
//           name="CCITY"
//           value={customer.CCITY}
//           onChange={handleInputChange}
//           className="w-100 p-2"
//           style={inputStyle}
//         />
//       </div> */}
//       {/* 
//       <div className="col-md-6 mb-4">
//         <label className="d-block mb-2">State</label>
//         <input
//           type="text"
//           name="CSTATE"
//           value={customer.CSTATE}
//           onChange={handleInputChange}
//           className="w-100 p-2"
//           style={inputStyle}
//         />
//       </div> */}

//       {/* <div className="col-md-6 mb-4">
//         <label className="d-block mb-2">Country</label>
//         <input
//           type="text"
//           name="CCOUNTRY"
//           value={customer.CCOUNTRY}
//           onChange={handleInputChange}
//           className="w-100 p-2"
//           style={inputStyle}
//         />
//       </div> */}

//       {/* <div className="col-md-6 mb-4">
//         <label className="d-block mb-2">Postal Code</label>
//         <input
//           type="text"
//           name="CPINCODE"
//           value={customer.CPINCODE}
//           onChange={handleInputChange}
//           className="w-100 p-2"
//           style={inputStyle}
//         />
//       </div> */}
//     </div>
//   );

//   const renderChangePassword = () => (
//     <div className="row">
//       {/* Old Password */}
//       <div className="col-md-6 mb-4" style={{ position: "relative" }}>
//         <label className="d-block mb-2">Old Password</label>
//       <input
//     type={oldPassword ? "text" : "password"}
//     name="password"
//     value={customer.password}
//     onChange={handleInputChange}
//     className="w-full p-2 pr-10 border border-gray-300 rounded"
//     readOnly
//   />
//         <i
//           className={`bi ${oldPassword ? "bi-eye-slash" : "bi-eye"}`}
//           onClick={() => setoldPassword(!oldPassword)}
//           style={{
//             position: "absolute",
//             top: "70%",
//             right: "12px",
//             transform: "translateY(-50%)",
//             cursor: "pointer",
//             fontSize: "1.5rem",
//             color: "#777",
//             paddingRight: "10px",
//           }}
//         ></i>
//       </div>

//       {/* New Password */}
//       <div className="col-md-6 mb-4" style={{ position: "relative" }}>
//         <label className="d-block mb-2">New Password</label>
//         <input
//           type={showPassword ? "text" : "password"}
//           name="newPassword"
//           placeholder="New Password"
//           value={customer.newPassword}
//           onChange={handleInputChange}
//           className="w-full p-2 pr-10 border border-gray-300 rounded"
//           autoComplete="off"
//         />
//         <i
//           className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
//           onClick={() => setShowPassword(!showPassword)}
//           style={{
//             position: "absolute",
//             top: "70%",
//             right: "12px",
//             transform: "translateY(-50%)",
//             cursor: "pointer",
//             fontSize: "1.5rem",
//             color: "#777",
//             paddingRight: "10px",
//           }}
//         ></i>
//       </div>

//       {/* Confirm Password */}
//       <div className="col-md-6 mb-4" style={{ position: "relative" }}>
//         <label className="d-block mb-2">Confirm Password</label>
//         <input
//           type={showConfirmPassword ? "text" : "password"}
//           name="confirmPassword"
//           placeholder="Confirm Password"
//           value={customer.confirmPassword}
//           onChange={handleInputChange}
//           className="w-full p-2 pr-10 border border-gray-300 rounded"
//         />
//         <i
//           className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}
//           onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//           style={{
//             position: "absolute",
//             top: "70%",
//             right: "12px",
//             transform: "translateY(-50%)",
//             cursor: "pointer",
//             fontSize: "1.5rem",
//             color: "#777",
//             paddingRight: "10px",
//           }}
//         ></i>
//       </div>
//     </div>
//   );

//   const renderRegisterPage = () => (
//     <div>
//       <p>Email: {customer.email}</p>
//       <p>Referral ID: {customer.referralId}</p>
//     </div>
//   );

//   const renderAccountDetails = () => (
//     <div>
//       <h4 style={{ fontWeight: "500", marginBottom: "20px" }}>
//         Account Details
//       </h4>
//       <div className="row">
//         <div className="col-md-6 mb-4">
//           <div style={accountDetailCardStyle}>
//             <h5 className="fs-3">Wallet Balance</h5>
//             <p className="fs-4" style={accountDetailAmountStyle}>
//               ₹0.00
//             </p>
//           </div>
//         </div>
//         <div className="col-md-6 mb-4">
//           <div style={accountDetailCardStyle}>
//             <h5 className="fs-3">Reward Points</h5>
//             <p className="fs-4" style={accountDetailAmountStyle}>
//               0 Points
//             </p>
//           </div>
//         </div>
//         <div className="col-md-6 mb-4">
//           <div style={accountDetailCardStyle}>
//             <h5 className="fs-3">Total Orders</h5>
//             <p className="fs-4" style={accountDetailAmountStyle}>
//               {orders.length}
//             </p>
//           </div>
//         </div>
//         <div className="col-md-6 mb-4">
//           <div style={accountDetailCardStyle}>
//             <h5 className="fs-3">Member Since</h5>
//             <p className="fs-4" style={accountDetailAmountStyle}>
//               {new Date().toLocaleDateString()}
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="mt-4">
//         <h5 style={{ fontWeight: "500", marginBottom: "15px" }}>
//           Recent Transactions
//         </h5>
//         <div
//           style={{
//             backgroundColor: "white",
//             borderRadius: "8px",
//             padding: "20px",
//           }}
//         >
//           <p className="text-muted">No recent transactions</p>
//         </div>
//       </div>
//     </div>
//   );

//   const renderWalletView = () => (
//     <div
//       className="wallet-container"
//       style={{ padding: "1rem", maxWidth: "100%", overflowX: "hidden" }}
//     >
//       {/* Wallet Header */}
//       <div className="wallet-header" style={{ marginBottom: "1.5rem" }}>
//         <h2
//           className="wallet-title"
//           style={{
//             fontSize: "clamp(1.5rem, 4vw, 2rem)",
//             marginBottom: "0.5rem",
//             fontWeight: "600",
//           }}
//         >
//           My Wallet
//         </h2>
//         <p
//           className="wallet-subtitle"
//           style={{
//             fontSize: "clamp(15px, 2vw, 1rem)",
//             color: "#666",
//             margin: 0,
//           }}
//         >
//           Manage your wallet balance and transactions
//         </p>
//       </div>

//       {/* Wallet Balance Card */}
//       <div
//         className="wallet-balance-card"
//         style={{
//           ...walletBalanceCardStyle,
//           padding: "1.5rem",
//           marginBottom: "2rem",
//           borderRadius: "12px",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//           display: "flex",
//           flexDirection: window.innerWidth < 768 ? "column" : "row",
//           justifyContent: "space-between",
//           alignItems: window.innerWidth < 768 ? "flex-start" : "center",
//           gap: "1rem",
//         }}
//       >
//         <div className="wallet-balance-info">
//           <h3
//             className="wallet-balance-title"
//             style={{
//               fontSize: "2rem",
//               color: "#fff",
//               marginBottom: "0.5rem",
//             }}
//           >
//             Current Balance
//           </h3>
//           <p
//             className="wallet-balance-amount"
//             style={{
//               ...walletBalanceAmountStyle,
//               fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
//               margin: 0,
//             }}
//           >
//             ₹{walletBalance.toFixed(2)}
//           </p>
//         </div>
//         <div
//           className="wallet-actions"
//           style={{
//             display: "flex",
//             flexDirection: window.innerWidth < 400 ? "column" : "row",
//             gap: "0.75rem",
//             width: window.innerWidth < 768 ? "100%" : "auto",
//           }}
//         >
//           <button
//             style={{
//               ...walletActionButtonStyle,
//               padding: "0.75rem 1.25rem",
//               fontSize: "0.9rem",
//               width: window.innerWidth < 768 ? "100%" : "auto",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: "0.5rem",
//             }}
//           >
//             <i className="bi bi-plus-circle"></i>
//             <span>Add Money</span>
//           </button>
//           <button
//             style={{
//               ...walletActionButtonStyle,
//               padding: "0.75rem 1.25rem",
//               fontSize: "0.9rem",
//               width: window.innerWidth < 768 ? "100%" : "auto",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: "0.5rem",
//             }}
//           >
//             <i className="bi bi-arrow-up-circle"></i>
//             <span>Withdraw</span>
//           </button>
//         </div>
//       </div>

//       {/* Transactions Section */}
//       <div className="wallet-transactions">
//         <h3
//           className="wallet-transactions-title"
//           style={{
//             fontSize: "1.5rem",
//             marginBottom: "1rem",
//             fontWeight: "600",
//           }}
//         >
//           Recent Transactions
//         </h3>

//         {walletTransactions.length > 0 ? (
//           <>
//             {/* Desktop Table View */}
//             <div className="d-none d-md-block">
//               <div className="table-responsive">
//                 <table
//                   className="table wallet-transactions-table"
//                   style={{
//                     width: "100%",
//                     borderCollapse: "collapse",
//                     borderRadius: "8px",
//                     overflow: "hidden",
//                     boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
//                   }}
//                 >
//                   <thead>
//                     <tr style={{ backgroundColor: "#f8f9fa" }}>
//                       <th
//                         style={{
//                           ...walletTableHeaderStyle,
//                           padding: "12px 16px",
//                           textAlign: "left",
//                           fontWeight: "500",
//                         }}
//                       >
//                         Date
//                       </th>
//                       <th
//                         style={{
//                           ...walletTableHeaderStyle,
//                           padding: "12px 16px",
//                           textAlign: "left",
//                           fontWeight: "500",
//                         }}
//                       >
//                         Description
//                       </th>
//                       <th
//                         style={{
//                           ...walletTableHeaderStyle,
//                           padding: "12px 16px",
//                           textAlign: "right",
//                           fontWeight: "500",
//                         }}
//                       >
//                         Amount
//                       </th>
//                       <th
//                         style={{
//                           ...walletTableHeaderStyle,
//                           padding: "12px 16px",
//                           textAlign: "center",
//                           fontWeight: "500",
//                         }}
//                       >
//                         Status
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {walletTransactions.map((transaction, index) => (
//                       <tr
//                         key={index}
//                         style={{
//                           ...walletTableRowStyle,
//                           borderBottom: "1px solid #eee",
//                           "&:last-child": { borderBottom: "none" },
//                         }}
//                       >
//                         <td
//                           style={{
//                             ...walletTableCellStyle,
//                             padding: "12px 16px",
//                             whiteSpace: "nowrap",
//                           }}
//                         >
//                           {new Date(transaction.date).toLocaleDateString()}
//                         </td>
//                         <td
//                           style={{
//                             ...walletTableCellStyle,
//                             padding: "12px 16px",
//                             maxWidth: "200px",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis",
//                           }}
//                         >
//                           {transaction.description}
//                         </td>
//                         <td
//                           style={{
//                             ...walletTableCellStyle,
//                             padding: "12px 16px",
//                             textAlign: "right",
//                             fontWeight: "500",
//                             color:
//                               transaction.type === "credit"
//                                 ? "#4CAF50"
//                                 : "#F44336",
//                           }}
//                         >
//                           {transaction.type === "credit" ? "+" : "-"}₹
//                           {transaction.amount.toFixed(2)}
//                         </td>
//                         <td
//                           style={{
//                             ...walletTableCellStyle,
//                             padding: "12px 16px",
//                             textAlign: "center",
//                           }}
//                         >
//                           <span
//                             style={{
//                               backgroundColor:
//                                 transaction.status === "completed"
//                                   ? "#E8F5E9"
//                                   : "#FFF8E1",
//                               color:
//                                 transaction.status === "completed"
//                                   ? "#2E7D32"
//                                   : "#FF8F00",
//                               padding: "4px 12px",
//                               borderRadius: "12px",
//                               fontSize: "0.8rem",
//                               display: "inline-block",
//                               minWidth: "80px",
//                             }}
//                           >
//                             {transaction.status}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Mobile Cards View */}
//             <div className="d-md-none">
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: "0.75rem",
//                 }}
//               >
//                 {walletTransactions.map((transaction, index) => (
//                   <div
//                     key={index}
//                     style={{
//                       backgroundColor: "#fff",
//                       borderRadius: "8px",
//                       padding: "1rem",
//                       boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
//                       display: "grid",
//                       gridTemplateColumns: "1fr 1fr",
//                       gridTemplateRows: "auto auto",
//                       gap: "0.5rem",
//                     }}
//                   >
//                     <div style={{ gridColumn: "1 / span 2" }}>
//                       <p
//                         style={{
//                           margin: 0,
//                           fontWeight: "500",
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                           whiteSpace: "nowrap",
//                         }}
//                       >
//                         {transaction.description}
//                       </p>
//                       <p
//                         style={{
//                           margin: "0.25rem 0 0",
//                           fontSize: "0.8rem",
//                           color: "#666",
//                         }}
//                       >
//                         {new Date(transaction.date).toLocaleDateString()}
//                       </p>
//                     </div>

//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "flex-start",
//                       }}
//                     >
//                       <span
//                         style={{
//                           backgroundColor:
//                             transaction.status === "completed"
//                               ? "#E8F5E9"
//                               : "#FFF8E1",
//                           color:
//                             transaction.status === "completed"
//                               ? "#2E7D32"
//                               : "#FF8F00",
//                           padding: "4px 12px",
//                           borderRadius: "12px",
//                           fontSize: "0.8rem",
//                         }}
//                       >
//                         {transaction.status}
//                       </span>
//                     </div>

//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "flex-end",
//                       }}
//                     >
//                       <span
//                         style={{
//                           fontWeight: "500",
//                           color:
//                             transaction.type === "credit"
//                               ? "#4CAF50"
//                               : "#F44336",
//                         }}
//                       >
//                         {transaction.type === "credit" ? "+" : "-"}₹
//                         {transaction.amount.toFixed(2)}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </>
//         ) : (
//           <div
//             style={{
//               ...noTransactionsStyle,
//               textAlign: "center",
//               padding: "2rem",
//               backgroundColor: "#fafafa",
//               borderRadius: "8px",
//             }}
//           >
//             <i
//               className="bi bi-wallet2"
//               style={{
//                 fontSize: "3rem",
//                 color: "#e0e0e0",
//                 marginBottom: "1rem",
//               }}
//             ></i>
//             <p
//               style={{
//                 margin: 0,
//                 color: "#757575",
//                 fontSize: "1rem",
//               }}
//             >
//               No transactions found
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   const renderProfileView = () => (
//     <form onSubmit={handleSubmit}>
//       <div
//         className="mb-4"
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <h4 style={{ fontWeight: "500" }}>
//           {activeProfileSection === "personalDetails" && "Personal Details"}
//           {activeProfileSection === "changePassword" && "Change Password"}
//           {activeProfileSection === "registerPage" && "Registration Address"}
//         </h4>
//       </div>

//       {activeProfileSection === "personalDetails" && renderPersonalDetails()}
//       {activeProfileSection === "changePassword" && renderChangePassword()}
//       {activeProfileSection === "registerPage" && renderRegisterPage()}

//       <div className="mt-4">
//         {/* <button type="submit" className="px-3 py-2" style={buttonStyle}>
//           Update
//         </button> */}
//         <button 
//   type="submit" 
//   className="px-3 py-2" 
//   style={buttonStyle}
//   disabled={isSubmitting}
// >
//   {isSubmitting ? (
//     <>
//       <span className="spinner-border spinner-border-sm" role="status"></span>
//       Updating...
//     </>
//   ) : (
//     "Update"
//   )}
// </button>
//       </div>
//     </form>
//   );

//   const renderOrdersView = () => (
//     <div className="container-fluid orders-container py-4">
//         <div className="page-header text-center mb-4">
//           <h1 className="page-title">My Orders</h1>
//           <p className="page-subtitle text-muted">
//             View and manage your order history
//           </p>
//         </div>

//         <Tabs
//           activeKey={activeTab}
//           onSelect={(k) => setActiveTab(k)}
//           className="mb-4 custom-tabs"
//           justify
//         >
//           {/* All Orders */}
//           <Tab eventKey="all_orders" title="All Orders">
//             <div className="orders-section">
//               {isLoading ? (
//                 <div className="text-center py-5">
//                   <div className="spinner-border text-primary" role="status" />
//                   <p className="text-muted mt-2">Loading your orders...</p>
//                 </div>
//               ) : orders.length === 0 ? (
//                 <div className="text-center py-5">
//                   <i className="bi bi-box-seam fs-1 text-muted" />
//                   <h5 className="mt-2">No orders found</h5>
//                   <p className="text-muted">
//                     You haven't placed any orders yet.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="orders-list">{orders.map(renderOrderCard)}</div>
//               )}
//             </div>
//           </Tab>

//           {/* Delivered Orders */}
//           <Tab eventKey="delivered" title="Delivered">
//             <div className="orders-section">
//               {isLoading ? (
//                 <div className="text-center py-5">
//                   <div className="spinner-border text-primary" role="status" />
//                   <p className="text-muted mt-2">Loading delivered orders...</p>
//                 </div>
//               ) : deliveredOrders.length === 0 ? (
//                 <div className="text-center py-5">
//                   <i className="bi bi-truck fs-1 text-muted" />
//                   <h5 className="mt-2">No delivered orders</h5>
//                   <p className="text-muted">
//                     Your completed orders will appear here.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="orders-list">
//                   {deliveredOrders.map(renderOrderCard)}
//                 </div>
//               )}
//             </div>
//           </Tab>

//           {/* Cancelled Orders */}
//           <Tab eventKey="cancelled" title="Cancelled">
//             <div className="orders-section">
//               {isLoading ? (
//                 <div className="text-center py-5">
//                   <div className="spinner-border text-primary" role="status" />
//                   <p className="text-muted mt-2">Loading cancelled orders...</p>
//                 </div>
//               ) : cancelledOrders.length === 0 ? (
//                 <div className="text-center py-5">
//                   <i className="bi bi-x-circle fs-1 text-muted" />
//                   <h5 className="mt-2">No cancelled orders</h5>
//                   <p className="text-muted">
//                     You haven't cancelled any orders.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="orders-list">
//                   {cancelledOrders.map(renderOrderCard)}
//                 </div>
//               )}
//             </div>
//           </Tab>
//         </Tabs>
//       </div>
//   );

//   const LogoutConfirmation = () => (
//     <div style={logoutModalStyle}>
//       <div style={logoutModalContentStyle}>
//         <h4>Are you sure you want to logout?</h4>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             gap: "20px",
//             marginTop: "20px",
//           }}
//         >
//           <button
//             onClick={() => {
//               localStorage.removeItem("customerinfo");
//               navigate("/login-register");
//             }}
//             style={confirmButtonStyle}
//           >
//             Yes, Logout
//           </button>
//           <button
//             onClick={() => setShowLogoutConfirm(false)}
//             style={cancelButtonStyle}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <Fragment>
//       <SEO titleTemplate="My Account" description="My Account page" />
//       <LayoutOne headerTop="visible">
//         <div className="myaccount-area" style={{ padding: "1rem 0" }}>
//           <div className="container-fluid">
//             {/* Mobile Menu Toggle Button */}
//             <div className="d-md-none mb-3">
//               <button
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 style={{
//                   backgroundColor: "#3f51b5",
//                   color: "white",
//                   border: "none",
//                   padding: "10px 15px",
//                   borderRadius: "4px",
//                   width: "100%",
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <span>Menu</span>
//                 <i
//                   className={`bi bi-chevron-${
//                     isMobileMenuOpen ? "up" : "down"
//                   }`}
//                 ></i>
//               </button>
//             </div>

//             <div className="row">
//               {/* Sidebar - shown on desktop by default, conditionally shown on mobile */}
//               <div
//                 className={`col-xl-3 col-lg-4 col-md-4 ${
//                   isMobileMenuOpen ? "d-block" : "d-none d-md-block"
//                 }`}
//                 style={{
//                   position: "sticky",
//                   top: "20px",
//                   height: "fit-content",
//                   alignSelf: "flex-start",
//                 }}
//               >
//                 <div className="account-sidebar" style={sidebarContainerStyle}>
//                   <div className="account-sidebar-header">
//                     <h3 style={sidebarHeaderStyle}>My Account</h3>
//                   </div>
//                   <ul className="account-menu" style={sidebarMenuStyle}>
//                     <li style={sidebarItemStyle}>
//                       <button
//                         className="fs-4 w-100 text-start"
//                         onClick={() => {
//                           setActiveView("profile");
//                           setProfileDropdownOpen(!profileDropdownOpen);
//                           setIsMobileMenuOpen(false);
//                         }}
//                         style={{
//                           ...(activeView === "profile"
//                             ? activeSidebarButtonStyle
//                             : sidebarButtonStyle),
//                           display: "flex",
//                           alignItems: "center",
//                         }}
//                       >
//                         <i
//                           className="bi bi-person fs-4"
//                           style={sidebarIconStyle}
//                         ></i>
//                         <span style={{ marginLeft: "10px" }}>My Profile</span>
//                         <i
//                           className={`fs-4 bi bi-chevron-${
//                             profileDropdownOpen ? "up" : "down"
//                           }`}
//                           style={{ marginLeft: "auto" }}
//                         ></i>
//                       </button>

//                       {profileDropdownOpen && (
//                         <div style={{ paddingLeft: "30px" }}>
//                           <button
//                             className="fs-4 w-100 text-start"
//                             onClick={() => {
//                               setActiveProfileSection("personalDetails");
//                               setProfileDropdownOpen(false);
//                               setIsMobileMenuOpen(false);
//                             }}
//                             style={{
//                               ...(activeProfileSection === "personalDetails"
//                                 ? activeDropdownButtonStyle
//                                 : dropdownButtonStyle),
//                               display: "flex",
//                               alignItems: "center",
//                             }}
//                           >
//                             <i
//                               className="fs-4 bi bi-person-lines-fill"
//                               style={sidebarIconStyle}
//                             ></i>
//                             <span style={{ marginLeft: "10px" }}>
//                               Personal Details
//                             </span>
//                           </button>
//                           <button
//                             className="fs-4 w-100 text-start"
//                             onClick={() => {
//                               setActiveProfileSection("changePassword");
//                               setProfileDropdownOpen(false);
//                               setIsMobileMenuOpen(false);
//                             }}
//                             style={{
//                               ...(activeProfileSection === "changePassword"
//                                 ? activeDropdownButtonStyle
//                                 : dropdownButtonStyle),
//                               display: "flex",
//                               alignItems: "center",
//                             }}
//                           >
//                             <i
//                               className="fs-4 bi bi-shield-lock"
//                               style={sidebarIconStyle}
//                             ></i>
//                             <span style={{ marginLeft: "10px" }}>
//                               Change Password
//                             </span>
//                           </button>
//                           <button
//                             className="fs-4 w-100 text-start"
//                             onClick={() => {
//                               setActiveProfileSection("registerPage");
//                               setProfileDropdownOpen(false);
//                               setIsMobileMenuOpen(false);
//                             }}
//                             style={{
//                               ...(activeProfileSection === "registerPage"
//                                 ? activeDropdownButtonStyle
//                                 : dropdownButtonStyle),
//                               display: "flex",
//                               alignItems: "center",
//                             }}
//                           >
//                             <i
//                               className="fs-4 bi bi-house-door"
//                               style={sidebarIconStyle}
//                             ></i>
//                             <span style={{ marginLeft: "10px" }}>
//                               Register Address
//                             </span>
//                           </button>
//                         </div>
//                       )}
//                     </li>
//                     <li style={sidebarItemStyle}>
//                       <button
//                         className="fs-4 w-100 text-start"
//                         onClick={() => {
//                           setActiveView("accountDetails");
//                           setIsMobileMenuOpen(false);
//                         }}
//                         style={{
//                           ...(activeView === "accountDetails"
//                             ? activeSidebarButtonStyle
//                             : sidebarButtonStyle),
//                           display: "flex",
//                           alignItems: "center",
//                         }}
//                       >
//                         <i
//                           className="bi bi-wallet2 fs-4"
//                           style={sidebarIconStyle}
//                         ></i>
//                         <span style={{ marginLeft: "10px" }}>
//                           Account Details
//                         </span>
//                       </button>
//                     </li>
//                     <li style={sidebarItemStyle}>
//                       <button
//                         className="fs-4 w-100 text-start"
//                         onClick={() => {
//                           setActiveView("wallet");
//                           setIsMobileMenuOpen(false);
//                         }}
//                         style={{
//                           ...(activeView === "wallet"
//                             ? activeSidebarButtonStyle
//                             : sidebarButtonStyle),
//                           display: "flex",
//                           alignItems: "center",
//                         }}
//                       >
//                         <i
//                           className="bi bi-credit-card fs-4"
//                           style={sidebarIconStyle}
//                         ></i>
//                         <span style={{ marginLeft: "10px" }}>Wallet</span>
//                       </button>
//                     </li>
//                     <li style={sidebarItemStyle}>
//                       <button
//                         className="fs-4 w-100 text-start"
//                         onClick={() => {
//                           setActiveView("orders");
//                           setIsMobileMenuOpen(false);
//                         }}
//                         style={{
//                           ...(activeView === "orders"
//                             ? activeSidebarButtonStyle
//                             : sidebarButtonStyle),
//                           display: "flex",
//                           alignItems: "center",
//                         }}
//                       >
//                         <i
//                           className="bi bi-bag fs-4"
//                           style={sidebarIconStyle}
//                         ></i>
//                         <span style={{ marginLeft: "10px" }}>My Orders</span>
//                       </button>
//                     </li>
//                     <li style={sidebarItemStyle}>
//                       <div style={{ padding: "12px 15px" }}>
//                         <div
//                           style={{
//                             display: "flex",
//                             alignItems: "center",
//                             marginBottom: "5px",
//                           }}
//                         >
//                           <i
//                             className="fs-4 bi bi-person-plus"
//                             style={sidebarIconStyle}
//                           ></i>
//                           <span style={{ marginLeft: "10px" }}>
//                             Referral ID
//                           </span>
//                         </div>
//                         <input
//                           type="text"
//                           value={customer.referralId}
//                           readOnly
//                           style={{
//                             flex: "1 1 120px",
//                             minWidth: "120px",
//                             padding: "8px",
//                             marginBottom: "10px",
//                             border: "1px solid #ddd",
//                             borderRadius: "4px",
//                             backgroundColor: "#f8f9fa",
//                           }}
//                           className="ms-0 w-full "
//                         />
//                         <div
//                           style={{
//                             display: "flex",
//                             alignItems: "center",
//                             flexWrap: "wrap",
//                             gap: "8px",
//                           }}
//                         >
//                           {/* Copy Button */}
//                           <button
//                             onClick={() => {
//                               navigator.clipboard.writeText(
//                                 customer.referralId
//                               );
//                               setSuccess("Referral ID copied to clipboard!");
//                               if (successTimeout) {
//                                 clearTimeout(successTimeout);
//                               }
//                               setSuccessTimeout(
//                                 setTimeout(() => setSuccess(""), 3000)
//                               );
//                             }}
//                             style={{
//                               padding: "8px 12px",
//                               backgroundColor: "#3f51b5",
//                               color: "white",
//                               border: "none",
//                               borderRadius: "4px",
//                               cursor: "pointer",
//                               display: "flex",
//                               alignItems: "center",
//                               flex: "1 1 auto",
//                               justifyContent: "center",
//                             }}
//                           >
//                             <i
//                               className="bi bi-clipboard"
//                               style={{ marginRight: "5px" }}
//                             ></i>
//                             Copy
//                           </button>

//                           {/* Share Button */}
//                           <button
//                             onClick={() => {
//                               if (navigator.share) {
//                                 navigator
//                                   .share({
//                                     title: "Referral Invitation",
//                                     text: `Join using my referral ID: ${customer.referralId}`,
//                                     url: window.location.href,
//                                   })
//                                   .then(() => {
//                                     setSuccess("Referral shared successfully!");
//                                     if (successTimeout) {
//                                       clearTimeout(successTimeout);
//                                     }
//                                     setSuccessTimeout(
//                                       setTimeout(() => setSuccess(""), 3000)
//                                     );
//                                   })
//                                   .catch((error) =>
//                                     console.log("Share failed:", error)
//                                   );
//                               } else {
//                                 setSuccess(
//                                   "Sharing is not supported on this device."
//                                 );
//                                 if (successTimeout)
//                                   clearTimeout(successTimeout);
//                                 setSuccessTimeout(
//                                   setTimeout(() => setSuccess(""), 3000)
//                                 );
//                               }
//                             }}
//                             style={{
//                               padding: "8px 12px",
//                               backgroundColor: "#28a745",
//                               color: "white",
//                               border: "none",
//                               borderRadius: "4px",
//                               cursor: "pointer",
//                               display: "flex",
//                               alignItems: "center",
//                               flex: "1 1 auto",
//                               justifyContent: "center",
//                             }}
//                           >
//                             <i
//                               className="bi bi-share-fill"
//                               style={{ marginRight: "5px" }}
//                             ></i>
//                             Share
//                           </button>
//                         </div>

//                         {/* Success Message */}
//                         {/* {success && (
//                           <div
//                             style={{
//                               marginTop: "10px",
//                               color: "#28a745",
//                               fontWeight: "bold",
//                             }}
//                           >
//                             {success}
//                           </div>
//                         )} */}
//                       </div>
//                     </li>

//                     <li style={sidebarItemStyle}>
//                       <button
//                         className="fs-4 w-100 text-start"
//                         onClick={() => setShowLogoutConfirm(true)}
//                         style={{
//                           ...sidebarButtonStyle,
//                           display: "flex",
//                           alignItems: "center",
//                         }}
//                       >
//                         <i
//                           className="bi bi-box-arrow-right fs-4"
//                           style={sidebarIconStyle}
//                         ></i>
//                         <span style={{ marginLeft: "10px" }}>Logout</span>
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               </div>

//               {/* Main Content Area */}
//               <div className="col-xl-9 col-lg-8 col-md-8">
//                 <div
//                   className="myaccount-content p-5"
//                   style={{
//                     ...contentContainerStyle,
//                     // Add some bottom margin on mobile
//                   }}
//                 >
//                   {error && <div className="alert alert-danger">{error}</div>}
//                   {success && (
//                     <div className="alert alert-success">{success}</div>
//                   )}

//                   {activeView === "profile"
//                     ? renderProfileView()
//                     : activeView === "orders"
//                     ? renderOrdersView()
//                     : activeView === "wallet"
//                     ? renderWalletView()
//                     : renderAccountDetails()}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {showLogoutConfirm && <LogoutConfirmation />}
//       </LayoutOne>
//     </Fragment>
//   );
// };

// const inputStyle = {
//   background: "transparent",
//   borderBottom: "1px solid #eee",
//   outline: "none",
// };

// const buttonStyle = {
//   backgroundColor: "#3f51b5",
//   color: "white",
//   border: "none",
//   borderRadius: "4px",
//   cursor: "pointer",
// };

// const sidebarContainerStyle = {
//   backgroundColor: "#f8f9fa",
//   borderRadius: "8px",
//   padding: "20px",
//   height: "auto",
//   boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
// };

// const sidebarHeaderStyle = {
//   fontSize: "2rem",
//   fontWeight: "600",
//   marginBottom: "20px",
//   color: "#333",
//   paddingBottom: "10px",
//   borderBottom: "1px solid #eee",
// };

// const sidebarMenuStyle = {
//   listStyle: "none",
//   padding: 0,
//   margin: 0,
// };

// const sidebarItemStyle = {
//   // marginBottom: "10px",
// };

// const sidebarButtonStyle = {
//   display: "flex",
//   alignItems: "center",
//   width: "100%",
//   padding: "12px 15px",
//   backgroundColor: "transparent",
//   border: "none",
//   borderRadius: "4px",
//   cursor: "pointer",
//   fontSize: "1rem",
//   color: "#333",
//   transition: "all 0.3s ease",
//   textAlign: "left",
// };

// const activeSidebarButtonStyle = {
//   ...sidebarButtonStyle,
//   backgroundColor: "#3f51b5",
//   color: "white",
// };

// const dropdownButtonStyle = {
//   ...sidebarButtonStyle,
//   padding: "8px 15px",
//   fontSize: "0.9rem",
//   width: "100%",
//   justifyContent: "flex-start",
// };

// const activeDropdownButtonStyle = {
//   ...dropdownButtonStyle,
//   backgroundColor: "#e9ecef",
// };

// const sidebarIconStyle = {
//   marginRight: "10px",
//   // fontSize: "1.2rem",
// };

// const contentContainerStyle = {
//   backgroundColor: "#F8F9FA",
//   borderRadius: "8px",
//   // padding: "30px",
//   boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//   minHeight: "490px",
// };

// const accountDetailCardStyle = {
//   backgroundColor: "white",
//   borderRadius: "8px",
//   padding: "15px",
//   boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//   height: "100%",
// };

// const accountDetailAmountStyle = {
//   fontWeight: "bold",
//   color: "#3f51b5",
//   marginTop: "5px",
// };

// // Wallet Styles
// const walletBalanceCardStyle = {
//   backgroundColor: "#3f51b5",
//   color: "white",
//   borderRadius: "8px",
//   padding: "20px",
//   marginBottom: "30px",
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
// };

// const walletBalanceAmountStyle = {
//   fontSize: "2rem",
//   fontWeight: "bold",
//   margin: "10px 0 0 0",
// };

// const walletActionButtonStyle = {
//   backgroundColor: "rgba(255,255,255,0.2)",
//   color: "white",
//   border: "none",
//   borderRadius: "4px",
//   padding: "8px 15px",
//   marginLeft: "10px",
//   cursor: "pointer",
//   display: "flex",
//   alignItems: "center",
//   gap: "5px",
//   transition: "all 0.3s ease",
//   ":hover": {
//     backgroundColor: "rgba(255,255,255,0.3)",
//   },
// };

// const walletTableStyle = {
//   width: "100%",
//   borderCollapse: "collapse",
//   marginTop: "20px",
//   backgroundColor: "white",
//   borderRadius: "8px",
//   overflow: "hidden",
//   boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
// };

// const walletTableHeaderStyle = {
//   padding: "12px 15px",
//   textAlign: "left",
//   backgroundColor: "#f5f5f5",
//   fontWeight: "500",
//   color: "#333",
// };

// const walletTableRowStyle = {
//   borderBottom: "1px solid #f0f0f0",
//   ":last-child": {
//     borderBottom: "none",
//   },
// };

// const walletTableCellStyle = {
//   padding: "12px 15px",
//   verticalAlign: "middle",
// };

// const noTransactionsStyle = {
//   backgroundColor: "white",
//   borderRadius: "8px",
//   padding: "40px",
//   textAlign: "center",
//   marginTop: "20px",
//   boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
// };

// const logoutModalStyle = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   backgroundColor: "rgba(0,0,0,0.5)",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   zIndex: 1000,
// };

// const logoutModalContentStyle = {
//   backgroundColor: "white",
//   padding: "30px",
//   borderRadius: "8px",
//   maxWidth: "400px",
//   width: "100%",
//   margin: "15px",
//   textAlign: "center",
//   boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
// };

// const confirmButtonStyle = {
//   padding: "8px 20px",
//   backgroundColor: "#f44336",
//   color: "white",
//   border: "none",
//   borderRadius: "4px",
//   cursor: "pointer",
// };

// const cancelButtonStyle = {
//   padding: "8px 20px",
//   backgroundColor: "#e0e0e0",
//   color: "#333",
//   border: "none",
//   borderRadius: "4px",
//   cursor: "pointer",
// };

// export default MyAccount;

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
   const [editIndex, setEditIndex] = useState(null);
   const [editItem, setEditItem] = useState(null);
  const [activeProfileSection, setActiveProfileSection] =
    useState("personalDetails");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [data, setData] = useState([]);
  const [oldPassword, setoldPassword] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [walletTransactions, setWalletTransactions] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [addForm, setAddForm] = useState({
      fname: "",
      lname: "",
      address: "",
      city: "",
      state: "",
      country: "",
      postal_code: "",
      email: "",
      mobile: "",
      description: "",
      primary_address: 0,
    });
    

  const navigate = useNavigate();
  const location = useLocation();
  const customerinfo = JSON.parse(localStorage.getItem("customerinfo"));
  const customerId = customerinfo?.id;

  if (!customerId) {
    navigate("/login-register");
  }

   useEffect(() => {
      if (customerId) fetchAddresses();
    }, [customerId]);
  
    const handleDelete = async (addressId) => {
        if (!window.confirm("Are you sure you want to delete this address?"))
          return;
    
        try {
          await axios.delete(
            `http://localhost:3000/deletecustomeraddress/${addressId}`
          );
          alert("Address deleted successfully");
          fetchAddresses();
        } catch (err) {
          alert("Failed to delete address");
        }
      };
 const handleEditClick = (item, index) => {
    setEditItem({ ...item });
    setEditIndex(index);
  };
     const handleUpdate = async (e) => {
        e.preventDefault();
        try {
          await axios.put("http://localhost:3000/updatecustomeraddress", {
            ...editItem,
            customer_id: customerId,
            primary_address: editItem.primary_address || 0,
          });
          alert("Address updated successfully");
          setEditItem(null);
          setEditIndex(null);
          fetchAddresses();
        } catch (err) {
          alert("Update failed: " + (err.response?.data?.msg || err.message));
        }
      };

    const fetchAddresses = () => {
      axios
        .get(`http://localhost:3000/getcustomeraddress/${customerId}`)
        .then((res) => setData(res.data))
        .catch((err) => console.error("API Error:", err));
    };
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
 const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/addcustomeraddress", {
        ...addForm,
        customer_id: customerId,
      });
      alert("Address added successfully");
      setAddForm({
        fname: "",
        lname: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postal_code: "",
        email: "",
        mobile: "",
        description: "",
        primary_address: 0,
      });
      setShowAddForm(false);
      fetchAddresses();
    } catch (err) {
      alert("Failed to add address: " + (err.response?.data?.msg || err.message));
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

    const fetchWalletData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/wallet/${customerId}`);
        setWalletBalance(response.data.balance);
        setWalletTransactions(response.data.transactions || []);
      } catch (error) {
        console.error("Failed to fetch wallet data:", error);
      }
    };

    fetchCustomerData();
    fetchOrders();
    fetchWalletData();
  }, [customerId]);

   const handleMakePrimary = async (addressId) => {
      const itemToUpdate = data.find((item) => item.id === addressId);
      if (!itemToUpdate) return alert("Address not found");
  
      try {
        await axios.put("http://localhost:3000/updatecustomeraddress", {
          ...itemToUpdate,
          customer_id: customerId,
          primary_address: 1,
        });
        fetchAddresses();
      } catch (err) {
        alert("Failed to set primary address");
      }
    };
   const handleAddSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post("http://localhost:3000/addcustomeraddress", {
          ...addForm,
          customer_id: customerId,
        });
        alert("Address added successfully");
        setAddForm({
          fname: "",
          lname: "",
          address: "",
          city: "",
          state: "",
          country: "",
          postal_code: "",
          email: "",
          mobile: "",
          description: "",
          primary_address: 0,
        });
        setShowAddForm(false);
        fetchAddresses();
      } catch (err) {
        alert("Failed to add address: " + (err.response?.data?.msg || err.message));
      }
    };
     const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddForm((prev) => ({ ...prev, [name]: value }));
  };
  const cancelOrder = async (saleId) => {
    const confirmCancel = window.confirm(
      "Do you really want to cancel this order?"
    );
    if (!confirmCancel) return;

    try {
      await axios.put(`${BASE_URL}/cancelorder/${saleId}`);
      alert("Order cancelled successfully!");

      const customerData = JSON.parse(localStorage.getItem("customerinfo"));
      const response = await axios.get(
        `${BASE_URL}/getallorders/${customerData.id}`
      );
      setOrders(response.data.orders);
    } catch (err) {
      console.error("Cancel failed:", err);
      alert("Failed to cancel the order. Please try again later.");
    }
  };

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
      <div
        key={order.SALEID}
        className="order-card mb-4 p-5 rounded shadow-sm bg-white border"
      >
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-3">
          <h5 className="order-number mb-2 mb-md-0 fs-3">
            Order {order.SALEID}
          </h5>
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-center gap-2">
            <span className="text-muted small">
              Status: {getStatusBadge(order.ORDER_STATUS)}
            </span>
          </div>
        </div>

        {/* Payment Info */}
        <div className="mb-3">
          <span className="text-muted small">
            <i className="bi bi-calendar"></i>{" "}
            {new Date(order.CREATEDON).toLocaleDateString()}
          </span>
          <div className="small text-muted">
            <strong>Payment Method:</strong> {order.PAYMENTMETHOD}
          </div>
          <div className="small text-muted">
            <strong>Payment Status:</strong> {order.PAYMENTSTATUS}
          </div>
        </div>

        {/* Items */}
        {order.ITEMS?.map((item, index) => {
          const quantity = parseFloat(item.QUANTITY || 0);
          const amount = parseFloat(item.AMOUNT || 0);
          const lineTotal = amount * quantity;
          totalAmount += lineTotal;
          const imageArray = item.PHOTO?.split(",") || [];
          const firstImage = imageArray[0];

          return (
            <div
              className="row border-top w-full pt-3 mb-3 align-items-center"
              key={index}
            >
              {/* Image */}
              <div className="col-4 col-md-2 mb-2 mb-md-0">
                {item.PHOTO && (
                  <img
                    src={process.env.REACT_APP_PUBLIC_URL + firstImage}
                    alt={item.ITEMNAME}
                    className="img-fluid"
                    style={{
                      maxHeight: "120px",
                      objectFit: "contain",
                      borderRadius: "4px",
                    }}
                  />
                )}
              </div>

              {/* Details */}
              <div className="col-8 col-md-10 pt-4">
                <h6 className="mb-1 fw-bold text-xl md:text-2xl">
                  {item.ITEMNAME || "Unnamed Product"}
                </h6>

                {item.DESCRIPTION && (
                  <p className="text-muted mb-1 small">{item.DESCRIPTION}</p>
                )}
                <div className="d-flex flex-wrap gap-3 small">
                  <span>
                    <strong>Qty:</strong> {quantity}
                  </span>
                  <span>
                    <strong>Amount:</strong> ₹{amount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Total + Cancel */}
        <div className="d-flex justify-content-between align-items-center border-top pt-3">
          <strong>Total: ₹{totalAmount.toFixed(2)}</strong>
          {["Placed", "Progress"].includes(order.ORDER_STATUS) && (
            <button
              className="py-1"
              onClick={() => cancelOrder(order.SALEID)}
              style={{
                border: "none",
                marginTop: "5px",
                fontSize: "10px",
                backgroundColor: "#DC3545",
                borderRadius: "5px",
                color: "#fff",
                fontWeight: "boLD",
              }}
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderPersonalDetails = () => (
    <div className="row">
      <div className="col-md-6 mb-4">
        <label className="d-block mb-2">First Name</label>
        <input
          type="text"
          name="FNAME"
          value={customer.FNAME}
          onChange={handleInputChange}
          className="w-100 p-4 ms-0"
          style={inputStyle}
        />
      </div>

      <div className="col-md-6 mb-4">
        <label className="d-block mb-2">Last Name</label>
        <input
          type="text"
          name="LNAME"
          value={customer.LNAME}
          onChange={handleInputChange}
          className="w-100 p-4 ms-0"
          style={inputStyle}
        />
      </div>

      <div className="col-md-6 mb-4">
        <label className="d-block mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={customer.email}
          disabled
          className="w-100 p-4 ms-0"
          style={{ ...inputStyle, color: "#777" }}
        />
      </div>

      <div className="col-md-6 mb-4">
        <label className="d-block mb-2">Phone</label>
        <input
          type="text"
          name="MOBILE"
          value={customer.MOBILE}
          onChange={handleInputChange}
          className="w-100 p-4 ms-0"
          style={inputStyle}
        />
      </div>
      {/* 
      <div className="col-md-6 mb-4">
        <label className="d-block mb-2">Address</label>
        <input
          type="text"
          name="CADDRESSLINE1"
          value={customer.CADDRESSLINE1}
          onChange={handleInputChange}
          className="w-100 p-2"
          style={inputStyle}
        />
      </div> */}

      {/* <div className="col-md-6 mb-4">
        <label className="d-block mb-2">City</label>
        <input
          type="text"
          name="CCITY"
          value={customer.CCITY}
          onChange={handleInputChange}
          className="w-100 p-2"
          style={inputStyle}
        />
      </div> */}
      {/* 
      <div className="col-md-6 mb-4">
        <label className="d-block mb-2">State</label>
        <input
          type="text"
          name="CSTATE"
          value={customer.CSTATE}
          onChange={handleInputChange}
          className="w-100 p-2"
          style={inputStyle}
        />
      </div> */}

      {/* <div className="col-md-6 mb-4">
        <label className="d-block mb-2">Country</label>
        <input
          type="text"
          name="CCOUNTRY"
          value={customer.CCOUNTRY}
          onChange={handleInputChange}
          className="w-100 p-2"
          style={inputStyle}
        />
      </div> */}

      {/* <div className="col-md-6 mb-4">
        <label className="d-block mb-2">Postal Code</label>
        <input
          type="text"
          name="CPINCODE"
          value={customer.CPINCODE}
          onChange={handleInputChange}
          className="w-100 p-2"
          style={inputStyle}
        />
      </div> */}
    </div>
  );

  const renderChangePassword = () => (
    <div className="row">
      {/* Old Password */}
      <div className="col-md-6 mb-4" style={{ position: "relative" }}>
        <label className="d-block mb-2">Old Password</label>
        <input
          type={oldPassword ? "text" : "password"}
          name="old_password"
          value={customer.password}
          className="w-full p-2 pr-10 border border-gray-300 rounded"
          readOnly
        />
        <i
          className={`bi ${oldPassword ? "bi-eye-slash" : "bi-eye"}`}
          onClick={() => setoldPassword(!oldPassword)}
          style={{
            position: "absolute",
            top: "70%",
            right: "12px",
            transform: "translateY(-50%)",
            cursor: "pointer",
            fontSize: "1.5rem",
            color: "#777",
            paddingRight: "10px",
          }}
        ></i>
      </div>

      {/* New Password */}
      <div className="col-md-6 mb-4" style={{ position: "relative" }}>
        <label className="d-block mb-2">New Password</label>
        <input
          type={showPassword ? "text" : "password"}
          name="newPassword"
          placeholder="New Password"
          value={customer.newPassword}
          onChange={handleInputChange}
          className="w-full p-2 pr-10 border border-gray-300 rounded"
          autoComplete="off"
        />
        <i
          className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            top: "70%",
            right: "12px",
            transform: "translateY(-50%)",
            cursor: "pointer",
            fontSize: "1.5rem",
            color: "#777",
            paddingRight: "10px",
          }}
        ></i>
      </div>

      {/* Confirm Password */}
      <div className="col-md-6 mb-4" style={{ position: "relative" }}>
        <label className="d-block mb-2">Confirm Password</label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          value={customer.confirmPassword}
          onChange={handleInputChange}
          className="w-full p-2 pr-10 border border-gray-300 rounded"
        />
        <i
          className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          style={{
            position: "absolute",
            top: "70%",
            right: "12px",
            transform: "translateY(-50%)",
            cursor: "pointer",
            fontSize: "1.5rem",
            color: "#777",
            paddingRight: "10px",
          }}
        ></i>
      </div>
    </div>
  );

  const renderRegisterPage = () => (
    
    <div className="container py-4">
      {/* <div
        className="border rounded p-3 mb-4 d-flex align-items-center gap-2"
        role="button"
        style={{ cursor: "pointer" }}
        onClick={() => setShowAddForm(!showAddForm)}
      >
        <i className="bi bi-plus-lg text-primary"></i>
        <span className="text-primary fw-semibold">
          {showAddForm ? "HIDE ADDRESS FORM" : "ADD A NEW ADDRESS"}
        </span>
      </div> */}

      {showAddForm && (
        <form className="border rounded p-3 mb-4" onSubmit={handleAddSubmit}>
          <div className="row g-2">
            {[
              "fname",
              "lname",
              "address",
              "city",
              "state",
              "country",
              "postal_code",
              "email",
              "mobile",
              "description",
            ].map((field, i) => (
              <div
                className={`col-md-${field === "address" || field === "description" ? 12 : 6}`}
                key={i}
              >
                <input
                 className="w-100 p-4 ms-0"
                 style={inputStyle}
                  name={field}
                  value={addForm[field]}
                  onChange={handleAddChange}
                  placeholder={field.replace("_", " ").toUpperCase()}
                  required
                />
              </div>
            ))}
          </div>
          <div className="mt-3 d-flex justify-content-end gap-2">
            <button
              type="button"
             className="px-3 py-2" style={buttonStyle}
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </button>
            <button type="submit" className="px-3 py-2" style={buttonStyle}>
              Save Address
            </button>
          </div>
        </form>
      )}

      {data.map((item, index) => (
        <div
          className="border rounded p-3 mb-3 d-flex align-items-start position-relative"
          key={index}
        >
          <div className="form-check mt-1 me-3">
            <input
              className="form-check-input"
              type="radio"
              name="primaryAddress"
              checked={item.primary_address === 1}
              onChange={() => handleMakePrimary(item.id)}
              id={`primary-${item.id}`}
            />
          </div>

          <div className="flex-grow-1">
            {editIndex === index ? (
              <form onSubmit={handleUpdate}>
                <div className="row g-2">
                  {[
                    "fname",
                    "lname",
                    "address",
                    "city",
                    "state",
                    "country",
                    "postal_code",
                    "email",
                    "mobile",
                    "description",
                  ].map((field, i) => (
                    <div
                      className={`col-md-${field === "address" || field === "description" ? 12 : 6}`}
                      key={i}
                    >
                      <input
                        className="w-100 p-4 ms-0"
                        style={inputStyle}
                        name={field}
                        value={editItem[field]}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-3 d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="px-3 py-2" style={buttonStyle}
                    onClick={() => setEditIndex(null)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-3 py-2" style={buttonStyle}>
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="fw-bold mb-1">
                  {item.fname} {item.lname}, {item.postal_code}
                  {item.primary_address === 1 && (
                    <span className="badge bg-success ms-2">Primary</span>
                  )}
                </div>
                <div style={{ fontSize: "14px" }}>
                  {item.address}, {item.city}, {item.state}
                </div>
                <div style={{ fontSize: "14px" }}>{item.description}</div>

                <div className="position-absolute top-0 end-0 d-flex gap-1 p-2">
                  <button
                    onClick={() => handleEditClick(item, index)}
                    title="Edit"
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#0D6EFD",
                      fontSize: "22px",
                      minWidth: "57px",
                      marginTop: "16%",
                      minHeight: "55px",
                      lineHeight: "55px",
                      marginBottom: "6px",
                      padding: "0",
                      border: "none",
                      borderRadius: "0",
                    }}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    title="Delete"
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#c2080f",
                      fontSize: "22px",
                      marginTop: "16%",
                      minWidth: "57px",
                      minHeight: "55px",
                      lineHeight: "55px",
                      marginBottom: "6px",
                      padding: "0",
                      border: "none",
                      borderRadius: "0",
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderAccountDetails = () => (
    <div>
      <h4 style={{ fontWeight: "500", marginBottom: "20px" }}>
        Account Details
      </h4>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div style={accountDetailCardStyle}>
            <h5 className="fs-3">Wallet Balance</h5>
            <p className="fs-4" style={accountDetailAmountStyle}>
              ₹0.00
            </p>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div style={accountDetailCardStyle}>
            <h5 className="fs-3">Reward Points</h5>
            <p className="fs-4" style={accountDetailAmountStyle}>
              0 Points
            </p>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div style={accountDetailCardStyle}>
            <h5 className="fs-3">Total Orders</h5>
            <p className="fs-4" style={accountDetailAmountStyle}>
              {orders.length}
            </p>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div style={accountDetailCardStyle}>
            <h5 className="fs-3">Member Since</h5>
            <p className="fs-4" style={accountDetailAmountStyle}>
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h5 style={{ fontWeight: "500", marginBottom: "15px" }}>
          Recent Transactions
        </h5>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "20px",
          }}
        >
          <p className="text-muted">No recent transactions</p>
        </div>
      </div>
    </div>
  );

  const renderWalletView = () => (
    <div
      className="wallet-container"
      style={{ padding: "1rem", maxWidth: "100%", overflowX: "hidden" }}
    >
      {/* Wallet Header */}
      <div className="wallet-header" style={{ marginBottom: "1.5rem" }}>
        <h2
          className="wallet-title"
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            marginBottom: "0.5rem",
            fontWeight: "600",
          }}
        >
          My Wallet
        </h2>
        <p
          className="wallet-subtitle"
          style={{
            fontSize: "clamp(15px, 2vw, 1rem)",
            color: "#666",
            margin: 0,
          }}
        >
          Manage your wallet balance and transactions
        </p>
      </div>

      {/* Wallet Balance Card */}
      <div
        className="wallet-balance-card"
        style={{
          ...walletBalanceCardStyle,
          padding: "1.5rem",
          marginBottom: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: window.innerWidth < 768 ? "column" : "row",
          justifyContent: "space-between",
          alignItems: window.innerWidth < 768 ? "flex-start" : "center",
          gap: "1rem",
        }}
      >
        <div className="wallet-balance-info">
          <h3
            className="wallet-balance-title"
            style={{
              fontSize: "2rem",
              color: "#fff",
              marginBottom: "0.5rem",
            }}
          >
            Current Balance
          </h3>
          <p
            className="wallet-balance-amount"
            style={{
              ...walletBalanceAmountStyle,
              fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
              margin: 0,
            }}
          >
            ₹{walletBalance.toFixed(2)}
          </p>
        </div>
        <div
          className="wallet-actions"
          style={{
            display: "flex",
            flexDirection: window.innerWidth < 400 ? "column" : "row",
            gap: "0.75rem",
            width: window.innerWidth < 768 ? "100%" : "auto",
          }}
        >
          <button
            style={{
              ...walletActionButtonStyle,
              padding: "0.75rem 1.25rem",
              fontSize: "0.9rem",
              width: window.innerWidth < 768 ? "100%" : "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            <i className="bi bi-plus-circle"></i>
            <span>Add Money</span>
          </button>
          <button
            style={{
              ...walletActionButtonStyle,
              padding: "0.75rem 1.25rem",
              fontSize: "0.9rem",
              width: window.innerWidth < 768 ? "100%" : "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            <i className="bi bi-arrow-up-circle"></i>
            <span>Withdraw</span>
          </button>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="wallet-transactions">
        <h3
          className="wallet-transactions-title"
          style={{
            fontSize: "1.5rem",
            marginBottom: "1rem",
            fontWeight: "600",
          }}
        >
          Recent Transactions
        </h3>

        {walletTransactions.length > 0 ? (
          <>
            {/* Desktop Table View */}
            <div className="d-none d-md-block">
              <div className="table-responsive">
                <table
                  className="table wallet-transactions-table"
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#f8f9fa" }}>
                      <th
                        style={{
                          ...walletTableHeaderStyle,
                          padding: "12px 16px",
                          textAlign: "left",
                          fontWeight: "500",
                        }}
                      >
                        Date
                      </th>
                      <th
                        style={{
                          ...walletTableHeaderStyle,
                          padding: "12px 16px",
                          textAlign: "left",
                          fontWeight: "500",
                        }}
                      >
                        Description
                      </th>
                      <th
                        style={{
                          ...walletTableHeaderStyle,
                          padding: "12px 16px",
                          textAlign: "right",
                          fontWeight: "500",
                        }}
                      >
                        Amount
                      </th>
                      <th
                        style={{
                          ...walletTableHeaderStyle,
                          padding: "12px 16px",
                          textAlign: "center",
                          fontWeight: "500",
                        }}
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {walletTransactions.map((transaction, index) => (
                      <tr
                        key={index}
                        style={{
                          ...walletTableRowStyle,
                          borderBottom: "1px solid #eee",
                          "&:last-child": { borderBottom: "none" },
                        }}
                      >
                        <td
                          style={{
                            ...walletTableCellStyle,
                            padding: "12px 16px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td
                          style={{
                            ...walletTableCellStyle,
                            padding: "12px 16px",
                            maxWidth: "200px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {transaction.description}
                        </td>
                        <td
                          style={{
                            ...walletTableCellStyle,
                            padding: "12px 16px",
                            textAlign: "right",
                            fontWeight: "500",
                            color:
                              transaction.type === "credit"
                                ? "#4CAF50"
                                : "#F44336",
                          }}
                        >
                          {transaction.type === "credit" ? "+" : "-"}₹
                          {transaction.amount.toFixed(2)}
                        </td>
                        <td
                          style={{
                            ...walletTableCellStyle,
                            padding: "12px 16px",
                            textAlign: "center",
                          }}
                        >
                          <span
                            style={{
                              backgroundColor:
                                transaction.status === "completed"
                                  ? "#E8F5E9"
                                  : "#FFF8E1",
                              color:
                                transaction.status === "completed"
                                  ? "#2E7D32"
                                  : "#FF8F00",
                              padding: "4px 12px",
                              borderRadius: "12px",
                              fontSize: "0.8rem",
                              display: "inline-block",
                              minWidth: "80px",
                            }}
                          >
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards View */}
            <div className="d-md-none">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {walletTransactions.map((transaction, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                      padding: "1rem",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gridTemplateRows: "auto auto",
                      gap: "0.5rem",
                    }}
                  >
                    <div style={{ gridColumn: "1 / span 2" }}>
                      <p
                        style={{
                          margin: 0,
                          fontWeight: "500",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {transaction.description}
                      </p>
                      <p
                        style={{
                          margin: "0.25rem 0 0",
                          fontSize: "0.8rem",
                          color: "#666",
                        }}
                      >
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          backgroundColor:
                            transaction.status === "completed"
                              ? "#E8F5E9"
                              : "#FFF8E1",
                          color:
                            transaction.status === "completed"
                              ? "#2E7D32"
                              : "#FF8F00",
                          padding: "4px 12px",
                          borderRadius: "12px",
                          fontSize: "0.8rem",
                        }}
                      >
                        {transaction.status}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "500",
                          color:
                            transaction.type === "credit"
                              ? "#4CAF50"
                              : "#F44336",
                        }}
                      >
                        {transaction.type === "credit" ? "+" : "-"}₹
                        {transaction.amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div
            style={{
              ...noTransactionsStyle,
              textAlign: "center",
              padding: "2rem",
              backgroundColor: "#fafafa",
              borderRadius: "8px",
            }}
          >
            <i
              className="bi bi-wallet2"
              style={{
                fontSize: "3rem",
                color: "#e0e0e0",
                marginBottom: "1rem",
              }}
            ></i>
            <p
              style={{
                margin: 0,
                color: "#757575",
                fontSize: "1rem",
              }}
            >
              No transactions found
            </p>
          </div>
        )}
      </div>
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
          {activeProfileSection === "registerPage" && "Registration Address"}
        </h4>
      </div>

      {activeProfileSection === "personalDetails" && renderPersonalDetails()}
      {activeProfileSection === "changePassword" && renderChangePassword()}
      {activeProfileSection === "registerPage" && renderRegisterPage()}

        {activeProfileSection !== "registerPage" && (
      <div className="mt-4">
        <button type="submit" className="px-3 py-2" style={buttonStyle}>
          Update
        </button>
      </div>
    )}
    </form>
  );

  const renderOrdersView = () => (
    <div className="container-fluid orders-container py-4">
        <div className="page-header text-center mb-4">
          <h1 className="page-title">My Orders</h1>
          <p className="page-subtitle text-muted">
            View and manage your order history
          </p>
        </div>

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-4 custom-tabs"
          justify
        >
          {/* All Orders */}
          <Tab eventKey="all_orders" title="All Orders">
            <div className="orders-section">
              {isLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status" />
                  <p className="text-muted mt-2">Loading your orders...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-box-seam fs-1 text-muted" />
                  <h5 className="mt-2">No orders found</h5>
                  <p className="text-muted">
                    You haven't placed any orders yet.
                  </p>
                </div>
              ) : (
                <div className="orders-list">{orders.map(renderOrderCard)}</div>
              )}
            </div>
          </Tab>

          {/* Delivered Orders */}
          <Tab eventKey="delivered" title="Delivered">
            <div className="orders-section">
              {isLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status" />
                  <p className="text-muted mt-2">Loading delivered orders...</p>
                </div>
              ) : deliveredOrders.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-truck fs-1 text-muted" />
                  <h5 className="mt-2">No delivered orders</h5>
                  <p className="text-muted">
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

          {/* Cancelled Orders */}
          <Tab eventKey="cancelled" title="Cancelled">
            <div className="orders-section">
              {isLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status" />
                  <p className="text-muted mt-2">Loading cancelled orders...</p>
                </div>
              ) : cancelledOrders.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-x-circle fs-1 text-muted" />
                  <h5 className="mt-2">No cancelled orders</h5>
                  <p className="text-muted">
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
  );

  const LogoutConfirmation = () => (
    <div style={logoutModalStyle}>
      <div style={logoutModalContentStyle}>
        <h4>Are you sure you want to logout?</h4>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <button
            onClick={() => {
              localStorage.removeItem("customerinfo");
              navigate("/login-register");
            }}
            style={confirmButtonStyle}
          >
            Yes, Logout
          </button>
          <button
            onClick={() => setShowLogoutConfirm(false)}
            style={cancelButtonStyle}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Fragment>
      <SEO titleTemplate="My Account" description="My Account page" />
      <LayoutOne headerTop="visible">
        <div className="myaccount-area" style={{ padding: "1rem 0" }}>
          <div className="container-fluid">
            {/* Mobile Menu Toggle Button */}
            <div className="d-md-none mb-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  backgroundColor: "#3f51b5",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "4px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>Menu</span>
                <i
                  className={`bi bi-chevron-${
                    isMobileMenuOpen ? "up" : "down"
                  }`}
                ></i>
              </button>
            </div>

            <div className="row">
              {/* Sidebar - shown on desktop by default, conditionally shown on mobile */}
              <div
                className={`col-xl-3 col-lg-4 col-md-4 ${
                  isMobileMenuOpen ? "d-block" : "d-none d-md-block"
                }`}
                style={{
                  position: "sticky",
                  top: "20px",
                  height: "fit-content",
                  alignSelf: "flex-start",
                }}
              >
                <div className="account-sidebar" style={sidebarContainerStyle}>
                  <div className="account-sidebar-header">
                    <h3 style={sidebarHeaderStyle}>My Account</h3>
                  </div>
                  <ul className="account-menu" style={sidebarMenuStyle}>
                    <li style={sidebarItemStyle}>
                      <button
                        className="fs-4 w-100 text-start"
                        onClick={() => {
                          setActiveView("profile");
                          setProfileDropdownOpen(!profileDropdownOpen);
                          setIsMobileMenuOpen(false);
                        }}
                        style={{
                          ...(activeView === "profile"
                            ? activeSidebarButtonStyle
                            : sidebarButtonStyle),
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <i
                          className="bi bi-person fs-4"
                          style={sidebarIconStyle}
                        ></i>
                        <span style={{ marginLeft: "10px" }}>My Profile</span>
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
                            className="fs-4 w-100 text-start"
                            onClick={() => {
                              setActiveProfileSection("personalDetails");
                              setProfileDropdownOpen(false);
                              setIsMobileMenuOpen(false);
                            }}
                            style={{
                              ...(activeProfileSection === "personalDetails"
                                ? activeDropdownButtonStyle
                                : dropdownButtonStyle),
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <i
                              className="fs-4 bi bi-person-lines-fill"
                              style={sidebarIconStyle}
                            ></i>
                            <span style={{ marginLeft: "10px" }}>
                              Personal Details
                            </span>
                          </button>
                          <button
                            className="fs-4 w-100 text-start"
                            onClick={() => {
                              setActiveProfileSection("changePassword");
                              setProfileDropdownOpen(false);
                              setIsMobileMenuOpen(false);
                            }}
                            style={{
                              ...(activeProfileSection === "changePassword"
                                ? activeDropdownButtonStyle
                                : dropdownButtonStyle),
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <i
                              className="fs-4 bi bi-shield-lock"
                              style={sidebarIconStyle}
                            ></i>
                            <span style={{ marginLeft: "10px" }}>
                              Change Password
                            </span>
                          </button>
                          <button
                            className="fs-4 w-100 text-start"
                            onClick={() => {
                              setActiveProfileSection("registerPage");
                              setProfileDropdownOpen(false);
                              setIsMobileMenuOpen(false);
                            }}
                            style={{
                              ...(activeProfileSection === "registerPage"
                                ? activeDropdownButtonStyle
                                : dropdownButtonStyle),
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <i
                              className="fs-4 bi bi-house-door"
                              style={sidebarIconStyle}
                            ></i>
                            <span style={{ marginLeft: "10px" }}>
                              Register Address
                            </span>
                          </button>
                        </div>
                      )}
                    </li>
                    <li style={sidebarItemStyle}>
                      <button
                        className="fs-4 w-100 text-start"
                        onClick={() => {
                          setActiveView("accountDetails");
                          setIsMobileMenuOpen(false);
                        }}
                        style={{
                          ...(activeView === "accountDetails"
                            ? activeSidebarButtonStyle
                            : sidebarButtonStyle),
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <i
                          className="bi bi-wallet2 fs-4"
                          style={sidebarIconStyle}
                        ></i>
                        <span style={{ marginLeft: "10px" }}>
                          Account Details
                        </span>
                      </button>
                    </li>
                    <li style={sidebarItemStyle}>
                      <button
                        className="fs-4 w-100 text-start"
                        onClick={() => {
                          setActiveView("wallet");
                          setIsMobileMenuOpen(false);
                        }}
                        style={{
                          ...(activeView === "wallet"
                            ? activeSidebarButtonStyle
                            : sidebarButtonStyle),
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <i
                          className="bi bi-credit-card fs-4"
                          style={sidebarIconStyle}
                        ></i>
                        <span style={{ marginLeft: "10px" }}>Wallet</span>
                      </button>
                    </li>
                    <li style={sidebarItemStyle}>
                      <button
                        className="fs-4 w-100 text-start"
                        onClick={() => {
                          setActiveView("orders");
                          setIsMobileMenuOpen(false);
                        }}
                        style={{
                          ...(activeView === "orders"
                            ? activeSidebarButtonStyle
                            : sidebarButtonStyle),
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <i
                          className="bi bi-bag fs-4"
                          style={sidebarIconStyle}
                        ></i>
                        <span style={{ marginLeft: "10px" }}>My Orders</span>
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
                          <span style={{ marginLeft: "10px" }}>
                            Referral ID
                          </span>
                        </div>
                        <input
                          type="text"
                          value={customer.referralId}
                          readOnly
                          style={{
                            flex: "1 1 120px",
                            minWidth: "120px",
                            padding: "8px",
                            marginBottom: "10px",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            backgroundColor: "#f8f9fa",
                          }}
                          className="ms-0 w-full "
                        />
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "8px",
                          }}
                        >
                          {/* Copy Button */}
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
                              flex: "1 1 auto",
                              justifyContent: "center",
                            }}
                          >
                            <i
                              className="bi bi-clipboard"
                              style={{ marginRight: "5px" }}
                            ></i>
                            Copy
                          </button>

                          {/* Share Button */}
                          <button
                            onClick={() => {
                              if (navigator.share) {
                                navigator
                                  .share({
                                    title: "Referral Invitation",
                                    text: `Join using my referral ID: ${customer.referralId}`,
                                    url: window.location.href,
                                  })
                                  .then(() => {
                                    setSuccess("Referral shared successfully!");
                                    if (successTimeout) {
                                      clearTimeout(successTimeout);
                                    }
                                    setSuccessTimeout(
                                      setTimeout(() => setSuccess(""), 3000)
                                    );
                                  })
                                  .catch((error) =>
                                    console.log("Share failed:", error)
                                  );
                              } else {
                                setSuccess(
                                  "Sharing is not supported on this device."
                                );
                                if (successTimeout)
                                  clearTimeout(successTimeout);
                                setSuccessTimeout(
                                  setTimeout(() => setSuccess(""), 3000)
                                );
                              }
                            }}
                            style={{
                              padding: "8px 12px",
                              backgroundColor: "#28a745",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              flex: "1 1 auto",
                              justifyContent: "center",
                            }}
                          >
                            <i
                              className="bi bi-share-fill"
                              style={{ marginRight: "5px" }}
                            ></i>
                            Share
                          </button>
                        </div>

                        {/* Success Message */}
                        {success && (
                          <div
                            style={{
                              marginTop: "10px",
                              color: "#28a745",
                              fontWeight: "bold",
                            }}
                          >
                            {success}
                          </div>
                        )}
                      </div>
                    </li>

                    <li style={sidebarItemStyle}>
                      <button
                        className="fs-4 w-100 text-start"
                        onClick={() => setShowLogoutConfirm(true)}
                        style={{
                          ...sidebarButtonStyle,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <i
                          className="bi bi-box-arrow-right fs-4"
                          style={sidebarIconStyle}
                        ></i>
                        <span style={{ marginLeft: "10px" }}>Logout</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="col-xl-9 col-lg-8 col-md-8">
                <div
                  className="myaccount-content p-5"
                  style={{
                    ...contentContainerStyle,
                    // Add some bottom margin on mobile
                  }}
                >
                  {error && <div className="alert alert-danger">{error}</div>}
                  {success && (
                    <div className="alert alert-success">{success}</div>
                  )}

                  {activeView === "profile"
                    ? renderProfileView()
                    : activeView === "orders"
                    ? renderOrdersView()
                    : activeView === "wallet"
                    ? renderWalletView()
                    : renderAccountDetails()}
                </div>
              </div>
            </div>
          </div>
        </div>
        {showLogoutConfirm && <LogoutConfirmation />}
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
  fontSize: "2rem",
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
  // marginBottom: "10px",
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
  // fontSize: "1.2rem",
};

const contentContainerStyle = {
  backgroundColor: "#F8F9FA",
  borderRadius: "8px",
  // padding: "30px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  minHeight: "490px",
};

const accountDetailCardStyle = {
  backgroundColor: "white",
  borderRadius: "8px",
  padding: "15px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  height: "100%",
};

const accountDetailAmountStyle = {
  fontWeight: "bold",
  color: "#3f51b5",
  marginTop: "5px",
};

// Wallet Styles
const walletBalanceCardStyle = {
  backgroundColor: "#3f51b5",
  color: "white",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "30px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
};

const walletBalanceAmountStyle = {
  fontSize: "2rem",
  fontWeight: "bold",
  margin: "10px 0 0 0",
};

const walletActionButtonStyle = {
  backgroundColor: "rgba(255,255,255,0.2)",
  color: "white",
  border: "none",
  borderRadius: "4px",
  padding: "8px 15px",
  marginLeft: "10px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "5px",
  transition: "all 0.3s ease",
  ":hover": {
    backgroundColor: "rgba(255,255,255,0.3)",
  },
};

const walletTableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
  backgroundColor: "white",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const walletTableHeaderStyle = {
  padding: "12px 15px",
  textAlign: "left",
  backgroundColor: "#f5f5f5",
  fontWeight: "500",
  color: "#333",
};

const walletTableRowStyle = {
  borderBottom: "1px solid #f0f0f0",
  ":last-child": {
    borderBottom: "none",
  },
};

const walletTableCellStyle = {
  padding: "12px 15px",
  verticalAlign: "middle",
};

const noTransactionsStyle = {
  backgroundColor: "white",
  borderRadius: "8px",
  padding: "40px",
  textAlign: "center",
  marginTop: "20px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const logoutModalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const logoutModalContentStyle = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "8px",
  maxWidth: "400px",
  width: "100%",
  margin: "15px",
  textAlign: "center",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
};

const confirmButtonStyle = {
  padding: "8px 20px",
  backgroundColor: "#f44336",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const cancelButtonStyle = {
  padding: "8px 20px",
  backgroundColor: "#e0e0e0",
  color: "#333",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default MyAccount;