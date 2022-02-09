// TenoquAPI 
// Copyright 2022 Tenoqu  Inc.
// Front-end by GreenWorld#0001 
// Back-end by EnderKingJ#0001 
// This website and it's function is completely closed source. Please do not attempt to release it's source.
const fs = require('fs')

module.exports = function(req, res, app) {
  var Paths = ''
  req.url.replace(/\/v[0-9]\/[a-zA-Z0-9]+\/(.*)/g, (e, p) => Paths = p.split('?')[0])
  var chunks = []
  req.on('data', (chunk) => {
    chunks.push(chunk)
  }).on('end', () => {
    var data = JSON.parse(Buffer.concat(chunks).toString())
    var a = JSON.parse(fs.readFileSync('./bot/data.json'))
    var yes = false;
    a.data.map(e => {e.token==data.token?yes=e.uid:null})
    if (yes==false) return res.writeHead(403).end(JSON.stringify({status: 403, message: 'Unauthorized'}))
    res.json({user: a.bots[yes].name})
  })
}
