const mongoose = require('mongoose');

const question = new mongoose.Schema({

  quizID: {
    type:Number
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
  option4: {
    type:String
  },
  correct: {
    type:Number
  }

})

module.exports = Question = mongoose.model('question', question);