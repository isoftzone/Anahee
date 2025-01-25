import React, { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutSeven from "../../layouts/LayoutSeven";
import HeroSliderFourteen from "../../wrappers/hero-slider/HeroSliderFourteen";
import HeroSliderTen from "../../wrappers/hero-slider/HeroSliderTen";
// import SectionTitleWithText from "../../components/section-title/SectionTitleWithText";
import FeatureIconFour from "../../wrappers/feature-icon/FeatureIconFour";
import TabProductEight from "../../wrappers/product/TabProductEight";
import NewsletterTwo from "../../wrappers/newsletter/NewsletterTwo";
import ImageSliderOne from "../../wrappers/image-slider/ImageSliderOne";
import TabProductTwelve from "../../wrappers/product/TabProductTwelve";
import BannerNine from "../../wrappers/banner/BannerNine";
import TabProductFive from "../../wrappers/product/TabProductFive";
import BannerFifteen from "../../wrappers/banner/BannerFifteen";
import BannerSixteen from "../../wrappers/banner/BannerSixteen";
import BannerEleven from "../../wrappers/banner/BannerEleven";
// import ProductGridFiveContainer from "../../wrappers/product/ProductGridFiveContainer";
import BannerTwentyEight from "../../wrappers/banner/BannerTwentyEight";
import BannerSix from "../../wrappers/banner/BannerSix";
import BannerSeven from "../../wrappers/banner/BannerSeven";
import NewProductGrid from "../../wrappers/product/NewProductGrid";
import ProductSliderThree from "../../wrappers/product/ProductSliderThree";
import BannerTwo from "../../wrappers/banner/BannerTwo";
import CategoryTwoSlider from "../../wrappers/category/CategoryTwoSlider";
import BannerTwentySix from "../../wrappers/banner/BannerTwentySix";
import BannerThirtyThree from "../../wrappers/banner/BannerThirtyThree";

const HomeFashionSix = () => {
  return (
    <Fragment>
      <SEO
        titleTemplate="Fashion Home"
        description="Fashion home of flone react minimalist eCommerce template."
      />
      <LayoutSeven>
        {/* hero slider */}
        <HeroSliderFourteen />
        {/* section title */}
        {/* <SectionTitleWithText spaceTopClass="pt-95" spaceBottomClass="pb-90" /> */}
        <HeroSliderTen />
        {/* tab product */}
        <BannerTwentyEight spaceTopClass="pt-100" spaceBottomClass="pb-70" />
      <CategoryTwoSlider spaceTopClass="pt-100" spaceBottomClass="pb-95" />

        <TabProductEight
          spaceBottomClass="pb-70"
          category="fashion"
          sectionTitle={false}
        />
        {/* feature icon */}
        <FeatureIconFour
          bgImg="/assets/img/bg/shape.png"
          containerClass="container-fluid"
          gutterClass="padding-10-row-col"
          spaceTopClass="pt-50"
          spaceBottomClass="pb-40"
        />

        <TabProductTwelve
          category="kids"
          spaceTopClass="pt-95"
          sectionTitle="Best Products"
        />
                <ProductSliderThree category="fashion" />
                <BannerTwo spaceTopClass="pt-80" spaceBottomClass="pb-60" />
        
        <BannerTwentySix spaceBottomClass="pb-70" />

        <BannerSix spaceTopClass="pt-100" spaceBottomClass="pb-80" />

        <BannerNine spaceBottomClass="pb-70" />
        <BannerEleven />
        <TabProductFive
          spaceTopClass="pt-95"
          spaceBottomClass="pb-70"
          category="cosmetics"
        />
        <BannerFifteen spaceTopClass="pt-10" spaceBottomClass="pb-85" />
        <BannerSeven spaceTopClass="pt-95" spaceBottomClass="pb-70" />
        <NewProductGrid category="accessories" limit={10} />

        {/* newsletter */}
        <NewsletterTwo spaceBottomClass="pb-100" />
        {/* <ProductGridFiveContainer
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          category="accessories"
        /> */}
        <BannerSixteen spaceTopClass="pt-95" />
        <BannerThirtyThree spaceBottomClass="pb-70" bgColorClass="bg-black-2" />

        {/* image slider */}
        <ImageSliderOne />
      </LayoutSeven>
    </Fragment>
  );
};

export default HomeFashionSix;
