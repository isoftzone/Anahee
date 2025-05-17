import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const HeroSliderFourteenSingle = ({ data }) => {
  return (
    <div
      className="slider-height-5 d-flex align-items-center bg-img position-relative text-white"
      style={{ backgroundImage: `url(${data.images})` }}
    >
      {/* Dark overlay */}
      <div className="slider-content-overlay">
        <div className="z-2">
          <div className="justify-content-center text-center">
            <div className="">
              <div className="slider-content-collection slider-animated-1">
                <h2 className="">
                  <span className="unleash-text">Unleash</span> Your
                </h2>
                <h1 className="text-pink signature-text">Signature</h1>
                <p className="look-text">LOOK</p>
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
