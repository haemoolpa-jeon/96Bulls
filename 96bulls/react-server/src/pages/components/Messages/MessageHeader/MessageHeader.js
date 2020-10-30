/* Header of Message */

import React, { Component, Fragment } from 'react';
import Board from '../../common/Board';
import PropTypes from 'prop-types';
import styles from './MessageHeader.module.scss';
import UserInviteModal from './UserInviteModal';
import CurrentRoomUsersModal from './CurrentRoomUsersModal';
import firebase from '../../../../config/firebase';

class MessageHeader extends Component {
  state = {
    UserListModalIsOpen: false,
    CurrentRoomUsersIsOpen: false,
    roomsRef: firebase.database().ref('rooms'),
    currentRoom: this.props.currentRoom,
    currentRoomUsers: [],
  };

  componentDidMount() {
    this.addListeners();
  }

  //Remove event listner when unmounted
  componentWillUnmount() {
    this.removeListeners();
  }

  addListeners = () => {
    this.addRoomListener();
  };

  openCurrentRoomUsersModal = () => {
    this.setState({ CurrentRoomUsersIsOpen: true });
  };

  closeCurrentRoomUsersModal = () => {
    this.setState({ CurrentRoomUsersIsOpen: false });
  };

  openModal = () => {
    this.setState({ UserListModalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ UserListModalIsOpen: false });
  };

  //Add Event listner, so it runs when rootID is added to DB
  addRoomListener = () => {
    const { roomsRef, currentRoom } = this.state;
    const currentRoomUsers = [];
    if (currentRoom) {
      roomsRef.child(currentRoom.id).child('users').on('child_added', (snap) => {
        currentRoomUsers.push(snap.val());
        this.setState({ currentRoomUsers });
      });
    }
  };

  removeListeners = () => {
    this.state.roomsRef.off();
  };

  render() {
    const { currentRoom } = this.props;
    const { UserListModalIsOpen, currentRoomUsers, CurrentRoomUsersIsOpen } = this.state;
    return (
      <Fragment>
        <Board className={styles['message-header']}>
          <div className={styles['room-info']}>
            <h3 className={styles['room-name']}>{`# ${currentRoom ? currentRoom.name : 'Welcome to Open Chat'}`}</h3>
            <button
              type="button"
              className={styles['user-count']}
              onClick={this.openCurrentRoomUsersModal}
              disabled={!currentRoom}
            >
              {`Number of Users : ${currentRoomUsers.length}`}
            </button>
          </div>
          <button type="button" onClick={this.openModal} style = {{backgroundColor : '#bbb0dc', color : 'white', width: '120px', height: '50px'}} disabled={!currentRoom}>
            Invite user
          </button>
        </Board>
        <UserInviteModal
          isOpen={UserListModalIsOpen}
          closeModal={this.closeModal}
          currentRoom={currentRoom}
          currentRoomUsers={currentRoomUsers}
        />
        <CurrentRoomUsersModal
          isOpen={CurrentRoomUsersIsOpen}
          closeModal={this.closeCurrentRoomUsersModal}
          currentRoomUsers={currentRoomUsers}
        />
      </Fragment>
    );
  }
}

MessageHeader.propTypes = {
  currentRoom: PropTypes.object,
};

export default MessageHeader;
