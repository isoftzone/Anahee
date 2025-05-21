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
    email: "",
    paymentMethod: "cod",
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [customerId, setCustomerId] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [paymentError, setPaymentError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [isPaymentOpen, setIsPaymentOpen] = useState(true);
  useEffect(() => {
    // Validate all fields when component mounts or when formData changes
    validateForm();
  }, [formData]);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://mercury.phonepe.com/web/bundle/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Fetch countries on mount
  useEffect(() => {
    const customerData = JSON.parse(localStorage.getItem("customerinfo"));

    if (!customerData || !customerData.id) {
      navigate("/login-register");
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

  // Fetch states on country change
  useEffect(() => {
    if (formData.country) {
      const fetchStates = async () => {
        try {
          const res = await axios.post(
            "https://countriesnow.space/api/v0.1/countries/states",
            { country: formData.country }
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
  }, [formData.country]);

  // Fetch cities on state change
  useEffect(() => {
    if (formData.country && formData.state) {
      const fetchCities = async () => {
        try {
          const res = await axios.post(
            "https://countriesnow.space/api/v0.1/countries/state/cities",
            {
              country: formData.country,
              state: formData.state,
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
  }, [formData.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!touched[name]) {
      setTouched((prev) => ({ ...prev, [name]: true }));
    }
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
        if (!value.trim()) error = "First name is required";
        else if (value.length < 2)
          error = "First name must be at least 2 characters";
        break;
      case "lastName":
        if (!value.trim()) error = "Last name is required";
        else if (value.length < 2)
          error = "Last name must be at least 2 characters";
        break;
      case "address":
        if (!value.trim()) error = "Address is required";
        else if (value.length < 5)
          error = "Address must be at least 5 characters";
        break;
      case "city":
        if (!value.trim()) error = "City is required";
        break;
      case "country":
        if (!value.trim()) error = "Country is required";
        break;
      case "state":
        if (!value.trim()) error = "State is required";
        break;
      case "postcode":
        if (!value.trim()) error = "Postal code is required";
        else if (!/^[0-9]{6}$/.test(value))
          error = "Postal code must be 6 digits";
        break;
      case "phone":
        if (!value.trim()) error = "Phone is required";
        else if (!/^[0-9]{10,15}$/.test(value))
          error = "Phone number must be 10-15 digits";
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(value)) {
          error = "Email is invalid";
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (key !== "companyName" && key !== "paymentMethod") {
        const fieldValid = validateField(key, formData[key]);
        if (!fieldValid) isValid = false;
      }
    });

    return isValid;
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

  const phonePeCallback = (response,orderId) => {
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
          payment_mode: paymentDetail?.paymentMode,
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

        resetForm();
        window.location.href = "/success";
      } else {
        setPaymentError("Payment verification failed. Please contact support.");
        setOrderPlaced(false);
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
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
        amountInPaisa: cartTotalPrice * 100,
        customerPhone: formData.phone || "0000000000",
        redirectUrl: window.location.origin + "/success",
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
      email: "",
      paymentMethod: "cod",
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

    const allFieldsTouched = {};
    Object.keys(formData).forEach((key) => {
      allFieldsTouched[key] = true;
    });
    setTouched(allFieldsTouched);

    if (!validateForm()) {
      return;
    }

    const orderData = {
      ...formData,
      customerId,
      amount: cartTotalPrice,
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

        if (formData.paymentMethod === "online") {
          await initiatePhonePePayment(saleId);
        } else {
          // For COD, complete the order
          setIsLoading(false);
          alert("Order placed successfully!");
          resetForm();
          // Optionally redirect to success page
          // window.location.href = "/success";
        }
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an error placing your order.");
      setIsLoading(false);
      setOrderPlaced(false);
    }
  };

  const retryPayment = () => {
    if (orderId && formData.paymentMethod === "online") {
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

  return (
    <Fragment>
      <SEO
        titleTemplate="Checkout"
        description="Checkout page of Anahee react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        <div className="checkout-area pt-10 pb-30">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-7">
                    <div className="billing-info-wrap">
                      <h3>Billing Details</h3>
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
                                errors.firstName && touched.firstName
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            {errors.firstName && touched.firstName && (
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
                                errors.lastName && touched.lastName
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            {errors.lastName && touched.lastName && (
                              <div className="invalid-feedback">
                                {errors.lastName}
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
                                errors.country && touched.country
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
                            {errors.country && touched.country && (
                              <div className="invalid-feedback">
                                {errors.country}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="billing-info mb-20">
                            <label>Street Address *</label>
                            <input
                              className={`form-control ${
                                errors.address && touched.address
                                  ? "is-invalid"
                                  : ""
                              }`}
                              placeholder="House number and street name"
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              onBlur={handleBlur}
                            />
                            {errors.address && touched.address && (
                              <div className="invalid-feedback">
                                {errors.address}
                              </div>
                            )}
                            <input
                              className="form-control mt-2"
                              placeholder="Apartment, suite, unit etc."
                              type="text"
                              name="apartment"
                              value={formData.apartment}
                              onChange={handleInputChange}
                            />
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
                                errors.state && touched.state
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
                            {errors.state && touched.state && (
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
                                errors.city && touched.city ? "is-invalid" : ""
                              }`}
                            >
                              <option value="">Select a city</option>
                              {cities.map((city, i) => (
                                <option key={i} value={city}>
                                  {city}
                                </option>
                              ))}
                            </select>
                            {errors.city && touched.city && (
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
                                errors.postcode && touched.postcode
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            {errors.postcode && touched.postcode && (
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
                                errors.phone && touched.phone
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            {errors.phone && touched.phone && (
                              <div className="invalid-feedback">
                                {errors.phone}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
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
                        </div>
                      </div>

                      <div className="additional-info-wrap">
                        <h4>Additional information</h4>
                        <div className="additional-info">
                          <label>Order notes</label>
                          <textarea
                            className="form-control"
                            placeholder="Notes about your order, e.g. special notes for delivery."
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
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
                                    </span>{" "}
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
                          <div className="your-order-total">
                            <ul>
                              <li className="order-total">Total</li>
                              <li>
                                {currency.currencySymbol +
                                  cartTotalPrice.toFixed(2)}
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
                              formData.paymentMethod === "online" && (
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
                                      value="online"
                                      checked={
                                        formData.paymentMethod === "online"
                                      }
                                      onChange={() =>
                                        handlePaymentMethodChange("online")
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
                                      id="cod"
                                      name="paymentMethod"
                                      value="cod"
                                      checked={formData.paymentMethod === "cod"}
                                      onChange={() =>
                                        handlePaymentMethodChange("cod")
                                      }
                                      style={{
                                        margin: "0",
                                        width: "18px",
                                        height: "18px",
                                        cursor: "pointer",
                                      }}
                                    />
                                    <label
                                      htmlFor="cod"
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
                          type="submit"
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
              </form>
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
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Checkout;
