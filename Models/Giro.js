const { DataTypes } = require("sequelize");
const sq = require("../Db/conn");
const Cliente = require("./Cliente");

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

Giro.hasMany(Cliente, {
    foreignKey : 'fk_id_giro',
    sourceKey : 'id_giro'
});

Cliente.belongsTo(Giro, {
    foreignKey : 'fk_id_giro',
    targetKey : 'id_giro'
});

module.exports = Giro;