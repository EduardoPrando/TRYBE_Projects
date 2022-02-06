const { ObjectId } = require('mongodb'); 
const connection = require('./connection.models');

const DB_COLLECTION = 'recipes';

const createRecipeModel = async (name, ingredients, preparation, userId) => {
  const con = await connection();
  const { insertedId } = await con
    .collection(DB_COLLECTION).insertOne({ name, ingredients, preparation, userId });
  return insertedId;
};

const getAllRecipesModel = async () => {
  const con = await connection();
  const recipe = await con.collection(DB_COLLECTION).find().toArray();
  return recipe;
};

const getOneRecipeByIdModel = async (id) => {
  const con = await connection();
  const recipe = await con.collection(DB_COLLECTION).findOne({ _id: ObjectId(id) });
  return recipe;
};

const updateRecipeModel = async (id, name, ingredients, preparation) => {
  const con = await connection();
  await con.collection(DB_COLLECTION).updateOne(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
    );
};

const deleteRecipeModel = async (id) => {
  const con = await connection();
  await con.collection(DB_COLLECTION).deleteOne({ _id: ObjectId(id) });
};

const uploadModel = async (id, filename) => {
  const con = await connection();
  await con.collection(DB_COLLECTION).updateOne(
    { _id: ObjectId(id) },
    { $set: { image: `localhost:3000/src/uploads/${filename}` } },
  );
};

module.exports = {
  createRecipeModel,
  getAllRecipesModel,
  getOneRecipeByIdModel,
  updateRecipeModel,
  deleteRecipeModel,
  uploadModel,
};
