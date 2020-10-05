import React, { useEffect, useState } from 'react';
import BoardEntry from './BoardEntry'
import { useHistory } from "react-router-dom"

// const profiles = [
//   {
//       avatarURL: 'man.png',
//       position: 1,
//       name: "Christopher Walken",
//       degree: "Bachelor of copy paste",
//       level: 7,
//       trophyList: ['gold.png', 'ribbon.png', 'medal.png']
//   },
//   {
//       avatarURL: 'businessman.png',
//       position: 2,
//       name: "Kazuko Hallenbeck",
//       degree: "Bachelor of copy paste",
//       level: 5,
//       trophyList: ['gold.png', 'ribbon.png', 'medal.png']
//   },
//   {
//       avatarURL: 'soccer-player.png',
//       position: 3,
//       name: "Leonor Linsey",
//       degree: "Bachelor of copy paste",
//       level: 2,
//       trophyList: ['gold.png', 'ribbon.png', 'medal.png']
//   },
//   {
//       avatarURL: 'girl.png',
//       position: 4,
//       name: "Tracey Vanhorn",
//       degree: "Bachelor of copy paste",
//       level: 3,
//       trophyList: ['gold.png', 'ribbon.png', 'medal.png']
//   }
// ]

const Leaderboard = () => {

  const history = useHistory();
  const [profiles, updateProfiles] = useState([]); 

  const goBack = () => {
    history.goBack();
  }

  const renderProfiles = () => {
    return (
      profiles.map((profile, index) => (
        <BoardEntry 
            key={index}
            position={index} 
            avatarURL={profile.avatarURL} 
            name={profile.name} 
            degree={profile.degree} 
            level={`Level: ${profile.level}`} 
            trophyList={[]}  
        />)
      )
    )
  }

  useEffect(() => {

    console.log("fetching data")
    fetch('/profile/all')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        updateProfiles(data);
      });
  
  }, []);

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