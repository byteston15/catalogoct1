const Cliente = require("../Models/Cliente");
const { generarJWT } = require("../Utils/generateJWT");
const { validPassword } = require("../Utils/passUtil");

exports.login = async (req, res, next) => {
  try {
    const cl1 = await Cliente.findOne({ where: { correo: req.body.correo } });
    console.log(cl1);
    if (!cl1) {
      return res.status(400).json({
        success: false,
        data: {
          error: "Cliente no existe",
        },
      });
    }
    if (!validPassword(req.body.pass, cl1.pass)) {
      return res.status(401).json({
        success: false,
        data: {
          error: "Credenciales incorrectas",
        },
      });
    }
    const token = await generarJWT(cl1.correo);
    res.status(200).json({
      success: true,
      data: {
        token,
      },
    });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({
      success: false,
      data: {
        error: err.message,
      },
    });
  }
};
