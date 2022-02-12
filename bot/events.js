// TenoquAPI 
// Copyright 2022 Tenoqu  Inc.
// Front-end by GreenWorld#0001 
// Back-end by EnderKingJ#0001 
// This website and it's function is completely closed source. Please do not attempt to release it's source.
const Fs = require('fs')

module.exports = function(app) {
  app.ws('/message-listener', (cli, req) => {
    cli.bot = 'true'
    cli.previousMessage = null
    cli.on('message', (m) => {
      if (cli.previousMessage==m) return
      cli.previousMessage = m
      m = JSON.parse(m)
      var Data = JSON.parse(Fs.readFileSync('./data/messages.json'))
      var MessageData = Data[m.channel]
      if (!MessageData) return 'failed'
      //delete m.channel
      MessageData.push(m)
      Fs.writeFileSync('./data/messages.json', JSON.stringify(Data))
      //console.log('gi')
      app.wss.getWss().clients.forEach(cli => cli.id?cli.send(JSON.stringify({type: 'message',channel:m.channel,data:m})):null)
      cli.send(JSON.stringify({type: 'messagedone', id: m.id}))
    })
  })
}