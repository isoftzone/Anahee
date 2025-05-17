import clsx from "clsx";
import { Link } from "react-router-dom";
const PromoBanner = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("promo-banner position-relative", spaceTopClass, spaceBottomClass)}>
      {/* Model image positioned absolutely to overlap all sections */}
      <img
        src="assets/img/banner/promo_banner.png"
        alt="Fashion Model"
        className="promo-banner__model-img"
      />
      {/* First section - white background */}
      <div className="promo-banner__section promo-banner__section--top">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="promo-banner__subtitle">
                Your Favorite Styles, now at
              </p>
              <h1 className="promo-banner__title">
                UNBEATABLE <span className="text_success">PRICES</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
      {/* Second section - light pink background */}
      <div className="promo-banner__section promo-banner__section--middle">
        <div className="container">
          <div className="row">
            <div className="col offset-lg-1">
              <h2 className="promo-banner__discount-text">
                <p className="promo-banner__text">Get Set, Style!</p>
                <span className="promo-banner__brand">Anahee </span>
                <span className="promo-banner__discount-phrase">
                  Discounts
                  <br />
                  Are Live!
                </span>
              </h2>
              {/* <button className="promo-banner__shop-btn">SHOP NOW</button> */}
              <Link to="/shop-grid-standard" className="promo-banner__shop-btn">
  Shop Now
</Link>
            </div>
          </div>
        </div>
      </div>
      {/* Third section - maroon background */}
      <div className="promo-banner__section promo-banner__section--bottom">
        <div className="container">
              <div className="row justify-content-center">
  {/* Free Shipping */}
  <div className="col-12 col-md-4 promo-banner__feature mb-4 mb-md-0">
    <img className="promo-banner__icon img img-fluid" src="assets/img/logo/shipping.png" />
    <div>
      <h3 className="promo-banner__feature-title">Free Shipping</h3>
      <p className="promo-banner__feature-desc">A wonderful speed</p>
    </div>
  </div>
  {/* Secure Payment */}
  <div className="col-12 col-md-4 promo-banner__feature mb-4 mb-md-0">
    <img className="promo-banner__icon" src="assets/img/logo/secure.png" />
    <div>
      <h3 className="promo-banner__feature-title">Secure Payment</h3>
      <p className="promo-banner__feature-desc">Feel safe for transactions</p>
    </div>
  </div>
  {/* Easy Returns */}
  <div className="col-12 col-md-4 promo-banner__feature">
    <img className="promo-banner__icon" src="assets/img/logo/Group.png" />
    <div>
      <h3 className="promo-banner__feature-title">Easy Returns</h3>
      <p className="promo-banner__feature-desc">15 Days Return Policy</p>
    </div>
  </div>
</div>
            </div>
        </div>
    </div>
  );
};
export default PromoBanner;