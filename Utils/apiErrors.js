const httpStatusCodes = require("./httpStatusCodes");
const errorBase = require("./errorBase");

class Api404Error extends errorBase {
  constructor(
    name,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = "NOT FOUND",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

class Api500Error extends errorBase {
  constructor(
    name,
    statusCode = httpStatusCodes.INTERNAL_SERVER,
    description = "INTERNAL ERROR SERVER",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

class Api400Error extends errorBase {
  constructor(
    name,
    statusCode = httpStatusCodes.BAD_REQUEST,
    description = "BAD REQUEST",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

module.exports = Api404Error, Api500Error, Api400Error;
