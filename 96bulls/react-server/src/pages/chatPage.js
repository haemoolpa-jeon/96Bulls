/* Page to include chat app on the page */

import React, { Component } from 'react';
import Chat from './components/chat'
import { Link } from 'react-router-dom'

class chatPage extends Component {

    render() {
        return (
            <div className="current-class-page">
                <div className='back-button' style={{ display: 'inline-block' }}><Link to='/home'>⟵   Back</Link></div>
                <div className='back-button' style={{ display: 'inline-block' }}><Link to='/home'>Home</Link></div>
                <Chat></Chat>
                </div>
        );
    }
}

export default chatPage;