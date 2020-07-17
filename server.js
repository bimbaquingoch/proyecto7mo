//express es un middleword osea, una capa intermedia entre 2 interfaces
//de software, realiza la getion del html a trevés del servidor web

const express = require('express')
    // app es el objeto con el que manejamos express
    // osea es el constructor del módulo
const app = express()

// handlebars (hbs) es un motor de plantillas
// hbs permite que se pueda dividir el código html y reutilizar código html que se repite

const hbs = require('hbs')

//se llama al puerto, por defecto el puerto 3000 de manera local y cuando está en heroku busca un puerto disponible

const puerto = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

//llamado a la carpeta que contiene los archivos hbs

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs')

// el llamado de las interfaces (archivos hbs que son los html) desde el objeto app

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/home', (req, res) => {
    res.render('home', {
        names: "Bahamonde, Changoluisa, Imbaquingo, Lasso",
        year: new Date().getFullYear(),
        page: 'Home'
    })
})

app.get('/about', (req, res) => {
    res.render('about', { page: 'About' })
})

app.get('/contact', (req, res) => {
    res.render('contact', { page: 'Contact' })
})

app.get('/departments', (req, res) => {
    res.render('departments', { page: 'Departments' })
})

app.get('/doctors', (req, res) => {
    res.render('doctors', { page: 'Doctors' })
})

app.get('/register', (req, res) => {
    res.render('register', { page: 'Register' })
})

app.get('/services', (req, res) => {
    res.render('services', { page: 'Services' })
})

app.get('/login', (req, res) => {
    res.render('login', { page: 'Login' })
})

// finalización de llamado de las interfaces

//aquí está el llamado para la ejecución del puerto 

app.listen(puerto, () => {
    console.log('escuchando el puerto ', puerto);
})