'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CuponesSchema = Schema({
  cupon: String
})

module.exports = mongoose.model('Cupones', CuponesSchema)
