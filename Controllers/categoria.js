const Categoria = require("../Models/Categoria");
const sq = require("../Db/conn");
const Producto = require("../Models/Producto");
const Lista_Producto = require("../Models/Lista_Producto");
const Foto = require("../Models/Foto");
const Lista_precio = require("../Models/Lista_precio");

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
    console.log(`Error stack : ${err.stack}`);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getCategorias = async (req, res, next) => {
  try {
    const categoria = await Categoria.findAll();
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
  }
};

exports.getCategoria = async (req, res, next) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) {
      return res.status(404).json({
        success: false,
        error: "No se encuentra categoria con el id indicado",
      });
    }
    res.status(200).json({
      success: true,
      data: categoria,
    });
  } catch (err) {
    console.log(`Error Stack :${err.stack}`);
    res.status(500).json({
      success: false,
      error: err.message,
    });
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
    const p = await Producto.findAll({
      where: {
        fk_categoria_producto: req.params.id,
      },
      attributes: ["codigo", "descripcion", "barra"],
    });
    if (!p) {
      return res.status(404).json({
        success: false,
        data: {
          error: "No data",
        },
      });
    }
    res.status(200).json({
      success: true,
      len: p.length,
      data: {
        p,
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
