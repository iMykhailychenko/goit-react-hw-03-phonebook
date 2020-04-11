import React from 'react';
import styles from '../contact-form/ContactForm.module.css';
import stylesFilter from './Filter.module.css';

interface Props {
  value: string;
  onFilterChanges(value: string): void;
}

const Filter: React.FC<Props> = ({ value, onFilterChanges }) => (
  <label>
    <span className="subtitle">Find contacts by name</span>
    <div className={stylesFilter.wrp}>
      <input
        className={styles.input}
        type="input"
        name="filter"
        onChange={() => onFilterChanges(value)}
        autoComplete="off"
      />
    </div>
  </label>
);

export default Filter;
