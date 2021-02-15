import Listings from '../models/listing.js';
const mongoose = require('mongoose');
const express = require('express');
const app         = express();

export const getListing = async (req, res) => {
    try {
        const listings = await Listings.findOne({_id: req.params.id}).then(function() {
            res.status(200).json(listings);
        });        
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const getListings = async (req, res) => {
    try {
        const listings = await Listings.find();
        res.status(200).json(listings);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const createListing = async (req, res) => {
    const listing = req.body;
    const newListing = new Listings(listing);
    try {
        await newListing.save();
        res.status(201).json(newListing);
    } catch(error) {
        res.status(409).json({ message: error.message});
    }    
}

export const updateListing = async (req, res) => {
    Listings.findOneAndUpdate({_id: req.params.id}, req.body).then(function() {
        Listings.findOne({_id: req.params.id}).then(function(data) {
            res.send(data);
        });
    });
}


export const deleteListing = async (req, res) => {
    Listings.findOneAndRemove({_id: req.params.id}).then(function(data) {
        res.send(data);
    });
}
