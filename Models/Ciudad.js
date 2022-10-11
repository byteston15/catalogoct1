const { DataTypes } = require("sequelize");
const sq = require("../Db/conn");
const Comuna = require("./Comuna");

const Ciudad = sq.define(
  "Ciudad",
  {
    id_ciudad: {
      type: DataTypes.INTEGER(3),
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

Ciudad.hasMany(Comuna, {
  foreignKey: {
    name: "fk_id_ciudad",
    allowNull: false,
  },
  sourceKey: "id_ciudad", //Nombre del campo que utilizo la fk
});
Comuna.belongsTo(Ciudad, {
  foreignKey: {
    name: "fk_id_ciudad",
    allowNull: false,
  },
  targetKey: "id_ciudad", //Nombre del campo padre que tiene la fk
});

module.exports = Ciudad;
