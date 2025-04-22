import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { setActiveSort } from "../../helpers/product";
import { BASE_URL } from "../../config";
import Accordion from 'react-bootstrap/Accordion';

const ShopCategories = ({ getSortParams }) => {
  const [categories, setCategories] = useState([]);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getcmbAW`, {
          params: {
            TblName: "MASTER",
            FldName: "PRIMENAME",
            FldCode: "PRIMEKEYID",
            OrdBy: "SEQUENCE",
            WhFldName: ["Category"],
          },
        });

        console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else if (response.data.Category && Array.isArray(response.data.Category)) {
          setCategories(response.data.Category);
        } else {
          console.error("Unexpected API response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="sidebar-widget mt-40">
      <Accordion.Item eventKey="0">
      <Accordion.Header><h4 className="pro-sidebar-title">Categories</h4></Accordion.Header>
      <Accordion.Body>
      <div className="sidebar-widget-list mt-20">
        {categories.length > 0 ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={(e) => {
                    getSortParams("category", "");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> All Categories
                </button>
              </div>
            </li>
            {categories.map((category, key) => (
              <li key={key}>
                <div className="sidebar-widget-list-left">
                  <button
                    onClick={(e) => {
                      getSortParams("category", category.PRIMENAME);
                      setActiveSort(e);
                    }}
                  >
                    <span className="checkmark" /> {category.PRIMENAME}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No categories found</p>
        )}
      </div>
      </Accordion.Body>
      </Accordion.Item>
    </div>
  );
};

ShopCategories.propTypes = {
  getSortParams: PropTypes.func,
};

export default ShopCategories;