
let doc = document
let oupen = doc.querySelectorAll('.oupen'), cllas = doc.querySelectorAll('.cllas'), oupen1 = doc.querySelectorAll('#oupen'), clous = doc.querySelector('#clous'), navBlock = doc.querySelector('.navBlock'), content = doc.querySelector('.content'), navactiv = doc.querySelector('.navactiv'), navpasiv = doc.querySelector('.navpasiv'), manu = document.querySelector('#manu'), rendertrecks = doc.querySelector('#rendertrecks'), apiLogin = doc.querySelector('#apiLogin'), apiblock = doc.querySelector('#apiblock'), forma = doc.querySelector('#forma'), searchElement = doc.querySelector('#search'), searchClick = doc.querySelectorAll('#searchClick'), searchModal = doc.querySelector('.searchModal'), searchElem = doc.querySelector('#searchElem1'), searchs = doc.querySelector('#searchs')
clous.onclick = () => {
  clous.classList.toggle('span')
  navBlock.classList.toggle('navBlock1')
  content.classList.toggle('content1')

  navactiv.classList.toggle('navactiv1')
  navpasiv.classList.toggle('navpasiv1')
}
manu.onclick = () => {
  clous.classList.toggle('span')
  navBlock.classList.toggle('navBlock1')
  content.classList.toggle('content1')

  navactiv.classList.toggle('navactiv1')
  navpasiv.classList.toggle('navpasiv1')
}

for (let i of searchClick) {
  i.onclick = () => {
    content.style.opacity = '0'
    searchModal.style.opacity = '0'
    setTimeout(() => {
      content.style.display = 'none'
      searchModal.style.display = 'block'
      setTimeout(() => {
        content.style.opacity = '1'
        searchModal.style.opacity = '1'
      })
    })
  }
}
searchElem.onclick = () => {
  searchModal.style.opacity = '0'
  content.style.opacity = '0'
  setTimeout(() => {
    searchModal.style.display = 'none'
    content.style.display = 'block'
    setTimeout(() => {
      searchModal.style.opacity = '1'
      content.style.opacity = '1'
    })
  })
}
window.onresize = () => {
  const width = document.body.clientWidth;
  if (width <= 800) {
    clous.classList.add('span')
    navBlock.classList.add('navBlock1')
    content.classList.add('content1')
    navactiv.classList.add('navactiv1')
    navpasiv.classList.add('navpasiv1')
  }
  let akauntElem = doc.querySelector('#akauntElem')
  if (width <= 640) {

    akauntElem.style.display = 'none'
  } else {
    akauntElem.style.display = 'flex'
  }
}

oupen.forEach((i, item) => {
  i.id = item

  i.onclick = () => {
    let num = i.id
    cllas[num].classList.toggle('cllas1')
    oupen1[num].classList.toggle('span')
  }
});
let myplalist = doc.querySelector('#myplalist'), shows = doc.querySelector('#shows'), html1 = '', trecksHtml = '', yourPlalist = doc.querySelector('#yourPlalist'), liveTrecks = doc.querySelector('#liveTrecks')
function live(btn, name, artist, index, img, url, id) {
  let bool = true
  btn.onclick = (event) => {
    event.preventDefault()
    btn.classList.toggle('aktive')
    btn.dataset.id = 3
    let obj = {
      name: name,
      artist: artist,
      index: index,
      img: img,
      treck: url,
      id: id

    }
    if (bool == true) {
      axios({
        method: "POST",
        url: "http://localhost:3000/live",
        data: obj
      })
      bool = false
    } else {
      axios({
        method: "GET",
        url: "http://localhost:3000/live",
      }).then(res => {
        let ie
        res.data.forEach((i) => {
          if (i.id == btn.dataset.id) {
            ie = i.id
          }
        })
        axios.delete("http://localhost:3000/live/" + `${ie}`)
          .then(res => {

          })
      })
      bool = true
    }
  }
}
let checkets = document.querySelector('#checket'), a = document.querySelector('.a'), b = document.querySelector('.b'), i = true
function clic() {
  checkets.classList.toggle('checket1')
  if (i == true) {
    a.classList.add('c')
    setTimeout(() => {
      b.classList.remove('c')
    }, 500)

    i = false
  } else {
    b.classList.add('c')
    setTimeout(() => {
      a.classList.remove('c')
    }, 500)
    i = true
  }

}
checkets.addEventListener('click', clic)
let formBtn = doc.querySelector('#btnForm')
let objpost = {
  username: '',
  gmail: '',
  password: '',
}
let nameUser = doc.querySelector('#name'), password = doc.querySelector('#password')
let nevuser = doc.querySelector('#nevuser'), gmail = doc.querySelector('#gmail'), nevpassword = doc.querySelector('#nevpassword')
let AppHeader = doc.querySelector('.AppHeader')
let user = doc.querySelector('#username')
formBtn.onclick = (event) => {
  event.preventDefault()

  if (i == true) {
    axios.get('http://localhost:3000/akaunt').then(res => {
      let acArr = res.data
      let m = 0

      acArr.forEach((item) => {
        if (nameUser.value == item.username && password.value == item.password) {
          AppHeader.style.display = 'none'
          user.innerHTML = item.username
        } else {
          m += 1
          if (m == +acArr.length) {
            alert('было неправельно введина информация попробуйте снова')
          }

        }
      })
    })

  } else {
    if (nevuser.value !== '' && gmail.value !== '' && nevpassword.value !== '') {
      objpost.username = nevuser.value
      objpost.gmail = gmail.value
      objpost.password = nevpassword.value
      axios({
        method: "POST",
        url: "http://localhost:3000/akaunt",
        data: objpost
      })
      AppHeader.style.display = 'none'
    } else {
      alert('заполните все поля')
    }


  }
}
let postAck = (event) => {
  event.preventDefault()
}
btnForm.addEventListener('submit', postAck)
let licet = (item, btn) => {
  axios.get("http://localhost:3000/live").then(res => {
    let licedArr = res.data
    for (let i of licedArr) {
      if (i.index == item) {
        btn.classList.add('aktive')
      } else {
        btn.classList.remove('aktive')
      }
    }
  })
}

let func = (img, name, content, container, data1, id, class1) => {
  // let html1 = ''
  html1 += `
  <div class="swiper-slide swiperElem ${class1}" data-id="${data1}" id="${id}">
        <div class="blocImg">
            <img src="${img}" alt="">
            <div class = 'hover'><h1>${name}</h1></div>
        </div>
        <div class="text">
            <h5>${name}</h5>
            <p>${content}</p>
        </div>
  </div>
  `
  container.innerHTML = html1

}
let trecksfunc = (item, img, name, artist, bloc, albom, time, id) => {
  trecksHtml += `
  <div class="element element1 elem" id = "${id}">
    <div class="elemBloc">
        <h6>${item}</h6>
        <img src="${img}" alt="">
        <div class="text">
            <h2>
                ${name}
            </h2>
            <p>
            ${albom}
            </p>
        </div>
    </div>
    <div class="elemBloc">
        <p>Brain Drain</p>
    </div>
    <div class="elemBloc">
        <img src="" alt="">
        <p>${artist}</p>
    </div>
    <div class="elemBloc">
        <p>1.5m</p>
    </div>

</div>
  `
  bloc.innerHTML = trecksHtml

}
let friends = doc.querySelectorAll('#friends'), modal = doc.querySelector('.modal'), clouse = doc.querySelector('#clouse'), imgPlay = doc.querySelector('#imgPlay'), textPlaylıst = doc.querySelector('#textPlaylıst'), oupenModl = doc.querySelector('#oupenModl'), num, num1
,Selement = doc.querySelector('.Selement')
let oupenbloc = (btn2, block1, block2, images, imgPlay, textPlaylıst, name) => {
  block2.style.backgroundImage = `url(${images})`
  block2.classList.add('trec')
  block1.style.opacity = "0"
  imgPlay.src = images
  textPlaylıst.innerHTML = name
  setTimeout(() => {
    block1.style.display = 'none'
    block2.style.opacity = "0"
    block2.style.display = 'block'
    setTimeout(() => {
      block2.style.opacity = "1"
    }, 300)

  }, 300)

  btn2.onclick = () => {
    block2.style.backgroundImage = ``
    block2.style.opacity = "0"
    block2.classList.remove('trec')

    setTimeout(() => {
      block1.style.display = 'block'
      block2.style.display = 'none'
      setTimeout(() => {
        block1.style.opacity = "1"
      }, 300)
    }, 300)
  }
}

window.addEventListener('scroll', () => {
  let h = window.scrollY
  if (h >= 2) {
    oupenModl.classList.add('openBloc')

  } else {
    oupenModl.classList.remove('openBloc')
  }
})
let booling = false
let rundombool = false
//плеер////////////////////////////////////////////////////////////
let play = doc.querySelector('#play'), left = doc.querySelector('#left'), right = doc.querySelector('#right'), repeat = doc.querySelector('#repeat'), rundom = doc.querySelector('#rundom'), autoplay = doc.querySelector('#autoplay'), maxtime = doc.querySelector('#maxtime'), setTime = doc.querySelector('#setTime'), playWidth = doc.querySelector('#playWidth'), playWidthBloc = doc.querySelector('#playWidthBloc'), valu = 0, valu1 = 0
function repeatTrecks1() {
  if (rundombool == true) {
    rundombool = false
    booling = false
  } else {
    rundombool = true
  }
}
rundom.addEventListener('click', repeatTrecks1)

function repeatTrecks() {
  if (booling == true) {
    booling = false
    rundombool = false
  } else {
    booling = true
  }
}
repeat.addEventListener('click', repeatTrecks)

let timeubdayt = (arr) => {
  autoplay.ontimeupdate = (event) => {
    let { duration, currentTime } = event.srcElement

    valu = duration / 60 + ''
    valu = valu.slice(0, 3)
    valu1 = currentTime
    valu1 = valu.slice(0, 3)
    setTime.innerHTML = Math.round(currentTime)
    let sckrol = (currentTime / duration) * 100
    playWidth.style.width = `${sckrol}%`
    maxtime.innerHTML = valu

    let r = playWidthBloc.clientWidth - 5


    if (playWidth.clientWidth >= r) {
      if (booling == true) {
        autoplay.play()

        playWidth.style.width = `0%`

      } else if (rundombool == true) {

        let numRundom = Math.floor(Math.random() * arr.length);
        playFunc(arr[numRundom], arr[numRundom].track.preview_url, arr, arr[numRundom].track.album.images[0].url)
        playWidth.style.width = `0%`
      } else {
        num += 1
        if (num > arr.length) {
          num = 0
        }
        while (arr[num].track.preview_url == null) {
          num -= 1
        }
        playFunc(arr[num], arr[num].track.preview_url, arr, arr[num].track.album.images[0].url)
        playWidth.style.width = `0%`
      }

    }




  }
}

let playTrecks = () => {
  if (play.className == 'play') {
    play.classList.remove('play')
    autoplay.pause()
    play.src = 'img/Play_Stop.svg'
  } else {
    play.classList.add('play')
    autoplay.play()
    play.src = 'img/Subtract.png'
  }
}
function withe(event) {
  let w = this.clientWidth
  let clickW = event.offsetX
  let duration = autoplay.duration
  autoplay.currentTime = (clickW / w) * duration
}
playWidthBloc.addEventListener('click', withe)
play.addEventListener('click', playTrecks)
function playFunc(index, preview_url, arr, img) {
  let trecksImg = doc.querySelector('#trecksImg')

  autoplay.src = preview_url
  play.classList.add('play')
  autoplay.play()
  play.src = 'img/Subtract.png'
  trecksImg.src = img
}
function clicks(btn, arr) {
  let clic = () => {
    if (rundombool == false) {
      num += 1
      if (num > arr.length) {
        num = 0
      }
      while (arr[num].track.preview_url == null) {
        num += 1
      }
      playFunc(arr[num], arr[num].track.preview_url, arr, arr[num].track.album.images[0].url)
      playFunc("index", elem.treck, s, elem.img)
    } else {
      let numRundom = Math.floor(Math.random() * arr.length);
      playFunc(arr[numRundom], arr[numRundom].track.preview_url, arr, arr[numRundom].track.album.images[0].url)
      playFunc("index", elem.treck, s, elem.img)
    }
  }
  btn.addEventListener('click', clic)
}
function clicks1(btn, arr) {
  let clic1 = () => {
    num -= 1

    if (num <= -1) {
      num = arr.length
    }
    while (arr[num].track.preview_url == null) {
      num -= 1
    }
    playFunc(arr[num], arr[num].track.preview_url, arr, arr[num].track.album.images[0].url)
  }
  btn.addEventListener('click', clic1)
}
let click = (btn1, btn2, block1, block2) => {
  btn1.onclick = () => {
    if (btn1.dataset.items == 'liked') {
      block2.classList.remove('modal2')
      block2.classList.remove('modal3')
      block2.classList.add('modal1')
      imgPlay.src = 'img/liked.svg'
      textPlaylıst.innerHTML = 'Liked Songs'
      axios({
        method: "GET",
        url: "http://localhost:3000/live",
      }).then(res => {
        res.data.forEach((i, item) => {
          item = item + 1
          trecksfunc(item, i.img, i.name, i.artist, rendertrecks, '', '', i.index)

        })
        let s = []
        let element1 = doc.querySelectorAll('.element1')
        element1.forEach((item, nums) => {
          item.onclick = () => {
            for (let elem of res.data) {
              s.push(elem)
              if (item.id == elem.index) {
                num = s.indexOf(elem)
                playFunc("index", elem.treck, s, elem.img)
                live(liveTrecks, elem.name, elem.artists, elem.index, elem.img, elem.track, s.key)
                clicks(right, s)
                clicks1(left, s)
                timeubdayt(s)
                licet(elem.index, liveTrecks)
              }

            }


          }

        });

      })


    } else if (btn1.dataset.items == 'recently') {
      block2.classList.add('modal2')
      block2.classList.remove('modal1')
      block2.classList.remove('modal3')
      imgPlay.src = 'img/icon (1).svg'
      textPlaylıst.innerHTML = 'Recently Played'
    } else {
      block2.classList.remove('modal1')
      block2.classList.remove('modal2')
      block2.classList.add('modal3')
      imgPlay.src = 'img/icon (2).svg'
      textPlaylıst.innerHTML = 'Friends Played'

    }
    block1.style.opacity = "0"
    setTimeout(() => {
      block1.style.display = 'none'
      block2.style.opacity = "0"
      block2.style.display = 'block'
      setTimeout(() => {
        block2.style.opacity = "1"

      }, 300)

    }, 300)

  }
  btn2.onclick = () => {
    block2.classList.remove('modal1')
    block2.classList.remove('modal2')
    block2.classList.remove('modal3')
    block2.style.opacity = "0"
    setTimeout(() => {
      block1.style.display = 'block'
      block2.style.display = 'none'
      setTimeout(() => {
        block1.style.opacity = "1"
      }, 300)
    }, 300)
  }
}
for (let i of friends) {
  click(i, clouse, content, modal)
}
trecksHtml = ''
//api function///////////////////////////////////////////
searchs.oninput = function () {
  if (searchs.value != '') {
    let val = this.value
    axios.get('http://localhost:3000/treck').then(res => {
      let searcharr = res.data[0]
      searcharr.forEach(item => {
        if (item.track.name.search(val) != -1) {
          
          func(item.track.album.images[0].url, item.track.name, '', Selement, 'playlists', item.track.id, 'blockSearch')
        }
      });

    })

  }
}

click(friends, clouse, content, modal)
const CLIENT_ID = "7a9f14d9636e4b14b0ca4f37a08d500c"
const REDIRECT_URI = "http://127.0.0.1:5501/"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

let token = window.localStorage.getItem("token") || ''

const getToken = () => {
  let urlParams = new URLSearchParams(window.location.hash.replace("#", "?"));
  token = urlParams.get('access_token');
}
const hash = window.location.hash
getToken()
if (!token && hash) {
  token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
  window.location.hash = ""
  window.localStorage.setItem("token", token)
}
const logout = () => {
  token = ""
  window.localStorage.removeItem("token")
}
const searchArtists = async (e) => {
  //////треки 

  let trecks = []
  await axios.get("https://api.spotify.com/v1/playlists/37i9dQZF1E38Pwkm95CWTR/tracks", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    let dayArr = res.data.items
    dayArr.forEach(i => {
      if (i.track.preview_url !== null) {
        trecks.push(i)
        func(i.track.album.images[0].url, i.track.name, '', myplalist, 'playlists', i.track.id, 'block1')
      }
    });

    let block1 = doc.querySelectorAll('.block1')
    for (let i of block1) {
      function playClick() {
        dayArr.forEach((item, id) => {
          item.key = id
          if (i.id == item.track.id) {
            num = dayArr.indexOf(item)
            playFunc(item, item.track.preview_url, dayArr, item.track.album.images[0].url)
            live(liveTrecks, item.track.name, item.track.artists[0].name, item.track.id, item.track.album.images[0].url, item.track.preview_url, dayArr.key)
            clicks(right, dayArr)
            clicks1(left, dayArr)
            timeubdayt(dayArr)
            licet(item.track.id, liveTrecks)
          }
        });
      }
      i.addEventListener('click', playClick)
    }
  })
  html1 = ''

  //рандомные  плэйлисты ////////////////////////////////////////////
  await axios.get("https://api.spotify.com/v1/browse/featured-playlists", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      let PlalistArr1 = res.data.playlists.items
      for (let i of PlalistArr1) {
        func(i.images[0].url, i.name, '', shows, 'playlists', i.id, 'block2')
      }
      let btn2 = doc.querySelectorAll('.block2')
      btn2.forEach(async (i) => {
        function oupenModl1() {
          PlalistArr1.forEach(async item => {
            if (i.id == item.id) {
              oupenbloc(clouse, content, modal, item.images[0].url, imgPlay, textPlaylıst, item.name)
              await axios.get(`${item.tracks.href}`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }).then(res => {
                res.data.items.forEach((int, int1) => {
                  int1 += 1
                  if (int.track.preview_url !== null) {

                    trecksfunc(int1, int.track.album.images[0].url, int.track.name, int.track.artists[0].name, rendertrecks, int.track.album.name, '', int.track.id)
                    let element1 = doc.querySelectorAll('.element1')
                    element1.forEach(plays => {
                      function audioplay1() {
                        let s = []
                        for (let index of res.data.items) {
                          s.push(index)
                          if (plays.id == index.track.id) {
                            num = s.indexOf(index)
                            playFunc(index, index.track.preview_url, s, index.track.album.images[0].url)
                            live(liveTrecks, index.track.name, index.track.artists[0].name, index.track.id, index.track.album.images[0].url, index.track.preview_url, s.key)
                            clicks(right, s)
                            clicks1(left, s)
                            timeubdayt(s)
                            licet(index.track.id, liveTrecks)
                          }
                        }
                      }
                      plays.addEventListener('click', audioplay1)
                    });
                  }
                });
                trecksHtml = ''
              })
            }
          });
        }
        i.addEventListener('click', oupenModl1)
      });
    })
  html1 = ''
  trecksHtml = ''
  //мои плэйлисты //////////////////////////////////
  let myPlalistArr = []
  await axios.get("	https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    myPlalistArr = res.data.items
    for (let i of res.data.items) {
      func(i.images[0].url, i.name, '', yourPlalist, 'playlists', i.id, 'block3')
    }
    let btn1 = doc.querySelectorAll('.block3')
    btn1.forEach(i => {
      function oupenTrecks() {
        myPlalistArr.forEach(async (it) => {
          if (it.id == i.id) {
            oupenbloc(clouse, content, modal, it.images[0].url, imgPlay, textPlaylıst, it.name)
            await axios.get(`${it.href}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }).then(res => {
              let arr1 = res.data.tracks.items
              arr1.forEach((int, int1) => {
                int.kay = int1
                int1 += 1
                if (int.track.preview_url !== null) {
                  trecksfunc(int1, int.track.album.images[0].url, int.track.name, int.track.artists[0].name, rendertrecks, int.track.album.name, '', int.track.id)
                  let element = doc.querySelectorAll('.element')
                  element.forEach(plays => {
                    function audioplay() {
                      let s = []
                      for (let index1 of res.data.tracks.items) {
                        s.push(index1)
                        if (plays.id == index1.track.id) {
                          num = s.indexOf(index1)
                          playFunc(index1, index1.track.preview_url, s, index1.track.album.images[0].url)
                          clicks(right, s)
                          live(liveTrecks, index1.track.name, index1.track.artists[0].name, index1.track.id, index1.track.album.images[0].url, index1.track.preview_url, s.key)
                          licet(index1.track.id, liveTrecks)
                          clicks1(left, s)
                          timeubdayt(s)
                        }
                      }
                    }
                    plays.addEventListener('click', audioplay)
                  });
                }
              });
              trecksHtml = ''
            })
          }
        })
      }
      i.addEventListener('click', oupenTrecks)
    });
  })
  html1 = ''
  trecksHtml = ''
  ///////////////////////////////////////////////////////////////////////////////
  //артисты//////////////////////////////////////////////
  let d = []
  await axios.get("https://api.spotify.com/v1/artists/2kCcBybjl3SAtIcwdWpUe3", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    d.push(res.data)
  })
  if (d !== null) {
    apiblock.style.display = 'none'
    forma.style.display = 'block'
  }
}



searchArtists()
document.querySelector(`.ancer`).href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`



