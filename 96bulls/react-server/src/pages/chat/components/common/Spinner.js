import React, { Component } from 'react';
import BounceLoader from 'react-spinners/BounceLoader';
import styles from './Spinners.module.scss';

class Spinner extends Component {
  render() {
    return (
      <div className={styles.dimmer}>
        <BounceLoader
          color="purple"
        />
      </div>
    );
  }
}

export default Spinner;
