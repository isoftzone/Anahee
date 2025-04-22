import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const BannerSix = ({ spaceTopClass, spaceBottomClass }) => {
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
      <div className="container padding-20-row-col">
        <div className="row">
          {banners.length >= 3 ? (
            <>
              {/* First Banner */}
              <div className="col-lg-6 col-md-6">
                <div className="single-banner mb-20">
                  <Link to={`${process.env.PUBLIC_URL}/shop-grid-standard`}>
                    <img src={banners[3]?.images} alt="Banner 1" />
                  </Link>
                  <div className="banner-content-4 banner-position-hm15-2 pink-banner">
                    <span>{banners[3]?.des_l1}</span>
                    
                    {/* <span>-20% Off</span> */}
                    <h2>{banners[3]?.des_l2}</h2>
                    {/* <h2>New Tulip</h2> */}
                    {/* <h5>Best for your Mind.</h5> */}
                    <h5>{banners[3]?.des_l3}</h5>
                    <Link to={`${process.env.PUBLIC_URL}/shop-grid-standard`}>
                      SHOP NOW
                    </Link>
                  </div>
                </div>
              </div>

              {/* Second Banner */}
              <div className="col-lg-6 col-md-6">
                <div className="single-banner mb-20">
                  <Link to={`${process.env.PUBLIC_URL}/shop-grid-standard`}>
                    <img src={banners[4]?.images} alt="Banner 2" />
                  </Link>
                  <div className="banner-content-3 banner-position-hm15-2 pink-banner">
                    <h3>{banners[4]?.des_l1}</h3>
                  {/* <h3>Pink Tulip </h3> */}
                    {/* <p>
                      Starting At <span>₹99.00</span>
                    </p> */}
                    <p>{banners[4]?.des_l2}<span>{banners[4]?.des_l3}</span></p>
                    

                    <Link to={`${process.env.PUBLIC_URL}/shop-grid-standard`}>
                      <i className="fa fa-long-arrow-right" />
                    </Link>
                  </div>
                </div>

                {/* Third Banner */}
                <div className="single-banner mb-20">
                  <Link to={`${process.env.PUBLIC_URL}/shop-grid-standard`}>
                    <img src={banners[5]?.images} alt="Banner 3" />
                  </Link>
                  <div className="banner-content-3 banner-position-hm17-1 pink-banner">
                  <h3>{banners[5]?.des_l1}</h3>

                  {/* <h3>Pink Tulip </h3> */}
                    {/* <p>
                      Starting At <span>₹99.00</span>
                    </p> */}
                    <p>{banners[5]?.des_l2}<span>{banners[5]?.des_l3}</span></p>

                    <Link to={`${process.env.PUBLIC_URL}/shop-grid-standard`}>
                      <i className="fa fa-long-arrow-right" />
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

BannerSix.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
   des_l1: PropTypes.string,
   des_l2: PropTypes.string,
   des_l3: PropTypes.string,
};

export default BannerSix;
