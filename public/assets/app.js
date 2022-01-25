if (!localStorage['token']) location.href = '/login'

const APP = document.querySelector('#app')

const main = {
  load: {
    login: () => {
      var ws = new WebSocket('wss://' + location.host + '/auth-gateway?v=2')
      worker.log('Connecting Login Socket, wss://' + location.host + '/auth-gateway?v=2')
      ws.onopen = function() {
        parent.postMessage("Toop", '*');
        ws.send(JSON.stringify({
          token: localStorage['token'],
          uid: atob(localStorage['token'].split('.')[0])
        }))
      }
      ws.onmessage = function(e) {
        var data = JSON.parse(e.data.toString())
        localStorage.setItem('udata', JSON.stringify(data.udata))
        if (data.status == 'success' && data.udata) {
          location.pathname.split('/channels/')[1] ? main.app.redirect(location.pathname, true) : main.app.redirect('/channels/@me', true)
        } else {
          location.href = '/login'
        }
      }
    },
    go() {

    }
  },
  app: {
    ws: {},
    par: '',
    InitLoad: () => {
      return new Promise((f, a) => {
        var src_map = ['servers.js', 'stickers.js', 'emoji.js', 'info.js', 'handler.js', 'channelLoad.js'];
        src_map.forEach((src) => {
          var Src = src
          const Elem = document.createElement('script');
          src = '/chunks/'+src
          Elem.setAttribute('src', src);
          try {
            fetch(src).then(e => e.text()).then(e => {document.head.appendChild(Elem);f(true)}).catch(e => {flux.log('Loading Chunk '+src_map.indexOf(Src)+' Failed: '+src);f(false)})
          } catch {
            flux.log('Loading Chunk '+src_map.indexOf(Src)+' Failed: '+src)
            f(false)
          }
        })
      })
    },
    request: async (method, path, query) => {
      var e = await fetch('/api/v' + window.TenoquOpts.apiVersion + '/' + method + '/' + path + query.map((e, i) => i == 0 ? `?${e[0]}=${e[1]}` : `&${e[0]}=${e[1]}`).join(''), { method: 'GET', headers: {'content-type': 'text/js','Authorization': localStorage['token']}})
      if (e.status!==200) {worker.log('Channel Fetch Failed: ' + (path==''?undefined:path));return []}
      return e.json()
    },
    plain: async (method, path, query) => {
      var e = await fetch('/api/v' + window.TenoquOpts.apiVersion + '/' + method + '/' + path + query.map((e, i) => i == 0 ? `?${e[0]}=${e[1]}` : `&${e[0]}=${e[1]}`).join(''), { method: 'GET', headers: {'content-type': 'text/js','Authorization': localStorage['token']}})
      if (e.status!==200) {worker.log('Channel Fetch Failed: ' + (path==''?undefined:path));return []}
      return e.text()
    },
    Terminate: () => {
      setTimeout(() => {
        try {console.error('Error: App Terminated')} catch(e) {}
      }, 3000)
      APP.remove();
      throw new Error('Tenoqu Load Status: Aborted')
    },
    init: () => {
      main.app.loScr(3000)
      setTimeout(async () => {
        var guilds = document.createElement('div');
        var channels = document.createElement('div');
        var messageWrap = document.createElement('div');
        var members = document.createElement('div');
        guilds.classList.add('guilds')
        channels.classList.add('channels')
        messageWrap.classList.add('message-wrapper')
        messageWrap.insertAdjacentHTML('afterbegin', '<input type="file">')
        members.classList.add('users')
        var channelsHead = document.createElement('div')
        channelsHead.classList.add('server-info')
        channelsHead.innerText = ''
        channels.insertAdjacentElement('afterbegin', channelsHead)
        var cList = document.createElement('div')
        cList.classList.add('clist')
        channels.insertAdjacentElement('beforeend', cList)
        APP.insertAdjacentElement('beforeend', guilds)
        APP.insertAdjacentElement('beforeend', channels)
        APP.insertAdjacentElement('beforeend', messageWrap)
        APP.insertAdjacentElement('beforeend', members)
        var servers = document.createElement('div')
        servers.id = 'servers'
        guilds.insertAdjacentElement('afterbegin', servers)
        var dms = document.createElement('div')
        dms.classList.add('direct-messaging')
        dms.insertAdjacentHTML('afterbegin', `<div class="dm-divider"></div>`)
        dms.insertAdjacentHTML('afterbegin', `<div class="home-label server-init selected" data-predir="@me"><span></span><img src="/loading-gifs/ve.svg"></div>`)
        var create = document.createElement('div')
        create.classList.add('create-server')
        guilds.insertAdjacentElement('beforeend', create)
        guilds.insertAdjacentElement('afterbegin', dms)
        var serverAdd = document.createElement('div')
        serverAdd.classList.add('add-server')
        var mainSAdd = document.createElement('div')
        serverAdd.appendChild(mainSAdd)
        document.body.appendChild(serverAdd)
        document.querySelectorAll('img').forEach(e => {e.ondragstart = function() { return false; }}); 
        main.app.loadChannel();
      }, 1000)
    },
    redirect: (page, load) => {
      history.pushState({ page: 'Chat' }, "Chat", window.location.origin + page)
      router.log('Timestamp: ['+new Date().getTime()+']'+' Transferring to ' + page)
      if (load) return main.app.init();
      window.dispatchEvent(new CustomEvent("pushState", { 'detail': page }))
    },
    loScr: async (time) => {
      var ChunksLoaded = await main.app.InitLoad()
      if (ChunksLoaded!==true) {
        main.app.Terminate();
      }
      var loading_over = document.createElement('div')
      loading_over.setAttribute('style', 'transform: scale(0);transition: all 0.5s ease;width: 200vw;height:200vw;position:absolute;display:flex;align-items:center;justify-content:center;color:white;user-select: none;')
      loading_over.classList.add('before-loading')
      var insideDiv = document.createElement('div')
      var img = document.createElement('img')
      img.classList.add('load-icon')
      var announcer = document.createElement('span')
      announcer.classList.add('announcer')
      announcer.innerText = 'Did you Know?'
      var funFact = document.createElement('span')
      funFact.classList.add('fun-fact')
      funFact.innerText = 'Placeholder Placeholder!'
      insideDiv.insertAdjacentElement('afterBegin', funFact)
      insideDiv.insertAdjacentElement('afterBegin', announcer)
      insideDiv.insertAdjacentElement('afterBegin', img)
      loading_over.appendChild(insideDiv)
      APP.appendChild(loading_over)
      flux.log('[' + new Date().getTime() + '] Start')
      var imgarray = ["blobbounce.gif", "eoooo.gif", "kurbrun.gif", "pandahapi.gif", "catspin1.gif", "eoooo.gif", "nezrun.gif", "NEOOOO.gif", "fastcat.gif", "slowfrog.gif", "rgbfrog.gif", "logo.gif"]
      var r1 = Math.random() * (1000 - 100) + 100
      if (r1 >= 990) {
        var r2 = imgarray.length
        imgarray[r2] = 'amogus.gif'
      } else {
        var r2 = Math.round(Math.random() * (imgarray.length - 1 - 0) + 0)
      }
      r2 = '/loading-gifs/' + imgarray[r2]
      document.querySelector('.load-icon').src = r2
      var factsArray = ["This is... A clone... of Discord!", "made by god", "pls no sue discord", "Tenoqu >>>", "GreenWorld is the best :D", "ur mom hehe", "Nebula is cool", "TN ride or die"]
      document.querySelector('.fun-fact').innerText = factsArray[Math.round(Math.random() * (factsArray.length - 1))]
      setTimeout(() => {
        document.querySelector('.before-loading').style.transform = 'scale(1)'
      }, 100)
      setTimeout(() => {
        worker.log('Logger has loaded')
        document.querySelector('.before-loading').style.transform = 'scale(0)'
      }, time - 500)
    }
  }
}

window.scrollY = '0'


//onload = main.app.init

function scrollSmoothToBottom() {
  var div = document.getElementById('message-wrap');
  $('#message-wrap').animate({
    scrollTop: div.scrollHeight - div.clientHeight
  }, 0);
}

window.addEventListener('pushState', (e) => {
  main.app.loadChannel(e.detail)
})

window.onload = function() {/*if(location.pathname.startsWith('/app')) {main.load.login()} else if (location.pathname.startsWith('/channels/')) main.load.go();*/main.load.login() }

Array.prototype.delete = function(index) {
  delete this[index]
  return this
}

flux = {}
flux.log = function() {
  console.log(`[%cFlux%c] ${arguments[0]}`, 'color: purple;font-weight:bold;', 'color: inherit;')
}
worker = {}
worker.log = function() {
  console.log(`[%cWorker%c] ${arguments[0]}`, 'color: purple;font-weight:bold;', 'color: inherit;')
}
router = {}
router.log = function() {
  console.log(`[%cRouting%c] ${arguments[0]}`, 'color: purple;font-weight:bold;', 'color: inherit;')
}

function code() {
  var code = (prompt('enter code') || 0000000).toString()
  if (code.length !== 7) {
    return alert('invalid code')
  }
  var codews = new WebSocket('wss://' + location.host + '/code?v=1')
  worker.log('Connecting Code Socket, wss://' + location.host + '/code?v=1')
  codews.onopen = function() { codews.send(JSON.stringify({ code: code, token: localStorage['token'] })) }
  codews.onmessage = function(m) {
    var data = JSON.parse(m.data)
    if (data.status == "success") {
      var cofn = confirm('Confirm Login')
      codews.send(JSON.stringify({ mode: 2, code: code, token: localStorage['token'] }))
    } else {
      alert('code no exist')
    }
  }
}

function urlify(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function(url) {
    return '<a target="_blank" href="' + url + '">' + url + '</a>';
  })
}

function imageify(text) {
  if (text.includes('data:image')) {
    if (text.includes('<img src="data:image')) {

    } else {
      var split = text.split(" ", 1);
      var end = text.split(' ').slice(1).join(' ')
      text = "<img src='" + split + "'>" + ' ' + end
    }
  }
  return text
}