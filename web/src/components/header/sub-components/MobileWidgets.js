const MobileWidgets = () => {
  return (
    <div className="offcanvas-widget-area">
      <div className="off-canvas-contact-widget">
        <div className="header-contact-info">
          <ul className="header-contact-info__list">
            <li>
              <i className="fa fa-phone"></i>{" "}
             <a href="tel:+91 9799906182">+91 9799906182</a>
            </li>
            <li>
              <i className="fa fa-envelope"></i>{" "}
               <a href="mailto:sahiba@anahee.in">sahiba@anahee.in</a>
            </li>
          </ul>
        </div>
      </div>
      {/*Off Canvas Widget Social Start*/}
      <div className="off-canvas-widget-social">
        {/* <a href="//twitter.com" title="Twitter">
          <i className="fa fa-twitter"></i>
        </a> */}
        <a
          href="https://www.instagram.com/anahee_india?igsh=cjRvZWVwcDk2ODNh"
          title="Instagram"
        >
          <i className="fa fa-instagram"></i>
        </a>
        <a href="//facebook.com" title="Facebook">
          <i className="fa fa-facebook"></i>
        </a>
        <a href="//youtube.com" title="Youtube">
          <i className="fa fa-youtube"></i>
        </a>
      </div>
      {/*Off Canvas Widget Social End*/}
    </div>
  );
};
export default MobileWidgets;