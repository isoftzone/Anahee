const express = require("express");
const con = require('../config')

exports.addUser = async (req, res) => {

    const { id, name, email, password } = req.body;
    let newUser = { id, name, email, password }
   await con.query('INSERT INTO USERS SET ?', newUser, (error, result, fields) => {
        if (error) console.log(error);
        res.status(201).send({
            msg: "new user created successfully",
            newUser
        })
    });
};
exports.getAll = async (req, res) => {
   await con.query('SELECT * FROM USERS', (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    await con.query('DELETE FROM USERS WHERE id = ?', userId, (err, result) => {
        if (err) {
            throw err;
        }
        res.send('User deleted successfully');
    });
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

  await con.query('SELECT * FROM USERS WHERE email = ? AND password = ?', [email, password], (error, results, fields) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Internal Server Error");
        }
        if (results.length === 0) {
            return res.status(401).send("Invalid email or password");
        }
        const user = results[0];
        res.status(200).send({
            msg: "Login successful",
            user
        });
    });
};

exports.editUser = async (req, res) => {
    try {
        const { id } = req.params; 
        const { name, email } = req.body; 

     
        const updatedUser = { name, email };

       
        con.query('UPDATE USERS SET ? WHERE id = ?', [updatedUser, id], (error, result) => {
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
