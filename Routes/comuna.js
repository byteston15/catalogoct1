const express = require("express");
const {getComuna} = require('../Controllers/comuna')
const router = express.Router();


router.route('/comunas').get(getComuna);


module.exports = router;