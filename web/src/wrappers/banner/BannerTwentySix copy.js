import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000"
// "; // Use environment variable

const BannerTwentySix = ({ spaceBottomClass }) => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/upload/images`)
      .then((response) => {
        setBanners(response.data.images);
      })
      .catch((error) => {
        console.error("Error fetching banner images:", error);
      });
  }, []);

  return (
    <div className={clsx("banner-area", spaceBottomClass)}>
      <div className="container-fluid p-0">
        <div className="row no-gutters">
          {banners.length > 0 ? (
            banners.slice(0, 5).map((images, index) => (
              <div key={images.id} className={`col-width-banner33-${(index % 2) + 1}`}>
                <div className="single-banner mb-30">
                  <a href="product-details.html">
                    {/* url: `${BASE_URL}/uploads/${response.data.image.filename}`, // Ensure correct path */}
                    <img src={`${images.url}`} alt={`Banner ${index + 1}`} />
                  </a>
                  <div className={`banner-content-33-2 banner-content-33-2-position${index + 1}`}>
                    <h2>
                      Special Offer <br />
                      Up To {20 + index * 5}% Off
                    </h2>
                    <Link to={`${process.env.PUBLIC_URL}/shop-grid-standard`}>Shop Now</Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-full py-4 text-gray-500">No banners available</p>
          )}
        </div>
      </div>
    </div>
  );
};

BannerTwentySix.propTypes = {
  spaceBottomClass: PropTypes.string,
};

export default BannerTwentySix;
