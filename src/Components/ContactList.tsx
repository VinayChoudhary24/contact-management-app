import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { deleteContact } from '../Slices/ContactSlices';

// Define the props for the ContactList component
interface ContactListProps {
  onEditClick: (contact: { id: string; firstName: string; lastName: string; status: string }) => void;
}

/**
 * ContactList component - displays the list of contacts with edit and delete options.
 * @param {ContactListProps} props - The props for the component.
 * @returns {JSX.Element}
 */
const ContactList: React.FC<ContactListProps> = ({ onEditClick }) => {
  // Retrieve the contacts from the Redux store
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  // State to manage hover state for Edit and Delete buttons
  const [hoveredButton, setHoveredButton] = useState<{ id: string; type: 'edit' | 'delete' } | null>(null);

  return (
    <div className="flex flex-col items-center w-full p-4 sm:p-2 md:p-6 lg:p-8">
      <h2 className="text-xl mb-4">Contacts</h2>
      <ul className="list-disc pl-5 w-full space-y-2">
        {contacts.map(contact => (
          <li
            key={contact.id}
            className="p-4 shadow-md rounded flex justify-between items-center bg-gray-100"
          >
            <div>
              <span className="block font-semibold">{contact.firstName} {contact.lastName}</span>
              <span className="text-gray-500">{contact.status}</span>
            </div>
            <div className="flex gap-2 relative">
              <button
                onClick={() => onEditClick(contact)}
                className="bg-yellow-500 text-white px-4 py-2 rounded relative flex justify-center items-center hover:bg-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteContact(contact.id))}
                className="bg-red-500 text-white px-4 py-2 rounded relative flex justify-center items-center hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;