import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";
import { BASE_URL } from "../../config"
import axios from 'axios'; 
import Modal from 'react-bootstrap/Modal';
import SizeChartModal from "./SizeChart";

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
  const [quantityCount, setQuantityCount] = useState(1);

  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  );
  const [openDropdown, setOpenDropdown] = useState(null);
  const [item, setItem] = useState([]);
  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown); // If the same dropdown is clicked again, close it.
  };
  const { id } = useParams();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/items/${id}`,{
          headers: {
            "Content-Type": "application/json"
          }
        });
        console.log("Combined API response:", response.data);
        setItem(response.data.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [id]);
  console.log('item data',item);
  return (
   <div className="product-details-content ml-70">
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
                        single.color === selectedProductColor ? "checked" : ""
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
            <div class="sizeheading  d-flex mb-2">
                   Size
                  
                  <div className="sizechart d-flex align-items-center ms-2" onClick={() => setShow(true)}>
                    | Size Chart
                    <img
                      src="/assets/img/icon-img/sizecharticon.webp"
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
            <div className="pro-details-size-content">
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
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* Quantity Dropdown (1 to 10) */}
      <div className="quantity-selector">
        <span>QUANTITY</span>
        <select
          value={quantityCount}
          onChange={(e) => setQuantityCount(parseInt(e.target.value))}
        >
          {[...Array(10).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Add to Bag Button */}
      {/* <div className="add-to-bag">
        <button
          onClick={() =>
            dispatch(addToCart({
              ...product,
              quantity: quantityCount,
              selectedProductColor,
              selectedProductSize
            }))
          }
        >
          Add to Bag
        </button>
      </div> */}
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
        <div className="pro-details-quality">
          {/* <div className="cart-plus-minus">
            <button
              onClick={() =>
                setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
              }
              className="dec qtybutton"
            >
              -
            </button>
            <input
              className="cart-plus-minus-box"
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
                onClick={() =>
                  dispatch(addToCart({
                    ...product,
                    quantity: quantityCount,
                    selectedProductColor: selectedProductColor ? selectedProductColor : product.selectedProductColor ? product.selectedProductColor : null,
                    selectedProductSize: selectedProductSize ? selectedProductSize : product.selectedProductSize ? product.selectedProductSize : null
                  }))
                }
                disabled={productCartQty >= productStock}
              >
                {" "}
                Add To Cart{" "}
              </button>
            ) : (
              <button disabled>Out of Stock</button>
            )}
          </div>
          <div className="pro-details-wishlist">
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
          </div>
          <div className="pro-details-compare">
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
          </div>
        </div>
      )}
      {product.category ? (
        <div className="pro-details-meta">
          <span>Categories :</span>
          <ul>
            {product.category.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
      {product.tag ? (
        <div className="pro-details-meta">
          <span>Tags :</span>
          <ul>
            {product.tag.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}

      {/* Estimated Dispatch Time */}
      <div className="estimated-dispatch">
        Estimated Dispatch Time: 2 Business Days (7-14 Days for International Orders)
      </div>

      {/* Delivery Pincode, Free Shipping, Easy Returns, COD Available */}
      <div className="delivery-check">
  <h3>Check Delivery Pincode</h3>
  <div className="pincode-form">
    <input type="text" placeholder="ENTER ZIP CODE" />
    <button>CHECK</button>
  </div>
  <div className="delivery-info">
    <div className="free-shipping">
      <img src="/assets/img/icon-img/free_shipping.png" alt="Free Shipping" />
      <span>Free Shipping</span>
    </div>
    <div className="easy-returns">
      <img src="/assets/img/icon-img/easy_returns.png" alt="Easy Returns" />
      <span>Easy Returns</span>
    </div>
    <div className="cod-available">
      <img src="/assets/img/icon-img/cash_on_dilivery.png" alt="COD Available" />
      <span>COD Available</span>
    </div>
  </div>
</div>

      {/* Product Details */}
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
                dangerouslySetInnerHTML={{ __html: product.Product_Details || "<p>No details available.</p>" }}
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
            <ul>
              <li><strong>Material:</strong>  Kurta- Silk Dupion ( 100% Silk ), Pants- Viscose Satin Lycra ( 95% Viscose , 5% Lycra )</li>
              <li><strong>Components:</strong> 1N Kurta, 1N Pants</li>
              <li><strong>Neck Type:</strong> Round Neck</li>
              <li><strong>Sleeve Type:</strong> Full Sleeves</li>
              <li><strong>Fit Type:</strong> Relax Fit</li>
              <li><strong>Closure Type:</strong> Kurta- Button, Pants- Side Zip</li>
              <li><strong>Model Height:</strong> 5'7"/172 cms and is wearing size S.</li>
              <li><strong>Product Care:</strong> Professional Dry Clean only</li>
              <li><strong>Top Length:</strong> S- 46 in/ 1 mtr, M- 46 in/ 1 mtr, L- 46 in/ 1 mtr, XL- 46 in/ 1 mtr</li>
              <li><strong>Bottom Length:</strong> S- 40 in/ 1 mtr, M- 40 in/ 1 mtr, L- 40 in/ 1 mtr, XL- 40 in/ 1 mtr</li>
              <li><strong>Style Code:</strong> 2ASSDF0100Q734B694-BLACK RUST</li>
              <li><strong>Brand:</strong> Sahiba Dutta</li>
            </ul>
          </div>
        )}
      </div> */}

      <div className="product-details-dropdown">
        <button onClick={() => toggleDropdown("shipping")}>
          Shipping
        </button>
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
              <li><strong>Name of Commodity:</strong> Shirt</li>
              <li><strong>Country of Origin:</strong> India</li>
              <li><strong>Net Qty:</strong> 1 N</li>
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
