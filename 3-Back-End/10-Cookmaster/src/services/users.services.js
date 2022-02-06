const { emailPasswordSchema, nameSchema } = require('../schemas/userSchemas');
const { badRequest, conflict, unauthorized } = require('../utils/dictionary/statusCode');
const { invalidEntry, emailRegistered, allFields, incorrectUserPassword,
      } = require('../utils/dictionary/messageError');
const { createUserModel, findUserByEmailModel,
      } = require('../models/users.models');
const errorHandlerUtils = require('../utils/function/errorHandlerUtils');
const { generateTokenService } = require('./authorization.service');

const createUserService = async (name, email, password, role) => {
  const { error } = emailPasswordSchema.validate({ email, password });

  const nameError = nameSchema.validate(name);

  if (error || nameError.error) throw errorHandlerUtils(badRequest, invalidEntry);

  const emailExist = await findUserByEmailModel(email);

  if (emailExist) throw errorHandlerUtils(conflict, emailRegistered);

  const newProduct = await createUserModel(name, email, password, role);
  return newProduct;
};

const generateToken = (user) => {
  const { password: _password, ...userWhitOutPassword } = user;
  const token = generateTokenService(userWhitOutPassword);
  return token;
};

const findUserByEmailService = async (email, password) => {
  const { error } = emailPasswordSchema.validate({ email, password });

  if (error) throw errorHandlerUtils(unauthorized, allFields);

  const dbUser = await findUserByEmailModel(email);

  if (!dbUser || dbUser.email !== email || dbUser.password !== password) {
    throw errorHandlerUtils(unauthorized, incorrectUserPassword);
  }
  
  const token = generateToken(dbUser);

  return token;
};

module.exports = {
  createUserService,
  findUserByEmailService,
};