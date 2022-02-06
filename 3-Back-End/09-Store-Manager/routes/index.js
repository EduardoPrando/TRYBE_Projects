const express = require('express');
const productsRoutes = require('./productsRoutes');
const salesRoutes = require('./salesRoutes');

const router = express.Router();

router.use('/products', productsRoutes);

router.use('/sales', salesRoutes);

module.exports = router;