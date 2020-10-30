/* Results page of quiz when completed, show EXP and levels */

import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { useHistory } from 'react-router-dom'

function Result(props) {

  const history = useHistory();

  return (
    <CSSTransition
      className="container result"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div>
        {
          props.quizResult === 1
            ? <div>
              You got <strong>{props.quizResult}</strong> question correct
            </div>
            : <div>
              You got <strong>{props.quizResult}</strong> questions correct
          </div>
        }
        <button className="button home-button" onClick={() => { history.push('/') }}>Home</button>
      </div>
    </CSSTransition>
  );
}

Result.propTypes = {
  quizResult: PropTypes.string.isRequired
};

export default Result;
