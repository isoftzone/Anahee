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
        <div className="row justify-content-center ">
          {/* Logo */}
          <div className="col-12 col-sm-6 col-md-3 col-lg-2">
            <FooterCopyright
            className ="footer-title text-start text-md-center"
              footerLogo="/assets/img/logo/logo.png"
              spaceBottomClass="mb-30"
            />
            {/* Follow Us */}
            <div className="list-unstyled d-flex flex-column align-items-center align-items-md-center">
              <p>
Anahee blends cultural elegance with modern, affordable luxury.        </p>
            </div>
          </div>
          {/* HOME Links */}
          <div className="col-12 col-sm-6 col-md-3 col-lg-2  my-4">
            <div className="footer-widget pt-4">
              <div className="footer-title text-center text-md-center">
                <h3>QUICK LINKS</h3>
              </div>
              <div className="footer-list">
                <ul className="list-unstyled d-flex flex-column align-items-center align-items-md-center">
                  <li>
                    <Link to="/home">Home</Link>
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
          </div>
          {/* Useful Links */}
          <div className="col-12 col-sm-6 col-md-3 col-lg-2 my-4">
            <div className="footer-widget pt-4 text-center ">
              <div className="footer-title text-center text-md-center">
                <h3>USEFUL LINKS</h3>
              </div>
              <div className="footer-list">
                <ul className="list-unstyled d-flex flex-column align-items-center align-items-md-center">
                  {/* <li><Link to="/cancellation-policy">Cancellation Policy</Link></li> */}
                  {/* <li><Link to="/refund-policy">Refund Policy</Link></li> */}
                  <li>
                    <Link to="/shipping-locations">Shipping Locations</Link>
                  </li>
                  <li>
                    <Link to="/terms-of-service">Terms of Service</Link>
                  </li>
                  <li>
                    <Link to="/exchange-process">Exchange Process</Link>
                  </li>
                     <div className="footer-list d-flex justify-content-center justify-content-md-start gap-3 mt-2">
                <a
                  href="//www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-facebook"></i>
                </a>
                <a
                  href="https://www.instagram.com/anahee_india?igsh=cjRvZWVwcDk2ODNh"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-instagram"></i>
                </a>
                <a
                  href="//www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-youtube"></i>
                </a>
              </div>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3 col-lg-2 my-4">
            <div className="footer-widget pt-4 text-center ">
              <div className="footer-title text-center text-md-center">
                <h3>POLICY LINKS</h3>
              </div>
              <div className="footer-list">
                <ul className="list-unstyled d-flex flex-column align-items-center align-items-md-center">
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
      </div>

     <hr className="my-5" style={{ width: "50%", height: "2px", backgroundColor: "black", border: "none", margin:"auto" }} />


      {/* Copyright */}
      <section className="text-center mb-3 ">
        <div className="Right-Reserved tracking-wider">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://hasthemes.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Anahee (Anand Fashion) All Rights Reserved
          </a>
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
