const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const { testConn } = require("./Db/test");



//Rutas
const r_ciudad = require("./Routes/ciudad");
const r_giro = require("./Routes/giro");
const r_comuna = require("./Routes/comuna");
const r_cliente = require("./Routes/cliente");
const r_categoria = require("./Routes/categoria");
const r_lp = require("./Routes/lista_precio");
const r_login = require("./Routes/auth");
const r_user = require("./Routes/usuario");
const r_producto = require("./Routes/producto");
const { validAuth } = require("./Middlewares/validAuthenticate");
const app = express();


//Middlewares
const {handleErrors, logError} = require("./Middlewares/errorHandler");
const sequelizeError = require("./Middlewares/sequelizeError")

//Configuración de dotenv
dotenv.config({ path: "./Config/config.env" });
//CONSTANTES
const PORT = process.env.PORT || 8080;

//Testea la conexión a la bd
testConn();

//json middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "Public"));

/*Métodos : GET({controlador : getGiros, ruta : "/giros"},
 {controlador : getClientByGiro, ruta : "/giros/:id/clientes"})*/
app.use(process.env.RUTA, r_ciudad);

/*Métodos : GET({controlador : getGiros, ruta : "/giros"},
 {controlador : getClientByGiro, ruta : "/giros/:id/clientes"})*/
app.use(process.env.RUTA, r_giro);

/*Métodos : GET({controlador : getGiros, ruta : "/giros"},
 {controlador : getClientByGiro, ruta : "/giros/:id/clientes"})*/
app.use(process.env.RUTA, r_comuna);

/*Métodos : GET({controlador : getGiros, ruta : "/giros"},
 {controlador : getClientByGiro, ruta : "/giros/:id/clientes"})*/
app.use(process.env.RUTA, r_cliente);

/*Métodos : GET({controlador : getGiros, ruta : "/giros"},
 {controlador : getClientByGiro, ruta : "/giros/:id/clientes"})*/
app.use(process.env.RUTA, r_categoria);

/*Métodos : GET({controlador : getGiros, ruta : "/giros"},
 {controlador : getClientByGiro, ruta : "/giros/:id/clientes"})*/
app.use(process.env.RUTA, r_lp);

/*Métodos : GET({controlador : getGiros, ruta : "/giros"},
 {controlador : getClientByGiro, ruta : "/giros/:id/clientes"})*/
app.use(process.env.RUTA, r_login);

/*Métodos : GET({controlador : getGiros, ruta : "/giros"},
 {controlador : getClientByGiro, ruta : "/giros/:id/clientes"})*/
app.use(process.env.RUTA, r_user);

/*Métodos : GET({controlador : getGiros, ruta : "/giros"},
 {controlador : getClientByGiro, ruta : "/giros/:id/clientes"})*/
app.use(process.env.RUTA, r_producto);

//Errors handlers
app.use(logError)
app.use(sequelizeError)
app.use(handleErrors)


const server = app.listen(PORT, console.log(`running on port ${PORT}`));
