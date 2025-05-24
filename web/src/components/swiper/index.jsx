import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import cn from "clsx";
import { Navigation, Pagination, Autoplay, A11y } from "swiper";
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from "swiper/react";

const SwiperSlider = forwardRef(
  ({ options, prevIcon, nextIcon, children, className, navClass }, ref) => {
    const modules = options?.modules !== undefined ? options.modules : [];
    const prevClass = `prev-${navClass || "swiper-nav"}`;
    const nextClass = `next-${navClass || "swiper-nav"}`;
    const sliderOptions = {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: false,
      autoplay: options?.autoplay
        ? {
            delay: 2500,
            disableOnInteraction: false,
          }
        : false,
      watchSlidesProgress: true,
      autoHeight: true,
      breakpoints: {},
      ...options,
      modules: [Navigation, Pagination, A11y, Autoplay, ...modules],
      navigation: options?.navigation
        ? {
            prevEl: `.${prevClass}`,
            nextEl: `.${nextClass}`,
          }
        : false,
      pagination: options?.pagination
        ? {
            clickable: true,
          }
        : false,
    };

    return (
      <div className={cn("swiper-wrap", className)} ref={ref}>
        <Swiper {...sliderOptions}>{children}</Swiper>

        {sliderOptions?.navigation && (
          <div className="swiper-navigation-container">
            <button
              type="button"
              className={`bg-black d-flex justify-center items-center opacity-50 swiper-button-prev ht-swiper-button-nav ${prevClass}  text-white-800 font-bold pyb-1 rounded focus:outline-none focus:shadow-outline`}
            >
              {prevIcon}
            </button>
            <button
              type="button"
              className={`bg-black d-flex justify-center items-center opacity-50 swiper-button-next ht-swiper-button-nav ${nextClass}   text-white-800 font-bold pyb-1 rounded focus:outline-none focus:shadow-outline`}
            >
              {nextIcon}
            </button>
          </div>
        )}

        <style jsx>
          {`
            .swiper-navigation-container {
              position: absolute;
              top: 50%;
              left: 0;
              right: 0;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0 15px; /* Adjust padding as needed */
              transform: translateY(-50%);
              z-index: 10; /* Ensure buttons are above the slides */
            }

            .swiper-button-prev,
            .swiper-button-next {
              position: static !important; /* Override Swiper's absolute positioning */
              transform: none !important; /* Override Swiper's transform */
              /* Tailwind classes will handle most of the styling */
              cursor: pointer;
              border: none;
              outline: none;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .arrow-icon {
              /* Add styling for your arrow icons if needed */
              width: 20px;
              height: 20px;
            }
          `}
        </style>
      </div>
    );
  }
);

export { SwiperSlide };

SwiperSlider.propTypes = {
  options: PropTypes.shape({}),
  prevIcon: PropTypes.node, // Accept React elements or strings
  nextIcon: PropTypes.node, // Accept React elements or strings
  children: PropTypes.node,
  className: PropTypes.string,
  navClass: PropTypes.string,
};

SwiperSlider.defaultProps = {
  prevIcon: (
    <img
      src="/assets/img/icon-img/leftarrow.png"
      alt="Previous"
      className="arrow-icon"
    />
  ),
  nextIcon: (
    <img
      src="/assets/img/icon-img/rightarrow.png"
      alt="Next"
      className="arrow-icon"
    />
  ),
  navStyle: 1,
  dotStyle: 1,
};

export default SwiperSlider;