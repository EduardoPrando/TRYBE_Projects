const { createSaleService,
        getAllSalesService,
        getSalesByIdService,
        updateSalesByIdService,
        deleteOneSaleByIdService,
        getSalesByIdDeleteService,
      } = require('../services/sales.servicesJOI');
const { success } = require('../utils/dictionary/statusCode');

const createSaleController = async (req, res, next) => {
  try {
    const saleProduct = req.body;
    const productId = await createSaleService(saleProduct);
    const saleProductArray = {
      _id: productId,
      itensSold: saleProduct,
    };
    return res.status(success).json(saleProductArray);
  } catch (error) {
    console.log(`createSaleController: ${error.message}`);
    return next(error);
  }
};

const getAllSalesController = async (req, res, next) => {
  try {
    const sales = await getAllSalesService();
    return res.status(success).json({ sales });
  } catch (error) {
    console.log(`getAllSalesController: ${error.message}`);
    return next(error);
  }
};

const getSalesByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await getSalesByIdService(id);
    return res.status(success).json(sale);
  } catch (error) {
    console.log(`getSalesByIdController: ${error.message}`);
    return next(error);
  }
};

const updateSalesByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sales = req.body;
    await updateSalesByIdService(id, sales);
    return res.status(success).json({ _id: id, itensSold: sales });
  } catch (error) {
    console.log(`updateSalesByIdController: ${error.message}`);
    return next(error);
  }
};

const deleteOneSaleByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await getSalesByIdDeleteService(id);
    await deleteOneSaleByIdService(id);
    return res.status(success).json(sale);
  } catch (error) {
    console.log(`deleteOneSaleByIdController: ${error.message}`);
    return next(error);
  }
};

module.exports = {
  createSaleController,
  getAllSalesController,
  getSalesByIdController,
  updateSalesByIdController,
  deleteOneSaleByIdController,
};
