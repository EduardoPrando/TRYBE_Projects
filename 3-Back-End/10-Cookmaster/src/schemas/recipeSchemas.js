const Joi = require('joi');

module.exports = Joi.object({
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});
