const express = require('express');
const path = require('path');
const { userLoginController } = require('../controller/user.controller');
const recipesRoutes = require('./recipes.Routes');
const userRoutes = require('./users.Routes');

const router = express.Router();

const uploadDirectory = path.join(__dirname, '..', 'uploads');
// http://expressjs.com/en/starter/static-files.html#serving-static-files-in-express
router.use('/images', express.static(uploadDirectory));

router.use('/users', userRoutes);

router.post('/login', userLoginController);

router.use('/recipes', recipesRoutes);

module.exports = router;
