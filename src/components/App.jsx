import { useState, useEffect } from 'react';
import { ContactList } from './ContactsList/ContactList';
import { Filter } from './Filter/Filter';
import { ContactForm } from './Form/Form';
import { Section } from './Default.styled';
const getLocal = () => {
  const initialContacts = localStorage.getItem('contacts');
  const initialContactsParse = JSON.parse(initialContacts);

  if (initialContactsParse) {
    return initialContactsParse;
  }

  return [];
};

export const App = () => {
  const [contacts, setContacts] = useState(getLocal);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  const addContactToList = newContact => {
    const existingContact = contacts.find(
      contact => contact.name === newContact.name
    );
    if (existingContact) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    setContacts(prevState => [...contacts, newContact]);
  };
  const filterByName = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  const onDeleteContact = id => {
    setContacts(prevState => contacts.filter(contact => contact.id !== id));
  };
  return (
    <Section>
      <h2>Phoneboock</h2>
      <ContactForm addContact={addContactToList} />
      <h2>Contacts</h2>
      <Filter filter={filterByName} />
      <ContactList
        contacts={contacts}
        filterValue={filter}
        deleteContact={onDeleteContact}
      />
    </Section>
  );
};
