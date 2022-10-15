const sq = require("../Db/conn");
const { DataTypes } = require("sequelize");
const Foto = require("./Foto");
const Lista_Producto = require("./Lista_Producto");

const Producto = sq.define(
  "Producto",
  {
    codigo: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true,
      set(val) {
        this.setDataValue("codigo", val.toUpperCase());
      },
    },
    descripcion: {
      type: DataTypes.STRING(300),
      allowNull: false,
      validate: {
        len: {
          args: [5, 300],
          msg: "La descripción debe tener entre 5 y 300 carácteres",
        },
      },
      set(val) {
        this.setDataValue("descripcion", val.toUpperCase());
      },
    },
    barra: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: this.codigo,
      set(val) {
        this.setDataValue("barra", val.toUpperCase());
      },
    },
  },
  { freezeTableName: true, paranoid: true }
);

Producto.hasMany(Foto, {
  foreingKey: {
    name: "fk_producto_foto",
    allowNull: false,
  },
  sourceKey: "codigo",
});

Foto.belongsTo(Producto, {
  foreingKey: {
    name: "fk_producto_foto",
    allowNull: false,
  },
  targetKey: "codigo",
});

Producto.hasMany(Lista_Producto, {
  foreingKey: {
    name: "fk_producto_lproducto",
    allowNull: false,
  },
  targetKey: "codigo",
});

Lista_Producto.belongsTo(Producto, {
  foreignKey: {
    name: "fk_producto_lproducto",
    allowNull: false,
    primaryKey: true,
  },
  targetKey: "codigo",
});

module.exports = Producto;
