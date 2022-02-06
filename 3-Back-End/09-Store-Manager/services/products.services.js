const { productsValidate, productsIdValidate } = require('../schemas/productsSchema');

const { 
  createProductModel,
  findAllProduct,
  findProductById } = require('../models/products.models');

const createProductService = async (name, quantity) => {
  const validations = await productsValidate(name, quantity);
  if (validations.err) throw validations;

  const id = await createProductModel(name, quantity);

  return id;
};

const findProductService = async (id) => {
  const validations = await productsIdValidate(id);
  if (validations.status) throw validations;

  const products = await findProductById(id);
  return products;
};

const allProductsService = async () => {
  const allProducts = await findAllProduct();
  return allProducts;
};

module.exports = {
  createProductService,
  findProductService,
  allProductsService,
};
