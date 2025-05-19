import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

const BASE_IMAGE_URL = process.env.REACT_APP_BASE_IMAGE_URL || "/";

const ImageSliderOneSingle = ({ data }) => {
  const fileName = data?.images || "";
  const mediaUrl = fileName.startsWith("http")
    ? fileName
    : `${BASE_IMAGE_URL}${fileName.startsWith("/") ? "" : "/"}${fileName}`;

  const isImage = /\.(jpeg|jpg|png|gif|webp|svg)$/i.test(fileName); 
  const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(fileName);

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoDimensions, setVideoDimensions] = useState({ width: 16, height: 9 });

  useEffect(() => {
    if (videoRef.current) {
      const { videoWidth, videoHeight } = videoRef.current;
      if (videoWidth && videoHeight) {
        setVideoDimensions({ width: videoWidth, height: videoHeight });
      }
    }
  }, []);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const aspectRatio = (videoDimensions.height / videoDimensions.width) * 100;

  return (
    <div className="single-image">
      <Link to={data.link || "/"} className="d-block text-decoration-none">
        {isImage ? (
          <img
            src={mediaUrl}
            alt={data.alt || "Media"}
            onError={(e) => {
              console.error("❌ Image failed to load:", e.target.src);
              e.target.src = "https://via.placeholder.com/300";
            }}
            style={{ width: "100%", height: "auto" }}
          />
        ) : isVideo ? (
          <div
            className="position-relative w-100"
            style={{ paddingTop: `${aspectRatio}%`, overflow: "hidden" }}
          >
            <video
              ref={videoRef}
              className="position-absolute top-0 start-0 w-100 h-100 object-cover"
              muted
              loop
              playsInline
              onClick={togglePlayPause}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onLoadedMetadata={() => {
                if (videoRef.current) {
                  const { videoWidth, videoHeight } = videoRef.current;
                  setVideoDimensions({ width: videoWidth, height: videoHeight });
                }
              }}
            >
              <source src={mediaUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <button
              onClick={(e) => {
                e.preventDefault();
                togglePlayPause();
              }}
              className="position-absolute top-50 start-50 translate-middle rounded-circle border-0 d-flex justify-content-center align-items-center bg-white shadow"
              style={{
                width: "60px",
                height: "60px",
                zIndex: 10,
              }}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg width="24" height="24" fill="#dc3545" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg width="24" height="24" fill="#dc3545" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>
        ) : (
          <p className="text-danger">Unsupported media format</p>
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
