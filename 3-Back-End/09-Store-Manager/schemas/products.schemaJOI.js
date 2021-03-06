const Joi = require('@hapi/joi');

const validateIdNameAndQuantitySchema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required(),
});

module.exports = {
  validateIdNameAndQuantitySchema,
};