const Foto = require("../Models/Foto");
const sq = require("../Db/conn");
const path = require("path");
const fs = require("fs");

exports.getFoto = async (req, res, next) => {
  //Indicar solamente el nombre y así enviará
  try {
    if (!req.query.name) {
      return res.status(400).json({
        success: false,
        data: {
          error: {
            message: "No se entrego el query name",
          },
        },
      });
    }
    const foto = await Foto.findOne({ where: { name: req.query.name } });

    if (!foto) {
      return res.status(404).json({
        success: false,
        data: {
          error: {
            message: "No existen fotos para el name indicado",
          },
        },
      });
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
            next();
          }
        }
      );
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: {
        message: err.message,
      },
    });
  }
};

exports.uploadFoto = async (req, res, next) => {
  const extensiones = ["png", "jpg", "jpeg", "gif"];
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        success: false,
        data: {
          error: {
            message: "No se cargaron archivos",
          },
        },
      });
    }

    //Crear el file
    let { archivo } = req.files;
    const cutName = archivo.name.split(".");
    const extension = cutName[cutName.length - 1];

    if (!extension.includes(extension)) {
      return res.status(400).json({
        success: false,
        data: {
          error: {
            message: err.message,
          },
        },
      });
    }
    const tempName = Date.now() + "." + req.params.id + "." + extension;
    let uploadUrl = path.join(__dirname, "../uploads", tempName);

    archivo.mv(uploadUrl, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          error: {
            message: err.message,
          },
        });
      }
    });

    //Crear el registro
    const t = sq.transaction(async (t) => {
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
    console.log(err.stack);
    res.status(500).json({
      success: false,
      data: {
        error: {
          message: err.message,
        },
      },
    });
  }
};

exports.deleteFoto = async (req, res, next) => {
  try {
    if (!req.query.name) {
      return res.status(400).json({
        success: false,
        data: {
          error: {
            message: "No se entrego el req.query.name",
          },
        },
      });
    }
    const t = sq.transaction(async (t) => {
      const foto = await Foto.destroy({ where: { name: req.query.name } });
      if (!foto) {
        return res.status(404).json({
          success: false,
          data: {
            error: {
              message: "No existe el archivo con el path indicado",
            },
          },
        });
      }
      fs.unlink(
        path.join(__dirname, "..", "/uploads", req.query.name),
        (err) => {
          if (err) {
            return res.status(400).json({
              success: false,
              data: {
                error: {
                  message: err.message,
                },
              },
            });
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
    res.status(500).json({
      success: false,
      data: {
        error: {
          message: err.message,
        },
      },
    });
  }
};

exports.getUrls = async (req, res, next) => {
  try {
    const f = await Foto.findAll({ where: { fk_producto: req.params.id } });
    if (!f) {
      return res.status(404).json({
        success: false,
        data: {
          error: {
            message: "No existen archivos para el id mencionado",
          },
        },
      });
    }
    res.status(200).json({
      success: true,
      data: {
        f,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: {
        error: {
          message: err.message,
        },
      },
    });
  }
};
