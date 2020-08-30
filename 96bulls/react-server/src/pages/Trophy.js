import React from 'react';
import trophy from '../trophy.jpg'


const Trophy = ({title, description, imageURL}) => {



  return(
    <div className="trophy">
      <img src={trophy} alt="not loaded"></img>
      <div className="trophyContent">
        <h2>{title}</h2>
        <p>"{description}"</p>
      </div>
    </div>
  );

}


export default Trophy;