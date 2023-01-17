const History = require("../Models/Historial-prod");
const { Op } = require("sequelize");
const colors = require("colors");
const {NotFound, BadRequest} = require("../Utils/errors")

exports.getHistory = async (req, res, next) => {
  try {
    let whereObj = {};
    if (!req.query.start && !req.query.end) {
      throw new BadRequest(`El req.query.start y .end es obligatorio`);
    } else {
      whereObj = {
        fecha: {
          [Op.between]: [req.query.start, req.query.end],
        },
      };
    }
    if (req.query.codigo) {
      whereObj = {
        fk_producto: req.query.codigo,
      };
    }

    console.log("WhereObj".red);

    //Calling
    const h1 = await History.findAll({ where: whereObj });

    //si no hay valores
    if (!h1) {
      throw new NotFound(
        `No se encontro historial para el código:  ${req.params.id}`
      );
    }
    res.status(200).json({
      success: true,
      len: h1.length,
      data: {
        h1,
      },
    });
  } catch (err) {
    next(err);
  }
};
