const mongoose = require('mongoose')

const lyricSchema = new mongoose.Schema ({
  title: String, 
  artist: String,
  album: String,
  text: String,
})

const Lyric = mongoose.model('Lyric', lyricSchema)

module.exports = Lyric
