// chunks 
// Copyright 2022 Tenoqu  Inc.
// Front-end by GreenWorld#0001 
// Back-end by EnderKingJ#0001 
// This website and it's function is completely closed source. Please do not attempt to release it's source.
main.app.CreateVoiceChannel = function(username) {
  return new Promise(async (e) => {
    if (document.querySelector('voice_wrapper')) document.querySelector('voice_wrapper').remove()
    var a = await main.app.request('channels', location.pathname.split('/').splice(3, 1)[0], [['v', '1']])
    var url = '//' + window.location.hostname + `/wrtc/${a.footprint}?name=${username}`
    var voiceWrapper = document.createElement('iframe')
    voiceWrapper.setAttribute('src', url)
    voiceWrapper.classList.add('voice_wrapper')
    voiceWrapper.style.display = 'none'
    document.body.appendChild(voiceWrapper)
    voiceWrapper.onload = function() {
      voiceWrapper.contentDocument.querySelector('#muteButton').click()
      voiceWrapper.contentDocument.querySelectorAll('*').forEach(e => e.setAttribute('data-vc', 'true'))
      var html = (voiceWrapper.contentDocument.body.innerHTML)
      console.log(html)
      document.querySelector('#message-wrap').innerHTML = html;
      voiceWrapper.remove()
    }
    /*voiceWrapper.appendChild = new Proxy(voiceWrapper.appendChild, {
      apply(t, g, a) {
        Reflect.apply(t, g, a)
        return document.querySelector('#message-wrap').appendChild.apply(g, a)
      }
    })*/
    if (document.querySelector('.failed')) document.querySelector('.failed').remove()
    e(a.footprint)
  })
}

main.app.LoadVoiceChannel = async function() {
  var username = JSON.parse(localStorage['udata']).username
  //if (username!=='EnderKingJ'||username!=='GreenWorldDev') return main.app.FailLoad()
  var id = await main.app.CreateVoiceChannel(username);
  (function(_window, document, window) {
    setTimeout(async () => {
      var otherPeer;
      var thisPeer;
      //var window = _window.document.querySelector('iframe').contentWindow
      const ROOM_ID = id
      const user = username
      //var window = window
      // var document = document
      //var document = _window.document.querySelector('iframe').contentDocument
      const socket = io('remote-rtc.tenoqu.xyz', { transports: ['polling'] });
      const videoGrid = document.getElementById("video-grid");
      const myVideo = document.createElement("video");
      //const showChat = document.querySelector("#showChat");
      //const backBtn = document.querySelector(".header__back");
      myVideo.muted = true;

      /*backBtn.addEventListener("click", () => {
        document.querySelector(".main__left").style.display = "flex";
        document.querySelector(".main__left").style.flex = "1";
        document.querySelector(".main__right").style.display = "none";
        document.querySelector(".header__back").style.display = "none";
      });

      showChat.addEventListener("click", () => {
        document.querySelector(".main__right").style.display = "flex";
        document.querySelector(".main__right").style.flex = "1";
        document.querySelector(".main__left").style.display = "none";
        document.querySelector(".header__back").style.display = "block";
      });*/
      //try{window.user = JSON.parse(parent[0].localStorage['udata']).username}catch{window.user = prompt('')};

      var peer = new Peer(undefined, {
        path: "/peerjs",
        host: "remote-rtc.tenoqu.xyz",
        port: "",
      });

      function endCall() {
        if (otherPeer) {
          //otherPeer.send("end");
        }
        if (thisPeer != null) {
          //thisPeer.send("end");
        }
        if (peer != null) {
          peer.destroy();
        }
      }

      var joinSound = new Audio('/assets/join.mp3')
      var leaveSound = new Audio('/assets/leave.mp3')

      function playJoinSound() {
        joinSound.currentTime = 0
        joinSound.play()
      }

      function playLeaveSound() {
        leaveSound.currentTime = 0
        leaveSound.play()
      }

      let myVideoStream;
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: false,
        })
        .then((stream) => {
          thisPeer = stream
          myVideoStream = stream;
          addVideoStream(myVideo, stream);

          try {
            peer.on("call", (call) => {
              call.answer(stream);
              otherPeer = call;
              call.on("data", (data) => {
                if (data == "end") {
                  call.close();
                  if (peer != null) {
                    peer.destroy();
                  }
                }
              });
              const video = document.createElement("video");
              video.classList.add('epicvideo')
              call.on("stream", (userVideoStream) => {
                addVideoStream(video, userVideoStream);
              });
            });
          } catch {stream.getTracks().forEach(function(track) {
            track.stop();
          });}

          var stream = stream

          socket.on("user-connected", (userId, uid) => {
            playJoinSound()
            connectToNewUser(userId, stream, uid);
          });
        });

      const connectToNewUser = async (userId, stream, uid) => {
        try {
          const call = peer.call(userId, stream);
          thisPeer = peer.connect(userId);
          const video = document.createElement("div");
          video.classList.add('epicvideo')
          video.style.background = await main.app.request('icon', uid, [['v', '1']])
          call.on("stream", (userVideoStream) => {
            addVideoStream(video, userVideoStream);
          });
        } catch {}
      };

      peer.on("open", (id) => {
        socket.emit("join-room", ROOM_ID, id, user, JSON.parse(localStorage['udata']).uid);
      });

      const addVideoStream = (video, stream) => {
        video.srcObject = stream;
        video.classList.add('epicvideo')
        video.addEventListener("loadedmetadata", () => {
          video.play();
          videoGrid.append(video);
        });
      };

      const muteButton = document.querySelector("#muteButton");
      muteButton.addEventListener("click", () => {
        const enabled = myVideoStream.getAudioTracks()[0].enabled;
        if (enabled) {
          myVideoStream.getAudioTracks()[0].enabled = false;
          html = `<i class="fas fa-microphone-slash"></i>`;
          muteButton.classList.toggle("background__red");
          muteButton.innerHTML = html;
        } else {
          myVideoStream.getAudioTracks()[0].enabled = true;
          html = `<i class="fas fa-microphone"></i>`;
          muteButton.classList.toggle("background__red");
          muteButton.innerHTML = html;
        }
      });

      var killButton = document.querySelector('#disconnect')
      killButton.addEventListener('click', () => {
        endCall()
        document.querySelector(`.server-label[data-predir="/channels/${location.pathname.split('/').splice(2, 1)}"]`).click()
      })
    }, 1500)
  })(window, document, window)
}