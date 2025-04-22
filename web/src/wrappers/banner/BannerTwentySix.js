import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const BannerTwentySix = ({ spaceBottomClass }) => {
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
    <div className={clsx("banner-area", spaceBottomClass)}>
      <div className="container-fluid p-0">
        <div className="row no-gutters">
          {banners.length >= 3 ? (
            <>
              {/* First Banner */}
              <div className="col-width-banner33-1">
                <div className="single-banner mb-30">
                  <a href="product-details.html">
                    <img src={banners[0]?.images} alt="Banner 1" />
                  </a>
                  <div className="banner-content-33-2 banner-content-33-2-position1">
                    {/* <h4>Branded</h4>
                    <h2>
                      Clothes <br />
                      Up To 40% Off
                    </h2> */}

                    <h4>{banners[0]?.des_l1}</h4>
                      <h2>
                      {banners[0]?.des_l2} <br />
                      {banners[0]?.des_l3}
                      </h2>

                    <Link to={`${process.env.PUBLIC_URL}/shop-grid-standard`}>
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>

              {/* Second Banner */}
              <div className="col-width-banner33-2">
                <div className="single-banner mb-30">
                  <a href="product-details.html">
                    <img src={banners[1]?.images} alt="Banner 2" />
                  </a>
                  <div className="banner-content-33-2 banner-content-33-2-position2">
                    {/* <h2>
                      Women Shirts <br />
                      Up To 30% Off
                    </h2> */}


                    <h2>
                       {banners[1]?.des_l1} <br />
                       {banners[1]?.des_l2}
                       </h2>

                    <Link to={`${process.env.PUBLIC_URL}/shop-grid-standard`}>
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>

              {/* Third Banner */}
              <div className="col-width-banner33-1">
                <div className="single-banner mb-30">
                  <a href="product-details.html">
                    <img src={banners[2]?.images} alt="Banner 3" />
                  </a>
                  <div className="banner-content-33-2 banner-content-33-2-position3">
                    {/* <h4>New</h4>
                    <h2>
                      SweatShirts <br />
                      Up To 40% Off
                    </h2> */}


                    <h4>{banners[2]?.des_l1}</h4>
                        <h2>
                        {banners[2]?.des_l2} <br />
                        {banners[2]?.des_l3}
                        </h2>

                    <Link to={`${process.env.PUBLIC_URL}/shop-grid-standard`}>
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="text-center w-full py-4 text-gray-500">
              No banners available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

BannerTwentySix.propTypes = {
  spaceBottomClass: PropTypes.string,
   des_l1: PropTypes.string,
   des_l2: PropTypes.string,
   des_l3: PropTypes.string,
};

export default BannerTwentySix;
