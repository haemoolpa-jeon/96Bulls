import React, { useState, useRef } from 'react';
import { useHistory, NavLink } from "react-router-dom"
import '../style/quizquestion.css';

const QuizPage = ({match}) => {

  const [quiz, setQuiz] = useState();
  const [questions, setQuestions] = useState();
  const [loaded, setLoaded] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [correct, updateCorrect] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const history = useHistory();

  useState(() => {

    //Here we need to get the quiz info

    console.log("fetching data")
    fetch(`/quiz/get-quiz/${match.params.id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setQuiz(data.quiz);
        setQuestions(data.questions);
        setLoaded(true);
      });
  }, []);


  const question = useRef();
  const answer1 = useRef();
  const answer2 = useRef();
  const answer3 = useRef();
  const answer4 = useRef();

  const submitQuizResult = () => {
    console.log(correct);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'User2',
        xpGained: correct * 100,
        questionsAnswered: correct,
      })
    };

    console.log(requestOptions);
    fetch('/profile/xp', requestOptions).catch(err => console.log(err));
  }

  const resetRadioButtons = () => {
    answer1.current.checked = false;
    answer2.current.checked = false;
    answer3.current.checked = false;
    answer4.current.checked = false;
  }

  const nextQuestion = (e) => {
    const answer = e.target.nextSibling.innerText;
    if (answer === questions[questionNumber].correct) {
      updateCorrect(correct + 1);
    }
    if (questionNumber === (questions.length - 1)) {
      //Have reached the end of the quiz
      setQuizComplete(true);
      submitQuizResult();
      return;
    }
    setQuestionNumber((old) => old + 1);
    resetRadioButtons();
  }

  const goBack = () => {
    history.goBack();
  }

  return (
    <>
      <div className='back-button' onClick={goBack}>⟵   Back</div>
      <div id='question-page'>
        {
          loaded
          ?
            <>
              {
                quizComplete
                ?
                  <div id="quiz-complete">
                    <h1 id="title">Quiz Complete</h1>
                    <h3 id="correct-answers">You got {correct} out of {questions.length} correct.</h3>
                    <h3 id='xp'>{correct * 100}XP Gained</h3>
                    <NavLink className='button' to='/'>Home</NavLink>
                    
                  </div>
                :
                  <>
                    <h1 id="title">{quiz.quizName}</h1>
                    <p id="course">{quiz.quizCourse}</p>
                    <h3 ref={question}>Question: {questions[questionNumber].question}</h3>


                    <label className="question-label">{'a)'}</label>
                    <input className="question-input" ref={answer1} type="radio" onClick={nextQuestion}></input>
                    <label className="question-label">{questions[questionNumber].correct}</label><br />


                    <label className="question-label">{'b)'}</label>
                    <input className="question-input" ref={answer2} type="radio" onClick={nextQuestion}></input>
                    <label className="question-label">{questions[questionNumber].option1}</label><br />
                    
                    <label className="question-label">{'c)'}</label>
                    <input className="question-input" ref={answer3} type="radio" onClick={nextQuestion}></input>
                    <label className="question-label">{questions[questionNumber].option2}</label><br />
                    
                    <label className="question-label">{'d)'}</label>
                    <input className="question-input" ref={answer4} type="radio" onClick={nextQuestion}></input>
                    <label className="question-label">{questions[questionNumber].option3}</label>

                  </>

                }
            </>
          :
            <h1>Loading</h1>
        }
      </div>
    </>
  )
}

export default QuizPage;
