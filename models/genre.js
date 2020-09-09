const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

// VALIDATION

const validateGenre = (genre) => {
  //Validates the input in parameter when a body is requested in the HTTP
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
  });
  return schema.validate(genre);
};

module.exports.genreSchema = genreSchema; 
module.exports.Genre = Genre;
module.exports.validate = validateGenre;
