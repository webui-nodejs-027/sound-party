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

const genrePost = {
  name: 'test',
};

const genrePut = {
  name: 'test test',
};

let genreService = null;


const addGenre = async () => {
  await genreService.insertData(genrePost);
  await genreService.insertData(genrePut);
};

async function clearDB() {
  genreService = container.get(TYPES.GenreService);
  const manager = await genreService.repository.manager;
  await manager.connection.createQueryRunner()
    .query('TRUNCATE "playlist_songs_song", "playlist" , "user_meeting", "user", "meeting",\n'
    + '"status", "song", "genre", "author", "city", "role";');
}

describe('Genre tests', async () => {
  before(async () => {
    await initialServer();
  });
  afterEach(async () => {
    await clearDB();
  });
  describe('PUT genre /api/genres/ PUT', () => {
    beforeEach(async () => {
      genreService = container.get(TYPES.GenreService);
      await genreService.insertData(genrePost);
    });
    it('Should change a genre on /genres PUT', async () => {
      const curId = genrePost.id;
      const res = await chai.request(url)
        .put(`/genres/${curId}`)
        .send(genrePut)
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
  describe('getAll genres /api/genres GET', async () => {
    beforeEach(async () => {
      genreService = container.get(TYPES.GenreService);
      await addGenre();
      // await genreService.insertData(genrePost);
    });
    it('Should get a genres on /genres GET', async () => {
      const res = await chai.request(url)
        .get('/genres')
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

  describe('get some genre by id /api/genres/:id GET', () => {
    beforeEach(async () => {
      genreService = container.get(TYPES.GenreService);
      await genreService.insertData(genrePost);
    });

    it('Should get a genre on /genres/:id GET', async () => {
      const res = await chai.request(url)
        .get(`/genres/${genrePost.id}`)
        .set('Authorization', token);

      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.should.be.a('object');
      res.body.should.include.keys(
        'id',
        'name',
      );
      res.body.id.should.equal(genrePost.id);
    });
  });

  describe('delete some genre by id /api/genres/:id DELETE', () => {
    beforeEach(async () => {
      genreService = container.get(TYPES.GenreService);
      await genreService.insertData(genrePost);
    });

    it('Should delete a genre on /genres/:id DELETE', async () => {
      const res = await chai.request(url)
        .delete(`/genres/${genrePost.id}`)
        .set('Authorization', token);

      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.should.be.a('object');
      res.body.should.include.keys(
        'id',
        'message',
      );
      res.body.id.should.equal(genrePost.id.toString());
    });
  });
  describe('Post genre /api/genres/ POST', () => {
    beforeEach(async () => {
      genreService = container.get(TYPES.GenreService);
    });

    it('Should add a genre on /genres POST', async () => {
      const res = await chai.request(url)
        .post('/genres')
        .send(genrePost)
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
