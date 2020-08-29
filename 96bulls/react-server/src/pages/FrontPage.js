import React from 'react';
import '../App.css';


class FrontPage extends React.Component {
    relocateToLeaderboard() {
        console.log('relocating to leaderboard');
    }

    render() {
        return (
            <div className="home-page">
                <div className="home-card">
                <div className='flex-center' style={{backgroundColor: '#BF40FF', width: '100%', height: 60, color: 'white'}}>
                    <i>Classes</i>
                </div>
                <div>
                    <p className='muted' style={{fontSize: 14, marginBottom: 30}}>DECO3801 - Design computing studio 3</p>
                </div>
                <div className="button" onClick={this.relocateToLeaderboard}>
                    Course Leaderboard
                </div>
                <div style={{fontWeight: 600}}>
                    You - rank 1/500
                </div>
                
                <div className='flex-bottom-right' style={{textAlign: 'right', fontSize: 14, width: '100%', minHeight: 100, paddingBottom: 20}}>
                    <div onClick={{}} style={{display: 'flex', cursor: 'pointer'}}>Current class: studio one <div style={{fontSize: 30}}>→</div></div>
                    <div style={{cursor: 'pointer'}}>3/15 Pre-class quiz <span style={{fontSize: 30}}>→</span></div>  
                </div>  
                </div>
            </div>
        );
    }
}

export default FrontPage;