const { ObjectId } = require('mongodb'); 
const connection = require('./connection.models');

const DB_COLLECTION = 'products';

const createProductModel = async (name, quantity) => {
  const con = await connection();
  const { insertedId } = await con.collection(DB_COLLECTION).insertOne({ name, quantity });
  return { id: insertedId };
};

const findProductByName = async (name) => {
  const con = await connection();
  const product = await con.collection(DB_COLLECTION).findOne({ name });
  return product;
};

const findProductById = async (id) => {
  const con = await connection();
  const product = await con.collection(DB_COLLECTION).findOne({ _id: ObjectId(id) });
  return product;
};

const findAllProduct = async () => {
  const con = await connection();
  const products = await con.collection(DB_COLLECTION).find().toArray();
  return products;
};

// https://stackoverflow.com/questions/47656515/updateone-on-mongodb-not-working-in-node-js
const updateProductByIdModel = async (id, name, quantity) => {
  const con = await connection();
  await con.collection(DB_COLLECTION).updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity } },
  );
};

const deleteOneByIdModel = async (id) => {
  const con = await connection();
  await con.collection(DB_COLLECTION).deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  createProductModel,
  findProductByName,
  findAllProduct,
  findProductById,
  updateProductByIdModel,
  deleteOneByIdModel,
};