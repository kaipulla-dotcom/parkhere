const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.promise = Promise;

// define availability of parking spots schema
// date, listing, renter, address, title,, photo, price

const Avail = mongoose.model("Avail", availSchema);
module.exports = Avail;