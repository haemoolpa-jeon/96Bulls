/* Chat page that contains Message, Room and Panel */

import React, { Component } from 'react';
import Panel from './Panel/Panel';
import RoomList from './RoomList/RoomList';
import Messages from './Messages/Messages';
import styles from './App.module.scss';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Chat extends Component {
  render() {
    const { currentUser, currentRoom } = this.props;
    return (
      <div className={styles.App}>
        <Panel
          key={currentUser && currentUser.id}
          currentUser={currentUser}
        />
        <RoomList
          currentUser={currentUser}
        />
        <Messages
          key={currentRoom && currentRoom.id}
          currentUser={currentUser}
          currentRoom={currentRoom}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentRoom: state.room.currentRoom,
});

Chat.propTypes = {
  currentUser: PropTypes.object,
  currentRoom: PropTypes.object,
};

export default connect(mapStateToProps)(Chat);

