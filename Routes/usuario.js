const User = require("../Models/User");
const sq = require("../Db/conn");

exports.createUser = async (req, res, next) => {
  try {
    const t = sq.transaction();
    const user = await User.create(req.body);
    await t.commit();
    res.status(201).json({
      success: true,
      data: {
        created: req.body,
      },
    });
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
