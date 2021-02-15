const express = require('express')
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcrypt')
const { sessionChecker } = require('../middleware/auth')
const saltRounds = 10

router.get('/', sessionChecker, (req, res) => {
  res.render('registration') 
})

router.post('/', async (req, res) => {
  const { username, email, password } = req.body
  try {
    const newuser = new User({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password
    })
    await newuser.save()
    newuser.password = await bcrypt.hash(password, saltRounds)
    await newuser.save()
    res.json({ status: true })
  } catch (error) {
    res.json(error.message)
  }
})

module.exports = router
