const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El  nombre es necesario']
    },
    email: {
        type: String,
        required: [true, 'El correo es necesaario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    }, //no es obligatoria
    role: {
        default: 'USER_ROLE'
    }, //default: 'USER_ROLE'
    estado: {
        type: Boolean,
        default: true
    }, //boolean 
    google: {
        type: Boolean,
        default: false
    } //boolean
});

module.exports = mongoose.model('Usuario', usuarioSchema);