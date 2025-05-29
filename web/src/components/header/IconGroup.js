// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import clsx from "clsx";
// import MenuCart from "./sub-components/MenuCart";
// const IconGroup = ({ iconWhiteClass }) => {
//   const handleClick = e => {
//     e.currentTarget.nextSibling.classList.toggle("active");
//   };
//   const triggerMobileMenu = () => {
//     const offcanvasMobileMenu = document.querySelector(
//       "#offcanvas-mobile-menu"
//     );
//     offcanvasMobileMenu.classList.add("active");
//   };
//   const { compareItems } = useSelector((state) => state.compare);
//   const { wishlistItems } = useSelector((state) => state.wishlist);
//   const { cartItems } = useSelector((state) => state.cart);
//   return (
//     <div className={clsx("header-right-wrap", iconWhiteClass)} >
//       <div className="same-style header-search d-none d-lg-block">
//         <button className="search-active" onClick={e => handleClick(e)}>
//           <i className="pe-7s-search" />
//         </button>
//         <div className="search-content">
//           <form action="#">
//             <input type="text" placeholder="Search" />
//             <button className="button-search">
//               <i className="pe-7s-search" />
//             </button>
//           </form>
//         </div>
//       </div>
//       <div className="same-style account-setting d-none d-lg-block">
//         <button
//           className="account-setting-active"
//           onClick={e => handleClick(e)}
//         >
//           <i className="pe-7s-user-female" />
//         </button>
//         <div className="account-dropdown">
//           <ul>
//             <li>
//               <Link to={process.env.PUBLIC_URL + "/login-register"}>Login</Link>
//             </li>
//             <li>
//               <Link to={process.env.PUBLIC_URL + "/register"}>
//                 Register
//               </Link>
//             </li>
//             <li>
//               <Link to={process.env.PUBLIC_URL + "/my-account"}>
//                 my account
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//       <div className="same-style header-compare">
//         <Link to={process.env.PUBLIC_URL + "/compare"}>
//           <i className="pe-7s-shuffle" />
//           <span className="count-style">
//             {compareItems && compareItems.length ? compareItems.length : 0}
//           </span>
//         </Link>
//       </div>
//       <div className="same-style header-wishlist">
//         <Link to={process.env.PUBLIC_URL + "/wishlist"}>
//           <i className="pe-7s-like" />
//           <span className="count-style">
//             {wishlistItems && wishlistItems.length ? wishlistItems.length : 0}
//           </span>
//         </Link>
//       </div>
//       <div className="same-style cart-wrap d-none d-lg-block">
//         <button className="icon-cart" onClick={e => handleClick(e)}>
//           <i className="pe-7s-shopbag" />
//           <span className="count-style">
//             {cartItems && cartItems.length ? cartItems.length : 0}
//           </span>
//         </button>
//         {/* menu cart */}
//         <MenuCart />
//       </div>
//       <div className="same-style cart-wrap d-block d-lg-none">
//         <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
//           <i className="pe-7s-shopbag" />
//           <span className="count-style">
//             {cartItems && cartItems.length ? cartItems.length : 0}
//           </span>
//         </Link>
//       </div>
//       <div className="same-style mobile-off-canvas d-block d-lg-none">
//         <button
//           className="mobile-aside-button"
//           onClick={() => triggerMobileMenu()}
//         >
//           <i className="pe-7s-menu" />
//         </button>
//       </div>
//     </div>
//   );
// };
// IconGroup.propTypes = {
//   iconWhiteClass: PropTypes.string,
// };
// export default IconGroup;
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import MenuCart from "./sub-components/MenuCart";
import { deleteAllFromWishlist } from "../../store/slices/wishlist-slice";
import { deleteAllFromCart } from "../../store/slices/cart-slice";
import { useEffect, useState } from "react";
const IconGroup = ({ iconWhiteClass }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cartCount = useSelector((state) => state.cart.cartItems.length) || 0 ;
  const wishlistCount = useSelector((state)=> state.wishlist.wishlistItems?.length) || 0;
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("this is cartCount", cartCount)
  
  console.log("this is cartCount", wishlistCount)

  // const myItems=localStorage.getItem("customerinfo")
  // :white_check_mark: Check localStorage for login status
  //  const [user, setUser] = useState(null);
  // useEffect(() => {
  //   const storedUser = localStorage.getItem('userinfo');
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);
  useEffect(() => {
    const checkLogin = () => {
      const customerStr = localStorage.getItem("customerinfo");
      if (customerStr) {
        const customer = JSON.parse(customerStr);
        setIsLoggedIn(true);
        setName(customer.name); // assuming `customerinfo` has a `name` field
        console.log("setName", name);
      } else {
        setIsLoggedIn(false);
        setName("");
      }
    };
    checkLogin();
    // :white_check_mark: Listen for login/logout in other tabs
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);
  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };
  // const handleLogout = () => {
  //   localStorage.removeItem("customerinfo");
  //   // alert("Logout Successfully");
  //   // confirm();
  //   setIsLoggedIn(false);
  //   // navigate("/");
  // };
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("customerinfo");
      setIsLoggedIn(false);
      dispatch(deleteAllFromCart());
    dispatch(deleteAllFromWishlist());
    //   dispatch(deleteAllFromWishlist());
    // dispatch(deleteAllFromCart())
      // navigate("/"); // Uncomment this if you want to redirect after logout
    } else {
      // User clicked "No", do nothing
    }
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
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      navigate("/shop-grid-standard", {
        state: { name: trimmedQuery },
      });
    } else {
      alert("Please enter a valid search term.");
    }
  };
  // console.log("cartItems",cartItems);
  console.log("myItems", name);
  return (
    <div className={clsx("header-right-wrap", iconWhiteClass)}>
      {/* Search */}
      {/* <div className="same-style header-search d-none d-lg-block">
        <button className="search-active" onClick={handleClick}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <form action="#">
            <input type="text" placeholder="Search" />
            <button className="button-search">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div> */}
      <div className="same-style header-search d-lg-block">
        <button
          className="search-active"
          onClick={(e) => {
            e.preventDefault();
            document
              .querySelector(".search-content")
              ?.classList.toggle("active");
          }}
        >
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
            <button type="submit" className="button-search">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>
      {/* Account Dropdown */}
      <div className="same-style account-setting d-lg-block">
        <button
          className="account-setting-active d-flex align-items-center gap-2"
          onClick={handleClick}
        >
          <i className="pe-7s-user-female" />
          {isLoggedIn && (
            <h4
              className="mb-0 text-truncate text-capitalize d-block"
              style={{
                maxWidth: "80px",
                overflow: "hidden",
                marginLeft: "5px",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: "15px",
                marginBottom: "3px",
              }}
            >
              {name}
            </h4>
          )}
        </button>
        <div className="account-dropdown">
          <ul>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/my-account">Profile</Link>
                </li>
                <li>
                  <Link to="/orders">Orders</Link>
                </li>
                <li>
                  <Link to="/" onClick={handleLogout}>
                    Log Out
                  </Link>
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
