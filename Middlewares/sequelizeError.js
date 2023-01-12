const { GeneralError } = require("../Utils/errors");

const sequelizeError = (err, req, res, next) => {
  let fields = [];
  if (err.name == "SequelizeValidationError") {
    for (val of err.errors) {
      fields.push({
        type: val.type,
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
  if (err.name == "SequelizeForeignKeyConstraintError") {
    return res.status(400).json({
      success: false,
      error: {
        code: 102,
        field: err.fields[0],
        name: err.name,
      },
    });
  }

  if (err.name == "SequelizeUniqueConstraintError") {
    return res.status(400).json({
      success: false,
      error: {
        code: 103,
        name : err.name
      },
    });
  }

  next(err);
};

module.exports = sequelizeError;
