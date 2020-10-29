import React from 'react';
import Chat from './components/chat'
import { Link } from 'react-router-dom'

class chatPage extends React.Component {

    render() {
        return (
            <div className="current-class-page">
                <div className='back-button'><Link to='/home'>⟵   Back</Link></div>
                <Chat></Chat>
                </div>
        );
    }
}

export default chatPage;
