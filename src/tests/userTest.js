process.env.NODE_ENV = 'test';

const { describe, it } = require('mocha');

const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

const { server } = require('../app');

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInJvbGVJZCI6MSwia
// WF0IjoxNTYxOTI4ODYxLCJleHAiOjE1NjIwMTUyNjF9.8PmM6Xp6M5iEj6GLsFxCM5yfl2PARQ8Nc4WGfOF9lfM';

chai.use(chaiHttp);

const url = 'http://localhost:3001/api';
let user = null;
let token = null;

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
  it('Should add a user on /users/ POST', () => chai.request(url)
    .post('/users')
    .send(userPost)
    .then((res) => {
      res.status.should.equal(201);
      res.type.should.equal('application/json');
      res.body.should.be.a('object');
      res.body.should.include.keys(
        'id', 'firstName', 'lastName', 'email', 'birthday', 'gender', 'socialLink', 'roleId',
      );
      user = res.body;
    }));
  it('Should get a token on /users/login POST', () => chai.request(url)
    .post('/users/login')
    .send({
      email: user.email,
      password: '123321Anton',
    })
    .then((res) => {
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.should.be.a('object');
      res.body.success.should.eql('true');
      res.body.should.include.keys(
        'success', 'message', 'token',
      );
      token = res.body.token;
    }));
  it('Should get a users on /users GET', () => chai.request(url)
    .get('/users')
    .set('Authorization', token)
    .then((res) => {
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.data.should.be.a('array');
      res.body.data[0].should.include.keys(
        'id', 'firstName', 'lastName', 'email', 'birthday', 'gender', 'socialLink', 'roleId',
      );
    }));
  it('Should get a user on /users/:id GET', () => chai.request(url)
    .get(`/users/${user.id}`)
    .set('Authorization', token)
    .then((res) => {
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.should.be.a('object');
      res.body.should.include.keys(
        'id', 'firstName', 'lastName', 'email', 'birthday', 'gender', 'socialLink', 'roleId',
      );
    }));
});


// describe('Users', () => {
//   it('should response with all users', () => chai.request(url)
//     .get('/users/505')
//     .set('Authorization', token)
//     .then((res) => {
//       res.status.should.equal(200);
//       res.type.should.equal('application/json');
//       res.body.data.should.be.a('array');
//       res.body.data[0].should.include.keys(
//         'id', 'firstName', 'lastName', 'email', 'birthday', 'gender', 'socialLink', 'roleId',
//       );
//     })
//     .catch(err => console.log(err)));
// });

//   it('should return Users', (done) => {
//     chai.request(url)
//       .get('/users/4')
//       .end((err, res) => {
//         should.not.exist(err);
//         res.status.should.equal(200);
//         res.type.should.equal('application/json');
//         res.body.data.should.be.a('array');
//         res.body.data[0].should.include.keys(
//           'id', 'firstName', 'lastName', 'email', 'birthday', 'gender', 'socialLink', 'roleId',
//         );
//         done();
//       });
//   });
// });
// it('add new User', () => {
//   chai.request(url)
//     .post('/users')
//     .send(userPost)
//     .then((res) => {
//       res.status.should.equal(201);
//       res.type.should.equal('application/json');
//       res.body.should.be.a('object');
//       res.body.should.include.keys(
//         'id', 'firstName', 'lastName', 'email', 'birthday', 'gender', 'socialLink', 'roleId',
//       );
//       user = res.body;
//     })
//     .catch(err => console.log(err));
