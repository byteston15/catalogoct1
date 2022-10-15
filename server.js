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
const r_user = require("./Routes/user");
const { validAuth } = require("./Middlewares/validAuthenticate");
const app = express();

//Configuración de dotenv
dotenv.config({ path: "./Config/config.env" });
//CONSTANTES
const PORT = process.env.PORT || 8080;

//Testea la conexión a la bd
testConn();

//json middleware
app.use(express.json());

//ROUTES
/* @Ciudad
    Ruta "http://localhost:8000/api/v1/ct1/ciudades"
    Métodos : GET getCiudades{/ciudades}[x]

*/
app.use(process.env.RUTA, r_ciudad);

/* @Giro
    Rutas
     "http://localhost:8000/api/v1/ct1/giros"
        Métodos
        GET().getGiros()[x]
     "http://localhost:8000/api/v1/ct1/giro/:id/clientes"
    -- RELACIÓN GIRO A CLIENTE -- 
        Métodos    
        GET().getGirosCliente(); [x]
*/
app.use(process.env.RUTA, r_giro);

/* @Comuna
    Rutas
        "http://localhost:8000/api/v1/ct1/comunas"
            Métodos : GET.().getComuna()[x]
        -- RELACIÓN COMUNA A CLIENTE --
        "https://localhost:8000/api/v1/ct1/comuna/:id/clientes"
            Métodos : GET.().getCLientByComuna()[x]
*/
app.use(process.env.RUTA, r_comuna);

/*@Cliente
    Rutas
        "http://localhost:8000/api/v1/ct1/clientes"
            Métodos : GET().getClientes()[x]
        "http://localhost:8000/api/v1/ct1/cliente/:id"
            Métodos : GET().getCliente() PUT().updateCliente() DELETE().deleteCLiente()
        "http://localhost:8000/api/v1/ct1/clienteFull/:id"
            Métodos : GET().getClienteFull()
     */
app.use(process.env.RUTA, validAuth, r_cliente);

/*@Categoria
    Rutas
        "http://localhost:8000/api/v1/ct1/categorias"
            Métodos : POST().createCategoria 
        "http://localhost:8000/api/v1/ct1/categorias/:id"
            Métodos : GET().getCliente() GET()
        */
app.use(process.env.RUTA, r_categoria);

app.use(process.env.RUTA, r_lp);
app.use(process.env.RUTA, r_login);
app.use(process.env.RUTA, r_user);

//TERMINO DE RUTAS

//listen
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`.green)
);
