const Lp = require("../Models/Lista_precio");
const sq = require("../Db/conn");
const { NotFound } = require("../Utils/errors");

exports.createLp = async (req, res, next) => {
  try {
    const t = await sq.transaction(async (t) => {
      const lp = await Lp.create(req.body);
      res.status(201).json({
        success: true,
        data: lp,
      });
      return lp;
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteLp = async (req, res, next) => {
  try {
    const t = sq.transaction(async (t) => {
      const lp = await Lp.destroy({ where: { id: req.params.id } });
      if (!lp) {
        throw new NotFound(
          `No se encontró lista de precio con el id ${req.params.id}`
        );
      }
      res.status(200).json({
        success: true,
        data: {},
      });
      return lp;
    });
  } catch (err) {
    next(err);
  }
};

exports.updateLp = async (req, res, next) => {
  try {
    const t = await sq.transaction(async (t) => {
      const lp = await Lp.update(req.body, { where: { id: req.params.id } });
      if (!lp) {
        throw new NotFound(
          `No se encuentra lista de precio con el id ${req.params.id}`
        );
      }
      res.status(200).json({
        success: true,
        data: req.body,
      });
      return lp;
    });
  } catch (err) {
    next(err);
  }
};

exports.getLp = async (req, res, next) => {
  try {
    const lp = await Lp.findByPk(req.params.id);
    if (!lp) {
      throw new NotFound(
        `No se encontro lista de precio con el id ${req.params.id}`
      );
    }
    res.status(200).json({
      success: true,
      data: lp,
    });
  } catch (err) {
    next(err);
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
    next(err);
  }
};
