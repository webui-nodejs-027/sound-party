process.env.NODE_ENV = 'test';

const { describe, it, beforeEach, before } = require('mocha');

const chai = require('chai');
const chaiHttp = require('chai-http');
const { container } = require('../src/ioc');
const { TYPES } = require('../src/constants');

chai.should();
const { initialServer } = require('../src/app');

chai.use(chaiHttp);

const url = 'http://localhost:3001/api';

let userPost = {
  firstName: 'Vadim',
  email: 'test11@gmail.com',
  password: '123321Anton',
  lastName: 'NotVegan',
  birthday: '1999-08-12',
  gender: 'male',
  socialLink: 'https://www.instagram.com/?hl=ru',
  roleId: 2,
};

let userService = null;

describe('User', () => {
  before(async () => {
    await initialServer();
  });

  beforeEach(async () => {
    userService = container.get(TYPES.UserService);
    await userService.insertData(userPost);
    userPost.email += 'test';
    await userService.insertData(userPost);
  });

  it('Should get a users on /users GET', () => chai
    .request(url)
    .get('/users')
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
      res.body.data.length.equal(2);
    }));
});
