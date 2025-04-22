// const express = require("express");
// const con = require('../config')

//  exports.getItem = async (req, res) => {
//     await con.query('SELECT * FROM itemmaster', (err, result) => {
//          if (err) {
//              throw err;
//          }
//          res.json(result);
//      });
//  };

const express = require("express");
const con = require("../config"); // Ensure this is correctly set up
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mysql = require("mysql"); // Ensure MySQL is properly required

// const con = require("../config");

const router = express.Router();

// const storage = multer.diskStorage({
//   destination: "public/images/banner/",
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });                      // original
// const con = mysql.createConnection({
//     host: "4.213.43.18",
//   user: "isrbs",
//   password: "isoft@1209ISZ",
//   database: "madhuban",
//   port: 3306,
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/banner/"); // Save in "public/images/banner" folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images/banner/"); // Save in "public/images/banner" folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

const upload = multer({ storage: storage }).array("images", 5); // 'images' is the field name, 5 is the max number of files
// const upload = multer({ storage: storage }).array('PHOTO', 5); // 'PHOTO' is the field name, 5 is the max number of files

// Add a New Item

// ✅ Add Item
// exports.addItem = async (req, res) => {
//     const {
//         barcode, itemid, lookup, product, brand, i_size, color, style, unit, category,
//         rate, tax, purprice, mrp, status, remark, buyer, season, gender, material,
//         company, subgroup, subcategory, packing, markup,
//         saleprice, section, discount, sup_color, itemtype
//     } = req.body;

//     const image = req.file ? req.file.filename : null;

//     const newItem = {
//         barcode, itemid, lookup, product, brand, i_size, color, style, unit, category,
//         rate, tax, purprice, mrp, status, remark, buyer, season, gender, material,
//         company, subgroup, subcategory, packing, markup,
//         saleprice, section, discount, sup_color, itemtype, photo: image
//     };

//     try {
//         await con.query('INSERT INTO itemmaster SET ?', newItem, (err, result) => {
//             if (err) {
//                 console.error("❌ Error inserting item:", err);
//                 return res.status(500).json({ error: "Database error" });
//             }
//             res.json({ success: true, message: "✅ Item added successfully!", itemID: result.insertId });
//         });
//     } catch (error) {
//         console.error("❌ Unexpected error:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };

// exports.addItem = async (req, res) => {
//     console.log("Received Data:", req.body); // Debugging

// // barcode, itemid, lookup, product, brand, i_size, color, style, unit, category,
// //         rate, tax, purprice, mrp, status, remark, buyer, season, gender, material,
// //         company, subgroup, subcategory, packing, markup,
// //         saleprice, section, discount, sup_color, itemtype

//     const {
//         Barcode, ItemName, BoxSize, HSNCode, Rate, Tax, PurPrice, MarkUp, MRP, MarkDown,
//         SalePrice, ExpiryDays, LookUp, Remark, Product, Brand, sColor, Color, I_Size, Style,
//         SubGroup, Gender, Buyer, SubCategory, Category, Material, Company, Season,
//         Packing, Unit, Section, Status,
//     } = req.body;

//     const image = req.file ? req.file.filename : null; // Handle Image Upload

//     const newItem = {
//         Barcode, ItemName, BoxSize, HSNCode, Rate, Tax, PurPrice, MarkUp, MRP, MarkDown,
//         SalePrice, ExpiryDays, LookUp, Remark, Product, Brand, sColor, Color, I_Size, Style,
//         SubGroup, Gender, Buyer, SubCategory, Category, Material, Company, Season,
//         Packing, Unit, Section, Status, photo: image
//     };

//     console.log("New Item Object:", newItem); // Debugging

//     try {
//         con.query('INSERT INTO itemmaster SET ?', newItem, (err, result) => {
//             if (err) {
//                 console.error("❌ Error inserting item:", err);
//                 return res.status(500).json({ error: "Database error" });
//             }
//             console.log("✅ Insert Success:", result);
//             res.json({ success: true, message: "Item added successfully!", itemID: result.insertId });
//         });
//     } catch (error) {
//         console.error("❌ Unexpected error:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };

// exports.addItem = async (req, res) => {
//     console.log("Received Data:", req.body); // Debugging

//     const {
//        CompanyID, Barcode, ItemName, ItemId, BoxSize, HSNCode, Rate, Tax, PurPrice, MarkUp, MRP, MarkDown,
//         SalePrice, ExpiryDays, LookUp, Remark, Product, Brand, sColor, Color, I_Size, Style,
//         SubGroup, Gender, Buyer, SubCategory, Category, Material, Company, Season,
//         Packing, Unit, Section, Status,
//     } = req.body;

//     const image = req.file ? req.file.filename : null; // Handle Image Upload

//     const newItem = {
//         CompanyID, Barcode, ItemName, ItemId, BoxSize, HSNCode, Rate, Tax, PurPrice, MarkUp, MRP, MarkDown,
//         SalePrice, ExpiryDays, LookUp, Remark, Product, Brand, sColor, Color, I_Size, Style,
//         SubGroup, Gender, Buyer, SubCategory, Category, Material, Company, Season,
//         Packing, Unit, Section, Status, photo: image
//     };

//     console.log("New Item Object:", newItem); // Debugging

//     try {
//         con.query('INSERT INTO itemmaster SET ?', newItem, (err, result) => {
//             if (err) {
//                 console.error("❌ Error inserting item:", err);
//                 return res.status(500).json({ error: "Database error" });
//             }
//             console.log("✅ Insert Success:", result);
//             res.json({ success: true, message: "Item added successfully!", itemID: result.insertId });
//         });
//     } catch (error) {
//         console.error("❌ Unexpected error:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };

// exports.addItem = async (req, res) => {
//     console.log("Received Data:", req.body); // Debugging

//     const {
//         CompanyID, Barcode, ItemName, ItemId, BoxSize, HSNCode, Rate, Tax, PurPrice, MarkUp, MRP, MarkDown,
//         SalePrice, ExpiryDays, LookUp, Remark, Product, Brand, sColor, Color, I_Size, Style,
//         SubGroup, Gender, Buyer, SubCategory, Category, Material, Company, Season,
//         Packing, Unit, Section, Status,image
//     } = req.body;

//     // const images = req.files ? req.files.map(file => file.filename) : [];
//     const images = req.files ? req.files.map(file => `/images/banner/${file.filename}`) : [];

//     const newItem = {
//         CompanyID, Barcode, ItemName, ItemId, BoxSize, HSNCode, Rate, Tax, PurPrice, MarkUp, MRP, MarkDown,
//         SalePrice, ExpiryDays, LookUp, Remark, Product, Brand, sColor, Color, I_Size, Style,
//         SubGroup, Gender, Buyer, SubCategory, Category, Material, Company, Season, image,
//         Packing, Unit, Section, Status, PHOTO: JSON.stringify(images) // Store images as JSON string
//     };

//     console.log("New Item Object:", newItem); // Debugging

//     try {
//         con.query('INSERT INTO itemmaster SET ?', newItem, (err, result) => {
//             if (err) {
//                 console.error("❌ Error inserting item:", err);
//                 return res.status(500).json({ error: "Database error" });
//             }
//             console.log("✅ Insert Success:", result);
//             res.json({ success: true, message: "Item added successfully!", itemID: result.insertId });
//         });
//     } catch (error) {
//         console.error("❌ Unexpected error:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };

exports.addItem = async (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      console.error("❌ Error uploading files:", err);
      return res.status(500).json({ error: "File upload error" });
    }

    const {
      CompanyID,
      Barcode,
      ItemName,
      ItemId,
      BoxSize,
      HSNCode,
      Rate,
      Tax,
      PurPrice,
      MarkUp,
      MRP,
      MarkDown,
      SalePrice,
      ExpiryDays,
      LookUp,
      Remark,
      Product,
      Brand,
      sColor,
      Color,
      I_Size,
      Style,
      SubGroup,
      Gender,
      Buyer,
      SubCategory,
      Category,
      Material,
      Company,
      Season,
      Packing,
      Unit,
      Section,
      Status,
      DESCRIPTION,
    } = req.body;
    let images = req.body.images;
    if (typeof images === "object") {
      images = JSON.stringify(images); // Convert to JSON string
    }

    // const uploadedImages  = req.files ? req.files.map(file => `public/images/banner/${file.filename}`) : [];
    // const uploadedImages = req.file.originalname;
    const newItem = {
      CompanyID,
      Barcode,
      ItemName,
      ItemId,
      BoxSize,
      HSNCode,
      Rate,
      Tax,
      PurPrice,
      MarkUp,
      MRP,
      MarkDown,
      SalePrice,
      ExpiryDays,
      LookUp,
      Remark,
      Product,
      Brand,
      sColor,
      Color,
      I_Size,
      Style,
      SubGroup,
      Gender,
      Buyer,
      SubCategory,
      Category,
      Material,
      Company,
      Season,
      Packing,
      Unit,
      Section,
      Status,
      DESCRIPTION,
    };
    //images, PHOTO: JSON.stringify(uploadedImages ) // Store images as JSON string

    console.log("New Item Object:", newItem); // Debugging

    try {
      con.query("INSERT INTO itemmaster SET ?", newItem, (err, result) => {
        if (err) {
          console.error("❌ Error inserting item:", err);
          return res.status(500).json({ error: "Database error" });
        }
        console.log("✅ Insert Success:", result);
        res.json({
          success: true,
          message: "Item added successfully!",
          itemID: result.insertId,
        });
      });
    } catch (error) {
      console.error("❌ Unexpected error:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
};

// exports.addItem = async (req, res) => {

//     console.log("Received Data:", req.body); // Debugging
//     console.log("Received File:", req.file); // Debugging

//     const {
//         CompanyID, Barcode, ItemName, ItemId, BoxSize, HSNCode, Rate, Tax, PurPrice, MarkUp, MRP, MarkDown,
//         SalePrice, ExpiryDays, LookUp, Remark, Product, Brand, sColor, Color, I_Size, Style,
//         SubGroup, Gender, Buyer, SubCategory, Category, Material, Company, Season,
//         Packing, Unit, Section, Status,
//     } = req.body;

//     const image = req.file ? req.file.filename : null; // Handle Image Upload

//     const newItem = {
//         CompanyID, Barcode, ItemName, ItemId, BoxSize, HSNCode, Rate, Tax, PurPrice, MarkUp, MRP, MarkDown,
//         SalePrice, ExpiryDays, LookUp, Remark, Product, Brand, sColor, Color, I_Size, Style,
//         SubGroup, Gender, Buyer, SubCategory, Category, Material, Company, Season,
//         Packing, Unit, Section, Status, photo: image
//     };

//     console.log("New Item Object:", newItem); // Debugging

//     try {
//         con.query('INSERT INTO itemmaster SET ?', newItem, (err, result) => {
//             if (err) {
//                 console.error("❌ Error inserting item:", err);
//                 return res.status(500).json({ error: "Database error" });
//             }
//             console.log("✅ Insert Success:", result);
//             res.json({ success: true, message: "Item added successfully!", itemID: result.insertId });
//         });
//     } catch (error) {
//         console.error("❌ Unexpected error:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };

// ✅ Get Items

exports.getItems = (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT 
        itemmaster.*,
        itemimage.*
    FROM itemmaster
    LEFT JOIN itemimage ON itemmaster.ITEMID = itemimage.ITEMID
    WHERE itemmaster.ITEMID = ?;
`;

  con.query(query, [id], (err, result) => {
    if (err) {
      console.error("❌ Error fetching items:", err);
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json({ success: true, data: result[0] });
  });
};

exports.getallitems = (req, res) => {
  const query = `
    SELECT 
        itemmaster.*, 
        itemimage.PHOTO 
    FROM itemmaster
    LEFT JOIN itemimage ON itemmaster.ITEMID = itemimage.ITEMID ORDER BY itemmaster.ITEMID ASC;
    `;

  con.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching items:", err);
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }
    // console.log("results",results);
    // Process each item to match the required format
    const transformedItems = results.map((item) => {
      return {
        id: String(item.ITEMID),
        sku: item.BARCODE, // Use the BARCODE as SKU
        name: item.ITEMNAME, // Item name
        price: item.SALEPRICE, // Sale price
        discount: item.DISCOUNT ? item.DISCOUNT : 0, // Default to 0 if DISCOUNT is null
        offerEnd: "2024-10-05 12:11:00", // Static value for offerEnd, you might want to change this
        new: false, // Static value, can be set dynamically
        rating: 4, // Placeholder for rating, adjust as needed
        saleCount: 54, // Placeholder for sale count, adjust as needed
        category: item.CATEGORY ? [item.CATEGORY] : [], // Assuming CATEGORY is a string, convert to array
        tag: ["fashion", "men", "jacket", "full sleeve"], // Static tags, adjust as needed
        variation: [
          {
            color: item.COLOR, // Use color from the data
            image: (item.PHOTO && item.PHOTO.split(",")[0]) || "", // Use the first image in PHOTO if it exists
            size: [
              { name: "x", stock: 3 },
              { name: "m", stock: 2 },
              { name: "xl", stock: 5 },
            ],
          },
        ],
        image: (item.PHOTO && item.PHOTO.split(",")) || [], // Split PHOTO into an array of images if it exists, otherwise return empty array
        // shortDescription: "Short description here",  // Placeholder for short description
        shortDescription: item.DESCRIPTION,
        fullDescription: "Full description here", // Placeholder for full description
      };
    });

    // Send the transformed data
    res.json({ success: true, data: transformedItems });
  });
};

// ✅ Update Item
// exports.updateItem = async (req, res) => {
//     const { id } = req.params;
//     const {
//         barcode, itemid, lookup, product, brand, i_size, color, style, unit, category,
//         rate, tax, purprice, mrp, status, remark, buyer, season, gender, material,
//         company, subgroup, subcategory, packing, boxing, boxsize, markup,
//         saleprice, section, discount, sup_color, itemtype
//     } = req.body;

//     const updatedItem = {
//         barcode, itemid, lookup, product, brand, i_size, color, style, unit, category,
//         rate, tax, purprice, mrp, status, remark, buyer, season, gender, material,
//         company, subgroup, subcategory, packing, boxing, boxsize, markup,
//         saleprice, section, discount, sup_color, itemtype
//     };

//     if (req.file) {
//         updatedItem.photo = req.file.filename;
//     }

//     try {
//         await con.query("UPDATE itemmaster SET ? WHERE id = ?", [updatedItem, id], (err, result) => {
//             if (err) {
//                 console.error("❌ Error updating item:", err);
//                 return res.status(500).json({ error: "Database error" });
//             }
//             res.json({ success: true, message: "✅ Item updated successfully!" });
//         });
//     } catch (error) {
//         console.error("❌ Unexpected error:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };

// exports.updateItem = async (req, res) => {
//     const { id } = req.params; // Ensure id is coming from URL params

//     if (!id) {
//         return res.status(400).json({ error: "Missing item ID" });
//     }

//     const updatedItem = {
//         barcode: req.body.barcode,
//         ItemId: req.body.ItemId,
//         lookup: req.body.lookup,
//         product: req.body.product,
//         brand: req.body.brand,
//         i_size: req.body.i_size,
//         color: req.body.color,
//         style: req.body.style,
//         unit: req.body.unit,
//         category: req.body.category,
//         rate: req.body.rate,
//         tax: req.body.tax,
//         purprice: req.body.purprice,
//         mrp: req.body.mrp,
//         status: req.body.status,
//         remark: req.body.remark,
//         buyer: req.body.buyer,
//         season: req.body.season,
//         gender: req.body.gender,
//         material: req.body.material,
//         company: req.body.company,
//         subgroup: req.body.subgroup,
//         subcategory: req.body.subcategory,
//         packing: req.body.packing,
//         // boxing: req.body.boxing,
//         boxsize: req.body.boxsize,
//         markup: req.body.markup,
//         saleprice: req.body.saleprice,
//         section: req.body.section,
//         discount: req.body.discount,
//         sup_color: req.body.sup_color,
//         itemtype: req.body.itemtype,
//     };

//     if (req.file) {
//         updatedItem.photo = req.file.filename;
//     }

//     try {
//         await con.query(
//             "UPDATE itemmaster SET ? WHERE ItemId = ?",
//             [updatedItem, id],
//             (err, result) => {
//                 if (err) {
//                     console.error("❌ Error updating item:", err);
//                     return res.status(500).json({ error: "Database error" });
//                 }
//                 res.json({ success: true, message: "✅ Item updated successfully!" });
//             }
//         );
//     } catch (error) {
//         console.error("❌ Unexpected error:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };

// ✅ Delete Item
exports.updateItem = async (req, res) => {
  const { id } = req.params; // Ensure id is coming from URL params
  console.log("Received Item ID for Update:", id);

  if (!id) {
    return res.status(400).json({ error: "Missing item ID" });
  }

  const editId = Number(id); // Convert id to a number
  if (isNaN(editId)) {
    return res.status(400).json({ error: "Invalid item ID" });
  }

  const images = req.files ? req.files.map((file) => file.filename) : [];

  // Initialize updatedItem object
  const updatedItem = {};

  // Update fields only if they are present in the request body and not empty
  if (req.body.BARCODE) updatedItem.BARCODE = req.body.BARCODE;
  if (req.body.ITEMNAME) updatedItem.ITEMNAME = req.body.ITEMNAME;
  if (req.body.BOXSIZE) updatedItem.BOXSIZE = req.body.BOXSIZE;
  if (req.body.HSNCODE) updatedItem.HSNCODE = req.body.HSNCODE;
  if (req.body.RATE && req.body.RATE !== "")
    updatedItem.RATE = req.body.RATE; // Check if RATE is provided
  else if (req.body.RATE === "") updatedItem.RATE = null; // Set to NULL if RATE is empty

  if (req.body.TAX) updatedItem.TAX = req.body.TAX;
  if (req.body.PURPRICE) updatedItem.PURPRICE = req.body.PURPRICE;
  if (req.body.MARKUP) updatedItem.MARKUP = req.body.MARKUP;
  if (req.body.MRP) updatedItem.MRP = req.body.MRP;
  if (req.body.MARKDOWN) updatedItem.MARKDOWN = req.body.MARKDOWN;
  if (req.body.SALEPRICE) updatedItem.SALEPRICE = req.body.SALEPRICE;
  if (req.body.EXPIRYDAYS) updatedItem.EXPIRYDAYS = req.body.EXPIRYDAYS;
  if (req.body.LOOKUP) updatedItem.LOOKUP = req.body.LOOKUP;
  if (req.body.REMARK) updatedItem.REMARK = req.body.REMARK;
  if (req.body.PRODUCT) updatedItem.PRODUCT = req.body.PRODUCT;
  if (req.body.BRAND) updatedItem.BRAND = req.body.BRAND;
  if (req.body.SCOLOR) updatedItem.SCOLOR = req.body.SCOLOR;
  if (req.body.COLOR) updatedItem.COLOR = req.body.COLOR;
  if (req.body.I_SIZE) updatedItem.I_SIZE = req.body.I_SIZE;
  if (req.body.STYLE) updatedItem.STYLE = req.body.STYLE;
  if (req.body.SUBGROUP) updatedItem.SUBGROUP = req.body.SUBGROUP;
  if (req.body.GENDER) updatedItem.GENDER = req.body.GENDER;
  if (req.body.BUYER) updatedItem.BUYER = req.body.BUYER;
  if (req.body.SUBCATEGORY) updatedItem.SUBCATEGORY = req.body.SUBCATEGORY;
  if (req.body.CATEGORY) updatedItem.CATEGORY = req.body.CATEGORY;
  if (req.body.MATERIAL) updatedItem.MATERIAL = req.body.MATERIAL;
  if (req.body.COMPANY) updatedItem.COMPANY = req.body.COMPANY;
  if (req.body.SEASON) updatedItem.SEASON = req.body.SEASON;
  if (req.body.PACKING) updatedItem.PACKING = req.body.PACKING;

  // If UNIT is provided and is not empty, update, else set to NULL
  if (req.body.UNIT && req.body.UNIT !== "") updatedItem.UNIT = req.body.UNIT;
  else if (req.body.UNIT === "") updatedItem.UNIT = null;

  if (req.body.SECTION) updatedItem.SECTION = req.body.SECTION;
  if (req.body.STATUS) updatedItem.STATUS = req.body.STATUS;
  if (req.body.DESCRIPTION) updatedItem.DESCRIPTION = req.body.DESCRIPTION;

  // If there are images, include them in the update
  if (images.length > 0) {
    updatedItem.PHOTO = JSON.stringify(images); // Store images as JSON string
  }

  try {
    // Perform the update query
    await con.query(
      "UPDATE itemmaster SET ? WHERE ItemId = ?",
      [updatedItem, editId],
      (err, result) => {
        if (err) {
          console.error("❌ Error updating item:", err);
          return res.status(500).json({ error: "Database error" });
        }
        res.json({ success: true, message: "✅ Item updated successfully!" });
      }
    );
  } catch (error) {
    console.error("❌ Unexpected error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// exports.deleteItem = async (req, res) => {
//     const { id } = req.params;

//     try {
//         await con.query("DELETE FROM itemmaster WHERE ItemId = ?", [id], (err, result) => {
//             if (err) {
//                 console.error("❌ Error deleting item:", err);
//                 return res.status(500).json({ error: "Database error" });
//             }
//             res.json({ success: true, message: "✅ Item deleted successfully!" });
//         });
//     } catch (error) {
//         console.error("❌ Unexpected error:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };

exports.deleteItem = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Missing item ID" });
  }

  const deleteId = Number(id); // Convert id to a number
  if (isNaN(deleteId)) {
    return res.status(400).json({ error: "Invalid item ID" });
  }

  try {
    await con.query(
      "DELETE FROM itemmaster WHERE ItemId = ?",
      [deleteId],
      (err, result) => {
        if (err) {
          console.error("❌ Error deleting item:", err);
          return res.status(500).json({ error: "Database error" });
        }
        res.json({ success: true, message: "✅ Item deleted successfully!" });
      }
    );
  } catch (error) {
    console.error("❌ Unexpected error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get distinct values for dropdowns
// exports.getDropdownValues = async (req, res) => {
//     try {
//         const queries = {
//             Product: "SELECT PRIMENAME FROM master where codetype = 'Product' ",
//             brand: "SELECT DISTINCT brand FROM itemmaster",
//             i_size: "SELECT DISTINCT i_size FROM itemmaster",
//             // i_size: "SELECT DISTINCT i_size FROM itemmaster",
//             color: "SELECT DISTINCT color FROM itemmaster",
//             style: "SELECT DISTINCT style FROM itemmaster",
//             unit: "SELECT DISTINCT unit FROM itemmaster",
//             category: "SELECT DISTINCT category FROM itemmaster",
//             subgroup: "SELECT DISTINCT subgroup FROM itemmaster",
//             group: "SELECT DISTINCT i_group FROM itemmaster",
//             subcategory: "SELECT DISTINCT subcategory FROM itemmaster",
//             gender: "SELECT DISTINCT gender FROM itemmaster",
//             buyer: "SELECT DISTINCT buyer FROM itemmaster",
//             material: "SELECT DISTINCT material FROM itemmaster",
//             company: "SELECT DISTINCT company FROM itemmaster",
//             season: "SELECT DISTINCT season FROM itemmaster",
//             packing: "SELECT DISTINCT packing FROM itemmaster",
//             // dealer: "SELECT DISTINCT dealer FROM itemmaster",
//             section: "SELECT DISTINCT section FROM itemmaster",
//             status: "SELECT DISTINCT status FROM itemmaster"
//         };

//         const results = {};

//         // Run each query
//         for (const key in queries) {
//             await con.query(queries[key], (err, result) => {
//                 if (err) {
//                     console.error(`❌ Error fetching ${key}:`, err);
//                 } else {
//                     results[key] = result.map(row => row[key]); // Extract unique values
//                 }
//                 // Send response after processing all queries
//                 if (Object.keys(results).length === Object.keys(queries).length) {
//                     res.json(results);
//                 }
//             });
//         }
//     } catch (error) {
//         console.error("❌ Unexpected error:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };

exports.postcsbAW = (req, res) => {
  const { TblName, FldName, FldCode, OrdBy, WhFldName } = req.body;
  console.log(req.body);

  if (!Array.isArray(WhFldName)) {
    return res.status(400).json({ error: "WhFldName must be an array" });
  }

  const results = {};
  const queries = WhFldName.map((field) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT ${FldName}, ${FldCode} FROM ${TblName} WHERE Codetype = '${field}' ORDER BY ${OrdBy}, ${FldName}`;
      con.query(query, (err, rows) => {
        if (err) {
          return reject(err);
        }
        results[field] = rows;
        resolve();
      });
    });
  });

  Promise.all(queries)
    .then(() => res.json(results))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Database query failed" });
    });
};

exports.getcmbAW = (req, res) => {
  const { TblName, FldName, FldCode, OrdBy } = req.query;
  let WhFldName = req.query.WhFldName;

  // Ensure WhFldName is an array (in case it's a single value, convert it)
  if (!WhFldName) {
    return res.status(400).json({ error: "WhFldName is required" });
  }
  if (!Array.isArray(WhFldName)) {
    WhFldName = [WhFldName]; // Convert to array if it's a single value
  }

  console.log(req.query);

  const results = {};
  const queries = WhFldName.map((field) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT ${FldName}, ${FldCode} FROM ${TblName} WHERE Codetype = '${field}' ORDER BY ${OrdBy}, ${FldName}`;
      con.query(query, (err, rows) => {
        if (err) {
          return reject(err);
        }
        results[field] = rows;
        resolve();
      });
    });
  });

  Promise.all(queries)
    .then(() => res.json(results))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Database query failed" });
    });
};
