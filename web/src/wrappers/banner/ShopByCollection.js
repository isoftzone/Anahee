import clsx from "clsx";

const ShopByCollection = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div
      className={clsx("shop-by-collection", spaceTopClass, spaceBottomClass)}
    >
      <div className="container text-center">
        <div className="collection-section mx-auto">
          <h2 className="collection-title">Shop by Collection</h2>
          <div className="underline mx-auto my-2"></div>
          <div className="links mt-3">
            <a href="#western" className="mx-2">
              Western Wear
            </a>
            <span className="divider">|</span>
            <a href="#suit" className="mx-2">
              Suit Sets
            </a>
            <span className="divider">|</span>
            <a href="#cord" className="mx-2">
              Cord Sets
            </a>
          </div>
        </div>

        <div className="row justify-content-center mt-5 gx-4">
          {/* Left Lookbook Section */}
          <div className="col-lg-6 col-12 mb-4">
            <div className="lookbook-main-container d-flex position-relative">
              <div className="lookbook-image">
                <img
                  src="assets/img/banner/Maskgroup__11.png"
                  alt="Lookbook 2025"
                  className="img-fluid"
                />
              </div>
              <div className="lookbook-text"></div>
              <div className="lookbook-text-content d-flex flex-column justify-content-center align-items-start">
                <div className="lookbook-year">2025</div>
                <h2 className="lookbook-title">
                  Lookbook
                  <br />
                  <span>Video</span>
                </h2>
                <a href="#" className="lookbook-link">
                  SHOP NOW
                </a>
              </div>
            </div>
          </div>

          {/* Right Top and Bottom Images */}
          <div className="col-lg-3 col-sm-6 col-12 mb-4">
            <div className="lookbook1">
              <img
                src="assets/img/banner/Maskgroup__22.png"
                alt="Blue Dress"
                className="img-fluid object-fit-cover"
              />
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 col-12 mb-4">
            <div className="lookbook2">
              <img
                src="assets/img/banner/Maskgroup__33.png"
                alt="Yellow Dress"
                className="img-fluid  object-fit-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopByCollection;
