import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import { addToCart, deleteFromCart } from "../../store/slices/cart-slice";
// import { addToWishlist } from "../../store/slices/wishlist-slice";
import Modal from "react-bootstrap/Modal";
import SizeChartModal from "./SizeChart";
import {
  addToWishlist,
  removeColorFromWishlist,
  deleteFromWishlist,
  removeFromWishlist,
} from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";
import axios from "axios";
import { BASE_URL } from "../../config";
// const URL = "http://localhost:3000"; // Adjust as needed
const customerInfoSting = localStorage.getItem("customerinfo");
const customerinfo = customerInfoSting ? JSON.parse(customerInfoSting) : null;
console.log("this is id customer description", customerinfo?.id);
const CUSTOMERID = customerinfo?.id;
console.log("this is customer id", CUSTOMERID);
const ProductDescriptionInfo = ({
  product,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  wishlistItem,
  compareItem,
}) => {
  const dispatch = useDispatch();
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

  const [openDropdown, setOpenDropdown] = useState(null);
  const [show, setShow] = useState(false);
  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };
  useEffect(() => {
    setQuantityCount(1);
  }, [product.id]);
  // const handleAddtocart = async () => {
  //   try {
  //     //  dispatch(
  //     //   addToCart({
  //     //     ...product,
  //     //     quantity : quantityCount,
  //     //     // selectedProductColor: selectedProductColor
  //     //   })
  //     //    )
  //     dispatch(
  //       addToCart({
  //         ...product,
  //         quantity: quantityCount,
  //         selectedProductColor:
  //           selectedProductColor ??
  //           product.selectedProductColor ??
  //           null,
  //         selectedProductSize:
  //           selectedProductSize ??
  //           product.selectedProductSize ??
  //           null,
  //       })
  //     )
  //     const payload = {
  //       CUSTOMERID,
  //       ITEMID: product.id,
  //       quantity: quantityCount,
  //       type: "cart",
  //     }
  //     console.log("this is data add to cart", payload);
  //     //  addto cart api
  //     const response = await axios.post(`${BASE_URL}/addtocartWishlist`, payload)
  //     console.log("this is fetch data", response.data);
  //   }
  //   catch (error) {
  //     console.log("this is failed to add item to cart backend", error)
  //   }
  // }
  useEffect(() => {
    if (product) {
      // Reset color to first available color
      const firstColor = product.variation ? product.variation[0]?.color : "";
      setSelectedProductColor(firstColor);

      // Reset size to first available size for the first color
      const firstSize = product.variation
        ? product.variation[0]?.size[0]?.name
        : "";
      setSelectedProductSize(firstSize);

      // Reset stock based on first color and size
      const firstStock = product.variation
        ? product.variation[0]?.size[0]?.stock
        : product.stock;
      setProductStock(firstStock);

      // Reset quantity
      setQuantityCount(1);

      // Reset dropdown state
      setOpenDropdown(null);
    }
  }, [product.id]); // This triggers when product changes

  const handleColorChange = (color) => {
    setSelectedProductColor(color);

    // Find the variation for this color
    const colorVariation = product.variation?.find((v) => v.color === color);
    if (colorVariation && colorVariation.size.length > 0) {
      // Set first size for this color
      setSelectedProductSize(colorVariation.size[0].name);
      setProductStock(colorVariation.size[0].stock);
    }

    // Reset quantity when color changes
    setQuantityCount(1);
  };

  const handleSizeChange = (sizeName) => {
    setSelectedProductSize(sizeName);

    // Find the stock for this size within the selected color
    const colorVariation = product.variation?.find(
      (v) => v.color === selectedProductColor
    );
    const sizeVariation = colorVariation?.size.find((s) => s.name === sizeName);

    if (sizeVariation) {
      setProductStock(sizeVariation.stock);
    }

    // Reset quantity when size changes
    setQuantityCount(1);
  };
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
          size: selectedProductSize,
          color: selectedProductColor,
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

  // const handleAddtocart = async () => {
  //     // Create cart item object
  //     const cartItem = {
  //       ...product,
  //       quantity: quantityCount,
  //       };
  //       console.log("this is034", cartItem);
  //     // Always add to Redux store (works for both logged-in and guest users)
  //     dispatch(addToCart(cartItem));
  //     // Only call API if user is logged in
  //     if (CUSTOMERID) {
  //       console.log("this is 05");
  //       try {
  //         const payload = {
  //           CUSTOMERID,
  //           ITEMID: product.id,
  //           quantity: quantityCount,
  //           type: "cart",
  //         };
  //         const response = await axios.post(`${BASE_URL}/addtocartWishlist`, payload);
  //         console.log("Item added to server cart:", response.data);
  //       } catch (error) {
  //         console.error("Failed to add to server cart:", error);
  //         // Optional: Remove from Redux if server update fails
  //         dispatch(deleteFromCart(cartItem.cartItemId));
  //       }
  //     }
  //     // Reset quantity after adding to cart
  //     setQuantityCount(1);
  //   };

  // const handleWishlist = async () => {
  //   try {
  //     dispatch(addToWishlist(product))
  //     // dispatch(
  //     //   addToWishlist({
  //     //     ...product,
  //     //     quantity: quantityCount,
  //     //     // selectedProductColor: selectedProductColor
  //     //   })
  //     // )
  //     const payload = {
  //       CUSTOMERID,
  //       ITEMID: product.id,
  //       // quantity: quantityCount,
  //       type: "wishlist",
  //     }
  //     console.log("this is data add to cart", payload);
  //     //  addto cart api
  //     const response = await axios.post(`${BASE_URL}/addtocartWishlist`, payload)
  //     console.log("this is fetch data", response.data);
  //   }
  //   catch (error) {
  //     console.log("this is failed to add item to cart backend", error)
  //   }
  // }

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
    dispatch(deleteFromWishlist(product));
    try {
      const payload = {
        CUSTOMERID,
        ITEMID: product.id,
        type: "wishlist",
      };
      console.log("this is data handle delete wishlist", payload);
      //   delete api
      const response = await axios.delete(`${BASE_URL}/deletecartWishlist`, {
        data: payload,
      });
      console.log("this is delete data wishlist", response);
      if (response.status === 200 || response.data.success) {
        dispatch(removeColorFromWishlist(product));
        // dispatch(deleteFromWishlist(product))
      }
      // dispatch(deleteFromWishlist(product))
    } catch (error) {
      console.log("this is failed to wishlist data backend", error);
    }
  };

  const availableStock = productStock - (isProductInCart ? productCartQty : 0);

  return (
    <div className="product-details-content ml-0 md:ml-10 p-4 md:p-6 space-y-6">
      <div>
        <h2>{product.name}</h2>
        <div className="product-details-price">
          {discountedPrice !== null ? (
            <Fragment>
              <span>{currency.currencySymbol + finalDiscountedPrice}</span>{" "}
              <span className="old">
                {currency.currencySymbol + finalProductPrice}
              </span>
            </Fragment>
          ) : (
            <span>{currency.currencySymbol + finalProductPrice} </span>
          )}
        </div>
        {product.rating && product.rating > 0 && (
          <div className="pro-details-rating-wrap">
            <div className="pro-details-rating">
              <Rating ratingValue={product.rating} />
            </div>
          </div>
        )}
        <div className="pro-details-list">
          <p>{product.shortDescription}</p>
        </div>
      </div>
      {product.variation && (
        <div className="pro-details-size-color">
          <div className="pro-details-color-wrap mt-3">
            <span>Color</span>
            <div className="pro-details-color-content">
              {product.variation.map((single, key) => {
                return (
                  <label
                    key={key}
                    className={`pro-details-color-content--single ${single.color}`}
                    style={{
                    backgroundColor: single.code,

                      border: "1px solid black",
                      // borderColor: selectedProductColor === single.color ? "black" : "#ccc"
                    }}
                    title={single.color} // show color name on hover
                  >
                    <input
                      type="radio"
                      value={single.color}
                      name="product-color"
                      checked={single.color === selectedProductColor}
                      onChange={() => {
                        setSelectedProductColor(single.color);
                        setSelectedProductSize(single.size[0].name);
                        setProductStock(single.size[0].stock);
                        setQuantityCount(1);
                      }}
                      className="absolute opacity-0 w-0 h-0"
                    />
                  </label>
                );
              })}
            </div>
          </div>
          <div className="pro-details-size">
            <div className="pro-details-size">
              <div class="sizeheading align-items-center justify-content-start d-flex mb-2">
                <span className="mt-3">Size</span>
                <div
                  className="sizechart d-flex align-items-center ms-2"
                  onClick={() => setShow(true)}
                >
                  <span className="mt-3">| Size Chart</span>
                  <img
                    src="/assets/img/icon-img/sizecharticon2.webp"
                    alt="Size Chart"
                    className="ms-1"
                    style={{ width: "20px", height: "20px" }}
                  />
                </div>
              </div>
              {/* size model */}
              <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
              >
                <Modal.Header className="d-flex justify-content-between align-items-center">
                  <div>
                    <Modal.Title id="example-custom-modal-styling-title">
                      Size Chart (inches)
                    </Modal.Title>
                  </div>
                  <button
                    onClick={() => setShow(false)}
                    style={{
                      border: "none",
                      fontSize: "3.2rem",
                      lineHeight: "1",
                      padding: "0.25rem 0.5rem",
                    }}
                  >
                    &times;
                  </button>
                </Modal.Header>

                <Modal.Body>
                  <SizeChartModal />
                </Modal.Body>
              </Modal>

              {/* <span>Size</span> */}
              {/* <div className="pro-details-size-content">
              {product.variation &&
                product.variation.map(single => {
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
                            <span className="size-name">{singleSize.name}</span>
                          </label>
                        );
                      })
                    : "";
                })}
            </div> */}
            </div>
            <div className="pro-details-size-content">
              {product.variation.map((single) =>
                single.color === selectedProductColor
                  ? single.size.map((singleSize, key) => (
                      <label
                        className="pro-details-size-content--single"
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
                        <span className="size-name">{singleSize.name}</span>
                      </label>
                    ))
                  : ""
              )}
            </div>
          </div>
        </div>
      )}
      {product.affiliateLink ? (
        <div className="pro-details-quality">
          <div className="pro-details-cart btn-hover ml-0">
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
        <div className="pro-details-quality flex flex-wrap gap-4">
          <div className="cart-plus-minus flex items-center">
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
          {/* <div className="cart-plus-minus flex items-center">
            <button
              onClick={() =>
                setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
              }
              className="dec qtybutton"
            >
              -
            </button>
            <input
              className="cart-plus-minus-box text-center"
              type="text"
              value={quantityCount}
              readOnly
            />
            <button
              onClick={() =>
                setQuantityCount(
                  quantityCount < productStock - productCartQty
                    ? quantityCount + 1
                    : quantityCount
                )
              }
              className="inc qtybutton"
            >
              +
            </button>
          </div> */}
          <div className="pro-details-cart btn-hover">
            {productStock && productStock > 0 ? (
              <button
                onClick={handleAddToCart}
                disabled={quantity > availableStock || isAddingToCart}
              >
                {isAddingToCart
                  ? "Adding..."
                  : isProductInCart
                  ? `Add To Cart`
                  : `Add To Cart`}
              </button>
            ) : (
              // <button

              // onClick={handleAddtocart}
              // onClick={() =>
              //   dispatch(
              //     addToCart({
              //       ...product,
              //       quantity: quantityCount,
              //       selectedProductColor:
              //         selectedProductColor ??
              //         product.selectedProductColor ??
              //         null,
              //       selectedProductSize:
              //         selectedProductSize ??
              //         product.selectedProductSize ??
              //         null,
              //     })
              //   )
              // }
              //   disabled={productCartQty >= productStock}
              // >
              //   Add To Cart
              // </button>
              <button disabled>Out of Stock</button>
            )}
          </div>
          {/* <div className="pro-details-wishlist">
            <button
              className={wishlistItem !== undefined ? "active" : ""}
              disabled={wishlistItem !== undefined}
              title={
                wishlistItem !== undefined
                  ? "Added to wishlist"
                  : "Add to wishlist"
              }
              onClick={() => dispatch(addToWishlist(product))}
            >
              <i className="pe-7s-like" />
            </button>
          </div> */}

          <div className="pro-details-wishlist">
            <button
              className={`transition-all duration-300 text-2xl ${
                wishlistItem ? "text-danger" : "text-gray-400"
              }`}
              title={wishlistItem ? "Remove from wishlist" : "Add to wishlist"}
              //   onClick={() =>
              //     wishlistItem
              //       ? dispatch(deleteFromWishlist(product))
              //       : dispatch(addToWishlist(product))
              //   }
              // >
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
      <div className="delivery-check">
        <h3>Check Delivery Pincode</h3>
        <div className="pincode-form flex gap-2">
          <input type="text" placeholder="Enter Zip Code Here" />
          <button>Check</button>
        </div>
        <div className="delivery-info flex flex-wrap gap-4 mt-4">
          <div className="free-shipping flex items-center gap-2">
            <img
              src="/assets/img/icon-img/free_shipping.png"
              alt="Free Shipping"
            />
            <span>Free Shipping</span>
          </div>
          <div className="easy-returns flex items-center gap-2">
            <img
              src="/assets/img/icon-img/easy_returns.png"
              alt="Easy Returns"
            />
            <span>Easy Returns</span>
          </div>
          <div className="cod-available flex items-center gap-2">
            <img
              src="/assets/img/icon-img/cash_on_dilivery.png"
              alt="COD Available"
            />
            <span>COD Available</span>
          </div>
        </div>
      </div>

      <div>
        {product.Product_Details ? (
          <div className="product-details-dropdown">
            <button onClick={() => toggleDropdown("productDetails")}>
              Product Details
            </button>
            {openDropdown === "productDetails" && (
              <div className="dropdown-content">
                <div
                  className="prose mt-2"
                  dangerouslySetInnerHTML={{
                    __html:
                      product.Product_Details || "<p>No details available.</p>",
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          ""
        )}
        {/* <div className="product-details-dropdown">
          <button onClick={() => toggleDropdown("productDetails")}>
            Product Details
          </button>
          {openDropdown === "productDetails" && (
            <div className="dropdown-content">
              <ul className="list-disc ml-6">
                <li>
                  <strong>Material:</strong> Kurta- Silk Dupion (100% Silk),
                  Pants- Viscose Satin Lycra (95% Viscose, 5% Lycra)
                </li>
                <li>
                  <strong>Components:</strong> 1N Kurta, 1N Pants
                </li>
                <li>
                  <strong>Neck Type:</strong> Round Neck
                </li>
                <li>
                  <strong>Sleeve Type:</strong> Full Sleeves
                </li>
                <li>
                  <strong>Fit Type:</strong> Relax Fit
                </li>
                <li>
                  <strong>Closure Type:</strong> Kurta- Button, Pants- Side Zip
                </li>
                <li>
                  <strong>Model Height:</strong> 5'7"/172 cms and is wearing
                  size S.
                </li>
                <li>
                  <strong>Product Care:</strong> Professional Dry Clean only
                </li>
                <li>
                  <strong>Top Length:</strong> S- 46 in/ 1 mtr, M- 46 in/ 1 mtr,
                  L- 46 in/ 1 mtr, XL- 46 in/ 1 mtr
                </li>
                <li>
                  <strong>Bottom Length:</strong> S- 40 in/ 1 mtr, M- 40 in/ 1
                  mtr, L- 40 in/ 1 mtr, XL- 40 in/ 1 mtr
                </li>
                <li>
                  <strong>Style Code:</strong> 2ASSDF0100Q734B694-BLACK RUST
                </li>
                <li>
                  <strong>Brand:</strong> Sahiba Dutta
                </li>
              </ul>
            </div>
          )}

        </div> */}

        <div className="product-details-dropdown">
          <button onClick={() => toggleDropdown("shipping")}>Shipping</button>
          {openDropdown === "shipping" && (
            <div className="dropdown-content">
              <ul>
                <li>Fast & Reliable shipping.</li>
                <li>Free shipping on orders above INR 1,500 in India.</li>
                <li>Free shipping on orders above INR 1,500 in India.</li>
                <li>Free shipping on orders above INR 1,500 in India.</li>
              </ul>
            </div>
          )}
        </div>
        <div className="product-details-dropdown">
          <button onClick={() => toggleDropdown("manufacturerDetails")}>
            Manufacturer Details
          </button>
          {openDropdown === "manufacturerDetails" && (
            <div className="dropdown-content">
              <ul>
                <li>
                  <strong>Name of Commodity:</strong> Shirt
                </li>
                <li>
                  <strong>Country of Origin:</strong> India
                </li>
                <li>
                  <strong>Net Qty:</strong> 1 N
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
ProductDescriptionInfo.propTypes = {
  cartItems: PropTypes.array,
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({}),
};
export default ProductDescriptionInfo;
