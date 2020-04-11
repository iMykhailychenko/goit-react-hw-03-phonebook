import React, { Component} from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import uuidv1 from 'uuid/v1';

// impor components
import PhoneWrapper from '../phone-wrapper/PhoneWrapper.styled';
import ContactForm from '../contact-form/ContactForm';
import ContactsList from '../contacts-list/ContactsList';
import Filter from '../filter/Filter';
import Notification from '../notification/Notification';
import Duplicate from '../render-props/Duplicate';

// import styles
import slideUp from '../transitions/slideUp.module.css';
import alert from '../transitions/alert.module.css';
import slideUpForm from '../transitions/slideUpForm.module.css';
import styles from './App.module.css';
import '../transitions/slideTitle.css';
import '../base.css';

// import utils
import { defaultValue, filterTasks } from '../helpers/helpers';
import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
} from '../local-storage/LocalStorageData';
import { IContacts, IState } from '../../types';

type Props = {};

export default class App extends Component<Props, IState> {
  state = {
    contacts: [],
    filter: '',
    toggleOpen: true,
  };

  componentDidMount(): void {
    const contacts: IContacts[] = getDataFromLocalStorage('contacts', defaultValue);
    setDataToLocalStorage('contacts', [...contacts]);
    this.setState({ contacts });
  }

  componentDidUpdate(_ignore: Props, prevState: IState): void {
    const { contacts } = this.state;

    if (prevState.contacts.length === contacts.length) {
      const isEqual: boolean = contacts.every(
        (item: IContacts, index) => item.id === prevState.contacts[index].id,
      );

      if (isEqual) return;
    }

    setDataToLocalStorage('contacts', contacts);
    this.setState({ contacts: [...contacts] });
  }

  handleAddedContact = (name: string, number: string): void => {
    const { contacts } = this.state;

    this.setState({
      contacts: [...contacts, { id: uuidv1(), name, number }],
    });
  };

  handleChanges = (value: string): void => {
    this.setState({ filter: value });
  };

  handleRemove = (id: string) => {
    const { contacts } = this.state;
    const filteredArr = contacts.filter((item: IContacts) => item.id !== id);

    this.setState({
      contacts: [...filteredArr],
    });
  };

  handleClick = () => {
    this.setState((prev: IState) => ({ toggleOpen: !prev.toggleOpen }));
  };

  render() {
    const { contacts, filter, toggleOpen } = this.state;
    const filteredTasks: IContacts[] = filterTasks(contacts, filter);
    const toggleClass = classNames({
      toggle: true,
      open: toggleOpen,
      up: contacts.length < 3,
    });

    return (
      <PhoneWrapper>
        <div className={styles.wrp}>
          <CSSTransition in timeout={500} classNames="Logo" appear>
            <h2 className={styles.title}>Phonebook</h2>
          </CSSTransition>

          <Duplicate
            contacts={contacts}
            onAddedContact={this.handleAddedContact}
          >
            {({ isOpen, toggleAlert, onAddedContact, content }) => (
              <>
                <CSSTransition
                  in={isOpen}
                  timeout={300}
                  classNames={alert}
                  unmountOnExit
                >
                  <Notification
                    value={content}
                    title="Attention!"
                    onWarnning={toggleAlert}
                  />
                </CSSTransition>

                <CSSTransition
                  in={toggleOpen || !contacts.length}
                  timeout={300}
                  classNames={slideUpForm}
                  unmountOnExit
                >
                  <div className={styles.container}>
                    <ContactForm onAddedContact={onAddedContact} />
                  </div>
                </CSSTransition>
              </>
            )}
          </Duplicate>

          <div className={styles.contacts}>
            {!!contacts.length && (
              <button
                type="button"
                onClick={this.handleClick}
                className={toggleClass}
              />
            )}
            <CSSTransition
              in={contacts.length > 2}
              timeout={250}
              classNames={slideUp}
              unmountOnExit
            >
              <div className={styles.container}>
                <h2 className={styles.title}>Contacts</h2>
                <Filter value={filter} onFilterChanges={this.handleChanges} />
              </div>
            </CSSTransition>
          </div>

          <ContactsList
            isOpen={toggleOpen}
            contacts={filteredTasks}
            onRemove={this.handleRemove}
          />
        </div>
      </PhoneWrapper>
    );
  }
}
