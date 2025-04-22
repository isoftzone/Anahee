import { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import axios from "axios";
import { BASE_URL } from "./../../config";

const Success = () => {
  let cartTotalPrice = 0;
  const currency = useSelector((state) => state.currency);

  const [pickupPincode, setPickupPincode] = useState("110001");
  const [deliveryPincode, setDeliveryPincode] = useState("400001");
  const [weight, setWeight] = useState(0.5);
  const [cod, setCod] = useState(1);
  const [couriers, setCouriers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recommendedCourier, setRecommendedCourier] = useState(null);

  useEffect(() => {
    checkServiceability();
  }, []);


  const checkServiceability = async () => {
    setLoading(true);
    setError(null);
    try {
      const serviceabilityResponse = await axios.post(
        `${BASE_URL}/api/shiprocket/checkServiceability`,
        {
          pickup_postcode: pickupPincode,
          delivery_postcode: deliveryPincode,
          cod: cod,
          weight: weight
        }
      );
      
      if (serviceabilityResponse.data.success) {
        const availableCouriers = serviceabilityResponse.data.data.data.available_courier_companies;
        setCouriers(availableCouriers);
        
        // Find the recommended courier
        const recommendedId = serviceabilityResponse.data.data.data.recommended_courier_company_id;
        const recommended = availableCouriers.find(c => c.courier_company_id === recommendedId);
        setRecommendedCourier(recommended);
      } else {
        setError("No couriers available for this pincode combination");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError("Failed to check serviceability. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/addSalesMaster`, {
        // Include your orderData fields here
      });
      if (response.data.success) {
        alert("Order placed successfully!");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an error placing your order.");
    }
  };

  // Format date to show day name
  const formatDeliveryDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Checkout"
        description="Checkout page of Anahee react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        <div className="checkout-area pt-10 pb-30">
          <div className="container">
            <div className="row mb-5">
              <div className="col-lg-12">
                {error && (
                  <div className="alert alert-danger mt-3">
                    {error}
                  </div>
                )}
                {couriers.length > 0 && (
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">All Available Shipping Options</h5>
                    </div>
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table table-hover mb-0">
                          <thead className="table-light">
                            <tr>
                              <th>Courier</th>
                              <th>Type</th>
                              <th>Delivery Date</th>
                              <th>Shipping</th>
                              <th>COD</th>
                              <th>Total</th>
                              <th>Features</th>
                            </tr>
                          </thead>
                          <tbody>
                            {couriers.map((courier, idx) => (
                              <tr 
                                key={idx} 
                                className={courier.courier_company_id === recommendedCourier?.courier_company_id ? 'table-success' : ''}
                              >
                                <td>
                                  {courier.courier_name}
                                  {courier.courier_company_id === recommendedCourier?.courier_company_id && (
                                    <span className="badge bg-success ms-2">Recommended</span>
                                  )}
                                </td>
                                <td>{courier.mode === 1 ? 'Air' : 'Surface'}</td>
                                <td>
                                  {formatDeliveryDate(courier.etd)}<br />
                                  <small>({courier.estimated_delivery_days} days)</small>
                                </td>
                                <td>₹{courier.freight_charge.toFixed(2)}</td>
                                <td>
                                  {courier.cod === 1 ? (
                                    `₹${courier.cod_charges.toFixed(2)}`
                                  ) : (
                                    'N/A'
                                  )}
                                </td>
                                <td>
                                  <strong>₹{courier.rate.toFixed(2)}</strong>
                                </td>
                                <td>
                                  <div className="d-flex flex-wrap gap-1">
                                    {courier.realtime_tracking === 'Real Time' && (
                                      <span className="badge bg-info">Tracking</span>
                                    )}
                                    {courier.call_before_delivery === 'Available' && (
                                      <span className="badge bg-primary">Call Before Delivery</span>
                                    )}
                                    {courier.pod_available === 'Instant' && (
                                      <span className="badge bg-warning text-dark">POD Available</span>
                                    )}
                                    {courier.cod === 1 && (
                                      <span className="badge bg-danger">COD</span>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12 col-md-6">
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
                        {/* Cart items */}
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
                    <div className="payment-method"></div>
                  </div>
                  <div className="place-order mt-25">
                    <button className="btn-hover" onClick={handleSubmit}>
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Success;