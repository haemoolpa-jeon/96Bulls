import React from 'react'
import { useHistory } from 'react-router-dom'

const HomePage = (props) => {

  const history = useHistory();

  return (
    <div className="home-page">
            <div className="home-card">
              <div className='flex-center' style={{backgroundColor: '#BF40FF', width: '100%', height: 60, color: 'white'}}>
                  <i>Home</i>
              </div>
              <div className="button" style={{width: '200px'}} onClick={() => {history.push('/profile')}}>
                  Profile
              </div>
              <div className="button"style={{width: '200px'}} onClick={() => {history.push('/home')}}>
                  Class
              </div>
              <div className="button" style={{width: '200px'}} onClick={() => {history.push('/leaderboard')}}>
                  Leaderboard
              </div>
              <div className="button" style={{width: '200px'}} onClick={() => history.push('/quizzes')}>
                View Quizzes
              </div>
            </div>
        </div>
  )

}

export default HomePage;