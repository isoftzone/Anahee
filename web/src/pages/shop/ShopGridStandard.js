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
    // <Fragment>
    //   <SEO
    //     titleTemplate="Shop Page"
    //     description="Shop page of Anahee Anahee."
    //   />

    //   <LayoutOne headerTop="visible">
    //     {/* breadcrumb */}
    //     {/* <Breadcrumb 
    //                 pages={[
    //                     {label: "Home", path: process.env.PUBLIC_URL + "/" },
    //                     {label: "Shop", path: process.env.PUBLIC_URL + pathname }
    //                 ]} 
    //             /> */}

    //     <div className="shop-area pt-10 pb-30">
    //       <div className="container-fluid">
    //         <div className="row">
    //           <div className="col-lg-3 order-1 order-lg-1">
    //             {/* shop sidebar */}
    //             <ShopSidebar
    //               products={products}
    //               getSortParams={getSortParams}
    //               sideSpaceClass="mr-30"
    //             />
    //           </div>
    //           <div className="col-lg-9 order-2 order-lg-2">
    //             <div className="row">
    //               <div className="flex-col my-5 flex-row  items-center d-flex justify-content-between gap-4">
    //                 {/* ShopTopbar */}

    //                 {/* Sort Dropdown */}
    //                 <div
    //                   className="w-100 w-sm-auto"
    //                   style={{ maxWidth: "200px" }}
    //                 >
    //                   <select
    //                     onChange={(e) =>
    //                       getFilterSortParams("filterSort", e.target.value)
    //                     }
    //                     className="form-select form-select-lg py-3 pe-5"
    //                     style={{
    //                       backgroundImage: `url("data:image/svg+xml,%3Csvg fill='black' width='32' height='32' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
    //                       backgroundRepeat: "no-repeat",
    //                       backgroundPosition: "right 1rem center",
    //                       backgroundSize: "2.5rem",
    //                     }}
    //                   >
    //                     <option value="default">Default</option>
    //                     <option value="priceHighToLow">
    //                       Price - High to Low
    //                     </option>
    //                     <option value="priceLowToHigh">
    //                       Price - Low to High
    //                     </option>
    //                   </select>
    //                 </div>
    //                 <div className="w-full sm:w-auto">
    //                   <ShopTopbar
    //                     getLayout={getLayout}
    //                     getFilterSortParams={getFilterSortParams}
    //                     productCount={products.length}
    //                     sortedProductCount={currentData.length}
    //                   />
    //                 </div>
    //               </div>
    //             </div>
    //             {/* shop topbar default */}

    //             {/* shop page content default */}
    //             <ShopProducts layout={layout} products={currentData} />

    //             {/* shop product pagination */}

    //             <div
    //               className=" pro-pagination-style justify-content-between align-items-center text-center mt-10"
    //               style={{ display: "flex" }}
    //             >
    //               <p className="pt-5">
    //                 Showing{currentData.length} of {products.length} result
    //               </p>
    //               <Paginator
    //                 totalRecords={sortedProducts.length}
    //                 pageLimit={pageLimit}
    //                 pageNeighbours={2}
    //                 setOffset={setOffset}
    //                 currentPage={currentPage}
    //                 setCurrentPage={setCurrentPage}
    //                 pageContainerClass="mb-0 mt-0"
    //                 pagePrevText="«"
    //                 pageNextText="»"
    //               />
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </LayoutOne>
    // </Fragment>
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
    }
    const getFilterSortParams = (sortType, sortValue) => {
        setFilterSortType(sortType);
        setFilterSortValue(sortValue);
    }
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