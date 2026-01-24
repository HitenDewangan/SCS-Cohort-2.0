import React from 'react';

export default function ContactDetail({ contact }) {
  if (!contact) {
    return <div className="text-gray-400 mt-20">Select a contact to view details</div>;
  }

  return (
    <div className="w-full">
      {/* Top Header with Icons */}
      <div className="flex justify-end gap-4 mb-4">
        <span className="cursor-pointer text-xl">🪄</span>
        <span className="cursor-pointer text-xl font-bold">⋮</span>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center border-b-2 border-black pb-6 mb-6">
        <div className="w-24 h-24 bg-gray-200 rounded-full border-2 border-black mb-4 flex items-center justify-center overflow-hidden">
          {/* If there's no image, just a placeholder icon or initial */}
          <span className="text-3xl">👤</span>
        </div>
        <h2 className="text-2xl font-bold lowercase">{contact.name}</h2>
        <p className="text-gray-500 lowercase">{contact.location}</p>
      </div>

      {/* Details List */}
      <div className="space-y-6 px-4">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 border-2 border-black rounded-lg bg-white"></div>
          <span className="text-xl lowercase">{contact.mobile}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 border-2 border-black rounded-lg bg-white"></div>
          <span className="text-xl lowercase">{contact.email || 'no email'}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-8 h-8 border-2 border-black rounded-lg bg-white"></div>
          <span className="text-xl lowercase">{contact.relation || 'no relation'}</span>
        </div>
      </div>
    </div>
  );
}