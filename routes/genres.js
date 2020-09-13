const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genre, validate } = require("../models/genre");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

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

router.post("/", auth, async (req, res) => {
  //Adds a genre to the server

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({ name: req.body.name });
  await genre.save();
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

  const { error } = validate(req.body); // Checks to see if the name provided is valid
  if (error) return res.status(400).send(error.details[0].message);

  res.send(genre);
});

// Delete

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send("A genre with the given ID was not found");

  res.send(genre);
});

module.exports = router;
