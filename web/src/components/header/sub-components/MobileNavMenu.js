import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MobileNavMenu = () => {
  const { t } = useTranslation();

  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
     <li>
          <Link to={process.env.PUBLIC_URL + "/"}>
            {t("Home")}
          </Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/about"}>
            {t("About")}
          </Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/"}>
            {t("Everday Elegance")}
          </Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/"}>
            {t("Western Wear")}
          </Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/contact"}>
            {t("contact_us")}
          </Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/contact"}>
            {t("contact_us")}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavMenu;
