const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const {testConn} = require("./Db/test");
//Rutas
const r_ciudad = require("./Routes/ciudad");
const r_giro = require("./Routes/giro");
const r_comuna = require('./Routes/comuna');
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
    Métodos : GET {/ciudades}
*/
app.use(process.env.RUTA, r_ciudad);

/* @Giro
    Ruta "http://localhost:8000/api/v1/ct1/giros"
    Métodos : GET {/giros}
*/
app.use(process.env.RUTA,r_giro)

/* @Comuna
    Ruta "http://localhost:8000/api/v1/ct1/comunas"
    Métodos : GET {/comunas}

*/
app.use(process.env.RUTA, r_comuna);


//listen
app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`.green))
