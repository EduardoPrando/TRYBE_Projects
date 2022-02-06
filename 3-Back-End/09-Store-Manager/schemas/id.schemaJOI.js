const Joi = require('@hapi/joi');

const validateIdSchema = Joi.string().length(24).required();

module.exports = {
  validateIdSchema,
};