//lib 
// Copyright 2022 Tenoqu  Inc.
// Front-end by GreenWorld#0001 
// Back-end by EnderKingJ#0001 
// This website and it's function is completely closed source. Please do not attempt to release it's source.
const Fs = require('fs')

module.exports = function(app) {
  return {
    get(username, password) {
      var Accounts = JSON.parse(Fs.readFileSync('./accounts/credential.json'));
      return new Promise((s, r) => {
        var a = []
        Accounts.map(e => {
          e.email = app.b64.decode(e.email)
          e.password = app.b64.decode(e.password)
          if (e.email == username && e.password == password) { s([true, e.id, e]); return a.push`amonus`; }
        })
        a = a.join('')
        if (a == '') return s(false)
      })
    },
    set(username, password, name) {
      var Accounts = JSON.parse(Fs.readFileSync('./accounts/credential.json'));
      var AccountData = JSON.parse(Fs.readFileSync('./accounts/data.json'))
      var Unique_Id = Math.floor(Math.random() * (999999999999 - 100000000000) + 100000000000)
      var Discriminator = Math.floor(Math.random() * (9999-1000)+1000)
      return new Promise((s, r) => {
        Accounts.map(u=>u.email==app.b64.encode(username)?r('fail'):null);
        Accounts.push({
          "email": app.b64.encode(username).toString(),
          "password": app.b64.encode(password).toString(),
          "id": Unique_Id.toString(),
          "hash": Discriminator.toString()
        })
        AccountData[Unique_Id] = {
          "uid": Unique_Id.toString(),
          "hash": Discriminator.toString(),
          "icon": "//cdn.tenoqu.xyz/avatar/default/base.png".toString(),
          "servers": ["928375302938"],
          "tokens": [],
          "username": name.toString()
        }
        Fs.writeFileSync('./accounts/credential.json', JSON.stringify(Accounts))
        Fs.writeFileSync('./accounts/data.json', JSON.stringify(AccountData))
        s(Unique_Id)
      })
    },
    write(data) {

    },
    token(username, password, token) {
      return new Promise((a, r) => this.get(username, password).then(e => {
        var Data = JSON.parse(Fs.readFileSync('./accounts/data.json'));
        Data[e[1]].tokens.push(token)
        Fs.writeFileSync('./accounts/data.json', JSON.stringify(Data))
        a('e')
      }))
    }
  }
}