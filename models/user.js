const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
mongoose.promise = Promise;

// define user schema - 
// username, password, first, last name, email. DOB 
    // use bcrypt to hash password


const User = mongoose.model("User", userSchema);
module.exports = User;