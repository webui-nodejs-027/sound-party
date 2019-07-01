/* eslint-disable no-unused-vars */
process.env.NODE_ENV = 'test';

const { describe, it } = require('mocha');

const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const { server } = require('../src/app');

chai.use(chaiHttp);

const url = 'http://localhost:3001/api';

const userPost = {
  firstName: 'Vadim',
  email: 'test3@gmail.com',
  password: '123321Anton',
  lastName: 'NotVegan',
  birthday: '1999-08-12',
  gender: 'male',
  socialLink: 'https://www.instagram.com/?hl=ru',
};

describe('User', () => {
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
    }));
});
