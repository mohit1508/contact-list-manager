import React, { useEffect, useState, useRef, useCallback } from 'react';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import { Contact } from '../types';
import { fetchContacts } from '../services/api';
import contactIcon from '/contact.png';
import { IoPersonAdd } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

const Home = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);
    const didMount = useRef(false);
    const limit = 10;

    // Callback function to observe the last contact for infinite scrolling
    const lastContactRef = useCallback(
        (node: HTMLDivElement | null) => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1);
            }
        });
        if (node) observer.current.observe(node);
        }, [hasMore]
    );

    // Fetch contacts when the page or search input changes
    useEffect(() => {
        const loadContacts = async () => {
            const newContacts = await fetchContacts(search, limit, page * limit);
            setContacts(prev => [...prev, ...newContacts]);
            setHasMore(newContacts.length === limit);
        };
    
        if (didMount.current) {
            loadContacts();
        } else {
            didMount.current = true;
        }
    }, [page, search]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setContacts([]);
        setPage(0);
    };

    return (
        <div>
            {/* Header Section */}
            <div className="bg-gray-200">
                <div className="max-w-2xl w-full mx-auto flex flex-row gap-2 justify-center md:justify-between items-center px-4 py-2">
                    <img src={contactIcon} alt="Contact Icon" className="w-12 h-12" />
                    <h1 className="text-2xl md:text-3xl font-semibold text-center">Contact List Manager</h1>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="max-w-2xl mx-auto p-4">
                <div className="relative flex gap-2 justify-between items-center">
                    {/* Search Input */}
                    <div className="flex-1 relative mb-4 hover:bg-gray-100 rounded-full">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search by name or email"
                            value={search}
                            onChange={handleSearchChange}
                            className="w-full border rounded-full p-2 pl-10"
                        />
                    </div>
                    {/* Add Contact Button */}
                    <button
                        onClick={() => setShowModal(true)}
                        className="fixed bottom-6 right-4 md:bottom-0 md:right-0 md:relative md:mb-4 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-md shadow-gray-400 cursor-pointer text-2xl md:text-xl"
                    >
                        <IoPersonAdd />
                    </button>
                    {/* Add Contact Modal */}
                    {showModal && (
                        <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-2 md:px-0 z-20">
                        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                            <h2 className="flex gap-2 items-center text-xl font-semibold mb-4">
                                <div className="text-white p-3 rounded-full bg-blue-500">
                                    <IoPersonAdd />
                                </div>
                                Add Contact
                            </h2>
                            <ContactForm setContacts={setContacts} onClose={() => setShowModal(false)} />
                        </div>
                        </div>
                    )}
                </div>
                {/* Contact List */}
                <ContactList
                    contacts={contacts}
                    setContacts={setContacts}
                    lastContactRef={lastContactRef}
                />
            </div>
        </div>
    );
};

export default Home;
