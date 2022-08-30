const { DataTypes } = require("sequelize");
const sq = require("../Db/conn");

const Giro = sq.define('Giro',{
    id_giro : {
        type : DataTypes.INTEGER(3),
        autoIncrement : true,
        primaryKey : true
    }, 
    nombre : {
        type : DataTypes.STRING(300),
        allowNull : false
    }
}, {freezeTableName : true} );

module.exports = Giro;