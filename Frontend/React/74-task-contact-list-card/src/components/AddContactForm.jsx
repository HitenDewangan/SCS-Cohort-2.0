import React, { useState } from 'react';

export default function AddContactForm({ onAdd, onClose }) {
  const [formData, setFormData] = useState({ name: '', mobile: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) return;
    onAdd(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl w-96 shadow-2xl">
        <h2 className="text-xl font-bold mb-4">Add New Contact</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            placeholder="Full Name" 
            className="w-full border p-2 rounded"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            placeholder="Phone Number" 
            className="w-full border p-2 rounded"
            onChange={(e) => setFormData({...formData, mobile: e.target.value})}
          />
          <input 
            placeholder="Email Address" 
            type="email"
            className="w-full border p-2 rounded"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <div className="flex gap-2 pt-4">
            <button type="button" onClick={onClose} className="flex-1 bg-gray-200 p-2 rounded font-semibold">Cancel</button>
            <button type="submit" className="flex-1 bg-blue-500 text-white p-2 rounded font-semibold">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}