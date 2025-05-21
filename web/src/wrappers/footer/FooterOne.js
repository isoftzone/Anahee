import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import FooterCopyright from "../../components/footer/FooterCopyright";

const FooterOne = ({
  backgroundColorClass,
  spaceTopClass,
  spaceBottomClass,
  spaceLeftClass,
  spaceRightClass,
  containerClass,
  extraFooterClass,
  sideMenu,
}) => {
  return (
    <footer
      className={clsx(
        "footer-area py-3",
        backgroundColorClass,
        spaceTopClass,
        spaceBottomClass,
        extraFooterClass,
        spaceLeftClass,
        spaceRightClass
      )}
    >
      <div className={`${containerClass || "container-fluid"}`}>
        <div className="row justify-content-center pt-5 gy-4">
          {/* Logo */}
          <div className="col-12 col-sm-6 col-md-6 col-lg-3">
            <div className="footer-widget pt-4 text-center text-md-center">
              <div className="footer-logo mb-3">
                <img
                  src="/assets/img/logo/logo.png"
                  alt="Anahee Logo"
                  style={{ maxWidth: "120px" }}
                  className="mx-auto"
                />
              </div>
              <p className="text-center">
                Anahee blends cultural elegance with modern, affordable luxury.
              </p>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="col-12 col-sm-6 col-md-6 col-lg-2">
            <div className="footer-widget pt-4 text-center text-md-center">
              <div className="footer-title">
                <h3>QUICK LINKS</h3>
              </div>
              <ul className="list-unstyled d-flex flex-column align-items-center">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About us</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                  <Link to="/terms-conditions">Terms & Condition</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* USEFUL LINKS */}
          <div className="col-12 col-sm-6 col-md-6 col-lg-3">
            <div className="footer-widget pt-4 text-center text-md-center">
              <div className="footer-title">
                <h3>USEFUL LINKS</h3>
              </div>
              <ul className="list-unstyled d-flex flex-column align-items-center">
                <li>
                  <Link to="/shipping-locations">Shipping Locations</Link>
                </li>
                <li>
                  <Link to="/terms-of-service">Terms of Service</Link>
                </li>
                <li>
                  <Link to="/exchange-process">Exchange Process</Link>
                </li>
                <li>
                  <div className="d-flex justify-content-center gap-3 mt-2">
                    <a
                      href="//www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="https://cdn.simpleicons.org/facebook/000000"
                        alt="Facebook Logo"
                        width="20"
                        height="20"
                      />{" "}
                    </a>
                    <a
                      href="https://www.instagram.com/anahee_india?igsh=cjRvZWVwcDk2ODNh"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="data:image/png;base64,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"
                        alt="Black Instagram Icon"
                        width="30rem"
                        height="24rem"
                      />
                    </a>
                    <a
                      href="//www.youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="https://cdn.simpleicons.org/youtube/000000"
                        alt="YouTube Logo"
                        width="20"
                        height="25"
                      />{" "}
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* POLICY LINKS */}
          <div className="col-12 col-sm-6 col-md-6 col-lg-2">
            <div className="footer-widget pt-4 text-center text-md-center">
              <div className="footer-title">
                <h3>POLICY LINKS</h3>
              </div>
              <ul className="list-unstyled d-flex flex-column align-items-center">
                <li>
                  <Link to="/cancellation-policy">Cancellation Policy</Link>
                </li>
                <li>
                  <Link to="/refund-policy">Refund Policy</Link>
                </li>
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/exchange-policy">Exchange Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <hr
        className="my-5"
        style={{
          width: "50%",
          height: "2px",
          backgroundColor: "black",
          border: "none",
          margin: "auto",
        }}
      />

      {/* Copyright */}
      <section className="text-center mb-3">
        <div className="Right-Reserved tracking-wider">
          &copy; {new Date().getFullYear()}{" "}
          
            Anahee (Anand Fashion) All Rights Reserved

        </div>
      </section>
    </footer>
  );
};

FooterOne.propTypes = {
  backgroundColorClass: PropTypes.string,
  containerClass: PropTypes.string,
  extraFooterClass: PropTypes.string,
  sideMenu: PropTypes.bool,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string,
};

export default FooterOne;
