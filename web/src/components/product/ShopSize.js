import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { setActiveSort } from "../../helpers/product";
import { BASE_URL } from "../../config";
import Accordion from 'react-bootstrap/Accordion';

const ShopSize = ({ getSortParams }) => {
  const [sizes, setSizes] = useState([]);

  // Fetch sizes from the backend
  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getcmbAW`, {
          params: {
              TblName: 'MASTER',
              FldName: 'PRIMENAME',
              FldCode: 'PRIMEKEYID',
              OrdBy: 'SEQUENCE',
              WhFldName: ['Size']
          }
      });


      
        setSizes(response.data);
        console.log(response)
        if (Array.isArray(response.data)) {
          setSizes(response.data);
        } else if (response.data.Size && Array.isArray(response.data.Size)) {
          setSizes(response.data.Size);
        } else {
          console.error("Unexpected API response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    };

    fetchSizes();
  }, []);

  return (
    <div className="sidebar-widget mt-40">
      <Accordion.Item eventKey="2">
      <Accordion.Header><h4 className="pro-sidebar-title">Size</h4></Accordion.Header>
      <Accordion.Body>
      <div className="sidebar-widget-list mt-20">
        {sizes.length > 0 ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={(e) => {
                    getSortParams("size", "");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> All Sizes{" "}
                </button>
              </div>
            </li>
            {sizes.map((size, key) => (
              <li key={key}>
                <div className="sidebar-widget-list-left">
                  <button
                    className="text-uppercase"
                    onClick={(e) => {
                      getSortParams("size", size.PRIMENAME);
                      setActiveSort(e);
                    }}
                  >
                    <span className="checkmark" />
                    {size.PRIMENAME}{" "}
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
  getSortParams: PropTypes.func,
};

export default ShopSize;
