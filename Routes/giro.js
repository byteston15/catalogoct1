const express = require("express");
const {getGiros, getClientByGiro} = require("../Controllers/giro");
const router = express.Router();

router.route('/giros').get(getGiros)
router.route('/giro/:id/clientes').get(getClientByGiro);


module.exports = router;