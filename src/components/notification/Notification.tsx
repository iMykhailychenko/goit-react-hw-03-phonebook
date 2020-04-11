import React from 'react';
import styles from './Notification.module.css';

interface Props {
  value: string;
  title: string;
  onWarnning(): void;
}

const Notification: React.FC<Props> = ({ value, title, onWarnning }) => (
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

export default Notification;
