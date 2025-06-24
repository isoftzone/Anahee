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
import { FaEdit, FaTrash } from "react-icons/fa";

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
  const [recommendedCourier, setRecommendedCourier] = useState(null);
  const [primaryAddress, setPrimaryAddress] = useState(null);
  const [couriers, setCouriers] = useState([]);
  // const totalWeight = cartItems.reduce((sum, item) => {
  //   return sum + item.weight * item.quantity;
  // }, 0);
  // console.log("first 1 totalWeight", totalWeight);
  // console.log("first 1 cartItems", cartItems);

  const [isInternational, setIsInternational] = useState(false);
  const { totalWeight, maxLength, maxBreadth, maxHeight } = cartItems.reduce(
    (acc, item) => {
      const variation = item.variation?.[0] || {};

      const weight =
        variation.shippingweight ||
        variation.grossweight ||
        variation.netweight ||
        0.3;
      const length = variation.lengthcm || 10;
      const breadth = variation.widthcm || 10;
      const height = variation.heightcm || 10;

      acc.totalWeight += weight * item.quantity;

      acc.maxLength = Math.max(acc.maxLength, length);
      acc.maxBreadth = Math.max(acc.maxBreadth, breadth);
      acc.maxHeight = Math.max(acc.maxHeight, height);

      return acc;
    },
    {
      totalWeight: 0,
      maxLength: 0,
      maxBreadth: 0,
      maxHeight: 0,
    }
  );

  console.log("🚚 totalWeight", totalWeight);
  console.log("📦 Dimensions (LxBxH)", maxLength, maxBreadth, maxHeight);
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
    const loadPhonePeScript = () => {
      if (window.PhonePeCheckout) return; // Already loaded
      const script = document.createElement("script");
      script.src = "https://mercury.phonepe.com/web/bundle/checkout.js";
      script.async = true;
      script.onload = () => {
        console.log("PhonePe script loaded successfully");
      };
      script.onerror = () => {
        console.error("Failed to load PhonePe script");
        setPaymentError(
          "Payment service is currently unavailable. Please try another method."
        );
      };
      document.body.appendChild(script);
      return () => {
        // Only remove if payment isn't in progress
        if (!orderPlaced) {
          document.body.removeChild(script);
        }
      };
    };
    if (formData.paymentMethod === "PAID") {
      loadPhonePeScript();
    }
  }, [formData.paymentMethod, orderPlaced]);

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://mercury.phonepe.com/web/bundle/checkout.js";
  //   script.async = true;
  //   script.crossOrigin = "anonymous";

  //   // Add error handling for script loading
  //   script.onload = () => {
  //     console.log("PhonePe script loaded successfully");
  //   };

  //   script.onerror = (error) => {
  //     console.error("Failed to load PhonePe script:", error);
  //     // setPaymentError(
  //     //   "Failed to load payment service. Please refresh and try again."
  //     // );
  //   };
  //   document.body.appendChild(script);

  //   // return () => {
  //   //   document.body.removeChild(script);
  //   // };
  //   return () => {
  //     // Check if script exists before removing
  //     if (document.body.contains(script)) {
  //       document.body.removeChild(script);
  //     }
  //   };
  // }, []);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const couponCode = params.get("couponCode");

  useEffect(() => {
    if (couponCode) {
      const applyCoupon = async () => {
        try {
          const response = await axios.post(`${BASE_URL}/applycoupon`, {
            coupon_code: couponCode,
            cart_total: cartTotalPrice.toFixed(2) || 0,
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
            // postcode: addr.postal_code,
            postcode: addr.postal_code || addr.postcode,

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

  useEffect(() => {
    if (data && data.length > 0) {
      const found = data.find((addr) => addr.primary_address === 1);
      if (found) {
        setPrimaryAddress(found);
      }
    }
  }, [data]);
  // useEffect(() => {
  //   console.log("first primaryAddress", primaryAddress);
  //   checkServiceability();
  // }, [primaryAddress, formData.paymentMethod]);
  useEffect(() => {
    if (primaryAddress) {
      checkServiceability();
    }
  }, [primaryAddress, formData.paymentMethod, totalWeight]);
  // const checkServiceability = async () => {
  //   setIsLoading(true);
  //   // setError(null);
  //   try {
  //     const serviceabilityResponse = await axios.post(
  //       `${BASE_URL}/api/checkServiceability`,
  //       {
  //         pickup_postcode: "302016",
  //         delivery_postcode: primaryAddress.postcode,
  //         cod: formData.paymentMethod == "COD" ? 1 : 0,
  //         weight: 1,
  //       }
  //     );

  //     if (serviceabilityResponse.data.success) {
  //       const availableCouriers =
  //         serviceabilityResponse.data.data.data.available_courier_companies;
  //       setCouriers(availableCouriers);

  //       // Find the recommended courier
  //       const recommendedId =
  //         serviceabilityResponse.data.data.data.recommended_courier_company_id;
  //       const recommended = availableCouriers.find(
  //         (c) => c.courier_company_id === recommendedId
  //       );
  //       setRecommendedCourier(recommended);
  //       setIsLoading(false);
  //     } else {
  //       // setError("No couriers available for this pincode combination");
  //       setRecommendedCourier(null);
  //       console.error(
  //         "Error:",
  //         "No couriers available for this pincode combination"
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error:", error.response?.data || error.message);
  //     // setError("Failed to check serviceability. Please try again.");
  //     setRecommendedCourier(null);
  //   }
  // };

  // Fetch states on country change

  // const checkServiceability = async () => {
  //   setIsLoading(true);
  //   setPaymentError("");
  //   setRecommendedCourier(null);

  //   try {
  //     if (!primaryAddress) {
  //       throw new Error("No shipping address selected");
  //     }

  //     if (primaryAddress.country === "India") {
  //       // Domestic shipping for India
  //       if (
  //         !primaryAddress.postcode ||
  //         !/^[0-9]{6}$/.test(primaryAddress.postcode)
  //       ) {
  //         throw new Error(
  //           "Invalid Indian postal code. Please enter a valid 6-digit pincode."
  //         );
  //       }

  //       const serviceabilityResponse = await axios.post(
  //         `${BASE_URL}/api/checkServiceability`,
  //         {
  //           pickup_postcode: "302016", // Your warehouse pincode
  //           delivery_postcode: primaryAddress.postcode,
  //           cod: formData.paymentMethod === "COD" ? 1 : 0,
  //           weight: totalWeight || 1,
  //         }
  //       );

  //       if (serviceabilityResponse.data.success) {
  //         const availableCouriers =
  //           serviceabilityResponse.data.data?.available_courier_companies || [];

  //         if (availableCouriers.length === 0) {
  //           throw new Error("No couriers available for this pincode");
  //         }

  //         const recommendedId =
  //           serviceabilityResponse.data.data?.recommended_courier_company_id;

  //         const recommended =
  //           availableCouriers.find(
  //             (c) => c.courier_company_id === recommendedId
  //           ) || availableCouriers[0];

  //         setRecommendedCourier({
  //           ...recommended,
  //           international: false,
  //           rate: recommended.freight_charge || 0,
  //         });
  //       } else {
  //         throw new Error(
  //           serviceabilityResponse.data.message || "No couriers available"
  //         );
  //       }
  //     } else {
  //       // International shipping
  //       // const internationalResponse = await axios.post(
  //       //   `${BASE_URL}/api/checkInternationalServiceability`,
  //       //   {
  //       //     country: primaryAddress.country,
  //       //     weight: totalWeight || 1,
  //       //     payment_method: formData.paymentMethod === "COD" ? "COD" : "Prepaid",
  //       //   }
  //       // );
  //       const internationalResponse = await axios.post(
  //         `${BASE_URL}/api/checkInternationalServiceability`,
  //         {
  //           country: primaryAddress.country,
  //           weight: totalWeight || 1,
  //           payment_method:
  //             formData.paymentMethod === "COD" ? "COD" : "Prepaid",
  //         }
  //       );

  //       if (internationalResponse.data.success) {
  //         const courierData = internationalResponse.data.data;
  //         const availableCouriers =
  //           courierData.available_courier_companies || [];

  //         if (availableCouriers.length === 0) {
  //           throw new Error(
  //             `No couriers available for ${primaryAddress.country}`
  //           );
  //         }

  //         // const recommended = availableCouriers[0];
  //         const recommended =
  //           availableCouriers.find(
  //             (c) =>
  //               c.courier_company_id ===
  //               courierData.recommended_courier_company_id
  //           ) || availableCouriers[0];
  //         setRecommendedCourier({
  //           ...recommended,
  //           international: true,
  //           // rate: courierData.rate || recommended.freight_charge || 0,
  //           rate:
  //             courierData.rate ??
  //             recommended.freight_charge ??
  //             recommended.total_rate ??
  //             0,
  //           etd: courierData.etd || recommended.etd,
  //           courier_name: courierData.courier_name || recommended.courier_name,
  //         });
  //       } else {
  //         throw new Error(
  //           internationalResponse.data.message || "No couriers available"
  //         );
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Serviceability check failed:", error);
  //     setPaymentError(
  //       error.response?.data?.message ||
  //         error.message ||
  //         "Failed to calculate shipping rates"
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const checkServiceability = async () => {
  setIsLoading(true);
  setPaymentError("");
  setRecommendedCourier(null);
  try {
    if (!primaryAddress) {
      throw new Error("No shipping address selected");
    }
    console.log("Checking serviceability for:", {
      country: primaryAddress.country,
      postcode: primaryAddress.postcode,
      paymentMethod: formData.paymentMethod,
      weight: totalWeight,
    });
    if (primaryAddress.country === "India") {
      // Domestic shipping for India
      if (
        !primaryAddress.postcode ||
        !/^[0-9]{6}$/.test(primaryAddress.postcode)
      ) {
        throw new Error(
          "Invalid Indian postal code. Please enter a valid 6-digit pincode."
        );
      }
      const serviceabilityResponse = await axios.post(
        `${BASE_URL}/api/checkServiceability`,
        {
          pickup_postcode: "302016", // Your warehouse pincode
          delivery_postcode: primaryAddress.postcode,
          cod: formData.paymentMethod === "COD" ? 1 : 0,
          weight: totalWeight || 1,
        }
      );
      console.log(
        "Domestic serviceability response:",
        serviceabilityResponse.data
      );
      if (serviceabilityResponse.data.success) {
        const courierData = serviceabilityResponse.data.data;
        const availableCouriers =
          courierData.available_courier_companies || [];
        if (availableCouriers.length === 0) {
          throw new Error("No couriers available for this pincode");
        }
        const recommendedId = courierData.recommended_courier_company_id;
        const recommended =
          availableCouriers.find(
            (c) => c.courier_company_id === recommendedId
          ) || availableCouriers[0];
        setRecommendedCourier({
          ...recommended,
          international: false,
          rate: parseFloat(
            recommended.freight_charge || courierData.rate || 0
          ),
          etd: recommended.etd || courierData.etd || "Not available",
          courier_name:
            recommended.courier_name ||
            courierData.courier_name ||
            "Domestic Courier",
        });
      } else {
        throw new Error(
          serviceabilityResponse.data.message || "No couriers available"
        );
      }
    } else {
      // International shipping
      console.log(
        "Checking international serviceability for:",
        primaryAddress.country
      );
      const internationalResponse = await axios.post(
        `${BASE_URL}/api/checkInternationalServiceability`,
        {
          country: primaryAddress.country,
          weight: totalWeight || 1,
          payment_method:
            formData.paymentMethod === "COD" ? "COD" : "Prepaid",
        }
      );
      console.log(
        "International serviceability response:",
        internationalResponse.data
      );
      if (internationalResponse.data.success) {
        const courierData = internationalResponse.data.data;
        const availableCouriers =
          courierData.available_courier_companies || [];
        if (availableCouriers.length === 0) {
          throw new Error(
            `No couriers available for ${primaryAddress.country}`
          );
        }
        // Get the recommended courier or first available
        const recommendedId = courierData.recommended_courier_company_id;
        const recommended =
          availableCouriers.find(
            (c) => c.courier_company_id === recommendedId
          ) || availableCouriers[0];
        // Extract rate with multiple fallbacks
        let shippingRate = 0;
        if (courierData.rate !== undefined && courierData.rate !== null) {
          shippingRate = parseFloat(courierData.rate);
        } else if (
          recommended.freight_charge !== undefined &&
          recommended.freight_charge !== null
        ) {
          shippingRate = parseFloat(recommended.freight_charge);
        } else if (
          recommended.rate !== undefined &&
          recommended.rate !== null
        ) {
          shippingRate = parseFloat(recommended.rate);
        } else if (
          recommended.charges !== undefined &&
          recommended.charges !== null
        ) {
          shippingRate = parseFloat(recommended.charges);
        }
        console.log("Final shipping rate extracted:", shippingRate);
        setRecommendedCourier({
          ...recommended,
          international: true,
          rate: shippingRate,
          etd: courierData.etd || recommended.etd || "7-15 business days",
          courier_name:
            courierData.courier_name ||
            recommended.courier_name ||
            "International Courier",
          courier_company_id:
            recommended.courier_company_id ||
            courierData.recommended_courier_company_id,
        });
      } else {
        throw new Error(
          internationalResponse.data.message ||
            `International shipping not available for ${primaryAddress.country}`
        );
      }
    }
  } catch (error) {
    console.error("Serviceability check failed:", error);
    let errorMessage = "Failed to calculate shipping rates";
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    setPaymentError(errorMessage);
    setRecommendedCourier(null);
  } finally {
    setIsLoading(false);
  }
};

  // const checkServiceability = async () => {
  //   setIsLoading(true);
  //   setPaymentError("");
  //   setRecommendedCourier(null);

  //   try {
  //     if (!primaryAddress) {
  //       throw new Error("No shipping address selected");
  //     }

  //     if (primaryAddress.country === "India") {
  //       // Domestic shipping for India
  //       if (
  //         !primaryAddress.postcode ||
  //         !/^[0-9]{6}$/.test(primaryAddress.postcode)
  //       ) {
  //         throw new Error(
  //           "Invalid Indian postal code. Please enter a valid 6-digit pincode."
  //         );
  //       }

  //       const serviceabilityResponse = await axios.post(
  //         `${BASE_URL}/api/checkServiceability`,
  //         {
  //           pickup_postcode: "302016", // Your warehouse pincode
  //           delivery_postcode: primaryAddress.postcode,
  //           cod: formData.paymentMethod === "COD" ? 1 : 0,
  //           weight: totalWeight || 1,
  //         }
  //       );

  //       if (
  //         serviceabilityResponse.data.success &&
  //         serviceabilityResponse.data.data?.available_courier_companies
  //       ) {
  //         const availableCouriers =
  //           serviceabilityResponse.data.data.available_courier_companies;
  //         const recommendedId =
  //           serviceabilityResponse.data.data.recommended_courier_company_id;

  //         if (availableCouriers.length === 0) {
  //           throw new Error("No couriers available for this pincode");
  //         }

  //         const recommended =
  //           availableCouriers.find(
  //             (c) => c.courier_company_id === recommendedId
  //           ) || availableCouriers[0];

  //         setRecommendedCourier({
  //           ...recommended,
  //           international: false,
  //         });
  //       } else {
  //         throw new Error("No couriers available for this pincode");
  //       }
  //     } else {
  //       // International shipping
  //       const internationalResponse = await axios.post(
  //         `${BASE_URL}/api/checkInternationalServiceability`,
  //         {
  //           country: primaryAddress.country,
  //           weight: totalWeight || 1,
  //           payment_method:
  //             formData.paymentMethod === "COD" ? "COD" : "Prepaid",
  //         }
  //       );

  //       if (internationalResponse.data.success) {
  //         const courierData = internationalResponse.data.data;

  //         if (
  //           !courierData.available_courier_companies ||
  //           courierData.available_courier_companies.length === 0
  //         ) {
  //           throw new Error(
  //             `No couriers available for shipping to ${primaryAddress.country}`
  //           );
  //         }

  //         const recommended = courierData.available_courier_companies[0];

  //         setRecommendedCourier({
  //           ...recommended,
  //           international: true,
  //           rate: courierData.rate || recommended.freight_charge,
  //           etd: courierData.etd || recommended.etd,
  //           courier_name: courierData.courier_name || recommended.courier_name,
  //           freight_charge: recommended.freight_charge,
  //         });
  //       } else {
  //         throw new Error(
  //           internationalResponse.data.message ||
  //             "No couriers available for this country"
  //         );
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Serviceability check failed:", error);
  //     setRecommendedCourier(null);

  //     let errorMessage = "Shipping not available";
  //     if (error.response?.data?.message) {
  //       errorMessage = error.response.data.message;
  //     } else if (error.message) {
  //       errorMessage = error.message;
  //     }

  //     setPaymentError(
  //       `${errorMessage}. Please try a different address or contact support.`
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Additional helper function to validate international postal codes (optional)
  const validateInternationalPostalCode = (country, postalCode) => {
    if (!postalCode) return false;

    const patterns = {
      "United States": /^[0-9]{5}(-[0-9]{4})?$/,
      "United Kingdom": /^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/i,
      Canada: /^[A-Z][0-9][A-Z]\s?[0-9][A-Z][0-9]$/i,
      Australia: /^[0-9]{4}$/,
      Germany: /^[0-9]{5}$/,
      France: /^[0-9]{5}$/,
      // Add more patterns as needed
    };

    const pattern = patterns[country];
    return pattern ? pattern.test(postalCode) : true; // Return true for unknown countries
  };

  const createShipment = async (saleId) => {
    const isInternational = primaryAddress.country !== "India";

    const shiprocketOrder = {
      order_id: saleId,
      customer_fname: primaryAddress.firstName,
      customer_lname: primaryAddress.lastName,
      country: primaryAddress.country,
      address: primaryAddress.address,
      city: primaryAddress.city,
      pincode: isInternational ? "000000" : primaryAddress.postcode, // Use dummy for international if needed
      state: primaryAddress.state,
      email: primaryAddress.email,
      phone: primaryAddress.phone,
      comment: primaryAddress.description || "",
      items: cartItems.map((item) => ({
        name: item.name,
        sku: item.sku || `SKU-${item.id}`,
        units: item.quantity,
        selling_price: item.price,
        discount: "",
        tax: "",
        hsn: 441122,
      })),
      payment_method: formData.paymentMethod === "PAID" ? "Prepaid" : "COD",
      total: cartTotalPrice - discount,
      shipping_charge: recommendedCourier.rate
        ? recommendedCourier.rate.toFixed(2) || 0
        : "0.00",
      length: maxLength || 0.5,
      breadth: maxBreadth || 0.5,
      height: maxHeight || 0.5,
      weight: totalWeight || 0.1,
      ...(isInternational && {
        international_order: 1,
        country_code: getCountryCode(primaryAddress.country),
        customs_value: cartTotalPrice - discount,
        customs_description: "Online retail goods",
      }),
    };

    try {
      const endpoint = isInternational
        ? `${BASE_URL}/api/create-international-order`
        : `${BASE_URL}/api/create-shiprocket-order`;

      const shiprocketRes = await axios.post(endpoint, shiprocketOrder);
      console.log("✅ Shiprocket order created:", shiprocketRes.data);

      // For domestic orders, generate pickup
      if (!isInternational && shiprocketRes.data.shipment_id) {
        await axios.post(`${BASE_URL}/api/generate-pickup`, {
          shipment_id: shiprocketRes.data.shipment_id,
        });
      }
    } catch (shiprocketErr) {
      console.error("❌ Shiprocket order creation failed:", shiprocketErr);
      throw shiprocketErr;
    }
  };

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
  }, [formData.country, editItem?.country]);

  // Fetch cities on state change
  useEffect(() => {
    if (
      (formData.country && formData.state) ||
      (editItem?.country && editItem?.state)
    ) {
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
  }, [formData.state, editItem?.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Only validate if we're in add mode
    if (activeForm === "add") {
      setTouched((prev) => ({ ...prev, [name]: true }));
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const getCountryCode = (countryName) => {
    const countryCodes = {
      "United States": "US",
      "United Kingdom": "GB",
      Canada: "CA",
      Australia: "AU",
      Germany: "DE",
      France: "FR",
      Japan: "JP",
      China: "CN",
      India: "IN",
      // Add more countries as needed
    };

    // Try to find exact match first
    const exactMatch = countryCodes[countryName];
    if (exactMatch) return exactMatch;

    // Try case-insensitive match
    const lowerCountry = countryName.toLowerCase();
    for (const [name, code] of Object.entries(countryCodes)) {
      if (name.toLowerCase() === lowerCountry) {
        return code;
      }
    }

    // Fallback to first two letters
    return countryName.substring(0, 2).toUpperCase();
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
        if (formData.country === "" && !/^[0-9]$/.test(trimmedValue)) {
          return "postal code must be 6 digits";
        }
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

  // const phonePeCallback = (response, orderId) => {
  //   setIsLoading(false);

  //   if (response === "USER_CANCEL") {
  //     setPaymentError(
  //       "Payment was cancelled. Please choose a payment method to continue."
  //     );
  //     // Reset order state so user can try again
  //     setOrderPlaced(false);
  //   } else if (response === "CONCLUDED") {
  //     verifyPaymentStatus(orderId);
  //   } else {
  //     setPaymentError(
  //       "Payment failed. Please try again or choose a different payment method."
  //     );
  //     setOrderPlaced(false);
  //   }
  // };

  const phonePeCallback = (response, orderId) => {
    try {
      console.log("PhonePe callback received:", { response, orderId });

      setIsLoading(false);

      if (!orderId) {
        throw new Error("Order ID is missing in callback");
      }

      if (response === "USER_CANCEL") {
        setPaymentError(
          "Payment was cancelled. Please choose a payment method to continue."
        );
        setOrderPlaced(false);
      } else if (response === "CONCLUDED") {
        // Add a small delay to ensure state is updated
        setTimeout(() => {
          verifyPaymentStatus(orderId);
        }, 100);
      } else {
        console.warn("Unexpected PhonePe response:", response);
        setPaymentError(
          "Payment failed. Please try again or choose a different payment method."
        );
        setOrderPlaced(false);
      }
    } catch (error) {
      console.error("Error in PhonePe callback:", {
        message: error.message,
        stack: error.stack,
        response,
        orderId,
      });

      setPaymentError("Payment processing error. Please contact support.");
      setOrderPlaced(false);
      setIsLoading(false);
    }
  };
  const verifyPaymentStatus = async (orderId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/order-status/${orderId}`
      );
      if (response.data.success) {
        const paymentDetail = response.data.data.paymentDetails?.[0];

        if (!paymentDetail) {
          throw new Error("Payment details not found in response");
        }

        const splitInstrument = paymentDetail?.splitInstruments?.[0];

        const updateData = {
          merchant_order_id: response?.data?.data?.orderId,
          payment_mode: "PAID",
          provider_reference_id: splitInstrument?.rail?.utr || "",
          phonepe_status: response?.data?.data?.state,
          payment_status: paymentDetail?.state,
          transaction_id: paymentDetail?.transactionId,
          saleId: orderId,
        };

        console.log("Updating with data:", updateData);

        const updateResponse = await axios.put(
          `${BASE_URL}/updateSalesMaster`,
          updateData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Update response:", updateResponse.data);

        setIsSuccess(true);
        setShowPopup(true);
        resetForm();
      } else {
        throw new Error(response.data.message || "Payment verification failed");
      }
    } catch (error) {
      console.error("Detailed error in verifyPaymentStatus:", {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
        status: error.response?.status,
      });

      setIsSuccess(false);
      setShowPopup(true);
      setPaymentError(
        error.response?.data?.message ||
          "There was an error verifying your payment. Please contact support."
      );
      setOrderPlaced(false);
    }
  };

  // const initiatePhonePePayment = async (orderId) => {
  //   try {
  //     setIsLoading(true);
  //     const response = await axios.post(`${BASE_URL}/api/create-order`, {
  //       orderId: orderId,
  //       amountInPaisa: (cartTotalPrice - discount) * 100,
  //       customerPhone: formData.phone || "0000000000",
  //       redirectUrl: window.location.origin + "/orders",
  //       expireAfter: 1200,
  //       metaInfo: {
  //         udf1: "Additional Info 1",
  //         udf2: "Additional Info 2",
  //       },
  //     });

  //     if (response.data.success && response.data.data.redirectUrl) {
  //       if (window.PhonePeCheckout && window.PhonePeCheckout.transact) {
  //         window.PhonePeCheckout.transact({
  //           tokenUrl: response.data.data.redirectUrl,
  //           callback: (resp) => phonePeCallback(resp, orderId),
  //           type: "IFRAME",
  //         });
  //       } else {
  //         setPaymentError("PhonePe checkout is not ready. Please try again.");
  //         setIsLoading(false);
  //         setOrderPlaced(false);
  //       }
  //     } else {
  //       setPaymentError(
  //         "Failed to initiate PhonePe payment. Please try again."
  //       );
  //       setIsLoading(false);
  //       setOrderPlaced(false);
  //     }
  //   } catch (error) {
  //     console.error("Error initiating PhonePe payment:", error);
  //     setPaymentError(
  //       "There was an error initiating PhonePe payment. Please try again."
  //     );
  //     setIsLoading(false);
  //     setOrderPlaced(false);
  //   }

  // };

  const loadPhonePeScript = () => {
    return new Promise((resolve, reject) => {
      if (window.PhonePeCheckout) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://mercury.phonepe.com/web/bundle/checkout.js";
      script.async = true;

      script.onload = () => {
        // Give it a moment to initialize
        setTimeout(() => {
          if (window.PhonePeCheckout) {
            resolve();
          } else {
            reject(new Error("PhonePe not available after load"));
          }
        }, 100);
      };

      script.onerror = () => reject(new Error("Failed to load PhonePe script"));

      document.head.appendChild(script);
    });
  };

  const initiatePhonePePayment = async (orderId) => {
    try {
      setIsLoading(true);

      // Wait for PhonePe script to be ready
      const waitForPhonePe = () => {
        return new Promise((resolve, reject) => {
          let attempts = 0;
          const maxAttempts = 50; // 5 seconds max wait

          const checkPhonePe = () => {
            if (window.PhonePeCheckout && window.PhonePeCheckout.transact) {
              resolve();
            } else if (attempts < maxAttempts) {
              attempts++;
              setTimeout(checkPhonePe, 100);
            } else {
              reject(new Error("PhonePe script not loaded"));
            }
          };

          checkPhonePe();
        });
      };
      await loadPhonePeScript();
      await waitForPhonePe();

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
        window.PhonePeCheckout.transact({
          tokenUrl: response.data.data.redirectUrl,
          callback: (resp) => phonePeCallback(resp, orderId),
          type: "IFRAME",
        });
      } else {
        throw new Error("Failed to get redirect URL");
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

  useEffect(() => {
    const handleGlobalError = (event) => {
      if (event.message === "Script error.") {
        console.error("Cross-origin script error detected");
        // Handle the error gracefully
      }
    };

    window.addEventListener("error", handleGlobalError);

    return () => {
      window.removeEventListener("error", handleGlobalError);
    };
  }, []);
  useEffect(() => {
    // Enhanced error handling
    const handleError = (event) => {
      console.error("Global error caught:", event.error);
      console.error("Error message:", event.message);
      console.error("Error stack:", event.error?.stack);
    };

    const handleUnhandledRejection = (event) => {
      console.error("Unhandled promise rejection:", event.reason);
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  }, []);
  const resetForm = async () => {
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
    try {
      const payload = {
        CUSTOMERID: customerId,
        type: "cart",
      };
      const response = await axios.delete(`${BASE_URL}/clearAllcartWishlist`, {
        data: payload,
      });
      if (response.status === 200 && response.data?.success) {
        console.log("Successfully cleared all cart items from server.");
        // No need to dispatch again, already cleared optimistically
      } else {
        console.warn(
          "Server clear all cart failed:",
          response.data?.message ?? response.data
        );
        // Optional: Re-fetch cart or show error if server clear failed and you want strict consistency
      }
    } catch (error) {
      console.error("Error clearing all cart items from backend:", error);
      // Optional: Re-fetch cart or show error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous payment errors
    setPaymentError("");

    // // 🔍 Find the primary address from address list
    // const primaryAddress = data.find((addr) => addr.primary_address === 1);

    // if (!primaryAddress) {
    //   alert("Please set a primary address before placing the order.");
    //   return;
    // }

    const orderData = {
      firstName: primaryAddress.firstName,
      lastName: primaryAddress.lastName,
      email: "",
      phone: primaryAddress.phone,
      address: primaryAddress.address,
      city: primaryAddress.city,
      state: primaryAddress.state,
      country: primaryAddress.country,
      postcode: primaryAddress.postcode,
      description: primaryAddress.description,
      discount,
      customerId,
      amount: cartTotalPrice - discount,
      payment_mode: "COD",
      payment_status: "PENDING",
      coupon_code: discount > 0 ? couponCode : "",
      shipping_charge: recommendedCourier.rate
        ? recommendedCourier.rate.toFixed(2) || 0
        : "0.00",
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
        size: item.selectedProductSize,
        color: item.selectedProductColor,
      })),
    };

    // console.log("size", size)
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
    const finalProductPrice =
      (cartItem.price * currency.currencyRate).toFixed(2) || 0;
    const finalDiscountedPrice =
      (discountedPrice * currency.currencyRate).toFixed(2) || 0;

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
              <form onSubmit={handleSubmit}>
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
                                    activeForm === "add" &&
                                    errors.firstName &&
                                    touched.firstName
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                {activeForm === "add" &&
                                  errors.firstName &&
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
                                    activeForm === "add" &&
                                    errors.lastName &&
                                    touched.lastName
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                {activeForm === "add" &&
                                  errors.lastName &&
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
                                    activeForm === "add" &&
                                    errors.address &&
                                    touched.address
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
                                {activeForm === "add" &&
                                  errors.address &&
                                  touched.address && (
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
                                    activeForm === "add" &&
                                    errors.country &&
                                    touched.country
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
                                {activeForm === "add" &&
                                  errors.country &&
                                  touched.country && (
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
                                    activeForm === "add" &&
                                    errors.state &&
                                    touched.state
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
                                {activeForm === "add" &&
                                  errors.state &&
                                  touched.state && (
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
                                    activeForm === "add" &&
                                    errors.city &&
                                    touched.city
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
                                {activeForm === "add" &&
                                  errors.city &&
                                  touched.city && (
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
                                    activeForm === "add" &&
                                    errors.postcode &&
                                    touched.postcode
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                {activeForm === "add" &&
                                  errors.postcode &&
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
                                    activeForm === "add" &&
                                    errors.phone &&
                                    touched.phone
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                {activeForm === "add" &&
                                  errors.phone &&
                                  touched.phone && (
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
                              // className="btn btn-secondary"
                              onClick={handleCancelAdd}
                              style={{ background: "#ffeaf1", border: "0" }}
                              className="text-black fw-bold m-2 font-bold text-sm sm:text-base min-w-[80px] sm:min-w-[100px] px-3 sm:px-4 py-3 sm:py-2 rounded bg-pink-100 hover:bg-pink-200 transition d-flex align-items-center gap-2"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              // className="btn btn-primary"
                              onClick={handleAddSubmit}
                              style={{ background: "#ffeaf1", border: "0" }}
                              className="text-black fw-bold m-2 font-bold text-sm sm:text-base min-w-[80px] sm:min-w-[100px] px-3 sm:px-4 py-3 sm:py-2 rounded bg-pink-100 hover:bg-pink-200 transition d-flex align-items-center gap-2"
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
                                            activeForm === "edit" &&
                                            editErrors.firstName &&
                                            editTouched.firstName
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                        />
                                        {activeForm === "edit" &&
                                          editErrors.firstName &&
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
                                            activeForm === "edit" &&
                                            editErrors.lastName &&
                                            editTouched.lastName
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                        />
                                        {activeForm === "edit" &&
                                          editErrors.lastName &&
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
                                            activeForm === "edit" &&
                                            editErrors.address &&
                                            editTouched.address
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
                                        {activeForm === "edit" &&
                                          editErrors.address &&
                                          editTouched.address && (
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
                                            activeForm === "edit" &&
                                            editErrors.country &&
                                            editTouched.country
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
                                        {activeForm === "edit" &&
                                          editErrors.country &&
                                          editTouched.country && (
                                            <div className="invalid-feedback">
                                              {editErrors.country}
                                            </div>
                                          )}
                                      </div>
                                    </div>

                                    {/* <div className="col-lg-12">
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
                                            activeForm === "edit" &&
                                            editErrors.state &&
                                            editTouched.state
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
                                        {activeForm === "edit" &&
                                          editErrors.state &&
                                          editTouched.state && (
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
                                            activeForm === "edit" &&
                                            editErrors.city &&
                                            editTouched.city
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
                                        {activeForm === "edit" &&
                                          editErrors.city &&
                                          editTouched.city && (
                                            <div className="invalid-feedback">
                                              {editErrors.city}
                                            </div>
                                          )}
                                      </div>
                                    </div> */}

                                    {/* State select in edit form */}
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
                                          className={`form-control ${
                                            activeForm === "edit" &&
                                            editErrors.state &&
                                            editTouched.state
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
                                        {activeForm === "edit" &&
                                          editErrors.state &&
                                          editTouched.state && (
                                            <div className="invalid-feedback">
                                              {editErrors.state}
                                            </div>
                                          )}
                                      </div>
                                    </div>

                                    {/* City select in edit form */}
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
                                          className={`form-control ${
                                            activeForm === "edit" &&
                                            editErrors.city &&
                                            editTouched.city
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
                                        {activeForm === "edit" &&
                                          editErrors.city &&
                                          editTouched.city && (
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
                                            activeForm === "edit" &&
                                            editErrors.postcode &&
                                            editTouched.postcode
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                        />
                                        {activeForm === "edit" &&
                                          editErrors.postcode &&
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
                                            activeForm === "edit" &&
                                            editErrors.phone &&
                                            editTouched.phone
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                        />
                                        {activeForm === "edit" &&
                                          editErrors.phone &&
                                          editTouched.phone && (
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
                                  style={{ background: "#FFEAF1" }}
                                  type="button"
                                  className="text-black fw-bold m-2 font-bold text-sm sm:text-base min-w-[80px] sm:min-w-[100px] px-3 sm:px-4 py-3 sm:py-2 rounded hover:bg-pink-400 transition d-flex align-items-center gap-2 border-0"
                                  onClick={handleCancelEdit}
                                >
                                  Cancel
                                </button>
                                <button
                                  style={{ background: "#FFEAF1" }}
                                  type="button"
                                  onClick={handleUpdate}
                                  className="text-black fw-bold m-2 font-bold text-sm sm:text-base min-w-[80px] sm:min-w-[100px] px-3 sm:px-4 py-3 sm:py-2 rounded  hover:bg-pink-400 transition d-flex align-items-center gap-2 border-0"
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
                          <div className="form-check d-flex gap-4 mt-4 me-3">
                            <button
                              type="button"
                              onClick={() => handleEditClick(item, index)}
                              title="Edit"
                              style={{ background: "#ffeaf1", border: "0" }}
                              className="text-black fw-bold m-2 font-bold text-sm sm:text-base min-w-[80px] sm:min-w-[100px] px-3 sm:px-4 py-3 sm:py-2 rounded bg-pink-100 hover:bg-pink-200 transition d-flex align-items-center gap-2"
                            >
                              <FaEdit className="fs-3" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(item.id)}
                              title="Delete"
                              style={{ background: "#ffeaf1", border: "0" }}
                              className="text-black fw-bold m-2 font-bold text-sm sm:text-base min-w-[80px] sm:min-w-[100px] px-3 sm:px-4 py-3 sm:py-2 rounded bg-pink-100 hover:bg-pink-200 transition d-flex align-items-center gap-2"
                            >
                              <FaTrash className="fs-3" />
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
                      {/* {recommendedCourier ? (
                        <div className="card mb-4">
                          <div className="card-body">
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item">
                                <strong>Estimated Delivery:</strong>{" "}
                                {recommendedCourier.etd} (
                                {recommendedCourier.estimated_delivery_days}{" "}
                                days)
                              </li>
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <div className="alert alert-warning">
                          No delivery service available for this location.
                        </div>
                      )} */}

                      {/*{recommendedCourier && (
                        <div className="card mb-4">
                          <div className="card-body">
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item">
                                <strong>Shipping Method:</strong>{" "}
                                {recommendedCourier.international
                                  ? "International"
                                  : "Domestic"}{" "}
                                - {recommendedCourier.courier_name}
                              </li>
                               <li className="list-group-item">
          <strong>Shipping Cost:</strong>{" "}
          {currency.currencySymbol + recommendedCourier.rate.toFixed(2)}
        </li> 
                              <li className="list-group-item">
                                <strong>Shipping Cost:</strong>{" "}
                                {recommendedCourier?.rate
                                  ? currency.currencySymbol +
                                    recommendedCourier.rate.toFixed(2)
                                  : currency.currencySymbol + "0.00"}
                              </li>
                              <li className="list-group-item">
                                <strong>Estimated Delivery:</strong>{" "}
                                {recommendedCourier.etd}
                              </li>
                              {recommendedCourier.international && (
                                <>
                                  <li className="list-group-item">
                                    <strong>Shipping to:</strong>{" "}
                                    {primaryAddress.country}
                                  </li>
                                  <li className="list-group-item text-warning">
                                    <strong>Note:</strong> Additional customs
                                    duties/taxes may apply
                                  </li>
                                </>
                              )}
                            </ul>
                          </div>
                        </div>
                      )}*/}

                     {isLoading ? (
  <div className="alert alert-info">
    <div className="d-flex align-items-center">
      <div
        className="spinner-border spinner-border-sm me-2"
        role="status"
      >
        <span className="visually-hidden">
          Loading...
        </span>
      </div>
      Checking shipping rates...
    </div>
  </div>
) : paymentError ? (
  <div className="alert alert-danger">
    <strong>Shipping Error:</strong> {paymentError}
    <button
      className="btn btn-sm btn-outline-danger ms-2"
      onClick={checkServiceability}
    >
      Retry
    </button>
  </div>
) : recommendedCourier ? (
  <div className="card mb-4">
    <div className="card-body">
      <h6 className="card-title">
        <i className="fas fa-shipping-fast me-2"></i>
        Shipping Information
      </h6>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <strong>Shipping Method:</strong>{" "}
          <span
            className={`badge ${
              recommendedCourier.international
                ? "bg-primary"
                : "bg-success"
            } me-2`}
          >
            {recommendedCourier.international
              ? "International"
              : "Domestic"}
          </span>
          {recommendedCourier.courier_name}
        </li>
        <li className="list-group-item">
          <strong>Shipping Cost:</strong>{" "}
          {recommendedCourier.rate !== undefined &&
          recommendedCourier.rate !== null ? (
            <span className="text-success fw-bold">
              {currency.currencySymbol}
              {parseFloat(
                recommendedCourier.rate
              ).toFixed(2)}
            </span>
          ) : (
            <span className="text-muted">
              Rate not available
            </span>
          )}
        </li>
        <li className="list-group-item">
          <strong>Estimated Delivery:</strong>{" "}
          <span className="text-info">
            {recommendedCourier.etd || "Not available"}
          </span>
        </li>
        {recommendedCourier.international && (
          <>
            <li className="list-group-item">
              <strong>Shipping to:</strong>{" "}
              <span className="fw-bold">
                {primaryAddress.country}
              </span>
            </li>
            <li className="list-group-item">
              <div className="alert alert-warning mb-0 py-2">
                <i className="fas fa-exclamation-triangle me-2"></i>
                <strong>Note:</strong> Additional customs
                duties/taxes may apply upon delivery
              </div>
            </li>
          </>
        )}
        {/* Debug information - remove in production */}
        {process.env.NODE_ENV === "development" && (
          <li className="list-group-item">
            <details>
              <summary className="text-muted small">
                Debug Info
              </summary>
              <pre className="small mt-2 text-muted">
                {JSON.stringify(
                  {
                    rate: recommendedCourier.rate,
                    freight_charge:
                      recommendedCourier.freight_charge,
                    courier_company_id:
                      recommendedCourier.courier_company_id,
                    international:
                      recommendedCourier.international,
                  },
                  null,
                  2
                )}
              </pre>
            </details>
          </li>
        )}
      </ul>
    </div>
  </div>
) : (
  <div className="alert alert-secondary">
    <i className="fas fa-info-circle me-2"></i>
    Click "Check Shipping Rates" to calculate shipping
    costs
  </div>
)}


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
                                const finalProductPrice =
                                  (
                                    cartItem.price * currency.currencyRate
                                  ).toFixed(2) || 0;
                                const finalDiscountedPrice =
                                  (
                                    discountedPrice * currency.currencyRate
                                  ).toFixed(2) || 0;

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
                              <li>
                                {currency.currencySymbol +
                                  (recommendedCourier?.rate?.toFixed(2) ||
                                    "0.00")}
                              </li>
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
                                  (
                                    cartTotalPrice -
                                    discount +
                                    (recommendedCourier?.rate || 0)
                                  ).toFixed(2)}
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
                          type="submit"
                          className="btn-hover"
                          disabled={isLoading || !recommendedCourier}
                        >
                          {isLoading ? (
                            <>
                              <span
                                className="btn-hover"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              PLACE ORDER
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
