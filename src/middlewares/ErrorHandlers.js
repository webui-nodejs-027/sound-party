class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.statusCode = statusCode || 500;
  }
}

class ValidationError extends AppError {
  constructor(errorsArray) {
    super('Validation failed', 400);
    this.errorsArray = errorsArray;
  }
}

module.exports = {
  AppError,
  ValidationError,
};
