import PropTypes from "prop-types";
import clsx from "clsx";
import ProductgridList from "./ProductgridList";

import { useLocation } from "react-router-dom";
const ShopProducts = ({ products, layout }) => {
  
const location = useLocation();
  const searchState = location.state;

  console.log("this is state", searchState)
  if (searchState?.name) {
     const query = searchState.name.toLowerCase();
    products = products.filter(product => product.name.toLowerCase().includes(query));
  }

  return (
    <div className="shop-bottom-area mt-35">
      <div className={clsx("row", layout)}>
        <ProductgridList products={products} spaceBottomClass="mb-25" />
      </div>
    </div>
  );
};

ShopProducts.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array
};

export default ShopProducts;
