const con = require("../config");

exports.addItem = (req, res) => {
  try {
    const item = req.body;

    // Parse variations safely
    const variations = item.variations ? JSON.parse(item.variations) : [];

    const itemData = {
      COMPANYID: item.CompanyID,
      BARCODE: item.Barcode,
      ITEMID: item.ItemId,
      ITEMNAME: item.ItemName,
      BOXSIZE: item.BoxSize,
      HSNCODE: item.HSNCode,
      RATE: item.Rate,
      TAX: item.Tax,
      PURPRICE: item.PurPrice,
      MRP: item.MRP,
      SALEPRICE: item.SalePrice,
      MARKUP: item.MarkUp,
      MARKDOWN: item.MarkDown,
      //EXPIRYDAYS: item.ExpiryDays,
      LOOKUP: item.LookUp,
      REMARK: item.Remark,
      PRODUCT: item.Product,
      BRAND: item.Brand,
      SCOLOR: item.sColor,
      COLOR: item.Color,
      I_SIZE: item.I_Size,
      STYLE: item.Style,
      SUBGROUP: item.SubGroup,
      GENDER: item.Gender,
      BUYER: item.Buyer,
      SUBCATEGORY: item.SubCategory,
      CATEGORY: item.Category,
      MATERIAL: item.Material,
      COMPANY: item.Company,
      SEASON: item.Season,
      PACKING: item.Packing,
      UNIT: item.Unit,
      SECTION: item.Section,
      STATUS: item.Status,
      DESCRIPTION: item.DESCRIPTION,
      PRODUCT_DETAILS: item.Product_Details,
    };

    con.query("INSERT INTO itemmaster SET ?", itemData, async (err, result) => {
      if (err) {
        console.error("Insert Error:", err);
        return res.status(500).json({ error: "Item insert failed" });
      }

      const itemId = result.insertId;

      // Map uploaded files
      const variationImages = {};
      if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
          const match = file.fieldname.match(/variation_(\d+)_image/);
          if (match) {
            const varIndex = match[1];
            if (!variationImages[varIndex]) {
              variationImages[varIndex] = [];
            }
            variationImages[varIndex].push(
              file.originalname.replace(/\s+/g, "-")
            );
          }
        });
      }

      for (let i = 0; i < variations.length; i++) {
        const variation = variations[i];
        const photoUrls = variationImages[i]?.join(",") || "";

        const variationInsert = await new Promise((resolve, reject) => {
          con.query(
            "INSERT INTO variations (ITEMID, color, PHOTO) VALUES (?, ?, ?)",
            [itemId, variation.color, photoUrls],
            (err, res) => (err ? reject(err) : resolve(res))
          );
        });

        const variationId = variationInsert.insertId;

        if (variation.sizes?.length) {
          const sizes = variation.sizes.map((s) => [
            variationId,
            s.name,
            s.stock || 0,
          ]);
          await new Promise((resolve, reject) => {
            con.query(
              "INSERT INTO variationsizes (variation_id, size, stock) VALUES ?",
              [sizes],
              (err, res) => (err ? reject(err) : resolve(res))
            );
          });
        }
      }

      res.json({
        success: true,
        message: "Item added with variations",
        itemId,
      });
    });
  } catch (error) {
    console.error("Processing Error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
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
            size: [{ name: item.I_SIZE, stock: item.MAXQTY }],
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

exports.items = (req, res) => {
  console.log("called all items");
  const query = `SELECT * FROM itemmaster ORDER BY ITEMID ASC;`;

  con.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching items:", err);
      return res.status(500).json({
        error: "Database error",
        details: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }

    return res.json({
      success: true,
      data: results,
    });
  });
};

exports.getItemsById = (req, res) => {
  const { id } = req.params;

  // Select only necessary fields from itemmaster
  const query = `
    SELECT 
        im.ITEMID, im.ITEMNAME, im.BARCODE, im.BOXSIZE, im.HSNCODE,
        im.RATE, im.TAX, im.PURPRICE, im.MRP, im.SALEPRICE,
        im.MARKUP, im.MARKDOWN, im.EXPIRYDAYS, im.LOOKUP, im.REMARK,
        im.PRODUCT, im.BRAND, im.SCOLOR, im.COLOR, im.I_SIZE, im.STYLE,
        im.SUBGROUP, im.GENDER, im.BUYER, im.SUBCATEGORY, im.CATEGORY,
        im.MATERIAL, im.COMPANY, im.SEASON, im.PACKING, im.UNIT,
        im.SECTION, im.STATUS, im.DESCRIPTION, im.PRODUCT_DETAILS, im.PHOTO,
        v.id AS variation_id,
        v.color AS variation_color,
        v.PHOTO AS variation_photos,
        vs.id AS size_id,
        vs.size AS size_name,
        vs.stock AS size_stock
    FROM itemmaster im
    LEFT JOIN variations v ON im.ITEMID = v.ITEMID
    LEFT JOIN variationsizes vs ON v.id = vs.variation_id
    WHERE im.ITEMID = ?
    ORDER BY v.id, vs.id;
  `;

  con.query(query, [id], (err, results) => {
    if (err) {
      console.error("❌ Error fetching item details:", err);
      return res.status(500).json({
        success: false,
        error: "Database error",
        details: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Item not found",
      });
    }

    // Extract base item data from first row
    const baseItem = {};
    const itemFields = [
      "ITEMID",
      "ITEMNAME",
      "BARCODE",
      "BOXSIZE",
      "HSNCODE",
      "RATE",
      "TAX",
      "PURPRICE",
      "MRP",
      "SALEPRICE",
      "MARKUP",
      "MARKDOWN",
      "EXPIRYDAYS",
      "LOOKUP",
      "REMARK",
      "PRODUCT",
      "BRAND",
      "SCOLOR",
      "COLOR",
      "I_SIZE",
      "STYLE",
      "SUBGROUP",
      "GENDER",
      "BUYER",
      "SUBCATEGORY",
      "CATEGORY",
      "MATERIAL",
      "COMPANY",
      "SEASON",
      "PACKING",
      "UNIT",
      "SECTION",
      "STATUS",
      "DESCRIPTION",
      "PRODUCT_DETAILS",
      "PHOTO",
    ];

    itemFields.forEach((field) => {
      baseItem[field] = results[0][field] || null;
    });

    const item = {
      ...baseItem,
      variations: [],
    };

    // Process variations and sizes
    const variationsMap = new Map();

    results.forEach((row) => {
      if (row.variation_id && !variationsMap.has(row.variation_id)) {
        const variation = {
          id: row.variation_id,
          color: row.variation_color || "",
          images: row.variation_photos
            ? row.variation_photos
                .split(",")
                .map((img) => img.trim())
                .filter((img) => img)
            : [],
          sizes: [],
        };
        variationsMap.set(row.variation_id, variation);
        item.variations.push(variation);
      }

      if (row.size_id && row.variation_id) {
        const variation = variationsMap.get(row.variation_id);
        if (variation) {
          variation.sizes.push({
            id: row.size_id,
            name: row.size_name || "",
            stock: row.size_stock || 0,
          });
        }
      }
    });

    res.json({
      success: true,
      data: item,
    });
  });
};

exports.updateItemById = async (req, res) => { console.log('updateItemById called')
  try {
    const item = req.body;
    const itemId = item['ITEMID'];; // Since this is an update
    const variations = item.variations ? JSON.parse(item.variations) : [];
    console.log('variations',variations);
    const itemData = {
      COMPANYID: item.COMPANYID,
      BARCODE: item.BARCODE,
      ITEMNAME: item.ITEMNAME,
      BOXSIZE: item.BOXSIZE,
      HSNCODE: item.HSNCODE,
      RATE: item.RATE,
      TAX: item.TAX,
      PURPRICE: item.PURPRICE,
      MRP: item.MRP,
      SALEPRICE: item.SALEPRICE,
      MARKUP: item.MARKUP,
      MARKDOWN: item.MARKDOWN,
      LOOKUP: item.LOOKUP,
      REMARK: item.REMARK,
      PRODUCT: item.PRODUCT,
      BRAND: item.BRAND,
      SCOLOR: item.SCOLOR,
      COLOR: item.COLOR,
      I_SIZE: item.I_SIZE,
      STYLE: item.STYLE,
      SUBGROUP: item.SUBGROUP,
      GENDER: item.GENDER,
      BUYER: item.BUYER,
      SUBCATEGORY: item.SUBCATEGORY,
      CATEGORY: item.CATEGORY,
      MATERIAL: item.MATERIAL,
      COMPANY: item.COMPANY,
      SEASON: item.SEASON,
      PACKING: item.PACKING,
      UNIT: item.UNIT,
      SECTION: item.SECTION,
      STATUS: item.STATUS,
      DESCRIPTION: item.DESCRIPTION,
      PRODUCT_DETAILS: item.Product_Details,
    };

    // First, update the itemmaster table
    con.query(
      "UPDATE itemmaster SET ? WHERE ITEMID = ?",
      [itemData, itemId],
      async (err, result) => {
        if (err) {
          console.error("Update Error:", err);
          return res.status(500).json({ error: "Item Update failed" });
        }

        // Step 1: Delete existing variation sizes
        con.query(
          "SELECT id FROM variations WHERE ITEMID = ?",
          [itemId],
          async (err, variationRows) => {
            if (err) {
              console.error("Variation fetch error:", err);
              return res
                .status(500)
                .json({ error: "Error fetching existing variations" });
            }

            const variationIds = variationRows.map((row) => row.id);
            if (variationIds.length > 0) {
              await new Promise((resolve, reject) => {
                con.query(
                  "DELETE FROM variationsizes WHERE variation_id IN (?)",
                  [variationIds],
                  (err) => {
                    if (err) return reject(err);
                    resolve();
                  }
                );
              });

              await new Promise((resolve, reject) => {
                con.query(
                  "DELETE FROM variations WHERE ITEMID = ?",
                  [itemId],
                  (err) => {
                    if (err) return reject(err);
                    resolve();
                  }
                );
              });
            }

            // Step 2: Process uploaded files for new images
            const variationImages = {};
            if (req.files && req.files.length > 0) {
              req.files.forEach((file) => {
                const match = file.fieldname.match(/variation_(\d+)_image/);
                if (match) {
                  const varIndex = match[1];
                  if (!variationImages[varIndex]) {
                    variationImages[varIndex] = [];
                  }
                  variationImages[varIndex].push(
                    file.originalname.replace(/\s+/g, "-")
                  );
                }
              });
            }

            // Step 3: Re-insert updated variations and sizes
            for (let i = 0; i < variations.length; i++) {
              const variation = variations[i];
              const photoUrls = variationImages[i]?.join(",") || "";

              const variationInsert = await new Promise((resolve, reject) => {
                con.query(
                  "INSERT INTO variations (ITEMID, color, PHOTO) VALUES (?, ?, ?)",
                  [itemId, variation.color, photoUrls],
                  (err, res) => (err ? reject(err) : resolve(res))
                );
              });

              const variationId = variationInsert.insertId;

              if (variation.sizes?.length) {
                const sizes = variation.sizes.map((s) => [
                  variationId,
                  s.name,
                  s.stock || 0,
                ]);
                await new Promise((resolve, reject) => {
                  con.query(
                    "INSERT INTO variationsizes (variation_id, size, stock) VALUES ?",
                    [sizes],
                    (err, res) => (err ? reject(err) : resolve(res))
                  );
                });
              }
            }

            // Final response
            res.json({
              success: true,
              message: "Item updated with variations",
              itemId,
            });
          }
        );
      }
    );
  } catch (error) {
    console.error("Processing Error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
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
  if (req.body.Product_Details)
    updatedItem.Product_Details = req.body.Product_Details;

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
