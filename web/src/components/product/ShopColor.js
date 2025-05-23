// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import axios from "axios";
// import { setActiveSort } from "../../helpers/product";
// import { BASE_URL } from "../../config";
// import Accordion from 'react-bootstrap/Accordion';
// const ShopColor = ({ getSortParams }) => {
//   const [colors, setColors] = useState([]);
// useEffect(() => {
//   const fetchColors = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/getAllColors`);
//       console.log("COLOR", response.data);
//       // Backend already returns a flat array of unique colors
//       const uniqueColors = response.data; // Limit to first 5
//       setColors(uniqueColors);
//     } catch (error) {
//       console.error("Error fetching colors:", error);
//     }
//   };
//   fetchColors();
// }, []);
//   return (
//     <div className="sidebar-widget mt-50">
//       <Accordion.Item eventKey="1">
//         <Accordion.Header><h4 className="pro-sidebar-title">Color</h4></Accordion.Header>
//         <Accordion.Body>
//           <div className="sidebar-widget-list mt-20">
//             {colors.length > 0 ? (
//               <ul>
//                 <li>
//                   <div className="sidebar-widget-list-left">
//                     <button
//                       onClick={(e) => {
//                         getSortParams("color", "");
//                         setActiveSort(e);
//                       }}
//                     >
//                       <span className="checkmark" /> All Colors
//                     </button>
//                   </div>
//                 </li>
//                 {colors.map((COLOR, key) => (
//                   <li key={key}>
//                     <div className="sidebar-widget-list-left">
//                       <button
//                         onClick={(e) => {
//                           getSortParams("color", COLOR);
//                           setActiveSort(e);
//                         }}
//                       >
//                         <span className="checkmark" /> {COLOR}
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               "No colors found"
//             )}
//           </div>
//         </Accordion.Body>
//       </Accordion.Item>
//     </div>
//   );
// };
// ShopColor.propTypes = {
//   getSortParams: PropTypes.func,
// };
// export default ShopColor;
import PropTypes from "prop-types";
import { setActiveSort } from "../../helpers/product";
import Accordion from 'react-bootstrap/Accordion';
const ShopColor = ({ colors, getSortParams }) => {
  return (
    <div className="sidebar-widget mt-50">
     <Accordion.Item eventKey="1">
         <Accordion.Header><h4 className="pro-sidebar-title">Color</h4></Accordion.Header>
                  <Accordion.Body>
      <div className="sidebar-widget-list mt-20">
        {colors ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={(e) => {
                    getSortParams("color", "");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> All Colors{" "}
                </button>
              </div>
            </li>
            {colors.map((color, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={(e) => {
                        getSortParams("color", color);
                        setActiveSort(e);
                      }}
                    >
                      <span className="checkmark" /> {color}{" "}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No colors found"
        )}
      </div>
      </Accordion.Body>
       </Accordion.Item>
    </div>
  );
};
ShopColor.propTypes = {
  colors: PropTypes.array,
  getSortParams: PropTypes.func,
};
export default ShopColor;