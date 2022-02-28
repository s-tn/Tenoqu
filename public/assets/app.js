// assets/app.js 
// Copyright 2022 Tenoqu  Inc.
// Front-end by GreenWorld#0001 
// Back-end by EnderKingJ#0001 
// This website and it's function is completely closed source. Please do not attempt to release it's source.
// Terms of Service: https://tenoqu.xyz/terms 

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
          delete localStorage['token']
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
        var loadedArray = []
        main.app.ws = new WebSocket('wss://'+location.hostname+'/app?v=1&uid='+JSON.parse(localStorage['udata']).uid)
        main.app.ws.url = 'wss://'+location.hostname+'/app?v=1&uid='+JSON.parse(localStorage['udata']).uid
        var src_map = ['servers.js', 'stickers.js', 'emoji.js', 'info.js', 'handler.js', 'channelLoad.js', 'utils.js', 'ws.js', 'menu.js', 'message.js', 'rtc.js', 'peer.min.js', 'fontAwesome.min.js', 'load.js', 'sw.js','proxy.js'];
        src_map.forEach((src) => {
          var index = src_map.indexOf(src)
          var Src = src
          const Elem = document.createElement('script');
          src = '/chunks/' + src
          Elem.setAttribute('src', src);
          try {
            fetch(src).then(e => e.text()).then(e => { document.head.appendChild(Elem); }).catch(e => { flux.log('Loading Chunk ' + src_map.indexOf(Src) + ' Failed: ' + src); f(false) })
            Elem.onload = function() {
              loadedArray.push(1)
              if (loadedArray.length==src_map.length) f(true)
            }
          } catch {
            flux.log('Loading Chunk ' + src_map.indexOf(Src) + ' Failed: ' + src)
            f(false)
          }
        })
      })
    },
    request: async (method, path, query) => {
      var e = await fetch('/api/v' + window.TenoquOpts.apiVersion + '/' + method + '/' + path + query.map((e, i) => i == 0 ? `?${e[0]}=${e[1]}` : `&${e[0]}=${e[1]}`).join(''), { method: 'GET', headers: { 'content-type': 'text/js', 'Authorization': localStorage['token'] } })
      if (e.status !== 200) { worker.log('Channel Fetch Failed: ' + (path == '' ? undefined : path)); return ['failed'] }
      return e.json()
    },
    plain: async (method, path, query) => {
      var e = await fetch('/api/v' + window.TenoquOpts.apiVersion + '/' + method + '/' + path + query.map((e, i) => i == 0 ? `?${e[0]}=${e[1]}` : `&${e[0]}=${e[1]}`).join(''), { method: 'GET', headers: { 'content-type': 'text/js', 'Authorization': localStorage['token'] } })
      if (e.status !== 200) { worker.log('Channel Fetch Failed: ' + (path == '' ? undefined : path)); return ['failed'] }
      return e.text()
    },
    Terminate: () => {
      setTimeout(() => {
        try { console.error('Error: App Terminated') } catch (e) { }
      }, 3000)
      APP.remove();
      throw new Error('Tenoqu Load Status: Aborted')
    },
    init: async () => {
      main.app.loScr(4000)
      var ChunksLoaded = await main.app.InitLoad()
      if (ChunksLoaded !== true) {
        main.app.Terminate();
      }
      setTimeout(async () => {
        var guilds = document.createElement('div');
        var channels = document.createElement('div');
        var messageWrap = document.createElement('div');
        var members = document.createElement('div');
        guilds.classList.add('guilds')
        channels.classList.add('channels')
        messageWrap.classList.add('message-wrapper')
        //messageWrap.insertAdjacentHTML('afterbegin', '<input type="file">')
        members.classList.add('users')
        '<div class="user-info"><img src="https://cdn.tenoqu.xyz/avatar/928822784520/d99115fbda15e9b622e5c4ed5a9a648a.webp"><div class="userinfocenter"><div class="userinfotop"><span class="userinfoname"></span></div></div></div>'
        var channelsHead = document.createElement('div')
        channelsHead.classList.add('server-info')
        channelsHead.innerText = ''
        var userInfo = document.createElement('div')
        userInfo.classList.add('user-info')
        var userCenter = document.createElement('div')
        userCenter.classList.add('userinfocenter')
        var userCenterTop = document.createElement('div')
        userCenterTop.classList.add('userinfotop')
        var userInfoName = document.createElement('span')
        userInfoName.classList.add('userinfoname')
        userInfoName.innerHTML = JSON.parse(localStorage['udata']).username
        userCenterTop.insertAdjacentElement('beforeend', userInfoName)
        userCenter.insertAdjacentElement('afterbegin', userCenterTop)
        userInfo.insertAdjacentElement('beforeend', userCenter)
        var settingsOpen = document.createElement('span')
        var settingsGear = document.createElement('i')
        settingsGear.classList.add('fa-solid')
        settingsGear.classList.add('fa-gear')
        settingsOpen.appendChild(settingsGear)
        settingsOpen.classList.add('gear-settings-open')
        userInfo.insertAdjacentElement('beforeend', settingsOpen)
        var userIcon = document.createElement('img')
        userIcon.src = Icon(JSON.parse(localStorage['udata']).icon)
        userInfo.insertAdjacentElement('afterbegin', userIcon)
        channels.insertAdjacentElement('afterbegin', channelsHead)
        channels.insertAdjacentElement('beforeend', userInfo)
        var cList = document.createElement('div')
        cList.classList.add('clist')
        channels.insertAdjacentElement('beforeend', cList)
        var inputForm = document.createElement('form')
        inputForm.setAttribute('id', 'mess-form')
        var inputTop = document.createElement('div')
        inputTop.classList.add('input-top')
        var iElem = document.createElement('i')
        iElem.classList.add('fas')
        iElem.classList.add('fa-plus')
        iElem.setAttribute('onclick', "document.querySelector('input[type=file]').click()")
        iElem.setAttribute('style', 'font-size: 20px;')
        var fileInput = document.createElement('input')
        fileInput.setAttribute('type', 'file')
        fileInput.setAttribute('style', 'display: none;')
        var iiInput = document.createElement('input')
        iiInput.classList.add('ii')
        iiInput.setAttribute('placeholder', 'Message #placeholder')
        inputTop.insertAdjacentElement('afterbegin', iiInput)
        inputTop.insertAdjacentElement('afterbegin', fileInput)
        inputTop.insertAdjacentElement('afterbegin', iElem)
        inputForm.insertAdjacentElement('beforeend', inputTop)
        main.app.initMessage(inputForm)
        messageWrap.insertAdjacentElement('beforeend', inputForm)
        var messageDiv = document.createElement('div')
        messageDiv.setAttribute('id', 'message-wrap')
        messageWrap.insertAdjacentElement('afterbegin', messageDiv)
        var channelInfo = document.createElement('div')
        channelInfo.classList.add('channel-info')
        var name = document.createElement('span')
        name.classList.add('name')
        var meta = document.createElement('span')
        meta.classList.add('meta')
        channelInfo.insertAdjacentElement('beforeend', name)
        channelInfo.insertAdjacentElement('beforeend', meta)
        messageWrap.insertAdjacentElement('afterbegin', channelInfo)
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
        var settings = document.createElement('div')
        settings.classList.add('settings-container')
        document.body.insertAdjacentElement('beforeend', settings)
        var sidebarSettings = document.createElement('div')
        sidebarSettings.classList.add('settings-sidebar')
        sidebarSettings.innerHTML = '<span class="settings-selector">Profile</span><span class="settings-selector">Account</span><span class="settings-selector">Appearance</span><span class="settings-selector">Fonts</span><span class="settings-selector">Themes</span><span class="settings-selector">Messages</span><span class="settings-selector">Plugins</span><span class="settings-selector">Keybinds</span><span class="settings-selector">Notifications</span>'
        sidebarSettings.querySelectorAll('.settings-selector').forEach(e => {
          e.addEventListener('click', main.app.settingsHandler(e, settings))
        })
        settings.insertAdjacentElement('afterbegin', sidebarSettings)
        settingsOpen.addEventListener('click', () => {
          settings.classList.toggle('visible')
        })
        guilds.insertAdjacentElement('afterbegin', dms)
        var serverAdd = document.createElement('div')
        serverAdd.classList.add('add-server')
        var mainSAdd = document.createElement('div')
        serverAdd.appendChild(mainSAdd)
        document.body.appendChild(serverAdd)
        document.querySelectorAll('img').forEach(e => { e.ondragstart = function() { return false; } });
        main.app.loadChannel();
        setTimeout(main.app.onload?main.app.onload:()=>{},100)
      }, 200)
    },
    redirect: (page, load) => {
      if (!page.startsWith('/')) page = '/'+page
      history.pushState({ page: 'Chat' }, "Chat", window.location.origin + page)
      router.log('Timestamp: [' + new Date().getTime() + ']' + ' Transferring to ' + page)
      if (load) return main.app.init();
      window.dispatchEvent(new CustomEvent("pushState", { 'detail': page }))
    },
    loScr: async (time) => {
      if (main.app.restartTimes && main.app.restartTimes.active==true) {
        document.querySelector('.before-loading').remove()
        time = main.app.restartTimes.timings[main.app.restartTimes.current] + 1000
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
      var factsArray = ["Our Mascot's name is Mellow!", "made by god?", "don't sue us", "Tenoqu >>>", "i'm confused", "ur mom hehe", "Nebula is cool", "SmallHost Is cool"]
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
  //main.app.loadChannel(e.detail)
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
    return '<a target="_blank" class="messageLink" href="' + url + '">' + (url.endsWith('/')?url:url+'/') + '</a>';
  })
}

function imageify(text) {
  if (text.includes('data:image')) {
    if (text.includes('<img src="data:image')) {

    } else {
      var split = text.split(" ", 1);
      var end = text.split(' ').slice(1).join(' ')
      text = "<img id='"+Math.floor(Math.random()*(328532-1034)+1034)+"' class='imageMessage' src='" + split + "'>" + ' ' + end
    }
  }
  return text
}

function Icon(src) {
  if (src.startsWith('http') && src.replace(new URL(src).protocol,'').startsWith(window.TenoquOpts.deliveryAddress)||src.includes(window.TenoquOpts.deliveryAddress.replace('//',''))) {
    return src
  } else {
    return location.origin+'/external-resource/'+src
  }
}