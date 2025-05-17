import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProducts } from "../../helpers/product";
import ProductGridSingle from "../../components/product/ProductGridSingle";

import SwiperCore, { Navigation } from "swiper";
import Swiper, { SwiperSlide } from "../../components/swiper";

// import "./ProductSlider.css"; // Import CSS for button styles

SwiperCore.use([Navigation]);

const ProductGrid = ({ spaceBottomClass, category, type, limit }) => {
  const { products } = useSelector((state) => state.product);
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const filteredProducts = getProducts(products, category, type, limit);

  const swiperParams = {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 4,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      576: { slidesPerView: 2 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 3 },
      1200: { slidesPerView: 4 }
    }
  };

  return (
    <div className={`product-slider-area ${spaceBottomClass || ""}`}>
      <div style={{ position: "relative" }}>
        <Swiper options={swiperParams}>
          {filteredProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductGridSingle
                spaceBottomClass={spaceBottomClass}
                product={product}
                currency={currency}
                cartItem={cartItems.find((item) => item.id === product.id)}
                wishlistItem={wishlistItems.find((item) => item.id === product.id)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  );
};

ProductGrid.propTypes = {
  spaceBottomClass: PropTypes.string,
  category: PropTypes.string,
  type: PropTypes.string,
  limit: PropTypes.number
};

export default ProductGrid;
