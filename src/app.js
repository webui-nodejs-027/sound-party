const express = require('express');
const dbConnect = require('./db/dbconnect');
const routers = require('./routes/routers');

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use('/', routers.mainRoute);
app.use('/api/users', routers.userRoute);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({ errors: err.message });
});

app.listen(3000, async () => {
  console.log('Server created');
  await dbConnect.createDbConnection();
  console.log('Database connected');
});
