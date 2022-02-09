// TenoquAPI 
// Copyright 2022 Tenoqu  Inc.
// Front-end by GreenWorld#0001 
// Back-end by EnderKingJ#0001 
// This website and it's function is completely closed source. Please do not attempt to release it's source.
const Channel = require('./channel.js');
const Party = require('./party.js');
const Messages = require('./message.js');
const Category = require('./category.js');
const Icon = require('./icon.js');
const Bot = require('../bot/index.js')

class TenoquApi {
  constructor(app) {
    return function(req, res, next) {
      if (req.method != 'GET' && req.method != 'POST') return res.status(403).end('')
      var Version = ''
      var Method = ''
      req.url.replace(/\/v([0-9])\//g, (e, p) => Version = p)
      req.url.replace(/\/v[0-9]\/([a-zA-Z0-9]+)\//g, (e, p) => Method = p)
      if (Version == '1') {
        if (!req.headers['authorization']||req.headers['authorization']=='undefined') return res.status(403).end(JSON.stringify({status: '401', message: 'Unauthorized'}))
        try {var yesmhm = JSON.parse(require('fs').readFileSync('./accounts/data.json'))[new Buffer.from(req.headers['authorization'].split('.')[0], 'base64').toString('utf-8')].tokens.indexOf(req.headers['authorization'])==-1} catch {var yesmhm = false}
        if ((req.headers['authorization'].startsWith('bot@')&&Method!=='bot')||yesmhm) return res.status(403).end(JSON.stringify({status: '401', message: 'Unauthorized'}))
        if (Method == 'channels') {
          return Channel(req, res, app)
        }
        if (Method == 'icon') {
          return Icon(req, res, app)
        }
        if (Method == 'parties') {
          return Party(req, res, app)
        }
        if (Method == 'messages') {
          return Messages(req, res, app)
        }
        if (Method == 'categories') {
          return Category(req, res, app)
        }
        if (Method=='bot') {
          return Bot(req, res, app)
        }
      }
      next();
    }
  }
}

module.exports = TenoquApi