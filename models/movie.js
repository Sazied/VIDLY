const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("../models/genre");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: Boolean,
    minlength: 3,
    maxlength: 50,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

const validateMovie = (movie) => {
  const movie = Joi.object({
    title: Joi.string().min(3).required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required(),
  });
};

module.exports.Movie = Movie;
module.exports.validate = validateMovie;
