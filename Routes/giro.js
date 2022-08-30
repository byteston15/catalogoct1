const express = require("express");
const {getGiros} = require("../Controllers/giro");
const router = express.Router();

router.route('/giros').get(getGiros)


module.exports = router;