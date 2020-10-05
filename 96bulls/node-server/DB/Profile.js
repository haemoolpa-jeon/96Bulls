const mongoose = require('mongoose');

const profile = new mongoose.Schema({

  name: {
    type:String
  },
  level: {
    type:Number
  },
  xp: {
    type:Number
  },
  questionsAnswered: {
    type:Number
  },
  degree: {
    type:String
  },
  avatarURL: {
    type:String
  }

})

module.exports = User = mongoose.model('profile', profile);