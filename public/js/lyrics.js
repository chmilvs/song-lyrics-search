const textCont = document.getElementById('text')
const titeCont = document.getElementById('tite')
const artistCont = document.getElementById('artist')
const albumCont = document.getElementById('album')
const genreCont = document.getElementById('genre')

document.forms.searchForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  const {title, artist, action, method} = event.target
  
  const response = await fetch(action, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: title.value, artist: artist.value })
  })
  const json = await response.json()
  const textOfTheTrack = json.json1.message.body.lyrics.lyrics_body
  const extraData = json.json2.message.body.track_list.splice(1,1)[0]

  let titeOfTrack
  if (extraData.track.track_name != undefined) {
    titeOfTrack = '"' + extraData.track.track_name + '"'
  } else {
    titeOfTrack = '"..."'
  }
  let artistOfTheTrack
  if (extraData.track.artist_name) {
    artistOfTheTrack = extraData.track.artist_name
  } else {
    artistOfTheTrack = '"..."'
  }
  let albumOfTheTrack
  if (extraData.track.album_name) {
    albumOfTheTrack = '"' + extraData.track.album_name
  } else {
    albumOfTheTrack = '"..."'
  }
  // if (extraData.track.primary_genres.music_genre_list[0].music_genre.music_genre_name !== undefined) {
  //   const genreOfTheTrack = extraData.track.primary_genres.music_genre_list[0].music_genre.music_genre_name
  //   genreCont.innerText = genreOfTheTrack 
  // }
  // const textsong = json.json1.message.body.lyrics.lyrics_body.slice(0,642)
  titeCont.innerText = titeOfTrack 
  artistCont.innerText = artistOfTheTrack
  albumCont.innerText = albumOfTheTrack 
  textCont.innerText = textOfTheTrack 

  event.target.title.value = ''
  event.target.artist.value = ''

})

document.forms.saveSong.addEventListener('submit', async (event) => {
  event.preventDefault()
  const { action, method } = event.target
  
  const response = await fetch(action, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      title: titeCont.innerText,
      artist: artistCont.innerText,
      album: albumCont.innerText,
      text: textCont.innerText
     })
  })
  const json = await response.json()
  if(json.status) {
    alert('Add this lyric to favorites')
  }
})


