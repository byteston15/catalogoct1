const Giro = require("../Models/Giro");
const Cliente = require("../Models/Cliente");

exports.getGiros = async (req, res, next) => {
  try {
    const giro = await Giro.findAll();
    res.status(200).json({
      data: giro,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/*Get cliente por la giro */
exports.getClientByGiro = async (req, res, next) => {
  try {
    const cliente = await Cliente.findAll({
      where: { fk_id_comuna: req.params.id },
    });
    if (!cliente) {
      res
        .status(404)
        .json({ success: false, error: "No existen clientes para el giro }" });
    }
    res.status(200).json({
      success: true,
      data: cliente,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
