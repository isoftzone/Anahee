import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const BannerTwentyEight = ({ spaceTopClass, spaceBottomClass }) => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/images`)
      .then((response) => {
        setBanners(response.data.images);
      })
      .catch((error) => {
        console.error("Error fetching banner images:", error);
      });
  }, []);

  return (
    <div className={clsx("banner-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="row">
          {banners.length >= 2 ? (
            <>
              {/* First Banner */}
              <div className="col-md-8">
                <div className="single-banner mb-30">
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    <img src={banners[6]?.images} alt="Banner 1" className="img-fluid" />
                  </Link>
                </div>
              </div>

              {/* Second Banner */}
              <div className="col-md-4">
                <div className="single-banner mb-30">
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    <img src={banners[7]?.images} alt="Banner 2" className="img-fluid" />
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <p className="text-center w-full py-4 text-gray-500">No banners available</p>
          )}
        </div>
      </div>
    </div>
  );
};

BannerTwentyEight.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default BannerTwentyEight;
