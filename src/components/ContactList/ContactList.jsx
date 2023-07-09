import css from './contactList.module.css';
import PropTypes from 'prop-types';

export const ContactList = ({ contacts, onDelete }) => {
  return (
    <ul>
      {contacts.map(contact => {
        const { id, name, number } = contact;
        return (
          <li key={id} className={css.contactsItem}>
            <p>{`${name} : ${number}`}</p>
            <button
              onClick={() => {
                onDelete(id);
              }}
            >
              delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
};
