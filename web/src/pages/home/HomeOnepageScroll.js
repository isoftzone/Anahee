import { Fragment } from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import sliderData from "../../data/hero-sliders/scroll-slider.json";
import FeatureIconFour from "../../wrappers/feature-icon/FeatureIconFour";
import { SectionsContainer, Section, Header } from "react-fullpage";
import HeaderOne from "../../wrappers/header/HeaderOne";

const HomeOnepageScroll = () => {
  const anchors = [];
  sliderData.forEach(element => {
    anchors.push(element.id);
  });
  const options = {
    activeClass: "active", // the class that is appended to the sections links
    anchors: anchors, // the anchors for each sections
    arrowNavigation: false, // use arrow keys
    className: "SectionsContainer", // the class name for the section container
    delay: 1000, // the scroll animation speed
    navigation: true, // use dots navigatio
    scrollBar: false, // use the browser default scrollbar
    sectionClassName: "Section", // the section class name
    sectionPaddingTop: "0", // the section top padding
    sectionPaddingBottom: "0", // the section bottom padding
    verticalAlign: true // align the content of each section vertical
  };
  return (
    <Fragment>
      <SEO
        titleTemplate="Fashion Home"
        description="Fashion home of flone react minimalist eCommerce template."
      />
      <div className="fullpage-slider-wrapper">
        <Header>
          <HeaderOne
            layout="container-fluid"
            headerPaddingClass="header-padding-1"
            headerBgClass="bg-white"
          />
        </Header>
        {/* <SectionsContainer {...options} className="bg-purple-2">
          {sliderData &&
            sliderData.map((single, key) => {
              return (
                <Section key={key}>
                  <div className="slider-section flone-fp-section">
                    <div className="container">
                      <div className="row fullpage-slider-wrap-mrg">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-center">
                          <div className="slider-content-11 slider-animated-1 fullpage-slider-mrg fullpage-content">
                            <h3 className="animated">{single.title}</h3>
                            <h1
                              className="animated"
                              dangerouslySetInnerHTML={{
                                __html: single.subtitle
                              }}
                            />
                            <div className="slider-btn-11 btn-hover">
                              <Link
                                className="animated"
                                to={process.env.PUBLIC_URL + single.url}
                              >
                                SHOP NOW
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="slider12-img-1 slider-animated-1">
                            <img
                              className="animated"
                              alt=""
                              src={process.env.PUBLIC_URL + single.image}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Section>
              );
            })}
        </SectionsContainer> */}

<SectionsContainer {...options} className="bg-purple-2">
  {sliderData &&
    sliderData.map((single, key) => {
      return (
        <Section key={key}>
          <div className="slider-section flone-fp-section">
            <div className="full-size-image-slider" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + single.image})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="slider-content-11 slider-animated-1 fullpage-content" style={{ textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '10px' }}>
                <h3 className="animated" style={{ color: '#fff' }}>{single.title}</h3>
                <h1
                  className="animated"
                  style={{ color: '#fff' }}
                  dangerouslySetInnerHTML={{
                    __html: single.subtitle
                  }}
                />
                <div className="slider-btn-11 btn-hover">
                  <Link
                    className="animated"
                    to={process.env.PUBLIC_URL + single.url}
                    style={{ color: '#fff', border: '2px solid #fff', padding: '10px 20px', borderRadius: '5px' }}
                  >
                    SHOP NOW
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Section>
      );
    })}

<LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-2"
        headerTop="visible"
      >
        {/* hero slider */}
        {/* <HeroSliderFifteen /> */}
        {/* tab product */}
        {/* <TabProductNine
          category="fashion"
          spaceBottomClass="pb-100"
          spaceTopClass="pt-100"
        /> */}
        {/* banner */}
        {/* <BannerEleven /> */}
        {/* countdown */}
        {/* <CountDownThree
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          dateTime="November 13, 2023 12:12:00"
          countDownImage="/assets/img/banner/deal-2.png"
        /> */}
        {/* feature icon */}
        <FeatureIconFour
          bgImg="/assets/img/bg/shape.png"
          containerClass="container-fluid"
          gutterClass="padding-10-row-col"
          spaceTopClass="pt-50"
          spaceBottomClass="pb-40"
        />
        {/* newsletter */}
        {/* <NewsletterThree
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          subscribeBtnClass="dark-red-subscribe"
        /> */}
      </LayoutOne>
</SectionsContainer>
<LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-2"
        headerTop="visible"
      >
        {/* hero slider */}
        {/* <HeroSliderFifteen /> */}
        {/* tab product */}
        {/* <TabProductNine
          category="fashion"
          spaceBottomClass="pb-100"
          spaceTopClass="pt-100"
        /> */}
        {/* banner */}
        {/* <BannerEleven /> */}
        {/* countdown */}
        {/* <CountDownThree
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          dateTime="November 13, 2023 12:12:00"
          countDownImage="/assets/img/banner/deal-2.png"
        /> */}
        {/* feature icon */}
        <FeatureIconFour
          bgImg="/assets/img/bg/shape.png"
          containerClass="container-fluid"
          gutterClass="padding-10-row-col"
          spaceTopClass="pt-50"
          spaceBottomClass="pb-40"
        />
        {/* newsletter */}
        {/* <NewsletterThree
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          subscribeBtnClass="dark-red-subscribe"
        /> */}
      </LayoutOne>
      </div>
    </Fragment>
  );
};

export default HomeOnepageScroll;
