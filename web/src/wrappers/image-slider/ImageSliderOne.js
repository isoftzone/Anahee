import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import Swiper, { SwiperSlide } from "../../components/swiper";
import ImageSliderOneSingle from "../../components/image-slider/ImageSliderOneSingle";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const settings = {
  loop: true,
  speed: 1000,
  navigation: true,
  autoHeight: false,
  slidesPerView: 4,
  spaceBetween: 20, // Add gap between slides
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  grabCursor: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
};

const ImageSliderOne = ({ spaceTopClass, spaceBottomClass }) => {
  const [images, setImages] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`${BASE_URL}/videos/productsvideo.mp4`)
  //     .then((response) => {
  //       console.log("✅ API Response:", response.data);
  //       setImages(response.data.images);
  //     })
  //     .catch((error) => {
  //       console.error("❌ Error fetching image slider:", error);
  //     });
  // }, []);

  useEffect(() => {
  const files = ["video1.mp4", "video2.webm", "clip.ogg"]; // hardcoded

  const videoFiles = files.filter((file) =>
    /\.(mp4|webm|ogg|mov)$/i.test(file)
  );

  const videoURLs = videoFiles.map((filename) => ({
    images: `${BASE_URL}/videos/productsvideo.mp4`,
    link: "/",
    alt: filename,
  }));

  setImages(videoURLs);
}, []);


  return (
    <div className={`image-slider-area ${spaceTopClass} ${spaceBottomClass}`}>
      <div className="image-slider-active mx-sm-5 px-sm-5">
        <div className="text-center single-image-text flex mx-5 px-5">
          <h1 className="">Social Media Pressence</h1>
          {images.length  ? (
            <Swiper options={settings}>
              {images.map((single, key) => (
                <SwiperSlide key={key}>
                  <ImageSliderOneSingle data={single} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p>No images available</p>
          )}
        </div>
      </div>
    </div>
  );
};

ImageSliderOne.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default ImageSliderOne;
