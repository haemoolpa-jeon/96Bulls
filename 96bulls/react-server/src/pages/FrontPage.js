import React from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css'


const FrontPage = (props) => {

    const history = useHistory();

    const relocateToLeaderboard = () => {
        console.log('relocating to leaderboard');
        history.push('/leaderboard');
    }

    const relocateToQuizzes = () => {
        console.log('relocating to questions');
        history.push('/quizzes');
    }

    const relocateToCreateQuiz = () => {
        history.push('/CreateQuiz');
    }

    const relocateToClass = () => {
        console.log("Relocating to class");
        history.push('/currentClass');
    }


    return (
        <div>
            <div className='back-button' onClick={() => { history.goBack() }}>⟵   Back</div>
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
                    <div className="button" onClick={relocateToCreateQuiz}>
                        Create quiz
                    </div>
                </div>
            </div>
        </div>
    );

}

export default FrontPage;

//Test file
