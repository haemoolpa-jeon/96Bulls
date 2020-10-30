import React, { Component } from 'react';
import styles from './Panel.module.scss';
import CreateRoom from './CreateRoom/CreateRoom';
import firebase from '../../../config/firebase';
import PropTypes from 'prop-types';
import { clearUser, clearRoom } from '../../actions';
import { connect } from 'react-redux';
import userTypeStore from '../../../userTypeStore';

export class Panel extends Component {
  state = {
    CreateRoomModalIsOpen: false,
  };

  openModal = () => {
    this.setState({ CreateRoomModalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ CreateRoomModalIsOpen: false });
  };

  handleLogout = () => {
    const { clearRoom, clearUser } = this.props;
    firebase
      .auth()
      .signOut()
      .then(() => console.log('Logout'));
    clearRoom();
    clearUser();
  };

  render() {
    const { CreateRoomModalIsOpen } = this.state;
    const { currentUser } = this.props;
    return (
      <div className={styles['side-panel']}>
      {userTypeStore.currentUserType === 'instructor' ?
          <button onClick={this.openModal} style = {{backgroundColor : '#f3aa51', color : 'white', width: '80px', height: '50px'}} type="button">
          Create
      </button>
          : null}
        <button onClick={this.handleLogout} style = {{backgroundColor : '#d9598c', color : 'white', width: '80px', height: '50px'}} type="button">
            Logout
        </button>
        <CreateRoom
          currentUser={currentUser}
          isOpen={CreateRoomModalIsOpen}
          closeModal={this.closeModal}
        />  
      </div>
    );
  }
}

Panel.propTypes = {
  currentUser: PropTypes.object,
  clearRoom: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
};

export default connect(null, { clearRoom, clearUser })(Panel);
