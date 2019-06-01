module.exports = app => {
  // eslint-disable-next-line no-unused-vars
  app.use((req, res, next) => {
    res.sendStatus(404);
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (err.name === 'AppError')
      res.status(err.statusCode || 500).json({ errors: err.message });
    if (err.name === 'ValidationError') {
      res.status(err.statusCode || 400).json({
        message: err.message,
        errors: err.errorsArray
      });
    }
  });
};
