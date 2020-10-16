import React from 'react';
import '../App.css';

class CurrentClass extends React.Component {

    constructor(props) {
        super(props);
        this.state = { leadershipPointsGained: 0 }
    }

    renderLevelObject = user => {
        return (
            <div style={{ display: 'inline-grid' }}>
                <div className='level-obj-container'>
                    <div className='level-circle'>LVL: 5</div>
                    <div style={{ marginLeft: '-3px' }} ><img src='level_triangle.jpg' alt="not loaded" /></div>
                    <div style={{ textAlign: 'center' }}>{user}</div>
                </div>
            </div>
        );
    }

    incrementXp = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'User1',
                xpGained: 50,
                questionsAnswered: 0,
            })
        };

        this.setState({ leadershipPointsGained: this.state.leadershipPointsGained + 50 })
        console.log()

        console.log(requestOptions);
        fetch('/profile/xp', requestOptions).catch(err => console.log(err));
    }

    render() {
        let users = ['Kazuko Hallenbeck \xc2\xa0', 'Roxana Diep \xc2\xa0', 'Temika Mcloughlin \xc2\xa0', 'Leonor Linsey \xc2\xa0', 'Joeann Klar \xc2\xa0', 'Sheba Krajewski \xc2\xa0', 'Tracey Vanhorn \xc2\xa0', 'Steve Burget \xc2\xa0', 'Hannelore Duryea \xc2\xa0', 'Johna Farnum \xc2\xa0', 'Rosemarie Craver \xc2\xa0', 'Martina Nicoletti \xc2\xa0', 'Jarrod Samms \xc2\xa0', 'Narcisa Folks \xc2\xa0', 'Adela Stenger \xc2\xa0', 'Chelsea Jarrell \xc2\xa0', 'Hermelinda Mineo \xc2\xa0', 'Ivana Dement \xc2\xa0', 'Santos Mccollough \xc2\xa0', 'Tonisha Duplessis \xc2\xa0', 'Evan Hawker \xc2\xa0', 'Reyes Millhouse \xc2\xa0', 'Joana Linsley \xc2\xa0', 'Alayna Hukill \xc2\xa0', 'Jule Mcgrath \xc2\xa0', 'Tonita Schoolcraft \xc2\xa0', 'Wilhemina Obannon \xc2\xa0', 'Wendell Audie \xc2\xa0'];
        return (
            <div className="current-class-page">
                <div className='back-button'><a href='/'>⟵   Back</a></div>
                <div style={{ position: 'absolute', top: 10, right: 10, }}>
                    <div className='info-cards'>
                        Total: 30 students
                    </div>
                    <div className='info-cards'>
                        Class time: 23/120 mins
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div className='page-header'>Studio One</div>
                    <div className='page-subheader'>Current topic: Why deco courses are time consuming - Slide 20/35</div>
                    <div className='user-levels-section'>
                        {users.map(this.renderLevelObject)}
                    </div>
                </div>
                <div className="current-class-footer">
                    <div style={{ color: 'white' }}>
                        <div style={{ fontSize: 25, marginBottom: 5 }}>Your activities</div>
                        <div className='your-activities'>
                            <div>Questions attempted: 1</div>
                            <div>Mic time: 10 mins</div>
                            <div>Leaderboard points gained: {this.state.leadershipPointsGained}</div>
                        </div>
                    </div>
                    <div style={{ color: 'white', textAlign: 'right' }}>
                        <div style={{ fontSize: 25, marginBottom: 5 }}>Reactions</div>
                        <div style={{ display: 'flex', marginRight: -20 }}>
                            <div class="reaction-container" style={{ textAlign: 'center', cursor: 'pointer', paddingTop: 8 }} onClick={this.incrementXp}>
                                <img src="like.png" alt="not loaded" />
                                <div>Like</div>
                            </div>
                            <div class="reaction-container" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={this.incrementXp}>
                                <img src="clap.png" alt="not loaded" />
                                <div>Celebrate</div>
                            </div>
                            <div class="reaction-container" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={this.incrementXp}>
                                <img src="love.png" alt="not loaded" />
                                <div>Love</div>
                            </div>
                            <div class="reaction-container" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={this.incrementXp}>
                                <img src="lightbulb.png" alt="not loaded" />
                                <div>Insightful</div>
                            </div>
                            <div class="reaction-container" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={this.incrementXp}>
                                <img src="curious.png" alt="not loaded" />
                                <div>Curious</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CurrentClass;
