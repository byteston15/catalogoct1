const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();

const {
  createProducto,
  deleteProducto,
  getProductos,
  updateProducto,
} = require("../Controllers/producto");

const { getFotos, uploadFoto } = require("../Controllers/foto");

const {
  getPrecio,
  createPrecio,
  deletePrecio,
  updatePrecio,
} = require("../Controllers/lista_producto");

//Productos
router.route("/productos/:id").put(updateProducto).delete(deleteProducto);
router.route("/productos").post(createProducto).get(getProductos);

//Precios
router.route("/productos/precio").post(createPrecio).get(getPrecio);
router.route("/productos/precio/:id").put(updatePrecio).delete(deletePrecio);

//Images

router
  .route("/productos/:id/fotos")
  .get(getFotos)
  .post(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }), uploadFoto);

module.exports = router;
