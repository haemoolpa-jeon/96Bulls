import React, { useEffect, useState } from 'react';
import BoardEntry from './BoardEntry'
import { useHistory } from "react-router-dom"
import './style/leaderboard.css';

const Leaderboard = () => {

  const history = useHistory();
  const [profiles, updateProfiles] = useState([]); 

  const goBack = () => {
    history.goBack();
  }

  const renderProfiles = () => {
    return (
      profiles.map((profile, index) => (
        <tr>
          <BoardEntry 
              key={index}
              position={index+1} 
              avatarURL={profile.avatarURL} 
              name={profile.name} 
              degree={profile.degree} 
              level={`Level: ${profile.level}`} 
              xp={`xp: ${profile.xp}`}
              trophyList={profile.trophyList}  
          />
        </tr>
      ))
    )
  }

  useEffect(() => {

    console.log("fetching data")
    fetch('/profile/all')
      .then(response => response.json())
      .then(data => {
        updateProfiles(data);
      });
  
  }, []);

  return(
      <>
        <div className='back-button' onClick={goBack}>⟵   Back</div>
        <table id='leaderboard'>
          <tr>
            <th>Position</th>
            <th>User</th>
          </tr>
          {renderProfiles()}
        </table>
      </>
  );

}


export default Leaderboard;