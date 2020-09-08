const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

// CRUD OPERATIONS AND END-POINTS

// GET

router.get("/", async (req, res) => {
  //Gets list of all genres
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  //Gets a soecific genre with a given ID
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("A genre with the given ID was not found");

  res.send(genre);
});

// POST

router.post("/", async (req, res) => {
  //Adds a genre to the server

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

// PUT to UPDATE

router.put("/:id", async (req, res) => {
  // Updates an existing genre to the server
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );
  if (!genre)
    return res.status(404).send("A genre with the given ID was not found");

  const { error } = validateGenre(req.body); // Checks to see if the name provided is valid
  if (error) return res.status(400).send(error.details[0].message);

  res.send(genre);
});

// Delete

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send("A genre with the given ID was not found");

  res.send(genre);
});

// VALIDATION

const validateGenre = (genre) => {
  //Validates the input in parameter when a body is requested in the HTTP
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
  });
  return schema.validate(genre);
};

module.exports = router;
