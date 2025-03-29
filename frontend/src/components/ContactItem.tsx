import React, { useState } from 'react';
import { deleteContact, updateContact } from '../services/api';
import { Contact } from '../types';
import { MdEdit, MdDelete, MdSave, MdCancel, MdDeleteForever } from "react-icons/md";

const ContactItem = ({ contact, setContacts }: { contact: Contact; setContacts: React.Dispatch<React.SetStateAction<Contact[]>> }) => {
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    try {
        await deleteContact(contact.id);
        setContacts(prev => prev.filter(c => c.id !== contact.id));
    } catch (err: unknown) {
        setError((err as Error).message || 'Failed to delete');
    }
  };

  const handleUpdate = async () => {
    try {
      const updated = await updateContact(contact.id, name, email);
      setContacts(prev => prev.map(c => (c.id === contact.id ? updated : c)));
      setEditing(false);
      setError('');
    } catch (err: unknown) {
      setError((err as Error).message || 'Failed to update');
    }
  };

    const getInitials = (fullName: string) => {
        const words = fullName.split(' ');
        const initials = words.slice(0, 2).map(word => word[0].toUpperCase()).join('');
        return initials;
    };

  return (
    <div className="flex flex-col md:flex-row justify-start gap-2 md:justify-between md:items-center p-2 rounded-lg bg-gray-200 hover:bg-gray-100 shadow-md hover:shadow-lg transition duration-200 ease-in-out">
        <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold">
                {getInitials(contact.name)}
            </div>
            {editing ? (
                <div className="flex flex-col md:flex-row gap-2">
                    <input value={name} onChange={e => setName(e.target.value)} className="mr-2 border p-1 rounded" />
                    <input value={email} onChange={e => setEmail(e.target.value)} className="mr-2 border p-1 rounded" />
                </div>
            ) : confirmDelete ? (
                <div>
                    <p className="text-sm text-gray-700 mr-2">Do you want to delete <strong>{contact.name}</strong>?</p>
                </div>
            ) : (
                <div className="flex-1">
                    <p className="font-semibold">{contact.name}</p>
                    <p className="text-sm text-gray-700">{contact.email}</p>
                </div>
            )}
        </div>
        <div className="">
            {editing ? (
                <div className="grid grid-cols-2 md:flex justify-stretch w-full gap-6 md:gap-3 px-3">
                    <button 
                        className="flex justify-center items-center gap-1 bg-green-600 text-white px-3 py-1 md:p-2 rounded-lg shadow-md shadow-gray-400 cursor-pointer text-lg" 
                        onClick={handleUpdate}
                        aria-label="Save"
                    >
                        <MdSave />
                        <div className="block md:hidden">Save</div>
                    </button>
                    <button 
                        className="flex justify-center items-center gap-1 bg-gray-700 text-white px-3 py-1 md:p-2 rounded-lg shadow-md shadow-gray-400 cursor-pointer text-lg" 
                        onClick={() => setEditing(false)}
                        aria-label="Cancel"
                    >
                        <MdCancel />
                        <div className="block md:hidden">Cancel</div>
                    </button>
                </div>
            ) : confirmDelete ? (
                <div className="grid grid-cols-2 md:flex justify-stretch w-full gap-6 md:gap-3 px-3">
                    <button 
                        className="flex justify-center items-center gap-1 bg-red-600 text-white px-3 py-1 md:p-2 rounded-lg shadow-md shadow-gray-400 cursor-pointer text-lg" 
                        onClick={handleDelete}
                        aria-label="Delete"
                    >
                        <MdDeleteForever />
                        <div className="block md:hidden">Delete</div>
                    </button>
                    <button 
                        className="flex justify-center items-center gap-1 bg-gray-700 text-white px-3 py-1 md:p-2 rounded-lg shadow-md shadow-gray-400 cursor-pointer text-lg" 
                        onClick={() => setConfirmDelete(false)}
                        aria-label="Cancel"
                    >
                        <MdCancel />
                        <div className="block md:hidden">Cancel</div>
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:flex justify-stretch w-full gap-6 md:gap-3 px-3">
                    <button 
                        className="flex justify-center items-center gap-1 bg-blue-600 text-white px-3 py-1 md:p-2 rounded-lg shadow-md shadow-gray-400 cursor-pointer text-lg" 
                        onClick={() => setEditing(true)}
                        aria-label="Edit"
                    >
                        <MdEdit />
                        <div className="block md:hidden">Edit</div>
                    </button>
                    <button 
                        className="flex justify-center items-center gap-1 bg-red-600 text-white px-3 py-1 md:p-2 rounded-lg shadow-md shadow-gray-400 cursor-pointer text-lg" 
                        onClick={() => setConfirmDelete(true)}
                        aria-label="Delete"
                    >
                        <MdDelete />
                        <div className="block md:hidden">Delete</div>
                    </button>
                </div>
            )}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    </div>
  );
};

export default ContactItem;
