'use strict'

const Participante = require('../models/participante.js')
const Video = require('../models/video.js')
const Ip = require('../models/ip.js')

//guardar Participante
function subirParticipante(req, res) {
  const participante = new Participante()
  participante.votos = 0
  participante.nombre = req.body.nombre
  participante.avatar = req.body.avatar
  participante.save((err, guardado) => {
    if (err) {
      console.log(err)
    }
    Participante.find({}, (err, data) => {
      if (err) {
        console.log(err)
      }
      res.send({
        participantes: data
      })
    })
  })
}

//carga video
function subirCapitulo(req, res) {
  const video = new Video()
  video.link = req.body.link
  video.usuario = req.body.usuario
  Video.findOne({usuario: 'admin'}, (err, user) => {
    if (err) {
      console.log(err)
    }
    if (user) {
      user.link = req.body.link
      user.save((err, sav) => {
        if (err) {
          console.log(err)
        }
        res.send({
          mensaje:'Capitulo cargado'
        })
      })
    }
    if (!user) {
      video.save((err, saved) => {
        if (err) {
          console.log(err)
        }
        res.send({
          mensaje:'Capitulo cargado'
        })
      })
    }
  })
}

// borrar participante
function deleteParticipante(req, res) {
  Participante.findOne({_id: req.body.id}, (err, user) => {
    if (err) {
      console.log(err)
    }
    user.remove((err, elim) => {
      if (err) {
        console.log(err)
      }
      Participante.find({}, (err, data) => {
        if (err) {
          console.log(err)
        }
        res.send({
          participantes: data
        })
      })
    })
  })
}

// obtener Participantes
function getParticipantes(req, res)  {
  Participante.find({}, (err, data) => {
    if (err) {
      console.log(err)
    }
    res.send({
      participantes: data
    })
  })
}

function votar(req, res) {
  console.log(req.body);
  Ip.findOne({ip:req.body.ip}, (err, ip) => {
    if (err) {
      console.log(err)
    }
    if (ip) {
      res.send({
        codigo: 0,
        mensaje: 'El día de hoy tu voto ya fue registrado, regresa mañana para seguir votando'
      })
    }
    if (!ip) {
      var ip = new Ip()
      ip.ip = req.body.ip
      ip.save((err, guardado) => {
        if (err) {
          console.log(err)
        }
        Participante.findOne({_id: req.body.id}, (err, participante) => {
          if (err) {
            console.log(err)
          }
          participante.votos += 1
          participante.save((err, saved) => {
            if (err) {
              console.log(err)
            }
            Participante.find({}, (err, participantes) => {
              if (err) {
                console.log(err)
              }
              res.send({
                codigo: 1,
                participantes: participantes,
                mensaje: 'Tu voto fue registrado con exito, regresa mañana para seguir votando'
              })
            })
          })
        })
      })
    }
  })
}

module.exports = {
  subirParticipante,
  subirCapitulo,
  deleteParticipante,
  getParticipantes,
  votar
}
