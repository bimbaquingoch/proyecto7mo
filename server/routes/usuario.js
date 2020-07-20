const express = require('express')
// app es el objeto con el que manejamos express
// osea es el constructor del módulo
const app = express()

//importacion del esquema de usuario
const Usuario = require('../models/usuario')

app.post('/register', (req, res) => {

    let body = req.body
    let usuario = new Usuario({
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        password: body.password,
        role: body.role
    })

    usuario.save((err,usuarioDB)=>{
        if (err) {
            return res.status(400).json({
                ok:false,
                err
            })
        }

        res.json({
            ok: true,
            usuario:usuarioDB
        })

    })

})

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

//interfaz doctor
app.get('/logindoc', (req, res) => {
    res.render('logindoc', { page: 'logindoc' })
})

app.get('/pacientes', (req, res) => {
    res.render('pacientes', { page: 'Pacientes' })
})

// finalización de llamado de las interfaces

//se exporta las interfaces de usuario
module.exports = app