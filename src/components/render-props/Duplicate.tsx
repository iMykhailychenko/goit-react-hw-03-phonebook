import { Component } from 'react';
import { IContacts } from '../../types';

interface State {
  isOpen: boolean;
  content: string;
}

interface ChildrenProps {
  isOpen: boolean;
  content: string;
  toggleAlert(): void;
  onAddedContact(name: string, number: string): void;
}

interface Props {
  contacts: IContacts[];
  onAddedContact(name: string, number: string): void;
  children(props: ChildrenProps): JSX.Element;
}

class Duplicate extends Component<Props, State> {
  state = {
    isOpen: false,
    content: '',
  };

  handleDuplicate = (name: string, number: string) => {
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
