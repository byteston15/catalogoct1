const colors = require("colors")

exports.errorHandler = (error, req, res, next) => {
    const status =  error.status || 400
    let code;

    let err = JSON.stringify(error)
    err = JSON.parse(err)
    console.log("TENGO UN ERROR QUE NO LOGRO ENCONTRAR")
};
