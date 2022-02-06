const Joi = require('@hapi/joi');

module.exports = Joi.array().items(
  Joi.object({
    productId: Joi.string().length(24).required(),
    quantity: Joi.number().min(1).required(),
  }),
);
