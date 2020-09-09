const { Customer, validate } = require("../models/customer");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// Mongoose CRUD Operations

// Get requests

router.get("/", async (req, res) => {
  const customer = await Customer.find().sort("name");
  res.send(customer);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res.status(404).send("A customer with the given ID was not found");

  res.send(customer);
});

// POST requests

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });

  customer = await customer.save();

  res.send(customer);
});

// PUT requests

router.put("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold },
    {
      new: true,
    }
  );
  if (!customer)
    return res.status(404).send("A customer with the given ID was not found");

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  res.send(customer);
});

// DELETE requests

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer)
    return res.status(404).send("A customer with the given ID was not found");
  res.send(customer);
});

module.exports = router;
