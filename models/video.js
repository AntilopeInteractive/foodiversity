'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VideoSchema = Schema({
  link: String,
  usuario: String
})

module.exports = mongoose.model('Video', VideoSchema)
