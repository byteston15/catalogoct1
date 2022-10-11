const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config({ path: "../Config/config.env" });

const generarJWT = (correo) => {
  return new Promise((resolve, reject) => {
    const payload = { correo };

    jwt.sign(
      payload,
      process.env.PRIVATE_TOKEN,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generarJWT,
};
