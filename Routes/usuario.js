const express = require("express");
const router = express.Router();
const {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} = require("../Controllers/usuario");

router.route("/users").get(getUsers).post(createUser);
router.route("/users/:id").put(updateUser).delete(deleteUser);

module.exports = router;
