module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 123,
  database: 'music-base',
  entities: ['db/schemas/*.js'],
  synchronize: true,
};
