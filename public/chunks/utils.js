// chunks 
// Copyright 2022 Tenoqu  Inc.
// Front-end by GreenWorld#0001 
// Back-end by EnderKingJ#0001 
// This website and it's function is completely closed source. Please do not attempt to release it's source.
function CheckDate(date) {
  return new Date().toString().split(' ').splice(0, 4).join(' ') == date.toString().split(' ').splice(0, 4).join(' ')
}

function GetDate(date) {
  if (date.split(':')[0] > 12) {
    return (date.toString().split(':')[0] - 12).toString() + ':' + date.toString().split(':')[1] + ' PM';
  }
  return date + ' AM'
}

function CheckScrolled(obj) {
  return (obj.scrollTop === (obj.scrollHeight - obj.offsetHeight))
}

function ScrollBottom(el) {
  el.scrollTop = el.scrollHeight
}

main.app.Skeleton = () => {
  document.querySelector('#message-wrap').style.overflow = 'hidden'
  document.querySelector('#message-wrap').innerHTML = '<div class="description">' + [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 3, 3, 4, 5, 6, 5].map(e => {
    return e == 3 ? '<div class="cover skeleton"></div>' : '<div class="line"></div>'
  }).join('') + '</div>'
}

function CheckMessageBefore() {

}

function CreateMessage(e, tfalse) {
  var message = document.createElement('div')
  message.id = e.id
  message.classList.add('message')
  var imgDiv = document.createElement('div')
  var img = document.createElement('img')
  img.setAttribute('src', Icon(e.icon))
  imgDiv.appendChild(img)
  var messCont = document.createElement('div')
  messCont.classList.add('mess-cont')
  var aMessage = document.createElement('div')
  aMessage.classList.add('amessage')
  var userMessage = document.createElement('span')
  userMessage.classList.add('user-message')
  var parser = new DOMParser();
  var content = parser.parseFromString(e.content, 'text/html')
  //if (e.server) {
    content.body.querySelectorAll('*').forEach(node => {
      if ((node.tagName=='A'&&node.classList.contains('messageLink')&&node.href.toString()==node.innerText&&node.getAttribute('target')=='_blank')||(node.tagName=='IMG'&&node.classList.contains('imageMessage')&&node.getAttribute('id'))||node.tagName=='BR') {
        
      } else {
        //console.log(node.outerHTML)
        content.body.innerHTML = content.body.innerHTML.replace(node.outerHTML, node.outerHTML.replace(/<\/([a-zA-Z0-9\-\s]+)/gmi, '<</span>/$1').replace(/<([a-zA-Z0-9\-\s]+)/gmi, '<<span>$1</span>'))
      }
    })
  //}
  userMessage.innerText = content.body.innerHTML
  userMessage.innerHTML = userMessage.innerText//urlify(userMessage.innerText)
  aMessage.appendChild(userMessage)
  var Aut = document.createElement('span')
  Aut.classList.add('aut')
  var date = new Date(e.timestamp)
  if (CheckDate(date)) {
    var newDate = 'Today at ' + GetDate(new Date(date).toString().split(' ').splice(4, 1)[0].split(':').splice(0, 2).join(':'))
  } else {
    var newDate = new Date(date).toJSON().split('T')[0].split('-').join('/')
  }
  Aut.innerHTML = `${e.author}<span class="date-m">${newDate}</span>`
  messCont.appendChild(Aut)
  message.insertAdjacentElement('afterbegin', aMessage)
  message.insertAdjacentElement('afterbegin', messCont)
  message.insertAdjacentElement('afterbegin', imgDiv)
  //if (message.querySelector())
  /*userMessage.querySelectorAll('*').forEach(e => {
    if (!e.classList.contains('messageLink') && e.tagName == 'a') userMessage.innerHTML = userMessage.innerHTML.replace(e.outerHTML, e.innerText)
  })*/
  if (tfalse==true) {
    messCont.innerHTML = ''
    imgDiv.innerHTML = ''
    message.classList.add('condensed')
  }
  return message
}

var Over;

setTimeout(() => {
  Over = document.createElement('div')
  function initDivMouseOver() {
    var div = [...document.querySelectorAll('.users, .guilds, .message-wrapper, .channels')]
    div.forEach(div => {
      div.onmouseover = function() {
        Over = div
      };
      div.onmouseout = function() {
        Over = document.createElement('div')
      }
    })
  }
  document.querySelector('.ii').onfocus = function() {document.querySelector('.ii').focused = true}
  document.querySelector('.ii').onblur = function() {
    document.querySelector('.ii').focused = undefined
  }
  initDivMouseOver()
  document.querySelector('body').addEventListener('keyup', (e) => {
    if (Over.classList.contains('users') || Over.classList.contains('guilds') || Over.classList.contains('message-wrapper') || Over.classList.contains('channels') && document.querySelector('.ii') && document.querySelector('.ii')!==document.activeElement&&(document.querySelector('.ii').focused==undefined||document.querySelector('.ii').focused==false)) {
      if (e.key=='Enter'||e.key=='Shift'||e.key=='Escape'||e.key=='Alt'||e.key=='OS'||e.key=='Control'||e.key=='CapsLock'||e.key=='Backspace') return 
      if (document.querySelector('.ii').focused==false||document.querySelector('.ii').focused==undefined) document.querySelector('.ii').value += e.key
      document.querySelector('.ii').focus()
    }
  })
}, 1000)

window.addEventListener("paste", function(e){
    if (Over.classList.contains('users') || Over.classList.contains('guilds') || Over.classList.contains('message-wrapper') || Over.classList.contains('channels') && document.querySelector('.ii') && document.querySelector('.ii')!==document.activeElement&&(document.querySelector('.ii').focused==undefined||document.querySelector('.ii').focused==false)) {
        // Handle the event
        retrieveImageFromClipboardAsBlob(e, function(imageBlob){
            // If there's an image, display it in the canvas
            if(imageBlob){
                var canvas = document.getElementById("mycanvas");
                var ctx = canvas.getContext('2d');
                
                // Create an image to render the blob on the canvas
                var img = new Image();

                // Once the image loads, render the img on the canvas
                img.onload = function(){
                    // Update dimensions of the canvas with the dimensions of the image
                    canvas.width = this.width;
                    canvas.height = this.height;

                    // Draw the image
                    ctx.drawImage(img, 0, 0);
                };

                // Crossbrowser support for URL
                var URLObj = window.URL || window.webkitURL;

                // Creates a DOMString containing a URL representing the object given in the parameter
                // namely the original Blob
                img.src = URLObj.createObjectURL(imageBlob);
            }
        });
    }
}, false);


if(window.$corrosion) {
  //while(1) alert('fuck you')
}

function retrieveImageFromClipboardAsBlob(pasteEvent, callback){
	if(pasteEvent.clipboardData == false){
        if(typeof(callback) == "function"){
            callback(undefined);
        }
    };

    var items = pasteEvent.clipboardData.items;

    if(items == undefined){
        if(typeof(callback) == "function"){
            callback(undefined);
        }
    };

    for (var i = 0; i < items.length; i++) {
        // Skip content if not image
        if (items[i].type.indexOf("image") == -1) continue;
        // Retrieve image on clipboard as blob
        var blob = items[i].getAsFile();

        if(typeof(callback) == "function"){
            callback(blob);
        }
    }
}

if (!localStorage['serversStored']) localStorage.setItem('serversStored', JSON.stringify({}))