import React, { Fragment, useEffect, useState } from "react";
import SEO from "../../components/seo";
import axios from "axios";
import { BASE_URL } from "../../config";
import LayoutSeven from "../../layouts/LayoutSeven";
import LayoutOne from "../../layouts/LayoutOne";
import SectionTitleHome from "../../components/section-title/SectionTitleHome.js";
import HeroSliderFourteen from "../../wrappers/hero-slider/HeroSliderFourteen";
import HeroSliderTen from "../../wrappers/hero-slider/HeroSliderTen";
// import SectionTitleWithText from "../../components/section-title/SectionTitleWithText";
// import FeatureIconFour from "../../wrappers/feature-icon/FeatureIconFour";
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
import PromoBanner from "../../wrappers/banner/PromoBanner";
import BannerSix from "../../wrappers/banner/BannerSix";
import BannerSeven from "../../wrappers/banner/BannerSeven";
import NewProductGrid from "../../wrappers/product/NewProductGrid";
import ProductSliderThree from "../../wrappers/product/ProductSliderThree";
import BannerTwo from "../../wrappers/banner/BannerTwo";
import CategoryTwoSlider from "../../wrappers/category/CategoryTwoSlider";
import BannerTwentySix from "../../wrappers/banner/BannerTwentySix";
import BannerThirtyThree from "../../wrappers/banner/BannerThirtyThree";
import PromoBannerText from "../../wrappers/banner/PromoBannerText.js";
import ShopByCollection from "../../wrappers/banner/ShopByCollection.js";
// import Banner from "../../wrappers/banner/Banner";
import Success from "../other/Success.js";
const HomeFashionSix = () => {
  const [hometableData, setHometableData] = useState([]);
  const flag = 1;
  const value = "banner";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/get_hometable`, {
          withCredentials: true,
        });
        setHometableData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const getComponent = (name) => {
    switch (name.toLowerCase()) {
      case "banner":
        return <HeroSliderFourteen />;
      case "gridtwo":
        return (
          <BannerTwentyEight spaceTopClass="pt-100" spaceBottomClass="pb-70" />
        );
      case "promobanner":
        return <PromoBanner spaceTopClass="pt-100" spaceBottomClass="pb-70" />;
      case "promobannertext":
        return (
          <PromoBannerText spaceTopClass="pt-100" spaceBottomClass="pb-70" />
        );
      case "shopbycollection":
        return (
          <ShopByCollection spaceTopClass="pt-100" spaceBottomClass="pb-70" />
        );
      case "collection":
        return (
          <CategoryTwoSlider spaceTopClass="pt-100" spaceBottomClass="pb-95" />
        );
      case "newarrivals":
        return (
          <TabProductEight
            spaceBottomClass="pb-10"
            category="Kurta"
            sectionTitle={false}
          />
        );
      case "bestproducts":
        return (
          <TabProductTwelve
            category="kids"
            spaceTopClass="pt-95"
            sectionTitle="Best Products"
          />
        );

      case "ourproducts":
        return <ProductSliderThree category="fashion" />;
      case "sale":
        return <BannerTwo spaceTopClass="pt-80" spaceBottomClass="pb-60" />;
      case "threecoll":
        return <BannerTwentySix spaceBottomClass="pb-70" />;
      case "threegrid":
        return <BannerSix spaceTopClass="pt-100" spaceBottomClass="pb-80" />;
      case "twocoll":
        return <BannerNine spaceBottomClass="pb-70" />;
      case "fashionshoptwocoll":
        return <BannerEleven />;
      case "fullwidth":
        return (
          <TabProductFive
            spaceTopClass="pt-95"
            spaceBottomClass="pb-70"
            category="cosmetics"
          />
        );
      case "threecollonerow":
        return <BannerFifteen spaceTopClass="pt-10" spaceBottomClass="pb-85" />;
      case "categories":
        return <BannerSeven spaceTopClass="pt-95" spaceBottomClass="pb-70" />;
      case "newarrivalfullwidth":
        return <NewProductGrid category="accessories" limit={10} />;
      case "subscribe":
        return <NewsletterTwo spaceBottomClass="pb-0" />;
      case "twocoallonerow":
        return <BannerSixteen spaceTopClass="pt-95" />;
      case "wearsection":
        return (
          <BannerThirtyThree
            spaceBottomClass="pb-70"
            bgColorClass="bg-black-2"
          />
        );
      case "imageslider":
        return (
          <ImageSliderOne spaceTopClass="pt-40" spaceBottomClass="pb-85" />
        );
      case "video":
        return <HeroSliderTen spaceTopClass="pt-40" spaceBottomClass="pb-85" />;
      case "welcome":
        return (
          <SectionTitleHome spaceTopClass="pt-0" spaceBottomClass="pb-90" />
        );
      case "success":
        return <Success spaceTopClass="pt-0" spaceBottomClass="pb-90" />;
      default:
        return null; // No matching component
    }
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Fashion Home"
        description="Fashion home of Anhaee."
      />
      <LayoutOne>
        {hometableData.map((item, index) => (
          <Fragment key={index}>
            {item.flag === 1 && getComponent(item.name)}
          </Fragment>
        ))}
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashionSix;
