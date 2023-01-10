const { BaseError } = require("sequelize");

/*function logError(err, req, res, next) {
  console.error(err);
  next(err);
}*/

function returnError(err, req, res, next) {
  res.status(err.statusCode || 500).json({
    success: false,
    data: {
      error: {
        message: err.message,
        isOperational: err.isOperational,
      },
    },
  });
  next(err);
}

const isOperationalError = (error) => {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
};

module.exports = {
  isOperationalError,
  returnError,
  logError,
};
