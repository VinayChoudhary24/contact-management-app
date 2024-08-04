import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addContact, editContact } from '../Slices/ContactSlices';
import { nanoid } from 'nanoid';

// Define the props for the ContactForm component
interface ContactFormProps {
  onSubmit: () => void;
  initialData?: { id: string; firstName: string; lastName: string; status: string };
}

// Define the form inputs type
interface FormInputs {
  firstName: string;
  lastName: string;
  status: string;
}

/**
 * ContactForm component - displays and handles the form for adding/editing contacts.
 * @param {ContactFormProps} props - The props for the component.
 * @returns {JSX.Element}
 */
const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, initialData }) => {
  // Use react-hook-form for form state management and validation
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    defaultValues: {
      firstName: initialData?.firstName || '',
      lastName: initialData?.lastName || '',
      status: initialData?.status || 'Active',
    },
  });

  const dispatch = useDispatch();

  // Handle form submission
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
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="mb-4 p-4 border rounded bg-white shadow-md w-full max-w-md 
                 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto"
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm md:text-base lg:text-lg">First Name</label>
        <input
          {...register('firstName', { required: 'First name is required' })}
          className={`border p-2 w-full ${errors.firstName ? 'border-red-500' : ''}`}
        />
        {errors.firstName && <span className="text-red-500 text-xs md:text-sm lg:text-base">{errors.firstName.message}</span>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm md:text-base lg:text-lg">Last Name</label>
        <input
          {...register('lastName', { required: 'Last name is required' })}
          className={`border p-2 w-full ${errors.lastName ? 'border-red-500' : ''}`}
        />
        {errors.lastName && <span className="text-red-500 text-xs md:text-sm lg:text-base">{errors.lastName.message}</span>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm md:text-base lg:text-lg">Status</label>
        <select {...register('status')} className="border p-2 w-full">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white text-sm md:text-base lg:text-lg px-4 py-2 rounded"
      >
        {initialData ? 'Update Contact' : 'Add Contact'}
      </button>
    </form>
  );
};

export default ContactForm;