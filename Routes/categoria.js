const express = require("express");
const router = express.Router();
const {
  getCategoria,
  getCategorias,
  updateCategoria,
  deleteCategoria,
  createCategoria,
  findProductByCategoria,
} = require("../Controllers/categoria");

router.route("/categorias").get(getCategorias).post(createCategoria);
router
  .route("/categorias/:id")
  .get(getCategoria)
  .put(updateCategoria)
  .delete(deleteCategoria);

router.route("/categorias/:id/productos").get(findProductByCategoria);
//Toda la información mediante la categoría

module.exports = router;
