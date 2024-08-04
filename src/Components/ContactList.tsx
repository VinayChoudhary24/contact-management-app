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
      <h2 style={{ marginLeft: "15px" }} className="text-xl sm:text-lg md:text-xl lg:text-2xl mb-4 text-center">Contacts</h2>
      <ul className="list-disc pl-5 w-full space-y-2 sm:space-y-1 md:space-y-2 lg:space-y-3">
        {contacts.map(contact => (
          <li
            key={contact.id}
            className="p-4 sm:p-2 sm:mb-3 md:p-3 lg:p-4 shadow-md rounded flex flex-col lg:flex-row justify-between items-center bg-gray-100 text-center sm:text-left lg:text-left"
          >
            <div className="flex-grow">
              <span className="block font-semibold text-base sm:text-sm md:text-base lg:text-lg">{contact.firstName} {contact.lastName}</span>
              <span className="text-gray-500 text-sm sm:text-xs md:text-sm lg:text-base sm:flex sm:justify-center sm:items-center md:flex md:justify-center md:items-center lg:block">
                {contact.status}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-2 md:mt-2 lg:mt-0">
              <button
                onClick={() => onEditClick(contact)}
                className="bg-yellow-500 text-white text-sm sm:text-xs md:text-sm lg:text-base px-3 py-2 sm:px-2 sm:py-1 md:px-3 md:py-2 lg:px-4 lg:py-2 rounded flex justify-center items-center hover:bg-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteContact(contact.id))}
                className="bg-red-500 text-white text-sm sm:text-xs md:text-sm lg:text-base px-3 py-2 sm:px-2 sm:py-1 md:px-3 md:py-2 lg:px-4 lg:py-2 rounded flex justify-center items-center hover:bg-red-700"
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