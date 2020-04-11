import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { IContacts } from '../../types';

// styles
import styles from './ContactsList.module.css';
import popTransition from '../transitions/pop.module.css';

interface Props {
  contacts: IContacts[];
  onRemove(id: string): void;
  isOpen: boolean;
}

const ContactsForm: React.FC<Props> = ({ contacts, onRemove, isOpen }) => {
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
                onClick={() => onRemove(id)}
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

export default ContactsForm;
