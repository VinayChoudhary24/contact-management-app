import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { deleteContact } from '../Slices/ContactSlices';
import { useNavigate } from 'react-router-dom';

interface ContactListProps {
  onEditClick: (contact: { id: string, firstName: string, lastName: string, status: string }) => void;
}

const ContactList: React.FC<ContactListProps> = ({ onEditClick }) => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-xl mb-4">Contacts</h2>
      <ul className="w-full">
        {contacts.map(contact => (
          <li key={contact.id} className="mb-2 flex justify-between items-center w-full bg-white p-3 shadow-md rounded">
            <div>
              <span>{contact.firstName} {contact.lastName} - {contact.status}</span>
            </div>
            <div>
              <button
                onClick={() => onEditClick(contact)}
                className="bg-yellow-500 text-white px-4 py-2 mr-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteContact(contact.id))}
                className="bg-red-500 text-white px-4 py-2 rounded"
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