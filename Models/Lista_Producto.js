const { DataTypes } = require("sequelize");
const sq = require("../Db/conn");
const Historial = require("./Historial-prod");

const Lista_Producto = sq.define(
  "Lista_Producto",
  {
    desde: {
      //monto
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    hasta: {
      //monto
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
  { paranoid: true, freezeTableName: true, timestamps : false }
);


module.exports = Lista_Producto;
