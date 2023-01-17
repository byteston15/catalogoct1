const sq = require("../Db/conn");
const Producto = require("../Models/Producto");
const { Op, QueryTypes } = require("sequelize");
const Foto = require("../Models/Foto");
const Categoria = require("../Models/Categoria");
const Lista_Producto = require("../Models/Lista_Producto");
const Lista_precio = require("../Models/Lista_precio");
const { NotFound, BadRequest } = require("../Utils/errors");

exports.createProducto = async (req, res, next) => {
  try {
    const result = await sq.transaction(async (t) => {
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
    next(err);
  }
};

exports.getProductos = async (req, res, next) => {
  try {
    let exclude = ["createdAt", "deletedAt", "updatedAt"];
    let whereCondition = {};
    let whereCategory = {};
    let orderArray = ["codigo"];
    if (req.query.categoria) {
      whereCategory = {
        fk_categoria_producto: req.query.categoria,
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
      throw new NotFound(`No se encontaron productos`);
    }
    res.status(200).json({
      success: true,
      len: producto.length,
      data: {
        producto,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProducto = async (req, res, next) => {
  try {
    const t = await sq.transaction(async (t) => {
      const producto = await Producto.update(req.body, {
        where: { codigo: req.params.id },
      });
      if (producto[0] == 0) {
        throw new NotFound(
          `No se encuentra producto con el id ${req.params.id}`
        );
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
    next(err);
  }
};

exports.deleteProducto = async (req, res, next) => {
  try {
    const t = await sq.transaction(async (t) => {
      const producto = await Producto.destroy({
        where: { codigo: req.params.id },
      });
      if (!producto) {
        throw new NotFound(
          `No se encuentra producto con el código indicado ${req.params.id}`
        );
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
    next(err);
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
      throw new NotFound(`No se encontraron nuevos productos`);
    }
    res.status(200).json({
      success: true,
      len: p1.length,
      data: {
        p1,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getOnSale = async (req, res, next) => {
  try {
    let monto = 0;
    if (req.query.monto) {
      monto = req.query.monto;
    }
    const productos = await sq.query(
      ` select 
          (lp.monto  - h1.monto ) as 'descuento',
          h1.id, h1.desde as 'desde historial', h1.hasta as 'hasta historial',
          h1.fk_producto as 'codigo producto', p.descripcion  as 'descripción',
          c.nombre as 'categoría', lp2.nombre as 'Lista de precio',
          h1.fk_lista as 'id lista precio', h1.fecha as 'fecha cambio',
          lp.desde as 'desde actual', lp.hasta as 'hasta actual', 
          lp.monto as 'monto actual', lp.liquidacion as 'liquidacion'
        from lista_producto lp 
          join historial h1
          on h1.fk_producto = lp.fk_lp_producto 
          join producto p 
          on p.codigo = h1.fk_producto 
          join categoria c 
          on c.id = p.fk_categoria_producto 
          join lista_precio lp2 
          on lp2.id = h1.fk_lista 
        where h1.id = ( 
            select max(id)
            from historial h 
            where h.fk_producto = lp.fk_lp_producto  
            and h.fk_lista = lp.fk_lp_listaprecio  
            )
			  and lp.monto - h1.monto < ${monto}; `,
      { type: QueryTypes.SELECT }
    );
    if (!productos) {
      throw new NotFound(`No se encontraron productos`);
    }
    res.status(200).json({
      success: true,
      len: productos.length,
      data: {
        productos,
      },
    });
  } catch (err) {
    next(err);
  }
};
