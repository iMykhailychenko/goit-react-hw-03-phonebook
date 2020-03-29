import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// styles
import styles from './ContactsList.module.css';
import popTransition from '../transitions/pop.module.css';

const ContactsForm = ({ contacts, onRemove, isOpen }) => {
  const boxHeight = classNames({
    contactsListWrp: true,
    contactsListWrpOpen: !isOpen,
  });

  return (
    <div className={boxHeight}>
      <TransitionGroup component="ul" className={styles.list}>
        {contacts.map(({ id, name, number }) => (
          <CSSTransition key={id} timeout={250} classNames={popTransition}>
            <li className={styles.item} key={id}>
              <div>
                <span>{`${name}: `}</span>
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
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
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
  isOpen: PropTypes.bool.isRequired,
};

export default ContactsForm;
