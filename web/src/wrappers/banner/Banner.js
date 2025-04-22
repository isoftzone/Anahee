import PropTypes from "prop-types";
import clsx from "clsx";
import banner from "../../data/banner/banner.json";
import BannerElevenSingle from "../../components/banner/BannerElevenSingle.js";

const Banner = ({ spaceBottomClass }) => {
  return (
    <div className={clsx("banner-area", spaceBottomClass)}>
      <div className="row no-gutters">
        {banner?.map((single, key) => (
          <div className="col-lg-6 col-md-6" key={key}>
            <BannerElevenSingle data={single} />
          </div>
        ))}
      </div>
    </div>
  );
};

Banner.propTypes = {
  spaceBottomClass: PropTypes.string
};

export default Banner;
