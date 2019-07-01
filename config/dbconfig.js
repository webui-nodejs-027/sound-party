module.exports.test = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 123,
  database: 'music-test',
  entities: ['entities/*.js'],
  synchronize: true,
};

module.exports.development = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 123,
  database: 'music-base',
  entities: ['src/entities/*.js'],
  synchronize: true,
};
