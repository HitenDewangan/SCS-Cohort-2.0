export default function ContactList({ contacts, onSelect, selectedId }) {
  return (
    <div className="space-y-2 overflow-y-auto max-h-[400px]">
      {contacts.map((contact) => (
        <div 
          key={contact.id}
          onClick={() => onSelect(contact)}
          className={`flex items-center gap-3 p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition ${selectedId === contact.id ? 'bg-gray-100' : ''}`}
        >
          <div className="w-10 h-10 bg-gray-300 rounded-full border border-black overflow-hidden">
             {/* Profile Image placeholder */}
          </div>
          <div>
            <h4 className="font-bold text-sm leading-tight">{contact.name}</h4>
            <p className="text-xs text-gray-500">{contact.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
}