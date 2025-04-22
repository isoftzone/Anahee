import { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import axios from 'axios';
import { BASE_URL } from "../../config";
import { useNavigate } from 'react-router-dom';

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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
          CPINCODE: data.CPINCODE || ""
        });
      } catch (error) {
        console.error('Failed to fetch customer data:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
        }
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
      console.log('response 11',response);
      const data = await response.data;
      if (response.status === 200) {
        setCustomer(prev => ({ ...prev, password: "", confirmPassword: "" }));
        setSuccess(data.message);
      }else{
        setError(data.message);
      }
  
    } catch (error) {
      console.error(error.response?.data?.message || 'Update failed');
      setError(error.response?.data?.message);
    }
  };
  
  return (
    <Fragment>
      <SEO
        titleTemplate="My Account"
        description="My Account page"
      />
      <LayoutOne headerTop="visible">
        <div className="myaccount-area" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="myaccount-wrapper">
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  {success && <p style={{ color: "green" }}>{success}</p>}
                  <form onSubmit={handleSubmit}>
                    <h4 className="mb-4" style={{ fontWeight: '500' }}>Account Information</h4>
                    
                    <div className="row">
                      <div className="col-lg-6 col-md-6 mb-4">
                        <label className="d-block mb-2">First Name</label>
                        <input
                          type="text"
                          name="FNAME"
                          value={customer.FNAME}
                          onChange={handleInputChange}
                          className="w-100 p-2"
                          style={{ 
                            background: 'transparent',
                            borderBottom: '1px solid #eee',
                            outline: 'none'
                          }}
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 mb-4">
                        <label className="d-block mb-2">Last Name</label>
                        <input
                          type="text"
                          name="LNAME"
                          value={customer.LNAME}
                          onChange={handleInputChange}
                          className="w-100 p-2"
                          style={{ 
                            background: 'transparent',
                            borderBottom: '1px solid #eee',
                            outline: 'none'
                          }}
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 mb-4">
                        <label className="d-block mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={customer.email}
                          onChange={handleInputChange}
                          disabled
                          className="w-100 p-2"
                          style={{ 
                            background: 'transparent',
                            borderBottom: '1px solid #eee',
                            outline: 'none',
                            color: '#777'
                          }}
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 mb-4">
                        <label className="d-block mb-2">Phone</label>
                        <input
                          type="text"
                          name="MOBILE"
                          value={customer.MOBILE}
                          onChange={handleInputChange}
                          className="w-100 p-2"
                          style={{ 
                            background: 'transparent',
                            borderBottom: '1px solid #eee',
                            outline: 'none'
                          }}
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 mb-4">
                        <label className="d-block mb-2">Address</label>
                        <input
                          type="text"
                          name="CADDRESSLINE1"
                          value={customer.CADDRESSLINE1}
                          onChange={handleInputChange}
                          className="w-100 p-2"
                          style={{ 
                            background: 'transparent',
                            borderBottom: '1px solid #eee',
                            outline: 'none'
                          }}
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 mb-4">
                        <label className="d-block mb-2">City</label>
                        <input
                          type="text"
                          name="CCITY"
                          value={customer.CCITY}
                          onChange={handleInputChange}
                          className="w-100 p-2"
                          style={{ 
                            background: 'transparent',
                            borderBottom: '1px solid #eee',
                            outline: 'none'
                          }}
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 mb-4">
                        <label className="d-block mb-2">State</label>
                        <input
                          type="text"
                          name="CSTATE"
                          value={customer.CSTATE}
                          onChange={handleInputChange}
                          className="w-100 p-2"
                          style={{ 
                            background: 'transparent',
                            borderBottom: '1px solid #eee',
                            outline: 'none'
                          }}
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 mb-4">
                        <label className="d-block mb-2">Country</label>
                        <input
                          type="text"
                          name="CCOUNTRY"
                          value={customer.CCOUNTRY}
                          onChange={handleInputChange}
                          className="w-100 p-2"
                          style={{ 
                            background: 'transparent',
                            borderBottom: '1px solid #eee',
                            outline: 'none'
                          }}
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 mb-4">
                        <label className="d-block mb-2">Postal Code</label>
                        <input
                          type="text"
                          name="CPINCODE"
                          value={customer.CPINCODE}
                          onChange={handleInputChange}
                          className="w-100 p-2"
                          style={{ 
                            background: 'transparent',
                            borderBottom: '1px solid #eee',
                            outline: 'none'
                          }}
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 mb-4">
                        <label className="d-block mb-2">New Password</label>
                        <input
                          type="password"
                          name="password"
                          value={customer.password}
                          onChange={handleInputChange}
                          className="w-100 p-2"
                          style={{ 
                            background: 'transparent',
                            borderBottom: '1px solid #eee',
                            outline: 'none'
                          }}
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 mb-4">
                        <label className="d-block mb-2">Confirm Password</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={customer.confirmPassword}
                          onChange={handleInputChange}
                          className="w-100 p-2"
                          style={{ 
                            background: 'transparent',
                            borderBottom: '1px solid #eee',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <button 
                        type="submit" 
                        className="w-100 py-2"
                        style={{ 
                          backgroundColor: '#3f51b5', 
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Update Profile
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default MyAccount;