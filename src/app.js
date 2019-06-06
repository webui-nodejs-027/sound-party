/* eslint-disable global-require */
require('reflect-metadata');
const express = require('express');
const { container, bindings } = require('./ioc');
const reqMiddleware = require('./middlewares/settingMiddlewares/reqMiddleware');
const errorMiddleware = require('./middlewares/settingMiddlewares/errorMiddleware');
const createDbConnection = require('./db/');

const app = express();
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});
const initial = async () => {
  await createDbConnection();
  await container.loadAsync(bindings);
  require('../config/passport-config');
  const routers = require('./routes/');
  reqMiddleware(app);
  routers(app);
  errorMiddleware(app);
  console.log('Database connected');
  app.listen(3000, () => {
    console.log('Server created');
  });
};

initial();
