import { Component } from 'react';
import PropTypes from 'prop-types';

class Duplicate extends Component {
  static propTypes = {
    onAddedContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    children: PropTypes.func.isRequired,
  };

  state = {
    isOpen: false,
    content: '',
  };

  handleDuplicate = ({ name, number }) => {
    const { onAddedContact, contacts } = this.props;
    const isDuplicateName = contacts.some(item => item.name === name);
    const isDuplicateNumber = contacts.some(item => item.number === number);

    if (isDuplicateName) {
      this.setState({
        content: `The "${name}" is already exist in contacts list! Please, select another name`,
        isOpen: true,
      });
      return;
    }

    if (isDuplicateNumber) {
      this.setState({
        content: `The number: ${number} is already belongs to enother contact`,
        isOpen: true,
      });
      return;
    }

    onAddedContact(name, number);
  };

  toggle = () =>
    this.setState(({ isOpen }) => ({ isOpen: !isOpen, content: '' }));

  render() {
    const { children } = this.props;
    const { isOpen, content } = this.state;

    return children({
      isOpen,
      content,
      toggleAlert: this.toggle,
      onAddedContact: this.handleDuplicate,
    });
  }
}

export default Duplicate;
