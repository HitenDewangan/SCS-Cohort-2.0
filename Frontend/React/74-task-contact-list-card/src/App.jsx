import React, { useState } from 'react';
import initialContacts from './data/contacts.json';
import ContactList from './components/ContactList';
import ContactDetail from './components/ContactDetail';
import AddContactModal from './components/AddContactModal';

export default function App() {
  const [contacts, setContacts] = useState(initialContacts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter contacts based on search input
  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addContact = (newContact) => {
    const contactWithId = { ...newContact, id: Date.now() };
    setContacts([...contacts, contactWithId]);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-yellow-300 p-8 font-sans text-red-800">
      <div className="max-w-5xl mx-auto border-2 border-black rounded-3xl p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        
        {/* Header Section */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="border-2 border-black px-4 py-1 rounded-xl mb-6 hover:bg-gray-100 transition shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          add new contact
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar: Search & List */}
          <div className="w-full md:w-1/3 border-2 border-black rounded-3xl p-4">
            <input 
              type="text" 
              placeholder="search" 
              className="w-full border-2 border-black rounded-xl px-3 py-2 mb-4 outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ContactList 
              contacts={filteredContacts} 
              onSelect={setSelectedContact} 
              selectedId={selectedContact?.id}
            />
          </div>

          {/* Right Section: Details */}
          <div className="w-full md:w-2/3 border-2 border-black rounded-3xl p-6 flex flex-col items-center">
            <ContactDetail contact={selectedContact} />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AddContactModal 
          onClose={() => setIsModalOpen(false)} 
          onSave={addContact} 
        />
      )}
    </div>
  );
}