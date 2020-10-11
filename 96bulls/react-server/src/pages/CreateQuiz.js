import React from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css'


class CreateQuiz extends React.Component {
  name = '';

  constructor(props) {
    super(props);
    this.state = { currentSlide: 0 }
  }

  handleChangeName = e => {
    console.log('changing name to :', e.target.value);
    this.name = e.target.value;
    console.log('this.name:', this.name);
  }


  submitQuiz = () => {
    //add quiz to db
  }

  renderFormPart2 = (numberqs) => {
    let i = 1;
    let html = '';
    while (i < numberqs + 1) {
      let header = `Question ${i}`;
      let question = `<label for="question${i}" onChange={this.handleChangeName}>:</label><br />`
    }
  }

  //moves through the different parts of the form 
  formNextSlide = () => {
    if (this.state.currentSlide === 3) {
      // relocate to class page
      window.location.replace('/home');
    } else {
      document.getElementById(`form-part-${this.state.currentSlide}`).style.display = 'none';
      document.getElementById(`form-part-${this.state.currentSlide + 1}`).style.display = 'block';
      this.setState({ currentSlide: this.state.currentSlide + 1 });
    }
  }

  render() {
    return (
      <div>
        <div className='back-button'><a href='/profile'>⟵   Back</a></div>
        <div className="home-page">
          <div className="home-card">
            <form id='create-quiz-form' onSubmit={this.submitQuiz}>
              {/* <input type="text" onChange={this.handleChangeName} value={this.name} required /> */}
              <div id='form-part-0'>
                <label for="quiz_name">Quiz name:</label><br />
                <input type="text" id="quiz_name" name="quiz_name" onChange={this.handleChangeName} /><br />
                <label for="numberqs">Number of questions:</label><br />
                <input type="text" id="numberqs" name="numberqs" /><br /><br />
              </div>
              <div id='form-part-1' style={{ display: 'none' }}>
                <label for="q1_name">Question 1:</label><br />
                <input type="text" id="q1_name" name="q1_name" /><br />
                <label for="q1_correct">Correct answer:</label><br />
                <input type="text" id="q1_correct" name="q1_correct" /><br /><br />
                <label for="q1_incorrect_1">Incorrect choice 1:</label><br />
                <input type="text" id="q1_incorrect_1" name="q1_incorrect_1" /><br /><br />
                <label for="q1_incorrect_2">Incorrect choice 2:</label><br />
                <input type="text" id="q1_incorrect_2" name="q1_incorrect_2" /><br /><br />
                <label for="q1_incorrect_3">Incorrect choice 3:</label><br />
                <input type="text" id="q1_incorrect_3" name="q1_incorrect_3" /><br /><br />
              </div>
              <div id='form-part-2' style={{ display: 'none' }}>
                <label for="q2_name">Question 2:</label><br />
                <input type="text" id="q2_name" name="q2_name" /><br />
                <label for="q2_correct">Correct answer:</label><br />
                <input type="text" id="q2_correct" name="q2_correct" /><br /><br />
                <label for="q2_incorrect_1">Incorrect choice 1:</label><br />
                <input type="text" id="q2_incorrect_1" name="q2_incorrect_1" /><br /><br />
                <label for="q2_incorrect_2">Incorrect choice 2:</label><br />
                <input type="text" id="q2_incorrect_2" name="q2_incorrect_2" /><br /><br />
                <label for="q2_incorrect_3">Incorrect choice 3:</label><br />
                <input type="text" id="q2_incorrect_3" name="q2_incorrect_3" /><br /><br />
              </div>
              <div id='form-part-3' style={{ display: 'none' }}>
                <label for="q3_name">Question 3:</label><br />
                <input type="text" id="q3_name" name="q3_name" /><br />
                <label for="q3_correct">Correct answer:</label><br />
                <input type="text" id="q3_correct" name="q3_correct" /><br /><br />
                <label for="q3_incorrect_1">Incorrect choice 1:</label><br />
                <input type="text" id="q3_incorrect_1" name="q3_incorrect_1" /><br /><br />
                <label for="q3_incorrect_2">Incorrect choice 2:</label><br />
                <input type="text" id="q3_incorrect_2" name="q3_incorrect_2" /><br /><br />
                <label for="q3_incorrect_3">Incorrect choice 3:</label><br />
                <input type="text" id="q3_incorrect_3" name="q3_incorrect_3" /><br /><br />
              </div>
              <div style={{ cursor: 'pointer' }} onClick={this.formNextSlide}>
                {this.state.currentSlide === 3 ?
                  'Finish'
                  :
                  'Next'
                }
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateQuiz;

//Test file
