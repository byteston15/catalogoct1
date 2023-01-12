const { GeneralError } = require("../Utils/errors");

const printError = (error) => {
  console.error(error);
};


const logError = (err, req, res, next) => {
  printError(err.stack)
  next(err)
}

const handleErrors = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      success: false,
      data: {
        error: {
          message: err.message,
        },
      },
    });
  }

  return res.status(500).json({
    success: false,
    error: {
      message: err.message,
    },
  });
};

module.exports = {handleErrors, logError};
