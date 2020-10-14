import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from "react-router-dom"
import '../style/quizzes.css'

const Quizzes = () => {

  const [loaded, setLoaded] = useState(false);
  const [quizzes, setQuizzes] = useState();

  useEffect(() => {
    console.log("fetching data")
    fetch('/quiz/all')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setQuizzes(data);
        setLoaded(true);
      });
  }, []);

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  }

  return (
    <>
      <div className='back-button' onClick={goBack}>⟵   Back</div>
      {
        loaded
        ?
          <div id="quizzes">
            <h1 id="title">Quizzes</h1>
            {
              quizzes.map((quiz, index) => (
                <div className="quiz" key={index}>
                  <h1>{quiz.quizCourse}</h1>
                  <h2>{quiz.quizName}</h2>
                  <p>{quiz.numQuestions} Questions</p>
                  <NavLink className="nav-link" to={`/Quiz/${quiz.quizName}`}>Take Quiz</NavLink>
                </div>
              ))
            }
          </div>
        :
          <div>
            Loading
          </div>
      }
    </>
  )
}

export default Quizzes;