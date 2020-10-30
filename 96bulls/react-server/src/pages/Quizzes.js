import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from "react-router-dom"
import './style/quizzes.css'
import firebase from '../config/firebase';

//A component to hold the quizzes store in the database
//Users can select a pre class quiz to complete before their class
const Quizzes = () => {

  const [loaded, setLoaded] = useState(false);
  const [quizzes, setQuizzes] = useState();

  //Gets all quizzes from the database and presents them to the user
  useEffect(() => {
    fetch('/quiz/all')
      .then(response => response.json())
      .then(data => {
        setQuizzes(data);
        setLoaded(true);
      });
  }, []);

  const history = useHistory();

  //Redirect to home page
  const goHome = () => {
    history.push('/home');
  }
  
  //Redirect to class page
  const goBack = () => {
    history.push('/class');
  }
  
  //Logout user
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