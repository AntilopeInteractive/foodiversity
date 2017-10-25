'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IpSchema = Schema({
  ip: String,
  fecha: Number
})

module.exports = mongoose.model('Ip', IpSchema)
