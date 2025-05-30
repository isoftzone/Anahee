const con = require("../config");

exports.addItem = (req, res) => {
  try {
    const item = req.body;
    const variations = item.variations ? JSON.parse(item.variations) : [];

    const itemData = {
      COMPANYID: item.CompanyID,
      BARCODE: item.BARCODE,
      ITEMNAME: item.ITEMNAME,
      BOXSIZE: item.BOXSIZE,
      HSNCODE: item.HSNCODE,
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

    // Map uploaded images per variation index
    const variationImages = {};
    if (req.files?.length > 0) {
      for (const file of req.files) {
        const match = file.fieldname.match(/variation_(\d+)_image/);
        if (match) {
          const varIndex = match[1];
          if (!variationImages[varIndex]) variationImages[varIndex] = [];
          variationImages[varIndex].push(
            file.originalname.replace(/\s+/g, "-")
          );
        }
      }
    }

    con.query("INSERT INTO itemmaster SET ?", itemData, async (err, result) => {
      if (err) return res.status(500).json({ error: "Item insert failed" });

      const itemId = result.insertId;

      for (let i = 0; i < variations.length; i++) {
        const variation = variations[i];
        const color = variation.color;
        const imageList = variationImages[i] || [];

        for (const sizeData of variation.sizes || []) {
          const variantData = {
            itemid: itemId,
            size: sizeData.name,
            RATE: sizeData.RATE,
            TAX: sizeData.TAX,
            PURPRICE: sizeData.PURPRICE,
            MARKUP: sizeData.MARKUP,
            MRP: sizeData.MRP,
            MARKDOWN: sizeData.MARKDOWN,
            SALEPRICE: sizeData.SALEPRICE,
            SP1: sizeData.SP1,
            SP2: sizeData.SP2,
            SP3: sizeData.SP3,
            SP4: sizeData.SP4,
            lengthcm: sizeData.lengthcm,
            widthcm: sizeData.widthcm,
            heightcm: sizeData.heightcm,
            volumetricweight: sizeData.volumetricweight,
            netweight: sizeData.netweight,
            grossweight: sizeData.grossweight,
            shippingweight: sizeData.shippingweight,
            color: color,
          };

          const variantInsert = await new Promise((resolve, reject) => {
            con.query(
              "INSERT INTO itemvariants SET ?",
              variantData,
              (err, res) => (err ? reject(err) : resolve(res))
            );
          });

          const variantid = variantInsert.insertId;

          // Insert slab rates
          const slabs = sizeData.slabs || [];
          if (slabs.length > 0) {
            const slabRows = slabs.map((slab) => [
              variantid,
              slab.QuantityFrom,
              slab.QuantityTo,
              slab.SALEPRICE,
              slab.sp1,
              slab.sp2,
              slab.sp3,
              slab.sp4,
            ]);

            await new Promise((resolve, reject) => {
              con.query(
                `INSERT INTO slab_rates 
                (variantid, quantity_from, quantity_to, saleprice, sp1, sp2, sp3, sp4)
                VALUES ?`,
                [slabRows],
                (err, res) => (err ? reject(err) : resolve(res))
              );
            });
          }

          // ✅ Insert images (must be inside the loop where variantid is defined)
          for (const imgName of imageList) {
            try {
              await new Promise((resolve, reject) =>
                con.query(
                  `INSERT INTO itemimages (itemid, variantid, color, image) VALUES (?, ?, ?, ?)`,
                  [itemId, variantid, color, imgName],
                  (err, res) => (err ? reject(err) : resolve(res))
                )
              );
            } catch (err) {
              console.error("Insert Error (itemimage):", err);
            }
          }
        }
      }

      res.json({
        success: true,
        message: "Item, variations, slabs, and images inserted successfully.",
        itemId,
      });
    });
  } catch (error) {
    console.error("Add Item Error:", error);
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

  const query = `
    SELECT 
      im.ITEMID, im.ITEMNAME, im.BARCODE, im.BOXSIZE, im.HSNCODE,
      im.PRODUCT, im.BRAND, im.SCOLOR, im.COLOR, im.I_SIZE, im.STYLE,
      im.SUBGROUP, im.GENDER, im.BUYER, im.SUBCATEGORY, im.CATEGORY,
      im.MATERIAL, im.COMPANY, im.SEASON, im.PACKING, im.UNIT,
      im.SECTION, im.STATUS, im.DESCRIPTION, im.PRODUCT_DETAILS,
      iv.variantid AS variant_id, iv.size AS size_name, iv.color,
      iv.RATE, iv.TAX, iv.PURPRICE, iv.MARKUP, iv.MRP, iv.MARKDOWN, iv.SALEPRICE,
      iv.SP1, iv.SP2, iv.SP3, iv.SP4,
      iv.lengthcm, iv.widthcm, iv.heightcm, iv.volumetricweight,
      iv.netweight, iv.grossweight, iv.shippingweight,

      sr.id AS slab_id, sr.quantity_from, sr.quantity_to,
      sr.saleprice AS slab_saleprice, sr.sp1 AS slab_sp1,
      sr.sp2 AS slab_sp2, sr.sp3 AS slab_sp3, sr.sp4 AS slab_sp4,

      img.image AS image_name

    FROM itemmaster im
    LEFT JOIN itemvariants iv ON im.ITEMID = iv.itemid
    LEFT JOIN slab_rates sr ON iv.variantid = sr.variantid
    LEFT JOIN itemimages img ON iv.variantid = img.variantid AND im.ITEMID = img.itemid
    WHERE im.ITEMID = ?
    ORDER BY iv.variantid, sr.id;
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

    // Build base item
    const itemFields = [
      "ITEMID",
      "ITEMNAME",
      "BARCODE",
      "BOXSIZE",
      "HSNCODE",
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
    ];

    const item = { variations: [] };
    itemFields.forEach((field) => {
      item[field] = results[0][field] || null;
    });

    const variationMap = new Map();

    results.forEach((row) => {
      if (!row.variant_id) return;

      const key = `${row.color}`; // color-level grouping
      if (!variationMap.has(key)) {
        variationMap.set(key, {
          color: row.color || "",
          images: [],
          sizes: [],
        });
        item.variations.push(variationMap.get(key));
      }

      const variation = variationMap.get(key);

      // Add unique images for this color
      if (row.image_name && !variation.images.includes(row.image_name)) {
        variation.images.push(row.image_name);
      }

      // Find or add size
      let size = variation.sizes.find((s) => s.id === row.variant_id);
      if (!size) {
        size = {
          id: row.variant_id,
          name: row.size_name,
          RATE: row.RATE,
          TAX: row.TAX,
          PURPRICE: row.PURPRICE,
          MARKUP: row.MARKUP,
          MRP: row.MRP,
          MARKDOWN: row.MARKDOWN,
          SALEPRICE: row.SALEPRICE,
          SP1: row.SP1,
          SP2: row.SP2,
          SP3: row.SP3,
          SP4: row.SP4,
          lengthcm: row.lengthcm,
          widthcm: row.widthcm,
          heightcm: row.heightcm,
          volumetricweight: row.volumetricweight,
          netweight: row.netweight,
          grossweight: row.grossweight,
          shippingweight: row.shippingweight,
          slabs: [],
        };
        variation.sizes.push(size);
      }

      // Add slab if exists
      if (row.slab_id) {
        size.slabs.push({
          id: row.slab_id,
          QuantityFrom: row.quantity_from,
          QuantityTo: row.quantity_to,
          SALEPRICE: row.slab_saleprice,
          sp1: row.slab_sp1,
          sp2: row.slab_sp2,
          sp3: row.slab_sp3,
          sp4: row.slab_sp4,
        });
      }
    });

    res.json({
      success: true,
      data: item,
    });
  });
};

exports.updateItemById = async (req, res) => {
  try {
    const item = req.body;
    const { id } = req.params;
    const variations = item.variations ? JSON.parse(item.variations) : [];

    const itemData = {
      COMPANYID: item.CompanyID,
      BARCODE: item.BARCODE,
      ITEMNAME: item.ITEMNAME,
      BOXSIZE: item.BOXSIZE,
      HSNCODE: item.HSNCODE,
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

    // 1. Update itemmaster
    con.query(
      "UPDATE itemmaster SET ? WHERE ITEMID = ?",
      [itemData, id],
      async (err) => {
        if (err) return res.status(500).json({ error: "Item update failed" });

        // 2. Delete old itemvariants, slab_rates, and itemimages
        await new Promise((resolve, reject) => {
          con.query(
            `DELETE sr, iv, ii FROM itemvariants iv
          LEFT JOIN slab_rates sr ON iv.variantid = sr.variantid
          LEFT JOIN itemimages ii ON iv.variantid = ii.variantid
          WHERE iv.itemid = ?`,
            [id],
            (err) => (err ? reject(err) : resolve())
          );
        });

        // 3. Map uploaded images per variation index
        const variationImages = {};
        if (req.files && req.files?.length > 0) {
          for (const file of req.files) {
            const match = file.fieldname.match(/variation_(\d+)_image/);
            if (match) {
              const varIndex = match[1];
              if (!variationImages[varIndex]) variationImages[varIndex] = [];
              variationImages[varIndex].push(
                file.originalname.replace(/\s+/g, "-")
              );
            }
          }
        }

        // 4. Re-insert itemvariants, slab_rates, and itemimages
        for (let i = 0; i < variations.length; i++) {
          const variation = variations[i];
          const color = variation.color;
          const imageList = variationImages[i] || [];

          for (const sizeData of variation.sizes || []) {
            const variantData = {
              itemid: id,
              size: sizeData.name,
              RATE: sizeData.RATE,
              TAX: sizeData.TAX,
              PURPRICE: sizeData.PURPRICE,
              MARKUP: sizeData.MARKUP,
              MRP: sizeData.MRP,
              MARKDOWN: sizeData.MARKDOWN,
              SALEPRICE: sizeData.SALEPRICE,
              SP1: sizeData.SP1,
              SP2: sizeData.SP2,
              SP3: sizeData.SP3,
              SP4: sizeData.SP4,
              lengthcm: sizeData.lengthcm,
              widthcm: sizeData.widthcm,
              heightcm: sizeData.heightcm,
              volumetricweight: sizeData.volumetricweight,
              netweight: sizeData.netweight,
              grossweight: sizeData.grossweight,
              shippingweight: sizeData.shippingweight,
              color: color,
            };

            const variantInsert = await new Promise((resolve, reject) => {
              con.query(
                "INSERT INTO itemvariants SET ?",
                variantData,
                (err, res) => (err ? reject(err) : resolve(res))
              );
            });

            const variantid = variantInsert.insertId;

            // Insert slab rates
            const slabs = sizeData.slabs || [];
            if (slabs.length > 0) {
              const slabRows = slabs.map((slab) => [
                variantid,
                slab.QuantityFrom,
                slab.QuantityTo,
                slab.SALEPRICE,
                slab.sp1,
                slab.sp2,
                slab.sp3,
                slab.sp4,
              ]);

              await new Promise((resolve, reject) => {
                con.query(
                  `INSERT INTO slab_rates
                (variantid, quantity_from, quantity_to, saleprice, sp1, sp2, sp3, sp4)
                VALUES ?`,
                  [slabRows],
                  (err, res) => (err ? reject(err) : resolve(res))
                );
              });
            }

            // Insert itemimages
            for (const imgName of imageList) {
              await new Promise((resolve, reject) =>
                con.query(
                  `INSERT INTO itemimages (itemid, variantid, color, image) VALUES (?, ?, ?, ?)`,
                  [id, variantid, color, imgName],
                  (err, res) => (err ? reject(err) : resolve(res))
                )
              );
            }
          }
        }

        res.json({
          success: true,
          message: "Item, variations, slabs, and images updated successfully.",
          id,
        });
      }
    );
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// exports.updateItemById = async (req, res) => {
//   try {
//     const item = req.body;
//     const { id } = req.params;
//     const variations = item.variations ? JSON.parse(item.variations) : [];

//     const itemData = {
//       COMPANYID: item.CompanyID,
//       BARCODE: item.BARCODE,
//       ITEMNAME: item.ITEMNAME,
//       BOXSIZE: item.BOXSIZE,
//       HSNCODE: item.HSNCODE,
//       PRODUCT: item.PRODUCT,
//       BRAND: item.BRAND,
//       SCOLOR: item.SCOLOR,
//       COLOR: item.COLOR,
//       I_SIZE: item.I_SIZE,
//       STYLE: item.STYLE,
//       SUBGROUP: item.SUBGROUP,
//       GENDER: item.GENDER,
//       BUYER: item.BUYER,
//       SUBCATEGORY: item.SUBCATEGORY,
//       CATEGORY: item.CATEGORY,
//       MATERIAL: item.MATERIAL,
//       COMPANY: item.COMPANY,
//       SEASON: item.SEASON,
//       PACKING: item.PACKING,
//       UNIT: item.UNIT,
//       SECTION: item.SECTION,
//       STATUS: item.STATUS,
//       DESCRIPTION: item.DESCRIPTION,
//       PRODUCT_DETAILS: item.Product_Details,
//     };

//     // 1. Update itemmaster
//     con.query(
//       "UPDATE itemmaster SET ? WHERE ITEMID = ?",
//       [itemData, id],
//       async (err) => {
//         if (err) return res.status(500).json({ error: "Item update failed" });

//         // 2. Always delete old variants and slab rates
//         await new Promise((resolve, reject) => {
//           con.query(
//             `DELETE sr, iv FROM itemvariants iv
//           LEFT JOIN slab_rates sr ON iv.variantid = sr.variantid
//           WHERE iv.itemid = ?`,
//             [id],
//             (err) => (err ? reject(err) : resolve())
//           );
//         });

//         // Step 3: Collect uploaded images if any
//         const variationImages = {}; // { "0": [ "newimg1.jpg", "newimg2.jpg" ] }
//         if (req.files?.length > 0) {
//           for (const file of req.files) {
//             const match = file.fieldname.match(/variation_(\d+)_image/);
//             if (match) {
//               const varIndex = match[1];
//               const cleanName = file.originalname.replace(/\s+/g, "-");
//               if (!variationImages[varIndex]) variationImages[varIndex] = [];
//               variationImages[varIndex].push(cleanName);
//             }
//           }

//           // 🔥 Only delete existing images if new images are being uploaded
//           await new Promise((resolve, reject) => {
//             con.query("DELETE FROM itemimages WHERE itemid = ?", [id], (err) =>
//               err ? reject(err) : resolve()
//             );
//           });
//         }
//         // 4. Re-insert itemvariants, slab_rates, and itemimages
//         for (let i = 0; i < variations.length; i++) {
//           const variation = variations[i];
//           const color = variation.color;
//           const imageList = variationImages[i] || variation.images || [];
// console.log("variationImages[i]",variationImages[i]);
// console.log("variation.images[i]",variation.images);

//           for (const sizeData of variation.sizes || []) {
//             const variantData = {
//               itemid: id,
//               size: sizeData.name,
//               RATE: sizeData.RATE,
//               TAX: sizeData.TAX,
//               PURPRICE: sizeData.PURPRICE,
//               MARKUP: sizeData.MARKUP,
//               MRP: sizeData.MRP,
//               MARKDOWN: sizeData.MARKDOWN,
//               SALEPRICE: sizeData.SALEPRICE,
//               SP1: sizeData.SP1,
//               SP2: sizeData.SP2,
//               SP3: sizeData.SP3,
//               SP4: sizeData.SP4,
//               lengthcm: sizeData.lengthcm,
//               widthcm: sizeData.widthcm,
//               heightcm: sizeData.heightcm,
//               volumetricweight: sizeData.volumetricweight,
//               netweight: sizeData.netweight,
//               grossweight: sizeData.grossweight,
//               shippingweight: sizeData.shippingweight,
//               color: color,
//             };

//             const variantInsert = await new Promise((resolve, reject) => {
//               con.query(
//                 "INSERT INTO itemvariants SET ?",
//                 variantData,
//                 (err, res) => (err ? reject(err) : resolve(res))
//               );
//             });

//             const variantid = variantInsert.insertId;

//             // Insert slab rates
//             const slabs = sizeData.slabs || [];
//             if (slabs.length > 0) {
//               const slabRows = slabs.map((slab) => [
//                 variantid,
//                 slab.QuantityFrom,
//                 slab.QuantityTo,
//                 slab.SALEPRICE,
//                 slab.sp1,
//                 slab.sp2,
//                 slab.sp3,
//                 slab.sp4,
//               ]);

//               await new Promise((resolve, reject) => {
//                 con.query(
//                   `INSERT INTO slab_rates 
//                   (variantid, quantity_from, quantity_to, saleprice, sp1, sp2, sp3, sp4)
//                   VALUES ?`,
//                   [slabRows],
//                   (err, res) => (err ? reject(err) : resolve(res))
//                 );
//               });
//             }

//             // Insert images only if any are uploaded
//             // Insert images only if not already inserted and they’re not empty
//             if (imageList.length > 0) {
//               for (const imgName of imageList) {
//                  const urlParts = imgName.dataURL.split('/');
//                  if(urlParts){
//                   imgName = urlParts[urlParts.length - 1];
//                  }
               
//                 await new Promise((resolve, reject) => {
//                   con.query(
//                     `INSERT INTO itemimages (itemid, variantid, color, image) VALUES (?, ?, ?, ?)`,
//                     [id, variantid, color, imgName],
//                     (err) => (err ? reject(err) : resolve())
//                   );
//                 });
//               }
//             }
//           }
//         }

//         res.json({
//           success: true,
//           message:
//             "Item, variations, slabs updated. Images retained if none uploaded.",
//           id,
//         });
//       }
//     );
//   } catch (error) {
//     console.error("Update Error:", error);
//     res.status(500).json({ error: "Server error", details: error.message });
//   }
// };

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

exports.deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Delete related records from itemvariants, slab_rates, and itemimages
    await new Promise((resolve, reject) => {
      con.query(
        `DELETE sr, iv, ii 
         FROM itemvariants iv
         LEFT JOIN slab_rates sr ON iv.variantid = sr.variantid
         LEFT JOIN itemimages ii ON iv.variantid = ii.variantid
         WHERE iv.itemid = ?`,
        [id],
        (err) => (err ? reject(err) : resolve())
      );
    });

    // 2. Delete item from itemmaster
    await new Promise((resolve, reject) => {
      con.query(
        `DELETE FROM itemmaster WHERE ITEMID = ?`,
        [id],
        (err, result) => (err ? reject(err) : resolve(result))
      );
    });

    res.json({
      success: true,
      message: "Item and all related data deleted successfully.",
      id,
    });
  } catch (error) {
    console.error("Delete Error:", error);
    res
      .status(500)
      .json({ error: "Server error during deletion", details: error.message });
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
