import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import { useState } from 'react';
import useLocalStorage from '../hooks/LocaleStorage';
import css from './app.module.css';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useLocalStorage('contacts', []);

  const onContactFormSubmit = newContact => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    setContacts(prevState => [...prevState, newContact]);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const getFilteredContact = () => {
    const normilizeFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizeFilter)
    );
  };
  const filteredContact = getFilteredContact();

  return (
    <div className={css.phonebook}>
      <div className={css.section}>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={onContactFormSubmit} />
      </div>
      <div className={`${css.section} ${css.contactSection}`}>
        <h2>Contacts</h2>

        <Filter value={filter} onChange={changeFilter} />
        <ContactList contacts={filteredContact} onDelete={deleteContact} />
      </div>
    </div>
  );
};
