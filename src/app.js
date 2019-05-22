const express = require('express');
const reqMiddleware = require('./middlewares/settingMiddlewares/reqMiddleware');
const errorMiddleware = require('./middlewares/settingMiddlewares/errorMiddleware');
const createDbConnection = require('./db/');
const routers = require('./routes/');

const app = express();

reqMiddleware(app);

routers(app);

errorMiddleware(app);

const initial = async () => {
  await createDbConnection();
  console.log('Database connected');
  app.listen(3000, () => {
    console.log('Server created');
  });
};

initial();
