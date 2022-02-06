const { ObjectId } = require('mongodb'); 
const connection = require('./connection.models');

const DB_COLLECTION = 'sales';

const createSalesModel = async (saleProduct) => {
  const con = await connection();
  const { insertedId } = await con.collection(DB_COLLECTION).insertOne(
    { itensSold: saleProduct },
  );
  return insertedId;
};

const getAllSalesModel = async () => {
  const conn = await connection();
  const sales = await conn.collection(DB_COLLECTION).find().toArray();
  return sales;
};

const getSalesByIdModel = async (id) => {
  const conn = await connection();
  const sale = await conn.collection(DB_COLLECTION).findOne({ _id: ObjectId(id) });
  return sale;
};

const updateSaleByIdModel = async (id, sale) => {
  const con = await connection();
  await con.collection(DB_COLLECTION).updateOne(
    { _id: ObjectId(id) },
    { $set: { itensSold: sale } },
  );
};

const deleteOneSaleByIdModel = async (id) => {
  const con = await connection();
  await con.collection(DB_COLLECTION).deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  createSalesModel,
  getAllSalesModel,
  getSalesByIdModel,
  updateSaleByIdModel,
  deleteOneSaleByIdModel,
};