import React from 'react';
import { useHistory } from 'react-router-dom';

import userTypeStore from '../userTypeStore.js';

const ChooseUserTypePage = (props) => {

  const history = useHistory();

  return (
    <div className="choose-user-page">
      <div className="choose-user-card">
        <div className='flex-center' style={{ backgroundColor: '#BF40FF', width: '100%', height: 60, color: 'white' }}>
          <i>Choose user type</i>
        </div>
        <div className="button" style={{ width: '200px', marginTop: 20 }} onClick={() => { userTypeStore.changeUserType('instructor'); history.push('/home') }}>
          Instructor
        </div>
        <div className="button" style={{ width: '200px' }} onClick={() => { userTypeStore.changeUserType('student'); history.push('/home') }}>
          Student
        </div>
      </div>
    </div>
  )

}

export default ChooseUserTypePage;
