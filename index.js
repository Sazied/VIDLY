const Joi = require("joi");
const express = require("express");
const app = express();

// List of genres

const genres = [
  { id: 1, name: "Horror" },
  { id: 2, name: "Action" },
  { id: 3, name: "Comedy" },
];

const port = process.env.PORT || 3000;

app.use(express.json()); // For receiving JSON objects

app.listen(port, () => console.log(`Listening on port ${port}...`)); // Listening to port dynamically

// CRUD OPERATIONS AND END-POINTS

// GET

app.get("/api/genres", (req, res) => {
  //Gets list of all genres
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  //Gets a soecific genre with a given ID
  const genre = genres.find(
    (pickGenre) => pickGenre.id === parseInt(req.params.id)
  );
  if (!genre)
    return res.status(404).send("A genre with the given ID was not found");

  res.send(genre);
});

// POST

app.post("/api/genres", (req, res) => {
  //Adds a genre to the server

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(genre);
  res.send(genre);
});

// PUT to UPDATE

app.put("/api/genres/:id", (req, res) => {
  // Updates an existing genre to the server
  const genre = genres.find(
    (pickGenre) => pickGenre.id === parseInt(req.params.id)
  ); // Checks to see if a genre with a given ID exists
  if (!genre)
    return res.status(404).send("A genre with the given ID was not found");

  const { error } = validateGenre(req.body); // Checks to see if the name provided is valid
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name; // Updates names of genre
  res.send(genre);
});

// Delete

app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find(
    (pickGenre) => pickGenre.id === parseInt(req.params.id)
  );
  if (!genre)
    return res.status(404).send("A genre with the given ID was not found");

  const index = genres.indexOf(genre); // Deletes genre with respect to the ID provided
  genres.splice(index, 1);

  res.send(genre);
});

// VALIDATION

const validateGenre = (genre) => {
  //Validates the input in parameter when a body is requested in the HTTP
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
};

//This is a new comment 