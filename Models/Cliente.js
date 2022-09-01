const { DataTypes } = require("sequelize");
const sq = require("../Db/conn");

const Cliente = sq.define(
  "Cliente",
  {
    rut: {
      type: DataTypes.STRING(9),
      primaryKey: true,
    },
    correo: {
      type: DataTypes.STRING(100),
      unique: true,
      len: [9],
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      len: [3],
    },
    direccion: {
      type: DataTypes.STRING(150),
      allowNull: false,
      len: [5],
    },
    depto: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
  },
  { freezeTableName: true }
);

module.exports = Cliente;
