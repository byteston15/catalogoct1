exports.errorHandler = (error, req, res, next) => {
  const status = error.status || 400;
  let message = error.message;
  let code;
  let err = JSON.stringify(error);
  err = JSON.parse(err);
  console.log(err);
  //console.log("Error name " + error.name);
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
