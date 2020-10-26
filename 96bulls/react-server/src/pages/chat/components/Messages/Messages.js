import React, { Component } from 'react';
import MessageHeader from './MessageHeader/MessageHeader';
import MessageForm from './MessageForm';
import Paper from '../common/Paper';
import Message from './Message';
import firebase from '../../../../config/firebase';
import styles from './Messages.module.scss';
import PropTypes from 'prop-types';


class Messages extends Component {
  constructor(props) {
    super(props);
    this.messageContentRef = React.createRef();
  }

  state = {
    messages: [],
    messagesRef: firebase.database().ref('messages'),
    room: this.props.currentRoom,
    user: this.props.currentUser,
  };

  componentDidMount() {
    const { room, user } = this.state;
    if (room && user) {
      this.addListeners(room.id);
    }
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  addListeners = (roomId) => {
    this.addMessageListener(roomId);
  };

  /**
   * Event Listener
   * @param roomId
   */
  addMessageListener = (roomId) => {
    const loadedMessages = [];
    const ref = this.state.messagesRef;
    ref.child(roomId).on('child_added', (snap) => {
      loadedMessages.push(snap.val());
      this.setState({
        messages: loadedMessages,
      });
    });
  };

  removeListeners = () => {
    this.state.messagesRef.off();
  };

  displayMessages = messages => messages.length > 0 && messages.map(message => (
    <Message
      key={message.timestamp}
      message={message}
      user={message.user}
    />
  ));

  scrollDown = () => {
    this.messageContentRef.current.scrollTop = this.messageContentRef.current.scrollHeight;
  };

  render() {
    const { currentRoom, currentUser } = this.props;
    const { messages } = this.state;
    return (
      <section className={styles.messages}>
        <MessageHeader
          currentRoom={currentRoom}
        />
        <Paper className={styles['custom-paper']}>
          <div className={styles['message-content']} ref={this.messageContentRef}>
            {this.displayMessages(messages)}
          </div>
        </Paper>
        <MessageForm
          scrollDown={this.scrollDown}
          currentUser={currentUser}
          currentRoom={currentRoom}
        />
      </section>
    );
  }
}

Messages.propTypes = {
  currentUser: PropTypes.object,
  currentRoom: PropTypes.object,
};

export default Messages;
