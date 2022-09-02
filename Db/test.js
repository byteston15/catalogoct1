const sq = require("./conn");
const colors = require("colors");

exports.testConn = async() => {
    try {
        sq.authenticate();
        await sq.sync(
           //{ force: true}
            )
        console.log("Database connection succesfully".green);
    } catch (err) {
        console.log(err.message.underline.red);
    }
}