const { GeneralError } = require("../Utils/errors");
const colors = require("colors")

const printError = (error) => {
  console.log("---------------------------".red)
  console.log(error)
  console.log("---------------------------".red)
};


const logError = (err, req, res, next) => {
  printError(err)
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
