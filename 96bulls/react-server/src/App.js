import React from 'react';
import './App.css';
import './style/page8.css'
import './style/leaderboard.css'
import './style/page5.css'
import './style/Home.module.css'
import 'bootstrap/dist/css/bootstrap.css'

import FrontPage from './pages/FrontPage.js';
import CurrentClass from './pages/CurrentClass.js';
import Profile from './pages/Profile.js';
import Leaderboard from './pages/Leaderboard.js';
import Page8 from './pages/Page8.js';
import QuizPage from './pages/QuizPageAlt.js';
import HomePage from './pages/HomePage.js';
import CreateQuiz from './pages/CreateQuizAlt.js';
import Quizzes from './pages/Quizzes.js';
import ChooseUserTypePage from './pages/ChooseUserTypePage.js';
import SignIn from './pages/signin.js';
import Register from './pages/register.js';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import EditProfile from './pages/Canvas.js';


class App extends React.Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => <ChooseUserTypePage />} />
          <Route exact path="/home" render={() => <HomePage />} />
          <Route exact path="/register" render={() => <Register />} />
          <Route exact path="/signin" render={() => <SignIn />} />
          <Route exact path="/class" render={() => <FrontPage />} />
          <Route exact path="/currentClass" render={() => <CurrentClass />} />
          <Route exact path="/profile" render={() => <Profile name="Christopher Walken" degree="Bachelor of Copy Paste" />} />
          <Route exact path="/editprofile" render={() => <EditProfile />} />
          <Route exact path="/leaderboard" render={() => <Leaderboard />} />
          <Route exact path="/page8" render={() => <Page8 />} />
          <Route exact path="/Quiz/:id" render={({ match }) => <QuizPage match={match} />} />
          <Route exact path="/CreateQuiz" render={() => <CreateQuiz />} />
          <Route exact path="/quizzes" render={() => <Quizzes />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
