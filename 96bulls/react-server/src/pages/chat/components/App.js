import React, { Component } from 'react';
import styles from '../style/Home.module.css';
import '../styles/main.scss';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import userTypeStore from '../userTypeStore';

export class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <div className={styles.container}>
          <title>Altis Academia</title>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to UQ remote
          </h1>
  
          <p className={styles.description}>
            Powered By Altis Academia
          </p>

          <div className={styles.chooseUserPage}>
            <div className={styles.chooseUserCard}>
              <div className='flex-center' style={{ backgroundColor: '#BF40FF', width: '100%', height: 60, color: 'white' }}>
                Choose user type
              </div>
              <div className="button" style={{ width: '200px', marginTop: 20 }} onClick={() => { userTypeStore.changeUserType('instructor');}}>
                <Link to = "/home">Instructor</Link>
              </div>
              <div className="button" style={{ width: '200px' }} onClick={() => { userTypeStore.changeUserType('student'); }}>
                <Link to = "/home">Student</Link>
              </div>
            </div>
          </div>          
          
        </main>
  
        <footer className={styles.footer}>
          <h2>Powered By Altis Academia</h2>
        </footer>
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentRoom: state.room.currentRoom,
});

App.propTypes = {
  currentUser: PropTypes.object,
  currentRoom: PropTypes.object,
};

export default connect(mapStateToProps)(App);
