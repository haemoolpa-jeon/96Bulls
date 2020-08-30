import React from 'react';
import logo from './logo.svg';
import './App.css';
import './style/page8.css'
import './style/leaderboard.css'

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
      //<FrontPage/>
      // <CurrentClass/>   //max
      // <Question1/>     //Hyun
      // <Question2/>     //Hyun
      // <Page5/>     //Abdul
      // <Page6/>     //Abdul
      <Leaderboard/>     //Jesse
      //<Page8/>     //Jesse
    );
  }
}

export default App;
