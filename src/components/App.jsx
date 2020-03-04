import React, { Component } from 'react';

// impor components
import PhoneWrapper from './phone-wrapper/PhoneWrapper.styled';
import ContactForm from './contact-form/ContactForm';
import ContactsList from './contacts-list/ContactsList';
import Filter from './filter/Filter';
import Notification from './notification/Notification';

// import styles
import styles from './App.module.css';
import './base.css';

// import utils
import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
} from './local-server/LocalServerData';
const uuidv1 = require('uuid/v1');

const defaultValue = [
  { id: 'id-1', name: 'Rosie Simpson', number: '380444591256' },
  { id: 'id-2', name: 'Hermione Kline', number: '380444438912' },
  { id: 'id-3', name: 'Eden Clements', number: '380446451779' },
  { id: 'id-4', name: 'Annie Copeland', number: '380442279126' },
];
const validName = '!@#$%^&*()_+"№%:,.;()_+-=1234567890 ';

const filterTasks = (contacts, filter) => {
  return contacts.filter(item => {
    return item.name.toLowerCase().includes(filter.toLowerCase());
  });
};

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
    warnning: '',
  };

  componentDidMount() {
    const contactsFromLocalStorage = getDataFromLocalStorage('contacts');
    this.setState(({ contacts }) => ({
      contacts: contactsFromLocalStorage,
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts.length === 0) {
      setDataToLocalStorage('contacts', [...defaultValue]);
      return;
    }

    if (prevState.contacts.length === contacts.length) {
      const isChanged = contacts.some(
        (item, index) => item.id !== prevState.contacts[index].id,
      );
      if (isChanged) {
        setDataToLocalStorage('contacts', contacts);
        return;
      }
      return;
    }

    setDataToLocalStorage('contacts', contacts);
  }

  handleChanges = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleDuplicate = () => {
    this.setState({ warnning: '' });
  };

  handleRemove = ({ target }) => {
    const { id } = target;
    const { contacts } = this.state;
    const filteredArr = contacts.filter(item => item.id !== id);

    this.setState({
      contacts: [...filteredArr],
    });
  };

  handleAddedContact = ({ name, number }) => {
    if (name.includes(validName) || name === '') {
      this.setState({
        warnning: `You put invalid value: "${name}" into name field! Please, select another name`,
      });
      return;
    }

    if (isNaN(+number) || number === '') {
      this.setState({
        warnning: `You put invalid value: "${number}" into number field! Please, select another number`,
      });
      return;
    }

    const { contacts } = this.state;
    const isDuplicateName = contacts.some(item => item.name === name);
    const isDuplicateNumber = contacts.some(item => item.number === number);

    if (isDuplicateName) {
      this.setState({
        warnning: `The "${name}" is already exist in contacts list! Please, select another name`,
      });
      return;
    }

    if (isDuplicateNumber) {
      this.setState({
        warnning: `The number: ${number} is already belongs to the "${name}" in your contacts list`,
      });
      return;
    }

    this.setState(prevState => ({
      contacts: [...contacts, { id: uuidv1(), name, number }],
    }));
  };

  render() {
    const { contacts, filter, warnning } = this.state;
    const filteredTasks = filterTasks(contacts, filter);

    return (
      <PhoneWrapper>
        <div className={styles.wrp}>
          <Notification
            value={warnning}
            title="Attention!"
            onWarnning={this.handleDuplicate}
          />
          <h2 className={styles.title}>Phonebook</h2>
          <ContactForm onAddedContact={this.handleAddedContact} />
          <h2 className={styles.title}>Contacts</h2>
          {contacts.length > 2 && (
            <Filter value={filter} onFilterChanges={this.handleChanges} />
          )}
          <ContactsList contacts={filteredTasks} onRemove={this.handleRemove} />
        </div>
      </PhoneWrapper>
    );
  }
}
