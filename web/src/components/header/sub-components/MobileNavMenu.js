import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const MobileNavMenu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility

  const { t } = useTranslation();

  const toggleDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setShowLogoutPopup(true);
  };

  useEffect(() => {
    const checkLogin = () => {
      const customerStr = localStorage.getItem("customerinfo");
      if (customerStr) {
        const customer = JSON.parse(customerStr);
        setIsLoggedIn(true);
        setName(customer.name);
      } else {
        setIsLoggedIn(false);
        setName("");
      }
    };
    checkLogin();
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      {/* User Info Section with Dropdown */}
      {isLoggedIn && (
        <div className="mobile-user-section" style={{ marginBottom: "15px" }}>
          <div
            className="mobile-user-info"
            onClick={toggleDropdown}
            style={{
              padding: "15px",
              borderBottom: "1px solid #eee",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              backgroundColor: showDropdown ? "#f5f5f5" : "transparent",
            }}
          >
            <i className="pe-7s-user-female admin-name-icon" style={{ fontSize: "20px" }}></i>
            <span
              style={{
                fontWeight: "500",
                fontSize: "16px",
                textTransform: "capitalize",
                flexGrow: 1,
              }}
            >
            {name}
            </span>
            <i
              className={`pe-7s-angle-down`}
              style={{
                transition: "transform 0.3s ease",
                transform: showDropdown ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </div>

          {/* Dropdown Menu */}
          {showDropdown && (
            <ul
              className="mobile-user-dropdown"
              style={{
                padding: "0 15px",
                backgroundColor: "#f9f9f9",
                borderBottom: "1px solid #eee",
              }}
            >
              <li style={{ borderBottom: "1px solid #eee" }}>
                <Link
                  to="/my-account"
                  style={{
                    display: "block",
                    padding: "12px 0",
                    color: "#333",
                  }}
                  onClick={() => setShowDropdown(false)}
                >
                  Profile
                </Link>
              </li>
              <li style={{ borderBottom: "1px solid #eee" }}>
                <Link
                  to="/orders"
                  style={{
                    display: "block",
                    padding: "12px 0",
                    color: "#333",
                  }}
                  onClick={() => setShowDropdown(false)}
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  style={{
                    display: "block",
                    padding: "12px 0",
                    color: "#333",
                  }}
                  onClick={(e) => {
                    handleLogoutClick(e);
                    setShowDropdown(false);
                  }}
                >
                  Log Out
                </Link>
              </li>
            </ul>
          )}
        </div>
      )}

      {/* Main Navigation Links */}
      <ul>
        <li>
          <Link to={process.env.PUBLIC_URL + "/"}>{t("Home")}</Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/about"}>{t("About")}</Link>
        </li>
         <li>
          <Link to={process.env.PUBLIC_URL + "/shop-grid-standard?category=Suits"}>{t("Suits")}</Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/shop-grid-standard?category=westernwear"}>{t("Western Wear")}</Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/contact"}>
            {t("contact_us")}
          </Link>
        </li>

        {/* Show login/register if not logged in */}
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/login-register">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            // width: "100vw",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px 30px",
              borderRadius: "10px",
              margin: "10px",
              boxShadow: "0 0 10px rgba(0,0,0,0.25)",
              textAlign: "center",
              width: "300px",
            }}
          >
            <p style={{ marginBottom: "20px", fontSize: "16px" }}>
              Are you sure you want to logout?
            </p>
            <div
              style={{ display: "flex", justifyContent: "center", gap: "10px" }}
            >
              <button
                onClick={() => {
                  localStorage.removeItem("customerinfo");
                  setIsLoggedIn(false);
                  setShowLogoutPopup(false);
                  window.location.reload(); // Refresh to update the UI
                }}
                style={{
                  padding: "6px 12px",
                  background: "#000",
                  color: "#fff",
                  borderRadius: "10px",
                }}
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutPopup(false)}
                style={{
                  padding: "6px 12px",
                  background: "#000",
                  color: "#fff",
                  borderRadius: "10px",
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MobileNavMenu;
