const sq = require("../Db/conn");
const { DataTypes } = require("sequelize");
const Lista_Producto = require("./Lista_Producto");

const Lista_precio = sq.define(
  "Lista_precio",
  {
    id: {
      type: DataTypes.INTEGER(3),
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      set(val) {
        this.setDataValue("nombre", val.toUpperCase());
      },
    },
  },
  { freezeTableName: true }
);

module.exports = Lista_precio;
