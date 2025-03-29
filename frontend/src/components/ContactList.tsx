import React from 'react';
import ContactItem from './ContactItem';
import { Contact } from '../types';

const ContactList = ({
  contacts,
  setContacts,
  lastContactRef,
}: {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  lastContactRef: (node: HTMLDivElement | null) => void;
}) => {
  return (
    <div className='flex flex-col gap-3'>
      {contacts.map((contact, index) => (
        <div key={contact.id} ref={index === contacts.length - 1 ? lastContactRef : null}>
          <ContactItem contact={contact} setContacts={setContacts} />
        </div>
      ))}
    </div>
  );
};

export default ContactList;
