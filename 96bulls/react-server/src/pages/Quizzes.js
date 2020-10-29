import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from "react-router-dom"
import './style/quizzes.css'
import firebase from '../config/firebase';

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

  const goHome = () => {
    history.push('/home');
  }
  
  const goBack = () => {
    history.push('/class');
  }
  
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log('Logout'));
  };

  return (
    <>
      <div className='back-button' onClick={goBack} style={{ display: 'inline-block' }}>⟵   Back</div>
      <div className='back-button' onClick={goHome} style={{ display: 'inline-block' }}>Home</div>
      <div className='back-button' style={{ display: 'inline-block' }} onClick={handleLogout}>Logout</div>
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