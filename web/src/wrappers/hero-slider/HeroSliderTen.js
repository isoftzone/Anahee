import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const HeroSliderTen = ({ spaceTopClass, spaceBottomClass }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoDimensions, setVideoDimensions] = useState({
    width: 0,
    height: 0,
  });
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setVideoUrl(`${BASE_URL}/videos/productsvideo.mp4`);
  }, []);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const { videoWidth, videoHeight } = videoRef.current;
      setVideoDimensions({ width: videoWidth, height: videoHeight });
    }
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Calculate padding-top percentage based on aspect ratio
  const aspectRatio = (videoDimensions.height / videoDimensions.width) * 100;
  const videoContainerStyle = {
    position: "relative",
    width: "100%",
    paddingTop: `${aspectRatio}%`,
    overflow: "hidden",
  };

  return (
    <div className={`slider-area ${spaceTopClass} ${spaceBottomClass}`}>
      <div
        ref={containerRef}
        className="video-container"
        style={videoContainerStyle}
      >
        {videoUrl ? (
          <>
            <video
              ref={videoRef}
              className="position-absolute top-0 left-0 w-full h-full object-cover"
              muted
              loop
              onClick={togglePlayPause}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onLoadedMetadata={handleLoadedMetadata}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Centered Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className="position-absolute top-50 start-50 translate-middle
                        rounded-circle border-0 cursor-pointer
                        d-flex justify-content-center align-items-center
                        bg-white z-3 shadow-sm"
              style={{
                width: "80px",
                height: "80px",
              }}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg width="35" height="35" fill="#dc3545" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg width="35" height="35" fill="#dc3545" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </>
        ) : (
          <p className="text-white position-absolute top-50 start-50 translate-middle">
            Loading video...
          </p>
        )}
      </div>
    </div>
  );
};

HeroSliderTen.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default HeroSliderTen;
