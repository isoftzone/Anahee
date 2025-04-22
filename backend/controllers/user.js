const express = require("express");
const con = require('../config')

exports.addUser = async (req, res) => {

    const { id, name, email, password, companyid } = req.body;
    const newUser = { id, name, email, password, companyid }
   await con.query('INSERT INTO users SET ?', newUser, (error, result, fields) => {
        if (error) console.log(error);
        res.status(201).send({
            msg: "new user created successfully",
            newUser
        })
    });
};
exports.getAll = async (req, res) => {
   await con.query('SELECT * FROM users', (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    await con.query('DELETE FROM users WHERE id = ?', userId, (err, result) => {
        if (err) {
            throw err;
        }
        res.send('User deleted successfully');
    });
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    console.log('Received login request:', { email, password });
  
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }
  
    await con.query('SELECT * FROM users WHERE email = ?', [email], (error, results, fields) => {
      if (error) {
        console.error('Database query error:', error);
        return res.status(500).send("Internal Server Error");
      }
  
      if (results.length === 0) {
        console.log('User not found:', email);
        return res.status(401).json({ msg: "User does not exist" });
      }
  
      const user = results[0];
  
      if (user.password !== password) {
        console.log('Password mismatch:', user.password, password);
        return res.status(401).json({ msg: "Invalid password" });
      }
  
      console.log('Login successful:', user);
      return res.status(200).json({
        msg: "Welcome, user",
        user
      });
    });
  };
  

//     const { email, password } = req.body;

//   await con.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results, fields) => {
//         if (error) {
//             console.error(error);
//             return res.status(500).send("Internal Server Error");
//         }
//         if (results.length === 0) {
//             return res.status(401).send("Invalid email or password");
//         }
//         const user = results[0];
//         res.status(200).send({
//             msg: "Login successful",
//             user
//         });
//     });

exports.editUser = async (req, res) => {
    try {
        const { id } = req.params; 
        const { name, email } = req.body; 

     
        const updatedUser = { name, email };

       
        con.query('UPDATE users SET ? WHERE id = ?', [updatedUser, id], (error, result) => {
            if (error) {
                console.error('Error updating user:', error);
                return res.status(500).send({ error: 'Internal Server Error' });
            }

            
            if (result.affectedRows === 0) {
                return res.status(404).send({ error: 'User not found' });
            }

         
            res.status(200).send({ msg: 'User updated successfully', updatedUser });
        });
    } catch (error) {
        console.error('Error editing user:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};