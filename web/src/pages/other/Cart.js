import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SEO from "../../components/seo";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  deleteAllFromCart,
} from "../../store/slices/cart-slice";
import { cartItemStock } from "../../helpers/product";
import axios from "axios";
import { BASE_URL } from "../../config";

const Cart = () => {
  let cartTotalPrice = 0;
  const [couponCode, setCouponCode] = useState("");
  const [quantityCount] = useState(1);
  const dispatch = useDispatch();
  let { pathname } = useLocation();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [cartTotal, setCartTotal] = useState(0);

  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponSuccess, setCouponSuccess] = useState(null);

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };
  const handleApplyCoupon = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/applycoupon`, {
        coupon_code: couponCode,
        cart_total: cartTotalPrice.toFixed(2),
      });

      if (response.data.success) {
        setDiscount(response.data.discount);
        setCouponMessage(response.data.msg);
        setCouponSuccess(true);
      } else {
        setCouponMessage(response.data.msg);
        setCouponSuccess(false);
        setDiscount(0);
      }
    } catch (err) {
      setCouponMessage(err.response?.data?.msg || "Something went wrong");
      setCouponSuccess(false);
      setDiscount(0);
    }
  };

  const handleProceedToCheckout = async () => {
    const queryParams = new URLSearchParams({
      couponCode: couponCode,
    }).toString();

    const orderData = {
      couponCode: couponCode,
      discount: discount,
      items: cartItems.map((item) => ({
        ITEMDESC: item.name, // Item name as ITEMID
        QTY: item.quantity, // Quantity as QTY
        AMOUNT:
          (getDiscountPrice(item.price, item.discount) || item.price) *
          item.quantity, // Subtotal for the item
      })),
    };

    try {
      // Send the data to the backend API
      const response = await axios.post(
        // "http://your-backend-url/api/addSalesDetail",  // Replace with your backend URL
        `${BASE_URL}/addSalesDetail`,
        orderData
      );
      if (response.data.success) {
        // alert("Proceeding to checkout...");
        navigate(`/checkout?${queryParams}`);
      }
    } catch (error) {
      console.error("Error proceeding to checkout:", error);
      alert("There was an error processing your checkout.");
    }
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Cart"
        description="Cart page of Anahee react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        {/* <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Cart", path: process.env.PUBLIC_URL + pathname }
          ]} 
        /> */}
        <div className="cart-main-area pt-10 pb-30">
          <div className="container-fluid">
            {cartItems && cartItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Your cart items</h3>
                <div className="row">
                  <div className="col-lg-8">
                    <div className="row">
                      <div className="col-12">
                        <div className="table-content table-responsive cart-table-content">
                          <table>
                            <thead>
                              <tr>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Unit Price</th>
                                <th>Qty</th>
                                <th>Subtotal</th>
                                <th>action</th>
                              </tr>
                            </thead>
                            <tbody>
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

                                discountedPrice != null
                                  ? (cartTotalPrice +=
                                      finalDiscountedPrice * cartItem.quantity)
                                  : (cartTotalPrice +=
                                      finalProductPrice * cartItem.quantity);
                                return (
                                  <tr key={key}>
                                    <td className="product-thumbnail">
                                      <Link
                                        to={
                                          process.env.PUBLIC_URL +
                                          "/product/" +
                                          cartItem.id
                                        }
                                      >
                                        <img
                                          className="img-fluid"
                                          src={
                                            process.env.REACT_APP_PUBLIC_URL +
                                            cartItem.image[0]
                                          }
                                          alt=""
                                        />
                                      </Link>
                                    </td>

                                    <td className="product-name">
                                      <Link
                                        to={
                                          process.env.PUBLIC_URL +
                                          "/product/" +
                                          cartItem.id
                                        }
                                      >
                                        {cartItem.name}
                                      </Link>
                                      {cartItem.selectedProductColor &&
                                      cartItem.selectedProductSize ? (
                                        <div className="cart-item-variation">
                                          <span>
                                            Color:{" "}
                                            {cartItem.selectedProductColor}
                                          </span>
                                          <span>
                                            Size: {cartItem.selectedProductSize}
                                          </span>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </td>

                                    <td className="product-price-cart">
                                      {discountedPrice !== null ? (
                                        <Fragment>
                                          <span className="amount old">
                                            {currency.currencySymbol +
                                              finalProductPrice}
                                          </span>
                                          <span className="amount">
                                            {currency.currencySymbol +
                                              finalDiscountedPrice}
                                          </span>
                                        </Fragment>
                                      ) : (
                                        <span className="amount">
                                          {currency.currencySymbol +
                                            finalProductPrice}
                                        </span>
                                      )}
                                    </td>

                                    <td className="product-quantity">
                                      <div className="cart-plus-minus">
                                        <button
                                          className="dec qtybutton"
                                          onClick={() =>
                                            dispatch(decreaseQuantity(cartItem))
                                          }
                                        >
                                          -
                                        </button>
                                        <input
                                          className="cart-plus-minus-box"
                                          type="text"
                                          value={cartItem.quantity}
                                          readOnly
                                        />
                                        <button
                                          className="inc qtybutton"
                                          onClick={() =>
                                            dispatch(
                                              addToCart({
                                                ...cartItem,
                                                quantity: quantityCount,
                                              })
                                            )
                                          }
                                          disabled={
                                            cartItem !== undefined &&
                                            cartItem.quantity &&
                                            cartItem.quantity >=
                                              cartItemStock(
                                                cartItem,
                                                cartItem.selectedProductColor,
                                                cartItem.selectedProductSize
                                              )
                                          }
                                        >
                                          +
                                        </button>
                                      </div>
                                    </td>
                                    <td className="product-subtotal">
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
                                    </td>

                                    <td className="product-remove">
                                      <button
                                        onClick={() =>
                                          dispatch(
                                            deleteFromCart(cartItem.cartItemId)
                                          )
                                        }
                                      >
                                        <i className="fa fa-times"></i>
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="cart-shiping-update-wrapper   d-flex flex-column flex-sm-row justify-content-center justify-content-sm-between align-items-center gap-3 text-center">
                              <div className="cart-shiping-update">
                                <Link
                                  to={
                                    process.env.PUBLIC_URL +
                                    "/shop-grid-standard"
                                  }
                                >
                                  Continue Shopping
                                </Link>
                              </div>
                              <div className="cart-clear">
                                <button
                                  onClick={() => dispatch(deleteAllFromCart())}
                                >
                                  Clear Shopping Cart
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="row">
                      {/* <div className="col-lg-4 col-md-6">
                        <div className="cart-tax">
                          <div className="title-wrap">
                            <h4 className="cart-bottom-title section-bg-gray">
                              Estimate Shipping And Tax
                            </h4>
                          </div>
                          <div className="tax-wrapper">
                            <p>
                              Enter your destination to get a shipping estimate.
                            </p>
                            <div className="tax-select-wrapper">
                              <div className="tax-select">
                                <label>* Country</label>
                                <select className="email s-email s-wid">
                                  <option>India</option>
                                  <option>America</option>
                                  <option>United State</option>
                                  <option>Afghanistan</option>
                                  <option>Belgium</option>
                                </select>
                              </div>
                              <div className="tax-select">
                                <label>* Region / State</label>
                                <select className="email s-email s-wid">
                                  <option>Madhya Pradesh</option>
                                  <option>Gujarat</option>
                                  <option>Uttar Pradesh</option>
                                  <option>Rajasthan</option>
                                  <option>Bihar</option>
                                </select>
                              </div>
                              <div className="tax-select">
                                <label>* Zip/Postal Code</label>
                                <input type="text" />
                              </div>
                              <button className="cart-btn-2" type="submit">
                                Get A Quote
                              </button>
                            </div>
                          </div>
                        </div>
                      </div> */}
                      <div className="mb-4">
                        <div className="discount-code-wrapper">
                          <div className="title-wrap">
                            <h4 className="cart-bottom-title section-bg-gray">
                              Use Coupon Code
                            </h4>
                          </div>
                          <div className="discount-code">
                            <p>Enter your coupon code if you have one.</p>
                            <form onSubmit={handleApplyCoupon}>
                              <input
                                type="text"
                                required
                                name="couponCode"
                                value={couponCode}
                                onChange={handleCouponChange}
                              />
                              <button className="cart-btn-2" type="submit">
                                Apply Coupon
                              </button>
                            </form>
                            {couponMessage && (
                              <div
                                className={`mt-2 ${
                                  couponSuccess ? "text-success" : "text-danger"
                                }`}
                              >
                                {couponMessage}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="grand-totall">
                          <div className="title-wrap">
                            <h4 className="cart-bottom-title section-bg-gary-cart">
                              Cart Total
                            </h4>
                          </div>
                          <h5>
                            Total Amount
                            <span>
                              {currency.currencySymbol +
                                cartTotalPrice.toFixed(2)}
                            </span>
                          </h5>

                          <h5>
                            Discount
                            <span>
                              {"-" + currency.currencySymbol + discount}
                            </span>
                          </h5>

                          <h4 className="grand-totall-title">
                            Grand Total
                            <span>
                              {currency.currencySymbol +
                                (cartTotalPrice - discount).toFixed(2)}
                            </span>
                          </h4>
                          <div>
                            <Link
                              to={process.env.PUBLIC_URL + "/checkout"}
                              onClick={handleProceedToCheckout}
                            >
                              Proceed to Checkout
                              {/* <button onClick={handleProceedToCheckout} >
                          </button> */}
                            </Link>
                          </div>

                          {/* <button className="cart-btn-2" type="button" onClick={handleProceedToCheckout} >
                            Apply Coupon & Proceed to Checkout
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart <br />{" "}
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

export default Cart;
