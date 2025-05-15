import PropTypes from "prop-types";
import clsx from "clsx";
import SubscribeEmailTwo from "../../components/newsletter/SubscribeEmailTwo";

const NewsletterTwo = ({
  spaceTopClass,
  spaceBottomClass,
  subscribeBtnClass
}) => {
  return (
    <div className={clsx("subscribe-area-3", spaceTopClass, spaceBottomClass)}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-5 col-lg-7 col-md-10 ms-auto me-auto">
            <div className="subscribe-style-3 text-center">
              <div className="subscribe-content">
              <h1>Sign up now & get 10% off </h1>
              <p>Be the first to know about our new arrivals and exclusive offers.</p>
              </div>
              {/* subscription form */}
              <SubscribeEmailTwo
                mailchimpUrl="//devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef"
                spaceTopClass="mt-35"
                subscribeBtnClass={subscribeBtnClass}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

NewsletterTwo.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default NewsletterTwo;
