import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";

const BASE_IMAGE_URL = process.env.REACT_APP_BASE_IMAGE_URL || "http://localhost:3000/images";

const BannerSevenSingle = ({ data, spaceBottomClass }) => {
  const imageUrl = data.images?.startsWith("http")
    ? data.images
    : `${BASE_IMAGE_URL}/${data.images}`;

  console.log("🖼️ Final Image URL:", imageUrl);

  return (
    <div className={clsx("single-banner", spaceBottomClass)}>
      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
        <img src={imageUrl} />
      </Link>
      <div className="banner-content banner-pink">
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

BannerSevenSingle.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string,
    des_l1: PropTypes.string,
    des_l2: PropTypes.string,
    des_l3: PropTypes.string,
    link: PropTypes.string,
  }),
  spaceBottomClass: PropTypes.string,
};

export default BannerSevenSingle;
