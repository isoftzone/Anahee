import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const HeroSliderTen = ({ spaceTopClass, spaceBottomClass }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setVideoUrl(`${BASE_URL}/videos/productsvideo.mp4`);
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

  return (
     <div className={`slider-area ${spaceTopClass} ${spaceBottomClass}`}>
      {/* Video Container - Responsive Height */}
      <div className="video-container position-relative overflow-hidden w-100">
        {videoUrl ? (
          <>
            <video
              ref={videoRef}
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{ 
                objectFit: "cover" // Ensures video fills container
              }}
              muted
              loop
              onClick={togglePlayPause}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className="position-absolute top-50 start-50 translate-middle
                    rounded-circle border-0
                    d-flex justify-content-center align-items-center
                    bg-white shadow-sm"
              style={{
                width: "40px",
                height: "40px",
                zIndex: 1,
              }}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg width="30" height="30" fill="#dc3545" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg width="30" height="30" fill="#dc3545" viewBox="0 0 24 24">
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

      {/* Add this CSS (either in your CSS file or via CSS-in-JS) */}
      <style jsx>{`
        .video-container {
          height: 700px;
          background-color: #000;
        }
        
        @media (max-width: 1024px) {
          .video-container {
            height: 500px;
          }
        }
        
        @media (max-width: 767px) {
          .video-container {
            height: 300px;
          }
        }
      `}</style>
    </div>
  );
};

HeroSliderTen.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default HeroSliderTen;