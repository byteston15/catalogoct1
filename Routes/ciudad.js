const express = require("express");
const { getCiudad, getComunasxCiudad } = require("../Controllers/ciudad");
const router = express.Router();

router.route("/ciudades").get(getCiudad);
router.route("/ciudades/:id/comunas").get(getComunasxCiudad);
module.exports = router;
