const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.promise = Promise;

// define listing schema 
// user, title, type of spot, photo, price, address, city, state, zip, street name, neighborhood, location, coordinates
const listSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: "User"
    },
    title: {
        type: String,
        unique: false,
        required: false
    },
    spotType: {
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
        required: false
    },
    address: {
        type: String,
        unique: false,
        required: false
    },
    city: {
        type: String,
        unique: false,
        required: false
    },
    state: {
        type: String,
        unique: false,
        required: false
    },
    zip: {
        type: Number,
        unique: false,
        required: false
    },
    streetName: {
        type: String,
        unique: false,
        required: false
    },
    neighbor: {
        type: String,
        unique: false,
        required: false
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: false
        },
        coordinates: {
            type: [Number]
        }
    }
});

listSchema.index({
    location: "2dsphere"
});

const Listing = mongoose.model("listing", listSchema);
module.exports = Listing;