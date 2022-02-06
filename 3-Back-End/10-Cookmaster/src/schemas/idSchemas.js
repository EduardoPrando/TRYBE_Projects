const Joi = require('joi');

module.exports = Joi.string().length(24).required();
