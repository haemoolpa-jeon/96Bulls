import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import firebase from './config/firebase';
import * as serviceWorker from './serviceWorker';

import './App.css';
import './style/Home.module.css';
import 'bootstrap/dist/css/bootstrap.css';

import FrontPage from './pages/FrontPage.js';
import CurrentClass from './pages/CurrentClass.js';
import Profile from './pages/Profile.js';
import Leaderboard from './pages/Leaderboard.js';
import Achievements from './pages/Achievements.js';
import QuizPage from './pages/QuizPageAlt.js';
import HomePage from './pages/HomePage.js';
import CreateQuiz from './pages/CreateQuizAlt.js';
import Quizzes from './pages/Quizzes.js';
import ChooseUserTypePage from './pages/ChooseUserTypePage.js';
import ChatPage from './pages/chat/components/chatPage.js'

import Login from './pages/chat/components/Auth/Login';
import Register from './pages/chat/components/Auth/Register';
import Spinner from './pages/chat/components/common/Spinner';

import { Route, BrowserRouter as Router, Switch, withRouter } from 'react-router-dom'
import EditProfile from './pages/Canvas.js';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './pages/chat/reducers';
import { setUser, clearUser } from './pages/chat/actions';

const store = createStore(rootReducer, composeWithDevTools());

class App extends Component {
  componentDidMount() {
    const { setUser, clearUser, history } = this.props;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        history.push('/');
      } else {
        history.push('/signin');
        clearUser();
      }
    });
  }
  
  render() {
    const { isLoading } = this.props;
    return isLoading ? (
      <Spinner />
    ) : (
      <Router>
        <Switch>
        <Route exact path="/" component={ChooseUserTypePage} />
        <Route exact path="/home" render={() => <HomePage />} />
        <Route exact path="/register" render={() => <Register />} />
        <Route exact path="/signin" render={() => <Login />} />
        <Route exact path="/class" render={() => <FrontPage />} />
        <Route exact path="/currentClass" render={() => <CurrentClass />} />
        <Route exact path="/profile" render={() => <Profile name="Christopher Walken" degree="Bachelor of Copy Paste" />} />
        <Route exact path="/editprofile" render={() => <EditProfile />} />
        <Route exact path="/leaderboard" render={() => <Leaderboard />} />
        <Route exact path="/achievements" render={() => <Achievements />} />
        <Route exact path="/Quiz/:id" render={({ match }) => <QuizPage match={match} />} />
        <Route exact path="/CreateQuiz" render={() => <CreateQuiz />} />
        <Route exact path="/quizzes" render={() => <Quizzes />} />
        <Route exact path="/chat" component={ChatPage} />
      </Switch>
    </Router>
      
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.user.isLoading,
});

const RootWithAuth = withRouter(connect(mapStateToProps, { setUser, clearUser })(App));

App.propTypes = {
  history: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setUser: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
};

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>, document.getElementById('root'),
);

serviceWorker.unregister();

export default App;
