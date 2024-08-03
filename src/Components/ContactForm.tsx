import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addContact, editContact } from '../Slices/ContactSlices';
import { nanoid } from 'nanoid';

interface ContactFormProps {
  onSubmit: () => void;
  initialData?: { id: string; firstName: string; lastName: string; status: string };
}

interface FormInputs {
  firstName: string;
  lastName: string;
  status: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, initialData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    defaultValues: {
      firstName: initialData?.firstName || '',
      lastName: initialData?.lastName || '',
      status: initialData?.status || 'Active',
    },
  });
  const dispatch = useDispatch();

  const onSubmitHandler: SubmitHandler<FormInputs> = (data) => {
    const { firstName, lastName, status } = data;
    if (initialData) {
      dispatch(editContact({ id: initialData.id, firstName, lastName, status }));
    } else {
      dispatch(addContact({ id: nanoid(), firstName, lastName, status }));
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="mb-4 p-4 border rounded bg-white shadow-md w-full max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700">First Name</label>
        <input
          {...register('firstName', { required: 'First name is required' })}
          className={`border p-2 w-full ${errors.firstName ? 'border-red-500' : ''}`}
        />
        {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Last Name</label>
        <input
          {...register('lastName', { required: 'Last name is required' })}
          className={`border p-2 w-full ${errors.lastName ? 'border-red-500' : ''}`}
        />
        {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Status</label>
        <select {...register('status')} className="border p-2 w-full">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {initialData ? 'Update Contact' : 'Add Contact'}
      </button>
    </form>
  );
};

export default ContactForm;