const Foto = require("../Models/Foto");
const sq = require("../Db/conn")
const path = require("path")

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


exports.uploadFoto = async(req, res, next) => {
  try {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No se enviaron archivos');
  }

  if(!req.files.archivo){
    res.status(400).json({
      success : false, 
      data : {
        error : "No se envió la propiedad archivo"
      }
    })
  }

  const {archivo} = req.files;

  const uploadPath = path.join(__dirname, '../uploads/' , archivo.name)
  console.log(uploadPath)

  archivo.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).json({
        success : false, 
        data : {
          error : err.message
        }
      })

    res.json({
      sucess : true, 
      data : {
        message : "file uploaded to " + uploadPath
      }
    });
  });
  //Normalito
  } catch (err) {
   res.status(500).json({
    success : false, 
    data : {
      error : err.message
    }
   }) 
  }
}
