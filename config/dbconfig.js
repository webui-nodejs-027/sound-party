module.exports.test = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 123,
  database: 'music-test',
  entities: ['entities/*.js'],
  synchronize: true,
};

module.exports.development = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 123,
  database: 'music-base',
  entities: ['entities/*.js'],
  synchronize: true,
};
