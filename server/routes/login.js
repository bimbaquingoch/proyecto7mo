const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");
const app = express();

app.post("/login", (req, res) => {
  let body = req.body;
  Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
    //si existe un error en la base
    const errors = [];
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    //si no existe el usuario en BDD
    if (!usuarioDB) {
      errors.push({ text: "Usuario o contaseña incorrectos" });
      return res.render("login", {
        errors,
      });
    }
    //verifica si las los passwords coinciden
    if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
      errors.push({ text: "Usuario o contaseña incorrectos" });
      return res.render("login", {
        errors,
      });
    }

    let token = jwt.sign(
      { usuario: usuarioDB },
      process.env.SEED_AUTENTICACION,
      {
        expiresIn: process.env.CADUCIDAD_TOKEN,
      }
    );

    //password correcto

    if (usuarioDB.role === "MEDICO") {
      res.render("logindoc", {
        ok: true,
        usuario: usuarioDB,
        token,
      });
    } else {
      res.render("loginpac", {
        ok: true,
        usuario: usuarioDB,
        token,
      });
    }
  });
});

module.exports = app;

