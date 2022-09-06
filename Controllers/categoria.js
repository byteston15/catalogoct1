const Categoria = require('../Models/Categoria');
const colors = require('colors')

exports.createCategoria = async(req, res, next) => {
    try {
       const categoria = await Categoria.create(req.body);
       res.status(201).json({
        success : true,
        data : categoria
       })
    } catch (err) {
        console.log(`Error stack : ${err.stack}`);
        res.status(500).json({
        success : false,
        error : err.message
       }) 
    }
}


exports.getCategorias = async(req, res , next) =>{
    try {
        const categoria = await Categoria.findAll();
        res.status(200).json({
            success : true,
            data: categoria
        })
    } catch (err) {
       console.log(`Error Stack : ${err.stack}`.red);
       res.status(500).json({
        success : false,
        error : err.message
       })
    }
}


exports.getCategoria = async(req, res, next) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        if(!categoria){
            return res.status(404).json({success : false, error : 'No se encuentra categoria con el id indicado'});
        }
        res.status(200).json({
            success : true, 
            data : categoria
        })
    } catch (err) {
       console.log(`Error Stack :${err.stack}`);
       res.status(500).json({
        success :false, 
        error : err.message
       })
    }
};

exports.updateCategoria = async(req, res, next) => {
    try {
        const categoria = await Categoria.update(req.body,
            {where : {id : req.params.id}});
            if(!categoria){
                return res.status(404).json({
                    success : false,
                    error : 'Categoria no encontrada con el id indicado'
                })
            }
            res.status(200).json({
                success : true,
                data : req.body
            });
    } catch (err) {
        res.status(500).json({
            success : false, 
            error : err.message
        })
    }
}

exports.deleteCategoria = async(req, res, next) => {
    try {
        const cliente = await Categoria.destroy({where : {id : req.params.id}});
        if(!categoria){
            return res.status(404).json({
                success : false, 
                error : 'No se encontraron categorías con el id mencionado'
            })
        }
        res.status(200).json({
            success : true, 
            data : {}
        })
    } catch (err) {
       res.status(500).json({
        success : false, 
        error : err.message
       }) 
    }
}