/* eslint-disable indent */
/* eslint-disable no-unused-expressions */
process.env.NODE_ENV = 'test';

const { describe, it } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const url = 'http://localhost:3001/api';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGVJZCI6MSwiaWF0IjoxNTYxOTcwMzM1LCJleHAiOjE1NjIwNTY3MzV9.lK1jQhZD0s0OJo8zlk81Xkcj_zmGdPAfADfIpfuUGhk';
let playlist = null;

describe('Playlists', () => {
  it('should list ALL playlists  of user on /playlists GET', () => chai.request(url)
    .get('/playlists')
    .set('Authorization', token)
    .then((res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('id');
      res.body[0].should.have.property('name');
      res.body[0].should.have.property('favourite');
      res.body[0].should.have.property('isMain');
      res.body[0].should.have.property('userId');
  }));

  it('should add a SINGLE playlist on /playlists POST', () => chai.request(url)
      .post('/playlists')
      .set('Authorization', token)
      .send({
        name: "Peter's playlist",
        favourite: false,
        isMain: false,
        userId: 1,
      })
      .then((res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('userId');
        res.body.should.have.property('name');
        res.body.should.have.property('favourite');
        res.body.should.have.property('isMain');
        res.body.should.have.property('id');
        res.body.name.should.equal("Peter's playlist");
        res.body.favourite.should.equal(false);
        res.body.isMain.should.equal(false);
        res.body.userId.should.equal(1);
        playlist = res.body;
      })
      .catch((e) => {
        throw e;
      }));

  it('should update a SINGLE playlist on /playlists/<id> PUT', () => chai.request(url)
      .put(`/playlists/${playlist.id}`)
      .send({ name: 'Spider' })
      .then((res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('userId');
        res.body.should.have.property('name');
        res.body.should.have.property('favourite');
        res.body.should.have.property('isMain');
        res.body.should.have.property('id');
        res.body.name.should.equal('Spider');
      })
      .catch((e) => {
        throw e;
      }));

  it('should list ALL songs on /playlists/<id>/songs GET', () => chai.request(url)
      .get(`/playlists/${playlist.id}/songs`)
      .then((res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('authorId');
        res.body[0].should.have.property('genreId');
        res.body[0].should.have.property('source');
        res.body[0].should.have.property('year');
      })
      .catch((e) => {
        throw e;
      }));

  it('should delete a SINGLE playlists on /playlists/<id> DELETE', () => chai.request(url)
      .delete(`/playlists/${playlist.id}`)
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.a('number');
      })
      .catch((e) => {
        throw e;
      }));

//   it('should add a SINGLE song to playlist on /playlists/<id>/addsong/<songId> POST');
//   it('should delete a SINGLE song from playlist on /playlists/<id>/removesong/<songId> POST');
});
