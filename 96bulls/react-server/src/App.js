import React from 'react';
import logo from './logo.svg';
import './App.css';

import FrontPage from './pages/FrontPage.js';
import CurrentClass from './pages/CurrentClass.js';
import Question1 from './pages/Question1.js';
import Question2 from './pages/Question2.js';
import Page5 from './pages/Page5.js';
import Page6 from './pages/Page6.js';
import Leaderboard from './pages/Leaderboard.js';
import Page8 from './pages/Page8.js';


class App extends React.Component {
  
  render() {
    return (
      <FrontPage/>
      // <CurrentClass/>
      // <Question1/>
      // <Question2/>
      // <Page5/>
      // <Page6/>
      // <Leaderboard/>
      // <Page8/>
    );
  }
}

export default App;
