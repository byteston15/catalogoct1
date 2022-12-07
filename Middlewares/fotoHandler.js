const fileUpload = require("express-fileupload")


exports.fotoHandler = (req, res, next) => {
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({
            success : false, 
            data : {
                error : "No se cargaron archivos"
            }
        })
    }
    s

}