import clsx from "clsx";
import { useNavigate } from "react-router-dom";
const ShopByCollection = ({ spaceTopClass, spaceBottomClass }) => {
 const navigate = useNavigate();

  return (
    <div
      className={clsx("shop-by-collection my-3", spaceTopClass, spaceBottomClass)}
    > 
      <div className="container-fluid text-center">
        <div className="collection-section mx-auto">
          <h2 className="collection-title py-3">Shop by Collection</h2>
          <div className="underline mx-auto my-2"></div>
          <div className="links mt-3">
            <a href="/shop-grid-standard?category=westernwear" className="mx-2">
              Western Wear
            </a>
            <span className="divider">|</span>
            <a href="/shop-grid-standard?category=Suits" className="mx-2">
              Suit Sets
            </a>
            <span className="divider">|</span>
            <a href="/shop-grid-standard?category=Coordset" className="mx-2">
              Coord Sets
            </a>
          </div>
        </div>

        <div className="row justify-content-center mt-5 gx-4">
          {/* Left Lookbook Section */}
          <div className="col-lg-6 col-12 mb-4">
            <div className="lookbook-main-container d-flex position-relative">
              <div className="lookbook-image">

     <a href="#" className="lookbook-link">
                   {/* <a href="http://localhost:3000/videos/productsvideo.mp4" className="lookbook-link"> */}
                <img
                  src="assets/img/banner/Maskgroup__11.png"
                  alt="Lookbook 2025"
                  className="img-fluid"
                />
                </a>
              </div>
              <div className="lookbook-text"></div>
              <div className="lookbook-text-content d-flex flex-column justify-content-center align-items-start">
                <div className="lookbook-year">2025</div>
                <h2 className="lookbook-title">
                  Lookbook
                  <br />
                  <span>Video</span>
                </h2>
                <a href="/shop-grid-standard" className="lookbook-link">
                  SHOP NOW
                </a>
              </div>
            </div>
          </div>

          {/* Right Top and Bottom Images */}
       <div className="col-lg-3 col-sm-6 col-12 mb-4">
            <div className="lookbook1 " style={{cursor:"pointer"}} onClick={() => navigate("/shop-grid-standard", { state: { categoryname: "westernwear" } })}>
              <img
                src="assets/img/banner/ShopbyCollection3.jpg"
                alt="Blue Dress"
                className="img-fluid object-fit-cover"
              />
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 col-12 mb-4">
            <div className="lookbook2"  style={{cursor:"pointer"}} onClick={() => navigate("/shop-grid-standard", { state: { categoryname: "kurta" } })}>
              <img
                src="assets/img/banner/ShopbyCollection4.jpg"
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
