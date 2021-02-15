const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
  username: { type: String, unique: true, required: [true, 'Enter your username'] },
  email: { type: String, unique: true, required: [true, 'Enter your email'] },
  password: { 
    type: String, 
    required: [true, 'Enter a password'],
    minlength: [6, 'Password is too short']
  },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lyric' }]
})

const User = mongoose.model('User', userSchema)

module.exports = User
