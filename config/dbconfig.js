module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: "password",
  database: 'music-base',
  entities: ['src/db/schemas/*.js'],
  synchronize: true,
};
