import React, { useState, useRef, useEffect } from 'react';
import { useHistory, NavLink } from "react-router-dom"
import './style/quizquestion.css';
import Trophy from './Trophy';

const QuizPage = ({match}) => {

  const [quiz, setQuiz] = useState();
  const [questions, setQuestions] = useState();
  const [loaded, setLoaded] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [correct, updateCorrect] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [achievements, setAchievements] = useState([]);
  const history = useHistory();

  useEffect(() => {

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

    fetch('/profile/Jesse Klein')
    .then(response => response.json())
    .then(data => {
      setUserInfo(data);
    });


  });


  const question = useRef();
  const answer1 = useRef();
  const answer2 = useRef();
  const answer3 = useRef();
  const answer4 = useRef();

  const resetRadioButtons = () => {
    answer1.current.checked = false;
    answer2.current.checked = false;
    answer3.current.checked = false;
    answer4.current.checked = false;
  }

  const runCSSAnimation = () => {
    const progress = document.getElementById('progress');
    const remaining = document.getElementById('remaining');
    const correctAnswers = parseInt(document.getElementById('correct-answers').classList[0]);
    updateXP(correctAnswers);
    let progressPercent = (userInfo.xp + (correctAnswers * 100)) / 10;
    getAchievements(progressPercent >= 100, userInfo.level + 1, userInfo.questionsAnswered, userInfo.questionsAnswered + questionNumber);
    if (progressPercent >= 100) { //Have leveled up

      const newPercent = progressPercent - 100;
      progressPercent = 100;
      progress.style.width = progressPercent + '%';
      remaining.style.width = (100 - progressPercent) + '%';
      //Update the levels and go another animation
      setTimeout(() => {
        //Need to disable transition and then set again
        document.getElementById('levelUp').innerText = "You've leveled up!";
        progress.style.transitionDuration = '0s';
        remaining.style.transitionDuration = '0s';
        progress.style.width = '0%';
        remaining.style.width = '100%';
        //Update levels and xp remaining
        const levelA = document.getElementById('levelA');
        levelA.innerText = 'Level ' + (parseInt(levelA.innerText.split(' ')[1]) + 1);
        const levelB = document.getElementById('levelB');
        levelB.innerText = 'Level ' + (parseInt(levelB.innerText.split(' ')[1]) + 1);
        const xpRemaining = document.getElementById('xpRemaining');
        xpRemaining.innerText = '1000xp Remaining';
      }, 500);
      setTimeout(() => {
        progress.style.transitionDuration = '1s';
        remaining.style.transitionDuration = '1s';
      }, 600)
      setTimeout(() => {
        progress.style.width = newPercent + '%';
        remaining.style.width = (100 - newPercent) + '%';
        const xpRemaining = document.getElementById('xpRemaining');
        xpRemaining.innerText = ((100 - newPercent) * 10) + 'xp Remaining';
      }, 700);
      return;
    } 
    progress.style.width = progressPercent + '%';
    remaining.style.width = (100 - progressPercent) + '%';
    const xpRemaining = document.getElementById('xpRemaining');
    xpRemaining.innerText = `${(100 - progressPercent) * 10}xp Remaining`;
  }

  const getAchievements = (levelUp, newLevel, oldQuestions, newQuestions) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        levelUp,
        newLevel,
        oldQuestions,
        newQuestions: newQuestions + 1
      })
    };

    fetch('/profile/get-achievements', requestOptions)
    .then(data => data.json())
    .then(data => {
      setAchievements(data)
      console.log(data);
    })
    .catch(err => console.log(err))
  }

  const updateXP = (numCorrect) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'Jesse Klein',
        xpGained: numCorrect * 100,
        questionsAnswered: questionNumber,
      })
    };

    fetch('/profile/xp', requestOptions)
    .catch(err => console.log(err))
  }

  const nextQuestion = (e) => {
    const answer = e.target.nextSibling.innerText;
    if (answer === questions[questionNumber].correct) {
      updateCorrect((old) => old + 1);
    }
    if (questionNumber === (questions.length - 1)) {
      //Have reached the end of the quiz
      setTimeout(setQuizComplete(true), 500);
      setTimeout(runCSSAnimation, 1000);
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
        {
          loaded
          ?
            <>
              {
                quizComplete
                ?
                <>
                  <div id='question-page'>
                    <div id="quiz-complete">
                      <h1 id="title">Quiz Complete</h1>
                      <h3 id="correct-answers" className={`${correct}`}>You got {correct} out of {questions.length} correct.</h3>
                      <h3 id='xp'>{correct * 100}XP Gained</h3>

                      <NavLink className='button' to='/home'>Home</NavLink>
                
                      </div>
                    </div>

                    <div id='achievementsLevelUp'>
                      {
                        (achievements.length === 0)
                        ? <></>
                        :  
                          <>
                          <h1>You earnt an achievement!</h1>
                          {
                          achievements.map((trophy, index) => (
                            <Trophy key={index} title={trophy.name} description={trophy.description} imageURL={trophy.imageURL} />
                          ))
                          }
                          </>
                      }
                    </div>

                    <div id="levelBar">
                      <div id='levelUp'></div>
                      <div id="progressBar">
                          <div id="levels">
                              <h3 id='levelA'>Level {userInfo.level}</h3>
                              <h3 id='levelB'>Level {userInfo.level + 1}</h3>
                          </div>
                          <div id="levelDiv">
                            <div id="progress" style={{width: `${userInfo.xp / 10}%`}}></div>
                            <div id="remaining" style={{width: `${100 - (userInfo.xp / 10)}%`}}></div>
                          </div>
                      </div>
                      <h3 id='xpRemaining'>{1000 - userInfo.xp}xp Remaining</h3>
                    </div>
                  </>
                :
                  <>
                    <div id='question-page'>
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
                    </div>
                  </>

                }
            </>
          :
            <h1>Loading</h1>
        }
    </>
  )
}

export default QuizPage;
