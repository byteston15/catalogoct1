const sq = require("../Db/conn");
const User = require("../Models/User");

exports.createUser = async (req, res, next) => {
  try {
    const t = sq.transaction();
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      data: {
        created: req.body,
      },
    });
    t.commit();
  } catch (err) {
    console.log(err.stack);
    t.rollback();
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
    if (!user) {
      res.status(402).json({
        success: false,
        data: {
          error: "No data",
        },
      });
    }
    if (!req.params.nombre) {
      const user = await User.findAll({
        where: {
          rut: req.params.id,
        },
      });
    } else {
      const user = await User.findAll({
        where: {
          nombre: req.params.nombre,
        },
      });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({
      success: true,
      data: {
        error: err.message,
      },
    });
  }

  res.status(200).json({
    success: true,
    len: user.length,
    data: {
      user,
    },
  });
};

exports.getUser = async (req, res, next) => {};
