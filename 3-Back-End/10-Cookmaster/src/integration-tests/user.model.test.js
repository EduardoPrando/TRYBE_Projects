const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');

const { createUserModel, findUserByEmailModel } = require('../models/users.models');

const newUser = {
  name: "Xablau da Silva",
  email: "xablau@email.com",
  password: "12341234",
  role: "user",
  }

  describe('User model test:', async () => {
  let connectionMock;
    
  before(async () => {
		connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

	after(async () => {
    await connectionMock.db('Cookmaster').collection('users').drop();
		await MongoClient.connect.restore();
	});

  const { name, email, password, role } = newUser;
  describe('createUserModel function', async () => {
    it('should create a user', async () => {
      const user = await createUserModel(name, email, password, role);
      expect(user).to.be.a('object')
    });
    
    it('should have a id', async () => { 
      const user = await createUserModel(name, email, password, role);
      expect(user).to.have.a.property('_id');
    })
    it('role should be "user"', async () => { 
      const user = await createUserModel(name, email, password, role);
      expect(user.role).to.equal('user');
    });
  });

  describe('findUserByEmailModel function', () => {x
    it('return a user', async () => {
      const user = await createUserModel(name, email, password, role);
      const filteredUser = await findUserByEmailModel(email);
      expect(user.email).to.equal(newUser.email);
    });
  });
});
