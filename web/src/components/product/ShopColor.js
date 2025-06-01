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

// import PropTypes from "prop-types";
// import { setActiveSort } from "../../helpers/product";
// import Accordion from 'react-bootstrap/Accordion';
// const ShopColor = ({ colors, getSortParams }) => {
//   return (
//     <div className="sidebar-widget mt-50">
//      <Accordion.Item eventKey="1">
//          <Accordion.Header><h4 className="pro-sidebar-title">Color</h4></Accordion.Header>
//                   <Accordion.Body>
//       <div className="sidebar-widget-list mt-20">
//         {colors ? (
//           <ul>
//             <li>
//               <div className="sidebar-widget-list-left">
//                 <button
//                   onClick={(e) => {
//                     getSortParams("color", "");
//                     setActiveSort(e);
//                   }}
//                 >
//                   <span className="checkmark" /> All Colors{" "}
//                 </button>
//               </div>
//             </li>
//             {colors.map((color, key) => {
//               return (
//                 <li key={key}>
//                   <div className="sidebar-widget-list-left">
//                     <button
//                       onClick={(e) => {
//                         getSortParams("color", color);
//                         setActiveSort(e);
//                       }}
//                     >
//                       <span className="checkmark" /> {color}{" "}
//                     </button>
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//         ) : (
//           "No colors found"
//         )}
//       </div>
//       </Accordion.Body>
//        </Accordion.Item>
//     </div>
//   );
// };
// ShopColor.propTypes = {
//   colors: PropTypes.array,
//   getSortParams: PropTypes.func,
// };
// export default ShopColor;