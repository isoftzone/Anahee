import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import Swiper, { SwiperSlide } from "../../components/swiper";
import ImageSliderOneSingle from "../../components/image-slider/ImageSliderOneSingle";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const settings = {
  loop: false,
  grabCursor: true,
  breakpoints: {
    320: {
      slidesPerView: 2,
    },
    640: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 5,
    },
  },
};

const ImageSliderOne = ({ spaceTopClass, spaceBottomClass }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/images`)
      .then((response) => {
        console.log("✅ API Response:", response.data);
        setImages(response.data.images);
      })
      .catch((error) => {
        console.error("❌ Error fetching image slider:", error);
      });
  }, []);

  return (
    <div className={`image-slider-area ${spaceTopClass} ${spaceBottomClass}`}>
      <div className="image-slider-active">
        {images.length >= 5 ? (
          <Swiper options={settings}>
            {images.slice(31, 36).map((single, key) => (
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
  );
};

ImageSliderOne.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default ImageSliderOne;
