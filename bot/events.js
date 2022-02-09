// TenoquAPI 
// Copyright 2022 Tenoqu  Inc.
// Front-end by GreenWorld#0001 
// Back-end by EnderKingJ#0001 
// This website and it's function is completely closed source. Please do not attempt to release it's source.
const fs = require('fs')

module.exports = function(app) {
  app.ws('/message-listener', (cli, req) => {
    cli.bot = 'true'
    cli.on('message', (m) => {
      m = JSON.parse(m)
      var Data = JSON.parse(Fs.readFileSync('./data/messages.json'))
      var MessageData = Data[message.channel]
      if (!MessageData) return 'failed'
      MessageData.push(mess)
      Fs.writeFileSync('./data/messages.json', JSON.stringify(Data))
      Wss.getWss().clients.forEach(cli => (cli.id&&cli.id!=AccountData.uid)?cli.send(JSON.stringify({type: 'message',channel:message.channel,data:mess})):null)
    })
  })
}