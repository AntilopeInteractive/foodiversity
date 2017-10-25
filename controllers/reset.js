'use strict'
const Cupones = require('../models/cupones')
const Referidos = require('../models/referidos')
const ReferidosConsultas = require('../models/referidosConsultas')
const Participantes = require('../models/participante.js')
const Video = require('../models/video.js')
const Ip = require('../models/ip.js')
const Newsletter = require('../models/newsletter')
const Juego = require('../models/juego')

function reset(req, res) {
  Cupones.collection.drop((err, elim) => {
    if (err) {
      console.log(err)
    }
    Referidos.collection.drop((err, elim) => {
      if (err) {
        console.log(err)
      }
      ReferidosConsultas.collection.drop((err, elim) => {
        if (err) {
          console.log(err)
        }
        Participantes.collection.drop((err, elim) => {
          if (err) {
            console.log(err)
          }
          Video.collection.drop((err, elim) => {
            if (err) {
              console.log(err)
            }
            Ip.collection.drop((err, elim) => {
              if (err) {
                console.log(err)
              }
              Newsletter.collection.drop((err, elim) => {
                if (err) {
                  console.log(err)
                }
                Juego.collection.drop((err, elim) => {
                  if (err) {
                    console.log(err)
                  }
                  res.send({
                    mensaje: 'La aplicación volvio a cero'
                  })
                })
              })
            })
          })
        })
      })
    })
  })
}

module.exports = {
  reset
}
