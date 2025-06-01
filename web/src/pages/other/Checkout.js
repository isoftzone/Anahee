import { Fragment, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axios from "axios";
import { BASE_URL } from "./../../config";
import { deleteAllFromCart } from "../../store/slices/cart-slice";

const Checkout = () => {
  let cartTotalPrice = 0;
  const dispatch = useDispatch();
  let { pathname } = useLocation();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
    phone: "",
    // email: "",
    paymentMethod: "COD",
  });
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [customerId, setCustomerId] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [editErrors, setEditErrors] = useState({});
  const [activeForm, setActiveForm] = useState(null);
  const [editTouched, setEditTouched] = useState({});
  const [paymentError, setPaymentError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(true);
  const [discount, setDiscount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // Show popup for 3 seconds
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
        if (isSuccess) {
          navigate("/orders");
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup, isSuccess, navigate]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://mercury.phonepe.com/web/bundle/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const couponCode = params.get("couponCode");

  useEffect(() => {
    if (couponCode) {
      const applyCoupon = async () => {
        try {
          const response = await axios.post(`${BASE_URL}/applycoupon`, {
            coupon_code: couponCode,
            cart_total: cartTotalPrice.toFixed(2),
          });
          if (response.data.success) {
            setDiscount(response.data.discount);
          }
        } catch (err) {
          console.error("Coupon re-validation failed", err);
        }
      };
      applyCoupon();
    }
  }, [couponCode, cartTotalPrice]);

  useEffect(() => {
    const customerData = JSON.parse(localStorage.getItem("customerinfo"));
    if (!customerData || !customerData.id) {
      setShowModal(true); // Show the modal
    } else {
      setCustomerId(customerData.id);
    }
    const fetchCountries = async () => {
      try {
        const res = await axios.get(
          "https://countriesnow.space/api/v0.1/countries/positions"
        );
        if (res.data && res.data.data) {
          setCountries(res.data.data.map((c) => c.name));
        }
      } catch (err) {
        console.error("Failed to fetch countries:", err);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchAddresses = (customerId) => {
      axios
        .get(`${BASE_URL}/getcustomeraddress/${customerId}`)
        .then((res) => {
          const mappedData = res.data.map((addr) => ({
            firstName: addr.fname,
            lastName: addr.lname,
            companyName: addr.companyName || "",
            country: addr.country,
            address: addr.address,
            city: addr.city,
            state: addr.state,
            postcode: addr.postal_code,
            phone: addr.mobile,
            email: addr.email,
            description: addr.description,
            primary_address: addr.primary_address,
            id: addr.id,
            customer_id: addr.customer_id,
          }));
          setData(mappedData);
        })
        .catch((err) => console.error("API Error:", err));
    };

    if (customerId) {
      fetchAddresses(customerId);
    }
  }, [customerId]);

  // Fetch states on country change
  useEffect(() => {
    if (formData.country || editItem?.country) {
      const fetchStates = async () => {
        try {
          const res = await axios.post(
            "https://countriesnow.space/api/v0.1/countries/states",
            { country: formData.country || editItem?.country }
          );
          setStates(res.data.data.states || []);
          setFormData((prev) => ({ ...prev, state: "", city: "" }));
          setCities([]);
        } catch (err) {
          console.error("Failed to fetch states:", err);
        }
      };
      fetchStates();
    }
  }, [formData.country,editItem?.country]);

  // Fetch cities on state change
  useEffect(() => {
    if (formData.country && formData.state || editItem?.country && editItem?.state) {
      const fetchCities = async () => {
        try {
          const res = await axios.post(
            "https://countriesnow.space/api/v0.1/countries/state/cities",
            {
              country: formData.country || editItem?.country,
              state: formData.state || editItem?.state,
            }
          );
          setCities(res.data.data || []);
          setFormData((prev) => ({ ...prev, city: "" }));
        } catch (err) {
          console.error("Failed to fetch cities:", err);
        }
      };
      fetchCities();
    }
  }, [formData.state,editItem?.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Only validate if we're in add mode
    if (activeForm === "add") {
      setTouched((prev) => ({ ...prev, [name]: true }));
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  // Update handleValidation to be more concise:

  const handleValidation = (formValues, formType = activeForm) => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formValues).forEach((key) => {
      if (["companyName", "description", "paymentMethod", "id"].includes(key))
        return;

      const error = validateField(key, formValues[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    if (formType === "add") {
      setErrors(newErrors);
    } else {
      setEditErrors(newErrors);
    }

    return isValid;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!touched[name]) {
      setTouched((prev) => ({ ...prev, [name]: true }));
    }
    validateField(name, value);
  };

  const validateField = (name, value) => {
    if (["companyName", "description", "paymentMethod", "id"].includes(name)) {
      return ""; // No validation for optional fields
    }

    const trimmedValue = value ? value.toString().trim() : "";

    switch (name) {
      case "firstName":
        if (!trimmedValue) return "First name is required";
        if (trimmedValue.length < 2)
          return "First name must be at least 2 characters";
        break;
      case "lastName":
        if (!trimmedValue) return "Last name is required";
        if (trimmedValue.length < 2)
          return "Last name must be at least 2 characters";
        break;
      case "address":
        if (!trimmedValue) return "Address is required";
        if (trimmedValue.length < 5)
          return "Address must be at least 5 characters";
        break;
      case "city":
        if (!trimmedValue) return "City is required";
        break;
      case "country":
        if (!trimmedValue) return "Country is required";
        break;
      case "state":
        if (!trimmedValue) return "State is required";
        break;
      case "postcode":
        if (!trimmedValue) return "Postal code is required";
        if (!/^[0-9]{6}$/.test(trimmedValue))
          return "Postal code must be 6 digits";
        break;
      case "phone":
        if (!trimmedValue) return "Phone is required";
        if (!/^[0-9]{10,15}$/.test(trimmedValue))
          return "Phone number must be 10-15 digits";
        break;
      default:
        break;
    }

    return "";
  };

  const togglePayment = () => {
    setIsPaymentOpen(!isPaymentOpen);
  };

  const handlePaymentMethodChange = (method) => {
    setFormData((prevData) => ({
      ...prevData,
      paymentMethod: method,
    }));
    // Clear payment error when user changes payment method
    setPaymentError("");
  };

  const phonePeCallback = (response, orderId) => {
    setIsLoading(false);

    if (response === "USER_CANCEL") {
      setPaymentError(
        "Payment was cancelled. Please choose a payment method to continue."
      );
      // Reset order state so user can try again
      setOrderPlaced(false);
    } else if (response === "CONCLUDED") {
      verifyPaymentStatus(orderId);
    } else {
      setPaymentError(
        "Payment failed. Please try again or choose a different payment method."
      );
      setOrderPlaced(false);
    }
  };

  const verifyPaymentStatus = async (orderId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/order-status/${orderId}`
      );
      if (response.data.success) {
        const paymentDetail = response.data.data.paymentDetails[0];

        const splitInstrument = paymentDetail?.splitInstruments[0];

        const updateData = {
          merchant_order_id: response?.data?.data?.orderId,
          payment_mode: "PAID",
          provider_reference_id: splitInstrument?.rail?.utr,
          phonepe_status: response?.data?.data?.state,
          payment_status: paymentDetail?.state,
          transaction_id: paymentDetail?.transactionId,
          saleId: orderId, // Assuming you have orderId in state
        };
        console.log("updateData,updateData", updateData);
        await axios.put(`${BASE_URL}/updateSalesMaster`, updateData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setIsSuccess(true);
        setShowPopup(true);
        resetForm();
      } else {
        setIsSuccess(false);
        setShowPopup(true);
        setPaymentError("Payment verification failed. Please contact support.");
        setOrderPlaced(false);
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      setIsSuccess(false);
      setShowPopup(true);
      setPaymentError(
        "There was an error verifying your payment. Please contact support."
      );
      setOrderPlaced(false);
    }
  };

  const initiatePhonePePayment = async (orderId) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/api/create-order`, {
        orderId: orderId,
        amountInPaisa: (cartTotalPrice - discount) * 100,
        customerPhone: formData.phone || "0000000000",
        redirectUrl: window.location.origin + "/orders",
        expireAfter: 1200,
        metaInfo: {
          udf1: "Additional Info 1",
          udf2: "Additional Info 2",
        },
      });

      if (response.data.success && response.data.data.redirectUrl) {
        if (window.PhonePeCheckout && window.PhonePeCheckout.transact) {
          window.PhonePeCheckout.transact({
            tokenUrl: response.data.data.redirectUrl,
            callback: (resp) => phonePeCallback(resp, orderId),
            type: "IFRAME",
          });
        } else {
          setPaymentError("PhonePe checkout is not ready. Please try again.");
          setIsLoading(false);
          setOrderPlaced(false);
        }
      } else {
        setPaymentError(
          "Failed to initiate PhonePe payment. Please try again."
        );
        setIsLoading(false);
        setOrderPlaced(false);
      }
    } catch (error) {
      console.error("Error initiating PhonePe payment:", error);
      setPaymentError(
        "There was an error initiating PhonePe payment. Please try again."
      );
      setIsLoading(false);
      setOrderPlaced(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      companyName: "",
      country: "",
      address: "",
      apartment: "",
      message: "",
      city: "",
      state: "",
      postcode: "",
      phone: "",
      // email: "",
      paymentMethod: "COD",
    });
    setErrors({});
    setTouched({});
    setOrderId("");
    dispatch(deleteAllFromCart()); // Clear cart items
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous payment errors
    setPaymentError("");

    // 🔍 Find the primary address from address list
    const primaryAddress = data.find((addr) => addr.primary_address === 1);

    if (!primaryAddress) {
      alert("Please set a primary address before placing the order.");
      return;
    }

    const orderData = {
      firstName: primaryAddress.fname,
      lastName: primaryAddress.lname,
      // email: primaryAddress.email,
      phone: primaryAddress.mobile,
      address: primaryAddress.address,
      city: primaryAddress.city,
      state: primaryAddress.state,
      country: primaryAddress.country,
      postcode: primaryAddress.postal_code,
      description: primaryAddress.description,
      discount,
      customerId,
      amount: cartTotalPrice - discount,
      payment_mode: "COD",
      payment_status: "PENDING",
      coupon_code: discount > 0 ? couponCode : "",
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${BASE_URL}/addSalesMaster`,
        orderData
      );

      if (response.data.success) {
        const saleId = String(response.data.saleId);
        setOrderId(saleId);
        setOrderPlaced(true);

        if (formData.paymentMethod === "PAID") {
          await initiatePhonePePayment(saleId);
        } else {
          // For COD, show success popup
          setIsSuccess(true);
          setShowPopup(true);
          setIsLoading(false);
          resetForm();
        }
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setIsSuccess(false);
      setShowPopup(true);
      setIsLoading(false);
      setOrderPlaced(false);
    }
  };

  const retryPayment = () => {
    if (orderId && formData.paymentMethod === "PAID") {
      setPaymentError("");
      initiatePhonePePayment(orderId);
    }
  };

  cartItems.forEach((cartItem) => {
    const discountedPrice = getDiscountPrice(cartItem.price, cartItem.discount);
    const finalProductPrice = (cartItem.price * currency.currencyRate).toFixed(
      2
    );
    const finalDiscountedPrice = (
      discountedPrice * currency.currencyRate
    ).toFixed(2);

    discountedPrice != null
      ? (cartTotalPrice += finalDiscountedPrice * cartItem.quantity)
      : (cartTotalPrice += finalProductPrice * cartItem.quantity);
  });
  const handleUpdate = async (e) => {
    e.preventDefault();
    e.preventDefault();
    setActiveForm("edit"); // Ensure we're validating the edit form

    // Mark all fields as touched
    const allTouched = {};
    Object.keys(editItem).forEach((key) => {
      allTouched[key] = true;
    });
    setEditTouched(allTouched);

    if (!handleValidation(editItem, "edit")) return;

    try {
      await axios.put(`${BASE_URL}/updatecustomeraddress`, {
        ...editItem,
        customer_id: customerId,
        primary_address: editItem.primary_address || 0,
      });
      alert("Address updated successfully");
      setData((prevData) =>
        prevData.map((item) => (item.id === editItem.id ? editItem : item))
      );
      setEditIndex(null);
    } catch (err) {
      alert("Update failed: " + (err.response?.data?.msg || err.message));
    }
  };

  const handleMakePrimary = async (addressId) => {
    const itemToUpdate = data.find((item) => item.id === addressId);
    if (!itemToUpdate) return alert("Address not found");
    try {
      await axios.put(`${BASE_URL}/updatecustomeraddress`, {
        ...itemToUpdate,
        id: addressId,
        customer_id: customerId,
        primary_address: 1,
      });
      setData((prevData) =>
        prevData.map((item) => ({
          ...item,
          primary_address: item.id === addressId ? 1 : 0,
        }))
      );
    } catch (err) {
      alert("Failed to set primary address");
    }
  };
  const handleDelete = async (addressId) => {
    if (!window.confirm("Are you sure you want to delete this address?"))
      return;

    try {
      await axios.delete(`${BASE_URL}/deletecustomeraddress/${addressId}`);
      alert("Address deleted successfully");
      setData((prevData) =>
        prevData.filter((address) => address.id !== addressId)
      );
    } catch (err) {
      alert("Failed to delete address");
      console.error(err);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditItem((prev) => ({ ...prev, [name]: value }));

    // Only validate if we're in edit mode
    if (activeForm === "edit") {
      setEditTouched((prev) => ({ ...prev, [name]: true }));
      setEditErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleEditClick = (item, index) => {
    setEditItem({ ...item });
    setEditIndex(index);
    setActiveForm("edit");
    setShowAddForm(false); // Hide add form if open

    // Initialize touched state
    const initialTouched = Object.keys(item).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});
    setEditTouched(initialTouched);
    setEditErrors({});
  };

  const handleAddClick = () => {
    setShowAddForm(!showAddForm);
    setActiveForm("add");
    setEditIndex(null); // Clear any edit state
  };
  const handleCancelAdd = () => {
    setShowAddForm(false);
    setActiveForm(null);
    setErrors({});
    setTouched({});
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setActiveForm(null);
    setEditErrors({});
    setEditTouched({});
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setActiveForm("add");
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    if (!handleValidation(formData, "add")) return;

    try {
      console.log("formData 001", formData);
      await axios.post(`${BASE_URL}/addcustomeraddress`, {
        ...formData,
        customer_id: customerId,
      });
      setData((prevData) => [...prevData, formData]);
      alert("Address added successfully");
      setFormData({
        firstName: "",
        lastName: "",
        companyName: "",
        country: "",
        address: "",
        city: "",
        state: "",
        postcode: "",
        phone: "",
      });
      setErrors({});
      setTouched({});
      setShowAddForm(false);
    } catch (err) {
      alert(
        "Failed to add address: " + (err.response?.data?.msg || err.message)
      );
    }
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Checkout"
        description="Checkout page of Anahee react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* Success/Failure Popup */}
        {showPopup && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.7)",
              zIndex: 9999,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="container py-5"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                className="row justify-content-center"
                style={{ width: "800px" }}
              >
                <div className="col-12 col-sm-10 col-md-8 col-lg-6">
                  <div
                    className="text-center p-4"
                    style={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div
                      className="icon-circle mb-3"
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        backgroundColor: isSuccess ? "#28a745" : "#dc3545",
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "40px",
                        color: "white",
                      }}
                    >
                      <i
                        className={`fa ${isSuccess ? "fa-check" : "fa-close"}`}
                        aria-hidden="true"
                      ></i>
                    </div>
                    <h2
                      className="fs-2"
                      style={{ color: isSuccess ? "#28a745" : "#dc3545" }}
                    >
                      {isSuccess
                        ? "Your order was successful"
                        : "Your order failed"}
                    </h2>
                    <p className="fs-4 mb-0">
                      {isSuccess
                        ? "Thank you for your order. We will be in contact with more details shortly."
                        : "Please try again later or contact support."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="checkout-area pt-10 pb-30">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div>
                <div className="row pb-5">
                  <div className="col-lg-7">
                    <div className="billing-info-wrap">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingBilling">
                          Billing Details
                        </h2>
                      </div>
                    </div>

                    <div
                      className="border rounded p-3 mb-4 mt-4 d-flex align-items-center gap-2"
                      role="button"
                      style={{ cursor: "pointer" }}
                      onClick={handleAddClick}
                    >
                      <i className="bi bi-plus-lg text-primary"></i>
                      <span className="text-primary fw-semibold">
                        {showAddForm
                          ? "HIDE ADDRESS FORM"
                          : "ADD A NEW ADDRESS"}
                      </span>
                    </div>

                    {showAddForm && (
                      <div className="border rounded p-3 mb-4 w-100">
                        <div className="billing-info-wrap">
                          <div className="row">
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info mb-20">
                                <label>First Name *</label>
                                <input
                                  type="text"
                                  name="firstName"
                                  value={formData.firstName}
                                  onChange={handleInputChange}
                                  onBlur={handleBlur}
                                  className={`form-control ${
                                    activeForm === 'add' && errors.firstName &&
                                    touched.firstName
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                {activeForm === 'add' && errors.firstName &&
                                  touched.firstName && (
                                    <div className="invalid-feedback">
                                      {errors.firstName}
                                    </div>
                                  )}
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info mb-20">
                                <label>Last Name *</label>
                                <input
                                  type="text"
                                  name="lastName"
                                  value={formData.lastName}
                                  onChange={handleInputChange}
                                  onBlur={handleBlur}
                                  className={`form-control ${
                                    activeForm === 'add' && errors.lastName && touched.lastName
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                {activeForm === 'add' && errors.lastName &&
                                  touched.lastName && (
                                    <div className="invalid-feedback">
                                      {errors.lastName}
                                    </div>
                                  )}
                              </div>
                            </div>

                            <div className="col-lg-12">
                              <div className="billing-info mb-20">
                                <label>Street Address *</label>
                                <textarea
                                  className={`form-control ${
                                    activeForm === 'add' && errors.address && touched.address
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder="House number and street name"
                                  type="text"
                                  name="address"
                                  value={formData.address}
                                  onChange={handleInputChange}
                                  onBlur={handleBlur}
                                  rows="4"
                                />
                                {activeForm === 'add' && errors.address && touched.address && (
                                  <div className="invalid-feedback">
                                    {errors.address}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="col-lg-12">
                              <div className="billing-select mb-20">
                                <label>Country *</label>
                                <select
                                  name="country"
                                  value={formData.country}
                                  onChange={handleInputChange}
                                  onBlur={handleBlur}
                                  className={`form-control ${
                                    activeForm === 'add' && errors.country && touched.country
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                >
                                  <option value="">Select a country</option>
                                  {countries.map((country, i) => (
                                    <option key={i} value={country}>
                                      {country}
                                    </option>
                                  ))}
                                </select>
                                {activeForm === 'add' && errors.country && touched.country && (
                                  <div className="invalid-feedback">
                                    {errors.country}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="col-lg-12">
                              <div className="billing-select mb-20">
                                <label>State *</label>
                                <select
                                  name="state"
                                  value={formData.state}
                                  onChange={handleInputChange}
                                  onBlur={handleBlur}
                                  disabled={!states.length}
                                  className={`form-control ${
                                   activeForm === 'add' && errors.state && touched.state
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                >
                                  <option value="">Select a state</option>
                                  {states.map((s, i) => (
                                    <option key={i} value={s.name}>
                                      {s.name}
                                    </option>
                                  ))}
                                </select>
                                {activeForm === 'add' && errors.state && touched.state && (
                                  <div className="invalid-feedback">
                                    {errors.state}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="col-lg-12">
                              <div className="billing-select mb-20">
                                <label>City *</label>
                                <select
                                  name="city"
                                  value={formData.city}
                                  onChange={handleInputChange}
                                  onBlur={handleBlur}
                                  disabled={!cities.length}
                                  className={`form-control ${
                                   activeForm === 'add' && errors.city && touched.city
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                >
                                  <option value="">Select a city</option>
                                  {cities.map((city, i) => (
                                    <option key={i} value={city}>
                                      {city}
                                    </option>
                                  ))}
                                </select>
                                {activeForm === 'add' && errors.city && touched.city && (
                                  <div className="invalid-feedback">
                                    {errors.city}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info mb-20">
                                <label>Postcode / ZIP *</label>
                                <input
                                  type="text"
                                  name="postcode"
                                  value={formData.postcode}
                                  onChange={handleInputChange}
                                  onBlur={handleBlur}
                                  className={`form-control ${
                                   activeForm === 'add' && errors.postcode && touched.postcode
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                {activeForm === 'add' && errors.postcode &&
                                  touched.postcode && (
                                    <div className="invalid-feedback">
                                      {errors.postcode}
                                    </div>
                                  )}
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info mb-20">
                                <label>Phone *</label>
                                <input
                                  type="text"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  onBlur={handleBlur}
                                  className={`form-control ${
                                   activeForm === 'add' && errors.phone && touched.phone
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                {activeForm === 'add' && errors.phone && touched.phone && (
                                  <div className="invalid-feedback">
                                    {errors.phone}
                                  </div>
                                )}
                              </div>
                            </div>
                            {/* <div className="col-lg-6 col-md-6">
                              <div className="billing-info mb-20">
                                <label>Email Address *</label>
                                <input
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  onBlur={handleBlur}
                                  className={`form-control ${
                                    errors.email && touched.email
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                {errors.email && touched.email && (
                                  <div className="invalid-feedback">
                                    {errors.email}
                                  </div>
                                )}
                              </div>
                            </div> */}
                            <div className="col-md-12">
                              <div className="additional-info-wrap">
                                <h4>Additional Information</h4>
                                <div className="additional-info">
                                  <label>Order Notes</label>
                                  <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className="form-control"
                                    placeholder="Notes about your order, e.g. special notes for delivery."
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 d-flex justify-content-end gap-2">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={handleCancelAdd}
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleAddSubmit}
                            >
                              Save Address
                            </button>
                          </div>
                        </div>
                      </div>
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
                          {editIndex === index || null ? (
                            <div>
                              <div className="border rounded p-3 mb-4 w-100">
                                <div className="billing-info-wrap">
                                  <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                      <div className="billing-info mb-20">
                                        <label>First Name *</label>
                                        <input
                                          type="text"
                                          name="firstName"
                                          value={editItem["firstName"]}
                                          onChange={handleEditChange}
                                          onBlur={(e) => {
                                            if (!editTouched.firstName) {
                                              setEditTouched((prev) => ({
                                                ...prev,
                                                firstName: true,
                                              }));
                                            }
                                          }}
                                          className={`form-control ${
                                            activeForm === 'edit' && editErrors.firstName &&
                                            editTouched.firstName
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                        />
                                        {activeForm === 'edit' && editErrors.firstName &&
                                          editTouched.firstName && (
                                            <div className="invalid-feedback">
                                              {editErrors.firstName}
                                            </div>
                                          )}
                                      </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                      <div className="billing-info mb-20">
                                        <label>Last Name *</label>
                                        <input
                                          type="text"
                                          name="lastName"
                                          value={editItem["lastName"]}
                                          onChange={handleEditChange}
                                          onBlur={(e) => {
                                            if (!editTouched.lastName) {
                                              setEditTouched((prev) => ({
                                                ...prev,
                                                lastName: true,
                                              }));
                                            }
                                          }}
                                          className={`form-control ${
                                           activeForm === 'edit' &&  editErrors.lastName && editTouched.lastName
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                        />
                                        {activeForm === 'edit' && editErrors.lastName &&
                                          editTouched.lastName && (
                                            <div className="invalid-feedback">
                                              {editErrors.lastName}
                                            </div>
                                          )}
                                      </div>
                                    </div>

                                    <div className="col-lg-12">
                                      <div className="billing-info mb-20">
                                        <label>Street Address *</label>
                                        <textarea
                                          className={`form-control ${
                                            activeForm === 'edit' && editErrors.address && editTouched.address
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          placeholder="House number and street name"
                                          type="text"
                                          name="address"
                                          value={editItem["address"]}
                                          onChange={handleEditChange}
                                          onBlur={(e) => {
                                            if (!editTouched.address) {
                                              setEditTouched((prev) => ({
                                                ...prev,
                                                address: true,
                                              }));
                                            }
                                          }}
                                          rows="4"
                                        />
                                        {activeForm === 'edit' && editErrors.address && editTouched.address && (
                                          <div className="invalid-feedback">
                                            {editErrors.address}
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    <div className="col-lg-12">
                                      <div className="billing-select mb-20">
                                        <label>Country *</label>
                                        <select
                                          name="country"
                                          value={editItem["country"]}
                                          onChange={handleEditChange}
                                          onBlur={(e) => {
                                            if (!editTouched.country) {
                                              setEditTouched((prev) => ({
                                                ...prev,
                                                country: true,
                                              }));
                                            }
                                          }}
                                          className={`form-control ${
                                           activeForm === 'edit' &&  editErrors.country && editTouched.country
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                        >
                                          <option value="">
                                            Select a country
                                          </option>
                                          {countries.map((country, i) => (
                                            <option key={i} value={country}>
                                              {country}
                                            </option>
                                          ))}
                                        </select>
                                        {activeForm === 'edit' && editErrors.country && editTouched.country && (
                                          <div className="invalid-feedback">
                                            {editErrors.country}
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    <div className="col-lg-12">
                                      <div className="billing-select mb-20">
                                        <label>State *</label>
                                        <select
                                          name="state"
                                          value={editItem["state"]}
                                          onChange={handleEditChange}
                                          onBlur={(e) => {
                                            if (!editTouched.state) {
                                              setEditTouched((prev) => ({
                                                ...prev,
                                                state: true,
                                              }));
                                            }
                                          }}
                                          disabled={!states.length}
                                          className={`form-control ${
                                            activeForm === 'edit' && editErrors.state && editTouched.state
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                        >
                                          <option value="">
                                            Select a state
                                          </option>
                                          {states.map((s, i) => (
                                            <option key={i} value={s.name}>
                                              {s.name}
                                            </option>
                                          ))}
                                        </select>
                                        {activeForm === 'edit' && editErrors.state && editTouched.state && (
                                          <div className="invalid-feedback">
                                            {editErrors.state}
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    <div className="col-lg-12">
                                      <div className="billing-select mb-20">
                                        <label>City *</label>
                                        <select
                                          name="city"
                                          value={editItem["city"]}
                                          onChange={handleEditChange}
                                          onBlur={(e) => {
                                            if (!editTouched.city) {
                                              setEditTouched((prev) => ({
                                                ...prev,
                                                city: true,
                                              }));
                                            }
                                          }}
                                          disabled={!cities.length}
                                          className={`form-control ${
                                            activeForm === 'edit' && editErrors.city && editTouched.city
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                        >
                                          <option value="">
                                            Select a city
                                          </option>
                                          {cities.map((city, i) => (
                                            <option key={i} value={city}>
                                              {city}
                                            </option>
                                          ))}
                                        </select>
                                        {activeForm === 'edit' &&  editErrors.city && editTouched.city && (
                                          <div className="invalid-feedback">
                                            {editErrors.city}
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                      <div className="billing-info mb-20">
                                        <label>Postcode / ZIP *</label>
                                        <input
                                          type="text"
                                          name="postcode"
                                          value={editItem["postcode"]}
                                          onChange={handleEditChange}
                                          onBlur={(e) => {
                                            if (!editTouched.postcode) {
                                              setEditTouched((prev) => ({
                                                ...prev,
                                                postcode: true,
                                              }));
                                            }
                                          }}
                                          className={`form-control ${
                                           activeForm === 'edit' &&  editErrors.postcode && editTouched.postcode
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                        />
                                        {activeForm === 'edit' && editErrors.postcode &&
                                          editTouched.postcode && (
                                            <div className="invalid-feedback">
                                              {editErrors.postcode}
                                            </div>
                                          )}
                                      </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                      <div className="billing-info mb-20">
                                        <label>Phone *</label>
                                        <input
                                          type="text"
                                          name="phone"
                                          value={editItem["phone"]}
                                          onChange={handleEditChange}
                                          onBlur={(e) => {
                                            if (!editTouched.phone) {
                                              setEditTouched((prev) => ({
                                                ...prev,
                                                phone: true,
                                              }));
                                            }
                                          }}
                                          className={`form-control ${
                                            activeForm === 'edit' && editErrors.phone && editTouched.phone
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                        />
                                        {activeForm === 'edit' && editErrors.phone && editTouched.phone && (
                                          <div className="invalid-feedback">
                                            {editErrors.phone}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    {/* <div className="col-lg-6 col-md-6">
                              <div className="billing-info mb-20">
                                <label>Email Address *</label>
                                <input
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  onBlur={handleBlur}
                                  className={`form-control ${
                                    errors.email && editTouched.email
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                {errors.email && editTouched.email && (
                                  <div className="invalid-feedback">
                                    {errors.email}
                                  </div>
                                )}
                              </div>
                            </div> */}
                                    <div className="col-md-12">
                                      <div className="additional-info-wrap">
                                        <h4>Additional Information</h4>
                                        <div className="additional-info">
                                          <label>Order Notes</label>
                                          <textarea
                                            name="description"
                                            value={editItem["description"]}
                                            onChange={handleEditChange}
                                            // onBlur={handleBlur}
                                            className="form-control"
                                            placeholder="Notes about your order, e.g. special notes for delivery."
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-3 d-flex justify-content-end gap-2">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  onClick={handleCancelEdit}
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  onClick={handleUpdate}
                                  className="btn btn-success"
                                >
                                  Save Changes
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="fw-bold mb-1">
                                {item.firstName} {item.lastName},{" "}
                                {item.postalcode}
                                {item.primary_address === 1 && (
                                  <span className="badge bg-success ms-2">
                                    Primary
                                  </span>
                                )}
                              </div>
                              <div style={{ fontSize: "14px" }}>
                                {item.address}, {item.city}, {item.state}
                              </div>
                              <div style={{ fontSize: "14px" }}>
                                {item.description}
                              </div>
                            </>
                          )}
                        </div>
                        {editIndex !== index ? (
                          <div className="form-check mt-1 me-3">
                            <button
                              type="button"
                              onClick={() => handleEditClick(item, index)}
                              title="Edit"
                              style={{
                                color: "#0D6EFD",
                                fontSize: "15px",
                                minWidth: "57px",
                                marginTop: "16%",
                                minHeight: "10px",
                                lineHeight: "55px",
                                marginBottom: "6px",
                                padding: "0",
                                border: "none",
                                borderRadius: "0",
                              }}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(item.id)}
                              title="Delete"
                              style={{
                                color: "#c2080f",
                                fontSize: "15px",
                                marginTop: "16%",
                                minWidth: "57px",
                                minHeight: "10px",
                                lineHeight: "55px",
                                marginBottom: "6px",
                                padding: "0",
                                border: "none",
                                borderRadius: "0",
                              }}
                              // className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="col-lg-5">
                    <div className="your-order-area">
                      <h3>Your order</h3>
                      <div className="your-order-wrap gray-bg-4">
                        <div className="your-order-product-info">
                          <div className="your-order-top">
                            <ul>
                              <li>Product</li>
                              <li>Total</li>
                            </ul>
                          </div>
                          <div className="your-order-middle">
                            <ul>
                              {cartItems.map((cartItem, key) => {
                                const discountedPrice = getDiscountPrice(
                                  cartItem.price,
                                  cartItem.discount
                                );
                                const finalProductPrice = (
                                  cartItem.price * currency.currencyRate
                                ).toFixed(2);
                                const finalDiscountedPrice = (
                                  discountedPrice * currency.currencyRate
                                ).toFixed(2);

                                return (
                                  <li key={key}>
                                    <span className="order-middle-left">
                                      {cartItem.name} X {cartItem.quantity}
                                    </span>
                                    <span className="order-price">
                                      {discountedPrice !== null
                                        ? currency.currencySymbol +
                                          (
                                            finalDiscountedPrice *
                                            cartItem.quantity
                                          ).toFixed(2)
                                        : currency.currencySymbol +
                                          (
                                            finalProductPrice *
                                            cartItem.quantity
                                          ).toFixed(2)}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          <div className="your-order-bottom">
                            <ul>
                              <li className="your-order-shipping">Shipping</li>
                              <li>Free shipping</li>
                            </ul>
                          </div>
                          <div className="your-order-bottom">
                            <ul>
                              <li className="your-order-shipping">Discount</li>
                              <li>
                                {"-" + currency.currencySymbol + discount}
                              </li>
                            </ul>
                          </div>
                          <div className="your-order-total">
                            <ul>
                              <li className="order-total">Total</li>
                              <li>
                                {currency.currencySymbol +
                                  (cartTotalPrice - discount).toFixed(2)}
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* Payment Error Display */}
                        {paymentError && (
                          <div
                            style={{
                              backgroundColor: "#f8d7da",
                              color: "#721c24",
                              padding: "12px",
                              marginBottom: "15px",
                              borderRadius: "4px",
                              border: "1px solid #f5c6cb",
                            }}
                          >
                            <strong>Payment Error:</strong> {paymentError}
                            {orderPlaced &&
                              formData.paymentMethod === "PAID" && (
                                <div style={{ marginTop: "10px" }}>
                                  <button
                                    type="button"
                                    onClick={retryPayment}
                                    disabled={isLoading}
                                    style={{
                                      backgroundColor: "#007bff",
                                      color: "white",
                                      border: "none",
                                      padding: "8px 16px",
                                      borderRadius: "4px",
                                      cursor: "pointer",
                                      marginRight: "10px",
                                    }}
                                  >
                                    {isLoading
                                      ? "Processing..."
                                      : "Retry Payment"}
                                  </button>
                                </div>
                              )}
                          </div>
                        )}

                        <div className="payment-method">
                          <div className="accordion-item">
                            <h4
                              className="accordion-heading"
                              onClick={togglePayment}
                              style={{
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "15px",
                                backgroundColor: "#f8f9fa",
                                border: "1px solid #dee2e6",
                                borderRadius: "4px",
                                marginBottom: "10px",
                                fontSize: "15px",
                              }}
                            >
                              Payment Method
                              <span>{isPaymentOpen ? "▲" : "▼"}</span>
                            </h4>

                            {isPaymentOpen && (
                              <div
                                className="accordion-content"
                                style={{
                                  padding: "15px",
                                  border: "1px solid #dee2e6",
                                  borderRadius: "4px",
                                  marginBottom: "20px",
                                }}
                              >
                                <div
                                  style={{
                                    marginBottom: "16px",
                                    display: "block",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      marginBottom: "10px",
                                      height: "24px",
                                      position: "relative",
                                    }}
                                  >
                                    <input
                                      type="radio"
                                      id="phonepe"
                                      name="paymentMethod"
                                      value="PAID"
                                      checked={
                                        formData.paymentMethod === "PAID"
                                      }
                                      onChange={() =>
                                        handlePaymentMethodChange("PAID")
                                      }
                                      style={{
                                        margin: "0",
                                        width: "18px",
                                        height: "18px",
                                        cursor: "pointer",
                                      }}
                                    />
                                    <label
                                      htmlFor="phonepe"
                                      style={{
                                        marginLeft: "10px",
                                        fontSize: "14px",
                                        cursor: "pointer",
                                        fontWeight: "500",
                                      }}
                                    >
                                      Pay Now
                                    </label>
                                  </div>
                                </div>

                                <div
                                  style={{
                                    marginBottom: "16px",
                                    display: "block",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      marginBottom: "10px",
                                      height: "24px",
                                      position: "relative",
                                    }}
                                  >
                                    <input
                                      type="radio"
                                      id="COD"
                                      name="paymentMethod"
                                      value="COD"
                                      checked={formData.paymentMethod === "COD"}
                                      onChange={() =>
                                        handlePaymentMethodChange("COD")
                                      }
                                      style={{
                                        margin: "0",
                                        width: "18px",
                                        height: "18px",
                                        cursor: "pointer",
                                      }}
                                    />
                                    <label
                                      htmlFor="COD"
                                      style={{
                                        marginLeft: "10px",
                                        fontSize: "14px",
                                        cursor: "pointer",
                                        fontWeight: "500",
                                      }}
                                    >
                                      Cash on Delivery
                                    </label>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="place-order mt-25">
                        <button
                          type="button"
                          onclic={handleSubmit}
                          className="btn-hover"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <span
                                className="btn-hover"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Processing...
                            </>
                          ) : orderPlaced && paymentError ? (
                            "Retry Order"
                          ) : (
                            "Place Order"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {showModal && (
            <div style={modalBackdropStyle}>
              <div style={modalStyle}>
                <p className="fs-2 text-dark">You are not logged in</p>
                <p>Please login or register to continue.</p>
                <div className="d-flex gap-4 justify-content-center">
                  <button
                    style={stylebutton}
                    onClick={() => navigate("/login-register")}
                  >
                    Login
                  </button>
                  <button
                    style={stylebutton}
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </LayoutOne>
    </Fragment>
  );
};
const modalBackdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};
const modalStyle = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "8px",
  textAlign: "center",
  width: "300px",
};
const stylebutton = {
  color: "#fff",
  backgroundColor: "#000",
  borderRadius: "10px",
  padding: "10px",
};
export default Checkout;
