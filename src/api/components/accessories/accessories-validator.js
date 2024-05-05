const Joi = require('joi');

module.exports = {
  createAccessories: {
    body: {
      name: Joi.string().required(),
      stock: Joi.number().required(),
      price: Joi.number().required(),
      category: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required(),
    },
  },
  updateAccessories: {
    body: {
      name: Joi.string().allow(''),
      stock: Joi.number().allow(''),
      price: Joi.number().allow(''),
      category: Joi.string().allow(''),
      description: Joi.string().allow(''),
      image: Joi.string().allow(''),
    },
  },
};
