const mongoose = require('mongoose');

const quiz = new mongoose.Schema({

  quizName: {
    type:String
  },
  quizCourse: {
    type:String
  }

})

module.exports = Quiz = mongoose.model('quiz', quiz);