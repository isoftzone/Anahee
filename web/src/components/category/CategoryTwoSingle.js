import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BASE_IMAGE_URL = process.env.REACT_APP_BASE_IMAGE_URL || "http://localhost:3000/images";

const CategoryTwoSingle = ({ data }) => {
  const imageUrl = data.images?.startsWith("http") 
    ? data.images
    : `${BASE_IMAGE_URL}/${data.images}`;

  console.log("🖼️ Final Image URL:", imageUrl); // ✅ Log the correct image URL

  return (
    <div className="collection-product">
      <div className="collection-img">
        <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
          <img 
            src={imageUrl || "https://via.placeholder.com/300"} 
            alt={data.title || "Category Image"} 
            onError={(e) => {
              console.error("❌ Image failed to load:", e.target.src);
            }}
          />
        </Link>
      </div>
      <div className="collection-content text-center">
        <span>{data?.des_l1}</span>
        <h4>
          <Link to={process.env.PUBLIC_URL +"/shop-grid-standard"}>{data.des_l2}</Link>
        </h4>
      </div>
    </div>
  );
};

CategoryTwoSingle.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    link: PropTypes.string,
  }),
};

export default CategoryTwoSingle;
