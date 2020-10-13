const mongoose = require('mongoose');

const question = new mongoose.Schema({

  quizID: {
    type:String
  },
  question: {
    type:String
  },
  option1: {
    type:String
  },
  option2: {
    type:String
  },
  option3: {
    type:String
  },
  correct: {
    type:String
  }

})

module.exports = Question = mongoose.model('question', question);