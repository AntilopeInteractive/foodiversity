'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ParticipanteSchema = Schema({
  avatar: String,
  votos: Number,
  nombre: String
})

module.exports = mongoose.model('Participante', ParticipanteSchema)
