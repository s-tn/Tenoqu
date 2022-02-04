// Chunks/WS.js  
// Copyright 2022 Tenoqu  Inc.
// Front-end by GreenWorld#0001 
// Back-end by EnderKingJ#0001 
// This website and it's function is completely closed source. Please do not attempt to release it's source.
// Terms of Service: https://tenoqu.xyz/terms

main.app.restartTimes = {
  timings: {1: 5, 2: 10, 3: 15, 4: 30, 5: 60},
  current: 0,
  active: false,
}

function initWs() {
  flux.log('WebSocket Connecting: '+main.app.ws.url)
  flux.log('WebSocket Connection: '+main.app.ws.url)
  if (arguments[0]) {
    worker.log('Logger has loaded')
    document.querySelector('.before-loading').style.transform = 'scale(0)'
    setTimeout(() => {
      document.querySelector('.before-loading').remove()
    }, 500)
  }
  main.app.restartTimes.current = 0

  main.app.ws.onmessage = function(e) {
    var message = JSON.parse(e.data)
    if (message.type == 'message' && location.pathname.split('/').splice(3, 1)[0] == message.channel[0]) {
      var e = message.data
      var message = CreateMessage(e)
      /*var message = document.createElement('div')
      message.id = e.id
      message.classList.add('message')
      var imgDiv = document.createElement('div')
      var img = document.createElement('img')
      img.setAttribute('src', e.icon)
      imgDiv.appendChild(img)
      var messCont = document.createElement('div')
      messCont.classList.add('mess-cont')
      var aMessage = document.createElement('div')
      aMessage.classList.add('amessage')
      var userMessage = document.createElement('span')
      userMessage.classList.add('user-message')
      userMessage.innerHTML = e.content
      aMessage.appendChild(userMessage)
      var Aut = document.createElement('span')
      Aut.classList.add('aut')
      var date = new Date(e.timestamp)
      if (CheckDate(date)) {
        var newDate = 'Today at '+GetDate(new Date(date).toString().split(' ').splice(4, 1)[0].split(':').splice(0, 2).join(':'))
      } else {
        var newDate = new Date(date).toJSON().split('T')[0].split('-').join('/')
      }
      Aut.innerHTML = `${e.author}<span class="date-m">${newDate}</span>`
      messCont.appendChild(Aut)
      message.insertAdjacentElement('afterbegin', aMessage)
      message.insertAdjacentElement('afterbegin', messCont)
      message.insertAdjacentElement('afterbegin', imgDiv)*/
      if (CheckScrolled(document.querySelector('#message-wrap'))) var scroll = true
      document.querySelector('#message-wrap').insertAdjacentHTML('beforeend', message.outerHTML)
      if (scroll) ScrollBottom(document.querySelector('#message-wrap'))
    }
    if (message.type == 'messagedone') {
      document.querySelector(`.message[id="${message.id.toString()}"]`).classList.remove('loadingsend')
      main.AwaitingMessages.splice(main.AwaitingMessages.indexOf(message.id), 1)
    }
  }
}

function reloadWs() {
  if (arguments[0]) {
    main.app.restartTimes.current++

    if (main.app.restartTimes.current>Object.keys(main.app.restartTimes.timings).length) main.app.restartTimes.current = Object.keys(main.app.restartTimes.timings).length

    flux.log('WebSocket Disconnected: '+main.app.ws.url+'; Trying Again in: '+main.app.restartTimes.timings[main.app.restartTimes.current]+'s')

    if (main.app.restartTimes.current>2) main.app.loScr()

    main.app.restartTimes.active = true
    
    setTimeout(() => {
      main.app.restartTimes.active = false
      main.app.ws = new WebSocket('wss://'+location.hostname+'/app?v=1&uid='+JSON.parse(localStorage['udata']).uid)
      main.app.ws.onclose = function() {reloadWs(true)}
      //main.app.ws.onerror = function() {reloadWs(true)}
      main.app.ws.url = 'wss://'+location.hostname+'/app?v=1&uid='+JSON.parse(localStorage['udata']).uid
      //flux.log('WebSocket Connecting: '+main.app.ws.url)
      main.app.ws.onopen = function() {initWs(true)}
    }, main.app.restartTimes.timings[main.app.restartTimes.current]*1000)
  } else {flux.log('WebSocket Connecting: '+main.app.ws.url)}
}

initWs()
main.app.ws.onclose = function() {reloadWs(true)}
//main.app.ws.onerror = function() {reloadWs(true)}