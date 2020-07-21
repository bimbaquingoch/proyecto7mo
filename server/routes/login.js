const express = require('express')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')
const app = express()

app.post('/login',(req,res)=>{

    let body = req.body
    Usuario.findOne({email:body.email},(err,usuarioDB)=>{
        //si existe un error en la base
        if (err) {
            return res.status(500).json({
                ok:false,
                err
            })
        }
        //si no existe el usuario en BDD
        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'Usuario o contaseña incorrectos'
                }
            })
        }
        //verifica si las los passwords coinciden
        if(!bcrypt.compareSync(body.password,usuarioDB.password)){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'Usuario o contaseña incorrectos'
                }
            })
        }

        let token = jwt.sign({usuario:usuarioDB},process.env.SEED_AUTENTICACION,{
            expiresIn:process.env.CADUCIDAD_TOKEN
        })

        //password correcto
        res.json({
            ok:true,
            usuario: usuarioDB,
            token
        })
    
    })
   
})


module.exports = app