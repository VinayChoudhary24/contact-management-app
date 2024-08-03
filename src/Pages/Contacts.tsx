import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import ContactForm from '../Components/ContactForm';
import ContactList from '../Components/ContactList';

const Contacts: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<{ id: string, firstName: string, lastName: string, status: string } | undefined>(undefined);
  const contacts = useSelector((state: RootState) => state.contacts.contacts);

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditData(undefined);
  };

  const handleEditClick = (contact: { id: string, firstName: string, lastName: string, status: string }) => {
    setEditData(contact);
    setShowForm(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 rounded-md p-4 overflow-hidden">
      {!showForm ? (
        <div className="w-full max-w-md text-center bg-white shadow-md rounded p-4">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 mb-4 rounded"
          >
            Create Contact
          </button>
          {contacts.length === 0 ? (
            <p>No Contacts Found</p>
          ) : (
            <ContactList onEditClick={handleEditClick} />
          )}
        </div>
      ) : (
        <div className="w-full max-w-md">
          <ContactForm onSubmit={handleFormSubmit} initialData={editData} />
        </div>
      )}
    </div>
  );
};

export default Contacts;