import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDiscountPrice } from "../../../helpers/product";
import { deleteFromCart } from "../../../store/slices/cart-slice"
// import { axios } from 'axios';
import { BASE_URL } from "../../../config";
import axios from "axios";

const customerInfoSting = localStorage.getItem('customerinfo');
const customerinfo = customerInfoSting ? JSON.parse(customerInfoSting) : null;
const CUSTOMERID = customerinfo?.id;
console.log("this is customer id cart id data", CUSTOMERID);

const MenuCart = () => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  let cartTotalPrice = 0;

  


const handledeleteCart = async (item) => {
  const ITEMID = item.id;
   const cartItemId =item.cartItemId;
  console.log(":wastebasket: Deleting item:", { ITEMID, cartItemId });
  // Always remove from Redux immediately (optimistic UI)
  dispatch(deleteFromCart(cartItemId));
  // If no customer ID, stop here (guest user case)
  if (!CUSTOMERID) {
    console.log(":receipt: Guest user — deleted only from local Redux store.");
    return;
  }
  console.log("this sdf");
  // Logged-in user — proceed to delete from server
  const payload = {
    CUSTOMERID,
    ITEMID,
    type: "cart",
  };
  try {
    const response = await axios.delete(`${BASE_URL}/deletecartWishlist`, { data: payload });
    if (response.status === 200 && response.data?.success) {
      console.log(":white_check_mark: Successfully deleted from server.");
      //  dispatch(deleteFromCart(cartItemId));
      // No need to dispatch again — already deleted above
    } else {
      console.warn(":warning: Server deletion failed:", response.data?.message ?? response.data);
      alert("Failed to delete item from server.");
      // Optional: Re-add to cart if needed (rollback optimistic update)
    }
  } catch (error) {
    console.error(":x: API error while deleting cart item:", error);
    alert("An error occurred while deleting the item.");
    // Optional: Re-add to cart if needed
  }
};

  return (
    <div className="shopping-cart-content">
      {cartItems && cartItems.length > 0 ? (
        <Fragment>
          <ul>
            {cartItems.map((item) => {
              const discountedPrice = getDiscountPrice(
                item.price,
                item.discount
              );
              const finalProductPrice = (
                item.price * currency.currencyRate
              ).toFixed(2);
              const finalDiscountedPrice = (
                discountedPrice * currency.currencyRate
              ).toFixed(2);

              discountedPrice != null
                ? (cartTotalPrice += finalDiscountedPrice * item.quantity)
                : (cartTotalPrice += finalProductPrice * item.quantity);
              return (
                <li className="single-shopping-cart" key={item.cartItemId}>
                  <div className="shopping-cart-img">
                    <Link to={process.env.PUBLIC_URL + "/product/" + item.id}>
                      <img
                        alt=""
                        src={process.env.REACT_APP_PUBLIC_URL + item.image[0]}
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link
                        to={process.env.PUBLIC_URL + "/product/" + item.id}
                      >
                        {" "}
                        {item.name}{" "}
                      </Link>
                    </h4>
                    <h6>Qty: {item.quantity}</h6>
                    <span>
                      {discountedPrice !== null
                        ? currency.currencySymbol + finalDiscountedPrice
                        : currency.currencySymbol + finalProductPrice}
                    </span>
                    {item.selectedProductColor &&
                    item.selectedProductSize ? (
                      <div className="cart-item-variation">
                        <span>Color: {item.selectedProductColor}</span>
                        <span>Size: {item.selectedProductSize}</span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="shopping-cart-delete">
                    {/* <button onClick={() => dispatch(deleteFromCart(item.cartItemId))}>
                      <i className="fa fa-times-circle" />
                    </button> */}
                    <button onClick={() => handledeleteCart(item)}>
                      <i className="fa fa-times-circle" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              Total :{" "}
              <span className="shop-total">
                {currency.currencySymbol + cartTotalPrice.toFixed(2)}
              </span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/cart"}>
              view cart
            </Link>
            <Link
              className="default-btn"
              to={process.env.PUBLIC_URL + "/checkout"}
            >
              checkout
            </Link>
          </div>
        </Fragment>
      ) : (
        <p className="text-center">No items added to cart</p>
      )}
    </div>
  );
};

export default MenuCart;
