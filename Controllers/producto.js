const sq = require("../Db/conn");
const Producto = require("../Models/Producto");
const { Op, QueryTypes } = require("sequelize");
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
    let orderArray = ["codigo"];
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
      //Campo por el que vamos a ordenar
      orderArray = [req.query.order];
    }

    if (req.query.how) {
      orderArray.push(req.query.how);
    }

    whereCondition = Object.assign(whereCondition, whereCategory);

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
  } catch (err) {
    res.status(500).json({
      success : false, 
      data: {
        error : {
          message : err.message
        }
      }
    })
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

exports.getNews = async (req, res, next) => {
  try {
    let dias;
    let date = new Date();

    if (!req.query.dias) {
      dias = 30;
    } else {
      dias = req.query.dias;
    }
    //Resta días a la fecha actual, dados por query o -30 por default
    let priorDate = new Date(new Date().setDate(date.getDate() - dias));

    console.log(priorDate);
    const p1 = await Producto.findAll({
      where: {
        createdAt: {
          [Op.between]: [priorDate, date],
        },
      },
    });
    if (!p1) {
      return res.status(404).json({
        success: false,
        data: {
          error: {
            message: "No se encuentran datos",
          },
        },
      });
    }
    res.status(200).json({
      success: true,
      len: p1.length,
      data: {
        p1,
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

exports.getOnSale = async (req, res, next) => {
  try {
    const productos = await sq.query(
      ` 
        select p.descripcion as 'Descripción producto' , p.codigo as 'Código producto', 
        c.id as ' ID Categoría', c.nombre as 'Nombre Categoría', 
        lp.desde as 'Desde actual', lp.hasta as 'Hasta actual', lp.monto as 'Monto actual', lp.liquidacion as 'Liquidación actual',
        lp2.nombre as 'Nombre lista precio', lp2.id as 'ID lista precio',
        h.id as 'id historial', h.monto as 'Monto historial', h.desde as 'Desde historial' , h.hasta as 'Hasta historial',
        h.liquidacion as 'liquidación historial', h.fecha as 'fecha historial'
        from producto p
        join categoria c 
        on c.id = p.fk_categoria_producto 
        join lista_producto lp 
        on lp.fk_lp_producto = p.codigo 
        join lista_precio lp2 
        on lp2.id  = lp.fk_lp_listaprecio 
        join historial h 
        on h.fk_producto = lp.fk_lp_producto 
        where h.monto > lp.monto 
        group by h.fk_producto, h.fk_lista 
        having max(h.fecha)
                    `,
      { type: QueryTypes.SELECT }
    );
    if (!productos) {
      return res.status(404).json({
        success: false,
        data: {
          error: {
            message: "No se encontraron datos",
          },
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
