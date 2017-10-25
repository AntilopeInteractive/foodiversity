'use strict'
const Cupones = require('../models/cupones')

function guardarCupones(req, res) {
  var nuevosCupones = []
  for (var i = 0; i < req.body.length; i++) {
    var cupon = new Cupones()
    cupon.cupon = req.body[i].cupon
    cupon.save((err, save) => {
      if (err) {
        console.log(err)
      } else {
        nuevosCupones.push(save)
        if (nuevosCupones.length === req.body.length) {
          Cupones.find({}, (err, cupones) => {
            res.status(200).send({
              mensaje: 'Cupones Cargados',
              cupones: cupones.length
            })
          })
        }
      }
    })
  }
}

module.exports = {
  guardarCupones
}
