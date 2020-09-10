const { User, validate } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// CRUD OPERATIONS AND END-POINTS

// GET

router.get("/", async (req, res) => {
  //Gets list of all genres
  const uers = await User.find().sort("name");
  res.send(users);
});