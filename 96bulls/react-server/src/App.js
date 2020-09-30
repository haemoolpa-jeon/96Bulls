import React from 'react';
import './App.css';
import './style/page8.css'
import './style/leaderboard.css'
import './style/page5.css'
import 'bootstrap/dist/css/bootstrap.css'

import FrontPage from './pages/FrontPage.js';
import CurrentClass from './pages/CurrentClass.js';
import Profile from './pages/Profile.js';
import EditProfile from './pages/EditProfile.js';
import Leaderboard from './pages/Leaderboard.js';
import Page8 from './pages/Page8.js';
import QuizPage from './pages/QuizPage.js';
import HomePage from './pages/HomePage.js';

import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'


class App extends React.Component {
  
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => <HomePage />} />
          <Route exact path="/home" render={() => <FrontPage />} />
          <Route exact path="/currentClass" render={() => <CurrentClass />} />
          <Route exact path="/profile" render={() => <Profile name="Christopher Walken" degree="Bachelor of Copy Paste" />} />
          <Route exact path="/editprofile" render={() => <EditProfile />} />
          <Route exact path="/leaderboard" render={() => <Leaderboard />} />
          <Route exact path="/page8" render={() => <Page8 />} />
          <Route exact path="/QuizPage" render={() => <QuizPage />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
