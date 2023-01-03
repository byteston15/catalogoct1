
exports.notNull = (error, req, res, next) => {
    let status =  error.status || 500;
    let code;
    let affected = []

    //Conversión del error
    let err = JSON.stringify(error)
    err = JSON.parse(err)

    console.log(error)

    if(err.name == 'SequelizeValidationError' && err.errors[0].type == 'notNull Violation') {
        status = 400
        code = 100;

        for (val of err.errors){
        affected.push({
            type : val.type,
            fields_affected : val.path,
            message  : val.message
        })
        }
    }

    res.status(status).json({
       codigo : code,
        fields_affected : affected.length,
        fields : affected
    })
    next()
}