module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 123,
  database: 'music-test',
  entities: ['src/entities/*.js'],
  synchronize: true,
};