const Giro = require("../Models/Giro");

exports.getGiros = async(req, res , next) => {
    try {
        const giro = await Giro.findAll();
        res.status(200).json({
            data : giro
        })
    } catch (err) {
       res.status(500).json({
        message : err.message
       }) 
    }
}