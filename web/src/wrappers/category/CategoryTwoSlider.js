import PropTypes from "prop-types";
import clsx from "clsx";
import { useEffect, useState } from "react";
import axios from "axios";
import Swiper, { SwiperSlide } from "../../components/swiper";
import CategoryTwoSingle from "../../components/category/CategoryTwoSingle";
import SectionTitleFour from "../../components/section-title/SectionTitleFour";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const settings = {
  loop: false,
  spaceBetween: 30,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  }, 
  breakpoints: {
    320: { slidesPerView: 1 },
    576: { slidesPerView: 3 },
    992: { slidesPerView: 4 },
  }
};

const CategoryTwoSlider = ({ spaceTopClass, spaceBottomClass }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/images`)
      .then((response) => {
        console.log("✅ API Response:", response.data);
        setCategories(response.data.images);
      })
      .catch((error) => {
        console.error("❌ Error fetching categories:", error);
      });
  }, []);

  return (
    <div className={clsx("collections-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        {/* Section Title */}
        <SectionTitleFour titleText="Collections" spaceBottomClass="mb-40" />
        <div className="collection-wrap">
          <div className="collection-active">
            {categories.length >= 5 ? (
              <Swiper options={settings}>
                {categories.slice(24, 29).map((single, key) => (
                  <SwiperSlide key={key}>
                    <CategoryTwoSingle data={single} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p>No categories available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

CategoryTwoSlider.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default CategoryTwoSlider;
