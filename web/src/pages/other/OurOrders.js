import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Container } from "react-bootstrap";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";

const setOrders = [
  {
    id: 1,
    productName: "Nike Air Max",
    image: "/assets/img/products/nike-air-max.jpg",
    unitPrice: 120.0,
    qty: 2,
    color: "Red",
    size: "10",
  },
  {
    id: 2,
    productName: "Adidas Ultraboost",
    image: "/assets/img/products/adidas-ultraboost.jpg",
    unitPrice: 150.0,
    qty: 1,
    color: "Black",
    size: "9",
  },
];

const Orders = async () => {
  const [activeTab, setActiveTab] = useState("order_tab");
  const [orders, setOrders] = useState([]);
  const [customerId, setCustomerId] = useState(null);

  useEffect(() => {
    const customerData = JSON.parse(
      localStorage.getItem("customerInfo") || "{}"
    );
    if (customerData && customerData.id) {
      setCustomerId(customerData.id);
    }
    const response = axios.post(`${BASE_URL}/getallorders/${customerId}`);
    if (response.data.success) {
      setOrders(response.data, orders);
    }
  }, []);

  return (
    <Container className="customer_details orderList">
      <div className="orderTop">
        <h2 className="hidden-xs">My Orders</h2>
      </div>

      <div className="order_tab">
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3"
        >
          <Tab eventKey="order_tab" title="Orders">
            <div className="order-main-area pt-10 pb-30">
              <div className="container">
                <Fragment>
                  <h3 className="order-page-title">Your Past Orders</h3>
                  <div className="row">
                    <div className="col-12">
                      <div className="table-content table-responsive order-table-content">
                        <table>
                          <thead>
                            <tr>
                              <th>Image</th>
                              <th>Product Name</th>
                              <th>Unit Price</th>
                              <th>Qty</th>
                              <th>Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {setOrders.map((order, key) => (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <img
                                    className="img-fluid"
                                    src={order.image}
                                    alt={order.productName}
                                    width="70"
                                  />
                                </td>
                                <td className="product-name">
                                  {order.productName}
                                  <div className="order-item-variation">
                                    <span>Color: {order.color}</span>
                                    <span>Size: {order.size}</span>
                                  </div>
                                </td>
                                <td className="product-price-order">
                                  ${order.unitPrice.toFixed(2)}
                                </td>
                                <td className="product-quantity">
                                  {order.qty}
                                </td>
                                <td className="product-subtotal">
                                  ${(order.unitPrice * order.qty).toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </Fragment>
              </div>
            </div>
          </Tab>

          <Tab eventKey="buy_again" title="Buy Again">
            <div className="order-main-area pt-10 pb-30">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 text-center">
                    <p>No items available to buy again.</p>
                  </div>
                </div>
              </div>
            </div>
          </Tab>

          <Tab eventKey="open_orders" title="Open Orders">
            <div className="orderCardWrap">No open orders.</div>
          </Tab>

          <Tab eventKey="cancelled_orders" title="Cancelled Orders">
            <div className="order-main-area pt-10 pb-30">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 text-center">
                    <p>No cancelled orders.</p>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
};

export default Orders;
