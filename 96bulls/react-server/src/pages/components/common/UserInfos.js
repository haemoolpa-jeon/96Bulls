/* User Informations such as name and avatar */

import React, { Component } from 'react';
import styles from './UserInfos.module.scss';
import PropTypes from 'prop-types';

class UserInfos extends Component {
  render() {
    const { user, onClick } = this.props;
    return (
      <button className={styles['user-info-item']} onClick={onClick} type="button">
        <img className={styles.avatar} src={user.avatar} alt={`${user.name} avatar`} />
        <div className={styles['user-info-content']}>
          <span className={styles['display-name']}>{user.name}</span>
          <span className={styles.email}>{user.email}</span>
        </div>
      </button>
    );
  }
}

UserInfos.propTypes = {
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default UserInfos;
