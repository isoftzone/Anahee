import PropTypes from "prop-types";
import clsx from "clsx";
import { useEffect, useState } from "react";
import axios from "axios";
import BannerNineSingle from "../../components/banner/BannerNineSingle";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const BannerNine = ({ spaceBottomClass }) => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/images`)
      .then((response) => {
        console.log("✅ API Response:", response.data); // ✅ Log API Response
        setBanners(response.data.images);
      })
      .catch((error) => {
        console.error("❌ Error fetching banners:", error);
      });
  }, []);

  return (
    <div className={clsx("banner-area", spaceBottomClass)}>
      <div className="container">
        <div className="row">
          {banners.length >= 2 ? (
            banners.slice(16, 18).map((single, key) => (
              <div className="col-lg-6 col-md-6" key={key}>
                <BannerNineSingle
                  data={single}
                  spaceBottomClass="mb-30"
                />
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

BannerNine.propTypes = {
  spaceBottomClass: PropTypes.string
};

export default BannerNine;
