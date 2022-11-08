const express = require("express");
const router = express.Router();
const multer = require("multer");
const Foto = require("../Models/Foto");
const { Op } = require("sequelize");
const sq = require("../Db/conn");
const {
  createProducto,
  deleteProducto,
  getProductos,
  updateProducto,
} = require("../Controllers/producto");

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
let storage = multer.diskStorage({
  destination: "Public/Images",
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + "-" + req.params.id + "." + file.mimetype.split("/")[1]
    );
  },
});
const upload = multer({ storage: storage });

router
  .route("/productos/:id/fotos")
  .post(upload.single("image"), async (req, res, next) => {
    try {
      const t = sq.transaction(async (t) => {
        const foto = await Foto.create({
          name: req.file.filename,
          url: req.file.destination,
          fk_producto_foto: req.params.id,
        });
        return foto;
      });
      res.status(201).json({
        success: true,
        data: {
          created: {
            filename: req.file.filename,
            orinalname: req.file.originalname,
          },
        },
      });
    } catch (err) {
      console.log(err.stack);
      res.status(400).json({
        success: false,
        error: err.message,
      });
    }
  });

module.exports = router;
