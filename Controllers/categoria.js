const Categoria = require("../Models/Categoria");
const sq = require("../Db/conn");
const Producto = require("../Models/Producto");
const Lista_Producto = require("../Models/Lista_Producto");
const Foto = require("../Models/Foto");
const Lista_precio = require("../Models/Lista_precio");
const { Op } = require("sequelize");
const Api404Error = require("../Utils/api404Error");

exports.createCategoria = async (req, res, next) => {
  try {
    const result = await sq.transaction(async (t) => {
      const categoria = await Categoria.create(req.body);
      res.status(201).json({
        success: true,
        data: req.body,
      });
      return categoria;
    });
  } catch (err) {
    next(err);
  }
};

exports.getCategorias = async (req, res, next) => {
  try {
    let whereData = {};
    if (req.query.nombre) {
      whereData = {
        where: {
          nombre: {
            [Op.like]: `%${req.query.nombre}%`,
          },
        },
      };
    }
    const categoria = await Categoria.findAll(whereData);
    res.status(200).json({
      success: true,
      data: categoria,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: {
        error: err.message,
      },
    });
    next(err)
  }
};

exports.getCategoria = async (req, res, next) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) {
      throw new Api404Error(`Categoría con el id ${req.params.id} no encontrada`)
    }
    res.status(200).json({
      success: true,
      data: categoria,
    });
  } catch (err) {
    next(err)
  }
};

exports.updateCategoria = async (req, res, next) => {
  try {
    const result = sq.transaction(async (t) => {
      const categoria = await Categoria.update(req.body, {
        where: { id: req.params.id },
      });
      if (!categoria) {
        return res.status(404).json({
          success: false,
          error: "Categoria no encontrada con el id indicado",
        });
      }
      res.status(200).json({
        success: true,
        data: req.body,
      });
      return categoria;
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.deleteCategoria = async (req, res, next) => {
  try {
    const result = sq.transaction(async (t) => {
      const categoria = await Categoria.destroy({
        where: { id: req.params.id },
      });
      if (!categoria) {
        return res.status(404).json({
          success: false,
          error: "No se encontraron categorías con el id mencionado",
        });
      }
      res.status(200).json({
        success: true,
        data: {},
      });
      return categoria;
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.findProductByCategoria = async (req, res, next) => {
  try {
    const productos = await Producto.findAll({
      where: {
        "$Categorium.id$": req.params.id,
      },
      attributes: ["codigo", "descripcion", "barra", "createdAt", "updatedAt"],
      include: [
        {
          model: Lista_Producto,
          attributes: ["desde", "hasta", "monto", "liquidacion"],
          include: {
            model: Lista_precio,
            attributes: ["id", "nombre"],
          },
        },
        { model: Foto, attributes: ["url"] },
        { model: Categoria, attributes: ["id", "nombre"] },
      ],
    });
    if (!productos) {
      return res.status(404).json({
        success: false,
        data: {
          error: "No data",
        },
      });
    }
    res.status(200).json({
      success: true,
      len: productos.length,
      data: {
        productos,
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
