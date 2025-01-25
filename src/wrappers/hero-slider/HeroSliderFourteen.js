import { EffectFade } from "swiper";
import Swiper, { SwiperSlide } from "../../components/swiper";
import heroSliderData from "../../data/hero-sliders/hero-slider-fourteen.json";
import HeroSliderFourteenSingle from "../../components/hero-slider/HeroSliderFourteenSingle.js";
import { Link } from "react-router-dom";
import SectionTitleWithText from "../../components/section-title/SectionTitleWithText";

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
};

const HeroSliderFourteen = () => {
  return (
    <>
      <div className="slider-area">
        <div className="slider-active-2 nav-style-3">
          <Swiper options={params} className="overflow-hidden">
            {heroSliderData?.map((single, key) => (
              <SwiperSlide key={key}>
                <HeroSliderFourteenSingle data={single} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="main-content-wrapper">
        <div className="banner-area">
          <div className="container-fluid p-0">
            <div className="row g-0">
              <div className="col-md-6">
                <div className="banner-box">
                  <div className="banner-inner banner-hover-2 banner-info-over-img banner-info-center">
                    <figure className="banner-image">
                      <img src="assets/img/banner/banner-67.jpg" alt="Banner" />
                    </figure>
                    <div className="banner-info">
                      <div className="banner-info--inner text-center">
                        <h2 className="heading__primary color--white mb--20">
                          <span className="heading__primary--sub">
                            Perfect Collection
                          </span>
                          <span className="heading__primary--main">
                            For Women
                          </span>
                        </h2>
                        <Link
                          // href="shop.html"
                          // to={process.env.PUBLIC_URL + data.url}
                          to={"/shop-grid-standard"}
                          className="btn btn-no-bg btn-color-white"
                        >
                          Shop Now <i className="fa fa-angle-double-right"></i>
                        </Link>
                      </div>
                    </div>
                    <Link href="shop.html" className="banner-link"></Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="banner-box">
                  <div className="banner-inner banner-hover-2 banner-info-over-img banner-info-center">
                    <figure className="banner-image">
                      <img src="assets/img/banner/banner-66.jpg" alt="Banner" />
                    </figure>
                    <div className="banner-info">
                      <div className="banner-info--inner text-center">
                        <h2 className="heading__primary color--white mb--20">
                          <span className="heading__primary--sub">
                            Perfect Accesories
                          </span>
                          <span className="heading__primary--main">
                            For Women
                          </span>
                        </h2>
                        <Link
                          // href="shop.html"
                          to={"/shop-grid-standard"}
                          className="btn btn-no-bg btn-color-white"
                        >
                          Shop Now <i className="fa fa-angle-double-right"></i>
                        </Link>
                      </div>
                    </div>
                    <Link href="shop.html" className="banner-link"></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SectionTitleWithText spaceTopClass="pt-95" spaceBottomClass="pb-90" />

        {/* <div
           class="full-width-banner-area parallax-window"
           data-parallax="scroll"
           data-image-src="assets/img/banner/banner-68.jpg"
        ></div> */}

        <div className="banner-area">
          <div className="container-fluid p-0">
            <div className="row g-0">
              <div className="col-md-6">
                <div className="banner-box">
                  <div className="banner-inner banner-hover-2 banner-info-over-img banner-info-center">
                    <figure className="banner-image">
                      <img src="assets/img/banner/banner-70.jpg" alt="Banner" />
                    </figure>
                    <div className="banner-info">
                      <div className="banner-info--inner text-center">
                        <h2 className="heading__primary color--white mb--20">
                          <span className="heading__primary--sub">
                            Orange Balzer
                          </span>
                          <span className="heading__primary--main">
                            Winter Shop
                          </span>
                        </h2>
                        <Link
                          // href="shop.html"
                          to={"/shop-grid-standard"}
                          className="btn btn-no-bg btn-color-white"
                        >
                          Shop Now <i className="fa fa-angle-double-right"></i>
                        </Link>
                      </div>
                    </div>
                    <Link href="shop.html" className="banner-link"></Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="banner-box">
                  <div className="banner-inner banner-hover-2 banner-info-over-img banner-info-center">
                    <figure className="banner-image">
                      <img src="assets/img/banner/banner-69.jpg" alt="Banner" />
                    </figure>
                    <div className="banner-info">
                      <div className="banner-info--inner text-center">
                        <h2 className="heading__primary color--white mb--20">
                          <span className="heading__primary--sub">
                            Perfect Accesories
                          </span>
                          <span className="heading__primary--main">
                            For Men
                          </span>
                        </h2>
                        <Link
                          // href="shop.html"
                          to={"/shop-grid-standard"}
                          className="btn btn-no-bg btn-color-white"
                        >
                          Shop Now <i className="fa fa-angle-double-right"></i>
                        </Link>
                      </div>
                    </div>
                    <Link href="shop.html" className="banner-link"></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSliderFourteen;
