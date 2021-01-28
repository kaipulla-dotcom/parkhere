const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.promise = Promise;

// define listing schema 
// user, title, type of spot, photo, price, address, city, state, zip, street name, neighborhood, location, coordinates

const Listing = mongoose.model("listing", listSchema);
module.exports = Listing;