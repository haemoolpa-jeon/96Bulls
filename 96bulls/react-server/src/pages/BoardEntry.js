import React from 'react';


const BoardEntry = ({position, avatarURL, name, degree, level, trophyList}) => {

  const mapTrophys = () => {
    return (
      trophyList.map((trophy, index) => {
        return(<img key={index} src={trophy} alt="not loaded"></img>);
      })
    )
  }

  return(
    <div className="boardEntry">
      <h1>{position}</h1>
      <div className="boardUser">
        <img src={avatarURL} alt="not loaded"></img>
        <div className="entryInfo">
          <h3>{name}</h3>
          <h3>{degree}</h3>
          <h3>{level}</h3>
          <div className="trophyList">{mapTrophys()}</div>
        </div>
      </div>
    </div>
  );

}


export default BoardEntry;