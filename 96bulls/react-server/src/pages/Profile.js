import React from 'react';
import { NavLink, useHistory } from "react-router-dom"
import '../App.css';


const Profile = ({avatarURL, name, degree}) => {

    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }

    return (
        <div id='page5'>
            <div className='back-button' onClick={goBack}>⟵   Back</div>
            <div id="profile-main">
                <img src={"level_triangle.jpg"} alt="not loaded"></img>
                <h2>{name}</h2>
                <h3>{degree}</h3>
                <NavLink className="button navButton" to="/editprofile">Edit Avatar</NavLink>
                <NavLink className="button navButton" to="/page8">Achievements</NavLink>
            </div>
            <div id="levelBar">
                <div id="progressBar">
                    <div id="levels">
                        <h3>Level 2</h3>
                        <h3>Level 3</h3>
                    </div>
                    <div id="levelDiv">
                        <div id="progress"></div>
                        <div id="remaining"></div>
                    </div>
                </div>
                <h3>2000xp Remaining</h3>
            </div>
        </div>
    );
}

export default Profile;