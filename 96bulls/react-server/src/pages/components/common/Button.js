/* Frequently used Button Component */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

class Button extends Component {
  handleClick = (e) => {
    const { onClick } = this.props;
    onClick && onClick(e);
  };

  render() {
    const {
      className, disabled, children, loader,  
    } = this.props;
    return (
      <button
        className={`${styles.button} ${className}`}
        disabled={disabled}
        onClick={this.handleClick}
        type="button"
      >
        { loader ? <div className={styles.loader} /> : children }
      </button>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  loader: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.default = {
  loader: false,
  disabled: false,
};

export default Button;
