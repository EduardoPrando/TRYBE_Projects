const express = require('express');
const { createSaleController,
      getAllSalesController,
      getSalesByIdController,
      updateSalesByIdController,
      deleteOneSaleByIdController,
      } = require('../controllers/sales.controller');

const salesRoutes = express.Router();

salesRoutes.post('/', createSaleController);

salesRoutes.get('/', getAllSalesController);

salesRoutes.get('/:id', getSalesByIdController);

salesRoutes.put('/:id', updateSalesByIdController);

salesRoutes.delete('/:id', deleteOneSaleByIdController);

module.exports = salesRoutes;