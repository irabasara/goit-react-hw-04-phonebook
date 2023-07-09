import { Component } from 'react';
import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import css from './app.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onContactFormSubmit = newContact => {
    const { contacts } = this.state;

    if (
      contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    const { value } = e.target;
    this.setState({
      filter: value,
    });
  };

  getFilteredContact = () => {
    const { contacts, filter } = this.state;

    const normilizeFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizeFilter)
    );
  };

  render() {
    const filteredContact = this.getFilteredContact();

    return (
      <div className={css.phonebook}>
        <div className={css.section}>
          <h2>Phonebook</h2>
          <ContactForm onSubmit={this.onContactFormSubmit} />
        </div>
        <div className={`${css.section} ${css.contactSection}`}>
          <h2>Contacts</h2>

          <Filter value={this.state.filter} onChange={this.changeFilter} />
          <ContactList
            contacts={filteredContact}
            onDelete={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}
