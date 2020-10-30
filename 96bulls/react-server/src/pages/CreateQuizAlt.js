import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom'
import '../App.css';
import './style/create-quiz.css';
import firebase from '../config/firebase';


//Components to handle instructors creating quizzes
const CreateQuiz = () => {

  const [titleDone, setTitleDone] = useState(false);
  const [quizData, setQuizData] = useState();
  const [questionData, setQuestionData] = useState([]);

  const title = useRef();
  const course = useRef();
  const question = useRef();
  const answer = useRef();
  const incorrect1 = useRef();
  const incorrect2 = useRef();
  const incorrect3 = useRef();

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

  //Add the quiz to the database
  const submitQuiz = () => {

    addQuestion();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({quiz: quizData, questions: questionData})
    };
    
    fetch('/quiz/create-quiz', requestOptions)
      .catch(err => console.log(err))

    history.push('/class');

  }

  //Reset the inputs after submitting a questions
  const resetInputs = () => {
    question.current.value = "";
    answer.current.value = "";
    incorrect1.current.value = "";
    incorrect2.current.value = "";
    incorrect3.current.value = "";
  }

  //Add a question to state
  const addQuestion = () => {

    const questionInfo = question.current.value;
    const answerInfo = answer.current.value;
    const incorrect1Info = incorrect1.current.value;
    const incorrect2Info = incorrect2.current.value;
    const incorrect3Info = incorrect3.current.value;

    const quizQuestion = {questionInfo, answerInfo, incorrect1Info, incorrect2Info, incorrect3Info};
    setQuestionData((oldData) => ([...oldData, quizQuestion]));

    resetInputs();

  }

  //After name and course of quiz has been set, allow them to start creating questions
  const advanceToQuestions = () => {
    setQuizData({title: title.current.value, course: course.current.value});
    setTitleDone(true);
  }

  return (
    <>
    <div className='back-button' onClick={goBack} style={{ display: 'inline-block' }}>⟵   Back</div>
                <div className='back-button' onClick={goHome} style={{ display: 'inline-block' }}>Home</div>
                <div className='back-button' style={{ display: 'inline-block' }} onClick={handleLogout}>Logout</div>
    <div id='create-quiz'>
      <h1 id="title">Create Quiz</h1>
    {
      titleDone
      ?
      <>
        <div id='form-part-1'>
          <label className='field-label'>{`Question ${questionData.length + 1}:`}</label><br />
          <input ref={question} type="text" id="q1_name" name="q1_name" /><br />
          <label className='field-label'>Correct answer:</label><br />
          <input ref={answer} type="text" id="q1_correct" name="q1_correct" /><br /><br />
          <label className='field-label'>Incorrect choice 1:</label><br />
          <input ref={incorrect1} type="text" id="q1_incorrect_1" name="q1_incorrect_1" /><br /><br />
          <label className='field-label'>Incorrect choice 2:</label><br />
          <input ref={incorrect2} type="text" id="q1_incorrect_2" name="q1_incorrect_2" /><br /><br />
          <label className='field-label'>Incorrect choice 3:</label><br />
          <input ref={incorrect3} type="text" id="q1_incorrect_3" name="q1_incorrect_3" /><br /><br />
        </div>
        <button className='quiz-button' onClick={addQuestion}> Add Question</button>
        <button className='quiz-button' onClick={submitQuiz}> Submit Quiz </button>
      </>
      :
      <>
        <label className='field-label'>Quiz Name:</label><br />
        <input ref={title} type="text" id="quiz_name" /><br />
        <label className='field-label'>Course Name:</label><br />
        <input ref={course} type="text" id="numberqs" /><br /><br />
        <button className='quiz-button' onClick={advanceToQuestions}> Create Questions </button>
      </>
    }
    </div>
    </>
  );
}

export default CreateQuiz;
