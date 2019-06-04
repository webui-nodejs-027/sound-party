/* eslint-disable global-require */
require('reflect-metadata');
const express = require('express');
const { container, bindings } = require('./ioc');
const reqMiddleware = require('./middlewares/settingMiddlewares/reqMiddleware');
const errorMiddleware = require('./middlewares/settingMiddlewares/errorMiddleware');
const createDbConnection = require('./db/');

const app = express();

const initial = async () => {
  await createDbConnection();
  await container.loadAsync(bindings);
  require('../config/passport-config');
  require('express-async-errors');
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
