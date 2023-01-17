const Comuna = require("../Models/Comuna");
const Cliente = require("../Models/Cliente");
const {NotFound} = require("../Utils/errors")

exports.getComuna = async (req, res, next) => {
  try {
    const comuna = await Comuna.findAll();
    res.status(200).json({
      data: comuna,
    });
  } catch (err) {
  next(err)
  }
};

/*Get cliente por la comúna */
exports.getClientByComuna = async (req, res, next) => {
  try {
    const cliente = await Cliente.findAll({
      where: { fk_id_comuna: req.params.id },
    });
    if (!cliente) {
      throw new NotFound(`No se encontró cliente con la comúna indicada, id : ${req.params.id}`)
    }
    res.status(200).json({
      success: true,
      data: cliente,
    });
  } catch (err) {
    next(err)
  }
};
