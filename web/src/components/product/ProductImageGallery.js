import React, { Fragment, useRef, useState } from "react";
import PropTypes from "prop-types";
import { EffectFade, Thumbs } from "swiper";
import AnotherLightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Swiper, { SwiperSlide } from "../../components/swiper";

const ProductImageGallery = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [index, setIndex] = useState(-1);
  const slides = product?.image.map((img, i) => ({
    src: process.env.REACT_APP_PUBLIC_URL + img,
    key: i,
  }));

  // swiper slider settings
  const gallerySwiperParams = {
    spaceBetween: 10,
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    thumbs: { swiper: thumbsSwiper },
    modules: [EffectFade, Thumbs],
  };

  const thumbnailSwiperParams = {
    onSwiper: setThumbsSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: true,
  };
  const [isHovering, setIsHovering] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
  
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
  
    const lensWidth = 150;
    const lensHeight = 150;
  
    let lensX = x;
    let lensY = y;
  
    if (x < lensWidth / 2) lensX = lensWidth / 2;
    if (x > width - lensWidth / 2) lensX = width - lensWidth / 2;
    if (y < lensHeight / 2) lensY = lensHeight / 2;
    if (y > height - lensHeight / 2) lensY = height - lensHeight / 2;
  
    setLensPosition({ x: lensX, y: lensY });
  
    const bgX = (x / width) * 100;
    const bgY = (y / height) * 100;
    setBackgroundPosition(`${bgX}% ${bgY}%`);
  };
  
  return (
    <Fragment>
      <div className="product-large-image-wrapper">
        {product.discount || product.new ? (
          <div className="product-img-badges">
            {product.discount ? (
              <span className="pink">-{product.discount}%</span>
            ) : (
              ""
            )}
            {product.new ? <span className="purple">New</span> : ""}
          </div>
        ) : (
          ""
        )}
        {/* {product?.image?.length ? (
          <Swiper options={gallerySwiperParams}>
            {product.image.map((single, key) => (
              <SwiperSlide key={key}>
                <button className="lightgallery-button" onClick={() => setIndex(key)}>
                  <i className="pe-7s-expand1"></i>
                </button>
                <div className="single-image">
                  <img
                    src={process.env.PUBLIC_URL + single}
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </SwiperSlide>
            ))}
            <AnotherLightbox
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                slides={slides}
                plugins={[Thumbnails, Zoom, Fullscreen]}
            />
          </Swiper>
        ) : null} */}

        {product?.image?.length ? (
          <Swiper options={gallerySwiperParams}>
            {product.image.map((single, key) => (
              <SwiperSlide key={key}>
                <button
                  className="lightgallery-button"
                  onClick={() => setIndex(key)}
                >
                  <i className="pe-7s-expand1"></i>
                </button>
                <div className="image-container">
                  <div
                    className="single-image"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <img
                      ref={imgRef}
                      src={process.env.REACT_APP_PUBLIC_URL + single}
                      className="img-fluid"
                      alt=""
                    />
                    {isHovering && (
                      <div
                        className="magnifying-lens"
                        style={{
                          left: `${lensPosition.x}px`,
                          top: `${lensPosition.y}px`,
                          backgroundImage: `url(${
                            process.env.REACT_APP_PUBLIC_URL + single
                          })`,
                          backgroundPosition: backgroundPosition,
                          backgroundSize: `${imgRef.current?.width * 2}px ${imgRef.current?.height * 2}px`,
                        }}
                      />
                    )}
                  </div>

                  {isHovering && (
                    <div className="zoomed-preview">
                      <div
                        className="zoomed-image"
                        style={{
                          backgroundImage: `url(${
                            process.env.REACT_APP_PUBLIC_URL + single
                          })`,
                          backgroundPosition: backgroundPosition,
                          backgroundSize: `${imgRef.current?.width * 2}px ${
                            imgRef.current?.height * 2
                          }px`,
                        }}
                      />
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
            <AnotherLightbox
              open={index >= 0}
              index={index}
              close={() => setIndex(-1)}
              slides={slides}
              plugins={[Thumbnails, Zoom, Fullscreen]}
            />
          </Swiper>
        ) : null}
      </div>
      <div className="product-small-image-wrapper mt-15">
        {product?.image?.length ? (
          <Swiper options={thumbnailSwiperParams}>
            {product.image.map((single, key) => (
              <SwiperSlide key={key}>
                <div className="single-image">
                  <img
                    src={process.env.REACT_APP_PUBLIC_URL + single}
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
      </div>
    </Fragment>
  );
};

ProductImageGallery.propTypes = {
  product: PropTypes.shape({}),
};

export default ProductImageGallery;
