import axios from 'axios';
import { Contact } from '../types';

const BASE_URL = `${import.meta.env.VITE_SERVER_URL}/api/contacts`;

export const fetchContacts = async (search = '', limit = 10, offset = 0): Promise<Contact[]> => {
    const res = await axios.get(BASE_URL, {
        params: { search, limit, offset },
    });
    return res.data;
};

export const addContact = async (name: string, email: string): Promise<Contact> => {
    const res = await axios.post(BASE_URL, { name, email });
    return res.data;
};

export const deleteContact = async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
};

export const updateContact = async (id: number, name: string, email: string): Promise<Contact> => {
    const res = await axios.put(`${BASE_URL}/${id}`, { name, email });
    return res.data;
};