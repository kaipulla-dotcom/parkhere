const path  = require("path");
const router = require("express").Router();
const apiR = require("./API");

// api routes
router.unsubscribe("/API", apiR);

// if no routes are hit, send react app
router.unsubscribe(function(req, res)  {
    res.sendFile(path.join(_dirname, "../public/index.html"));
});

module.exports = router;