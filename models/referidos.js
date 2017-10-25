'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReferidosSchema = Schema({
  correoElectronico: String,
  fechaIncripcion: Date,
  cupon: String
})

module.exports = mongoose.model('Referidos', ReferidosSchema)
