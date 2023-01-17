const sq = require("../Db/conn");
const User = require("../Models/User");
const { Op } = require("sequelize");
const { NotFound } = require("../Utils/errors");

exports.createUser = async (req, res, next) => {
  try {
    const t = await sq.transaction(async (t) => {
      const user = await User.create(req.body);
      res.status(201).json({
        success: true,
        data: {
          created: req.body,
        },
      });
      return user;
    });
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    var whereValues = {};
    if (req.query.nombre) {
      whereValues = {
        nombre: {
          [Op.like]: `%${req.query.nombre}%`,
        },
      };
    }
    const user = await User.findAll({ where: whereValues });
    res.status(200).json({
      success: true,
      len: user.length,
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const t = await sq.transaction(async (t) => {
      const user = await User.update(req.body, {
        where: {
          id_user: req.params.id,
        },
      });
      if (!user) {
        throw new NotFound(
          `No se encontro usuario con el rut ${req.params.id}`
        );
      }
      res.status(200).json({
        success: true,
        data: {
          update: req.body,
        },
      });
      return user;
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const t = await sq.transaction(async (t) => {
      const user = await User.destroy({ where: { id_user: req.params.id } });
      if (!user) {
        throw new NotFound(
          `No se encontro usuario con el rut ${req.params.id}`
        );
      }
      res.status(200).json({
        success: true,
        data: {
          deleted: `Deleted ${req.params.id} succesfully`,
        },
      });
      return user;
    });
  } catch (err) {
    next(err)
  }
};
