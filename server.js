// requirements, define port
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const dbConn = require("./client/dbConn");
const MongoStore = require("connect-mongo")(session);
const passport = require("./client/src/util/passport");
const routes = require("./routes/API");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;
const user = require("./routes/user.js");
const path = require("path");
const cors = require('cors')

app.use(cors());

// define middleware 
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static(__dirname+'/client/build'));
};

// session with random string
app.use(
    session({
        secret: "koshka",
        store: new MongoStore({
            mongooseConnection: dbConn
        }),
        resave: false,
        saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session());

// define API routes, view

app.use("/API", routes);
app.use("/user", user);
app.use("/login", user);

// start API server on whichever port we define
app.listen(PORT, function() {
    console.log("Server Started!");
});
