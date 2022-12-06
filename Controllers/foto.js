const Foto = require("../Models/Foto");

exports.getFotos = async (req, res, next) => {
  try {
    const fotos = await Foto.findAll({ where: { fk_producto: req.params.id } });
    if (!fotos) {
      return res.status(404).json({
        success: false,
        data: {
          error: {
            message: "no data",
          },
        },
      });
    }
    console.log(req.hostname);
    res.status(200).json({
      success: true,
      length: fotos.length,
      data: {
        fotos,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: {
        error: {
          message: err.message,
        },
      },
    });
  }
};
