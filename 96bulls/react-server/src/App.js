import React from 'react';
import './App.css';
import './style/page8.css'
import './style/leaderboard.css'
import './style/page5.css'

import FrontPage from './pages/FrontPage.js';
import CurrentClass from './pages/CurrentClass.js';
import Question1 from './pages/Question1.js';
import Question2 from './pages/Question2.js';
import Profile from './pages/Profile.js';
import EditProfile from './pages/EditProfile.js';
import Leaderboard from './pages/Leaderboard.js';
import Page8 from './pages/Page8.js';

import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'


class App extends React.Component {
  
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => <FrontPage />} />
          <Route exact path="/currentClass" render={() => <CurrentClass />} />
          <Route exact path="/question1" render={() => <Question1 />} />
          <Route exact path="/question2" render={() => <Question2 />} />
          <Route exact path="/profile" render={() => <Profile name="Christopher Walken" degree="Bachelor of Copy Paste" />} />
          <Route exact path="/editprofile" render={() => <EditProfile />} />
          <Route exact path="/leaderboard" render={() => <Leaderboard />} />
          <Route exact path="/page8" render={() => <Page8 />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
