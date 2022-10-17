const express = require("express");
const router = express.Router();
const {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} = require("../Controllers/usuario");

router.route("/user").get(getUsers).post(createUser);
router.route("/user/:id").put(updateUser).delete(deleteUser);

module.exports = router;
