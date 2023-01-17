const Ciudad = require("../Models/Ciudad");
const Comuna = require("../Models/Comuna");

exports.getCiudad = async (req, res, next) => {
  try {
    const ciudad = await Ciudad.findAll();
    res.status(200).json({
      data: ciudad,
    });
  } catch (err) {
  next(err)
    }
};

exports.getComunasxCiudad = async (req, res, next) => {
  try {
    const comuna = await Comuna.findAll({
      where: {
        fk_id_ciudad: req.params.id,
      },
    });
    res.status(200).json({
      success: true,
      data: comuna,
    });
  } catch (err) {
  next(err)
  }
};
