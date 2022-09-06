const sq = require('../Db/conn')
const {DataTypes} = require('sequelize');


const Lista_precio = sq.define('Lista_precio', {
    id : {
        type : DataTypes.INTEGER(3),
        primaryKey : true
    },
    nombre : {
        type : DataTypes.STRING(100),
        allowNull : true
    }
},{freezeTableName : true});


module.exports = Lista_precio