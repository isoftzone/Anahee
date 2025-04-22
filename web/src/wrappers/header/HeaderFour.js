import { useEffect, useState } from "react";  
import { Link } from "react-router-dom";  
import clsx from "clsx";  
import NavMenu from "../../components/header/NavMenu";  
import IconGroup from "../../components/header/NavMenu";  
import MobileMenu from "../../components/header/MobileMenu";  

const HeaderFour = () => {  
  const [scroll, setScroll] = useState(0);  
  const [headerTop, setHeaderTop] = useState(0);  

  useEffect(() => {  
    const header = document.querySelector(".sticky-bar");  
    setHeaderTop(header.offsetTop);  
    window.addEventListener("scroll", handleScroll);  
    return () => {  
      window.removeEventListener("scroll", handleScroll);  
    };  
  }, []);  

  const handleScroll = () => {  
    setScroll(window.scrollY);  
  };  

  return (  
    <header  
      className={clsx("header-area sticky-bar header-padding-3 header-res-padding clearfix transparent-bar", scroll > headerTop && "stick")}  
    >  
      <div className="container-fluid">  
        <div className="row align-items-center">  
          <div className="col-xl-5 col-lg-6 d-none d-lg-block">  
            <NavMenu menuWhiteClass="menu-white" />  
          </div>  
          <div className="col-xl-2 col-lg-2 col-md-6 col-4">  
            <div className="logo text-center logo-hm5">  
              {/* Hide this logo when scrolled down */}  
              <Link className={scroll > headerTop ? "sticky-none" : "sticky-block"} to={process.env.PUBLIC_URL + "/"}>  
                <img alt="" src="assets/img/logo/logo-2.png" />  
              </Link>  
              {/* This is the navbar logo that will be visible when scrolled down */}  
              <Link className="sticky-block" to={process.env.PUBLIC_URL + "/"}>  
                <img alt="" src="assets/img/logo/logo.png" />  
              </Link>  
            </div>  
          </div>  
          <div className="col-xl-5 col-lg-4 col-md-6 col-8">  
            <IconGroup iconWhiteClass="header-right-wrap-white" />  
          </div>  
        </div>  
        <MobileMenu />  
      </div>  
    </header>  
  );  
};  

export default HeaderFour;