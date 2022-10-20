exports.errorHandler = (error, req, res, next) => {
  const status = error.status || 400;
  let message = error.message;
  let code;
  console.log(error.message);
  console.log(error.stack);
  console.log(error.name);
  console.log(error.stack);
  if (error.name == "SequelizeUniqueConstraintError") {
    message = `ID REGISTRADO EN LA BASE DE DATOS`;
    code = 99;
  }

  res.status(status).json({
    success: false,
    error: {
      code,
      message,
    },
  });
};
