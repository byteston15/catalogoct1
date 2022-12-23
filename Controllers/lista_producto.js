const Lista_Producto = require("../Models/Lista_Producto");
const sq = require("../Db/conn");
const Lista_precio = require("../Models/Lista_precio");

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
  //Recibi lp en query obligatoriamente
  try {
    const t = sq.transaction(async (t) => {
      const lp = await Lista_Producto.update(req.body, {
        where: {
          fk_lp_producto: req.params.id,
          fk_lp_listaprecio: req.query.lp,
        },
      });
      if (!req.query.lp) {
        return res.status(400).json({
          success: false,
          data: {
            error: {
              message: "No se indico lp id para modificar en el query",
            },
          },
        });
      }
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
      if (!req.query.lp) {
        return res.status(400).json({
          success: false,
          data: {
            error: {
              message: "No se indico lp id para modificar en el query",
            },
          },
        });
      }
      const lp = await Lista_Producto.destroy({
        where: {
          fk_lp_producto: req.params.id,
          fk_lp_listaprecio: req.query.lp,
        },
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
    const precio = await Lista_Producto.findAll({
      include: { model: Lista_precio, attributes: ["nombre"] },
    });
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
