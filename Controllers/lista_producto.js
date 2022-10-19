const Lista_Producto = require("../Models/Lista_Producto");
const sq = require("../Db/conn");

exports.createPrecio = async (req, res, next) => {
  try {
    const result = sq.transaction(async (t) => {
      const precio = await Lista_Producto.create(req.body);
      res.status(201).json({
        success: true,
        data: precio,
      });
      return precio;
    });
  } catch (err) {
    console.log(`Error stack : ${err.stack}`);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.updatePrecio = async (req, res, next) => {
  try {
    const t = sq.transaction(async (t) => {
      const lp = await Lista_Producto.update(req.body, {
        where: { id: req.params.id },
      });
      if (!lp) {
        return res.status(404).json({
          success: false,
          error: "precio no encontrada con el id indicado",
        });
      }
      res.status(200).json({
        success: true,
        data: req.body,
      });
      return lp;
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.deletePrecio = async (req, res, next) => {
  try {
    const t = sq.transaction(async (t) => {
      const lp = await Lista_Producto.destroy({
        where: { id: req.params.id },
      });
      if (!lp) {
        return res.status(404).json({
          success: false,
          error: "No se encontro precio con el id mencionado",
        });
      }
      res.status(200).json({
        success: true,
        data: {},
      });
      return lp;
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getPrecio = async (req, res, next) => {
  try {
    const precio = await Lista_Producto.findAll();
    res.status(200).json({
      success: true,
      len: precio.length,
      data: {
        precio,
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
