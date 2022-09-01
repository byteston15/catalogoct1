const Comuna = require("../Models/Comuna");
const Cliente = require('../Models/Cliente');

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


/*Get cliente por la comúna */
exports.getClientByComuna = async(req, res, next) => {
    try{
        const cliente = await Cliente.findAll({where : {fk_id_comuna : req.params.id}});
        if(!cliente){
            res.status(404).json({success : false, error : 'No existen clientes para la comuna }'});
        }
        res.status(200).json({
            success : true,
            data : cliente 
        });
    }catch(err){
        res.status(500).json({
            success : false, 
            error : err.message
        })
    }
}
