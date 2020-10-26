import React from 'react';
import Chat from './chat'

class chatPage extends React.Component {

    render() {
        return (
            <div className="current-class-page">
                <div className='back-button'><a href='/'>⟵   Back</a></div>
                <Chat></Chat>
                </div>
        );
    }
}

export default chatPage;
