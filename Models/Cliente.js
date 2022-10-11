const { DataTypes } = require("sequelize");
const sq = require("../Db/conn");
const { encriptPassword } = require("../Utils/passUtil");

const Cliente = sq.define(
  "Cliente",
  {
    rut: {
      type: DataTypes.STRING(9),
      primaryKey: true,
      set(val) {
        this.setDataValue("rut", val.toUpperCase());
      },
    },
    correo: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
      validate: {
        is: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
      },
    },
    pass: {
      type: DataTypes.STRING(300),
      allowNull: false,
      set(val) {
        this.setDataValue("pass", encriptPassword(val));
      },
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [3, 100],
          msg: "El nombre debe tener entre 3 y 100 carácteres",
        },
      },
      set(val) {
        this.setDataValue("nombre", val.toUpperCase());
      },
    },
    direccion: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        len: {
          args: [5, 150],
          msg: "La dirección debe tener entre 5 y 150 carácteres",
        },
      },
      set(val) {
        this.setDataValue("direccion", val.toUpperCase());
      },
    },
    depto: {
      type: DataTypes.STRING(30),
      allowNull: true,
      set(val) {
        this.setDataValue("depto", val.toUpperCase());
      },
    },
  },
  { freezeTableName: true }
);

module.exports = Cliente;
