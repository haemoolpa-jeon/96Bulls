import React, { useEffect, useState } from 'react';
import BoardEntry from './BoardEntry'
import { useHistory } from "react-router-dom"
import './style/leaderboard.css';
import firebase from '../config/firebase';

/**
 * Get all of the user information from the database and presents it
 * as a leaderboard. Higher levels and xp are higher on the leaderboard
 */
const Leaderboard = () => {

  const history = useHistory();
  const [profiles, updateProfiles] = useState([]); 

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

  //Loops through user profiles and renders them
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

  //Gets all the user information from the database
  useEffect(() => {
    fetch('/profile/all')
      .then(response => response.json())
      .then(data => {
        updateProfiles(data);
      });
  
  }, []);

  return(
      <>
        <div className='back-button' onClick={goBack} style={{ display: 'inline-block' }}>⟵   Back</div>
        <div className='back-button' onClick={goHome} style={{ display: 'inline-block' }}>Home</div>
        <div className='back-button' style={{ display: 'inline-block' }} onClick={handleLogout}>Logout</div>
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