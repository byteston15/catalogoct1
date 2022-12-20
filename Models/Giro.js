const { DataTypes } = require("sequelize");
const sq = require("../Db/conn");
const Cliente = require("./Cliente");

const Giro = sq.define(
  "Giro",
  {
    id_giro: {
      type: DataTypes.INTEGER(3),
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

Giro.hasMany(Cliente, {
  foreignKey: { name: "fk_id_giro", allowNull: false },
  sourceKey: "id_giro",
});

Cliente.belongsTo(Giro, {
  foreignKey: { name: "fk_id_giro", allowNull: false },
  targetKey: "id_giro",
});

module.exports = Giro;
