import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";

const BASE_IMAGE_URL = process.env.REACT_APP_BASE_IMAGE_URL || "http://localhost:3000/images";

const BannerTwoSingle = ({ data, spaceBottomClass }) => {
  const imageUrl = data.images?.startsWith("http")
    ? data.images
    : `${BASE_IMAGE_URL}/${data.images}`;

  console.log("🖼️ Final Image URL:", imageUrl);

  return (
    <div className={clsx("single-banner", spaceBottomClass)}>
      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
        <img 
          src={imageUrl || "https://via.placeholder.com/300"} 
          alt={data.des_l1 || "Default Alt Text"} 
          onError={(e) => console.error("❌ Image failed to load:", e.target.src)}
        />
      </Link>
    </div>
  );
};

BannerTwoSingle.propTypes = {
  data: PropTypes.shape({
    images: PropTypes.string,
    des_l1: PropTypes.string,
  }),
  spaceBottomClass: PropTypes.string
};

export default BannerTwoSingle;
