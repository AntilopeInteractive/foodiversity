'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdminSchema = Schema({
  username: String,
  password: String
})

module.exports = mongoose.model('Admin', AdminSchema)
