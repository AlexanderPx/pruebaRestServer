const mongoose = require("mongoose")
let schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator');

let impresoraSchema = new schema({
    marca: {
        type: String,
        required: [true, 'La marca de la impresora es requerido']
    },
    modelo: {
        type: String,
        required: [true, "El modelo de la impresora es requerido"]

    },
    serie: {
        type: Number,
        required: [true, "El número de serie de la impresora es requerido"]
    },
    color: {
        type: Boolean,
        required: false,
        default: false
    },
    ip: {
        type: String,
        required: [true, "La IP de la impresora es requerido"]
    },
    contador: {
        type: Number,
        default: false,
        default: 0
    },
    precio: {
        type: Number,
        required: [true, "El precio de la impresora es requerido"]

    }
})
impresoraSchema.plugin(uniqueValidator, { message: `{PATH} debe ser único` })
impresoraSchema.methods.toJSON = function() {
    let impresora = this
    let impresoraobject = impresora.toObject()

    return impresoraobject
}
module.exports = mongoose.model('Impresora', impresoraSchema)