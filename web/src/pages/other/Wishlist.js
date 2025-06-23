// import { Fragment } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useLocation } from "react-router-dom";
// import { getDiscountPrice } from "../../helpers/product";
// import SEO from "../../components/seo";
// import LayoutOne from "../../layouts/LayoutOne";
// import { addToCart } from "../../store/slices/cart-slice";
// import {
//   deleteFromWishlist,
//   deleteAllFromWishlist,
// } from "../../store/slices/wishlist-slice";

// import axios from "axios";
// import { BASE_URL } from "../../config";
// // const URL = "http://localhost:3000"; // Adjust as needed
// const customerInfoSting= localStorage.getItem('customerinfo');
// const customerinfo = customerInfoSting ? JSON.parse(customerInfoSting) : null;
// console.log("this is id customer description", customerinfo?.id);
// const CUSTOMERID = customerinfo?.id;
// console.log("this is customer id", CUSTOMERID);

// const Wishlist = () => {
//   const dispatch = useDispatch();
//   let { pathname } = useLocation();

//   const currency = useSelector((state) => state.currency);
//   const { wishlistItems } = useSelector((state) => state.wishlist);
//   const { cartItems } = useSelector((state) => state.cart);
//   const handledeleteWishlist = async (itemIds) => {
//      dispatch(deleteFromWishlist({id: itemIds})); 


//     try {
//         const payload = {
//         CUSTOMERID,
//         ITEMID: itemIds,
//         type: "wishlist",
//       }
//        //   delete api
//       const response = await axios.delete(`${BASE_URL}/deletecartWishlist`, { data: payload })
//       console.log("this is delete data wishlist", response );

//      if (response.status === 200 || response.data.success) {
//       //  dispatch(deleteFromWishlist(itemIds));
//        dispatch(deleteFromWishlist({id: itemIds})); 
//     }
//     }
//     catch (error) {
//       console.log("this is failed to wishlist data backend", error)
//     }
//   }
//   const handleAllcleareWishlist = async () => {
//     try {
//       dispatch(deleteAllFromWishlist())
//       const payload = {
//         CUSTOMERID,
//         type: "wishlist",
//       }
//       console.log("this is payload delete data", payload);
//       //   delete api
//       const response = await axios.delete(`${BASE_URL}/clearAllcartWishlist`, { data: payload })
//       console.log("this is delete data", response.data);

//     // if (response.status === 200 || response.data.success) {
//     //   dispatch(deleteAllFromWishlist());
//     // }
//     }
//     catch (error) {
//       console.log("this is failed to wishlist data backend", error)
//     }
//   }
//   return (
//     <Fragment>
//       <SEO
//         titleTemplate="Wishlist"
//         description="Wishlist page of Anahee Anahee."
//       />
//       <LayoutOne headerTop="visible">
//         <div className="cart-main-area pt-10 pb-30">
//           <div className="container-fluid">
//             {wishlistItems && wishlistItems.length >= 1 ? (
//               <Fragment>
//                 <h3 className="cart-page-title">Your wishlist items</h3>
//                 <div className="row">
//                   <div className="col-12">
//                     <div className="table-responsive">
//                       <div className="table-content cart-table-content">
//                         <table className="table">
//                           <thead>
//                             <tr>
//                               <th>Image</th>
//                               <th>Product Name</th>
//                               <th>Unit Price</th>
//                               <th>Add To Cart</th>
//                               <th>Action</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {wishlistItems.map((wishlistItem, key) => {
//                               const discountedPrice = getDiscountPrice(
//                                 wishlistItem.price,
//                                 wishlistItem.discount
//                               );
//                               const finalProductPrice = (
//                                 wishlistItem.price * currency.currencyRate
//                               ).toFixed(2);
//                               const finalDiscountedPrice = (
//                                 discountedPrice * currency.currencyRate
//                               ).toFixed(2);
//                               const cartItem = cartItems.find(
//                                 (item) => item.id === wishlistItem.id
//                               );
//                               return (
//                                 <tr key={key}>
//                                   <td className="product-thumbnail">
//                                     <Link
//                                       to={
//                                         process.env.PUBLIC_URL +
//                                         "/product/" +
//                                         wishlistItem.id
//                                       }
//                                     >
//                                       <img
//                                         className="img-fluid"
//                                         src={
//                                           process.env.REACT_APP_PUBLIC_URL +
//                                           wishlistItem.image[0]
//                                         }
//                                         alt=""
//                                       />
//                                     </Link>
//                                   </td>

//                                   <td className="product-name text-center">
//                                     <Link
//                                       to={
//                                         process.env.PUBLIC_URL +
//                                         "/product/" +
//                                         wishlistItem.id
//                                       }
//                                     >
//                                       {wishlistItem.name}
//                                     </Link>
//                                   </td>

//                                   <td className="product-price-cart">
//                                     {discountedPrice !== null ? (
//                                       <Fragment>
//                                         <span className="amount old">
//                                           {currency.currencySymbol +
//                                             finalProductPrice}
//                                         </span>
//                                         <span className="amount">
//                                           {currency.currencySymbol +
//                                             finalDiscountedPrice}
//                                         </span>
//                                       </Fragment>
//                                     ) : (
//                                       <span className="amount">
//                                         {currency.currencySymbol +
//                                           finalProductPrice}
//                                       </span>
//                                     )}
//                                   </td>

//                                   <td className="product-wishlist-cart">
//                                     {wishlistItem.affiliateLink ? (
//                                       <a
//                                         href={wishlistItem.affiliateLink}
//                                         rel="noopener noreferrer"
//                                         target="_blank"
//                                       >
//                                         Buy now
//                                       </a>
//                                     ) : wishlistItem.variation &&
//                                       wishlistItem.variation.length >= 1 ? (
//                                       <Link
//                                         to={`${process.env.PUBLIC_URL}/product/${wishlistItem.id}`}
//                                         className="px-4 py-3 text-sm sm:px-5 sm:py-5 sm:text-base"
//                                       >
//                                         Select option
//                                       </Link>
//                                     ) : wishlistItem.stock &&
//                                       wishlistItem.stock > 0 ? (
//                                       <button
//                                         onClick={() =>
//                                           dispatch(addToCart(wishlistItem))
//                                         }
//                                         className={
//                                           cartItem !== undefined &&
//                                           cartItem.quantity > 0
//                                             ? "active"
//                                             : ""
//                                         }
//                                         disabled={
//                                           cartItem !== undefined &&
//                                           cartItem.quantity > 0
//                                         }
//                                         title={
//                                           wishlistItem !== undefined
//                                             ? "Added to cart"
//                                             : "Add to cart"
//                                         }
//                                       >
//                                         {cartItem !== undefined &&
//                                         cartItem.quantity > 0
//                                           ? "Added"
//                                           : "Add to cart"}
//                                       </button>
//                                     ) : (
//                                       <button disabled className="active">
//                                         Out of stock
//                                       </button>
//                                     )}
//                                   </td>

//                                   <td className="product-remove">

//                                   <button onClick={() =>  handledeleteWishlist(wishlistItem.id)}>
//                                     <i className="fa fa-times"></i>
//                                   </button>
//                                     {/* <button
//                                       onClick={() =>
//                                         dispatch(
//                                           deleteFromWishlist(wishlistItem)
//                                         )
//                                       }
//                                     >
//                                       <i className="fa fa-times"></i>
//                                     </button> */}
//                                   </td>
//                                 </tr>
//                               );
//                             })}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-lg-12">
//                     <div className="cart-shiping-update-wrapper d-flex flex-column flex-sm-row justify-content-center justify-content-sm-between align-items-center gap-3 text-center">
//                       <div className="cart-shiping-update">
//                         <Link
//                           to={process.env.PUBLIC_URL + "/shop-grid-standard"}
//                         >
//                           Continue Shopping
//                         </Link>
//                       </div>
//                       <div className="cart-clear">

//                         <button onClick={handleAllcleareWishlist}>
//                           Clear Wishlist
//                         </button>
//                         {/* <button
//                           onClick={() => dispatch(deleteAllFromWishlist())}
//                         >
//                           Clear Wishlist
//                         </button> */}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Fragment>
//             ) : (
//               <div className="row">
//                 <div className="col-lg-12">
//                   <div className="item-empty-area text-center">
//                     <div className="item-empty-area__icon mb-30">
//                       <i className="pe-7s-like"></i>
//                     </div>
//                     <div className="item-empty-area__text">
//                       No items found in wishlist <br />
//                       <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
//                         Add Items
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </LayoutOne>
//     </Fragment>
//   );
// };

// export default Wishlist;


import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import { addToCart } from "../../store/slices/cart-slice";
import {
  deleteFromWishlist,
  deleteAllFromWishlist,
} from "../../store/slices/wishlist-slice";
import axios from "axios";
import { BASE_URL } from "../../config";
import RequireAuth from "./RequireAuth";
// const URL = "http://localhost:3000"; // Adjust as needed
const customerInfoSting = localStorage.getItem('customerinfo');
const customerinfo = customerInfoSting ? JSON.parse(customerInfoSting) : null;
console.log("this is id customer description", customerinfo?.id);
const CUSTOMERID = customerinfo?.id;
console.log("this is customer id", CUSTOMERID);
const Wishlist = () => {
  const dispatch = useDispatch();
  let { pathname } = useLocation();
  const currency = useSelector((state) => state.currency);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);
  const handledeleteWishlist = async (itemIds) => {
    dispatch(deleteFromWishlist({ id: itemIds }));

    try {
      const payload = {
        CUSTOMERID,
        ITEMID: itemIds,
        type: "wishlist",
      }
      //   delete api
      const response = await axios.delete(`${BASE_URL}/deletecartWishlist`, { data: payload })
      console.log("this is delete data wishlist", response);

      if (response.status === 200 || response.data.success) {
        //  dispatch(deleteFromWishlist(itemIds));
        dispatch(deleteFromWishlist({ id: itemIds }));
      }
    }
    catch (error) {
      console.log("this is failed to wishlist data backend", error)
    }
  }
  const handleAllcleareWishlist = async () => {
    try {
      dispatch(deleteAllFromWishlist())
      const payload = {
        CUSTOMERID,
        type: "wishlist",
      }
      console.log("this is payload delete data", payload);
      //   delete api
      const response = await axios.delete(`${BASE_URL}/clearAllcartWishlist`, { data: payload })
      console.log("this is delete data", response.data);

      // if (response.status === 200 || response.data.success) {
      //   dispatch(deleteAllFromWishlist());
      // }
    }
    catch (error) {
      console.log("this is failed to wishlist data backend", error)
    }
  }
  return (
    <RequireAuth>
      <Fragment>
        <SEO
          titleTemplate="Wishlist"
          description="Wishlist page of Anahee Anahee."
        />
        <LayoutOne headerTop="visible">
          <div className="cart-main-area pt-10 pb-30">
            <div className="container-fluid">
              {wishlistItems && wishlistItems.length >= 1 ? (
                <Fragment>
                  <h3 className="cart-page-title">Your wishlist items</h3>
                  <div className="row">
                    <div className="col-12">
                      <div className="table-responsive">
                        <div className="table-content cart-table-content">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Unit Price</th>
                                <th>Add To Cart</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {wishlistItems.map((wishlistItem, key) => {
                                const discountedPrice = getDiscountPrice(
                                  wishlistItem.price,
                                  wishlistItem.discount
                                );
                                const finalProductPrice = (
                                  wishlistItem.price * currency.currencyRate
                                ).toFixed(2);
                                const finalDiscountedPrice = (
                                  discountedPrice * currency.currencyRate
                                ).toFixed(2);
                                const cartItem = cartItems.find(
                                  (item) => item.id === wishlistItem.id
                                );
                                return (
                                  <tr key={key}>
                                    <td className="product-thumbnail">
                                      <Link
                                        to={
                                          process.env.PUBLIC_URL +
                                          "/product/" +
                                          wishlistItem.id
                                        }
                                      >
                                        <img
                                          className="img-fluid"
                                          src={
                                            process.env.REACT_APP_PUBLIC_URL +
                                            wishlistItem.image[0]
                                          }
                                          alt=""
                                        />
                                      </Link>
                                    </td>
                                    <td className="product-name text-center">
                                      <Link
                                        to={
                                          process.env.PUBLIC_URL +
                                          "/product/" +
                                          wishlistItem.id
                                        }
                                      >
                                        {wishlistItem.name}
                                      </Link>
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
                                    <td className="product-wishlist-cart select-button">
                                      {wishlistItem.affiliateLink ? (
                                        <a
                                          href={wishlistItem.affiliateLink}
                                          rel="noopener noreferrer"
                                          target="_blank"
                                        >
                                          Buy now
                                        </a>
                                      ) : wishlistItem.variation &&
                                        wishlistItem.variation.length >= 1 ? (
                                        <Link
                                          to={`${process.env.PUBLIC_URL}/product/${wishlistItem.id}`}
                                          className="px-4 py-3 text-sm sm:px-5 sm:py-5 sm:text-base"
                                        >
                                          Select option
                                        </Link>
                                      ) : wishlistItem.stock &&
                                        wishlistItem.stock > 0 ? (
                                        <button
                                          onClick={() =>
                                            dispatch(addToCart(wishlistItem))
                                          }
                                          className={
                                            cartItem !== undefined &&
                                              cartItem.quantity > 0
                                              ? "active"
                                              : ""
                                          }
                                          disabled={
                                            cartItem !== undefined &&
                                            cartItem.quantity > 0
                                          }
                                          title={
                                            wishlistItem !== undefined
                                              ? "Added to cart"
                                              : "Add to cart"
                                          }
                                        >
                                          {cartItem !== undefined &&
                                            cartItem.quantity > 0
                                            ? "Added"
                                            : "Add to cart"}
                                        </button>
                                      ) : (
                                        <button disabled className="active">
                                          Out of stock
                                        </button>
                                      )}
                                    </td>
                                    <td className="product-remove">
                                      <button onClick={() => handledeleteWishlist(wishlistItem.id)}>
                                        <i className="fa fa-times"></i>
                                      </button>
                                      {/* <button
                                      onClick={() =>
                                        dispatch(
                                          deleteFromWishlist(wishlistItem)
                                        )
                                      }
                                    >
                                      <i className="fa fa-times"></i>
                                    </button> */}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="cart-shiping-update-wrapper d-flex flex-column flex-sm-row justify-content-center justify-content-sm-between align-items-center gap-3 text-center">
                        <div className="cart-shiping-update">
                          <Link
                            to={process.env.PUBLIC_URL + "/shop-grid-standard"}
                          >
                            Continue Shopping
                          </Link>
                        </div>
                        <div className="cart-clear">
                          <button onClick={handleAllcleareWishlist}>
                            Clear Wishlist
                          </button>
                          {/* <button
                          onClick={() => dispatch(deleteAllFromWishlist())}
                        >
                          Clear Wishlist
                        </button> */}
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
                        <i className="pe-7s-like"></i>
                      </div>
                      <div className="item-empty-area__text">
                        No items found in wishlist <br />
                        <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                          Add Items
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
    </RequireAuth>

  );
};
export default Wishlist;