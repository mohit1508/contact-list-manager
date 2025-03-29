import React, { useState } from 'react';
import { addContact, fetchContacts } from '../services/api';
import { Contact } from '../types';
import { MdAdd, MdCancel } from "react-icons/md";

const ContactForm = ({ setContacts, onClose }: { setContacts: React.Dispatch<React.SetStateAction<Contact[]>>; onClose: () => void }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email) return setError('Name and email are required.');
    try {
      await addContact(name, email);
      const allContacts = await fetchContacts('', 10, 0)
      setContacts([...allContacts]);
      setName('');
      setEmail('');
      onClose();
    } catch (err) {
      if (typeof err === 'object' && err !== null && 'response' in err) {
        const errorResponse = err as { response?: { data?: { message?: string } } };
        setError(errorResponse.response?.data?.message || 'Sorry something went wrong');
      } else if (err instanceof Error) {
        setError(err.message);  
      } else {
        setError('Sorry something went wrong');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-2">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border p-2 rounded-lg w-full mb-2 bg-gray-50 placeholder-gray-500"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border p-2 rounded-lg w-full mb-4 bg-gray-50 placeholder-gray-500"
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="grid grid-cols-2 gap-4">
        <button
          type="submit"
          className="flex items-center justify-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-100 ease-in-out"
        >
          <MdAdd className="text-lg"/>
          Add
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex items-center justify-center gap-1 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-100 ease-in-out"
        >
          <MdCancel />
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ContactForm;

