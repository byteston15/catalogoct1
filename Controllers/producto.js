const sq = require("../Db/conn");
const Producto = require("../Models/Producto");
const { Op } = require("sequelize");
const Foto = require("../Models/Foto");

exports.createProducto = async (req, res, next) => {
  try {
    const t = sq.transaction(async (t) => {
      const producto = await Producto.create(req.body);
      res.status(201).json({
        success: true,
        data: {
          created: req.body,
        },
      });
      return producto;
    });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({
      success: false,
      data: {
        error: err.mess, // LIKage,
      },
    });
  }
};

exports.getProductos = async (req, res, next) => {
  try {
    var whereCondition = {};
    if (req.query.descripcion) {
      whereCondition = {
        descripcion: {
          [Op.like]: `%${req.query.descripcion}%`,
        },
      };
    }
    const producto = await Producto.findAll({ where: whereCondition });
    const foto = await Foto.findAll({
      where: {
        //llamar a la foto
      },
    });
    if (!producto) {
      return res.status(404).json({
        success: false,
        data: {
          error: "No data",
        },
      });
    }
    res.status(200).json({
      success: true,
      len: producto.length,
      data: {
        producto,
      },
    });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({
      success: true,
      data: {
        error: err.message,
      },
    });
  }
};

exports.updateProducto = async (req, res, next) => {
  try {
    const t = sq.transaction(async (t) => {
      const producto = await Producto.update(req.body, {
        where: { codigo: req.params.id },
      });
      if (!producto) {
        return res.status(404).json({
          success: false,
          data: {
            error: "No data",
          },
        });
      }
      res.status(200).json({
        success: true,
        data: {
          updated: req.body,
        },
      });
      return producto;
    });
  } catch (err) {}
};

exports.deleteProducto = async (req, res, next) => {
  try {
    const t = sq.transaction(async (t) => {
      const producto = await Producto.destroy({
        where: { codigo: req.params.id },
      });
      if (!producto) {
        return res.status(404).json({
          success: false,
          data: {
            error: "No data",
          },
        });
      }
      res.status(200).json({
        success: true,
        data: {
          deleted: `Deleted ${req.params.id} succesfully`,
        },
      });
      return producto;
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
