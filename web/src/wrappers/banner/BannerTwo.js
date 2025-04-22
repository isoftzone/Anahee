import PropTypes from "prop-types";
import clsx from "clsx";
import { useEffect, useState } from "react";
import axios from "axios";
import BannerTwoSingle from "../../components/banner/BannerTwoSingle";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const BannerTwo = ({ spaceTopClass, spaceBottomClass }) => {
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
          {banners.length >= 2 ? (
            banners.slice(18, 20).map((single, key) => (
              <div className="col-sm-6 col-12" key={key}>
                <BannerTwoSingle data={single} />
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

BannerTwo.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerTwo;
