import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";

const BASE_IMAGE_URL = process.env.REACT_APP_BASE_IMAGE_URL || "http://localhost:3000/images";

const BannerNineSingle = ({ data, spaceBottomClass }) => {
  const imageUrl = data.images?.startsWith("http") 
    ? data.images  // Use the full URL as it is
    : `${BASE_IMAGE_URL}/${data.images}`;

  console.log("🖼️ Final Image URL:", imageUrl); // ✅ Log the correct image URL

  return (
    <div className={clsx("single-banner-2",spaceBottomClass)}>
      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
        <img 
          src={imageUrl || "https://via.placeholder.com/300"} 
          alt={data.title || "Default Alt Text"} 
          onError={(e) => {
            console.error("❌ Image failed to load:", e.target.src);
          }}
        />
      </Link>
      <div className="banner-content-2">
        <h3>{data?.des_l1}</h3>
        <h4>
          {data?.des_l2} <span>{data?.des_l3}</span>
        </h4>
        <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
          <i className="fa fa-long-arrow-right" />
        </Link>
      </div>
    </div>
  );
};

BannerNineSingle.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string,
    des_l1: PropTypes.string,
    des_l2: PropTypes.string,
    des_l3: PropTypes.string,
    // link: PropTypes.string
  }),
  spaceBottomClass: PropTypes.string
};

export default BannerNineSingle;
