import React from 'react';
import { useHistory } from 'react-router-dom';

import userTypeStore from '../userTypeStore.js';

/**
 * The homepage for the user
 * Renders different options depending on whether the user is a student or an instructor
 */
const HomePage = (props) => {

  const history = useHistory();

  return (
    <div className="home-page">
      <div className="home-card">
        <div className='flex-center' style={{ backgroundColor: '#BF40FF', width: '100%', height: 60, color: 'white' }}>
          <i>Home</i>
        </div>
        <div className="button" style={{ width: '200px', marginTop: 20 }} onClick={() => { history.push('/profile') }}>
          Profile
              </div>
        <div className="button" style={{ width: '200px' }} onClick={() => { history.push('/class') }}>
          Class
              </div>
        <div className="button" style={{ width: '200px' }} onClick={() => { history.push('/leaderboard') }}>
          Leaderboard
              </div>
        {userTypeStore.currentUserType === 'instructor' ?
          <div className="button" style={{ width: '200px' }} onClick={() => history.push('/CreateQuiz')}>
            Create Quiz
          </div>
          : null}
          <div className="button" style={{ width: '200px', marginTop: 20 }} onClick={() => { history.push('/chat') }}>
          Chat
              </div>
      </div>
    </div>
  )

}

export default HomePage;
