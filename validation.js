// validation.js - Adat validálása
const Joi = require('joi');

const productSchema = Joi.object({
    brand: Joi.string().min(2).max(30).required(),
    size: Joi.string().min(1).max(10).optional(),
    color: Joi.string().min(3).max(15).required(),
    material: Joi.string().min(3).max(20).required(),
    price: Joi.number().min(0).required()
});

module.exports = productSchema;