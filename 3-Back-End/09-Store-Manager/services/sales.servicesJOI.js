const { createSalesModel,
        getAllSalesModel,
        getSalesByIdModel,
        updateSaleByIdModel,
        deleteOneSaleByIdModel,
      } = require('../models/sales.models');
const salesSchemaJOI = require('../schemas/sale.schemaJOI');
const errorHandlerUtils = require('../utils/functions/errorHandlerUtils');
const { unprocessableEntity, notFound } = require('../utils/dictionary/statusCode');
const { invalidData, codeNotFound } = require('../utils/dictionary/codeMessage');
const { wrongIdOrQuantity, saleNotFound, wrongSaleIdFormat,
      } = require('../utils/dictionary/messageErrors');
const { validateIdSchema } = require('../schemas/id.schemaJOI');

const createSaleService = async (saleProduct) => {
  const { error } = salesSchemaJOI.validate(saleProduct);
  if (error) throw errorHandlerUtils(unprocessableEntity, invalidData, wrongIdOrQuantity);

  const created = await createSalesModel(saleProduct);
  return created;
};

const getAllSalesService = async () => {
  const sales = await getAllSalesModel();
  return sales;
};

const getSalesByIdService = async (id) => {
  const { error } = validateIdSchema.validate(id);
  if (error) throw errorHandlerUtils(notFound, codeNotFound, saleNotFound);

  const sale = await getSalesByIdModel(id);
  if (!sale) throw errorHandlerUtils(notFound, codeNotFound, saleNotFound);

  return sale;
};

const updateSalesByIdService = async (id, sales) => {
  const validId = validateIdSchema.validate(id);
  console.log();
  if (validId.error) throw errorHandlerUtils(unprocessableEntity, invalidData, wrongIdOrQuantity);

  const { error } = salesSchemaJOI.validate(sales);
  if (error) throw errorHandlerUtils(unprocessableEntity, invalidData, wrongIdOrQuantity);
  await updateSaleByIdModel(id, sales);
};

const deleteOneSaleByIdService = async (id) => {
  const { error } = validateIdSchema.validate(id);
  if (error) throw errorHandlerUtils(unprocessableEntity, invalidData, wrongSaleIdFormat);
  await deleteOneSaleByIdModel(id);
};

const getSalesByIdDeleteService = async (id) => {
  const { error } = validateIdSchema.validate(id);
  if (error) throw errorHandlerUtils(unprocessableEntity, invalidData, wrongSaleIdFormat);

  const sale = await getSalesByIdModel(id);

  if (!sale) throw errorHandlerUtils(unprocessableEntity, invalidData, wrongSaleIdFormat);

  return sale;
};

module.exports = { 
  createSaleService,
  getAllSalesService,
  getSalesByIdService,
  updateSalesByIdService,
  deleteOneSaleByIdService,
  getSalesByIdDeleteService,
};
