const { verifyTokenService } = require('../services/authorization.service');
const { jwtError, missingAuthToken, adminOnly } = require('../utils/dictionary/messageError');
const { unauthorized, forbidden } = require('../utils/dictionary/statusCode');
const errorHandlerUtils = require('../utils/function/errorHandlerUtils');

const userAuthorization = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw errorHandlerUtils(unauthorized, missingAuthToken);
    
    const user = verifyTokenService(authorization);
    if (!user) throw errorHandlerUtils(unauthorized, jwtError);
    req.user = user;
    
    next();
  } catch (error) {
    console.log('userAuthorization', error.message);
    next(error);
  }
};

const adminAuthorization = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw errorHandlerUtils(forbidden, adminOnly);
    
    const user = verifyTokenService(authorization);
    if (!user) throw errorHandlerUtils(unauthorized, jwtError);
    
    if (user.role !== 'admin') throw errorHandlerUtils(forbidden, adminOnly);
    
    req.user = user;

    next();
  } catch (error) {
    console.log('adminAuthorization', error.message);
    next(error);
  }
};

module.exports = {
  userAuthorization,
  adminAuthorization,
};
