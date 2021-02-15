const express = require('express')
const { basicConfig } = require('./middleware/index')
const { createLocals } = require('./middleware/auth')
const regRouter = require('./routes/registration')
const logRouter = require('./routes/login')
const lyricsRouter = require('./routes/lyrics')
const dbRouter = require('./routes/dashboard')
const app = express()

basicConfig(app)

app.use(createLocals)

app.use('/', regRouter)
app.use('/login', logRouter)
app.use('/lyrics', lyricsRouter)
app.use('/dashboard', dbRouter)

module.exports = app

