'use strict'

const ReferidosConsultas = require('../models/referidosConsultas')
const Participante = require('../models/participante.js')
const Juego = require('../models/juego')
const Video = require('../models/video.js')

function landingData(req, res) {
  Participante.find({}, (err, participantes) => {
    if (err) {
      console.log(err)
    }
    Juego.find({}, (err, juego) => {
      if (err) {
        console.log(err)
      }
      ReferidosConsultas.find({}, (err, referidos) => {
        if (err) {
          console.log(err);
        }
        Video.find({}, (err, video) => {
          if (err) {
            console.log(err)
          }
          res.send({
            participantes: participantes,
            juego: juego,
            referidos: referidos,
            video: video
          })
        })
      })
    })
  })
}

module.exports = {
  landingData
}
