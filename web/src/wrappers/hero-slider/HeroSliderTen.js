import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import { EffectFade } from "swiper";
import Swiper, { SwiperSlide } from "../../components/swiper";
import HeroSliderTenSingle from "../../components/hero-slider/HeroSliderTenSingle";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const params = {
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  modules: [EffectFade],
  loop: true,
  speed: 1000,
  navigation: true,
  autoHeight: false,
  autoplay: false,
};

const HeroSliderTen = ({ spaceTopClass, spaceBottomClass }) => {
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/images`)
      .then((response) => {
        console.log("✅ API Response:", response.data);
        setSliders(response.data.images);
      })
      .catch((error) => {
        console.error("❌ Error fetching sliders:", error);
      });
  }, []);

  return (
    <div className={`slider-area ${spaceTopClass} ${spaceBottomClass}`}>
      <div className="slider-active nav-style-1">
        {sliders.length >= 3 ? (
          <Swiper options={params}>
            {sliders.slice(29, 31).map((single, key) => (
              <SwiperSlide key={key}>
                <HeroSliderTenSingle data={single} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>No sliders available</p>
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
