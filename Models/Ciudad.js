const { DataTypes } = require('sequelize');
const sq = require('../Db/conn');

const Ciudad = sq.define('Ciudad', {
    id_ciudad : {
        type : DataTypes.INTEGER(3),
        autoIncrement : true,
        primaryKey : true
    }, 
    nombre : {
        type : DataTypes.STRING(150),
        allowNull : false
    }
}, {freezeTableName : true});


module.exports = Ciudad;


