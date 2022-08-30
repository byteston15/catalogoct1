const Ciudad = require("../Models/Ciudad");

exports.getCiudad =  async(req, res, next) => {
    try {
        const ciudad = await Ciudad.findAll();
        res.status(200).json({
            data : ciudad
        })
    } catch (err) {
       res.status(500).json({
        message : err.message
       }) 
    }
}