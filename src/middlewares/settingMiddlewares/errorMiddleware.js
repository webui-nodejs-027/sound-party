module.exports = (app) => {
  // eslint-disable-next-line no-unused-vars
  app.use((req, res) => {
    res.sendStatus(404);
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res) => {
    res.status(err.statusCode || 500).send({ errors: err.message });
  });
};
