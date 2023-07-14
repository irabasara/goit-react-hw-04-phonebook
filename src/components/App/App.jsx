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

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.contacts !== this.state.contacts) {
//       localStorage.setItem(
//         LS_KEY_CONTACTS,
//         JSON.stringify(this.state.contacts)
//       );
//     }
//   }

//   componentDidMount() {
//     const contacts = JSON.parse(localStorage.getItem(LS_KEY_CONTACTS));
//     if (contacts) {
//       this.setState({ contacts });
//     }
//   }

//   onContactFormSubmit = newContact => {
//     const { contacts } = this.state;

//     if (
//       contacts.some(
//         contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
//       )
//     ) {
//       alert(`${newContact.name} is already in contacts`);
//       return;
//     }

//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, newContact],
//     }));
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   changeFilter = e => {
//     const { value } = e.target;
//     this.setState({
//       filter: value,
//     });
//   };

//   getFilteredContact = () => {
//     const { contacts, filter } = this.state;

//     const normilizeFilter = filter.toLocaleLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normilizeFilter)
//     );
//   };

//   render() {
//     const filteredContact = this.getFilteredContact();

//     return (
//       <div className={css.phonebook}>
//         <div className={css.section}>
//           <h2>Phonebook</h2>
//           <ContactForm onSubmit={this.onContactFormSubmit} />
//         </div>
//         <div className={`${css.section} ${css.contactSection}`}>
//           <h2>Contacts</h2>

//           <Filter value={this.state.filter} onChange={this.changeFilter} />
//           <ContactList
//             contacts={filteredContact}
//             onDelete={this.deleteContact}
//           />
//         </div>
//       </div>
//     );
//   }
// }
