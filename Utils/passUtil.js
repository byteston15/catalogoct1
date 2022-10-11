const bcrypt = require("bcrypt")

exports.encriptPassword = (pass) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(pass, salt)
    return hash
}
