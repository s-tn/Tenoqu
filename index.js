// Index 
// Copyright 2022 Tenoqu  Inc.
// Front-end by GreenWorld#0001 
// Back-end by EnderKingJ#0001 
// This website and it's function is completely closed source. Please do not attempt to release it's source.
const express = require('express');
var app = express();

app.use(require('body-parser').text())

const fs = require('fs')

const Login = require('./lib/login')

app.Token = require('./lib/token')

app.b64 = require('./lib/base')

app.Login = Login(app)

var { app } = require('./lib/auth')(app)

var { app, Wss } = require('./lib/ws')(app)

var Events = require('./bot/events')

if (!Events.done) {
  Events.done = true
  Events(app)
  console.log('doing events')
}

var { app, Route } = require('./lib/route')(app)

const Api = new (require('./api/index'))(app)

app.use((req, res, next) => {
  if (req.url.includes('.map')) return next()
  if (req.url.includes('.js')) return res.writeHead(200, { 'content-type': 'application/javascript' }).end(fs.readFileSync('./public' + req.url) + '//# sourceMappingURL=' + req.url + '.map')
  if (req.url.includes('.css')) return res.writeHead(200, { 'content-type': 'text/css' }).end(fs.readFileSync('./public' + req.url) + `/*# sourceMappingURL=${req.url}.map */`)
  next()
})

app.use(express.static('./public', { extensions: ['html'] }))
app.use(Route)
app.use('/api', Api)

app.set("view engine", "ejs");

app.get("/wrtc/:room", (req, res) => {
  res.render("room", { roomId: req.params.room, user: req.params.name });
});

/*var data = JSON.parse(fs.readFileSync('./data/parties.json'))
Object.entries(data).forEach(([e, v]) => {
  v.categories = []
  data[e] = v
})

fs.writeFileSync('./data/parties.json', JSON.stringify(data))*/

require('./lib/server')(app)