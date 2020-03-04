import React from 'react';
import PropTypes from 'prop-types';
import styles from './Notification.module.css';

const Notification = ({ value, title, onWarnning }) =>
  value && (
    <div className={styles.wrp}>
      <div className={styles.popup}>
        <h3>{title}</h3>
        <p>{value}</p>
        <button className={styles.btn} onClick={onWarnning} type="button">
          Ok
        </button>
      </div>
    </div>
  );

Notification.propTypes = {
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onWarnning: PropTypes.func.isRequired,
};

export default Notification;
