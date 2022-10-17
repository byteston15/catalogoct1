const express = require("express");
const {
  getLp,
  updateLp,
  deleteLp,
  createLp,
  getLps,
} = require("../Controllers/lista_precio");
const router = express.Router();

router.route("/lps/:id").get(getLp).put(updateLp).delete(deleteLp);
router.route("/lps").post(createLp).get(getLps);

module.exports = router;
