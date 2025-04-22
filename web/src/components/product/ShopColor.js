import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { setActiveSort } from "../../helpers/product";
import { BASE_URL } from "../../config";
import Accordion from 'react-bootstrap/Accordion';

const ShopColor = ({ getSortParams }) => {
  const [colors, setColors] = useState([]);

  // Fetch colors from the backend
  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getcmbAW`, {
          params: {
            TblName: "MASTER",
            FldName: "PRIMENAME",
            FldCode: "PRIMEKEYID",
            OrdBy: "SEQUENCE",
            WhFldName: ["Colour"],
          },
        });

        //console.log(response);

        if (Array.isArray(response.data)) {
          setColors(response.data);
        } else if (response.data.Colour && Array.isArray(response.data.Colour)) {
          setColors(response.data.Colour);
        } else {
          console.error("Unexpected API response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };

    fetchColors();
  }, []);

  return (
    <div className="sidebar-widget mt-50">
      <Accordion.Item eventKey="1">
      <Accordion.Header><h4 className="pro-sidebar-title">Color</h4></Accordion.Header>
      <Accordion.Body>
      <div className="sidebar-widget-list mt-20">
        {colors.length > 0 ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={(e) => {
                    getSortParams("color", "");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> All Colors
                </button>
              </div>
            </li>
            {colors.map((color, key) => (
              <li key={key}>
                <div className="sidebar-widget-list-left">
                  <button
                    onClick={(e) => {
                      getSortParams("color", color.PRIMENAME);
                      setActiveSort(e);
                    }}
                  >
                    <span className="checkmark" /> {color.PRIMENAME}
                  </button>
                </div>
              </li>
            ))}
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
  getSortParams: PropTypes.func,
};

export default ShopColor;
