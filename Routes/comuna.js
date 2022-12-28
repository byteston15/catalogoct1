const express = require("express");
const { getComuna, getClientByComuna } = require("../Controllers/comuna");
const router = express.Router();

router.route("/comunas").get(getComuna);
router.route("/comunas/:id/clientes").get(getClientByComuna);

module.exports = router;
