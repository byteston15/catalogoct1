const { DataTypes } = require("sequelize");
const sq = require("../Db/conn");
const Producto = require("./Producto");

const Categoria = sq.define(
  "Categoria",
  {
    id: {
      primaryKey: true,
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(100),
      validate: {
        len: {
          args: [3, 100],
          msg: "La categoría debe tener entre 3 y 100 carácteres",
        },
      },
      set(val) {
        this.setDataValue("nombre", val.toUpperCase());
      },
      allowNull: false,
      unique: true,
    },
  },
  { freezeTableName: true, paranoid: true }
);

Categoria.hasMany(Producto, {
  foreignKey: {
    name: "fk_categoria_producto",
    allowNull: false,
  },
  sourceKey: "id",
});

Producto.belongsTo(Categoria, {
  foreignKey: {
    name: "fk_categoria_producto",
    allowNull: false,
  },
  targetKey: "id",
});

module.exports = Categoria;
