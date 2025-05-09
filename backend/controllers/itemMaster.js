// const express = require("express");
// const con = require("../config"); // Ensure this is correctly set up
// const multer = require("multer");
// const mysql = require("mysql"); // Ensure MySQL is properly required

// const router = express.Router();


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images/banner/"); // Save in "public/images/banner" folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });


// const upload = multer({ storage: storage }).array("images", 5); // 'images' is the field name, 5 is the max number of files


// exports.addItem = async (req, res) => {
//   upload(req, res, function (err) {
//     if (err) {
//       console.error("❌ Error uploading files:", err);
//       return res.status(500).json({ error: "File upload error" });
//     }

//     const {
//       CompanyID,
//       Barcode,
//       ItemName,
//       ItemId,
//       BoxSize,
//       HSNCode,
//       Rate,
//       Tax,
//       PurPrice,
//       MarkUp,
//       MRP,
//       MarkDown,
//       SalePrice,
//       ExpiryDays,
//       LookUp,
//       Remark,
//       Product,
//       Brand,
//       sColor,
//       Color,
//       I_Size,
//       Style,
//       SubGroup,
//       Gender,
//       Buyer,
//       SubCategory,
//       Category,
//       Material,
//       Company,
//       Season,
//       Packing,
//       Unit,
//       Section,
//       Status,
//       DESCRIPTION,
//       Product_Details,
//     } = req.body;
//     let images = req.body.images;
//     if (typeof images === "object") {
//       images = JSON.stringify(images); // Convert to JSON string
//     }

//     // const uploadedImages  = req.files ? req.files.map(file => `public/images/banner/${file.filename}`) : [];
//     // const uploadedImages = req.file.originalname;
//     const newItem = {
//       CompanyID,
//       Barcode,
//       ItemName,
//       ItemId,
//       BoxSize,
//       HSNCode,
//       Rate,
//       Tax,
//       PurPrice,
//       MarkUp,
//       MRP,
//       MarkDown,
//       SalePrice,
//       ExpiryDays,
//       LookUp,
//       Remark,
//       Product,
//       Brand,
//       sColor,
//       Color,
//       I_Size,
//       Style,
//       SubGroup,
//       Gender,
//       Buyer,
//       SubCategory,
//       Category,
//       Material,
//       Company,
//       Season,
//       Packing,
//       Unit,
//       Section,
//       Status,
//       DESCRIPTION,
//       Product_Details,
//     };
//     //images, PHOTO: JSON.stringify(uploadedImages ) // Store images as JSON string

//     console.log("New Item Object:", newItem); // Debugging

//     try {
//       con.query("INSERT INTO itemmaster SET ?", newItem, (err, result) => {
//         if (err) {
//           console.error("❌ Error inserting item:", err);
//           return res.status(500).json({ error: "Database error" });
//         }
//         console.log("✅ Insert Success:", result);
//         res.json({
//           success: true,
//           message: "Item added successfully!",
//           itemID: result.insertId,
//         });
//       });
//     } catch (error) {
//       console.error("❌ Unexpected error:", error);
//       res.status(500).json({ error: "Server error" });
//     }
//   });
// };

const express = require("express");
const con = require("../config");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const router = express.Router();


// Configure storage for item images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "public/images/banner/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'item-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB per file
    files: 50,                  // Max 50 files
    fieldSize: 5 * 1024 * 1024, // ⬅️ Increase max field size to 5MB (adjust as needed)
    fields: 100                 // Optional: increase number of non-file fields
  }
}).any();

router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

exports.addItem = (req, res) => { console.log('colled');
  upload(req, res, async (err) => {
    if (err) {
      console.error("❌ Upload error:", err);
      return res.status(500).json({
        success: false,
        message: "File upload failed",
        error: err.message
      });
    }

    try {
      // 1. Insert main item data
      const itemData = {
        CompanyID: req.body.CompanyID,
        Barcode: req.body.Barcode,
        ItemName: req.body.ItemName,
        ItemId: req.body.ItemId,
        BoxSize: req.body.BoxSize,
        HSNCode: req.body.HSNCode,
        Rate: req.body.Rate,
        Tax: req.body.Tax,
        PurPrice: req.body.PurPrice,
        MarkUp: req.body.MarkUp,
        MRP: req.body.MRP,
        MarkDown: req.body.MarkDown,
        SalePrice: req.body.SalePrice,
        ExpiryDays: req.body.ExpiryDays,
        LookUp: req.body.LookUp,
        Remark: req.body.Remark,
        Product: req.body.Product,
        Brand: req.body.Brand,
        sColor: req.body.sColor,
        Color: req.body.Color,
        I_Size: req.body.I_Size,
        Style: req.body.Style,
        SubGroup: req.body.SubGroup,
        Gender: req.body.Gender,
        Buyer: req.body.Buyer,
        SubCategory: req.body.SubCategory,
        Category: req.body.Category,
        Material: req.body.Material,
        Company: req.body.Company,
        Season: req.body.Season,
        Packing: req.body.Packing,
        Unit: req.body.Unit,
        Section: req.body.Section,
        Status: req.body.Status,
        DESCRIPTION: req.body.DESCRIPTION,
        Product_Details: req.body.Product_Details
      };

      // Insert item
      con.query("INSERT INTO itemmaster SET ?", itemData, async (err, result) => {
        if (err) {
          console.error("❌ Error inserting item:", err);
          return res.status(500).json({ error: "Database error" });
        }

        const itemId = result.insertId;

        // Process variations if present
        if (req.body.variations) {
          const variations = JSON.parse(req.body.variations);
          const files = req.files || [];

          // Map files to variations
          const variationImages = {};
          files.forEach(file => {
            const matches = file.fieldname.match(/variation_(\d+)_image_(\d+)/);
            if (matches) {
              const varIndex = matches[1];
              if (!variationImages[varIndex]) {
                variationImages[varIndex] = [];
              }
              variationImages[varIndex].push(`/images/banner/${file.filename}`);
            }
          });

          // Use promises to manage inserts
          for (const [index, variation] of variations.entries()) {
            const photoUrls = variationImages[index]?.join(',') || '';

            const variationInsertResult = await new Promise((resolve, reject) => {
              con.query(`INSERT INTO variations (ITEMID, color, PHOTO) VALUES (?, ?, ?)`, 
                [itemId, variation.color, photoUrls], 
                (err, result) => {
                  if (err) return reject(err);
                  resolve(result);
              });
            });

            const variationId = variationInsertResult.insertId;

            // Insert sizes
            if (variation.sizes?.length) {
              const sizeValues = variation.sizes.map(size => [variationId, size.name, size.stock || 0]);
              await new Promise((resolve, reject) => {
                con.query(`INSERT INTO variationsizes (variation_id, size, stock) VALUES ?`, 
                  [sizeValues], (err, result) => {
                  if (err) return reject(err);
                  resolve(result);
                });
              });
            }
          }
        }

        // Final response after all inserts
        res.json({
          success: true,
          message: "Item added successfully with all variations!",
          itemId: itemId
        });
      });

    } catch (error) {
      console.error("❌ Processing error:", error);
      res.status(500).json({
        success: false,
        message: "Item save failed",
        error: error.message
      });
    }
  });
};

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
              { name: item.I_SIZE, stock:item.MAXQTY }
            ],
          },
        ],
        image: (item.PHOTO && item.PHOTO.split(",")) || [], // Split PHOTO into an array of images if it exists, otherwise return empty array
        // shortDescription: "Short description here",  // Placeholder for short description
        shortDescription: item.DESCRIPTION,
        fullDescription: "Full description here", // Placeholder for full description
        Product_Details: item.PRODUCT_DETAILS, // Assuming Product_Details is a string, convert to array
      };
    });

    // Send the transformed data
    res.json({ success: true, data: transformedItems });
  });
};

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
  if (req.body.Product_Details) updatedItem.Product_Details = req.body.Product_Details;

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
