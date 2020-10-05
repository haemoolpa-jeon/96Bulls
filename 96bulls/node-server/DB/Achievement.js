const mongoose = require('mongoose');

const achievement = new mongoose.Schema({

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