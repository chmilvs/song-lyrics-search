const express = require('express')
const User = require('../models/User')
const Lyric = require('../models/Lyric')
const router = express.Router()

router.get('/', async (req, res) => {
  const user = await User.findById(req.session.user._id).populate('favorites')
  if(req.session.user) {
    res.render('dashboard', { lyrics: user.favorites })
  }
}) 
router.get('/lyrics/:id', async(req, res) => {
  const user = await User.findById(req.session.user._id).populate('favorites')
  const newUserLyr = user.favorites.filter(el => JSON.stringify(el._id) !== JSON.stringify(req.params.id))
  user.favorites = newUserLyr
  await user.save()
  res.json({ status: true })
})

module.exports = router
