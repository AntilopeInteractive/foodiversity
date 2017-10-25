'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReferidosConsultaSchema = Schema({
  cupon: String,
  pedidos: String
})

module.exports = mongoose.model('ReferidosConsulta', ReferidosConsultaSchema)
