module.exports = app => {
  app.use((req, res) => {
    res.sendStatus(404);
  });

  app.use((err, req, res) => {
    res.status(err.statusCode || 500).send({ errors: err.message });
  });
};
