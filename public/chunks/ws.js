main.app.ws.onmessage = function(e) {
  var message = JSON.parse(e.data)
  if (message.type=='message' && location.pathname.split('/').splice(3, 1)[0]==message.channel[0]) {
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
  if (message.type=='messagedone') {
    document.querySelector(`.message[id="${message.id.toString()}"]`).classList.remove('loadingsend')
  }
}