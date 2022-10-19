const sq = require("../Db/conn");
const { DataTypes } = require("sequelize");
const Lista_Producto = require("./Lista_Producto");

const Lista_precio = sq.define(
  "Lista_precio",
  {
    id: {
      type: DataTypes.INTEGER(3),
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: true,
      set(val) {
        this.setDataValue("nombre", val.toUpperCase());
      },
    },
  },
  { freezeTableName: true }
);

Lista_precio.hasMany(Lista_Producto, {
  foreignKey: {
    name: "fk_precio_listaprecio",
    allowNull: false,
  },
  sourceKey: "id",
});

Lista_Producto.belongsTo(Lista_precio, {
  foreignKey: {
    name: "fk_precio_listaprecio",
    allowNull: false,
    primaryKey: true,
  },
  targetKey: "id",
});

module.exports = Lista_precio;
