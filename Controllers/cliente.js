const Cliente = require("../Models/Cliente");
const colors = require("colors");
const Giro = require("../Models/Giro");
const Comuna = require("..//Models/Comuna");
const Ciudad = require("../Models/Ciudad");
const sq = require("../Db/conn");

/*DESPLIEGA TODOS LOS CLIENTES */
exports.getClientes = async (req, res, next) => {
  try {
    const cliente = await Cliente.findAll();
    res.status(200).json({
      success: true,
      data: cliente,
    });
  } catch (err) {
    console.log(`Error message : ${err.message.stack}`);
    res.status(500).json({
      success: false,
    });
  }
};

/* UPDATE CLIENTE */
exports.updateCliente = async (req, res, next) => {
  try {
    const t = sq.transaction(async (t) => {
      const cliente = await Cliente.update(req.body, {
        where: { rut: req.params.id },
      });
      if (!cliente) {
        return res.status(404).json({
          success: false,
          data: {
            error: "No se encuentran datos para el valor indicado",
          },
        });
      }
      res.status(200).json({
        success: true,
        data: {
          updated: req.body,
        },
      });
      return cliente;
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
/*CREATE CLIENTE */
exports.createCliente = async (req, res, next) => {
  try {
    const result = await sq.transaction(async (t) => {
      const cliente = await Cliente.create(req.body, { transaction: t });
      res.status(201).json({
        success: true,
        data: cliente,
      });
      return cliente;
    });
  } catch (err) {
    console.log(`Error message : ${err.stack}`);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/*DELETE CLIENTE */
exports.deleteCliente = async (req, res, next) => {
  try {
    const result = await sq.transaction(async (t) => {
      const cliente = await Cliente.destroy({ where: { rut: req.params.id } });
      if (!cliente) {
        return res.status(404).json({
          success: false,
          message: "No existe cliente con el id indicado",
        });
      }
      res.status(200).json({ success: true, data: {} });
    });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getClienteFull = async (req, res, next) => {
  try {
    let whereGiro = {};
    let whereCity = {};
    if (req.query.giro) {
      whereGiro = {
        fk_id_giro: req.query.giro,
      };
    }

    if (req.query.ciudad) {
      whereCity = {
        fk_id_ciudad: req.query.ciudad,
      };
    }

    const cliente = await Cliente.findAll({
      where: { rut: req.params.id },
      attributes: ["rut", "correo", "nombre", "direccion", "depto"],
      include: [
        { model: Giro, attributes: ["nombre"], where: whereGiro },
        {
          model: Comuna,
          attributes: ["nombre"],
          include: { model: Ciudad, attributes: ["nombre"], where: whereCity },
        },
      ],
    });
    res.status(200).json({
      success: true,
      data: cliente,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
