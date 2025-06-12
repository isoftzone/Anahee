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

//olds

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
//     const [layout, setLayout] = useState('grid three-column');
//     const [sortType, setSortType] = useState("");
//     const [sortValue, setSortValue] = useState([]);

//     // Multiple filter states
//     const [activeFilters, setActiveFilters] = useState({
//         categories: [],
//         priceRange: { min: null, max: null },
//         brands: [],
//         colors: [],
//         sizes: [],
//         rating: null,
//         inStock: false
//     });

//     const [filterSortType, setFilterSortType] = useState('');
//     const [filterSortValue, setFilterSortValue] = useState('');
//     const [offset, setOffset] = useState(0);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [currentData, setCurrentData] = useState([]);
//     const [sortedProducts, setSortedProducts] = useState([]);
//     const { products } = useSelector((state) => state.product);
//     const pageLimit = 15;
//     const location = useLocation();
//     const searchState = location.state;

//     console.log('searchState', searchState);
//     console.log('activeFilters', activeFilters);

//     const getLayout = (layout) => {
//         setLayout(layout)
//     }

//     const getSortParams = (type, values) => {
//       setActiveFilters((prev) => ({
//         ...prev,
//         [type]: values, // Dynamic key based on filter type
//       }));
//     };

//     const getFilterSortParams = (sortType, sortValue) => {
//         setFilterSortType(sortType);
//         setFilterSortValue(sortValue);
//         // Example: handle multi-color filter
//     }

//     // Enhanced filter functions for multiple filters
//     const addCategoryFilter = (category) => {
//         setActiveFilters(prev => ({
//             ...prev,
//             categories: prev.categories.includes(category)
//                 ? prev.categories.filter(cat => cat !== category)
//                 : [...prev.categories, category]
//         }));
//         resetPagination();
//     };

//     const addBrandFilter = (brand) => {
//         setActiveFilters(prev => ({
//             ...prev,
//             brands: prev.brands.includes(brand)
//                 ? prev.brands.filter(b => b !== brand)
//                 : [...prev.brands, brand]
//         }));
//         resetPagination();
//     };

//     const addColorFilter = (color) => {
//         setActiveFilters(prev => ({
//             ...prev,
//             colors: prev.colors.includes(color)
//                 ? prev.colors.filter(c => c !== color)
//                 : [...prev.colors, color]
//         }));
//         resetPagination();
//     };

//     const addSizeFilter = (size) => {
//         setActiveFilters(prev => ({
//             ...prev,
//             sizes: prev.sizes.includes(size)
//                 ? prev.sizes.filter(s => s !== size)
//                 : [...prev.sizes, size]
//         }));
//         resetPagination();
//     };

//     const setPriceRangeFilter = (min, max) => {
//         setActiveFilters(prev => ({
//             ...prev,
//             priceRange: { min, max }
//         }));
//         resetPagination();
//     };

//     const setRatingFilter = (rating) => {
//         setActiveFilters(prev => ({
//             ...prev,
//             rating: prev.rating === rating ? null : rating
//         }));
//         resetPagination();
//     };

//     const setStockFilter = (inStock) => {
//         setActiveFilters(prev => ({
//             ...prev,
//             inStock: inStock
//         }));
//         resetPagination();
//     };

//     const clearAllFilters = () => {
//         setActiveFilters({
//             categories: [],
//             colors: [],
//             sizes: [],
//         });
//         resetPagination();
//     };

//     const removeFilter = (filterType, value = null) => {
//         setActiveFilters(prev => {
//             const newFilters = { ...prev };

//             switch (filterType) {
//                 case 'category':
//                     newFilters.categories = prev.categories.filter(cat => cat !== value);
//                     break;
//                 case 'color':
//                     newFilters.colors = prev.colors.filter(c => c !== value);
//                     break;
//                 case 'size':
//                     newFilters.sizes = prev.sizes.filter(s => s !== value);
//                     break;
//                 default:
//                     break;
//             }

//             return newFilters;
//         });
//         resetPagination();
//     };

//     const resetPagination = () => {
//         setOffset(0);
//         setCurrentPage(1);
//     };

//     // Enhanced filtering logic
//     const applyMultipleFilters = (products) => {
//       let filtered = [...products];

//       //Search state filters (from navigation)
//       if (searchState?.name) {
//         const query = searchState.name.toLowerCase();
//         filtered = filtered.filter(
//           (product) =>
//             product.name && product.name.toLowerCase().includes(query)
//         );
//       }

//       if (searchState?.categoryname) {
//         const query2 = searchState.categoryname.toLowerCase();
//         filtered = filtered.filter(
//           (product) =>
//             Array.isArray(product.category) &&
//             product.category.some((cat) => cat.toLowerCase().trim() === query2)
//         );
//       }

//       // Category filters
//     //   if (activeFilters.categories.length > 0) {
//     //     filtered = filtered.filter(
//     //       (product) =>
//     //         Array.isArray(product.category) &&
//     //         product.category.some((cat) =>
//     //           activeFilters.categories.some(
//     //             (filterCat) =>
//     //               cat.toLowerCase().trim() === filterCat.toLowerCase().trim()
//     //           )
//     //         )
//     //     );
//     //   }
//     if (activeFilters.categories.length > 0) {
//         console.log('Active category filters:', activeFilters.categories);

//         filtered = filtered.filter((product) => {
//             // Check if product has categories
//             if (!product.category || !product.category.length) {
//                 console.log(`Product ${product.id} has no categories - EXCLUDED`);
//                 return false;
//             }

//             // Normalize to array (though your data shows it's already an array)
//             const categoriesArray = Array.isArray(product.category)
//                 ? product.category
//                 : [product.category];

//             // Check for matches with active filters
//             const hasMatch = categoriesArray.some(productCategory => {
//                 if (!productCategory) return false; // Skip empty/null categories

//                 const normalizedProductCategory = productCategory.toLowerCase().trim();
//                 return activeFilters.categories.some(filterCategory =>
//                     normalizedProductCategory === filterCategory.toLowerCase().trim()
//                 );
//             });

//             console.log(`Product ${product.id} categories:`, categoriesArray, 'Match:', hasMatch);
//             return hasMatch;
//         });
//     }

//       // Color filters
//     //   if (activeFilters.colors.length > 0) {
//     //     console.log('Active color filters:11', activeFilters.colors);
//     //     console.log('filters:11', filtered);
//     //     filtered = filtered.filter(
//     //       (product) =>
//     //         Array.isArray(product.color) &&
//     //         product.color.some((c) =>
//     //           activeFilters.colors.some(
//     //             (filterC) =>
//     //               c.toLowerCase().trim() === filterC.toLowerCase().trim()
//     //           )
//     //         )
//     //     );
//     //   }

//     if (activeFilters.colors.length > 0) {
//         console.log('Active color filters:', activeFilters.colors);
//         filtered = filtered.filter((product) => {
//             // Check if product has variations and at least one variation has a color
//             if (!product.variation || !product.variation.length) return false;

//             const productColor = product.variation[0].color;
//             if (!productColor) return false;

//             // Trim and lowercase both the product color and filter colors for comparison
//             const normalizedProductColor = productColor.toLowerCase().trim();

//             return activeFilters.colors.some(filterColor => {
//                 const normalizedFilterColor = filterColor.toLowerCase().trim();
//                 return normalizedProductColor === normalizedFilterColor;
//             });
//         });
//     }
//    // In your applyMultipleFilters function, replace the color filter section with:

// // if (activeFilters.colors.length > 0) {
// //     console.log('Active color filters:', activeFilters.colors);

// //     filtered = filtered.filter((product) => {
// //       // Handle both 'color' and 'colors' property names
// //       const productColors = product.color || product.colors;
// //       console.log('searchState product', product);
// //       console.log('activeFilters productColors', productColors);
// //       if (!productColors) {
// //         console.log(`Product ${product.id} has no colors - EXCLUDED`);
// //         return false;
// //       }

// //       // Normalize to array format
// //       const colorsArray = Array.isArray(productColors)
// //         ? productColors
// //         : [productColors];

// //       // Check for matches with active filters
// //       const hasMatch = colorsArray.some(productColor => {
// //         const normalizedProductColor = productColor.toLowerCase().trim();
// //         return activeFilters.colors.some(filterColor =>
// //           normalizedProductColor === filterColor.toLowerCase().trim()
// //         );
// //       });

// //       console.log(`Product ${product.id} colors:`, colorsArray, 'Match:', hasMatch);
// //       return hasMatch;
// //     });
// //   }

//       // Size filters
//     //   if (activeFilters.sizes.length > 0) {
//     //     filtered = filtered.filter(
//     //       (product) =>
//     //         product.sizes &&
//     //         Array.isArray(product.sizes) &&
//     //         product.sizes.some((s) =>
//     //           activeFilters.sizes.some((filterS) =>
//     //             s.toLowerCase().includes(filterS.toLowerCase())
//     //           )
//     //         )
//     //     );
//     //   }

//    // In your applyMultipleFilters function, replace the size filter section with:

// // if (activeFilters.sizes.length > 0) {
// //     console.log('Active size filters:', activeFilters.sizes);

// //     filtered = filtered.filter((product) => {
// //       // Handle both 'size' and 'sizes' property names
// //       const productSizes = product.size || product.sizes;

// //       if (!productSizes) {
// //         console.log(`Product ${product.id} has no sizes - EXCLUDED`);
// //         return false;
// //       }

// //       // Normalize to array format
// //       const sizesArray = Array.isArray(productSizes)
// //         ? productSizes
// //         : [productSizes];

// //       // Check for matches with active filters
// //       const hasMatch = sizesArray.some(productSize => {
// //         const normalizedProductSize = productSize.toLowerCase().trim();
// //         return activeFilters.sizes.some(filterSize =>
// //           normalizedProductSize === filterSize.toLowerCase().trim()
// //         );
// //       });

// //       console.log(`Product ${product.id} sizes:`, sizesArray, 'Match:', hasMatch);
// //       return hasMatch;
// //     });
// //   }

// if (activeFilters.sizes.length > 0) {
//     console.log('Active size filters:', activeFilters.sizes);

//     filtered = filtered.filter((product) => {
//         // Check if product has variations and sizes
//         if (!product.variation || !product.variation.length || !product.variation[0].size) {
//             console.log(`Product ${product.id} has no sizes - EXCLUDED`);
//             return false;
//         }

//         // Extract size names from variation[0].size array
//         const productSizes = product.variation[0].size.map(sizeObj => sizeObj.name);

//         // Normalize to array (in case it's a single string, though unlikely here)
//         const sizesArray = Array.isArray(productSizes) ? productSizes : [productSizes];

//         // Check for matches with active filters
//         const hasMatch = sizesArray.some(productSize => {
//             if (!productSize) return false; // Skip empty/null sizes

//             const normalizedProductSize = productSize.toLowerCase().trim();
//             return activeFilters.sizes.some(filterSize =>
//                 normalizedProductSize === filterSize.toLowerCase().trim()
//             );
//         });

//         console.log(`Product ${product.id} sizes:`, sizesArray, 'Match:', hasMatch);
//         return hasMatch;
//     });
// }

//       return filtered;
//     };

//     // Count active filters
//     const getActiveFilterCount = () => {
//         let count = 0;
//         count += activeFilters.categories.length;
//         count += activeFilters.colors.length;
//         count += activeFilters.sizes.length;
//         if (activeFilters.priceRange.min !== null || activeFilters.priceRange.max !== null) count++;
//         if (activeFilters.rating !== null) count++;
//         if (activeFilters.inStock) count++;
//         return count;
//     };

//     // Main filtering and sorting effect
//     useEffect(() => {
//         let filtered = applyMultipleFilters(products);
//         let sortedProducts = getSortedProducts(filtered, sortType, sortValue);
//         const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
//         sortedProducts = filterSortedProducts;
//         setSortedProducts(sortedProducts);
//         setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
//     }, [
//         offset,
//         products,
//         sortType,
//         sortValue,
//         filterSortType,
//         filterSortValue,
//         activeFilters,
//         searchState?.categoryname,
//         searchState?.name
//     ]);

//     return (
//         <Fragment>
//             <SEO
//                 titleTemplate="Shop Page"
//                 description="Shop page of Anahee Anahee."
//             />

//             <LayoutOne headerTop="visible">
//                 <div className="shop-area pt-10 pb-30">
//                     <div className="container-fluid">
//                         <div className="row">
//                             <div className="col-lg-3 order-1 order-lg-1">
//                                 {/* Enhanced shop sidebar with multiple filter functions */}
//                                 <ShopSidebar
//                                     products={products}
//                                     getSortParams={getSortParams}
//                                     sideSpaceClass="mr-30"
//                                     // Pass multiple filter functions
//                                     addCategoryFilter={addCategoryFilter}
//                                     addColorFilter={addColorFilter}
//                                     addSizeFilter={addSizeFilter}
//                                     setPriceRangeFilter={setPriceRangeFilter}
//                                     setRatingFilter={setRatingFilter}
//                                     setStockFilter={setStockFilter}
//                                     activeFilters={activeFilters}
//                                 />

//                                 {/* Active Filters Display */}
//                                 {getActiveFilterCount() > 0 && (
//                                     <div className="active-filters mt-4 p-3 border rounded">
//                                         <div className="d-flex justify-content-between align-items-center mb-2">
//                                             <h6 className="mb-0">Active Filters ({getActiveFilterCount()})</h6>

//                                         </div>

//                                         {/* Category filters */}
//                                         {activeFilters.categories.map(category => (
//                                             <span key={category} className="badge bg-primary me-2 mb-2">
//                                                 {category}
//                                                 <button
//                                                     className="btn-close btn-close-white ms-1"
//                                                     onClick={() => removeFilter('category', category)}
//                                                     style={{ fontSize: '0.7em' }}
//                                                 ></button>
//                                             </span>
//                                         ))}

//                                         {/* {activeFilters.colors.map(color => (
//                                             <span key={color} className="badge bg-primary me-2 mb-2">
//                                                 {color}
//                                                 <button
//                                                     className="btn-close btn-close-white ms-1"
//                                                     onClick={() => removeFilter('color', color)}
//                                                     style={{ fontSize: '0.7em' }}
//                                                 ></button>
//                                             </span>
//                                         ))} */}

//                                         {/* Size filters
//                                         {activeFilters.sizes.map(size => (
//                                             <span key={size} className="badge bg-warning me-2 mb-2">
//                                                 {size}
//                                                 <button
//                                                     className="btn-close btn-close-white ms-1"
//                                                     onClick={() => removeFilter('size', size)}
//                                                     style={{ fontSize: '0.7em' }}
//                                                 ></button>
//                                             </span>
//                                         ))} */}

//                                         {activeFilters.colors.map(color => (
//   <span key={color} className="badge bg-primary me-2 mb-2">
//     {color}
//     <button
//       className="btn-close btn-close-white ms-1"
//       onClick={() => removeFilter('color', color)}
//       style={{ fontSize: '0.7em' }}
//     ></button>
//   </span>
// ))}

// {activeFilters.sizes.map(size => (
//   <span key={size} className="badge bg-warning me-2 mb-2">
//     {size}
//     <button
//       className="btn-close btn-close-white ms-1"
//       onClick={() => removeFilter('size', size)}
//       style={{ fontSize: '0.7em' }}
//     ></button>
//   </span>
// ))}

//                                     </div>
//                                 )}
//                             </div>

//                             <div className="col-lg-9 order-2 order-lg-2">
//                                 <div className="row">
//                                     <div className="flex-col my-5 flex-row items-center d-flex justify-content-between gap-4">
//                                         {/* Sort Dropdown */}
//                                         <div className="w-100 w-sm-auto" style={{ maxWidth: "200px" }}>
//                                             <select
//                                                 onChange={(e) => getFilterSortParams("filterSort", e.target.value)}
//                                                 className="form-select form-select-lg py-3 pe-5"
//                                                 style={{
//                                                     backgroundImage: `url("data:image/svg+xml,%3Csvg fill='black' width='32' height='32' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
//                                                     backgroundRepeat: "no-repeat",
//                                                     backgroundPosition: "right 1rem center",
//                                                     backgroundSize: "2.5rem",
//                                                 }}
//                                             >
//                                                 <option value="default">Default</option>
//                                                 <option value="priceHighToLow">Price - High to Low</option>
//                                                 <option value="priceLowToHigh">Price - Low to High</option>
//                                             </select>
//                                         </div>

//                                         <div className="w-full sm:w-auto">
//                                             <ShopTopbar
//                                                 getLayout={getLayout}
//                                                 getFilterSortParams={getFilterSortParams}
//                                                 productCount={products.length}
//                                                 sortedProductCount={currentData.length}
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Results info */}
//                                 <div className="mb-3">
//                                     <p className="text-muted">
//                                         Showing {currentData.length} of {sortedProducts.length} results
//                                         {getActiveFilterCount() > 0 && ` (${getActiveFilterCount()} filters applied)`}
//                                     </p>
//                                 </div>

//                                 {/* Shop products */}
//                                 <ShopProducts layout={layout} products={currentData} />

//                                 {/* Pagination */}
//                                 <div className="pro-pagination-style justify-content-between align-items-center text-center mt-10" style={{ display: "flex" }}>
//                                     <p className="pt-5">
//                                         Showing {currentData.length} of {sortedProducts.length} results
//                                     </p>
//                                     <Paginator
//                                         totalRecords={sortedProducts.length}
//                                         pageLimit={pageLimit}
//                                         pageNeighbours={2}
//                                         setOffset={setOffset}
//                                         currentPage={currentPage}
//                                         setCurrentPage={setCurrentPage}
//                                         pageContainerClass="mb-0 mt-0"
//                                         pagePrevText="«"
//                                         pageNextText="»"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </LayoutOne>
//         </Fragment>
//     )
// }

// export default ShopGridStandard;

//new
import { Fragment, useState, useEffect } from "react";
import Paginator from "react-hooks-paginator";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getSortedProducts } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopSidebar from "../../wrappers/product/ShopSidebar";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProducts from "../../wrappers/product/ShopProducts";

const ShopGridStandard = () => {
  const [layout, setLayout] = useState("grid three-column");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState([]);

  // Multiple filter states
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    priceRange: { min: null, max: null },
    brands: [],
    colors: [],
    sizes: [],
    rating: null,
    inStock: false,
  });

  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { products } = useSelector((state) => state.product);
  const pageLimit = 15;
  const location = useLocation();
  const searchState = location.state;

  console.log("searchState", searchState);
  console.log("activeFilters", activeFilters);

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getSortParams = (type, values) => {
    setActiveFilters((prev) => ({
      ...prev,
      [type]: values, // Dynamic key based on filter type
    }));
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
    setSelectedCategory(sortValue);
  };

  // Enhanced filter functions for multiple filters
  const addCategoryFilter = (category) => {
    setActiveFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((cat) => cat !== category)
        : [...prev.categories, category],
    }));
    resetPagination();
  };

  const addBrandFilter = (brand) => {
    setActiveFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
    resetPagination();
  };

  const addColorFilter = (color) => {
    setActiveFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
    resetPagination();
  };

  const addSizeFilter = (size) => {
    setActiveFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
    resetPagination();
  };

  const setPriceRangeFilter = (min, max) => {
    setActiveFilters((prev) => ({
      ...prev,
      priceRange: { min, max },
    }));
    resetPagination();
  };

  const setRatingFilter = (rating) => {
    setActiveFilters((prev) => ({
      ...prev,
      rating: prev.rating === rating ? null : rating,
    }));
    resetPagination();
  };

  const setStockFilter = (inStock) => {
    setActiveFilters((prev) => ({
      ...prev,
      inStock: inStock,
    }));
    resetPagination();
  };

  const clearAllFilters = () => {
    setActiveFilters({
      categories: [],
      colors: [],
      sizes: [],
      priceRange: { min: null, max: null },
      brands: [],
      rating: null,
      inStock: false,
    });
    resetPagination();
  };

  const removeFilter = (filterType, value = null) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev };

      switch (filterType) {
        case "category":
          newFilters.categories = prev.categories.filter(
            (cat) => cat !== value
          );
          break;
        case "color":
          newFilters.colors = prev.colors.filter((c) => c !== value);
          break;
        case "size":
          newFilters.sizes = prev.sizes.filter((s) => s !== value);
          break;
        case "brand":
          newFilters.brands = prev.brands.filter((b) => b !== value);
          break;
        case "price":
          newFilters.priceRange = { min: null, max: null };
          break;
        case "rating":
          newFilters.rating = null;
          break;
        case "stock":
          newFilters.inStock = false;
          break;
        default:
          break;
      }

      return newFilters;
    });
    resetPagination();
  };

  const resetPagination = () => {
    setOffset(0);
    setCurrentPage(1);
  };

  // Enhanced filtering logic
  const applyMultipleFilters = (products) => {
    let filtered = [...products];

    // Search state filters (from navigation)
    if (searchState?.name) {
      const query = searchState.name.toLowerCase();
      filtered = filtered.filter(
        (product) => product.name && product.name.toLowerCase().includes(query)
      );
    }

    if (searchState?.categoryname) {
      const query2 = searchState.categoryname.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          Array.isArray(product.category) &&
          product.category.some((cat) => cat.toLowerCase().trim() === query2)
      );
    }

    // Category filters - FIXED LOGIC
    if (activeFilters.categories.length > 0) {
      console.log("Active category filters:", activeFilters.categories);

      filtered = filtered.filter((product) => {
        // Check if product has categories
        if (!product.category) {
          console.log(
            `Product ${product.id || product.name} has no categories - EXCLUDED`
          );
          return false;
        }

        // Handle both string and array category formats
        const categoriesArray = Array.isArray(product.category)
          ? product.category
          : [product.category];

        // Check for matches with active filters
        const hasMatch = categoriesArray.some((productCategory) => {
          if (!productCategory) return false; // Skip empty/null categories

          const normalizedProductCategory = productCategory
            .toLowerCase()
            .trim();
          return activeFilters.categories.some(
            (filterCategory) =>
              normalizedProductCategory === filterCategory.toLowerCase().trim()
          );
        });

        console.log(
          `Product ${product.id || product.name} categories:`,
          categoriesArray,
          "Match:",
          hasMatch
        );
        return hasMatch;
      });
    }

    // Color filters - FIXED LOGIC
    if (activeFilters.colors.length > 0) {
      console.log("Active color filters:", activeFilters.colors);
      filtered = filtered.filter((product) => {
        let productColors = [];

        // Check multiple possible color sources
        if (
          product.variation &&
          product.variation.length > 0 &&
          product.variation[0].color
        ) {
          productColors = [product.variation[0].color];
        } else if (product.color) {
          productColors = Array.isArray(product.color)
            ? product.color
            : [product.color];
        } else if (product.colors) {
          productColors = Array.isArray(product.colors)
            ? product.colors
            : [product.colors];
        }

        if (productColors.length === 0) {
          console.log(
            `Product ${product.id || product.name} has no colors - EXCLUDED`
          );
          return false;
        }

        // Check for matches with active filters
        const hasMatch = productColors.some((productColor) => {
          if (!productColor) return false;
          const normalizedProductColor = productColor.toLowerCase().trim();
          return activeFilters.colors.some(
            (filterColor) =>
              normalizedProductColor === filterColor.toLowerCase().trim()
          );
        });

        console.log(
          `Product ${product.id || product.name} colors:`,
          productColors,
          "Match:",
          hasMatch
        );
        return hasMatch;
      });
    }

    // Size filters - FIXED LOGIC
    if (activeFilters.sizes.length > 0) {
      console.log("Active size filters:", activeFilters.sizes);

      filtered = filtered.filter((product) => {
        let productSizes = [];

        // Check multiple possible size sources
        if (
          product.variation &&
          product.variation.length > 0 &&
          product.variation[0].size
        ) {
          // Handle array of size objects with name property
          if (Array.isArray(product.variation[0].size)) {
            productSizes = product.variation[0].size.map((sizeObj) =>
              typeof sizeObj === "object" && sizeObj.name
                ? sizeObj.name
                : sizeObj
            );
          } else {
            productSizes = [product.variation[0].size];
          }
        } else if (product.size) {
          productSizes = Array.isArray(product.size)
            ? product.size
            : [product.size];
        } else if (product.sizes) {
          productSizes = Array.isArray(product.sizes)
            ? product.sizes
            : [product.sizes];
        }

        if (productSizes.length === 0) {
          console.log(
            `Product ${product.id || product.name} has no sizes - EXCLUDED`
          );
          return false;
        }

        // Check for matches with active filters
        const hasMatch = productSizes.some((productSize) => {
          if (!productSize) return false;
          const normalizedProductSize = productSize
            .toString()
            .toLowerCase()
            .trim();
          return activeFilters.sizes.some(
            (filterSize) =>
              normalizedProductSize === filterSize.toLowerCase().trim()
          );
        });

        console.log(
          `Product ${product.id || product.name} sizes:`,
          productSizes,
          "Match:",
          hasMatch
        );
        return hasMatch;
      });
    }

    // Price range filter
    if (
      activeFilters.priceRange.min !== null ||
      activeFilters.priceRange.max !== null
    ) {
      filtered = filtered.filter((product) => {
        const price = parseFloat(product.price) || 0;
        const min = activeFilters.priceRange.min;
        const max = activeFilters.priceRange.max;

        if (min !== null && max !== null) {
          return price >= min && price <= max;
        } else if (min !== null) {
          return price >= min;
        } else if (max !== null) {
          return price <= max;
        }
        return true;
      });
    }

    // Brand filter
    if (activeFilters.brands.length > 0) {
      filtered = filtered.filter((product) => {
        const productBrand = product.brand || product.manufacturer;
        if (!productBrand) return false;

        return activeFilters.brands.some(
          (filterBrand) =>
            productBrand.toLowerCase().trim() ===
            filterBrand.toLowerCase().trim()
        );
      });
    }

    // Rating filter
    if (activeFilters.rating !== null) {
      filtered = filtered.filter((product) => {
        const productRating = parseFloat(product.rating) || 0;
        return productRating >= activeFilters.rating;
      });
    }

    // Stock filter
    if (activeFilters.inStock) {
      filtered = filtered.filter((product) => {
        return product.stock > 0 || product.inStock === true;
      });
    }

    return filtered;
  };

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0;
    count += activeFilters.categories.length;
    count += activeFilters.colors.length;
    count += activeFilters.sizes.length;
    count += activeFilters.brands.length;
    if (
      activeFilters.priceRange.min !== null ||
      activeFilters.priceRange.max !== null
    )
      count++;
    if (activeFilters.rating !== null) count++;
    if (activeFilters.inStock) count++;
    return count;
  };

  // Handle URL category parameter - FIXED TO WORK WITH KURTA
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");

    if (category) {
      console.log("URL Category parameter:", category);
      // Set the category filter when coming from navigation
      setActiveFilters((prev) => ({
        ...prev,
        categories: [category], // Set as array since categories is an array
      }));
    } else {
      // Clear category filter if no URL parameter
      setActiveFilters((prev) => ({
        ...prev,
        categories: [],
      }));
    }

    // Reset pagination when category changes
    resetPagination();
  }, [location.search]);

  const categoryList = ["Kurta", "Western_Wear", "Dress", "Top"]; // Added more categories

  // Main filtering and sorting effect
  useEffect(() => {
    let filtered = applyMultipleFilters(products);
    let sortedProducts = getSortedProducts(filtered, sortType, sortValue);
    const filterSortedProducts = getSortedProducts(
      sortedProducts,
      filterSortType,
      filterSortValue
    );
    sortedProducts = filterSortedProducts;
    setSortedProducts(sortedProducts);
    setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
  }, [
    offset,
    products,
    sortType,
    sortValue,
    filterSortType,
    filterSortValue,
    activeFilters,
    searchState?.categoryname,
    searchState?.name,
  ]);

  return (
    <Fragment>
      <SEO
        titleTemplate="Shop Page"
        description="Shop page of Anahee Anahee."
      />

      <LayoutOne headerTop="visible">
        <div className="shop-area pt-10 pb-30">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 order-1 order-lg-1">
                {/* Enhanced shop sidebar with multiple filter functions */}
                <ShopSidebar
                  products={products}
                  getSortParams={getSortParams}
                  sideSpaceClass="mr-30"
                  // Pass multiple filter functions
                  addCategoryFilter={addCategoryFilter}
                  addColorFilter={addColorFilter}
                  addSizeFilter={addSizeFilter}
                  addBrandFilter={addBrandFilter}
                  setPriceRangeFilter={setPriceRangeFilter}
                  setRatingFilter={setRatingFilter}
                  setStockFilter={setStockFilter}
                  activeFilters={activeFilters}
                  categories={categoryList}
                  selectedCategory={selectedCategory}
                />

                {/* Active Filters Display */}
                {getActiveFilterCount() > 0 && (
                  <div className="active-filters mt-4 p-3 border rounded">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0">
                        Active Filters ({getActiveFilterCount()})
                      </h6>
                      <button
                      style={{background:"#ffeaf1"}}
                        className="text-black border-0 fw-bold m-2 font-bold text-sm sm:text-base min-w-[80px] sm:min-w-[100px] px-3 sm:px-4 py-3 sm:py-2 rounded bg-pink-100 hover:bg-pink-200 transition d-flex align-items-center gap-2"
                        onClick={clearAllFilters}
                      >
                        Clear All
                      </button>
                    </div>

                    {/* Category filters */}
                    {activeFilters.categories.map((category) => (
                      <span
                        key={category}
                        className="badge bg-primary me-2 mb-2"
                      >
                        {category}
                        <button
                          className="btn-close btn-close-white ms-1"
                          onClick={() => removeFilter("category", category)}
                          style={{ fontSize: "0.7em" }}
                        ></button>
                      </span>
                    ))}

                    {/* Color filters */}
                    {activeFilters.colors.map((color) => (
                      <span key={color} className="badge bg-success me-2 mb-2">
                        {color}
                        <button
                          className="btn-close btn-close-white ms-1"
                          onClick={() => removeFilter("color", color)}
                          style={{ fontSize: "0.7em" }}
                        ></button>
                      </span>
                    ))}

                    {/* Size filters */}
                    {activeFilters.sizes.map((size) => (
                      <span key={size} className="badge bg-warning me-2 mb-2">
                        {size}
                        <button
                          className="btn-close btn-close-white ms-1"
                          onClick={() => removeFilter("size", size)}
                          style={{ fontSize: "0.7em" }}
                        ></button>
                      </span>
                    ))}

                    {/* Brand filters */}
                    {activeFilters.brands.map((brand) => (
                      <span key={brand} className="badge bg-info me-2 mb-2">
                        {brand}
                        <button
                          className="btn-close btn-close-white ms-1"
                          onClick={() => removeFilter("brand", brand)}
                          style={{ fontSize: "0.7em" }}
                        ></button>
                      </span>
                    ))}

                    {/* Price range filter */}
                    {(activeFilters.priceRange.min !== null ||
                      activeFilters.priceRange.max !== null) && (
                      <span className="badge bg-secondary me-2 mb-2">
                        Price: {activeFilters.priceRange.min || 0} -{" "}
                        {activeFilters.priceRange.max || "∞"}
                        <button
                          className="btn-close btn-close-white ms-1"
                          onClick={() => removeFilter("price")}
                          style={{ fontSize: "0.7em" }}
                        ></button>
                      </span>
                    )}

                    {/* Rating filter */}
                    {activeFilters.rating !== null && (
                      <span className="badge bg-dark me-2 mb-2">
                        Rating: {activeFilters.rating}+ stars
                        <button
                          className="btn-close btn-close-white ms-1"
                          onClick={() => removeFilter("rating")}
                          style={{ fontSize: "0.7em" }}
                        ></button>
                      </span>
                    )}

                    {/* Stock filter */}
                    {activeFilters.inStock && (
                      <span className="badge bg-success me-2 mb-2">
                        In Stock Only
                        <button
                          className="btn-close btn-close-white ms-1"
                          onClick={() => removeFilter("stock")}
                          style={{ fontSize: "0.7em" }}
                        ></button>
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="col-lg-9 order-2 order-lg-2">
                <div className="row">
                  <div className="flex-col flex-row items-center d-flex justify-content-between gap-4">
                    {/* ShopTopbar */}

                    {/* Sort Dropdown */}
                    <div
                      className="w-100 mb-4 mt-40 w-sm-auto price-low-high"
                      style={{ maxWidth: "200px" }}
                    >
                      <select
                        onChange={(e) =>
                          getFilterSortParams("filterSort", e.target.value)
                        }
                        className="form-select form-select-lg py-3 pe-5 fs-4"
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
  );
};

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
//     const getSortParams = (sortType, sortValue) => {
//         setSortType(sortType);
//         setSortValue(sortValue);
//             setSelectedCategory(sortValue);
//     }

//     const getFilterSortParams = (sortType, sortValue) => {
//         setFilterSortType(sortType);
//         setFilterSortValue(sortValue);
//     }

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
//     )
// }
// export default ShopGridStandard;

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
//                         
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
