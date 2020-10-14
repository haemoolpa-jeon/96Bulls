const e = require('express');
const express = require('express');
const mongoose = require('mongoose');
const Quiz = require('../DB/Quiz');
const Question = require('../DB/Question');
const router = express.Router();


/**
 * Get all quizzes
 */
router.get('/all', async (req, res) => {
  let quizzes = await Quiz.find({});
  let quizFormatted = [];
  for (let i = 0; i < quizzes.length; i++) {
    const questions = await Question.find({quizID: quizzes[i].quizName});
    quizFormatted.push({
      quizName: quizzes[i].quizName,
      quizCourse: quizzes[i].quizCourse,
      numQuestions: questions.length
    });
  }
  res.json(quizFormatted);
})

/**
 * Get a quiz by name
 */
router.get('/get-quiz/:quizName', async (req, res) => {

  const { quizName } = req.params;

  let quiz = await Quiz.findOne({quizName});
  let questions = await Question.find({quizID: quiz.quizName});
  res.json({quiz, questions});

})

/**
 * Make a new quiz
 */
router.post('/create-quiz', async (req, res) => {

  const { quiz, questions } = req.body;

  console.log(quiz);
  console.log(questions);

  let newQuiz = new Quiz({quizName: quiz.title, quizCourse: quiz.course});
  await newQuiz.save();

  for (let i = 0; i < questions.length; i++) {
    let newQuestion = new Question({
      quizID: newQuiz.quizName,
      question: questions[i].questionInfo,
      option1: questions[i].incorrect1Info,
      option2: questions[i].incorrect2Info,
      option3: questions[i].incorrect3Info,
      correct: questions[i].answerInfo
    });
    console.log(newQuestion);
    await newQuestion.save();
  }
  res.sendStatus(200);
})



module.exports = router;
