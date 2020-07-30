const mongoose = require('mongoose')
    //valida los campos que deben ser unicos
let uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema

let rolesValidos = {
    values: ['MEDICO', 'PACIENTE'],
    message: '{VALUE} no es un rol válido'
}

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'PACIENTE',
        enum: rolesValidos
    },
    estado: {
        type: String,
        default: true
    },
    tratamiento: {
        type: String,
        default: "Sin tratamiento"
    }
}, { collection: 'usuarios' })

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' })

usuarioSchema.methods.toJSON = function() {
    let user = this
    let userObject = user.toObject()
    delete userObject.password

    return userObject
}

module.exports = mongoose.model('usuario', usuarioSchema)