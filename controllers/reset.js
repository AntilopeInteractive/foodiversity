'use strict'
const Cupones = require('../models/cupones')
const Referidos = require('../models/referidos')
const ReferidosConsultas = require('../models/referidosConsultas')
const Participantes = require('../models/participante.js')
const Video = require('../models/video.js')
const Ip = require('../models/ip.js')
const Newsletter = require('../models/newsletter')
const Juego = require('../models/juego')
const Ranking = require('../models/ranking')

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
                  Ranking.findOne({id: 'foodiversity'},(err, rank) => {
                    if (err) {
                      console.log(err)
                    }
                    rank.puntajes = []
                    rank.usuarios = []
                    rank. fechas = []
                    rank.save((err, reset) => {
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
    })
  })
}

function reiniciarJugadores(req, res) {
  Juego.collection.drop((err, elim) => {
    if (err) {
      console.log(err)
    }
    Ranking.findOne({id: 'foodiversity'},(err, rank) => {
      if (err) {
        console.log(err)
      }
      rank.puntajes = []
      rank.usuarios = []
      rank. fechas = []
      rank.save((err, reset) => {
        if (err) {
          console.log(err)
        }
        res.send({
          mensaje: 'Jugadores Eliminados'
        })
      })
    })
  })
}
function reiniciarNewsletter(req, res) {
  Newsletter.collection.drop((err, elim) => {
    if (err) {
      console.log(err)
    }
    res.send({
      mensaje: 'Newsletter Eliminado'
    })
  })
}
function reiniciarReferidos(req, res) {
  Referidos.collection.drop((err, elim) => {
    if (err) {
      console.log(err)
    }
    res.send({
      mensaje: 'Referidos Eliminados'
    })
  })
}
function reiniciarCupones(req, res) {
  Cupones.collection.drop((err, elim) => {
    if (err) {
      console.log(err)
    }
    res.send({
      mensaje: 'Cupones Eliminados'
    })
  })
}

module.exports = {
  reset,
  reiniciarJugadores,
  reiniciarNewsletter,
  reiniciarReferidos,
  reiniciarCupones
}
