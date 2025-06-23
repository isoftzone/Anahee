// // import React, { useEffect, useState } from "react";
// // import PropTypes from "prop-types";
// // import axios from "axios";
// // import { setActiveSort } from "../../helpers/product";
// // import { BASE_URL } from "../../config";
// // import Accordion from 'react-bootstrap/Accordion';
// // const ShopCategories = ({ getSortParams }) => {
// //   const [categories, setCategories] = useState([]);
// //   // Fetch categories from the backend
// //   useEffect(() => {
// //     const fetchCategories = async () => {
// //       try {
// //         const response = await axios.get(`${BASE_URL}/getcmbAW`, {
// //           params: {
// //             TblName: "MASTER",
// //             FldName: "PRIMENAME",
// //             FldCode: "PRIMEKEYID",
// //             OrdBy: "SEQUENCE",
// //             WhFldName: ["Category"],
// //           },
// //         });
// //         console.log("API Response:", response.data);
// //         if (Array.isArray(response.data)) {
// //           setCategories(response.data);
// //         } else if (response.data.Category && Array.isArray(response.data.Category)) {
// //           setCategories(response.data.Category);
// //         } else {
// //           console.error("Unexpected API response format:", response.data);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching categories:", error);
// //       }
// //     };
// //     fetchCategories();
// //   }, []);
// //   return (
// //     <div className="sidebar-widget mt-40">
// //       <Accordion.Item eventKey="0">
// //       <Accordion.Header><h4 className="pro-sidebar-title">Categories</h4></Accordion.Header>
// //       <Accordion.Body>
// //       <div className="sidebar-widget-list mt-20">
// //         {categories.length > 0 ? (
// //           <ul>
// //             <li>
// //               <div className="sidebar-widget-list-left">
// //                 <button
// //                   onClick={(e) => {
// //                     getSortParams("category", "");
// //                     setActiveSort(e);
// //                   }}
// //                 >
// //                   <span className="checkmark" /> All Categories
// //                 </button>
// //               </div>
// //             </li>
// //             {categories.map((category, key) => (
// //               <li key={key}>
// //                 <div className="sidebar-widget-list-left">
// //                   <button
// //                     onClick={(e) => {
// //                       getSortParams("category", category.PRIMENAME);
// //                       setActiveSort(e);
// //                     }}
// //                   >
// //                     <span className="checkmark" /> {category.PRIMENAME}
// //                   </button>
// //                 </div>
// //               </li>
// //             ))}
// //           </ul>
// //         ) : (
// //           <p>No categories found</p>
// //         )}
// //       </div>
// //       </Accordion.Body>
// //       </Accordion.Item>
// //     </div>
// //   );
// // };
// // ShopCategories.propTypes = {
// //   getSortParams: PropTypes.func,
// // };
// // export default ShopCategories;
// import PropTypes from "prop-types";
// import { setActiveSort } from "../../helpers/product";
// import Accordion from 'react-bootstrap/Accordion';
// import { useTranslation } from "react-i18next";
// import { useState } from "react";

// const ShopCategories = ({ categories, getSortParams,selectedCategory }) => {
//     const [selectedCategories, setSelectedCategories] = useState([]);
//       // const [categories, setCategories] = useState([]);

//   const { t } = useTranslation();
//   const handleToggle = (value) => {
//     const newSelection =
//       value === ""
//         ? []
//         : selectedCategories.includes(value)
//         ? selectedCategories.filter((c) => c !== value)
//         : [...selectedCategories, value];

//     setSelectedCategories(newSelection);
//     getSortParams("categories", newSelection);
//   };

//   const isSelected = (value) => {
//     return value === ""
//       ? selectedCategories.length === 0
//       : selectedCategories.includes(value);
//   };
//   return (
//     <div className="sidebar-widget mb-4">
//         <Accordion.Item eventKey="0">
//     <Accordion.Header><h4 className="pro-sidebar-title">{t("Categories")}</h4></Accordion.Header>
//     <Accordion.Body>
//       <div className="sidebar-widget-list">
//         {categories ? (
//           <ul>
//             <li>
//                <div className="sidebar-widget-list-left">
//                     <button
//                       onClick={() => handleToggle("")}
//                       className={isSelected("") ? "active" : ""}
//                     >
//                         <span className="checkmark" /> {t("All Categories")}
//                       {/* <span className="checkmark" /> All Categories */}
//                     </button>
//                   </div>
//             </li>
//             {categories.map((category, key) => {
//               return (
//                 <li key={key}>
//                  <div className="sidebar-widget-list-left">
//                       {/* <button
//                         onClick={() => handleToggle(category)}
//                         className={isSelected(category) ? "active" : ""}
//                       >
//                         <span className="checkmark" /> {category}
//                       </button> */}
//                           <button
//                       onClick={(e) => {
//                         getSortParams("category", category);
//                         setActiveSort(e);
//                       }}
//                       className={selectedCategory === category ? "active" : ""}
//                     >
//                       <span className="checkmark" /> {t(category)}
//                     </button>
//                     </div>
//                 </li>
//               );
//             })}
//           </ul>
//         ) : (
//           "No categories found"
//         )}
//       </div>
//        </Accordion.Body>
//       </Accordion.Item>
//     </div>
//   );
// };
// ShopCategories.propTypes = {
//    categories: PropTypes.array.isRequired,
//   getSortParams: PropTypes.func.isRequired,
//   selectedCategory: PropTypes.string
// };
// export default ShopCategories;



import { useState } from "react";
import PropTypes from "prop-types";
import Accordion from "react-bootstrap/Accordion";
const ShopCategories = ({ categories, getSortParams }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const handleToggle = (value) => {
    const newSelection =
      value === ""
        ? []
        : selectedCategories.includes(value)
        ? selectedCategories.filter((c) => c !== value)
        : [...selectedCategories, value];
    setSelectedCategories(newSelection);
    getSortParams("categories", newSelection);
  };
  const isSelected = (value) => {
    return value === ""
      ? selectedCategories.length === 0
      : selectedCategories.includes(value);
  };
  return (
    <div className="sidebar-widget">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <h4 className="pro-sidebar-title">Categories</h4>
        </Accordion.Header>
        <Accordion.Body>
          <div className="sidebar-widget-list mt-30">
            {categories ? (
              <ul>
                <li>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={() => handleToggle("")}
                      className={isSelected("") ? "active" : ""}
                    >
                      <span className="checkmark" /> All Categories
                    </button>
                  </div>
                </li>
                {categories.map((category, key) => (
                  <li key={key}>
                    <div className="sidebar-widget-list-left">
                      <button
                        onClick={() => handleToggle(category)}
                        className={isSelected(category) ? "active" : ""}
                      >
                        <span className="checkmark" /> {category}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              "No categories found"
            )}
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </div>
  );
};
export default ShopCategories;

