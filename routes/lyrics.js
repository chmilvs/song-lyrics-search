const express = require('express')
const User = require('../models/User')
const nodeFetch = require('node-fetch')
const Lyric = require('../models/Lyric')
const router = express.Router()

router.get("/", async (req, res) => {
  if (req.session.user) {
    res.render("lyrics");
  } else {
    res.redirect("/login");
  }
});

router.post('/songs', async (req, res) => {
  const { title, artist } = req.body
  const resp1 = await nodeFetch(`https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?apikey=81bf01f3a9e93f1605a7287893881222&q_track=${title}&q_artist=${artist}`)
  const json1 = await resp1.json()
  
  const resp2 = await nodeFetch(`https://api.musixmatch.com/ws/1.1/track.search?apikey=81bf01f3a9e93f1605a7287893881222&q_track=${title}&q_artist=${artist}&s_track_rating=desc`)
  const json2 = await resp2.json()
  res.json({ json1, json2 });
})

router.post('/favosongs', async (req, res) => {
  const user = await User.findById(req.session.user._id)
  const savelyric = new Lyric({
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album,
    text: req.body.text,
  }) 
  await savelyric.save()
  user.favorites.push(savelyric)
  await user.save()
  res.json({ status: true })
})

router.get("/logout", async (req, res) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie("authentication");
      res.redirect("/");
    } catch (error) {}
  }
});

module.exports = router
