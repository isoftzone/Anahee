import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Badge } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import HeaderOne from "../../wrappers/header/HeaderOne";
import FooterOne from "../../wrappers/footer/FooterOne";
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
    <>
      <LayoutOne headerTop="visible">
        <div className="container-fluid orders-container" style={{maxWidth:"0px"}}>
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
                <div className="orders-section">
                  <h2 className="section-title">Your Order History</h2>
                  {isLoading ? (
                    <div className="loading-spinner">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="loading-text">Loading your orders...</p>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="no-orders">
                      <i className="bi bi-box-seam no-orders-icon"></i>
                      <h3 className="no-orders-title">No orders found</h3>
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
                  <h2 className="section-title">Delivered Orders</h2>
                  {isLoading ? (
                    <div className="loading-spinner">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="loading-text">
                        Loading delivered orders...
                      </p>
                    </div>
                  ) : deliveredOrders.length === 0 ? (
                    <div className="no-orders">
                      <i className="bi bi-truck no-orders-icon"></i>
                      <h3 className="no-orders-title">No delivered orders</h3>
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
                  <h2 className="section-title">Cancelled Orders</h2>
                  {isLoading ? (
                    <div className="loading-spinner">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="loading-text">
                        Loading cancelled orders...
                      </p>
                    </div>
                  ) : cancelledOrders.length === 0 ? (
                    <div className="no-orders">
                      <i className="bi bi-x-circle no-orders-icon"></i>
                      <h3 className="no-orders-title">No cancelled orders</h3>
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
        </div>
      </LayoutOne>
    </>
  );
};
export default Orders;
