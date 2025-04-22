import PropTypes from "prop-types";
import clsx from "clsx";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("welcome-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="welcome-content text-center">
          <h5>Who Are We</h5>
          <h1>Welcome To Anahee</h1>
          <p>
            Anahee redefines affordable luxury for modern women by blending
            cultural richness with contemporary aesthetics. Our vision is to
            craft timeless pieces that exude empowerment and confidence,
            ensuring that style comes without the weight of a hefty price tag.
            Our carefully curated collection harmonizes classic prints with
            modern silhouettes, delivering premium, classy, and elegant designs.
            Each piece is a reflection of exclusivity and high fashion, tailored
            for women who seek not just style but also substance in their
            wardrobe. Our band is not just a fashion; it’s a statement of
            confidence and grace, reimagined for today’s empowered woman.{" "}
          </p>
        </div>
      </div>
      <div className="container">
        <div className="welcome-content text-center">
          <h1>Our Vision</h1>
          <p>
            At Anahee, our vision is to empower modern women with affordable
            luxury that seamlessly blends cultural heritage and contemporary
            aesthetics. We aim to craft timeless designs that inspire confidence
            and grace, ensuring every woman feels elegant and empowered without
            compromising on quality or value
          </p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = { 
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default SectionTitleWithText;
