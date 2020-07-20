const mongoose = require('mongoose')

let Schema = mongoose.Schema

let usuarioSchema = new Schema({ 
        nombre:{
            type:String,
            required: [true,'El nombre es obligatorio']
        },
        apellido:{
            type:String,
            required: [true,'El apellido es obligatorio']
        },
        email: {
            type:String,
            required: [true,'El correo es obligatorio']
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default:'PACIENTE'
        },
        estado: {
            type: String,
            default:true
        }
    }
)

module.exports = mongoose.model('usuario',usuarioSchema)

