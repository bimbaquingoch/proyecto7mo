const express = require('express')
    //para encriptar la contraseña
const bcrypt = require('bcrypt')
    //
const _ = require('underscore')
    //importacion del esquema de usuario
const Usuario = require('../models/usuario')

const bodyParser = require('body-parser')

// app es el objeto con el que manejamos express
// osea es el constructor del módulo
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))



app.post('/register', (req, res) => {

    let body = req.body
    let usuario = new Usuario({
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    usuario.save((err, usuarioDB) => {
        const errors = [];
        const message = [];
        const { nombre, apellido, email } = req.body
        if (err) {
            errors.push({ text: err.message });
            res.render('register', {
                errors,
                nombre,
                apellido,
                email
            });
        } else {
            message.push({
                text: `Usuario ${nombre} registrado con exito`
            })
            res.render('login', {
                message,
                email
            });
        }
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

app.get('/form_pred', (req, res) => {
    res.render('form_pred', { page: 'form_pred' })
})

//interfaz doctor
app.get('/logindoc', (req, res) => {
    res.render('logindoc', { page: 'logindoc' })
})

app.get('/pacientes', (req, res) => {

    Usuario.find({ "role": "PACIENTE" }, (err, paciente) => {
        res.render('pacientes', { paciente })
    })
})

app.get('/enfermedad', (req, res) => {
    var id = req.query.id;
    res.render('enfermedad', { id })
})

app.get('/resultado', (req, res) => {
    var y_pred = { tratamiento: req.query.y_pred };
    var id = req.query.id;
    Usuario.findByIdAndUpdate(id, y_pred, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
    })
    Usuario.find({ "_id": id }, (err, paciente) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        user = paciente[0].nombre + " " + paciente[0].apellido
        res.render('resultado', { y_pred, user, page: 'resultado' })
    })

})

//interfaz paciente

app.get('/loginpac', (req, res) => {
    res.render('loginpac', { page: 'Login' })
})

app.get('/datapac', (req, res) => {
    res.render('datapac', { page: 'Datos' })
})

// finalización de llamado de las interfaces

//se exporta las interfaces de usuario
module.exports = app