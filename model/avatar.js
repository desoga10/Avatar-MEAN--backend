const mongoose = require('mongoose')

const Schema = mongoose.Schema

const avatarSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  cloudinary_id: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Avatar', avatarSchema)