import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { editContact } from '../Slices/ContactSlices';

/**
 * ContactDetails component - displays and edits the details of a selected contact.
 * @returns {JSX.Element}
 */
const ContactDetails: React.FC = () => {
  // Get the contact ID from the URL parameters
  const { id } = useParams<{ id: string }>();

  // Retrieve the contact details from the Redux store
  const contact = useSelector((state: RootState) =>
    state.contacts.contacts.find(contact => contact.id === id)
  );

  // Initialize form state
  const [firstName, setFirstName] = useState(contact?.firstName || '');
  const [lastName, setLastName] = useState(contact?.lastName || '');
  const [status, setStatus] = useState(contact?.status || 'Active');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // If the contact is not found, display an appropriate message
  if (!contact) {
    return <div>Contact not found</div>;
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(editContact({ id: contact.id, firstName, lastName, status }));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto p-4 border rounded bg-white shadow-md w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      <div className="mb-4">
        <label className="block text-gray-700">First Name</label>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Last Name</label>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  );
};

export default ContactDetails;