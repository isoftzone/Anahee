import PropTypes from "prop-types";
import clsx from "clsx";
import { useEffect, useState } from "react";
import axios from "axios";
import BannerThirtyThreeSingle from "../../components/banner/BannerThirtyThreeSingle";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const BannerThirtyThree = ({ spaceTopClass, spaceBottomClass }) => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/images`)
      .then((response) => {
        console.log("✅ API Response:", response.data);
        setBanners(response.data.images);
      })
      .catch((error) => {
        console.error("❌ Error fetching banners:", error);
      });
  }, []);

  return (
    <div className={clsx("banner-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="row">
          {banners.length > 0 ? (
            banners.slice(14, 16).map((single, key) => ( // Adjust the range as needed
              <div className="col-lg-6 col-md-6" key={key}>
                <BannerThirtyThreeSingle data={single} spaceBottomClass="mb-30" />
              </div>
            ))
          ) : (
            <p>No banners available</p>
          )}
        </div>
      </div>
    </div>
  );
};

BannerThirtyThree.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerThirtyThree;
