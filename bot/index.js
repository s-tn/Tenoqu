// TenoquAPI 
// Copyright 2022 Tenoqu  Inc.
// Front-end by GreenWorld#0001 
// Back-end by EnderKingJ#0001 
// This website and it's function is completely closed source. Please do not attempt to release it's source.

var fs = require('fs')
var Listen = require('./listen')
var Events = require('./events')
var Channel = require('./channel')

module.exports = function(req, res, app) {
  var Paths = ''
  req.url.replace(/\/v[0-9]\/[a-zA-Z0-9]+\/(.*)\//g, (e, p) => Paths = p.split('?')[0])
  if (Paths=='listen') {
    return Listen(req, res, app)
  }
  if (Paths=='channels') {
    return Channel(req, res, app)
  }
  res.writeHead(500).end('{}')
}