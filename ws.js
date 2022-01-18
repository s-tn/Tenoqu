const ws = require('express-ws'),
  Fs = require('fs')

module.exports = function(app) {
  var Wss = ws(app)

  app.ws('/gateway', (cli, req) => {
    if (req.query.v=='2') {
      cli.on('message', (message) => {
        if (message=='initiate') {
          cli.send('Initiate Login')
          cli.send(JSON.stringify({socket: req.query.socket, auth: 'basic', ip: req.headers['x-forwarded-for']}))
        }
      })
    } else {
      cli.send('Error: Invalid Version')
      return cli.close(1006);
    }
  })

  app.ws('/qrsocket', (cli, req) => {
    if (req.query.v=='1') {
      cli.on('message', (message) => {
        message = JSON.parse(message)
        const AUTH_CODE = Math.round(Math.random() * (9999999 - 1000000) + 1000000)
        console.log(AUTH_CODE)
        cli.send(JSON.stringify({socket: message.socket, key: AUTH_CODE}))
      })
    } else {
      cli.send('Error: Invalid Version')
      return cli.close(1006);
    }
  })

  app.ws('/auth-gateway', (cli, req) => {
    if (req.query.v=='2') {
      cli.on('message', (message) => {
        message = JSON.parse(message)
        var Data = JSON.parse(Fs.readFileSync('./accounts/data.json'))
        if (Data[message.uid] && Data[message.uid].tokens.indexOf(message.token)>-1) return cli.send(JSON.stringify({'status': 'success', udata: Data[message.uid]}));
        return cli.send(JSON.stringify({'status': 'failure'}))
      })
    } else {
      cli.send('Error: Invalid Version')
      return cli.close(1006);
    }
  })

  return {app: app, Wss: Wss}
}