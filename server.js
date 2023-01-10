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
const { isOperationalError } = require("./Middlewares/errorHandler");
const app = express();

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

//TERMINO DE RUTAS
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    data: {
      error: {
        message: err.message,
        isOperational: err.isOperational,
      },
    },
  });
  next(err);
});

const server = app.listen(PORT, console.log(`running on port ${PORT}`));

process.on("unhandledRejection", (error) => {
  throw error;
});

process.on("uncaughtException", (error) => {
  console.error(error);

  if (!isOperationalError(error)) {
    server.close(() => process.exit(1));
  }
});
