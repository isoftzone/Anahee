const express = require("express");
const con = require("../config");
exports.getCustomer = async (req, res) => {
  await con.query("SELECT * FROM customermaster", (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
};
// exports.updateCustomerInfo = (req, res) => {
//   const {
//     FNAME,
//     LNAME,
//     email,
//     customerId,
//     MOBILE,
//     CADDRESSLINE1,
//     CCITY,
//     CSTATE,
//     CCOUNTRY,
//     CDISTRICT,
//     CPINCODE,
//     password,
//   } = req.body;
//   if (!customerId) {
//     return res.status(400).json({ error: "Customer ID is missing" });
//   }
//   // Build query
//   const fields = [
//     "FNAME = ?",
//     "LNAME = ?",
//     "email = ?",
//     "MOBILE = ?",
//     "CADDRESSLINE1 = ?",
//     "CCITY = ?",
//     "CSTATE = ?",
//     "CCOUNTRY = ?",
//     "CDISTRICT = ?",
//     "CPINCODE = ?",
//   ];
//   const values = [
//     FNAME,
//     LNAME,
//     email,
//     MOBILE,
//     CADDRESSLINE1,
//     CCITY,
//     CSTATE,
//     CCOUNTRY,
//     CDISTRICT,
//     CPINCODE,
//   ];
//   if (password) {
//     fields.push("password = ?");
//     values.push(password); // plain text password
//   }
//   values.push(customerId); // for WHERE condition
//   const sql = `UPDATE customermaster SET ${fields.join(
//     ", "
//   )} WHERE CUSTOMERID = ?`;
//   con.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Database update error:", err);
//       return res
//         .status(500)
//         .json({ error: "Database update failed", message: err.message });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Customer not found" });
//     }
//     return res
//       .status(200)
//       .json({ message: "Account Information updated successfully" });
//   });
// };

//update customerInfo
// exports.updateCustomerInfo = (req, res) => {
//  let id=req.params.id
//   const {
//     FNAME,
//     LNAME,
//     email,
//     customerId=id,
//     MOBILE,
//     CADDRESSLINE1,
//     CCITY,
//     CSTATE,
//     CCOUNTRY,
//     CDISTRICT,
//     CPINCODE,
//     password,
//   } = req.body;
 
//   if (!customerId) {
//     return res.status(400).json({ error: "Customer ID is missing" });
//   }
//   // Build query
//   const fields = [
//     "FNAME = ?",
//     "LNAME = ?",
//     "email = ?",
//     "MOBILE = ?",
//     "CADDRESSLINE1 = ?",
//     "CCITY = ?",
//     "CSTATE = ?",
//     "CCOUNTRY = ?",
//     "CDISTRICT = ?",
//     "CPINCODE = ?",
//   ];
//   const values = [
//     FNAME,
//     LNAME,
//     email,
//     MOBILE,
//     CADDRESSLINE1,
//     CCITY,
//     CSTATE,
//     CCOUNTRY,
//     CDISTRICT,
//     CPINCODE,
//   ];
//   if (password) {
//     fields.push("password = ?");
//     values.push(password); // plain text password
//   }
//   values.push(customerId); // for WHERE condition
//   const sql = `UPDATE customermaster SET ${fields.join(
//     ", "
//   )} WHERE CUSTOMERID = ?`;
//   con.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Database update error:", err);
//       return res
//         .status(500)
//         .json({ error: "Database update failed", message: err.message });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Customer not found" });
//     }
//     return res
//       .status(200)
//       // .json({ message: "Account Information updated successfully" });
//   });
// };



///update
exports.updateCustomerInfo = (req, res) => {
 let id=req.params.id
  const {
    FNAME,
    LNAME,
    email,
    customerId=id,
    MOBILE,
    CADDRESSLINE1,
    CCITY,
    CSTATE,
    CCOUNTRY,
    CDISTRICT,
    CPINCODE,
    newPassword,
    confirmPassword
  } = req.body;
 
  if (!customerId) {
    return res.status(400).json({ error: "Customer ID is missing" });
  }
  
   // Password validation
    const errors = {};
    if (newPassword || confirmPassword) {
        if (!newPassword) {
            errors.newPassword = 'New password is required';
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(newPassword)) {
            errors.newPassword = 'Password must be at least 8 characters with one letter, number, and special character';
        }

        if (newPassword !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }


  // Build query
  const fields = [
    "FNAME = ?",
    "LNAME = ?",
    "email = ?",
    "MOBILE = ?",
    "CADDRESSLINE1 = ?",
    "CCITY = ?",
    "CSTATE = ?",
    "CCOUNTRY = ?",
    "CDISTRICT = ?",
    "CPINCODE = ?",
  ];
  const values = [
    FNAME,
    LNAME,
    email,
    MOBILE,
    CADDRESSLINE1,
    CCITY,
    CSTATE,
    CCOUNTRY,
    CDISTRICT,
    CPINCODE,
  ];
     if (newPassword) {
        fields.push("password = ?");
        // In production, you should hash the password here
        values.push(newPassword);
    }
  values.push(customerId); // for WHERE condition
  const sql = `UPDATE customermaster SET ${fields.join(
    ", "
  )} WHERE CUSTOMERID = ?`;
  con.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database update error:", err);
      return res
        .status(500)
        .json({ error: "Database update failed", message: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res
      .status(200)
      .json({ message: "Account Information updated successfully" });
  });
};


// exports.updateCustomerInfo = (req, res) => {
//   const {
//     FNAME,
//     LNAME,
//     email,
//     customerId,
//     MOBILE,
//     CADDRESSLINE1,
//     CCITY,
//     CSTATE,
//     CCOUNTRY,
//     CDISTRICT,
//     CPINCODE,
//     password,
//   } = req.body;
//   if (!customerId) {
//     return res.status(400).json({ error: "Customer ID is missing" });
//   }
//   // Build query
//   const fields = [
//     "FNAME = ?",
//     "LNAME = ?",
//     "email = ?",
//     "MOBILE = ?",
//     "CADDRESSLINE1 = ?",
//     "CCITY = ?",
//     "CSTATE = ?",
//     "CCOUNTRY = ?",
//     "CDISTRICT = ?",
//     "CPINCODE = ?",
//   ];
//   const values = [
//     FNAME,
//     LNAME,
//     email,
//     MOBILE,
//     CADDRESSLINE1,
//     CCITY,
//     CSTATE,
//     CCOUNTRY,
//     CDISTRICT,
//     CPINCODE,
//   ];
//   if (password) {
//     fields.push("password = ?");
//     values.push(password); // plain text password
//   }
//   values.push(customerId); // for WHERE condition
//   const sql = `UPDATE customermaster SET ${fields.join(
//     ", "
//   )} WHERE CUSTOMERID = ?`;
//   con.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Database update error:", err);
//       return res
//         .status(500)
//         .json({ error: "Database update failed", message: err.message });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Customer not found" });
//     }
//     return res
//       .status(200)
//       .json({ message: "Account Information updated successfully" });
//   });
// };




exports.getcustomerbyid = (req, res) => {
  const { customerId } = req.params;
  if (!customerId) {
    return res.status(400).json({ error: "Customer ID is required" });
  }
  con.query(
    "SELECT FNAME, LNAME, email, MOBILE, CADDRESSLINE1, CCITY, CSTATE, CCOUNTRY, CDISTRICT, password, CPINCODE FROM customermaster WHERE CUSTOMERID = ?",
    [customerId],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({
          error: "Database error",
          message: err.message,
        });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.json(result[0]);
    }
  );
};

exports.deletecustomer = (req, res) => {
  const customerId = req.params.id;
  con.query(
    // use the actual primary key column name here:
    "DELETE FROM customermaster WHERE CUSTOMERID = ?",
    [customerId],
    (err, result) => {
      if (err) {
        console.error("Error deleting customer:", err);
        return res.status(500).json({ error: "Failed to delete customer" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.status(200).json({ message: "Customer deleted successfully" });
    }
  );
};






// exports.addcustomer = (req, res) => {
//   console.log("📥 Received request to add customer:", req.body);
//   const { fname, lname, mobile, email, password } = req.body;
//   // Validate required fields
//   if (!fname || !lname || !mobile || !email || !password) {
//     return res.status(400).json({
//       success: false,
//       msg: "All fields are required",
//     });
//   }
//   // Check if email or mobile already exist
//   const checkQuery = "SELECT email, MOBILE FROM customermaster WHERE email = ? OR MOBILE = ?";
//   con.query(checkQuery, [email, mobile], (err, results) => {
//     if (err) {
//       console.error("❌ Error checking email/mobile:", err);
//       return res.status(500).json({
//         success: false,
//         msg: "Internal server error",
//         error: err.message,
//       });
//     }
//     let emailExists = false;
//     let mobileExists = false;
//     results.forEach((row) => {
//       if (row.email === email) emailExists = true;
//       if (row.MOBILE === mobile) mobileExists = true;
//     });
//     if (emailExists && mobileExists) {
//       return res.status(400).json({
//         success: false,
//         msg: "Email and Mobile number already exist",
//       });
//     } else if (emailExists) {
//       return res.status(400).json({
//         success: false,
//         msg: "Email already exists",
//       });
//     } else if (mobileExists) {
//       return res.status(400).json({
//         success: false,
//         msg: "Mobile number already exists",
//       });
//     }
//     // Store new customer
//     const newCustomer = {
//       FNAME: fname,
//       LNAME: lname,
//       MOBILE: mobile,
//       EMAIL: email,
//       PASSWORD: password, // Ideally hash before storing
//     };
//     const insertQuery = "INSERT INTO customermaster SET ?";
//     con.query(insertQuery, newCustomer, (insertErr, insertResults) => {
//       if (insertErr) {
//         console.error("❌ Insert error:", insertErr);
//         return res.status(500).json({
//           success: false,
//           msg: "Internal server error",
//           error: insertErr.message,
//         });
//       }
//       return res.status(201).json({
//         success: true,
//         msg: "New customer created successfully",
//         newCustomer,
//       });
//     });
//   });
// };

// exports.addcustomer = (req, res) => {
//   const { FNAME, LNAME,  email , MOBILE, CSTATE, CCITY,CCOUNTRY, CPINCODE, CADDRESSLINE1 } = req.body;
//   console.log("addcustomer", req.body);
//   // if (!FNAME || !LNAME || !MOBILE || !email || !CADDRESSLINE1 || PEMAILID || MOBILE2|| PSTATE|| PCITY|| PPINCODE|| PADDRESSLINE1) {
//   //   return res.status(400).json({
//   //     success: false,
//   //     msg: "All fields are required",
//   //   });
//   // }
//   const checkEmailQuery = "SELECT * FROM customermaster WHERE email = ?";
//   con.query(checkEmailQuery, [email], (err, results) => {
//     if (err) {
//       console.error(":x: Email check error:", err);
//       return res.status(500).json({
//         success: false,
//         msg: "Internal server error",
//         error: err.message,
//       });
//     }
//     if (results.length > 0) {
//       return res.status(400).json({
//         success: false,
//         msg: "Email already exists",
//       });
//     }
//     const newCustomer = { FNAME, LNAME, email, MOBILE, CSTATE ,CCOUNTRY, CCITY, CPINCODE, CADDRESSLINE1};
//     const insertQuery = "INSERT INTO customermaster SET ?";
//     con.query(insertQuery, newCustomer, (insertErr, insertResults) => {
//       if (insertErr) {
//         console.error(":x: Insert error:", insertErr);
//         return res.status(500).json({
//           success: false,
//           msg: "Internal server error",
//           error: insertErr.message,
//         });
//       }
//       return res.status(201).json({
//         success: true,
//         msg: "New customer created successfully",
//         newCustomer,
//       });
//     });
//   });
// };


exports.addcustomer = (req, res) => {
  const { FNAME, LNAME,  email , MOBILE, CSTATE, CCITY,CCOUNTRY, CPINCODE,password,CADDRESSLINE1} = req.body;
  console.log("addcustomer", req.body);
  // if (!FNAME || !LNAME || !MOBILE || !email || !CADDRESSLINE1 || PEMAILID || MOBILE2|| PSTATE|| PCITY|| PPINCODE|| PADDRESSLINE1) {
  //   return res.status(400).json({
  //     success: false,
  //     msg: "All fields are required",
  //   });
  // }
  const checkEmailQuery = "SELECT * FROM customermaster WHERE email = ?";
  con.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.error(":x: Email check error:", err);
      return res.status(500).json({
        success: false,
        msg: "Internal server error",
        error: err.message,
      });
    }
    if (results.length > 0) {
      return res.status(400).json({
        success: false,
        msg: "Email already exists",
      });
    }
    const newCustomer = { FNAME, LNAME,password,email, MOBILE, CSTATE ,CCOUNTRY, CCITY, CPINCODE, CADDRESSLINE1};
    const insertQuery = "INSERT INTO customermaster SET ?";
    con.query(insertQuery, newCustomer, (insertErr, insertResults) => {
      if (insertErr) {
        console.error(":x: Insert error:", insertErr);
        return res.status(500).json({
          success: false,
          msg: "Internal server error",
          error: insertErr.message,
        });
      }
      return res.status(201).json({
        success: true,
        msg: "New customer created successfully",
        newCustomer,
      });
    });
  });
};


exports.getAll = async (req, res) => {
  await con.query("SELECT * FROM customermaster", (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
};


exports.deletecustomer = (req, res) => {
  const customerId = req.params.id;
  con.query(
    // use the actual primary key column name here:
    "DELETE FROM customermaster WHERE CUSTOMERID = ?",
    [customerId],
    (err, result) => {
      if (err) {
        console.error("Error deleting customer:", err);
        return res.status(500).json({ error: "Failed to delete customer" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.status(200).json({ message: "Customer deleted successfully" });
    }
  );
};







exports.logincustomer = (req, res) => {
  const { email, password } = req.body;
  console.log("Received login request:", { email, password });
  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }
  const query = "SELECT * FROM customermaster WHERE email = ?";
  con.query(query, [email], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).json({ msg: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(401).json({ msg: "Customer does not exist" });
    }
    const customer = results[0];
    console.log(customer);
    if (customer.password !== password) {
      return res.status(401).json({ msg: "Invalid password" });
    }
    // :white_check_mark: Login success
    return res.status(200).json({
      msg: "Login successful",
      customer: {
        id: customer.CUSTOMERID,
        name: customer.FNAME,
        email: customer.email,
      },
    });
  });
};

exports.editcustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const updatedcustomer = { name, email };
    con.query(
      "UPDATE customermaster SET ? WHERE id = ?",
      [updatedcustomer, id],
      (error, result) => {
        if (error) {
          console.error("Error updating customer:", error);
          return res.status(500).send({ error: "Internal Server Error" });
        }
        if (result.affectedRows === 0) {
          return res.status(404).send({ error: "customer not found" });
        }
        res
          .status(200)
          .send({ msg: "customer updated successfully", updatedcustomer });
      }
    );
  } catch (error) {
    console.error("Error editing customer:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};


exports.addCustomerAddress = (req, res) => {
  console.log("Received request to add address:", req.body);
  const {
    customer_id,
    firstName,
    lastName,
    address,
    city,
    state,
    country,
    postcode,
    email,
    phone,
    description,
  } = req.body;
  // Insert Address
  const sql = `
    INSERT INTO customer_addresses
      (customer_id, fname, lname, address, city, state, country, postal_code, email, mobile, description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    customer_id,
    firstName,
    lastName,
    address,
    city,
    state,
    country,
    postcode,
    email,
    phone,
    description || "", // description is optional
  ];
  con.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ msg: "Database error", error: err });
    }
    res.json({
      success: true,
      message: "Address added successfully",
      id: result.insertId,
    });
  });
};
exports.updateCustomerAddress = (req, res) => {
  const {
    id,
    customer_id,
    firstName,
    lastName,
    country,
    address,
    city,
    state,
    postcode,
    phone,
    email,
    description = '',
    primary_address = 0
  } = req.body;
  // Input validation
  const requiredFields = { id, customer_id, firstName, lastName, address, city, state, country, postcode, phone };
  for (const [key, value] of Object.entries(requiredFields)) {
    if (value === undefined || value === '') {
      return res.status(400).json({ msg: `${key} is required` });
    }
  }
  const handleUpdate = () => {
    const sql = `
      UPDATE customer_addresses
      SET fname = ?, lname = ?, address = ?, city = ?, state = ?, country = ?,
          description = ?, postal_code = ?, email = ?, mobile = ?, primary_address = ?
      WHERE id = ? AND customer_id = ?
    `;
    const values = [
      firstName, lastName, address, city, state, country,
      description, postcode, email, phone,
      primary_address, id, customer_id
    ];
    con.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error during update:", err);
        return res.status(500).json({ msg: "Database error", error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ msg: "Address not found or not updated" });
      }
      res.json({ message: 'Address updated successfully' });
    });
  };
  // If setting this as primary, reset others
  if (parseInt(primary_address) === 1) {
    con.query(
      'UPDATE customer_addresses SET primary_address = 0 WHERE customer_id = ?',
      [customer_id],
      (err) => {
        if (err) {
          console.error("Error resetting primary address:", err);
          return res.status(500).json({ msg: "Failed to reset primary address", error: err });
        }
        handleUpdate();
      }
    );
  } else {
    handleUpdate();
  }
};


exports.getAddressesByUserId = (req, res) => {
  const { customer_id } = req.params;
  const { primary_address } = req.query; // use query string: ?primary_address=1
  console.log("Received request to get addresses for user ID:", customer_id);

  let sql = `
    SELECT 
      customer_addresses.*, 
      customermaster.email 
    FROM customer_addresses
    JOIN customermaster ON customermaster.CUSTOMERID = customer_addresses.customer_id
    WHERE customer_addresses.customer_id = ?
  `;

  const values = [customer_id];

  if (primary_address !== undefined) {
    sql += ' AND customer_addresses.primary_address = ?';
    values.push(primary_address);
  }

  // Optional: Add order if needed
  // sql += ' ORDER BY customer_addresses.primary_address DESC';

  con.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ msg: "DB error", error: err });
    res.json(result);
  });
};

exports.deleteCustomerAddress = (req, res) => {
  const { address_id } = req.params;
  if (!address_id) return res.status(400).json({ msg: "Address ID is required" });
  const sql = 'DELETE FROM customer_addresses WHERE id = ?';
  con.query(sql, [address_id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Address deleted successfully' });
  });
};



