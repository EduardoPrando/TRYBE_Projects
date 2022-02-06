const { nameSchema } = require('../schemas/userSchemas');
const recipeSchemas = require('../schemas/recipeSchemas');
const errorHandlerUtils = require('../utils/function/errorHandlerUtils');
const { badRequest, notFount } = require('../utils/dictionary/statusCode');
const { invalidEntry, recipeNotFound, 
      } = require('../utils/dictionary/messageError');
const { createRecipeModel,
        getAllRecipesModel,
        getOneRecipeByIdModel,
        updateRecipeModel,
        deleteRecipeModel,
        uploadModel,
      } = require('../models/recipes.models');
const idSchemas = require('../schemas/idSchemas');

const createRecipeService = async (name, ingredients, preparation, userIdReq) => {
  const nameVerify = nameSchema.validate(name);
  const { error } = recipeSchemas.validate({ ingredients, preparation });
  if (nameVerify.error || error) throw errorHandlerUtils(badRequest, invalidEntry);

  const newIngredientId = await createRecipeModel(name, ingredients, preparation, userIdReq);
  return newIngredientId;
};

const getAllRecipesService = async () => {
  const allRecipes = await getAllRecipesModel();

  return allRecipes;
};

const getOneRecipeByIdService = async (id) => {
  const { error } = idSchemas.validate(id);
  if (error) throw errorHandlerUtils(notFount, recipeNotFound);

  const recipe = await getOneRecipeByIdModel(id);

  if (!recipe) throw errorHandlerUtils(notFount, recipeNotFound);

  return recipe;
};

const updateRecipeService = async (id, recipe) => {
  const { name, ingredients, preparation } = recipe;
  const nameVerify = nameSchema.validate(name);
  const { error } = recipeSchemas.validate({ ingredients, preparation });
  if (nameVerify.error || error) throw errorHandlerUtils(badRequest, invalidEntry);

  await updateRecipeModel(id, name, ingredients, preparation);
};

const deleteRecipeService = async (id) => {
  const { error } = idSchemas.validate(id);
  if (error) throw errorHandlerUtils(notFount, invalidEntry);
  await deleteRecipeModel(id);
};

const uploadService = async (id, filename) => {
  await uploadModel(id, filename);
};

module.exports = {
  createRecipeService,
  getAllRecipesService,
  getOneRecipeByIdService,
  updateRecipeService,
  deleteRecipeService,
  uploadService,
};