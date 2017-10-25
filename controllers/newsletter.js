'use strict'
const Newsletter = require('../models/newsletter')
const Referidos = require('../models/referidos')
const Cupones = require('../models/cupones')

function registroNewsletter(req, res) {
  const newRegistro = new Newsletter()
  newRegistro.correoElectronico = req.body.correoElectronico
  newRegistro.fechaIncripcion = req.body.fechaIncripcion

  Newsletter.findOne({correoElectronico: req.body.correoElectronico}, (err, registro) => {
    if (err) {
      console.log(err)
    }
    if (registro) {
      if (req.body.referido === 'false' || req.body.referido === false) {
        res.send({
          mensaje: 'Registrado',
          codigo: 0
        })
      } else {
        guardarReferidos()
      }
    }
    if (!registro) {
      newRegistro.save((err, guardado) => {
        if (err) {
          console.log(err)
        }
        if (req.body.referido === 'false' || req.body.referido === false) {
          res.send({
            mensaje: 'Guardado',
            codigo: 0
          })
        } else {
          guardarReferidos()
        }
      })
    }
  })

  function guardarReferidos() {
    var referido = new Referidos()
    referido.correoElectronico = req.body.correoElectronico
    referido.fechaIncripcion = req.body.fechaIncripcion

    Referidos.findOne({correoElectronico: req.body.correoElectronico}, (err, ref) => {
      if (err) {
        console.log(err)
      }
      if (ref) {
        res.send({
          cupon: ref.cupon,
          codigo: 1
        })
      }
      if (!ref) {
        Cupones.findOne({}, (err, cupon) => {
          if (err) {
            console.log(err)
          }
          if(!cupon) {
            res.send({
              mensaje: 'Guardado',
              codigo: 0
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
                  cupon: referido.cupon,
                  codigo: 1
                })
              })
            })
          }
        })
      }
    })
  }
}

function getNewsletter(req, res) {
  Newsletter.find({}, (err, newsletter) => {
    if (err) {
      console.log(err)
    }
    res.send({
      newsletter: newsletter
    })
  })
}

module.exports = {
  registroNewsletter,
  getNewsletter
}
