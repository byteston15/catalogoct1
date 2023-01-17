const Lista_Producto = require("../Models/Lista_Producto");
const sq = require("../Db/conn");
const Lista_precio = require("../Models/Lista_precio");
const { NotFound, BadRequest } = require("../Utils/errors");

exports.createPrecio = async (req, res, next) => {
  try {
    const result = await sq.transaction(async (t) => {
      const precio = await Lista_Producto.create(req.body);
      res.status(201).json({
        success: true,
        data: precio,
      });
      return precio;
    });
  } catch (err) {
    next(err);
  }
};

exports.updatePrecio = async (req, res, next) => {
  //Recibi lp en query obligatoriamente
  try {
    const t = await sq.transaction(async (t) => {
      const lp = await Lista_Producto.update(req.body, {
        where: {
          fk_lp_producto: req.params.id,
          fk_lp_listaprecio: req.query.lp,
        },
      });
      if (!req.query.lp) {
        throw new BadRequest(`El req.query.lp es obligatorio`);
      }
      if (!lp) {
        throw new NotFound(
          `No se encontro precio con el ${req.query.lp} ni con el ${req.params.id}`
        );
      }
      res.status(200).json({
        success: true,
        data: req.body,
      });
      return lp;
    });
  } catch (err) {
    next(err);
  }
};

exports.deletePrecio = async (req, res, next) => {
  try {
    const t = await sq.transaction(async (t) => {
      if (!req.query.lp) {
        throw new BadRequest(`No se especifico el req.query.lp`);
      }
      const lp = await Lista_Producto.destroy({
        where: {
          fk_lp_producto: req.params.id,
          fk_lp_listaprecio: req.query.lp,
        },
      });
      if (!lp) {
        throw new NotFound(
          `No se encontro precio con la lista de precio :${req.query.lp}, ni con el código ${req.params.id}`
        );
      }
      res.status(200).json({
        success: true,
        data: {},
      });
      return lp;
    });
  } catch (err) {
    next(err);
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
    next(err);
  }
};
