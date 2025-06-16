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
import { useEffect, useRef, useState } from "react";
import { setCartItems } from "../../store/slices/cart-slice";
import { setwishlistItems } from "../../store/slices/wishlist-slice";
import axios from "axios";
import { BASE_URL } from "../../config";
const IconGroup = ({ iconWhiteClass }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cartCount = useSelector((state) => state.cart.cartItems.length) || 0;
  const wishlistCount =
    useSelector((state) => state.wishlist.wishlistItems?.length) || 0;
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
   const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
 const { compareItems } = useSelector((state) => state.compare);
  const { products } = useSelector((state) => state.product);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);
  const searchRef = useRef(null);
  console.log("this is cartCount", cartCount);

  console.log("this is cartCount", wishlistCount);

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
    const checkLogin = async() => {
      const customerStr = localStorage.getItem("customerinfo");
      if (customerStr) {
        const customer = JSON.parse(customerStr);
        setIsLoggedIn(true);
        setName(customer.name); // assuming `customerinfo` has a `name` field
        console.log("setName", name);
         try{
         const response = await axios.get(`${BASE_URL}/getalladdtocart/${customer.id}`);
          const allCartItems = response.data.data;
          const wishlistdata = await axios.get(`${BASE_URL}/getwishlist/${customer.id}`);
          const allwishlistitem = wishlistdata.data.data;
          
          console.log("this is long time login cart data ", allCartItems);
              console.log("this is long time login wishlist data ", allwishlistitem);
      
          dispatch(setCartItems(allCartItems));
          dispatch(setwishlistItems(allwishlistitem));
        }
        catch(error){
          console.log("this is fetching cart/wishlist", error);
        }
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

   // Handle search input changes
// Handle search input changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setShowSearchResults(false);
      return;
    }
    // const results = products.filter(product =>
    //   product.name.toLowerCase().includes(searchQuery.toLowerCase())
    //   .slice(0, 5); // Show only top 5 results
const results = products
  .filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .slice(0, 5); // Show only top 5 results
    setSearchResults(results);
    setShowSearchResults(results.length > 0);
  }, [searchQuery, products]);

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
    } else {
      // User clicked "No", do nothing
    }
  };
  const handleLogoutClick = () => {
    setShowLogoutPopup(true);
  };
  const confirmLogout = () => {
    localStorage.removeItem("customerinfo");
    setIsLoggedIn(false);
    setShowLogoutPopup(false);
    dispatch(deleteAllFromCart());
    dispatch(deleteAllFromWishlist());
    navigate("/"); // optional: redirect to home
  };
  const cancelLogout = () => {
    setShowLogoutPopup(false);
  };
  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    if (offcanvasMobileMenu) {
      offcanvasMobileMenu.classList.add("active");
    }
  };
   const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim().toLowerCase();
    
    if (trimmedQuery) {
      const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(trimmedQuery)
      );
      
      navigate("/shop-grid-standard", {
        state: { 
          searchQuery: trimmedQuery,
          filteredProducts: filteredProducts 
        },
      });
      setSearchQuery("");
      setShowSearchResults(false);
    }
  };

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSearchResults(false);
      document.querySelector(".search-content")?.classList.remove("active");
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

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
      <div className="same-style header-search d-none d-lg-block">
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
              onFocus={() => searchQuery && setShowSearchResults(true)}
  // onBlur={() => setShowSearchResults(false)}
            />
            <button type="submit" className="button-search">
              <i className="pe-7s-search" />
            </button>
            {showSearchResults && (
  <div className="search-results-dropdown">
    {searchResults.map((product) => (
      <Link
        key={product.id}
        to={`/product/${product.id}`}
        className="search-result-item"
        onClick={() => {
          setSearchQuery("");
          setShowSearchResults(false);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px",
          borderBottom: "1px solid #eee",
          textDecoration: "none",
          color: "#000",
        }}
      >
        <div
          className="search-result-image"
          style={{ width: "50px", height: "50px", flexShrink: 0 }}
        >
          <img
            src={
              product.image?.[0]
                ? `${BASE_URL}/${product.image[0]}`
                : "/assets/img/default.jpg"
            }
            alt={product.name}
            style={{ width: "50px", height: "50px" }}
            className="object-cover rounded"
          />
        </div>
        <div
          className="search-result-details"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h6 style={{ margin: 0, fontSize: "14px", fontWeight: "bold" }}>
            {product.name}
          </h6>
          <span style={{ fontSize: "12px", color: "#666" }}>
            {product.category || "Uncategorized"}
          </span>
        </div>
      </Link>
    ))}
  </div>
)}

          </form>
        </div>
      </div>
      {/* Account Dropdown */}
      <div className="same-style account-setting d-lg-block d-none">
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
                  <Link to="#" onClick={handleLogoutClick}>
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
          <i className="pe-7s-like icon-like-cart" />
          <span className="count-style">{wishlistItems?.length || 0}</span>
        </Link>
      </div>
      {/* Cart (Desktop) */}
      <div className="same-style cart-wrap  d-none d-lg-block">
        <button className="icon-cart" onClick={handleClick}>
          <i className="pe-7s-shopbag  icon-like-cart" />
          <span className="count-style">{cartItems?.length || 0}</span>
        </button>
        <MenuCart />
      </div>
      {/* Cart (Mobile) */}
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to="/cart">
          <i className="pe-7s-shopbag  icon-like-cart" />
          <span className="count-style">{cartItems?.length || 0}</span>
        </Link>
      </div>
      {/* Mobile Menu Toggle */}
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button className="mobile-aside-button" onClick={triggerMobileMenu}>
          <i className="pe-7s-menu  icon-like-cart" />
        </button>
      </div>
      {/* Logout Confirmation Popup (Inline) */}
      {showLogoutPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
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
                onClick={confirmLogout}
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
                onClick={cancelLogout}
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
    </div>
  );
};
IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};
export default IconGroup;
