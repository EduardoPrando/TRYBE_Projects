const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');

const { 
  createRecipeModel,
  getAllRecipesModel,
  getOneRecipeByIdModel,
  updateRecipeModel,
  deleteRecipeModel,
  uploadModel
} = require('../models/recipes.models');

const userCreateRecipe = {
  name: "Xablau de caju",
  ingredients: "caju, cajé",
  preparation: "cortar e jogar no liquidificador",
  userId: "random user Id",
}

const recipeUpdate = {
  name: "cajé de acarajú",
  ingredients: "acarajú e cajé",
  preparation: "cortar e jogar no liquidificador",
}

const mongoObjectIdExample = '507f1f77bcf86cd799439011'

let connectionMock;

describe('Testing recipes models:', () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });
  
  after(async () => {
    await connectionMock.db('Cookmaster').collection('recipes').drop();
    await MongoClient.connect.restore();
  });  

  const { name, ingredients, preparation, userId } = userCreateRecipe;

  describe('createRecipeModel function', () => {
    it('should return a id', async () => {
      const insertedId = await createRecipeModel(name, ingredients, preparation, userId);
      expect(insertedId).to.exist;
    });
  });

  describe('getAllRecipesModel function', () => {
    it('should return a array and one recipe', async () => {
      const recipes = await getAllRecipesModel();
      expect(recipes).to.be.a('array')
    });
    it('should return one recipe', async () => {
      const recipes = await getAllRecipesModel();
      expect(recipes).to.have.length(1);
    });
  });

  describe('getOneRecipeByIdModel function', () => {
    it('should return null if cant find any recipe', async () => {
      const searchById = await getOneRecipeByIdModel(mongoObjectIdExample);
      expect(searchById).to.be.null;
    });
    it('should return the recipe recipes', async () => {
      const insertedId = await createRecipeModel(name, ingredients, preparation, userId);
      const searchById = await getOneRecipeByIdModel(insertedId);
      expect(searchById._id).to.exist;
      expect(searchById.name).to.be.equal(name);
      expect(searchById.userId).to.be.equal(userId);
    });
  });

  describe('createRecipeModel function', () => {
    it('should update the recipe', async () => {
      const insertedId = await createRecipeModel(name, ingredients, preparation, userId);
      await updateRecipeModel(insertedId, recipeUpdate.name, recipeUpdate.ingredients, recipeUpdate.preparation);
      const searchById = await getOneRecipeByIdModel(insertedId);
      expect(recipeUpdate.name).to.be.equal(searchById.name)
    });
  });

  describe('deleteRecipeModel function', () => {
    it('should delete a recipe', async () => {
      const insertedId = await createRecipeModel(name, ingredients, preparation, userId);
      await deleteRecipeModel(insertedId);
      const searchById = await getOneRecipeByIdModel(mongoObjectIdExample);
      expect(searchById).to.be.null;
    });
  });
})

