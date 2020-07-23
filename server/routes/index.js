const express = require('express')
const app = express()

//path de las interfaces que se encuentran en el usuario.js
app.use(require('./usuario'))
    //login
app.use(require('./login'))

module.exports = app