const Joi = require('joi');

module.exports = {
  createTrolley: {
    body: {
      name: Joi.string().required(),
      stock: Joi.number().required(),
      price: Joi.number().required(),
      image: Joi.string().required(),
    },
  },
  updateTrolley: {
    body: {
      name: Joi.string().allow(''),
      stock: Joi.number().allow(''),
      price: Joi.number().allow(''),
      image: Joi.string().allow(''),
    },
  },
};
