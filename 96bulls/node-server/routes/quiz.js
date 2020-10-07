const e = require('express');
const express = require('express');
const mongoose = require('mongoose');
const Profile = require('../DB/Quiz');
const Achievement = require('../DB/Question');
const Quiz = require('../DB/Quiz');
const Question = require('../DB/Question');
const router = express.Router();


/**
 * Get a quiz by name
 */
router.get('/get-quiz/:name', async (req, res) => {

  const { quizName } = req.params;

  let quiz = await Quiz.findOne({quizName});
  let questions = await Question.find({quizID: quiz._id});
  res.json({quiz, questions});

})

/**
 * Make a new quiz
 */
router.post('/create-quiz', async (req, res) => {

  const { quizName, quizCourse, questions } = req.body;

  let newQuiz = new Quiz({quizID, quizName, quizCourse});
  await newQuiz.save();

  for (let i = 0; i < questions; i++) {
    let newQuestion = new Question({
      quizID: newQuiz._id,
      question: questions[i].question,
      options1: questions[i].option1,
      options2: questions[i].option2,
      options3: questions[i].option3,
      options4: questions[i].option4,
      corrent: questions[i].correct
    });
    await newQuestion.save();
  }
  res.sendStatus(200);
})



module.exports = router;
