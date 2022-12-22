const sq = require("../Db/conn");
const History = require("../Models/Historial-prod");
const { Op } = require("sequelize");

exports.getHistory = async (req, res, next) => {
  try {
    let whereObj = {};
    if (req.query.name) {
      whereObj = {
        name: {
          [Op.like]: `%${req.query.name}%`,
        },
      };
    }
    if (req.query.categoria) {
      whereObj = Object.assign(whereObj, {
        fk_categoria: req.query.categoria,
      });
    }
    if(req.query.codigo) {
        whereObj = {
            codigo : req.query.codigo
        }
    }

    //Calling
    const h1 = await History.findAll({ where: whereObj });

    //si no hay valores
    if (!h1) {
      res.status(404).json({
        success: true,
        data: {
          error: {
            message: "No existe información para el código indicado",
          },
        },
      });
    }
    res.status(200).json({
      success: true,
      len: h1.length,
      data: {
        h1,
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
