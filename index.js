const express = require('express');
var app = express();

const Login = require('./login')

app.Token = require('./token')

app.b64 = require('./base')

app.Login = Login(app)

var {app, Token} = require('./auth')(app)

var {app, Wss} = require('./ws')(app)

var {app, Route} = require('./route')(app)

app.use(express.static('./public', {extensions: ['html']}))
app.use(Token)
app.use(Route)

require('./server')(app)