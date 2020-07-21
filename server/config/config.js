//se llama al puerto, por defecto el puerto 3000 de manera local 
//y cuando está en heroku busca un puerto disponible
process.env.PORT = process.env.PORT || 3000;
//en el entorno de desarrollo
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//conexion a la base de datos

let urlDB = "";
if (process.env.NODE_ENV === 'dev') {
    urlDB = "mongodb://localhost:27017/proyecto";
} else {
    urlDB = "mongodb+srv://user_db:1a2b3c4d5s@proyectointegrador.ctgyz.mongodb.net/proyectoIntegrador?retryWrites=true&w=majority"
};
process.env.URLDB = urlDB;

//caducidad del token

process.env.CADUCIDAD_TOKEN = '48h';

//semilla de autenticacion

process.env.SEED_AUTENTICACION = process.env.SEED_AUTENTICACION ||  'este-es-el-seed-desarrollo';