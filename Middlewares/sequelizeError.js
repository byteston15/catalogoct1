const { GeneralError } = require("../Utils/errors");

const sequelizeError = (err, req, res, next) => {
  let fields = [];
  if (err.name == "SequelizeValidationError") {
    for (val of err.errors) {
      fields.push({
        type: val.type,
        name: val.message,
        field: val.path,
      });
    }
    return res.status(400).json({
      success: false,
      error: {
        code: 101,
        fields_affected: fields.length,
        fields: fields,
      },
    });
  }
};

module.exports = sequelizeError;
