const express = require('express');
const { createUserController } = require('../controller/user.controller');
const { adminAuthorization } = require('../middleware/authorizeToken');

const userRoutes = express.Router();

userRoutes.post('/', createUserController);

userRoutes.post('/admin', adminAuthorization, createUserController);

module.exports = userRoutes;