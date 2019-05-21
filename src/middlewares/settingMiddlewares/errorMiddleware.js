module.exports = (app) => {
  app.use((req, res, next) => {
    res.sendStatus(404);
  });

  app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({ errors: err.message });
  });
};
