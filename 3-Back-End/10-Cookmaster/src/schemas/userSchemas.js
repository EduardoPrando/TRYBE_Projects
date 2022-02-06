const Joi = require('joi');

const emailPasswordSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().required(),
});

const nameSchema = Joi.string().required();

module.exports = {
  emailPasswordSchema,
  nameSchema,
};