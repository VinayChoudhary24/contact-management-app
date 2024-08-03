import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import ContactForm from '../Components/ContactForm'; 
import ContactList from '../Components/ContactList';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  status: string;
}

/**
 * Contacts component - displays and manages contacts, allowing users to create and edit contacts.
 * @returns {JSX.Element}
 */
const Contacts: React.FC = () => {
  // State to manage form visibility and edit data
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<Contact | undefined>(undefined);

  // Retrieve contacts from the Redux store
  const contacts = useSelector((state: RootState) => state.contacts.contacts);

  // Handle form submission
  const handleFormSubmit = (): void => {
    setShowForm(false);
    setEditData(undefined);
  };

  // Handle edit button click
  const handleEditClick = (contact: Contact): void => {
    setEditData(contact);
    setShowForm(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 overflow-hidden rounded-md">
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