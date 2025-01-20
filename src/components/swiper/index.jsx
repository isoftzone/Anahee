import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import cn from "clsx";
import { Navigation, Pagination, Autoplay, A11y } from "swiper";
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from "swiper/react";

const SwiperSlider = forwardRef(
    (
        {
            options,
            prevIcon,
            nextIcon,
            children,
            className,
            navClass,
        },
        ref
    ) => {
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
            <div
        className={cn("swiper-wrap", className)}
        ref={ref}
    >
        <Swiper {...sliderOptions}>{children}</Swiper>

        {sliderOptions?.navigation && (
            <>
                <button
                    type="button"
                    className={`swiper-button-prev ht-swiper-button-nav ${prevClass}`}
                >
                    <input
                        type="radio"
                        name="swiper-navigation"
                        className="prev-radio"
                        onChange={() => console.log("Previous button clicked")}
                        checked={false} // Adjust logic as needed
                    />
                </button>
                <button
                    type="button"
                    className={`swiper-button-next ht-swiper-button-nav ${nextClass}`}
                >
                    <input
                        type="radio"
                        name="swiper-navigation"
                        className="next-radio"
                        onChange={() => console.log("Next button clicked")}
                        checked={false} // Adjust logic as needed
                    />
                </button>
            </>
        )}
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
        <input
            type="radio"
            name="swiper-navigation"
            className="prev-radio"
        />
    ),
    nextIcon: (
        <input
            type="radio"
            name="swiper-navigation"
            className="next-radio"
        />
    ),
    navStyle: 1,
    dotStyle: 1,
};

export default SwiperSlider;
