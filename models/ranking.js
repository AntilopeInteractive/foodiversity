'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RankingSchema = Schema({
  puntajes: [],
  usuarios: [],
  fechas: [],
  id: String
})

module.exports = mongoose.model('Ranking', RankingSchema)
