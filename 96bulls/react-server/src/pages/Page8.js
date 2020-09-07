import React from 'react';
import Trophy from './Trophy'
import { useHistory } from 'react-router-dom'

const Page8 = (props) => {

  const history = useHistory();

  return(
    <div>
      <div className='back-button' onClick={() => {history.goBack()}}>⟵   Back</div>
      <div>
        <Trophy title="Quick Quizzer" description="Answered 10 quiz questions correctly in under 20 seconds" imageURL="medal.png" />
        <Trophy title="Question Veteran" description="Congratulations, you have answered 50 questions throughout your time here" imageURL="gold.png" />
        <Trophy title="Level Up!" description="You've achieved level 2! You're no rookie anymore." imageURL="ribbon.png" />
      </div>
    </div>
    
  );

}


export default Page8;