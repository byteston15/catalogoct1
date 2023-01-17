const Foto = require("../Models/Foto");
const sq = require("../Db/conn");
const path = require("path");
const fs = require("fs");
const { BadRequest, NotFound } = require("../Utils/errors");

exports.getFoto = async (req, res, next) => {
  //Indicar solamente el nombre y así enviará
  try {
    if (!req.query.name) {
      throw new BadRequest(`el req.query.name es obligatorio`)
    }
    const foto = await Foto.findOne({ where: { name: req.query.name } });

    if (!foto) {
      throw new NotFound(`No se encontró la foto con el id ${req.query.name}`)
    } else {
      return res.sendFile(
        path.join(__dirname, "..", "/uploads", req.query.name),
        (err) => {
          if (err) {
            return res.status(500).json({
              success: false,
              data: {
                error: {
                  message: err.message,
                },
              },
            });
          } else {
            next(err);
          }
        }
      );
    }
  } catch (err) {
    next(err)
  }
};

exports.uploadFoto = async (req, res, next) => {
  const extensiones = ["png", "jpg", "jpeg", "gif"];
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      throw new BadRequest(`No se entrego un file`)
    }

    //Crear el file
    let { archivo } = req.files;
    const cutName = archivo.name.split(".");
    const extension = cutName[cutName.length - 1];

    if (!extension.includes(extension)) {
      throw new BadRequest(`El archivo no corresponde a las extesiones permitidas, jpg, png, jpeg, gif`)
    }
    const tempName = Date.now() + "." + req.params.id + "." + extension;
    let uploadUrl = path.join(__dirname, "../uploads", tempName);

    archivo.mv(uploadUrl, (err) => {
      if (err) {
        next(err)
      }
    });

    //Crear el registro
    const t = await sq.transaction(async (t) => {
      const foto = await Foto.create({
        name: tempName,
        url: uploadUrl,
        fk_producto: req.params.id,
      });
      res.status(201).json({
        success: true,
        data: {
          foto,
        },
      });
      return foto;
    });
  } catch (err) {
    next(err)
    }
};

exports.deleteFoto = async (req, res, next) => {
  try {
    if (!req.query.name) {
      throw new BadRequest(`El req.query.name es obligatorio`)
    }
    const t = await sq.transaction(async (t) => {
      const foto = await Foto.destroy({ where: { name: req.query.name } });
      if (!foto) {
        throw new NotFound(`No se encontro foto con el name : ${req.query.name}`)
      }
      fs.unlink(
        path.join(__dirname, "..", "/uploads", req.query.name),
        (err) => {
          if (err) {
            next(err)
          } else {
            res.status(200).json({
              success: true,
              data: {
                message: "Imagen eliminada",
              },
            });
            return foto;
          }
        }
      );
    });
  } catch (err) {
    next(err)
  }
};

exports.getUrls = async (req, res, next) => {
  try {
    const f = await Foto.findAll({ where: { fk_producto: req.params.id } });
    if (!f) {
      throw new NotFound(`No se encontro url con el id: ${req.params.id}`)
    }
    res.status(200).json({
      success: true,
      data: {
        f,
      },
    });
  } catch (err) {
    next(err)
  }
};
