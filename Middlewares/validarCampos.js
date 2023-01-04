const colors = require("colors")

exports.validarCampos = (error ,req, res, next) => {
        console.log("Hay un error feito".red)
        next(error)
}