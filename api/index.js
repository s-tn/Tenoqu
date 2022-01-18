const Channel = require('./channel.js');
const Party = require('./party.js');
const Messages = require('./message.js');

class TenoquApi {
  constructor(app) {
    return function(req, res, next) {
      console.log(req.headers)
      if (req.method!='GET') return res.status(403).end('')
      console.log(req.url)
      var Version = ''
      var Method = ''
      req.url.replace(/\/v([0-9])\//g, (e,p) => Version=p)
      req.url.replace(/\/v[0-9]\/([a-zA-Z0-9]+)\//g, (e,p) => Method=p)
      if (Version==1) {
        if (Method=='channels') {
          return Channel(req, res, app)
        }
        if (Method=='guild') {
          return Channel(req, res, app)
        }
        if (Method=='messages') {
          return Channel(req, res, app)
        }
      }
      next();
    }
  }
}

module.exports = TenoquApi