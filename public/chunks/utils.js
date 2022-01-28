function CheckDate(date) {
  return new Date().toString().split(' ').splice(0, 4).join(' ')==date.toString().split(' ').splice(0, 4).join(' ')
}

function GetDate(date) {
  if (date.split(':')[0]>12) {
    return (date.toString().split(':')[0]-12).toString()+':'+date.toString().split(':')[1]+' PM';
  }
  return date+' AM'
}

function CheckScrolled(obj) {
  return( obj.scrollTop === (obj.scrollHeight - obj.offsetHeight))
}

function ScrollBottom(el) {
  el.scrollTop = el.scrollHeight
}

main.app.Skeleton = () => {
  document.querySelector('#message-wrap').style.overflow = 'hidden'
  document.querySelector('#message-wrap').innerHTML = '<div class="description">'+[1, 2, 3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,3,3,4,5,6,5].map(e => {
    return e==3?'<div class="cover skeleton"></div>':'<div class="line"></div>'
  }).join('')+'</div>'
}

function CreateMessage(e) {
  var message = document.createElement('div')
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
  message.insertAdjacentElement('afterbegin', imgDiv)
  //if (message.querySelector())
  userMessage.querySelectorAll('*').forEach(e => {
    if (!e.classList.contains('messageLink')&&e.tagName=='a') userMessage.innerHTML = userMessage.innerHTML.replace(e.outerHTML, e.innerText)
  })
  return message
}

if (!localStorage['serversStored']) localStorage.setItem('serversStored', JSON.stringify({}))