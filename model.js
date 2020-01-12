const mongoose = require('mongoose');
const moment = require('moment');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    unique: true,
    trim: true
  },
  content: {
    type: String,
    require: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', postSchema);
