import React, { useState, useRef } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css'


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

  const submitQuiz = () => {

    addQuestion();

    console.log("Submitting quiz");

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({quiz: quizData, questions: questionData})
    };
    
    fetch('/quiz/create-quiz', requestOptions)
      .catch(err => console.log(err))


  }

  const resetInputs = () => {
    
    question.current.value = "";
    answer.current.value = "";
    incorrect1.current.value = "";
    incorrect2.current.value = "";
    incorrect3.current.value = "";
  }

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

  const advanceToQuestions = () => {
    setQuizData({title: title.current.value, course: course.current.value});
    setTitleDone(true);
  }

  return (
      <>
    {
      titleDone
      ?
      <div>
        <div id='form-part-1'>
          <label>Question 1:</label><br />
          <input ref={question} type="text" id="q1_name" name="q1_name" /><br />
          <label>Correct answer:</label><br />
          <input ref={answer} type="text" id="q1_correct" name="q1_correct" /><br /><br />
          <label>Incorrect choice 1:</label><br />
          <input ref={incorrect1} type="text" id="q1_incorrect_1" name="q1_incorrect_1" /><br /><br />
          <label>Incorrect choice 2:</label><br />
          <input ref={incorrect2} type="text" id="q1_incorrect_2" name="q1_incorrect_2" /><br /><br />
          <label>Incorrect choice 3:</label><br />
          <input ref={incorrect3} type="text" id="q1_incorrect_3" name="q1_incorrect_3" /><br /><br />
        </div>
        <button onClick={submitQuiz}> Submit Quiz </button>
        <button onClick={addQuestion}> Add Another Question</button>
      </div>
      :
      <div id='form-part-0'>
        <label>Quiz Name:</label><br />
        <input ref={title} type="text" id="quiz_name" /><br />
        <label>Course Name:</label><br />
        <input ref={course} type="text" id="numberqs" /><br /><br />
        <button onClick={advanceToQuestions}> Create Questions </button>
      </div>
    }
      </>

  );
}

export default CreateQuiz;
