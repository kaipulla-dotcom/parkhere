// import { Next } from 'react-bootstrap/esm/PageItem';
// import Listings from '../models/listing.js';
var mongoose = require('mongoose');
// var express = require('express');
// var app         = express();
const db = require("../models");
// all we need here is to deal with the database, so we need models and mongoose

// use module.exports object rather than telling each function to export
module.exports = {
    findAll: function(req, res) {
        db.Listing.find({ _id: req.query.id })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findReserved: function(req, res) {
        db.Availability.find({ renter: { $ne: null } })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },
    findReservedById: function(req, res) {
        db.Availability.find({ renter: req.query.id })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },
    createListing: function(req, res) {
        console.log("req body create listing");
        console.dir(req.body);
        console.log("--");
        console.dir(req.body.location.coordinates[0]);
        console.log("+");
        var a = req.body.location;
        var aTYPEOF = typeof a;
        console.log("typeof is: ", a);
    
        req.body.location.type = "Point";
    
        db.Listing.create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },
    createAvailability: function(req, res) {
        db.Availability.create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },
    findAllAvailable: function(req, res) {
        console.log("Starting to Find All Available");
        const dates = req.query.dates;
        const startDay = dates[0];
        const endDay =
          dates.length === 1 ? startDay : dates[req.query.dates.length - 1];
        console.log("startDay is", startDay, "endDay is", endDay);
        db.Availability.find({
          date: {
            $gte: startDay,
            $lte: endDay
          },
          renter: null
        })
          // .populate("listing")
          // .exec()
          .then(dbModel => {
            res.json(dbModel);
          })
          .catch(err => res.status(422).json(err));
    },
    findAllProfListing: function(req, res) {
        db.Listing.find(req.query)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },
    editListing: function(req, res) {
        db.Listing.findOneAndUpdate(
            { _id: req.body.listing.currentModalId },
            {
            $set: {
                title: req.body.listing.title,
                address: req.body.listing.address,
                city: req.body.listing.city,
                state: req.body.listing.state,
                zip: req.body.listing.zip
            }
            }
        )
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err));
    },
    // this one works with maps
    findAllNear: function(req, res) {
        var long = req.query.data[0];
        var lat = req.query.data[1];
    
        long.type = "Point";
        lat.type = "Point";
    
        var floatLong = parseFloat(long);
        var floatLat = parseFloat(lat);
    
        console.log("1: ", (req.query.data[0].type = "Point"));
        console.log("2: ", req.query.data[0].type);
    
        console.log("line 123 typeof Long Point", long);
    
        console.log(floatLong);
        console.log(floatLat);
    
        console.log("END: ---------");
        db.Listing.syncIndexes().then(index => {
          console.log("indexes:", index);
        });
    
        db.Listing.find({
            location: {
                $near: {
                    $maxDistance: 900,
                    $geometry: {
                        type: "Point",
                        coordinates: [floatLong, floatLat]
                    }
                }
            }
        })
            .find((error, results) => {
                if (error) console.log(error);
                console.log(JSON.stringify(results, 0, 2));
            })
                .then(data => res.json(data))
                .catch(err => res.status(422).json(err));
    },
    updateAvailabilityUser: function(req, res) {
        console.log("UPDATE AVAIL USER", req.body);
    
        console.log("line 154: ", req.body.renter);
    
        db.Listing.findOneAndUpdate(
            { _id: req.body.listing },
            { new: true, upsert: true }
        )
             .then(() => {
            // Find an availability and update it with new availability info
    
                console.log("req.body inside of findeOne", req.body);
    
                db.Availability.findOneAndUpdate({
                    listing: req.body.listing,
                    date: req.body.date
                },
                {
                $set: {
                    renter: mongoose.Types.ObjectId(req.body.userId),
                    address: req.body.address,
                    title: req.body.title,
                    photo: req.body.photo,
                    price: req.body.price
                }
            }).then(function(dbListing) {
                res.json(dbListing);
            });
            })
            .catch(error => {
                res.status(400).json({
                error: error
                });
            });
    },
    deleteListing: function(req, res) {
        // db.Listing.remove({ _id: req.params.id })
        const { id } = req.params.id;
        db.Availability.remove({ listing: id })
    
          .exec()
          .then(dbModel => dbModel.deleteOne())
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
        },
        getAvailabilityByListingId: function(req, res) {
            const { id } = req.params;
            db.Availability.find({ listing: id })
                .then(dbModel => res.json(dbModel))
                .catch(err => res.status(422).json(err));
    },
    deleteAvailability: function(req, res) {
        console.log("req.params deleteAvailability", req.params);
        const { id } = req.params;
        db.Availability.findOneAndUpdate(
            { _id: id },
            { $set: { renter: null, price: 0 } }
        )
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    
    findUser: function(req, res) {
        db.User.findOne({ _id: req.user._id })
            .then(dbModel =>
                res.json({
                    user: dbModel,
                    userId: dbModel._id
                })
            )
            .catch(err => res.json(err));
    },

    updateUser: function(req, res) {
        db.User.findOneAndUpdate({_id: req.params.id}, req.body)
            .then(function() {
                User.findOne({_id: req.params.id}).then(function(data) {
                    res.send(data);
            });
        });
    },

    deleteUser: function(req, res) {
        db.User.findOneAndRemove({_id: req.params.id})
            .then(function(data) {
                res.send(data);
            });
    }
};

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

// export const getListing = async (req, res) => {
//     try {
//         const listings = await Listings.findOne({_id: req.params.id}).then(function() {
//             res.status(200).json(listings);
//         });        
//     } catch (error) {
//         res.status(400).json({message: error.message});
//     }
// }

// // export const getListings = async (req, res) => {
// //     try {
// //         const listings = await Listings.find();
// //         res.status(200).json(listings);
// //     } catch (error) {
// //         res.status(400).json({message: error.message});
// //     }
// // }

// export const createListing = async (req, res) => {
//     const listing = req.body;
//     const newListing = new Listings(listing);
//     try {
//         await newListing.save();
//         res.status(201).json(newListing);
//     } catch(error) {
//         res.status(409).json({ message: error.message});
//     }    
// }

// export const updateListing = async (req, res) => {
//     Listings.findOneAndUpdate({_id: req.params.id}, req.body).then(function() {
//         Listings.findOne({_id: req.params.id}).then(function(data) {
//             res.send(data);
//         });
//     });
// }


// export const deleteListing = async (req, res) => {
//     Listings.findOneAndRemove({_id: req.params.id}).then(function(data) {
//         res.send(data);
//     });
// }
