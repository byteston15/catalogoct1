const express = require("express");
const router = express.Router();
const {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} = require("../Controllers/user");

router.route("/users").post(createUser);
router.route("/users/:id").delete(deleteUser).get(getUsers).put(updateUser);

module.exports = router;
