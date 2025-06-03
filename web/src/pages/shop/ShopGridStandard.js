// import { Fragment, useState, useEffect } from "react";
// import Paginator from "react-hooks-paginator";
// import { useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import { getSortedProducts } from "../../helpers/product";
// import SEO from "../../components/seo";
// import LayoutOne from "../../layouts/LayoutOne";
// import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
// import ShopSidebar from "../../wrappers/product/ShopSidebar";
// import ShopTopbar from "../../wrappers/product/ShopTopbar";
// import ShopProducts from "../../wrappers/product/ShopProducts";
// import PropTypes from "prop-types";

// const ShopGridStandard = () => {
//   const [layout, setLayout] = useState("grid three-column");
//   const [sortType, setSortType] = useState("");
//   const [sortValue, setSortValue] = useState("");
//   const [filterSortType, setFilterSortType] = useState("");
//   const [filterSortValue, setFilterSortValue] = useState("");
//   const [offset, setOffset] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [currentData, setCurrentData] = useState([]);
//   const [sortedProducts, setSortedProducts] = useState([]);
//   const { products } = useSelector((state) => state.product);
//   const pageLimit = 15;
//   let { pathname } = useLocation();
// const searchState = location.state;
// const location = useLocation();
//   // const location = useLocation();

//   // const searchState = location.state;
//   const getLayout = (layout) => {
//     setLayout(layout);
//   };

//   const getSortParams = (sortType, sortValue) => {
//     setSortType(sortType);
//     setSortValue(sortValue);
//   };

//   const getFilterSortParams = (sortType, sortValue) => {
//     setFilterSortType(sortType);
//     setFilterSortValue(sortValue);
//   };
//   // useEffect(() => {
//   //   // let filtered = [...products];

//   //   // if (searchState?.name) {
//   //   //   console.log("this is clickable image", searchState.name);
//   //   //   const query = searchState.name.toLowerCase().trim();
//   //   //   filtered = products.filter(
//   //   //     (product) =>
//   //   //       Array.isArray(product.category) &&
//   //   //       product.category.some((cat) =>
//   //   //         cat.toLowerCase().trim().includes(query)
//   //   //       )
//   //   //   );
//   //   //   console.log("this is dats", filtered);
//   //   // }
//   //   let sortedProducts = getSortedProducts(
//   //     // filtered,
//   //     products,
//   //     sortType,
//   //     sortValue
//   //   );
//   //   const filterSortedProducts = getSortedProducts(
//   //     sortedProducts,
//   //     filterSortType,
//   //     filterSortValue
//   //   );
//   //   sortedProducts = filterSortedProducts;
//   //   setSortedProducts(sortedProducts);
//   //   setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
//   // }, [
//   //   offset,
//   //   products,
//   //   sortType,
//   //   sortValue,
//   //   filterSortType,
//   //   filterSortValue,
//   //   // searchState,
//   // ]);

// useEffect(() => {
//         let sortedProducts = getSortedProducts(products, sortType, sortValue);
//         const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
//         sortedProducts = filterSortedProducts;
//         setSortedProducts(sortedProducts);
//         setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
//     }, [offset, products, sortType, sortValue, filterSortType, filterSortValue]);
//     useEffect(() => {
//         let filtered = [...products];
//         if (searchState?.name) {
//             const query = searchState.name.toLowerCase();
//             filtered = filtered.filter((product) => product.name && product.name.toLowerCase().includes(query));
//         }
//         if (searchState?.categoryname) {
//             const query2 = searchState.categoryname.toLowerCase();
//              console.log("this is show data query2 :", filtered);
//             filtered = products.filter(product =>
//                 Array.isArray(product.category) &&
//                 product.category.some(cat =>
//                     cat.toLowerCase().trim() === query2
//                 )
//             );
//             console.log("this is show data :", filtered);
//         }
//         setSortedProducts(filtered);
//         setCurrentData(filtered.slice(offset, offset + pageLimit));
//     }, [searchState?.categoryname,searchState?.name]);


//   return (
//     <Fragment>
//       <SEO
//         titleTemplate="Shop Page"
//         description="Shop page of Anahee Anahee."
//       />

//       <LayoutOne headerTop="visible">
//         {/* breadcrumb */}
//         {/* <Breadcrumb 
//                     pages={[
//                         {label: "Home", path: process.env.PUBLIC_URL + "/" },
//                         {label: "Shop", path: process.env.PUBLIC_URL + pathname }
//                     ]} 
//                 /> */}

//         <div className="shop-area pt-10 pb-30">
//           <div className="container-fluid">
//             <div className="row">
//               <div className="col-lg-3 order-1 order-lg-1">
//                 {/* shop sidebar */}
//                 <ShopSidebar
//                   products={products}
//                   getSortParams={getSortParams}
//                   sideSpaceClass="mr-30"
//                 />
//               </div>
//               <div className="col-lg-9 order-2 order-lg-2">
//                 <div className="row">
//                   <div className="flex-col my-5 flex-row  items-center d-flex justify-content-between gap-4">
//                     {/* ShopTopbar */}

//                     {/* Sort Dropdown */}
//                     <div
//                       className="w-100 w-sm-auto"
//                       style={{ maxWidth: "200px" }}
//                     >
//                       <select
//                         onChange={(e) =>
//                           getFilterSortParams("filterSort", e.target.value)
//                         }
//                         className="form-select form-select-lg py-3 pe-5"
//                         style={{
//                           backgroundImage: `url("data:image/svg+xml,%3Csvg fill='black' width='32' height='32' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
//                           backgroundRepeat: "no-repeat",
//                           backgroundPosition: "right 1rem center",
//                           backgroundSize: "2.5rem",
//                         }}
//                       >
//                         <option value="default">Default</option>
//                         <option value="priceHighToLow">
//                           Price - High to Low
//                         </option>
//                         <option value="priceLowToHigh">
//                           Price - Low to High
//                         </option>
//                       </select>
//                     </div>
//                     <div className="w-full sm:w-auto">
//                       <ShopTopbar
//                         getLayout={getLayout}
//                         getFilterSortParams={getFilterSortParams}
//                         productCount={products.length}
//                         sortedProductCount={currentData.length}
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 {/* shop topbar default */}

//                 {/* shop page content default */}
//                 <ShopProducts layout={layout} products={currentData} />

//                 {/* shop product pagination */}

//                 <div
//                   className=" pro-pagination-style justify-content-between align-items-center text-center mt-10"
//                   style={{ display: "flex" }}
//                 >
//                   <p className="pt-5">
//                     Showing{currentData.length} of {products.length} result
//                   </p>
//                   <Paginator
//                     totalRecords={sortedProducts.length}
//                     pageLimit={pageLimit}
//                     pageNeighbours={2}
//                     setOffset={setOffset}
//                     currentPage={currentPage}
//                     setCurrentPage={setCurrentPage}
//                     pageContainerClass="mb-0 mt-0"
//                     pagePrevText="«"
//                     pageNextText="»"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </LayoutOne>
//     </Fragment>
//   );
// };
// export default ShopGridStandard;


import { Fragment, useState, useEffect } from 'react';
import Paginator from 'react-hooks-paginator';
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import { getSortedProducts } from '../../helpers/product';
import SEO from "../../components/seo";
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import ShopSidebar from '../../wrappers/product/ShopSidebar';
import ShopTopbar from '../../wrappers/product/ShopTopbar';
import ShopProducts from '../../wrappers/product/ShopProducts';
const ShopGridStandard = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
    const [layout, setLayout] = useState('grid three-column');
    const [sortType, setSortType] = useState('');
    const [sortValue, setSortValue] = useState('');
    const [filterSortType, setFilterSortType] = useState('');
    const [filterSortValue, setFilterSortValue] = useState('');
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const { products } = useSelector((state) => state.product);
    const pageLimit = 15;
  const location = useLocation();
  const searchState = location.state;
  // console.log("category name", categoryname);
  console.log('searchState', searchState);
    const getLayout = (layout) => {
        setLayout(layout)
    }
    const getSortParams = (sortType, sortValue) => {
        setSortType(sortType);
        setSortValue(sortValue);
            setSelectedCategory(sortValue);
    }

    const getFilterSortParams = (sortType, sortValue) => {
        setFilterSortType(sortType);
        setFilterSortValue(sortValue);
    }


    useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    if (category) {
      getSortParams("category", category);
    } else {
      getSortParams("category", "");
    }
  }, [location]);

  
    useEffect(() => {
        let sortedProducts = getSortedProducts(products, sortType, sortValue);
        const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
        sortedProducts = filterSortedProducts;
        setSortedProducts(sortedProducts);
        setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
    }, [offset, products, sortType, sortValue, filterSortType, filterSortValue]);
    useEffect(() => {
        let filtered = [...products];
        if (searchState?.name) {
            const query = searchState.name.toLowerCase();
            filtered = filtered.filter((product) => product.name && product.name.toLowerCase().includes(query));
        }
        if (searchState?.categoryname) {
            const query2 = searchState.categoryname.toLowerCase();
             console.log("this is show data query2 :", filtered);
            filtered = products.filter(product =>
                Array.isArray(product.category) &&
                product.category.some(cat =>
                    cat.toLowerCase().trim() === query2
                )
            );
            console.log("this is show data :", filtered);
        }
        setSortedProducts(filtered);
        setCurrentData(filtered.slice(offset, offset + pageLimit));
    }, [searchState?.categoryname,searchState?.name]);
    return (
        <Fragment>
      <SEO
        titleTemplate="Shop Page"
        description="Shop page of Anahee Anahee."
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        {/* <Breadcrumb 
                    pages={[
                        {label: "Home", path: process.env.PUBLIC_URL + "/" },
                        {label: "Shop", path: process.env.PUBLIC_URL + pathname }
                    ]} 
                /> */}

        <div className="shop-area pt-10 pb-30">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 order-1 order-lg-1">
                {/* shop sidebar */}
                <ShopSidebar
                  products={products}
                  getSortParams={getSortParams}
                  sideSpaceClass="mr-30"
                />
              </div>
              <div className="col-lg-9 order-2 order-lg-2">
                <div className="row">
                  <div className="flex-col my-5 flex-row  items-center d-flex justify-content-between gap-4">
                    {/* ShopTopbar */}

                    {/* Sort Dropdown */}
                    <div
                      className="w-100 w-sm-auto"
                      style={{ maxWidth: "200px" }}
                    >
                      <select
                        onChange={(e) =>
                          getFilterSortParams("filterSort", e.target.value)
                        }
                        className="form-select form-select-lg py-3 pe-5"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg fill='black' width='32' height='32' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 1rem center",
                          backgroundSize: "2.5rem",
                        }}
                      >
                        <option value="default">Default</option>
                        <option value="priceHighToLow">
                          Price - High to Low
                        </option>
                        <option value="priceLowToHigh">
                          Price - Low to High
                        </option>
                      </select>
                    </div>
                    <div className="w-full sm:w-auto">
                      <ShopTopbar
                        getLayout={getLayout}
                        getFilterSortParams={getFilterSortParams}
                        productCount={products.length}
                        sortedProductCount={currentData.length}
                      />
                    </div>
                  </div>
                </div>
                {/* shop topbar default */}

                {/* shop page content default */}
                <ShopProducts layout={layout} products={currentData} />

                {/* shop product pagination */}

                <div
                  className=" pro-pagination-style justify-content-between align-items-center text-center mt-10"
                  style={{ display: "flex" }}
                >
                  <p className="pt-5">
                    Showing{currentData.length} of {products.length} result
                  </p>
                  <Paginator
                    totalRecords={sortedProducts.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
    )
}
export default ShopGridStandard;


// import { Fragment, useState, useEffect } from 'react';
// import Paginator from 'react-hooks-paginator';
// import { useSelector } from "react-redux";
// import { useLocation } from "react-router-dom"
// import { getSortedProducts } from '../../helpers/product';
// import SEO from "../../components/seo";
// import LayoutOne from '../../layouts/LayoutOne';
// import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
// import ShopSidebar from '../../wrappers/product/ShopSidebar';
// import ShopTopbar from '../../wrappers/product/ShopTopbar';
// import ShopProducts from '../../wrappers/product/ShopProducts';
// const ShopGridStandard = () => {
//   const [selectedCategory, setSelectedCategory] = useState("");
//     const [layout, setLayout] = useState('grid three-column');
//     const [sortType, setSortType] = useState('');
//     const [sortValue, setSortValue] = useState('');
//      const [activeFilters, setActiveFilters] = useState({
//     categories: [],
//     priceRange: { min: null, max: null },
//     brands: [],
//     colors: [],
//     sizes: [],
//     rating: null,
//     inStock: false,
//   });
//     const [filterSortType, setFilterSortType] = useState('');
//     const [filterSortValue, setFilterSortValue] = useState('');
//     const [offset, setOffset] = useState(0);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [currentData, setCurrentData] = useState([]);
//     const [sortedProducts, setSortedProducts] = useState([]);
//     const { products } = useSelector((state) => state.product);
//     const pageLimit = 15;
//   const location = useLocation();
//   const searchState = location.state;
//   // console.log("category name", categoryname);
//   console.log('searchState', searchState);
//     const getLayout = (layout) => {
//         setLayout(layout)
//     }
//     // const getSortParams = (sortType, sortValue) => {
//     //     setSortType(sortType);
//     //     setSortValue(sortValue);
//     //         setSelectedCategory(sortValue);
//     // }

    
//   const getSortParams = (type, values) => {
//     setActiveFilters((prev) => ({
//       ...prev,
//       [type]: values, // Dynamic key based on filter type
//     }));
//   };

//     const getFilterSortParams = (sortType, sortValue) => {
//         setFilterSortType(sortType);
//         setFilterSortValue(sortValue);
//     }

//     // Enhanced filter functions for multiple filters
//   const addCategoryFilter = (category) => {
//     setActiveFilters((prev) => ({
//       ...prev,
//       categories: prev.categories.includes(category)
//         ? prev.categories.filter((cat) => cat !== category)
//         : [...prev.categories, category],
//     }));
//     resetPagination();
//   };

//   const removeFilter = (filterType, value = null) => {
//     setActiveFilters((prev) => {
//       const newFilters = { ...prev };

//       switch (filterType) {
//         case "category":
//           newFilters.categories = prev.categories.filter(
//             (cat) => cat !== value
//           );
//           break;
//         case "brand":
//           newFilters.brands = prev.brands.filter((brand) => brand !== value);
//           break;
//         case "color":
//           newFilters.colors = prev.colors.filter((color) => color !== value);
//           break;
//         case "size":
//           newFilters.sizes = prev.sizes.filter((size) => size !== value);
//           break;
//         case "priceRange":
//           newFilters.priceRange = { min: null, max: null };
//           break;
//         case "rating":
//           newFilters.rating = null;
//           break;
//         case "inStock":
//           newFilters.inStock = false;
//           break;
//         default:
//           break;
//       }

//       return newFilters;
//     });
//     resetPagination();
//   };

//     const resetPagination = () => {
//     setOffset(0);
//     setCurrentPage(1);
//   };

//   const clearAllFilters = () => {
//     setActiveFilters({
//       categories: [],
//       priceRange: { min: null, max: null },
//       brands: [],
//       colors: [],
//       sizes: [],
//       rating: null,
//       inStock: false,
//     });
//     resetPagination();
//   };
//     const setStockFilter = (inStock) => {
//     setActiveFilters((prev) => ({
//       ...prev,
//       inStock: inStock,
//     }));
//     resetPagination();
//   };
//     const setRatingFilter = (rating) => {
//     setActiveFilters((prev) => ({
//       ...prev,
//       rating: prev.rating === rating ? null : rating,
//     }));
//     resetPagination();
//   };
//   const setPriceRangeFilter = (min, max) => {
//     setActiveFilters((prev) => ({
//       ...prev,
//       priceRange: { min, max },
//     }));
//     resetPagination();
//   };
//    const addSizeFilter = (size) => {
//     setActiveFilters((prev) => ({
//       ...prev,
//       // sizes: size === ""
//         // ? [] // Clear all sizes if "All Sizes" is selected
//         // : prev.sizes.includes(size)
//         sizes:prev.sizes.includes(size)
//         ? prev.sizes.filter((s) => s !== size) // Remove if already selected
//         : [...prev.sizes, size], // Add if not selected
//     }));
//     resetPagination();
//   };
//     const addColorFilter = (color) => {
//     setActiveFilters((prev) => ({
//       ...prev,
//       colors: prev.colors.includes(color)
//         ? prev.colors.filter((c) => c !== color)
//         : [...prev.colors, color],
//     }));
//     resetPagination();
//   };
//    const addBrandFilter = (brand) => {
//     setActiveFilters((prev) => ({
//       ...prev,
//       brands: prev.brands.includes(brand)
//         ? prev.brands.filter((b) => b !== brand)
//         : [...prev.brands, brand],
//     }));
//     resetPagination();
//   };
//   const applyMultipleFilters = (products) => {
//     let filtered = [...products];

//     // Search state filters (from navigation)
//     if (searchState?.name) {
//       const query = searchState.name.toLowerCase();
//       filtered = filtered.filter(
//         (product) => product.name && product.name.toLowerCase().includes(query)
//       );
//     }
//      const addBrandFilter = (brand) => {
//     setActiveFilters((prev) => ({
//       ...prev,
//       brands: prev.brands.includes(brand)
//         ? prev.brands.filter((b) => b !== brand)
//         : [...prev.brands, brand],
//     }));
//     resetPagination();
//   };

//     if (searchState?.categoryname) {
//       const query2 = searchState.categoryname.toLowerCase();
//       filtered = filtered.filter(
//         (product) =>
//           Array.isArray(product.category) &&
//           product.category.some((cat) => cat.toLowerCase().trim() === query2)
//       );
//     }

//     // Category filters - matches any of the selected categories
//     if (activeFilters.categories.length > 0) {
//       filtered = filtered.filter(
//         (product) =>
//           product.category &&
//           Array.isArray(product.category) &&
//           activeFilters.categories.some((selectedCat) =>
//             product.category.some(
//               (productCat) =>
//                 productCat.toLowerCase().trim() ===
//                 selectedCat.toLowerCase().trim()
//             )
//           )
//       );
//     }

//     // Size filters - matches any of the selected sizes
//     if (activeFilters.sizes.length > 0) {
//       filtered = filtered.filter(
//         (product) =>
//           product.size &&
//           Array.isArray(product.size) &&
//           activeFilters.sizes.some((selectedSize) =>
//             product.sizes.some(
//               (productSize) =>
//                 productSize.toString().toLowerCase().trim() ===
//                 selectedSize.toString().toLowerCase().trim()
//             )
//           )
//       );
//     }

//     // ... (rest of the filters remain the same)

//     return filtered;
//   };
//   // Count active filters
//   const getActiveFilterCount = () => {
//     let count = 0;
//     count += activeFilters.categories.length;
//     count += activeFilters.brands.length;
//     count += activeFilters.colors.length;
//     count += activeFilters.sizes.length;
//     if (
//       activeFilters.priceRange.min !== null ||
//       activeFilters.priceRange.max !== null
//     )
//       count++;
//     if (activeFilters.rating !== null) count++;
//     if (activeFilters.inStock) count++;
//     return count;
//   };

//   // Main filtering and sorting effect
//   useEffect(() => {
//     let filtered = applyMultipleFilters(products);
//     let sortedProducts = getSortedProducts(filtered, sortType, sortValue);
//     const filterSortedProducts = getSortedProducts(
//       sortedProducts,
//       filterSortType,
//       filterSortValue
//     );
//     sortedProducts = filterSortedProducts;
//     setSortedProducts(sortedProducts);
//     setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
//   }, [
//     offset,
//     products,
//     sortType,
//     sortValue,
//     filterSortType,
//     filterSortValue,
//     activeFilters,
//     searchState?.categoryname,
//     searchState?.name,
//   ]);

//     useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const category = params.get("category");
//     if (category) {
//       getSortParams("category", category);
//     } else {
//       getSortParams("category", "");
//     }
//   }, [location]);

  
//     useEffect(() => {
//         let sortedProducts = getSortedProducts(products, sortType, sortValue);
//         const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
//         sortedProducts = filterSortedProducts;
//         setSortedProducts(sortedProducts);
//         setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
//     }, [offset, products, sortType, sortValue, filterSortType, filterSortValue]);
//     useEffect(() => {
//         let filtered = [...products];
//         if (searchState?.name) {
//             const query = searchState.name.toLowerCase();
//             filtered = filtered.filter((product) => product.name && product.name.toLowerCase().includes(query));
//         }
//         if (searchState?.categoryname) {
//             const query2 = searchState.categoryname.toLowerCase();
//              console.log("this is show data query2 :", filtered);
//             filtered = products.filter(product =>
//                 Array.isArray(product.category) &&
//                 product.category.some(cat =>
//                     cat.toLowerCase().trim() === query2
//                 )
//             );
//             console.log("this is show data :", filtered);
//         }
//         setSortedProducts(filtered);
//         setCurrentData(filtered.slice(offset, offset + pageLimit));
//     }, [searchState?.categoryname,searchState?.name]);
//     return (
//         <Fragment>
//       <SEO
//         titleTemplate="Shop Page"
//         description="Shop page of Anahee Anahee."
//       />

//       <LayoutOne headerTop="visible">
//         {/* breadcrumb */}
//         {/* <Breadcrumb 
//                     pages={[
//                         {label: "Home", path: process.env.PUBLIC_URL + "/" },
//                         {label: "Shop", path: process.env.PUBLIC_URL + pathname }
//                     ]} 
//                 /> */}

//         <div className="shop-area pt-10 pb-30">
//           <div className="container-fluid">
//             <div className="row">
//               <div className="col-lg-3 order-1 order-lg-1">
//                 {/* Enhanced shop sidebar with multiple filter functions */}
//                 <ShopSidebar
//                   products={products}
//                   getSortParams={getSortParams}
//                   sideSpaceClass="mr-30"
//                   // Pass multiple filter functions
//                   addCategoryFilter={addCategoryFilter}
//                   addBrandFilter={addBrandFilter}
//                   addColorFilter={addColorFilter}
//                   addSizeFilter={addSizeFilter}
//                   setPriceRangeFilter={setPriceRangeFilter}
//                   setRatingFilter={setRatingFilter}
//                   setStockFilter={setStockFilter}
//                   activeFilters={activeFilters}
//                 />

//                 {/* Active Filters Display */}
//                 {getActiveFilterCount() > 0 && (
//                   <div className="active-filters mr-30 mt-4 p-3 border rounded">
//                     <div className="d-flex justify-content-between align-items-center mb-2">
//                       <h6 className="mb-0">
//                         Active Filters ({getActiveFilterCount()})
//                       </h6>
//                       <button
//                         className="btn btn-sm btn-outline-danger"
//                         onClick={clearAllFilters}
//                       >
//                         Clear All
//                       </button>
//                     </div>

//                     {/* Category filters */}
//                     {activeFilters.categories.map((category) => (
//                       <span
//                         key={category}
//                         className="badge bg-primary me-2 mb-2"
//                       >
//                         {category}
//                         <button
//                           className="btn-close btn-close-white ms-1"
//                           onClick={() => removeFilter("category", category)}
//                           style={{ fontSize: "0.7em" }}
//                         ></button>
//                       </span>
//                     ))}

//                     {/* Brand filters */}
//                     {activeFilters.brands.map((brand) => (
//                       <span
//                         key={brand}
//                         className="badge bg-secondary me-2 mb-2"
//                       >
//                         {brand}
//                         <button
//                           className="btn-close btn-close-white ms-1"
//                           onClick={() => removeFilter("brand", brand)}
//                           style={{ fontSize: "0.7em" }}
//                         ></button>
//                       </span>
//                     ))}

//                     {/* Color filters */}
//                     {activeFilters.colors.map((color) => (
//                       <span key={color} className="badge bg-info me-2 mb-2">
//                         {color}
//                         <button
//                           className="btn-close btn-close-white ms-1"
//                           onClick={() => removeFilter("color", color)}
//                           style={{ fontSize: "0.7em" }}
//                         ></button>
//                       </span>
//                     ))}

//                     {/* Size filters */}
//                     {activeFilters.sizes.map((size) => (
//                       <span key={size} className="badge bg-warning me-2 mb-2">
//                         {size}
//                         <button
//                           className="btn-close ms-1"
//                           onClick={() => removeFilter("size", size)}
//                           style={{ fontSize: "0.7em" }}
//                         ></button>
//                       </span>
//                     ))}

//                     {/* Price range filter */}
//                     {(activeFilters.priceRange.min !== null ||
//                       activeFilters.priceRange.max !== null) && (
//                       <span className="badge bg-success me-2 mb-2">
//                         ${activeFilters.priceRange.min || 0} - $
//                         {activeFilters.priceRange.max || "∞"}
//                         <button
//                           className="btn-close btn-close-white ms-1"
//                           onClick={() => removeFilter("priceRange")}
//                           style={{ fontSize: "0.7em" }}
//                         ></button>
//                       </span>
//                     )}

//                     {/* Rating filter */}
//                     {activeFilters.rating !== null && (
//                       <span className="badge bg-dark me-2 mb-2">
//                         {activeFilters.rating}+ Stars
//                         <button
//                           className="btn-close btn-close-white ms-1"
//                           onClick={() => removeFilter("rating")}
//                           style={{ fontSize: "0.7em" }}
//                         ></button>
//                       </span>
//                     )}

//                     {/* Stock filter */}
//                     {activeFilters.inStock && (
//                       <span className="badge bg-success me-2 mb-2">
//                         In Stock
//                         <button
//                           className="btn-close btn-close-white ms-1"
//                           onClick={() => removeFilter("inStock")}
//                           style={{ fontSize: "0.7em" }}
//                         ></button>
//                       </span>
//                     )}
//                   </div>
//                 )}
//               </div>
//               <div className="col-lg-9 order-2 order-lg-2">
//                 <div className="row">
//                   <div className="flex-col flex-row  items-center d-flex justify-content-between gap-4">
//                     {/* ShopTopbar */}

//                     {/* Sort Dropdown */}
//                     <div
//                       className="w-100 w-sm-auto"
//                       style={{ maxWidth: "200px" }}
//                     >
//                       <select
//                         onChange={(e) =>
//                           getFilterSortParams("filterSort", e.target.value)
//                         }
//                         className="form-select form-select-lg py-3 pe-5"
//                         style={{
//                           backgroundImage: `url("data:image/svg+xml,%3Csvg fill='black' width='32' height='32' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
//                           backgroundRepeat: "no-repeat",
//                           backgroundPosition: "right 1rem center",
//                           backgroundSize: "2.5rem",
//                         }}
//                       >
//                         <option value="default">Default</option>
//                         <option value="priceHighToLow">
//                           Price - High to Low
//                         </option>
//                         <option value="priceLowToHigh">
//                           Price - Low to High
//                         </option>
//                       </select>
//                     </div>
//                     <div className="w-full sm:w-auto">
//                       <ShopTopbar
//                         getLayout={getLayout}
//                         getFilterSortParams={getFilterSortParams}
//                         productCount={products.length}
//                         sortedProductCount={currentData.length}
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 {/* shop topbar default */}

//                 {/* shop page content default */}
//                 <ShopProducts layout={layout} products={currentData} />

//                 {/* shop product pagination */}
//        {/* Results info */}
//                 <div className="mb-3">
//                   <p className="text-muted">
//                     Showing {currentData.length} of {sortedProducts.length}{" "}
//                     results
//                     {getActiveFilterCount() > 0 &&
//                       ` (${getActiveFilterCount()} filters applied)`}
//                   </p>
//                 </div>

//                 {/* Shop products */}
//                 <ShopProducts layout={layout} products={currentData} />
//                 <div
//                   className=" pro-pagination-style justify-content-between align-items-center text-center mt-10"
//                   style={{ display: "flex" }}
//                 >
//                   <p className="pt-5">
//                     Showing{currentData.length} of {products.length} result
//                   </p>
//                   <Paginator
//                     totalRecords={sortedProducts.length}
//                     pageLimit={pageLimit}
//                     pageNeighbours={2}
//                     setOffset={setOffset}
//                     currentPage={currentPage}
//                     setCurrentPage={setCurrentPage}
//                     pageContainerClass="mb-0 mt-0"
//                     pagePrevText="«"
//                     pageNextText="»"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </LayoutOne>
//     </Fragment>
//     )
// }
// export default ShopGridStandard;