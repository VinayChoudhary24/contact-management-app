import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useParams, useNavigate } from 'react-router-dom';
import { editContact } from '../Slices/ContactSlices';

const ContactDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const contact = useSelector((state: RootState) => 
    state.contacts.contacts.find(contact => contact.id === id)
  );
  const [firstName, setFirstName] = useState(contact?.firstName || '');
  const [lastName, setLastName] = useState(contact?.lastName || '');
  const [status, setStatus] = useState(contact?.status || 'Active');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!contact) {
    return <div>Contact not found</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(editContact({ id: contact.id, firstName, lastName, status }));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border p-2"
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border p-2"
        />
      </div>
      <div>
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Save</button>
    </form>
  );
};

export default ContactDetails;