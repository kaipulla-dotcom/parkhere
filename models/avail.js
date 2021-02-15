const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.promise = Promise;

// define availability of parking spots schema
// date, listing, renter, address, title,, photo, price
const availSchema = new Schema({
    date: {
        type: Date,
        unique: false,
        required: false
    },
    listing: {
        type: Schema.Types.ObjectId,
        ref: "Listing"
    },
    renter: {
        type: Schema.Types.ObjectId,
        default: null
    },
    address: {
        type: String,
        unique: false,
        required: false
    },
    title: {
        type: String,
        unique: false,
        required: false
    },
    photo: {
        type: String,
        unique: false,
        required: false
    },
    price: {
        type: Number,
        unique: false,
        required: false,
        default: 0
    }
})

const Avail = mongoose.model("Avail", availSchema);
module.exports = Avail;