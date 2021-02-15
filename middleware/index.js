const basicConfig = function(app) {
  const express = require('express')
  const cookieParser = require('cookie-parser')
  const session = require('express-session')
  const path = require('path')
  const FileStore = require('session-file-store')(session)
  const { bdConnect } = require('./bd-connect.js')
  const { cookieCleaner } = require('./auth')

  bdConnect()
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.static(path.join(__dirname, '..', 'public')))
  app.set('view engine', 'hbs')
  app.set('views', path.join(__dirname, '..', 'views'))
  app.use(cookieParser())
  app.use(
    session({
      store: new FileStore(),
      key: "authentication",
      secret: "kmlsdmsdm#klmKLDFKLMDF$KLMDFkldfm%kldflnk&gJFG",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 60000000,
        httpOnly: true
      }
    })
  )
  app.use(cookieCleaner)
}  

module.exports = { basicConfig }
