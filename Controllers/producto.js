const sq = require("../Db/conn");
const Producto = require("../Models/Producto");
const { Op } = require("sequelize");
const Foto = require("../Models/Foto");
const Categoria = require("../Models/Categoria");
const Lista_Producto = require("../Models/Lista_Producto");
const Lista_precio = require("../Models/Lista_precio");

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
    let exclude = ["createdAt", "deletedAt", "updatedAt"];
    let whereCondition = {};
    let whereCategory = {};
    let orderArray = [];
    if (req.query.category) {
      whereCategory = {
        fk_categoria_producto: req.query.category,
      };
    }
    if (req.query.descripcion) {
      whereCondition = {
        descripcion: {
          [Op.like]: `%${req.query.descripcion}%`,
        },
      };
    }
    if (req.query.order) {
      orderArray.push(req.query.order);
    }

    if (req.query.how) {
      orderArray.push(req.query.how);
    }
    console.log(orderArray);

    let whereVal = Object.assign(whereCondition, whereCategory);

    const producto = await Producto.findAll({
      where: whereCondition,
      order: [orderArray],
      include: [
        {
          model: Categoria,
          attributes: { exclude: exclude },
        },
        {
          model: Lista_Producto,
          include: {
            model: Lista_precio,
            attributes: { exclude: exclude },
          },
          attributes: {
            exclude: exclude,
          },
        },
        { model: Foto },
      ],
      attributes: { exclude: exclude },
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
