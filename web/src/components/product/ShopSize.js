// // // import React, { useEffect, useState } from "react";
// // // import PropTypes from "prop-types";
// // // import axios from "axios";
// // // import { setActiveSort } from "../../helpers/product";
// // // import { BASE_URL } from "../../config";
// // // import Accordion from 'react-bootstrap/Accordion';
// // // const ShopSize = ({ getSortParams }) => {
// // //   const [sizes, setSizes] = useState([]);
// // //   // Fetch sizes from the backend
// // //   useEffect(() => {
// // //     const fetchSizes = async () => {
// // //       try {
// // //         const response = await axios.get(`${BASE_URL}/getcmbAW`, {
// // //           params: {
// // //               TblName: 'MASTER',
// // //               FldName: 'PRIMENAME',
// // //               FldCode: 'PRIMEKEYID',
// // //               OrdBy: 'SEQUENCE',
// // //               WhFldName: ['Size']
// // //           }
// // //       });
// // //         setSizes(response.data);
// // //         console.log(response)
// // //         if (Array.isArray(response.data)) {
// // //           setSizes(response.data);
// // //         } else if (response.data.Size && Array.isArray(response.data.Size)) {
// // //           setSizes(response.data.Size);
// // //         } else {
// // //           console.error("Unexpected API response format:", response.data);
// // //         }
// // //       } catch (error) {
// // //         console.error("Error fetching sizes:", error);
// // //       }
// // //     };
// // //     fetchSizes();
// // //   }, []);
// // //   return (
// // //     <div className="sidebar-widget mt-40">
// // //       <Accordion.Item eventKey="2">
// // //       <Accordion.Header><h4 className="pro-sidebar-title">Size</h4></Accordion.Header>
// // //       <Accordion.Body>
// // //       <div className="sidebar-widget-list mt-20">
// // //         {sizes.length > 0 ? (
// // //           <ul>
// // //             <li>
// // //               <div className="sidebar-widget-list-left">
// // //                 <button
// // //                   onClick={(e) => {
// // //                     getSortParams("size", "");
// // //                     setActiveSort(e);
// // //                   }}
// // //                 >
// // //                   <span className="checkmark" /> All Sizes{" "}
// // //                 </button>
// // //               </div>
// // //             </li>
// // //             {sizes.map((size, key) => (
// // //               <li key={key}>
// // //                 <div className="sidebar-widget-list-left">
// // //                   <button
// // //                     className="text-uppercase"
// // //                     onClick={(e) => {
// // //                       getSortParams("size", size.PRIMENAME);
// // //                       setActiveSort(e);
// // //                     }}
// // //                   >
// // //                     <span className="checkmark" />
// // //                     {size.PRIMENAME}{" "}
// // //                   </button>
// // //                 </div>
// // //               </li>
// // //             ))}
// // //           </ul>
// // //         ) : (
// // //           "No sizes found"
// // //         )}
// // //       </div>
// // //       </Accordion.Body>
// // //       </Accordion.Item>
// // //     </div>
// // //   );
// // // };
// // // ShopSize.propTypes = {
// // //   getSortParams: PropTypes.func,
// // // };
// // // export default ShopSize;
// // import PropTypes from "prop-types";
// // import { setActiveSort } from "../../helpers/product";
// // import Accordion from 'react-bootstrap/Accordion';
// // const ShopSize = ({ sizes, getSortParams }) => {
// //   return (
// //     <div className="sidebar-widget mb-4">
// //       <Accordion.Item eventKey="2">
// //        <Accordion.Header><h4 className="pro-sidebar-title">Size</h4></Accordion.Header>
// //        <Accordion.Body>
// //       <div className="sidebar-widget-list mt-20">
// //         {sizes ? (
// //           <ul>
// //             <li>
// //               <div className="sidebar-widget-list-left">
// //                 <button
// //                   onClick={e => {
// //                     getSortParams("size", "");
// //                     setActiveSort(e);
// //                   }}
// //                 >
// //                   <span className="checkmark" /> All Sizes{" "}
// //                 </button>
// //               </div>
// //             </li>
// //             {sizes.map((size, key) => {
// //               return (
// //                 <li key={key}>
// //                   <div className="sidebar-widget-list-left">
// //                     <button
// //                       className="text-uppercase"
// //                       onClick={e => {
// //                         getSortParams("size", size);
// //                         setActiveSort(e);
// //                       }}
// //                     >
// //                       {" "}
// //                       <span className="checkmark" />
// //                       {size}{" "}
// //                     </button>
// //                   </div>
// //                 </li>
// //               );
// //             })}
// //           </ul>
// //         ) : (
// //           "No sizes found"
// //         )}
// //       </div>
// //        </Accordion.Body>
// //        </Accordion.Item>
// //     </div>
// //   );
// // };
// // ShopSize.propTypes = {
// //   getSortParams: PropTypes.func,
// //   sizes: PropTypes.array
// // };
// // export default ShopSize;

// import PropTypes from "prop-types";
// import Accordion from "react-bootstrap/Accordion";
// const ShopSize = ({ sizes, getSortParams, activeFilters }) => {
//   const handleSizeToggle = (size) => {
//     if (size === "") {
//       // Clear all sizes when "All Sizes" is clicked
//       getSortParams("sizes", []);
//     } else {
//       // Toggle the size selection
//       const newSizes = activeFilters.sizes.includes(size)
//         ? activeFilters.sizes.filter((s) => s !== size)
//         : [...activeFilters.sizes, size];
//       getSortParams("sizes", newSizes);
//     }
//   };
//   const isSizeSelected = (size) => {
//     return size === ""
//       ? activeFilters.sizes.length === 0
//       : activeFilters.sizes.includes(size);
//   };
//   return (
//     <div className="sidebar-widget my-4">
//       <Accordion.Item eventKey="2">
//         <Accordion.Header>
//           <h4 className="pro-sidebar-title">Size</h4>
//         </Accordion.Header>
//         <Accordion.Body>
//           <div className="sidebar-widget-list mt-20">
//             {sizes ? (
//               <ul>
//                 <li>
//                   <div className="sidebar-widget-list-left">
//                     <button
//                       onClick={() => handleSizeToggle("")}
//                       className={isSizeSelected("") ? "active" : ""}
//                     >
//                       <span className="checkmark" /> All Sizes
//                     </button>
//                   </div>
//                 </li>
//                 {sizes.map((size, key) => (
//                   <li key={key}>
//                     <div className="sidebar-widget-list-left">
//                       <button
//                         className={`text-uppercase ${
//                           isSizeSelected(size) ? "active" : ""
//                         }`}
//                         onClick={() => handleSizeToggle(size)}
//                       >
//                         <span className="checkmark" /> {size}
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               "No sizes found"
//             )}
//           </div>
//         </Accordion.Body>
//       </Accordion.Item>
//     </div>
//   );
// };
// ShopSize.propTypes = {
//   sizes: PropTypes.array,
//   getSortParams: PropTypes.func.isRequired,
//   activeFilters: PropTypes.shape({
//     sizes: PropTypes.array,
//   }),
// };
// ShopSize.defaultProps = {
//   sizes: [],
//   activeFilters: { sizes: [] },
// };
// export default ShopSize;


import { useState } from "react";
import PropTypes from "prop-types";
import Accordion from "react-bootstrap/Accordion";
const ShopSize = ({ sizes, getSortParams }) => {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const handleToggle = (value) => {
    const newSelection =
      value === ""
        ? []
        : selectedSizes.includes(value)
        ? selectedSizes.filter((s) => s !== value)
        : [...selectedSizes, value];
    setSelectedSizes(newSelection);
    getSortParams("sizes", newSelection);
  };
  const isSelected = (value) => {
    return value === "" ? selectedSizes.length === 0 : selectedSizes.includes(value);
  };
  return (
    <div className="sidebar-widget my-4">
      <Accordion.Item eventKey="2">
        <Accordion.Header>
          <h4 className="pro-sidebar-title">Size</h4>
        </Accordion.Header>
        <Accordion.Body>
          <div className="sidebar-widget-list mt-20">
            {sizes ? (
              <ul>
                <li>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={() => handleToggle("")}
                      className={isSelected("") ? "active" : ""}
                    >
                      <span className="checkmark" /> All Sizes
                    </button>
                  </div>
                </li>
                {sizes.map((size, key) => (
                  <li key={key}>
                    <div className="sidebar-widget-list-left">
                      <button
                        className={`text-uppercase ${isSelected(size) ? "active" : ""}`}
                        onClick={() => handleToggle(size)}
                      >
                        <span className="checkmark" /> {size}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              "No sizes found"
            )}
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </div>
  );
};
ShopSize.propTypes = {
  sizes: PropTypes.array,
  getSortParams: PropTypes.func.isRequired
};
export default ShopSize;