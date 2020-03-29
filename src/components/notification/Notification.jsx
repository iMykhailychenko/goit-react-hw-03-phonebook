import React from 'react';
import PropTypes from 'prop-types';
import styles from './Notification.module.css';

const Notification = ({ value, title, onWarnning }) => (
  <div className={styles.wrp}>
    <div className="popup">
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{value}</p>
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
