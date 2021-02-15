const User = require('../models/User.js')
const sessionChecker = (req, res, next) => {
  if(req.session.user) {
    res.redirect('/lyrics')
  } else {
    next()
  }
}

const cookieCleaner = (req, res, next) => {
  if(req.cookies.authentication && !req.session.user) {
    res.clearCookie()
  } else {
    next()
  }
}

const createLocals = async (req, res, next) => {
  if(req.session.user) {
    const user = await User.findById(req.session.user._id)
    res.locals.user = user
    next()
  } else {
    next()
  }
}

module.exports = { sessionChecker, cookieCleaner, createLocals }
