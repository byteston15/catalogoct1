const Cliente = require("../Models/Cliente");
const colors = require("colors");
const Giro = require("../Models/Giro");
const Comuna = require("..//Models/Comuna");
const Ciudad = require("../Models/Ciudad");

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

/* DESPLIEGA CLIENTE POR ID */
exports.getCliente = async (req, res, next) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      res.status(404).json({
        success: false,
        error: "No existen clientes para el id indicado",
      });
    }
    res.status(200).json({
      success: true,
      data: cliente,
    });
  } catch (err) {
    console.log(`Error message : ${err.stack}`);
    res.status(500).json({
      success: false,
      erorr: err.message,
    });
  }
};

/* UPDATE CLIENTE */
exports.updateCliente = async (req, res, next) => {
  try {
    const cliente = await Cliente.update(
      { rut: req.body },
      { where: req.params.id }
    );
    if (!cliente) {
      res.status(404).json({
        success: false,
        error: "No existen clientes para el id indicado",
      });
    }
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

/*CREATE CLIENTE */
exports.createCliente = async (req, res, next) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json({
      success: true,
      data: cliente,
    });
  } catch (err) {
    console.log(`Error message : err.stack`);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/*DELETE CLIENTE */
exports.deleteCliente = async (req, res, next) => {
  try {
    const cliente = await Cliente.destroy(req.params.id);
    if (!cliente) {
      res.status(404).json({
        success: false,
        message: "No existe cliente con el id indicado",
      });
    }
    res.status(200).json({ success: true, data: {} });
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
    const cliente = await Cliente.findAll({
      where: { rut: req.params.id },
      attributes: ["rut", "correo", "nombre", "direccion", "depto"],
      include: [
        { model: Giro, attributes: ["nombre"] },
        {
          model: Comuna,
          attributes: ["nombre"],
          include: { model: Ciudad, attributes: ["nombre"] },
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
