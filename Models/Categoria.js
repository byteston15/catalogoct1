const {DataTypes} = require("sequelize");
const sq = require('../Db/conn');

const Categoria = sq.define('Categoria', {
    id : {
        primaryKey : true, 
        type : DataTypes.STRING(10),
    },
    nombre : {
        type : DataTypes.STRING(100),
        validate : {min : [3, 'El nombre de la categoría debe tener al menos 3 caracteres']},
        allowNull : false 
    }
}, {freezeTableName : true});


module.exports = Categoria

