const mongoose = require('mongoose');

const achievement = new mongoose.Schema({
  questions: {
    type:Number
  },
  level: {
    type:Number
  },
  name: {
    type:String
  },
  description: {
    type:String
  },
  imageURL: {
    type:String
  }

})

module.exports = User = mongoose.model('achievement', achievement);