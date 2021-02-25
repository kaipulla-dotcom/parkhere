const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("../client/src/util/passport");
const listControl = require("../controllers/listControl");
const url_user = 'http://localhost:3000/user';


router.post("/", (req, res) => {
  console.log("user signup");
  const {
    username,
    password,
    firstName,
    lastName,
    email,
    dob
  } = req.body;
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log("User.js post error: ", err);
    } else if (user) {
      res.json(user);
    } else {
      const newUser = new User({
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
        dob: dob
      });
      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        res.json(savedUser);
      });
    }
  });
});


router.get("/", (req, res) => {
  console.log("User GET ",req.query.id);
  User.findOne({ _id: req.query.id }, (err, user) => {
    if (err) {
      console.log("User.js post error: ", err);
    } else if (user) {
      res.json(user);
    }
  });
});

router.post(
  "/login",
  function(req, res, next) {
    console.log(req.body);
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    console.log("logged in", req.user);
    var userInfo = {
      username: req.user.username,
      firstName: req.user.firstName,
      lastName: req.user.lastName
    };
    res.send(userInfo);
  }
);

router.route("/").get(listControl.findAll);

router.post("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: "logging out" });
  } else {
    res.send({ msg: "no user to log out" });
  }
});

module.exports = router;