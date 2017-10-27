'use strict'
const Juego = require('../models/juego')

function registroPuntaje(req, res) {
  const nuevoUser = new Juego()
  nuevoUser.puntaje = parseInt(req.body.puntaje, 10)
  nuevoUser.correoElectronico = req.body.correoElectronico
  nuevoUser.usuario = req.body.usuario
  nuevoUser.fechaRegistro = req.body.fechaRegistro
  console.log(nuevoUser)
  Juego.findOne({usuario: req.body.usuario}, (err, user) => {
    if (err) {
      console.log(err)
    }
    if (user) {
      const puntajeActual = parseInt(req.body.puntaje, 10)
      const puntajeGuardado = parseInt(user.puntaje, 10)
      if ( puntajeGuardado < puntajeActual ) {
        user.fechaRegistro = req.body.fechaRegistro
        user.puntaje = req.body.puntaje
        user.save((err, resave) => {
          res.send({
            mensaje: 'Tu mejor puntaje:',
            puntaje: req.body.puntaje
          })
        })
      } else {
        res.send({
          mensaje: 'No superaste tu puntaje anterior que fue de:',
          puntaje: user.puntaje
        })
      }
    }
    if (!user) {
      nuevoUser.save((err, saveNuevo) => {
        if (err) {
          console.log(err)
        }
        res.send({
          mensaje: 'Tu mejor puntaje:',
          puntaje: req.body.puntaje
        })
      })
    }
  })
}

function getJugadores(req, res) {
  Juego.find({}, (err, jugadores) => {
    if (err) {
      console.log(err)
    }
    res.send({
      jugadores: jugadores
    })
  })
}

module.exports = {
  registroPuntaje,
  getJugadores
}
