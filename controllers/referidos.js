'use strict'
const Referidos = require('../models/referidos')
const ReferidosConsultas = require('../models/referidosConsultas')
const Cupones = require('../models/cupones')

function guardarReferido(req, res) {
  const referido = new Referidos()
  referido.correoElectronico = req.body.correoElectronico
  referido.fechaIncripcion = req.body.fechaIncripcion

  Referidos.findOne({correoElectronico: req.body.correoElectronico}, (err, ref) => {
    if (err) {
      console.log(err)
    }
    if (ref) {
      res.send({
        codigo: 0,
        cupon: ref.cupon
      })
    }
    if (!ref) {
      Cupones.findOne({}, (err, cupon) => {
        if (err) {
          console.log(err)
        }
        if (!cupon) {
          res.send({
            codigo: 1,
            mensaje: 'En este momento no tenemos cupones disponibles, vuelve a intentarlo en el transcurso del día'
          })
        }
        if (cupon) {
          referido.cupon = cupon.cupon
          referido.save((err, refGuardado) => {
            if (err) {
              console.log(err)
            }
            cupon.remove((err, eliminado) => {
              if (err) {
                console.log(err)
              }
              res.send({
                codigo: 0,
                cupon: refGuardado.cupon
              })
            })
          })
        }
      })
    }
  })
}

function getReferidos(req, res) {
  Referidos.find({}, (err, ref) => {
    if (err) {
      console.log(err)
    }
    Cupones.find({}, (err, cupones) => {
      res.send({
        referidos: ref,
        cupones: cupones.length
      })
    })
  })
}

function guardarReferidosConsulta(req, res) {
  var nuevosReferidos = []
  ReferidosConsultas.collection.drop((err, elim) => {
    if (err) {
      console.log(err)
    }
    for (var i = 0; i < req.body.length; i++) {
      var referido = new ReferidosConsultas()
      referido.cupon = req.body[i].cupon
      referido.pedidos = req.body[i].pedidos
      referido.save((err, save) => {
        if (err) {
          console.log(err)
        } else {
          nuevosReferidos.push(save)
          if (nuevosReferidos.length === req.body.length) {
            res.status(200).send({
              mensaje: 'Referidos Cargados'
            })
          }
        }
      })
    }
  })
}

module.exports = {
  guardarReferido,
  getReferidos,
  guardarReferidosConsulta
}
