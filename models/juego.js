'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const JuegoSchema = Schema({
  puntaje: Number,
  correoElectronico: String,
  fechaRegistro: Date
})

module.exports = mongoose.model('Juego', JuegoSchema)
