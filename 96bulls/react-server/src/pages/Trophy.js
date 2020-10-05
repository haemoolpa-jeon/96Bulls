import React from 'react';


const Trophy = ({title, description, imageURL}) => {

  console.log("imageurl", imageURL);

  return(
    <div className="trophy">
      <img src={`/${imageURL}`} alt="not loaded"></img>
      <div className="trophyContent">
        <h2>{title}</h2>
        <p>"{description}"</p>
      </div>
    </div>
  );

}


export default Trophy;