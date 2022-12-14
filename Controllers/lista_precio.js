const Lp = require("../Models/Lista_precio");
const sq = require("../Db/conn");

exports.createLp = async (req, res, next) => {
  try {
    const t = sq.transaction(async (t) => {
      const lp = await Lp.create(req.body);
      res.status(201).json({
        success: true,
        data: lp,
      });
      return lp;
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.deleteLp = async (req, res, next) => {
  try {
    const t = sq.transaction(async (t) => {
      const lp = await Lp.destroy({ where: { id: req.params.id } });
      if (!lp) {
        return res.status(404).json({
          success: false,
          data: {
            error: "no data ",
          },
        });
      }
      res.status(200).json({
        success: true,
        data: {},
      });
      return lp;
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.updateLp = async (req, res, next) => {
  try {
    const t = sq.transaction(async (t) => {
      const lp = await Lp.update(req.body, { where: { id: req.params.id } });
      if (!lp) {
        return res.status(404).json({
          success: false,
          error: "No existe Lista de precios con ese id",
        });
      }
      res.status(200).json({
        success: true,
        data: req.body,
      });
      return lp;
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getLp = async (req, res, next) => {
  try {
    const lp = await Lp.findByPk(req.params.id);
    if (!lp) {
      return res.status(404).json({
        success: false,
        error: "No se encuentra lista de precios con el id entregado",
      });
    }
    res.status(200).json({
      success: true,
      data: lp,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getLps = async (req, res, next) => {
  try {
    const lp = await Lp.findAll();
    res.status(200).json({
      success: true,
      data: lp,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
