const Giro = require("../Models/Giro");
const Cliente = require("../Models/Cliente");
const { NotFound } = require("../Utils/errors");

exports.getGiros = async (req, res, next) => {
  try {
    const giro = await Giro.findAll();
    res.status(200).json({
      data: giro,
    });
  } catch (err) {
    next(err);
  }
};

/*Get cliente por la giro */
exports.getClientByGiro = async (req, res, next) => {
  try {
    const cliente = await Cliente.findAll({
      where: { fk_id_giro: req.params.id },
    });
    if (!cliente) {
      throw new NotFound(`No se encontro cliente con el giro ${req.params.id}`);
    }
    res.status(200).json({
      success: true,
      data: cliente,
    });
  } catch (err) {
    next(err);
  }
};
