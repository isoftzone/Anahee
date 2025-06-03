import PropTypes from "prop-types";
import React, { useEffect, useState, useRef } from "react";
import Swiper, { SwiperSlide } from "../../components/swiper";
import VideoWithCustomPlayButton from "./VideoWithCustomPlayButton";
import { Pagination } from "swiper";

const ImageSliderOne = ({ spaceTopClass, spaceBottomClass }) => {
  const [videos, setVideos] = useState([]);
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const videoRefs = useRef([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    const files = [
      "videoplayback.mp4",
      "Fashion_Film.mp4",
      "Icona-Pop.mp4",
      "productsvideo.mp4",
      "productsvideo2.mp4",
      "Making-FASHION.mp4",
    ];
    const videoData = files.map((filename) => ({
      src: `/assets/img/team/${filename}`,
      type: `video/${filename.split(".").pop()}`,
      alt: filename,
    }));
    setVideos(videoData);
  }, []);

const handlePlayPause = async (index) => {
    const currentVideo = videoRefs.current[index];
    if (!currentVideo) return;

    // Pause previously playing video
    if (activeVideoIndex !== null && activeVideoIndex !== index) {
      videoRefs.current[activeVideoIndex]?.pause();
    }

    if (activeVideoIndex === index) {
      currentVideo.pause();
      setActiveVideoIndex(null);
    } else {
      currentVideo.volume = volume;
      await currentVideo.play();
      setActiveVideoIndex(index);
    }
  };

  const handleSlideChange = () => {
    if (activeVideoIndex !== null) {
      videoRefs.current[activeVideoIndex]?.pause();
      setActiveVideoIndex(null);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    videoRefs.current.forEach((video) => {
      if (video) {
        video.volume = newVolume;
        video.muted = newVolume === 0;
      }
    });
  };

  const toggleMute = () => {
    handleVolumeChange(volume === 0 ? 0.5 : 0);
  };


  return (
    <div className={`image-slider-area ${spaceTopClass || ""} ${spaceBottomClass || ""}`}>
      <div className="image-slider-active mx-sm-5 px-sm-5" style={{paddingBottom:"10px"}}>
        <div className="text-center single-image-text flex">
          <h1 className="social-media">Social Media Presence</h1>
          {/* <button
            onClick={toggleMute}
            className="mute-button"
            style={{
              position: "absolute",
              right: "20px",
              top: "20px",
              zIndex: 10,
              background: "#fff",
              padding: "8px 12px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {volume === 0 ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="red">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                </svg>
                Unmute
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="green">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
                Mute
              </>
            )}
          </button> */}

          {videos.length ? (
            <Swiper
              options={{
                loop: false,
                speed: 1000,
                navigation: false,
                pagination: true,
                autoHeight: false,
                slidesPerView: 4,
                spaceBetween: 20,
                autoplay: false,
                breakpoints: {
                  320: { slidesPerView: 1, spaceBetween: 10 },
                  640: { slidesPerView: 2, spaceBetween: 15 },
                  768: { slidesPerView: 3, spaceBetween: 20 },
                  1024: { slidesPerView: 4, spaceBetween: 20 },
                },
              }}
              ref={swiperRef}
              onSlideChange={handleSlideChange}
            >
              {videos.map((video, index) => (
                <SwiperSlide key={index}>
                  <div className="video-slide">
                    <VideoWithCustomPlayButton
                      src={video.src}
                      type={video.type}
                      isPlaying={activeVideoIndex === index}
                      onPlayPause={() => handlePlayPause(index)}
                      ref={(el) => (videoRefs.current[index] = el)}
                      volume={volume}
                      onVolumeChange={handleVolumeChange}
                      setVideoElement={(el) => (videoRefs.current[index] = el)}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : null}
        </div>
      </div>
    </div>
  );
};

ImageSliderOne.propTypes = {
  spaceTopClass: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ImageSliderOne;
