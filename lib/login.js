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
          if (e.email==username&&e.password==password) {s([true, e.id, e]);return a.push`amonus`;}
        })
        a = a.join('')
        if (a=='') return s(false)
      })
    },
    set(username, password) {

    },
    write(data) {

    },
    token(username, password, token) {
      return new Promise((a,r) => this.get(username, password).then(e => {
        var Data = JSON.parse(Fs.readFileSync('./accounts/data.json'));
        Data[e[1]].tokens.push(token)
        Fs.writeFileSync('./accounts/data.json', JSON.stringify(Data))
        a('e')
      }))
    }
  }
}