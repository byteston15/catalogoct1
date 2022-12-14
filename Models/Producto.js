const sq = require("../Db/conn");
const { DataTypes } = require("sequelize");
const Foto = require("./Foto");
const Lista_Producto = require("./Lista_Producto");
const Lista_precio = require("./Lista_precio");

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
    },
  },
  { freezeTableName: true, paranoid: true }
);

Producto.beforeCreate(async (producto, options) => {
  if (!producto.dataValues.barra) {
    producto.dataValues.barra = producto.dataValues.codigo;
  }
});

Producto.belongsToMany(Lista_precio, {
  through: 
   Lista_Producto,
  sourceKey: "codigo",
  targetKey: "id",
  foreignKey : 'fk_lp_producto'
});

Lista_precio.belongsToMany(Producto, {
  through: 
   Lista_Producto,
  sourceKey: "id",
  targetKey: "codigo",
  foreignKey : 'fk_lp_listaprecio'
});


//Producto
Producto.hasMany(Lista_Producto, {
  foreignKey : {
    name : 'fk_lp_producto'
  }
})
Lista_Producto.belongsTo(Producto, {
  foreignKey : {
    name : "fk_lp_producto"
  }
})

//lista precio
Lista_precio.hasMany(Lista_Producto , {
  foreignKey : {
    name : 'fk_lp_listaprecio'
  }
})
Lista_Producto.belongsTo(Lista_precio, {
  foreignKey : {
    name : 'fk_lp_listaprecio'
  }
})


Producto.hasMany(Foto, {
  foreignKey: {
    allowNull: false,
    name: "fk_producto",
  },
  sourceKey: "codigo",
});

Foto.belongsTo(Producto, {
  foreignKey: {
    allowNull: false,
    name: "fk_producto",
  },
  targetKey: "codigo",
});

module.exports = Producto;
