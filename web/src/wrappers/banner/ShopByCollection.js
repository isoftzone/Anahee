import clsx from "clsx";

const ShopByCollection = ({ spaceTopClass, spaceBottomClass }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <div className={clsx("shop-by-collection px-5", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className={isMobile ? 'collection-section full-width' : 'collection-section'}>
          <h2 className="title">Shop by Collection</h2>
          <div className="underline"></div>
          <div className="links">
            <a href="#western">Western Wear</a>
            <span className="divider">|</span>
            <a href="#suit">Suit Sets</a>
            <span className="divider">|</span>
            <a href="#cord">Cord Sets</a>
          </div>
        </div>
      </div>

      <div className="lookbook-container">
        <div className="lookbook-carddd">
          <div className="lookbook-cardd">
            <img src="assets/img/banner/Maskgroup__11.png" alt="Lookbook 2025" className="lookbook-image" />
          </div>
          <div className="overlay-content">
            <div className="lookbook-year">2025</div>
            <div className="lookbook-title">Lookbook<br /><span>Video</span></div>
            <div className="shop-now">SHOP NOW</div>
          </div>
        </div>
        <div className="lookbook-card1">
          <img src="assets/img/banner/Maskgroup__22.png" alt="Yellow Dress" className="lookbook-image" />
        </div>
        <div className="lookbook-card">
          <img src="assets/img/banner/Maskgroup__33.png" alt="Blue Dress" className="lookbook-image" />
        </div>
      </div>
    </div>
  );
};

export default ShopByCollection;
