const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config({ path: "./Config/config.env" });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.USER, "", {
  host: process.env.HOST,
  dialect: "mysql",
});

/*exports.testConn = async () => {
  try {
    sequelize.authenticate();
    console.log("Db on!");
  } catch (err) {
    console.log("Problems with db connection");
  }
};*/

module.exports = sequelize;