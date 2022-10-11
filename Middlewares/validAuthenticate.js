const Cliente = require("../Models/Cliente");
const jwt = require("jsonwebtoken");

exports.validAuth = async (req, res, next) => {
  const token = req.header("cat_token");
  if (!token) {
    return res.status(401).json({
      success: false,
      data: {
        error: "No token, no access!",
      },
    });
  }
  try {
    const { correo } = jwt.verify(token, process.env.PRIVATE_TOKEN);
    const cl1 = await Cliente.findOne({ where: { correo: req.body.correo } });
    if (!cl1) {
      return res.status(401).json({
        success: false,
        data: {
          error: "Problemas con el token",
        },
      });
    }
    req.correo = correo;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      data: {
        error: err.message,
      },
    });
  }
};
