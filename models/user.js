const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
mongoose.promise = Promise;

// define user schema - 
// username, password, first, last name, email. DOB 
const userSchema = new Schema({
    username: {
        type: String,
        unique: false,
        required: false
    },
    password: {
        type: String,
        unique: false,
        required: false
    },
    firstName: {
        type: String,
        unique: false,
        required: false
    },
    lastName: {
        type: String,
        unique: false,
        required: false
    },
    email: {
        type: String,
        unique: false,
        required: false
    },
    dob: {
        type: Date,
        unique: false,
        required: false
    },
    photo: {
        type: String,
        unique: false,
        required: false
    }
});

// define methods
userSchema.methods = {
    checkPass: function(inputPass) {
        return bcrypt.compareSync(inputPass, this.password);
    },
    hashPass: plainTextPass => {
        return bcrypt.hashSync(plainTextPass, 10);
    }
};

// hooks, use bcrypt
userSchema.pre("save", function(next) {
    if (!this.password)  {
        console.log("No password in models/user.js");
        next();
    } 
    else {
        console.log("password in pre save");
        this.password = this.hashPass(this.password);
        next();
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;