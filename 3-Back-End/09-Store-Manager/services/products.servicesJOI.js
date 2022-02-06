const { updateProductByIdModel, deleteOneByIdModel } = require('../models/products.models');
const { validateIdSchema } = require('../schemas/id.schemaJOI');
const { validateIdNameAndQuantitySchema } = require('../schemas/products.schemaJOI');
const { invalidData } = require('../utils/dictionary/codeMessage');
const { wrongIdOrQuantity } = require('../utils/dictionary/messageErrors');
const { unprocessableEntity } = require('../utils/dictionary/statusCode');
const errorHandlerUtils = require('../utils/functions/errorHandlerUtils');

const updateProductByIdService = async (id, name, quantity) => {
  const { error } = validateIdNameAndQuantitySchema.validate({ name, quantity });
  if (error) throw errorHandlerUtils(unprocessableEntity, invalidData, error.message);

  const validId = validateIdSchema.validate(id);

  if (validId.error) {
 throw errorHandlerUtils(unprocessableEntity, invalidData, wrongIdOrQuantity);
}
  
  if (error) throw errorHandlerUtils(unprocessableEntity, invalidData, error.message);

  await updateProductByIdModel(id, name, quantity);
};

const deleteOneByIdService = async (id) => {
  const { error } = validateIdSchema.validate(id);

  if (error) throw errorHandlerUtils(unprocessableEntity, invalidData, wrongIdOrQuantity);

  await deleteOneByIdModel(id);
};

module.exports = {
  updateProductByIdService,
  deleteOneByIdService,
};
