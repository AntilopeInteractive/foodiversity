'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const port = process.env.PORT || 80

mongoose.connect('mongodb://foodiversity:foodiversity@ds125255.mlab.com:25255/foodiversity', {useMongoClient: true})
//mongoose.connect('mongodb://127.0.0.1:27017/foodiversity', {useMongoClient: true})

app.listen(port, () => {
  console.log(`servidor foodiversity ${port}`)
})
