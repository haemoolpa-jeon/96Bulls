import React, { Component } from 'react';
import Modal from 'react-modal';
import Input from '../../common/Input';
import Button from '../../common/Button';
import firebase from '../../../../config/firebase';
import { connect } from 'react-redux';
import { setCurrentRoom } from '../../../actions';
import PropTypes from 'prop-types';
import styles from './CreateRoom.module.scss';

class CreateRoom extends Component {
  state = {
    roomName: '',
    user: this.props.currentUser,
    roomsRef: firebase.database().ref('rooms'),
    usersRef: firebase.database().ref('users'),
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  createRoom = () => {
    const {
      roomsRef, usersRef, roomName, user,
    } = this.state;
    const { closeModal, setCurrentRoom } = this.props;
    const { key } = roomsRef.push();

    const newRoom = {
      id: key,
      name: roomName,
    };

    const createUser = {
      id: user.uid,
      name: user.displayName,
      avatar: user.photoURL,
    };

    roomsRef
      .child(key)
      .update(newRoom)
      .then(() => {
        this.setState({ roomName: '' });
        roomsRef
          .child(key)
          .child('users')
          .child(user.uid)
          .set(createUser)
          .then(() => {
            console.log('add user in room');
          })
          .catch((err) => {
            console.error(err);
          });

        usersRef
          .child(user.uid)
          .child('rooms')
          .child(key)
          .set(newRoom)
          .then(() => {
            console.log('room add in user');
          })
          .catch((err) => {
            console.error(err);
          });
        closeModal();
        setCurrentRoom(newRoom);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  handleSubmit = () => {
    if (this.isFormValid(this.state)) {
      this.createRoom();
    }
  };

  isFormValid = ({ roomName }) => roomName;

  render() {
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '35rem',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        background: '#eee',
        padding: '3rem',
        boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
      },
    };

    const { isOpen, closeModal } = this.props;
    const { roomName } = this.state;
    return (
      <Modal
        shouldCloseOnOverlayClick
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h1>Create Chat room</h1>
        <Input
          id="roomName"
          name="roomName"
          value={roomName}
          placeholder="Title"
          type="text"
          onChange={this.handleChange}
        />
        <div className={styles['button-wrapper']}>
          <Button onClick={this.handleSubmit}>Create</Button>
        </div>
      </Modal>
    );
  }
}

CreateRoom.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  setCurrentRoom: PropTypes.func.isRequired,
};

export default connect(null, { setCurrentRoom })(CreateRoom);
