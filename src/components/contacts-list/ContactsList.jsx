import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactsList.module.css';

const ContactsForm = ({ contacts, onRemove }) => {
  return (
    contacts && (
      <div className={styles.wrp}>
        <ul className={styles.list}>
          {contacts.map(({ id, name, number }) => (
            <li className={styles.item} key={id}>
              <div>
                <span>{`${name}:`}</span>
                <span>{`${number}`}</span>
              </div>
              <button
                className={styles.btn}
                onClick={onRemove}
                id={id}
                type="button"
              >
                &#10005;
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

ContactsForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default ContactsForm;
