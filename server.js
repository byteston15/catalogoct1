const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const {testConn} = require("./Db/test");
//Rutas
const r_ciudad = require("./Routes/ciudad");
const r_giro = require("./Routes/giro");
const r_comuna = require('./Routes/comuna');
const r_cliente = require('./Routes/cliente');
const app = express();

//Configuración de dotenv
dotenv.config({path: './Config/config.env'});
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
        GET().getGirosCliente(); [!]
*/
app.use(process.env.RUTA,r_giro)

/* @Comuna
    Rutas
        "http://localhost:8000/api/v1/ct1/comunas"
            Métodos : GET.().getComuna()
        -- RELACIÓN COMUNA A CLIENTE --
        "https://localhost:8000/api/v1/ct1/comuna/:id/clientes"
            Métodos : GET.().getCLientByComuna()
*/
app.use(process.env.RUTA, r_comuna);


/*@Cliente
    Rutas
        "http://localhost:8000/api/v1/ct1/clientes"
            Métodos : GET().getClientes()
        "http://localhost:8000/api/v1/ct1/cliente/:id"
            Métodos : POST().getCliente().updateCliente().deleteCLiente()
     */
app.use(process.env.RUTA, r_cliente);
     
//TERMINO DE RUTAS



//listen
app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`.green))
