module.exports = (app) => {
  // eslint-disable-next-line no-unused-vars
  app.use((req, res, next) => {
    res.sendStatus(404);
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({ errors: err.message });
  });
};
