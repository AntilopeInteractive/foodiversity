'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewletterSchema = Schema({
  correoElectronico: String,
  fechaIncripcion: Date
})

module.exports = mongoose.model('Newletter', NewletterSchema)
