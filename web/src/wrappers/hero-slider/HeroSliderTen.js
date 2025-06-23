import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

const HeroSliderTen = ({ spaceTopClass, spaceBottomClass }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef(null);

  const videoUrl = "/assets/img/team/Fashion_Film.mp4";

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    const newMuted = !isMuted;
    setIsMuted(newMuted);
    videoRef.current.muted = newMuted;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
      setIsMuted(newVolume === 0);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  return (
    <div className={`slider-area ${spaceTopClass} ${spaceBottomClass}`}>
      <div
        className="video-container position-relative overflow-hidden w-100"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          ref={videoRef}
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ objectFit: "cover" }}
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
          className="play-pause-button position-absolute top-50 start-50 translate-middle rounded-circle border-0 d-flex justify-content-center align-items-center bg-white shadow-sm"
          style={{
            width: "40px",
            height: "40px",
            zIndex: 2,
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

        {/* Controls: Volume + Mute */}
        <div
          className={`position-absolute bottom-0 end-0 m-3 d-flex align-items-center gap-2 ${
            showControls ? "opacity-100" : "opacity-0"
          } transition-opacity`}
          style={{ zIndex: 2 }}
        >
          {/* Volume Slider */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />

          {/* Mute/Unmute Button */}
          <button
            onClick={toggleMute}
            className="mute-button rounded-circle border-0 d-flex justify-content-center align-items-center bg-white shadow-sm"
            style={{
              width: "30px",
              height: "30px",
              color: "#0d6efd", // Blue color for both icons
            }}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <svg
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Component Styles */}
      <style jsx>{`
        .video-container {
          height: 100vh;
          background-color: #000;
        }

        .volume-slider {
          -webkit-appearance: none;
          width: 80px;
          height: 4px;
          background: #ddd;
          border-radius: 2px;
          outline: none;
        }

        .volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          background: blue;
          border-radius: 50%;
          cursor: pointer;
        }

        .transition-opacity {
          transition: opacity 0.3s ease;
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

          .volume-slider {
            width: 60px;
          }

          .play-pause-button,
          .mute-button {
            width: 30px !important;
            height: 30px !important;
          }

          .play-pause-button svg,
          .mute-button svg {
            width: 20px !important;
            height: 20px !important;
          }

          .transition-opacity {
            opacity: 1 !important; /* Always show controls on small screens */
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
