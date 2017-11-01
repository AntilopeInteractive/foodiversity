'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy
const helmet = require('helmet')

const app = express()

const Ranking = require('./models/ranking.js')
const Admin = require('./models/admin.js')
const Ip = require('./models/ip.js')
const Landing = require('./controllers/landing.js')
const Newsletter = require('./controllers/newsletter.js')
const Referidos = require('./controllers/referidos.js')
const Cupones = require('./controllers/cupones.js')
const Juego = require('./controllers/juego.js')
const Participantes = require('./controllers/participantes.js')
const Reset = require('./controllers/reset.js')


//primer Usuario
const admin = new Admin()
admin.username = 'admin'
admin.password = 123456
Admin.findOne({username: 'admin'}, (err, userAdmin) => {
  if (err) {
    console.log(err)
  }
  if (userAdmin) {
    console.log('usuario existe')
  }
  if (!userAdmin) {
    admin.save((err, save) => {
      if (err) {
        console.log(err)
      }
      console.log('primer usuario creado')
    })
  }
})
//primer ranking
const ranking = new Ranking()
ranking.puntajes = []
ranking.usuarios = []
ranking.fechas = []
ranking.id = 'foodiversity'
Ranking.findOne({id: 'foodiversity'}, (err, rank) => {
  if (err) {
    console.log(err)
  }
  if (rank) {
    console.log('rank existe')
  }
  if (!rank) {
    ranking.save((err, save) => {
      if (err) {
        console.log(err)
      }
      console.log('ranking creado')
    })
  }
})
//guardar las sesiones iniciadas
app.use(session({
 resave: true,
 saveUninitialized: true,
 secret:'a4f8071f-c873-4447-8ee2',
 cookie: { maxAge: 60 * 60 * 1000 }
}))
app.use(cookieParser())
//usar directorio public con express
app.use(express.static('public'))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
  res.header("Access-Control-Allow-Headers", "Content-Type")
  next()
})
//body parse para convertir en json
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
//proteccion vulnerabilidades web
app.use(helmet())

// rutas
app.get('/landing', Landing.landingData)
app.post('/registroNewsletter', Newsletter.registroNewsletter)
app.get('/getNewsletter', Newsletter.getNewsletter)
app.post('/guardarReferido', Referidos.guardarReferido)
app.get('/getReferidos', Referidos.getReferidos)
app.post('/guardarReferidosConsulta', Referidos.guardarReferidosConsulta)
app.post('/guardarCupones', Cupones.guardarCupones)
app.post('/registroPuntaje', Juego.registroPuntaje)
app.get('/getJugadores', Juego.getJugadores)
app.post('/subirParticipante', Participantes.subirParticipante)
app.post('/subirCapitulo', Participantes.subirCapitulo)
app.post('/deleteParticipante', Participantes.deleteParticipante)
app.get('/getParticipantes', Participantes.getParticipantes)
app.post('/votar', Participantes.votar)
app.get('/admin/reset', Reset.reset)

//inicializar passport
app.use(passport.initialize())
app.use(passport.session())
//configurar autenticacion
passport.use(new LocalStrategy(function(username, password, done)
{
 //var passEncriptada = encriptar(username,password)
 Admin.findOne({username: username, password: password}, function(err, user)
 {
  if (user)
  {
   return done(null, user)
  }

  return done(null, false, {message:'no puede ingresar'})
  })
}))

passport.serializeUser(function(user, done){
  done(null, user)
})
passport.deserializeUser(function(user,done){
  done(null,user)
})
//rutas
app.post('/admin/login', passport.authenticate('local'), function(req, res)
{
  res.json(req.isAuthenticated())
})
app.get('/admin/loggedin', function(req, res){
 res.json(req.isAuthenticated() ? true : false)
})
app.post('/admin/logout', function(req, res){
  req.logOut()
  res.json(true)
})
app.post('/admin/newPass', function(req, res){
  Admin.findOne({username: 'admin'}, (err, user) => {
    if (err) {
      console.log(err)
    }
    if (user.password === req.body.passActual) {
      user.password = req.body.passNew
      user.save((err, guar) => {
        if (err) {
          console.log(err)
        }
        res.send({
          mensaje: 'Tu contraseña fue actualizada por favor vuelve a iniciar sesión',
          codigo: 0
        })
      })
    } else {
      res.send({
        mensaje: 'Tu contraseña actual no coincide con la de nuestra base de datos',
        codigo: 1
      })
    }
  })
})


function horaYfecha() {
  var dia = new Date();
  var h=dia.getHours();
  var m=dia.getMinutes();
  var s=dia.getSeconds();
  if (h == 24)
  {
    h = 0;
  }
  if (h === 23 && m === 59 && s === 59) {
    Ip.collection.drop((err, elim) => {
      if (err) {
        console.log(err)
      }
      console.log('ips eliminadas')
    })
  }
  setTimeout(horaYfecha, 1000); // reset the timer
}

horaYfecha()
module.exports = app
