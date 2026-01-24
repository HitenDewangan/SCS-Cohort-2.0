import React, { useState } from 'react';

export default function AddContactModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({ name: '', mobile: '', email: '', relation: '', location: 'New York' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.mobile) onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
      <div className="bg-white border-4 border-black rounded-[40px] p-8 w-full max-w-md shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-center mb-6 font-mono text-xl">dialog box</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            className="w-full border-2 border-black rounded-2xl p-3 outline-none" 
            placeholder="name" 
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
          <input 
            className="w-full border-2 border-black rounded-2xl p-3 outline-none" 
            placeholder="mobile" 
            onChange={e => setFormData({...formData, mobile: e.target.value})}
          />
          <input 
            className="w-full border-2 border-black rounded-2xl p-3 outline-none" 
            placeholder="email (optional)" 
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
          <input 
            className="w-full border-2 border-black rounded-2xl p-3 outline-none" 
            placeholder="relation (optional)" 
            onChange={e => setFormData({...formData, relation: e.target.value})}
          />
          <div className="flex flex-col items-center pt-4">
            <button 
              type="submit"
              className="bg-yellow-100 border-2 border-black px-6 py-2 rounded-xl font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all"
            >
              save contact
            </button>
            <button type="button" onClick={onClose} className="mt-2 text-xs underline">cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}