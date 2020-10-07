import React from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css'


const CreateQuiz = (props) => {

  const history = useHistory();

  const relocateToLeaderboard = () => {
    console.log('relocating to leaderboard');
    history.push('/leaderboard');
  }

  return (
    <div>
      <div className='back-button' onClick={() => { history.goBack() }}>⟵   Home</div>
      <div className="home-page">
        <div className="home-card">
          FORM WILL GO HERE
        </div>
      </div>
    </div>
  );

}

export default CreateQuiz;

//Test file
