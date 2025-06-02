import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Badge } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import LayoutOne from "../../layouts/LayoutOne";

const Orders = () => {
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

  const cancelledOrders = orders.filter(
    (order) => order.ORDER_STATUS === "Cancel"
  );
  const deliveredOrders = orders.filter(
    (order) => order.ORDER_STATUS === "Delivered"
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
      <Badge
        pill
        bg={variantMap[status] || "secondary"}
        className="status-badge"
      >
        {status}
      </Badge>
    );
  };

  const renderOrderCard = (order) => {
    let totalAmount = 0;
    const tax = 0; // percent
    const shipping = 0; // flat rate
    let subtotal = 0;

    order.ITEMS?.forEach((item) => {
      const quantity = parseFloat(item.QUANTITY) || 0;
      const amount = parseFloat(item.AMOUNT) || 0;
      subtotal += quantity * amount;
    });

    const discount = parseFloat(order.DISCAMOUNT) || 0;
    const taxAmount = (subtotal * tax) / 100;
    const grandTotal = subtotal + taxAmount + shipping - discount;

    const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      const d = new Date(dateString);
      return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    };

    return (
      <div
        key={order.SALEID}
        className="order-card mb-4 p-3 rounded shadow-sm bg-white border"
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
            <strong>Date:</strong> {formatDate(order.CREATEDON)}
          </span>
          <div className="small text-muted">
            <strong>Payment Method:</strong> {order.PAYMENTMETHOD || "N/A"}
          </div>
          <div className="small text-muted">
            <strong>Payment Status:</strong> {order.PAYMENTSTATUS || "N/A"}
          </div>
        </div>

        {/* Items */}
        {order.ITEMS?.map((item, index) => {
          const quantity = parseFloat(item.QUANTITY) || 0;
          const amount = parseFloat(item.AMOUNT) || 0;
          const lineTotal = amount * quantity;
          totalAmount += lineTotal;
          const imageArray = item.PHOTO?.split(",") || [];
          const firstImage = imageArray[0];

          return (
            <div
              className="row border-top pt-3 mb-3 align-items-center"
              key={index}
            >
              {/* Image */}
              <div className="col-4 col-md-2 mb-2 mb-md-0">
                {firstImage && (
                  <img
                    src={process.env.REACT_APP_PUBLIC_URL + firstImage}
                    alt={item.ITEMNAME || "Product Image"}
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
        {["Placed", "Progress"].includes(order.ORDER_STATUS) && (
          <div className="d-flex justify-content-between align-items-center border-top pt-3">
            <strong></strong>
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
                fontWeight: "bold",
                cursor: "pointer",
              }}
              aria-label={`Cancel Order ${order.SALEID}`}
            >
              Cancel Order
            </button>
          </div>
        )}
        {/* Summary */}
        <div className="mt-3 p-4 bg-light rounded">
          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal:</span>
            <span className="fw-medium">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Tax ({tax}%):</span>
            <span>₹{taxAmount.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Discount:</span>
            <span>-₹{discount.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Shipping:</span>
            <span>₹{shipping.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between pt-2 border-top border-secondary">
            <span className="fw-bold">Grand Total:</span>
            <span className="text-dark fw-bold">₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <LayoutOne headerTop="visible">
      <div className="container orders-container py-4">
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
    </LayoutOne>
  );
};

export default Orders;
