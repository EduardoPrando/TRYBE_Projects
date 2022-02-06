const { createUserService, findUserByEmailService } = require('../services/users.services');
const { created, success } = require('../utils/dictionary/statusCode');

const createUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const role = req.path === '/admin' ? 'admin' : 'user';
    const newUser = await createUserService(name, email, password, role);
    
    return res.status(created).json({ user: newUser });
  } catch (error) {
    console.log('createUserController', error.message);
    next(error);
  }
};

const userLoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await findUserByEmailService(email, password);
    return res.status(success).json({ token });
  } catch (error) {
    console.log('userLoginController', error.message);
    next(error);
  }
};

module.exports = { 
  createUserController,
  userLoginController,
};