//lib 
// Copyright 2022 Tenoqu  Inc.
// Front-end by GreenWorld#0001 
// Back-end by EnderKingJ#0001 
// This website and it's function is completely closed source. Please do not attempt to release it's source.
const ws = require('express-ws'),
  Fs = require('fs')

module.exports = function(app) {
  var Wss = ws(app)

  app.ws('/gateway', (cli, req) => {
    if (req.query.v == '2') {
      cli.on('message', (message) => {
        if (message == 'initiate') {
          cli.send('Initiate Login')
          cli.send(JSON.stringify({ socket: req.query.socket, auth: 'basic', ip: req.headers['x-forwarded-for'] }))
        }
      })
    } else {
      cli.send('Error: Invalid Version')
      return cli.close(1006);
    }
  })

  app.ws('/qrsocket', (cli, req) => {
    if (req.query.v == '1') {
      cli.on('message', (message) => {
        message = JSON.parse(message)
        const AUTH_CODE = Math.round(Math.random() * (9999999 - 1000000) + 1000000)
        console.log(AUTH_CODE)
        cli.send(JSON.stringify({ socket: message.socket, key: AUTH_CODE }))
      })
    } else {
      cli.send('Error: Invalid Version')
      return cli.close(1006);
    }
  })

  app.ws('/auth-gateway', (cli, req) => {
    if (req.query.v == '2') {
      cli.on('message', (message) => {
        message = JSON.parse(message)
        var Data = JSON.parse(Fs.readFileSync('./accounts/data.json'))
        if (Data[message.uid] && Data[message.uid].tokens.indexOf(message.token) > -1) return cli.send(JSON.stringify({ 'status': 'success', udata: Data[message.uid] }));
        return cli.send(JSON.stringify({ 'status': 'failure' }))
      })
    } else {
      cli.send('Error: Invalid Version')
      return cli.close(1006);
    }
  })

  app.ws('/app', (cli, req) => {
    if (req.query.v == '1') {
      cli.id = req.query.uid
      cli.on('message', (message) => {
        message = JSON.parse(message)
        if (message.type=='message') {
          try {var parsedToken = app.Token.decode(message.token)} catch {return res.writeHead(403).json({status: '403', message: 'Unauthorized'})}
          var AccountData = JSON.parse(Fs.readFileSync('./accounts/data.json'))[parsedToken.uid.toString()]
          if (AccountData.tokens.indexOf(message.token)==-1) return cli.send(JSON.stringify({'status': 'failure', 'type': 'messagerespond'}))
          var mess = {
            author: AccountData.username,
            hash: AccountData.hash,
            uid: AccountData.uid,
            timestamp: new Date().getTime(),
            icon: AccountData.icon,
            content: message.content,
            id: message.id,
            server: true,
            bot: message.bot?true:false,
          }
          var Data = JSON.parse(Fs.readFileSync('./data/messages.json'))
          var MessageData = Data[message.channel]
          if (!MessageData) return 'failed'
          MessageData.push(mess)
          Fs.writeFileSync('./data/messages.json', JSON.stringify(Data))
          Wss.getWss().clients.forEach(cli => (cli.id&&cli.id!=AccountData.uid)?cli.send(JSON.stringify({type: 'message',channel:message.channel,data:mess})):null)
          cli.send(JSON.stringify({type: 'messagedone', id: message.id}))
          var channel = message.channel
          mess.channel = {
            /*send: `(function(message) {
              switch(typeof message) {
                case "string":
                  
                  break;
                case "object":
                  var mess = message;
                  MessageData.push(mess)
                  Fs.writeFileSync('./data/messages.json', JSON.stringify(Data))
                  Wss.getWss().clients.forEach(cli => {cli.send(JSON.stringify({type: 'message', channel: channel, data: mess}))})
                  break;
                default:
                  break;
              }
            })`*/
          }
          Wss.getWss().clients.forEach(e => e.bot=='true'?e.send(JSON.stringify(mess)):null)
        }
      })
    } else {
      cli.send('Error: You are using an Invalid Version. Please try to update to the latest version or try again later. (error-invalVer)')
      return cli.close(1006);
    }
  })
  return { app: app, Wss: Wss }
}