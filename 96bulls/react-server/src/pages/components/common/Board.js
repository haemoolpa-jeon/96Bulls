/* Board to put components */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Board.module.scss';

class Board extends Component {
  render() {
    const { children, className } = this.props;
    return (
      <div className={`${styles.paper} ${className}`}>
        {children}
      </div>
    );
  }
}

Board.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Board;
