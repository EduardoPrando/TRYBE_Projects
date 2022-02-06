const { createProductService, allProductsService, findProductService, 
      } = require('../services/products.services');
const { updateProductByIdService, deleteOneByIdService,
      } = require('../services/products.servicesJOI');
const { success, created } = require('../utils/dictionary/statusCode');

const createProductController = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const { id } = await createProductService(name, quantity);

    return res.status(created).json({ _id: id, name, quantity });
  } catch (error) {
    console.log(`createProducts: ${error}`);
    return next(error);
  }
};

const getAllProductsController = async (req, res, next) => {
  try {
    const products = await allProductsService();
    return res.status(success).json({ products });
  } catch (error) {
    console.log(`getAllProducts: ${error.message}`);
    return next(error);
  }
};

const getProductsByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id, name, quantity } = await findProductService(id);
    return res.status(success).json({ _id, name, quantity });
  } catch (error) {
    console.log(`getProductById: ${error.message}`);
    return next(error);
  }
};

const updateProductByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    await updateProductByIdService(id, name, quantity);
    res.status(success).json({ _id: id, name, quantity });
  } catch (error) {
    console.log(`UpdateProduct: ${error.message}`);
    return next(error);
  }
};

const deleteOneByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id, name, quantity } = await findProductService(id);
    await deleteOneByIdService(id);
    res.status(success).json({ _id, name, quantity });
  } catch (error) {
    console.log(`deletOneById: ${error.message}`);
    return next(error);
  }
};

module.exports = {
  createProductController,
  getAllProductsController,
  getProductsByIdController,
  updateProductByIdController,
  deleteOneByIdController,
};
