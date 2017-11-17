'use strict'
const Juego = require('../models/juego')
const Ranking = require('../models/ranking')

function registroPuntaje(req, res) {
  var nuevoUser = new Juego()
  nuevoUser.puntaje = parseInt(req.body.puntaje, 10)
  nuevoUser.correoElectronico = req.body.correoElectronico
  nuevoUser.usuario = req.body.usuario
  nuevoUser.fechaRegistro = req.body.fechaRegistro
  var mensaje = ''
  var puntajeGuardado
  Juego.findOne({usuario: req.body.usuario, correoElectronico: req.body.correoElectronico}, (err, user) => {
    if (err) {
      console.log(err)
    }
    if (user) {
      const puntajeActual = parseInt(req.body.puntaje, 10)
      const puntajeGuardadoDos = parseInt(user.puntaje, 10)
      if ( puntajeGuardadoDos < puntajeActual ) {
        user.fechaRegistro = req.body.fechaRegistro
        user.puntaje = req.body.puntaje
        user.save((err, resave) => {
          mensaje = 'Tu mejor puntaje'
          puntajeGuardado = req.body.puntaje
          buscarMiRanking()
          console.log(1);
        })
      } else {
        mensaje = 'No superaste tu puntaje anterior que fue de:'
        puntajeGuardado = user.puntaje
        enviarDatos()
      }
    }
    if (!user) {
      nuevoUser.save((err, saveNuevo) => {
        if (err) {
          console.log(err)
        }
        mensaje = 'Tu mejor puntaje'
        puntajeGuardado = req.body.puntaje
        compararPuntajes()
      })
    }
  })
  function buscarMiRanking() {
    Ranking.findOne({id: 'foodiversity'}, (err, ranking) => {
      if (err) {
        console.log(err)
      }
      if (ranking) {
        var pos = -1
        var encontrado = 0
        for (var i = 0; i < ranking.usuarios.length; i++) {
          if (ranking.usuarios[i] === req.body.usuario) {
            encontrado = 1
            pos = i
          }
          if (i === ranking.usuarios.length - 1) {
            if (encontrado > 0) {
              ranking.usuarios.splice(pos, 1)
              ranking.puntajes.splice(pos, 1)
              ranking.fechas.splice(pos, 1)
              ranking.save((err, guar) => {
                if (err) {
                  console.log(err)
                }
                compararPuntajes()
              })
            } else {
              compararPuntajes()
            }
          }
        }
      }
    })
  }

  function compararPuntajes() {
    Ranking.findOne({id: 'foodiversity'}, (err, ranking) => {
      if (err) {
        console.log(err)
      }
      if (ranking) {
        if (ranking.puntajes.length > 0 && ranking.puntajes.length < 10) {
          var encontrado = 0
          var pos = []
          for (var i = 0; i < ranking.puntajes.length; i++) {
            if (parseInt(ranking.puntajes[i], 10) < parseInt(req.body.puntaje, 10)) {
              encontrado = 1
              pos.push(i)
            }
          }
          if (encontrado === 0) {
            console.log(3);
            ranking.puntajes.push(parseInt(req.body.puntaje, 10))
            ranking.usuarios.push(req.body.usuario)
            ranking.fechas.push(req.body.fechaRegistro)
            ranking.save((err, guard) => {
              if (err) {
                console.log(err)
              }
              console.log(5);
              enviarDatos()
            })
          } else {
            console.log(4);
            ranking.puntajes.splice(pos[0], 0, parseInt(req.body.puntaje, 10))
            ranking.usuarios.splice(pos[0], 0, req.body.usuario)
            ranking.fechas.splice(pos[0], 0, req.body.fechaRegistro)
            ranking.save((err, guard) => {
              if (err) {
                console.log(err)
              }
              enviarDatos()
            })
          }
        } else if (ranking.puntajes.length === 10) {
          var encontrado = 0
          var pos = []
          for (var i = 0; i < ranking.puntajes.length; i++) {
            if (parseInt(ranking.puntajes[i], 10) < parseInt(req.body.puntaje, 10)) {
              encontrado = 1
              pos.push(i)
            }
          }
          if (encontrado > 0) {
            ranking.puntajes.splice(pos[0], 0, parseInt(req.body.puntaje, 10))
            ranking.usuarios.splice(pos[0], 0, req.body.usuario)
            ranking.fechas.splice(pos[0], 0, req.body.fechaRegistro)

            ranking.puntajes.splice(ranking.puntajes.length-1, 1)
            ranking.usuarios.splice(ranking.puntajes.length-1, 1)
            ranking.fechas.splice(ranking.puntajes.length-1, 1)
            ranking.save((err, guard) => {
              if (err) {
                console.log(err)
              }
              enviarDatos()
            })
          } else {
            enviarDatos()
          }
        } else {
          ranking.puntajes.push(parseInt(req.body.puntaje, 10))
          ranking.usuarios.push(req.body.usuario)
          ranking.fechas.push(req.body.fechaRegistro)
          ranking.save((err, guard) => {
            if (err) {
              console.log(err)
            }
            enviarDatos()
          })
        }
      }
    })
  }

  function enviarDatos() {
    Ranking.findOne({id: 'foodiversity'}, (err, ranking) => {
      if (err) {
        console.log(err)
      }
      res.send({
        mensaje: mensaje,
        puntaje: puntajeGuardado,
        ranking: ranking
      })
    })
  }
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
