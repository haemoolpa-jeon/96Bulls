import React from 'react';

const BoardEntry = ({position, avatarURL, name, degree, level, trophyList, xp}) => {

  const mapTrophys = () => {
    return (
      trophyList.map((trophy, index) => {
        return(<img key={index} src={trophy.imageURL} alt="not loaded"></img>);
      })
    )
  }

  return(
    <>
      <td className='position'>{position}</td>
      <td>
        <div className='boardUser'>
          <img className='boardImg' src={avatarURL} alt="not loaded"></img>
          <div className="entryInfo">
            <h3>{name}</h3>
            <h3>{degree}</h3>
            <h3>{level}</h3>
            <h3>{xp}</h3>
            <div className="trophyList">{mapTrophys()}</div>
          </div>
        </div>
      </td>
    </>
  );

}


export default BoardEntry;