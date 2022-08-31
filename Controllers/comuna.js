const Comuna = require("../Models/Comuna");

exports.getComuna = async(req, res , next) => {
    try {
        const comuna = await Comuna.findAll()
        res.status(200).json({
            data : comuna
        })
    } catch (err) {
        res.status(500).json({
            message : err.message
        })
    }
};

