const connection = require('./connection.models');

const DB_COLLECTION = 'users';

const createUserModel = async (name, email, password, role) => {
  const con = await connection();
  const { insertedId } = await con
    .collection(DB_COLLECTION).insertOne({ name, email, password, role });
  return { name, email, role, _id: insertedId };
};

const findUserByEmailModel = async (email) => {
  const con = await connection();
  const user = await con.collection(DB_COLLECTION).findOne({ email });
  return user;
};

module.exports = {
  createUserModel,
  findUserByEmailModel,
};
