module.exports = app => {
  // eslint-disable-next-line no-unused-vars
  app.use((req, res, next) => {
    res.sendStatus(404);
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    switch (err.name) {
      case 'AppError':
        res.status(err.statusCode || 400).json({ errors: err.message });
        break;
      case 'ValidationError':
        res.status(err.statusCode || 400).json({
          message: err.message,
          errors: err.errorsArray
        });
        break;
      default:
        res.status(err.statusCode || 400).json({ errors: err.message });
        break;
    }
  });
};
