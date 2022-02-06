const { expect } = require('chai');
const { ObjectId, MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');
const sinon = require('sinon');
const { verifyTokenService } = require('../services/authorization.service')

const UserModel = require('../models/users.models');
const { createUserService, findUserByEmailService } = require('../services/users.services');

const createdUser1 = {
  name: 'Xablau da Silva',
  email: 'xablei@email.com',
  role: 'user',
  _id: new ObjectId("61fc08f8f91762802a95516c")
}

const newUser = {
    name: 'Xablau da Silva',
    email: 'xablei@email.com',
    password: '123456',
    role: 'user',
  }

describe('User service test:', () => {
  describe('createUserService function', async () => {
    before(async () => {
      sinon.stub(UserModel, 'createUserModel').resolves(createdUser1);
    });

    after(() => {
      UserModel.createUserModel.restore();
    });

    const { name, email, password, role } = newUser;

    it('should return a object whit a user', async () => {
      const user = await createUserService(name, email, password, role);
      expect(user).to.be.an('object');
      expect(user).to.deep.equal(createdUser1);
    });

    it('if email already exist, should return a message: status: 409, and message: "Email already registered"', async () => {
      try {
        await createUserService(name, email, password, role);
      } catch (error) {
        expect(error).to.be.an('object');
        expect(error).to.have.property('status');
        expect(error).to.have.property('message');
        expect(error.status).to.be.equal(409);
        expect(error.message).to.be.equal('Email already registered')
      };
    });

    it('if the email has the wrong format, should return a message: status: 400, and message: "Invalid entries. Try again."', async () => {
      const emailTest = {
        name: 'Xablau da Silva',
        email: 'xamplo.com',
        password: '123456',
        role: 'user',
      }
      try {
        await createUserService({ ...emailTest });
      } catch (error) {
        expect(error).to.be.an('object');
        expect(error).to.have.property('status');
        expect(error).to.have.property('message');
        expect(error.status).to.be.equal(400);
        expect(error.message).to.be.equal('Invalid entries. Try again.')
      };
    });

    it('if email is not informed, should return a message: status: 400, and message: "Invalid entries. Try again."', async () => {
      const emailTest = {
        name: 'Xablau da Silva',
        password: '123456',
        role: 'user',
      }
      try {
        await createUserService({ ...emailTest });
      } catch (error) {
        expect(error).to.be.an('object');
        expect(error).to.have.property('status');
        expect(error).to.have.property('message');
        expect(error.status).to.be.equal(400);
        expect(error.message).to.be.equal('Invalid entries. Try again.')
      };
    });

    it('if the name has the wrong format, should return a message: status: 400, and message: "Invalid entries. Try again."', async () => {
      const emailTest = {
        name: 'Xa',
        email: 'xamplo@mail.com',
        password: '123456',
        role: 'user',
      }
      try {
        await createUserService({ ...emailTest });
      } catch (error) {
        expect(error).to.be.an('object');
        expect(error).to.have.property('status');
        expect(error).to.have.property('message');
        expect(error.status).to.be.equal(400);
        expect(error.message).to.be.equal('Invalid entries. Try again.')
      };
    });

    it('if email is not informed, should return a message: status: 400, and message: "Invalid entries. Try again."', async () => {
      const emailTest = {
        email: 'xamplo@mail.com',
        password: '123456',
        role: 'user',
      }
      try {
        await createUserService({ ...emailTest });
      } catch (error) {
        expect(error).to.be.an('object');
        expect(error).to.have.property('status');
        expect(error).to.have.property('message');
        expect(error.status).to.be.equal(400);
        expect(error.message).to.be.equal('Invalid entries. Try again.')
      };
    });

    it('if password is not informed, should return a message: status: 400, and message: "Invalid entries. Try again."', async () => {
      const emailTest = {
        name: 'Xablau da Silva',
        email: 'xamplo@mail.com',
        role: 'user',
      }
      try {
        await createUserService({ ...emailTest });
      } catch (error) {
        expect(error).to.be.an('object');
        expect(error).to.have.property('status');
        expect(error).to.have.property('message');
        expect(error.status).to.be.equal(400);
        expect(error.message).to.be.equal('Invalid entries. Try again.')
      };
    });
  });

  describe('findUserByEmailService function', async() => {
    before(async () => {
      sinon.stub(UserModel, 'findUserByEmailModel').resolves(newUser);
    });

    after(() => {
      UserModel.findUserByEmailModel.restore();
    });

    it('should return the user found', async () => {
      const user = await findUserByEmailService(newUser.email, newUser.password);
      const userByToken = verifyTokenService(user);
      expect(userByToken.email).to.be.equal(newUser.email);
    });

    const { email, password } = newUser;

    it('if the email is wrong, should return a message: status: 401, and message: "Incorrect username or password"', async () => {
      try {
        const email = 'xamplo@email.com'
        await findUserByEmailService(email, password);
      } catch (error) {
        expect(error).to.be.an('object');
        expect(error).to.have.property('status');
        expect(error).to.have.property('message');
        expect(error.status).to.be.equal(401);
        expect(error.message).to.be.equal('Incorrect username or password')
      };
    });

    it('if the email has the wrong format, should return a message: status: 401, and message: "All fields must be filled"', async () => {
      try {
        const email = 'example'

        await findUserByEmailService(email, password);
      } catch (error) {
        expect(error).to.be.an('object');
        expect(error).to.have.property('status');
        expect(error).to.have.property('message');
        expect(error.status).to.be.equal(401);
        expect(error.message).to.be.equal('All fields must be filled')
      };
    });

    it('if the email is not informed, should return a message: status: 401, and message: "All fields must be filled"', async () => {
      try {
        const email = '';
        
        await findUserByEmailService(email, password);
      } catch (error) {
        expect(error).to.be.an('object');
        expect(error).to.have.property('status');
        expect(error).to.have.property('message');
        expect(error.status).to.be.equal(401);
        expect(error.message).to.be.equal('All fields must be filled')
      };
    });

    it('if the password has the wrong format, should return a message: status: 401, and message: "Incorrect username or password"', async () => {
      try {
        const password = 'example';

        await findUserByEmailService(email, password);
      } catch (error) {
        expect(error).to.be.an('object');
        expect(error).to.have.property('status');
        expect(error).to.have.property('message');
        expect(error.status).to.be.equal(401);
        expect(error.message).to.be.equal('Incorrect username or password')
      };
    });

    it('if the password has the wrong format, should return a message: status: 401, and message: "All fields must be filled"', async () => {
      try {
        const password = '';

        await findUserByEmailService(email, password);
      } catch (error) {
        expect(error).to.be.an('object');
        expect(error).to.have.property('status');
        expect(error).to.have.property('message');
        expect(error.status).to.be.equal(401);
        expect(error.message).to.be.equal('All fields must be filled')
      };
    });
  });
})
