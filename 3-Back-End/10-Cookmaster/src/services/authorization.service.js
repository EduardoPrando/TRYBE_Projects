const jwt = require('jsonwebtoken');

const API_SECRET = 'ABC123456';

const JWT_CONFIG = {
  expiresIn: 3600,
  algorithm: 'HS256',
};

const generateTokenService = (data) => jwt.sign({ data }, API_SECRET, JWT_CONFIG);

const verifyTokenService = (token) => {
  try {
    const decode = jwt.verify(token, API_SECRET);
    const user = decode.data;
    return user;
  } catch (error) {
    console.log('VerifyToken Error');
    return null;
  }
};

module.exports = {
  generateTokenService,
  verifyTokenService,
};
