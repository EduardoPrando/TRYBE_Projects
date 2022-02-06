const { createRecipeService,
        getAllRecipesService,
        getOneRecipeByIdService,
        updateRecipeService,
        deleteRecipeService,
        uploadService,
      } = require('../services/recipes.services');
const { created, success, noContent } = require('../utils/dictionary/statusCode');

const createRecipeController = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id: userIdReq } = req.user;
    const newRecipeId = await createRecipeService(name, ingredients, preparation, userIdReq);
    const recipe = {
      name,
      ingredients,
      preparation,
      userId: userIdReq,
      _id: newRecipeId,
    };

    return res.status(created).json({ recipe });
  } catch (error) {
    console.log('createRecipeController', error.message);
    next(error);
  }
};

const getAllRecipesController = async (req, res, next) => {
  try {
    const products = await getAllRecipesService();
    return res.status(success).json(products);
  } catch (error) {
    console.log('getAllRecipesController', error.message);
    next(error);
  }
};

const getOneRecipeByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getOneRecipeByIdService(id);
    return res.status(success).json(product);
  } catch (error) {
    console.log('getOneRecipeByIdController', error.message);
    next(error);
  }
};

const updateRecipeController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: userInfo } = req.user;
    const recipe = req.body;
    await updateRecipeService(id, recipe);
    const { name, ingredients, preparation } = recipe;
    const updatedRecipe = {
      _id: id,
      name,
      ingredients,
      preparation,
      userId: userInfo,
    };

    return res.status(success).json(updatedRecipe);
  } catch (error) {
    console.log('updateRecipeController', error.message);
    next(error);
  }
};

const deleteRecipeController = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteRecipeService(id);
    res.status(noContent).json();
  } catch (error) {
    console.log('deleteRecipeController', error.message);
    next(error);
  }
};

const uploadController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { filename } = req.file;
    await uploadService(id, filename);
    const recipeImgUpload = await getOneRecipeByIdService(id);
    return res.status(success).json(recipeImgUpload);
  } catch (error) {
    console.log('uploadController', error.message);
    next(error);
  }
};

module.exports = {
  createRecipeController,
  getAllRecipesController,
  getOneRecipeByIdController,
  updateRecipeController,
  deleteRecipeController,
  uploadController,
};