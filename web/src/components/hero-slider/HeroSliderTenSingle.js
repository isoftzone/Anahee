import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BASE_IMAGE_URL = process.env.REACT_APP_BASE_IMAGE_URL || "http://localhost:3000/images";

const HeroSliderTenSingle = ({ data }) => {
  const imageUrl = data.images?.startsWith("http")
    ? data.images
    : `${BASE_IMAGE_URL}/${data.images}`;

  console.log("🖼️ Final Image URL:", imageUrl); // ✅ Log the correct image URL

  return (
    <div
      className="single-slider-2 slider-height-2 d-flex align-items-center bg-img"
      style={{
        backgroundImage: `url(${imageUrl || "https://via.placeholder.com/1920x600"})`,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-7 col-md-8 col-12 ms-auto">
            <div className="slider-content-3 slider-animated-1 text-center">
              <h3 className="animated">{data?.des_l1}</h3>
              <h1 className="animated">{data.des_l2}</h1>
              <p className="animated">{data.des_l3}</p>
              <div className="slider-btn btn-hover">
                <Link className="animated" to={"/shop-grid-standard" || "/"}>
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroSliderTenSingle.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string,
    des_l1: PropTypes.string,
    des_l2: PropTypes.string,
    des_l3: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default HeroSliderTenSingle;
