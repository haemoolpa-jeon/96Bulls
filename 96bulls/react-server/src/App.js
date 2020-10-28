import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './pages/style/Home.module.scss';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import userTypeStore from './userTypeStore';

import NavBar from './pages/components/navbar'

export class App extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
          <title>Altis Academia</title>
        <main className={styles.main}>
          <h1 className={styles.title} style={{ color: 'white' }}>
            Welcome to UQ remote
          </h1>
  
          <p className={styles.description} style={{ color: 'pink' }}>
            Powered By Altis Academia
          </p>

          <div className={styles.chooseUserPage}>
            <div className={styles.chooseUserCard}>
              <div className='flex-center' style={{ backgroundColor: '#BF40FF', width: '100%', height: 60, color: 'white' }}>
                Choose user type
              </div>
              <div className={styles.button} style={{ width: '200px', marginTop: 20 }} onClick={() => { userTypeStore.changeUserType('instructor');}}>
                <Link style={{ color: 'white' }} to = "/home">Instructor</Link>
              </div>
              <div className={styles.button} style={{ width: '200px' }} onClick={() => { userTypeStore.changeUserType('student'); }}>
                <Link style={{ color: 'white' }} to = "/home">Student</Link>
              </div>
            </div>
          </div>          
          
        </main>
  
        
      </div>
      <footer className={styles.footer} style={{ backgroundColor: '#ECECEC', width: '100%' }}>
          <h2>Powered By Altis Academia</h2>
        </footer>
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
