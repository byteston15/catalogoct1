const Foto = require("../Models/Foto");
const sq = require("../Db/conn");
const path = require("path");

exports.getFotos = async (req, res, next) => {
  try {
    const fotos = await Foto.findAll({ where: { fk_producto: req.params.id } });
    if (!fotos) {
      return res.status(404).json({
        success: false,
        data: {
          error: {
            message: "no data",
          },
        },
      });
    }
    console.log(req.hostname);
    res.status(200).json({
      success: true,
      length: fotos.length,
      data: {
        fotos,
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

exports.uploadFoto = async (req, res, next) => {
  const extensiones = ['png', 'jpg', 'jpeg', 'gif']
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
    const cutName = archivo.name.split('.')
    const extension = cutName[ cutName.length - 1 ]


    if(!extension.includes( extension )) {
      return res.status(400).json({
        success : false, 
        data : {
          error : {
            message : err.message
          }
        }
      })
    }
    const tempName = Date.now()+'.'+req.params.id+'.'+extension;
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
