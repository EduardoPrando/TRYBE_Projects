const express = require('express');
const { 
  createProductController,
  getAllProductsController,
  getProductsByIdController,
  updateProductByIdController,
  deleteOneByIdController,
} = require('../controllers/products.controller');

const productRoute = express.Router();

productRoute.post('/', createProductController);

productRoute.get('/', getAllProductsController);

productRoute.get('/:id', getProductsByIdController);

productRoute.put('/:id', updateProductByIdController);

productRoute.delete('/:id', deleteOneByIdController);

module.exports = productRoute;