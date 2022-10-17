const sq = require("../Db/conn");
const Producto = require("../Models/Producto");
const { Op } = require("sequelize");

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
        error: err.message,
      },
    });
  }
};

exports.getProductos = async (req, res, next) => {
  try {
    if (req.params.descripcion) {
      const producto = await Producto.findAll({
        where: {
          descripcion: {
            [Op.iLike]: "%req.params.descripcion",
          },
        },
      });
    } else {
      const producto = await Producto.findAll();
    }
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
      const producto = await Producto.update(req.params.id, {
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
          update: req.body,
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
