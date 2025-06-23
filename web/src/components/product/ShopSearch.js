import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ShopSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const handleSearch = (e) => {
  const trimmedQuery = e.target.value.trim();
  if (trimmedQuery === "") {
    navigate('/shop-grid-standard'); // no state passed, shows all products
  } else {
    navigate('/shop-grid-standard', {
      state: { name: trimmedQuery }
    });
  }
};
   return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Search </h4>
      <div className="pro-sidebar-search my-4">
        <div className="pro-sidebar-search-form">
          <input type="text"
          placeholder="Search here..."
          onChange={(e) => handleSearch(e)}
         />
          <button type="submit">
            <i className="pe-7s-search" />
          </button>
        </div>
      </div>
    </div>
   )
};
export default ShopSearch;