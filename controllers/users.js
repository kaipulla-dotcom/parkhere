// all put into the listing controller

// import Users from '../models/user.js';
// var mongoose = require('mongoose');
// var express = require('express');
// var app         = express();

// export const getUsers = async (req, res) => {
//     try {
//         const users = await Users.find();
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(400).json({message: error.message});
//     }
// }

// export const getUser = async (req, res) => {
//     try {
//         const user = await Users.findOne({_id: req.params.id}).then(function() {
//             res.status(200).json(user);
//         });        
//     } catch (error) {
//         res.status(400).json({message: error.message});
//     }
// }

// export const createUser = async (req, res) => {
//     const user = req.body;
//     const newUser = new Users(user);
//     try {
//         await newUser.save();
//         res.status(201).json(newUser);
//     } catch(error) {
//         res.status(409).json({ message: error.message});
//     }    
// }

// export const updateUser = async (req, res) => {
//     Users.findOneAndUpdate({_id: req.params.id}, req.body).then(function() {
//         Users.findOne({_id: req.params.id}).then(function(data) {
//             res.send(data);
//         });
//     });
// }


// export const deleteUser = async (req, res) => {
//     Users.findOneAndRemove({_id: req.params.id}).then(function(data) {
//         res.send(data);
//     });
// }