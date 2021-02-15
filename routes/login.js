const express = require('express')
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcrypt')
const { sessionChecker } = require('../middleware/auth')

router.get('/', sessionChecker, (req, res) => {
  res.render('login')
})

router.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  if(user && (await bcrypt.compare(password, user.password))) {
    req.session.user = user
   
    res.json({ status: true })
  } else if (!user || (await bcrypt.compare(password, user.password))) {
    res.json({ message: 'No such user!' })
  } else if (user && !(await bcrypt.compare(password, user.password))) {
    res.json({ message: 'Wrong password!' })  
  }
})

module.exports = router
