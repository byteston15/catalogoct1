const Cliente = require("../Models/Cliente");
const colors = require("colors");
const Giro = require("../Models/Giro");
const Comuna = require("..//Models/Comuna");
const Ciudad = require("../Models/Ciudad");
const sq = require("../Db/conn");
const { NotFound } = require("../Utils/errors");

/*DESPLIEGA TODOS LOS CLIENTES */
exports.getClientes = async (req, res, next) => {
  try {
    const cliente = await Cliente.findAll();
    res.status(200).json({
      success: true,
      data: cliente,
    });
  } catch (err) {
    next(err);
  }
};

/* UPDATE CLIENTE */
exports.updateCliente = async (req, res, next) => {
  try {
    const t = await sq.transaction(async (t) => {
      const cliente = await Cliente.update(req.body, {
        where: { rut: req.params.id },
      });
      if (!cliente) {
        throw new NotFound(
          `No se encontro cliente con el rut ${req.params.id}`
        );
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
    next(err);
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
    next(err);
  }
};

/*DELETE CLIENTE */
exports.deleteCliente = async (req, res, next) => {
  try {
    const result = await sq.transaction(async (t) => {
      const cliente = await Cliente.destroy({ where: { rut: req.params.id } });
      if (!cliente) {
        throw new NotFound(
          `No se encontro cliente con el rut ${req.params.id}`
        );
      }
      res.status(200).json({ success: true, data: {} });
    });
  } catch (err) {
    next(err);
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
    next(err);
  }
};
