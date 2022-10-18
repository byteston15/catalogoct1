const express = require("express");
const router = express.Router();
const {
  createProducto,
  deleteProducto,
  getProductos,
  updateProducto,
} = require("../Controllers/producto");

const {
  getPrecios,
  createPrecio,
  deletePrecio,
  updatePrecio,
} = require("../Controllers/lista_producto");

//Productos
router.route("/productos/:id").put(updateProducto).delete(deleteProducto);
router.route("/productos").post(createProducto).get(getProductos);

//Precios
router.route("/productos/precio").post(createPrecio);
router.route("/productos/precio/:id").put(updatePrecio).delete(deletePrecio);

module.exports = router;
