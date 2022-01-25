const Channel = require('./channel.js');
const Party = require('./party.js');
const Messages = require('./message.js');
const Category = require('./category.js');

class TenoquApi {
  constructor(app) {
    return function(req, res, next) {
      if (req.method!='GET') return res.status(403).end('')
      var Version = ''
      var Method = ''
      req.url.replace(/\/v([0-9])\//g, (e,p) => Version=p)
      req.url.replace(/\/v[0-9]\/([a-zA-Z0-9]+)\//g, (e,p) => Method=p)
      if (Version=='1') {
        if (!req.headers['authorization']) return res.status(403).end('Unauthorized')
        if (Method=='channels') {
          return Channel(req, res, app)
        }
        if (Method=='parties') {
          return Party(req, res, app)
        }
        if (Method=='messages') {
          return Messages(req, res, app)
        }
        if (Method=='categories') {
          return Catrgory(req, res, app)
        }
      }
      next();
    }
  }
}

module.exports = TenoquApi