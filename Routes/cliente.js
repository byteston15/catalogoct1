const express = require('express');
const router = express.Router();
const { getCliente, updateCliente, createCliente, getClientes, deleteCliente } = require('../Controllers/cliente');

router.route('/cliente/:id')
.get(getCliente)
.put(updateCliente)
.delete(deleteCliente)
router.route('/clientes')
.post(createCliente)
.get(getClientes)



module.exports = router;