import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const NavMenu = ({ menuWhiteClass, sidebarMenu }) => {
  const { t } = useTranslation();

  return (
    <div
      className={clsx(
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
      )}
    >
      <nav>
        <ul>
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>{t("home")}</Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/about"}>{t("About Us")}</Link>
          </li>
          {/* <li>
             <Link to={process.env.PUBLIC_URL + "/"}>
              {t("Western Wear")}
            </Link>
          </li> */}
          {/* <li> */}
            {/* <Link to={`${process.env.PUBLIC_URL}/shop-grid-standard?category=Kurta`}>
          {t("Everday Elegance")}
        </Link> */}
          {/* </li> */}
          {/* <li>
             <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
              {t("Western Wear")}
            </Link>
          </li> */}
           <li>
            <Link
              to={`${process.env.PUBLIC_URL}/shop-grid-standard?category=Suits`}
            >
              {t("Suits")}
            </Link>
          </li>
          <li>
            <Link
              to={`${process.env.PUBLIC_URL}/shop-grid-standard?category=westernwear`}
            >
              {t("Western Wear")}
            </Link>
          </li>

          {/* <li>
            <Link to={process.env.PUBLIC_URL + "/"}>
              {t("Western Wear")}
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="submenu">
              <li>
                <Link to={process.env.PUBLIC_URL + "/cart"}>
                  {t("Coorsets")}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/checkout"}>
                  {t("Coordsets")}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/wishlist"}>
                  {t("Dresses")}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/compare"}>
                  {t("Skirts & Tops")}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/my-account"}>
                  {t("Jumpsuits")}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/login-register"}>
                  {t("Shorts")}
                </Link>
                
              </li>
            </ul>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/contact"}>
              {t("Loungewear")}
            </Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/contact"}>
              {t("Athleisure")}
            </Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/contact"}>
              {t("Kidswear")}
            </Link>
          </li> */}
          {/* <li>
            <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
              {t("blog")}
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="submenu">
              <li>
                <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                  {t("blog_standard")}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/blog-no-sidebar"}>
                  {t("blog_no_sidebar")}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/blog-right-sidebar"}>
                  {t("blog_right_sidebar")}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                  {t("blog_details_standard")}
                </Link>
              </li>
            </ul>
          </li> */}
          <li>
            <Link to={process.env.PUBLIC_URL + "/contact"}>
              {t("Contact Us")}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
};

export default NavMenu;
