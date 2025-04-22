import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BASE_IMAGE_URL = process.env.REACT_APP_BASE_IMAGE_URL || "http://localhost:3000/images";

const ImageSliderOneSingle = ({ data }) => {
  const imageUrl = data.images?.startsWith("http")
    ? data.images
    : `${BASE_IMAGE_URL}/${data.images}`;

  console.log("🖼️ Final Image URL:", imageUrl);

  return (
    <div className="single-image">
      <Link to={data.link || "/"}>
        <img
          src={imageUrl || "https://via.placeholder.com/300"}
          alt={data.alt || "Image Slider"}
          onError={(e) => {
            console.error("❌ Image failed to load:", e.target.src);
          }}
        />
      </Link>
    </div>
  );
};

ImageSliderOneSingle.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string,
    link: PropTypes.string,
    alt: PropTypes.string,
  }),
};

export default ImageSliderOneSingle;
