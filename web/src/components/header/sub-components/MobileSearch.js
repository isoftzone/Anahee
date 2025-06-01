import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
// const BASE_URL = "http://localhost:5000"; // Replace with your actual backend base URL
import { BASE_URL } from "../../../config";
const MobileSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { products } = useSelector((state) => state.product);
  const navigate = useNavigate();
  useEffect(() => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery === "") {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }
    const results = products
      .filter(product =>
        product.name.toLowerCase().includes(trimmedQuery.toLowerCase())
      )
      .slice(0, 5);
    setSearchResults(results);
    setShowSearchResults(results.length > 0);
  }, [searchQuery, products]);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSearchApply = () => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery !== "") {
      navigate('/shop-grid-standard', {
        state: { name: trimmedQuery }
      });
      setShowSearchResults(false);
    }
  };
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
    navigate('/shop-grid-standard');
  };
  return (
    <div className="offcanvas-mobile-search-area">
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Search here..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ paddingRight: '60px' }}
        />
        <div style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          gap: '5px',
          alignItems: 'center'
        }}>
          {searchQuery ? (
  <button
    onClick={clearSearch}
    style={{
      background: 'none',
      border: 'none',
      cursor: 'pointer'
    }}
    title="Clear"
  >
    <i className="fa fa-times" style={{ color: '#999' }} />
  </button>
) : (
  <button
    onClick={handleSearchApply}
    style={{
      background: 'none',
      border: 'none',
      cursor: 'pointer'
    }}
    title="Search"
  >
    <i className="fa fa-search" style={{ color: '#000' }} />
  </button>
)}
        </div>
        {showSearchResults && (
          <div
            className="search-results-dropdown"
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              background: "#fff",
              border: "1px solid #ddd",
              zIndex: 10,
              maxHeight: "250px",
              overflowY: "auto"
            }}
          >
            {searchResults.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="search-result-item"
                onClick={() => {
                  setSearchQuery("");
                  setShowSearchResults(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px",
                  borderBottom: "1px solid #eee",
                  textDecoration: "none",
                  color: "#000",
                }}
              >
                <div
                        className="search-result-image"
                        style={{ width: "50px", height: "50px", flexShrink: 0 }}
                      >
                        <img
                          src={
                                        product.image?.[0]
                                          ? `${BASE_URL}/${product.image[0]}`
                                          : "/assets/img/default.jpg"
                                      }
                          // alt={product.name}
                          style={{ width: "50px", height: "50px" }}
                          className="object-cover rounded"
                        />
                      </div>
                <div className="search-result-details" style={{ flex: 1 }}>
                  <h6 style={{ margin: 0, fontSize: "14px", fontWeight: "bold" }}>
                    {product.name}
                  </h6>
                  <span style={{ fontSize: "12px", color: "#666" }}>
                    {product.category || "Uncategorized"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default MobileSearch;
