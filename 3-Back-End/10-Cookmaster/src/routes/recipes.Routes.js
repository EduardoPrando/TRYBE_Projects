const express = require('express');
const { createRecipeController,
  getAllRecipesController,
  getOneRecipeByIdController,
  updateRecipeController,
  deleteRecipeController,
  uploadController,
  } = require('../controller/recipes.controller');
const { userAuthorization } = require('../middleware/authorizeToken');
const upload = require('../middleware/uploadMulter');

const recipesRoutes = express.Router();

recipesRoutes.post('/', userAuthorization, createRecipeController);

recipesRoutes.get('/', getAllRecipesController);

recipesRoutes.get('/:id', getOneRecipeByIdController);

recipesRoutes.put('/:id', userAuthorization, updateRecipeController);

recipesRoutes.delete('/:id', userAuthorization, deleteRecipeController);

recipesRoutes.put('/:id/image/', userAuthorization, upload, uploadController);

module.exports = recipesRoutes;
