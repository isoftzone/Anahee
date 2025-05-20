// import { Fragment, useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import SEO from "../../components/seo";
// import LayoutOne from "../../layouts/LayoutOne";
// import axios from 'axios';
// import { BASE_URL } from "../../config";
// import { useNavigate } from 'react-router-dom';

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
//     confirmPassword: ""
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();
//   const customerinfo = JSON.parse(localStorage.getItem('customerinfo'));
//   const customerId = customerinfo?.id;
//   if (!customerId) {
//     navigate("/login-register");
//   }
  
//   useEffect(() => {
//     const fetchCustomerData = async () => {
//       try {

//         const response = await axios.get(`${BASE_URL}/getcustomerbyid/${customerId}`, {
//           headers: {
//             "Content-Type": "application/json"
//           }
//         });
        
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
//           CPINCODE: data.CPINCODE || ""
//         });
//       } catch (error) {
//         console.error('Failed to fetch customer data:', error);
//         if (error.response) {
//           console.error('Response data:', error.response.data);
//           console.error('Response status:', error.response.status);
//         }
//       }
//     };
  
//     fetchCustomerData();
//   }, []);
  

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCustomer(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
  
//     if (customer.password && customer.password !== customer.confirmPassword) {
//       setError("Passwords don't match");
//       return;
//     }
  
//     try {
  
//       const updateData = {
//         FNAME: customer.FNAME,
//         LNAME: customer.LNAME,
//         email: customer.email,
//         MOBILE: customer.MOBILE,
//         CADDRESSLINE1: customer.CADDRESSLINE1,
//         CCITY: customer.CCITY,
//         CSTATE: customer.CSTATE,
//         CCOUNTRY: customer.CCOUNTRY,
//         CDISTRICT: customer.CDISTRICT,
//         CPINCODE: customer.CPINCODE,
//         customerId,
//       };
  
//       if (customer.password) {
//         updateData.password = customer.password;
//       }
  
//       const response = await axios.put(`${BASE_URL}/updateCustomerInfo`, updateData, {
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });
//       console.log('response 11',response);
//       const data = await response.data;
//       if (response.status === 200) {
//         setCustomer(prev => ({ ...prev, password: "", confirmPassword: "" }));
//         setSuccess(data.message);
//       }else{
//         setError(data.message);
//       }
  
//     } catch (error) {
//       console.error(error.response?.data?.message || 'Update failed');
//       setError(error.response?.data?.message);
//     }
//   };
  
//   return (
//     <Fragment>
//       <SEO
//         titleTemplate="My Account"
//         description="My Account page"
//       />
//       <LayoutOne headerTop="visible">
//         <div className="myaccount-area" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
//           <div className="container">
//             <div className="row">
//               <div className="col-12">
//                 <div className="myaccount-wrapper">
//                   {error && <p style={{ color: "red" }}>{error}</p>}
//                   {success && <p style={{ color: "green" }}>{success}</p>}
//                   <form onSubmit={handleSubmit}>
//                     <h4 className="mb-4" style={{ fontWeight: '500' }}>Account Information</h4>
                    
//                     <div className="row">
//                       <div className="col-lg-6 col-md-6 mb-4">
//                         <label className="d-block mb-2">First Name</label>
//                         <input
//                           type="text"
//                           name="FNAME"
//                           value={customer.FNAME}
//                           onChange={handleInputChange}
//                           className="w-100 p-2"
//                           style={{ 
//                             background: 'transparent',
//                             borderBottom: '1px solid #eee',
//                             outline: 'none'
//                           }}
//                         />
//                       </div>
//                       <div className="col-lg-6 col-md-6 mb-4">
//                         <label className="d-block mb-2">Last Name</label>
//                         <input
//                           type="text"
//                           name="LNAME"
//                           value={customer.LNAME}
//                           onChange={handleInputChange}
//                           className="w-100 p-2"
//                           style={{ 
//                             background: 'transparent',
//                             borderBottom: '1px solid #eee',
//                             outline: 'none'
//                           }}
//                         />
//                       </div>
//                       <div className="col-lg-6 col-md-6 mb-4">
//                         <label className="d-block mb-2">Email</label>
//                         <input
//                           type="email"
//                           name="email"
//                           value={customer.email}
//                           onChange={handleInputChange}
//                           disabled
//                           className="w-100 p-2"
//                           style={{ 
//                             background: 'transparent',
//                             borderBottom: '1px solid #eee',
//                             outline: 'none',
//                             color: '#777'
//                           }}
//                         />
//                       </div>
//                       <div className="col-lg-6 col-md-6 mb-4">
//                         <label className="d-block mb-2">Phone</label>
//                         <input
//                           type="text"
//                           name="MOBILE"
//                           value={customer.MOBILE}
//                           onChange={handleInputChange}
//                           className="w-100 p-2"
//                           style={{ 
//                             background: 'transparent',
//                             borderBottom: '1px solid #eee',
//                             outline: 'none'
//                           }}
//                         />
//                       </div>
//                       <div className="col-lg-6 col-md-6 mb-4">
//                         <label className="d-block mb-2">Address</label>
//                         <input
//                           type="text"
//                           name="CADDRESSLINE1"
//                           value={customer.CADDRESSLINE1}
//                           onChange={handleInputChange}
//                           className="w-100 p-2"
//                           style={{ 
//                             background: 'transparent',
//                             borderBottom: '1px solid #eee',
//                             outline: 'none'
//                           }}
//                         />
//                       </div>
//                       <div className="col-lg-6 col-md-6 mb-4">
//                         <label className="d-block mb-2">City</label>
//                         <input
//                           type="text"
//                           name="CCITY"
//                           value={customer.CCITY}
//                           onChange={handleInputChange}
//                           className="w-100 p-2"
//                           style={{ 
//                             background: 'transparent',
//                             borderBottom: '1px solid #eee',
//                             outline: 'none'
//                           }}
//                         />
//                       </div>
//                       <div className="col-lg-6 col-md-6 mb-4">
//                         <label className="d-block mb-2">State</label>
//                         <input
//                           type="text"
//                           name="CSTATE"
//                           value={customer.CSTATE}
//                           onChange={handleInputChange}
//                           className="w-100 p-2"
//                           style={{ 
//                             background: 'transparent',
//                             borderBottom: '1px solid #eee',
//                             outline: 'none'
//                           }}
//                         />
//                       </div>
//                       <div className="col-lg-6 col-md-6 mb-4">
//                         <label className="d-block mb-2">Country</label>
//                         <input
//                           type="text"
//                           name="CCOUNTRY"
//                           value={customer.CCOUNTRY}
//                           onChange={handleInputChange}
//                           className="w-100 p-2"
//                           style={{ 
//                             background: 'transparent',
//                             borderBottom: '1px solid #eee',
//                             outline: 'none'
//                           }}
//                         />
//                       </div>
//                       <div className="col-lg-6 col-md-6 mb-4">
//                         <label className="d-block mb-2">Postal Code</label>
//                         <input
//                           type="text"
//                           name="CPINCODE"
//                           value={customer.CPINCODE}
//                           onChange={handleInputChange}
//                           className="w-100 p-2"
//                           style={{ 
//                             background: 'transparent',
//                             borderBottom: '1px solid #eee',
//                             outline: 'none'
//                           }}
//                         />
//                       </div>
//                       <div className="col-lg-6 col-md-6 mb-4">
//                         <label className="d-block mb-2">New Password</label>
//                         <input
//                           type="password"
//                           name="password"
//                           value={customer.password}
//                           onChange={handleInputChange}
//                           className="w-100 p-2"
//                           style={{ 
//                             background: 'transparent',
//                             borderBottom: '1px solid #eee',
//                             outline: 'none'
//                           }}
//                         />
//                       </div>
//                       <div className="col-lg-6 col-md-6 mb-4">
//                         <label className="d-block mb-2">Confirm Password</label>
//                         <input
//                           type="password"
//                           name="confirmPassword"
//                           value={customer.confirmPassword}
//                           onChange={handleInputChange}
//                           className="w-100 p-2"
//                           style={{ 
//                             background: 'transparent',
//                             borderBottom: '1px solid #eee',
//                             outline: 'none'
//                           }}
//                         />
//                       </div>
//                     </div>

//                     <div className="mt-4">
//                       <button 
//                         type="submit" 
//                         className="w-100 py-2"
//                         style={{ 
//                           backgroundColor: '#3f51b5', 
//                           color: 'white',
//                           border: 'none',
//                           borderRadius: '4px',
//                           cursor: 'pointer'
//                         }}
//                       >
//                         Update Profile
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </LayoutOne>
//     </Fragment>
//   );
// };

// export default MyAccount;


















//important 
// import { Fragment, useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import SEO from "../../components/seo";
// import LayoutOne from "../../layouts/LayoutOne";
// import axios from 'axios';
// import { BASE_URL } from "../../config";

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
//     confirmPassword: ""
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();
//   const customerinfo = JSON.parse(localStorage.getItem('customerinfo'));
//   const customerId = customerinfo?.id;

//   if (!customerId) {
//     navigate("/login-register");
//   }

//   useEffect(() => {
//     const fetchCustomerData = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/getcustomerbyid/${customerId}`, {
//           headers: {
//             "Content-Type": "application/json"
//           }
//         });

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
//           password: "",
//           confirmPassword: ""
//         });
//       } catch (error) {
//         console.error('Failed to fetch customer data:', error);
//         if (error.response) {
//           console.error('Response data:', error.response.data);
//           console.error('Response status:', error.response.status);
//         }
//       }
//     };

//     fetchCustomerData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCustomer(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (customer.password && customer.password !== customer.confirmPassword) {
//       setError("Passwords don't match");
//       return;
//     }

//     try {
//       const updateData = {
//         FNAME: customer.FNAME,
//         LNAME: customer.LNAME,
//         email: customer.email,
//         MOBILE: customer.MOBILE,
//         CADDRESSLINE1: customer.CADDRESSLINE1,
//         CCITY: customer.CCITY,
//         CSTATE: customer.CSTATE,
//         CCOUNTRY: customer.CCOUNTRY,
//         CDISTRICT: customer.CDISTRICT,
//         CPINCODE: customer.CPINCODE,
//         customerId,
//       };

//       if (customer.password) {
//         updateData.password = customer.password;
//       }

//       const response = await axios.put(`${BASE_URL}/updateCustomerInfo`, updateData, {
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });

//       const data = await response.data;
//       if (response.status === 200) {
//         setCustomer(prev => ({ ...prev, password: "", confirmPassword: "" }));
//         setSuccess(data.message);
//       } else {
//         setError(data.message);
//       }

//     } catch (error) {
//       console.error(error.response?.data?.message || 'Update failed');
//       setError(error.response?.data?.message);
//     }
//   };

//   return (
//     <Fragment>
//       <SEO titleTemplate="My Account" description="My Account page" />
//       <LayoutOne headerTop="visible">
//         <div className="myaccount-area" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 0' }}>
//           <div className="container">
//             <div className="row">
//               {/* Left Column: Account Form */}
//               <div className="col-lg-8 col-md-12 mb-4">
//                 <div className="myaccount-wrapper">
//                   {error && <p style={{ color: "red" }}>{error}</p>}
//                   {success && <p style={{ color: "green" }}>{success}</p>}
//                   <form onSubmit={handleSubmit}>
//                     <h4 className="mb-4" style={{ fontWeight: '500' }}>Account Information</h4>

//                     <div className="row">
//                       {/* First Name */}
//                       <div className="col-lg-6 col-md-6 mb-4">
//                         <label className="d-block mb-2">First Name</label>
//                         <input
//                           type="text"
//                           name="FNAME"
//                           value={customer.FNAME}
//                           onChange={handleInputChange}
//                           className="w-100 p-2"
//                           style={{ background: 'transparent', borderBottom: '1px solid #eee', outline: 'none' }}
//                         />
//                       </div>

//                       {/* Last Name */}
//                       <div className="col-lg-6 col-md-6 mb-4">
//                         <label className="d-block mb-2">Last Name</label>
//                         <input
//                           type="text"
//                           name="LNAME"
//                           value={customer.LNAME}
//                           onChange={handleInputChange}
//                           className="w-100 p-2"
//                           style={{ background: 'transparent', borderBottom: '1px solid #eee', outline: 'none' }}
//                         />
//                       </div>

//                       {/* Email */}
//                       <div className="col-lg-6 col-md-6 mb-4">
//                         <label className="d-block mb-2">Email</label>
//                         <input
//                           type="email"
//                           name="email"
//                           value={customer.email}
//                           onChange={handleInputChange}
//                           disabled
//                           className="w-100 p-2"
//                           style={{ background: 'transparent', borderBottom: '1px solid #eee', outline: 'none', color: '#777' }}
//                         />
//                       </div>

//                       {/* Phone */}
//                       <div className="col-lg-6 col-md-6 mb-4">
//                         <label className="d-block mb-2">Phone</label>
//                         <input
//                           type="text"
//                           name="MOBILE"
//                           value={customer.MOBILE}
//                           onChange={handleInputChange}
//                           className="w-100 p-2"
//                           style={{ background: 'transparent', borderBottom: '1px solid #eee', outline: 'none' }}
//                         />
//                       </div>

//                       {/* Address */}
//                       <div className="col-lg-6 col-md-6 mb-4">
//                         <label className="d-block mb-2">Address</label>
//                         <input
//                           type="text"
//                           name="CADDRESSLINE1"
//                           value={customer.CADDRESSLINE1}
//                           onChange={handleInputChange}
//                           className="w-100 p-2"
//                           style={{ background: 'transparent', borderBottom: '1px solid #eee', outline: 'none' }}
//                         />
//                       </div>

//                       {/* City */}
//                       <div className="col-lg-6 col-md-6 mb-4">
//                         <label className="d-block mb-2">City</label>
//                         <input
//                           type="text"
//                           name="CCITY"
//                           value={customer.CCITY}
//                           onChange={handleInputChange}
//                           className="w-100 p-2"
//                           style={{ background: 'transparent', borderBottom: '1px solid #eee', outline: 'none' }}
//                         />
//                       </div>

//                       {/* State */}
//                       <div className="col-lg-6 col-md-6 mb-4">
//                         <label className="d-block mb-2">State</label>
//                         <input
//                           type="text"
//                           name="CSTATE"
//                           value={customer.CSTATE}
//                           onChange={handleInputChange}
//                           className="w-100 p-2"
//                           style={{ background: 'transparent', borderBottom: '1px solid #eee', outline: 'none' }}
//                         />
//                       </div>

//                       {/* Country */}
//                       <div className="col-lg-6 col-md-6 mb-4">
//                         <label className="d-block mb-2">Country</label>
//                         <input
//                           type="text"
//                           name="CCOUNTRY"
//                           value={customer.CCOUNTRY}
//                           onChange={handleInputChange}
//                           className="w-100 p-2"
//                           style={{ background: 'transparent', borderBottom: '1px solid #eee', outline: 'none' }}
//                         />
//                       </div>

//                       {/* Postal Code */}
//                       <div className="col-lg-6 col-md-6 mb-4">
//                         <label className="d-block mb-2">Postal Code</label>
//                         <input
//                           type="text"
//                           name="CPINCODE"
//                           value={customer.CPINCODE}
//                           onChange={handleInputChange}
//                           className="w-100 p-2"
//                           style={{ background: 'transparent', borderBottom: '1px solid #eee', outline: 'none' }}
//                         />
//                       </div>

//                       {/* New Password */}
//                       <div className="col-lg-6 col-md-6 mb-4">
//                         <label className="d-block mb-2">New Password</label>
//                         <input
//                           type="password"
//                           name="password"
//                           value={customer.password}
//                           onChange={handleInputChange}
//                           className="w-100 p-2"
//                           style={{ background: 'transparent', borderBottom: '1px solid #eee', outline: 'none' }}
//                         />
//                       </div>

//                       {/* Confirm Password */}
//                       <div className="col-lg-6 col-md-6 mb-4">
//                         <label className="d-block mb-2">Confirm Password</label>
//                         <input
//                           type="password"
//                           name="confirmPassword"
//                           value={customer.confirmPassword}
//                           onChange={handleInputChange}
//                           className="w-100 p-2"
//                           style={{ background: 'transparent', borderBottom: '1px solid #eee', outline: 'none' }}
//                         />
//                       </div>
//                     </div>

//                     {/* Submit Button */}
//                     <div className="mt-4">
//                       <button
//                         type="submit"
//                         className="w-100 py-2"
//                         style={{
//                           backgroundColor: '#3f51b5',
//                           color: 'white',
//                           border: 'none',
//                           borderRadius: '4px',
//                           cursor: 'pointer'
//                         }}
//                       >
//                         Update Profile
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>

//               {/* Right Column: Orders Link */}
//               <div className="col-lg-4 col-md-12">
//                 <div
//                   style={{
//                     backgroundColor: "#f7f7f7",
//                     padding: "1.5rem",
//                     borderRadius: "8px",
//                     boxShadow: "0 0 10px rgba(0,0,0,0.05)"
//                   }}
//                 >
//                   <h5 style={{ marginBottom: "1rem" }}>My Account</h5>
//                   <ul style={{ listStyle: "none", padding: 0 }}>
//                     <li>
//                       <button
//                         onClick={() => navigate('/myorder')}
//                         style={{
//                           background: "none",
//                           border: "none",
//                           color: "#3f51b5",
//                           padding: 0,
//                           cursor: "pointer",
//                           fontSize: "16px",
//                           textDecoration: "underline"
//                         }}
//                       >
//                         View Orders
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>
//       </LayoutOne>
//     </Fragment>
//   );
// };

// export default MyAccount;



//v v important
import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import axios from 'axios';
import { BASE_URL } from "../../config";

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
    confirmPassword: ""
  });
   const [items, setItems] = useState([
    { item: "", description: "", quantity: 0, price: 0 },
  ]);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);

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
  const total = subtotal + shipping + (subtotal * tax) / 100 - (subtotal * discount) / 100;

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [viewOrders, setViewOrders] = useState(false); // <-- New state to toggle views

  const navigate = useNavigate();
  const customerinfo = JSON.parse(localStorage.getItem('customerinfo'));
  const customerId = customerinfo?.id;

  if (!customerId) {
    navigate("/login-register");
  }

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getcustomerbyid/${customerId}`, {
          headers: {
            "Content-Type": "application/json"
          }
        });

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
          password: "",
          confirmPassword: ""
        });
      } catch (error) {
        console.error('Failed to fetch customer data:', error);
      }
    };

    fetchCustomerData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (customer.password && customer.password !== customer.confirmPassword) {
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

      if (customer.password) {
        updateData.password = customer.password;
      }

      const response = await axios.put(`${BASE_URL}/updateCustomerInfo`, updateData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = response.data;
      if (response.status === 200) {
        setCustomer(prev => ({ ...prev, password: "", confirmPassword: "" }));
        setSuccess(data.message);
      } else {
        setError(data.message);
      }

    } catch (error) {
      console.error(error.response?.data?.message || 'Update failed');
      setError(error.response?.data?.message);
    }
  };

  return (
    <Fragment>
      <SEO titleTemplate="My Account" description="My Account page" />
      <LayoutOne headerTop="visible">
        <div className="myaccount-area" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 0' }}>
          <div className="container">
            <div className="row">
              {/* Left Column: Dynamic Content */}
              <div className="col-lg-8 col-md-12 mb-4">
                <div className="myaccount-wrapper">
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  {success && <p style={{ color: "green" }}>{success}</p>}

                  {!viewOrders ? (
                    <form onSubmit={handleSubmit}>
                      <h4 className="mb-4" style={{ fontWeight: '500' }}>Account Information</h4>
                      <div className="row">
                        {/* First Name */}
                        <div className="col-lg-6 mb-4">
                          <label className="d-block mb-2">First Name</label>
                          <input type="text" name="FNAME" value={customer.FNAME} onChange={handleInputChange} className="w-100 p-2" style={inputStyle} />
                        </div>

                        {/* Last Name */}
                        <div className="col-lg-6 mb-4">
                          <label className="d-block mb-2">Last Name</label>
                          <input type="text" name="LNAME" value={customer.LNAME} onChange={handleInputChange} className="w-100 p-2" style={inputStyle} />
                        </div>

                        {/* Email */}
                        <div className="col-lg-6 mb-4">
                          <label className="d-block mb-2">Email</label>
                          <input type="email" name="email" value={customer.email} disabled className="w-100 p-2" style={{ ...inputStyle, color: '#777' }} />
                        </div>

                        {/* Phone */}
                        <div className="col-lg-6 mb-4">
                          <label className="d-block mb-2">Phone</label>
                          <input type="text" name="MOBILE" value={customer.MOBILE} onChange={handleInputChange} className="w-100 p-2" style={inputStyle} />
                        </div>

                        {/* Address */}
                        <div className="col-lg-6 mb-4">
                          <label className="d-block mb-2">Address</label>
                          <input type="text" name="CADDRESSLINE1" value={customer.CADDRESSLINE1} onChange={handleInputChange} className="w-100 p-2" style={inputStyle} />
                        </div>

                        {/* City */}
                        <div className="col-lg-6 mb-4">
                          <label className="d-block mb-2">City</label>
                          <input type="text" name="CCITY" value={customer.CCITY} onChange={handleInputChange} className="w-100 p-2" style={inputStyle} />
                        </div>

                        {/* State */}
                        <div className="col-lg-6 mb-4">
                          <label className="d-block mb-2">State</label>
                          <input type="text" name="CSTATE" value={customer.CSTATE} onChange={handleInputChange} className="w-100 p-2" style={inputStyle} />
                        </div>

                        {/* Country */}
                        <div className="col-lg-6 mb-4">
                          <label className="d-block mb-2">Country</label>
                          <input type="text" name="CCOUNTRY" value={customer.CCOUNTRY} onChange={handleInputChange} className="w-100 p-2" style={inputStyle} />
                        </div>

                        {/* Postal Code */}
                        <div className="col-lg-6 mb-4">
                          <label className="d-block mb-2">Postal Code</label>
                          <input type="text" name="CPINCODE" value={customer.CPINCODE} onChange={handleInputChange} className="w-100 p-2" style={inputStyle} />
                        </div>

                        {/* Password */}
                        <div className="col-lg-6 mb-4">
                          <label className="d-block mb-2">New Password</label>
                          <input type="password" name="password" value={customer.password} onChange={handleInputChange} className="w-100 p-2" style={inputStyle} />
                        </div>

                        {/* Confirm Password */}
                        <div className="col-lg-6 mb-4">
                          <label className="d-block mb-2">Confirm Password</label>
                          <input type="password" name="confirmPassword" value={customer.confirmPassword} onChange={handleInputChange} className="w-100 p-2" style={inputStyle} />
                        </div>
                      </div>

                      <div className="mt-4">
                        <button type="submit" className="w-100 py-2" style={buttonStyle}>Update Profile</button>
                      </div>
                    </form>
                  ) : (
                    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem" }}>
         <h3>Bill To</h3>
       <form>
         <div className="row">
           {["Name", "Email", "Address", "Phone"].map((label, idx) => (
            <div className="col-md-6 mb-3" key={idx}>
              <input
                type="text"
                placeholder={label}
                className="w-100 p-2"
                style={{
                  background: "transparent",
                  borderBottom: "1px solid #ccc",
                  outline: "none",
                }}
              />
            </div>
          ))}
        </div>
        <h3 className="mt-4">Payment Details</h3>
        <div className="row">
          {["Account Number", "Bank Name", "IFSC Code", "SWIFT Code"].map(
            (label, idx) => (
              <div className="col-md-6 mb-3" key={idx}>
                <input
                  type="text"
                  placeholder={label}
                  className="w-100 p-2"
                  style={{
                    background: "transparent",
                    borderBottom: "1px solid #ccc",
                    outline: "none",
                  }}
                />
              </div>
            )
          )}
        </div>
        <h3 className="mt-4">Item Details</h3>
        {items.map((item, index) => (
          <div className="row mb-3" key={index}>
            <div className="col-md-3 mb-2">
              <input
                type="text"
                placeholder="Item"
                value={item.item}
                onChange={(e) =>
                  handleItemChange(index, "item", e.target.value)
                }
                className="w-100 p-2"
                style={{
                  borderBottom: "1px solid #ccc",
                  background: "transparent",
                  outline: "none",
                }}
              />
            </div>
            <div className="col-md-3 mb-2">
              <input
                type="text"
                placeholder="Description"
                value={item.description}
                onChange={(e) =>
                  handleItemChange(index, "description", e.target.value)
                }
                className="w-100 p-2"
                style={{
                  borderBottom: "1px solid #ccc",
                  background: "transparent",
                  outline: "none",
                }}
              />
            </div>
            <div className="col-md-2 mb-2">
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", parseInt(e.target.value) || 0)
                }
                className="w-100 p-2"
                style={{
                  borderBottom: "1px solid #ccc",
                  background: "transparent",
                  outline: "none",
                }}
              />
            </div>
            <div className="col-md-2 mb-2">
              <input
                type="number"
                value={item.price}
                onChange={(e) =>
                  handleItemChange(index, "price", parseFloat(e.target.value) || 0)
                }
                className="w-100 p-2"
                style={{
                  borderBottom: "1px solid #ccc",
                  background: "transparent",
                  outline: "none",
                }}
              />
            </div>
            <div className="col-md-2 mb-2 d-flex align-items-center">
              <button
                type="button"
                onClick={() => removeItem(index)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                ✖
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="mb-4"
          style={{
            backgroundColor: "#3f51b5",
            color: "white",
            border: "none",
            padding: "0.5rem 1.2rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Item
        </button>
        <h4 className="mt-4">Summary</h4>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label>Tax (%)</label>
            <input
              type="number"
              value={tax}
              onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
              className="w-100 p-2"
              style={{
                borderBottom: "1px solid #ccc",
                background: "transparent",
                outline: "none",
              }}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Discount (%)</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
              className="w-100 p-2"
              style={{
                borderBottom: "1px solid #ccc",
                background: "transparent",
                outline: "none",
              }}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Shipping ($)</label>
            <input
              type="number"
              value={shipping}
              onChange={(e) => setShipping(parseFloat(e.target.value) || 0)}
              className="w-100 p-2"
              style={{
                borderBottom: "1px solid #ccc",
                background: "transparent",
                outline: "none",
              }}
            />
          </div>
        </div>
        <div className="text-end mt-4">
          <h6>Subtotal: ${subtotal.toFixed(2)}</h6>
          <h5 style={{ fontWeight: "bold", color: "#007bff" }}>
            Grand Total: ${total.toFixed(2)}
          </h5>
        </div>
      </form>
    </div>
                  )}
                </div>
              </div>

              {/* Right Column: View Orders Toggle */}
              <div className="col-lg-4 col-md-12">
                <div style={sidebarStyle}>
                  <h5 style={{ marginBottom: "1rem" }}>My Account</h5>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    <li>
                      <button
                        onClick={() => setViewOrders(!viewOrders)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#3f51b5",
                          padding: 0,
                          cursor: "pointer",
                          fontSize: "16px",
                          textDecoration: "underline"
                        }}
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
  background: 'transparent',
  borderBottom: '1px solid #eee',
  outline: 'none'
};

const buttonStyle = {
  backgroundColor: '#3f51b5',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const sidebarStyle = {
  backgroundColor: "#f7f7f7",
  padding: "1.5rem",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0,0,0,0.05)"
};

export default MyAccount;
