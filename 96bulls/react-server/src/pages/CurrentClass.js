import React from 'react';
import '../App.css';
import { NavLink, useHistory } from "react-router-dom"


class CurrentClass extends React.Component {

    renderLevelObject = user => {
        return (
            <div style={{display: 'inline-grid'}}>
                <div className='level-obj-container'>
                    <div className='level-circle'>LVL: 5</div>
                    <div style={{marginLeft: '-3px'}} ><img src='level_triangle.jpg' alt="not loaded" /></div>
                    <div style={{textAlign: 'center'}}>{user}</div>
                </div>
            </div>
        );
    }

    render() {
        let users = ['Kazuko Hallenbeck \xc2\xa0', 'Roxana Diep \xc2\xa0', 'Temika Mcloughlin \xc2\xa0', 'Leonor Linsey \xc2\xa0', 'Joeann Klar \xc2\xa0', 'Sheba Krajewski \xc2\xa0', 'Tracey Vanhorn \xc2\xa0', 'Steve Burget \xc2\xa0', 'Hannelore Duryea \xc2\xa0', 'Johna Farnum \xc2\xa0', 'Rosemarie Craver \xc2\xa0', 'Martina Nicoletti \xc2\xa0', 'Jarrod Samms \xc2\xa0', 'Narcisa Folks \xc2\xa0', 'Adela Stenger \xc2\xa0', 'Chelsea Jarrell \xc2\xa0', 'Hermelinda Mineo \xc2\xa0', 'Ivana Dement \xc2\xa0', 'Santos Mccollough \xc2\xa0', 'Tonisha Duplessis \xc2\xa0', 'Evan Hawker \xc2\xa0', 'Reyes Millhouse \xc2\xa0', 'Joana Linsley \xc2\xa0', 'Alayna Hukill \xc2\xa0', 'Jule Mcgrath \xc2\xa0', 'Tonita Schoolcraft \xc2\xa0', 'Wilhemina Obannon \xc2\xa0', 'Wendell Audie \xc2\xa0'];
        return (
            <div className="current-class-page">
                <div className='back-button'><a href='/'>⟵   Back</a></div>
                <div style={{position: 'absolute', top: 10, right: 10,}}>
                    <div className='info-cards'>
                        Total: 30 students
                    </div>
                    <div className='info-cards'>
                        Class time: 23/120 mins
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <div className='page-header'>Studio One</div>
                    <div className='page-subheader'>Current topic: Why deco courses are time consuming - Slide 20/35</div>
                    <div className='user-levels-section'>
                        {users.map(this.renderLevelObject)}
                    </div>
                </div>
                <div className="current-class-footer">
                    <div style={{color: 'white'}}>
                        <div style={{fontSize: 25, marginBottom: 5}}>Your activities</div>
                        <div className='your-activities'>
                            <div>Questions attempted: 1</div>
                            <div>Mic time: 10 mins</div>
                            <div>Leaderboard points gained: 20</div>
                        </div>
                    </div>
                    <div style={{color: 'white', textAlign: 'right'}}>
                        <div style={{fontSize: 25, marginBottom: 5}}>Reactions</div>
                        <img src="reactions.png" alt="not loaded" />
                    </div>
                </div>
            </div>
        );
    }
}

export default CurrentClass;