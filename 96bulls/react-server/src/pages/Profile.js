import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from "react-router-dom"
import '../App.css';


const Profile = () => {

    const history = useHistory();
    const [profileInfo, updateInfo] = useState({});

    const goBack = () => {
        history.goBack();
    }

    useEffect(() => {

        console.log("fetching data")
        fetch('/profile/Jesse Klein')
          .then(response => response.json())
          .then(data => {
            console.log(data);
            updateInfo(data);
          });
      
      }, []);

    return (
        <div id='page5'>
            <div className='back-button' onClick={goBack}>⟵   Back</div>
            <div id="profile-main">
                <img src={profileInfo.avatarURL} alt="not loaded"></img>
                <h2>{profileInfo.name}</h2>
                <h3>{profileInfo.degree}</h3>
                <NavLink className="button navButton" to="/editprofile">Edit Avatar</NavLink>
                <NavLink className="button navButton" to="/page8">Achievements</NavLink>
            </div>
            <div id="levelBar">
                <div id="progressBar">
                    <div id="levels">
                        <h3>Level {profileInfo.level}</h3>
                        <h3>Level {profileInfo.level + 1}</h3>
                    </div>
                    <div id="levelDiv">
                        <div id="progress" style={{width: `${profileInfo.xp / 10}%`}}></div>
                        <div id="remaining" style={{width: `${100 - (profileInfo.xp / 10)}%`}}></div>
                    </div>
                </div>
                <h3>{1000 - profileInfo.xp}xp Remaining</h3>
            </div>
        </div>
    );
}

export default Profile;