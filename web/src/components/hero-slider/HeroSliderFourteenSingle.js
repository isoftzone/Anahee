import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const HeroSliderFourteenSingle = ({ data }) => {
  const [banners, setBanners] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PUBLIC_URL}/images`)
      .then((response) => {
        console.log(":white_check_mark: API Response: 999999999", response.data);
        setBanners(response.data.images);
      })
      .catch((error) => {
        console.error(":x: Error fetching banners:", error);
      });
  }, []);
  console.log("banners.slice(35, 38)", banners.slice(35, 38));
  return (
    <div
      className="slider-height-5 d-flex align-items-center bg-img position-relative text-white"
      style={{ backgroundImage: `url(${data.images})` }}
    >
      {banners.length >= 3 ? (
        <>
          {/* Dark overlay */}
          <div className="slider-content-overlay">
            <div className="z-2">
              <div className="justify-content-center text-center">
                <div className="">
                  <div className="slider-content-collection slider-animated-1">
                    {/* <h2 className="">
                  <span className="unleash-text">Unleash</span> Your
                </h2> */}
                    <h2 className="">
                      <span className="unleash-text">
                        {banners[35]?.des_l1}
                      </span>
                    </h2>
                    {/* <h2>
                      {banners[35]?.des_l1} <br />
                    </h2> */}
                    {/* <h1 className="text-pink signature-text">Signature</h1> */}
                    <h1 className="text-pink signature-text">
                      {banners[35]?.des_l2}
                    </h1>
                    {/* <p className="look-text">LOOK</p> */}
                    <p className="look-text">{banners[35]?.des_l3}</p>
                  </div>
                  <div className="slider-btn-collection-5">
                    <Link
                      className="see-collection-btn"
                      to={process.env.PUBLIC_URL + "/shop-grid-standard"}
                    >
                      See Collection <span>&#8594;</span>
                    </Link>
                  </div>
                </div>
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
  );
};
HeroSliderFourteenSingle.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    images: PropTypes.string,
    url: PropTypes.string,
    titleImage: PropTypes.string,
  }).isRequired,
};
export default HeroSliderFourteenSingle;