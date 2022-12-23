const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();

const {
  createProducto,
  deleteProducto,
  getProductos,
  updateProducto,
} = require("../Controllers/producto");

const {
  getFoto,
  uploadFoto,
  deleteFoto,
  getUrls,
} = require("../Controllers/foto");

const {
  getPrecio,
  createPrecio,
  deletePrecio,
  updatePrecio,
} = require("../Controllers/lista_producto");

const {
  getHistory
} = require("../Controllers/history.js")

//Productos
router.route("/productos/:id").put(updateProducto).delete(deleteProducto);
router.route("/productos").post(createProducto).get(getProductos);

//Precios
router.route("/productos/precios").post(createPrecio).get(getPrecio);
router.route("/productos/:id/precios").put(updatePrecio).delete(deletePrecio);//Recibe como query lp

//Images
router.route("/productos/:id/urls").get(getUrls);

router
  .route("/productos/:id/fotos")
  .get(getFoto)
  .post(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }), uploadFoto)
  .delete(deleteFoto);

router.route("/productos/history").get(getHistory)

  module.exports = router;
