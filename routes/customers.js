const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
  },
  isGold: Boolean,
  phone: Number,
});

const Customer = mongoose.model("Customer", customerSchema);

// Mongoose CRUD Operations 

// Get requests

router.get('/', async (req, res) => {
    const customer = await Customer.find().sort('name'); 
    res.send(customer); 
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('A customer with the given ID was not found'); 

    res.send(customer); 
}); 

// POST requests 

router.post('/', async (req, res) => {
    let customer = new Course({
        name: req.body.name, 
    })
})

const validateCustomer = (customer) => {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
  });

  return schema.validate(customer);
};

module.exports = router;
