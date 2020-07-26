//llama al archivo de configuración
require('./config/config')
    //express y bodyprser son middlewords osea, una capa intermedia entre 2 interfaces
    //de software, realiza la getion del html a trevés del servidor web
const express = require('express')
const bodyParser = require('body-parser')
    //creacion del modulo de la base de datos
const mongoose = require('mongoose')
const path = require('path')
    // app es el objeto con el que manejamos express
    // osea es el constructor del módulo
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// handlebars (hbs) es un motor de plantillas
// hbs permite que se pueda dividir el código html y reutilizar código html que se repite
const hbs = require('hbs')
    //path de los estilos
app.use(express.static(__dirname + '/../public'))

//llamado a la carpeta que contiene los archivos hbs
hbs.registerPartials(__dirname + '/../views/partials')

app.set('view engine', 'hbs')


//configuración global de las rutas
app.use(require('./routes/index'))

//Incluir las rutas de usuario
app.use(require('./routes/usuario'));

//conexion BDD
mongoose.connect('mongodb://localhost:27017/proyecto', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, (err, res) => {
    if (err) throw err
    console.log("Base de datos online");
})

//llamado para la ejecución del puerto 
app.listen(process.env.PORT, () => {
    console.log('escuchando el puerto ', process.env.PORT);
})