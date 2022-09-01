const {DataTypes} = require("sequelize");
const sq = require('../Db/conn');
const Cliente = require('../Models/Cliente');

const Comuna = sq.define('Comuna', {
    id_comuna : {
        type : DataTypes.INTEGER(3),
        autoIncrement : true,
        primaryKey : true
    },
    nombre : {
        type : DataTypes.STRING(150),
        allowNull : false},
    }, {freezeTableName : true})

Comuna.hasMany(Cliente, {
    foreignKey : 'fk_id_comuna',
    sourceKey : 'id_comuna'
});

Cliente.belongsTo(Comuna, {
    foreignKey : 'fk_id_comuna',
    targetKey : 'id_comuna'
});

    module.exports = Comuna;