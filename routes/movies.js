const { Movie, validate} = require('../models/movie');
const mongoose = require('mongoose'); 
const express = require('express');
const router = express.Router(); 

// CRUD Operations with Mongoose

// GET
router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name'); 
    res.send(movies); 
});



module.exports = router; 