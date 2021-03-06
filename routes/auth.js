const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { User } = require("../models/user");
const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// CRUD OPERATIONS AND END-POINTS

// GET

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken(); 
  res.send(token);
});

// Information Expert Principle 

const validate = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(10).max(255).required(),
  });

  return schema.validate(req);
};

module.exports = router;
