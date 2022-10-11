const colors = require("colors")
const Cliente = require("../Models/Cliente")
const bcrypt = require("bcrypt")



exports.login = async(req,res ,next) => {
    
    try {
    const cl1 = await Cliente.findOne(req.body.correo, req.body.rut) 
    if(!cl1){
        return res.status(400).json({
            success : false, 
            data : {
                error : 'Cliente logueado'
            }
        })
    }
        return res.status(200).json({
            success : true,
            data : {
                mess  :'correct login'
            }
        })
    } catch (err) {
        console.log(err.stack.underline.red)
       res.status(500).json({
        success : false, 
        data : {
            error : err.message
        }
       })

    }
   
}