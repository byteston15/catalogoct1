const express = require("express");
const router = express.Router();
const {
  getCategoria,
  getCategorias,
  updateCategoria,
  deleteCategoria,
  createCategoria,
} = require("../Controllers/categoria");

router.route("/categorias").get(getCategorias).post(createCategoria);
router
  .route("/categorias/:id")
  .get(getCategoria)
  .put(updateCategoria)
  .delete(deleteCategoria);


module.exports = router;
