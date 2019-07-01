process.env.NODE_ENV = 'test';
const jwt = require('jsonwebtoken');

const {
  describe, it, beforeEach, before,
} = require('mocha');

const chai = require('chai');
const chaiHttp = require('chai-http');
const { SECRET } = require('../src/constants');
const { container } = require('../src/ioc');
const { TYPES } = require('../src/constants');

const token = jwt.sign({
  id: 1,
  roleId: 1,
}, SECRET, {
  expiresIn: '24h',
});


chai.should();
const { initialServer } = require('../src/app');

chai.use(chaiHttp);

const url = 'http://localhost:3001/api';

const userFirst = {
  firstName: 'Vadim',
  email: 'test52@gmail.com',
  password: '123321Anton',
  lastName: 'NotVegan',
  birthday: '1999-08-12',
  gender: 'male',
  socialLink: 'https://www.instagram.com/?hl=ru',
  roleId: 1,
};

let userPut = null;

let userService = null;
let roleService = null;

const createUser = async () => {
  await roleService.insertData({
    name: 'admin',
  });
  await userService.insertData(userFirst);
  const { id, ...secondUser } = userFirst;
  secondUser.email += 'secondUser';
  await userService.insertData(secondUser);
};

describe('getAll users /api/users GET', () => {
  before(async () => {
    await initialServer();
  });

  beforeEach(async () => {
    userService = container.get(TYPES.UserService);
    roleService = container.get(TYPES.RoleService);

    await createUser();
  });

  it('Should get a users on /users GET', () => chai
    .request(url)
    .get('/users')
    .set('Authorization', token)
    .then((res) => {
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.data.should.be.a('array');
      res.body.data[0].should.include.keys(
        'id',
        'firstName',
        'lastName',
        'email',
        'birthday',
        'gender',
        'socialLink',
        'roleId',
      );
      res.body.data.should.lengthOf(2);
    }));
});

describe('get some user /api/user/:id GET', () => {
  before(async () => {
    await initialServer();
  });

  beforeEach(async () => {
    userService = container.get(TYPES.UserService);
    roleService = container.get(TYPES.RoleService);

    await createUser();
  });

  it('Should get a user on /users/:id GET', () => chai
    .request(url)
    .get(`/users/${userFirst.id}`)
    .set('Authorization', token)
    .then((res) => {
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.should.be.a('object');
      res.body.should.include.keys(
        'id',
        'firstName',
        'lastName',
        'email',
        'birthday',
        'gender',
        'socialLink',
        'roleId',
      );
      res.body.id.should.equal(userFirst.id);
    }));
});

describe('delete some user /api/user/:id DELETE', () => {
  before(async () => {
    await initialServer();
  });

  beforeEach(async () => {
    userService = container.get(TYPES.UserService);
    roleService = container.get(TYPES.RoleService);

    await createUser();
  });

  it('Should delete a user on /users/:id DELETE', () => chai
    .request(url)
    .delete(`/users/${userFirst.id}`)
    .set('Authorization', token)
    .then((res) => {
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.should.be.a('object');
      res.body.should.include.keys(
        'id',
        'message',
      );
      res.body.id.should.equal(userFirst.id.toString());
    }));
});

describe('Post user /api/user/ POST', () => {
  before(async () => {
    await initialServer();
    roleService = container.get(TYPES.RoleService);
    await roleService.insertData({
      name: 'guest',
    });
  });

  it('Should add a user on /users POST', () => chai
    .request(url)
    .post('/users')
    .send(userFirst)
    .set('Authorization', token)
    .then((res) => {
      res.status.should.equal(201);
      res.type.should.equal('application/json');
      res.body.should.be.a('object');
      res.body.should.include.keys(
        'id',
        'firstName',
        'lastName',
        'email',
        'birthday',
        'gender',
        'socialLink',
        'roleId',
      );
      res.body.id.should.equal(1);
    }));
});

describe('PUT user /api/user/ PUT', () => {
  before(async () => {
    await initialServer();
    roleService = container.get(TYPES.RoleService);
    userService = container.get(TYPES.UserService);
    await roleService.insertData({
      name: 'guest',
    });
    await userService.insertData(userFirst);
    const { id, ...secondUser } = userFirst;
    secondUser.email += 'secondUser';
    userPut = secondUser;
  });

  it('Should change a user on /users PUT', () => chai
    .request(url)
    .put(`/users/${userFirst.id}`)
    .send(userPut)
    .set('Authorization', token)
    .then((res) => {
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.should.be.a('object');
      res.body.should.include.keys(
        'id',
        'firstName',
        'lastName',
        'email',
        'birthday',
        'gender',
        'socialLink',
        'roleId',
      );
      res.body.id.should.equal(userFirst.id);
    }));
});
