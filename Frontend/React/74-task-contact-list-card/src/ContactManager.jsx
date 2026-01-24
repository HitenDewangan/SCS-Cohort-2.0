import React, { useState, useEffect } from 'react';
import { Search, UserCircle2, Pin, MoreVertical, X, Heart } from 'lucide-react';

const ContactManager = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    relation: '',
    isPinned: false,
    isFavorite: false
  });

  // Load contacts from storage on mount
  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const result = await window.storage.get('contacts');
      if (result && result.value) {
        setContacts(JSON.parse(result.value));
      } else {
        // Initialize with default data
        const defaultContacts = [
          { id: '1', name: 'John Doe', mobile: '+1234567890', email: 'john@example.com', relation: 'Friend', isPinned: false, isFavorite: false },
          { id: '2', name: 'Jane Smith', mobile: '+1987654321', email: 'jane@example.com', relation: 'Family', isPinned: true, isFavorite: true },
          { id: '3', name: 'Bob Johnson', mobile: '+1122334455', email: 'bob@example.com', relation: 'Work', isPinned: false, isFavorite: false }
        ];
        await saveContacts(defaultContacts);
        setContacts(defaultContacts);
      }
    } catch (error) {
      // If key doesn't exist, initialize with default data
      const defaultContacts = [
        { id: '1', name: 'John Doe', mobile: '+1234567890', email: 'john@example.com', relation: 'Friend', isPinned: false, isFavorite: false },
        { id: '2', name: 'Jane Smith', mobile: '+1987654321', email: 'jane@example.com', relation: 'Family', isPinned: true, isFavorite: true },
        { id: '3', name: 'Bob Johnson', mobile: '+1122334455', email: 'bob@example.com', relation: 'Work', isPinned: false, isFavorite: false }
      ];
      await saveContacts(defaultContacts);
      setContacts(defaultContacts);
    } finally {
      setIsLoading(false);
    }
  };

  const saveContacts = async (updatedContacts) => {
    try {
      await window.storage.set('contacts', JSON.stringify(updatedContacts));
    } catch (error) {
      console.error('Error saving contacts:', error);
    }
  };

  const openDialog = (contact = null) => {
    if (contact) {
      setFormData(contact);
    } else {
      setFormData({
        name: '',
        mobile: '',
        email: '',
        relation: '',
        isPinned: false,
        isFavorite: false
      });
    }
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setFormData({
      name: '',
      mobile: '',
      email: '',
      relation: '',
      isPinned: false,
      isFavorite: false
    });
  };

  const handleSaveContact = async () => {
    if (!formData.name || !formData.mobile) {
      alert('Name and mobile are required');
      return;
    }

    let updatedContacts;
    if (formData.id) {
      // Update existing contact
      updatedContacts = contacts.map(c => c.id === formData.id ? formData : c);
    } else {
      // Add new contact
      const newContact = {
        ...formData,
        id: Date.now().toString()
      };
      updatedContacts = [...contacts, newContact];
    }

    setContacts(updatedContacts);
    await saveContacts(updatedContacts);
    closeDialog();
  };

  const handleDeleteContact = async (id) => {
    const updatedContacts = contacts.filter(c => c.id !== id);
    setContacts(updatedContacts);
    await saveContacts(updatedContacts);
    setSelectedContact(null);
  };

  const togglePin = async (id) => {
    const updatedContacts = contacts.map(c => 
      c.id === id ? { ...c, isPinned: !c.isPinned } : c
    );
    setContacts(updatedContacts);
    await saveContacts(updatedContacts);
    if (selectedContact?.id === id) {
      setSelectedContact(updatedContacts.find(c => c.id === id));
    }
  };

  const toggleFavorite = async (id) => {
    const updatedContacts = contacts.map(c => 
      c.id === id ? { ...c, isFavorite: !c.isFavorite } : c
    );
    setContacts(updatedContacts);
    await saveContacts(updatedContacts);
    if (selectedContact?.id === id) {
      setSelectedContact(updatedContacts.find(c => c.id === id));
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.mobile.includes(searchQuery) ||
    contact.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return a.name.localeCompare(b.name);
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-gray-600">Loading contacts...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Container */}
      <div className="flex-1 flex max-w-6xl mx-auto p-6 gap-6">
        {/* Left Sidebar */}
        <div className="w-80 bg-white rounded-2xl shadow-sm p-4 flex flex-col">
          <button
            onClick={() => openDialog()}
            className="w-full mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            add new contact
          </button>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-1">
            {sortedContacts.map(contact => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedContact?.id === contact.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50 border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">{contact.name}</span>
                  {contact.isPinned && <Pin className="w-4 h-4 text-blue-500 fill-blue-500" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Detail View */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm p-6">
          {selectedContact ? (
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <UserCircle2 className="w-20 h-20 text-gray-400" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleFavorite(selectedContact.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      selectedContact.isFavorite
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${selectedContact.isFavorite ? 'fill-red-600' : ''}`} />
                  </button>
                  <button
                    onClick={() => togglePin(selectedContact.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      selectedContact.isPinned
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Pin className={`w-5 h-5 ${selectedContact.isPinned ? 'fill-blue-600' : ''}`} />
                  </button>
                  <button className="p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-4 flex-1">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                    {selectedContact.name}
                  </h2>
                  <p className="text-sm text-gray-500">{selectedContact.relation || 'No relation'}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked
                      readOnly
                      className="w-5 h-5 text-blue-600"
                    />
                    <div>
                      <div className="text-sm text-gray-500">mobile</div>
                      <div className="text-gray-800">{selectedContact.mobile}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={!!selectedContact.email}
                      readOnly
                      className="w-5 h-5 text-blue-600"
                    />
                    <div>
                      <div className="text-sm text-gray-500">email</div>
                      <div className="text-gray-800">{selectedContact.email || 'Not provided'}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={!!selectedContact.relation}
                      readOnly
                      className="w-5 h-5 text-blue-600"
                    />
                    <div>
                      <div className="text-sm text-gray-500">relation</div>
                      <div className="text-gray-800">{selectedContact.relation || 'Not provided'}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => openDialog(selectedContact)}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Edit Contact
                </button>
                <button
                  onClick={() => handleDeleteContact(selectedContact.id)}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete Contact
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              Select a contact to view details
            </div>
          )}
        </div>
      </div>

      {/* Dialog Box */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-96">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {formData.id ? 'Edit Contact' : 'Add New Contact'}
              </h3>
              <button
                onClick={closeDialog}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="tel"
                placeholder="mobile"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="email"
                placeholder="email (optional)"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                placeholder="relation (optional)"
                value={formData.relation}
                onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                onClick={handleSaveContact}
                className="w-full px-4 py-2 bg-yellow-400 text-gray-800 font-medium rounded-lg hover:bg-yellow-500 transition-colors"
              >
                save contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManager;