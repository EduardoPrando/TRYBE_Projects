const { ObjectId } = require('mongodb');
const errorHandlerUtils = require('../utils/functions/errorHandlerUtils');
const { findProductByName } = require('../models/products.models');
const { unprocessableEntity } = require('../utils/dictionary/statusCode');
const { nameLength, nameAlreadyExists, quantityBigger, quantityNotNumber, wrongId,
      } = require('../utils/dictionary/messageErrors');
const { invalidData } = require('../utils/dictionary/codeMessage');

const productsValidate = async (name, quantity) => {
  const product = await findProductByName(name);

  switch (true) {
    case name.length <= 5: return errorHandlerUtils(unprocessableEntity, invalidData, nameLength);
    case product !== null: return (
      errorHandlerUtils(unprocessableEntity, invalidData, nameAlreadyExists));
    case !Number.isInteger(quantity): return (
      errorHandlerUtils(unprocessableEntity, invalidData, quantityNotNumber));
    case quantity < 1: return errorHandlerUtils(unprocessableEntity, invalidData, quantityBigger);
    default: return {};
  }
};

const productsIdValidate = async (id) => {
    switch (true) {
      case !id: return errorHandlerUtils(unprocessableEntity, invalidData, wrongId);
      case !ObjectId.isValid(id): return (
        errorHandlerUtils(unprocessableEntity, invalidData, wrongId)
      );
      default: return {};
    }
};

module.exports = { 
  productsValidate,
  productsIdValidate,
};