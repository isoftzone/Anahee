import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import clsx from "clsx";
import MenuCart from "./sub-components/MenuCart";
import { useEffect, useState } from "react";
const IconGroup = ({ iconWhiteClass }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
//  search functionality
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("search query", searchQuery);
     if (searchQuery.trim()) {
      navigate('/shop-grid-standard', {
        state: { name: searchQuery }
      });
     }
  };
  // ✅ Check localStorage for login status
  useEffect(() => {
    const checkLogin = () => {
      const customer = JSON.parse(localStorage.getItem("customerinfo"));
      setIsLoggedIn(!!customer);
    };
    checkLogin();
    // ✅ Listen for login/logout in other tabs
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);
  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };
  const handleLogout = () => {
    localStorage.removeItem("customerinfo");
    alert("Logout Successfully");
    setIsLoggedIn(false);
    // navigate("/");
  };
  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    if (offcanvasMobileMenu) {
      offcanvasMobileMenu.classList.add("active");
    }
  };
  const { compareItems } = useSelector((state) => state.compare);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div className={clsx("header-right-wrap", iconWhiteClass)}>
      {/* Search */}
      <div className="same-style header-search d-none d-lg-block">
         <button className="search-active" onClick={e => handleClick(e)}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <form onSubmit={handleSearch}>
             <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="button-search"  onClick={handleSearch}>
            <i className="pe-7s-search" />
          </button>
         
          </form>
        </div>
      
        
        {/* <button className="search-active" onClick={handleClick}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <form action="#">
            <input type="text" placeholder="Search" />
            <button className="button-search">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div> */}
      </div>
      {/* Account Dropdown */}
      <div className="same-style account-setting d-none d-lg-block">
        <button className="account-setting-active" onClick={handleClick}>
          <i className="pe-7s-user-female" />
        </button>
        <div className="account-dropdown">
          <ul>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/my-account">My Account</Link>
                </li>
                <li>
                   <Link to='/' onClick={handleLogout}>Log Out</Link>
                </li>
              </>
            ) : (
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
        </div>
      </div>
      {/* Compare */}
      {/* <div className="same-style header-compare">
        <Link to="/compare">
          <i className="pe-7s-shuffle" />
          <span className="count-style">{compareItems?.length || 0}</span>
        </Link>
      </div> */}
      {/* Wishlist */}
      <div className="same-style header-wishlist">
        <Link to="/wishlist">
          <i className="pe-7s-like" />
          <span className="count-style">{wishlistItems?.length || 0}</span>
        </Link>
      </div>
      {/* Cart (Desktop) */}
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={handleClick}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">{cartItems?.length || 0}</span>
        </button>
        <MenuCart />
      </div>
      {/* Cart (Mobile) */}
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to="/cart">
          <i className="pe-7s-shopbag" />
          <span className="count-style">{cartItems?.length || 0}</span>
        </Link>
      </div>
      {/* Mobile Menu Toggle */}
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button className="mobile-aside-button" onClick={triggerMobileMenu}>
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};
IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};
export default IconGroup;




















