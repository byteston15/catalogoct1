const express = require("express")
const {getCiudad} = require("../Controllers/ciudad");
const router = express.Router();


router.route('/ciudades').get(getCiudad);


module.exports = router;