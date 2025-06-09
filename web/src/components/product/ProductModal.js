import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { EffectFade, Thumbs, Pagination } from "swiper";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./sub-components/ProductRating";
import Swiper, { SwiperSlide } from "../../components/swiper";
import { getProductCartQuantity } from "../../helpers/product";
// import { useEffect } from "react";
import { addToCart, deleteFromCart } from "../../store/slices/cart-slice";
import {
  addToWishlist,
  deleteFromWishlist,
  removeColorFromWishlist,
} from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";
import axios from "axios";
import { BASE_URL } from "../../config";
const customerInfoSting = localStorage.getItem("customerinfo");
const customerinfo = customerInfoSting ? JSON.parse(customerInfoSting) : null;
console.log("this is id customer description", customerinfo?.id);
const CUSTOMERID = customerinfo?.id;
function ProductModal({
  product,
  currency,
  discountedPrice,
  finalProductPrice,
  finalDiscountedPrice,
  show,
  onHide,
  wishlistItem,
  compareItem,
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variation ? product.variation[0].color : ""
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variation ? product.variation[0].size[0].name : ""
  );
  const [productStock, setProductStock] = useState(
    product.variation ? product.variation[0].size[0].stock : product.stock
  );
  const [quantity, setQuantityCount] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  );
  const isProductInCart = productCartQty > 0;

  console.log("this is saa", product);
  const gallerySwiperParams = {
    spaceBetween: 10,
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    thumbs: { swiper: thumbsSwiper },
    modules: [EffectFade, Thumbs],
  };
  const thumbnailSwiperParams = {
    onSwiper: setThumbsSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    // navigation: true,
    pagination: {
      el: ".swiper-pagination-thumbs",
      clickable: true,
      type: "bullets",
    },
    modules: [Pagination],
    // Add Pagination module
  };
  useEffect(() => {
    setQuantityCount(1);
  }, [product.id]);

  const handleQuantityChange = (action) => {
    if (action === "increment") {
      const availableStock =
        productStock - (isProductInCart ? productCartQty : 0);
      if (productStock && quantity < availableStock) {
        setQuantityCount((prev) => prev + 1);
      }
    } else if (action === "decrement") {
      if (quantity > 1) {
        setQuantityCount((prev) => prev - 1);
      }
    }
  };

  const handleAddToCart = async () => {
    if (isAddingToCart) return;
    setIsAddingToCart(true);
    try {
      // Prepare product for Redux update
      const cartItem = {
        ...product,
        quantity,
        selectedProductColor: selectedProductColor || null,
        selectedProductSize: selectedProductSize || null,
      };
      // Always add to Redux store (guest or logged-in)
      dispatch(addToCart(cartItem));
      // Reset quantity for UI
      setQuantityCount(1);
      // If user is logged in, also send to server
      if (CUSTOMERID) {
        const payload = {
          CUSTOMERID,
          ITEMID: product.id,
          quantity,
          type: "cart",
        };
        try {
          const response = await axios.post(
            `${BASE_URL}/addtocartWishlist`,
            payload
          );
          console.log("Item added to server cart:", response.data);
        } catch (error) {
          console.error("Server cart add failed:", error);
          // Optional: You can dispatch rollback logic here
        }
      }
    } catch (error) {
      console.error("Add to cart failed:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };
  const handleWishlist = async () => {
    // Always add to Redux store (works for both logged-in and guest users)
    dispatch(addToWishlist(product));
    // Only call API if user is logged in
    if (CUSTOMERID) {
      try {
        const payload = {
          CUSTOMERID,
          ITEMID: product.id,
          type: "wishlist",
        };
        const response = await axios.post(
          `${BASE_URL}/addtocartWishlist`,
          payload
        );
        console.log("Item added to server wishlist:", response.data);
      } catch (error) {
        console.error("Failed to add to server wishlist:", error);
        // Optional: Remove from Redux if server update fails
        dispatch(deleteFromWishlist(product));
      }
    }
  };

  const handledeleteWishlist = async () => {
    // Always remove from Redux store immediately (optimistic update)
    dispatch(deleteFromWishlist(product));
    // Only call API if user is logged in
    if (CUSTOMERID) {
      try {
        const payload = {
          CUSTOMERID,
          ITEMID: product.id,
          type: "wishlist",
        };
        const response = await axios.delete(`${BASE_URL}/deletecartWishlist`, {
          data: payload,
        });
        if (!response.data?.success) {
          // If server deletion fails, re-add to Redux
          dispatch(addToWishlist(product));
          console.error("Failed to delete from server wishlist");
        }
      } catch (error) {
        // If API call fails, re-add to Redux
        dispatch(addToWishlist(product));
        console.error("Error deleting from wishlist:", error);
      }
    }
  };
  const availableStock = productStock - (isProductInCart ? productCartQty : 0);

  const onCloseModal = () => {
    setThumbsSwiper(null);
    onHide();
  };
  return (
    <Modal
      show={show}
      onHide={onCloseModal}
      className="product-quickview-modal-wrapper"
    >
      {/* <Modal.Header>
        <div className="custom-close-wrapper">
          <button className="custom-close-btn" onClick={onCloseModal}>
            <i className="pe-7s-close-circle" />
          </button>
        </div>
      </Modal.Header> */}
      <Modal.Header>
        <div className="custom-close-wrapper">
          <button className="custom-close-btn" onClick={onCloseModal}>
            <i className="pe-7s-close-circle" />
          </button>
        </div>
      </Modal.Header>
      <div className="modal-body">
        <div className="row">
          <div className="col-md-5 col-sm-12 col-xs-12">
            <div className="product-large-image-wrapper">
              <Swiper options={gallerySwiperParams}>
                {product.image &&
                  product.image.map((img, i) => {
                    console.log(
                      "this is images public url",
                      `${process.env.REACT_APP_PUBLIC_URL + img}`
                    );
                    return (
                      <SwiperSlide key={i}>
                        <div className="single-image">
                          <img
                            src={process.env.REACT_APP_PUBLIC_URL + img}
                            className="img-fluid"
                            alt="Product"
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
            <div className=" product-small-image-wrapper mt-15 ">
              <Swiper options={thumbnailSwiperParams}>
                {product.image &&
                  product.image.map((img, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <div className="single-image">
                          <img
                            src={process.env.REACT_APP_PUBLIC_URL + img}
                            d
                            className="img-fluid"
                            alt="Image"
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </div>
          <div className="col-md-7 col-sm-12 col-xs-12">
            <div className="product-details-content quickview-content">
              <h2>{product.name}</h2>
              <div className="product-details-price">
                {discountedPrice !== null ? (
                  <Fragment>
                    <span>
                      {currency.currencySymbol + finalDiscountedPrice}
                    </span>{" "}
                    <span className="old">
                      {currency.currencySymbol + finalProductPrice}
                    </span>
                  </Fragment>
                ) : (
                  <span>{currency.currencySymbol + finalProductPrice} </span>
                )}
              </div>
              {product.rating && product.rating > 0 ? (
                <div className="pro-details-rating-wrap">
                  <div className="pro-details-rating">
                    <Rating ratingValue={product.rating} />
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="pro-details-list">
                <p>{product.shortDescription}</p>
              </div>
              {product.variation ? (
                <div className="pro-details-size-color">
                  {/* <div className="pro-details-color-wrap">
                  <span>Color</span>
                  <div className="pro-details-color-content">
                    {product.variation.map((single, key) => {
                      return (
                        <label
                          className={`pro-details-color-content--single ${single.color}`}
                          key={key}
                        >
                          <input
                            type="radio"
                            value={single.color}
                            name="product-color"
                            checked={
                              single.color === selectedProductColor
                                ? "checked"
                                : ""
                            }
                            onChange={() => {
                              setSelectedProductColor(single.color);
                              setSelectedProductSize(single.size[0].name);
                              setProductStock(single.size[0].stock);
                              setQuantityCount(1);
                            }}
                          />
                          <span className="checkmark"></span>
                        </label>
                      );
                    })}
                  </div>
                </div> */}
                  <div className="pro-details-size">
                    <span>Size</span>
                    <div className="pro-details-size-content">
                      {product.variation &&
                        product.variation.map((single) => {
                          return single.color === selectedProductColor
                            ? single.size.map((singleSize, key) => {
                                return (
                                  <label
                                    className={`pro-details-size-content--single`}
                                    key={key}
                                  >
                                    <input
                                      type="radio"
                                      value={singleSize.name}
                                      checked={
                                        singleSize.name === selectedProductSize
                                          ? "checked"
                                          : ""
                                      }
                                      onChange={() => {
                                        setSelectedProductSize(singleSize.name);
                                        setProductStock(singleSize.stock);
                                        setQuantityCount(1);
                                      }}
                                    />
                                    <span className="size-name">
                                      {singleSize.name}
                                    </span>
                                  </label>
                                );
                              })
                            : "";
                        })}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {product.affiliateLink ? (
                <div className="pro-details-quality">
                  <div className="pro-details-cart btn-hover">
                    <a
                      href={product.affiliateLink}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              ) : (
                <div className="pro-details-quality">
                  <div className="cart-plus-minus">
                    <button
                      onClick={() => handleQuantityChange("decrement")}
                      className="dec qtybutton"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      className="cart-plus-minus-box text-center"
                      type="text"
                      value={quantity}
                      readOnly
                    />
                    <button
                      onClick={() => handleQuantityChange("increment")}
                      className="inc qtybutton"
                      disabled={productStock && quantity >= availableStock}
                    >
                      +
                    </button>
                  </div>
                  <div className="pro-details-cart btn-hover">
                    {productStock && productStock > 0 ? (
                     <button
              onClick={handleAddToCart}
              disabled={quantity > availableStock || isAddingToCart}
            >
              {isAddingToCart ? 'Adding...' : 
               isProductInCart ? `Add To Cart` : 
               `Add To Cart`}
            </button>
                    ) : (
                      // <button
                      //   onClick={handleAddtocart}
                      // onClick={() =>
                      //   dispatch(
                      //     addToCart({
                      //       ...product,
                      //       quantity: quantityCount,
                      //       selectedProductColor: selectedProductColor
                      //         ? selectedProductColor
                      //         : product.selectedProductColor
                      //         ? product.selectedProductColor
                      //         : null,
                      //       selectedProductSize: selectedProductSize
                      //         ? selectedProductSize
                      //         : product.selectedProductSize
                      //         ? product.selectedProductSize
                      //         : null,
                      //     })
                      //   )
                      // }
                      //   disabled={productCartQty >= productStock}
                      // >
                      //   {" "}
                      //   Add To Cart{" "}
                      // </button>

                      <button disabled>Out of Stock</button>
                    )}
                  </div>
                  <div className="pro-details-wishlist">
                    <button
                      className={`transition-all duration-300 text-2xl ${
                        wishlistItem ? "text-danger" : "text-gray-400"
                      }`}
                      title={
                        wishlistItem
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                      // onClick={() =>
                      //   wishlistItem
                      //     ? dispatch(deleteFromWishlist(product))
                      //     : dispatch(addToWishlist(product))
                      // }
                      onClick={() =>
                        wishlistItem ? handledeleteWishlist() : handleWishlist()
                      }
                    >
                      {wishlistItem ? (
                        <i className="fa fa-heart "></i>
                      ) : (
                        <i className="fa fa-heart-o"></i>
                      )}
                    </button>
                  </div>
                  {/* <div className="pro-details-compare">
                  <button
                    className={compareItem !== undefined ? "active" : ""}
                    disabled={compareItem !== undefined}
                    title={
                      compareItem !== undefined
                        ? "Added to compare"
                        : "Add to compare"
                    }
                    onClick={() => dispatch(addToCompare(product))}
                  >
                    <i className="pe-7s-shuffle" />
                  </button>
                </div> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
ProductModal.propTypes = {
  currency: PropTypes.shape({}),
  discountedprice: PropTypes.number,
  finaldiscountedprice: PropTypes.number,
  finalproductprice: PropTypes.number,
  onHide: PropTypes.func,
  product: PropTypes.shape({}),
  show: PropTypes.bool,
  wishlistItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
};
export default ProductModal;
