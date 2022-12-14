const sq = require("../Db/conn");
const User = require("../Models/User");
const { Op } = require("sequelize");

exports.createUser = async (req, res, next) => {
  try {
    const t = sq.transaction(async (t) => {
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
    console.log(err.stack);
    res.status(500).json({
      success: false,
      data: {
        error: err.message,
      },
    });
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
    console.log(err.stack);
    res.status(500).json({
      success: true,
      data: {
        error: err.message,
      },
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const t = sq.transaction(async (t) => {
      const user = await User.update(req.body, {
        where: {
          id_user: req.params.id,
        },
      });
      if (!user) {
        return res.status(404).json({
          success: false,
          data: {
            error: "No data",
          },
        });
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
    console.log(err.stack);
    res.status(500).json({
      success: false,
      data: {
        error: err.message,
      },
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const t = sq.transaction(async (t) => {
      const user = await User.destroy({ where: { id_user: req.params.id } });
      if (!user) {
        return res.status(404).json({
          success: false,
          data: {
            error: "No data",
          },
        });
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
    console.log(err.stack);
    await t.rollback();
    res.status(500).json({
      success: false,
      data: {
        error: err.message,
      },
    });
  }
};
