import React from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css'
import firebase from '../config/firebase';

//Front page for a student user
//User can enter class, choose a quiz or view the class leaderboard
const FrontPage = (props) => {

    const history = useHistory();

    const goHome = () => {
        history.push('/home');
    }

    const goBack = () => {
        history.push('/home');
    }

    const handleLogout = () => {
        firebase
          .auth()
          .signOut()
          .then(() => console.log('Logout'));
      };

    const relocateToLeaderboard = () => {
        console.log('relocating to leaderboard');
        history.push('/leaderboard');
    }

    const relocateToQuizzes = () => {
        console.log('relocating to questions');
        history.push('/quizzes');
    }

    const relocateToClass = () => {
        console.log("Relocating to class");
        history.push('/currentClass');
    }


    return (
        <div>
            <div className='back-button' onClick={goBack} style={{ display: 'inline-block' }}>⟵   Back</div>
                <div className='back-button' onClick={goHome} style={{ display: 'inline-block' }}>Home</div>
                <div className='back-button' style={{ display: 'inline-block' }} onClick={handleLogout}>Logout</div>
            <div className="home-page">
                <div className="home-card">
                    <div className='flex-center' style={{ backgroundColor: '#BF40FF', width: '100%', height: 60, color: 'white' }}>
                        <i>Classes</i>
                    </div>
                    <div>
                        <p className='muted' style={{ fontSize: 14, marginBottom: 30 }}>DECO3801 - Design computing studio 3</p>
                    </div> 
                    <div className="button" onClick={relocateToLeaderboard}>
                        Course Leaderboard
                    </div>
                    <div className="button" onClick={relocateToClass}>
                        Enter Class
                    </div>
                    <div className="button" onClick={relocateToQuizzes}>
                        View Quizzes
                    </div>
                </div>
            </div>
        </div>
    );

}

export default FrontPage;

//Test file
