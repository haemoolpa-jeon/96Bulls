import React from 'react';
import './App.css';
import './style/page8.css'
import './style/leaderboard.css'
import './style/page5.css'

//firebase
import {firestore} from firebase;

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

// Firestore CREATE

const onClickHandler = (e) => {
  e.preventDefault();

  // Only when 'task' is not empty
  if (task !== "") {
    firestore
      .collection("tasks")
      .add({ todo: task }) // insert task in todo
      .then((res) => { // 
      
        setTasks((prevTasks) => tasks.concat({ todo: task, id: res.id }));
      });
      
    setTask("");
  }
};

// Firestore READ

const fetchData = useCallback(() => {
  // array to store data
  let saveData = [];

  firestore
      .collection("tasks") //  "info" collection
      .get() // 
      .then((docs) => {
      docs.forEach((doc) => {
          saveData.push({ tasks: doc.data().tasks, id: doc.id });
      });
      // add data to task
      setTasks((prevTasks) => prevTasks.concat(saveData));
  });
}, []);

useEffect(() => {
  fetchData();
}, [fetchData]);

// Firestore DELETE

const removeHandler = (id) => {
  firestore
    .collection("tasks")
    .doc(id)
    .delete()
    .then(() => 
      setTasks((prevTasks) =>
        prevTasks.filter((prevTask) => id !== prevTask.id)
      )
    );
};


export default App;
