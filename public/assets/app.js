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
    request: async (method, path, query) => {
      var e = await fetch('/api/v' + window.TenoquOpts.apiVersion + '/' + method + '/' + path + query.map((e, i) => i == 0 ? `?${e[0]}=${e[1]}` : `&${e[0]}=${e[1]}`).join(''), { method: 'GET', headers: {'content-type': 'text/js'}})
      return e
    },
    init: () => {
      main.app.loScr(3000)
      setTimeout(() => {
        var guilds = document.createElement('div');
        var channels = document.createElement('div');
        var messageWrap = document.createElement('div');
        var members = document.createElement('div');
        guilds.classList.add('guilds')
        channels.classList.add('channels')
        messageWrap.classList.add('message-wrapper')
        members.classList.add('users')
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
        dms.insertAdjacentHTML('afterbegin', `<div class="home-label server-init selected" data-predir="@me"><span></span><svg class="homeIcon-AaowEC" aria-hidden="false" width="28" height="20" viewBox="0 0 28 20"><path fill="currentColor" d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461744 10.3368 0.00546311C8.48074 0.324393 6.67795 0.885118 4.96746 1.68231C1.56727 6.77853 0.649666 11.7538 1.11108 16.652C3.10102 18.1418 5.3262 19.2743 7.69177 20C8.22338 19.2743 8.69519 18.4993 9.09812 17.691C8.32996 17.3997 7.58522 17.0424 6.87684 16.6135C7.06531 16.4762 7.24726 16.3387 7.42403 16.1847C11.5911 18.1749 16.408 18.1749 20.5763 16.1847C20.7531 16.3332 20.9351 16.4762 21.1171 16.6135C20.41 17.0369 19.6639 17.3997 18.897 17.691C19.3052 18.4993 19.7718 19.2689 20.3021 19.9945C22.6677 19.2689 24.8929 18.1364 26.8828 16.6466H26.8893C27.43 10.9731 25.9665 6.04728 23.0212 1.67671ZM9.68041 13.6383C8.39754 13.6383 7.34085 12.4453 7.34085 10.994C7.34085 9.54272 8.37155 8.34973 9.68041 8.34973C10.9893 8.34973 12.0395 9.54272 12.0187 10.994C12.0187 12.4453 10.9828 13.6383 9.68041 13.6383ZM18.3161 13.6383C17.0332 13.6383 15.9765 12.4453 15.9765 10.994C15.9765 9.54272 17.0124 8.34973 18.3161 8.34973C19.6184 8.34973 20.6751 9.54272 20.6543 10.994C20.6543 12.4453 19.6184 13.6383 18.3161 13.6383Z"></path></svg></div>`)
        guilds.insertAdjacentElement('afterbegin', dms)
      }, 2500)
    },
    redirect: (page, load) => {
      history.pushState({ page: 'Chat' }, "Chat", window.location.origin + page)
      router.log('Transferring to ' + page)
      if (load) return main.app.init();
      window.dispatchEvent(new CustomEvent("pushState", { 'detail': page }))
    },
    loadChannel: (url) => {
      console.log(url)
    },
    loScr: (time) => {
      var loading_over = document.createElement('div')
      loading_over.setAttribute('style', 'transform: scale(0);transition: all 0.5s ease;width: 100%;height:100vh;position:absolute;display:flex;align-items:center;justify-content:center;color:white;user-select: none;')
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