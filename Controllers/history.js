const History = require("../Models/Historial-prod");
const { Op } = require("sequelize");
const colors = require("colors")


exports.getHistory = async (req, res, next) => {
  try {
    let whereObj = {};
    if(!req.query.start && !req.query.end){
      return res.status(400).json({
        success : false, 
        data : {
          error : {
            message : 'No se entrego el query de start y end'
          }
        }
      })
    }else {
      whereObj = {
        fecha : {
          [Op.between]  : [ req.query.start, req.query.end ]
        }
      }
    }
    if(req.query.codigo) {
        whereObj = {
            fk_producto : req.query.codigo
        }
    }
    
    console.log("WhereObj".red)

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
