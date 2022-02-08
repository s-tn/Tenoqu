// chunks 
// Copyright 2022 Tenoqu  Inc.
// Front-end by GreenWorld#0001 
// Back-end by EnderKingJ#0001 
// This website and it's function is completely closed source. Please do not attempt to release it's source.
async function ServerLoader() {
  //document.querySelector('#servers').innerHTML = ''
  const e = await main.app.request('parties', location.pathname.split('/').splice(2, 1), [['type', 'userservers'], ['v', '1'], ['uid', JSON.parse(localStorage['udata']).uid]])
  return new Promise(async (f, r) => {
    ServerLogger.log('Servers Loaded => \n' + e.join(',\n'))
    e.map(async id => {
      /*<div class="server-label sl0" data-predir="1000000000/1000000000"><span></span><div class="sl-eae"><img width="55" height="55" src="/user.png" style="border-radius:50%;"></div></div>*/
      var a = await main.app.request('parties', id, [['v', '1']])
      if (document.querySelector(`*[data-predir="/channels/${id}"`)) return //fuck you em
      var server = document.createElement('div')
      server.classList.add('server-label')
      server.classList.add('sl' + e.indexOf(id))
      server.setAttribute('data-predir', '/channels/' + id)
      server.setAttribute('data-show', a.display)
      server.insertAdjacentHTML('afterbegin', '<span></span>')
      var SLDIV = document.createElement('div')
      SLDIV.classList.add('sl-eae')
      SLDIV.insertAdjacentHTML('beforeend', `<img width="55" height="55" src="${a.icon}" style="border-radius:50%;">`)
      server.insertAdjacentElement('beforeend', SLDIV)
      try {document.querySelector('#servers').insertAdjacentElement('beforeend', server)} catch {return location.reload(1)}
      server.addEventListener('click', main.app.handleServer(server, a))
      if (location.pathname.split('/').splice(2, 1)==id) {
        server.click()
      }
      document.querySelectorAll('img').forEach(e => { e.ondragstart = function() { return false; } });
    })
    setTimeout(f, 300)
  })
}

setTimeout(ServerLoader, 500)

var ServerLogger = {}
ServerLogger.log = function() {
  console.log(`[%cServerLoader%c] ${arguments[0]}`, 'color: purple;font-weight:bold;', 'color: inherit;')
}

//window.serversLoaded = false;

//setTimeout(ServerLoader, 1500)

main.app.createServer = async (name, icon) => {
  var request = new XMLHttpRequest;
  var id = Math.floor(Math.random() * (999999999999 - 100000000000) + 100000000000)
  request.open('POST', window.TenoquOpts.deliveryAddress + '/uploadservericon');
  request.onloadend = async function() {
    if (request.status == '200') {
      var e = await main.app.plain('parties', location.pathname.split('/').splice(2, 1), [['icon', window.TenoquOpts.deliveryAddress + request.responseText], ['uid', JSON.parse(localStorage['udata']).uid], ['type', 'create'], ['name', name]])
      await ServerLoader()
      setTimeout(() => document.querySelector(`*[data-predir="/channels/${e.split('/').splice(2, 1)[0]}"]`).click(), 1000)
    } else {

    }
  }
  var reader = new FileReader()
  reader.onload = function(e) {
    request.send(JSON.stringify({ id: id, data: e.target.result }))
  }
  reader.readAsDataURL(icon)
}

// main.app.createServer('sussy baka', document.querySelector('input[type=file]').files[0])