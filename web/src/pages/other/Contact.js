import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import GoogleMap from "../../components/google-map";
const Contact = () => {
  let { pathname } = useLocation();
  return (
    <Fragment>
      <SEO
        titleTemplate="Contact"
        description="Contact page of Anahee Anahee."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        {/* <Breadcrumb
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Contact", path: process.env.PUBLIC_URL + pathname }
          ]}
        /> */}
        <div className="contact-area pt-100 pb-3">
          <div className="container-fluid">
            <div className="contact-map mb-10">
              <iframe
                title="Anahee Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10985.797589222544!2d75.77160155541992!3d26.936704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db37fbb01310f%3A0x4916f277d8d96683!2sIndira%20colony%20near%20bani%20park!5e1!3m2!1sen!2sin!4v1747910028780!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>{" "}
            </div>
            <div className="custom-row-2">
              <div className="col-12 col-lg-4 col-md-5">
                <div className="contact-info-wrap">
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-phone" />
                    </div>
                    <div className="contact-info-dec">
                      <p>+91 9799906182</p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-globe" />
                    </div>
                    <div className="contact-info-dec">
                      <p>
                        <a href="mailto:sahiba@anahee.in">sahiba@anahee.in</a>
                      </p>
                      <p>
                        <a href="http://anahee.in/">anahee.in</a>
                      </p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-map-marker" />
                    </div>
                    <div className="contact-info-dec">
                      <p> 58, Indira Colony Bani Park,</p>
                      <p> near Pani Paech Chaurah, Jaipur - 302016</p>
                    </div>
                  </div>
                  {/* <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-map-marker" />
                    </div>
                    <div className="contact-info-dec">
                      <p> <b> Branch  :  </b> 73, Second floor,</p>
                      <p> The White House Society, Sector-57, 122003</p>
                    </div>
                  </div> */}
                  <div className="contact-social text-center">
                    <h3>Follow Us</h3>
                    <ul>
                      <li>
                        <a href="//facebook.com">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="//pinterest.com">
                          <i className="fa fa-instagram" />
                        </a>
                      </li>
                      <li>
                        <a href="//thumblr.com">
                          <i class="fa fa-youtube"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-8 col-md-7">
                <div className="contact-form">
                  <div className="contact-title mb-30">
                    <h2>Get In Touch</h2>
                  </div>
                  <form className="contact-form-style">
                    <div className="row">
                      <div className="col-lg-6">
                        <input name="name" placeholder="Name*" type="text" />
                      </div>
                      <div className="col-lg-6">
                        <input name="email" placeholder="Email*" type="email" />
                      </div>
                      <div className="col-lg-12">
                        <input
                          name="subject"
                          placeholder="Subject*"
                          type="text"
                        />
                      </div>
                      <div className="col-lg-12">
                        <textarea
                          name="message"
                          placeholder="Your Message*"
                          defaultValue={""}
                        />
                        <button className="submit" type="submit">
                          SEND
                        </button>
                      </div>
                    </div>
                  </form>
                  <p className="form-message" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};
export default Contact;
