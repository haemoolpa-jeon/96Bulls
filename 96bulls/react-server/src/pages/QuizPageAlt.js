import React, { useState, useRef } from 'react';


const QuizPage = ({match}) => {

  const [quiz, setQuiz] = useState();
  const [questions, setQuestions] = useState();
  const [loaded, setLoaded] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [correct, updateCorrect] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

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

  return (
    <div>
      {
        loaded
        ?
          <>
            {
              quizComplete
              ?
                <div>
                  <h1>Quiz Complete</h1>
                  <h2>You got {correct} out of {questions.length} correct.</h2>
                </div>
              :
                <>
                  <h1>{quiz.quizName}</h1>
                  <h2>{quiz.quizCourse}</h2>
                  <h3 ref={question}>{questions[questionNumber].question}</h3>
                  <input ref={answer1} type="radio" onClick={nextQuestion}></input>
                  <label>{questions[questionNumber].correct}</label><br />
                  <input ref={answer2} type="radio" onClick={nextQuestion}></input>
                  <label>{questions[questionNumber].option1}</label><br />
                  <input ref={answer3} type="radio" onClick={nextQuestion}></input>
                  <label>{questions[questionNumber].option2}</label><br />
                  <input ref={answer4} type="radio" onClick={nextQuestion}></input>
                  <label>{questions[questionNumber].option3}</label>
                </>

              }
          </>
        :
          <h1>Loading</h1>
      }
    </div>
  )
}

export default QuizPage;
