const sq = require("../Db/conn")
const {DataTypes} =  require("sequelize")

sq.define('Historial', {
   fk_producto : {
        type : DataTypes.STRING(30),
        allowNull : false,
        set(val) {
            this.setDataValue("fk_producto", val.toUpperCase())
        }
   },
   desde :  {
      type : DataTypes.INTEGER(10),
      allowNull : false
   },
   hasta : {
      type : DataTypes.INTEGER(10)
   },
   monto : {
      type : DataTypes.INTEGER(10),
      allowNull : false,
   },
   liquidacion : {
      type : DataTypes.BOOLEAN,
      allowNull : false
   }, 
   fk_lista : {
      type : DataTypes.INTEGER(3),
      allowNull : false
   },
   fecha : {
      type : DataTypes.DATE, 
      allowNull : false
   }
}, {freezeTableName :true, paranoid : true, timestamps : false})