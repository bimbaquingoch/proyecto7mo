const express = require('express')
const app = express()

const hbs = require('hbs')

const puerto = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs')

app.get('/home', (req, res) => {
    res.render('home', {
        names: "Bahamonde,Changoluisa,Imbaquingo,Lasso",
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


app.listen(puerto, () => {
    console.log('escuchando el puerto ', puerto);
})