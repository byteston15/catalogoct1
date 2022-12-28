const express = require("express");
const router = express.Router();

const {
  updateCliente,
  createCliente,
  getClientes,
  deleteCliente,
  getClienteFull,
} = require("../Controllers/cliente");

router.route("/clientes/:id").put(updateCliente).delete(deleteCliente);
router.route("/clientes").post(createCliente).get(getClientes);
router.route("/clienteFull/:id").get(getClienteFull);

module.exports = router;
