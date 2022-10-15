const { DataTypes } = require("sequelize");
const sq = require("../Db/conn");

const Lista_Producto = sq.define(
  "Lista_Producto",
  {
    desde: {
      //Cantidad
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    hasta: {
      //Cantidad
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    monto: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    liquidacion: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  { paranoid: true, freezeTableName: true }
);

module.exports = Lista_Producto;
