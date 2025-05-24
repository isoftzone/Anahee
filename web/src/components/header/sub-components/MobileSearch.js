import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MobileSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      navigate("/shop-grid-standard", {
        state: { name: trimmedQuery },
      });

      const offcanvasMenu = document.querySelector("#offcanvas-mobile-menu");
      if (offcanvasMenu?.classList.contains("active")) {
        offcanvasMenu.classList.remove("active");
      }
      // Optionally, also clear the search field
      setSearchQuery("");
    } else {
      alert("Please enter a valid search term.");
    }
  };
  return (
    <div className="offcanvas-mobile-search-area">
      <form onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Search ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">
          <i className="fa fa-search" />
        </button>
      </form>
    </div>
  );
};

export default MobileSearch;
