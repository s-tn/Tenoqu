const parser = require('body-parser')

module.exports = function(app) {
  app.use(parser.text())
  return {app: app, Token: function(req, res, next) {
    if (req.method=='POST'&&req.url.split('?')[0].split('#')[0]=='/token') {
      var data = JSON.parse(req.body)
      if (data.username==''||data.password=='') {
        return res.writeHead(403, {'content-type': 'application/json'}).end(JSON.stringify({status: 'failure'}))
      }
      app.Login.get(data.username, data.password).then((tf) => {
        var uid = tf[1]
        var tf = tf[0];
        if (tf==true) {
          const KEY_TOKEN = app.Token.encode(uid, data.session)
          return app.Login.token(data.username, data.password, KEY_TOKEN).then(a=>res.send(JSON.stringify({status: 'success', crypt: KEY_TOKEN})))
        } else {
          return res.writeHead(403, {'content-type': 'application/json'}).end(JSON.stringify({status: 'failure'}))
        }
      })
    }
    return next();
  }}
}