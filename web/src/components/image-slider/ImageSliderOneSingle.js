import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Use "/" if files are inside public folder directly

const BASE_IMAGE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";


const ImageSliderOneSingle = ({ data }) => {
  const fileName = data?.images || "";
  const mediaUrl = fileName.startsWith("http")
    ? fileName
    : `${BASE_IMAGE_URL}${fileName.startsWith("/") ? "" : "/"}${fileName}`;

  const isImage = /\.(jpeg|jpg|png|gif|webp|svg)$/i.test(fileName);

  return (
    <div className="single-image">
      <Link to={data.link || "/"}>
        {isImage ? (
          <img
            src={mediaUrl}
            alt={data.alt || "Image Slider"}
            onError={(e) => {
              console.error("❌ Image failed to load:", e.target.src);
              e.target.src = "https://via.placeholder.com/300";
            }}
          />
        ) : (
          <video
            src={mediaUrl}
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", height: "auto" }}
            onError={(e) => {
              console.error("❌ Video failed to load:", e.target.src);
            }}
          />
        )}
      </Link>
    </div>
  );
};

ImageSliderOneSingle.propTypes = {
  data: PropTypes.shape({
    images: PropTypes.string,
    link: PropTypes.string,
    alt: PropTypes.string,
  }).isRequired,
};

export default ImageSliderOneSingle;
