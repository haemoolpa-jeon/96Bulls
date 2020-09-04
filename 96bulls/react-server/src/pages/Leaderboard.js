import React from 'react';
import BoardEntry from './BoardEntry'
import { NavLink, useHistory } from "react-router-dom"

import avatar from '../avatar.png'
import trophy from '../trophy.jpg'

const profiles = [
  {
      position: 301,
      name: "Christopher Walken",
      degree: "Bachelor of copy paste",
      level: 1,
      trophyList: [trophy, trophy]
  },
  {
      position: 302,
      name: "Christopher Walken",
      degree: "Bachelor of copy paste",
      level: 1,
      trophyList: [trophy, trophy]
  },
  {
      position: 303,
      name: "Christopher Walken",
      degree: "Bachelor of copy paste",
      level: 1,
      trophyList: [trophy, trophy]
  },
  {
      position: 304,
      name: "Christopher Walken",
      degree: "Bachelor of copy paste",
      level: 1,
      trophyList: [trophy, trophy]
  },
  {
      position: 305,
      name: "Christopher Walken",
      degree: "Bachelor of copy paste",
      level: 1,
      trophyList: [trophy, trophy]
  }
]


const Leaderboard = () => {

  const history = useHistory();

    const goBack = () => {
        history.goBack();
    }

  const renderProfiles = () => {
    return (
      profiles.map((profile, index) => (
        <BoardEntry 
            key={index}
            position={profile.position} 
            avatarURL={avatar} 
            name={profile.name} 
            degree={profile.degree} 
            level={profile.level} 
            trophyList={profile.trophyList}  
        />)
      )
    )
  }

  return(
      <React.Fragment>
        <div className='back-button' onClick={goBack}>⟵   Back</div>
        <div id="leaderboard">
          <div id='headings'>
            <h1>Position</h1>
            <h1>User</h1>
          </div>
          {renderProfiles()}
        </div>
      </React.Fragment>
  );

}


export default Leaderboard;