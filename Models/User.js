const sq = require("../Db/conn");
const { DataTypes } = require("sequelize");
const { encriptPassword } = require("../Utils/passUtil");
const Lista_Producto = require("./Lista_Producto");

const User = sq.define(
  "User",
  {
    id_user: {
      type: DataTypes.INTEGER(3),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      set(val) {
        this.setDataValue("nombre", val.toUpperCase());
      },
    },
    pass: {
      type: DataTypes.STRING(300),
      allowNull: false,
      set(val) {
        this.setDataValue("pass", encriptPassword(val));
      },
    },
    correo: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
  },
  { freezeTableName: true, paranoid: true }
);

module.exports = User;
