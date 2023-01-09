const colors = require("colors");
const { BaseError } = require("sequelize/types");

exports.logError = (err, req, res, next) => {
  console.error(err);
};

exports.logErrorMidleware = (err, req, res, next) => {
  logError(err);
  next(err);
};

exports.returnError = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    data: {
      error: {
        message: err.message,
        description: err.description,
      },
    },
  });
};

exports.isOperationalError = (error) => {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
};

module.exports = {
  logError,
  logErrorMidleware,
  returnError,
  isOperationalError,
};
