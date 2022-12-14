const sq = require("../Db/conn");
const { DataTypes } = require("sequelize");

const Foto = sq.define(
  "Foto",
  {
    id: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    url: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
  },
  { freezeTableName: true, paranoid: true, timestamps: false }
);

module.exports = Foto;
