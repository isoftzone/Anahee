import PropTypes from "prop-types";
import clsx from "clsx";
import { useEffect, useState } from "react";
import axios from "axios";
import BannerElevenSingle from "../../components/banner/BannerElevenSingle";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const BannerEleven = ({ spaceBottomClass }) => {
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
    <div className={clsx("banner-area", spaceBottomClass)}>
      <div className="row no-gutters">
        {banners.length >= 2 ? (
          banners.slice(20, 22).map((single, key) => (
            <div className="col-lg-6 col-md-6" key={key}>
              <BannerElevenSingle data={single} />
            </div>
          ))
        ) : (
          <p>No banners available</p>
        )}
      </div>
    </div>
  );
};

BannerEleven.propTypes = {
  spaceBottomClass: PropTypes.string
};

export default BannerEleven;
