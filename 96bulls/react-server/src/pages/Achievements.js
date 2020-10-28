import React, { useEffect, useState } from 'react';
import Trophy from './Trophy'
import { useHistory } from 'react-router-dom'
import './style/achievements.css';

const Achievement = (props) => {

  const [trophies, updateTrophies] = useState([]);
  const history = useHistory();

  useEffect(() => {

    console.log("fetching data")
    fetch('/profile/achievements/Jesse Klein')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        updateTrophies(data);
      });
  
  }, []);

  return(
    <div>
      <div className='back-button' onClick={() => {history.push('/profile')}}>⟵   Back</div>
      <div id='Achievements'>

        {
          trophies.length > 0
          ?
              trophies.map((trophy, index) => (
                <Trophy key={index} title={trophy.name} description={trophy.description} imageURL={trophy.imageURL} />
              ))
          :
            <h1>Complete quizzes and participate to earn achievements</h1>
        }

      </div>
    </div>
    
  );

}


export default Achievement;