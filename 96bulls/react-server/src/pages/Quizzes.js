import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom"

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

  return (
    <>
      {
        loaded
        ?
          <div>
            {
              quizzes.map((quiz, index) => (
                <div key={index}>
                  <h1>{quiz.quizName}</h1>
                  <h2>{quiz.quizCourse}</h2>
                  <NavLink to={`/Quiz/${quiz.quizName}`}>Take Quiz</NavLink>
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