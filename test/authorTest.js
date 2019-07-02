process.env.NODE_ENV = 'test';
const jwt = require('jsonwebtoken');

const chai = require('chai');
const chaiHttp = require('chai-http');
const { container } = require('../src/ioc');
const { TYPES } = require('../src/constants');
const { SECRET } = require('../src/constants');

const token = jwt.sign({
  id: 1,
  roleId: 1,
}, SECRET, {
  expiresIn: '24h',
});

chai.should();
const { initialServer } = require('../src/app.js');

chai.use(chaiHttp);

const url = 'http://localhost:3001/api';

const authorPost = {
  name: 'test',
};
const authorPut = {
  name: 'test test',
};
let authorService = null;

const addAuthor = async () => {
  await authorService.insertData(authorPost);
  await authorService.insertData(authorPut);
};

async function clearDB() {
  authorService = container.get(TYPES.AuthorService);
  const manager = await authorService.repository.manager;
  await manager.connection.createQueryRunner()
    .query('TRUNCATE "playlist_songs_song", "playlist" , "user_meeting", "user", "meeting",\n'
      + '"status", "song", "genre", "author", "city", "role";');
}

describe('Author tests', async () => {
  before(async () => {
    await initialServer();
  });
  afterEach(async () => {
    await clearDB();
  });
  describe('PUT author /api/authors/ PUT', () => {
    beforeEach(async () => {
      authorService = container.get(TYPES.AuthorService);
      await authorService.insertData(authorPost);
    });
    it('Should change a author on /authors PUT', async () => {
      const curId = authorPost.id;
      const res = await chai.request(url)
        .put(`/authors/${curId}`)
        .send(authorPut)
        .set('Authorization', token);

      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.should.be.a('object');
      res.body.should.include.keys(
        'id',
        'name',
      );
      res.body.id.should.equal(curId);
    });
  });
  describe('getAll authors /api/authors GET', async () => {
    beforeEach(async () => {
      authorService = container.get(TYPES.AuthorService);
      await addAuthor();
      // await authorService.insertData(authorPost);
    });
    it('Should get a authors on /authors GET', async () => {
      const res = await chai.request(url)
        .get('/authors')
        .set('Authorization', token);
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.data.should.be.a('array');
      res.body.data[0].should.include.keys(
        'id',
        'name',
      );
      res.body.data.should.lengthOf(2);
    });
  });

  describe('get some author by id /api/authors/:id GET', () => {
    beforeEach(async () => {
      authorService = container.get(TYPES.AuthorService);
      await authorService.insertData(authorPost);
    });

    it('Should get a author on /authors/:id GET', async () => {
      const res = await chai.request(url)
        .get(`/authors/${authorPost.id}`)
        .set('Authorization', token);

      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.should.be.a('object');
      res.body.should.include.keys(
        'id',
        'name',
      );
      res.body.id.should.equal(authorPost.id);
    });
  });

  describe('delete some author by id /api/authors/:id DELETE', () => {
    beforeEach(async () => {
      authorService = container.get(TYPES.AuthorService);
      await authorService.insertData(authorPost);
    });

    it('Should delete a author on /authors/:id DELETE', async () => {
      const res = await chai.request(url)
        .delete(`/authors/${authorPost.id}`)
        .set('Authorization', token);

      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.should.be.a('object');
      res.body.should.include.keys(
        'id',
        'message',
      );
      res.body.id.should.equal(authorPost.id.toString());
    });
  });
  describe('Post author /api/authors/ POST', () => {
    beforeEach(async () => {
      authorService = container.get(TYPES.AuthorService);
    });

    it('Should add a author on /authors POST', async () => {
      const res = await chai.request(url)
        .post('/authors')
        .send(authorPost)
        .set('Authorization', token);

      res.status.should.equal(201);
      res.type.should.equal('application/json');
      res.body.should.be.a('object');
      res.body.should.include.keys(
        'id',
        'name',
      );
    });
  });
});
