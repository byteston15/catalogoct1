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

exports.updateUser = async (req, res, next) => {
  const t = sq.transaction();
  try {
    const user = await User.update(req.params.id, {
      where: { id: req.params.id },
    });
    if (!user) {
      await t.rollback();
      return res.status(404).json({
        success: false,
        data: {
          error: "No data",
        },
      });
    }
    await t.commit();
    res.status(200).json({
      success: true,
      data: {
        update: req.body,
      },
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

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.destroy({ where: { id: req.params.id } });
    const t = sq.transaction();
    if (!user) {
      await t.rollback();
      return res.status(404).json({
        success: false,
        data: {
          error: "No data",
        },
      });
    }
    await t.commit();
    res.status(200).json({
      success: true,
      data: {
        deleted: `Deleted ${req.params.id} succesfully`,
      },
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
