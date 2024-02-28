// assets/login.js 
// Copyright 2022 Tenoqu  Inc.
// Front-end by GreenWorld#0001 
// Back-end by EnderKingJ#0001 
// This website and it's function is completely closed source. Please do not attempt to release it's source.
const discord = {
  load: {
    sessionCode: 0,
    initiate: (ws) => {
      ws.messages = 0
      ws.onopen = function() {
        ws.send('initiate')
      }
      ws.onmessage = function(e) {
        ws.messages++
        if (ws.messages == 2) {
          discord.login(JSON.parse(e.data.toString()))
        }
      }
    },
    generate: () => {
      return Math.floor(Math.random() * (99999 - 10000) + 10000)
    },
    init: (token) => {
      localStorage['token'] = token
      location.href = '/channels/'
    },
    error: (r) => {
      if (r.message == 'rform') {
        if (r.e.indexOf('username') > -1) {
          document.getElementById('user').style.borderColor = "rgb(237, 66, 69)"
        }
        if (r.e.indexOf('password') > -1) {
          document.getElementById('pass').style.borderColor = "rgb(237, 66, 69)"
        }
      }
    }
  },
  login: (i) => {
    /*var loginContainer = document.createElement('div')
    loginContainer.classList.add('login-container')
    var loginForm = document.createElement('form')
    loginForm.classList.add('login-form')
    var inputCont = document.createElement('form')
    inputCont.classList.add('inputs-container')
    var codeCont = document.createElement('div')
    codeCont.classList.add('code-container')
    var showCode = document.createElement('div')
    showCode.classList.add('show-code')
    var codeInfo = document.createElement('span')
    codeInfo.classList.add('code-info')
    codeInfo.innerHTML = ""
    inputCont.innerHTML = ``
    codeCont.appendChild(codeInfo)
    codeCont.appendChild(showCode)
    loginForm.appendChild(inputCont)
    loginForm.appendChild(codeCont)
    loginContainer.style.background = ''
    loginContainer.appendChild(loginForm)
    document.getElementById('app').appendChild(loginContainer)*/
    document.querySelector('.acceptContainer form').addEventListener('submit', (e) => {
      e.preventDefault();
      var http = new XMLHttpRequest()
      http.open('POST', '/join')
      http.send(JSON.stringify({
        email: document.querySelectorAll('#user-input')[0].value,
        password: document.querySelectorAll('#pass-input')[0].value,
        invite: document.querySelectorAll('#code-input')[0].value,
        username: document.querySelectorAll('#name-input')[0].value,
        captcha: true,
        session: discord.load.sessionCode,
      }))
      http.onreadystatechange = function() {
        //document.getElementById('pass').style.borderColor = "rgb(0, 0, 0, 0.3)"
        //document.getElementById('user').style.borderColor = "rgb(0, 0, 0, 0.3)"
        if (http.status == 200 && http.readyState == 4) {
          discord.load.init(JSON.parse(http.responseText).crypt)
        }
        else if (http.status !== 200 && http.readyState == 4) {
          //discord.load.error(JSON.parse(http.responseText))
        }
      }
    })
    /*
    window.lCont = loginContainer

    var QRSocket = new WebSocket('wss://' + location.host + '/qrsocket?v=1')
    QRSocket.onopen = function() {
      QRSocket.send(JSON.stringify(i))
    }
    QRSocket.onmessage = function(e) {
      if (JSON.parse(e.data).status) {
        return (() => {
          lCont.innerHTML = ''
          lCont.setAttribute('style', 'background: #36393f;display:flex;align-items:center;justify-content:center;color:white;')
          lCont.insertAdjacentHTML('beforeend', '<div><p style="margin-bottom: 5px;text-align: center;font-size: 23px;">' + JSON.parse(e.data).name + '</p><br><h1 style="text-align: center;margin-top: 0;">Check Your Device<br>Click "Allow" To Sign In</h1><div style="text-align: center;font-size:18px;">Not You? <a style="color:white" href="javascript:location.reload(false);">Return</a></div></div>')
        })()
      }
      if (JSON.parse(e.data).mode) {
        return (() => {
          discord.load.init(JSON.parse(e.data).crypt)
        })()
      }
      document.getElementsByClassName('show-code')[0].innerText = JSON.parse(e.data).key
    }*/
  }
}

discord.load.sessionCode = discord.load.generate()

window.onload = discord.load.initiate(new WebSocket('wss://' + location.host + '/gateway?v=2&socket=' + discord.load.sessionCode))

if (localStorage['token'] && localStorage['token'] !== 'undefined') location.href = 'app'